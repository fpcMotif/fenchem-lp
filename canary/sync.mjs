#!/usr/bin/env node
// Copies the OOS1 canary slice out of apps/web into a canary app and rewrites its
// framework imports. Re-run after editing apps/web; the copy is generated, so
// hand edits belong in canary/<target>/src/compat or in the PATCHES below.
//
//   node canary/sync.mjs octane   → canary/octane/src/app (React imports → Octane)
//   node canary/sync.mjs react    → canary/react/src/app  (imports untouched)
//
// Slice = OOS1 home + products view (catalog chips, solutions filter, row sheets).
// Out-of-slice sub-views (about, R&D, insights, news, contact) resolve to a stub
// so both twins ship the identical file set.

import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { parse } from "@babel/parser";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const WEB_SRC = join(ROOT, "apps/web/src");
const UI_SRC = join(ROOT, "packages/ui/src");
const target = process.argv[2];
if (target !== "octane" && target !== "react") {
  console.error("usage: node canary/sync.mjs <octane|react>");
  process.exit(1);
}
const OUT = join(ROOT, "canary", target, "src/app");

const ENTRIES = [
  "components/prototype/variant-oos1/index.tsx",
  "components/prototype/variant-oos1/products-view.tsx",
];
const OUT_OF_SLICE = new Set(
  ["about-view", "contact-view", "insights-view", "news-view", "rd-view"].map(
    (name) => `components/prototype/variant-oos1/${name}.tsx`,
  ),
);
const STUB = "components/prototype/variant-oos1/out-of-slice.tsx";

const EXTS = ["", ".tsx", ".ts", "/index.tsx", "/index.ts"];

function resolveSpec(fromAbs, spec) {
  let base;
  if (spec.startsWith("@/")) base = join(WEB_SRC, spec.slice(2));
  else if (spec.startsWith("@fenchem-lp/ui/")) base = join(UI_SRC, spec.slice("@fenchem-lp/ui/".length));
  else if (spec.startsWith(".")) base = resolve(dirname(fromAbs), spec);
  else return null;
  for (const ext of EXTS) {
    const p = base + ext;
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  throw new Error(`unresolved ${spec} from ${fromAbs}`);
}

/** Source path (abs) → slice-relative output path. */
function outPath(abs) {
  if (abs.startsWith(UI_SRC)) return join("ui", relative(UI_SRC, abs));
  return relative(WEB_SRC, abs);
}

function parseModule(code) {
  return parse(code, { sourceType: "module", plugins: ["typescript", "jsx"] });
}

// ── Octane import rewrites ────────────────────────────────────────────────────
// Values go straight to the Octane package so its compiler sees the real hook
// imports; React-only types go to a local type shim (erased at build time).
const VALUE_TARGET = {
  react: "octane",
  "react-dom": "octane",
  "lucide-react": "@octanejs/lucide",
  "@stylexjs/stylex": "@octanejs/stylex",
  "motion/react": "@/compat/motion",
  "@tanstack/react-router": "@/compat/router",
};
const TYPE_TARGET = {
  react: "@/compat/react-types",
  "react-dom": "@/compat/react-types",
  "lucide-react": "@octanejs/lucide",
  "@stylexjs/stylex": "@octanejs/stylex",
  "motion/react": "@/compat/motion",
  "@tanstack/react-router": "@/compat/router",
};

function specifierText(s, code) {
  return code.slice(s.start, s.end).replace(/^type\s+/, "");
}

function rewriteImportsForOctane(code) {
  const ast = parseModule(code);
  const edits = [];
  for (const node of ast.program.body) {
    if (node.type !== "ImportDeclaration") continue;
    const source = node.source.value;
    if (!(source in VALUE_TARGET)) continue;
    const allType = node.importKind === "type";
    const ns = node.specifiers.find((s) => s.type !== "ImportSpecifier");
    if (ns) {
      // `import * as stylex from "@stylexjs/stylex"` and default imports.
      edits.push([node.source.start, node.source.end, JSON.stringify(allType ? TYPE_TARGET[source] : VALUE_TARGET[source])]);
      continue;
    }
    const values = [];
    const types = [];
    for (const s of node.specifiers) {
      (allType || s.importKind === "type" ? types : values).push(specifierText(s, code));
    }
    const out = [];
    if (values.length) out.push(`import { ${values.join(", ")} } from ${JSON.stringify(VALUE_TARGET[source])};`);
    if (types.length) out.push(`import type { ${types.join(", ")} } from ${JSON.stringify(TYPE_TARGET[source])};`);
    edits.push([node.start, node.end, out.join("\n")]);
  }
  return applyEdits(code, edits);
}

// @stylexjs/babel-plugin applies "last media query wins" before defineConsts
// values resolve, so `{ default: 16, [breakpoints.md]: 20, [breakpoints.xl]: 16 }`
// keeps two overlapping min-width rules and sorts them by text — "1280px" lands
// before "768px" and md wins at desktop. apps/web's stylexswc does not have this
// problem. Inline the breakpoint strings so the babel plugin sees literal keys.
const BREAKPOINTS = Object.fromEntries(
  [...readFileSync(join(UI_SRC, "tokens.stylex.ts"), "utf8")
    .match(/export const breakpoints = stylex\.defineConsts\(\{([\s\S]*?)\}\);/)[1]
    .matchAll(/^\s*"?([\w]+)"?:\s*"([^"]+)"/gm)].map((m) => [m[1], m[2]]),
);

function inlineBreakpoints(code) {
  if (!/import \{[^}]*\bbreakpoints\b[^}]*\} from "[^"]*ui\/tokens\.stylex"/.test(code)) return code;
  return code.replace(/\bbreakpoints(?:\.(\w+)|\["(\w+)"\])/g, (all, a, b) => {
    const value = BREAKPOINTS[a ?? b];
    if (!value) throw new Error(`unknown breakpoint ${all}`);
    return JSON.stringify(value);
  });
}

