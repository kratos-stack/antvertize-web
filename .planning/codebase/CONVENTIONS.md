# Coding Conventions

**Analysis Date:** 2026-05-08

## Naming Patterns

**Files:**
- Vue components: `PascalCase.vue` — `AppButton.vue`, `HeroMarketing.vue`, `SectionRenderer.vue`, `ContactForm.vue`
- Composables: `useCamelCase.ts` (one composable per file) — `useSeo.ts`, `useScrollReveal.ts`, `useCursorGlow.ts`, `useBreakpoints.ts`, `useIntersectionReveal.ts`
- Pages: `<Name>Page.vue` — `HomePage.vue`, `ServicesPage.vue`, `AboutPage.vue`, `CaseStudiesPage.vue`, `ContactPage.vue`, `PrivacyPage.vue`, `TermsPage.vue`
- Section components: `<Name>Section.vue` (or `<Name>Band.vue` for marquee) — `FAQSection.vue`, `CardGridSection.vue`, `FeatureTabsSection.vue`, `MarqueeBand.vue`
- Hero visuals: `<Page><Subject>Visual.vue` — `HomeGrowthVisual.vue`, `ServicesChannelsVisual.vue`, `AboutDecadeVisual.vue`, `CaseStudiesResultsVisual.vue`, `ContactAuditVisual.vue`
- Content modules: kebab-case `.ts` matching the route — `home.ts`, `case-studies.ts`, `site.config.ts`, `navigation.ts`, `footer.ts`
- Types: single barrel file `src/types/content.ts` (no per-type files)

**Functions:**
- `camelCase` for everything — `validate()`, `submit()`, `reset()`, `setActive()`, `scrollRailItemIntoView()`, `onScroll()`, `onKeyDown()`, `handleClick()`
- Composables MUST start with `use` — `useSeo`, `useCursorGlow`, `useScrollReveal`
- Event handlers prefixed with `on` — `onMove`, `onScroll`, `onTouchStart`, `onTouchEnd`, `onKeyDown`

**Variables:**
- `camelCase` for locals and refs — `mailtoHref`, `activeIndex`, `prefersReducedMotion`, `mobileOpen`
- Vue refs/reactive use the bare name (no `_ref` suffix); access via `.value` in script
- Private/template-only conventions: honeypot field uses leading underscore — `form._honeypot` (`src/components/forms/ContactForm.vue:19`)

**Types:**
- `PascalCase` for all exported types and interfaces — `CTA`, `HeroContent`, `MarketingPageContent`, `PageSection`, `ScrollRevealOptions`, `RevealDirection`, `FormState`
- Discriminated unions use a `type` literal field — `PageSection` in `src/types/content.ts:152` discriminates on `type: 'stat-grid' | 'service-detail-list' | ...`
- String-literal unions used liberally for finite enums — `'idle' | 'loading' | 'success' | 'error'` (`src/components/forms/ContactForm.vue:7`), `'forward' | 'backward'`, `'left' | 'center'`

**Routes (in router and content):**
- Route paths: kebab-case — `/case-studies`, `/privacy-policy`, `/terms-and-conditions`
- Route `name`: kebab-case matching the path slug — `case-studies`, `privacy`, `terms` (`src/app/router/index.ts`)

## Code Style

**Formatting:**
- No formatter config in repo (no `.prettierrc*`, no `biome.json`, no `.editorconfig`)
- De facto style observed throughout `src/`:
  - 2-space indentation in `<script>`, `<template>`, and CSS blocks
  - Single quotes for TS/JS strings — `'idle'`, `'@/types/content'`
  - Double quotes for HTML/template attributes — `class="hero-section"`, `:aria-expanded="mobileOpen"`
  - No semicolons at end of TS statements (`src/main.ts`, all composables)
  - Trailing commas in multi-line object/array literals (e.g. `src/app/router/index.ts:17`)
  - Compact one-line CSS rules are common in `<style scoped>` blocks (e.g. `src/components/common/AppButton.vue:122`)

