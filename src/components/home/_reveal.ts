/*
  Shared once-on-scroll reveal (design-system C.3 / INTERACTIVE-BEHAVIOUR-SPEC §0, §9).

  Folds mark elements with `data-reveal` (and optionally `data-delay="80"` ms for
  a stagger). Each element starts opacity:0 / translateY(16px) (see global.css)
  and settles to opacity:1 over --gb-dur-reveal with --gb-ease when it first
  scrolls into view. Fires once per element.

  - IntersectionObserver, threshold 0.25; element is unobserved after revealing.
  - visibilitychange guard: the fade only plays while the tab is actually
    visible. Intersections that fire while hidden are deferred and flushed when
    the tab becomes visible again (avoids playing the animation off-screen).
  - ~600ms setTimeout fallback reveals everything regardless — headless renders,
    very tall/short pages, or a tab that never returns to visible still settle.
  - prefers-reduced-motion (or no IntersectionObserver): reveal everything
    immediately, with no stagger.
*/
export function initReveal(): void {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>('[data-reveal]')
  );
  if (els.length === 0) return;

  const show = (el: HTMLElement): void => {
    const delay = parseInt(el.dataset.delay ?? '0', 10);
    if (delay > 0) el.style.transitionDelay = `${delay}ms`;
    el.classList.add('is-revealed');
  };

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  // Only play the fade while the tab is visible; defer intersections that
  // happen while hidden and flush them on the next visibilitychange.
  const pending = new Set<HTMLElement>();
  const isVisible = () => document.visibilityState === 'visible';

  const reveal = (el: HTMLElement): void => {
    if (isVisible()) {
      show(el);
    } else {
      pending.add(el);
    }
  };

  document.addEventListener('visibilitychange', () => {
    if (!isVisible()) return;
    pending.forEach(show);
    pending.clear();
  });

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement);
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.25 }
  );

  els.forEach((el) => io.observe(el));

  // Safety net: never leave content invisible, even if the observer never fires
  // or the tab stays hidden. Reveals regardless of visibility.
  window.setTimeout(() => {
    els.forEach((el) => {
      if (el.classList.contains('is-revealed')) return;
      pending.delete(el);
      show(el);
      io.unobserve(el);
    });
  }, 600);
}
