# Antvertize-Inspired Premium Vue Website Clone
## LLM Kickstart Specification

This document is a complete, LLM-friendly specification for generating a modernized Vue.js website inspired by the structure and business intent of Antvertize, while using a more premium 2026 design language.

## 1. Goal
Build a responsive, premium, multi-page marketing website for a digital / AI / branding agency using:
- Vue 3
- TypeScript
- Vite
- Vue Router
- Tailwind CSS

The output should be a **modernized functional clone**, not a pixel-for-pixel copy.

The generated site must preserve:
- information architecture
- marketing page structure
- repeated CTA patterns
- service-detail content flow
- case study / article / FAQ / footer patterns

The generated site should modernize:
- typography
- spacing
- gradients
- cards
- motion
- interactivity
- visual hierarchy

---

## 2. High-Level Product Requirements

### The website should support
- multi-page marketing website routing
- sticky responsive navigation
- premium hero sections
- reusable service-detail sections
- stat / proof blocks
- case studies preview
- article preview
- FAQ accordion
- CTA banners
- reusable consultation form
- SEO metadata hooks
- fully data-driven content files

### Out of scope
- CMS backend
- authentication
- CRM implementation
- payment flows
- admin panel

---

## 3. Tech Stack

```yaml
framework: Vue 3
language: TypeScript
build_tool: Vite
router: Vue Router
state_management: Pinia (optional)
styling: Tailwind CSS
forms: vee-validate + zod (optional)
seo_meta: vueuse/head
animation: Motion One or lightweight IntersectionObserver utilities
content_source: local TypeScript content files
```

### Strong recommendation
Keep all content in `/src/content/*.ts` files so an LLM can regenerate or edit copy without changing components.

---

## 4. Routes

```yaml
routes:
  - path: /
    name: home
  - path: /digital-marketing-services
    name: services
  - path: /branding-services
    name: branding
  - path: /website-development-services
    name: websites
  - path: /marketing-services
    name: marketing
  - path: /about-antvertize
    name: about
  - path: /careers
    name: careers
  - path: /privacy-policy
    name: privacy
  - path: /terms-and-conditions
    name: terms
```

---

## 5. Final Design Direction

### Design intent
The site should feel like a premium 2026 AI / digital studio website.

### Keywords
- premium
- cinematic
- dark-first
- editorial
- luminous
- modern enterprise
- refined SaaS
- high-conversion

### Visual principles
- dark immersive backgrounds
- aurora gradients
- selective glassmorphism
- large premium typography
- soft cursor spotlight glow
- restrained motion
- generous spacing
- elegant CTA treatment

### Important
Do **not** generate a plain corporate site.
Do **not** make it overly flashy.
It should feel modern, expensive, and highly readable.

---

## 6. Typography

### Recommended font pairing
- Headings: `Sora`
- Body/UI: `Inter`

### Typography scale
```yaml
typography:
  heading_font: "Sora, Inter, system-ui, sans-serif"
  body_font: "Inter, system-ui, sans-serif"

  h1:
    mobile: "42px/1.05/700"
    desktop: "72px/1.02/700"

  h2:
    mobile: "30px/1.10/700"
    desktop: "52px/1.08/700"

  h3:
    mobile: "22px/1.20/600"
    desktop: "30px/1.15/600"

  body_large:
    mobile: "18px/1.7/400"
    desktop: "20px/1.8/400"

  body:
    mobile: "16px/1.7/400"
    desktop: "18px/1.8/400"

  caption:
    mobile: "13px/1.5/500"
    desktop: "14px/1.5/500"
```

### Typography rules
- Headings should be spacious and premium
- Body text should remain highly readable on dark backgrounds
- Avoid overly condensed fonts
- Use semibold for UI labels and section headers

---

## 7. Color System

```yaml
colors:
  background:
    base: "#060816"
    elevated: "#0B1020"
    surface: "#10172A"
    glass: "rgba(255,255,255,0.06)"
    glass_border: "rgba(255,255,255,0.12)"

  text:
    primary: "#F8FAFC"
    secondary: "#CBD5E1"
    muted: "#94A3B8"
    dark: "#0F172A"

  brand:
    violet: "#8B5CF6"
    cyan: "#22D3EE"
    blue: "#3B82F6"
    emerald: "#34D399"
    pink: "#EC4899"
    amber: "#F59E0B"

  utility:
    border: "rgba(255,255,255,0.10)"
    divider: "rgba(255,255,255,0.08)"
    shadow: "rgba(2,6,23,0.55)"
```

