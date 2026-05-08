# Codebase Concerns

**Analysis Date:** 2026-05-08

## Tech Debt

**Leftover Vite scaffold files (dead code):**
- Issue: Files from the original `npm create vite@latest` template were never deleted and are not imported anywhere in the runtime graph. They confuse new contributors and inflate the surface area.
- Files:
  - `src/style.css` — superseded by `src/styles/base.css` (the only stylesheet actually imported by `src/main.ts`). Light/dark scaffold theme still defines a `#646cff` link color and `#242424` background that contradict the dark-first design tokens in `src/styles/tokens.css`.
  - `src/components/HelloWorld.vue` — sample counter component with hard-coded English copy and external `vuejs.org` links. Never referenced.
  - `src/assets/vue.svg` — Vue logo asset, not referenced.
  - `public/vite.svg` — Vite logo asset, not referenced. Also currently shipped to production at `/vite.svg`.
- Impact: ~150 lines of dead Vue/CSS/SVG, plus an unused public asset that ships in `dist/`. No runtime breakage, but obscures the actual design system.
- Fix approach: Delete all four files and remove any stale references in tooling. Verify with `npm run build` afterwards.

**Unused `ConsultationForm` component:**
- Issue: `src/components/forms/ConsultationForm.vue` (~298 lines, includes a fake `setTimeout` "API call") is not imported by any page, section, or composable.
- Files: `src/components/forms/ConsultationForm.vue`
- Impact: Maintainers may edit this file thinking it is wired up; the only live form in the build is `src/components/forms/ContactForm.vue` (mounted via `src/components/sections/ContactFormSection.vue`).
- Fix approach: Either delete `ConsultationForm.vue` or wire it to a route/section through `SectionRenderer.vue`. Document the decision in `CLAUDE.md`.

**Duplicate scroll-reveal composables:**
- Issue: Two composables implement nearly the same `IntersectionObserver` reveal pattern.
  - `src/composables/useScrollReveal.ts` — newer, supports `once`, `threshold`, `rootMargin`, `prefers-reduced-motion`. Used everywhere via `src/components/common/RevealOnScroll.vue`.
  - `src/composables/useIntersectionReveal.ts` — older, simpler, no `prefers-reduced-motion` handling.
- Files: `src/composables/useIntersectionReveal.ts`, `src/components/sections/TextColumnsSection.vue`, `src/components/sections/ValueWordCloudSection.vue`
- Impact: Only `TextColumnsSection` and `ValueWordCloudSection` still use the legacy composable, so reveals in those two sections silently ignore `prefers-reduced-motion: reduce` — an accessibility regression relative to the rest of the site (see Accessibility Issues below).
- Fix approach: Migrate both call sites to `useScrollReveal` (or, preferably, wrap their content in `<RevealOnScroll>`), then delete `useIntersectionReveal.ts`.

**Unrouted page bundle (intentional but persistent dead weight):**
- Issue: `CLAUDE.md` documents that `BrandingPage.vue`, `WebsitesPage.vue`, `MarketingPage.vue`, `CareersPage.vue` and their content files are "kept on disk but unrouted, in case they are reactivated later". They still type-check and `vue-tsc -b` walks them on every build.
- Files: `src/pages/BrandingPage.vue`, `src/pages/WebsitesPage.vue`, `src/pages/MarketingPage.vue`, `src/pages/CareersPage.vue`, `src/content/branding.ts`, `src/content/websites.ts`, `src/content/marketing.ts`, `src/content/careers.ts`
- Impact: Slight build-time cost; risk that copy edits land here instead of the live pages; growing confusion about which content file is authoritative.
- Fix approach: Either reactivate routes (add to `src/app/router/index.ts`) or move these to a `src/_archive/` directory excluded from `tsconfig.app.json` `include`.

