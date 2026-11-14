# Mohammed Alajmi — Signature Portfolio, v4

A bilingual personal portfolio for **Digital Intelligence & Experience Design**, emphasizing evidence and honest case-study presentation rather than stock images or simulated dashboards.

## Changes in v4

- Removed stock hero imagery, unrelated photographs from project cards, and stock imagery from all four case studies.
- Replaced hero art with substantive business/design/engineering focus areas.
- Removed the duplicate process section and replaced the tabbed explanation with concise, readable static content.
- Replaced decorative About section photography with an experience-led editorial statement.
- Added genuine browser captures of the deployed THE TEA and Beyond Reality applications, dated 14 November 2026; their original image blobs are committed to GitHub. Other work remains text-led rather than using incomplete screenshots.
- Retained English/Arabic RTL, separate case-study URLs, interactive filters, quick views, contact, and real deployment links.

## Run locally

```sh
python3 -m http.server 4173
```

Open `/` for English, `/?lang=ar` for Arabic, and `/work/<slug>/` for case studies.

## Testing

Run `python test_v4.py` in an environment with Chromium and Playwright installed. Local browser test injection is used where browser networking to local files is restricted.

## Evidence policy

**No photographs of strangers and no illustrative dashboards are presented as work.** Project title treatments are simple typographic placeholders, not screenshots. The work links point to the actual Vercel deployments recorded in the user's connected account; anonymous accessibility of each deployment must be verified independently. THE TEA and Beyond Reality captures are linked in `verifiedCaptures` in `app.js`. Jeddah Port screenshot was excluded due to incomplete rendering; Cadence capture was not successful in the headless testing environment. Public access and real-device behavior still need independent confirmation.

Do not claim business KPIs or performance results unless measured. Review client permissions before publishing any identifiable customers or proprietary business data.