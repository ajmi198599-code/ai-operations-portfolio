from pathlib import Path
import re
from playwright.sync_api import sync_playwright
import json
root=Path(__file__).resolve().parent

def inject_html(file, lang):
    html=file.read_text()
    stylesheet = (root / ('styles.css' if file == root/'index.html' else 'case.css')).read_text()
    js=(root/('app.js' if file == root/'index.html' else 'case.js')).read_text()
    html=re.sub(r'<link[^>]+fonts\.googleapis\.com[^>]*>', '', html)
    html=re.sub(r'<link[^>]+styles\.css[^>]*>', '', html)
    html=re.sub(r'<link[^>]+case\.css[^>]*>', '', html)
    html=re.sub(r'<script defer src=\"[^\"]+\"></script>', '', html)
    html=html.replace('</head>', '<style>'+stylesheet+'</style></head>')
    html=html.replace('</body>', '<script>history.replaceState=()=>{};history.pushState=()=>{};</script><script>'+js+'</script></body>')
    if lang=='ar':
        html=html.replace('<html lang="en" dir="ltr">', '<html lang="ar" dir="rtl">')
    return html
out=root/'qa';out.mkdir(exist_ok=True)
reports=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    for lang in ('en','ar'):
        for w in (320,390,768,1440):
            page=b.new_page(viewport={'width':w,'height':900},device_scale_factor=1)
            errors=[];page.on('pageerror',lambda e: errors.append(str(e)))
            page.goto('about:blank')
            page.set_content(inject_html(root/'index.html',lang),wait_until='domcontentloaded')
            if lang=='ar': page.locator('.lang-switch').click()
            page.wait_for_timeout(240)
            overflow=page.evaluate('document.documentElement.scrollWidth > innerWidth + 1')
            cardCount=page.locator('.project-card').count()
            photos=page.locator('img[src*="unsplash"]').count()
            isFocus=page.locator('.hero-focus').count()==1
            case_url=page.locator('.case-link').first.get_attribute('href')
            assert cardCount==4 and not overflow and not errors and photos==0 and isFocus,(lang,w,cardCount,overflow,errors,photos)
            assert page.locator('.about-credentials').count()==1
            page.locator('[data-filter="product"]').click()
            assert page.locator('.project-card').count()==2
            page.locator('[data-filter="all"]').click()
            assert page.locator('.project-card').count()==4
            page.locator('[data-open="jeddah-port"]').first.click()
            assert page.locator('#case-dialog').evaluate('(x) => x.open')
            page.keyboard.press('Escape')
            assert not page.locator('#case-dialog').evaluate('(x) => x.open')
            if w in (320,390):
                page.locator('.menu-toggle').click();assert page.locator('.mobile-nav').is_visible()
                page.locator('.menu-toggle').click()
            if w in (390,1440):
                page.screenshot(path=str(out/f'homepage-{lang}-{w}.png'),full_page=True,animations='disabled')
            reports.append({'route':'home','language':lang,'width':w,'cards':cardCount,'overflow':overflow,'errors':errors,'pass':True})
            page.close()
        for slug in ('jeddah-port','beyond-reality','the-tea','cadence'):
            page=b.new_page(viewport={'width':390,'height':844})
            errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            page.goto('about:blank')
            page.set_content(inject_html(root/'work'/slug/'index.html',lang),wait_until='domcontentloaded')
            if lang=='ar':page.locator('.locale').click()
            page.wait_for_timeout(80)
            assert not page.locator('.case-photo').count()
            assert not page.locator('.case-visual-section').count()
            assert page.locator('.story-block').count()>=4
            overflow=page.evaluate('document.documentElement.scrollWidth>innerWidth+1')
            assert not overflow and not errors,(slug,lang,overflow,errors)
            if lang=='ar' and slug=='the-tea':page.screenshot(path=str(out/'case-tea-ar-390.png'),full_page=True)
            reports.append({'route':slug,'language':lang,'width':390,'overflow':overflow,'errors':errors,'pass':True})
            page.close()
    b.close()
(out/'report.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2))
print(f'{len(reports)} PASS; no placeholder photos, no horizontal overflow, no page errors')