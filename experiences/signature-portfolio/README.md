# Mohammed Alajmi — Signature Portfolio, v4

A bilingual personal portfolio for **Digital Intelligence & Experience Design**, emphasizing evidence and honest case-study presentation rather than stock images or simulated dashboards.

## Changes in v4

- Removed stock hero imagery, unrelated photographs from project cards, and stock imagery from all four case studies.
- Replaced hero art with substantive business/design/engineering focus areas.
- Removed the duplicate process section and replaced the tabbed explanation with concise, readable static content.
- Replaced decorative About section photography with an experience-led editorial statement.
- Added explicit *verified screenshot slots*: actual screenshots can be added without recreating layout, but an unverified image is never substituted.
- Retained English/Arabic RTL, separate case-study URLs, interactive filters, quick views, contact, and real deployment links.

## Run locally

```sh
python3 -m http.server 4173
```

Open `/` for English, `/?lang=ar` for Arabic, and `/work/<slug>/` for case studies.

## Testing

Run `python test_v4.py` in an environment with Chromium and Playwright installed. Local browser test injection is used where browser networking to local files is restricted.

## Evidence policy

**No photographs of strangers and no illustrative dashboards are presented as work.** Project title treatments are simple typographic placeholders, not screenshots. The work links point to the actual Vercel deployments recorded in the user's connected account; anonymous accessibility of each deployment must be verified independently. In a future content pass, authentic captured screens from real deployments can be added to `assets/captures/` and listed in the `verifiedCaptures` object in `app.js`.

Do not claim business KPIs or performance results unless measured. Review client permissions before publishing any identifiable customers or proprietary business data.