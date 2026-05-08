<!-- refreshed: 2026-05-08 -->
# Architecture

**Analysis Date:** 2026-05-08

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                      Browser (SPA shell)                     │
│  `index.html` → mounts #app, loads /src/main.ts as ES module │
└─────────────────────────────────────────┬───────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   Bootstrap & App Shell                      │
│  `src/main.ts` (createApp + createHead + router) → App.vue   │
│  `src/App.vue` renders <RouterView />                        │
└─────────────────────────────────────────┬───────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Routing (vue-router 4)                    │
│  `src/app/router/index.ts` — lazy `() => import('@/pages/*')`│
│  History: createWebHistory · 404 catch-all redirects to '/'  │
└─────────────┬───────────────────────────────┬───────────────┘
              │                               │
              ▼                               ▼
┌───────────────────────────┐   ┌───────────────────────────────┐
│   Marketing Page Shell    │   │   Legal Page Shell             │
│  `src/pages/HomePage.vue` │   │  `src/pages/PrivacyPage.vue`   │
│  `src/pages/ServicesPage` │   │  `src/pages/TermsPage.vue`     │
│  `src/pages/AboutPage…`   │   │  (long-form HTML, hardcoded)   │
│  `src/pages/CaseStudies…` │   │                                │
│  `src/pages/ContactPage…` │   │                                │
└────────────┬──────────────┘   └────────────┬──────────────────┘
             │                               │
             ▼                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Layout (slot wrapper)                     │
│  `src/app/layouts/DefaultLayout.vue`                         │
│  Skip link · <SiteHeader/> · <main><slot/></main> · <Footer/>│
└─────────────┬─────────────────────────────────┬─────────────┘
              │                                 │
              ▼                                 ▼