function applyEdits(code, edits) {
  edits.sort((a, b) => b[0] - a[0]);
  for (const [start, end, text] of edits) code = code.slice(0, start) + text + code.slice(end);
  return code;
}

// Point out-of-slice imports at the stub; make every local import relative.
function rewriteLocalImports(code, fromAbs) {
  const ast = parseModule(code);
  const edits = [];
  for (const node of ast.program.body) {
    if (!(node.type === "ImportDeclaration" || node.type === "ExportNamedDeclaration" || node.type === "ExportAllDeclaration") || !node.source) continue;
    // Every in-slice import becomes relative: StyleX resolves `.stylex.ts` token
    // files itself and does not know the bundler's aliases.
    const spec = node.source.value;
    const abs = resolveSpec(fromAbs, spec);
    if (!abs) continue;
    const to = OUT_OF_SLICE.has(relative(WEB_SRC, abs)) ? STUB : outPath(abs);
    let rel = relative(dirname(outPath(fromAbs)), to).replace(/\.tsx?$/, "");
    if (!rel.startsWith(".")) rel = `./${rel}`;
    if (rel !== spec) edits.push([node.source.start, node.source.end, JSON.stringify(rel)]);
  }
  return applyEdits(code, edits);
}

// Source patches needed by the Octane toolchain, applied to both twins so they
// stay byte-comparable. Each is [file, find, replace]; a miss fails the sync.
const PATCHES = [
  // Octane's server compile leaves keyframes nested in an object literal
  // outside @stylexjs/babel-plugin's reach; top-level consts compile on both sides.
  [
    "components/prototype/contact-dialog-lab/kit.tsx",
    `const motionKeys = {
  fadeIn: stylex.keyframes({ "0%": { opacity: 0 }, "100%": { opacity: 1 } }),
  swapIn: stylex.keyframes({
    "0%": { opacity: 0, transform: "translateY(8px)" },
    "100%": { opacity: 1, transform: "none" },
  }),
};`,
    `const fadeInKeyframes = stylex.keyframes({ "0%": { opacity: 0 }, "100%": { opacity: 1 } });
const swapInKeyframes = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(8px)" },
  "100%": { opacity: 1, transform: "none" },
});
const motionKeys = { fadeIn: fadeInKeyframes, swapIn: swapInKeyframes };`,
  ],
];

