#!/usr/bin/env node
// Synthetic cold/warm probe against an already-deployed URL (e.g. the live Cloudflare
// Worker) — the local/deployed gap the issue calls out explicitly: "local preview
// numbers" are not "deployed cold start." This is a manual, on-demand probe you run
// yourself; it is NOT real-user monitoring (no visitor data collected — see
// perf/README.md for why RUM is a separate, not-yet-made decision).
//
// Run #1 only means "Worker cold start" if this is the first request the Worker has
// seen since deploy — run it right after `wrangler deploy`, before hitting the URL any
// other way (including opening it in a browser to eyeball the result).
//
// Usage:
//   node perf/measure-deployed.mjs --url=https://fenchem-lp-web-fenchem.kidder-ripper4o.workers.dev [--runs=5]

import { measureColdstart } from "./measure-coldstart.mjs";
import { isMain, parseArgs } from "./lib/util.mjs";

if (isMain(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2), { url: "", runs: 5 });
  if (!args.url) {
    console.error("usage: node perf/measure-deployed.mjs --url=https://... [--runs=5]");
    process.exit(1);
  }
  const result = await measureColdstart({ url: args.url, runs: args.runs });
  console.log(JSON.stringify(result, null, 2));
}

export {};