**Mailto-only contact submission:**
- Issue: `src/components/forms/ContactForm.vue:56` performs `window.location.href = mailtoHref.value` and then waits 600 ms before showing a "success" screen. There is no real backend, no retry, no analytics, and no fallback when the user has no configured mail client (very common on iOS Safari with no Mail account, or on shared/public devices).
- Files: `src/components/forms/ContactForm.vue`, `src/components/sections/ContactFormSection.vue`
- Impact: Form fills are invisible to the business — there is no record server-side. Users on devices without a mail handler land on the success screen even though no email was sent. The "Preparing..." button label is also misleading because no network request occurs.
- Fix approach: Wire to a serverless endpoint (Formspree / Resend / Cloudflare Worker) and keep `mailto:` as a documented fallback in the success screen. Capture form submissions in analytics.

## Known Bugs

**`base.css` skip-link does not focus `<main>`:**
- Symptoms: The skip-link in `src/app/layouts/DefaultLayout.vue` targets `#main-content`, and the `<main>` has `tabindex="-1"`, but the global `:focus-visible` style in `src/styles/base.css:72` applies a violet outline to the `<main>` element when it is programmatically focused after a skip — visually loud on a full-bleed page.
- Files: `src/styles/base.css:72`, `src/app/layouts/DefaultLayout.vue:10`
- Trigger: Tab once from page load → press Enter on the skip link.
- Workaround: Add a scoped reset for `main:focus-visible` so the outline does not wrap the whole document.

**Hero reveal with `threshold: 0` may flash on very slow devices:**
- Symptoms: All hero `<RevealOnScroll>` wrappers (`src/components/hero/HeroMarketing.vue:46-80`) pass `:threshold="0"` so they begin hidden until the IntersectionObserver fires its first callback. On a cold page load over a slow CPU, the hero text can briefly render at `opacity: 0` before the observer flips state.
- Files: `src/components/hero/HeroMarketing.vue:46-80`, `src/composables/useScrollReveal.ts`
- Trigger: First paint on a throttled device, especially when JS hydration is delayed.
- Workaround: Render hero content initially visible and only animate after hydration, or gate the initial `opacity: 0` behind a `js-ready` class set in `main.ts`.

## Security Considerations

**Third-party Google Fonts loaded without Subresource Integrity (SRI):**
- Risk: `index.html:17` loads `https://fonts.googleapis.com/css2?...` as a `<link rel="stylesheet">` with no `integrity=` or `crossorigin` attribute on the stylesheet itself (only on the `gstatic.com` preconnect). Google can change the served CSS at any time; without SRI the browser will execute whatever CSS Google returns, which is also a privacy/regulatory concern under GDPR.
- Files: `index.html:15-17`
- Current mitigation: None. Privacy policy at `src/pages/PrivacyPage.vue:35-43` does not disclose Google Fonts.
- Recommendations:
  1. Self-host the three font families (Playfair Display, Sora, Inter) under `public/fonts/` and reference them via `@font-face` in `src/styles/tokens.css`.
  2. If keeping Google Fonts, document the third-party data flow in the Privacy Policy and add a `Content-Security-Policy` `<meta>` (or response header) restricting `style-src` to `self` + `fonts.googleapis.com`.

**No Content-Security-Policy:**
- Risk: `index.html` ships with no `<meta http-equiv="Content-Security-Policy">` and the project has no hosting-layer CSP either. Any future XSS via a content-file injection or `v-html` introduction has no defence-in-depth.
- Files: `index.html`
- Current mitigation: No `v-html`, no `innerHTML`, no `eval` calls anywhere in `src/` (verified). All form input goes through `mailto:` which already encodes via `encodeURIComponent`.
- Recommendations: Add a baseline CSP `<meta>` tag — at minimum `default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data:; connect-src 'self';`. Tighten `style-src` once Google Fonts is removed.

