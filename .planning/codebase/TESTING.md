# Testing Patterns

**Analysis Date:** 2026-05-08

## Test Framework

**Runner:**
- **None.** No test runner is installed or configured.
- Verified absent from `package.json` (`devDependencies` lists only `@types/node`, `@vitejs/plugin-vue`, `@vue/tsconfig`, `typescript`, `vue-tsc`, `vite` — no `vitest`, `jest`, `mocha`, `playwright`, `cypress`, `@vue/test-utils`, `@testing-library/*`)
- Verified absent from disk: no `vitest.config.*`, no `jest.config.*`, no `playwright.config.*`, no `cypress.config.*`
- No `test`, `test:*`, `coverage`, `e2e` scripts in `package.json:6-11` (only `dev`, `build`, `preview`, `lighthouse`)

**Assertion Library:**
- Not applicable — no test framework is installed.

**Run Commands:**
There are no test commands. The complete `npm` script surface is:
```bash
npm run dev          # Vite dev server
npm run build        # vue-tsc -b && vite build  (the only "test" today: type check + build)
npm run preview      # Preview the production build
npm run lighthouse   # Build + run @lhci/cli against the preview server
```

## Test File Organization

**Location:**
- No test files exist. Repo-wide search for `**/*.test.*`, `**/*.spec.*`, `**/__tests__/**`, `test/`, `tests/` returns zero matches under `src/` (and zero matches anywhere outside `node_modules/`).

**Naming:**
- N/A — no convention has been established. If tests are added, follow the project's PascalCase-component / camelCase-composable file naming and use `*.test.ts` / `*.spec.ts` suffixes (Vitest defaults).

**Structure:**
- N/A.

## Test Structure

**Suite Organization:**
- N/A — no tests exist.

**Patterns:**
- N/A.

## Mocking

**Framework:**
- N/A.

**Patterns:**
- N/A.

**What to Mock:**
- If/when tests are introduced, the obvious mock surface area would be browser APIs already wrapped by composables — `IntersectionObserver` (`src/composables/useIntersectionReveal.ts`, `src/composables/useScrollReveal.ts`), `window.matchMedia` (`src/composables/useScrollReveal.ts:17`, `src/composables/useCursorGlow.ts:30-31`, `src/components/sections/FeatureTabsSection.vue:113`), `requestAnimationFrame` (`src/composables/useCursorGlow.ts:15`, `src/components/sections/FeatureTabsSection.vue:63,73`), and `window.location.href` writes in form submission (`src/components/forms/ContactForm.vue:56`).

**What NOT to Mock:**
- N/A.

## Fixtures and Factories

**Test Data:**
- No test fixtures.
- The closest analog to "test data" in this codebase is the typed page content in `src/content/*.ts` (`home.ts`, `services.ts`, `about.ts`, `case-studies.ts`, `contact.ts`, etc.). These are the canonical realistic shapes that any future component tests should reuse rather than re-invent.

**Location:**
- N/A.

## Coverage

**Requirements:**
- None enforced. There is no coverage tool, no coverage target, and no CI gate that fails on coverage.

**View Coverage:**
- N/A.

## Test Types

**Unit Tests:**
- None. Pure-function code that would be the most testable today: `src/composables/useScrollReveal.ts` (option defaults, reduced-motion branch), `src/composables/useBreakpoints.ts` (breakpoint thresholds), the email regex and required-field logic in `src/components/forms/ContactForm.vue:37-47`, and `mailtoHref` URL composition (`src/components/forms/ContactForm.vue:22-35`).

**Integration Tests:**
- None. The router (`src/app/router/index.ts`) — including the seven canonical routes, six legacy redirects, and the `:pathMatch(.*)*` catch-all — has no automated coverage; behavior is only verified by hand or via Lighthouse navigation.

**E2E Tests:**
- None. No Playwright/Cypress/WebdriverIO setup.

**Visual / Snapshot Tests:**
- None. Vue snapshot testing is not configured.

## What Actually Runs in CI

The repo ships one GitHub Actions workflow: `.github/workflows/lighthouse.yml` ("Lighthouse CI"). This is the only automated quality gate.

**When it runs (`.github/workflows/lighthouse.yml:3-8`):**
- On `pull_request` targeting `main`
- On `push` to `main`
- Manually via `workflow_dispatch`