// Octane-only: defer hydration of the below-fold home sections. The server
// still renders them; their JS loads and hydrates when they near the viewport.
const OCTANE_PATCHES = [
  [
    "components/prototype/variant-oos1/index.tsx",
    `import { preinit } from "react-dom";`,
    `import { preinit } from "react-dom";
import { Hydrate } from "octane";
import { visible } from "octane/hydration";`,
  ],
  [
    "components/prototype/variant-oos1/index.tsx",
    `                    <Campus />
                    <Strengths />
                    <Products
                      onOpenProductsPage={() => handleNavigate("products", "products-top")}
                    />
                    <Offices />
                    <News />
                    <Flow>`,
    `                    <Hydrate when={visible()}>
                      <Campus />
                    </Hydrate>
                    <Hydrate when={visible()}>
                      <Strengths />
                    </Hydrate>
                    <Hydrate when={visible()}>
                      <Products
                        onOpenProductsPage={() => handleNavigate("products", "products-top")}
                      />
                    </Hydrate>
                    <Hydrate when={visible()}>
                      <Offices />
                    </Hydrate>
                    <Hydrate when={visible()}>
                      <News />
                    </Hydrate>
                    <Flow>`,
  ],
];

function applyPatches(code, rel) {
  for (const [file, find, replace] of target === "octane" ? [...PATCHES, ...OCTANE_PATCHES] : PATCHES) {
    if (file !== rel) continue;
    if (!code.includes(find)) throw new Error(`patch for ${file} no longer applies`);
    code = code.replace(find, replace);
  }
  return code;
}

// ── Walk the slice ────────────────────────────────────────────────────────────
const seen = new Set();
const files = [];
function walk(abs) {
  if (seen.has(abs)) return;
  seen.add(abs);
  if (OUT_OF_SLICE.has(relative(WEB_SRC, abs))) return;
  const code = readFileSync(abs, "utf8");
  files.push(abs);
  const ast = parseModule(code);
  for (const node of ast.program.body) {
    const src = node.source?.value;
    if (!src) continue;
    const dep = resolveSpec(abs, src);
    if (dep) walk(dep);
  }
}
for (const entry of ENTRIES) walk(join(WEB_SRC, entry));

rmSync(OUT, { recursive: true, force: true });
let lines = 0;
for (const abs of files) {
  let code = applyPatches(readFileSync(abs, "utf8"), outPath(abs));
  code = rewriteLocalImports(code, abs);
  if (target === "octane") code = inlineBreakpoints(rewriteImportsForOctane(code));
  const dest = join(OUT, outPath(abs));
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, code);
  lines += code.split("\n").length;
}


writeFileSync(
  join(OUT, STUB),
  `// Generated by canary/sync.mjs — sub-views outside the canary slice.
type SubPageProps = { onNavigateHome: (hash?: string) => void };
function OutOfSlice({ onNavigateHome }: SubPageProps) {
  return (
    <section style={{ padding: "160px 24px", textAlign: "center" }}>
      <p>This view is outside the canary slice.</p>
      <button type="button" onClick={() => onNavigateHome("top")}>Back to home</button>
    </section>
  );
}
export const AboutView = OutOfSlice;
export const ContactView = OutOfSlice;
export const InsightsView = OutOfSlice;
export const NewsView = OutOfSlice;
export const RdView = OutOfSlice;
`,
);

// Global CSS, identical for both twins. StyleX output is handled per twin.
mkdirSync(join(OUT, "styles"), { recursive: true });
writeFileSync(join(OUT, "styles/globals.css"), readFileSync(join(UI_SRC, "styles/globals.css"), "utf8"));
writeFileSync(
  join(OUT, "styles/index.css"),
  readFileSync(join(WEB_SRC, "index.css"), "utf8")
    .replace('@import "@fenchem-lp/ui/globals.css";', '@import "./globals.css";')
    .replace(/\n\/\*[^\n]*useCssPlaceholder[^\n]*\*\/\n@stylex;\n?/, "\n"),
);

console.log(`synced ${files.length} files (${lines} lines) → ${relative(ROOT, OUT)}`);
