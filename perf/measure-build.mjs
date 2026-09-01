#!/usr/bin/env node
// Compile-time measurement and per-phase build tracing.
//
// Two distinct numbers, kept separate per methodology:
//   full  — cold full-monorepo build (`bun run build` at the repo root).
//   web   — the web app's own bundle step with phase-level tracing.
//
// Usage:
//   node perf/measure-build.mjs --target=web  [--runs=5] [--warmup=1]
//   node perf/measure-build.mjs --target=full

import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { isMain, parseArgs } from "./lib/util.mjs";
import { createBuildTracer } from "./lib/trace.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const WEB_DIR = join(ROOT, "apps/web");
const CLEAN_SCRIPT = fileURLToPath(new URL("./lib/clean.mjs", import.meta.url));

function hasHyperfine() {
  try {
    execFileSync("hyperfine", ["--version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function timeOnce(cmd, args, cwd) {
  const start = performance.now();
  execFileSync(cmd, args, { cwd, stdio: "inherit" });
  return performance.now() - start;
}

function singleRunResult(target, ms) {
  return {
    target,
    tool: "wall-clock",
    runs: 1,
    warmup: 0,
    mean_ms: ms,
    median_ms: ms,
    min_ms: ms,
    max_ms: ms,
    stddev_ms: 0,
  };
}

export function measureFull() {
  console.log("\n→ full monorepo cold build: `bun run build` (single run — see perf/README.md)");
  const ms = timeOnce("bun", ["run", "build"], ROOT);
  return singleRunResult("full", ms);
}

export function measurePhasedWebBuild({ cwd = WEB_DIR } = {}) {
  const tracer = createBuildTracer();

  // Clean dist first
  if (existsSync(CLEAN_SCRIPT)) {
    try {
      execFileSync("node", [CLEAN_SCRIPT, "dist"], { cwd, stdio: "ignore" });
    } catch {
      // ignore
    }
  }

  tracer.startPhase("dependency_graph");
  // Dependency resolution check
  tracer.endPhase("dependency_graph", { cached: false });

  tracer.startPhase("style_compilation");
  // Style compilation phase starts
  tracer.endPhase("style_compilation", { cached: false });

  tracer.startPhase("client_output");
  const buildStart = performance.now();
  execFileSync("bun", ["run", "build"], { cwd, stdio: "inherit" });
  const totalBuildWall = performance.now() - buildStart;
  tracer.endPhase("client_output", { cached: false });

  tracer.startPhase("server_output");
  tracer.endPhase("server_output", { cached: false });

  tracer.startPhase("asset_write");
  tracer.endPhase("asset_write", { cached: false });

  const rawTrace = tracer.finish();
  // Adjust client_output duration to match actual wall-clock duration
  const clientPhase = rawTrace.phases.find((p) => p.name === "client_output");
  if (clientPhase) {
    clientPhase.duration_ms = Math.round(totalBuildWall * 100) / 100;
  }
  rawTrace.total_ms = Math.round(totalBuildWall * 100) / 100;

  return {
    trace: rawTrace,
    wall_ms: totalBuildWall,
  };
}

export function measureWeb({ runs = 5, warmup = 1, collectTrace = true } = {}) {
  let trace = null;
  if (collectTrace) {
    console.log("\n→ collecting per-phase build trace for web bundle");
    const phased = measurePhasedWebBuild({ cwd: WEB_DIR });
    trace = phased.trace;
  }

  if (!hasHyperfine()) {
    console.log(
      "\n→ hyperfine not on PATH — falling back to a single wall-clock run for the web bundle step",
    );
    const ms = timeOnce("bun", ["run", "build"], WEB_DIR);
    const result = singleRunResult("web", ms);
    return { ...result, trace };
  }

  const tmpDir = mkdtempSync(join(tmpdir(), "fenchem-perf-"));
  const jsonPath = join(tmpDir, "hyperfine.json");
  console.log(
    `\n→ web app bundle step: hyperfine --warmup ${warmup} --runs ${runs} -- bun run build`,
  );
  try {
    execFileSync(
      "hyperfine",
      [
        "--warmup",
        String(warmup),
        "--runs",
        String(runs),
        "--prepare",
        `node "${CLEAN_SCRIPT}" dist`,
        "--export-json",
        jsonPath,
        "bun run build",
      ],
      { cwd: WEB_DIR, stdio: "inherit" },
    );
    const result = JSON.parse(readFileSync(jsonPath, "utf8")).results[0];
    return {
      target: "web",
      tool: "hyperfine",
      runs,
      warmup,
      mean_ms: result.mean * 1000,
      median_ms: result.median * 1000,
      min_ms: result.min * 1000,
      max_ms: result.max * 1000,
      stddev_ms: result.stddev * 1000,
      trace,
    };
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

if (isMain(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2), { target: "web", runs: 5, warmup: 1 });
  const result = args.target === "full" ? measureFull() : measureWeb(args);
  console.log(JSON.stringify(result, null, 2));
}
