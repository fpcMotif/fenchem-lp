import { expect, type Page, test } from "@playwright/test";

const gotoLanding = async (page: Page) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
};

const horizontalOverflow = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

test.describe("Fenchem landing page", () => {
  test("serves the default page hydrated, without prototype chrome or errors", async ({ page }) => {
    const problems: string[] = [];
    page.on("pageerror", (error) => problems.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" && !message.location().url.endsWith("/favicon.ico"))
        problems.push(message.text());
    });

    await gotoLanding(page);

    await expect(page).toHaveURL(/\?variant=/);
    await expect(page).toHaveTitle(/Fenchem/);
    await expect(page.getByLabel("Previous variant")).toHaveCount(0);
    await expect(page.getByLabel("Next variant")).toHaveCount(0);
    expect(problems).toEqual([]);
  });

  test("points every in-page link at an existing section", async ({ page }) => {
    await gotoLanding(page);

    const broken = await page.evaluate(() => {
      const ids = new Set([...document.querySelectorAll("[id]")].map((element) => element.id));
      return [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
        .map((link) => link.getAttribute("href")!.slice(1))
        .filter((id) => id && !ids.has(id));
    });

    expect(broken).toEqual([]);
  });

  test("stays usable with reduced motion preferences", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoLanding(page);

    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(1);
  });
});

test.describe("Fenchem landing page viewports", () => {
  const viewports = [
    { name: "tiny mobile", width: 320, height: 740 },
    { name: "standard mobile", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 1000 },
    { name: "wide desktop", width: 1920, height: 1080 },
  ] as const;

  for (const viewport of viewports) {
    test(`keeps ${viewport.name} free of horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoLanding(page);

      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(1);
    });
  }
});
