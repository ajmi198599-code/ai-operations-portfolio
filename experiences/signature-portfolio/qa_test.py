import asyncio,json,re,os
from pathlib import Path
ROOT = Path(__file__).resolve().parent
from playwright.async_api import async_playwright

async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True,executable_path=('/usr/bin/chromium' if Path('/usr/bin/chromium').exists() else None),args=['--no-sandbox','--disable-gpu'])
  results=[]
  html=open(str(ROOT/'index.html')).read();css=open(str(ROOT/'styles.css')).read();js=open(str(ROOT/'app.js')).read()
  html=re.sub(r'<script defer src="\./app\.js"></script>','',html)
  html=re.sub(r'<link[^>]*>', '',html)
  async def mount(page,lang):
   await page.set_content(html)
   await page.add_style_tag(content=css)
   await page.evaluate("() => {history.replaceState = () => {}; window.__errors=[];}")
   await page.add_script_tag(content=js)
   if lang=='ar': await page.locator('.lang-switch').click()
  for lang in ['en','ar']:
   for width,height in [(1440,900),(390,844),(360,760)]:
    page=await browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
    errors=[]
    page.on('pageerror',lambda err: errors.append(str(err)))
    await mount(page,lang)
    await page.wait_for_timeout(400)
    metrics=await page.evaluate('''() => ({lang:document.documentElement.lang,dir:document.documentElement.dir,overflow:document.documentElement.scrollWidth>window.innerWidth+1,scrollWidth:document.documentElement.scrollWidth,viewport:window.innerWidth,cards:document.querySelectorAll('.project-card').length,heroH:document.querySelector('#hero-heading').getBoundingClientRect().height,heroFont:getComputedStyle(document.querySelector('#hero-heading')).fontSize})''')
    # screenshot available separately; skip in fast regression suite
    assert metrics['cards']==4,metrics
    assert metrics['dir']==('rtl' if lang=='ar' else 'ltr'),metrics
    assert not metrics['overflow'],metrics
    assert not errors,errors
    results.append({'lang':lang,'width':width,'metrics':metrics,'errors':errors})
    await page.close()
  page=await browser.new_page(viewport={'width':1440,'height':900})
  await mount(page,'en')
  await page.locator('.filter[data-filter="intelligence"]').click()
  assert await page.locator('.project-card').count()==1
  await page.locator('.filter[data-filter="all"]').click()
  await page.get_by_role('button',name='Explore case study: Jeddah Port Intelligence').first.click()
  assert await page.locator('#case-dialog').evaluate('(el)=>el.open')
  await page.keyboard.press('Escape')
  assert not await page.locator('#case-dialog').evaluate('(el)=>el.open')
  await page.locator('.lens[data-lens="experience"]').click()
  assert 'Make complexity approachable' in await page.locator('#lens-title').inner_text()
  await page.locator('.lang-switch').click()
  assert await page.locator('html').get_attribute('dir')=='rtl'
  # URL update is unavailable in the sandboxed about:blank visual test.
  results.append({'functional':'passed','filter':True,'case_dialog':True,'escape':True,'lens':True,'locale_switch':True})
  mobile=await browser.new_page(viewport={'width':390,'height':844})
  await mount(mobile,'ar')
  await mobile.locator('.menu-toggle').click()
  assert await mobile.locator('.menu-toggle').get_attribute('aria-expanded')=='true'
  await mobile.locator('#mobile-menu a').first.click()
  assert await mobile.locator('.menu-toggle').get_attribute('aria-expanded')=='false'
  results.append({'mobile_nav':'passed'})
  await browser.close()
  print(json.dumps(results,ensure_ascii=False,indent=2))

asyncio.run(main())