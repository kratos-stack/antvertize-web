# External Integrations

**Analysis Date:** 2026-05-08

## APIs & External Services

**Outbound HTTP / SDK calls from app code:**
- None. There are no `fetch(...)`, `axios`, `XMLHttpRequest`, or third-party SDK imports anywhere under `src/`. Verified by grepping `fetch(`, `axios`, `analytics`, `gtag`, `gtm`, `googletagmanager`, `posthog`, `segment`, `mixpanel`, `sentry`, `datadog`, `stripe`, `supabase`, `firebase`, `aws-sdk`, `formspree`, `netlify`, `getform`, `hotjar` — no matches in application code.
- The runtime app is a fully static marketing SPA. All dynamic-feeling behavior (SEO meta, scroll reveal, cursor glow) runs entirely in the browser.

**Third-party assets loaded by the browser:**
- **Google Fonts** — `https://fonts.googleapis.com` and `https://fonts.gstatic.com`. Three families loaded as a single stylesheet `<link>` from `index.html` lines 15–17:
  - `Playfair Display` weight 400 — display headings (CSS variable `--font-display`, `src/styles/tokens.css` line 24).
  - `Sora` weights 400/600/700 — UI headings (`--font-heading`).
  - `Inter` weights 400/500/600 — body text (`--font-body`).
  - Preconnect hints to both domains are declared in `index.html` lines 15–16.

## Data Storage

**Databases:**
- None. No database client, ORM, or connection string anywhere in the codebase.

**File Storage:**
- Local repo only — static assets in `public/` (`favicon.svg`, `logo.svg`, `vite.svg`) and `src/assets/` (`vue.svg`).
- No cloud blob storage (no S3, GCS, R2, Supabase Storage, etc.).

**Caching:**
- None at the application layer. CDN/HTTP caching is delegated to whichever static host serves `dist/` (Vercel / Netlify / Cloudflare Pages per `README.md` "Deploy" section).

## Authentication & Identity

**Auth Provider:**
- None. The site is fully public, has no login, no protected routes, no session, no token, no cookie set by app code. `src/app/router/index.ts` defines public routes only and a catch-all redirect to `/`.

## Monitoring & Observability

**Error Tracking:**
- None. No Sentry, Bugsnag, Rollbar, Datadog RUM, or similar. No `window.onerror` handler in app code.

**Analytics:**
- None embedded in the app. Verified — no `gtag`, GA4, GTM, Plausible, Fathom, PostHog, Segment, Mixpanel, Hotjar, or similar references in `src/`, `index.html`, or `public/`.
- The privacy copy at `src/pages/PrivacyPage.vue` lines 52 and 61 mentions analytics in policy language only; it does not correspond to any installed tracker. (If analytics is added later, this copy should be revisited.)

**Logs:**
- Browser `console` only. No structured logger, no remote log shipping.

## CI/CD & Deployment

**Hosting:**
- Not configured in-repo. `README.md` recommends Vercel, Netlify, or Cloudflare Pages and gives example commands (`npx vercel --prod`, `npx netlify-cli deploy --prod --dir=dist`). No `vercel.json`, `netlify.toml`, or `wrangler.toml` is committed, so SPA fallback rewrites must be set up at the host's UI level for the chosen provider.

**CI Pipeline:**
- **GitHub Actions** — single workflow at `.github/workflows/lighthouse.yml`.
  - Trigger: `pull_request` and `push` to `main`, plus `workflow_dispatch`.
  - Concurrency group cancels in-progress runs per ref.
  - Permissions: `contents: read`, `pull-requests: write`.
  - Steps:
    1. `actions/checkout@v4`
    2. `actions/setup-node@v4` with `node-version: 20`, `cache: npm`
    3. `npm ci`
    4. `npm run build`
    5. `treosh/lighthouse-ci-action@v12` with `configPath: ./.lighthouserc.json`, `uploadArtifacts: true`, `temporaryPublicStorage: true`
    6. `actions/github-script@v7` posts a Lighthouse summary table as a PR comment, parsing `manifest.json` from `.lighthouseci/`
