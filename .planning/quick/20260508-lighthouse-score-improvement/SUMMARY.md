---
id: 20260508-lighthouse-score-improvement
title: Score & improve Lighthouse + produce SEO report
date: 2026-05-08
status: complete
files_changed:
  - public/robots.txt (new)
  - index.html
  - src/components/sections/FeatureTabsSection.vue
artifacts:
  - .planning/quick/20260508-lighthouse-score-improvement/PLAN.md
  - .planning/quick/20260508-lighthouse-score-improvement/SEO-REPORT.md
  - .planning/quick/20260508-lighthouse-score-improvement/baseline/
  - .planning/quick/20260508-lighthouse-score-improvement/postfix/
---

# Summary

## Score uplift (median per route)

| Route          | Perf       | A11y       | Best Practices | SEO        |
|----------------|-----------:|-----------:|---------------:|-----------:|
| `/`            | 86 → **99** (+13) | 85 → **100** (+15) | 100 → 100 | 92 → **100** (+8) |
| `/services`    | 86 → **99** (+13) | 100 → 100 | 100 → 100 | 92 → **100** (+8) |
| `/about`       | 86 → **99** (+13) | 100 → 100 | 100 → 100 | 92 → **100** (+8) |
| `/case-studies`| 86 → **99** (+13) | 100 → 100 | 100 → 100 | 92 → **100** (+8) |
| `/contact`     | 85 → **95** (+10) | 100 → 100 | 100 → 100 | 92 → **100** (+8) |

Every previously failing audit now scores 1.0:

- `aria-required-children` 0 → 1.0
- `aria-required-parent`   0 → 1.0
- `listitem`               0 → 1.0
- `aria-allowed-role`      0 → 1.0
- `robots-txt`             0 → 1.0

## What changed

### 1. Home accessibility (FeatureTabsSection.vue) — 85 → 100

The "Why Antvertize" tablist used `<ol role="tablist"><li><button role="tab">…</button></li></ol>` and `<article role="tabpanel">`. ARIA-in-HTML rules:

- `role="tablist"` requires `role="tab"` direct children — `<li>` (implicit `listitem` role) violated this.
- `<button role="tab">` requires `role="tablist"` parent in the accessibility tree — same `<li>` violated this.
- `<li>` outside a list parent (the `<ol role="tablist">` is no longer a list) violated `listitem`.
- `article` is not allowed to take `role="tabpanel"` per the ARIA in HTML spec.

Refactored to the WAI-ARIA APG canonical pattern:

- `<ol role="tablist">` → `<div role="tablist">`
- Removed the `<li>` wrapper; `<button role="tab">` is now a direct child of the tablist
- `<article role="tabpanel">` → `<div role="tabpanel">`
- Active styling moved from a JS-bound `.active` class on `<li>` to `[aria-selected="true"]` on the button
- `flex-shrink: 0` and `scroll-snap-align: center` moved from `.rail-item` onto `.rail-btn`
- Refs (`railItemRefs`) now bind to the buttons; `scrollRailItemIntoView` works unchanged

Behavior preserved: rail layout, active visual, hover/focus, autoplay, keyboard nav (Arrow keys / Home / End), touch swipe, reduced-motion, mobile horizontal scroll.

### 2. SEO across all routes — 92 → 100

Added `public/robots.txt`:

```text
User-agent: *
Allow: /
```

Vite copies `public/*` to `dist/`, so production now serves a valid `robots.txt`. The `robots-txt` audit was the only weighted SEO miss; everything else (title, description, canonical, link-text, hreflang, http-status-code, is-crawlable, crawlable-anchors) was already passing on every route.

### 3. Performance — ~86 → 95–99

Replaced the single render-blocking Google Fonts `<link rel="stylesheet">` in `index.html` with the standard preload-then-swap pattern:

```html
<link rel="preload" as="style" href="…fonts…" />
<link rel="stylesheet" href="…fonts…" media="print" onload="this.media='all'" />
<noscript><link rel="stylesheet" href="…fonts…" /></noscript>
```

The browser fetches the stylesheet without blocking parser, applies it once loaded, and falls back to the page's own font stack until then (already paired with `&display=swap` in the URL). Result: FCP dropped from ~3.0s to 1.4s, LCP from ~3.5s to 1.9s on most routes. The two slowest routes (`/about` 3.0s, `/contact` 2.9s LCP) still pass — these are the next perf targets.

## Files changed

- `public/robots.txt` (new, 2 lines)
- `index.html` (font link replaced with preload + swap-on-load + noscript fallback)
- `src/components/sections/FeatureTabsSection.vue` (template + scoped CSS refactor; no JS logic changes)

## Verification

- `npm run build` clean (vue-tsc + vite build, 181 modules, no warnings on changed files).
- ReadLints clean on `FeatureTabsSection.vue` and `index.html`.
- Lighthouse postfix (median of 2 runs/URL): scores tabulated above; all 5 previously failing audits now score 1.0.
- `dist/robots.txt` confirmed present after build.

## SEO report

Detailed in `SEO-REPORT.md` — full audit grid across 5 routes, per-page meta snapshot, web-vitals reference, and a prioritized list of next-step recommendations (sitemap, JSON-LD structured data, og:image, description-length tightening, /about and /contact LCP, route prerendering).

## Out of scope (deliberate)

- No SSG / SSR / route prerendering — would lift SEO further but is a meaningfully larger refactor.
- No sitemap.xml — separate one-line plugin task; recommended in SEO-REPORT.md.
- No JSON-LD structured data — recommended in SEO-REPORT.md.
- No image-format conversions or self-hosted fonts — none currently flagged by Lighthouse.

## Notes on the GSD environment

`/gsd-quick` was run inline (no `gsd-sdk`, no `STATE.md`/`ROADMAP.md`). The orchestrator captured a baseline, analyzed audits, applied the three targeted fixes, re-scored, and produced PLAN + SEO-REPORT + SUMMARY. STATE.md update deferred. Re-run `/gsd-new-project` for full pipeline behavior on subsequent tasks.
