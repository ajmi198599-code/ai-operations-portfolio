(() => {
  'use strict';
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  const normalize = value => value === 'ar' ? 'ar' : 'en';
  function setLanguage(language, replace = true) {
    language = normalize(language);
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = document.querySelector('h1').textContent + (language === 'ar' ? ' — محمد العجمي / دراسة حالة' : ' — Mohammed Alajmi / Case Study');
    document.querySelector('.locale').textContent = language === 'ar' ? 'ع / EN' : 'EN / ع';
    document.querySelector('.locale').setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    document.querySelectorAll('[data-home]').forEach(link => link.href = '../../?lang=' + language + '#work');
    document.querySelectorAll('[data-next]').forEach(link => link.href = link.href.replace(/lang=(?:en|ar)/, 'lang=' + language));
    if(replace) {
      const url = new URL(location.href); url.searchParams.set('lang', language);
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }
  document.querySelector('.locale').addEventListener('click', () => setLanguage(root.lang === 'en' ? 'ar' : 'en'));
  setLanguage(params.get('lang'), false);
})();