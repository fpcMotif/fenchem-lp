import { fileURLToPath } from "node:url";

import { cloudflare } from "@cloudflare/vite-plugin";
import solid from "@solidjs/vite-plugin";
import stylex from "@stylexjs/unplugin";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import { defineConfig } from "vite";

const src = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  // Same images/fonts the React app serves.
  publicDir: fileURLToPath(new URL("../../apps/web/public", import.meta.url)),
  server: {
    allowedHosts: [".localhost", "localhost", "127.0.0.1"],
  },
  build: {
    target: "es2022",
    sourcemap: process.env.SOURCEMAP === "1",
  },
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      unstable_moduleResolution: { type: "commonJS", rootDir: src("") },
    }),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    solid({ ssr: true }),
  ],
});
