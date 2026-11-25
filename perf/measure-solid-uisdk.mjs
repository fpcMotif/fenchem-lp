#!/usr/bin/env node
import { chromium } from "@playwright/test";
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import http from "node:http";
import os from "node:os";
import { extname, join, relative } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { brotliCompressSync, constants as zlibConstants, gzipSync } from "node:zlib";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

import { fmtKB, fmtMs, median, parseArgs, percentile } from "./lib/util.mjs";
import { measureAssets } from "./measure-assets.mjs";

const ROOT_B = fileURLToPath(new URL("..", import.meta.url));
const ROOT_A = "/Users/martinfan/devv/fenchem-lp";
const CANARY_PATH = "/Applications/canary.app/Contents/MacOS/Google Chrome Canary";
const CHROME_PATH = existsSync(CANARY_PATH) ? CANARY_PATH : chromium.executablePath();
const OOS1_ROUTES = [
  { key: "home", path: "/?variant=oos1" },
  { key: "products", path: "/?variant=oos1&page=products" },
  { key: "about", path: "/?variant=oos1&page=about" },
];
const BLOCKED_EXTERNAL = ["https://fonts.googleapis.com/*", "https://fonts.gstatic.com/*"];
const LOAD_TIMEOUT_MS = 300_000;
const FAST_4G = {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
};
const COMPRESSIBLE_RE =
  /^(text\/|application\/(javascript|x-javascript|json|xml|wasm)|image\/svg\+xml)/i;

const SIDES = [
  {
    id: "react",
    label: "React (Side A)",
    kind: "react",
    repoRoot: ROOT_A,
    appDir: join(ROOT_A, "apps/web"),
    wranglerBin: join(ROOT_A, "apps/web/node_modules/.bin/wrangler"),
    backendPort: 4291,
    inspectorPort: 5291,
    proxyPort: 4391,
  },
  {
    id: "solid-uisdk",
    label: "Solid 2 + @ui-sdk/solid (Side B)",
    kind: "solid",
    repoRoot: ROOT_B,
    appDir: join(ROOT_B, "apps/web"),
    wranglerBin: join(ROOT_B, "apps/web/node_modules/.bin/wrangler"),
    backendPort: 4292,
    inspectorPort: 5292,
    proxyPort: 4392,
  },
];

function killTree(pid) {
  if (pid == null) return;
  try {
    process.kill(-pid, "SIGKILL");
  } catch {
    try {
      process.kill(pid, "SIGKILL");
    } catch {}
  }
}

async function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      await res.arrayBuffer();
      if (res.status < 500) return;
    } catch {}
    await sleep(250);
  }
  throw new Error(`timeout waiting for ${url}`);
}

function startWrangler(side) {
  let logs = "";
  const child = spawn(
    side.wranglerBin,
    [
      "dev",
      "-c",
      "dist/server/wrangler.json",
      "--port",
      String(side.backendPort),
      "--ip",
      "127.0.0.1",
      "--inspector-port",
      String(side.inspectorPort),
      "--log-level",
      "error",
    ],
    {
      cwd: side.appDir,
      stdio: ["ignore", "pipe", "pipe"],
      detached: true,
      env: {
        ...process.env,
        NO_PROXY: "localhost,127.0.0.1,::1",
        no_proxy: "localhost,127.0.0.1,::1",
        WRANGLER_SEND_METRICS: "false",
      },
    },
  );
  child.stdout.on("data", (chunk) => {
    logs += chunk;
  });
  child.stderr.on("data", (chunk) => {
    logs += chunk;
  });
  return {
    child,
    backendUrl: `http://127.0.0.1:${side.backendPort}`,
    logs: () => logs,
  };
}

async function startBrotliProxy(backendUrl, proxyPort) {
  const staticBrCache = new Map();
  const server = http.createServer((req, res) => {
    const targetUrl = new URL(req.url ?? "/", backendUrl);
    const headers = { ...req.headers, host: targetUrl.host };
    delete headers["accept-encoding"];
    const proxyReq = http.request(targetUrl, { method: req.method, headers }, (proxyRes) => {
      const chunks = [];
      proxyRes.on("data", (c) => chunks.push(c));
      proxyRes.on("end", () => {
        const body = Buffer.concat(chunks);
        const contentType = String(proxyRes.headers["content-type"] ?? "");
        const acceptBr = String(req.headers["accept-encoding"] ?? "").includes("br");
        const outHeaders = { ...proxyRes.headers };
        delete outHeaders["content-encoding"];
        if (acceptBr && body.length > 0 && COMPRESSIBLE_RE.test(contentType)) {
          const isStaticAsset = targetUrl.pathname.startsWith("/assets/");
          let encoded = isStaticAsset ? staticBrCache.get(targetUrl.pathname) : undefined;
          if (!encoded) {
            encoded = brotliCompressSync(body, {
              params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 5 },
            });
            if (isStaticAsset) staticBrCache.set(targetUrl.pathname, encoded);
          }
          outHeaders["content-encoding"] = "br";
          outHeaders["content-length"] = String(encoded.length);
          outHeaders.vary = "Accept-Encoding";
          res.writeHead(proxyRes.statusCode ?? 200, outHeaders);
          res.end(encoded);
          return;
        }
        outHeaders["content-length"] = String(body.length);
        res.writeHead(proxyRes.statusCode ?? 200, outHeaders);
        res.end(body);
      });
    });
    proxyReq.on("error", (err) => {
      res.writeHead(502, { "content-type": "text/plain" });
      res.end(String(err));
    });
    req.pipe(proxyReq);
  });

  await new Promise((resolve) => server.listen(proxyPort, "127.0.0.1", resolve));
  return {
    proxyUrl: `http://127.0.0.1:${proxyPort}`,
    close: () => new Promise((resolve) => server.close(() => resolve())),
  };
}

