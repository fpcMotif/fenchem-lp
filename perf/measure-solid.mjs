#!/usr/bin/env node
// Five-metric framework benchmark for the OOS1 canary slice (React app vs Solid twin).
//
// Companion to measure-coldstart.mjs. That script loads one URL over raw loopback with
// an unthrottled CPU, which hides most of the gap between a 30 kB and a 300 kB bundle.
// This one controls for the three traps in the framework plan:
//   • loopback saturation → every page goes through a local brotli proxy (what the
//     Cloudflare edge sends) and Chromium's Fast 4G + 4x CPU throttle;
//   • byte shifting       → wire bytes count the HTML document too, not just dist/client;
//   • untuned baseline    → compare against tuned React by passing its URL as a target.
//
// Both targets run on workerd through `wrangler dev`, so SSR cost is measured on the
// same runtime Cloudflare uses. Runs are interleaved (A B, B A, …) so drift on the host
// hits both targets alike. Each sample is a fresh browser context (cold HTTP cache).
//
// Metrics (median, p75, min–max over --runs):
//   1. wire     brotli bytes of document + CSS + JS fetched before LCP, and request count
//   2. load     throttled FCP, LCP and TBT (long tasks after FCP, 4x CPU + Fast 4G, WebGL off)
//   3. inp      click → next frame for sub-page switch, category chips, solution filters
//   4. edge     worker upload size (gzip), cold first-request TTFB, warm SSR TTFB
//   5. correct  page errors / console errors, and DOM text parity of every interaction step
//
// Usage (builds must exist: `bun run build` in apps/web, `bun run build` in canary/solid):
//   node perf/measure-canary.mjs [--runs=7] [--warm=100] [--cold-runs=7]
//        [--targets=react,solid] [--chromium=/opt/pw-browsers/chromium] [--out=perf/solid]
// Extra targets: --target-<name>=<dir with wrangler config>:<config path relative to it>

import { chromium } from "@playwright/test";
import { spawn, execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import http from "node:http";
import { join, relative } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";
import { createHash } from "node:crypto";

import { isMain, median, percentile, parseArgs } from "./lib/util.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

const TARGETS = {
  react: { dir: join(ROOT, "apps/web"), config: "dist/server/wrangler.json" },
  solid: { dir: join(ROOT, "canary/solid"), config: "wrangler.jsonc" },
};

const ROUTES = {
  home: "/?variant=oos1",
  products: "/?variant=oos1&page=products",
};

// Fast 4G as the plan defines it: 150 ms RTT, 1.6 Mbps down, 750 kbps up.
const NETWORK = { offline: false, latency: 150, downloadThroughput: 200_000, uploadThroughput: 93_750 };
const CPU_SLOWDOWN = 4;

// ── servers ──────────────────────────────────────────────────────────────────

function startWorker(name, port) {
  const t = TARGETS[name];
  const child = spawn(
    join(ROOT, "canary/solid/node_modules/.bin/wrangler"),
    ["dev", "-c", t.config, "--port", String(port), "--ip", "127.0.0.1", "--inspector-port", String(port + 1000), "--log-level", "error"],
    { cwd: t.dir, stdio: ["ignore", "pipe", "pipe"], detached: true, env: { ...process.env, WRANGLER_SEND_METRICS: "false" } },
  );
  let log = "";
  child.stdout.on("data", (d) => (log += d));
  child.stderr.on("data", (d) => (log += d));
  return { child, port, log: () => log };
}

function stopWorker(server) {
  try {
    process.kill(-server.child.pid, "SIGKILL");
  } catch {
    /* gone */
  }
}

async function waitFor(url, timeoutMs = 90_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      await res.arrayBuffer();
      if (res.status < 500) return;
    } catch {
      /* not up */
    }
    await sleep(250);
  }
  throw new Error(`server not ready at ${url}`);
}

/** Brotli proxy in front of a worker: the bytes Chromium throttles are the bytes the
 * edge would send. Streams stay streams — each upstream chunk is flushed through. */
