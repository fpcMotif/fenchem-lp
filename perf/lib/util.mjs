// Shared helpers for the perf/ scripts. Kept dependency-free (Node builtins only) so
// this harness never needs its own install step.

import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

/** True when this module was run directly (`node foo.mjs`), not imported. */
export function isMain(importMetaUrl) {
  try {
    return fileURLToPath(importMetaUrl) === resolve(process.argv[1] ?? "");
  } catch {
    return false;
  }
}

export function median(nums) {
  if (nums.length === 0) return null;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function mean(nums) {
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

/** Nearest-rank percentile (p in [0,100]) — the metric Core Web Vitals actually grades
 * on (p75), not the mean/median. With small sample counts (n<10) this is coarse — more
 * runs sharpen it — but it's still the methodologically right number to report. */
export function percentile(nums, p) {
  if (nums.length === 0) return null;
  const sorted = [...nums].sort((a, b) => a - b);
  const rank = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.min(Math.max(rank, 0), sorted.length - 1)];
}

export function fmtMs(ms) {
  if (ms == null || Number.isNaN(ms)) return "—";
  return ms >= 1000 ? `${(ms / 1000).toFixed(2)} s` : `${ms.toFixed(0)} ms`;
}

export function fmtKB(bytes) {
  if (bytes == null || Number.isNaN(bytes)) return "—";
  return `${(bytes / 1000).toFixed(2)} kB`;
}

export function parseArgs(argv, defaults) {
  const args = { ...defaults };
  for (const raw of argv) {
    const [key, value] = raw.replace(/^--/, "").split("=");
    const camel = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (!(camel in defaults)) continue;
    const current = defaults[camel];
    if (typeof current === "number") args[camel] = Number(value);
    else if (typeof current === "boolean")
      args[camel] = value === undefined ? true : value === "true";
    else args[camel] = value;
  }
  return args;
}
