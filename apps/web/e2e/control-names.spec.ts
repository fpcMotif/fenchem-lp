import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { expect, test } from "@playwright/test";

const prototypeDir = fileURLToPath(new URL("../src/components/prototype/", import.meta.url));
const pageKeys = [
  ...readFileSync(`${prototypeDir}variants.ts`, "utf8").matchAll(/page\(\s*"([a-z0-9]+)"/g),
].map((match) => match[1]);
const folderKeys = ["abouts", "products"].flatMap((family) =>
  readdirSync(`${prototypeDir}variant-oos1/${family}`, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !pageKeys.includes(entry.name))
    .map((entry) => entry.name)
    .filter((name) => name !== "shared"),
);
const targets = [
  ...[...pageKeys, ...folderKeys].map((key) => `/?variant=${key}`),
  ...["about", "products", "insights", "contact"].map((view) => `/?variant=oos1&page=${view}`),
];

const CONTROL_ROLES = new Set([
  "button",
  "checkbox",
  "combobox",
  "link",
  "listbox",
  "radio",
  "searchbox",
  "slider",
  "spinbutton",
  "switch",
  "tab",
  "textbox",
]);

type AXNode = {
  ignored: boolean;
  role?: { value: string };
  name?: { value: string };
  backendDOMNodeId?: number;
};

for (const target of targets) {
  test(`${target} gives every control an accessible name`, async ({ page }) => {
    await page.goto(target, { waitUntil: "load" });
    await page.locator("main, [role=main], body").first().waitFor();
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("DOM.getDocument");
    const { nodes } = (await cdp.send("Accessibility.getFullAXTree")) as { nodes: AXNode[] };

    const unnamed: string[] = [];
    for (const node of nodes) {
      const role = node.role?.value ?? "";
      if (node.ignored || !CONTROL_ROLES.has(role) || node.name?.value.trim()) continue;
      const { outerHTML } = await cdp.send("DOM.getOuterHTML", {
        backendNodeId: node.backendDOMNodeId,
      });
      unnamed.push(`${role}: ${outerHTML.slice(0, 160)}`);
    }

    expect(unnamed).toEqual([]);
  });
}
