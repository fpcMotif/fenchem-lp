import { fileURLToPath } from "node:url";

import { stylex } from "@octanejs/stylex/vite";
import { octane } from "@octanejs/vite-plugin";
import { defineConfig, type Plugin } from "vite";

const src = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

// @octanejs/motion has no SSR surface; the server build gets a static stand-in.
function motionOnServer(): Plugin {
  return {
    name: "canary:motion-on-server",
    enforce: "pre",
    resolveId(id) {
      if (/(^@|\/src)\/compat\/motion(\.ts)?$/.test(id) && this.environment.name !== "client") {
        return src("compat/motion-server.tsx");
      }
    },
  };
}

export default defineConfig({
  // Same images/fonts the React app serves.
  publicDir: fileURLToPath(new URL("../../apps/web/public", import.meta.url)),
  resolve: {
    alias: [
      { find: /^@\/compat\//, replacement: src("compat/") },
      { find: /^@\//, replacement: src("app/") },
    ],
  },
  plugins: [
    motionOnServer(),
    octane(),
    stylex({
      useCSSLayers: true,
      unstable_moduleResolution: { type: "commonJS", rootDir: src("") },
    }),
  ],
  build: { target: "es2022", sourcemap: process.env.SOURCEMAP === "1" },
});