**Honeypot is the only spam protection:**
- Risk: `src/components/forms/ContactForm.vue:19,52,92` and `src/components/forms/ConsultationForm.vue:20,54,78` rely on a single hidden `_honeypot` field. Modern spam bots routinely defeat honeypots, and there is no rate limiting because submission is `mailto:`.
- Files: `src/components/forms/ContactForm.vue`, `src/components/forms/ConsultationForm.vue`
- Current mitigation: Honeypot only.
- Recommendations: When the form is wired to a real backend, add Turnstile or hCaptcha and IP rate limiting at the edge.

**No exposed secrets detected:**
- Verified: `.env*` files do not exist in the repository. No API keys, tokens, or credentials found in tracked source. `src/content/site.config.ts` only exposes the public business email `hello@antvertize.com`. Good.

## Performance Bottlenecks

**Render-blocking Google Fonts request:**
- Problem: `index.html:17` loads three families with multiple weights as a single render-blocking stylesheet. This is consistently the largest contributor to FCP/LCP regressions in Lighthouse runs (`.lighthouseci/lhr-*.json` show Performance hovering around 0.85).
- Files: `index.html:15-17`
- Cause: Synchronous `<link rel="stylesheet">` to `fonts.googleapis.com`, plus `@import` of Tailwind in `src/styles/tokens.css` which composes every utility class.
- Improvement path:
  1. Self-host fonts and `font-display: swap` them.
  2. Subset to actually-used glyphs (Latin only, three weights).
  3. Drop `Playfair Display` if it is only used for `h1`/`h2` — there are only ~6 visible H1/H2 instances across pages.

**All hero visuals statically imported:**
- Problem: `src/components/hero/HeroMarketing.vue:11-15` imports all five hero visual components (`HomeGrowthVisual`, `ServicesChannelsVisual`, `AboutDecadeVisual`, `CaseStudiesResultsVisual`, `ContactAuditVisual`) eagerly. Each route only uses one, so the other four get included in every page chunk.
- Files: `src/components/hero/HeroMarketing.vue:11-27`
- Cause: Static `import` instead of `defineAsyncComponent`.
- Improvement path: Convert the `visualMap` entries to `defineAsyncComponent(() => import('./visuals/HomeGrowthVisual.vue'))` so each visual lazy-loads only when its route renders the hero.

**Two scroll listeners on every page:**
- Problem: `src/components/navigation/SiteHeader.vue:14-23` adds a `scroll` listener for the header background swap. Combined with the many `IntersectionObserver` instances created by `RevealOnScroll`, large pages (e.g. `src/pages/HomePage.vue`) can attach 30+ observers.
- Files: `src/components/navigation/SiteHeader.vue:14`, `src/components/common/RevealOnScroll.vue`, every page that wraps content in reveals.
- Cause: Each `<RevealOnScroll>` instantiates its own observer. The header scroll handler is passive but still recomputes on every frame on long pages.
- Improvement path: Share a single `IntersectionObserver` across `RevealOnScroll` instances (collect targets in a module-level singleton). Replace the header scroll listener with a sentinel `IntersectionObserver` that watches a 1px element near the top of the page.

**Lighthouse scores below previous targets:**
- Problem: The recorded run in `.lighthouseci/assertion-results.json` shows Accessibility 0.85, SEO 0.83 (`/`), 0.92 (`/services`), 0.92 (`/about`) — all measured against an older `minScore: 0.95`. The current `.lighthouserc.json:21-24` has been relaxed to `0.8` "warn", which masks the regression rather than fixing it.
- Files: `.lighthouserc.json:19-25`, `.lighthouseci/assertion-results.json`
- Cause: Either the threshold was lowered to make CI green, or the previous run files were not refreshed after the relaxation.
- Improvement path: Treat 0.85 a11y as a defect, fix the underlying issues (see Accessibility Issues), then raise thresholds back to 0.9+.

## Fragile Areas