function startBrotliProxy(upstreamPort, port) {
  const server = http.createServer((req, res) => {
    const up = http.request(
      { host: "127.0.0.1", port: upstreamPort, path: req.url, method: req.method, headers: { ...req.headers, "accept-encoding": "identity" } },
      (upRes) => {
        const type = String(upRes.headers["content-type"] ?? "");
        const compressible = /text\/|javascript|json|css|svg|xml/.test(type);
        const wantsBr = /\bbr\b/.test(String(req.headers["accept-encoding"] ?? ""));
        const headers = { ...upRes.headers };
        if (!(compressible && wantsBr)) {
          res.writeHead(upRes.statusCode ?? 502, headers);
          upRes.pipe(res);
          return;
        }
        delete headers["content-length"];
        headers["content-encoding"] = "br";
        headers.vary = "accept-encoding";
        res.writeHead(upRes.statusCode ?? 502, headers);
        const br = zlib.createBrotliCompress({ params: { [zlib.constants.BROTLI_PARAM_QUALITY]: type.includes("html") ? 5 : 11 } });
        br.pipe(res);
        upRes.on("data", (chunk) => {
          br.write(chunk);
          br.flush();
        });
        upRes.on("end", () => br.end());
      },
    );
    up.on("error", () => {
      res.writeHead(502);
      res.end();
    });
    req.pipe(up);
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(server)));
}

// ── page probes ──────────────────────────────────────────────────────────────

function pageObservers() {
  window.__perf = { lcp: 0, longTasks: [], errors: [] };
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) window.__perf.lcp = e.renderTime || e.loadTime || e.startTime;
  }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) window.__perf.longTasks.push([e.startTime, e.duration]);
  }).observe({ type: "longtask", buffered: true });
}

async function newPage(browser, { throttle }) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  // Third-party fonts would add proxy/internet noise that has nothing to do with the
  // framework; both apps request the same Google Fonts, so both lose them equally.
  await context.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  if (throttle) {
    await cdp.send("Network.emulateNetworkConditions", NETWORK);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU_SLOWDOWN });
  }
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error" && !/Failed to load resource|ERR_FAILED|net::/.test(m.text())) errors.push(`console: ${m.text().slice(0, 200)}`);
  });
  await page.addInitScript(pageObservers);
  return { context, page, cdp, errors };
}

/** Cold throttled load of one route: wire bytes before LCP, FCP/LCP/TBT. */
async function sampleLoad(browser, baseUrl, route) {
  const { context, page, cdp, errors } = await newPage(browser, { throttle: true });
  const requests = new Map();
  cdp.on("Network.requestWillBeSent", (e) => requests.set(e.requestId, { url: e.request.url, start: e.timestamp, type: e.type }));
  cdp.on("Network.responseReceived", (e) => {
    const r = requests.get(e.requestId);
    if (r) r.type = e.type;
  });
  cdp.on("Network.loadingFinished", (e) => {
    const r = requests.get(e.requestId);
    if (r) Object.assign(r, { end: e.timestamp, bytes: e.encodedDataLength });
  });
  let navStart;
  cdp.on("Network.requestWillBeSent", (e) => {
    if (navStart === undefined && e.type === "Document") navStart = e.timestamp;
  });

  await page.goto(baseUrl + route, { waitUntil: "load", timeout: 120_000 });
  // Settle: LCP stable for 1 s and no new long task for 2 s (hydration done), max 20 s.
  let last = { lcp: -1, tasks: -1 };
  let stableSince = Date.now();
  const start = Date.now();
  while (Date.now() - start < 20_000) {
    const now = await page.evaluate(() => ({ lcp: window.__perf.lcp, tasks: window.__perf.longTasks.length }));
    if (now.lcp !== last.lcp || now.tasks !== last.tasks) {
      last = now;
      stableSince = Date.now();
    } else if (Date.now() - stableSince > 2000) break;
    await sleep(250);
  }
  const m = await page.evaluate(() => {
    const paint = performance.getEntriesByType("paint").find((e) => e.name === "first-contentful-paint");
    return { fcp: paint?.startTime ?? null, lcp: window.__perf.lcp, longTasks: window.__perf.longTasks };
  });
  const tbt = m.longTasks
    .filter(([s]) => m.fcp != null && s >= m.fcp)
    .reduce((sum, [, d]) => sum + Math.max(0, d - 50), 0);

  let wire = 0;
  let wireAll = 0;
  let reqs = 0;
  let reqsAll = 0;
  const byType = { document: 0, css: 0, js: 0 };
  for (const r of requests.values()) {
    if (r.bytes == null || !["Document", "Stylesheet", "Script"].includes(r.type)) continue;
    wireAll += r.bytes;
    reqsAll += 1;
    const startMs = (r.start - navStart) * 1000;
    if (m.lcp && startMs > m.lcp) continue;
    wire += r.bytes;
    reqs += 1;
    byType[r.type === "Document" ? "document" : r.type === "Stylesheet" ? "css" : "js"] += r.bytes;
  }
  await context.close();
  return { fcp: m.fcp, lcp: m.lcp, tbt, wire, reqs, wireAll, reqsAll, ...prefix("wire_", byType), errors };
}

