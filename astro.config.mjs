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
