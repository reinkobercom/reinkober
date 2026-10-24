// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { noindexPaths } from './src/data/seo.mjs';

// Alle Seiten werden statisch gebaut. Nur die Formular-Endpunkte unter
// src/pages/api/ laufen on demand (dort steht `export const prerender = false`).
export default defineConfig({
  site: 'https://reinkober.com',
  // URLs exakt wie bisher bei Onepage: ohne Slash am Ende (/kontakt).
  // (Der Vercel-Adapter legt Seiten als /kontakt/index.html ab und leitet /kontakt/ → /kontakt um.)
  trailingSlash: 'never',
  // Alte bzw. fehlerhafte Adressen dauerhaft weiterleiten
  redirects: {
    '/danke-bewerbung': { status: 301, destination: '/karriere-danke' },
    '/startseite': { status: 301, destination: '/' },
    '/ueber-uns-kontakt': { status: 301, destination: '/ueber-uns' },
  },
  adapter: vercel({ imageService: false }),
  integrations: [
    sitemap({
      // Seiten mit noindex gehören nicht in die Sitemap
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '') || '/';
        return !noindexPaths.includes(path);
      },
    }),
  ],
  image: {
    // Bilder werden beim Build in WebP und mehreren Breiten erzeugt
    layout: 'constrained',
  },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
});