### Gradient tokens
```yaml
gradients:
  hero_primary: "linear-gradient(135deg, #8B5CF6 0%, #22D3EE 45%, #3B82F6 100%)"
  hero_soft: "radial-gradient(circle at top left, rgba(139,92,246,0.35), transparent 40%), radial-gradient(circle at top right, rgba(34,211,238,0.22), transparent 35%)"
  cta_glow: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)"
  card_border: "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04))"
  spotlight: "radial-gradient(circle, rgba(34,211,238,0.18), transparent 60%)"
```

---

## 8. Layout and Spacing

```yaml
spacing:
  section_y_mobile: "72px"
  section_y_desktop: "120px"
  container_max: "1280px"
  gutter_mobile: "20px"
  gutter_desktop: "32px"

radius:
  sm: "14px"
  md: "20px"
  lg: "24px"
  xl: "28px"
  pill: "999px"

shadows:
  soft: "0 10px 30px rgba(0,0,0,0.22)"
  glass: "0 20px 60px rgba(2,6,23,0.38)"
  glow: "0 12px 40px rgba(139,92,246,0.22)"
```

### Breakpoints
```yaml
breakpoints:
  sm: 640
  md: 768
  lg: 1024
  xl: 1280
  2xl: 1536
```

### Layout rules
- use single column on mobile
- use two-column split layouts on desktop for hero and service sections
- keep content width constrained
- use large vertical spacing between sections
- alternate section density for visual rhythm

---

## 9. Mouse Spotlight / Cursor Glow

This effect should be included.

### Usage
Apply cursor-follow radial spotlight on:
- hero section
- premium cards
- CTA sections
- stat cards

### Behavior
- only enable on pointer-capable devices
- disable on mobile
- disable for `prefers-reduced-motion`
- keep the glow soft and subtle

### CSS idea
```css
background: radial-gradient(
  320px circle at var(--mouse-x) var(--mouse-y),
  rgba(139, 92, 246, 0.18),
  transparent 40%
);
```

### Performance rules
- use requestAnimationFrame or lightweight event handling
- do not cause layout thrashing
- prefer CSS variables

---

## 10. Buttons

### Primary CTA style
- gradient fill
- pill shape
- white text
- soft glow shadow
- slightly brighter on hover
- small hover lift

### Secondary CTA style
- glass surface
- subtle border
- arrow icon optional
- brighter border on hover

```yaml
buttons:
  primary:
    background: "linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)"
    color: "#FFFFFF"
    radius: "999px"
    padding: "14px 22px"
    shadow: "0 12px 32px rgba(139,92,246,0.28)"

  secondary:
    background: "rgba(255,255,255,0.04)"
    border: "1px solid rgba(255,255,255,0.12)"
    color: "#F8FAFC"
```

---

## 11. Motion Language

### Motion principles
- premium and restrained
- no excessive bouncing
- no aggressive parallax
- no flashy endless motion

### Allowed motion
- fade-up reveal
- subtle blur-in
- stagger reveal for cards
- card hover lift
- soft floating hero accents
- smooth marquee motion
- CTA glow transitions

### Timing
```yaml
motion:
  fast: "180ms"
  base: "280ms"
  slow: "450ms"
  easing: "cubic-bezier(0.22, 1, 0.36, 1)"
```

---

## 12. Page List and Structure

## 12.1 Home Page

### Required sections
1. premium hero
2. capability highlights / badges
3. “what we do best” service preview
4. trust metric / proof
5. agency proposition section
6. services preview cards
7. case studies preview
8. articles preview
9. CTA banner
10. footer

### Home page expectations
- Hero must immediately communicate digital / AI / branding value proposition
- CTA should be prominent above the fold
- Case studies and article previews should be visually lighter than service detail sections

---

## 12.2 Services Page

### Required sections
1. hero
2. overview intro
3. category block: Branding
4. marquee / separator
5. category block: Websites
6. marquee / separator
7. category block: Marketing
8. CTA banner
9. footer

