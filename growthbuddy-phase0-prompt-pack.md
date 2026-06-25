# Growthbuddy — Phase 0 Prompt Pack (Skeleton & Pipeline)
*Hand this to Claude Code. Goal: a near-empty Astro site building cleanly and deployed to a public
`*.pages.dev` URL — proving the whole pipeline before we build any real pages.*

---

## What Phase 0 achieves (success criteria)
- A working Astro project in a GitHub repo.
- Design tokens, base layout, SEO head, Nav/Footer stubs, a placeholder homepage + 404.
- Sitemap auto-generated and **excluding `/profiles/`**; `robots.txt`, `_headers` (incl. `/profiles/*`
  noindex), `_redirects` placeholder in place.
- Connected to Cloudflare Pages and **live on a `your-project.pages.dev` URL.**
- `CLAUDE.md` in the repo so every future Claude Code session stays on-spec.

You are NOT building the homepage design yet — that's Phase 1. This is plumbing.

---

## Before you start (you do these once, ~15 min)
1. Install **Node LTS** (v20+). Verify: `node -v`.
2. Create a **GitHub account** + an **empty repo** named `growthbuddy-web` (no README, so it's truly empty).
   Copy its URL (e.g. `https://github.com/you/growthbuddy-web.git`).
3. Create a **Cloudflare account** (free).
4. Open Claude Code in an empty folder where you want the project to live.

---

## Important architecture note baked into Phase 0: candidate profiles
We protect candidate profiles from indexing **from the very first deploy**, before any profile exists:
- `public/_headers` adds `X-Robots-Tag: noindex, nofollow` on `/profiles/*`.
- The sitemap config **excludes** `/profiles/`.
- `robots.txt` deliberately does **not** mention `/profiles/` (so the path isn't advertised).
- The actual `/profiles/[uuid]` template + `candidateProfile` Sanity schema come in a later content phase,
  but the durable rule lives in `CLAUDE.md` now so it's never forgotten.

---

## Step-by-step Claude Code prompts (copy-paste, in order)

> Paste these one at a time. After each, let Claude Code finish and tell you it worked before the next.

**Prompt 1 — scaffold**
```
Create a new Astro project in the current directory using the official scaffolder, with the
"minimal/empty" template and TypeScript. Use npm. Do NOT add any UI framework (no React/Vue/etc).
After it's created, run `npm install` and then `npm run dev` once to confirm it boots, then stop the server.
Explain what each top-level file/folder is, briefly.
```

**Prompt 2 — sitemap integration**
```
Add the official Astro sitemap integration with `npx astro add sitemap` and accept the defaults.
Confirm it was added to astro.config.mjs.
```

**Prompt 3 — create our files**
```
Create/replace exactly the following files with the contents I provide below (I will paste them).
Do not improvise contents — use mine verbatim. Create folders as needed. The files are:
- CLAUDE.md
- astro.config.mjs   (replace the existing one)
- src/styles/tokens.css
- src/styles/global.css
- src/layouts/BaseLayout.astro
- src/components/Nav.astro
- src/components/Footer.astro
- src/pages/index.astro   (replace)
- src/pages/404.astro
- public/robots.txt
- public/_headers
- public/_redirects
- public/favicon.svg
```
*(Then paste each file from the "Starter file contents" section below.)*

**Prompt 4 — build & verify locally**
```
Run `npm run build` then `npm run preview`. Fix any build errors.
Then verify, and report back: (a) the homepage renders, (b) /404 renders, (c) a sitemap was generated
in dist (sitemap-index.xml / sitemap-0.xml) and it does NOT contain any /profiles URL, (d) public/_headers,
public/robots.txt and public/_redirects are present in dist. Show me the list of generated files in dist.
```

**Prompt 5 — commit & push**
```
Initialise git (if not already), create a sensible .gitignore for an Astro project (node_modules, dist,
.env*, .DS_Store), make an initial commit "Phase 0: Astro skeleton + pipeline", and push to this remote:
<PASTE YOUR GITHUB REPO URL>
```

**Prompt 6 — you, in the Cloudflare dashboard (not Claude Code)**
1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick `growthbuddy-web`.
2. Framework preset: **Astro**. Build command: `npm run build`. Output directory: `dist`.
3. **Save and Deploy.** When it finishes you get a `https://growthbuddy-web.pages.dev` URL.
4. Open it: you should see the placeholder homepage. Visit a random path (e.g. `/nope`) to see the 404.

---

## Starter file contents

### `CLAUDE.md`
```md
# Growthbuddy website — working rules for Claude Code

## Project
Marketing site for Growthbuddy. Stack: Astro (static/SSG) + Sanity CMS (added in a later phase) +
Cloudflare Pages hosting. Production domain: https://www.mygrowthbuddy.com — **`www` is the canonical host**
(the apex `mygrowthbuddy.com` 301-redirects to `www` at launch).

## Non-negotiable brand rules
- Spell the brand **Growthbuddy** (capital G only) in all copy. Never "GrowthBuddy".
- **Never mention India or any country, anywhere** — not in copy, meta, alt text, or schema.
- No AI-generated faces. Use real photos (with consent) or initials avatars.

## Design system (source of truth: src/styles/tokens.css + the design spec in the project)
- Fonts: Libre Baskerville (display; letter-spacing -0.07em on ALL Libre Baskerville text),
  Inter (body), Space Grotesk (eyebrows/labels, UPPERCASE, 14px).
- Use the CSS variables in tokens.css for every colour/space/radius. Don't hardcode hexes in components.
- Homepage sections must match the approved Claude Design mocks EXACTLY (fidelity clause). Don't reinterpret.

## URL conventions
- lowercase, hyphenated, **no trailing slash**.
- Role pages live at **/hire/[role]** (nav label may say "Roles"). Industries at /industries/[slug].
  Resources under /resources/. Comparison at /compare/[slug].

## Candidate profiles — PRIVATE (critical)
- Route: /profiles/[uuid]. Each page MUST render `noindex, nofollow` (meta) AND is covered by the
  `/profiles/*` X-Robots-Tag in public/_headers.
- NEVER include /profiles in the sitemap, NEVER link to a profile from any page, NEVER mention /profiles
  in robots.txt. Keep slugs as unguessable UUIDs (reuse existing UUIDs to preserve already-shared links).

## Engineering rules
- Ship zero client JS by default; add an island only where interactivity is required; respect prefers-reduced-motion.
- Accessibility: semantic landmarks, one <h1>/page, skip link, visible :focus-visible, alt text, labels.
- Secrets (Sanity tokens, API keys) go in environment variables — NEVER commit them.
- Commit after each working step with a clear message. Explain your plan before large changes.
- When unsure, consult official docs: Astro (docs.astro.build), Sanity (sanity.io/docs), Cloudflare Pages.

## Reference docs (in the Claude Project knowledge, not this repo)
architecture-and-implementation-plan, seo-reconciliation-and-keyword-map, claude-design-prompts (design spec), project-handoff.
```

### `astro.config.mjs`
```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.mygrowthbuddy.com', // production domain — set now so canonical/OG/sitemap are correct
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Candidate profiles must never appear in the sitemap.
      filter: (page) => !page.includes('/profiles/'),
    }),
  ],
});
```

### `src/styles/tokens.css`
```css
:root{
  /* Colour */
  --paper:#FAF4EA; --card:#ECE4D5; --tile:#FCF9F2; --hairline:#E7DCC8;
  --charcoal:#181A1F; --grey-ink:#5E6269;
  --clay:#B96B4D; --clay-dark:#9E5740; --forest:#214E3F; --soft-yellow:#F4D58D;

  /* Type */
  --font-display:"Libre Baskerville", Georgia, serif;
  --font-body:"Inter", system-ui, sans-serif;
  --font-label:"Space Grotesk", system-ui, sans-serif;
  --tracking-display:-0.07em;          /* locked, ALL Libre Baskerville */

  /* Space / layout */
  --radius-card:20px;
  --pad-section-y:120px; --pad-section-y-m:72px;
  --maxw:1200px; --maxw-wide:1280px; --gutter:24px; --gutter-m:20px;
}
```

### `src/styles/global.css`
```css
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
body{
  font-family:var(--font-body); background:var(--paper); color:var(--charcoal);
  -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale; line-height:1.5;
}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
h1,h2,h3{font-family:var(--font-display);letter-spacing:var(--tracking-display);line-height:1.1;font-weight:700}
.container{max-width:var(--maxw);margin-inline:auto;padding-inline:var(--gutter)}
.skip-link{position:absolute;left:-9999px;top:0;background:var(--charcoal);color:var(--paper);padding:10px 16px;border-radius:8px;z-index:1000}
.skip-link:focus{left:12px;top:12px}
:focus-visible{outline:2px solid var(--clay);outline-offset:2px;border-radius:4px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
@media (max-width:768px){.container{padding-inline:var(--gutter-m)}}
```

### `src/layouts/BaseLayout.astro`
```astro
---
import '../styles/tokens.css';
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

const {
  title,
  description = "Growthbuddy helps US companies hire experienced, vetted remote team members — and stays involved so the hire works.",
  ogImage = "/og/default.png",
  noindex = false,
} = Astro.props;

const siteName = "Growthbuddy";
const canonicalUrl = new URL(Astro.url.pathname, Astro.site).href;
const ogImageUrl = new URL(ogImage, Astro.site).href;
const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Remote hiring for US companies`;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    {noindex && <meta name="robots" content="noindex, nofollow" />}

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:title" content={title ?? siteName} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:image" content={ogImageUrl} />
    <meta name="twitter:card" content="summary_large_image" />

    <!-- Fonts: temporary Google Fonts; self-host in the performance phase -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500&display=swap" rel="stylesheet" />

    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <slot name="head" /> <!-- per-page JSON-LD goes here later -->
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <Nav />
    <main id="main"><slot /></main>
    <Footer />
  </body>
</html>
```

### `src/components/Nav.astro`
```astro
---
const links = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Roles", href: "/hire" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
];
---
<header style="border-bottom:1px solid var(--hairline);">
  <nav class="container" aria-label="Primary" style="display:flex;align-items:center;justify-content:space-between;height:72px;gap:24px;">
    <a href="/" style="font-family:var(--font-body);font-weight:600;font-size:18px;">Growthbuddy</a>
    <ul style="display:flex;gap:28px;list-style:none;font-size:15px;">
      {links.map((l) => (<li><a href={l.href}>{l.label}</a></li>))}
    </ul>
    <a href="/book-a-call" style="background:var(--clay);color:var(--paper);padding:10px 18px;border-radius:999px;font-size:15px;font-weight:500;">Book a call</a>
  </nav>
</header>
```
*(Stub only — the real navigation styling comes with the design build. Functional + accessible for now.)*

### `src/components/Footer.astro`
```astro
---
const year = new Date().getFullYear();
---
<footer style="border-top:1px solid var(--hairline);margin-top:120px;">
  <div class="container" style="padding-block:48px;display:flex;flex-wrap:wrap;gap:40px;justify-content:space-between;">
    <div style="max-width:30ch;">
      <div style="font-weight:600;font-size:18px;">Growthbuddy</div>
      <p style="color:var(--grey-ink);font-size:15px;margin-top:12px;">Remote hiring for US companies, done properly — and looked after long after the hire.</p>
    </div>
    <nav aria-label="Footer" style="display:flex;gap:48px;font-size:15px;">
      <div><strong style="font-family:var(--font-label);text-transform:uppercase;font-size:14px;color:var(--clay);">Explore</strong>
        <ul style="list-style:none;margin-top:12px;display:grid;gap:8px;">
          <li><a href="/how-it-works">How it works</a></li><li><a href="/pricing">Pricing</a></li>
          <li><a href="/hire">Roles</a></li><li><a href="/industries">Industries</a></li>
        </ul></div>
      <div><strong style="font-family:var(--font-label);text-transform:uppercase;font-size:14px;color:var(--clay);">Company</strong>
        <ul style="list-style:none;margin-top:12px;display:grid;gap:8px;">
          <li><a href="/about">About</a></li><li><a href="/contact">Contact</a></li><li><a href="/book-a-call">Book a call</a></li>
        </ul></div>
    </nav>
  </div>
  <div class="container" style="border-top:1px solid var(--hairline);padding-block:22px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--grey-ink);">
    <span>© {year} Growthbuddy. All rights reserved.</span>
    <span><a href="/privacy">Privacy</a> &nbsp;·&nbsp; <a href="/terms">Terms</a></span>
  </div>
</footer>
```

### `src/pages/index.astro`
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Hire sharper talent without hiring locally">
  <section class="container" style="padding-block:120px;text-align:center;">
    <h1 style="font-size:clamp(38px,5.4vw,64px);max-width:16ch;margin-inline:auto;">Pipeline is live.</h1>
    <p style="color:var(--grey-ink);font-size:19px;margin-top:20px;max-width:50ch;margin-inline:auto;">
      Phase 0 skeleton deployed. The real homepage (the approved design) gets built in Phase 1.
    </p>
  </section>
</BaseLayout>
```

### `src/pages/404.astro`
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Page not found" noindex={true}>
  <section class="container" style="padding-block:120px;text-align:center;">
    <h1 style="font-size:48px;">Page not found</h1>
    <p style="color:var(--grey-ink);font-size:18px;margin-top:16px;">That page doesn’t exist. <a href="/" style="color:var(--clay);">Go back home →</a></p>
  </section>
</BaseLayout>
```

### `public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://www.mygrowthbuddy.com/sitemap-index.xml
```
*(Note: `/profiles/` is intentionally NOT listed here — we don't advertise the path. It's protected by
noindex headers + meta + sitemap exclusion instead.)*

### `public/_headers`
```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/profiles/*
  X-Robots-Tag: noindex, nofollow

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
```
*(HSTS and a Content-Security-Policy get added in the security phase, once embeds/analytics are known.)*

### `public/_redirects`
```
# Wix → new URL 301s go here (migration phase). Seeds from the SEO report:
# /roles/hire-seo-experts              /hire/seo-specialist              301
# /roles/hire-ppc-experts              /hire/ppc-specialist              301
# /roles/hire-paid-social-experts      /hire/social-media-manager        301
# /roles/hire-email-marketing-experts  /hire/email-marketing-specialist  301
# /roles/hire-amazon-experts           /hire/amazon-specialist           301
# /roles/hire-ad-operations-specialists /hire/ad-ops-specialist          301
```

### `public/favicon.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#B96B4D"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-size="38" fill="#FAF4EA">G</text></svg>
```

---

## Phase 0 done — checklist
- [ ] `npm run build` succeeds with no errors.
- [ ] `pages.dev` URL shows the placeholder homepage; a bad URL shows the 404.
- [ ] `dist/sitemap-*.xml` exists and contains **no** `/profiles` URL.
- [ ] `_headers`, `robots.txt`, `_redirects`, `favicon.svg` present in `dist`.
- [ ] Repo pushed; Cloudflare auto-deploys on push (test: make a tiny edit, push, watch it redeploy).

**Then append this to `growthbuddy-project-handoff.md` (5-line status):**
> Phase 0 done: Astro skeleton + tokens + BaseLayout + Nav/Footer stubs + sitemap (excludes /profiles) +
> robots/_headers/_redirects + CLAUDE.md. Live on <your>.pages.dev, auto-deploys from GitHub `main`.
> Production domain confirmed: www.mygrowthbuddy.com (DNS NOT pointed yet). Next: Phase 1 (homepage).

---

## Next: Phase 1 (preview)
Phase 1 converts the 10 approved Claude Design homepage sections into Astro components in `src/components/home/`,
faithful to the mocks, wired into `index.astro`. Start a fresh chat: *"Read the project knowledge. We're on
Phase 1: homepage. Give me the Claude Code prompts + the order to build the 10 folds. Don't re-explain Phase 0."*
```
