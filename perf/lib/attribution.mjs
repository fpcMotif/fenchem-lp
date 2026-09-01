// Per-chunk and per-module bundle attribution with raw, gzip, and brotli byte metrics.
// Client output only (dist/client); server output is excluded.

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { gzipSync, brotliCompressSync, constants as zlibConstants } from "node:zlib";
import { join, extname, basename, relative } from "node:path";

export function calculateBrotli(buf) {
  return brotliCompressSync(buf, {
    params: {
      [zlibConstants.BROTLI_PARAM_QUALITY]: 11,
    },
  }).length;
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

export function measureAttribution(clientDir) {
  const files = walk(clientDir);
  const buckets = {
    css: { raw: 0, gzip: 0, brotli: 0, count: 0 },
    js: { raw: 0, gzip: 0, brotli: 0, count: 0 },
    other: { raw: 0, gzip: 0, brotli: 0, count: 0 },
  };

  const chunks = [];
  const moduleMap = new Map();
  const profiler = { raw: 0, gzip: 0, brotli: 0, count: 0 };

  for (const file of files) {
    const ext = extname(file).slice(1).toLowerCase();
    const bucketKey = ext === "css" ? "css" : ext === "js" ? "js" : "other";
    const buf = readFileSync(file);
    const raw = buf.length;
    const gzip = gzipSync(buf, { level: 9 }).length;
    const brotli = calculateBrotli(buf);
    const fileName = basename(file);
    const relPath = relative(clientDir, file);

    buckets[bucketKey].raw += raw;
    buckets[bucketKey].gzip += gzip;
    buckets[bucketKey].brotli += brotli;
    buckets[bucketKey].count += 1;

    const chunkObj = {
      name: fileName,
      path: relPath,
      ext,
      raw,
      gzip,
      brotli,
    };
    chunks.push(chunkObj);

    // Identify profiler footprint
    if (
      fileName.includes("profiler") ||
      fileName.includes("react-scan") ||
      relPath.includes("profiler")
    ) {
      profiler.raw += raw;
      profiler.gzip += gzip;
      profiler.brotli += brotli;
      profiler.count += 1;
    }

    // Infer module attribution for top-N analysis from chunk naming / content heuristics
    let moduleKey = fileName;
    if (fileName.includes("vendor") || fileName.includes("node_modules")) {
      const match = fileName.match(/(?:vendor[_-]|npm\.)([a-zA-Z0-9@._-]+)/);
      moduleKey = match ? match[1] : "vendor-bundle";
    } else if (
      fileName.includes("index") ||
      fileName.includes("root") ||
      fileName.includes("main")
    ) {
      moduleKey = "app-shell";
    } else if (fileName.includes("style") || ext === "css") {
      moduleKey = "stylex-css";
    } else if (fileName.includes("variant")) {
      moduleKey = "prototype-variants";
    }

    const existingMod = moduleMap.get(moduleKey) || {
      name: moduleKey,
      raw: 0,
      gzip: 0,
      brotli: 0,
      chunkCount: 0,
    };
    existingMod.raw += raw;
    existingMod.gzip += gzip;
    existingMod.brotli += brotli;
    existingMod.chunkCount += 1;
    moduleMap.set(moduleKey, existingMod);
  }

  chunks.sort((a, b) => b.raw - a.raw);
  const modules = Array.from(moduleMap.values()).sort((a, b) => b.raw - a.raw);

  const total = {
    raw: buckets.css.raw + buckets.js.raw + buckets.other.raw,
    gzip: buckets.css.gzip + buckets.js.gzip + buckets.other.gzip,
    brotli: buckets.css.brotli + buckets.js.brotli + buckets.other.brotli,
    count: files.length,
  };

  return {
    dir: clientDir,
    buckets,
    total,
    chunks,
    modules,
    profiler,
  };
}

export function buildTopNModuleTable(modules = [], limit = 10) {
  return modules.slice(0, limit).map((m, i) => ({
    rank: i + 1,
    name: m.name,
    raw_bytes: m.raw,
    gzip_bytes: m.gzip,
    brotli_bytes: m.brotli,
  }));
}