### Category block requirements
Each category block must include:
- category label
- title
- descriptive paragraphs
- bullet/process list
- CTA to detail page

---

## 12.3 Branding Page

### Required sections
1. hero
2. stat grid
3. service-detail sections
4. CTA banner
5. FAQ accordion
6. footer

### Branding service-detail topics
- Brand Evaluation & Analysis
- Comprehensive Brand Audit
- Branding Identity Services
- Design Systems
- Brand Architecture
- Brand Messaging & Strategy
- Voice & Tone
- Brand Redevelopment
- Market Repositioning
- Integrated Brand Strategy
- Strategy to Action

---

## 12.4 Websites Page

### Required sections
1. hero
2. stat grid
3. service-detail sections
4. CTA banner
5. footer

### Website service-detail topics
- Website Design Services
- UI & UX Design Services
- Interactive Prototyping
- Full-Stack Website Development
- Information Architecture
- CMS Implementation
- CRO
- Website QA
- Ecommerce Development

---

## 12.5 Marketing Page

### Required sections
1. hero
2. stat grid
3. paid media service-detail sections
4. organic / owned service sections
5. CTA banner
6. footer

### Marketing service-detail topics
- PPC Advertising
- Google Ads
- Paid Social
- Meta Ads
- LinkedIn Ads
- Programmatic Advertising
- SEO
- Social Media Marketing
- Email Marketing

---

## 12.6 About Page

### Required sections
1. hero
2. proof metrics
3. values / word cloud section
4. differentiator content blocks
5. final CTA banner
6. footer

### About differentiator themes
- Beyond Ordinary
- Creative Brains, Analytical Backbone
- Big Ideas, Real Impact
- A Framework That Works
- From Hidden Gem to Household Name

---

## 12.7 Careers Page

### Required sections
1. hero
2. culture / values section
3. roles list or empty state
4. CTA / application prompt
5. footer

---

## 12.8 Privacy and Terms Pages

### Required behavior
- simple layout
- readable typography
- constrained content width
- same header/footer

---

## 13. Functional Requirements

### Global Requirements

#### GR-001 Header
The app must have a sticky global header with:
- logo
- desktop navigation
- mobile hamburger menu
- prominent CTA button

#### GR-002 Footer
The footer must support:
- city presence text
- policy links
- social links
- HQ address
- copyright text

#### GR-003 CTA Handling
All CTAs must support configurable actions:
- route navigation
- scroll to section
- open modal
- external link
- submit form

#### GR-004 SEO
Each route must support:
- title
- description
- canonical
- OG title
- OG description
- OG image

#### GR-005 Responsiveness
All pages must be responsive across mobile, tablet, laptop, and desktop.

#### GR-006 Accessibility
Navigation, FAQ, forms, and CTA elements must be keyboard accessible.

#### GR-007 Data-Driven Rendering
Page content must come from structured content objects, not hardcoded component copy.

---

## 14. Component Inventory

```yaml
components:
  common:
    - AppButton
    - AppLink
    - SectionHeader
    - Container
    - BadgePill

  navigation:
    - SiteHeader
    - MobileMenu
    - SiteFooter

  hero:
    - HeroMarketing

  surfaces:
    - GlassCard
    - SpotlightCard
    - CursorGlowSurface
    - GradientBackdrop
    - FloatingBadge

  sections:
    - SectionRenderer
    - StatGridSection
    - ServiceDetailSection
    - CardGridSection
    - CaseStudyGridSection
    - ArticleGridSection
    - FAQSection
    - CTASection
    - MarqueeBand
    - ValueWordCloudSection
    - TextColumnsSection

  forms:
    - ConsultationForm
```

---

## 15. Recommended Project Structure

