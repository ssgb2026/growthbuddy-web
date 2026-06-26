\# Growthbuddy Design System  
\*\*Version 1.0 — derived from the approved homepage folds and standalone pages (June 2026).\*\*  
This document is the single source of truth for building Growthbuddy in Astro \+ plain CSS (no framework) with a Sanity CMS. Every value below is lifted from the actual production designs. Where folds disagreed, one canonical value was chosen and recorded in §E. Anything marked \*\*\[proposed\]\*\* is an on-system pattern inferred for CMS template pages that have no bespoke design yet — review before shipping.  
Brand casing is always \*\*Growthbuddy\*\* (capital G only). No country references anywhere in product copy.  
\---  
\#\# Table of contents  
\- \*\*A. Foundations\*\* — Colour · Hero treatment · Typography · Spacing · Radii, shadows, borders · Layout  
\- \*\*B. Components\*\* — Nav · Footer · Buttons (primary / secondary / tertiary) · Text links · Pills & tags · Cards & panels · Eyebrow · Section header · FAQ accordion · Ticker · Stat block · Comparison table · Form inputs · Avatars · Badges & ticks · Logo / wordmark · Trusted-by strip  
\- \*\*C. Patterns & principles\*\* — Section rhythm · AI-friendly content order · Motion · Accessibility  
\- \*\*D. Tokens\*\* — \`:root\` block \+ reference table  
\- \*\*E. Inconsistency report\*\*  
\---  
\# A. Foundations  
\#\# A.1 Colour  
The palette is warm and editorial: a paper page, warm-greige surfaces, near-white inner tiles, a single clay accent that carries all interaction, and a quiet forest-green used only inside the multi-hue tint set. Saturation is deliberately low everywhere except the clay accent and the gold hero.  
\#\#\# Core semantic colours  
| Token | Hex | Role | "On" / text pairing | Contrast |  
|---|---|---|---|---|  
| \`--gb-paper\` | \`\#FAF4EA\` | Page background everywhere | \`--gb-ink\` (\#181A1F) | 15.6:1 — AAA |  
| \`--gb-surface\` | \`\#ECE4D5\` | Greige card / panel, table active column, member tiles | \`--gb-ink\` | 13.7:1 — AAA |  
| \`--gb-surface-tile\` | \`\#FCF9F2\` | Near-white inner tile (bento cards, price ledger) | \`--gb-ink\` | 16.4:1 — AAA |  
| \`--gb-hairline\` | \`\#DED5C6\` | Standard 1px divider on paper/surface | — | — |  
| \`--gb-ink\` | \`\#181A1F\` | Primary text, headings | on paper/surface | AAA |  
| \`--gb-ink-warm\` | \`\#1B2420\` | Primary text inside greige panels (blockquotes) | on surface | AAA |  
| \`--gb-muted\` | \`\#5E6269\` | Secondary / body-muted text, captions | on paper | 6.0:1 — AA (AAA for large) |  
| \`--gb-clay\` | \`\#B96B4D\` | \*\*Primary accent\*\* — eyebrows, accent italic word, icons, links, primary fill | white / paper text on it | 3.6:1 (large/UI) |  
| \`--gb-clay-dark\` | \`\#9E5740\` | Clay hover / pressed / emphasis, focus-outline colour | paper text on it | 4.5:1 — AA |  
| \`--gb-forest\` | \`\#355A47\` | \*\*Secondary accent\*\* — only as tint-set text (green pill), never standalone UI | on \`\#D8E5DB\` tint | AA |  
\> \*\*Clay on text:\*\* clay (\#B96B4D) is an accent, not a body-text colour. Use it for ≤ headline-size words, eyebrows, icons, and UI chrome. For clay \*fills\* (primary CTA gradient, footer hover) it always pairs with dark ink text or paper text — never small clay text on paper for paragraphs.  
\#\#\# Supporting text tints (used in situ, not standalone tokens)  
| Hex | Where it appears |  
|---|---|  
| \`\#241B10\` | Hero H1 ink (warmer than \`--gb-ink\`) — see §E, standardise to \`--gb-ink\` for body headings |  
| \`\#473722\` | Hero sub-headline text (on gold) |  
| \`\#3A2D1C\` | Hero bullet text (on gold) |  
| \`\#2B2926\` | Nav link text (on paper/gold) |  
| \`\#3A2417\` | Secondary-pill label \+ chip arrow |  
| \`\#6c6862\` | Comparison "typical recruiter" cell text (muted variant — see §E) |  
| \`\#8A847A\` | Testimonial role line (results) |  
| \`\#A08A6C\` | Nav mega-menu label |  
\#\#\# Hero gold ramp (caramel)  
These are the stops inside the hero background gradient (full CSS in §A.2). Not used as flat fills.  
| Hex | Role in ramp |  
|---|---|  
| \`\#F3DEA0\` | Top highlight bloom |  
| \`\#E8C387\` | Upper-left warm light |  
| \`\#D7AD63\` | Base gold (centre) |  
| \`\#C2954E\` | Base gold mid-stop |  
| \`\#B0823F\` | Base gold shadow |  
| \`\#A9762F\` | Bottom-right deep caramel |  
\#\#\# Multi-hue category / pill palette  
A seven-step set of soft tinted backgrounds, each with a hand-tuned darker "on" text colour. Used for the "Built for" category pills (The Problem) and as the fan-card backgrounds (Behind Every Match). All share low saturation and \~88–92% lightness so they read as a family. Hues rotate green → gold → clay → olive → rose → teal → sand.  
| Name | Background | On-text | Fan-card chip (10% darker) |  
|---|---|---|---|  
| Sage green | \`\#D8E5DB\` | \`\#355A47\` | \`\#C6DACC\` |  
| Olive | \`\#E3E4C6\` | \`\#57581F\` | \`\#D4D5B0\` |  
| Wheat | \`\#F1E4BE\` | \`\#74571B\` | \`\#E6D4A0\` |  
| Sand | \`\#F4DDC2\` | \`\#8A5A2A\` | \`\#EBCBA4\` |  
| Clay-peach | \`\#F1D8C9\` | \`\#8C4B33\` | \`\#E6C4B0\` |  
| Rose | \`\#ECD8D6\` | \`\#864E4A\` | \`\#DEC1BE\` |  
| Teal | \`\#CFE0D6\` | \`\#2D5747\` | — |  
\> Each background/text pair clears \~4.5:1 (AA for normal text). When adding new categories \*\*\[proposed\]\*\*, keep L ≈ 0.90, C ≈ 0.04 for the background and derive the text by dropping lightness to \~0.38 at the same hue.  
\#\#\# Alpha / overlay values  
| Use | Value |  
|---|---|  
| Clay glow (CTA radial) | \`radial-gradient(circle, rgba(185,107,77,0.14), transparent 70%)\` |  
| Clay icon-chip background | \`rgba(185,107,77,0.10)\` |  
| Nav hover wash | \`rgba(43,41,38,.07)\` |  
| Nav hairline (scrolled) | \`rgba(43,41,38,.07)\` / mega border \`rgba(43,41,38,.08)\` |  
| Grain overlay tint | \`multiply\`, \`\#181A1F\` noise at \`0.05–0.06\` opacity |  
| Active-column inner hairline (compare) | \`rgba(33,78,63,0.12)\` |  
\---  
\#\# A.2 Hero treatment  
The hero is the only place gold appears. Two layered effects: a four-stop radial gradient stack, and a turbulence grain at \`overlay\`.  
\*\*Gold background (verbatim):\*\*  
\`\`\`css  
.hero {  
  background:  
    radial-gradient(60% 50% at 50% 16%, \#F3DEA0 0%, rgba(243,222,160,0) 62%),  
    radial-gradient(80% 75% at 20% 28%, \#E8C387 0%, rgba(232,195,135,0) 58%),  
    radial-gradient(95% 95% at 82% 90%, \#A9762F 0%, rgba(169,118,47,0) 60%),  
    radial-gradient(130% 120% at 50% 42%, \#D7AD63 0%, \#C2954E 52%, \#B0823F 100%);  
  border-radius: 0 0 40px 40px;   /\* 28px on mobile \*/  
}  
\`\`\`  
\*\*Grain / texture overlay (verbatim):\*\*  
\`\`\`css  
.hero::after {  
  content: "";  
  position: absolute; inset: 0;  
  pointer-events: none;  
  opacity: .65;  
  mix-blend-mode: overlay;  
  background-image: url("data:image/svg+xml;utf8,\<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'\>\<filter id='n'\>\<feTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='2' stitchTiles='stitch'/\>\<feColorMatrix type='saturate' values='0'/\>\<feComponentTransfer\>\<feFuncR type='linear' slope='1.8' intercept='-0.4'/\>\<feFuncG type='linear' slope='1.8' intercept='-0.4'/\>\<feFuncB type='linear' slope='1.8' intercept='-0.4'/\>\<feFuncA type='linear' slope='0' intercept='1'/\>\</feComponentTransfer\>\</filter\>\<rect width='100%' height='100%' filter='url(%23n)'/\>\</svg\>");  
}  
\`\`\`  
\*\*Paper grain (every non-hero section)\*\* — a calmer version of the same idea, fixed-position, \`multiply\`:  
\`\`\`css  
.grain {  
  position: fixed; inset: 0; z-index: 1; pointer-events: none;  
  opacity: .05;                 /\* .06 on The Problem \*/  
  mix-blend-mode: multiply;  
  background-image: url("data:image/svg+xml;utf8,\<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'\>\<filter id='n'\>\<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/\>\</filter\>\<rect width='100%' height='100%' filter='url(%23n)'/\>\</svg\>");  
}  
\`\`\`  
Standardise paper-grain opacity to \*\*0.05\*\*, baseFrequency \*\*0.9\*\*, tile \*\*160px\*\* (see §E).  
\---  
\#\# A.3 Typography  
\#\#\# Families  
| Family | Purpose | Weights loaded |  
|---|---|---|  
| \*\*Libre Baskerville\*\* | Serif display — all headlines, the scroll-ink statement, blockquotes, stat numbers, the accent italic word | 400, 700, italic 400 |  
| \*\*Inter\*\* | Body & UI — paragraphs, nav, card titles, names, form controls | 400, 500, 600 |  
| \*\*Space Grotesk\*\* | Eyebrows, labels, meta, all CTA labels, table dimension labels | 400, 500 |  
Font link (single request):  
\`\`\`html  
\<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400\&family=Inter:wght@400;500;600\&family=Space+Grotesk:wght@400;500\&display=swap" rel="stylesheet"\>  
\`\`\`  
\#\#\# The signature rule — one italic accent word  
Every serif headline contains \*\*exactly one\*\* clay italic word (occasionally two adjacent). Construction:  
\`\`\`html  
\<h2 class="gb-h2"\>Not your typical \<em\>recruiter\</em\>\</h2\>  
\`\`\`  
\`\`\`css  
.gb-h2 em { font-style: italic; font-weight: 400; color: var(--gb-clay); }  
\`\`\`  
The surrounding heading is Libre Baskerville \*\*700\*\*; the \`\<em\>\` drops to \*\*400\*\* italic and switches to clay. Never bold the italic word, never use more than one per heading, never apply it to body text.  
\#\#\# Type scale  
Sizes are \`desktop / mobile\`. Mobile value is either the \`clamp()\` floor or the explicit \`@media (max-width:768px)\` override observed in the folds.  
| Style | Font | Size (desktop / mobile) | Weight | Line-height | Letter-spacing |  
|---|---|---|---|---|---|  
| Display / Hero H1 | Libre Baskerville | \`clamp(38px, 5.4vw, 66px)\` | 700 | 1.08 | \*\*-0.07em\*\* |  
| Section title (H2/H1) | Libre Baskerville | \`48px\` / \`32px\` (\`clamp(32px,4.4vw,48px)\`) | 700 | 1.1 | \*\*-3.5px\*\* |  
| — accent italic word | Libre Baskerville | inherit | 400 \*italic\* | inherit | inherit · clay |  
| Scroll-ink statement | Libre Baskerville | \`clamp(24px, 3vw, 34px)\` | 400 | 1.46 | \-0.07em |  
| Blockquote (testimonial) | Libre Baskerville | \`clamp(16px, 1.35vw, 21px)\` | 400 | 1.42 | \-0.3px |  
| Stat number | Libre Baskerville | \`44px\`–\`48px\` / \`34–38px\` | 400 | 1.0 | \-3.5px |  
| Lede / section sub | Inter | \`19px\` / \`17px\` (\`clamp(17px,1.6vw,19px)\`) | 400 | 1.5 | normal · muted |  
| Hero sub | Inter | \`19px\` / \`17px\` | 500 | 1.4 | normal · \`\#473722\` |  
| Body | Inter | \`15–16px\` | 400 | 1.5–1.6 | normal · muted |  
| Body small | Inter | \`13–14px\` | 400 | 1.5 | normal · muted |  
| Card title | Inter | \`15–17px\` | 600 | 1.25–1.32 | \-0.2px |  
| Name / strong label | Inter | \`16–17px\` | 600 | — | \-0.01em |  
| Nav link | Inter | \`15px\` | 500 | — | \-0.01em (≈ \-0.5px) |  
| \*\*Eyebrow\*\* | Space Grotesk | \`13–14px\` | \*\*500\*\* (Medium) | — | \*\*0.06em\*\* · UPPER · clay |  
| Label / table dimension | Space Grotesk | \`14px\` | 500 | — | 0.05em · UPPER · muted |  
| Meta / role line | Space Grotesk | \`11–13px\` | 500 | — | 0.05–0.08em · UPPER |  
| Mega-menu label | Space Grotesk | \`11px\` | 500 | — | 0.13em · UPPER · \`\#A08A6C\` |  
| CTA label (both tiers) | Space Grotesk | \`13–13.5px\` | 500 | — | 0.085em · UPPER |  
| Primary-CTA inner span | Inter | \`17px\` | 600 | — | \-0.02em |  
\> \*\*Eyebrow weight is always Medium (500).\*\* This is the canonical rule — see the Final CTA & Footer eyebrow. Several earlier folds shipped eyebrows at 400; those are drift (§E) and must be corrected to 500\.  
\---  
\#\# A.4 Spacing  
\*\*Base unit: 4px.\*\* All paddings/margins resolve to multiples of 4 (occasionally 2 for hairline-level nudges).  
Scale:  
| Token | px |  
|---|---|  
| \`--gb-space-1\` | 4 |  
| \`--gb-space-2\` | 8 |  
| \`--gb-space-3\` | 12 |  
| \`--gb-space-4\` | 16 |  
| \`--gb-space-5\` | 22 |  
| \`--gb-space-6\` | 24 |  
| \`--gb-space-7\` | 32 |  
| \`--gb-space-8\` | 40 |  
| \`--gb-space-9\` | 48 |  
| \`--gb-space-10\` | 56 |  
| \`--gb-space-12\` | 72 |  
| \`--gb-space-15\` | 96 |  
| \`--gb-space-16\` | 120 |  
\*\*Standard section padding\*\*  
\- Desktop: \`clamp(72px, 10vw, 120px)\` vertical · \`24px\` horizontal (statement sections go to \`120–140px\`).  
\- Mobile (\`≤768px\`): \`72px 20px\`.  
\*\*Section-header internal rhythm:\*\* eyebrow → \`16px\` → title → \`16px\` → sub → \`56px\` → content. (See §B Section header.)  
\---  
\#\# A.5 Radii, shadows / elevation, borders  
\#\#\# Radius scale  
| Token | px | Use |  
|---|---|---|  
| \`--gb-radius-pill\` | \`999px\` | Buttons, pills, tags, status dots wrappers |  
| \`--gb-radius-xs\` | \`9–10px\` | Icon chips, small inner controls |  
| \`--gb-radius-sm\` | \`14px\` | Inner tile (price ledger) |  
| \`--gb-radius-md\` | \`16px\` | Bento card, table corner |  
| \`--gb-radius-lg\` | \`18–20px\` | Standard card / panel, mega-menu card |  
| \`--gb-radius-xl\` | \`24px\` | Large feature panel (results) |  
| \`--gb-radius-2xl\` | \`28px\` | Hero CTA card, hero bottom corners |  
Standardise card radius to \*\*20px\*\*, feature panel to \*\*24px\*\*, big CTA card to \*\*28px\*\* (§E).  
\#\#\# Elevation / shadows  
| Token | Value | Use |  
|---|---|---|  
| \`--gb-shadow-tile\` | \`0 1px 2px rgba(0,0,0,0.04)\` | Inner tiles, flat cards at rest |  
| \`--gb-shadow-card\` | \`0 8px 24px rgba(0,0,0,.06)\` | Standard greige card / CTA card |  
| \`--gb-shadow-panel\` | \`0 12px 30px rgba(60,50,35,0.08)\` | Large feature panels (warm-toned) |  
| \`--gb-shadow-fan\` | \`0 10px 26px rgba(0,0,0,0.07)\` | Fan cards at rest |  
| \`--gb-shadow-float\` | \`0 18px 40px rgba(0,0,0,.12)\` | Founder photo, lifted hover (\`0 26px 50px rgba(0,0,0,.16)\`) |  
| \`--gb-shadow-nav\` | \`0 10px 34px \-18px rgba(74,47,23,.30)\` | Sticky nav once scrolled |  
| \`--gb-shadow-mega\` | \`0 28px 64px \-26px rgba(74,47,23,.42), 0 6px 16px \-8px rgba(74,47,23,.18)\` | Mega-menu dropdown |  
| \`--gb-shadow-pill-hover\` | \`0 6px 16px \-10px rgba(74,47,23,.45)\` | Secondary pill hover lift |  
The warm shadow ink \`rgba(74,47,23,…)\` is the canonical "lifted UI" shadow colour; neutral \`rgba(0,0,0,…)\` is used for resting/flat cards. Don't mix the two on one element.  
\#\#\# Borders / hairlines  
\- Hairline: \`1px solid \#DED5C6\` on paper & greige surfaces.  
\- Translucent hairline \`1px solid rgba(43,41,38,.07–.08)\` only inside the glass nav / mega chrome.  
\- \*\*Border rule:\*\* an element gets a hairline border when it sits \*flat on the same surface\* and needs separation without lift (table rows, footer dividers, FAQ rows, nav glass). An element that is \*raised\* (card, panel, tile, pill) relies on \*\*fill \+ shadow\*\* and carries \*\*no border\*\*. Never combine a hairline border and a drop shadow on the same card.  
\---  
\#\# A.6 Layout  
\*\*Breakpoints\*\* (max-width, as used in the folds):  
| Name | px | Effect |  
|---|---|---|  
| \`--gb-bp-sm\` | 560 | Stack 3-up card grids to 1 col |  
| \`--gb-bp-md\` | 768 | Primary mobile breakpoint — section padding \`72/20\`, titles → 32px, grids collapse |  
| \`--gb-bp-lg\` | 820 | Results accordion \+ fan stack vertically |  
| \`--gb-bp-xl\` | 980 | Nav switches to burger; pricing layout stacks |  
| \`--gb-bp-2xl\` | 1340 | Nav container max-width |  
\*\*Container max-widths\*\* (pick by content type):  
| Width | Used for |  
|---|---|  
| \`1340px\` | Nav inner |  
| \`1200px\` | Default page container, footer, wide sections, About |  
| \`1180px\` | Pricing |  
| \`1080px\` | Roles |  
| \`1000px\` | Comparison, Results stats |  
| \`920px\` | Team & FAQ |  
| \`860–880px\` | Scroll-ink statement column |  
| \`760px\` | Reading column inside a section (FAQ list, team grid) |  
\> \*\*\[proposed\] canonical container:\*\* use \`--gb-container: 1200px\` as the page default and the narrower values above as \*content\* maxima nested inside. Gutter is always \`24px\` (\`20px\` ≤768).  
\*\*Grid conventions:\*\* 12-col is unnecessary — the system is built from centred \`max-width\` columns plus a handful of explicit grids: 3-up cards (\`repeat(3,1fr)\`, gap 12–24px), bento (\`repeat(3,1fr)\` → 2 → 1), comparison (\`1.25fr 1fr 1fr\`), pricing (\`flex: 0 0 380px\` rail \+ fluid bento), team (\`repeat(3,1fr)\`). Collapse order is always 3 → 2 → 1\.  
\---  
\# B. Components  
Interaction states below follow one motion contract: \*\*transition \`.15–.2s ease\` for hovers, \`.6s cubic-bezier(.22,1,.36,1)\` for reveals.\*\* Focus is always \`2px solid \#9E5740, offset 3px\` on interactive controls (links may use the clay underline instead).  
\#\# B.1 Top navigation  
\*\*Anatomy:\*\* fixed bar → \`.nav-inner\` (max 1340, height 74px, 0 30px) → wordmark · primary links (\`How it works\`, \`Pricing\`, mega-triggers \`Roles\`/\`Industries\`/\`Resources\`) · right cluster (\`Book a call\` pill \+ burger).  
\*\*States:\*\*  
\- \*Top of page:\* transparent bar; the right-hand \`Book a call\` pill is hidden (\`opacity:0; visibility:hidden\`).  
\- \*Scrolled (\`.scrolled\`, after 8px):\* glass — \`background:rgba(250,244,234,.78)\`, \`backdrop-filter:blur(20px) saturate(1.5)\`, bottom hairline \`rgba(43,41,38,.07)\`, \`--gb-shadow-nav\`; the \`Book a call\` pill fades in.  
\- \*Link hover:\* \`background:rgba(43,41,38,.07)\`, radius 10px.  
\- \*Mega trigger hover:\* chevron rotates 180°; dropdown fades up (\`translateY(7px)→0\`, \`.18s\`).  
\- \*Burger ≤980px:\* links hide, burger shows, mobile sheet drops (glass card, radius 18px).  
\*\*Mega-menu variants:\*\* Roles (two-panel, 680px — category rail \+ 2-col sub-roles, driven by Sanity taxonomy), Industries (540px, 2-col dot links), Resources (460px, two labelled columns with \`\<small\>\` descriptions). Card: \`rgba(252,247,238,.94)\` glass, radius 20px, \`--gb-shadow-mega\`, padding 14px.  
\*\*Do\*\* keep the bar transparent over the hero so the gold shows through. \*\*Don't\*\* show the nav CTA at the top — it only appears scrolled. Nav links use Inter 500 / ink \`\#2B2926\`; mega labels are Space Grotesk 500 \`\#A08A6C\`.  
\#\# B.2 Footer  
\*\*Anatomy:\*\* top hairline → grid \`1.4fr 1fr 1fr\` (brand blurb · Explore · Company), then a hairline sub-bar with copyright \+ Privacy/Terms. Max 1200, padding \`64px 24px 0\`; column headings are \*\*eyebrows\*\* (Space Grotesk 500, clay, 0.06em). Brand mark is the pill wordmark (\`1.5px solid \#181A1F\`, radius 999px, padding \`7px 16px\`).  
\- \*Link rest:\* \`\#181A1F\` (nav columns) / \`\#5E6269\` (legal). \*Hover:\* \`color:\#B96B4D\`.  
\- \*Mobile (≤768):\* collapses to \`1fr 1fr\`, brand spans full width, legal row stacks.  
\*\*Do\*\* reuse the eyebrow for column headers. \*\*Don't\*\* introduce new link colours — hover is always clay.  
\#\# B.3 Buttons  
There are \*\*two tiers only\*\*. Both use Space Grotesk \*\*500\*\* uppercase labels at \`0.085em\`.  
\#\#\# Primary — soft-3D / neumorphic gold CTA (LOCKED)  
The hero's signature button. \*\*Do not restyle.\*\* Layered construction: outer \`.cta\` (sets shadow ink \`--sh:74,47,23\`, highlight \`--hi:255,247,230\`, text \+ gradient vars) → \`.button-outer\` (drop shadow that collapses on hover) → \`.button-inner\` (the gold gradient \`linear-gradient(135deg,var(--g1),var(--g2))\` with a dense inset highlight/shadow stack and an animated \`clip-path\` inset on hover) → \`span\` (Inter 600, transparent text filled by a \`--txt1→--txt2\` gradient via \`background-clip\`).  
\- \*\*Hero / hero-nav variant:\*\* \`--g1:\#DCBC72; \--g2:\#CBA862; \--txt1:\#241B10; \--txt2:\#2C2012;\` (gold fill, dark text). Default label \*\*"Start your search →"\*\*.  
\- \*\*Paper-background variant (e.g. on Pricing):\*\* \`--g1:\#E7B79A; \--g2:\#D89C72; \--txt1:\#3E2012; \--txt2:\#33190C;\` — a clay-peach fill tuned to read on paper.  
\- \*Hover:\* outer shadow collapses to 0, inner clips inward \+ deepens, label scales to \`.975\`.  
\- \*Active:\* inner scales \`.975\`.  
\- \*Focus-visible:\* \`2px solid \#9E5740, offset 3px\`.  
\> \*\*Critical:\*\* the highlight/shadow system assumes a \*\*light\*\* fill (\`--hi\` is cream). A dark fill kills the 3D. Keep fills light, text dark. Reserve this button for the single most important action on a page (hero, and scrolled hero-nav). Full source lives in \`Hero.dc.html\` / \`Simple Pricing.dc.html\`.  
\#\#\# Secondary — card-cream flat pill (site-wide standard)  
The default CTA for everywhere that isn't the hero. Flat, narrow.  
\`\`\`  
.pill  → fill \#ECE4D5, radius 999px, padding 6px 24px 6px 6px, gap 13px (nav: 11px/5px)  
.chip  → 38px circle (nav 34px), background \#FAF4EA (paper), NO border, holds a clay→ arrow in \#3A2417  
.lbl   → Space Grotesk 500, UPPER, 0.085em, 13.5px, colour \#3A2417  
\`\`\`  
\- \*Hover:\* \`filter:brightness(.975)\`, \`translateY(-1px)\`, \`--gb-shadow-pill-hover\`.  
\- \*Active:\* \`translateY(0)\`.  
\- \*Focus-visible:\* \`2px solid \#9E5740, offset 3px\`.  
Default labels: \*\*"Start your search"\*\* (conversion) or \*\*"Book a call"\*\* (nav). The chip circle is always paper \`\#FAF4EA\` with the arrow in \`\#3A2417\`.  
\#\#\# Tertiary — text-link CTA  
Space Grotesk 500, UPPER, 0.05em, clay, no chip, trailing \`→\` (e.g. "See all roles →", "See pricing →", "Learn more"). \*Hover:\* colour → \`\#9E5740\` \+ underline. Use for in-section secondary actions whose label is \*\*not\*\* "Start your search".  
\*\*Don't\*\* invent a third filled button colour. \*\*Don't\*\* put the gold primary anywhere but the hero/hero-nav.  
\#\# B.4 Text links  
Inline links inside body copy: \`color:\#B96B4D; text-decoration:none\`, hover \`color:\#9E5740; text-decoration:underline\`. Footer/nav links: ink at rest, clay on hover. Always reach AA; never rely on colour alone for meaning in a sentence — keep the underline-on-hover affordance.  
\#\# B.5 Pills & tags  
\- \*\*Category pill (multi-hue):\*\* \`display:inline-flex; padding:9px 18px; border-radius:999px;\` Inter 500, 14.5px; background+text from the tint set (§A.1). No border, no shadow. Used for "Built for" chips.  
\- \*\*Status pill:\*\* tiny Space Grotesk 9px UPPER with a 6px clay dot — e.g. "● Active" in the price ledger.  
\- \*\*Brand pill (wordmark):\*\* outline pill, \`1.5px solid \#181A1F\`, radius 999px.  
\*\*Do\*\* keep one tint per concept and reuse it. \*\*Don't\*\* mix tint backgrounds with shadows — these are flat.  
\#\# B.6 Cards & panels  
Two surfaces, one elevation language:  
\- \*\*Greige card / panel\*\* — \`background:\#ECE4D5; border-radius:20px; box-shadow:0 8px 24px rgba(0,0,0,.06); padding:36px 32px\` (feature panels \`24px\` radius, warm \`--gb-shadow-panel\`). The primary "this is a contained module" surface.  
\- \*\*Inner tile\*\* — \`background:\#FCF9F2; border-radius:16px; box-shadow:0 1px 2px rgba(0,0,0,.04); padding:22px\`. Sits \*inside\* a greige card or directly on paper as a quiet bento cell. Often carries a clay icon-chip (\`38px\`, radius 10px, \`rgba(185,107,77,.10)\`, clay 1.8px stroke icon).  
Card title Inter 600 (15–17px), body Inter 400 (13–15px) muted. No borders on either — fill \+ shadow only.  
\*\*\[proposed\] CMS content card\*\* (role/industry/resource index tiles): inner-tile surface, clay icon-chip, Inter 600 title, muted one-line description, optional tertiary "→" link; hover lifts shadow to \`--gb-shadow-card\` and \`translateY(-2px)\`.  
\#\# B.7 Eyebrow  
The system's most-used label. \*\*Space Grotesk 500 (Medium)\*\*, UPPERCASE, \`letter-spacing:0.06em\`, \`font-size:13–14px\`, \`color:\#B96B4D\`, \`margin-bottom:16px\`. Always the first line of a section header and of footer columns. Never bold, never sentence-case, never any colour but clay. (Correct any 400-weight instances to 500.)  
\#\# B.8 Section-header pattern  
The repeating rhythm that opens almost every section:  
\`\`\`html  
\<p class="gb-eyebrow"\>How we compare\</p\>  
\<h2 class="gb-h2"\>Not your typical \<em\>recruiter\</em\>\</h2\>  
\<p class="gb-lede"\>Same goals, but a very different way of getting there.\</p\>  
\`\`\`  
Spacing: eyebrow \`mb 16\` → H2 \`mb 16\` → lede. Lede is Inter 400, 19px, muted, \`max-width:42–54ch\`, \`text-wrap:pretty\`. Centre-aligned for most sections; left-aligned for the scroll-ink statement (The Problem). H2 carries exactly one clay italic word.  
\#\# B.9 FAQ accordion  
Native \`\<details\>/\<summary\>\` (marker hidden). Each row: \`border-bottom:1px solid \#DED5C6\`; summary \`display:flex; justify-content:space-between; padding:22px 0\`, Inter 600 17px ink; answer Inter 400 16px / lh 1.6 muted, \`max-width:64ch\`, padded \`0 0 22px\`. The toggle is a \*\*plus icon\*\* built from two 2px clay bars that \*\*rotates 135°\*\* (→ ×) when open (\`transform .3s cubic-bezier(.22,1,.36,1)\`). One row open by default (\`defaultOpenIndex\`). Ships with \`FAQPage\` JSON-LD (see §C).   
\*\*Do\*\* keep answers ≤64ch and link onward where relevant ("See pricing →"). \*\*Don't\*\* animate height with JS — rely on native \`\<details\>\`; only the icon transitions.  
\#\# B.10 Role / industry ticker  
Two horizontally-scrolling marquee rows of role names. Row: \`overflow:hidden; white-space:nowrap\`, edge mask \`linear-gradient(90deg,transparent,\#000 7%,\#000 93%,transparent)\`. Track: \`display:inline-flex; animation:gb-ticker-{right|left} {92s|100s} linear infinite\` (the two rows scroll opposite directions at slightly different speeds); list is duplicated (\`ROW.concat(ROW)\`) for a seamless loop. Items Inter 400 \`clamp(16px,2vw,23px)\` ink, separated by a clay \`•\` dot (margin 22px). \*\*Hover pauses\*\* all tracks (\`animation-play-state:paused\`). Reduced-motion: animation off (static row).  
\*\*\[proposed\]\*\* reuse for an industries ticker or a logo ticker by swapping the item list.  
\#\# B.11 Stat block  
Big serif number \+ clay label beneath. Number: Libre Baskerville 400, 44–48px, lh 1, \`letter-spacing:-3.5px\`, ink. Label: Space Grotesk \*\*500\*\* (standardised — see §E), UPPER, 14px, clay, \`margin-top:12px\`. Lay out 3-up with \`gap:24px 72px\`, wrap centred. Numbers stay textual ("3 weeks", "60%", "\~2 years") — no odometer needed, reveal handles the entrance.  
\#\# B.12 Comparison table  
CSS-grid table, \`grid-template-columns:1.25fr 1fr 1fr\` (dimension · Growthbuddy · Typical recruiter). Header row: blank cell · "Growthbuddy" on greige \`\#ECE4D5\` with top corners \`16px\` · "Typical recruiter" plain. Each dimension label is a Space Grotesk 500 UPPER cell; the \*\*Growthbuddy column is a continuous greige panel\*\* (rounded 16px top & bottom, inner hairlines \`rgba(33,78,63,0.12)\`) with \*\*clay check icons\*\*; the recruiter column is plain with \*\*muted grey ✕ icons\*\* (\`\#AEA89E\` stroke, text \`\#6c6862\`). Rows divided by \`\#DED5C6\`.  
\- \*Mobile (≤768):\* collapse to a single column; each pair restacks with \`::before\` labels ("Growthbuddy" in forest \`\#214E3F\`, "Typical recruiter" muted), icons inline.  
\*\*Do\*\* lead every Growthbuddy cell with the clay check and keep recruiter cells visibly muted. \*\*Don't\*\* colour the recruiter column red — the contrast is greige-vs-plain, not good-vs-bad-red.  
\#\# B.13 Form inputs \*\*\[proposed\]\*\*  
No native form shipped in the folds; this pattern is inferred from the system's surfaces, radii and clay accent. Build CMS/contact forms from it.  
\- \*\*Label:\*\* Inter 500, 14px, ink, \`margin-bottom:8px\`.  
\- \*\*Input / textarea / select:\*\* \`background:\#FCF9F2; border:1px solid \#DED5C6; border-radius:12px; padding:12px 14px;\` Inter 400 16px ink; placeholder \`\#8A847A\`.  
\- \*Hover:\* border \`\#CDBFAA\`. \*Focus:\* \`border-color:\#B96B4D; box-shadow:0 0 0 3px rgba(185,107,77,0.14); outline:none\`.  
\- \*Help text:\* Inter 400 13px muted, \`margin-top:6px\`.  
\- \*Error:\* border \`\#9E5740\`, help text \`\#9E5740\`, optional 6px error dot; never colour-only — pair with a message.  
\- \*Disabled:\* \`opacity:.55; cursor:not-allowed; background:\#ECE4D5\`.  
Inputs are flat-tile surfaces (border, no shadow); the clay focus ring is the only accent.  
\#\# B.14 Avatars / initials  
\- \*\*Initial tile\*\* (team): square \`aspect-ratio:1/1\`, \`border-radius:16px\`, \`background:linear-gradient(150deg,\#EFE2D2,\#EADBCE)\`, initial in Libre Baskerville 40px clay-dark \`\#9E5740\`, soft tile+float shadow. Name Inter 600 17px, role eyebrow (Space Grotesk 500 11px clay).  
\- \*\*Photo\*\* (founders, testimonial people): \`object-fit:cover; border-radius:20px\` (founder) / circular crops; warm float shadow.  
\*\*\[proposed\] candidate-profile avatar:\*\* same initial-tile fallback when no photo; circular \`96px\` variant for profile headers.  
\#\# B.15 Badges & ticks  
\- \*\*Check tick\*\* (compare, CTA reassurance, value cards): clay stroke \`2–2.2px\`, round caps, inside a circle for "guarantee" ticks. Reassurance row under a CTA: three \`● No upfront fee / Pay only while they stay / Replacement guaranteed\` items, Space Grotesk 500 14px with clay circle-check icons.  
\- \*\*Cross\*\* (recruiter column): muted \`\#AEA89E\` stroke ✕, never red.  
\#\# B.16 Logo / wordmark  
Primary wordmark is \`img/wordmark.png\`, rendered at \*\*30px\*\* height in the nav (\`26px\` ≤768). Minimum clear space ≈ the cap-height on every side; never recolour, never place on a busy area of the hero. The \*\*outline-pill wordmark\*\* (text "Growthbuddy" in a \`1.5px solid \#181A1F\` pill) is the footer/brand-mark treatment. Always "Growthbuddy", capital G only.  
\#\# B.17 Trusted-by logo strip  
Centred row, \`gap:60–72px\`, wrap on mobile. Each logo \`opacity:.45\` at rest (grayscale feel), hover \`opacity:1; transform:scale(1.04)\`. Logos sized individually by height (23–36px) to optically balance. Six partner marks ship: Manual, Spekk, Tread Partners, YellowFin Digital, archa, 3Dctrl. Preceded by a "Trusted by" eyebrow.  
\---  
\# C. Patterns & principles  
\#\# C.1 Section rhythm  
Homepage order (canonical): \*\*Hero → The Problem → How We Compare → How It Works → Roles we hire for → The Results → Behind Every Match → Pricing → Team & FAQ → Final CTA & Footer.\*\*  
Rhythm rules:  
\- Background is \*\*paper \`\#FAF4EA\` throughout\*\*; the only colour break is the gold hero (top) and greige cards/panels within sections. Use at most paper \+ greige as section backgrounds — never tint a whole section.  
\- Every section opens with the eyebrow → title → lede header (§B.8) except the scroll-ink statement folds.  
\- Alternate "centred text \+ media/cards" with the occasional full-width device (ticker, results accordion) for cadence.  
\- Each section gets the fixed paper-grain overlay at 0.05.  
\- Section vertical padding \`clamp(72px,10vw,120px)\`.  
\#\# C.2 AI-friendly content order \*\*\[proposed for CMS pages\]\*\*  
For role / industry / guide pages, order blocks so the answer is extractable: \*\*one-line answer → key takeaways (3–6 bullet/tick list) → comparison (table or stat block) → FAQ (with \`FAQPage\` JSON-LD) → related links.\*\* This mirrors how the homepage already sequences claim → reassurance ticks → comparison table → FAQ. Lead each page with a single plain-language sentence in the lede slot.  
\#\# C.3 Motion  
\- \*\*Once-on-scroll reveal:\*\* elements start \`opacity:0; translateY(16px)\` and settle to \`opacity:1; none\` over \`.6–.7s cubic-bezier(.22,1,.36,1)\`, \*\*staggered\*\* by \`data-delay\` (typically \`+80ms\` per element). Fires once via IntersectionObserver (threshold \~0.2–0.3) with a \`\~600ms\` fallback so headless/long pages always reveal.  
\- \*\*Scroll-ink statement:\*\* serif statement words start at \`opacity:.2\` and ink to full as they pass the viewport mid-line (\`start 85vh → end 42vh\`); flagged "clay" words also lerp ink→clay. This is the signature editorial moment (The Problem, the Final CTA testimonial).  
\- \*\*Ticker:\*\* continuous linear marquee, opposed rows, 92s/100s, hover-pause.  
\- \*\*Micro-interactions:\*\* hover lifts \`translateY(-1px)\`, shadow deepens; the gold CTA clip-path animates inward; FAQ plus rotates 135°; results accordion panels grow \`flex-grow 1.15 ↔ 4.4\` over \`.6s\`; About value cards 3D-flip \`.65s\`.  
\- \*\*Standard easing:\*\* \`cubic-bezier(.22,1,.36,1)\`. Standard durations: hover \`.15–.2s\`, reveal \`.6–.7s\`, layout \`.45–.65s\`.  
\- \*\*Reduced motion:\*\* \`@media (prefers-reduced-motion:reduce)\` — all reveals forced visible, tickers/flip/scroll-ink disabled, no transitions. Every fold already implements this; keep it.  
\#\# C.4 Accessibility  
\- \*\*Contrast targets:\*\* body text AA (≥4.5:1) — \`\#5E6269\` on paper passes; ink passes AAA. Clay is a UI/large-text accent (≥3:1) — never use clay for small body copy. Tint-pill pairs are pre-checked to AA.  
\- \*\*Focus visibility:\*\* every control shows \`2px solid \#9E5740, offset 3px\` on \`:focus-visible\` (links may use clay underline). Never remove outlines without a replacement.  
\- \*\*Semantic structure:\*\* one \`\<h1\>\` per page (hero / page title), sections use \`\<section\>\` with a real \`\<h2\>\`; nav is \`\<nav\>\`, footer \`\<footer\>\`, FAQ uses native \`\<details\>\`. \`data-screen-label\` / \`data-comment-anchor\` are review aids — strip in production.  
\- \*\*Alt text:\*\* real photos get descriptive alt (founders, testimonial people); decorative grain/glow are \`aria-hidden\`; the face-grid is a single labelled \`role="img"\`; logos use the brand name as alt.  
\- \*\*Don't rely on colour alone:\*\* comparison good/bad is reinforced by check vs ✕ icons; errors pair colour with a message.  
\---  
\# D. Tokens  
\#\# D.1 Ready-to-paste \`:root\`  
\`\`\`css  
:root {  
  /\* \---- Colour: core \---- \*/  
  \--gb-paper:        \#FAF4EA;  
  \--gb-surface:      \#ECE4D5;  
  \--gb-surface-tile: \#FCF9F2;  
  \--gb-hairline:     \#DED5C6;  
  \--gb-ink:          \#181A1F;  
  \--gb-ink-warm:     \#1B2420;  
  \--gb-muted:        \#5E6269;  
  \--gb-clay:         \#B96B4D;  
  \--gb-clay-dark:    \#9E5740;  
  \--gb-forest:       \#355A47;  
  /\* \---- Colour: in-situ text tints \---- \*/  
  \--gb-ink-hero:     \#241B10;  
  \--gb-sub-hero:     \#473722;  
  \--gb-nav-ink:      \#2B2926;  
  \--gb-pill-ink:     \#3A2417;  
  \--gb-meta:         \#8A847A;  
  \--gb-mega-label:   \#A08A6C;  
  /\* \---- Colour: hero gold ramp \---- \*/  
  \--gb-gold-hi:      \#F3DEA0;  
  \--gb-gold-warm:    \#E8C387;  
  \--gb-gold:         \#D7AD63;  
  \--gb-gold-mid:     \#C2954E;  
  \--gb-gold-shadow:  \#B0823F;  
  \--gb-gold-deep:    \#A9762F;  
  /\* \---- Colour: CTA gradients \---- \*/  
  \--gb-cta-gold-1:   \#DCBC72;  \--gb-cta-gold-2:   \#CBA862;  /\* hero (dark text) \*/  
  \--gb-cta-clay-1:   \#E7B79A;  \--gb-cta-clay-2:   \#D89C72;  /\* paper variant \*/  
  \--gb-cta-txt-1:    \#241B10;  \--gb-cta-txt-2:    \#2C2012;  
  /\* \---- Colour: multi-hue tint set (bg / text) \---- \*/  
  \--gb-tint-sage-bg:  \#D8E5DB;  \--gb-tint-sage-tx:  \#355A47;  
  \--gb-tint-olive-bg: \#E3E4C6;  \--gb-tint-olive-tx: \#57581F;  
  \--gb-tint-wheat-bg: \#F1E4BE;  \--gb-tint-wheat-tx: \#74571B;  
  \--gb-tint-sand-bg:  \#F4DDC2;  \--gb-tint-sand-tx:  \#8A5A2A;  
  \--gb-tint-clay-bg:  \#F1D8C9;  \--gb-tint-clay-tx:  \#8C4B33;  
  \--gb-tint-rose-bg:  \#ECD8D6;  \--gb-tint-rose-tx:  \#864E4A;  
  \--gb-tint-teal-bg:  \#CFE0D6;  \--gb-tint-teal-tx:  \#2D5747;  
  /\* \---- Typography \---- \*/  
  \--gb-font-display: 'Libre Baskerville', Georgia, serif;  
  \--gb-font-body:    'Inter', system-ui, sans-serif;  
  \--gb-font-label:   'Space Grotesk', sans-serif;  
  \--gb-display-ls:   \-0.07em;   /\* hero / scroll-ink / lede headings \*/  
  \--gb-title-ls:     \-3.5px;    /\* section titles & stat numbers \*/  
  \--gb-eyebrow-ls:   0.06em;  
  \--gb-cta-ls:       0.085em;  
  \--gb-fs-display:   clamp(38px, 5.4vw, 66px);  
  \--gb-fs-title:     clamp(32px, 4.4vw, 48px);  
  \--gb-fs-statement: clamp(24px, 3vw, 34px);  
  \--gb-fs-stat:      48px;  
  \--gb-fs-lede:      clamp(17px, 1.6vw, 19px);  
  \--gb-fs-body:      16px;  
  \--gb-fs-body-sm:   14px;  
  \--gb-fs-eyebrow:   14px;  
  \--gb-fs-meta:      11px;  
  \--gb-weight-eyebrow: 500;     /\* Medium — canonical \*/  
  \--gb-weight-title:   700;  
  \--gb-weight-strong:  600;  
  /\* \---- Spacing (4px base) \---- \*/  
  \--gb-space-1: 4px;   \--gb-space-2: 8px;   \--gb-space-3: 12px;  
  \--gb-space-4: 16px;  \--gb-space-5: 22px;  \--gb-space-6: 24px;  
  \--gb-space-7: 32px;  \--gb-space-8: 40px;  \--gb-space-9: 48px;  
  \--gb-space-10:56px;  \--gb-space-12:72px;  \--gb-space-15:96px;  \--gb-space-16:120px;  
  \--gb-section-y:   clamp(72px, 10vw, 120px);  
  \--gb-gutter:      24px;  
  /\* \---- Radii \---- \*/  
  \--gb-radius-pill: 999px;  
  \--gb-radius-xs:   10px;  
  \--gb-radius-sm:   14px;  
  \--gb-radius-md:   16px;  
  \--gb-radius-lg:   20px;  
  \--gb-radius-xl:   24px;  
  \--gb-radius-2xl:  28px;  
  /\* \---- Shadows / elevation \---- \*/  
  \--gb-shadow-tile:       0 1px 2px rgba(0,0,0,.04);  
  \--gb-shadow-card:       0 8px 24px rgba(0,0,0,.06);  
  \--gb-shadow-panel:      0 12px 30px rgba(60,50,35,.08);  
  \--gb-shadow-fan:        0 10px 26px rgba(0,0,0,.07);  
  \--gb-shadow-float:      0 18px 40px rgba(0,0,0,.12);  
  \--gb-shadow-nav:        0 10px 34px \-18px rgba(74,47,23,.30);  
  \--gb-shadow-mega:       0 28px 64px \-26px rgba(74,47,23,.42), 0 6px 16px \-8px rgba(74,47,23,.18);  
  \--gb-shadow-pill-hover: 0 6px 16px \-10px rgba(74,47,23,.45);  
  /\* \---- Borders \---- \*/  
  \--gb-border-hairline: 1px solid \#DED5C6;  
  \--gb-border-glass:    1px solid rgba(43,41,38,.08);  
  /\* \---- Motion \---- \*/  
  \--gb-ease:        cubic-bezier(.22,1,.36,1);  
  \--gb-dur-hover:   .18s;  
  \--gb-dur-reveal:  .6s;  
  \--gb-dur-layout:  .45s;  
  /\* \---- Focus \---- \*/  
  \--gb-focus: 2px solid \#9E5740;  
  /\* \---- Layout / breakpoints \---- \*/  
  \--gb-container: 1200px;  
  \--gb-bp-sm:  560px;  \--gb-bp-md:  768px;  \--gb-bp-lg:  820px;  
  \--gb-bp-xl:  980px;  \--gb-bp-2xl: 1340px;  
}  
\`\`\`  
\#\# D.2 Reference table  
| Token | Value |  
|---|---|  
| \`--gb-paper\` | \`\#FAF4EA\` |  
| \`--gb-surface\` | \`\#ECE4D5\` |  
| \`--gb-surface-tile\` | \`\#FCF9F2\` |  
| \`--gb-hairline\` | \`\#DED5C6\` |  
| \`--gb-ink\` | \`\#181A1F\` |  
| \`--gb-ink-warm\` | \`\#1B2420\` |  
| \`--gb-muted\` | \`\#5E6269\` |  
| \`--gb-clay\` | \`\#B96B4D\` |  
| \`--gb-clay-dark\` | \`\#9E5740\` |  
| \`--gb-forest\` | \`\#355A47\` |  
| \`--gb-font-display\` | Libre Baskerville |  
| \`--gb-font-body\` | Inter |  
| \`--gb-font-label\` | Space Grotesk |  
| \`--gb-display-ls\` | \`-0.07em\` |  
| \`--gb-title-ls\` | \`-3.5px\` |  
| \`--gb-eyebrow-ls\` | \`0.06em\` |  
| \`--gb-cta-ls\` | \`0.085em\` |  
| \`--gb-fs-display\` | \`clamp(38px,5.4vw,66px)\` |  
| \`--gb-fs-title\` | \`clamp(32px,4.4vw,48px)\` |  
| \`--gb-fs-statement\` | \`clamp(24px,3vw,34px)\` |  
| \`--gb-fs-lede\` | \`clamp(17px,1.6vw,19px)\` |  
| \`--gb-weight-eyebrow\` | \`500\` |  
| \`--gb-section-y\` | \`clamp(72px,10vw,120px)\` |  
| \`--gb-gutter\` | \`24px\` |  
| \`--gb-radius-pill\` | \`999px\` |  
| \`--gb-radius-lg\` | \`20px\` |  
| \`--gb-radius-xl\` | \`24px\` |  
| \`--gb-radius-2xl\` | \`28px\` |  
| \`--gb-shadow-card\` | \`0 8px 24px rgba(0,0,0,.06)\` |  
| \`--gb-shadow-panel\` | \`0 12px 30px rgba(60,50,35,.08)\` |  
| \`--gb-shadow-nav\` | \`0 10px 34px \-18px rgba(74,47,23,.30)\` |  
| \`--gb-shadow-mega\` | \`0 28px 64px \-26px rgba(74,47,23,.42), 0 6px 16px \-8px rgba(74,47,23,.18)\` |  
| \`--gb-ease\` | \`cubic-bezier(.22,1,.36,1)\` |  
| \`--gb-focus\` | \`2px solid \#9E5740\` |  
| \`--gb-container\` | \`1200px\` |  
\---  
\# E. Inconsistency report  
Drift found across folds, with the single canonical value to adopt.  
| \# | Property | Where it drifts | Values seen | \*\*Standardise to\*\* |  
|---|---|---|---|---|  
| 1 | \*\*Eyebrow weight\*\* | The Results, Behind Every Match, How We Compare (intro eyebrow) vs Final CTA, Hero region | \`400\` vs \`500\` | \*\*\`500\` (Medium)\*\* — per the Final CTA reference. Apply everywhere. |  
| 2 | Greige surface hex | Cards/panels (\`\#ECE4D5\`) vs Results/Compare panels (\`\#ECE4D6\`) | \`\#ECE4D5\` / \`\#ECE4D6\` | \*\*\`\#ECE4D5\`\*\* |  
| 3 | Recruiter-cell text (compare) | Muted cells | \`\#6c6862\` vs token \`\#5E6269\` | \*\*\`\#5E6269\`\*\* (\`--gb-muted\`) |  
| 4 | Card radius | Cards 16–20px, panels 20–24px, CTA 28px | mixed | \*\*20px\*\* card · \*\*24px\*\* feature panel · \*\*28px\*\* hero CTA card |  
| 5 | Paper-grain overlay | sections | opacity \`0.05\`/\`0.06\`, tile \`160\`/\`180\`, baseFreq \`0.85\`/\`0.9\` | \*\*opacity 0.05 · 160px · 0.9\*\* |  
| 6 | Eyebrow letter-spacing | most \`0.06em\`; some labels \`0.05em\`; pricing uses stray \`0.06px\` | \`0.06em\` / \`0.05em\` / \`0.06px\` (typo) | \*\*\`0.06em\`\*\* for eyebrows; \`0.05em\` reserved for table/meta labels. Fix the \`0.06px\` typos. |  
| 7 | Heading ink | body H2 \`\#181A1F\` vs hero H1 \`\#241B10\` | two inks | Keep \*\*\`\#241B10\` (\`--gb-ink-hero\`) only on gold\*\*; everywhere on paper use \*\*\`\#181A1F\`\*\*. |  
| 8 | Section-title size source | some \`48px\` fixed, some \`clamp(32px,4.4vw,48px)\` | both | \*\*\`clamp(32px,4.4vw,48px)\`\*\* (responsive) everywhere |  
| 9 | Stat-label / Results-eyebrow weight | Results uses Space Grotesk \`400\` | \`400\` vs \`500\` | \*\*\`500\`\*\* (ties to fix \#1) |  
| 10 | Statement letter-spacing vs title | scroll-ink uses \`-0.07em\`, titles use \`-3.5px\` | em vs px | Keep both but document: \*\*display/statement → \`-0.07em\`\*\*, \*\*fixed titles & stat numbers → \`-3.5px\`\*\*. (At 48px these are nearly identical; prefer the em form for new work.) |  
| 11 | Container max-width | 860–1340px across folds | many | Page default \*\*\`1200px\`\*\*; nested reading columns use the documented narrower maxima (§A.6). |  
| 12 | "Trusted by" gap | Hero \`72px\` vs Pricing \`60px\` | both | \*\*\`72px\`\*\* desktop, \`30–40px\` wrap on mobile |  
\> Adopting \#1, \#2 and \#4 resolves the most visible drift. Everything else is sub-pixel or token-naming hygiene.  