**`FeatureTabsSection.vue` complexity (624 lines):**
- Files: `src/components/sections/FeatureTabsSection.vue`
- Why fragile: Owns autoplay (rAF loop), keyboard navigation (arrow/Home/End), touch swipe, IntersectionObserver visibility gating, scroll-into-view for the rail, and reduced-motion handling — all in one SFC. Many `let` module-scope refs (`rafId`, `lastTs`, `touchStartX`, `touchStartY`) instead of `useState`-style composables, so race conditions are easy to introduce.
- Safe modification: Extract the autoplay loop into a `useAutoplay(progress, activeIndex, ...)` composable; extract the rail-keyboard logic into `useTablistKeyboard()`. Cover with smoke tests before refactoring (none exist today).
- Test coverage: Zero — see Test Coverage Gaps.

**`AntvertizeLogo.vue` runtime SVG (349 lines):**
- Files: `src/components/common/AntvertizeLogo.vue`
- Why fragile: Generates a unique gradient ID per instance (`Math.random()` at line 25), drives morph animation via key-bumping (`playKey`), and uses both `IntersectionObserver` and hover replays. Random IDs prevent SSR hydration safety if Nuxt migration happens later (`CLAUDE.md` calls out future Nuxt migration).
- Safe modification: Replace `Math.random()` with Vue's `useId()` (Vue 3.5+) so the same ID is generated on server and client.

**Forms duplicate ~250 lines of styles:**
- Files: `src/components/forms/ContactForm.vue:190-360`, `src/components/forms/ConsultationForm.vue:147-298`
- Why fragile: The two scoped `<style>` blocks are 95% identical. Any visual tweak (input radius, error color, focus shadow) must be made in two places, and one will inevitably drift.
- Safe modification: Extract `.field`, `input/select/textarea`, `.field-error`, `.honeypot`, and `.form-success` rules into `src/styles/forms.css` and import once in `base.css`.

## Accessibility Issues

**Recorded a11y score 0.85 on `/`:**
- Files: `.lighthouseci/assertion-results.json` (recorded run); the contributing failures live in the per-URL `.lighthouseci/lhr-*.json` files.
- Why: Per the recorded LHRs the most likely contributors are color-contrast on `--color-muted: #94A3B8` against `--color-elevated: #0B1020` for small body text in `src/components/navigation/SiteFooter.vue` (`.copyright`, `.legal-links a` at 13px), and the social-icon "letters" used as icons (`src/components/navigation/SiteFooter.vue:46-55`) which expose a single character with `aria-label` but no visible text — fine in isolation, but the icons themselves render as `font-size: 12px` glyphs that fail contrast on hover backgrounds.
- Recommendations:
  1. Run `npx lighthouse http://localhost:4173/ --only-categories=accessibility --view` and triage the specific failing audits.
  2. Bump muted text in the footer to `--color-secondary` for any text below 14px.
  3. Replace the placeholder one-letter social "icons" with real inline SVG icons.

**Reveals ignore `prefers-reduced-motion` in two sections:**
- Files: `src/components/sections/TextColumnsSection.vue`, `src/components/sections/ValueWordCloudSection.vue`
- Why: Both use `useIntersectionReveal` (`src/composables/useIntersectionReveal.ts`) which has no `prefers-reduced-motion` branch. Every other reveal on the site honours the user's OS preference via `useScrollReveal`.
- Recommendations: Migrate to `<RevealOnScroll>` (see Tech Debt → Duplicate scroll-reveal composables).

**`tabindex="-1"` `<main>` outline:**
- Files: `src/styles/base.css:72`, `src/app/layouts/DefaultLayout.vue:10`
- Why: After activating the skip link, the violet `:focus-visible` outline applies to the entire `<main>` block.
- Recommendations: Add `main:focus-visible { outline: none; }` in `base.css`.

**Decorative `aria-hidden` icons mixed with informative content:**
- Files: `src/components/forms/ContactForm.vue:78`, `src/components/forms/ConsultationForm.vue:70` (`✓` glyphs marked `aria-hidden`).
- Status: Correctly hidden — no defect. Noted here only to confirm the pattern is consistent across forms.

