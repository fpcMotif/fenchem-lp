// Writes src/routeTree.gen.ts without starting Vite, so a fresh checkout can typecheck.
// The footer mirrors what @tanstack/start-plugin-core appends for this app (router.tsx,
// no start.ts). If the dev server rewrites the file differently, update the footer here.
import { fileURLToPath } from "node:url";

import { Generator, getConfig } from "@tanstack/router-generator";

const root = fileURLToPath(new URL("..", import.meta.url));
const START_REGISTER_FOOTER = [
  [
    "import type { getRouter } from './router.tsx'",
    "import type { createStart } from '@tanstack/solid-start'",
    "declare module '@tanstack/solid-start' {",
    "  interface Register {",
    "    ssr: true",
    "    router: Awaited<ReturnType<typeof getRouter>>",
    "  }",
    "}",
  ].join("\n"),
];

const config = getConfig(
  {
    target: "solid",
    routesDirectory: "./src/routes",
    generatedRouteTree: "./src/routeTree.gen.ts",
    routeTreeFileFooter: START_REGISTER_FOOTER,
  },
  root,
);

await new Generator({ config, root }).run();
