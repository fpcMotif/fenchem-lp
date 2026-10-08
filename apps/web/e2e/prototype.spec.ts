import { expect, test } from "@playwright/test";

test("production keyboard navigation stays inside product tabs", async ({ page }) => {
  await page.goto("/?variant=oos1pb");
  const tabs = page.locator("#products-solutions [role=tab]");
  await tabs.first().waitFor();
  await page.waitForFunction(() => {
    const tab = document.querySelector("#products-solutions [role=tab]");
    return tab && Object.keys(tab).some((key) => key.startsWith("__reactProps"));
  });
  await expect(page.getByLabel("Next variant")).toHaveCount(0);
  await tabs.first().focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page).toHaveURL(/variant=oos1pb$/);
  await page.locator("body").click({ position: { x: 2, y: 300 } });
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/variant=oos1pb$/);
});

test("product comparisons change only the selected section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const sections = async (query: string) => {
    await page.goto(`/?variant=oos1pb${query}`, { waitUntil: "networkidle" });
    return {
      catalog: await page.locator("#products-catalog").innerText(),
      solutions: await page.locator("#products-solutions").innerText(),
    };
  };
  const combined = await sections("");
  const baseline = await sections("&compare=baseline");
  expect(combined.catalog).not.toBe(baseline.catalog);
  expect(combined.solutions).not.toBe(baseline.solutions);
  expect(await sections("&compare=catalog")).toEqual({
    catalog: combined.catalog,
    solutions: baseline.solutions,
  });
  expect(await sections("&compare=solutions")).toEqual({
    catalog: baseline.catalog,
    solutions: combined.solutions,
  });
});
