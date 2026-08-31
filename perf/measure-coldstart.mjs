#!/usr/bin/env node
// Local cold-start page timing — TTFB / FCP / LCP / CLS — Phase 0 of issue #3.
//
// Runs only against the PRODUCTION PREVIEW build (`vp preview`), never the dev
// server — the issue is explicit that dev-server timings are meaningless for this
// comparison (protocol requirement #3). Each run gets a fresh browser context (no
// HTTP cache, no service worker reuse) so every sample is a genuinely cold navigation,
// not a warm second load. Reports the median of N runs.
//
// This measures the *local* preview server only. Deployed Cloudflare cold-start
// (Worker boot + edge TTFB) and real-user web-vitals RUM are separate, out of scope
// here — they need a live deployment decision; see perf/README.md.
//
// Usage: node perf/measure-coldstart.mjs [--runs=5] [--port=4173]

import { chromium } from "@playwright/test";
import { spawn, execFileSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

import { isMain, median, parseArgs } from "./lib/util.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const WEB_DIR = join(ROOT, "apps/web");

// Injected before any page script runs, so the observers see the *first* paint/LCP
// candidate/layout-shift of this navigation rather than missing the early ones.
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
  throw new Error(`preview server did not become ready at ${url} within ${timeoutMs}ms`);
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

export async function measureColdstart({ runs = 5, port = 4173 } = {}) {
  const baseUrl = `http://localhost:${port}/`;
  console.log(`\n→ starting production preview server (\`vp preview\`) on :${port}`);
  const server = spawn("bun", ["run", "serve"], {
    cwd: WEB_DIR,
    stdio: "pipe",
    detached: process.platform !== "win32",
  });

  let browser;
  try {
    await waitForServer(baseUrl);

    browser = await chromium.launch();
    const samples = { ttfb: [], fcp: [], lcp: [], cls: [] };

    for (let i = 0; i < runs; i++) {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.addInitScript(collectScript);
      await page.goto(baseUrl, { waitUntil: "load" });
      await page.waitForTimeout(500); // let the LCP/CLS observers settle post-load
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
        `  run ${i + 1}/${runs}: TTFB=${metrics.ttfb?.toFixed(0)}ms FCP=${metrics.fcp?.toFixed(0)}ms ` +
          `LCP=${metrics.lcp?.toFixed(0)}ms CLS=${metrics.cls?.toFixed(3)}`,
      );
      for (const key of Object.keys(samples)) {
        if (metrics[key] != null) samples[key].push(metrics[key]);
      }
      await context.close();
    }

    return {
      runs,
      url: baseUrl,
      ttfb_ms: median(samples.ttfb),
      fcp_ms: median(samples.fcp),
      lcp_ms: median(samples.lcp),
      cls: median(samples.cls),
      samples,
    };
  } finally {
    if (browser) await browser.close();
    killTree(server.pid);
    await sleep(300); // let the OS release the port before the next caller binds it
  }
}

if (isMain(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2), { runs: 5, port: 4173 });
  const result = await measureColdstart(args);
  console.log(JSON.stringify(result, null, 2));
}
