import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import prefetch from "@astrojs/prefetch";
import partytown from "@astrojs/partytown";

export default defineConfig({
  site: 'https://wrapstudio.kz',
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'swiper': ['swiper'],
            'gsap': ['gsap'],
            'framer': ['framer-motion']
          }
        }
      },
      minify: true,
      cssMinify: true
    },
    ssr: {
      noExternal: ['@gsap/shockingly']
    },
    optimizeDeps: {
      include: ['@gsap/shockingly', 'swiper']
    }
  },
  output: "static",
  build: {
    inlineStylesheets: 'auto'
  },
  assets: true,
  integrations: [
    react({
      include: ['**/react/*', '**/react/**/*']
    }),
    tailwind({
      applyBaseStyles: false
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    robotsTxt(),
    prefetch(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    })
  ],
  compressHTML: true
});