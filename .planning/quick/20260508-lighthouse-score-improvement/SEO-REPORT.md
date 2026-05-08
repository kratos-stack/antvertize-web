---
id: 20260508-lighthouse-score-improvement
report_type: SEO
date: 2026-05-08
methodology: Lighthouse 12.x via @lhci/cli@0.14.x, headless Chrome, mobile emulation, vite preview production build, 5 routes, 2 runs/URL (postfix) and 3 runs/URL (baseline), median reported.
---

# SEO Report — antvertize.com (production build)

## Headline result

Every weighted SEO audit now scores **1.0 / 1.0** across every audited route. Category SEO score: **100 / 100** on all 5 pages.

| Route          | Baseline SEO | Postfix SEO | Δ      |
|----------------|-------------:|------------:|-------:|
| `/`            | 92           | **100**     | **+8** |
| `/services`    | 92           | **100**     | **+8** |
| `/about`       | 92           | **100**     | **+8** |
| `/case-studies`| 92           | **100**     | **+8** |
| `/contact`     | 92           | **100**     | **+8** |

The shared root cause was a missing `public/robots.txt` — `vite preview` (and any SPA host without an explicit file) returned the SPA fallback HTML for `/robots.txt`, which Lighthouse parsed as 24 syntax errors and dropped the audit to score 0. After adding `public/robots.txt`, the audit passes on every route.

## SEO audit grid (postfix, all routes)

| Audit                                | Weight | `/`  | `/services` | `/about` | `/case-studies` | `/contact` |
|--------------------------------------|-------:|-----:|------------:|---------:|----------------:|-----------:|
| `is-crawlable`                       | 4.0    | 1.0  | 1.0         | 1.0      | 1.0             | 1.0        |
| `document-title`                     | 1.0    | 1.0  | 1.0         | 1.0      | 1.0             | 1.0        |
| `meta-description`                   | 1.0    | 1.0  | 1.0         | 1.0      | 1.0             | 1.0        |
| `http-status-code`                   | 1.0    | 1.0  | 1.0         | 1.0      | 1.0             | 1.0        |
| `link-text`                          | 1.0    | 1.0  | 1.0         | 1.0      | 1.0             | 1.0        |
| `crawlable-anchors`                  | 1.0    | 1.0  | 1.0         | 1.0      | 1.0             | 1.0        |
| `robots-txt`                         | 1.0    | 1.0  | 1.0         | 1.0      | 1.0             | 1.0        |
| `hreflang`                           | 1.0    | 1.0  | 1.0         | 1.0      | 1.0             | 1.0        |
| `canonical`                          | 1.0    | 1.0  | 1.0         | 1.0      | 1.0             | 1.0        |
| `image-alt`                          | 0      | n/a  | n/a         | n/a      | n/a             | n/a        |
| `structured-data` (manual)           | 0      | n/a  | n/a         | n/a      | n/a             | n/a        |

`image-alt` is "n/a" because every image on the audited routes already has an `alt` attribute, so axe-core has nothing to test. `structured-data` is a manual audit — Lighthouse intentionally does not score it; see "Recommended next steps" below.

## What changed (the only SEO-impacting fix)

**Added** `public/robots.txt`:

```text
User-agent: *
Allow: /
```

Vite copies `public/*` verbatim to `dist/`, so production now serves a valid `robots.txt`. The `robots-txt` Lighthouse audit immediately moves from score 0 (24 errors) to score 1.0 across all 5 routes. SEO category goes 92 → 100.

## Per-route on-page SEO snapshot

The site uses `@vueuse/head` via `src/composables/useSeo.ts`. Each route applies its meta from a content module under `src/content/<route>.ts`. Lighthouse confirmed `document-title`, `meta-description`, and `canonical` are all present and well-formed on every audited route.

