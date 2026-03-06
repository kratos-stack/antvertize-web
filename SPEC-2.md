Enhance the existing Vue 3 + TypeScript + Tailwind website with premium scroll-based entrance transitions.

Goal:
As the user scrolls down the page, sections and UI elements should animate smoothly into view. The site is already built, so do not redesign or restructure the app. Only add reusable scroll-reveal behavior and apply it consistently across existing components.

Requirements:
1. Use a reusable, performant scroll-reveal system.
2. Prefer IntersectionObserver over heavy scroll listeners.
3. Support `prefers-reduced-motion` and disable/reduce animations when enabled.
4. Do not break layout, spacing, SEO, or accessibility.
5. Keep animations subtle, premium, and modern — no flashy effects.

Implementation requirements:
- Create a reusable composable, for example `useScrollReveal.ts`, that:
  - uses IntersectionObserver
  - detects when an element enters the viewport
  - applies a visible state once revealed
  - supports `once: true` by default
  - supports configurable threshold, rootMargin, delay, and direction
- Create a reusable wrapper component, for example `RevealOnScroll.vue`, that:
  - wraps existing content
  - accepts props such as:
    - `as` (default `div`)
    - `delay` (number)
    - `duration` (number)
    - `distance` (number)
    - `direction` (`up`, `down`, `left`, `right`, `none`)
    - `once` (boolean)
    - `threshold` (number)
  - uses the composable internally
  - applies CSS classes / inline CSS variables for transition timing and transform distance
- Use CSS transitions or Tailwind utility classes for the animation.
- Avoid external animation libraries unless absolutely necessary.

Animation style:
- Initial state:
  - opacity: 0
  - slight translateY / translateX depending on direction
  - optional very small blur for premium feel
- Revealed state:
  - opacity: 1
  - transform: translate3d(0, 0, 0)
  - filter: blur(0)
- Timing:
  - duration: 600ms to 900ms
  - easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Stagger child items slightly when rendering lists or grids

Apply reveal animations to:
- hero text block
- hero CTA group
- stat cards
- service cards
- section headings
- split content sections
- FAQ items
- CTA banners
- footer blocks
- case study cards
- article cards

Behavior rules:
- Hero section can animate immediately on load.
- All below-the-fold sections should animate when entering viewport.
- Cards in a grid should reveal with staggered delays (for example 80ms apart).
- Repeated marquee bands should not use reveal animation if already continuously animated.
- Navigation/header should not use scroll reveal.
- Do not re-trigger animations repeatedly unless `once` is explicitly false.

Accessibility and performance:
- Respect `prefers-reduced-motion: reduce`
- In reduced-motion mode:
  - remove transform and blur
  - use either no animation or a very fast opacity transition
- Minimize layout thrashing
- Clean up observers properly on unmount
- Do not animate large expensive properties unnecessarily
- Use `transform` and `opacity` only, with optional minimal blur

Expected deliverables:
1. `useScrollReveal.ts`
2. `RevealOnScroll.vue`
3. Any shared CSS / Tailwind classes needed for reveal transitions
4. Updates to existing page/section/card components to wrap content in `RevealOnScroll`
5. Staggered reveal logic for card grids and list items

Example behavior:
- Section heading fades in and moves up by 24px
- Supporting paragraph follows after 100ms
- CTA row follows after 180ms
- Stat cards reveal one by one with 80ms stagger
- Left/right split sections slide in softly from opposite sides

Coding constraints:
- Keep the solution clean and reusable
- Do not duplicate reveal logic in every component
- Do not rewrite the site structure
- Keep TypeScript types strict
- Use Vue 3 Composition API with `<script setup lang="ts">`

Optional enhancement:
- Add a `reveal-group` helper pattern for lists/grids so stagger can be applied cleanly without repeating delay logic everywhere.
