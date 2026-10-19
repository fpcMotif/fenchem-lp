import * as stylex from "@stylexjs/stylex";
import { Toaster } from "@fenchem-lp/ui/components/sonner";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/solid-router";
import { Loading, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

import { HydrationMark } from "@/components/hydration-mark";
import { PERF_DEBUG_SCRIPT } from "@/lib/perf-debug";

import Header from "../components/header";

import appCss from "../index.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charset: "utf-8",
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
      // Dev-only: @stylexjs/unplugin serves the collected atomic rules at this URL.
      // A production build appends them to the emitted CSS asset instead.
      ...(import.meta.env.DEV
        ? [
            {
              rel: "stylesheet",
              href: "/virtual:stylex.css",
            },
          ]
        : []),
    ],
  }),

  shellComponent: RootDocument,
  component: RootLayout,
});

const rootStyles = stylex.create({
  shell: {
    display: "grid",
    height: "100svh",
    gridTemplateRows: "auto 1fr",
  },
});

function RootDocument(props: { children: JSX.Element }) {
  return (
    <html lang="en" class="dark">
      <head>
        <style>{"@layer base;"}</style>
        <HeadContent />
        <script>{PERF_DEBUG_SCRIPT}</script>
      </head>
      <body>
        {props.children}
        <Toaster richColors />
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  // The public landing page on "/" brings its own navigation; hide the app chrome there.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const page = () => (
    <Loading fallback={null}>
      <Outlet />
      <HydrationMark />
    </Loading>
  );
  return (
    <Show when={pathname() !== "/"} fallback={page()}>
      <div {...stylex.attrs(rootStyles.shell)}>
        <Header />
        {page()}
      </div>
    </Show>
  );
}