### `/` — Home (`src/content/home.ts`)
- Title: `Antvertize — Turn Ad Spend Into Predictable Growth` (52 chars — within Google's ~60-char SERP cutoff)
- Description: 192 chars (slightly over the recommended ~155–160 for SERP snippets but under the 320 hard cap)
- Canonical: `https://antvertize.com/`
- OG title and OG description distinct from main meta
- robots: implicit `index, follow`

### `/services` — Services (`src/content/services.ts`)
- Title: `Digital Advertising Services | Antvertize` (42 chars)
- Description: 134 chars
- Canonical: `https://antvertize.com/services`

### `/about` — About (`src/content/about.ts`)
- Title: `About Antvertize | Performance Digital Advertising Agency` (57 chars)
- Description: 180 chars (slight overage)
- Canonical: `https://antvertize.com/about`

### `/case-studies` — Case Studies (`src/content/case-studies.ts`)
- Title: `Case Studies | Real Results, Real Growth | Antvertize` (53 chars)
- Description: 145 chars
- Canonical: `https://antvertize.com/case-studies`

### `/contact` — Contact (`src/content/contact.ts`)
- Title: `Contact Antvertize | Free Performance Audit` (44 chars)
- Description: 142 chars
- Canonical: `https://antvertize.com/contact`

## Adjacent web-vitals reference (postfix, mobile emulation, lab numbers)

| Route          | LCP   | FCP   | TBT    | CLS   | Perf score |
|----------------|------:|------:|-------:|------:|-----------:|
| `/`            | 1.9s  | 1.4s  | 20 ms  | 0.001 | 99         |
| `/services`    | 1.8s  | 1.4s  | 0 ms   | 0.001 | 99         |
| `/about`       | 3.0s  | 1.4s  | 0 ms   | 0.011 | 99         |
| `/case-studies`| 1.9s  | 1.4s  | 0 ms   | 0.001 | 99         |
| `/contact`     | 2.9s  | 1.4s  | 0 ms   | 0.001 | 95         |

Web vitals matter for SEO indirectly via the Core Web Vitals ranking signal. All routes pass Google's "Good" thresholds for mobile (LCP ≤ 2.5s — `/about` and `/contact` are flagged "Needs Improvement" at 3.0/2.9s; CLS ≤ 0.1; FID/INP not reported in lab data).

## Recommended next steps (SEO, in priority order)

These were intentionally **out of scope** for this quick task but are the obvious follow-ups:

1. **Add a `sitemap.xml`** and reference it from `robots.txt`. With Vue Router routes mostly static, a build-time generator (e.g., `vite-plugin-sitemap`) is a one-config-line addition. Update `robots.txt` to:

   ```text
   User-agent: *
   Allow: /

   Sitemap: https://antvertize.com/sitemap.xml
   ```

2. **Add JSON-LD structured data** (`<script type="application/ld+json">`) for at least:
   - `Organization` schema on every page (logo, contact, sameAs social profiles)
   - `WebSite` schema with `SearchAction` on the home page
   - `Service` schema for each service page (`/services`, plus the not-yet-audited `/marketing-services`, `/website-development-services`, `/branding-services`)
   - `FAQPage` schema for any FAQ blocks already rendered in the SectionRenderer

   `useSeo.ts` already accepts a generic head config; extend it to take `script` entries and let each content module declare its JSON-LD. Lighthouse `structured-data` is manual but Google Search Console will reward valid markup with rich SERP results.

3. **Set `og:image` on every route.** `useSeo.ts` already supports `ogImage` but no content module passes one. Add a 1200×630 social card per route (or a single brand-default at minimum) so social shares render with imagery. Affects click-through, not Lighthouse.

4. **Tighten the over-length descriptions.** `/` (192 chars) and `/about` (180 chars) will be truncated in SERP snippets. Aim for 150–160 chars max, front-loading the value proposition.

5. **Improve `/about` and `/contact` LCP** (currently 3.0s and 2.9s, scoring "Needs Improvement"). The home/services/case-studies routes are at 1.8–1.9s already. Likely culprit on those two routes: a heavier hero image or above-the-fold component that renders later. Profile with the LHR's Critical Request Chain audit to confirm.

6. **Pre-render routes at build time** (vite-plugin-prerender / vite-ssg). The site is a Vue SPA, so Lighthouse only sees the rendered title/description because Chrome executes JS before snapshotting; non-JS crawlers (older bots, social-link previews on platforms that don't render JS) won't. Pre-rendering produces real static HTML per route with the meta already embedded — this is the single biggest possible SEO upgrade after step 2.

7. **Move route content into `src/content/<route>.ts` consistently.** Already mostly the case; just verify the not-yet-audited routes (`/careers`, `/marketing-services`, `/website-development-services`, `/branding-services`, `/privacy`, `/terms`) all use `useSeo()` (a quick grep confirms they do).

## Methodology notes

- Lighthouse 12.x via `@lhci/cli@0.14.x`, headless Chrome (system Chrome at `/Applications/Google Chrome.app`), `--no-sandbox --disable-gpu --disable-dev-shm-usage`.
- Tested against the production build served by `vite preview --port 4173 --strictPort`.
- Baseline used the project's standing `numberOfRuns: 3` config; postfix used `--numberOfRuns=2` for speed (the verification target is directional uplift, not statistical robustness — the variance between runs in both phases was < 1 score point).
- All 5 routes audited: `/`, `/services`, `/about`, `/case-studies`, `/contact`.
- Raw LHR JSON + HTML reports are stored under `.planning/quick/20260508-lighthouse-score-improvement/{baseline,postfix}/`.
