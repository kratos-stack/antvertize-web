# Codebase Structure

**Analysis Date:** 2026-05-08

## Directory Layout

```
ant-2/
├── index.html                # SPA HTML entry; mounts #app, loads /src/main.ts
├── package.json              # Deps + scripts (dev / build / preview / lighthouse)
├── package-lock.json
├── vite.config.ts            # Vite + @vitejs/plugin-vue + @tailwindcss/vite + alias '@' → src
├── tsconfig.json             # Project-references shell
├── tsconfig.app.json         # App tsconfig (extends @vue/tsconfig/tsconfig.dom.json)
├── tsconfig.node.json        # Tooling tsconfig (vite.config.ts only)
├── .lighthouserc.json        # Lighthouse CI config
├── .lighthouseci/            # Lighthouse run reports (generated, committed)
├── README.md                 # Project intro
├── CLAUDE.md                 # AI/agent guidance — current source of architecture truth
├── WEBSITE-CONTENT.md        # Current copy source of truth
├── WHY-ANTVERTIZE.md         # Positioning brief
├── SPEC.md                   # Legacy spec (historical only)
├── SPEC-2.md                 # Legacy spec (historical only)
├── public/                   # Static assets served at root
│   ├── favicon.svg
│   ├── logo.svg
│   └── vite.svg              # Scaffold leftover
├── dist/                     # Vite build output (generated)
│   ├── index.html
│   ├── favicon.svg, logo.svg, vite.svg
│   └── assets/               # Hashed JS + CSS chunks per route
├── src/                      # All application code
│   ├── main.ts               # JS entry — createApp + router + head + mount
│   ├── App.vue               # Root component — <RouterView />
│   ├── style.css             # Vite-scaffold leftover (NOT imported)
│   ├── app/                  # App-shell concerns
│   │   ├── layouts/
│   │   │   └── DefaultLayout.vue
│   │   └── router/
│   │       └── index.ts
│   ├── assets/               # Scaffold leftover
│   │   └── vue.svg
│   ├── components/
│   │   ├── HelloWorld.vue    # Scaffold leftover (NOT used)
│   │   ├── common/           # Reusable presentational primitives
│   │   ├── navigation/       # SiteHeader, MobileMenu, SiteFooter
│   │   ├── hero/             # HeroMarketing + visuals/
│   │   ├── surfaces/         # Glass / Spotlight / Gradient / Glow primitives
│   │   ├── sections/         # SectionRenderer + 14 section components
│   │   └── forms/            # ContactForm, ConsultationForm
│   ├── composables/          # Reactive logic — useSeo, useBreakpoints, useCursorGlow, useIntersectionReveal, useScrollReveal
│   ├── content/              # Typed copy decks; one file per page + globals
│   ├── pages/                # One .vue per route (thin marketing shells + long-form legal pages)
│   ├── styles/               # tokens.css, base.css
│   └── types/                # content.ts — type contracts
├── .planning/                # GSD workflow artifacts
│   └── codebase/             # This document and siblings
├── .claude/                  # Claude Code project metadata
├── .github/
│   └── workflows/            # CI workflows
├── .vscode/
│   └── extensions.json
├── .gitignore
└── node_modules/             # Installed deps
```

## Directory Purposes

**`public/`:**
- Purpose: Static files served at the site root with no bundler processing.
- Contains: `favicon.svg`, `logo.svg`, `vite.svg` (scaffold leftover).
- Key files: `public/favicon.svg` referenced from `index.html:5`.

**`src/`:**
- Purpose: All application source code. Imported via the `@/` alias.
- Contains: Entry, root component, layered subfolders (`app`, `components`, `composables`, `content`, `pages`, `styles`, `types`).
- Key files: `src/main.ts`, `src/App.vue`.

**`src/app/`:**
- Purpose: App-shell concerns that are not feature components — routing and layouts.
- Contains: `router/`, `layouts/`.
- Key files: `src/app/router/index.ts` (route table + scroll behaviour), `src/app/layouts/DefaultLayout.vue` (header / main slot / footer).

**`src/components/common/`:**
- Purpose: Reusable presentational primitives consumed by every other folder.
- Contains: Buttons, links, containers, headings, badges, reveal wrapper, brand mark, service icon.
- Key files: `src/components/common/AppButton.vue` (CTA renderer), `src/components/common/Container.vue` (1280px shell), `src/components/common/RevealOnScroll.vue` (intersection-based animation wrapper), `src/components/common/SectionHeader.vue`, `src/components/common/AntvertizeLogo.vue`, `src/components/common/AppLink.vue`, `src/components/common/BadgePill.vue`, `src/components/common/ServiceIcon.vue`.

