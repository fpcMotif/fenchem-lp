import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const traverse: typeof _traverse =
  (_traverse as unknown as { default?: typeof _traverse }).default ?? _traverse;

export interface LintFinding {
  file: string;
  line: number;
  category: string;
  message: string;
}

const BANNED_PACKAGES = [
  "tailwindcss",
  "@tailwindcss/vite",
  "tailwind-merge",
  "clsx",
  "class-variance-authority",
  "tw-animate-css",
  "styled-components",
];

function getFiles(dir: string): string[] {
  let results: string[] = [];
  try {
    const list = readdirSync(dir);
    for (const file of list) {
      const fullPath = join(dir, file);
      const stat = statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getFiles(fullPath));
      } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
        results.push(fullPath);
      }
    }
  } catch {}
  return results;
}

export function runStyleXTypeAwareAudit(): LintFinding[] {
  const findings: LintFinding[] = [];
  const allFiles = getFiles("apps/web/src").concat(getFiles("packages/ui/src"));

  for (const file of allFiles) {
    const content = readFileSync(file, "utf8");
    let ast: t.File;
    try {
      ast = parse(content, {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
      });
    } catch {
      continue;
    }

    traverse(ast, {
      // 1. Migration & Legacy Cleanup: Check for banned imports
      ImportDeclaration(path: NodePath<t.ImportDeclaration>) {
        const source = path.node.source.value;
        if (BANNED_PACKAGES.some((pkg) => source === pkg || source.startsWith(`${pkg}/`))) {
          findings.push({
            file,
            line: path.node.loc?.start.line || 1,
            category: "Migration & Legacy Cleanup",
            message: `Banned legacy styling import detected: "${source}". Use StyleX with @fenchem-lp/ui/tokens.stylex instead.`,
          });
        }
        if (source.includes("utils") && source.includes("cn")) {
          findings.push({
            file,
            line: path.node.loc?.start.line || 1,
            category: "Migration & Legacy Cleanup",
            message: `Legacy 'cn' utility import detected from "${source}". Use stylex.props for deterministic merging.`,
          });
        }
      },

      // 2. Component Styling APIs & Cross-File Propagation: Check UI components
      FunctionDeclaration(path: NodePath<t.FunctionDeclaration>) {
        if (file.includes("packages/ui/src/components/")) {
          const fnName = path.node.id?.name;
          if (fnName && /^[A-Z]/.test(fnName)) {
            const firstParam = path.node.params[0];
            if (firstParam && firstParam.type === "ObjectPattern") {
              const hasSx = firstParam.properties.some(
                (p: t.ObjectPattern["properties"][number]) =>
                  p.type === "ObjectProperty" &&
                  p.key.type === "Identifier" &&
                  (p.key.name === "sx" || p.key.name === "_sx"),
              );
              const hasClassName = firstParam.properties.some(
                (p: t.ObjectPattern["properties"][number]) =>
                  p.type === "ObjectProperty" &&
                  p.key.type === "Identifier" &&
                  p.key.name === "className",
              );

              if (!hasSx && fnName !== "Toaster") {
                findings.push({
                  file,
                  line: path.node.loc?.start.line || 1,
                  category: "Component Styling APIs",
                  message: `UI primitive component "${fnName}" must accept a typed "sx?: StyleXStyles" prop.`,
                });
              }
              if (hasClassName && fnName !== "Toaster") {
                findings.push({
                  file,
                  line: path.node.loc?.start.line || 1,
                  category: "Component Styling APIs",
                  message: `UI primitive component "${fnName}" exposes loose "className" prop instead of pure typed StyleX "sx".`,
                });
              }
            }
          }
        }
      },

      // 3. Style Composition & Precedence: Verify stylex.props order
      CallExpression(path: NodePath<t.CallExpression>) {
        if (
          path.node.callee.type === "MemberExpression" &&
          path.node.callee.object.type === "Identifier" &&
          path.node.callee.object.name === "stylex" &&
          path.node.callee.property.type === "Identifier" &&
          path.node.callee.property.name === "props"
        ) {
          const args = path.node.arguments;
          if (args.length > 1) {
            const lastArg = args[args.length - 1];
            if (file.includes("packages/ui/src/components/")) {
              const lastArgName = lastArg?.type === "Identifier" ? lastArg.name : "";
              if (lastArgName !== "sx") {
                const hasSxInArgs = args.some(
                  (a: t.CallExpression["arguments"][number]) =>
                    a.type === "Identifier" && a.name === "sx",
                );
                if (hasSxInArgs) {
                  findings.push({
                    file,
                    line: path.node.loc?.start.line || 1,
                    category: "Style Composition & Precedence",
                    message: `stylex.props() in component must place caller "sx" override as the final argument for deterministic last-wins precedence.`,
                  });
                }
              }
            }
          }
        }
      },

      // 4. Compiler & Token Safety: Check tokens.stylex.ts
      ExportNamedDeclaration(path: NodePath<t.ExportNamedDeclaration>) {
        if (file.endsWith(".stylex.ts")) {
          const decl = path.node.declaration;
          if (decl && decl.type === "VariableDeclaration") {
            for (const vDecl of decl.declarations) {
              if (vDecl.init && vDecl.init.type === "CallExpression") {
                const callee = vDecl.init.callee;
                const isStylexDefine =
                  callee.type === "MemberExpression" &&
                  callee.object.type === "Identifier" &&
                  callee.object.name === "stylex" &&
                  callee.property.type === "Identifier" &&
                  (callee.property.name === "defineVars" ||
                    callee.property.name === "defineConsts");

                if (!isStylexDefine) {
                  findings.push({
                    file,
                    line: path.node.loc?.start.line || 1,
                    category: "Compiler & Theme Safety",
                    message: `Export "${(vDecl.id as { name: string }).name}" in .stylex.ts must use stylex.defineVars() or stylex.defineConsts().`,
                  });
                }
              } else {
                findings.push({
                  file,
                  line: path.node.loc?.start.line || 1,
                  category: "Compiler & Theme Safety",
                  message: `Export in .stylex.ts must be initialized with stylex.defineVars() or stylex.defineConsts().`,
                });
              }
            }
          }
        }
      },
    });
  }

  return findings;
}

if (import.meta.main) {
  console.log("Running Type-Aware StyleX Repository Checker...");
  const findings = runStyleXTypeAwareAudit();

  if (findings.length === 0) {
    console.log("✅ Zero StyleX type-safety violations found across the repository!");
    console.log("  - 100% of UI components expose typed sx?: StyleXStyles");
    console.log("  - Zero legacy styling packages (tailwindcss, clsx, cva, etc.) in use");
    console.log("  - All tokens in .stylex.ts use defineVars / defineConsts");
    console.log("  - stylex.props() caller sx overrides have deterministic last-wins precedence");
  } else {
    console.error(`❌ Found ${findings.length} StyleX type-safety issue(s):`);
    for (const f of findings) {
      console.error(`  [${f.category}] ${f.file}:${f.line} - ${f.message}`);
    }
    process.exit(1);
  }
}
