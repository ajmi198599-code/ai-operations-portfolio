import json,re
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).parent
RESULT=[]
def read(name):return (ROOT/name).read_text()
def mount(page, html, css, js, lang):
    html=re.sub(r'<script\b[^>]*>.*?</script>','',html,flags=re.I|re.S)
    html=re.sub(r'<link\b[^>]*>','',html,flags=re.I|re.S)
    page.set_content(html)
    page.add_style_tag(content=css)
    page.evaluate('''() => { history.replaceState=()=>{} }''')
    page.add_script_tag(content=js)
    if lang=='ar':
        page.locator('.lang-switch' if 'class="lang-switch"' in html else '.locale').click()
    page.evaluate('document.fonts.ready')

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-gpu'])
    for lang in ['en','ar']:
        for w,h in [(1440,900),(768,1024),(390,844),(360,780),(320,700)]:
            page=browser.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
            errors=[];page.on('pageerror',lambda e: errors.append(str(e)))
            mount(page,read('index.html'),read('styles.css'),read('app.js'),lang)
            page.wait_for_timeout(125)
            m=page.evaluate('''() => ({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,dir:document.documentElement.dir,lang:document.documentElement.lang,projects:document.querySelectorAll('.project-card').length,contact:document.querySelector('.contact-orb').getAttribute('href'),link:document.querySelector('.project-actions .case-link').getAttribute('href')})''')
            assert m['scroll']<=m['client']+1,(lang,w,m)
            assert m['lang']==lang and m['dir']==('rtl' if lang=='ar' else 'ltr'),m
            assert m['projects']==4 and m['contact'].startswith('mailto:'),m
            assert m['link']==f'./work/jeddah-port/?lang={lang}',m
            assert not errors,(w,lang,errors)
            if w in (1440,390):page.screenshot(path=str(ROOT/f'v2-{lang}-{w}.png'),full_page=True)
            RESULT.append(dict(page='home',lang=lang,width=w,passed=True))
            page.close()
    for slug in ['jeddah-port','beyond-reality','the-tea','cadence']:
      for lang in ['en','ar']:
        page=browser.new_page(viewport={'width':390 if lang=='ar' else 1440,'height':850})
        errors=[];page.on('pageerror',lambda e: errors.append(str(e)))
        mount(page,read(f'work/{slug}/index.html'),read('case.css'),read('case.js'),lang)
        m=page.evaluate('''() => ({lang:document.documentElement.lang,dir:document.documentElement.dir,w:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelector('h1').textContent,next:document.querySelector('[data-next]').getAttribute('href'),back:document.querySelector('[data-home]').getAttribute('href')})''')
        assert m['scroll']<=m['w']+1,(slug,lang,m)
        assert m['lang']==lang and m['dir']==('rtl' if lang=='ar' else 'ltr'),m
        assert m['h1'],m
        assert f'lang={lang}' in m['next'] and f'lang={lang}' in m['back'],m
        assert not errors,(slug,lang,errors)
        if slug=='jeddah-port':page.screenshot(path=str(ROOT/f'case-{lang}-{m["w"]}.png'),full_page=True)
        RESULT.append(dict(page='case',slug=slug,lang=lang,passed=True))
        page.close()
    page=browser.new_page(viewport={'width':390,'height':844})
    mount(page,read('index.html'),read('styles.css'),read('app.js'),'en')
    page.locator('.filter[data-filter="experience"]').click(); assert page.locator('.project-card').count()==1
    page.locator('.filter[data-filter="all"]').click(); assert page.locator('.project-card').count()==4
    page.get_by_role('button',name='Explore case study: Beyond Reality').first.click();assert page.locator('#case-dialog').evaluate('(n)=>n.open')
    assert 'work/beyond-reality/?lang=en' in page.locator('.case-action a').first.get_attribute('href')
    page.keyboard.press('Escape');assert not page.locator('#case-dialog').evaluate('(n)=>n.open')
    page.locator('.lang-switch').click(); assert page.locator('html').get_attribute('dir')=='rtl'
    page.locator('.lens[data-lens="business"]').focus();page.keyboard.press('ArrowLeft');assert page.locator('.lens[data-lens="experience"]').get_attribute('aria-selected')=='true'
    page.locator('.menu-toggle').click();assert page.locator('#mobile-menu').is_visible()
    page.locator('#mobile-menu a').first.click();assert not page.locator('#mobile-menu').is_visible()
    assert page.locator('.contact-orb').get_attribute('href').startswith('mailto:')
    RESULT.append(dict(page='interaction',passed=True,tests=['filters','modal','escape','keyboard RTL','language','navigation','mailto']))
    page.close();browser.close()
(ROOT/'qa-results-v2.json').write_text(json.dumps(RESULT,ensure_ascii=False,indent=2))
print(json.dumps({'passed':len(RESULT),'types':sorted(set(x['page'] for x in RESULT)),'detailPages':len([r for r in RESULT if r['page']=='case'])},indent=2))