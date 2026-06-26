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
- Design source of truth is /design-reference/growthbuddy-design-system.md + the per-fold HTML exports + src/styles/tokens.css (tokens are --gb-*). The old growthbuddy-claude-design-prompts.md and the fold mocks are historical, not build references.

## Interactive behaviour (homepage)
- Interactive behaviour on the homepage is JS-driven and computed at runtime. The mock .html files show
  only the RESTING state — reading their CSS alone produces a dead page. The mechanics cannot be inferred
  from markup.
- **The AUTHORITATIVE source for all interactive mechanics is /design-reference/INTERACTIVE-BEHAVIOUR-SPEC.md.**
  Build every animated fold from the relevant section of that spec.
- The bundled "Fold N" standalone exports bury their logic in a `<script type='__bundler/template'>` blob you
  can't reliably read — use them only for resting-state copy/layout/structure, not for mechanics.
- Only if a matching `*.dc.html` source file is actually present should you read its `componentDidMount()` as a
  cross-check. If it's absent, the spec doc is sufficient — don't flag it as missing or block on it.
- Each effect is a small client island that respects prefers-reduced-motion (jump to final state) and
  rAF-throttles scroll/pointer handlers.

## Performance budget (NON-NEGOTIABLE for every component and island)
- **Animate only `transform` and `opacity`.** Never animate (on scroll, pointer, or hover) `box-shadow`,
  `filter`, `color`, `background`, `width`/`height`, `top`/`left`, or `margin`/`padding` — they trigger paint
  or layout every frame. To animate a shadow/glow, overlay a pseudo-element holding the bigger shadow and
  transition ITS opacity. Hover "lift" = `transform: translateY()`; emphasis = `transform: scale()`.
- **Never read layout in a scroll/pointer handler.** `getBoundingClientRect()`, `offsetTop`, `offsetHeight`
  etc. force synchronous reflow. Measure once on load + resize, cache the values, and each frame compute
  position from `window.scrollY` + the cached value. (Scroll-ink: cache each word's document-relative top
  once, then per frame use `cachedTop - scrollY` — no DOM reads in the loop.)
- All scroll/pointer/wheel/touch listeners use `{ passive: true }`. One `requestAnimationFrame` batch per
  frame behind a `ticking` flag. No layout writes followed by reads in the same frame.
- **Hover transitions:** explicit property list only (never `transition: all`), limited to
  `transform`/`opacity` (a single-property `color` transition is OK). Durations 120–220ms.
- Promote ONLY actively-animating elements to their own layer (`will-change: transform` or `translateZ(0)`)
  and remove `will-change` when idle. Do not blanket-apply `will-change`.
- **Paper grain:** a small tiling PNG/data-URI noise texture as a low-opacity `background-image`, NOT a
  runtime SVG `fractalNoise` filter; avoid `mix-blend-mode` on large fixed overlays. If a blend is essential,
  scope it to the element, add `isolation`, and confirm it doesn't repaint on scroll.
- `backdrop-filter`: nav bar only, modest blur radius. Below-the-fold sections get `content-visibility: auto`
  with `contain-intrinsic-size`. All images carry explicit `width`/`height` and use `astro:assets`;
  below-fold images lazy-load.
- **Target 60fps:** main-thread work under ~10ms/frame, verified with a 4–6× CPU throttle in DevTools.

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

## Role pages are 100% CMS-driven (never hardcode)
- Render at /hire/[slug] from ONE dynamic route (src/pages/hire/[slug].astro) using getStaticPaths()
  over Sanity `role` documents. The slug is a CMS field. Adding a role in Sanity + publishing generates
  /hire/<slug> on the next build. NEVER create per-role .astro files or hardcode any role URL.
- The `role` schema includes: title, slug (unique, editable), function (Marketing | Sales | Operations |
  Finance), + content fields. The /hire hub lists roles grouped by `function`.

## Copy source of truth (changed)
- For any section that HAS a design, take copy DIRECTLY from the design export in /design-reference
  (these reflect my latest edits). growthbuddy-homepage-copy.md is SUPERSEDED for designed sections.
- If a section/page needs copy and has NO design, STOP and ASK me for the copy. Never invent or
  placeholder copy for a real page.
