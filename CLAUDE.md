# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for **Antvertize**, a performance digital advertising agency. The current source of truth for what the site says is `WEBSITE-CONTENT.md`. Everything is built with Vue 3 + TypeScript + Vite + Tailwind CSS.

Earlier specs `SPEC.md` and `SPEC-2.md` describe the previous (multi-discipline) version of the site and are kept for historical reference only — do not treat them as current copy.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build (vue-tsc -b && vite build)
npm run preview   # Preview production build
```

## Tech Stack

- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Language**: TypeScript
- **Build**: Vite with route-level code splitting
- **Routing**: Vue Router
- **Styling**: Tailwind CSS v4 with custom design tokens in `src/styles/tokens.css`
- **SEO**: `@vueuse/head` via `composables/useSeo.ts`

## Routes

| Path | Page | Notes |
|------|------|------|
| `/` | HomePage | |
| `/services` | ServicesPage | 5 ad services |
| `/about` | AboutPage | |
| `/case-studies` | CaseStudiesPage | |
| `/contact` | ContactPage | Free-audit form |
| `/privacy-policy` | PrivacyPage | |
| `/terms-and-conditions` | TermsPage | |

Legacy paths (`/digital-marketing-services`, `/branding-services`, `/website-development-services`, `/marketing-services`, `/about-antvertize`, `/careers`) redirect to the closest current route. The corresponding `BrandingPage.vue`, `WebsitesPage.vue`, `MarketingPage.vue`, `CareersPage.vue` and their content `.ts` files are kept on disk but unrouted, in case they are reactivated later.

## Architecture

### Core pattern: data-driven pages

Pages are thin shells. All copy lives in `src/content/*.ts`. Components are presentational. `SectionRenderer` maps `section.type` strings to the correct section component — pages just pass their content through it.

```
Page.vue → imports content from src/content/<page>.ts
         → passes hero to HeroMarketing
         → passes sections[] to SectionRenderer
         → SectionRenderer dispatches to correct section component
```

### Directory structure

```
src/
  app/
    router/index.ts          # Visible routes + redirects + 404 catch-all
    layouts/DefaultLayout.vue
  components/
    common/                  # AppButton, AppLink, SectionHeader, Container, BadgePill, RevealOnScroll
    navigation/              # SiteHeader, MobileMenu, SiteFooter
    hero/                    # HeroMarketing (layout: 'split' | 'centered')
    surfaces/                # GlassCard, SpotlightCard, CursorGlowSurface, GradientBackdrop, FloatingBadge
    sections/                # SectionRenderer + section components (see below)
    forms/                   # ContactForm
  composables/               # useSeo, useBreakpoints, useIntersectionReveal, useScrollReveal, useCursorGlow
  content/                   # site.config.ts, navigation.ts, footer.ts, one file per page
  pages/                     # One .vue per route (thin, data-driven)
  types/                     # content.ts
  styles/                    # tokens.css, base.css
```

### Section types (`src/types/content.ts` → `PageSection`)

`stat-grid` · `service-detail-list` · `card-grid` · `case-study-grid` · `article-grid` · `faq` · `marquee` · `cta-banner` · `value-word-cloud` · `text-columns` · `trust-bar` · `bullet-list` · `contact-form`

To add a new section type:

1. Add it to the `PageSection` discriminated union in `src/types/content.ts`.
2. Add a section component under `src/components/sections/`.
3. Register it in `SectionRenderer.vue`.

### CTAs

CTAs use the `CTA` type from `src/types/content.ts`:

```ts
type CTA = {
  label: string
  href?: string
  action?: 'route' | 'scroll' | 'modal' | 'external' | 'submit' | 'mailto'
  target?: '_self' | '_blank'
}
```

`AppButton` renders the right element automatically: `<RouterLink>` for `route`, `<a href="mailto:…">` for `mailto`, `<a target="_blank">` for `external`, and `<button>` for everything else.

### Contact form

`ContactForm.vue` collects Name, Email, Business, Monthly Ad Spend, Message. Submit assembles a `mailto:hello@antvertize.com` URL with a subject and body and opens the user's mail client. No backend required. To wire a real endpoint, replace the `window.location.href = mailtoHref.value` line in `submit()`.

## Design Tokens

**Colors** — dark-first: base `#060816`, elevated `#0B1020`, surface `#10172A`; brand accents: violet `#8B5CF6`, cyan `#22D3EE`, blue `#3B82F6`

**Typography** — headings: `Sora`; body/UI: `Inter`; h1 desktop: 72px/700; h2 desktop: 52px/700

**Motion** — fast: 180ms, base: 280ms, slow: 450ms; easing: `cubic-bezier(0.22, 1, 0.36, 1)`; no bouncing, no aggressive parallax

**Gradients** — hero primary: `135deg, #8B5CF6 → #22D3EE → #3B82F6`; CTA glow: `135deg, #8B5CF6 → #EC4899`

## LLM Code Generation Rules

- Never hardcode copy inside components — all text goes in `src/content/*.ts`.
- Use Vue 3 Composition API with `<script setup>` only.
- Keep components reusable and presentational.
- Use Tailwind utilities; avoid ad-hoc inline styles where Tailwind covers it.
- CTA behavior must be configurable via the `CTA` type — no hardcoded `router.push` inside components.
- Cursor spotlight glow: CSS variables + `requestAnimationFrame`; disable on mobile and `prefers-reduced-motion`.
- Support future Nuxt migration: use semantic HTML, avoid browser-only globals without guards.
- Route-level lazy loading via dynamic imports in the router.
