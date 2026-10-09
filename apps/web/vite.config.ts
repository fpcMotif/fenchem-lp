import { fileURLToPath } from "node:url";

import { cloudflare } from "@cloudflare/vite-plugin";
import stylexRs from "@stylexswc/unplugin/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
    host: true,
    allowedHosts: [".localhost", "localhost", "127.0.0.1"],
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    stylexRs({
      // Build: splice the atomic CSS into src/index.css at the `@stylex;` marker
      // (deterministic single stylesheet). Dev: rolldown-vite serves raw <link>
      // CSS straight from disk, bypassing plugin load hooks, so placeholder
      // inlining never reaches the browser — instead __root.tsx links
      // /stylex.css, which this plugin's dev middleware fills with the
      // collected rules (same pattern as the old /virtual:stylex.css).
      useCssPlaceholder: process.env.NODE_ENV === "production",
      useCSSLayers: true,
      rsOptions: {
        dev: process.env.NODE_ENV !== "production",
        runtimeInjection: false,
        enableInlinedConditionalMerge: true,
        treeshakeCompensation: true,
        enableDebugClassNames: false,
        enableDevClassNames: false,
        unstable_moduleResolution: {
          type: "commonJS",
          rootDir: fileURLToPath(new URL("../..", import.meta.url)),
        },
      },
    }),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    viteReact(),
  ],
});