function prefix(p, obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [p + k, v]));
}

// Interaction script: [route, label, locator factory]. Each step clicks once.
const INTERACTIONS = [
  ["home", "nav → products view", (p) => p.locator("header").getByText("产品与应用", { exact: true }).first()],
  ["products", "category chip: 2nd", (p) => p.locator('[aria-label="Categories"] button').nth(1)],
  ["products", "category chip: 3rd", (p) => p.locator('[aria-label="Categories"] button').nth(2)],
  ["products", "category chip: 1st", (p) => p.locator('[aria-label="Categories"] button').nth(0)],
  ["products", "catalog row expand", (p) => p.locator("#products-catalog button[aria-expanded]").first()],
  ["products", "solutions filter: 2nd", (p) => p.locator('[aria-label="按应用领域筛选"] button').nth(1)],
  ["products", "solutions filter: all", (p) => p.locator('[aria-label="按应用领域筛选"] button').nth(0)],
  ["products", "solutions tab: 3rd", (p) => p.locator('[role="tablist"][aria-label="应用方案"] [role="tab"]').nth(2)],
];

function installFrameTimer() {
  // Capture-phase listener runs before the framework's handler; rAF fires before the
  // frame that shows the update, and the MessageChannel hop lands just after it paints.
  window.__frames = [];
  window.addEventListener(
    "click",
    (event) => {
      const t0 = event.timeStamp;
      requestAnimationFrame(() => {
        const ch = new MessageChannel();
        ch.port1.onmessage = () => window.__frames.push(performance.now() - t0);
        ch.port2.postMessage(0);
      });
    },
    true,
  );
}

async function sampleInteractions(browser, baseUrl) {
  const { context, page, errors } = await newPage(browser, { throttle: false });
  await page.addInitScript(installFrameTimer);
  const out = {};
  const digests = [];
  let currentRoute = null;
  for (const [route, label, locate] of INTERACTIONS) {
    if (route !== currentRoute) {
      // Load unthrottled (load time is metric 2), then throttle CPU for the clicks.
      const cdp = await context.newCDPSession(page);
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
      await page.goto(baseUrl + ROUTES[route], { waitUntil: "networkidle" });
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await sleep(800);
      await page.evaluate(() => window.scrollTo(0, 0));
      await sleep(800);
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU_SLOWDOWN });
      currentRoute = route;
    }
    const target = locate(page);
    await target.scrollIntoViewIfNeeded();
    await sleep(300);
    const before = await page.evaluate(() => window.__frames.length);
    await target.click();
    await page.waitForFunction((n) => window.__frames.length > n, before, { timeout: 10_000 });
    out[label] = await page.evaluate(() => window.__frames.at(-1));
    await sleep(600); // let transitions settle before the DOM digest and next click
    digests.push([label, await mainDigest(page)]);
  }
  await context.close();
  return { frames: out, digests, errors };
}

async function mainDigest(page) {
  const text = await page.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    const pressed = [...main.querySelectorAll('[aria-pressed="true"],[aria-selected="true"],[aria-expanded="true"]')].map((e) => e.textContent?.trim().slice(0, 40));
    return JSON.stringify([main.innerText.replace(/\s+/g, " "), pressed]);
  });
  return createHash("sha1").update(text).digest("hex").slice(0, 12);
}

// ── edge ─────────────────────────────────────────────────────────────────────

