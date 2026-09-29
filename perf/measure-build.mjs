#!/usr/bin/env node
// Compile-time measurement — Phase 0 of issue #3.
//
// Two distinct numbers, kept separate per the issue's own table (never mixed):
//
//   full  — cold full-monorepo build (`bun run build` at the repo root). Every
//           workspace package has its own build cache (tsbuildinfo, Vite's
//           node_modules/.vite, .tanstack, rolldown), and there's no single switch
//           that cold-clears all of them. Rather than guess and risk reporting a
//           warm run as "cold", this is measured once per invocation — the same
//           methodology the issue's own current baseline uses ("9.3 s wall — single
//           measured run"). Use --runs on the `web` target for real statistics.
//
//   web   — the web app's own Vite bundle step only (client + ssr). Its dist/ is
//           cheap to wipe between runs, so this one gets full hyperfine treatment:
//           real warmup + repeat + stddev.
//
// Usage:
//   node perf/measure-build.mjs --target=web  [--runs=5] [--warmup=1]
//   node perf/measure-build.mjs --target=full

import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { isMain, parseArgs } from "./lib/util.mjs";

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

export function measureWeb({ runs = 5, warmup = 1 } = {}) {
  if (!hasHyperfine()) {
    console.log(
      "\n→ hyperfine not on PATH — falling back to a single wall-clock run for the web bundle step",
    );
    const ms = timeOnce("bun", ["run", "build"], WEB_DIR);
    return singleRunResult("web", ms);
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