**What it does (`.github/workflows/lighthouse.yml:25-46`):**
1. `actions/checkout@v4`
2. `actions/setup-node@v4` with Node 20 and npm cache
3. `npm ci`
4. `npm run build` — this is the de facto "type check" step because the build script is `vue-tsc -b && vite build` (`package.json:8`). A type error fails the build and therefore fails CI.
5. `treosh/lighthouse-ci-action@v12` using `./.lighthouserc.json`
6. Posts a Markdown table of the median run scores back as a PR comment (`.github/workflows/lighthouse.yml:47-84`)

**Lighthouse thresholds (`.lighthouserc.json:19-26`):**
| Category | Threshold | Severity | Aggregation |
|----------|-----------|----------|-------------|
| `categories:accessibility` | `>= 0.80` | **error** (blocks PR) | median of 3 runs |
| `categories:performance`   | `>= 0.80` | warn (visible, non-blocking) | median of 3 runs |
| `categories:best-practices`| `>= 0.80` | warn | median of 3 runs |
| `categories:seo`           | `>= 0.80` | warn | median of 3 runs |

**Routes audited (`.lighthouserc.json:7-13`):**
- `/`
- `/services`
- `/about`
- `/case-studies`
- `/contact`

The privacy and terms pages (`/privacy-policy`, `/terms-and-conditions`) are NOT in the Lighthouse run.

**Local equivalent:**
```bash
npm run lighthouse   # builds, then runs @lhci/cli@0.14.x against the preview server
```

## Implications & Risks (be honest)

Because there are no unit, integration, or E2E tests, the safety net for changes today is:

1. **TypeScript compilation** via `vue-tsc -b` during `npm run build` — catches type regressions only.
2. **Lighthouse CI accessibility threshold** — the only automated gate that blocks merges (a11y must stay ≥ 80 on the five audited routes).
3. **Manual review** of the live preview build.

What this means in practice:
- **Logic regressions are invisible until someone clicks the page.** Form validation (`src/components/forms/ContactForm.vue:37-47`), router redirects (`src/app/router/index.ts:49-56`), tab autoplay/keyboard nav (`src/components/sections/FeatureTabsSection.vue:59-92`), and CTA dispatch (`src/components/common/AppButton.vue:22-35`) have no automated coverage.
- **Refactoring composables is risky.** The browser-API wrappers in `src/composables/` (intersection observers, matchMedia listeners, RAF loops) are subtle and have no regression tests.
- **Accessibility scores can mask functional a11y bugs.** Lighthouse catches structural/markup issues; it does not exercise keyboard flows or screen-reader announcements end-to-end.

## Recommended Patterns When Tests Are Added

These are recommendations only — nothing below exists in the repo today.

**Suggested stack (minimum friction with the current Vite + Vue 3 + TS setup):**
- **Vitest** as the runner (zero-config with Vite, ESM-native, matches `vite.config.ts` aliases automatically)
- **@vue/test-utils** for component mounting
- **happy-dom** or **jsdom** as the DOM environment
- Optional: **@testing-library/vue** for behavior-style component tests

**Suggested layout:**
- Co-locate as `Component.test.ts` next to `Component.vue` in `src/components/...`
- Composable tests as `useThing.test.ts` next to `useThing.ts` in `src/composables/`
- Reuse `src/content/*.ts` and `src/types/content.ts` for realistic fixture shapes — do not invent parallel test fixtures

**Suggested first targets (highest value per line of test):**
1. `src/components/forms/ContactForm.vue` — `validate()`, `mailtoHref` computed, honeypot short-circuit
2. `src/composables/useScrollReveal.ts` — option defaults, `prefersReducedMotion` short-circuit, observer disconnect
3. `src/app/router/index.ts` — legacy redirects resolve to current routes; unknown paths hit the `/` catch-all
4. `src/components/common/AppButton.vue` — renders the right element (`<RouterLink>` / `<a>` / `<button>`) for each `CTA.action`

**Suggested CI gate:**
Add a `test` job to `.github/workflows/lighthouse.yml` (or a new workflow) running `npm test -- --run` before the Lighthouse job, so a logic regression fails before a 3-run Lighthouse audit even starts.

---

*Testing analysis: 2026-05-08*
