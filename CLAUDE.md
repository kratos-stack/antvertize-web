# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a premium multi-page marketing website for a digital/AI/branding agency. The project is defined by `SPEC.md` and is to be built from scratch using Vue 3 + TypeScript + Vite + Tailwind CSS.

## Commands

Once the project is scaffolded, standard commands will be:

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run typecheck # Run Vue TSC type checking
npm run lint      # Run ESLint
```

To run a single test file (once tests are added):
```bash
npx vitest run src/path/to/file.test.ts
```

## Tech Stack

- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Language**: TypeScript
- **Build**: Vite with route-level code splitting
- **Routing**: Vue Router
- **Styling**: Tailwind CSS
- **SEO**: `@vueuse/head`
- **Forms**: vee-validate + zod (optional)
- **Animation**: Motion One or lightweight IntersectionObserver utilities

## Architecture

### Core Pattern: Data-Driven Pages

Pages are thin shells. All copy lives in `src/content/*.ts` files. Components are purely presentational. The `SectionRenderer` component maps `section.type` strings to the correct section component — pages simply pass their content data through it.

```
Page.vue → imports content from src/content/page.ts
         → passes hero to HeroMarketing
         → passes sections[] to SectionRenderer
         → SectionRenderer dispatches to correct section component
```

### Directory Structure

```
src/
  app/
    router/index.ts          # Vue Router config (9 routes)
    layouts/DefaultLayout.vue
  components/
    common/                  # AppButton, AppLink, SectionHeader, Container, BadgePill
    navigation/              # SiteHeader, MobileMenu, SiteFooter
    hero/                    # HeroMarketing
    surfaces/                # GlassCard, SpotlightCard, CursorGlowSurface, GradientBackdrop, FloatingBadge
    sections/                # SectionRenderer + all section components
    forms/                   # ConsultationForm
  composables/               # useSeo, useBreakpoints, useIntersectionReveal, useCursorGlow
  content/                   # site.config.ts, navigation.ts, footer.ts, one file per page
  pages/                     # One .vue per route (thin, data-driven)
  types/                     # content.ts, seo.ts, cta.ts
  styles/                    # tokens.css, base.css
```

### Routes

| Path | Page |
|------|------|
| `/` | HomePage |
| `/digital-marketing-services` | ServicesPage |
| `/branding-services` | BrandingPage |
| `/website-development-services` | WebsitesPage |
| `/marketing-services` | MarketingPage |
| `/about-antvertize` | AboutPage |
| `/careers` | CareersPage |
| `/privacy-policy` | PrivacyPage |
| `/terms-and-conditions` | TermsPage |

### Key Types (`src/types/content.ts`)

- `CTA` — label, href, action (`route | scroll | modal | external | submit`), target
- `SeoMeta` — title, description, canonical, OG fields
- `HeroContent` — eyebrow, title, subtitle, CTAs, highlights, media
- `StatItem` — value, title, description
- `ServiceItem` — id, label, title, body[], bullets[], cta, media, layout (`left | right`)
- `FAQItem` — question, answer
- `PageSection` — discriminated union on `type` field
- `MarketingPageContent` — seo + hero + sections[]

## Design Tokens

**Colors** — dark-first: base `#060816`, elevated `#0B1020`, surface `#10172A`; brand accents: violet `#8B5CF6`, cyan `#22D3EE`, blue `#3B82F6`

**Typography** — headings: `Sora`; body/UI: `Inter`; h1 desktop: 72px/700; h2 desktop: 52px/700

**Motion** — fast: 180ms, base: 280ms, slow: 450ms; easing: `cubic-bezier(0.22, 1, 0.36, 1)`; no bouncing, no aggressive parallax

**Gradients** — hero primary: `135deg, #8B5CF6 → #22D3EE → #3B82F6`; CTA glow: `135deg, #8B5CF6 → #EC4899`

## LLM Code Generation Rules

- Never hardcode copy inside components — all text goes in `src/content/*.ts`
- Use Vue 3 Composition API with `<script setup>` only
- Keep components reusable and presentational
- Use Tailwind utilities; avoid ad hoc inline styles where Tailwind covers it
- CTA behavior must be configurable via the `CTA` type (no hardcoded `router.push`)
- Cursor spotlight glow: CSS variables + `requestAnimationFrame`; disable on mobile and `prefers-reduced-motion`
- Support future Nuxt migration: use semantic HTML, avoid browser-only globals without guards
- Route-level lazy loading via dynamic imports in the router
