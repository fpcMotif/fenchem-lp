import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

import stylex from "@stylexjs/unplugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import alchemy from "alchemy/cloudflare/tanstack-start";
import { defineConfig } from "vite-plus";
const alchemyConfigPath = fileURLToPath(
  new URL("./.alchemy/local/wrangler.jsonc", import.meta.url),
);
const shouldUseAlchemy = existsSync(alchemyConfigPath);
const cloudflareWorkersShimPath = fileURLToPath(
  new URL("../../packages/env/src/cloudflare-local.ts", import.meta.url),
);
const cloudflareWorkersAlias: Record<string, string> = shouldUseAlchemy
  ? {}
  : {
      "cloudflare:workers": cloudflareWorkersShimPath,
    };

export default defineConfig({
  server: {
    port: 3001,
  },
  resolve: {
    tsconfigPaths: true,
    alias: cloudflareWorkersAlias,
  },
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir: fileURLToPath(new URL("../..", import.meta.url)),
      },
    }),
    tanstackStart(),
    viteReact(),
    ...(shouldUseAlchemy ? [alchemy({ configPath: alchemyConfigPath })] : []),
  ],
  ssr: {
    noExternal: ["@convex-dev/better-auth"],
  },
  optimizeDeps: {
    // PROTOTYPE — keep better-auth out of the dep optimizer. Bun's isolated linker
    // doesn't expose transitive deps in apps/web/node_modules, so the optimizer
    // resolves bare "@better-auth/core/*" entries from the project root and walks up
    // to a stale @better-auth/core@1.6.11 in C:/Users/<user>/node_modules. The raw
    // better-auth@1.6.16 client modules then fail ESM linking against that chunk
    // (missing exports like isSafeUrlScheme), which blocks hydration forever.
    // Excluding them makes Vite resolve per-importer (realpath) to the correct copy.
    exclude: ["better-auth", "@better-auth/core"],
  },
});
