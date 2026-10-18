import { fileURLToPath } from "node:url";

import solid from "@solidjs/vite-plugin";
import stylex from "@stylexjs/unplugin";
import { defineConfig } from "vitest/config";

const appSrc = fileURLToPath(new URL("./src", import.meta.url));
const uiSrc = fileURLToPath(new URL("../../packages/ui/src", import.meta.url));
const rootDir = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir,
      },
    }),
    solid(),
  ],
  resolve: {
    alias: {
      "@": appSrc,
      "@fenchem-lp/ui": uiSrc,
    },
    conditions: ["browser", "development"],
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    server: { deps: { inline: [/solid-js/, /@solidjs\/web/] } },
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      include: ["src/components/landing/**/*.{ts,tsx}", "src/routes/index.tsx"],
      exclude: ["src/**/*.test.{ts,tsx}"],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
        perFile: true,
      },
    },
  },
});
