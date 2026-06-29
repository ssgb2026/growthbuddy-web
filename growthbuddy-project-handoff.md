# Growthbuddy — project handoff / status log

> Phase 0 done: Astro skeleton + tokens + BaseLayout + Nav/Footer stubs + sitemap (excludes /profiles) +
> robots/_headers/_redirects + CLAUDE.md. Live on growthbuddy-web.pages.dev, auto-deploys from GitHub `main`.
> Production domain confirmed: www.mygrowthbuddy.com (DNS NOT pointed yet). Next: Phase 1 (homepage).

> Phase 1 (homepage) DONE & QA-passed. 12 folds build in order inside one `<main>`, each a named
> `<section>`: Hero → Trusted-by → The Problem → Roles → Compare → How It Works → Results → Behind Every
> Match → Pricing → Team → FAQ → Final CTA, with centre-out dividers between paper folds and one `--gb-section-y`
> rhythm (16/56 header gaps, .05 grain). Interaction fidelity verified live: hero magnifier, nav scroll-fade,
> scroll-ink (Folds 2 & 10), HIW fill-bars, Roles marquees, Results accordion, BEM fan/hover, FAQ +/× & step
> reveals — all animate per spec, every island reduced-motion-safe. 7 client islands (Nav, hero magnifier,
> scroll-ink, shared reveal, Results accordion, BEM fan, divider); Roles/HIW-bars/FAQ-icon are CSS-only.
> A11y: one `<h1>`, ordered headings, skip link, focus-visible, native `<details>`, axe clean except brand
> clay/meta + dim scroll-ink resting contrast (by design). `npm run build` clean. Next: Sanity CMS + /hire.
