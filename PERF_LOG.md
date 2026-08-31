# Performance Comparison Log: Tailwind v4 vs StyleX

This document logs build performance, bundle asset sizes, and runtime cold-start metrics across every phase of the StyleX migration for `fenchem-lp`.

## Methodology & Protocol

- **Build Time**: Cold workspace build (`bun run build`) benchmarked via `hyperfine --warmup 2 --runs 5`.
- **Vite Bundle Time**: Parsed client bundle transform/render duration from `vp build` output.
- **Asset Sizes**: Raw and gzip byte lengths calculated directly from `apps/web/dist/client/assets` for CSS and JS bundles.
- **Environment**: Apple M4 Pro (14 cores, 48GB RAM), Darwin 27.0.0, Bun runtime.

---

## Metric Tracking Table

| Metric                               | Tailwind v4 Baseline (Phase 0) | Phase 1 (Tokens + Reset) | Phase 2 (Leaf UI) | Phase 3 (Overlays) | Phase 4 & 5 (App + Prototypes) | Phase 6 (Final StyleX - Clean) | Delta vs Baseline (%)                   |
| ------------------------------------ | ------------------------------ | ------------------------ | ----------------- | ------------------ | ------------------------------ | ------------------------------ | --------------------------------------- |
| **Full Build Time (Hyperfine Mean)** | 1.468 s ± 0.038 s              | 1.79 s                   | 2.50 s            | 2.58 s             | 3.92 s                         | 3.839 s ± 0.024 s              | +161.5% (compiler CSS-in-JS extraction) |
| **Vite Client Build Time**           | 527 ms                         | 685 ms                   | 703 ms            | 745 ms             | 1.80 s                         | 1.81 s                         | +243%                                   |
| **CSS Assets (Raw)**                 | 152.38 kB                      | 153.57 kB                | 152.93 kB         | 150.49 kB          | 110.44 kB                      | 94.51 kB                       | **-38.0% (CSS reduction)**              |
| **CSS Assets (Gzip)**                | 21.87 kB                       | 22.03 kB                 | 23.37 kB          | 22.99 kB           | 23.05 kB                       | 19.58 kB                       | **-10.5% (CSS gzip reduction)**         |
| **JS Assets (Raw)**                  | 2096.81 kB                     | 2115.08 kB               | 2116.29 kB        | 2089.43 kB         | 2182.36 kB                     | 2182.50 kB                     | +4.1%                                   |
| **JS Assets (Gzip)**                 | 570.05 kB                      | 575.57 kB                | 576.86 kB         | 569.00 kB          | 601.91 kB                      | 602.02 kB                      | +5.6%                                   |
| **Total Assets (Raw)**               | 2249.19 kB                     | 2268.65 kB               | 2269.22 kB        | 2239.92 kB         | 2292.80 kB                     | 2277.01 kB                     | +1.2%                                   |
| **Total Assets (Gzip)**              | 591.93 kB                      | 597.60 kB                | 600.23 kB         | 591.99 kB          | 624.95 kB                      | 621.59 kB                      | **+5.0% (Within acceptance gate <10%)** |

---

## Detailed Asset Breakdown (Phase 6 Final StyleX)

### CSS Assets (1 file)

- `index-*.css`: 94.51 kB (raw) / 19.58 kB (gzip) — **-38.0% raw / -10.5% gzip vs Tailwind baseline**

### JS Assets (14 files)

- `index-*.js`: 1970.23 kB (raw) / 529.15 kB (gzip)
- `dropdown-menu-*.js`: 126.98 kB (raw) / 42.81 kB (gzip)
- `route-*.js`: 69.59 kB (raw) / 16.84 kB (gzip)
- `tokens.stylex-*.js`: 16.14 kB (raw) / 6.00 kB (gzip)
- `owner-*.js`: 12.57 kB (raw) / 5.37 kB (gzip)
- `api-*.js`: 9.15 kB (raw) / 3.40 kB (gzip)
- `checkbox-*.js`: 9.08 kB (raw) / 4.05 kB (gzip)
- `style-audit-*.js`: 8.89 kB (raw) / 2.56 kB (gzip)
- `input-*.js`: 4.37 kB (raw) / 2.19 kB (gzip)
- `useValueChanged-*.js`: 3.35 kB (raw) / 1.52 kB (gzip)
- `todos-*.js`: 2.14 kB (raw) / 1.07 kB (gzip)
- `dashboard-*.js`: 1.10 kB (raw) / 0.61 kB (gzip)
- `routes-*.js`: 0.77 kB (raw) / 0.48 kB (gzip)
- `label-*.js`: 0.45 kB (raw) / 0.35 kB (gzip)

---

## Browser Runtime Cold-Start & Paint Performance (Production Preview Server)

Captured via `scripts/measure-page-speed.ts` (Playwright / Navigation Timing & Paint Timing API, 5-run median):

| Metric                           | StyleX Production Build (Median) |
| -------------------------------- | -------------------------------- |
| **Time to First Byte (TTFB)**    | 3.9 ms                           |
| **First Contentful Paint (FCP)** | 724.0 ms                         |
| **DOM Interactive**              | 716.4 ms                         |
| **DOM Complete**                 | 2017.0 ms                        |
| **Total Page Load (Load Event)** | 2020.2 ms                        |
