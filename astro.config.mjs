import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  // Enable React to support React JSX components.
  integrations: [react(), tailwind(), image(), mdx()],
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "monokai",
    },
  },
  site: "https://rainforss.me",
});
