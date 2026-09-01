# Remix v3 Migration Feasibility Gates & Architecture Decisions (G1–G4)

**Status:** accepted

This Decision Record documents the outcomes, findings, and fallback strategies for the four feasibility gates established in Issue #6 for migrating the web application from TanStack Start to Remix v3 (`3.0.0-beta.5`).

---

## Context & Migration Overview

The application shell previously depended on TanStack Start for routing, SSR, search parameter validation, Cloudflare Workers deployment (`alchemy`), and data/auth bindings. Remix v3 replaces the renderer (forked Preact with imperative updates), the asset pipeline (runtime-first), and the request lifecycle (Web Fetch standard).

To ensure that the migration proceeds on evidence rather than optimism, four feasibility gates were evaluated:

1. **G1 — StyleX without Vite**
2. **G2 — React libraries on the forked Preact**
3. **G3 — Remix v3 on Cloudflare Workers**
4. **G4 — Convex + Better-Auth binding**

---

## Feasibility Gate Outcomes

### Gate 1 (G1): StyleX without Vite Plugin

- **Question:** Can StyleX emit atomic CSS without relying on the Vite plugin host in production?
- **Finding:** StyleX supports ahead-of-time (AOT) extraction through `@stylexswc/unplugin` and `@stylexjs/cli`. The compiler transforms `@stylex.create()` declarations and generates a consolidated atomic CSS bundle (`dist/client/assets/index.css` or `stylex.css`). In Remix v3's runtime asset pipeline, this stylesheet is referenced via root `<link rel="stylesheet">` tags.
- **Outcome:** **PASSED.** AOT compilation generates standard atomic CSS assets.
- **Fallback Plan:** If runtime dynamic authoring encounters obstacles, ship the compiled atomic CSS as a static asset, freezing StyleX authoring rules while retaining exact design tokens and visual presentation.

### Gate 2 (G2): React Libraries on the Forked Preact

- **Question:** Do existing React-dependent UI components (`@base-ui/react`, `lucide-react`, `sonner`, `motion`, `three.js`) render reliably on the Preact fork?
- **Finding:**
  - `lucide-react`, `sonner`, and prototype variants run cleanly using `preact/compat` standard component lifecycle.
  - The component profiler is shielded behind a pluggable adapter contract (`react-scan` when React is active; `fallback` render-counter for the Preact fork and production).
  - WebGL and heavy variants (`variant-waterfall`, `variant-j`) isolate their canvas and animation lifecycles.
- **Outcome:** **PASSED.** Supported via `preact/compat` and modular profiler fallback.
- **Fallback Plan:** Swap any failing Base UI primitive with native DOM/Remix UI equivalents against the `style-audit` verification route.

### Gate 3 (G3): Remix v3 on Cloudflare Workers

- **Question:** Can the Remix v3 server handler run under the Cloudflare Workers runtime and deploy through the infra package?
- **Finding:** Remix v3 routes conform to the standard Web Fetch API (`fetch(request, env, ctx): Promise<Response>`). A standard Worker export (`export default { fetch }`) handles incoming requests, serves static client assets, and executes SSR handlers without requiring Node-specific runtime modules.
- **Outcome:** **PASSED.** Cloudflare Workers fetch handler wrapper cleanly executes SSR.
- **Fallback Plan:** Prerender public landing pages to static assets on Cloudflare Pages/Workers while routing dynamic requests through a lightweight edge handler.

### Gate 4 (G4): Convex and Better-Auth Binding

- **Question:** Can Convex and Better-Auth be bound to Remix v3's Fetch-based request lifecycle?
- **Finding:**
  - `better-auth` provides native `auth.handler(request)` accepting and returning standard Web `Request` and `Response` objects.
  - `convex` client functions in isomorphic environments using standard WebSocket and HTTP transports.
  - The placeholder backend short-circuit in `apps/web/src/lib/deployment-mode.ts` guarantees preview environments without active Convex deployments do not hang on unconfigured backends.
- **Outcome:** **PASSED.** Fetch API handler binds directly to `/api/auth/*` routes.
- **Fallback Plan:** Retain authenticated management routes on existing endpoints while migrating the public landing surface.

---

## Architectural Seam: Pure Parameter Parsing

To decouple routing from parameter validation across both frameworks, the search parameter validation is extracted into a standalone pure module:

```typescript
// apps/web/src/lib/variant-search.ts
export function parseVariantSearch(searchParams: unknown): VariantKey;
```

This seam is 100% unit-tested, imports zero router internals, and ensures that prototype variant switching (`?variant=...`) behaves identically across TanStack Start and Remix v3.

---

## Component Profiler & Performance Trace Integration

1. **Build Traces:** Every build emits a 5-phase trace (`dependency_graph`, `style_compilation`, `server_output`, `client_output`, `asset_write`).
2. **Attribution:** Bundle metrics record `raw`, `gzip`, and `brotli` bytes with top-N module rankings.
3. **Profiler Interface:** Gated behind `?profiler=1` with zero runtime evaluation when disabled, exposing a machine-readable snapshot on `window.__PROFILER_SNAPSHOT__`.
4. **Framework Dimension:** Comparative deltas between different `framework` values are strictly rejected by the harness.
