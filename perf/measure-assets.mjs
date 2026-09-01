#!/usr/bin/env node
// Output-size and bundle-attribution measurement.
// Walks apps/web/dist/client and sums raw, gzip, and brotli bytes per asset type.
// Dist/client is the browser-shipped payload; dist/server is excluded.

import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { isMain } from "./lib/util.mjs";
import { measureAttribution } from "./lib/attribution.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CLIENT_DIR = join(ROOT, "apps/web/dist/client");

export function measureAssets(clientDir = CLIENT_DIR) {
  return measureAttribution(clientDir);
}

if (isMain(import.meta.url)) {
  console.log(JSON.stringify(measureAssets(), null, 2));
}
