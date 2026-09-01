import test from "node:test";
import assert from "node:assert/strict";
import { validateFrameworkDelta, computeDelta, renderMarkdownLog } from "../lib/log.mjs";

test("validateFrameworkDelta throws error when diffing different frameworks", () => {
  const tanstackEntry = {
    framework: "tanstack-start",
    stack: "stylex",
    assets: { total: { raw: 1000, gzip: 400, brotli: 350 } },
  };
  const remixEntry = {
    framework: "remix-v3",
    stack: "stylex",
    assets: { total: { raw: 800, gzip: 300, brotli: 250 } },
  };

  assert.throws(
    () => validateFrameworkDelta(tanstackEntry, remixEntry),
    /cross-framework.*invalid/i,
  );
});

test("computeDelta computes valid deltas when frameworks match", () => {
  const baseEntry = {
    framework: "remix-v3",
    stack: "stylex",
    assets: { total: { raw: 1000, gzip: 400, brotli: 350 } },
    build: { web: { mean_ms: 5000 } },
  };
  const nextEntry = {
    framework: "remix-v3",
    stack: "stylex",
    assets: { total: { raw: 800, gzip: 300, brotli: 250 } },
    build: { web: { mean_ms: 4500 } },
  };

  const delta = computeDelta(baseEntry, nextEntry);
  assert.equal(delta.raw_diff_bytes, -200);
  assert.equal(delta.gzip_diff_bytes, -100);
  assert.equal(delta.brotli_diff_bytes, -100);
  assert.equal(delta.build_diff_ms, -500);
});

test("renderMarkdownLog renders table with framework column", () => {
  const entries = [
    {
      date: "2026-09-01T10:00:00.000Z",
      framework: "tanstack-start",
      stack: "stylex",
      git: { commit: "abc1234", dirty: false },
      build: { full: { mean_ms: 6000 }, web: { mean_ms: 5000 } },
      assets: {
        buckets: {
          css: { raw: 100000, gzip: 20000, brotli: 16000 },
          js: { raw: 1500000, gzip: 400000, brotli: 350000 },
          other: { raw: 100, gzip: 100, brotli: 100 },
        },
        total: { raw: 1600100, gzip: 420100, brotli: 366100 },
      },
      coldstart: {
        runs: 5,
        ttfb_median: 50,
        ttfb_p75: 70,
        fcp_median: 1000,
        fcp_p75: 1200,
        lcp_median: 1400,
        lcp_p75: 1600,
        cls_median: 0.001,
        cls_p75: 0.002,
      },
    },
  ];

  const md = renderMarkdownLog(entries);
  assert.ok(md.includes("Framework"));
  assert.ok(md.includes("tanstack-start"));
  assert.ok(md.includes("stylex"));
  assert.ok(md.includes("abc1234"));
});
