import * as stylex from "@stylexjs/stylex";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import type { ConvexQueryClient } from "@convex-dev/react-query";
import { Toaster } from "@fenchem-lp/ui/components/sonner";
import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouteContext,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";

import { authClient } from "@/lib/auth-client";
import { getToken } from "@/lib/auth-server";
import {
  deploymentMode,
  AUTH_TOKEN_BUDGET_MS,
  AUTH_ROUNDTRIP_BUDGET_MS,
} from "@/lib/deployment-mode";
import { PERF_DEBUG_SCRIPT } from "@/lib/perf-debug";

import Header from "../components/header";

import appCss from "../index.css?url";

// Landing page preview: no real Convex deployment exists; the .env URLs are placeholders.
// When detected, skip all Convex/auth wiring so the landing page never waits on
// a dead backend (proxy makes those fetches hang ~30s). Real URLs keep the full path.

const getAuth = createServerFn({ method: "GET" }).handler(async () => {
  // Landing page preview: no Convex deployment is configured yet; never let auth block rendering.
  try {
    return await Promise.race([
      getToken(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), AUTH_TOKEN_BUDGET_MS)),
    ]);
  } catch {
    return null;
  }
});

export interface RouterAppContext {
  queryClient: QueryClient;
  convexQueryClient: ConvexQueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  beforeLoad: async (ctx) => {
    // Landing page preview: placeholder Convex deployment skips the auth round-trip entirely.
    if (deploymentMode(ctx.context.convexQueryClient.convexClient.url).skipAuth) {
      return { isAuthenticated: false, token: null };
    }
    // Cap the auth round-trip so hydration can never stall on it.
    const token = await Promise.race([
      getAuth(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), AUTH_ROUNDTRIP_BUDGET_MS)),
    ]).catch(() => null);
    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
    }
    return {
      isAuthenticated: !!token,
      token,
    };
  },

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
  const context = useRouteContext({ from: Route.id });
  // The public landing page on "/" brings its own navigation; hide the app chrome there.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const appShell = (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        {/* eslint-disable-next-line react/no-danger -- static inline script, see perf-debug.ts */}
        <script dangerouslySetInnerHTML={{ __html: PERF_DEBUG_SCRIPT }} />
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
        {pathname === "/" ? null : <TanStackRouterDevtools position="bottom-left" />}
        <Scripts />
      </body>
    </html>
  );
  // With a placeholder Convex URL, skip ConvexBetterAuthProvider so it
  // never opens a websocket / session fetch against a dead deployment (30s proxy hangs).
  if (deploymentMode(context.convexQueryClient.convexClient.url).skipAuth) {
    return appShell;
  }
  return (
    <ConvexBetterAuthProvider
      client={context.convexQueryClient.convexClient}
      authClient={authClient}
      initialToken={context.token}
    >
      {appShell}
    </ConvexBetterAuthProvider>
  );
}
