import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.mygrowthbuddy.com', // production domain — set now so canonical/OG/sitemap are correct
  trailingSlash: 'never',
  // The dev toolbar's a11y AUDIT re-scans the accessibility tree on every DOM
  // mutation and repositions overlays on scroll. Our per-frame islands (magnifier,
  // scroll-ink) mutate the DOM constantly, so the audit thrashed the main thread and
  // made dev feel laggy ("loading on every cursor move"). It does NOT exist in the
  // production build; disabled so dev reflects real performance.
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      // Candidate profiles must never appear in the sitemap.
      filter: (page) => !page.includes('/profiles/'),
    }),
  ],
});
