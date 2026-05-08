---
id: 20260508-lighthouse-score-improvement
title: Score & improve Lighthouse + produce SEO report
date: 2026-05-08
mode: quick (streamlined inline)
status: in-progress
---

# Quick Task: Score & improve Lighthouse, generate SEO report

## Baseline (median of 3 runs per URL, lighthouse 0.14, headless Chrome)

| URL              | Perf | A11y | BP  | SEO |
|------------------|-----:|-----:|----:|----:|
| `/`              | 86   | 85   | 100 | 92  |
| `/about`         | 86   | 100  | 100 | 92  |
| `/case-studies`  | 86   | 100  | 100 | 92  |
| `/contact`       | 85   | 100  | 100 | 92  |
| `/services`      | 86   | 100  | 100 | 92  |

Reports archived under `.planning/quick/20260508-lighthouse-score-improvement/baseline/`.

## Failing audits (weight × score impact)

**Home accessibility (15-point gap):** all four come from one component, `src/components/sections/FeatureTabsSection.vue`:

- `aria-required-children` (10w, score 0) — `<ol role="tablist">` does not have direct `tab` children
- `aria-required-parent` (10w, score 0) — `<button role="tab">` parent is `<li>`, not `tablist`
- `listitem` (7w, score 0) — `<li>` lives inside `[role="tablist"]` which is no longer a list
- `aria-allowed-role` (1w, score 0) — `<article role="tabpanel">` (article is incompatible with tabpanel per ARIA-in-HTML)

**SEO across every URL (8-point gap):**

- `robots-txt` (1w, score 0) — `/robots.txt` returns the SPA fallback HTML (no `public/robots.txt` exists). Lighthouse reports "24 errors found" parsing.

**Performance (LCP/FCP-bound on every URL):**

- `largest-contentful-paint` (25w, ~0.71–0.76)
- `first-contentful-paint` (10w, ~0.42–0.49)
- `speed-index` (10w, ~0.72–0.76)

Root contributor for the perf trio: a single render-blocking Google Fonts `<link rel="stylesheet">` in `index.html` for `Playfair Display + Sora + Inter`. `&display=swap` is already present, but the stylesheet fetch itself is parser-blocking, which delays first paint of body.

## Tasks

**Task 1 — Fix home tablist a11y (FeatureTabsSection.vue)**
- files: `src/components/sections/FeatureTabsSection.vue`
- action:
  - Template: `<ol role="tablist" class="rail">` → `<div role="tablist" class="rail">`. Remove the `<li>` wrapper; the `<button role="tab">` becomes the direct child of the tablist. Move the `:ref` callback and the `:class="{ active: i === activeIndex }"` from the `<li>` onto the button (or rely on `aria-selected` for styling — see CSS).
  - Template: `<article role="tabpanel" …>` → `<div role="tabpanel" …>`.
  - CSS: drop the `.rail-item` selector. Replace `.rail-item.active .rail-btn`, `.rail-item.active .rail-indicator`, `.rail-item.active .rail-icon` with `[aria-selected="true"]`-keyed selectors targeting `.rail-btn` itself. Move `flex-shrink: 0; scroll-snap-align: center;` from `.rail-item` onto `.rail-btn`.
  - JS: `railItemRefs` → still an `HTMLElement[]`, but bound to the button now (used only by `scrollRailItemIntoView`, which works the same).
- verify:
  - `npm run build` clean.
  - DOM at runtime: `[role="tablist"]` has direct `[role="tab"]` button children with no `<li>` between them; the panel is `<div role="tabpanel">`.
  - Visual layout unchanged (rail, indicator, active state, hover, focus ring all behave the same).
  - Keyboard nav (Arrow Up/Down/Left/Right, Home, End) still works.
  - Lighthouse: home accessibility ≥ 0.95.
- done: build green, all 4 home-a11y audits move to score 1.

**Task 2 — Add `public/robots.txt`**
- files: `public/robots.txt` (new)
- action: write a minimal valid robots.txt:
  ```
  User-agent: *
  Allow: /
  ```
- verify:
  - `dist/robots.txt` present after build.
  - Lighthouse `robots-txt` audit passes on every URL (score 1).
  - SEO category ≥ 1.0 across all pages.
- done: file present, audit passes.

**Task 3 — Make Google Fonts non-render-blocking (index.html)**
- files: `index.html`
- action: replace the single render-blocking `<link rel="stylesheet" href="…fonts…">` with the standard "preload + swap-on-load" pattern:
  - `<link rel="preload" as="style" href="…fonts…" />`
  - `<link rel="stylesheet" href="…fonts…" media="print" onload="this.media='all'" />`
  - `<noscript><link rel="stylesheet" href="…fonts…" /></noscript>` (so non-JS visitors still get the fonts)
- verify:
  - `npm run build` clean.
  - The first HTTP response is no longer parser-blocked on Google Fonts CSS.
  - Lighthouse `render-blocking-resources` opportunity drops; FCP/LCP scores improve. Targeting Perf ≥ 0.90 (median).
- done: build green, fonts still render, Lighthouse perf median ≥ baseline + 4 points.

**Task 4 — Re-run Lighthouse, write SEO-REPORT.md and SUMMARY.md**
- files:
  - `.planning/quick/20260508-lighthouse-score-improvement/postfix/` — fresh LHR artifacts
  - `.planning/quick/20260508-lighthouse-score-improvement/SEO-REPORT.md`
  - `.planning/quick/20260508-lighthouse-score-improvement/SUMMARY.md`
- action: rerun `CHROME_PATH=… npx @lhci/cli@0.14.x autorun --config=./.lighthouserc.json`, snapshot to `postfix/`, derive median scores, write SEO report and summary.
- done: report files committed, scores documented.

## Out of scope

- SSG / SSR / route prerendering (would meaningfully boost FCP but is a much bigger refactor).
- Replacing or self-hosting Google Fonts.
- Adding sitemap.xml (no domain configured here; can be added in a follow-up).
- Image-format conversions (no images currently flagged).
- Touching the `MobileMenu` fix from the earlier quick task.
