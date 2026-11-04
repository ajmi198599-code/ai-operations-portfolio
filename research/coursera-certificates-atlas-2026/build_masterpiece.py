#!/usr/bin/env python3
"""Repair Coursera Atlas issuer artwork from public publisher sources.

All resolved graphics are embedded as data URIs into the HTML and stored in
logos/issuer-assets. Never invent brand artwork; failures remain legible
publisher nameplates and are recorded in the audit.
"""
import base64,csv,json,re,sys,io,os,time,html,subprocess,shutil,mimetypes
from pathlib import Path
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup
from PIL import Image

ROOT=Path(__file__).resolve().parent
SOURCE=ROOT/'index.html'
EXPORT=ROOT/'Coursera_Atlas_2026_Masterpiece.html'
AUDIT=ROOT/'logo-audit.json'
ASSET=ROOT/'logos'/'issuer-assets'
ASSET.mkdir(parents=True,exist_ok=True)
SS=requests.Session();SS.headers.update({'User-Agent':'Mozilla/5.0 (compatible; BrandResourceResearch/1.0; noncommercial educational reference)','Accept':'image/avif,image/webp,image/svg+xml,image/png,image/*,*/*;q=0.8'})
URLS={
'IBM':('ibm.com',['https://raw.githubusercontent.com/glincker/thesvg/main/public/icons/ibm/default.svg']),
'DeepLearning.AI':('deeplearning.ai',['https://cdn.simpleicons.org/deeplearningai']),
'Adobe':('adobe.com',['https://raw.githubusercontent.com/glincker/thesvg/main/public/icons/adobe/default.svg']),
'SAS':('sas.com',['https://raw.githubusercontent.com/ln-dev7/logos-apps/master/logos/sas.svg']),
'Tableau Learning Partner':('tableau.com',['https://raw.githubusercontent.com/glincker/thesvg/main/public/icons/tableau/default.svg']),
'CVS Health':('cvshealth.com',['https://www.cvshealth.com/content/dam/enterprise/cvs-enterprise/logos/news-component-hero-logo/CVSHealth-Enterprise-Hero-Logo-1600x900.jpeg','https://cdn.simpleicons.org/cvshealth']),
'Liberty Mutual':('libertymutualgroup.com',[]),
'Johns Hopkins University':('jhu.edu',[]),
'Arizona State University':('asu.edu',[]),
'KPMG India':('kpmg.com',['https://cdn.simpleicons.org/kpmg']),
'MathWorks':('mathworks.com',['https://raw.githubusercontent.com/ln-dev7/logos-apps/master/logos/mathworks.svg']),
'Tally':('tallysolutions.com',['https://cdn.simpleicons.org/tally']),
'CertNexus':('certnexus.com',[]),
'EC-Council':('eccouncil.org',[]),
'HRCI':('hrci.org',[]),
'AAPC':('aapc.com',[]),
'LearnQuest':('learnquest.com',[]),
'Keller Williams':('kw.com',[]),
'Goodwill':('goodwill.org',[]),
'Fractal Analytics':('fractal.ai',[]),
'SkillUp':('skillup.online',[]),
}
OFFICIAL={
'Johns Hopkins University':'https://brand.jhu.edu/visual-identity/primary-logo/',
'Arizona State University':'https://brandguide.asu.edu/',
'Liberty Mutual':'https://www.libertymutualgroup.com/',
}

def fetch(u):
 try:
  r=SS.get(u,timeout=5,allow_redirects=True)
  if r.status_code==200 and 50<=len(r.content)<=1_300_000:return r.content,r.headers.get('Content-Type',''),r.url
 except requests.RequestException:pass
 return None,None,None

def detect(raw,ctype,source_url):
 if not raw:return None
 sample=raw.lstrip()[:5000].decode('utf-8',errors='ignore').lower()
 if '<svg' in sample[:5000]:
  if re.search(r'<(?:script|foreignobject)\b',sample,re.I):return None
  return 'image/svg+xml','svg'
 try:
  im=Image.open(io.BytesIO(raw)); im.verify(); im=Image.open(io.BytesIO(raw));
  if min(im.size)<28:return None
  fmt=(im.format or 'PNG').lower()
  if fmt in ('jpeg','jpg'):return 'image/jpeg','jpg'
  if fmt in ('png','webp','gif','avif'):return 'image/'+fmt,fmt
 except Exception:pass
 return None