```yaml
src:
  app:
    router:
      index.ts
    layouts:
      DefaultLayout.vue

  assets:
    images:
    icons:

  components:
    common:
      AppButton.vue
      AppLink.vue
      SectionHeader.vue
      Container.vue
      BadgePill.vue

    navigation:
      SiteHeader.vue
      MobileMenu.vue
      SiteFooter.vue

    hero:
      HeroMarketing.vue

    surfaces:
      GlassCard.vue
      SpotlightCard.vue
      CursorGlowSurface.vue
      GradientBackdrop.vue
      FloatingBadge.vue

    sections:
      SectionRenderer.vue
      StatGridSection.vue
      ServiceDetailSection.vue
      CardGridSection.vue
      CaseStudyGridSection.vue
      ArticleGridSection.vue
      FAQSection.vue
      CTASection.vue
      MarqueeBand.vue
      ValueWordCloudSection.vue
      TextColumnsSection.vue

    forms:
      ConsultationForm.vue

  composables:
    useSeo.ts
    useBreakpoints.ts
    useIntersectionReveal.ts
    useCursorGlow.ts

  content:
    site.config.ts
    navigation.ts
    footer.ts
    home.ts
    services.ts
    branding.ts
    websites.ts
    marketing.ts
    about.ts
    careers.ts

  pages:
    HomePage.vue
    ServicesPage.vue
    BrandingPage.vue
    WebsitesPage.vue
    MarketingPage.vue
    AboutPage.vue
    CareersPage.vue
    PrivacyPage.vue
    TermsPage.vue

  types:
    content.ts
    seo.ts
    cta.ts

  styles:
    tokens.css
    base.css

  App.vue
  main.ts
```

---

## 16. Content Model

### CTA
```ts
export type CTA = {
  label: string
  href?: string
  action?: 'route' | 'scroll' | 'modal' | 'external' | 'submit'
  target?: '_self' | '_blank'
}
```

### SEO
```ts
export type SeoMeta = {
  title: string
  description: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  robots?: string
}
```

### Hero content
```ts
export type HeroContent = {
  eyebrow?: string
  title: string
  subtitle?: string
  primaryCta?: CTA
  secondaryCta?: CTA
  media?: {
    type: 'image' | 'video' | 'illustration'
    src: string
    alt: string
  }
  highlights?: string[]
}
```

### Stats
```ts
export type StatItem = {
  value: string
  title: string
  description: string
}
```

### Service item
```ts
export type ServiceItem = {
  id: string
  label?: string
  title: string
  subtitle?: string
  body: string[]
  bullets?: string[]
  cta?: CTA
  media?: {
    src: string
    alt: string
  }
  layout?: 'left' | 'right'
}
```

### FAQ
```ts
export type FAQItem = {
  question: string
  answer: string
}
```

### Page sections
```ts
export type PageSection =
  | { type: 'stat-grid'; items: StatItem[] }
  | { type: 'service-detail-list'; items: ServiceItem[] }
  | { type: 'card-grid'; items: any[] }
  | { type: 'case-study-grid'; items: any[] }
  | { type: 'article-grid'; items: any[] }
  | { type: 'faq'; items: FAQItem[] }
  | { type: 'marquee'; items: string[] }
  | { type: 'cta-banner'; data: any }
  | { type: 'value-word-cloud'; items: string[] }
  | { type: 'text-columns'; data: any }
```

### Page type
```ts
export type MarketingPageContent = {
  seo: SeoMeta
  hero: HeroContent
  sections: PageSection[]
}
```

---

## 17. Section Renderer Pattern

Use a generic renderer so pages stay thin.

```vue
<script setup lang="ts">
import type { PageSection } from '@/types/content'

defineProps<{
  sections: PageSection[]
}>()
</script>

<template>
  <template v-for="(section, index) in sections" :key="index">
    <StatGridSection
      v-if="section.type === 'stat-grid'"
      :items="section.items"
    />

    <ServiceDetailSection
      v-else-if="section.type === 'service-detail-list'"
      :items="section.items"
    />

    <CardGridSection
      v-else-if="section.type === 'card-grid'"
      :items="section.items"
    />

    <CaseStudyGridSection
      v-else-if="section.type === 'case-study-grid'"
      :items="section.items"
    />

    <ArticleGridSection
      v-else-if="section.type === 'article-grid'"
      :items="section.items"
    />

    <FAQSection
      v-else-if="section.type === 'faq'"
      :items="section.items"
    />

    <MarqueeBand
      v-else-if="section.type === 'marquee'"
      :items="section.items"
    />

    <CTASection
      v-else-if="section.type === 'cta-banner'"
      v-bind="section.data"
    />

    <ValueWordCloudSection
      v-else-if="section.type === 'value-word-cloud'"
      :items="section.items"
    />

    <TextColumnsSection
      v-else-if="section.type === 'text-columns'"
      v-bind="section.data"
    />
  </template>
</template>
```

