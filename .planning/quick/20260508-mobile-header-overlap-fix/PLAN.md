---
id: 20260508-mobile-header-overlap-fix
title: Fix mobile header overlap (duplicate logo + duplicate close button)
date: 2026-05-08
mode: quick (streamlined inline — gsd-sdk + STATE.md not yet bootstrapped)
status: in-progress
---

# Quick Task: Fix mobile header overlap

## Problem

When the mobile hamburger menu is open, two overlap artifacts are visible (see attached screenshot):

1. **Logo doubled** — `src/components/navigation/SiteHeader.vue` renders `AntvertizeLogo` at top-left (`z-index: 100`, header `padding-block: 20px`). `src/components/navigation/MobileMenu.vue` ALSO renders `AntvertizeLogo` inside its `.menu-header` (`z-index: 99`, menu `padding: 20px`). Two logos stack at slightly different y-positions.
2. **Hamburger / close button doubled** — `SiteHeader`'s `.hamburger` morphs into an X via the existing `.hamburger.open` CSS transforms. `MobileMenu` ALSO renders a separate SVG `.close-btn` at top-right. Both controls sit at the right edge, stacked.

Both stem from the same root cause: `MobileMenu` duplicates UI that `SiteHeader` already owns and keeps visible at a higher z-index.

## Files to change

- `src/components/navigation/MobileMenu.vue`

## Approach

Remove the duplicate header from `MobileMenu`. `SiteHeader` is the canonical owner of the logo + open/close toggle, and its higher z-index already keeps it on top of the menu overlay.

### Tasks

**Task 1 — Remove duplicate `.menu-header` from `MobileMenu.vue`**
- files: `src/components/navigation/MobileMenu.vue`
- action:
  - Delete the `<div class="menu-header"> … </div>` block (logo + close button) from the template.
  - Remove the now-unused `AntvertizeLogo` import.
  - Delete the `.menu-header`, `.logo`, `.close-btn`, `.close-btn:hover` style rules.
  - Add `padding-top` to `.mobile-menu` so menu links clear the fixed header (header is ~72px tall when not scrolled, ~60px when scrolled). Use a value that comfortably clears both states; `padding-top: 88px` (top safe spacing) instead of the current `padding: 20px`.
  - Reduce `.menu-nav { padding-block: 32px }` to `padding-block: 16px 32px` so the first link doesn't sit too far down.
- verify:
  - On a mobile viewport (≤1023px), open the menu via the hamburger — only ONE logo is visible (top-left, owned by `SiteHeader`).
  - Only ONE close control is visible — the hamburger's morphed-X (top-right, owned by `SiteHeader`).
  - Menu links don't sit under the header.
  - Closing the menu via the hamburger still works (toggling `mobileOpen` in `SiteHeader`).
  - `npm run build` passes (vue-tsc + vite build).
- done: build passes; manual visual check matches verify list.

## Out of scope

- Refactoring header/menu into a single component.
- Changing the hamburger morph animation.
- Touching the desktop nav behavior (≥1024px).
