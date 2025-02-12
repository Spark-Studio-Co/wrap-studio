import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    build: {
      cssCodeSplit: true
    }
  },
  output: "static",
  integrations: [react(), tailwind()],
});