// Budget evaluation and regression gate.
// Compares build traces and bundle attributions against declared ceilings.
// Enforces hard error on size violations, advisory warnings on phase timings outside CI.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { fmtKB, fmtMs } from "./util.mjs";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const BUDGET_FILE = join(ROOT, "perf/budget.json");

export function defaultBudget() {
  if (existsSync(BUDGET_FILE)) {
    try {
      return JSON.parse(readFileSync(BUDGET_FILE, "utf8"));
    } catch {
      // fallback to hardcoded
    }
  }
  return {
    total_client_bytes: {
      raw_max: 3000000,
      gzip_max: 800000,
      brotli_max: 700000,
    },
    max_single_chunk_bytes: {
      raw_max: 1000000,
      gzip_max: 350000,
      brotli_max: 300000,
    },
    profiler_bytes: {
      raw_max: 150000,
      gzip_max: 50000,
      brotli_max: 40000,
    },
    phases_duration_ms: {
      dependency_graph: 15000,
      style_compilation: 15000,
      server_output: 25000,
      client_output: 25000,
      asset_write: 10000,
      total: 60000,
    },
  };
}

export function evaluateBudget(perfRecord, budget = defaultBudget(), { isCI = false } = {}) {
  const errors = [];
  const warnings = [];

  const total = perfRecord?.assets?.total;
  const chunks = perfRecord?.assets?.chunks || [];
  const profiler = perfRecord?.assets?.profiler || { raw: 0, gzip: 0, brotli: 0 };
  const trace = perfRecord?.trace || { phases: [], total_ms: 0 };

  // 1. Total client bytes
  if (total) {
    const limits = budget.total_client_bytes || {};
    if (limits.raw_max && total.raw > limits.raw_max) {
      errors.push(
        `Total client raw size ${fmtKB(total.raw)} exceeds budget limit of ${fmtKB(limits.raw_max)}`,
      );
    }
    if (limits.gzip_max && total.gzip > limits.gzip_max) {
      errors.push(
        `Total client gzip size ${fmtKB(total.gzip)} exceeds budget limit of ${fmtKB(limits.gzip_max)}`,
      );
    }
    if (limits.brotli_max && total.brotli > limits.brotli_max) {
      errors.push(
        `Total client brotli size ${fmtKB(total.brotli)} exceeds budget limit of ${fmtKB(limits.brotli_max)}`,
      );
    }
  }

  // 2. Max single chunk bytes
  const chunkLimits = budget.max_single_chunk_bytes || {};
  for (const chunk of chunks) {
    if (chunkLimits.raw_max && chunk.raw > chunkLimits.raw_max) {
      errors.push(
        `Chunk "${chunk.name}" raw size ${fmtKB(chunk.raw)} exceeds max single chunk budget limit of ${fmtKB(chunkLimits.raw_max)}`,
      );
    }
    if (chunkLimits.gzip_max && chunk.gzip > chunkLimits.gzip_max) {
      errors.push(
        `Chunk "${chunk.name}" gzip size ${fmtKB(chunk.gzip)} exceeds max single chunk budget limit of ${fmtKB(chunkLimits.gzip_max)}`,
      );
    }
    if (chunkLimits.brotli_max && chunk.brotli > chunkLimits.brotli_max) {
      errors.push(
        `Chunk "${chunk.name}" brotli size ${fmtKB(chunk.brotli)} exceeds max single chunk budget limit of ${fmtKB(chunkLimits.brotli_max)}`,
      );
    }
  }

  // 3. Profiler shipped footprint
  const profLimits = budget.profiler_bytes || {};
  if (profLimits.raw_max && profiler.raw > profLimits.raw_max) {
    errors.push(
      `Profiler footprint raw size ${fmtKB(profiler.raw)} exceeds budget limit of ${fmtKB(profLimits.raw_max)}`,
    );
  }
  if (profLimits.gzip_max && profiler.gzip > profLimits.gzip_max) {
    errors.push(
      `Profiler footprint gzip size ${fmtKB(profiler.gzip)} exceeds budget limit of ${fmtKB(profLimits.gzip_max)}`,
    );
  }
  if (profLimits.brotli_max && profiler.brotli > profLimits.brotli_max) {
    errors.push(
      `Profiler footprint brotli size ${fmtKB(profiler.brotli)} exceeds budget limit of ${fmtKB(profLimits.brotli_max)}`,
    );
  }

  // 4. Phase durations (advisory outside CI, hard error in CI)
  const phaseLimits = budget.phases_duration_ms || {};
  if (trace && trace.phases) {
    for (const phase of trace.phases) {
      const limit = phaseLimits[phase.name];
      if (limit && phase.duration_ms > limit) {
        const msg = `Build phase "${phase.name}" duration ${fmtMs(phase.duration_ms)} exceeds budget limit of ${fmtMs(limit)}`;
        if (isCI) {
          errors.push(msg);
        } else {
          warnings.push(msg);
        }
      }
    }
    if (phaseLimits.total && trace.total_ms > phaseLimits.total) {
      const msg = `Total build duration ${fmtMs(trace.total_ms)} exceeds total build budget limit of ${fmtMs(phaseLimits.total)}`;
      if (isCI) {
        errors.push(msg);
      } else {
        warnings.push(msg);
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
  };
}
