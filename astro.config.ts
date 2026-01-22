import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://minteea.github.io",
  integrations: [tailwind(), mdx(), solid({ include: ["**/*.tsx"] })],
  markdown: {
    remarkPlugins: [],
  },
  server: { port: 34321 },
});
