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

test("opening the about page from a scrolled home lands at its top", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?variant=oos1", { waitUntil: "networkidle" });
  const aboutLink = page.locator('header a[href="#about"]');
  await page.waitForFunction(() => {
    const link = document.querySelector('header a[href="#about"]');
    return link && Object.keys(link).some((key) => key.startsWith("__reactProps"));
  });
  await page.evaluate(() => window.scrollTo({ top: 3000, behavior: "instant" }));
  await aboutLink.click();
  await expect(page).toHaveURL(/page=about#about-top$/);
  await expect
    .poll(() =>
      page.evaluate(() => {
        const top = document.getElementById("about-top")?.getBoundingClientRect().top;
        return top === undefined ? Number.POSITIVE_INFINITY : Math.abs(top);
      }),
    )
    .toBeLessThan(2);
});

test("product comparisons change only the selected section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const sections = async (query: string) => {
    await page.goto(`/?variant=oos1pb${query}`, { waitUntil: "networkidle" });
    await page
      .getByRole("group", { name: "Categories" })
      .getByRole("button", { name: "功能性食品" })
      .click();
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
