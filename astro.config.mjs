import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // production domain — set now so canonical/OG/sitemap are correct
  site: 'https://www.mygrowthbuddy.com',

  trailingSlash: 'never',

  integrations: [
    sitemap({
      // Candidate profiles must never appear in the sitemap.
      filter: (page) => !page.includes('/profiles/'),
    }),
  ],

  adapter: cloudflare(),
});