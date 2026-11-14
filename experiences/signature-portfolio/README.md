# Mohammed Alajmi — Signature Portfolio

A real, accessible, bilingual, responsive portfolio website written in semantic HTML, CSS and JavaScript, with zero runtime dependencies. Built independently of the older `ai-operations-portfolio` app.

## Development

```bash
python3 -m http.server 4173
# Visit http://localhost:4173
```

The site uses `index.html`, `styles.css`, and `app.js` in the same folder.

## Features

- English and Arabic with genuine `lang` and `dir` changes; selection persists via URL `?lang=ar` or `?lang=en`.
- Four project case studies with honest status labels and GitHub/Vercel references.
- Project category filters, case-study dialog with URL-aware deep links, business/design/engineering tabs.
- Semantic landmark and heading structure, visible focus states, keyboard operation, reduced-motion support.
- Mobile navigation, accessible contrast, responsive CSS, no third-party JavaScript, no false performance or ROI metrics.

## Content accuracy / launch notes

Project links are sourced from deployment records but **public anonymous access and user-function tests remain to be verified**. The styled project visuals are **illustrative coded interface compositions**, not authenticated screenshots. Contact CTA currently uses a verified GitHub profile pending an approved public contact email and LinkedIn URL. Add authentic screenshots after capturing and checking the actual deployments.

## Deployment

Static output: no build command required, framework preset `Other`, root directory `experiences/signature-portfolio` when deploying from the parent monorepo. The fallback route loads `index.html` with query-string language selection.

## Testing

Use a local browser with 1440px desktop, 390px and 360px mobile, and RTL layout; verify no horizontal overflow, filter behaviour, modal keyboard support, and reduced motion. Re-run after replacing project visuals or copy.