┌─────────────────────────────┐   ┌──────────────────────────────┐
│        Hero band            │   │        Section stream        │
│  `HeroMarketing.vue`        │   │  `SectionRenderer.vue` maps  │
│  v-bind="page.hero"         │   │  PageSection.type → component│
│  HeroVisualKey → visualMap  │   │  → sections/* components     │
└─────────────┬───────────────┘   └────────────┬─────────────────┘
              │                                 │
              ▼                                 ▼
┌─────────────────────────────────────────────────────────────┐
│   Static, typed content (single source of truth for copy)   │
│   `src/content/*.ts` — typed by `src/types/content.ts`       │
│   `MarketingPageContent { seo, hero, sections[] }`           │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| App bootstrap | Create Vue app, register router and `@vueuse/head`, import base CSS, mount `#app` | `src/main.ts` |
| Root component | Render `<RouterView />` only — no other markup | `src/App.vue` |
| Router | Visible routes (lazy), legacy redirects, scroll restoration | `src/app/router/index.ts` |
| Default layout | Skip link, fixed header, `<main>` slot, footer | `src/app/layouts/DefaultLayout.vue` |
| Site header | Fixed nav, scroll-state class, desktop links + mobile menu | `src/components/navigation/SiteHeader.vue` |
| Mobile menu | Off-canvas nav drawer | `src/components/navigation/MobileMenu.vue` |
| Site footer | Sitemap, legal links, social, brand panel | `src/components/navigation/SiteFooter.vue` |
| Page shell (marketing) | Pull content + run `useSeo()`, pipe `hero` and `sections` through reusable components | `src/pages/HomePage.vue`, `src/pages/ServicesPage.vue`, `src/pages/AboutPage.vue`, `src/pages/CaseStudiesPage.vue`, `src/pages/ContactPage.vue` |
| Page shell (legal) | Static long-form copy with shared layout | `src/pages/PrivacyPage.vue`, `src/pages/TermsPage.vue` |
| Hero | Layout switcher (`split` vs `centered`); selects visual via `visualMap[HeroVisualKey]` | `src/components/hero/HeroMarketing.vue` |
| Hero visuals | Decorative per-page right-column compositions | `src/components/hero/visuals/HomeGrowthVisual.vue` (and 4 siblings) |
| Section dispatcher | `v-if` chain on `section.type` → render correct section component | `src/components/sections/SectionRenderer.vue` |
| Section components | Presentational renderers for one `PageSection` variant each | `src/components/sections/*.vue` (14 files) |
| CTA renderer | Pick correct element (`<a mailto>`, `<a target=_blank>`, `<RouterLink>`, `<button>`) from `CTA` shape | `src/components/common/AppButton.vue` |
| Reveal wrapper | Apply IntersectionObserver-driven fade/slide via CSS vars | `src/components/common/RevealOnScroll.vue` |
| Surfaces | Glass / spotlight / gradient backdrop / cursor glow / floating badge primitives | `src/components/surfaces/*.vue` |
| Form | Build `mailto:` href from reactive form state, no backend | `src/components/forms/ContactForm.vue` |
| Composables | `useSeo`, `useBreakpoints`, `useCursorGlow`, `useIntersectionReveal`, `useScrollReveal` | `src/composables/*.ts` |
| Type contracts | Discriminated unions for `PageSection`, `CTA`, `HeroContent`, `MarketingPageContent` | `src/types/content.ts` |
| Content | Typed copy decks per page + global `siteConfig`, `navigation`, `footer` | `src/content/*.ts` |

## Pattern Overview

**Overall:** Data-driven, content-as-code SPA. Pages are thin shells; copy and structure live in `src/content/*.ts` and are rendered by reusable components dispatched through `SectionRenderer`.

**Key Characteristics:**
- Single Page Application; all routing client-side via `vue-router` `createWebHistory()` (`src/app/router/index.ts`).
- Vue 3 Composition API with `<script setup lang="ts">` exclusively (`src/components/**/*.vue`).
- Discriminated-union content model: `PageSection` in `src/types/content.ts` is the contract between content files and section components, dispatched by string `type` in `src/components/sections/SectionRenderer.vue`.
- Route-level code splitting via dynamic `() => import('@/pages/*.vue')` (`src/app/router/index.ts:14-46`).
- No global store, no API client, no SSR. Forms compose `mailto:` URLs in the client (`src/components/forms/ContactForm.vue:22-35`).
- Path alias `@ → src` configured in both `vite.config.ts:9-11` and `tsconfig.app.json:7-9` so imports stay flat regardless of folder depth.

## Layers

**Bootstrap (`src/main.ts`):**
- Purpose: Create `App`, install `vue-router` and `@vueuse/head`, import global CSS, mount `#app`.
- Location: `src/main.ts`
- Contains: 12 lines of glue.
- Depends on: `vue`, `@vueuse/head`, `./app/router`, `./App.vue`, `./styles/base.css`.
- Used by: `index.html` (`<script type="module" src="/src/main.ts">`).

**Routing (`src/app/router/`):**
- Purpose: Map URLs to pages, redirect legacy paths, manage scroll behaviour (hash → smooth offset 80, top reset on navigation).
- Location: `src/app/router/index.ts`
- Contains: `createRouter` config, `routes[]`, `scrollBehavior`.
- Depends on: `vue-router`, lazy-imported page components.
- Used by: `src/main.ts`, indirectly by every component using `useRoute`/`useRouter`/`<RouterLink>`/`<RouterView>`.

**Layout (`src/app/layouts/`):**
- Purpose: Page chrome: header, footer, skip link, vertical flex shell.
- Location: `src/app/layouts/DefaultLayout.vue`
- Contains: Slot-based wrapper.
- Depends on: `SiteHeader`, `SiteFooter`.
- Used by: All marketing and legal pages (e.g. `src/pages/HomePage.vue:12-15`).

**Pages (`src/pages/`):**
- Purpose: One file per route. Marketing pages are 16-line shells; legal pages embed static copy directly.
- Location: `src/pages/*.vue`
- Contains: `useSeo(content.seo)`, `<DefaultLayout>`, `<HeroMarketing v-bind="content.hero">`, `<SectionRenderer :sections="content.sections">`.
- Depends on: `src/content/*.ts`, `src/composables/useSeo.ts`, hero + section components.
- Used by: vue-router lazy imports.