**Linting:**
- No ESLint config present; type-checking via `vue-tsc -b` in the build script (`package.json:8`) is the only pre-push gate locally
- TypeScript strictness flags enabled in `tsconfig.app.json` and `tsconfig.node.json`:
  - `strict: true`
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noFallthroughCasesInSwitch: true`
  - `noUncheckedSideEffectImports: true`
  - `erasableSyntaxOnly: true`
- Path alias enforced: `@/*` → `src/*` (`tsconfig.app.json:7-9`, mirrored in `vite.config.ts:8-12`)

## Import Organization

**Order (observed pattern, e.g. `src/components/forms/ContactForm.vue`, `src/components/sections/CardGridSection.vue`):**
1. Vue runtime imports (`vue`, `vue-router`) and value imports
2. `import type` statements from `@/types/...`
3. Local `@/composables/...` and `@/content/...` modules
4. `@/components/...` imports — common → surfaces → forms → sections (rough top-down dependency order)
5. Same-directory imports last using relative `./` (e.g. `import MobileMenu from './MobileMenu.vue'` in `src/components/navigation/SiteHeader.vue:7`)

**Path Aliases:**
- `@/` always resolves to `src/` — used for cross-directory imports
- Relative imports (`./`) used only for same-directory siblings
- No parent-relative imports (`../`) anywhere in `src/` — confirmed via repo-wide grep

**Type imports:**
- Always use `import type { ... }` for type-only imports — see `src/composables/useSeo.ts:2`, `src/components/sections/SectionRenderer.vue:2`, `src/types/content.ts` consumers
- Required by TS option `verbatimModuleSyntax: true` (`tsconfig.node.json:14`) and good practice everywhere else

## Error Handling

**Patterns:**
- This is a static marketing site — there is no API client, no data fetching layer, no global error boundary
- Form submissions use `try { ... } catch { state.value = 'error' }` with a UI state machine — `src/components/forms/ContactForm.vue:55-61`, `src/components/forms/ConsultationForm.vue:57-62`
- Form validation collects errors into a reactive `Record<string, string>` and renders inline via `role="alert"` — `src/components/forms/ContactForm.vue:37-47`
- Cleanup is defensive: every observer/event listener is removed in `onUnmounted` / `onBeforeUnmount` — `src/composables/useCursorGlow.ts:38-41`, `src/composables/useIntersectionReveal.ts:29-31`, `src/components/sections/FeatureTabsSection.vue:130-133`
- Browser-globals are guarded for SSR-readiness (CLAUDE.md goal: "Support future Nuxt migration") — `typeof window !== 'undefined'` check in `src/composables/useScrollReveal.ts:16`

## Logging

**Framework:** None.

**Patterns:**
- Zero `console.log/warn/error/info/debug` calls in `src/` (verified via repo-wide grep)
- Errors surface as user-facing messages (e.g. `form-err` paragraph, `field-error` spans), never as console output

## Comments

**When to Comment:**
- Comments explain *why* or mark template regions, not what
- Common patterns:
  - HTML region markers — `<!-- Logo -->`, `<!-- Desktop nav -->`, `<!-- RAIL -->`, `<!-- STAGE -->` (`src/components/navigation/SiteHeader.vue`, `src/components/sections/FeatureTabsSection.vue`)
  - Multi-line trade-off explanations — see the Vue transition rationale at `src/components/sections/FeatureTabsSection.vue:597-601`
  - Inline TODO-style notes — `// spam honeypot`, `// Simulate API call` (`src/components/forms/ConsultationForm.vue:54,58`)
- No JSDoc/TSDoc on functions in general; one TSDoc-style hint exists on `HeroContent.visual` at `src/types/content.ts:74`

**JSDoc/TSDoc:**
- Not used systematically. TypeScript types and well-named props are the primary documentation.

## Function Design

**Size:**
- Composables: small, single-purpose — `useSeo` is 14 lines, `useBreakpoints` is 25, `useIntersectionReveal` is 35
- Component scripts can be longer when they own complex interaction state (e.g. `FeatureTabsSection.vue` script is ~145 lines, owns autoplay timer + intersection observer + keyboard nav + touch swipe). Split when responsibilities diverge — composables exist precisely to extract reusable browser-API logic.

**Parameters:**
- Composables that take options accept a single options object with sensible defaults — `useScrollReveal(options: ScrollRevealOptions = {})` (`src/composables/useScrollReveal.ts:12`)
- Vue components declare props via `defineProps<TypeLiteral>()` (no runtime `defineProps([...])` array form)
- Optional props expressed via `?:` in the type literal; defaults supplied with `withDefaults(...)` only when needed — `src/components/common/RevealOnScroll.vue:6-24`

**Return Values:**
- Composables return an object of refs + functions — `{ setRef, isVisible, prefersReducedMotion }` (`src/composables/useScrollReveal.ts:56`)
- Validation functions return `boolean` and mutate the `errors` reactive in place — `src/components/forms/ContactForm.vue:46`

## Module Design

**Exports:**
- Named exports everywhere — `export function useSeo(...)`, `export const homePage`, `export type CTA`
- Single exception: the router uses `export default router` (`src/app/router/index.ts:60`) because Vue Router is configured once
- One responsibility per file — types in `src/types/content.ts`, content in `src/content/<page>.ts`, composables 1:1

**Barrel Files:**
- Not used. There is no `src/components/index.ts` etc. Every consumer imports the exact file path through the `@/` alias.

## Vue 3 Conventions

**Component definition:**
- Always `<script setup lang="ts">` — Composition API only, no `defineComponent`, no Options API, no `.tsx`
- Mandated by CLAUDE.md and confirmed across all 60+ component files

**Props:**
- Type-only `defineProps<{ ... }>()` (no runtime array form, no `PropType` casts) — `src/components/sections/SectionRenderer.vue:18`, `src/components/common/AppButton.vue:6-11`
- `withDefaults(defineProps<...>(), { ... })` only when defaults are needed — `src/components/common/RevealOnScroll.vue:6-24`
- Props are accessed via the returned `props` object inside `<script>`, but referenced bare in `<template>` (Vue auto-unwraps)

**Emits:**
- Type-only `defineEmits<{ eventName: [argTypes] }>()` — `src/components/common/AppButton.vue:13-15` (`modalOpen: []`)

**Styling:**
- Tailwind utilities are available globally (Tailwind v4 via `@tailwindcss/vite`); design tokens live in `src/styles/tokens.css`
- Component-specific styles use `<style scoped>` with kebab-case class names — `.hero-section`, `.faq-list`, `.app-btn`, `.rail-btn`
- Always reference design tokens (`var(--color-primary)`, `var(--motion-fast)`, `var(--ease-out-expo)`) instead of hard-coded hex values, except for the small palette of brand colors quoted by name in CLAUDE.md (`#8B5CF6`, `#22D3EE`, `#3B82F6`)
- `:deep(...)` is used to style child component slots (e.g. `src/components/common/SectionHeader.vue:31`, `src/components/hero/HeroMarketing.vue:122`)

**Reactivity:**
- `ref<T>(initial)` for primitives and DOM refs — `const state = ref<FormState>('idle')`
- `reactive({ ... })` for grouped form/object state — `const form = reactive({ name: '', email: '', ... })`
- `computed(() => ...)` for derived values — `const variant = computed(() => props.variant ?? 'primary')`
- DOM refs in setup use `ref<HTMLElement | null>(null)` and are bound by template `ref="..."` — `src/components/sections/FeatureTabsSection.vue:19-21`

**Lifecycle hooks:**
- Always paired: any `onMounted`/`addEventListener` has a matching `onUnmounted`/`removeEventListener`
- For long-lived RAF loops, store the id and `cancelAnimationFrame` on teardown — `src/composables/useCursorGlow.ts:38-41`, `src/components/sections/FeatureTabsSection.vue:130-133`
- `onBeforeUnmount` used when teardown must run before child teardown (e.g. timer + observer cleanup); `onUnmounted` is the default

## Accessibility Conventions

- Every interactive control gets ARIA wiring:
  - FAQ accordion uses `aria-expanded`, `aria-controls`, `aria-labelledby` — `src/components/sections/FAQSection.vue:42-53`
  - Tabs use `role="tablist"` / `role="tab"` / `role="tabpanel"` plus roving `tabindex` — `src/components/sections/FeatureTabsSection.vue:177-194,229`
  - Form errors use `role="alert"`, `:aria-invalid`, `:aria-describedby` — `src/components/forms/ContactForm.vue:107`
  - Hamburger button exposes `aria-label` and `aria-expanded` — `src/components/navigation/SiteHeader.vue:54-56`
- Skip-to-content link is required and present in `src/app/layouts/DefaultLayout.vue:8`
- Decorative SVGs/icons are marked `aria-hidden="true"`
- `prefers-reduced-motion` is respected in every animation-bearing composable/component — `src/composables/useScrollReveal.ts:16-18,32-35`, `src/composables/useCursorGlow.ts:31-32`, `src/components/sections/FeatureTabsSection.vue:113`, `src/components/common/RevealOnScroll.vue:84-93`
- External anchors always set `rel="noopener noreferrer"` and `target="_blank"` — `src/components/common/AppLink.vue:16-17`, `src/components/common/AppButton.vue:57-58`

## CTA / Behavior Conventions

- All call-to-action behavior must flow through the `CTA` type (`src/types/content.ts:1-6`) and `AppButton.vue` (`src/components/common/AppButton.vue`)
- Components must NOT call `router.push(...)` or `window.open(...)` directly — that logic lives in `AppButton.handleClick` (`src/components/common/AppButton.vue:22-35`)
- New CTA actions require extending the `CTA['action']` union and the renderer in `AppButton.vue`

## Content & Copy Conventions

- All visible copy lives in `src/content/*.ts`. Components are presentational and never hardcode strings (CLAUDE.md, "LLM Code Generation Rules")
- A page is a thin shell: import its content file, pipe `hero` to `HeroMarketing`, pipe `sections` to `SectionRenderer` — see `src/pages/HomePage.vue` (~16 lines) as the canonical example
- New section types follow a 3-step contract: extend `PageSection` discriminated union → add `<Name>Section.vue` under `src/components/sections/` → register in `SectionRenderer.vue` (CLAUDE.md, "Section types")

---

*Convention analysis: 2026-05-08*