**`src/components/navigation/`:**
- Purpose: Site chrome (header bar, mobile drawer, footer).
- Contains: 3 Vue components.
- Key files: `src/components/navigation/SiteHeader.vue`, `src/components/navigation/MobileMenu.vue`, `src/components/navigation/SiteFooter.vue`.

**`src/components/hero/`:**
- Purpose: Above-the-fold hero band and its decorative right-column visuals.
- Contains: `HeroMarketing.vue`, `visuals/` subfolder with one visual per marketing page.
- Key files: `src/components/hero/HeroMarketing.vue`; `src/components/hero/visuals/HomeGrowthVisual.vue`, `ServicesChannelsVisual.vue`, `AboutDecadeVisual.vue`, `CaseStudiesResultsVisual.vue`, `ContactAuditVisual.vue`.

**`src/components/surfaces/`:**
- Purpose: Decorative surface primitives — glass cards, gradient backdrops, cursor-glow surfaces, floating badges.
- Contains: 5 Vue components.
- Key files: `src/components/surfaces/GlassCard.vue`, `src/components/surfaces/GradientBackdrop.vue`, `src/components/surfaces/SpotlightCard.vue`, `src/components/surfaces/CursorGlowSurface.vue`, `src/components/surfaces/FloatingBadge.vue`.

**`src/components/sections/`:**
- Purpose: One component per `PageSection` variant. `SectionRenderer.vue` dispatches to them.
- Contains: 14 section components + 1 dispatcher.
- Key files: `src/components/sections/SectionRenderer.vue` (dispatcher); section components: `StatGridSection.vue`, `ServiceDetailSection.vue`, `CardGridSection.vue`, `CaseStudyGridSection.vue`, `ArticleGridSection.vue`, `FAQSection.vue`, `MarqueeBand.vue`, `CTASection.vue`, `ValueWordCloudSection.vue`, `TextColumnsSection.vue`, `TrustBarSection.vue`, `BulletListSection.vue`, `FeatureTabsSection.vue`, `ContactFormSection.vue`.

**`src/components/forms/`:**
- Purpose: Form components.
- Contains: 2 components.
- Key files: `src/components/forms/ContactForm.vue` (name/email/business/spend/message + mailto submission), `src/components/forms/ConsultationForm.vue`.

**`src/composables/`:**
- Purpose: Reusable composition functions for reactive browser logic.
- Contains: 5 `.ts` files.
- Key files: `src/composables/useSeo.ts` (head sync), `src/composables/useBreakpoints.ts`, `src/composables/useCursorGlow.ts`, `src/composables/useIntersectionReveal.ts`, `src/composables/useScrollReveal.ts`.

**`src/content/`:**
- Purpose: Typed copy decks — single source of truth for marketing site copy.
- Contains: One file per page (`home.ts`, `services.ts`, `about.ts`, `case-studies.ts`, `contact.ts`), globals (`site.config.ts`, `navigation.ts`, `footer.ts`), and unrouted-but-kept files (`branding.ts`, `careers.ts`, `marketing.ts`, `websites.ts`).
- Key files: `src/content/site.config.ts` (`siteConfig.email`, regions, social), `src/content/navigation.ts` (`navItems`, `navCta`), `src/content/footer.ts`, `src/content/home.ts`.

**`src/pages/`:**
- Purpose: One `.vue` per route. Marketing pages are 16-line shells; legal pages embed long-form static copy directly.
- Contains: 11 `.vue` files (5 routed marketing, 4 unrouted-but-kept marketing, 2 legal).
- Key files: Routed → `HomePage.vue`, `ServicesPage.vue`, `AboutPage.vue`, `CaseStudiesPage.vue`, `ContactPage.vue`, `PrivacyPage.vue`, `TermsPage.vue`. Unrouted (kept on disk) → `BrandingPage.vue`, `WebsitesPage.vue`, `MarketingPage.vue`, `CareersPage.vue`.

**`src/styles/`:**
- Purpose: Global CSS — Tailwind v4 `@theme` token block, resets, typography, focus-visible ring, skip-link.
- Contains: 2 files.
- Key files: `src/styles/tokens.css` (design tokens), `src/styles/base.css` (resets + typography; imports `tokens.css`).

**`src/types/`:**
- Purpose: TypeScript contracts shared between content files and components.
- Contains: 1 file.
- Key files: `src/types/content.ts` — `CTA`, `HeroContent`, `PageSection` (discriminated union), `MarketingPageContent`, supporting item shapes.

