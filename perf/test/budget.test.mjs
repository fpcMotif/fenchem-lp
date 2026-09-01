import test from "node:test";
import assert from "node:assert/strict";
import { evaluateBudget, defaultBudget } from "../lib/budget.mjs";

test("evaluateBudget passes when metrics are within limits", () => {
  const budget = defaultBudget();
  const entry = {
    assets: {
      total: { raw: 1000000, gzip: 300000, brotli: 250000 },
      chunks: [{ name: "main.js", raw: 500000, gzip: 150000, brotli: 120000 }],
      profiler: { raw: 30000, gzip: 10000, brotli: 8000 },
    },
    trace: {
      phases: [
        { name: "dependency_graph", duration_ms: 1000 },
        { name: "style_compilation", duration_ms: 1000 },
        { name: "server_output", duration_ms: 2000 },
        { name: "client_output", duration_ms: 2000 },
        { name: "asset_write", duration_ms: 500 },
      ],
      total_ms: 6500,
    },
  };

  const result = evaluateBudget(entry, budget, { isCI: false });
  assert.equal(result.ok, true);
  assert.equal(result.errors.length, 0);
  assert.equal(result.warnings.length, 0);
});

test("evaluateBudget reports hard error when total client size breaches budget", () => {
  const budget = defaultBudget();
  const entry = {
    assets: {
      total: { raw: 5000000, gzip: 1500000, brotli: 1200000 }, // exceeds budget
      chunks: [],
      profiler: { raw: 0, gzip: 0, brotli: 0 },
    },
    trace: { phases: [], total_ms: 1000 },
  };

  const result = evaluateBudget(entry, budget, { isCI: false });
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((e) => e.includes("Total client raw size")));
  assert.ok(result.errors.some((e) => e.includes("Total client gzip size")));
});

test("evaluateBudget reports offending chunk name when chunk size breaches budget", () => {
  const budget = defaultBudget();
  const entry = {
    assets: {
      total: { raw: 1000000, gzip: 300000, brotli: 250000 },
      chunks: [{ name: "giant-vendor-bundle.js", raw: 2500000, gzip: 700000, brotli: 600000 }],
      profiler: { raw: 0, gzip: 0, brotli: 0 },
    },
    trace: { phases: [], total_ms: 1000 },
  };

  const result = evaluateBudget(entry, budget, { isCI: false });
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((e) => e.includes("giant-vendor-bundle.js")));
});

test("evaluateBudget treats build duration as advisory warning outside CI, but error in CI", () => {
  const budget = defaultBudget();
  const entry = {
    assets: {
      total: { raw: 100000, gzip: 30000, brotli: 25000 },
      chunks: [],
      profiler: { raw: 0, gzip: 0, brotli: 0 },
    },
    trace: {
      phases: [
        { name: "style_compilation", duration_ms: 999999 }, // breached
      ],
      total_ms: 1000000,
    },
  };

  // Local run (isCI: false) -> advisory warning, ok remains true
  const localResult = evaluateBudget(entry, budget, { isCI: false });
  assert.equal(localResult.ok, true);
  assert.ok(localResult.warnings.some((w) => w.includes("style_compilation")));
  assert.equal(localResult.errors.length, 0);

  // CI run (isCI: true) -> hard error, ok becomes false
  const ciResult = evaluateBudget(entry, budget, { isCI: true });
  assert.equal(ciResult.ok, false);
  assert.ok(ciResult.errors.some((e) => e.includes("style_compilation")));
});