function walkFiles(dir, ignoreNames = new Set()) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (ignoreNames.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full, ignoreNames));
    else out.push(full);
  }
  return out;
}

function measureDistSizes(appDir) {
  const client = measureAssets(join(appDir, "dist/client"));
  const serverDir = join(appDir, "dist/server");
  const serverFiles = walkFiles(serverDir, new Set([".vite", ".wrangler"]));
  let uploadRaw = 0;
  let uploadGzip = 0;
  let entryRaw = 0;
  let entryGzip = 0;
  const topServer = [];
  for (const file of serverFiles) {
    const rel = relative(serverDir, file);
    if (rel === "wrangler.json" || extname(file) === ".map") continue;
    const buf = readFileSync(file);
    const gz = gzipSync(buf, { level: 9 }).length;
    uploadRaw += buf.length;
    uploadGzip += gz;
    if (rel === "index.js") {
      entryRaw = buf.length;
      entryGzip = gz;
    }
    topServer.push({ file: rel, raw: buf.length, gzip: gz });
  }
  topServer.sort((a, b) => b.gzip - a.gzip);
  return {
    client,
    worker: {
      entryRaw,
      entryGzip,
      uploadRaw,
      uploadGzip,
      fileCount: topServer.length,
      topAssets: topServer.slice(0, 6),
    },
  };
}

function summarize(nums) {
  const clean = nums.filter((v) => typeof v === "number" && Number.isFinite(v));
  if (clean.length === 0) return { n: 0, median: null, p75: null, min: null, max: null };
  return {
    n: clean.length,
    median: median(clean),
    p75: percentile(clean, 0.75),
    min: Math.min(...clean),
    max: Math.max(...clean),
  };
}

function perfInitScript() {
  window.__perf = {
    fcp: 0,
    lcp: 0,
    cls: 0,
    longTasks: [],
  };
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") window.__perf.fcp = entry.startTime;
      }
    }).observe({ type: "paint", buffered: true });
  } catch {}
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) window.__perf.lcp = last.renderTime || last.loadTime || last.startTime || 0;
    }).observe({ type: "largest-contentful-paint", buffered: true });
  } catch {}
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__perf.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  } catch {}
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__perf.longTasks.push({ start: entry.startTime, duration: entry.duration });
      }
    }).observe({ type: "longtask", buffered: true });
  } catch {}
}

async function waitHydrated(page, kind) {
  if (kind === "solid") {
    await page.waitForFunction(() => document.documentElement.hasAttribute("data-hydrated"), {
      timeout: 30_000,
    });
    return;
  }
  await page.waitForFunction(
    () =>
      document.readyState === "complete" &&
      [...document.querySelectorAll("button")].some((el) =>
        Object.keys(el).some((k) => k.startsWith("__reactProps$")),
      ),
    { timeout: 30_000 },
  );
}

function trackErrors(page, proxyOrigin) {
  const errors = { pageErrors: [], consoleErrors: [], http5xx: [] };
  page.on("pageerror", (e) => errors.pageErrors.push(e.message));
  page.on("response", (r) => {
    if (r.url().startsWith(proxyOrigin) && r.status() >= 500) {
      errors.http5xx.push(`${r.status()} ${r.url()}`);
    }
  });
  page.on("console", (m) => {
    const text = m.text();
    if (m.location().url.endsWith("/favicon.ico")) return;
    if (text.includes("ERR_BLOCKED_BY_CLIENT")) return;
    if (m.type() === "error" || /hydration key miss|hydration mismatch|unclaimed/i.test(text)) {
      errors.consoleErrors.push(text);
    }
  });
  return errors;
}

async function measureColdLoad(browser, proxyUrl, side, route) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await page.addInitScript(perfInitScript);
  const errors = trackErrors(page, proxyUrl);

  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.setBlockedURLs", { urls: BLOCKED_EXTERNAL });
  await cdp.send("Network.emulateNetworkConditions", FAST_4G);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  const reqs = new Map();
  cdp.on("Network.requestWillBeSent", (ev) => {
    if (ev.request.url.startsWith(proxyUrl)) {
      reqs.set(ev.requestId, { url: ev.request.url, type: ev.type, encodedBytes: 0, mimeType: "" });
    }
  });
  cdp.on("Network.responseReceived", (ev) => {
    const item = reqs.get(ev.requestId);
    if (item) {
      item.type = ev.type;
      item.mimeType = ev.response.mimeType || "";
    }
  });
  cdp.on("Network.loadingFinished", (ev) => {
    const item = reqs.get(ev.requestId);
    if (item) item.encodedBytes = ev.encodedDataLength;
  });

  await page.goto(proxyUrl + route.path, { waitUntil: "load", timeout: LOAD_TIMEOUT_MS });
  await waitHydrated(page, side.kind);

  let lastLcp = -1;
  let stable = 0;
  for (let i = 0; i < 18; i++) {
    const lcp = await page.evaluate(() => window.__perf.lcp);
    if (lcp > 0 && Math.abs(lcp - lastLcp) < 0.5) {
      stable++;
      if (stable >= 3) break;
    } else {
      stable = 0;
    }
    lastLcp = lcp;
    await sleep(180);
  }

  const timing = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const resources = performance
      .getEntriesByType("resource")
      .filter((r) => r.name.startsWith(location.origin));
    const lcp = window.__perf.lcp || window.__perf.fcp;
    const fcp = window.__perf.fcp;
    const settledAt = Math.max(lcp, nav?.loadEventEnd ?? 0, fcp);
    const tbtMs = window.__perf.longTasks
      .filter((t) => t.start + t.duration > fcp && t.start <= settledAt + 300)
      .reduce((acc, t) => acc + Math.max(0, t.duration - 50), 0);
    const reqBeforeLcp = 1 + resources.filter((r) => lcp > 0 && r.responseEnd <= lcp + 5).length;
    return {
      ttfbMs: nav ? nav.responseStart - nav.requestStart : 0,
      fcpMs: fcp,
      lcpMs: lcp,
      cls: window.__perf.cls,
      tbtMs,
      reqBeforeLcp,
    };
  });

  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  const wire = { htmlBr: 0, cssBr: 0, jsBr: 0, otherBr: 0, totalBr: 0, reqTotal: reqs.size };
  for (const r of reqs.values()) {
    wire.totalBr += r.encodedBytes;
    if (r.type === "Document") wire.htmlBr += r.encodedBytes;
    else if (r.type === "Stylesheet") wire.cssBr += r.encodedBytes;
    else if (r.type === "Script") wire.jsBr += r.encodedBytes;
    else wire.otherBr += r.encodedBytes;
  }

  await context.close();
  return { route: route.key, ...timing, wire, errors };
}