function workerUploadSize(name) {
  const t = TARGETS[name];
  const outdir = join(ROOT, "canary/solid/.dry-run", name);
  const log = execFileSync(
    join(ROOT, "canary/solid/node_modules/.bin/wrangler"),
    ["deploy", "--dry-run", "-c", t.config, "--outdir", outdir],
    { cwd: t.dir, encoding: "utf8", env: { ...process.env, WRANGLER_SEND_METRICS: "false" } },
  );
  const m = log.match(/Total Upload:\s*([\d.]+)\s*KiB\s*\/\s*gzip:\s*([\d.]+)\s*KiB/);
  return m ? { upload_kib: Number(m[1]), upload_gzip_kib: Number(m[2]) } : { upload_kib: null, upload_gzip_kib: null };
}

async function ttfb(url) {
  const t0 = performance.now();
  const res = await fetch(url);
  const reader = res.body.getReader();
  await reader.read();
  const first = performance.now() - t0;
  while (!(await reader.read()).done) {
    /* drain */
  }
  return { ttfb: first, total: performance.now() - t0 };
}

/** Cold: fresh workerd process, readiness probed on a static asset (served without
 * running the app worker), then the first SSR request. */
async function sampleCold(name, port) {
  const server = startWorker(name, port);
  try {
    await waitFor(`http://127.0.0.1:${port}/robots.txt`);
    return (await ttfb(`http://127.0.0.1:${port}${ROUTES.home}`)).ttfb;
  } finally {
    stopWorker(server);
    await sleep(500);
  }
}

// ── stats ────────────────────────────────────────────────────────────────────

function stats(values) {
  const v = values.filter((x) => typeof x === "number" && !Number.isNaN(x));
  if (!v.length) return null;
  return { p50: median(v), p75: percentile(v, 75), min: Math.min(...v), max: Math.max(...v), n: v.length };
}

function interleave(names, i) {
  return i % 2 === 0 ? names : [...names].reverse();
}

// ── main ─────────────────────────────────────────────────────────────────────