**`dist/`:**
- Purpose: Vite production build output. Contains hashed per-route chunks for code-splitting.
- Generated: Yes (by `npm run build`).
- Committed: Yes (in this repo at the time of analysis).

**`.lighthouseci/`:**
- Purpose: Stored Lighthouse CI run reports.
- Generated: Yes (by `npm run lighthouse`).
- Committed: Yes.

**`.planning/`:**
- Purpose: GSD workflow artifacts. This document lives in `.planning/codebase/`.
- Generated: Yes (by GSD agents).
- Committed: Yes.

## Key File Locations

**Entry Points:**
- `index.html`: SPA shell — sets meta tags, mounts `<div id="app">`, loads `/src/main.ts`.
- `src/main.ts`: JS entry — creates Vue app, installs `vue-router` and `@vueuse/head`, imports `./styles/base.css`, mounts `#app`.
- `src/App.vue`: Root component — single `<RouterView />`.

**Configuration:**
- `vite.config.ts`: Vite plugins (`@vitejs/plugin-vue`, `@tailwindcss/vite`) and alias `@ → src`.
- `tsconfig.json`: Project-references entry; references `tsconfig.app.json` and `tsconfig.node.json`.
- `tsconfig.app.json`: App TS config — extends `@vue/tsconfig/tsconfig.dom.json`, sets `paths` for `@/*`, enables strict + linting flags.
- `tsconfig.node.json`: Tooling TS config (used by `vite.config.ts`).
- `.lighthouserc.json`: Lighthouse CI thresholds and run config.
- `.gitignore`: Standard Node + Vite ignores.
- `.vscode/extensions.json`: Recommended editor extensions.

**Core Logic:**
- `src/app/router/index.ts`: Route table, lazy imports, legacy redirects, scroll behaviour.
- `src/app/layouts/DefaultLayout.vue`: Page chrome — skip link, fixed header, slot, footer.
- `src/components/sections/SectionRenderer.vue`: Discriminated-union dispatcher mapping `section.type` → section component.
- `src/components/hero/HeroMarketing.vue`: Hero with `visualMap[HeroVisualKey]` lookup and `split | centered` layouts.
- `src/components/common/AppButton.vue`: CTA renderer that picks element kind from `cta.action`.
- `src/components/forms/ContactForm.vue`: Reactive form, validation, `mailto:` submission.
- `src/types/content.ts`: All shared type contracts.
- `src/composables/useSeo.ts`: Page-level SEO head sync.

**Content & Copy:**
- `src/content/site.config.ts`: Brand email, URL, regions, social handles.
- `src/content/navigation.ts`: `navItems[]`, `navCta` consumed by `SiteHeader`.
- `src/content/footer.ts`: Sitemap, legal links, social, brand panel for `SiteFooter`.
- `src/content/home.ts`, `services.ts`, `about.ts`, `case-studies.ts`, `contact.ts`: Per-route `MarketingPageContent`.
- `WEBSITE-CONTENT.md` (repo root): Human-readable copy source of truth.

**Styling:**
- `src/styles/tokens.css`: Tailwind v4 `@theme` token block + `:root` custom properties (gradients, shadows, motion).
- `src/styles/base.css`: Resets, typography, focus-visible, skip-link.

**Static Assets:**
- `public/favicon.svg`, `public/logo.svg`: Brand assets served from root.

## Naming Conventions

**Files:**
- Vue components: `PascalCase.vue` (e.g. `HeroMarketing.vue`, `SectionRenderer.vue`).
- Composables: `useThing.ts` in `camelCase` (e.g. `useScrollReveal.ts`).
- Types: lowercase noun (`content.ts`).
- Content modules: lowercase, kebab where multi-word (`case-studies.ts`, `site.config.ts`); exported binding is `<page>Page` (e.g. `homePage`).
- Section components: `<Variant>Section.vue` (e.g. `CardGridSection.vue`, `ContactFormSection.vue`); two exceptions named for their effect rather than `Section` suffix: `MarqueeBand.vue`, `CTASection.vue`.
- CSS: lowercase, kebab where multi-word (`tokens.css`, `base.css`).

**Directories:**
- All-lowercase, single word where possible (`components`, `pages`, `content`, `styles`, `types`, `composables`).
- Component sub-roles: `common`, `navigation`, `hero`, `surfaces`, `sections`, `forms`.
- App-shell directory `app/` contains `router/` and `layouts/`.

**TypeScript identifiers:**
- Types: `PascalCase` (`CTA`, `PageSection`, `MarketingPageContent`).
- Variables / constants: `camelCase` (`navItems`, `siteConfig`, `mailtoHref`).
- Discriminator field: `type: 'kebab-case-tag'` literal strings (`'card-grid'`, `'feature-tabs'`).