def official_logo_candidates(domain):
 """Select only artwork explicitly called a logo in an official page, then icon links."""
 found=[]
 for page in [f'https://{domain}/',f'https://www.{domain}/']:
  raw,ctype,url=fetch(page)
  if not raw:continue
  soup=BeautifulSoup(raw,'html.parser')
  for img in soup.select('header img, img, meta[property="og:logo"], link[rel~="icon"], link[rel~="apple-touch-icon"]'):
   if img.name=='meta':u=img.get('content','');alt='logo'
   elif img.name=='link':u=img.get('href','');alt='official site icon'
   else:u=img.get('src') or img.get('data-src') or '';alt=' '.join([img.get('alt',''),img.get('class') and ' '.join(img.get('class')) or '',u])
   if not u or not urljoin(url,u).startswith('http'):continue
   score=5 if img.name=='img' and ('logo' in alt.lower() or 'brand' in alt.lower()) else (3 if img.name=='meta' else (1 if img.name=='link' else 0))
   if score:found.append((score,urljoin(url,u), 'official-logo' if score>=3 else 'official-site-icon'))
  if found:break
 # dedupe with logos first
 seen=set()
 for score,u,t in sorted(found,key=lambda x:-x[0]):
  if u not in seen: seen.add(u);yield u,t

def clean_svg(raw):
 # preserve the publisher's original vector paths; no recreations or recoloring
 txt=raw.decode('utf-8-sig',errors='replace')
 match=re.search(r'<svg\b.*?</svg>',txt,re.S|re.I)
 if not match:return None
 txt=match.group(0)
 # embedded external resources or scripts are unsafe for local HTML images
 if re.search(r'<(?:script|foreignObject)\b|\bon(?:load|error|click)\s*=|(?:href|src)\s*=\s*[\"\']https?://',txt,re.I):return None
 return txt.encode()

def primary_logo_sources():
    import csv
    f=ROOT/'logo-provenance.csv'
    if not f.exists():return {}
    with f.open(encoding='utf-8-sig',newline='') as h:
        return {r.get('name'):r.get('primary') for r in csv.DictReader(h) if r.get('primary')}

