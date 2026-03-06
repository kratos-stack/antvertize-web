# Antvertize — Premium Digital Advertising Website

Multi-page marketing website for a digital advertising and branding agency. Built with Vue 3, TypeScript, and Tailwind CSS.

## Tech Stack

- **Vue 3** — Composition API, `<script setup>`
- **TypeScript** — full type safety
- **Vite** — fast dev server, route-level code splitting
- **Tailwind CSS v4** — utility-first styling with custom design tokens
- **Vue Router** — client-side routing
- **@vueuse/head** — SEO meta management
- **Playfair Display / Sora / Inter** — typography stack

## Project Structure

```
src/
  app/router/          # Vue Router config (9 routes)
  components/
    common/            # AppButton, AppLink, SectionHeader, Container, RevealOnScroll
    navigation/        # SiteHeader, MobileMenu, SiteFooter
    hero/              # HeroMarketing
    surfaces/          # GlassCard, GradientBackdrop, FloatingBadge
    sections/          # SectionRenderer + all section components
    forms/             # ConsultationForm
  composables/         # useSeo, useScrollReveal, useCursorGlow
  content/             # All copy — one file per page, never in components
  pages/               # One .vue per route (thin, data-driven)
  styles/              # tokens.css (design tokens), base.css
  types/               # content.ts, seo.ts, cta.ts
```

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/digital-marketing-services` | Services |
| `/branding-services` | Branding |
| `/website-development-services` | Websites |
| `/marketing-services` | Marketing |
| `/about-antvertize` | About |
| `/careers` | Careers |
| `/privacy-policy` | Privacy Policy |
| `/terms-and-conditions` | Terms & Conditions |

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build (runs vue-tsc then vite build)
npm run preview    # Preview production build
npm run typecheck  # Type check only
npm run lint       # Lint
```

## Deploy

Zero-config deploy to Vercel, Netlify, or Cloudflare Pages. Output directory: `dist`.

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify-cli deploy --prod --dir=dist
```
