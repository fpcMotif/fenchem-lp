# Framework canary: OOS1 on SolidJS

A SolidJS 1.9 port of the OOS1 slice: `/?variant=oos1` home and `&page=products`
(catalog chips, solutions filter, row sheets, contact dialog). It answers one
question: would moving the site off React to Solid pay off? `apps/web` is untouched.

The canary has its own `package.json` and `bun.lock` outside the workspace, so the
root Vite+ overrides don't apply. It uses plain Vite 8 and `vite-plugin-solid`.

## Run it

```bash
cd canary/solid
bun install
bun run build        # dist/client + dist/server/worker.js
bun run serve        # wrangler dev (workerd) on http://localhost:4175/?variant=oos1
bun run dev          # Vite dev server, client-only rendering
bun run typecheck
```

Benchmark against the React app (build both first; `bun run build` in `apps/web`):

```bash
node perf/measure-solid.mjs --chromium=/opt/pw-browsers/chromium   # from repo root
# On a Mac, drop --chromium to use Playwright's own browser.
```

## Layout

- `src/app/`: the slice, copied from `apps/web/src` (main @ ab6f785) and ported by hand.
  Out-of-slice sub-views (about, R&D, insights, news, contact) resolve to
  `variant-oos1/out-of-slice.tsx`.
- `src/compat/`: hand-written stand-ins for the React-only libraries.
- `src/App.tsx`, `src/entry-client.tsx`, `src/worker.tsx`: route, hydration entry,
  and the Cloudflare Worker that renders with `renderToString` and serves assets.
- `PORTING.md`: the React → Solid rules the port followed. A full migration would
  follow the same rules.

## What the port took

This is a rewrite, not a codemod. Solid components run once, so every `useState`,
`useEffect`, `useRef` and prop read changed shape (see `PORTING.md`). About 7,500 lines
of TSX were ported.

| React piece | Solid replacement |
| --- | --- |
| `react`, `react-dom` | `solid-js`, `solid-js/web` |
| `@stylexjs/stylex` + `@stylexswc/unplugin` | `@stylexjs/stylex` + `@stylexjs/unplugin` (Babel) |
| `lucide-react` | `lucide-solid` |
| `motion/react` | `src/compat/motion.tsx` on the framework-agnostic `motion` package |
| TanStack Router `useSearch` | `src/compat/router.tsx` |
| TanStack Start SSR | `src/worker.tsx` (`renderToString` + `hydrate`) |

## Gaps hit

Each has a workaround here. Each would also hit a full migration.

1. **No Solid binding for motion.** Motion has no official Solid package, and
   `solid-motionone` is built on the older Motion One engine with no scroll values or layout
   animations. `src/compat/motion.tsx` reimplements the parts the slice uses:
   `m.*` components, `AnimatePresence`, `useScroll`, `useTransform`, `useInView`,
   and FLIP layout animations (`layout`, `layoutId`). The full site uses more of motion.
2. **No TanStack Start for Solid at parity.** `@tanstack/solid-start` exists, but this
   canary uses a hand-written worker so the comparison isolates the framework. Routing,
   head management and data loading would need porting.
3. **The StyleX Babel compiler evaluates local functions.** `stylex.props(...)` with an
   accessor call such as `scrolled()` makes `@stylexjs/babel-plugin` evaluate the local
   arrow function at build time and throw `Unsupported expression: Identifier`. Four call
   sites in `variant-oos1/index.tsx` go through a runtime `sxProps` wrapper. The
   breakpoint constants are inlined, as the Babel plugin mis-orders overlapping media
   queries that use `defineConsts`.
4. **Typings.** Solid's JSX types lack `focusable`, `textLength`, `lengthAdjust`, and
   `tabindex` on `<dialog>`. They are passed through spreads.

## Parity

Full-page screenshots after an identical scroll path match React: products at 1440 px
and home at 390 px are pixel-identical, and home at 1440 px differs by 0.13%. That
difference is the office map's enter animation caught at a slightly different frame.
`perf/measure-solid.mjs` also hashes the main DOM text after every benchmark click and
compares it with React.