async function timeClickAction(page, runClick) {
  await page.evaluate(() => {
    window.__clickProbe = { t0: 0, commitMs: 0, frameMs: 0 };
    const onCaptureClick = () => {
      const t0 = performance.now();
      window.__clickProbe.t0 = t0;
      queueMicrotask(() => {
        setTimeout(() => {
          window.__clickProbe.commitMs = performance.now() - t0;
        }, 0);
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.__clickProbe.frameMs = performance.now() - t0;
        });
      });
    };
    window.addEventListener("click", onCaptureClick, { capture: true, once: true });
  });
  await runClick();
  await page.waitForFunction(() => window.__clickProbe.frameMs > 0, { timeout: 15_000 });
  return page.evaluate(() => ({
    commitMs: window.__clickProbe.commitMs,
    frameMs: window.__clickProbe.frameMs,
  }));
}

async function measureInteractionsAndExpressiveness(browser, proxyUrl, side) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  const errors = trackErrors(page, proxyUrl);
  await cdp.send("Network.enable");
  await cdp.send("Network.setBlockedURLs", { urls: BLOCKED_EXTERNAL });

  // Home interactions
  await page.goto(proxyUrl + "/?variant=oos1", { waitUntil: "load", timeout: LOAD_TIMEOUT_MS });
  await waitHydrated(page, side.kind);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  const newsTrigger = page.locator("#news button[aria-expanded]").first();
  await newsTrigger.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
  await sleep(120);
  const newsTiming = await timeClickAction(page, () => newsTrigger.click());
  const newsExpanded = (await newsTrigger.getAttribute("aria-expanded")) === "true";
  await newsTrigger.click();

  const ctaBtn = page.locator("#contact button", { hasText: "联系我们" }).first();
  await ctaBtn.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
  await sleep(180);
  const dialogTiming = await timeClickAction(page, () => ctaBtn.click());
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  const selectTrigger = dialog.getByRole("combobox");
  await selectTrigger.click();
  const optionTech = page.getByRole("option", { name: /技术咨询/ });
  await optionTech.waitFor({ state: "visible" });
  await optionTech.click();
  const selectSwitched = (await selectTrigger.innerText()).includes("技术咨询");
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });

  // Products interactions
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  await page.goto(proxyUrl + "/?variant=oos1&page=products", {
    waitUntil: "load",
    timeout: LOAD_TIMEOUT_MS,
  });
  await waitHydrated(page, side.kind);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  const catButtons = page.locator('[aria-label="Categories"] button');
  await catButtons
    .nth(1)
    .evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
  await sleep(120);
  const categoryTiming = await timeClickAction(page, () => catButtons.nth(1).click());
  const catPressed = (await catButtons.nth(1).getAttribute("aria-pressed")) === "true";
  await catButtons.nth(0).click();

  const catalogRow0 = page.locator("#products-catalog button[aria-expanded]").first();
  await catalogRow0.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
  await sleep(120);
  const catalogTiming = await timeClickAction(page, () => catalogRow0.click());
  const catalogExpanded = (await catalogRow0.getAttribute("aria-expanded")) === "true";

  const areaChips = page.locator('#products-solutions [aria-label="按应用领域筛选"] button');
  await areaChips
    .nth(1)
    .evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
  await sleep(120);
  await areaChips.nth(1).click();
  const areaPressed = (await areaChips.nth(1).getAttribute("aria-pressed")) === "true";
  await areaChips.nth(0).click();

  const solTabs = page.locator('#products-solutions [role="tab"]');
  await solTabs.first().focus();
  await page.keyboard.press("ArrowDown");
  const tabArrowDown = (await solTabs.nth(1).getAttribute("aria-selected")) === "true";

  // About lightbox
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  await page.goto(proxyUrl + "/?variant=oos1&page=about", {
    waitUntil: "load",
    timeout: LOAD_TIMEOUT_MS,
  });
  await waitHydrated(page, side.kind);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  const frontCard = page.locator('#about-campus [aria-label^="View larger:"]').first();
  await frontCard.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
  await sleep(120);
  const lightboxTiming = await timeClickAction(page, () => frontCard.click());
  const lightbox = page.getByRole("dialog", { name: "Campus photos" });
  await lightbox.waitFor({ state: "visible" });
  await page.keyboard.press("Escape");
  await lightbox.waitFor({ state: "hidden" });

  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  await context.close();
  return {
    timings: {
      newsToggle: newsTiming,
      dialogOpen: dialogTiming,
      categorySwitch: categoryTiming,
      catalogExpand: catalogTiming,
      lightboxOpen: lightboxTiming,
    },
    assertions: {
      newsExpanded,
      selectSwitched,
      catPressed,
      catalogExpanded,
      areaPressed,
      tabArrowDown,
      lightboxClosed: true,
    },
    errors,
  };
}

