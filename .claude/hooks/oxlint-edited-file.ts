import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

const input = await Bun.stdin.json();
const file: unknown = input?.tool_input?.file_path;
const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

if (typeof file !== "string" || !file.startsWith(`${root}/`) || !/\.[cm]?[jt]sx?$/.test(file))
  process.exit(0);

const isCheckoutRoot = (dir: string) =>
  existsSync(join(dir, ".git")) || existsSync(join(dir, ".jj"));
let checkoutRoot = dirname(file);
while (checkoutRoot !== root && !isCheckoutRoot(checkoutRoot)) checkoutRoot = dirname(checkoutRoot);

const lint = Bun.spawnSync(["bun", "oxlint", "--no-error-on-unmatched-pattern", file], {
  cwd: checkoutRoot,
  stdout: "pipe",
  stderr: "pipe",
});
if (lint.exitCode === 0) process.exit(0);

process.stderr.write(
  `oxlint failed on ${file}:\n${lint.stdout.toString()}${lint.stderr.toString()}`,
);
process.exit(2);
