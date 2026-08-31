import { chromium } from "@playwright/test";

interface PageMetrics {
  ttfb: number;
  fcp: number;
  domInteractive: number;
  domComplete: number;
  loadEvent: number;
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const midVal = sorted[mid];
  const midPrev = sorted[mid - 1];
  if (sorted.length % 2 !== 0) {
    return midVal ?? 0;
  }
  return ((midPrev ?? 0) + (midVal ?? 0)) / 2;
}

async function measureRun(url: string): Promise<PageMetrics> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url, { waitUntil: "networkidle" });

  const metrics = await page.evaluate(() => {
    const perf = (globalThis as unknown as { performance: Performance }).performance;
    const navEntries = perf?.getEntriesByType ? perf.getEntriesByType("navigation") : [];
    const nav = navEntries.length > 0 ? (navEntries[0] as unknown as Record<string, number>) : null;
    const paintEntries = perf?.getEntriesByType ? perf.getEntriesByType("paint") : [];
    const fcpEntry = paintEntries.find((e: unknown) => typeof e === "object" && e !== null && "name" in e && e.name === "first-contentful-paint") as { startTime: number } | undefined;

    return {
      ttfb: nav && typeof nav.responseStart === "number" && typeof nav.requestStart === "number" ? nav.responseStart - nav.requestStart : 0,
      fcp: fcpEntry && typeof fcpEntry.startTime === "number" ? fcpEntry.startTime : 0,
      domInteractive: nav && typeof nav.domInteractive === "number" ? nav.domInteractive : 0,
      domComplete: nav && typeof nav.domComplete === "number" ? nav.domComplete : 0,
      loadEvent: nav && typeof nav.loadEventEnd === "number" ? nav.loadEventEnd : 0,
    };
  });

  await browser.close();
  return metrics;
}

export async function runBenchmark(runs = 5, url = "http://127.0.0.1:3001/") {
  console.log(`Starting page speed benchmark (${runs} runs) on ${url}...`);
  const allMetrics: PageMetrics[] = [];

  for (let i = 1; i <= runs; i++) {
    const m = await measureRun(url);
    allMetrics.push(m);
    console.log(
      `  Run ${i}: TTFB=${m.ttfb.toFixed(1)}ms | FCP=${m.fcp.toFixed(1)}ms | DOMInteractive=${m.domInteractive.toFixed(1)}ms | Load=${m.loadEvent.toFixed(1)}ms`,
    );
  }

  const medianMetrics: PageMetrics = {
    ttfb: median(allMetrics.map((m) => m.ttfb)),
    fcp: median(allMetrics.map((m) => m.fcp)),
    domInteractive: median(allMetrics.map((m) => m.domInteractive)),
    domComplete: median(allMetrics.map((m) => m.domComplete)),
    loadEvent: median(allMetrics.map((m) => m.loadEvent)),
  };

  console.log("\n=== Median Web Performance Results (5 runs) ===");
  console.log(`- Time to First Byte (TTFB): ${medianMetrics.ttfb.toFixed(1)} ms`);
  console.log(`- First Contentful Paint (FCP): ${medianMetrics.fcp.toFixed(1)} ms`);
  console.log(`- DOM Interactive: ${medianMetrics.domInteractive.toFixed(1)} ms`);
  console.log(`- DOM Complete: ${medianMetrics.domComplete.toFixed(1)} ms`);
  console.log(`- Total Page Load (Load Event): ${medianMetrics.loadEvent.toFixed(1)} ms`);

  return medianMetrics;
}

if (import.meta.main) {
  const url = process.argv[2] || "http://127.0.0.1:3001/";
  runBenchmark(5, url).catch(console.error);
}
