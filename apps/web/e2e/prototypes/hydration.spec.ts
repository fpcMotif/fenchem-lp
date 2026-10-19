import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { expect, test } from "@playwright/test";

const src = (path: string) => fileURLToPath(new URL(`../../src/${path}`, import.meta.url));
const folders = (path: string) =>
  readdirSync(src(path), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
const files = (path: string) =>
  readdirSync(src(path))
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.slice(0, -".tsx".length));

const pageVariants = [
  ...readFileSync(src("components/prototype/variants.ts"), "utf8").matchAll(/page\(\s*"([^"]+)"/g),
].map((match) => match[1]);
const aboutVariants = folders("components/prototype/variant-oos1/abouts");
const productVariants = folders("components/prototype/variant-oos1/products").filter((key) =>
  existsSync(src(`components/prototype/variant-oos1/products/${key}/catalog.tsx`)),
);
const oos1Pages = ["about", "products", "rd", "insights", "news", "contact"];

const paths = [
  ...[...pageVariants, ...aboutVariants, ...productVariants].map((key) => `/?variant=${key}`),
  ...oos1Pages.map((page) => `/?variant=oos1&page=${page}`),
  ...files("routes/prototypes").map((lab) => `/prototypes/${lab}`),
  ...files("routes/worst").map((page) => `/worst/${page}`),
  "/style-audit",
];

const HYDRATION_WARNING = /hydration key miss|hydration mismatch|unclaimed/i;

const COLD_COMPILE_MS = 45_000;

test.describe.configure({ mode: "parallel", timeout: COLD_COMPILE_MS });

for (const path of paths) {
  test(`${path} hydrates without errors`, async ({ page }) => {
    const problems: string[] = [];
    page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
    page.on("response", (response) => {
      if (response.status() >= 500) problems.push(`${response.status()}: ${response.url()}`);
    });
    page.on("console", (message) => {
      const text = message.text();
      if (message.location().url.endsWith("/favicon.ico")) return;
      if (text.startsWith("Failed to load resource")) return;
      if (message.type() === "error" || HYDRATION_WARNING.test(text))
        problems.push(`${message.type()}: ${text}`);
    });

    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("data-hydrated");
    expect(problems).toEqual([]);
  });
}
