// Per-phase build trace collector and normalizer.
// Standard phases named by role across frameworks:
//   - dependency_graph
//   - style_compilation
//   - server_output
//   - client_output
//   - asset_write

export const STANDARD_PHASES = [
  "dependency_graph",
  "style_compilation",
  "server_output",
  "client_output",
  "asset_write",
];

export function normalizePhaseTrace(rawPhases = []) {
  const phaseMap = new Map();
  for (const p of rawPhases) {
    if (p && p.name) {
      phaseMap.set(p.name, {
        name: p.name,
        start_ms: Number(p.start_ms ?? 0),
        duration_ms: Number(p.duration_ms ?? 0),
        cached: Boolean(p.cached ?? false),
      });
    }
  }

  let total_ms = 0;
  const phases = STANDARD_PHASES.map((name) => {
    if (phaseMap.has(name)) {
      const p = phaseMap.get(name);
      total_ms += p.duration_ms;
      return p;
    }
    return {
      name,
      start_ms: 0,
      duration_ms: 0,
      cached: false,
    };
  });

  return {
    phases,
    total_ms,
    timestamp: new Date().toISOString(),
  };
}

export function createBuildTracer() {
  const phaseStarts = new Map();
  const recorded = [];
  const startEpoch = performance.now();

  return {
    startPhase(name) {
      phaseStarts.set(name, performance.now() - startEpoch);
    },
    endPhase(name, { cached = false } = {}) {
      const end = performance.now() - startEpoch;
      const start = phaseStarts.get(name) ?? end;
      const duration = Math.max(0, end - start);
      recorded.push({
        name,
        start_ms: Math.round(start * 100) / 100,
        duration_ms: Math.round(duration * 100) / 100,
        cached,
      });
    },
    finish() {
      return normalizePhaseTrace(recorded);
    },
  };
}

export function parsePhaseTraceLogs(logs = "") {
  const rawPhases = [];
  const regex =
    /\[trace:([a-zA-Z0-9_]+)\]\s+start=([\d.]+)ms\s+duration=([\d.]+)ms(?:\s+cached=(true|false))?/g;
  let match;
  while ((match = regex.exec(logs)) !== null) {
    const [, name, startStr, durStr, cachedStr] = match;
    rawPhases.push({
      name,
      start_ms: parseFloat(startStr),
      duration_ms: parseFloat(durStr),
      cached: cachedStr === "true",
    });
  }
  return normalizePhaseTrace(rawPhases);
}
