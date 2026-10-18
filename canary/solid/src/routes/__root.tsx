/// <reference types="vite/client" />
import type { JSX } from "@solidjs/web";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/solid-router";

import appCss from "../app/styles/index.css?url";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:wght@400;500;600&display=swap";
const DEV_STYLEX_CSS = import.meta.env.DEV
  ? [{ rel: "stylesheet", href: "/virtual:stylex.css" }]
  : [];
const CASCADE_LAYER_ORDER = "@layer base;";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fenchem — Rooted in Nature, Refined by Science" },
    ],
    links: [
      { rel: "stylesheet", href: FONTS },
      { rel: "stylesheet", href: appCss },
      ...DEV_STYLEX_CSS,
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument(props: { children: JSX.Element }) {
  return (
    <html lang="en" class="dark">
      <head>
        <style>{CASCADE_LAYER_ORDER}</style>
        <HeadContent />
      </head>
      <body>
        {props.children}
        <Scripts />
      </body>
    </html>
  );
}
