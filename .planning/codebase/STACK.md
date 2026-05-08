# Technology Stack

**Analysis Date:** 2026-05-08

## Languages

**Primary:**
- TypeScript ~5.9.3 — All `src/**/*.ts`, all `<script setup lang="ts">` blocks in `.vue` SFCs (declared in `package.json` devDependencies; configured by `tsconfig.app.json` and `tsconfig.node.json`)
- Vue SFC (`.vue`) — Single-file components under `src/components/`, `src/pages/`, `src/app/layouts/`, `src/App.vue`

**Secondary:**
- CSS — Design tokens and base styles in `src/styles/tokens.css` and `src/styles/base.css`; scoped `<style>` blocks in `.vue` files
- HTML — Single static entry document at `index.html` (Vite-mounted)
- YAML — CI workflow at `.github/workflows/lighthouse.yml`
- JSON — `package.json`, `package-lock.json`, `tsconfig*.json`, `.lighthouserc.json`

## Runtime

**Environment:**
- Browser-only (static SPA). The build emits `dist/` containing static `index.html` + hashed assets, intended for static hosts (Vercel / Netlify / Cloudflare Pages — see `README.md` "Deploy" section).
- Node.js 20 — used only for build/CI (pinned in `.github/workflows/lighthouse.yml` line 31). No `engines` field in `package.json`, no `.nvmrc`, no `.node-version`.
- ES Modules — `"type": "module"` in `package.json` line 5; TypeScript `module: ESNext`, `moduleResolution: bundler` (`tsconfig.node.json` lines 7–11).

**Package Manager:**
- npm — Lockfile `package-lock.json` present (73 KB). No yarn, pnpm, or bun lockfiles. CI uses `npm ci` (`.github/workflows/lighthouse.yml` line 35).

## Frameworks

**Core:**
- Vue 3 (`vue` ^3.5.25) — Composition API with `<script setup lang="ts">` only. App bootstrap in `src/main.ts`; root component `src/App.vue` renders `<RouterView />`.
- Vue Router (`vue-router` ^4.6.4) — HTML5 history mode (`createWebHistory`) with smooth scroll behavior + 7 routes, 6 legacy redirects, and an SPA catch-all at `src/app/router/index.ts`.
- @vueuse/head (`@vueuse/head` ^2.0.0) — SEO meta management. Bootstrapped in `src/main.ts` via `createHead()` and consumed by the `useSeo` composable at `src/composables/useSeo.ts`.

**Testing:**
- Not detected. No `*.test.ts`, `*.spec.ts`, no Vitest/Jest/Cypress/Playwright config, no test runner in `package.json` scripts.

**Build/Dev:**
- Vite (`vite` ^7.3.1) — Dev server + production bundler. Config: `vite.config.ts` (Vue plugin, Tailwind plugin, `@/*` → `src/*` alias).
- @vitejs/plugin-vue (`@vitejs/plugin-vue` ^6.0.2) — Vue SFC compilation, registered in `vite.config.ts` line 7.
- vue-tsc (`vue-tsc` ^3.1.5) — Type-checking pass. Run as `vue-tsc -b` before `vite build` (`package.json` line 8).
- @vue/tsconfig (`@vue/tsconfig` ^0.8.1) — Base config extended by `tsconfig.app.json` (`extends: "@vue/tsconfig/tsconfig.dom.json"`).

## Key Dependencies

**Critical:**
- `vue` ^3.5.25 — UI framework. All component code targets the Composition API surface.
- `vue-router` ^4.6.4 — Client-side routing for the 7-page SPA.
- `@vueuse/head` ^2.0.0 — Document `<head>` management (title, meta, canonical) for per-route SEO. Used by every page through `useSeo()`.
- `tailwindcss` ^4.2.1 — Utility CSS framework. v4 engine; loaded via `@import "tailwindcss"` at the top of `src/styles/tokens.css`.
- `@tailwindcss/vite` ^4.2.1 — Tailwind v4 Vite plugin. Registered in `vite.config.ts` line 7. Required because Tailwind v4 has no PostCSS step in this project (no `postcss.config.*`, no `tailwind.config.*`).

**Infrastructure:**
- `@types/node` ^24.10.1 — Type definitions for Node, used only for the build-side config in `tsconfig.node.json` (`types: ["node"]`).
- `typescript` ~5.9.3 — Compiler.
- `vue-tsc` ^3.1.5 — Vue-aware type checker, gates the production build.

## Configuration

**Environment:**
- No `.env`, `.env.*`, or `*.env` files exist in the repo. There are no runtime environment variables read by the app.
- No backend, secrets, API keys, or tokens are referenced in `src/`.
- Site-wide constants (brand name, email, regions, social URLs) live in `src/content/site.config.ts` and are imported as plain TypeScript values — not env vars.

**Build:**
- `vite.config.ts` — registers `@vitejs/plugin-vue` and `@tailwindcss/vite`; sets the `@` → `src/` alias.
- `tsconfig.json` — root project references file (no `compilerOptions`); points to `tsconfig.app.json` and `tsconfig.node.json`.
- `tsconfig.app.json` — extends `@vue/tsconfig/tsconfig.dom.json`. `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`. Path mapping `@/*` → `src/*`. Includes `src/**/*.ts|tsx|vue`.
- `tsconfig.node.json` — Build/tooling tsconfig (`vite.config.ts` only). `target: ES2023`, `lib: ["ES2023"]`, `module: ESNext`, `moduleResolution: bundler`, `verbatimModuleSyntax: true`, `noEmit: true`.
- `.lighthouserc.json` — Lighthouse CI thresholds: a11y ≥ 0.8 (error), performance / best-practices / SEO ≥ 0.8 (warn). Audits 5 routes against `npm run preview` on port 4173, 3 runs each, median aggregation.

**Editor / IDE:**
- `.vscode/` exists (only `extensions.json` is committed per `.gitignore` line 19–20).

**Tailwind v4 specifics:**
- No `tailwind.config.js/ts` and no `postcss.config.*`. Theme is declared inline in CSS using `@theme { … }` inside `src/styles/tokens.css` (lines 3–37). Custom CSS variables (gradients, glass surfaces, motion) live in the `:root { … }` block at lines 40–59 of the same file.

## Platform Requirements

**Development:**
- Node.js 20+ (matching CI; not enforced by `engines`).
- npm (lockfile is `package-lock.json`).
- `npm install` → `npm run dev` (Vite dev server, default `http://localhost:5173` per `README.md`).
- `npm run build` runs `vue-tsc -b && vite build` and emits `dist/`.
- `npm run preview` serves the built `dist/` (the Lighthouse pipeline starts it on port 4173 — see `.lighthouserc.json` line 4).
- `npm run lighthouse` builds, then runs `npx --yes @lhci/cli@0.14.x autorun --config=./.lighthouserc.json` (`package.json` line 10).

**Production:**
- Static hosting. Output is fully prerendered HTML + hashed JS/CSS in `dist/`.
- Requires SPA fallback (rewrite all paths to `/index.html`) because routing is client-side via `createWebHistory`. `README.md` explicitly notes this and recommends Vercel / Netlify / Cloudflare Pages.
- No server runtime, no Node process in production.

---

*Stack analysis: 2026-05-08*