export async function measureCanary(opts) {
  const names = opts.targets.split(",");
  for (const n of names) {
    const extra = opts[`target-${n}`];
    if (extra) {
      const [dir, config] = extra.split(":");
      TARGETS[n] = { dir: join(ROOT, dir), config };
    }
    if (!TARGETS[n]) throw new Error(`unknown target ${n}`);
    if (!existsSync(join(TARGETS[n].dir, TARGETS[n].config))) throw new Error(`${n}: build first (${TARGETS[n].config} missing)`);
  }
  const results = Object.fromEntries(names.map((n) => [n, { load: {}, inp: {}, edge: {}, errors: [], digests: [] }]));

  console.log("→ metric 4a: worker upload size (wrangler deploy --dry-run)");
  for (const n of names) Object.assign(results[n].edge, workerUploadSize(n));

  console.log(`→ metric 4b: cold first SSR request (${opts.coldRuns} fresh workerd starts each, interleaved)`);
  const cold = Object.fromEntries(names.map((n) => [n, []]));
  for (let i = 0; i < opts.coldRuns; i++) {
    for (const [k, n] of interleave(names, i).entries()) {
      const ms = await sampleCold(n, 8800 + k * 10);
      cold[n].push(ms);
      console.log(`  ${n} cold #${i + 1}: ${ms.toFixed(1)} ms`);
    }
  }
  for (const n of names) results[n].edge.cold_ttfb_ms = stats(cold[n]);

  const servers = names.map((n, k) => startWorker(n, 8700 + k * 10));
  const proxies = [];
  try {
    for (const s of servers) await waitFor(`http://127.0.0.1:${s.port}/robots.txt`);
    for (const [k, s] of servers.entries()) proxies.push(await startBrotliProxy(s.port, 8900 + k * 10));
    const proxyUrl = Object.fromEntries(names.map((n, k) => [n, `http://127.0.0.1:${8900 + k * 10}`]));
    const directUrl = Object.fromEntries(names.map((n, k) => [n, `http://127.0.0.1:${8700 + k * 10}`]));

    console.log(`→ metric 4c: warm SSR TTFB (${opts.warm} requests each, interleaved, after 10 warm-ups)`);
    for (const n of names) for (let i = 0; i < 10; i++) await ttfb(directUrl[n] + ROUTES.home);
    const warm = Object.fromEntries(names.map((n) => [n, { ttfb: [], total: [] }]));
    for (let i = 0; i < opts.warm; i++) {
      for (const n of interleave(names, i)) {
        const r = await ttfb(directUrl[n] + ROUTES.home);
        warm[n].ttfb.push(r.ttfb);
        warm[n].total.push(r.total);
      }
    }
    for (const n of names) {
      results[n].edge.warm_ttfb_ms = stats(warm[n].ttfb);
      results[n].edge.warm_html_total_ms = stats(warm[n].total);
    }

    // No GPU in CI containers: the hero's WebGL shader runs in software and emits a
    // ~100 ms long task every frame, forever, in both twins alike. That swamps TBT and
    // never lets the page settle, so 3D APIs are off and LiquidImage keeps its <img>.
    const browser = await chromium.launch({
      ...(opts.chromium ? { executablePath: opts.chromium } : {}),
      args: ["--disable-3d-apis"],
    });
    try {
      console.log(`→ metrics 1+2: throttled cold loads (${opts.runs} runs × ${Object.keys(ROUTES).length} routes, interleaved)`);
      for (const route of Object.keys(ROUTES)) {
        const samples = Object.fromEntries(names.map((n) => [n, []]));
        for (let i = 0; i < opts.runs; i++) {
          for (const n of interleave(names, i)) {
            const s = await sampleLoad(browser, proxyUrl[n], ROUTES[route]);
            samples[n].push(s);
            results[n].errors.push(...s.errors.map((e) => `${route}: ${e}`));
            console.log(
              `  ${route} ${n} #${i + 1}: wire=${(s.wire / 1000).toFixed(1)}kB/${s.reqs}req FCP=${s.fcp?.toFixed(0)} LCP=${s.lcp?.toFixed(0)} TBT=${s.tbt.toFixed(0)}`,
            );
          }
        }
        for (const n of names) {
          const keys = Object.keys(samples[n][0]).filter((k) => k !== "errors");
          results[n].load[route] = Object.fromEntries(keys.map((k) => [k, stats(samples[n].map((s) => s[k]))]));
        }
      }

      console.log(`→ metric 3: click → next frame at ${CPU_SLOWDOWN}x CPU (${opts.runs} runs, interleaved)`);
      const frames = Object.fromEntries(names.map((n) => [n, {}]));
      for (let i = 0; i < opts.runs; i++) {
        for (const n of interleave(names, i)) {
          const s = await sampleInteractions(browser, proxyUrl[n]);
          for (const [label, ms] of Object.entries(s.frames)) (frames[n][label] ??= []).push(ms);
          results[n].errors.push(...s.errors.map((e) => `interactions: ${e}`));
          if (i === 0) results[n].digests = s.digests;
          console.log(`  ${n} #${i + 1}: ${Object.values(s.frames).map((x) => x.toFixed(0)).join(" ")} ms`);
        }
      }
      for (const n of names) {
        results[n].inp = Object.fromEntries(Object.entries(frames[n]).map(([k, v]) => [k, stats(v)]));
        const all = Object.values(frames[n]).flat();
        results[n].inp.all = stats(all);
      }
    } finally {
      await browser.close();
    }
  } finally {
    for (const p of proxies) p.close();
    for (const s of servers) stopWorker(s);
  }

  // Metric 5: correctness. Each interaction step's DOM digest must match target 0.
  const [base] = names;
  for (const n of names) {
    results[n].parity_mismatches = results[n].digests
      .map(([label, d], i) => (results[base].digests[i]?.[1] === d ? null : label))
      .filter(Boolean);
    results[n].error_count = results[n].errors.length;
  }
  return { date: new Date().toISOString(), runs: opts.runs, network: NETWORK, cpu_slowdown: CPU_SLOWDOWN, routes: ROUTES, results };
}

// ── report ───────────────────────────────────────────────────────────────────

const f0 = (x) => (x == null ? "—" : x.toFixed(0));
const f1 = (x) => (x == null ? "—" : x.toFixed(1));
const kb = (x) => (x == null ? "—" : (x / 1000).toFixed(1));
const cell = (s, fmt) => (s ? `${fmt(s.p50)} / ${fmt(s.p75)} (${fmt(s.min)}–${fmt(s.max)})` : "—");

