# Perf harness

Phase 0 baseline infrastructure for [issue #3](https://github.com/fpcMotif/fenchem-lp/issues/3)
(Migrate styling from Tailwind CSS v4 to StyleX with exact visual retention). The issue
requires a performance baseline captured **before** any migration code changes, using
scripts that later capture the StyleX column unchanged — so the two columns are directly
comparable, not apples-to-oranges.

## Run it

```bash
node perf/run.mjs
```

Appends one row to [`log.json`](./log.json) (full data, including per-run cold-start
samples) and regenerates [`log.md`](./log.md) (the human-readable table) from it. Takes
a few minutes — it does a full cold monorepo build, several hyperfine-timed web-only
builds, and 5 fresh-browser-context page loads against a production preview server.

Flags: `--stack=tailwind|stylex` (which column this run belongs to — defaults to
`tailwind`), `--build-runs`, `--build-warmup`, `--coldstart-runs`, `--skip-full=true`
(skip the expensive full-monorepo build when iterating on the scripts themselves).

Each measurement also runs standalone for debugging:

```bash
node perf/measure-build.mjs --target=web       # or --target=full
node perf/measure-assets.mjs
node perf/measure-coldstart.mjs
```

## What's measured, and by what

Tool boundary — **never mixed**, because each tool can only see one layer:

| Layer | Tool | What it can't see |
|---|---|---|
| Compile time | `hyperfine` (web bundle step, n≥5, real warmup) / plain wall-clock (full monorepo, n=1) | Nothing about the page itself — it only times a CLI process exiting |
| Local page cold-start (TTFB/FCP/LCP/CLS) | Playwright + `PerformanceObserver`, fresh browser context per run, against `vp preview` (production build) | Never the dev server — its timings don't mean anything for this comparison |
| Output size | Node `zlib.gzipSync`, raw + gzip, `dist/client` only (`dist/server` never reaches a browser) | — |

Why the full monorepo build is a single run, not a hyperfine average: every workspace
package carries its own build cache (`tsbuildinfo`, Vite's `node_modules/.vite`,
`.tanstack`, rolldown), and there's no one switch that cold-clears all of them. Rather
than risk silently measuring a warm second run and mislabeling it "cold," it's measured
once per invocation — the same approach the issue's own existing baseline note uses
("9.3 s wall — single measured run"). The web-only build target doesn't have this
problem (its `dist/` is cheap to wipe between runs via `--prepare`), so it gets full
hyperfine statistics.

## Explicitly out of scope here

Two rows from issue #3's performance table are **not** wired up by this harness:

- **Deployed Cloudflare cold-start** (Worker boot + edge TTFB via `Server-Timing`,
  first-hit-after-deploy vs. warm medians) — needs a live preview deployment to probe.
- **Real-user web-vitals / RUM** on the deployed site — needs a decision about adding a
  vendor beacon to real visitor traffic, which is a separate call from "run a local
  script."

Both need an explicit go-ahead before wiring anything into the deployed app; ask before
picking this up rather than assuming it's covered.

## Reading the log

`stack` in each row is `tailwind` until the StyleX migration phases land, then `stylex`
— run `node perf/run.mjs --stack=stylex` at each phase gate per the issue's protocol
("every phase appends to the perf log"). `git.dirty` (rendered as a trailing `*` on the
commit in `log.md`) means the working tree had uncommitted changes when that row was
captured — treat those rows as provisional, not a clean baseline.
