import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react";
import { useEffect } from "react";
import * as stylex from "@stylexjs/stylex";
import { Toaster } from "@fenchem-lp/ui/components/sonner";
import { initProfiler } from "@fenchem-lp/ui/profiler";
import Header from "@/components/header";
import { PERF_DEBUG_SCRIPT } from "@/lib/perf-debug";
import appCss from "@/index.css?url";

export const meta: MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { title: "Fenchem — Rooted in Nature, Refined by Science" },
];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appCss },
  ...(import.meta.env.DEV ? [{ rel: "stylesheet", href: "/stylex.css" }] : []),
];

const rootStyles = stylex.create({
  shell: {
    display: "grid",
    height: "100svh",
    gridTemplateRows: "auto 1fr",
  },
});

export default function Root() {
  const location = useLocation();

  useEffect(() => {
    void initProfiler();
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <Meta />
        <Links />
        {/* eslint-disable-next-line react/no-danger -- static inline script, see perf-debug.ts */}
        <script dangerouslySetInnerHTML={{ __html: PERF_DEBUG_SCRIPT }} />
      </head>
      <body>
        {location.pathname === "/" ? (
          <Outlet />
        ) : (
          <div {...stylex.props(rootStyles.shell)}>
            <Header />
            <Outlet />
          </div>
        )}
        <Toaster richColors />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