---

## 18. Page Composition Pattern

Pages should be thin and data-driven.

```vue
<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import SectionRenderer from '@/components/sections/SectionRenderer.vue'
import { brandingPage } from '@/content/branding'
import { useSeo } from '@/composables/useSeo'

useSeo(brandingPage.seo)
</script>

<template>
  <DefaultLayout>
    <HeroMarketing v-bind="brandingPage.hero" />
    <SectionRenderer :sections="brandingPage.sections" />
  </DefaultLayout>
</template>
```

---

## 19. Header Requirements

### Desktop
- left-aligned logo
- nav links
- prominent CTA button on right
- active route highlighting

### Mobile
- hamburger trigger
- full-screen or drawer menu
- body scroll lock while open
- close button
- keyboard accessible

### Optional enhancement
Header can be transparent on top of hero and become solid after scroll.

---

## 20. Footer Requirements

```yaml
footer:
  top:
    - city presence line
  middle:
    - privacy link
    - terms link
    - social links
  bottom:
    - HQ address
    - copyright
```

### Footer style
- dark elevated background
- subtle divider lines
- muted text
- compact but premium spacing

---

## 21. Hero Requirements

### Hero layout
- two-column desktop layout
- left side: headline, description, CTA row, trust badges
- right side: abstract premium visual composition

### Hero visual ideas
- gradient orbs
- glass dashboard mock card
- floating metric cards
- spotlight glow
- soft grid or noise texture

### Hero must include
- eyebrow badge
- oversized headline
- supporting paragraph
- one or two CTAs
- service/value highlight pills

---

## 22. Stat Grid Requirements

### Card content
- large value
- short label
- short proof statement

### Style
- glass or premium elevated cards
- subtle gradient or glow
- hover lift optional

### Layout
- 1 column on mobile
- 2 columns on tablet
- 4 columns on desktop

---

## 23. Service Detail Section Requirements

### Layout
- split layout on desktop
- stacked layout on mobile
- alternate image/text alignment

### Content structure
- eyebrow / category label
- title
- subtitle
- paragraphs
- bullet list
- CTA
- optional media block

### Style guidance
- text column should remain narrow for readability
- media block can be abstract gradient panel if no image available
- use generous spacing and visual separation

---

## 24. Marquee Band Requirements

### Behavior
- continuous horizontal motion
- optional pause on hover
- decorative repeated keywords

### Style
- uppercase
- tracking-wide
- muted but premium color treatment
- blurred edge fade

### Accessibility
If decorative only, mark as `aria-hidden`.

---

## 25. FAQ Requirements

### Behavior
- accordion interaction
- one or multiple items open configurable
- keyboard accessible
- smooth height animation

### Style
- glass rows
- rounded corners
- plus/minus icon
- clean spacing

### Accessibility
- button for question row
- `aria-expanded`
- `aria-controls`

---

## 26. Form Requirements

### Consultation form fields
- name
- email
- company
- phone (optional)
- service interest
- budget range (optional)
- message
- consent checkbox

### States
- idle
- loading
- success
- error
- validation error

### Spam prevention
- honeypot or captcha hook

---

## 27. Accessibility Requirements

- semantic `header`, `main`, `section`, `footer`, `nav`
- correct heading hierarchy
- visible keyboard focus states
- adequate color contrast
- alt text for meaningful media
- FAQ and nav accessible by keyboard
- form errors announced appropriately
- motion disabled or reduced for `prefers-reduced-motion`

---

## 28. Performance Requirements

- route-level code splitting
- lazy-load images
- avoid heavy animation libraries if unnecessary
- cursor glow must be lightweight
- minimize layout shift
- target Lighthouse 90+

---

## 29. SEO Requirements

- route-level metadata
- semantic HTML
- sitemap support
- robots file support
- clean headings
- SSR-friendly architecture if later migrated to Nuxt

---

## 30. LLM Guardrails for Code Generation

Use these rules when generating code:

```yaml
llm_rules:
  - Never hardcode page copy inside components.
  - Put all copy in content files.
  - Use Vue 3 Composition API with script setup.
  - Use TypeScript for all props and content models.
  - Keep components reusable and presentational.
  - Use a generic SectionRenderer to render sections.
  - Keep CTA behavior configurable.
  - Use Tailwind utilities and avoid ad hoc styles where possible.
  - Prefer accessible markup.
  - Support future Nuxt migration.
  - Keep visual effects tasteful and performant.
```

