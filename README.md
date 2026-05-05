# Antvertize — Performance Digital Advertising Website

Marketing website for **Antvertize**, a performance-driven digital advertising agency. Built with Vue 3, TypeScript, Tailwind CSS, and Vite.

## What this site is

Five public pages, all data-driven from `src/content/*.ts`:

| Route | Page | What it does |
|---|---|---|
| `/` | Home | Hero · Trust bar · 5 ad services · Why Antvertize · CTA |
| `/services` | Services | Detailed pages for Programmatic, PPC, Social, Display & Retargeting, Video |
| `/about` | About | Who we are, our approach, our expertise |
| `/case-studies` | Case Studies | 3 anchor case studies with concrete metrics |
| `/contact` | Contact | Free-audit form (mailto submit, no backend required) |

Plus `/privacy-policy` and `/terms-and-conditions` for legal coverage.

Old paths from the previous site (`/digital-marketing-services`, `/branding-services`, `/website-development-services`, `/marketing-services`, `/about-antvertize`, `/careers`) redirect to the closest current page so external links keep working.

## Tech stack

- **Vue 3** — Composition API, `<script setup>`
- **TypeScript** — full type safety
- **Vite** — dev server + production build with route-level code splitting
- **Vue Router**
- **@vueuse/head** — SEO meta management

## Architecture

```
src/
  app/router/index.ts        # 5 visible routes + 2 legal + redirects
  app/layouts/DefaultLayout  # Header + main + Footer wrapper
  components/
    common/                  # AppButton, AppLink, SectionHeader, Container, RevealOnScroll, BadgePill
    navigation/              # SiteHeader, MobileMenu, SiteFooter
    hero/HeroMarketing       # split | centered layouts
    surfaces/                # GlassCard, GradientBackdrop, FloatingBadge, SpotlightCard, CursorGlowSurface
    sections/                # SectionRenderer + StatGrid, ServiceDetail, CardGrid, CaseStudyGrid,
                             # ArticleGrid, FAQ, MarqueeBand, CTA, ValueWordCloud, TextColumns,
                             # TrustBar, BulletList, ContactFormSection
    forms/ContactForm        # 5 fields, mailto-compose submit
  composables/               # useSeo, useScrollReveal, useCursorGlow, useIntersectionReveal, useBreakpoints
  content/                   # All copy lives here. One file per page.
  pages/                     # Thin Vue files that wire content → SectionRenderer
  styles/                    # tokens.css, base.css
  types/                     # content.ts (CTA, Hero, Section discriminated union, etc.)
```

### Data-driven pages

Every page is a thin shell:

```vue
<HeroMarketing v-bind="page.hero" />
<SectionRenderer :sections="page.sections" />
```

`SectionRenderer` dispatches each section to its component based on `section.type`. To add a new section type:

1. Add a new variant to the `PageSection` discriminated union in `src/types/content.ts`.
2. Build a section component under `src/components/sections/`.
3. Register it in `SectionRenderer.vue`.

### CTAs

CTAs are configurable via the `CTA` type:

```ts
{ label: 'Get Free Audit', action: 'route', href: '/contact' }
{ label: 'Book a Strategy Call', action: 'mailto', href: 'mailto:hello@antvertize.com' }
```

Supported actions: `route` · `external` · `mailto` · `scroll` · `modal` · `submit`.

### Contact form

`src/components/forms/ContactForm.vue` collects Name, Email, Business, Monthly Ad Spend, Message and on submit opens a pre-filled `mailto:hello@antvertize.com` draft. No backend required. Swap the submit handler with a real endpoint when you wire up a CRM.

## Commands

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # vue-tsc + vite build → dist/
npm run preview    # serve dist/
```

## Deploy

Output is static. Drop `dist/` on Vercel, Netlify, Cloudflare Pages, or any static host:

```bash
npx vercel --prod
npx netlify-cli deploy --prod --dir=dist
```

Note: client-side routing requires a SPA fallback (rewrite all paths to `/index.html`). All three platforms above do this automatically.

## Editing content

All copy lives in `src/content/`:

- `home.ts`, `services.ts`, `about.ts`, `case-studies.ts`, `contact.ts` — page content
- `navigation.ts` — header nav items + CTA
- `footer.ts` — footer tagline, service line, link groups, social, copyright
- `site.config.ts` — brand name, email, regions served, social URLs

Never put copy directly in components — Tailwind components stay presentational.
