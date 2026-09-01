#!/usr/bin/env node
// Cold-start page timing — TTFB / FCP / LCP / CLS — Phase 0 of issue #3.
//
// Works two ways:
//   local     (default) — spawns `vp preview` (production build) on :4173 and measures
//              against it. Never the dev server — the issue is explicit that dev-server
//              timings are meaningless for this comparison (protocol requirement #3).
//   deployed  — pass --url to point at any already-running server (e.g. the live
//              Cloudflare Worker) instead of spawning one. Run #1 is labelled "cold" —
//              genuinely meaningful only immediately after a fresh deploy, since this
//              machine's earlier requests will have already warmed the Worker isolate.
//
// Each run gets a fresh browser context (no HTTP cache, no service worker reuse) so
// every sample is a genuinely cold navigation, not a warm second load.
//
// LCP finalization: the naive approach (read the value N ms after `load`) is wrong for
// this site — GSAP/Lenis entrance animations paint the real hero content well after
// `load`, so a short fixed delay reads "no candidate yet" and reports 0. Instead this
// polls until the observed LCP value stops changing for a few consecutive checks (or a
// generous ceiling is hit), which tracks an animated hero correctly without an
// arbitrarily long fixed wait on pages that settle fast.
//
// This measures TTFB/FCP/LCP/CLS only — never Worker cold-start's own share of that
// time (that needs a `Server-Timing` header the app doesn't emit yet) and never
// real-user data; see perf/README.md.
//
// Usage:
//   node perf/measure-coldstart.mjs [--runs=7] [--port=4173]
//   node perf/measure-coldstart.mjs --url=https://fenchem-lp-web-fenchem.kidder-ripper4o.workers.dev [--runs=5]

import { chromium } from "@playwright/test";
import { spawn, execFileSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

import { isMain, median, percentile, parseArgs } from "./lib/util.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const WEB_DIR = join(ROOT, "apps/web");

// Injected before any page script runs, so `buffered: true` catches paint/LCP-candidate/
// layout-shift entries that fired before this script itself attached the observers.
function collectScript() {
  window.__perf = { lcp: 0, cls: 0 };
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) window.__perf.lcp = last.renderTime || last.loadTime || 0;
    }).observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    /* LCP unsupported in this engine — leave at 0 */
  }
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__perf.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  } catch {
    /* CLS unsupported in this engine — leave at 0 */
  }
}

async function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status < 500) return;
    } catch {
      /* not up yet */
    }
    await sleep(500);
  }
  throw new Error(`server did not become ready at ${url} within ${timeoutMs}ms`);
}

function killTree(pid) {
  if (pid == null) return;
  if (process.platform === "win32") {
    try {
      execFileSync("taskkill", ["/pid", String(pid), "/T", "/F"], { stdio: "ignore" });
    } catch {
      /* already dead */
    }
  } else {
    try {
      process.kill(-pid, "SIGKILL");
    } catch {
      try {
        process.kill(pid, "SIGKILL");
      } catch {
        /* already dead */
      }
    }
  }
}

/** Poll window.__perf.lcp until it stops changing for `stableChecks` consecutive polls,
 * or `maxMs` elapses — whichever first. Tracks animated heroes correctly; doesn't wait
 * needlessly long on pages that settle immediately. */
async function waitForLcpToSettle(page, { intervalMs = 250, stableChecks = 3, maxMs = 6000 } = {}) {
  let lastValue = -1;
  let stableCount = 0;
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    const current = await page.evaluate(() => window.__perf?.lcp ?? 0);
    if (current === lastValue) {
      stableCount++;
      if (stableCount >= stableChecks) return;
    } else {
      stableCount = 0;
      lastValue = current;
    }
    await sleep(intervalMs);
  }
}

async function sampleOnePage(browser, url, label) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.addInitScript(collectScript);
  await page.goto(url, { waitUntil: "load" });
  await waitForLcpToSettle(page);
  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const paint = performance
      .getEntriesByType("paint")
      .find((e) => e.name === "first-contentful-paint");
    return {
      ttfb: nav ? nav.responseStart - nav.startTime : null,
      fcp: paint ? paint.startTime : null,
      lcp: window.__perf?.lcp ?? null,
      cls: window.__perf?.cls ?? null,
    };
  });
  console.log(
    `  ${label}: TTFB=${metrics.ttfb?.toFixed(0)}ms FCP=${metrics.fcp?.toFixed(0)}ms ` +
      `LCP=${metrics.lcp?.toFixed(0)}ms CLS=${metrics.cls?.toFixed(3)}`,
  );
  await context.close();
  return metrics;
}

function summarize(samples, { firstRunLabel } = {}) {
  const stats = {};
  for (const key of Object.keys(samples)) {
    const vals = samples[key].filter((v) => v != null);
    stats[`${key}_median`] = median(vals);
    stats[`${key}_p75`] = percentile(vals, 75);
  }
  if (firstRunLabel) {
    stats.first_run = {
      ttfb_ms: samples.ttfb[0] ?? null,
      fcp_ms: samples.fcp[0] ?? null,
      lcp_ms: samples.lcp[0] ?? null,
      cls: samples.cls[0] ?? null,
    };
  }
  return stats;
}

export async function measureColdstart({ runs = 7, port = 4173, url } = {}) {
  const isDeployed = Boolean(url);
  const baseUrl = url ?? `http://localhost:${port}/`;
  let server = null;

  if (!isDeployed) {
    console.log(`\n→ starting production preview server (\`vp preview\`) on :${port}`);
    server = spawn("bunx", ["vp", "preview", "--outDir", "dist/client", "--port", String(port)], {
      cwd: WEB_DIR,
      stdio: "pipe",
      detached: process.platform !== "win32",
    });
  } else {
    console.log(`\n→ probing deployed URL: ${baseUrl}`);
    console.log(
      '  run 1 is the only sample that means anything as a Worker "cold start" — this machine\'s',
    );
    console.log(
      "  earlier requests may already have warmed the isolate. Runs 2+ are warm medians.",
    );
  }

  let browser;
  try {
    await waitForServer(baseUrl);
    browser = await chromium.launch();
    const samples = { ttfb: [], fcp: [], lcp: [], cls: [] };

    for (let i = 0; i < runs; i++) {
      const label = isDeployed && i === 0 ? "run 1/COLD" : `run ${i + 1}/${runs}`;
      const metrics = await sampleOnePage(browser, baseUrl, label);
      for (const key of Object.keys(samples)) {
        if (metrics[key] != null) samples[key].push(metrics[key]);
      }
    }

    return {
      runs,
      url: baseUrl,
      mode: isDeployed ? "deployed" : "local",
      // Distinguishes rows measured before the LCP-stabilization-poll fix (which used a
      // naive fixed-500ms-post-load read and undercounted LCP on animated heroes).
      method: "lcp-stabilization-poll",
      ...summarize(samples, { firstRunLabel: isDeployed }),
      samples,
    };
  } finally {
    if (browser) await browser.close();
    if (server) {
      killTree(server.pid);
      await sleep(300); // let the OS release the port before the next caller binds it
    }
  }
}

if (isMain(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2), { runs: 7, port: 4173, url: "" });
  const result = await measureColdstart({ ...args, url: args.url || undefined });
  console.log(JSON.stringify(result, null, 2));
}