function readMetricsMap(metricsList) {
  const map = new Map();
  for (const m of metricsList) map.set(m.name, m.value);
  return {
    jsHeapUsedBytes: map.get("JSHeapUsedSize") ?? 0,
    jsHeapTotalBytes: map.get("JSHeapTotalSize") ?? 0,
    nodes: map.get("Nodes") ?? 0,
    listeners: map.get("JSEventListeners") ?? 0,
    scriptDurationS: map.get("ScriptDuration") ?? 0,
    layoutDurationS: map.get("LayoutDuration") ?? 0,
    recalcStyleDurationS: map.get("RecalcStyleDuration") ?? 0,
    taskDurationS: map.get("TaskDuration") ?? 0,
  };
}

async function settledMetrics(cdp) {
  await cdp.send("HeapProfiler.collectGarbage");
  await sleep(60);
  await cdp.send("HeapProfiler.collectGarbage");
  const { metrics } = await cdp.send("Performance.getMetrics");
  return readMetricsMap(metrics);
}

async function measureMemoryAndStress(browser, proxyUrl, side) {
  const routeInit = {};
  for (const route of OOS1_ROUTES) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.setBlockedURLs", { urls: BLOCKED_EXTERNAL });
    await cdp.send("Performance.enable");
    await cdp.send("HeapProfiler.enable");
    await page.goto(proxyUrl + route.path, { waitUntil: "load", timeout: LOAD_TIMEOUT_MS });
    await waitHydrated(page, side.kind);
    await sleep(300);
    const m = await settledMetrics(cdp);
    routeInit[route.key] = {
      heapBytes: m.jsHeapUsedBytes,
      nodes: m.nodes,
      listeners: m.listeners,
    };

    if (route.key === "home") {
      let peakHeapBytes = m.jsHeapUsedBytes;
      const newsTrigger = page.locator("#news button[aria-expanded]").first();
      const ctaBtn = page.locator("#contact button", { hasText: "联系我们" }).first();
      // 4 iterations * 5 interactions = 20 interaction steps
      for (let i = 0; i < 4; i++) {
        await newsTrigger.evaluate((el) =>
          el.scrollIntoView({ behavior: "instant", block: "center" }),
        );
        await sleep(50);
        await newsTrigger.click();
        await newsTrigger.click();
        await ctaBtn.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
        await sleep(60);
        await ctaBtn.click();
        const dialog = page.getByRole("dialog");
        await dialog.waitFor({ state: "visible" });
        const cb = dialog.getByRole("combobox");
        await cb.click();
        const opt = page.getByRole("option", { name: i % 2 === 0 ? /技术咨询/ : /商务咨询/ });
        await opt.waitFor({ state: "visible" });
        await opt.click();
        const sample = readMetricsMap((await cdp.send("Performance.getMetrics")).metrics);
        if (sample.jsHeapUsedBytes > peakHeapBytes) peakHeapBytes = sample.jsHeapUsedBytes;
        await page.keyboard.press("Escape");
        await dialog.waitFor({ state: "hidden" });
      }
      await sleep(500);
      const after = await settledMetrics(cdp);
      routeInit.stress = {
        initHeapBytes: m.jsHeapUsedBytes,
        peakHeapBytes,
        settledHeapBytes: after.jsHeapUsedBytes,
        retentionDeltaBytes: after.jsHeapUsedBytes - m.jsHeapUsedBytes,
        initNodes: m.nodes,
        afterNodes: after.nodes,
        nodesDelta: after.nodes - m.nodes,
        initListeners: m.listeners,
        afterListeners: after.listeners,
        listenersDelta: after.listeners - m.listeners,
      };
    }

    await context.close();
  }
  return routeInit;
}

async function measureSsrTtfb(backendUrl, runs) {
  const cold = {};
  for (const route of OOS1_ROUTES) {
    const t0 = performance.now();
    const res = await fetch(backendUrl + route.path);
    await res.text();
    cold[route.key] = performance.now() - t0;
  }
  const warm = Object.fromEntries(OOS1_ROUTES.map((r) => [r.key, []]));
  for (let i = 0; i < runs; i++) {
    for (const route of OOS1_ROUTES) {
      const t0 = performance.now();
      const res = await fetch(backendUrl + route.path);
      await res.text();
      warm[route.key].push(performance.now() - t0);
    }
  }
  return {
    cold,
    warm: Object.fromEntries(OOS1_ROUTES.map((r) => [r.key, summarize(warm[r.key])])),
  };
}

async function runLimiterPass(browser, proxyUrl, side) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await page.addInitScript(perfInitScript);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.setBlockedURLs", { urls: BLOCKED_EXTERNAL });
  await cdp.send("Network.emulateNetworkConditions", FAST_4G);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await cdp.send("Performance.enable");
  await cdp.send("HeapProfiler.enable");

  const assets = [];
  const meta = new Map();
  cdp.on("Network.requestWillBeSent", (ev) => {
    if (ev.request.url.startsWith(proxyUrl)) {
      meta.set(ev.requestId, { url: new URL(ev.request.url).pathname, type: ev.type });
    }
  });
  cdp.on("Network.loadingFinished", (ev) => {
    const item = meta.get(ev.requestId);
    if (item) assets.push({ ...item, brBytes: ev.encodedDataLength });
  });

  await page.goto(proxyUrl + "/?variant=oos1", { waitUntil: "load", timeout: LOAD_TIMEOUT_MS });
  await waitHydrated(page, side.kind);
  await sleep(600);
  const loadMetrics = readMetricsMap((await cdp.send("Performance.getMetrics")).metrics);
  const settled = await settledMetrics(cdp);
  assets.sort((a, b) => b.brBytes - a.brBytes);
  await context.close();
  return {
    loadMetrics,
    settled,
    topAssetsBr: assets.slice(0, 8),
  };
}

