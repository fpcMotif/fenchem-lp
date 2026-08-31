#!/usr/bin/env node
// Output-size measurement — Phase 0 of issue #3.
//
// Walks apps/web/dist/client and sums raw + gzip bytes per asset type. dist/client is
// the browser-shipped payload; dist/server is SSR-only and never reaches a visitor, so
// it's intentionally excluded (matches the issue's own baseline note: "client dist
// total 2.30 MB"). CSS and JS are bucketed separately and summed, because the whole
// point of the StyleX comparison later is that it can shift weight from CSS into JS —
// see issue #3's "Sum, don't cherry-pick" protocol requirement.

import { readdirSync, readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

import { isMain } from "./lib/util.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CLIENT_DIR = join(ROOT, "apps/web/dist/client");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

export function measureAssets(clientDir = CLIENT_DIR) {
  const files = walk(clientDir);
  const buckets = {
    css: { raw: 0, gzip: 0, count: 0 },
    js: { raw: 0, gzip: 0, count: 0 },
    other: { raw: 0, gzip: 0, count: 0 },
  };
  for (const file of files) {
    const ext = extname(file).slice(1).toLowerCase();
    const bucket = ext === "css" ? "css" : ext === "js" ? "js" : "other";
    const buf = readFileSync(file);
    buckets[bucket].raw += buf.length;
    buckets[bucket].gzip += gzipSync(buf, { level: 9 }).length;
    buckets[bucket].count += 1;
  }
  const total = {
    raw: buckets.css.raw + buckets.js.raw + buckets.other.raw,
    gzip: buckets.css.gzip + buckets.js.gzip + buckets.other.gzip,
    count: files.length,
  };
  return { dir: clientDir, buckets, total };
}

if (isMain(import.meta.url)) {
  console.log(JSON.stringify(measureAssets(), null, 2));
}
