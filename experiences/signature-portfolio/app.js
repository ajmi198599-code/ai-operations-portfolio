/* Mohammed Alajmi — Signature Portfolio
   Hand-authored UI: no synthetic metrics and no unverified screenshots. */
(() => {
  'use strict';
  const params = new URLSearchParams(window.location.search);
  let language = params.get('lang') === 'ar' ? 'ar' : 'en';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const copy = {
    en: {
      brand: 'MOHAMMED ALAJMI', identityShort: 'DIGITAL INTELLIGENCE / EXPERIENCE',
      navWork: 'Work', navPractice: 'Practice', navAbout: 'About', navContact: 'Contact', getInTouch: 'Get in touch',
      heroEyebrow: 'INDEPENDENT DIGITAL PRACTICE · JEDDAH', heroLine1: 'Intelligence,', heroLine2: 'made tangible.',
      heroLead: 'I design experiences that make complex information useful — bringing together business intelligence, AI, and human-centred digital design.',
      viewWork: 'Explore selected work', myStory: 'The story behind my work', signatureLabel: 'THINK CLEARLY. DESIGN DELIBERATELY.',
      heroFoot: 'ANALYTICAL THINKING / INTELLIGENT PRODUCTS / EXPERIENCE DESIGN', scroll: 'SCROLL TO EXPLORE',
      introStatement: 'The most interesting solutions are not merely built. They are <em>understood, shaped, and made intuitive.</em>',
      workEyebrow: 'THE WORK / SELECTED PROJECTS', workTitle: 'Selected work<span class="accent-stop">.</span>',
      workIntro: 'A deliberate selection of experiments and working digital products — each with a different problem to solve.',
      filterAll: 'All work', filterIntelligence: 'Intelligence', filterExperience: 'Experience', filterProducts: 'Digital products',
      workFootnote: 'Explore the thinking behind each project, the design decisions that shaped it, and the evidence still being verified.',
      practiceEyebrow: 'WHAT I BRING TO THE TABLE', practiceTitle: 'One practice.<br>Three perspectives.',
      practiceIntro: 'I connect commercial questions, human needs, and technical delivery — rather than treating them as separate disciplines.',
      lensBusiness: 'Business understanding', lensExperience: 'Experience design', lensEngineering: 'Engineering mindset', lensPanelLabel: 'THE PERSPECTIVE',
      methodEyebrow: 'HOW I WORK', methodTitle: 'Clarity is a process<span class="accent-stop">.</span>',
      methodIntro: 'The work is iterative: understand, experiment, build, verify, then refine.',
      aboutEyebrow: 'THE PERSON BEHIND THE WORK', aboutTitle: 'Experience in operations. Curiosity in technology.',
      aboutLead: 'My path into digital design began with an understanding of real-world operations: people, processes, responsibilities, and decisions.',
      aboutBody: 'That background now informs how I approach data analytics, AI-assisted solutions and interactive products. I value thoughtful questions, purposeful design and the discipline to test what we build.',
      aboutLocation: 'Based in Jeddah, Saudi Arabia', aboutLanguage: 'Working in Arabic & English', githubExplore: 'Explore my GitHub',
      contactTitle: 'The next good idea<br>starts with a conversation.',
      contactDesc: 'Exploring a challenge, a collaboration or a new professional opportunity? I’d be glad to connect.',
      connectLabel: 'EMAIL ME', connectLinkedin: 'Connect on LinkedIn', resumeRequest: 'Request my professional résumé', readFullCase: 'Read full case study', openLiveDemo: 'Visit project', proofLabel: 'See the detailed work', footerLine: 'Thoughtfully designed. Continually improving.', backToTop: 'BACK TO TOP ↑',
      footerCopyright: 'All rights reserved.', status: 'DEPLOYMENT RECORDED', viewCase: 'Explore case study', projectLink: 'Open recorded deployment',
      publicNote: 'Public access and end-to-end functionality have not been independently confirmed.',
      projectHeading: 'The project', challenge: 'The challenge', approach: 'Design approach', implementation: 'Implementation focus',
      verification: 'Verification status', limitations: 'Still to validate', linkDisclaimer: 'External deployment may require sign-in or be unavailable.',
      caseBack: 'Back to selected work', noteLabel: 'EDITORIAL PHOTO — NOT A PROJECT SCREENSHOT',
      lensContent: {
        business: { title: 'Start with the real problem.', description: 'Understand the stakeholders, operational constraints, and decisions an experience should support — before deciding what it should look like.', tags: ['Problem framing', 'Decision value', 'Evidence'] },
        experience: { title: 'Make complexity approachable.', description: 'Design clear navigation, readable hierarchies, and calm interactions so people can accomplish something useful without learning the interface first.', tags: ['Information architecture', 'Accessibility', 'User journeys'] },
        engineering: { title: 'Build what can be verified.', description: 'Translate intentions into reliable interactions, responsive interfaces and documented tests. Be precise about what works and what remains experimental.', tags: ['Implementation', 'Performance', 'Quality assurance'] }
      },
      methods: [
        ['01', 'Understand', 'Define the question. Understand the user, business context, and constraints.'],
        ['02', 'Shape', 'Explore solutions, structure information, and design useful interactions.'],
        ['03', 'Build & validate', 'Implement, check accessibility and performance, then refine based on evidence.']
      ]
    },
    ar: {
      brand: 'محمد العجمي', identityShort: 'الذكاء الرقمي / تصميم التجارب',
      navWork: 'الأعمال', navPractice: 'المنهج', navAbout: 'نبذة عني', navContact: 'التواصل', getInTouch: 'لنتواصل',
      heroEyebrow: 'ممارسة رقمية مستقلة · جدة', heroLine1: 'من الذكاء', heroLine2: 'إلى أثر ملموس.',
      heroLead: 'أصمم تجارب تجعل المعلومات المعقدة مفيدة، وأجمع بين ذكاء الأعمال والذكاء الاصطناعي والتصميم الذي يضع الإنسان أولًا.',
      viewWork: 'استكشف الأعمال', myStory: 'اكتشف قصتي', signatureLabel: 'تفكير واضح. تصميم مدروس.',
      heroFoot: 'تفكير تحليلي / منتجات ذكية / تصميم التجارب', scroll: 'استكشف الأعمال',
      introStatement: 'الحلول المميزة لا تُبنى فقط، بل تبدأ <em>بالفهم، ثم تتشكل بعناية، وتصبح سهلة الاستخدام.</em>',
      workEyebrow: 'أعمال ومنتجات مختارة', workTitle: 'أعمال مختارة<span class="accent-stop">.</span>',
      workIntro: 'مجموعة منتقاة من التجارب والمنتجات الرقمية، لكل منها تحدٍّ مختلف نحاول معالجته.',
      filterAll: 'جميع الأعمال', filterIntelligence: 'الذكاء والتحليلات', filterExperience: 'التجارب', filterProducts: 'المنتجات الرقمية',
      workFootnote: 'تعرّف على تحديات كل مشروع وخيارات التصميم وحالة التحقق من المخرجات.',
      practiceEyebrow: 'ما أقدمه من خبرات', practiceTitle: 'منهج واحد.<br>ثلاث زوايا.',
      practiceIntro: 'أربط متطلبات الأعمال واحتياجات المستخدمين والتطبيق التقني، بدلًا من النظر إليها كتخصصات منفصلة.',
      lensBusiness: 'فهم الأعمال', lensExperience: 'تصميم التجارب', lensEngineering: 'منهج هندسي', lensPanelLabel: 'زاوية النظر',
      methodEyebrow: 'طريقة العمل', methodTitle: 'الوضوح يبدأ بمنهج<span class="accent-stop">.</span>',
      methodIntro: 'نفهم ونجرّب ونبني ونتحقق، ثم نُحسن باستمرار.',
      aboutEyebrow: 'عن الشخص خلف الأعمال', aboutTitle: 'خبرة تشغيلية. وشغف بالتقنية.',
      aboutLead: 'بدأ اهتمامي بالتصميم الرقمي من فهم الواقع التشغيلي: الأشخاص، والعمليات، والمسؤوليات، والقرارات.',
      aboutBody: 'واليوم أستفيد من هذه الخبرة في تحليل البيانات والحلول المدعومة بالذكاء الاصطناعي والمنتجات التفاعلية. أؤمن بأهمية الأسئلة الجيدة والتصميم الهادف والتحقق مما نبنيه.',
      aboutLocation: 'مقيم في جدة، المملكة العربية السعودية', aboutLanguage: 'أعمل بالعربية والإنجليزية', githubExplore: 'تصفح حسابي على GitHub',
      contactTitle: 'الفكرة الجيدة التالية<br>تبدأ بحوار.',
      contactDesc: 'هل لديك تحدٍ أو فرصة تعاون أو دور مهني؟ يسعدني التواصل ومناقشة الأفكار.',
      connectLabel: 'راسلني', connectLinkedin: 'تواصل عبر لينكدإن', resumeRequest: 'اطلب سيرتي الذاتية المهنية', readFullCase: 'اقرأ دراسة الحالة الكاملة', openLiveDemo: 'زيارة المشروع', proofLabel: 'اكتشف تفاصيل المشروع', footerLine: 'تصميم مدروس. وتطوير مستمر.', backToTop: 'العودة للأعلى ↑',
      footerCopyright: 'جميع الحقوق محفوظة.', status: 'توجد نسخة منشورة', viewCase: 'اقرأ دراسة الحالة', projectLink: 'افتح رابط النشر',
      publicNote: 'لم يُتحقق بعد بشكل مستقل من الإتاحة العامة واختبارات الوظائف الكاملة.',
      projectHeading: 'عن المشروع', challenge: 'التحدي', approach: 'المعالجة التصميمية', implementation: 'نطاق التنفيذ',
      verification: 'حالة التحقق', limitations: 'ما تبقى للتحقق', linkDisclaimer: 'قد يتطلب رابط النشر تسجيل الدخول أو لا يكون متاحًا للجميع.',
      caseBack: 'العودة إلى الأعمال', noteLabel: 'صورة فوتوغرافية توضيحية — ليست لقطة من المشروع',
      lensContent: {
        business: { title: 'ابدأ بالمشكلة الحقيقية.', description: 'افهم أصحاب المصلحة والقيود التشغيلية والقرارات التي ينبغي أن تدعمها التجربة قبل اختيار الشكل البصري.', tags: ['تحديد المشكلة', 'قيمة القرار', 'البيانات'] },
        experience: { title: 'اجعل التعقيد مفهومًا.', description: 'صمّم تنقلًا واضحًا وتسلسلًا بصريًا مقروءًا وتفاعلات هادئة تساعد المستخدم دون أن تفرض عليه تعلم الواجهة.', tags: ['بنية المعلومات', 'إمكانية الوصول', 'رحلة المستخدم'] },
        engineering: { title: 'ابنِ شيئًا يمكن اختباره.', description: 'حوّل الأفكار إلى واجهات وتفاعلات موثوقة ومتجاوبة، مع توثيق ما يعمل بالفعل وما يزال تجريبيًا.', tags: ['التنفيذ', 'الأداء', 'ضمان الجودة'] }
      },
      methods: [
        ['٠١', 'الفهم', 'حدّد السؤال وافهم المستخدم وسياق العمل والقيود.'],
        ['٠٢', 'التصميم', 'استكشف الحلول ونظّم المعلومات وصمّم التفاعلات المفيدة.'],
        ['٠٣', 'البناء والتحقق', 'نفّذ واختبر الوصول والأداء وحسّن بناءً على الأدلة.']
      ]
    }
  };
  const projects = [
    {
      id: 'jeddah-port', name: 'Jeddah Port Intelligence', year: '2026', category: 'intelligence', index: '01',
      theme: 'port', labels: { en: 'BUSINESS INTELLIGENCE · MARITIME', ar: 'ذكاء الأعمال · الخدمات البحرية' },
      summary: { en: 'Exploring how maritime and supply-chain information can be shaped into a clearer executive decision experience.', ar: 'استكشاف تحويل بيانات الموانئ وسلاسل الإمداد إلى تجربة أوضح لدعم قرارات الإدارة.' },
      challenge: { en: 'Executive audiences need a coherent way to interpret complex maritime, logistics and investment questions without losing the underlying context.', ar: 'تحتاج القيادات إلى وسيلة مترابطة لفهم قضايا النقل البحري والخدمات اللوجستية والاستثمار دون فقدان السياق.' },
      approach: { en: 'Build a structured editorial narrative around the decisions first, and then give each analytical view an explicit purpose.', ar: 'بناء سرد تحليلي منظم يبدأ بالقرارات المطلوبة، مع توضيح وظيفة كل مخطط وعرض.' },
      implementation: { en: 'A multi-iteration web intelligence concept with deployed builds under the Jeddah Port Intelligence name.', ar: 'مفهوم منصة ذكاء رقمية عبر إصدارات متعددة توجد لها سجلات نشر باسم Jeddah Port Intelligence.' },
      limitations: { en: 'Source attribution, all numerical claims, mobile visual QA and anonymous public access must be confirmed before it is presented as a finished analytical product.', ar: 'يلزم التحقق من مصادر البيانات وجميع الأرقام وجودة الجوال وإتاحة الوصول العام قبل عرضه كمنتج تحليلي مكتمل.' },
      url: 'https://jeddah-port-intelligence-edition-5puz79ln2.vercel.app/'
    },
    {
      id: 'beyond-reality', name: 'Beyond Reality', year: '2026', category: 'experience', index: '02',
      theme: 'reality', labels: { en: 'IMMERSIVE EXPERIENCE · 3D WEB', ar: 'تجربة غامرة · ويب ثلاثي الأبعاد' },
      summary: { en: 'An interactive showroom experiment exploring smooth navigation, believable spatial design and intuitive product discovery.', ar: 'تجربة معرض تفاعلي تستكشف التنقل السلس والتصميم المكاني الواقعي واستعراض المنتجات بسهولة.' },
      challenge: { en: 'Make a 3D shopping environment feel approachable and useful instead of visually impressive but difficult to navigate.', ar: 'جعل بيئة تسوق ثلاثية الأبعاد مفهومة وسهلة بدلًا من أن تكون مبهرة بصريًا وصعبة التنقل.' },
      approach: { en: 'Treat realism, legible controls and mobile ease of use as product requirements — not decorative extras.', ar: 'اعتبار الواقعية ووضوح التحكم وسهولة الاستخدام بالجوال متطلبات أساسية وليست إضافات شكلية.' },
      implementation: { en: 'A staged development process with a recorded Sprint 03.1 showroom deployment and verification documentation in GitHub.', ar: 'تطوير على مراحل مع سجل نشر للمعرض في المرحلة 03.1 ووثائق تحقق ضمن المستودع.' },
      limitations: { en: 'Real-device performance, three-product interaction verification and independent anonymous browser access remain to be checked.', ar: 'لا يزال التحقق من أداء الأجهزة الفعلية وتفاعل المنتجات الثلاثة والوصول العام عبر المتصفح مطلوبًا.' },
      url: 'https://beyond-reality-technology-showroom-nh5j5ik6m.vercel.app/'
    },
    {
      id: 'the-tea', name: 'THE TEA / ذا شاهي', year: '2026', category: 'product', index: '03',
      theme: 'tea', labels: { en: 'COMMERCIAL EXPERIENCE · BILINGUAL', ar: 'تجربة تجارية · ثنائية اللغة' },
      summary: { en: 'A mobile-first tea-shop landing experience balancing local brand personality, bilingual content and clear customer journeys.', ar: 'تجربة صفحة هبوط لمحل شاي توازن بين الهوية المحلية واللغتين ومسار العميل الواضح.' },
      challenge: { en: 'Help visitors understand the brand and move easily between its content on a mobile screen.', ar: 'مساعدة الزائر في فهم العلامة والتنقل بسهولة بين محتواها على الجوال.' },
      approach: { en: 'Use intentional type, a restrained palette, readable Arabic and English, authentic business imagery and clear calls to action.', ar: 'استخدام خطوط واضحة وألوان منضبطة ومحتوى عربي وإنجليزي وصور أصلية ودعوات واضحة للتفاعل.' },
      implementation: { en: 'A production deployment is recorded for the tea-shop site, including a merged fix to the bilingual logo and header spacing.', ar: 'يوجد سجل نشر إنتاجي للموقع مع دمج إصلاح لتباعد الشعار والعنوان في الواجهة ثنائية اللغة.' },
      limitations: { en: 'Confirm the final public alias, image permissions and full mobile interaction quality before publishing a client case study.', ar: 'يلزم تأكيد الرابط النهائي العام وحقوق الصور وجودة التفاعل على الجوال قبل نشر دراسة الحالة التجارية.' },
      url: 'https://the-tea-jeddah.vercel.app/'
    },
    {
      id: 'cadence', name: 'Cadence English Studio', year: '2026', category: 'product', index: '04',
      theme: 'cadence', labels: { en: 'LEARNING PRODUCT · INTERACTIVE UX', ar: 'منتج تعليمي · تجربة تفاعلية' },
      summary: { en: 'A bilingual language-practice concept for British pronunciation, guided repetition and practical professional conversation.', ar: 'تجربة تدريب لغوية ثنائية اللغة للنطق البريطاني والتكرار الموجه والمحادثات المهنية.' },
      challenge: { en: 'Move pronunciation practice beyond passive reading into guided, repeatable interactions with meaningful feedback.', ar: 'نقل التدريب على النطق من القراءة السلبية إلى التمرين والتكرار والتغذية الراجعة.' },
      approach: { en: 'Present short exercises, clear recording controls, visible practice state and a calm, motivating interface.', ar: 'تقديم تمارين قصيرة وتحكم واضح بالتسجيل وحالة تدريب ظاهرة وتجربة مشجعة وهادئة.' },
      implementation: { en: 'A Cadence 1.1 production build is recorded, with recent changes addressing audio playback, microphone flow and recording feedback.', ar: 'يوجد نشر إنتاجي للإصدار 1.1 مع تعديلات تتعلق بالصوت والميكروفون وملاحظات التسجيل.' },
      limitations: { en: 'Microphone and speech-recognition permissions vary by browser. End-to-end audio tests are still required on real devices.', ar: 'تختلف صلاحيات الميكروفون والتعرف على الكلام بحسب المتصفح، وتبقى اختبارات الصوت على أجهزة فعلية مطلوبة.' },
      url: 'https://cadence-english-studio-59cybm68t-mohammed-ajmis-projects.vercel.app/'
    }
  ];

  const translations = copy[language];
  const staticMarkupKeys = new Set(['introStatement', 'workTitle', 'practiceTitle', 'methodTitle', 'contactTitle']);
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  function label(id) { return copy[language][id]; }
  function translate() {
    const isAr = language === 'ar';
    document.documentElement.lang = language;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.title = (isAr ? 'محمد العجمي — مصمم حلول الذكاء الرقمي وتجارب المستخدم' : 'Mohammed Alajmi — Digital Intelligence & Experience Designer');
    document.querySelector('meta[name="description"]').content = isAr
      ? 'محمد العجمي: الذكاء الرقمي وتصميم التجارب. استكشف مشاريع ذكاء الأعمال والذكاء الاصطناعي والتجارب الرقمية.'
      : 'Mohammed Alajmi — Digital Intelligence & Experience Designer. Selected work in business intelligence, AI solutions, and thoughtful digital experiences.';
    $$('[data-copy]').forEach(el => {
      const key = el.dataset.copy;
      if (copy[language][key] === undefined) return;
      if (staticMarkupKeys.has(key)) el.innerHTML = copy[language][key];
      else el.textContent = copy[language][key];
    });
    $('.lang-current').textContent = isAr ? 'ع' : 'EN';
    $('.lang-other').textContent = isAr ? 'EN' : 'ع';
    $('.lang-switch').setAttribute('aria-label', isAr ? 'Switch to English' : 'التبديل إلى العربية');
    $('.skip-link').textContent = isAr ? 'الانتقال إلى المحتوى' : 'Skip to content';
    $('.brand').setAttribute('aria-label', isAr ? 'محمد العجمي — الرئيسية' : 'Mohammed Alajmi — home');
    $('.menu-toggle').setAttribute('aria-label', isAr ? 'فتح القائمة' : 'Open menu');
    $('.contact-orb').setAttribute('aria-label', isAr ? 'أرسل بريدًا إلكترونيًا إلى محمد' : 'Send Mohammed an email');
    $('.filters').setAttribute('aria-label', isAr ? 'تصفية المشاريع' : 'Filter projects');
    $('.lenses').setAttribute('aria-label', isAr ? 'منظورات العمل' : 'Explore design perspectives');
    $('#case-close').setAttribute('aria-label', isAr ? 'إغلاق دراسة الحالة' : 'Close case study');
    renderProjects(); renderMethods(); selectLens($('[data-lens].is-active')?.dataset.lens || 'business');
    const next = new URL(window.location.href); next.searchParams.set('lang', language);
    window.history.replaceState(window.history.state, '', next.pathname + next.search + next.hash);
    const slug = window.location.hash.match(/^#case-([a-z-]+)$/)?.[1];
    if (slug && $('#case-dialog').open) openCase(slug, false);
  }

  const realPhotos = {
    port: {src:'https://images.unsplash.com/photo-1769144256207-bc4bb75b29db?auto=format&fit=crop&w=1280&q=82', alt:'An aerial photograph of a working container terminal; editorial context, not a photograph of Jeddah Port', credit:'MARITIME CONTEXT / REAL PHOTOGRAPH'},
    reality: {src:'https://images.unsplash.com/photo-1759050486852-fdfe2fdc7bea?auto=format&fit=crop&w=1280&q=82', alt:'Real contemporary retail interior with people and warm timber; editorial context, not the 3D showroom application', credit:'RETAIL CONTEXT / REAL PHOTOGRAPH'},
    tea: {src:'https://images.unsplash.com/photo-1561267395-3783f8657ae8?auto=format&fit=crop&w=1280&q=82', alt:'A real photograph of tea being poured into a cup; editorial context, not the THE TEA website', credit:'TEA CULTURE / REAL PHOTOGRAPH'},
    cadence: {src:'https://images.unsplash.com/photo-1699665235544-583d2ad22bfe?auto=format&fit=crop&w=1280&q=82', alt:'A real photograph of a person writing beside a laptop; editorial context, not a Cadence screenshot', credit:'LEARNING / REAL PHOTOGRAPH'}
  };
  function preview(theme) {
    const photo = realPhotos[theme] || realPhotos.cadence;
    return `<span class="editorial-visual"><img src="${photo.src}" alt="${escapeHTML(photo.alt)}" loading="lazy" decoding="async" width="960" height="650"><span class="editorial-visual-label">${language === 'ar' ? 'صورة فوتوغرافية توضيحية — ليست من المشروع' : photo.credit}</span></span>`;
  }
  function renderProjects() {
    const active = $('.filter.is-active')?.dataset.filter || 'all';
    $('#project-grid').innerHTML = projects.filter(p => active === 'all' || p.category === active).map(p => `
      <article class="project-card reveal" data-project="${p.id}">
        <button class="project-image" type="button" data-open="${p.id}" aria-label="${escapeHTML(label('viewCase'))}: ${escapeHTML(p.name)}">
          ${preview(p.theme)}<span class="project-image-corner" aria-hidden="true">↗</span>
          <span class="visual-disclaimer">${escapeHTML(label('noteLabel'))}</span>
        </button>
        <div class="project-meta"><span>${escapeHTML(p.index)} / ${escapeHTML(p.labels[language])}</span><span>${p.year}</span></div>
        <div class="project-title-row"><h3>${escapeHTML(p.name)}</h3><button type="button" data-open="${p.id}" class="project-open" aria-label="${escapeHTML(label('viewCase'))}: ${escapeHTML(p.name)}">↗</button></div>
        <p class="project-summary">${escapeHTML(p.summary[language])}</p>
        <div class="project-footer"><span class="project-status"><span class="status-dot"></span>${escapeHTML(label('status'))}</span><div class="project-actions"><a class="case-link" href="./work/${p.id}/?lang=${language}">${escapeHTML(label('readFullCase'))} <span aria-hidden="true">↗</span></a><a class="project-demo" target="_blank" rel="noopener noreferrer" href="${escapeHTML(p.url)}">${escapeHTML(label('openLiveDemo'))} <span aria-hidden="true">↗</span></a></div></div>
      </article>
    `).join('');
    attachReveals($('#project-grid'));
  }

  function renderMethods() {
    $('#method-steps').innerHTML = copy[language].methods.map(([n, heading, body]) => `<article class="method-item reveal"><div class="method-top"><span class="method-num">${escapeHTML(n)}</span><span aria-hidden="true">↘</span></div><h3>${escapeHTML(heading)}</h3><p>${escapeHTML(body)}</p></article>`).join('');
    attachReveals($('#method-steps'));
  }

  function selectLens(key) {
    const item = copy[language].lensContent[key];
    if (!item) return;
    $$('.lens').forEach(tab => { const on = tab.dataset.lens === key; tab.classList.toggle('is-active', on); tab.setAttribute('aria-selected', String(on)); tab.tabIndex = on ? 0 : -1; });
    $('#lens-panel').setAttribute('aria-labelledby', 'lens-' + key);
    $('#lens-title').textContent = item.title; $('#lens-desc').textContent = item.description;
    $('#lens-tags').innerHTML = item.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('');
  }

  function renderCase(p) {
    const ar = language === 'ar';
    return `<div class="case-kicker">${escapeHTML(p.index)} / ${escapeHTML(p.labels[language])} · ${p.year}</div>
      <h2 id="case-title">${escapeHTML(p.name)}</h2>
      <p class="case-deck">${escapeHTML(p.summary[language])}</p>
      <div class="case-visual case-visual-${p.theme}">${preview(p.theme)}<span class="case-visual-note">${escapeHTML(label('noteLabel'))}</span></div>
      <div class="case-status"><span class="status-dot" aria-hidden="true"></span><span>${escapeHTML(label('status'))}</span><p>${escapeHTML(label('publicNote'))}</p></div>
      <div class="case-details">
        <section><span>01 — ${escapeHTML(label('challenge'))}</span><p>${escapeHTML(p.challenge[language])}</p></section>
        <section><span>02 — ${escapeHTML(label('approach'))}</span><p>${escapeHTML(p.approach[language])}</p></section>
        <section><span>03 — ${escapeHTML(label('implementation'))}</span><p>${escapeHTML(p.implementation[language])}</p></section>
        <section><span>04 — ${escapeHTML(label('limitations'))}</span><p>${escapeHTML(p.limitations[language])}</p></section>
      </div>
      <div class="case-action"><div class="case-cta-row"><a href="./work/${p.id}/?lang=${language}">${escapeHTML(label('readFullCase'))} <span aria-hidden="true">↗</span></a><a target="_blank" rel="noopener noreferrer" href="${escapeHTML(p.url)}">${escapeHTML(label('openLiveDemo'))} <span aria-hidden="true">↗</span></a></div><p>${escapeHTML(label('linkDisclaimer'))}</p></div>
      <button class="case-back" type="button" data-close-case>← ${escapeHTML(label('caseBack'))}</button>`;
  }

  let lastCaseTrigger = null;
  function openCase(slug, updateURL = true) {
    const p = projects.find(project => project.id === slug);
    if (!p) return;
    $('#case-content').innerHTML = renderCase(p);
    const dialog = $('#case-dialog');
    if (!dialog.open) dialog.showModal();
    else $('.case-shell').scrollTop = 0;
    if (updateURL) history.replaceState(null, '', '#case-' + slug);
    $('#case-close').focus();
  }
  function closeCase(updateURL = true) {
    if ($('#case-dialog').open) $('#case-dialog').close();
    if (updateURL && location.hash.startsWith('#case-')) history.replaceState(null, '', '#work');
    if (lastCaseTrigger && lastCaseTrigger.isConnected) lastCaseTrigger.focus();
  }

  function attachReveals(root = document) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      $$('.reveal', root).forEach(el => el.classList.add('is-visible'));
      return;
    }
    $$('.reveal', root).forEach(el => observer.observe(el));
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }
  }, { threshold: 0.07, rootMargin: '0px 0px 40px 0px' }) : { observe() {} };

  function closeMobileNav() {
    const nav = $('#mobile-menu'); nav.hidden = true;
    const toggle = $('.menu-toggle'); toggle.setAttribute('aria-expanded', 'false'); toggle.classList.remove('open');
  }
  $('.menu-toggle').addEventListener('click', () => {
    const nav = $('#mobile-menu'); const open = nav.hidden;
    nav.hidden = !open; $('.menu-toggle').classList.toggle('open', open); $('.menu-toggle').setAttribute('aria-expanded', String(open));
  });
  $$('#mobile-menu a').forEach(a => a.addEventListener('click', closeMobileNav));
  $('.lang-switch').addEventListener('click', () => { language = language === 'en' ? 'ar' : 'en'; translate(); closeMobileNav(); });
  $$('.filter').forEach(button => button.addEventListener('click', () => {
    $$('.filter').forEach(other => {const on = other === button; other.classList.toggle('is-active', on); other.setAttribute('aria-pressed', String(on));});
    renderProjects();
  }));
  $$('.lens').forEach(button => {
    button.addEventListener('click', () => selectLens(button.dataset.lens));
    button.addEventListener('keydown', event => {
      if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const tabs = $$('.lens'); const index = tabs.indexOf(button);
      const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length-1 : (index + (event.key === 'ArrowRight' ? (document.dir === 'rtl' ? -1 : 1) : (document.dir === 'rtl' ? 1 : -1)) + tabs.length) % tabs.length;
      tabs[nextIndex].focus(); selectLens(tabs[nextIndex].dataset.lens);
    });
  });
  document.addEventListener('click', event => {
    const opener = event.target.closest('[data-open]');
    if (opener) { lastCaseTrigger = opener; openCase(opener.dataset.open); }
    if (event.target.closest('[data-close-case]')) closeCase();
  });
  document.addEventListener('pointerdown', event => { if (!$('#mobile-menu').hidden && !event.target.closest('.site-header')) closeMobileNav(); });
  $('#case-close').addEventListener('click', () => closeCase());
  $('#case-dialog').addEventListener('click', event => { if (event.target === $('#case-dialog')) closeCase(); });
  $('#case-dialog').addEventListener('close', () => {
    if (location.hash.startsWith('#case-')) history.replaceState(null, '', '#work');
  });
  window.addEventListener('hashchange', () => {
    const slug = location.hash.match(/^#case-([a-z-]+)$/)?.[1];
    if (slug) openCase(slug, false);
    else if ($('#case-dialog').open) closeCase(false);
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMobileNav(); }, { passive: true });
  window.addEventListener('keydown', event => { if (event.key === 'Escape') closeMobileNav(); });
  let scrolling = false;
  window.addEventListener('scroll', () => {
    if (scrolling) return; scrolling = true;
    requestAnimationFrame(() => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      $('.scroll-progress').style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
      $('.site-header').classList.toggle('has-scrolled', window.scrollY > 20);
      scrolling = false;
    });
  }, { passive: true });
  $('#year').textContent = String(new Date().getFullYear());
  translate();
  attachReveals();
  const initialCase = location.hash.match(/^#case-([a-z-]+)$/)?.[1];
  if (initialCase) openCase(initialCase, false);
})();