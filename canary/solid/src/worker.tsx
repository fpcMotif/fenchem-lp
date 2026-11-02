import { generateHydrationScript, renderToString } from "solid-js/web";

// Built client shell (asset links injected by Vite). The server build runs after
// the client build, so this file exists.
import template from "../dist/client/index.html?raw";
import { App } from "./App";

type Env = { ASSETS: { fetch(request: Request): Promise<Response> } };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/") return env.ASSETS.fetch(request);
    const search = Object.fromEntries(url.searchParams);
    const body = renderToString(() => <App search={search} />);
    const html = template
      .replace("<!--ssr-head-->", generateHydrationScript())
      .replace("<!--ssr-body-->", body);
    return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  },
};
