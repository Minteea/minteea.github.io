import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import preact from "@astrojs/preact";
import { remarkModifiedTime } from "./plugins/remark-modified-time";

// https://astro.build/config
export default defineConfig({
  site: "https://minteea.github.io",
  integrations: [tailwind(), mdx(), preact()],
  markdown: {
    remarkPlugins: [],
  },
  server: { port: 34321 },
});
