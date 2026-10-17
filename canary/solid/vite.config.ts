import { fileURLToPath } from "node:url";

import stylex from "@stylexjs/unplugin";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

const src = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig(({ isSsrBuild }) => ({
  // Same images/fonts the React app serves.
  publicDir: isSsrBuild ? false : fileURLToPath(new URL("../../apps/web/public", import.meta.url)),
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      unstable_moduleResolution: { type: "commonJS", rootDir: src("") },
    }),
    solid({ ssr: true }),
  ],
  build: {
    target: "es2022",
    outDir: isSsrBuild ? "dist/server" : "dist/client",
    emptyOutDir: true,
    sourcemap: process.env.SOURCEMAP === "1",
    rollupOptions: isSsrBuild ? { output: { entryFileNames: "worker.js" } } : undefined,
  },
  ssr: isSsrBuild ? { noExternal: true, target: "webworker" } : undefined,
  resolve: isSsrBuild ? { conditions: ["workerd", "worker", "solid", "module", "import"] } : undefined,
}));
