import * as stylex from "@stylexjs/stylex";
import type { ConvexQueryClient } from "@convex-dev/react-query";
import { Toaster } from "@fenchem-lp/ui/components/sonner";
import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { PERF_DEBUG_SCRIPT } from "@/lib/perf-debug";

import Header from "../components/header";

import appCss from "../index.css?url";

// Dev-only: the static import shipped the devtools event glue in the
// production bundle; a DEV-gated lazy import lets the whole package drop out.
const TanStackRouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-router-devtools").then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )
  : null;

const Mesurer = import.meta.env.DEV
  ? lazy(() => import("mesurer").then((m) => ({ default: m.Mesurer })))
  : null;

export interface RouterAppContext {
  queryClient: QueryClient;
  convexQueryClient: ConvexQueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Fenchem — Rooted in Nature, Refined by Science",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Dev-only: @stylexswc/unplugin's dev middleware serves the collected
      // atomic rules at this URL. In production the rules are spliced into
      // index.css at the `@stylex;` marker instead (useCssPlaceholder).
      ...(import.meta.env.DEV
        ? [
            {
              rel: "stylesheet",
              href: "/stylex.css",
            },
          ]
        : []),
    ],
  }),

  component: RootDocument,
});

const rootStyles = stylex.create({
  shell: {
    display: "grid",
    height: "100svh",
    gridTemplateRows: "auto 1fr",
  },
});

function RootDocument() {
  // The public landing page on "/" brings its own navigation; hide the app chrome there.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const appShell = (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <script>{PERF_DEBUG_SCRIPT}</script>
      </head>
      <body>
        {pathname === "/" ? (
          <Outlet />
        ) : (
          <div {...stylex.props(rootStyles.shell)}>
            <Header />
            <Outlet />
          </div>
        )}
        <Toaster richColors />
        {pathname === "/" || TanStackRouterDevtools === null ? null : (
          <Suspense fallback={null}>
            <TanStackRouterDevtools position="bottom-left" />
          </Suspense>
        )}
        {Mesurer === null ? null : (
          <Suspense fallback={null}>
            <Mesurer />
          </Suspense>
        )}
        <Scripts />
      </body>
    </html>
  );
  return appShell;
}