## Build / Configuration Drift

**Node 20 in CI is past LTS (as of 2026-04-30):**
- Files: `.github/workflows/lighthouse.yml:31` (`node-version: 20`)
- Why: Node 20 reached end-of-life on 2026-04-30. As of today (2026-05-08) the project's only CI workflow runs on an unsupported Node version, while local dev uses whatever the contributor has installed.
- Recommendations: Bump CI to `node-version: 22` (active LTS at this date) and add a `.nvmrc` with `22` so contributors align.

**`@types/node` v24 vs Node 20 runtime:**
- Files: `package.json:20` (`"@types/node": "^24.10.1"`)
- Why: The TypeScript types target Node 24 APIs but CI runs on Node 20. Newer `node:` API typings (e.g. ESM stable, `node:test` enhancements) will type-check successfully and then fail at runtime in CI.
- Recommendations: Either pin types to `^22` to match a Node 22 CI bump, or align both to the same major.

**`package-lock.json` older than `package.json`:**
- Files: `package.json` (last commit 2026-05-06), `package-lock.json` (last commit 2026-03-06)
- Why: The lockfile has not been re-committed since the dependency upgrade. Spot-checks confirm resolved entries exist for `@vueuse/head`, `vue-router`, `@tailwindcss/vite`, and `vue-tsc`, so the lockfile is structurally in sync — but the lack of a refreshed lockfile commit means transitive updates haven't been deliberately reviewed.
- Recommendations: Run `npm install` and commit the resulting lockfile so transitive resolutions are explicit and reproducible.

**Lighthouse threshold drift between recorded runs and current config:**
- Files: `.lighthouserc.json:19-25`, `.lighthouseci/assertion-results.json`
- Why: Recorded `assertion-results.json` was produced against `minScore: 0.95` for accessibility (and SEO). The current config has been lowered to `0.8`. Either the run is stale or the threshold was relaxed silently.
- Recommendations: Re-run `npm run lighthouse` to refresh the artifacts and decide whether to raise the threshold back toward 0.9.

**Specs `SPEC.md` and `SPEC-2.md` describe a different site shape:**
- Files: `SPEC.md`, `SPEC-2.md`, `CLAUDE.md:9`
- Why: `SPEC.md` describes a multi-discipline agency with 9 routes including `/branding-services`, `/website-development-services`, `/careers`, etc. Today the router exposes 7 routes and redirects all of those legacy paths. `CLAUDE.md` correctly flags the specs as historical, but a fresh contributor reading `SPEC.md` first will be misled about the current information architecture.
- Recommendations: Move both to `docs/historical/` (or prepend a clear `> ⚠️ Historical only — see WEBSITE-CONTENT.md and CLAUDE.md` admonition at the top of each file).

**`WHY-ANTVERTIZE.md` duplicates `WEBSITE-CONTENT.md`:**
- Files: `WHY-ANTVERTIZE.md`, `WEBSITE-CONTENT.md`
- Why: The "Why Antvertize" bullets, "Our Approach", and "Results You Can Expect" sections appear in both files with slightly different copy. Updating one without the other is the default failure mode.
- Recommendations: Treat `WEBSITE-CONTENT.md` as the single source of truth (per `CLAUDE.md`) and delete `WHY-ANTVERTIZE.md`, or convert it into a thin pointer.

## Build Artifacts in Working Tree

**Verified NOT committed to git (correctly ignored):**
- `node_modules/` — present locally, listed in `.gitignore:10`, `git ls-files | grep ^node_modules/` returns 0.
- `dist/` — present locally (last built 2026-05-06), listed in `.gitignore:11`, not tracked.
- `.lighthouseci/` — present locally with 16 MB of HTML/JSON reports, listed in `.gitignore:16`, not tracked.

**Status:** No build artifacts are leaking into the repository. The original concern in the analysis brief ("node_modules being committed") is unfounded — the directory exists locally only.

