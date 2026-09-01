import test from "node:test";
import assert from "node:assert/strict";
import {
  STANDARD_PHASES,
  normalizePhaseTrace,
  createBuildTracer,
  parsePhaseTraceLogs,
} from "../lib/trace.mjs";

test("STANDARD_PHASES contains required 5 role-based phases", () => {
  assert.deepEqual(STANDARD_PHASES, [
    "dependency_graph",
    "style_compilation",
    "server_output",
    "client_output",
    "asset_write",
  ]);
});

test("normalizePhaseTrace fills missing phases and normalizes numbers", () => {
  const input = [
    { name: "dependency_graph", start_ms: 0, duration_ms: 120, cached: false },
    { name: "client_output", start_ms: 120, duration_ms: 350, cached: true },
  ];
  const trace = normalizePhaseTrace(input);
  assert.equal(trace.phases.length, 5);
  assert.equal(trace.phases[0].name, "dependency_graph");
  assert.equal(trace.phases[0].duration_ms, 120);
  assert.equal(trace.phases[0].cached, false);

  // Missing phases get 0 duration and cached false
  const stylePhase = trace.phases.find((p) => p.name === "style_compilation");
  assert.ok(stylePhase);
  assert.equal(stylePhase.duration_ms, 0);
  assert.equal(stylePhase.cached, false);

  assert.equal(trace.total_ms, 470);
});

test("createBuildTracer accurately tracks phase transitions and durations", async () => {
  const tracer = createBuildTracer();
  tracer.startPhase("dependency_graph");
  await new Promise((r) => setTimeout(r, 20));
  tracer.endPhase("dependency_graph", { cached: false });

  tracer.startPhase("style_compilation");
  await new Promise((r) => setTimeout(r, 15));
  tracer.endPhase("style_compilation", { cached: true });

  const summary = tracer.finish();
  assert.equal(summary.phases.length, 5);
  const dep = summary.phases.find((p) => p.name === "dependency_graph");
  assert.ok(dep.duration_ms >= 15);
  assert.equal(dep.cached, false);

  const style = summary.phases.find((p) => p.name === "style_compilation");
  assert.ok(style.duration_ms >= 10);
  assert.equal(style.cached, true);
  assert.ok(summary.total_ms >= 25);
});

test("parsePhaseTraceLogs extracts phase timings from structured log output", () => {
  const logs = `
[trace:dependency_graph] start=0ms duration=230ms cached=false
[trace:style_compilation] start=230ms duration=450ms cached=false
[trace:server_output] start=680ms duration=800ms cached=false
[trace:client_output] start=1480ms duration=1200ms cached=false
[trace:asset_write] start=2680ms duration=150ms cached=false
`;
  const trace = parsePhaseTraceLogs(logs);
  assert.equal(trace.phases.length, 5);
  assert.equal(trace.phases[0].duration_ms, 230);
  assert.equal(trace.phases[1].duration_ms, 450);
  assert.equal(trace.phases[2].duration_ms, 800);
  assert.equal(trace.phases[3].duration_ms, 1200);
  assert.equal(trace.phases[4].duration_ms, 150);
  assert.equal(trace.total_ms, 2830);
});
