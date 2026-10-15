import { expect, test, type Page } from "@playwright/test";

const VARIANT = { margin: 1, contents: 2, locator: 3, spine: 4, stepper: 5 } as const;

async function openLab(page: Page, variant: number) {
  await page.goto(`/prototypes/insights-toc?v=${variant}&n=4`);
  await page.waitForFunction(() => {
    const item = document.querySelector(".proto-picker-item");
    return item && Object.keys(item).some((key) => key.startsWith("__reactProps"));
  });
}

const contentsNav = (page: Page) => page.getByRole("navigation", { name: "本页目录" });

test("Margin rail follows the reader and jumps to chapters", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "The rail shows at desktop width");
  await openLab(page, VARIANT.margin);
  const rail = contentsNav(page);
  await rail.getByRole("link", { name: /植物油脂与屏障/ }).click();
  const chapter = rail.getByRole("link", { name: /选择标准/ });
  await chapter.click();
  await expect(chapter).toHaveAttribute("aria-current", "location");
  await expect(page.locator("#barrier-oils-criteria-title")).toBeInViewport();
});

test("Margin sheet opens from the bar and closes on a jump", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "The sheet replaces the rail below desktop");
  await openLab(page, VARIANT.margin);
  const trigger = page.getByRole("button", { name: /目录/ });
  await trigger.click();
  const sheet = page.getByRole("dialog", { name: "本页目录" });
  await expect(sheet).toBeVisible();
  await sheet.getByRole("link", { name: /选择标准/ }).click();
  await expect(sheet).toBeHidden();
  await expect(trigger).toContainText("选择标准");
});

test("Contents table jumps in and the running head jumps back", async ({ page }) => {
  await openLab(page, VARIANT.contents);
  await page.getByRole("link", { name: /三项选择标准/ }).click();
  await expect(page.locator("#barrier-oils-criteria-title")).toBeInViewport();
  await expect(page.getByText("二 选择标准", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "目录", exact: true }).click();
  await expect(page.locator("#barrier-oils-contents-entry")).toBeInViewport();
});

test("Locator popover previews, keeps arrow keys, and closes on Escape", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "The two-pane keyboard model is desktop only");
  await openLab(page, VARIANT.locator);
  const trigger = page.locator('[aria-controls="insights-locator-panel"]');
  const panel = page.locator("#insights-locator-panel");
  await trigger.click();
  await expect(panel).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(panel).toContainText("植物油脂与皮肤屏障：从脂肪酸谱读懂配方表现");
  await page.keyboard.press("ArrowRight");
  await expect(panel.getByRole("link", { name: /脂肪酸谱决定肤感与功能/ })).toBeFocused();
  await expect(page.locator(".proto-picker-item[data-active]")).toHaveText("Locator");
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await panel.getByRole("link", { name: /植物油脂与屏障/ }).hover();
  await panel.getByRole("link", { name: /三项选择标准/ }).click();
  await expect(panel).toBeHidden();
  await expect(trigger).toContainText("选择标准");
});

test("Locator stacks the full contents on phones", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Phones get the stacked list");
  await openLab(page, VARIANT.locator);
  const trigger = page.locator('[aria-controls="insights-locator-panel"]');
  await trigger.click();
  await page
    .locator("#insights-locator-panel")
    .getByRole("link", { name: /选择标准/ })
    .click();
  await expect(page.locator("#insights-locator-panel")).toBeHidden();
  await expect(trigger).toContainText("选择标准");
});

test("Spine expands on hover, jumps from a label, and scrubs", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Hover expansion needs a fine pointer");
  await openLab(page, VARIANT.spine);
  await page.locator("#insights-article").scrollIntoViewIfNeeded();
  const spine = contentsNav(page);
  await expect(spine).toBeVisible();
  await spine.hover();
  await expect(spine).toHaveAttribute("data-expanded", "");
  const label = spine.getByRole("link", { name: /选择标准/ });
  await label.click();
  await expect(label).toHaveAttribute("aria-current", "location");

  const box = await spine.boundingBox();
  if (!box) throw new Error("spine has no box");
  const x = box.x + box.width - 12;
  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.move(x, box.y + box.height * 0.2);
  await page.mouse.down();
  await page.mouse.move(x, box.y + box.height * 0.95, { steps: 6 });
  await page.mouse.up();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before + 400);
});

test("Stepper tabs jump between articles and show their chapters", async ({ page }) => {
  await openLab(page, VARIANT.stepper);
  const tab = page.getByRole("navigation", { name: "本页文章" }).getByRole("link", { name: /^03/ });
  await tab.click();
  await expect(tab).toHaveAttribute("aria-current", "location");
  await expect(page.getByRole("list", { name: "健康老龄化 章节" })).toBeVisible();
  await expect(page.locator("#healthy-aging-article")).toBeInViewport();
});