**CSS classes inside `<style scoped>`:**
- Kebab-case (`hero-section`, `card-grid`, `app-btn`).
- BEM-ish modifiers via `--variant` only inside the reveal wrapper (`scroll-reveal--visible`).

## Where to Add New Code

**New route / page:**
- Add a content deck typed as `MarketingPageContent` in `src/content/<slug>.ts`.
- Add the page shell in `src/pages/<Slug>Page.vue` following the 16-line pattern of `src/pages/HomePage.vue`.
- Register the route in `src/app/router/index.ts` using `() => import('@/pages/<Slug>Page.vue')` to preserve route-level code splitting.
- Add the link in `src/content/navigation.ts` (and `src/content/footer.ts` if it should appear in the footer sitemap).

**New section variant:**
- Extend the `PageSection` discriminated union in `src/types/content.ts:152-166` with a new tagged variant.
- Create the renderer in `src/components/sections/<Variant>Section.vue` accepting the typed slice.
- Register it in the `v-if` chain inside `src/components/sections/SectionRenderer.vue:21-89`.
- Use the new variant from any `src/content/*.ts` file.

**New shared primitive (button/link/badge variant):**
- Place it in `src/components/common/`.
- Reuse design tokens from `src/styles/tokens.css` via `var(--…)`; do not hardcode brand hex codes.
- Export it as the default export of its file; consumers import as `import Foo from '@/components/common/Foo.vue'`.

**New decorative surface (glass / gradient / glow variant):**
- Place it in `src/components/surfaces/`.
- Surfaces are pure CSS + slots; they should not own any application state.

**New composable (browser reactivity helper):**
- Place it in `src/composables/use<Name>.ts`.
- Return a function-shaped factory that exposes `setRef` (if it observes an element) plus reactive refs.
- Clean up listeners / observers in `onUnmounted` (see `src/composables/useScrollReveal.ts` and `src/composables/useCursorGlow.ts` for the canonical pattern).
- Guard browser globals when used at module scope (`typeof window !== 'undefined'`).

**New form:**
- Place the form component in `src/components/forms/<Name>Form.vue`.
- Wrap it with a section variant (`{ type: 'contact-form' }`-style) under `src/components/sections/` if it should be referenced from content.
- Submission today is `mailto:` only (`src/components/forms/ContactForm.vue:49-62`); replace this method to wire a backend.

**New static asset:**
- Drop it in `public/` and reference it as an absolute path (`/<filename>`) from HTML or content.
- Avoid bundler imports for static assets unless hashing is required.

**New design token / global style:**
- Add the variable to `src/styles/tokens.css` (Tailwind v4 `@theme` block for color/font/radius tokens; `:root` for gradients, shadows, motion).
- Reference it via `var(--…)` in component `<style scoped>`.

**New SEO-relevant meta:**
- Extend `SeoMeta` in `src/types/content.ts:44-52`.
- Update `src/composables/useSeo.ts` to emit the new tag through `useHead`.
- Set the value per page in each `src/content/<page>.ts` `seo` block.

## Special Directories

**`dist/`:**
- Purpose: Production build output (hashed per-route chunks).
- Generated: Yes (`npm run build`).
- Committed: Yes (this repo currently checks in `dist/`).

**`.lighthouseci/`:**
- Purpose: Lighthouse CI run reports.
- Generated: Yes (`npm run lighthouse`).
- Committed: Yes.

**`.planning/`:**
- Purpose: GSD planning artifacts (this document and siblings live in `.planning/codebase/`).
- Generated: Yes (by GSD agents).
- Committed: Yes.

**`node_modules/`:**
- Purpose: Installed dependencies.
- Generated: Yes (`npm install`).
- Committed: No (in `.gitignore`).

**`public/`:**
- Purpose: Files served at the site root without bundler processing.
- Generated: No (hand-authored).
- Committed: Yes.

## Scaffold Leftovers (do not extend)

These files exist from the initial Vite scaffold and are not part of the live render tree. Do not import them in new code; future cleanup phases may delete them.

- `src/style.css` — Vite template stylesheet; not imported by `src/main.ts` (only `./styles/base.css` is).
- `src/components/HelloWorld.vue` — Vite template demo; unreferenced.
- `src/assets/vue.svg` — Vite template logo; unreferenced.
- `public/vite.svg` — Vite template logo; not used by `index.html` (which references `/favicon.svg`).

---

*Structure analysis: 2026-05-08*