**Recommendation:** Add `npm run clean` script that removes `dist/` and `.lighthouseci/` so contributors can reset state easily.

## Scaling Limits

**Single `index.html` shell, no SSR/SSG:**
- Current capacity: Pure CSR Vue 3 SPA. Initial load is the entire JS bundle plus a 100vh hero waiting for hydration.
- Limit: SEO crawlers other than Google may not execute JS; first-contentful-paint depends on hydration. The recorded SEO scores of 0.83 on `/` (`.lighthouseci/lhr-*.json`) are partly attributable to this.
- Scaling path: Migrate to Nuxt 3 (already called out as a future direction in `CLAUDE.md:123`) or use `vite-ssg` for static prerender. Routes are already lazy-loaded so the migration is mechanical.

## Dependencies at Risk

**Tailwind CSS v4 (`^4.2.1`):**
- Risk: Tailwind v4 reworks the configuration model (`@theme` in CSS, no `tailwind.config.js`). The current `src/styles/tokens.css` follows the new pattern correctly, but the v4 ecosystem is still maturing — many community plugins target v3.
- Impact: Any plugin install (`@tailwindcss/typography`, etc.) needs explicit v4 compatibility; mixing v3 plugins will silently no-op.
- Migration plan: Pin to a known-good minor (`~4.2.1` instead of `^4.2.1`) until the plugin ecosystem catches up.

**`@vueuse/head` (`^2.0.0`):**
- Risk: `@vueuse/head` is in maintenance mode in favour of `@unhead/vue`. Long-term the package will stop receiving updates.
- Impact: Used by `src/composables/useSeo.ts` on every page.
- Migration plan: Swap import to `@unhead/vue` when `useSeo.ts` is next touched — the API is near-identical.

## Missing Critical Features

**No real backend for contact form:**
- Problem: As described in Tech Debt, all leads are silently lost on devices without a configured mail client. There is no leads database, no notification, no CRM hand-off.
- Blocks: Marketing attribution, A/B testing the form, customer follow-up SLA.

**No analytics:**
- Problem: No Plausible / GA / PostHog snippet anywhere in `index.html`, `src/main.ts`, or any composable.
- Blocks: Knowing whether the recorded Lighthouse perf regressions translate to user impact; measuring conversion on the contact CTA.

**No 404 page:**
- Problem: `src/app/router/index.ts:56` redirects unknown paths to `/` (`{ path: '/:pathMatch(.*)*', redirect: '/' }`). This is bad for SEO (Google sees soft-404s) and bad UX (users typing a wrong URL get bounced silently).
- Blocks: SEO health, accurate analytics for "users who hit broken links".

**No sitemap.xml or robots.txt:**
- Problem: Neither exists in `public/`. SEO score of 0.83 on `/` (`.lighthouseci`) is partly attributable.

## Test Coverage Gaps

**Zero automated tests:**
- What's not tested: Everything. There is no `vitest`, `jest`, `playwright`, or `cypress` config; no `*.test.*` or `*.spec.*` files anywhere in `src/`; no `test` script in `package.json`.
- Files: entire `src/` tree
- Risk: Every refactor is a blind change. The high-complexity files below have no safety net — `FeatureTabsSection`'s autoplay/keyboard/touch logic in particular is a regression magnet.
- Priority: **High** for the validation/submission paths in `ContactForm.vue` and `ConsultationForm.vue`; **Medium** for `FeatureTabsSection.vue`, `useScrollReveal.ts`, and the router redirects in `src/app/router/index.ts`; **Low** for purely presentational sections.
- Recommended starting set:
  1. Vitest unit tests for `ContactForm` validation (`validate()` function: required fields, email regex, consent check).
  2. Vitest unit tests for `useScrollReveal` reduced-motion branch.
  3. Playwright smoke test covering nav between every route in the router.
  4. Lighthouse CI threshold tightened back to `0.9` once the a11y issues are fixed.

---

*Concerns audit: 2026-05-08*
