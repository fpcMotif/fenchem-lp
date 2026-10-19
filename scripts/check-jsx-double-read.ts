// Flags a component prop that a condition tests and the guarded JSX then renders again.
// Each read of a JSX prop getter builds the content anew, so Solid hydration claims the
// server nodes for one copy and the other copy shifts every later key.
import { readFileSync } from "node:fs";
import { relative, resolve } from "node:path";

import { parse } from "@babel/parser";
import traverseModule, { type NodePath } from "@babel/traverse";
import type * as t from "@babel/types";

const traverse =
  (traverseModule as unknown as { default?: typeof traverseModule }).default ?? traverseModule;
const repoRoot = resolve(import.meta.dir, "..");
const roots = ["apps/web/src", "packages/ui/src"];

type Finding = { file: string; line: number; prop: string };

function componentName(fn: NodePath<t.Function>): string | undefined {
  if (fn.node.type === "FunctionDeclaration") return fn.node.id?.name;
  const parent = fn.parentPath.node;
  if (parent.type === "VariableDeclarator" && parent.id.type === "Identifier")
    return parent.id.name;
  return undefined;
}

function isJsxType(type: t.TSType | undefined): boolean {
  if (!type) return false;
  if (type.type === "TSUnionType") return type.types.some(isJsxType);
  if (type.type !== "TSTypeReference") return false;
  const name = type.typeName;
  if (name.type === "Identifier") return name.name === "JSXElement";
  return (
    name.left.type === "Identifier" && name.left.name === "JSX" && name.right.name === "Element"
  );
}

// Prop names typed as JSX, read from an inline type literal or a same-file type alias/interface.
function jsxProps(fn: NodePath<t.Function>, declared: Map<string, t.TSTypeElement[]>): Set<string> {
  const first = fn.node.params[0];
  const names = new Set<string>();
  const annotation = first?.type === "Identifier" ? first.typeAnnotation : undefined;
  if (annotation?.type !== "TSTypeAnnotation") return names;
  const collect = (type: t.TSType) => {
    if (type.type === "TSIntersectionType") type.types.forEach(collect);
    const members =
      type.type === "TSTypeLiteral"
        ? type.members
        : type.type === "TSTypeReference" && type.typeName.type === "Identifier"
          ? declared.get(type.typeName.name)
          : undefined;
    for (const member of members ?? []) {
      if (member.type !== "TSPropertySignature" || member.key.type !== "Identifier") continue;
      if (isJsxType(member.typeAnnotation?.typeAnnotation)) names.add(member.key.name);
    }
  };
  collect(annotation.typeAnnotation);
  return names;
}

function propsAliases(fn: NodePath<t.Function>): Set<string> {
  const first = fn.node.params[0];
  const aliases = new Set<string>();
  if (first?.type !== "Identifier" || !/^[A-Z]/.test(componentName(fn) ?? "")) return aliases;
  aliases.add(first.name);
  fn.traverse({
    VariableDeclarator(declarator) {
      const init = declarator.node.init;
      if (init?.type !== "CallExpression" || init.callee.type !== "Identifier") return;
      if (!["merge", "mergeProps", "omit", "splitProps", "split"].includes(init.callee.name))
        return;
      if (!init.arguments.some((arg) => arg.type === "Identifier" && aliases.has(arg.name))) return;
      const id = declarator.node.id;
      if (id.type === "Identifier") aliases.add(id.name);
      if (id.type === "ArrayPattern")
        for (const element of id.elements)
          if (element?.type === "Identifier") aliases.add(element.name);
    },
  });
  return aliases;
}

type Scope = { aliases: Set<string>; jsx: Set<string> };

// `props.lead` (not a call) whose root is the props parameter or an alias and whose type is JSX.
function propRead(node: t.Node | null | undefined, scope: Scope): string | undefined {
  if (node?.type !== "MemberExpression" || node.computed || node.property.type !== "Identifier")
    return;
  if (node.object.type !== "Identifier" || !scope.aliases.has(node.object.name)) return;
  if (!scope.jsx.has(node.property.name)) return;
  return `${node.object.name}.${node.property.name}`;
}

function rendersAgain(path: NodePath, read: string, scope: Scope): boolean {
  let found = false;
  path.traverse({
    JSXExpressionContainer(container) {
      if (propRead(container.node.expression as t.Node, scope) === read) {
        found = true;
        container.stop();
      }
    },
  });
  return found;
}

function check(file: string, findings: Finding[]) {
  const code = readFileSync(file, "utf8");
  let ast: ReturnType<typeof parse>;
  try {
    ast = parse(code, { sourceType: "module", plugins: ["typescript", "jsx"] });
  } catch (error) {
    console.error(`${relative(repoRoot, file)}: cannot parse: ${(error as Error).message}`);
    process.exitCode = 1;
    return;
  }
  const declared = new Map<string, t.TSTypeElement[]>();
  traverse(ast, {
    TSTypeAliasDeclaration(alias) {
      if (alias.node.typeAnnotation.type === "TSTypeLiteral")
        declared.set(alias.node.id.name, alias.node.typeAnnotation.members);
    },
    TSInterfaceDeclaration(decl) {
      declared.set(decl.node.id.name, decl.node.body.body);
    },
  });
  traverse(ast, {
    Function(fn) {
      const scope: Scope = { aliases: propsAliases(fn), jsx: jsxProps(fn, declared) };
      if (scope.aliases.size === 0 || scope.jsx.size === 0) return;
      const report = (node: t.Node, prop: string) =>
        findings.push({ file: relative(repoRoot, file), line: node.loc?.start.line ?? 0, prop });
      fn.traverse({
        ConditionalExpression(cond) {
          const read = propRead(cond.node.test, scope);
          if (read && rendersAgain(cond.get("consequent"), read, scope)) report(cond.node, read);
        },
        LogicalExpression(logical) {
          if (logical.node.operator !== "&&") return;
          const read = propRead(logical.node.left, scope);
          if (read && rendersAgain(logical.get("right"), read, scope)) report(logical.node, read);
        },
        JSXElement(element) {
          const name = element.node.openingElement.name;
          if (name.type !== "JSXIdentifier" || name.name !== "Show") return;
          const when = element.node.openingElement.attributes.find(
            (attr): attr is t.JSXAttribute =>
              attr.type === "JSXAttribute" && attr.name.name === "when",
          );
          const value =
            when?.value?.type === "JSXExpressionContainer" ? when.value.expression : undefined;
          const read = propRead(value as t.Node, scope);
          if (!read) return;
          for (const child of element.get("children")) {
            if (rendersAgain(child, read, scope)) {
              report(element.node, read);
              return;
            }
          }
        },
      });
    },
  });
}

const findings: Finding[] = [];
const named = process.argv.slice(2).filter((file) => file.endsWith(".tsx"));
const files =
  process.argv.length > 2
    ? named.map((file) => resolve(file))
    : roots.flatMap((root) =>
        [...new Bun.Glob("**/*.tsx").scanSync(resolve(repoRoot, root))].map((file) =>
          resolve(repoRoot, root, file),
        ),
      );
for (const file of files) check(file, findings);
const unique = [...new Map(findings.map((f) => [`${f.file}:${f.line}:${f.prop}`, f])).values()];
for (const f of unique) {
  console.error(
    `${f.file}:${f.line}: ${f.prop} is tested and then rendered again; render it once through <Show when={${f.prop}}>{(value) => …value()…}</Show>`,
  );
}
if (unique.length > 0) {
  console.error(`\n${unique.length} double-read JSX prop(s) found.`);
  process.exit(1);
}
console.log("No double-read JSX props.");