def build():
 primaries=primary_logo_sources()
 src=SOURCE.read_text(encoding='utf-8');soup=BeautifulSoup(src,'html.parser')
 report=[];replaced=0;offline=(os.environ.get('ATLAS_OFFLINE')=='1')
 # Profile list gives provider names; all book images with the same remote URL are replaced below.
 replacements={}
 for section in soup.select('section.profile'):
  title=section.select_one('h2');mark=section.select_one('.profile-symbol img')
  if not title or not mark:continue
  name=title.get_text(' ',strip=True);original=mark.get('src','')
  status={'name':name,'original_image':original[:350] if not original.startswith('data:') else 'previously embedded vector','asset_type':None,'asset_path':None,'source_url':None,'status':None}
  if original.startswith('logos/'):
   p=ROOT/original
   logo_url=primaries.get(name)
   if not p.exists() and logo_url and not offline:
    result=fetch(logo_url)
    data,ctype,final_url=result
    kind=detect(data,ctype,logo_url)
    if kind and kind[1]=='svg':
     data=clean_svg(data)
    if data and kind:
     p.parent.mkdir(parents=True,exist_ok=True)
     p.write_bytes(data)
   if p.exists():
    raw=p.read_bytes();kind=detect(raw,'image/svg+xml',original)
    if kind:
     status.update(status='embedded-public-vector',asset_type='published-brand-icon',asset_path=original,source_url=logo_url or 'https://github.com/simple-icons/simple-icons')
     replacements[original]=(raw,kind)
   if not status['status']:
    status.update(status='missing-verified-artwork',asset_type='legible-nameplate',source_url=logo_url)
   report.append(status);continue
  dom,cands=URLS.get(name,('',[]));selected=None
  if not offline:
   queue=[(u,'public-published-logo') for u in cands]
   if dom:
    queue += list(official_logo_candidates(dom))
    queue += [(f'https://www.google.com/s2/favicons?domain={dom}&sz=256','site-favicon-fallback')]
   seen=set()
   for u,kind_label in queue:
    if u in seen:continue
    seen.add(u)
    data,ctype,final_url=fetch(u)
    kind=detect(data,ctype,u)
    if kind:
     if kind[1]=='svg':
      data=clean_svg(data)
      if not data:continue
     selected=(data,kind,final_url or u,kind_label)
     break
  if selected:
   raw,kind,u,label=selected
   filename=re.sub(r'[^a-z0-9]+','-',name.lower()).strip('-')+'.'+kind[1]
   rel='logos/issuer-assets/'+filename
   (ROOT/rel).write_bytes(raw)
   replacements[original]=(raw,kind)
   status.update(status='embedded-'+label,asset_type=label,asset_path=rel,source_url=u)
   replaced+=1
  else:
   status.update(status='missing-verified-artwork',asset_type='legible-nameplate',source_url=OFFICIAL.get(name,f'https://{dom}/' if dom else None))
  report.append(status)

 # Modify source strings in every image occurrence, including cover, index, course spreads.
 for img in soup.find_all('img'):
  original=img.get('src','')
  if original in replacements:
   data,(mime,ext)=replacements[original]
   img['src']=f'data:{mime};base64,'+base64.b64encode(data).decode()
   img.attrs.pop('onerror',None)
   img['loading']='eager'
   if 'remote-mark' in img.get('class',[]):img['class']=[x for x in img.get('class',[]) if x!='remote-mark']
  elif original.startswith('http'):
   # No broken external images; missing artwork remains a conspicuous readable wordmark.
   parent=img.parent
   alt=img.get('alt','')
   if parent:
    fallback=soup.new_tag('span',attrs={'class':'publisher-nameplate'})
    name_match=re.search(r'(?:لجهة\s*)(.*)',alt)
    fallback.string=(name_match.group(1) if name_match else 'PUBLISHER')
    img.replace_with(fallback)
  elif original.startswith('logos/'):
   # No unresolved relative asset paths.
   fallback=soup.new_tag('span',attrs={'class':'publisher-nameplate'})
   fallback.string=img.get('alt','Publisher').replace('الرمز المنشور لجهة','').strip() or 'PUBLISHER'
   img.replace_with(fallback)

 style=soup.new_tag('style')
 style.string='''.publisher-nameplate{display:inline-flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;font-size:10px;letter-spacing:-.1px;font-weight:900;line-height:1.12;text-align:center;color:#17436d;overflow-wrap:anywhere;max-width:100%;padding:2px}.profile-symbol .publisher-nameplate{font-size:11px}.index-logo .publisher-nameplate{font-size:6px}.course-publisher .publisher-nameplate{font-size:9px;background:white;border-radius:3px}'''
 soup.head.append(style)
 EXPORT.write_text(str(soup),encoding='utf-8')
 remotes=[x.get('src','') for x in soup.find_all('img') if not x.get('src','').startswith('data:')]
 if remotes:
  raise RuntimeError('External or relative image dependencies remain: '+repr(remotes[:5]))
 AUDIT.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
 counts={k:sum(r['status']==k for r in report) for k in sorted(set(r['status'] for r in report))}
 print(json.dumps({'providers':len(report),'replaced':replaced,'counts':counts,'out_html':str(EXPORT),'images':len(soup.find_all('img')),'unresolved':[x['name'] for x in report if x['status']=='missing-verified-artwork']},ensure_ascii=False))
 if os.environ.get('ATLAS_MAKE_PDF')=='1':
  pdf=ROOT/'Coursera_Atlas_2026_Masterpiece.pdf'
  try:
   from playwright.sync_api import sync_playwright
   with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
    page=browser.new_page(viewport={'width':1300,'height':1000},device_scale_factor=1)
    page.goto(EXPORT.as_uri(),wait_until='load',timeout=90000)
    page.emulate_media(media='print')
    page.pdf(path=str(pdf),format='A4',print_background=True,prefer_css_page_size=True,margin={'top':'0','right':'0','bottom':'0','left':'0'},timeout=300000)
    browser.close()
   print('PDF rendered',str(pdf),pdf.stat().st_size)
  except Exception as e:print('PDF render error',repr(e));sys.exit(2)

if __name__=='__main__':build()