#!/usr/bin/env node
// CI / Local budget assertion runner.
// Checks latest perf entry in perf/log.json (or specified file) against perf/budget.json.
// Fails with exit code 1 if hard limits are breached.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { isMain, parseArgs } from "./lib/util.mjs";
import { evaluateBudget, defaultBudget } from "./lib/budget.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const LOG_JSON = join(ROOT, "perf/log.json");

export function checkBudget({ logPath = LOG_JSON, isCI = process.env.CI === "true" } = {}) {
  if (!existsSync(logPath)) {
    console.error(`Error: log file not found at ${logPath}`);
    return { ok: false, errors: [`Log file not found at ${logPath}`], warnings: [] };
  }

  const entries = JSON.parse(readFileSync(logPath, "utf8"));
  if (!Array.isArray(entries) || entries.length === 0) {
    console.error("Error: log file contains no entries");
    return { ok: false, errors: ["No entries in log file"], warnings: [] };
  }

  const latest = entries[entries.length - 1];
  const budget = defaultBudget();
  const result = evaluateBudget(latest, budget, { isCI });

  console.log(`\n=== Perf Budget Evaluation (${isCI ? "CI mode" : "Local mode"}) ===`);
  console.log(
    `Evaluating entry from ${latest.date} (Framework: ${latest.framework || "tanstack-start"}, Stack: ${latest.stack})`,
  );

  if (result.warnings.length > 0) {
    console.log("\n⚠️  Advisory Warnings:");
    for (const w of result.warnings) {
      console.log(`  - ${w}`);
    }
  }

  if (result.errors.length > 0) {
    console.log("\n❌  Budget Errors (Ceiling Breached):");
    for (const e of result.errors) {
      console.log(`  - ${e}`);
    }
  }

  if (result.ok) {
    console.log("\n✅ All budget checks passed successfully!");
  } else {
    console.log("\n❌ Budget check failed.");
  }

  return result;
}

if (isMain(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2), {
    ci: process.env.CI === "true",
  });
  const res = checkBudget({ isCI: args.ci });
  if (!res.ok) {
    process.exit(1);
  }
}
