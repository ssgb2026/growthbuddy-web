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
