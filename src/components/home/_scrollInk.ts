/*
  Shared scroll-ink island (INTERACTIVE-BEHAVIOUR-SPEC §2; CLAUDE.md perf budget).
  Used by The Problem (Fold 2) and the Final CTA testimonial (Fold 10) — identical
  mechanics. Scans every [data-ink] [data-word] on the page; one passive scroll
  listener + one rAF loop drives them all.

  Each word's document-relative centre is measured ONCE (mount / resize / fonts /
  load / content-visibility render) and cached — the rAF loop reads no layout,
  only window.scrollY:
    c = cachedCentre − scrollY; p = clamp01((0.85·vh − c)/(0.85·vh − 0.42·vh));
    opacity = 0.2 + 0.8·p. [data-clay] words also lerp ink → clay channel-by-channel
  (INK/CLAY = --gb-ink / --gb-clay). reduced-motion: jump to final state.
*/
export function initScrollInk(): void {
  const words = Array.from(
    document.querySelectorAll<HTMLElement>('[data-ink] [data-word]')
  );
  if (words.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    words.forEach((w) => {
      w.style.opacity = '1';
      if (w.hasAttribute('data-clay')) w.style.color = 'rgb(185,107,77)';
    });
    return;
  }

  const INK = [24, 26, 31], CLAY = [185, 107, 77]; // = --gb-ink / --gb-clay
  const isClay = words.map((w) => w.hasAttribute('data-clay'));
  let centres: number[] = [];

  // The ONLY layout reads — on load / resize / fonts, never in the scroll loop.
  const measure = () => {
    const sy = window.scrollY;
    centres = words.map((w) => {
      const r = w.getBoundingClientRect();
      return r.top + sy + r.height / 2;
    });
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const start = vh * 0.85, span = start - vh * 0.42;
    const sy = window.scrollY;
    for (let i = 0; i < words.length; i++) {
      const c = centres[i] - sy; // viewport centre from cache — no DOM read
      let p = (start - c) / span;
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      const w = words[i];
      w.style.opacity = String(0.2 + 0.8 * p);
      if (isClay[i]) {
        const mix = (a: number, b: number) => Math.round(a + (b - a) * p);
        w.style.color = `rgb(${mix(INK[0], CLAY[0])},${mix(INK[1], CLAY[1])},${mix(INK[2], CLAY[2])})`;
      }
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  const remeasure = () => { measure(); onScroll(); };

  measure();
  update();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', remeasure, { passive: true });
  addEventListener('load', remeasure, { once: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
  document.querySelectorAll('[data-ink]').forEach((root) => {
    const section = root.closest('section');
    if (section) section.addEventListener('contentvisibilityautostatechange', (e: Event) => {
      if (!(e as { skipped?: boolean }).skipped) remeasure();
    });
  });
}
