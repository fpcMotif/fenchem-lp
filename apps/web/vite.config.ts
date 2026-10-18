import { fileURLToPath } from "node:url";

import { cloudflare } from "@cloudflare/vite-plugin";
import solid from "@solidjs/vite-plugin";
import stylex from "@stylexjs/unplugin";
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
  build: {
    target: "es2022",
  },
  plugins: [
    // Babel StyleX compiler: it runs beside Solid's Babel JSX transform. Dev serves
    // the collected rules at /virtual:stylex.css (linked in __root.tsx); a build
    // appends them to the emitted CSS asset.
    stylex.vite({
      useCSSLayers: true,
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir: fileURLToPath(new URL("../..", import.meta.url)),
      },
    }),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    // Wrapped conditionals become memo getters; SSR reads of those allocate hydration ids the
    // client allocates elsewhere, so keys after a ternary prop miss on hydration.
    solid({ ssr: true, solid: { wrapConditionals: false } }),
  ],
});
