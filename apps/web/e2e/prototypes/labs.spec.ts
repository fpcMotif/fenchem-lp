import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { expect, test } from "@playwright/test";

const routesDir = fileURLToPath(new URL("../../src/routes/prototypes", import.meta.url));
const labs = readdirSync(routesDir)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => file.slice(0, -".tsx".length));

for (const lab of labs) {
  test(`${lab} lab renders every variant with a clean console`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" && !message.location().url.endsWith("/favicon.ico"))
        errors.push(message.text());
    });

    await page.goto(`/prototypes/${lab}`);
    const variants = page.locator(".proto-picker-item:not(.proto-picker-replay)");
    await variants.first().waitFor();
    await page.waitForFunction(() => {
      const item = document.querySelector(".proto-picker-item");
      return item && Object.keys(item).some((key) => key.startsWith("__reactProps"));
    });

    const count = await variants.count();
    expect(count).toBeGreaterThan(1);
    for (let index = 0; index < count; index++) {
      await variants.nth(index).click();
      await expect(variants.nth(index)).toHaveAttribute("aria-current", "true");
    }
    expect(errors).toEqual([]);
  });
}
