#!/usr/bin/env node
// Cross-platform `rm -rf`, used as hyperfine's --prepare command. Exists only because
// hyperfine shells out via cmd.exe on Windows, where `rm -rf` isn't reliably on PATH —
// Node is, so this replaces it instead of fighting shell-quoting per platform.

import { rmSync } from "node:fs";

const target = process.argv[2];
if (!target) {
  console.error("usage: node clean.mjs <path>");
  process.exit(1);
}
rmSync(target, { recursive: true, force: true });
