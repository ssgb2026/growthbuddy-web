\# Growthbuddy — Interactive Behaviour Spec for Claude Code

This document exists because the interactive behaviour on these pages is \*\*driven by  
JavaScript, not CSS\*\* — so when you hand Claude Code a static HTML file, it reads the  
visible CSS, sees only the resting state, and reproduces a dead page. None of these  
effects can be inferred from the markup. Each one is computed at runtime.

\*\*Where the code actually lives.\*\* Every page is a Design Component (\`\*.dc.html\`). The  
interactive logic sits in a \`class Component extends DCLogic { … }\` block at the bottom of  
the file, inside \`componentDidMount()\`. There is no separate JS file, no framework bundle —  
it's all in that one class. When you feed Claude Code a \*bundled / standalone\* export  
(e.g. \`How It Works.html\`), the same logic is present but minified inside a  
\`\<script type="\_\_bundler/template"\>\` blob, which is why it gets skipped. \*\*Always work from  
the \`.dc.html\` source, and read the \`componentDidMount\` body, not just the CSS.\*\*

\---

\#\# 0\. Conventions shared by every page

Read these once; they apply everywhere below.

\- \*\*Reveal-on-scroll (used on nearly every section).\*\* Elements start at  
  \`opacity:0; transform:translateY(16px)\` inline. An \`IntersectionObserver\` (threshold  
  \~0.15–0.3) flips them to \`opacity:1; transform:none\`, \*\*staggered\*\* (each item's  
  \`transition-delay\` \= its index × \~80ms). A \`setTimeout\` fallback (\~600–700ms) reveals  
  everything even if the observer never fires (covers headless capture / very tall  
  sections). Transition is \`.6s cubic-bezier(.22,1,.36,1)\`.  
\- \*\*Reduced motion.\*\* Every effect checks  
  \`matchMedia('(prefers-reduced-motion: reduce)')\`. When true: skip all pointer/scroll  
  tracking and jump straight to the final/revealed state. Always implement this branch.  
\- \*\*\`requestAnimationFrame\` throttling.\*\* All scroll- and pointer-driven handlers set a  
  \`ticking\` flag and do the work inside one \`rAF\` per frame — never on every raw event.  
\- \*\*Geometry is measured, not assumed.\*\* Effects that depend on element positions clear  
  any transforms first, then read \`getBoundingClientRect()\` on load \*\*and\*\* on resize.

\---

\#\# 1\. Hero — magnify / "fish-eye" candidate strip  
\*\*File:\*\* \`Hero.dc.html\` → \`componentDidMount\` → \`measure()\` / \`focus()\`

\#\#\# What it looks like  
A centred cluster of 14 small (58×58px) greyscale candidate photos in 3 rows  
(\*\*4 / 6 / 4\*\*, 15px gap). One area is large/sharp/opaque; tiles fall off in size,  
opacity and sharpness with distance — reading as a lens bulge. It tracks the cursor.

\#\#\# It is NOT image distortion  
No pixels are warped. Each tile stays a fixed-size square; only its \`scale\`, \`opacity\`,  
\`blur\` and \`z-index\` change. The "lens" is an illusion from per-tile scaling.

\#\#\# Exact mechanics  
\- \*\*Focus point\*\* \= the cursor position while hovering the cluster; when idle / on load /  
  on \`pointerleave\` it rests on \*\*tile index 7\*\* (\`data-i="7"\`, the 4th tile of the 6-tile  
  middle row — just right of centre).  
\- For each tile, distance \`d\` from its centre to the focus point, then  
  \`f \= exp(-d² / (2·SIG²))\`, with \`SIG \= cornerD × 0.50\` (≈112px; \`cornerD\` \= half the  
  cluster's corner-to-corner distance). \`f\` runs 1 at focus → \~0 far away.  
\- Per tile, every frame:  
  \- \`transform: scale(0.66 \+ 0.60·f)\`  → 1.26 at focus, 0.66 at edges  
  \- \`opacity: 0.18 \+ 0.82·f\`  
  \- \`filter: grayscale(1) blur(3px·(1−f))\`  → sharp at focus, 3px blur far (greyscale always on)  
  \- \`box-shadow\` grows with \`f\`; \`z-index \= round(20·f)\` so the focused tile stacks on top  
\- \*\*Falloff feel\*\* (step ≈73px): 1 tile away f≈0.81 (scale \~1.15, op \~0.84, blur \~0.6px);  
  2 tiles f≈0.43 (scale \~0.92, op \~0.53, blur \~1.7px); far corner f≈0.14  
  (scale \~0.74, op \~0.29, blur \~2.6px).  
\- CSS transition on \`transform/filter/opacity\` \~0.26s ease-out smooths idle↔hover and the  
  snap-back. Pointer moves throttled via \`rAF\`. Tile centres measured on load \+ resize  
  (clear transforms first). \`contextmenu\`/\`dragstart\` are blocked on the cluster.

\#\#\# Prompt for Claude Code  
\> Build a magnifier/"fish-eye" hover effect over a centred grid of 14 fixed-size 58×58px  
\> greyscale photo tiles (rows of 4/6/4, 15px gap). It is NOT image distortion — only each  
\> tile's scale/opacity/blur/z-index change. On \`pointermove\` the focus point is the cursor;  
\> when idle or on \`pointerleave\` it rests on tile index 7\. For each tile compute  
\> \`f \= exp(-d²/(2·SIG²))\` where \`d\` is the distance from cursor to the tile's centre and  
\> \`SIG ≈ half the cluster's corner-distance × 0.5\`. Then set per tile:  
\> \`transform: scale(lerp(0.66,1.26,f))\`, \`opacity: lerp(0.18,1.0,f)\`,  
\> \`filter: grayscale(1) blur(3px\*(1-f))\`, a shadow that grows with \`f\`, and  
\> \`z-index \= round(20\*f)\`. Add a \~0.26s CSS transition on transform/filter/opacity. Throttle  
\> pointer updates with \`requestAnimationFrame\`. Measure tile centres on load and resize  
\> (clear transforms first, then \`getBoundingClientRect\`). Block contextmenu/dragstart on the  
\> cluster. Respect \`prefers-reduced-motion\` (no tracking; rest on tile 7).

\#\#\# Bonus: nav scroll-fade (same file)  
The top-right nav CTA is hidden at the top of the hero and fades in only once  
\`window.scrollY \> 8\` (a \`.scrolled\` class is toggled on \`\#gb-nav\`). Don't lose this.

\---

\#\# 2\. The Problem — scroll-ink statement  
\*\*File:\*\* \`The Problem.dc.html\` → \`setupInk()\`  ·  same effect in \`Final CTA & Footer.dc.html\`

\#\#\# What it looks like  
A large serif statement where each word is dim (20% opacity) and "inks in" to full as it  
rises through the viewport mid-line. Certain flagged words also shift colour ink→clay.

\#\#\# Exact mechanics  
\- Each word is a \`\[data-word\]\` span starting near \`opacity:0.2\`.  
\- On scroll (\`rAF\`-throttled), for each word: \`c\` \= its vertical centre;  
  \`p \= (start − c) / (start − end)\` clamped to 0–1, where \`start \= viewportHeight·0.85\`,  
  \`end \= viewportHeight·0.42\`. Then \`opacity \= 0.2 \+ 0.8·p\`.  
\- Words with \`data-clay\` additionally lerp colour from ink \`rgb(24,26,31)\` at \`p=0\` to clay  
  \`rgb(185,107,77)\` at \`p=1\`, channel by channel.  
\- Reduced motion → all words \`opacity:1\`.

\#\#\# Prompt for Claude Code  
\> Make a serif statement where each word inks from dim to full as the user scrolls. Wrap each  
\> word in a span starting at \`opacity:0.2\`. On scroll (throttled with \`requestAnimationFrame\`),  
\> for each word compute its viewport-Y centre \`c\`, then  
\> \`p \= clamp01((0.85\*vh \- c)/(0.85\*vh \- 0.42\*vh))\` and set \`opacity \= 0.2 \+ 0.8\*p\`. For words  
\> flagged \`data-clay\`, also lerp \`color\` from \`rgb(24,26,31)\` (p=0) to \`rgb(185,107,77)\` (p=1).  
\> Run it once on mount and on resize. Reduced motion → all words full opacity.

\---

\#\# 3\. Behind Every Match — fanned cards  
\*\*File:\*\* \`Behind Every Match.dc.html\` → \`reveal()\` / \`wireHover()\` / \`restore()\`

\#\#\# What it looks like  
A stack of cards that \*\*fans out\*\* into a spread arc when the section scrolls into view,  
then responds to hover: the hovered card lifts and scales up, the others dim and recede.

\#\#\# Exact mechanics  
\- Each card has a \`data-fanpose\` attribute holding its resting transform (a  
  \`translate… rotate(…)\`). On scroll-in (IntersectionObserver, threshold 0.2), cards animate  
  from collapsed to their \`data-fanpose\`, \*\*staggered\*\* \`200 \+ i·70\` ms. Hover wiring is  
  attached only after the fan-out finishes.  
\- \*\*Hover\*\* a card: that card →  
  \`transform: translateY(-26px) rotate(\<its fan angle\>) scale(1.07)\`, \`opacity:1\`,  
  \`z-index:10\`, big shadow (\`0 26px 50px rgba(0,0,0,.16)\`). Every other card →  
  \`opacity:0.42\`, back to its \`data-fanpose\`, small shadow.  
\- \*\*Mouse leaves the fan\*\* → all cards restore to \`data-fanpose\`, \`opacity:1\`, normal shadow.  
\- Reduced motion → cards revealed instantly in fan pose, hover still wired.

\#\#\# Prompt for Claude Code  
\> A row of cards that fans into an arc on scroll-in, then reacts to hover. Give each card a  
\> \`data-fanpose\` holding its resting transform (translate \+ rotate). On scroll-in  
\> (IntersectionObserver) animate each from collapsed to its \`data-fanpose\`, staggered  
\> \`200 \+ i\*70\`ms; wire hover only after the last card lands. On \`mouseenter\` of a card: set it  
\> to \`translateY(-26px) rotate(\<its fan angle, parsed from data-fanpose\>) scale(1.07)\`,  
\> opacity 1, z-index 10, shadow \`0 26px 50px rgba(0,0,0,.16)\`; set all other cards to opacity  
\> 0.42, their \`data-fanpose\`, small shadow. On the fan container's \`mouseleave\`, restore all  
\> cards to \`data-fanpose\`/opacity 1/normal shadow. Reduced motion → reveal instantly in fan pose.

\---

\#\# 4\. Roles We Hire For — opposed marquee tickers  
\*\*File:\*\* \`Roles We Hire For.dc.html\` (CSS \`@keyframes\` \+ \`renderVals\` list-doubling)

\#\#\# What it looks like  
Two rows of role names scrolling horizontally in \*\*opposite directions\*\*, continuously,  
pausing on hover.

\#\#\# Exact mechanics  
\- The list array is \*\*concatenated with itself\*\* (\`ROW.concat(ROW)\`) so the track holds two  
  copies. The track animates \`translateX(0) → translateX(-50%)\` linearly and infinitely —  
  because the content is doubled, the \-50% wrap is seamless.  
\- Row 1 uses keyframe \`gb-ticker-left\`, Row 2 uses \`gb-ticker-right\` (reversed), \~100s linear  
  infinite. \`\[data-row\]:hover \[data-track\] { animation-play-state: paused }\`.  
\- Edges fade via a \`mask-image: linear-gradient(90deg, transparent, \#000 7%, \#000 93%, transparent)\`.

\#\#\# Prompt for Claude Code  
\> Two horizontal marquee rows scrolling in opposite directions, infinite, pausing on hover.  
\> Duplicate each row's items (render the list twice in the same track) so a \`translateX(0)  
\> → translateX(-50%)\` linear-infinite animation loops seamlessly. Row 1 scrolls left, row 2  
\> scrolls right (reverse the keyframe), \~100s linear infinite. Pause with  
\> \`animation-play-state: paused\` on row hover. Fade both edges with a horizontal  
\> \`mask-image\` gradient (transparent → opaque at 7% → opaque at 93% → transparent).

\---

\#\# 5\. The Results — expanding accordion panels  
\*\*File:\*\* \`The Results.dc.html\` → \`setActive()\`

\#\#\# What it looks like  
A horizontal row of panels; clicking one \*\*expands it\*\* (grows wide) while the others  
shrink. The expanded panel shows full content; collapsed panels show a compact column.

\#\#\# Exact mechanics  
\- Panels are flex children. \`setActive(i)\` sets the active panel \`flex-grow: 4.4\` and all  
  others \`flex-grow: 1.15\`; the flex transition animates the width change.  
\- Inside each panel: a \`\[data-exp\]\` (expanded content) fades to \`opacity:1\` when active, and a  
  \`\[data-col\]\` (collapsed label) fades to \`opacity:0\` when active — reversed when inactive.  
\- Active panel \`cursor:default\`, inactive \`cursor:pointer\`. Hover on an inactive panel raises  
  its shadow (\`0 16px 36px rgba(0,0,0,.16)\`); \`mouseleave\` restores its \`data-shadow\`.  
\- The row reveals on scroll-in (IntersectionObserver, threshold 0.15) like §0.

\#\#\# Prompt for Claude Code  
\> A row of flex panels where clicking one expands it. On click of panel \`i\`: set that panel  
\> \`flex-grow:4.4\` and all others \`flex-grow:1.15\`, with a CSS transition on flex so widths  
\> animate. Each panel contains expanded content (\`data-exp\`) and a collapsed label  
\> (\`data-col\`); cross-fade them by opacity based on active state. Active panel  
\> \`cursor:default\`, others \`cursor:pointer\`; on hover of an inactive panel raise its shadow  
\> and restore on leave. Reveal the row on scroll-in.

\---

\#\# 6\. About Us — flip cards \+ icon vignette animations  
\*\*File:\*\* \`About Us.dc.html\` → \`componentDidMount\` / \`play()\` (+ CSS \`@keyframes ab-\*\`)

\#\#\# What it looks like  
Value cards that \*\*flip on click\*\* (3D \`rotateY\`) to reveal a back face, and small line-icon  
"vignettes" that \*\*draw/beat/pop in\*\* when scrolled into view, replaying on hover.

\#\#\# Exact mechanics  
\- \*\*Flip:\*\* each \`\[data-flip\]\` toggles \`data-flipped\`; its \`\[data-flip-inner\]\` gets  
  \`transform: rotateY(180deg)\` (or \`0deg\`). \`aria-pressed\` is kept in sync.  
\- \*\*Icon vignette:\*\* a set of CSS keyframes (\`ab-draw\` strokes an SVG path via  
  \`stroke-dashoffset\`, \`ab-beat\`/\`ab-earn\`/\`ab-starpop\` scale-pop). \`play(vig)\` replays them  
  by removing the \`.play\` class, forcing reflow (\`void vig.getBoundingClientRect()\`), then  
  re-adding \`.play\` — this is the standard "restart a CSS animation" trick.  
\- \*\*Triggers:\*\* vignette plays once when its card scrolls into view; replays on card  
  \`mouseenter\` (front only) and whenever a card flips \*\*back\*\* to its front.  
\- Cards also do the standard staggered scroll-reveal (index × 0.08s delay).

\#\#\# Prompt for Claude Code  
\> Cards that flip in 3D on click plus line-icons that animate on view and replay on hover.  
\> Flip: toggle a \`data-flipped\` flag and set the inner wrapper \`transform: rotateY(180deg|0)\`,  
\> keep \`aria-pressed\` in sync, use \`transform-style: preserve-3d\` \+ \`backface-visibility\`.  
\> Icons: define CSS keyframes (stroke-draw via \`stroke-dashoffset\`, plus scale-pop variants),  
\> applied when a \`.play\` class is present. To (re)play, remove \`.play\`, force reflow with  
\> \`void el.getBoundingClientRect()\`, then re-add \`.play\`. Trigger play once on scroll-in  
\> (IntersectionObserver, threshold .4, then unobserve), again on card \`mouseenter\` (front  
\> face only), and when a card flips back to its front. Stagger card reveals by index × 0.08s.

\---

\#\# 7\. Team & FAQ — accordion \+ step reveals  
\*\*File:\*\* \`Team & FAQ.dc.html\` → \`wireIcons()\` / step IntersectionObservers

\#\#\# What it looks like  
A native \`\<details\>\` FAQ accordion whose "+" icon \*\*rotates to ×\*\* when open, plus a row of  
process steps that animate in sequence as they scroll into view.

\#\#\# Exact mechanics  
\- \*\*FAQ:\*\* uses native \`\<details\>\`/\`\<summary\>\`. On each \`toggle\` event, the \`\[data-ic\]\` icon  
  span is set to \`transform: rotate(135deg)\` when \`details.open\`, else \`rotate(0deg)\` —  
  turning a "+" into a "×". (Native details handles open/close; only the icon needs JS.)  
\- \*\*Steps:\*\* each step has its own IntersectionObserver (threshold 0.3); on intersect it runs  
  \`animateStep\` which staggers its inner \`\[data-anim\]\` children by their \`data-delay\` (ms),  
  then unobserves. Reduced motion → \`finalizeStep\` jumps to the end state.

\#\#\# Prompt for Claude Code  
\> A \`\<details\>\`/\`\<summary\>\` FAQ accordion plus scroll-sequenced steps. For the accordion, on  
\> each \`toggle\` event rotate the icon span: \`rotate(135deg)\` when open (+ becomes ×),  
\> \`rotate(0deg)\` when closed; let native \`\<details\>\` handle open/close. For the steps, give  
\> each its own IntersectionObserver (threshold 0.3); on intersect, animate its inner  
\> \`\[data-anim\]\` children to their final state staggered by each child's \`data-delay\` ms, then  
\> unobserve. Reduced motion → jump every step to its final state immediately.

\---

\#\# 8\. How It Works — step reveal with progress fill bars  
\*\*File:\*\* source draft \`uploads/howitworks-draft-891e9f5c.html\`  
(deployed bundled copy: \`How It Works.html\`)

\#\#\# What it looks like  
Process steps that fade in on scroll, each with a progress/connector bar that \*\*grows from 0  
to its target width\*\* when the step appears.

\#\#\# Exact mechanics  
\- Each \`\[data-step\]\` is observed (IntersectionObserver, threshold 0.3). On intersect: add an  
  \`.in\` class (fades the step in), then for each \`.fill\` bar set  
  \`style.width \= getPropertyValue('--w')\` after a 60ms \`setTimeout\` so the CSS width  
  transition animates from 0 to the target stored in the \`--w\` custom property; then unobserve.

\#\#\# Prompt for Claude Code  
\> Process steps that reveal on scroll, each with a bar that grows to its target width. Store  
\> each bar's target in a CSS var \`--w\` and start it at \`width:0\` with a CSS width transition.  
\> Observe each step with an IntersectionObserver (threshold 0.3); on intersect add an \`.in\`  
\> class to fade the step in and, after a \~60ms timeout, set each bar's \`width\` to  
\> \`var(--w)\` so it animates from 0; then unobserve. Reduced motion → set widths immediately.

\---

\#\# 9\. Lower-risk pages (still JS, but simpler)

These only use the standard scroll-reveal from §0 — Claude Code is less likely to drop them,  
but tell it explicitly so the section doesn't render pre-revealed (invisible) or fully static.

\- \*\*How We Compare\*\* (\`How We Compare.dc.html\`): the comparison table starts  
  \`opacity:0; translateY(16px)\` and reveals once on scroll-in (IntersectionObserver). Single  
  element, no stagger.  
\- \*\*Simple Pricing\*\* (\`Simple Pricing.dc.html\`): bento cards / rows do the staggered  
  scroll-reveal, with a \`visibilitychange\` guard so the fade only plays while the tab is  
  actually visible (and a \`setTimeout\` fallback reveals regardless).  
\- \*\*Final CTA & Footer\*\* (\`Final CTA & Footer.dc.html\`): contains the \*\*scroll-ink statement  
  from §2\*\* (identical mechanics, including clay-word colour lerp) plus a standard statement  
  reveal. Treat its ink exactly like The Problem.

\#\#\# Prompt for Claude Code (generic reveal)  
\> Elements start at \`opacity:0; transform:translateY(16px)\`. Use one IntersectionObserver  
\> (threshold \~0.2) to set them to \`opacity:1; transform:none\`, staggered by index × 80ms,  
\> with a \`.6s cubic-bezier(.22,1,.36,1)\` transition. Add a \`setTimeout(\~600ms)\` fallback that  
\> reveals everything even if the observer never fires, and only run the fade while  
\> \`document.visibilityState \=== 'visible'\`. Reduced motion → reveal instantly, no transition.

\---

\#\# Quick reference — which file holds which effect

\- \`Hero.dc.html\` — magnify candidate strip (\`focus\`/\`measure\`) \+ nav scroll-fade  
\- \`The Problem.dc.html\` — scroll-ink words (\`setupInk\`)  
\- \`Final CTA & Footer.dc.html\` — scroll-ink words (with clay lerp) \+ statement reveal  
\- \`Behind Every Match.dc.html\` — fanned cards (\`wireHover\`/\`restore\`)  
\- \`Roles We Hire For.dc.html\` — opposed marquee tickers (CSS keyframes \+ doubled list)  
\- \`The Results.dc.html\` — expanding accordion panels (\`setActive\`)  
\- \`About Us.dc.html\` — flip cards \+ icon vignettes (\`play\`)  
\- \`Team & FAQ.dc.html\` — details accordion icon \+ sequenced steps  
\- \`How It Works.html\` — step reveal \+ growing fill bars (source: \`uploads/howitworks-draft-\*\`)  
\- \`How We Compare.dc.html\` / \`Simple Pricing.dc.html\` — standard scroll-reveal only

