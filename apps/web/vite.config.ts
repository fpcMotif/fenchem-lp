import { fileURLToPath } from "node:url";

import { cloudflare } from "@cloudflare/vite-plugin";
import solid from "@solidjs/vite-plugin";
import stylexRs from "@stylexswc/unplugin/vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
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
  optimizeDeps: {
    exclude: ["@ui-sdk/core"],
  },
  build: {
    target: "es2022",
  },
  plugins: [
    // Babel StyleX compiler: it runs beside Solid's Babel JSX transform. Dev serves
    // the collected rules at /virtual:stylex.css (linked in __root.tsx); a build
    // appends them to the emitted CSS asset.
    [
      stylexRs({
        useCssPlaceholder: process.env.NODE_ENV === "production",
        splitCssByModule: process.env.NODE_ENV === "production",
        useCSSLayers: true,
        rsOptions: {
          dev: process.env.NODE_ENV !== "production",
          runtimeInjection: false,
          enableInlinedConditionalMerge: true,
          treeshakeCompensation: true,
          enableDevClassNames: false,
          unstable_moduleResolution: {
            type: "commonJS",
            rootDir: fileURLToPath(new URL("../..", import.meta.url)),
          },
        },
      }),
    ]
      .flat()
      .map((plugin) => ({ ...plugin, enforce: "pre" as const })),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    // Wrapped conditionals become memo getters; SSR reads of those allocate hydration ids the
    // client allocates elsewhere, so keys after a ternary prop miss on hydration.
    solid({ ssr: true }),
  ],
});