**Content (`src/content/`):**
- Purpose: Typed copy decks. The single source of truth for what the marketing site says.
- Location: `src/content/*.ts`
- Contains: One named export per page (`homePage`, `servicesPage`, …) typed as `MarketingPageContent`, plus globals (`siteConfig`, `navItems`, `navCta`, `footerContent`).
- Depends on: `src/types/content.ts`.
- Used by: Pages, navigation, footer, forms.

**Type contracts (`src/types/`):**
- Purpose: Define `CTA`, `HeroContent`, `PageSection` (discriminated union), `MarketingPageContent`, and supporting item shapes.
- Location: `src/types/content.ts`
- Contains: Pure type declarations; no runtime code.
- Depends on: nothing.
- Used by: Content files, section components, hero, form, CTA renderer.

**Composables (`src/composables/`):**
- Purpose: Reusable reactive logic — SEO head sync, breakpoint flags, cursor glow, scroll-reveal observers.
- Location: `src/composables/*.ts`
- Contains: One factory function per file returning refs and setters.
- Depends on: `vue`, `@vueuse/head`, browser globals (`window`, `IntersectionObserver`, `matchMedia`).
- Used by: Pages (`useSeo`), hero (`useCursorGlow`), reveal wrapper (`useScrollReveal`).

**Components (`src/components/`):**
- Purpose: All presentational logic. Six sub-folders by role: `common/`, `navigation/`, `hero/`, `surfaces/`, `sections/`, `forms/`.
- Location: `src/components/`
- Contains: 41 `.vue` files (see `STRUCTURE.md`).
- Depends on: composables, types, content (via `siteConfig`, `navigation`, `footerContent`), other components.
- Used by: Pages, layouts, each other (composition).

**Styles (`src/styles/`):**
- Purpose: Global design tokens (CSS custom properties) and base resets.
- Location: `src/styles/tokens.css`, `src/styles/base.css`
- Contains: Tailwind v4 `@theme {}` token block; resets; typography defaults; skip-link; focus-visible ring.
- Depends on: Tailwind v4 (`@tailwindcss/vite`).
- Used by: Imported once via `src/main.ts → ./styles/base.css → @import "./tokens.css"`.

## Data Flow

### Primary Request Path (loading a marketing page)

1. Browser requests `/services`. Vite-built `dist/index.html` boots `dist/assets/index-*.js`, which mounts `#app` (`src/main.ts:7-12`).
2. `vue-router` resolves `/services` to a lazy chunk and dynamically imports `src/pages/ServicesPage.vue` (`src/app/router/index.ts:19-22`).
3. `ServicesPage` calls `useSeo(servicesPage.seo)` to set `<title>` and meta tags via `@vueuse/head` (`src/composables/useSeo.ts:4-17`).
4. `ServicesPage` renders `<DefaultLayout>` which paints `<SiteHeader>`, `<main>`, `<SiteFooter>` (`src/app/layouts/DefaultLayout.vue:6-14`).
5. Inside the layout slot it spreads the hero: `<HeroMarketing v-bind="servicesPage.hero" />` (`src/pages/ServicesPage.vue:13`).
6. `HeroMarketing` resolves the right-column visual via `visualMap[props.visual]` and renders text + CTAs + visual (`src/components/hero/HeroMarketing.vue:21-33`).
7. `<SectionRenderer :sections="servicesPage.sections" />` iterates the discriminated union and dispatches each section to its component via a `v-if`/`v-else-if` chain on `section.type` (`src/components/sections/SectionRenderer.vue:21-89`).
8. Each section component receives a typed slice of the content and renders it inside a `<Container>` with `<RevealOnScroll>` wrappers for in-view animation.

### CTA Click Flow

1. User clicks an `<AppButton :cta="cta">` somewhere on the page.
2. `AppButton` reads `cta.action` and renders the correct element kind at compile time (`src/components/common/AppButton.vue:37-93`):
   - `route` → `<RouterLink :to="cta.href">` (router push happens via vue-router).
   - `mailto` → `<a :href="cta.href">` (browser opens mail client).
   - `external` → `<a target="_blank" rel="noopener noreferrer">`.
   - `submit` → `<button type="submit">` (used inside `ContactForm`).
   - `scroll` / `modal` / fallback → `<button>` whose click handler calls `router.push`, `scrollIntoView({ behavior: 'smooth' })`, or emits `modalOpen` (`src/components/common/AppButton.vue:22-35`).