- **Lighthouse CI runner** — `@lhci/cli@0.14.x` invoked via `npx` in `package.json` script `lighthouse` (line 10) and via the `treosh/lighthouse-ci-action@v12` action in CI.
  - Audits 5 URLs against `npm run preview -- --port 4173 --strictPort` (`.lighthouserc.json` lines 4–13): `/`, `/services`, `/about`, `/case-studies`, `/contact`. 3 runs each, median aggregation. Chrome flags: `--no-sandbox --headless --disable-gpu --disable-dev-shm-usage`.
  - Reports are uploaded to **Lighthouse CI temporary public storage** (`upload.target: "temporary-public-storage"`, `.lighthouserc.json` lines 27–29). This is a public, time-limited blob host — not a private dashboard.

## Environment Configuration

**Required env vars:**
- None. The application reads zero `import.meta.env.*`, `process.env.*`, or runtime config values. Site-level constants live in `src/content/site.config.ts` (brand name, email, regions, social URLs) as plain TypeScript.

**Secrets location:**
- No secrets needed. CI uses only `GITHUB_TOKEN` (auto-provided by GitHub Actions) for the PR comment script — no project-managed secrets.
- `.env*` is listed in `.gitignore` line 13 by virtue of `*.local`, but no `.env*` files are present.

## Webhooks & Callbacks

**Incoming:**
- None. There is no backend.

**Outgoing:**
- None. No HTTP requests are issued from the app.

## Email / Forms

**Contact form (`src/components/forms/ContactForm.vue`):**
- 5 fields: Name, Email, Business Name, Monthly Ad Spend, Message + a consent checkbox + a hidden honeypot (`_honeypot`) at lines 12–20.
- Submit handler at lines 49–62: assembles a `mailto:` URL via the `mailtoHref` computed (lines 22–35), then sets `window.location.href = mailtoHref.value`. This opens the user's default mail client with subject and body pre-filled. There is **no fetch / no API call / no backend round-trip**.
- Recipient is sourced from `siteConfig.email` (`hello@antvertize.com`) in `src/content/site.config.ts` line 6.
- The success state is faked locally with a 600 ms `setTimeout` (line 57) — there is no delivery confirmation.

**Consultation form (`src/components/forms/ConsultationForm.vue`):**
- Currently unrouted (kept on disk as a richer alternative — see `CLAUDE.md` line 40 on retained legacy pages). Submit handler simulates an API call with `setTimeout(1200)` at line 58. No real endpoint is wired.

**Mailto links elsewhere:**
- `src/components/navigation/SiteFooter.vue` line 21 — `mailto:${footerContent.email}`.
- `src/content/contact.ts` line 14 — secondary CTA `mailto:hello@antvertize.com`.
- The `CTA` discriminated type supports a `'mailto'` action (`src/types/content.ts` line 4); `AppButton` renders an `<a href="mailto:…">` for it (per `CLAUDE.md` "CTAs" section).

**Migration path noted in code:**
- `README.md` line 79 and `CLAUDE.md` line 103 both call out that to wire a real backend, the `window.location.href = mailtoHref.value` line in `ContactForm.vue`'s `submit()` should be replaced with a `fetch` to the chosen endpoint (CRM, Formspree, Netlify Forms, etc.). No such integration exists today.

## Outbound Links

**Social profiles** (`src/content/site.config.ts` lines 8–12, rendered in `src/components/navigation/SiteFooter.vue` lines 46–54 with `target="_blank" rel="noopener noreferrer"`):
- LinkedIn — `https://linkedin.com/company/antvertize`
- Twitter / X — `https://twitter.com/antvertize`
- Instagram — `https://instagram.com/antvertize`

These are static `<a>` tags only — no SDK, no embed, no API integration with any of these platforms.

**Canonical URLs** — every page declares an absolute canonical under `https://antvertize.com/...` via `useSeo()` (e.g. `src/content/home.ts` line 7). This is the public production origin; it is not currently served by any host configured in the repo.

## GitHub Actions Marketplace Dependencies

| Action | Version | Purpose |
|---|---|---|
| `actions/checkout` | `v4` | Clone repo |
| `actions/setup-node` | `v4` | Provision Node 20 + npm cache |
| `treosh/lighthouse-ci-action` | `v12` | Run Lighthouse CI against built preview |
| `actions/github-script` | `v7` | Post Lighthouse summary table as PR comment |

---

*Integration audit: 2026-05-08*