export function toMarkdown(report) {
  const names = Object.keys(report.results);
  const R = report.results;
  const lines = [];
  lines.push(`# OOS1 canary: ${names.join(" vs ")}`, "");
  lines.push(`${report.date} · ${report.runs} interleaved runs · Fast 4G (150 ms RTT, 1.6 Mbps) + ${report.cpu_slowdown}x CPU · brotli proxy · cells are p50 / p75 (min–max)`, "");
  const head = `| Metric | ${names.join(" | ")} |`;
  const sep = `| --- | ${names.map(() => "---").join(" | ")} |`;
  for (const route of Object.keys(report.routes)) {
    lines.push(`## ${route} (\`${report.routes[route]}\`)`, "", head, sep);
    const row = (label, key, fmt) => lines.push(`| ${label} | ${names.map((n) => cell(R[n].load[route][key], fmt)).join(" | ")} |`);
    row("Wire before LCP, kB br", "wire", kb);
    row("  document kB", "wire_document", kb);
    row("  CSS kB", "wire_css", kb);
    row("  JS kB", "wire_js", kb);
    row("Requests before LCP", "reqs", f0);
    row("Wire, whole load kB br", "wireAll", kb);
    row("FCP ms", "fcp", f0);
    row("LCP ms", "lcp", f0);
    row("TBT ms", "tbt", f0);
    lines.push("");
  }
  lines.push("## Interaction: click → next frame, ms (4x CPU)", "", head, sep);
  for (const label of Object.keys(R[names[0]].inp)) lines.push(`| ${label} | ${names.map((n) => cell(R[n].inp[label], f1)).join(" | ")} |`);
  lines.push("", "## Edge (workerd via wrangler dev)", "", head, sep);
  lines.push(`| Worker upload gzip KiB | ${names.map((n) => f1(R[n].edge.upload_gzip_kib)).join(" | ")} |`);
  lines.push(`| Worker upload raw KiB | ${names.map((n) => f1(R[n].edge.upload_kib)).join(" | ")} |`);
  lines.push(`| Cold first SSR TTFB ms | ${names.map((n) => cell(R[n].edge.cold_ttfb_ms, f1)).join(" | ")} |`);
  lines.push(`| Warm SSR TTFB ms | ${names.map((n) => cell(R[n].edge.warm_ttfb_ms, f1)).join(" | ")} |`);
  lines.push(`| Warm full HTML ms | ${names.map((n) => cell(R[n].edge.warm_html_total_ms, f1)).join(" | ")} |`);
  lines.push("", "## Correctness", "", head, sep);
  lines.push(`| Page/console errors | ${names.map((n) => R[n].error_count).join(" | ")} |`);
  lines.push(`| Interaction DOM mismatches vs ${names[0]} | ${names.map((n) => R[n].parity_mismatches.length ? R[n].parity_mismatches.join(", ") : "0").join(" | ")} |`);
  const errs = names.flatMap((n) => [...new Set(R[n].errors)].slice(0, 5).map((e) => `- ${n}: ${e}`));
  if (errs.length) lines.push("", "Errors (first 5 unique per target):", "", ...errs);
  return lines.join("\n") + "\n";
}

if (isMain(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2), {
    runs: 7,
    warm: 100,
    coldRuns: 7,
    targets: "react,solid",
    chromium: "",
    out: "perf/solid",
  });
  for (const raw of process.argv.slice(2)) {
    const m = raw.match(/^--(target-[\w-]+)=(.+)$/);
    if (m) args[m[1]] = m[2];
  }
  const report = await measureCanary(args);
  const outDir = join(ROOT, args.out);
  mkdirSync(outDir, { recursive: true });
  const stamp = report.date.slice(0, 16).replace(/[:T]/g, "-");
  writeFileSync(join(outDir, `${stamp}.json`), JSON.stringify(report, null, 2));
  writeFileSync(join(outDir, `${stamp}.md`), toMarkdown(report));
  console.log(toMarkdown(report));
  console.log(`wrote ${relative(ROOT, join(outDir, stamp))}.{json,md}`);
}