### Contact Form Submission (no backend)

1. `ContactFormSection` renders `ContactForm` inside a `<Container>` and `<RevealOnScroll>` (`src/components/sections/ContactFormSection.vue`).
2. `ContactForm` keeps reactive state with `reactive({ name, email, business, spend, message, consent, _honeypot })` (`src/components/forms/ContactForm.vue:12-20`).
3. On `submit`, it runs sync `validate()` (regex + required-field checks), bails on honeypot, then sets `state = 'loading'` (`src/components/forms/ContactForm.vue:37-62`).
4. It assembles a `mailto:` URL with `encodeURIComponent` subject + body using `siteConfig.email` (`src/components/forms/ContactForm.vue:22-35`).
5. It assigns `window.location.href = mailtoHref.value`, which opens the OS mail client. After a 600 ms delay it transitions to `state = 'success'` and shows the fallback link.
6. There is **no network request**. Replacing this with a real endpoint requires editing the `submit()` body in `src/components/forms/ContactForm.vue:49-62`.

### Scroll-Reveal Flow

1. A component wraps content in `<RevealOnScroll direction="up" :delay="120">` (`src/components/common/RevealOnScroll.vue`).
2. The wrapper calls `useScrollReveal({ threshold, rootMargin, once })` which creates an `IntersectionObserver` per element via the `setRef` callback (`src/composables/useScrollReveal.ts:22-50`).
3. When `prefers-reduced-motion: reduce` is set, the observer is skipped and `isVisible` flips immediately (`src/composables/useScrollReveal.ts:32-35`).
4. On intersect, `isVisible = true` toggles the CSS class `scroll-reveal--visible`, which transitions opacity, transform, and filter using design-token easings.

**State Management:**
- No store framework (no Pinia, Vuex, or Redux). Application state is local component state via `ref` / `reactive` / `computed`.
- Routing state is owned by `vue-router` (`useRoute`, `useRouter`).
- Document head state is owned by `@vueuse/head` (registered in `src/main.ts:11`).
- Scroll, viewport, and pointer state are read directly from browser APIs in composables (`src/composables/useBreakpoints.ts`, `src/composables/useScrollReveal.ts`, `src/composables/useCursorGlow.ts`).

## Key Abstractions

**`PageSection` (discriminated union):**
- Purpose: A typed description of one renderable block in a marketing page.
- Examples: `src/types/content.ts:152-166`, used in every `src/content/*.ts` deck.
- Pattern: Tagged union — every variant has a literal `type` string. `SectionRenderer` switches on this tag, enabling exhaustive type-narrowing in TypeScript.

**`CTA`:**
- Purpose: Uniform call-to-action descriptor that decouples copy from rendering choice.
- Examples: `src/types/content.ts:1-6`, consumed by `src/components/common/AppButton.vue`.
- Pattern: `action` field selects the element kind; `href` is shared across `route`, `mailto`, `external`. **Components must never call `router.push` directly** — they must accept a `CTA` and pass it to `AppButton` (see `CLAUDE.md` rule: "no hardcoded `router.push` inside components").

**`MarketingPageContent`:**
- Purpose: Top-level shape every routable marketing page exports.
- Examples: `src/types/content.ts:168-172`, exported as `homePage`, `servicesPage`, `aboutPage`, `caseStudiesPage`, `contactPage` from the matching `src/content/*.ts` files.
- Pattern: `{ seo, hero, sections }` triple — drives the consistent shell `useSeo + HeroMarketing + SectionRenderer` used by all marketing pages.

**`HeroVisualKey` + `visualMap`:**
- Purpose: Decouple page identity from which decorative visual is shown.
- Examples: `src/types/content.ts:54-60`, lookup in `src/components/hero/HeroMarketing.vue:21-33`.
- Pattern: String key in content → component reference at runtime; falls back to `HomeGrowthVisual` when the key is missing.

