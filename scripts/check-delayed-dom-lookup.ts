import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const traverse: typeof _traverse =
  (_traverse as unknown as { default?: typeof _traverse }).default ?? _traverse;

// A timer that looks up the DOM guesses when a render lands. Lazy views under
// Suspense can commit later than the guess, and the lookup then silently misses.
// See docs/bugs/2026-10-21-about-opens-mid-page.md.
const DOM_LOOKUPS = new Set([
  "getElementById",
  "querySelector",
  "querySelectorAll",
  "scrollIntoView",
]);
const TIMERS = new Set(["setTimeout"]);
const ROOTS = ["apps/web/src", "packages/ui/src"];

export interface DelayedLookupFinding {
  file: string;
  line: number;
  lookup: string;
}

function sourceFiles(dir: string): string[] {
  const files: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files.push(...sourceFiles(path));
    else if (/\.tsx?$/.test(name) && !name.endsWith(".d.ts")) files.push(path);
  }
  return files;
}

function calleeName(callee: t.Expression | t.V8IntrinsicIdentifier): string | undefined {
  if (callee.type === "Identifier") return callee.name;
  if (callee.type === "MemberExpression" && callee.property.type === "Identifier") {
    return callee.property.name;
  }
  return undefined;
}

export function findDelayedDomLookups(file: string): DelayedLookupFinding[] {
  const findings: DelayedLookupFinding[] = [];
  const ast = parse(readFileSync(file, "utf8"), {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });
  traverse(ast, {
    CallExpression(path: NodePath<t.CallExpression>) {
      const name = calleeName(path.node.callee);
      const [callback] = path.node.arguments;
      if (!name || !TIMERS.has(name) || !callback) return;
      if (callback.type !== "ArrowFunctionExpression" && callback.type !== "FunctionExpression") {
        return;
      }
      path.get("arguments.0").traverse({
        CallExpression(inner: NodePath<t.CallExpression>) {
          const lookup = calleeName(inner.node.callee);
          if (lookup && DOM_LOOKUPS.has(lookup)) {
            findings.push({ file, line: inner.node.loc?.start.line ?? 1, lookup });
          }
        },
      });
    },
  });
  return findings;
}

if (import.meta.main) {
  const args = process.argv.slice(2).filter((file) => /\.tsx?$/.test(file));
  const files = args.length > 0 ? args : ROOTS.flatMap(sourceFiles);
  const findings = files.flatMap(findDelayedDomLookups);
  for (const { file, line, lookup } of findings) {
    console.error(
      `${file}:${line} ${lookup}() runs inside setTimeout. Run it from an effect that commits with the target element instead.`,
    );
  }
  if (findings.length > 0) process.exit(1);
}
