# Framework canary: OOS1 on Octane

An isolated Octane 0.13.7 port of the OOS1 slice (`/?variant=oos1` home plus
`&page=products`: catalog chips, solutions filter, row sheets). It is used to
decide whether moving all variants off React is worth it. `apps/web` is untouched.
The canary has its own `package.json` and `bun.lock` outside the workspace, so it
does not clash with the root Vite+ overrides (`vite` → `vite-plus-core`). It uses
plain Vite 8.

## Layout

- `sync.mjs`: copies the slice from `apps/web/src` into `octane/src/app`, then
  rewrites framework imports. The copy is generated, so re-run it after changing
  `apps/web`. Out-of-slice sub-views (about, R&D, insights, news, contact) resolve
  to a stub.
- `octane/src/compat/`: hand-written shims for APIs the Octane bindings lack (see
  below).
- `octane/src/App.tsrx`: the route entry. It provides the URL search params.
- `octane/octane.config.ts`: one SSR route, Cloudflare adapter.

```bash
node canary/sync.mjs octane
cd canary/octane && bun install && bun run build   # dist/client + dist/server/worker.js
bunx wrangler dev                                  # workerd, like production
node perf/measure-canary.mjs --chromium=/opt/pw-browsers/chromium   # from repo root
```

## Port approach

The components stay `.tsx`. Octane compiles TSX and TSRX to the same component
code. Its docs recommend TSX for moved React code, so the port is an import
codemod rather than a rewrite. Only the new route entry is `.tsrx`.

| React import | Octane twin |
| --- | --- |
| `react`, `react-dom` (values) | `octane` |
| React types | `src/compat/react-types.ts` (type-only) |
| `@stylexjs/stylex` | `@octanejs/stylex` |
| `lucide-react` | `@octanejs/lucide` |
| `motion/react` | `src/compat/motion.ts` → `@octanejs/motion` |
| `@tanstack/react-router` `useSearch` | `src/compat/router.ts` |

Below-fold home sections (campus, strengths, products, offices, news) are
wrapped in `<Hydrate when={visible()}>`. The server still renders them, and their
JS hydrates when they near the viewport.

## Gaps found in the Octane ecosystem

Each one has a workaround here. Each would also hit the full migration.

1. **`@octanejs/motion` has no SSR.** It imports `hostComponent` and `childSlot`,
   which `octane/server` does not export, so the server build fails. Its
   `status.json` says "No SSR-specific surface". `compat/motion-server.tsx`
   renders motion hosts as plain elements with `initial` as inline style, as
   framer-motion's own SSR does.
2. **`useScroll({ target: ref })` ignores refs.** The binding passes the ref
   object to motion's `scroll()`, which wants an element. Scroll progress then
   tracks the whole page, so the hero copy rendered at opacity 0. The compat
   `useScroll` unwraps refs.
3. **`useInView` and `useInstantLayoutTransition` are not ported.** The compat
   module implements both.
4. **StyleX media-query order.** `@stylexjs/babel-plugin` (used by
   `@octanejs/stylex`) applies "last media query wins" before `defineConsts`
   values resolve. Overlapping `[breakpoints.md]` / `[breakpoints.xl]` rules then
   sort by text, so md beat xl at desktop. `apps/web`'s stylexswc is fine.
   `sync.mjs` inlines the breakpoint strings.
5. **StyleX `keyframes` nested in an object** is left uncompiled in the server
   build, and the worker crashes on boot. `sync.mjs` hoists them, in both twins.
6. **Cascade layers.** The StyleX sheet and `globals.css` are separate files, so
   `@layer base` was declared after the StyleX layers and beat them (for example,
   the search pill lost its border). `index.html` pins `@layer base;` first.
7. **Reduced motion.** With `prefers-reduced-motion: reduce`, the campus frame
   keeps its inline `clip-path` after `style` becomes `undefined`. React removes
   it. This is not fixed. Benchmarks and parity checks run with no-preference.

## Parity

Full-page screenshots after an identical scroll path at 1440, 900 and 390 px
differ from React by at most 0.22%. That is the world-map pin animation, which
differs as much between two Octane runs. `perf/measure-canary.mjs` also hashes
the main DOM text after every benchmark click and compares it against React.
