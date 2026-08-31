# StyleX compiles via the Rust/SWC `@stylexswc/unplugin`, not the official Babel plugin

**Status:** accepted (supersedes the compiler half of the Tailwind→StyleX
migration; the StyleX API and atomic-CSS model are unchanged)

The StyleX compile step uses [`@stylexswc/unplugin`](https://github.com/Dwlad90/stylex-swc-plugin)
(pinned `0.18.5`), a community Rust (NAPI-RS + SWC) reimplementation of
`@stylexjs/babel-plugin`, wired into `apps/web/vite.config.ts` and
`apps/web/vitest.config.ts`. Everything else stays on the VoidZero stack
(`vp` / Vite 8 / Rolldown / Oxc); `@vitejs/plugin-react` v6 already transforms
React via Oxc, so the whole transform pipeline is now Rust with zero Babel.
Generated CSS lands in `src/index.css` at the `@stylex;` marker
(`useCssPlaceholder`, **production builds only**). In dev the placeholder path
does not work under this stack, so dev serves the rules differently — see
"Dev-mode CSS delivery" below.

## Why a future reader will question this — and the answer

- **It is not the official Meta toolchain.** Correct, and that is the accepted
  risk: the project is community-maintained, so the version is pinned and any
  `@stylexjs/stylex` upgrade must wait for compiler support (it tracks upstream
  and is validated against the official test suite; `0.18.x` covers StyleX
  `v0.19.0`). Bailout path is trivial: both compilers accept the same options
  and the same source, so reverting is a two-file config swap.
- **It is SWC, not Oxc, inside a VoidZero stack.** No Oxc-native StyleX
  transform exists (Meta ships Babel only; VoidZero ships none). SWC here is an
  implementation detail of a self-contained native binary — it does not add a
  JS toolchain, config file, or `.babelrc` to the repo.
- **Class-name hashes differ from Babel output.** Irrelevant in practice:
  atomic CSS and the JS referencing it are emitted by the same build and
  deployed together.

## Measured results (same machine, protocol per `PERF_LOG.md`)

| Metric                      | Babel (`@stylexjs/unplugin`) | SWC (`@stylexswc/unplugin`) | Delta          |
| --------------------------- | ---------------------------- | --------------------------- | -------------- |
| Full build (hyperfine mean) | 3.839 s ± 0.024              | 2.783 s ± 0.018             | **-27.5%**     |
| Vite client bundle          | 1.81 s                       | 0.989 s                     | **-45.4%**     |
| CSS raw / gzip              | 94.51 kB / 19.58 kB          | 72.61 kB / 17.95 kB         | -23.2% / -8.3% |
| JS raw / gzip               | 2182.50 kB / 602.02 kB       | 2171.90 kB / 610.12 kB      | -0.5% / +1.3%  |
| Total raw / gzip            | 2277.01 kB / 621.59 kB       | 2244.51 kB / 628.08 kB      | -1.4% / +1.0%  |

The win is **build/dev speed, not shipped size**: both compilers emit the same
atomic-CSS model, so total gzip is flat by design. If output size becomes the
goal, the lever is compiler options (`enableMinifiedKeys`), not the compiler
choice.

## Considered options

- **Keep `@stylexjs/unplugin` (official, Babel).** Rejected: the only JS/Babel
  pass left in an otherwise all-Rust pipeline; measurably slower; virtual-CSS
  wiring needed a dev-only workaround.
- **`unplugin-stylex` / `vite-plugin-stylex` (community).** Rejected: thin
  wrappers that still run the official Babel plugin underneath.
- **Wait for an Oxc-native StyleX transform.** Rejected: none exists or is
  announced from Meta or VoidZero.

## Dev-mode CSS delivery (why `patches/@stylexswc%2Funplugin@0.18.5.patch` exists)

Two rolldown-vite/TanStack-Start gaps in the plugin's dev mode, found by the
`e2e/style-audit.spec.ts` computed-style parity matrix:

1. **`useCssPlaceholder` is build-only here.** In dev, rolldown-vite answers
   raw `<link>` CSS requests from disk and bypasses plugin `load` hooks, so the
   spliced rules never reached the browser (marker served unreplaced).
2. **The plugin's dev middleware is armed in `transformIndexHtml`**, which
   TanStack Start never invokes (it SSRs its own document), so `/stylex.css`
   fell through to the app router and returned HTML. The local patch arms the
   middleware (`cssFileName`) and the HMR channel (`wsSend`) in
   `configureServer` instead; registered via `patchedDependencies` in the root
   `package.json`. Re-check the patch on every plugin upgrade; drop it once
   upstream fixes arming for SSR frameworks (worth an upstream issue).

So: dev keeps the old pattern — `__root.tsx` links `/stylex.css` in dev only,
served by the plugin middleware; production splices into `index.css` at the
marker. `runtimeInjection` stays `false` everywhere. Verified: style-audit
parity passes in dev; prod build output unchanged (same CSS hash).

## Consequences

- Removed devDeps: `@stylexjs/unplugin`, `@stylexjs/babel-plugin`,
  `@babel/core`, `@babel/generator`, `@babel/preset-react`,
  `@babel/preset-typescript`. `@babel/parser`/`traverse`/`types` remain for
  `scripts/check-stylex-types.ts` (porting it to `oxc-parser` removes the last
  Babel packages; deliberately out of scope here).
- Vitest logs a cosmetic `emitFile() is not supported in serve mode` warning;
  jsdom tests do not consume the CSS asset, so no action is taken.
- New Rust-compiler options become available for future tuning:
  `include`/`exclude` file filtering, `transformCss` post-processing hook,
  `enableMinifiedKeys`.