async function captureVisualDiffs(browser, sideAProxy, sideBProxy, cacheDir) {
  mkdirSync(cacheDir, { recursive: true });
  const viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ];
  const results = [];
  for (const vp of viewports) {
    for (const route of OOS1_ROUTES) {
      const snaps = {};
      for (const [id, url] of [
        ["a", sideAProxy],
        ["b", sideBProxy],
      ]) {
        const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        const page = await ctx.newPage();
        const cdp = await ctx.newCDPSession(page);
        await cdp.send("Network.enable");
        await cdp.send("Network.setBlockedURLs", { urls: BLOCKED_EXTERNAL });
        await page.goto(url + route.path, { waitUntil: "load", timeout: LOAD_TIMEOUT_MS });
        await waitHydrated(page, id === "a" ? "react" : "solid");
        await sleep(600);
        const file = join(cacheDir, `${id}-${route.key}-${vp.name}.png`);
        await page.screenshot({ path: file, fullPage: false });
        snaps[id] = file;
        await ctx.close();
      }
      const pngA = PNG.sync.read(readFileSync(snaps.a));
      const pngB = PNG.sync.read(readFileSync(snaps.b));
      const width = Math.min(pngA.width, pngB.width);
      const height = Math.min(pngA.height, pngB.height);
      const diff = new PNG({ width, height });
      const mismatched = pixelmatch(pngA.data, pngB.data, diff.data, width, height, {
        threshold: 0.1,
      });
      const diffPct = (mismatched / (width * height)) * 100;
      const diffPath = join(cacheDir, `diff-${route.key}-${vp.name}.png`);
      writeFileSync(diffPath, PNG.sync.write(diff));
      results.push({
        route: route.key,
        viewport: vp.name,
        diffPct: Number(diffPct.toFixed(2)),
        mismatched,
        totalPixels: width * height,
      });
    }
  }
  return results;
}

function fmtMiB(bytes) {
  if (bytes == null) return "—";
  return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}

function fmtStat(stat, formatFn) {
  if (!stat || stat.n === 0 || stat.median == null) return "—";
  return `${formatFn(stat.median)} (p75 ${formatFn(stat.p75)}, ${formatFn(stat.min)}–${formatFn(stat.max)})`;
}

function fmtDeltaPct(aVal, bVal) {
  if (!aVal || aVal === 0 || bVal == null) return "—";
  const pct = ((bVal - aVal) / aVal) * 100;
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
}

function aggregateSide(sideRounds, ssr) {
  const byRoute = {};
  for (const r of OOS1_ROUTES) {
    const samples = sideRounds.map((x) => x.cold[r.key]);
    byRoute[r.key] = {
      ttfbMs: summarize(samples.map((s) => s.ttfbMs)),
      fcpMs: summarize(samples.map((s) => s.fcpMs)),
      lcpMs: summarize(samples.map((s) => s.lcpMs)),
      cls: summarize(samples.map((s) => s.cls)),
      tbtMs: summarize(samples.map((s) => s.tbtMs)),
      reqBeforeLcp: summarize(samples.map((s) => s.reqBeforeLcp)),
      reqTotal: summarize(samples.map((s) => s.wire.reqTotal)),
      htmlBr: summarize(samples.map((s) => s.wire.htmlBr)),
      cssBr: summarize(samples.map((s) => s.wire.cssBr)),
      jsBr: summarize(samples.map((s) => s.wire.jsBr)),
      totalBr: summarize(samples.map((s) => s.wire.totalBr)),
      ssrWarmMs: ssr.warm[r.key],
      ssrColdMs: ssr.cold[r.key],
    };
  }
  const interactionKeys = [
    "newsToggle",
    "dialogOpen",
    "categorySwitch",
    "catalogExpand",
    "lightboxOpen",
  ];
  const interactions = {};
  for (const k of interactionKeys) {
    interactions[k] = {
      commitMs: summarize(sideRounds.map((x) => x.interactive.timings[k].commitMs)),
      frameMs: summarize(sideRounds.map((x) => x.interactive.timings[k].frameMs)),
    };
  }
  const memory = {
    homeInitHeapBytes: summarize(sideRounds.map((x) => x.memory.home.heapBytes)),
    productsInitHeapBytes: summarize(sideRounds.map((x) => x.memory.products.heapBytes)),
    aboutInitHeapBytes: summarize(sideRounds.map((x) => x.memory.about.heapBytes)),
    stressPeakHeapBytes: summarize(sideRounds.map((x) => x.memory.stress.peakHeapBytes)),
    stressSettledHeapBytes: summarize(sideRounds.map((x) => x.memory.stress.settledHeapBytes)),
    stressRetentionDeltaBytes: summarize(
      sideRounds.map((x) => x.memory.stress.retentionDeltaBytes),
    ),
    initNodes: summarize(sideRounds.map((x) => x.memory.stress.initNodes)),
    afterNodes: summarize(sideRounds.map((x) => x.memory.stress.afterNodes)),
    nodesDelta: summarize(sideRounds.map((x) => x.memory.stress.nodesDelta)),
    initListeners: summarize(sideRounds.map((x) => x.memory.stress.initListeners)),
    afterListeners: summarize(sideRounds.map((x) => x.memory.stress.afterListeners)),
    listenersDelta: summarize(sideRounds.map((x) => x.memory.stress.listenersDelta)),
  };
  const totalErrors = sideRounds.reduce(
    (acc, x) => {
      for (const r of OOS1_ROUTES) {
        acc.pageErrors += x.cold[r.key].errors.pageErrors.length;
        acc.consoleErrors += x.cold[r.key].errors.consoleErrors.length;
        acc.http5xx += x.cold[r.key].errors.http5xx.length;
      }
      acc.pageErrors += x.interactive.errors.pageErrors.length;
      acc.consoleErrors += x.interactive.errors.consoleErrors.length;
      acc.http5xx += x.interactive.errors.http5xx.length;
      return acc;
    },
    { pageErrors: 0, consoleErrors: 0, http5xx: 0 },
  );
  const allAssertionsPassed = sideRounds.every((x) =>
    Object.values(x.interactive.assertions).every(Boolean),
  );
  return { byRoute, interactions, memory, totalErrors, allAssertionsPassed };
}

