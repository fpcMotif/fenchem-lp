#!/usr/bin/env node
// Perf harness orchestrator.
// Measures build times (with per-phase traces), asset payloads (chunks, modules, brotli),
// coldstart metrics, and enforces budget thresholds.
//
// Records framework dimension alongside stack dimension:
//   --framework=tanstack-start | --framework=remix-v3
//   --stack=stylex | --stack=tailwind
//
// Usage:
//   node perf/run.mjs [--framework=tanstack-start] [--stack=stylex] [--build-runs=5] [--build-warmup=1]
//                      [--coldstart-runs=5] [--skip-full=true]

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

import { measureFull, measureWeb } from "./measure-build.mjs";
import { measureAssets } from "./measure-assets.mjs";
import { measureColdstart } from "./measure-coldstart.mjs";
import { fmtMs, fmtKB, parseArgs } from "./lib/util.mjs";
import { createPerfEntry, renderMarkdownLog } from "./lib/log.mjs";
import { evaluateBudget, defaultBudget } from "./lib/budget.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const LOG_JSON = join(ROOT, "perf/log.json");
const LOG_MD = join(ROOT, "perf/log.md");

function gitInfo() {
  try {
    const commit = execFileSync("git", ["rev-parse", "--short", "HEAD"], {
      cwd: ROOT,
      encoding: "utf8",
    }).trim();
    const branch = execFileSync("git", ["branch", "--show-current"], {
      cwd: ROOT,
      encoding: "utf8",
    }).trim();
    const status = execFileSync("git", ["status", "--porcelain"], {
      cwd: ROOT,
      encoding: "utf8",
    }).trim();
    return { commit, branch, dirty: status.length > 0 };
  } catch {
    return { commit: "unknown", branch: "unknown", dirty: null };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2), {
    framework: "tanstack-start",
    stack: "stylex",
    buildRuns: 5,
    buildWarmup: 1,
    coldstartRuns: 5,
    skipFull: false,
    skipColdstart: false,
  });
  const startedAt = new Date().toISOString();

  console.log(`\n=== Perf Run — Framework: ${args.framework}, Stack: ${args.stack} ===`);

  const full = args.skipFull ? null : measureFull();
  const web = measureWeb({ runs: args.buildRuns, warmup: args.buildWarmup, collectTrace: true });
  const assets = measureAssets();
  const coldstart = args.skipColdstart
    ? null
    : await measureColdstart({ runs: args.coldstartRuns });

  const entry = createPerfEntry({
    date: startedAt,
    framework: args.framework,
    stack: args.stack,
    git: gitInfo(),
    node: process.version,
    platform: `${process.platform}/${process.arch}`,
    build: { full, web },
    trace: web.trace,
    assets,
    coldstart,
  });

  const log = existsSync(LOG_JSON) ? JSON.parse(readFileSync(LOG_JSON, "utf8")) : [];
  log.push(entry);
  writeFileSync(LOG_JSON, `${JSON.stringify(log, null, 2)}\n`);
  writeFileSync(LOG_MD, renderMarkdownLog(log));

  console.log("\n=== Summary ===");
  console.log(`Framework:                                ${entry.framework}`);
  console.log(`Stack:                                    ${entry.stack}`);
  console.log(`Full monorepo build (cold, 1 run):        ${fmtMs(full?.mean_ms)}`);
  console.log(
    `Web bundle step (${web.tool}, n=${web.runs}, warmup=${web.warmup}): ${fmtMs(web.mean_ms)} ± ${fmtMs(web.stddev_ms)}`,
  );
  console.log(
    `CSS payload:   ${fmtKB(assets.buckets.css.raw)} raw / ${fmtKB(assets.buckets.css.gzip)} gzip / ${fmtKB(assets.buckets.css.brotli)} brotli`,
  );
  console.log(
    `JS payload:    ${fmtKB(assets.buckets.js.raw)} raw / ${fmtKB(assets.buckets.js.gzip)} gzip / ${fmtKB(assets.buckets.js.brotli)} brotli`,
  );
  console.log(
    `Total client:  ${fmtKB(assets.total.raw)} raw / ${fmtKB(assets.total.gzip)} gzip / ${fmtKB(assets.total.brotli)} brotli (${assets.total.count} files)`,
  );
  if (coldstart) {
    console.log(
      `Cold start (n=${coldstart.runs}, median/p75): ` +
        `TTFB ${fmtMs(coldstart.ttfb_median)}/${fmtMs(coldstart.ttfb_p75)} · ` +
        `FCP ${fmtMs(coldstart.fcp_median)}/${fmtMs(coldstart.fcp_p75)} · ` +
        `LCP ${fmtMs(coldstart.lcp_median)}/${fmtMs(coldstart.lcp_p75)} · ` +
        `CLS ${coldstart.cls_median?.toFixed(3)}/${coldstart.cls_p75?.toFixed(3)}`,
    );
  }

  // Budget validation
  const budget = defaultBudget();
  const budgetResult = evaluateBudget(entry, budget, { isCI: process.env.CI === "true" });
  if (budgetResult.warnings.length > 0) {
    console.log("\n⚠️  Budget Warnings (Advisory):");
    for (const w of budgetResult.warnings) console.log(`  - ${w}`);
  }
  if (budgetResult.errors.length > 0) {
    console.log("\n❌  Budget Violations:");
    for (const e of budgetResult.errors) console.log(`  - ${e}`);
  } else {
    console.log("\n✅ All budget metrics within ceilings.");
  }

  console.log(`\nAppended to perf/log.json and regenerated perf/log.md`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