---

## 31. Sample Content File Pattern

```ts
import type { MarketingPageContent } from '@/types/content'

export const homePage: MarketingPageContent = {
  seo: {
    title: 'Premium AI Marketing Agency',
    description: 'Brand, website, and growth services for modern businesses.',
    canonical: '/'
  },
  hero: {
    eyebrow: 'Why Choose Us',
    title: 'Build a brand experience that performs across every touchpoint.',
    subtitle:
      'We combine strategy, design, websites, and performance marketing into a single premium growth engine.',
    primaryCta: {
      label: 'Talk To Sales',
      action: 'modal'
    },
    secondaryCta: {
      label: 'View Services',
      action: 'route',
      href: '/digital-marketing-services'
    },
    highlights: [
      'Digital Transformation',
      'Brand Positioning',
      'Integrated Marketing'
    ]
  },
  sections: [
    {
      type: 'stat-grid',
      items: [
        {
          value: '12+',
          title: 'Years of Expertise',
          description: 'Deep digital experience across strategy, design, and execution.'
        }
      ]
    },
    {
      type: 'cta-banner',
      data: {
        title: 'Ready to build your next growth engine?',
        description: 'Let’s shape the strategy, experience, and execution together.',
        primaryCta: {
          label: 'Get Your Free Consultation',
          action: 'modal'
        }
      }
    }
  ]
}
```

---

## 32. Implementation Order

```yaml
phase_1_foundation:
  - setup Vue 3 + TypeScript + Vite + Tailwind
  - create router
  - create DefaultLayout
  - create header/footer
  - add font setup
  - add design tokens

phase_2_core_components:
  - HeroMarketing
  - AppButton
  - GlassCard
  - CursorGlowSurface
  - StatGridSection
  - ServiceDetailSection
  - CTASection
  - FAQSection
  - MarqueeBand
  - SectionRenderer

phase_3_pages:
  - HomePage
  - ServicesPage
  - BrandingPage
  - WebsitesPage
  - MarketingPage
  - AboutPage
  - CareersPage
  - PrivacyPage
  - TermsPage

phase_4_polish:
  - responsiveness
  - animations
  - form states
  - SEO hooks
  - accessibility review
  - performance tuning
```

---

## 33. Final Prompt Seed for LLM Code Generation

```text
Build a premium multi-page Vue 3 + TypeScript + Vite marketing website inspired by a digital/AI agency structure.

Requirements:
- Use Vue Router for routes:
  /,
  /digital-marketing-services,
  /branding-services,
  /website-development-services,
  /marketing-services,
  /about-antvertize,
  /careers,
  /privacy-policy,
  /terms-and-conditions

- Use Tailwind CSS
- Use Sora for headings and Inter for body
- Implement a premium dark aesthetic with aurora gradients and glassmorphism
- Add subtle mouse-follow spotlight glow on hero and premium cards
- Use reusable components only; do not hardcode page copy in components
- Store all content in src/content/*.ts files
- Build reusable components:
  SiteHeader, MobileMenu, SiteFooter, HeroMarketing, StatGridSection,
  ServiceDetailSection, FAQSection, CTASection, MarqueeBand,
  GlassCard, SpotlightCard, CursorGlowSurface, SectionRenderer,
  ConsultationForm
- Use a generic SectionRenderer that maps section.type to components
- Ensure responsive, accessible, and performant behavior
- Add route-level SEO hooks
- Use restrained motion: fade-up reveals, card hover lift, soft glow transitions
- Make the result feel premium, modern, and conversion-focused
```

---

## 34. Final Notes for the LLM

### Priorities in order
1. clean architecture
2. data-driven content
3. premium visual language
4. responsiveness
5. accessibility
6. performance

### Avoid
- plain template-looking sections
- too many colors competing at once
- giant blocks of unreadable text
- overusing blur and glow
- inconsistent spacing
- hardcoded strings inside components

### Success criteria
The generated site should look like a premium agency website built in 2026, while being maintainable, reusable, and easy to extend with new services and content.
