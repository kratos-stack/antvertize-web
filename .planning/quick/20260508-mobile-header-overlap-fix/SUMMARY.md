---
id: 20260508-mobile-header-overlap-fix
title: Fix mobile header overlap (duplicate logo + duplicate close button)
date: 2026-05-08
status: complete
commit: 52927bf
files_changed:
  - src/components/navigation/MobileMenu.vue
---

# Summary

## What was fixed

In the mobile (≤1023px) viewport, opening the hamburger menu produced two visual bugs:

1. **Logo appeared to overlap with itself.** `SiteHeader.vue` and `MobileMenu.vue` were both rendering their own `AntvertizeLogo` at top-left, at z-indexes 100 and 99 respectively, with slightly different vertical paddings (header `padding-block: 20px`, menu `padding: 20px`). Result: a doubled, blurred-looking logo.
2. **Hamburger and close button overlapped.** `SiteHeader`'s `.hamburger` already morphs into an X when `.hamburger.open` is applied (via `.hamburger.open span:nth-child(N) { transform: ... rotate(...) }`). `MobileMenu` rendered an additional SVG `.close-btn` at the right edge. Result: two close-style controls stacked.

Both stem from the same root cause: `MobileMenu` was duplicating UI that `SiteHeader` already owns and keeps on top via z-index.

## Approach

Removed the duplicate `.menu-header` block from `MobileMenu.vue`. `SiteHeader` is now the sole owner of the logo and the open/close toggle while the drawer is up. Its higher z-index (100 vs. 99) keeps both controls visible above the menu overlay without any extra plumbing.

## Changes — `src/components/navigation/MobileMenu.vue`

- Removed `<div class="menu-header"> … </div>` (logo + SVG close button) from the template.
- Removed the now-unused `import AntvertizeLogo from '@/components/common/AntvertizeLogo.vue'`.
- Removed the `.menu-header`, `.logo`, `.close-btn`, and `.close-btn:hover` style rules.
- Changed `.mobile-menu { padding: 20px }` → `padding: 88px 20px 20px` so menu content clears the fixed header (~72px tall by default, ~60px when scrolled).
- Tightened `.menu-nav { padding-block: 32px }` → `padding-block: 16px 32px` so the first link doesn't sit too far down with the new top inset.

Net diff: 2 insertions, 45 deletions. One file touched.

## Verification

- `npm run build` passes cleanly (`vue-tsc -b` + `vite build`, 181 modules transformed, no warnings touching nav files).
- No linter errors on the touched file or `SiteHeader.vue`.
- `SiteHeader`'s hamburger continues to toggle `mobileOpen` and morphs into an X on open via existing CSS — closing still works as before.
- Desktop nav (≥1024px) is unaffected — the `@media (min-width: 1024px) { .mobile-menu { display: none } }` rule and the `SiteHeader` desktop layout are untouched.

## Out of scope (intentionally not done)

- No refactor to merge `MobileMenu` into `SiteHeader`.
- No change to the hamburger morph animation.
- No change to the menu transition (`menu-enter-from` translateX still animates in from the right).

## Notes on the GSD environment

`/gsd-quick` was run before `/gsd-new-project` had been executed, so `gsd-sdk`, `.planning/STATE.md`, and `.planning/ROADMAP.md` did not exist. The orchestrator ran a streamlined inline version: PLAN.md → fix → atomic commit → SUMMARY.md, preserving the spirit of `gsd-quick` (atomic commit + `.planning/quick/` task record) without invoking subagents that depend on missing scaffolding. STATE.md update was deferred — re-run `/gsd-new-project` and then `/gsd-quick` for full pipeline behavior on subsequent tasks.