**Composables:**
- Purpose: Single-responsibility units of reactive browser logic.
- Examples: `src/composables/useScrollReveal.ts`, `src/composables/useCursorGlow.ts`, `src/composables/useBreakpoints.ts`.
- Pattern: Factory function returning `{ setRef, ...refs }`. `setRef` lets callers attach the observer/listener to a template `ref`. All composables clean up in `onUnmounted`.

## Entry Points

**HTML entry:**
- Location: `index.html`
- Triggers: Initial page load.
- Responsibilities: Set base meta tags (title, description, OG, theme-color, viewport), preconnect Google Fonts, mount target `<div id="app">`, load `/src/main.ts` as an ES module.

**JS entry:**
- Location: `src/main.ts`
- Triggers: Imported by `index.html` and replaced at build time by Vite with hashed `dist/assets/index-*.js`.
- Responsibilities: Create the Vue app instance, install router + head plugin, import global CSS bundle, mount `#app`.

**Per-route entry (lazy):**
- Location: `src/app/router/index.ts:13-47`
- Triggers: First navigation to each route.
- Responsibilities: Dynamically import the page chunk; vue-router awaits the import before rendering `<RouterView>`.

## Architectural Constraints

- **Threading:** Single-threaded browser event loop. Animation work is scheduled with `requestAnimationFrame` (e.g. `src/composables/useCursorGlow.ts:14-20`). No web workers.
- **Global state:** No module-level mutable singletons. The only "globals" are pure data (`siteConfig`, `navItems`, `footerContent`) and the typed content decks in `src/content/*.ts`.
- **Circular imports:** None observed. Layered direction is content → types ← components ← pages ← router ← main.
- **Browser-only APIs:** `useBreakpoints`, `useCursorGlow`, `useIntersectionReveal`, and `useScrollReveal` all assume `window`, `IntersectionObserver`, and `matchMedia`. Of these, only `useScrollReveal` guards `typeof window !== 'undefined'` (`src/composables/useScrollReveal.ts:16-18`); the others rely on being called from `onMounted` / template refs. Future Nuxt SSR migration will require guarding the rest before code runs at module scope.
- **No backend:** The site has no API client, no auth, no persistence. The contact form opens `mailto:` URLs (`src/components/forms/ContactForm.vue:56`). Wiring a backend is a localized change to that one method.
- **TypeScript strictness:** Both `tsconfig.app.json` and `tsconfig.node.json` enable `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`. New code must compile cleanly under these flags.
- **Build:** `npm run build` runs `vue-tsc -b && vite build` (`package.json:8`). Type errors block the build.

## Anti-Patterns

### Hardcoding copy inside components

**What happens:** A component inlines marketing text in its template (e.g. an `<h2>` literal) instead of accepting a typed `props` slice from a content deck.
**Why it's wrong:** Breaks the single-source-of-truth contract in `src/content/*.ts`. Re-routes ownership of copy from content files to component code, making edits non-trivial for non-engineers and bypassing TypeScript content typing.
**Do this instead:** Add the field to the appropriate type in `src/types/content.ts`, surface it through `src/content/<page>.ts`, and have the section component accept it as a prop. See the data-flow chain: `src/content/home.ts` → `<SectionRenderer>` → e.g. `src/components/sections/CardGridSection.vue:10-14`.

### Calling `router.push` from feature components

**What happens:** A button or link inside a section component imports `useRouter` and calls `router.push('/contact')` directly.
**Why it's wrong:** Couples the component to a specific destination and bypasses the `CTA` abstraction. Any link variant (mailto, external, scroll target, modal) suddenly needs custom code, and consumer content cannot override navigation.
**Do this instead:** Accept a `CTA` from typed content and render `<AppButton :cta="cta">`. The button picks the right element automatically (`src/components/common/AppButton.vue:37-93`).

### Bypassing `SectionRenderer` for new sections

