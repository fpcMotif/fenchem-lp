import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { calculateBrotli, measureAttribution, buildTopNModuleTable } from "../lib/attribution.mjs";

test("calculateBrotli compresses buffer and returns valid byte size", () => {
  const text = "A".repeat(5000);
  const buf = Buffer.from(text);
  const brotliSize = calculateBrotli(buf);
  assert.ok(brotliSize > 0);
  assert.ok(brotliSize < buf.length);
});

test("measureAttribution analyzes chunks, buckets, brotli, and modules", () => {
  const tmpDir = mkdtempSync(join(tmpdir(), "fenchem-attr-test-"));
  try {
    writeFileSync(join(tmpDir, "app-main.js"), "console.log('main');" + "x".repeat(2000));
    writeFileSync(join(tmpDir, "vendor-react.js"), "console.log('react');" + "y".repeat(4000));
    writeFileSync(join(tmpDir, "styles.css"), "body { margin: 0; }" + "z".repeat(1000));
    writeFileSync(join(tmpDir, "profiler-scan.js"), "/* @react-scan */" + "p".repeat(500));

    const result = measureAttribution(tmpDir);

    // Buckets
    assert.ok(result.buckets.js.raw > 6500);
    assert.ok(result.buckets.js.gzip > 0);
    assert.ok(result.buckets.js.brotli > 0);
    assert.equal(result.buckets.js.count, 3);
    assert.equal(result.buckets.css.count, 1);

    // Chunks
    assert.equal(result.chunks.length, 4);
    assert.equal(result.chunks[0].name, "vendor-react.js");
    assert.ok(result.chunks[0].brotli > 0);

    // Profiler identification
    assert.ok(result.profiler);
    assert.equal(result.profiler.count, 1);
    assert.ok(result.profiler.raw >= 500);
    assert.ok(result.profiler.brotli > 0);

    // Modules / Top-N
    const topModules = buildTopNModuleTable(result.modules, 5);
    assert.ok(Array.isArray(topModules));
    assert.ok(topModules.length > 0);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
});
