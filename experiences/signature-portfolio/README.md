# Mohammed Alajmi — Signature Portfolio v2

A source-led, bilingual, responsive personal portfolio for **Digital Intelligence & Experience Design**. Built in semantic HTML, CSS and vanilla JavaScript, without runtime JS dependencies. The site is deliberately separated from the existing AI Operations app under `experiences/signature-portfolio/` in GitHub.

## Features

- Personal-signature hero and revised mobile layout, with a restrained motion system.
- English / Arabic support (`lang`, `dir`, persistent `?lang=` query) and Arabic-aware keyboard arrows in the three-perspective component.
- Four shareable, static, bilingual case-study pages under `/work/<slug>/`.
- Project filters, quick-view dialog, distinct *read case study* and *visit recorded deployment* links.
- Functional email, LinkedIn, GitHub, and a mailto résumé-request contact action (no published phone number).
- Link-preview artwork, sitemap, per-case page descriptions, semantic landmarks and focus outlines.
- Separate preview artwork that is expressly marked *illustrative*; no project screenshot or invented metric is represented as a fact.

## Local development

Open a static server from this directory:

```bash
python3 -m http.server 4173
```

Homepage: http://localhost:4173/ — Arabic: http://localhost:4173/?lang=ar

## QA

Run `python qa_v2.py` in an environment with Playwright and Chromium installed. The suite covers 320/360/390/768/1440 homepage rendering, English/Arabic case pages, dialogs, filters, RTL keyboard navigation, mobile menu, and email action. The test harness injects source into the browser when the runner restricts localhost and file URLs. It verifies layout and JavaScript behavior locally; it **does not** claim public Vercel access or real-device performance.

## Before public portfolio promotion

- Replace conceptual diagrams with actual product screenshots, authorized originals, and substantiated project evidence.
- Confirm the URL and anonymous access to every featured deployed project.
- Finalize a current resume/CV PDF before offering direct download; for now a resume-request email is provided.
- Run independent real-device Safari/Chrome tests, Lighthouse field/lab performance, and accessibility audit.
- Check that the contact email and LinkedIn profile remain approved for public use.
- Review and confirm the accuracy of every project case study.

The latest portfolio is under a review branch and should not be merged into an unrelated production app without a separate code review.