**What happens:** A page imports a section component directly and renders it outside `SectionRenderer`, or invents an ad-hoc shape that isn't part of `PageSection`.
**Why it's wrong:** Loses type narrowing across content files, fragments page composition, and drifts page shells away from the 16-line "thin shell" pattern (`src/pages/HomePage.vue:11-16`).
**Do this instead:** Add the variant to the `PageSection` discriminated union in `src/types/content.ts:152-166`, register it in `src/components/sections/SectionRenderer.vue`, and reference it from content via `{ type: 'new-variant', ... }`.

### Browser APIs at module scope

**What happens:** A composable or component file calls `window.matchMedia(...)` at the top level instead of inside a function or `onMounted` block.
**Why it's wrong:** Breaks future SSR (Nuxt) and crashes during `vue-tsc` if types are mis-set. Makes the module non-idempotent.
**Do this instead:** Wrap in `typeof window !== 'undefined'` (see `src/composables/useScrollReveal.ts:16-18`) or move the access into the function returned by the composable.

### Importing the legacy Vite-scaffold CSS

**What happens:** Code imports `src/style.css` (the unmodified `create-vite` template stylesheet that conflicts with the dark theme tokens).
**Why it's wrong:** That file uses a light/dark color-scheme reset and a centered `#app` flex layout that fight `src/styles/base.css` and `src/styles/tokens.css`.
**Do this instead:** Import only `src/styles/base.css` (already done in `src/main.ts:5`). Treat `src/style.css`, `src/components/HelloWorld.vue`, and `src/assets/vue.svg` as scaffolding leftovers.

## Error Handling

**Strategy:** UI-resilience over exception machinery. There is no global error boundary, no logging service, and no error-reporting integration.

**Patterns:**
- Form-level: `try { ... } catch { state.value = 'error' }` with a visible inline message (`src/components/forms/ContactForm.vue:55-62, 184`).
- Route-level: any unmatched path falls through `{ path: '/:pathMatch(.*)*', redirect: '/' }` (`src/app/router/index.ts:56`). There is no dedicated 404 page.
- Component-level: defensive defaults via `?? fallback`, e.g. `props.visual ?? 'home-growth'` (`src/components/hero/HeroMarketing.vue:31`) and `meta.robots ?? 'index, follow'` (`src/composables/useSeo.ts:9`).
- TypeScript-level: discriminated unions force exhaustive handling at compile time inside `SectionRenderer.vue`.

## Cross-Cutting Concerns

**SEO / `<head>`:** Centralised in `src/composables/useSeo.ts`. Each page calls `useSeo(content.seo)` once at the top of `<script setup>`. The `SeoMeta` shape (`src/types/content.ts:44-52`) defines the contract.

**Routing:** Owned by `src/app/router/index.ts`. Pages are lazy-loaded; legacy URL paths get explicit `redirect` rules; a wildcard catch-all redirects unknown paths to `/`.

**Animation / motion:** All motion goes through CSS custom properties defined in `src/styles/tokens.css` (`--motion-fast`, `--motion-base`, `--motion-slow`, `--ease-out-expo`). Reveal logic is encapsulated in `src/components/common/RevealOnScroll.vue` + `src/composables/useScrollReveal.ts`. All motion respects `prefers-reduced-motion: reduce`.

**Theming / design tokens:** Single token sheet at `src/styles/tokens.css` (Tailwind v4 `@theme` block plus `:root` custom properties). Components reference tokens via `var(--…)`; no hardcoded brand hex codes inside components.

**Layout container:** `src/components/common/Container.vue` is the shared `max-width: 1280px` shell. Every section uses it instead of re-declaring widths.

**Assets:** Static assets live in `public/` and are served at the root (e.g. `/favicon.svg`). No bundler import chain — referenced as absolute paths from `index.html` and CSS.

**Build / typecheck:** `npm run build` = `vue-tsc -b && vite build` (`package.json:8`). `tsconfig.json` is a project-references shell pointing at `tsconfig.app.json` (app code) and `tsconfig.node.json` (`vite.config.ts`).

---

*Architecture analysis: 2026-05-08*
