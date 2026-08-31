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
node perf/measure-coldstart.mjs                # local preview, --runs / --port
node perf/measure-deployed.mjs --url=https://your-worker.workers.dev [--runs=5]
```

## Known confounds — read this before trusting a number off your own machine

Two real ones surfaced while building this, both worth understanding before citing a
number from a local run:

- **Build time swings hard with concurrent load.** Two back-to-back runs on the same
  machine measured 6.84s and 30.77s for the identical full-monorepo build — a browser
  pane, a Playwright-launched Chromium instance, and an editor all running at once are
  enough to roughly 4x it. `hyperfine`'s stddev only captures noise _within_ one
  invocation; it says nothing about noise _between_ invocations taken minutes apart in a
  busy dev environment. This is exactly why the issue's own protocol puts cold-start
  timing in CI only — the same logic applies to build time. Treat any single local build
  number as a rough order of magnitude, not a citable baseline, until it's run on an
  otherwise-idle machine or in CI.
- **`measure-deployed.mjs` numbers are only as clean as your own network path.** Probing
  the live Worker from a machine behind a proxy (check `echo $HTTPS_PROXY`) mixes real
  Worker/edge cost with that proxy's own latency — and bypassing the proxy isn't a fix
  either: a one-off `curl --noproxy '*'` test here came back _slower_ than the proxied
  hit, so proxy overhead and real geographic distance to the nearest edge PoP can't be
  cleanly separated from a single dev machine either way. `measure-deployed.mjs` is
  useful for "did this deploy make things obviously worse," not for a citable deployed
  baseline — that needs a probe running from CI or real synthetic-monitoring
  infrastructure with a known, stable network path (still the not-yet-built item 42).

## What's measured, and by what

Tool boundary — **never mixed**, because each tool can only see one layer:

| Layer                                    | Tool                                                                                                                                                                                                                                                                    | What it can't see                                                           |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Compile time                             | `hyperfine` (web bundle step, n≥5, real warmup) / plain wall-clock (full monorepo, n=1)                                                                                                                                                                                 | Nothing about the page itself — it only times a CLI process exiting         |
| Local page cold-start (TTFB/FCP/LCP/CLS) | Playwright + `PerformanceObserver`, fresh browser context per run, against `vp preview` (production build); LCP finalizes by polling until it stops changing, not a fixed delay — a short fixed wait reads 0 on this site's animated hero, which is wrong, not "no LCP" | Never the dev server — its timings don't mean anything for this comparison  |
| Deployed page cold/warm timing           | Same harness, `--url` pointed at a live URL instead of spawning a local server; run 1 is the only sample that means "Worker cold start"                                                                                                                                 | Whatever this machine's own network path adds — see "Known confounds" below |
| Output size                              | Node `zlib.gzipSync`, raw + gzip, `dist/client` only (`dist/server` never reaches a browser)                                                                                                                                                                            | —                                                                           |

Why the full monorepo build is a single run, not a hyperfine average: every workspace
package carries its own build cache (`tsbuildinfo`, Vite's `node_modules/.vite`,
`.tanstack`, rolldown), and there's no one switch that cold-clears all of them. Rather
than risk silently measuring a warm second run and mislabeling it "cold," it's measured
once per invocation — the same approach the issue's own existing baseline note uses
("9.3 s wall — single measured run"). The web-only build target doesn't have this
problem (its `dist/` is cheap to wipe between runs via `--prepare`), so it gets full
hyperfine statistics.

## Explicitly out of scope here

`measure-deployed.mjs` covers _synthetic_ cold/warm probing of a live URL (see the
confound caveat above — treat it as directional, not a citable number yet). Two pieces
of issue #3's performance table still aren't wired up:

- **The `Server-Timing` Worker-share header** — isolating how much of deployed TTFB is
  Worker cold-start specifically (vs. edge network, vs. this machine's path) needs the
  Worker's own request handler to emit that header. That's an app-code change, not a
  measurement-script change.
- **Real-user web-vitals / RUM** on the deployed site — needs a decision about adding a
  vendor beacon to real visitor traffic, which is a separate call from "run a probe
  script on demand." Collects and transmits real visitor data; the console one-liner in
  `perf-debug.ts` deliberately does not (nothing it prints leaves the visitor's browser).

Both need an explicit go-ahead before wiring anything into the deployed app; ask before
picking this up rather than assuming it's covered.

## Reading the log

`stack` in each row is `tailwind` until the StyleX migration phases land, then `stylex`
— run `node perf/run.mjs --stack=stylex` at each phase gate per the issue's protocol
("every phase appends to the perf log"). `git.dirty` (rendered as a trailing `*` on the
commit in `log.md`) means the working tree had uncommitted changes when that row was
captured — treat those rows as provisional, not a clean baseline.