function buildMarkdown(report) {
  const a = report.sides.react;
  const b = report.sides["solid-uisdk"];
  const lines = [];
  lines.push(`# React vs Solid 2 + @ui-sdk/solid Benchmark (OOS1)`);
  lines.push("");
  lines.push(`- Timestamp: ${report.timestamp}`);
  lines.push(
    `- Host: ${report.env.cpus} CPUs, Chrome ${report.env.chromeVersion}, \`uptime\`: ${report.env.uptimeBefore}`,
  );
  lines.push(
    `- Rounds: ${report.runs} interleaved (A, B, A, B, ...) under Fast 4G + 4x CPU for loads/clicks; 1x CPU + double GC for memory`,
  );
  lines.push(
    `- Revisions: Side A \`${report.env.sideAHead}\` | Side B \`${report.env.sideBHead}\``,
  );
  lines.push(
    `- Confound: Side A has uncommitted OOS1 data additions (+1,535 / -148 lines, e.g., extra products/solutions entries); Side B matches earlier main OOS1 content.`,
  );
  lines.push("");
  lines.push(`## Bundle & Worker Footprint`);
  lines.push("");
  lines.push(`| Artifact | Side A (React) | Side B (Solid 2 + ui-sdk) | Delta |`);
  lines.push(`| --- | ---: | ---: | ---: |`);
  lines.push(
    `| Client dist JS (gzip / raw) | ${fmtKB(a.dist.client.buckets.js.gzip)} / ${fmtKB(a.dist.client.buckets.js.raw)} | ${fmtKB(b.dist.client.buckets.js.gzip)} / ${fmtKB(b.dist.client.buckets.js.raw)} | ${fmtDeltaPct(a.dist.client.buckets.js.gzip, b.dist.client.buckets.js.gzip)} |`,
  );
  lines.push(
    `| Client dist CSS (gzip / raw) | ${fmtKB(a.dist.client.buckets.css.gzip)} / ${fmtKB(a.dist.client.buckets.css.raw)} | ${fmtKB(b.dist.client.buckets.css.gzip)} / ${fmtKB(b.dist.client.buckets.css.raw)} | ${fmtDeltaPct(a.dist.client.buckets.css.gzip, b.dist.client.buckets.css.gzip)} |`,
  );
  lines.push(
    `| Worker entry \`index.js\` (gzip / raw) | ${fmtKB(a.dist.worker.entryGzip)} / ${fmtKB(a.dist.worker.entryRaw)} | ${fmtKB(b.dist.worker.entryGzip)} / ${fmtKB(b.dist.worker.entryRaw)} | ${fmtDeltaPct(a.dist.worker.entryGzip, b.dist.worker.entryGzip)} |`,
  );
  lines.push(
    `| Worker full upload (gzip / raw) | ${fmtKB(a.dist.worker.uploadGzip)} / ${fmtKB(a.dist.worker.uploadRaw)} | ${fmtKB(b.dist.worker.uploadGzip)} / ${fmtKB(b.dist.worker.uploadRaw)} | ${fmtDeltaPct(a.dist.worker.uploadGzip, b.dist.worker.uploadGzip)} |`,
  );
  lines.push("");
  lines.push(`## Load Latency & Wire Bytes (Fast 4G + 4x CPU, n=${report.runs})`);
  lines.push("");
  lines.push(`| Route / Metric | Side A (React) | Side B (Solid 2 + ui-sdk) | Delta (median) |`);
  lines.push(`| --- | --- | --- | ---: |`);
  for (const r of OOS1_ROUTES) {
    const ar = a.summary.byRoute[r.key];
    const br = b.summary.byRoute[r.key];
    lines.push(
      `| **${r.key}** JS wire (br) | ${fmtStat(ar.jsBr, fmtKB)} | ${fmtStat(br.jsBr, fmtKB)} | ${fmtDeltaPct(ar.jsBr.median, br.jsBr.median)} |`,
    );
    lines.push(
      `| **${r.key}** Total wire (br) | ${fmtStat(ar.totalBr, fmtKB)} | ${fmtStat(br.totalBr, fmtKB)} | ${fmtDeltaPct(ar.totalBr.median, br.totalBr.median)} |`,
    );
    lines.push(
      `| **${r.key}** Reqs (before LCP / total) | ${ar.reqBeforeLcp.median} / ${ar.reqTotal.median} | ${br.reqBeforeLcp.median} / ${br.reqTotal.median} | ${fmtDeltaPct(ar.reqBeforeLcp.median, br.reqBeforeLcp.median)} |`,
    );
    lines.push(
      `| **${r.key}** FCP | ${fmtStat(ar.fcpMs, fmtMs)} | ${fmtStat(br.fcpMs, fmtMs)} | ${fmtDeltaPct(ar.fcpMs.median, br.fcpMs.median)} |`,
    );
    lines.push(
      `| **${r.key}** LCP | ${fmtStat(ar.lcpMs, fmtMs)} | ${fmtStat(br.lcpMs, fmtMs)} | ${fmtDeltaPct(ar.lcpMs.median, br.lcpMs.median)} |`,
    );
    lines.push(
      `| **${r.key}** TBT | ${fmtStat(ar.tbtMs, fmtMs)} | ${fmtStat(br.tbtMs, fmtMs)} | ${fmtDeltaPct(ar.tbtMs.median, br.tbtMs.median)} |`,
    );
    lines.push(
      `| **${r.key}** Warm SSR TTFB (direct) | ${fmtStat(ar.ssrWarmMs, fmtMs)} | ${fmtStat(br.ssrWarmMs, fmtMs)} | ${fmtDeltaPct(ar.ssrWarmMs.median, br.ssrWarmMs.median)} |`,
    );
  }
  lines.push("");
  lines.push(`## Interaction Latency (4x CPU, n=${report.runs})`);
  lines.push("");
  lines.push(
    `| Interaction | Metric | Side A (React) | Side B (Solid 2 + ui-sdk) | Delta (median) |`,
  );
  lines.push(`| --- | --- | --- | --- | ---: |`);
  for (const [k, label] of [
    ["newsToggle", "Home NewsAccordion"],
    ["dialogOpen", "Home SplitDialog Open"],
    ["categorySwitch", "Products Category Toggle"],
    ["catalogExpand", "Products Catalog Collapsible"],
    ["lightboxOpen", "About Lightbox Open"],
  ]) {
    const ai = a.summary.interactions[k];
    const bi = b.summary.interactions[k];
    lines.push(
      `| ${label} | commit/task | ${fmtStat(ai.commitMs, fmtMs)} | ${fmtStat(bi.commitMs, fmtMs)} | ${fmtDeltaPct(ai.commitMs.median, bi.commitMs.median)} |`,
    );
    lines.push(
      `| ${label} | next paint frame | ${fmtStat(ai.frameMs, fmtMs)} | ${fmtStat(bi.frameMs, fmtMs)} | ${fmtDeltaPct(ai.frameMs.median, bi.frameMs.median)} |`,
    );
  }
  lines.push("");
  lines.push(`## Memory & DOM Retention (1x CPU, Double GC, n=${report.runs})`);
  lines.push("");
  lines.push(`| Metric | Side A (React) | Side B (Solid 2 + ui-sdk) | Delta (median) |`);
  lines.push(`| --- | --- | --- | ---: |`);
  const am = a.summary.memory;
  const bm = b.summary.memory;
  lines.push(
    `| Home initial JSHeapUsed | ${fmtStat(am.homeInitHeapBytes, fmtMiB)} | ${fmtStat(bm.homeInitHeapBytes, fmtMiB)} | ${fmtDeltaPct(am.homeInitHeapBytes.median, bm.homeInitHeapBytes.median)} |`,
  );
  lines.push(
    `| Products initial JSHeapUsed | ${fmtStat(am.productsInitHeapBytes, fmtMiB)} | ${fmtStat(bm.productsInitHeapBytes, fmtMiB)} | ${fmtDeltaPct(am.productsInitHeapBytes.median, bm.productsInitHeapBytes.median)} |`,
  );
  lines.push(
    `| About initial JSHeapUsed | ${fmtStat(am.aboutInitHeapBytes, fmtMiB)} | ${fmtStat(bm.aboutInitHeapBytes, fmtMiB)} | ${fmtDeltaPct(am.aboutInitHeapBytes.median, bm.aboutInitHeapBytes.median)} |`,
  );
  lines.push(
    `| 20-step stress Peak JSHeapUsed | ${fmtStat(am.stressPeakHeapBytes, fmtMiB)} | ${fmtStat(bm.stressPeakHeapBytes, fmtMiB)} | ${fmtDeltaPct(am.stressPeakHeapBytes.median, bm.stressPeakHeapBytes.median)} |`,
  );
  lines.push(
    `| Post-stress Settled JSHeapUsed | ${fmtStat(am.stressSettledHeapBytes, fmtMiB)} | ${fmtStat(bm.stressSettledHeapBytes, fmtMiB)} | ${fmtDeltaPct(am.stressSettledHeapBytes.median, bm.stressSettledHeapBytes.median)} |`,
  );
  lines.push(
    `| Heap Retention Delta | ${fmtStat(am.stressRetentionDeltaBytes, fmtKB)} | ${fmtStat(bm.stressRetentionDeltaBytes, fmtKB)} | — |`,
  );
  lines.push(
    `| DOM Nodes (initial -> after, delta) | ${am.initNodes.median} -> ${am.afterNodes.median} (${am.nodesDelta.median >= 0 ? "+" : ""}${am.nodesDelta.median}) | ${bm.initNodes.median} -> ${bm.afterNodes.median} (${bm.nodesDelta.median >= 0 ? "+" : ""}${bm.nodesDelta.median}) | ${fmtDeltaPct(am.initNodes.median, bm.initNodes.median)} |`,
  );
  lines.push(
    `| JSEventListeners (initial -> after, delta) | ${am.initListeners.median} -> ${am.afterListeners.median} (${am.listenersDelta.median >= 0 ? "+" : ""}${am.listenersDelta.median}) | ${bm.initListeners.median} -> ${bm.afterListeners.median} (${bm.listenersDelta.median >= 0 ? "+" : ""}${bm.listenersDelta.median}) | ${fmtDeltaPct(am.initListeners.median, bm.initListeners.median)} |`,
  );
  lines.push("");
  lines.push(`## Errors, Assertions & Visual Diff`);
  lines.push("");
  lines.push(
    `- Side A errors: pageErrors=${a.summary.totalErrors.pageErrors}, consoleErrors=${a.summary.totalErrors.consoleErrors}, http5xx=${a.summary.totalErrors.http5xx}, assertions=${a.summary.allAssertionsPassed}`,
  );
  lines.push(
    `- Side B errors: pageErrors=${b.summary.totalErrors.pageErrors}, consoleErrors=${b.summary.totalErrors.consoleErrors}, http5xx=${b.summary.totalErrors.http5xx}, assertions=${b.summary.allAssertionsPassed}`,
  );
  lines.push("");
  lines.push(`| Route | Viewport | Pixelmatch Diff % | Notes |`);
  lines.push(`| --- | --- | ---: | --- |`);
  for (const v of report.visualDiffs) {
    lines.push(
      `| ${v.route} | ${v.viewport} | ${v.diffPct}% | Includes Side A uncommitted OOS1 data additions |`,
    );
  }
  lines.push("");
  lines.push(`## Separate Non-Reported Limiter Profile (Home)`);
  lines.push("");
  for (const [id, label] of [
    ["react", "Side A (React)"],
    ["solid-uisdk", "Side B (Solid 2 + ui-sdk)"],
  ]) {
    const lim = report.sides[id].limiter;
    lines.push(
      `- **${label}**: Script=${fmtMs(lim.loadMetrics.scriptDurationS * 1000)}, Layout=${fmtMs(lim.loadMetrics.layoutDurationS * 1000)}, RecalcStyle=${fmtMs(lim.loadMetrics.recalcStyleDurationS * 1000)}, Task=${fmtMs(lim.loadMetrics.taskDurationS * 1000)}, Nodes=${lim.settled.nodes}, Listeners=${lim.settled.listeners}, Heap=${fmtMiB(lim.settled.jsHeapUsedBytes)}`,
    );
    lines.push(
      `  Top br assets: ${lim.topAssetsBr.map((x) => `${x.url.split("/").pop()} (${fmtKB(x.brBytes)})`).join(", ")}`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2), { runs: 5, out: "perf/solid-uisdk" });
  const runs = Math.max(1, Number(args.runs));
  const outDir = join(ROOT_B, String(args.out));
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const uptimeBefore = execFileSync("uptime", { encoding: "utf8" }).trim();
  const chromeVersion = execFileSync(CHROME_PATH, ["--version"], { encoding: "utf8" }).trim();
  const sideAHead = execFileSync(
    "jj",
    [
      "-R",
      ROOT_A,
      "log",
      "-r",
      "@",
      "--no-graph",
      "-T",
      "change_id.short() ++ ' ' ++ commit_id.short()",
    ],
    { encoding: "utf8" },
  ).trim();
  const sideBHead = execFileSync(
    "jj",
    [
      "-R",
      ROOT_B,
      "log",
      "-r",
      "@",
      "--no-graph",
      "-T",
      "change_id.short() ++ ' ' ++ commit_id.short()",
    ],
    { encoding: "utf8" },
  ).trim();
  console.log(`Starting benchmark (runs=${runs}, cpus=${os.cpus().length}, ${uptimeBefore})`);

  const servers = {};
  let browser;
  try {
    for (const side of SIDES) {
      const dist = measureDistSizes(side.appDir);
      const wrangler = startWrangler(side);
      await waitForServer(wrangler.backendUrl + "/?variant=oos1");
      const proxy = await startBrotliProxy(wrangler.backendUrl, side.proxyPort);
      servers[side.id] = { side, dist, wrangler, proxy, rounds: [] };
    }

    browser = await chromium.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ["--disable-3d-apis"],
    });

    // Separate non-reported limiter pass before interleaved rounds
    for (const side of SIDES) {
      const s = servers[side.id];
      s.limiter = await runLimiterPass(browser, s.proxy.proxyUrl, side);
      s.ssr = await measureSsrTtfb(s.wrangler.backendUrl, runs);
    }

    // 5 interleaved rounds (A, B, A, B, ...)
    for (let round = 0; round < runs; round++) {
      for (const side of SIDES) {
        const s = servers[side.id];
        console.log(`Round ${round + 1}/${runs} — ${side.label}`);
        const cold = {};
        for (const route of OOS1_ROUTES) {
          cold[route.key] = await measureColdLoad(browser, s.proxy.proxyUrl, side, route);
        }
        const interactive = await measureInteractionsAndExpressiveness(
          browser,
          s.proxy.proxyUrl,
          side,
        );
        const memory = await measureMemoryAndStress(browser, s.proxy.proxyUrl, side);
        s.rounds.push({ round: round + 1, cold, interactive, memory });
      }
    }

    const visualDiffs = await captureVisualDiffs(
      browser,
      servers.react.proxy.proxyUrl,
      servers["solid-uisdk"].proxy.proxyUrl,
      join(ROOT_B, ".cache/perf-solid-uisdk", stamp),
    );

    const report = {
      timestamp: new Date().toISOString(),
      runs,
      env: {
        cpus: os.cpus().length,
        loadAvgStart: os.loadavg(),
        uptimeBefore,
        chromeVersion,
        sideAHead,
        sideBHead,
      },
      visualDiffs,
      sides: Object.fromEntries(
        SIDES.map((side) => {
          const s = servers[side.id];
          return [
            side.id,
            {
              dist: s.dist,
              ssr: s.ssr,
              limiter: s.limiter,
              summary: aggregateSide(s.rounds, s.ssr),
              rounds: s.rounds,
            },
          ];
        }),
      ),
    };

    mkdirSync(outDir, { recursive: true });
    const jsonPath = join(outDir, `${stamp}.json`);
    const mdPath = join(outDir, `${stamp}.md`);
    writeFileSync(jsonPath, JSON.stringify(report, null, 2));
    writeFileSync(mdPath, buildMarkdown(report));
    console.log(`\nWrote:\n  ${mdPath}\n  ${jsonPath}`);
  } finally {
    if (browser) await browser.close();
    for (const s of Object.values(servers)) {
      if (s.proxy) await s.proxy.close();
      if (s.wrangler) killTree(s.wrangler.child.pid);
    }
  }
}

await main();
