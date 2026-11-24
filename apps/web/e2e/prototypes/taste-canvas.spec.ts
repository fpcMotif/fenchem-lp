import { expect, test, type Page } from "@playwright/test";

const STORAGE_KEY = "fenchem-lp:taste-canvas:camera";

const shell = (page: Page) => page.getByRole("region", { name: "Culture canvas" });
const world = (page: Page) => page.locator("[data-canvas-backdrop] + div");
const transform = (page: Page) =>
  world(page).evaluate((node) => (node as HTMLElement).style.transform);
const zoomReadout = (page: Page) => page.getByRole("status", { name: "Zoom level" });

async function openCanvas(page: Page, stored?: string) {
  await page.addInitScript(
    ([key, value]) => {
      if (value === undefined) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, value);
    },
    [STORAGE_KEY, stored] as const,
  );
  await page.goto("/prototypes/taste-canvas");
  await expect(world(page)).toBeVisible();
  await expect.poll(() => transform(page)).toContain("scale(");
}

async function emptyPoint(page: Page) {
  const box = await shell(page).boundingBox();
  if (!box) throw new Error("canvas has no box");
  const hit = await page.evaluate(
    ({ x, y }) => document.elementFromPoint(x, y)?.hasAttribute("data-canvas-backdrop"),
    { x: box.x + 8, y: box.y + 8 },
  );
  expect(hit).toBe(true);
  return { x: box.x + 8, y: box.y + 8 };
}

const NAMES = [
  "CultureScenes · shipped (draw-on + hover lift)",
  "Culture emblems · depth parallax",
  "Culture emblems · ambient breath",
  "Culture emblems · tint fill + sheen",
];
const itemTransform = (page: Page, id: string) =>
  page
    .locator(`[data-canvas-item="${id}"]`)
    .evaluate((node) => (node as HTMLElement).style.transform);

test("mounts every item without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await openCanvas(page);
  for (const name of NAMES) {
    await expect(page.getByRole("button", { name, exact: true })).toBeAttached();
    await expect(page.getByRole("button", { name: `Move ${name}` })).toBeAttached();
  }
  await expect(page.getByRole("heading", { name: "企业文化" })).toBeAttached();
  expect(errors).toEqual([]);
});

test("the source layout starts without overlap", async ({ page }) => {
  await openCanvas(page);
  const overlaps = await page.evaluate(() => {
    const boxes = [...document.querySelectorAll("[data-canvas-item]")].map((node) =>
      node.getBoundingClientRect(),
    );
    return boxes.some((a, i) =>
      boxes.some(
        (b, j) =>
          i < j && a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom,
      ),
    );
  });
  expect(overlaps).toBe(false);
});

test("the move handle drags an item and the position survives a reload", async ({ page }) => {
  await openCanvas(page);
  const handle = page.getByRole("button", { name: `Move ${NAMES[1]}` });
  const before = await itemTransform(page, "culture-depth");
  const box = await handle.boundingBox();
  if (!box) throw new Error("handle has no box");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + 80, box.y + 60, { steps: 4 });
  await page.mouse.up();
  await expect.poll(() => itemTransform(page, "culture-depth")).not.toBe(before);
  const moved = await itemTransform(page, "culture-depth");
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => itemTransform(page, "culture-depth")).not.toBe(moved);
  const nudged = await itemTransform(page, "culture-depth");
  await expect
    .poll(() => page.evaluate((key) => window.localStorage.getItem(key), STORAGE_KEY))
    .toContain('"culture-depth"');
  await page.reload();
  await expect.poll(() => itemTransform(page, "culture-depth")).toBe(nudged);
});

test("clicking a name copies it exactly", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await openCanvas(page);
  await page.getByRole("button", { name: NAMES[2], exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(NAMES[2]);
});

test("space + drag pans over a preview without activating it", async ({ page }) => {
  await openCanvas(page);
  await page.getByRole("button", { name: "Reset camera" }).click();
  await shell(page).focus();
  const replay = page.getByRole("button", { name: /^Replay CultureScenes/ });
  const svgCount = page.locator("#about-culture svg");
  const heading = page.getByRole("heading", { name: "企业文化" });
  const box = await heading.boundingBox();
  if (!box) throw new Error("heading has no box");
  const before = await transform(page);
  await page.keyboard.down("Space");
  await page.mouse.move(box.x + 4, box.y + 4);
  await page.mouse.down();
  await page.mouse.move(box.x + 140, box.y + 90, { steps: 4 });
  await page.mouse.up();
  await page.keyboard.up("Space");
  await expect.poll(() => transform(page)).not.toBe(before);
  expect(await page.evaluate(() => window.getSelection()?.toString() ?? "")).toBe("");
  await expect(replay).toBeAttached();
  await expect(svgCount).toHaveCount(3);
});

test("middle-button drag pans over a preview", async ({ page }) => {
  await openCanvas(page);
  await page.getByRole("button", { name: "Reset camera" }).click();
  const heading = page.getByRole("heading", { name: "企业文化" });
  const box = await heading.boundingBox();
  if (!box) throw new Error("heading has no box");
  const before = await transform(page);
  await page.mouse.move(box.x + 4, box.y + 4);
  await page.mouse.down({ button: "middle" });
  await page.mouse.move(box.x + 120, box.y + 70, { steps: 4 });
  await page.mouse.up({ button: "middle" });
  await expect.poll(() => transform(page)).not.toBe(before);
});

test("overscroll is blocked on the document while the canvas is open", async ({ page }) => {
  await openCanvas(page);
  expect(
    await page.evaluate(() => getComputedStyle(document.documentElement).overscrollBehaviorX),
  ).toBe("none");
});

test("drag and wheel on empty space pan the camera", async ({ page }) => {
  await openCanvas(page);
  const start = await emptyPoint(page);
  const before = await transform(page);
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x + 120, start.y + 80, { steps: 4 });
  await page.mouse.up();
  await expect.poll(() => transform(page)).not.toBe(before);

  const afterDrag = await transform(page);
  await page.mouse.wheel(0, 200);
  await expect.poll(() => transform(page)).not.toBe(afterDrag);
});

test("two-finger pinch zooms, and a lifted finger keeps panning", async ({ page }) => {
  await openCanvas(page);
  const start = await emptyPoint(page);
  const cdp = await page.context().newCDPSession(page);
  const touch = (
    type: "touchStart" | "touchMove" | "touchEnd" | "touchCancel",
    points: { x: number; y: number; id: number }[],
  ) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: points });
  const a = { x: start.x, y: start.y, id: 1 };
  const b = { x: start.x + 40, y: start.y + 40, id: 2 };
  const before = await zoomReadout(page).textContent();
  await touch("touchStart", [a]);
  await touch("touchStart", [a, b]);
  for (let step = 1; step <= 4; step += 1) {
    await touch("touchMove", [a, { ...b, x: b.x + step * 30, y: b.y + step * 30 }]);
  }
  await expect.poll(() => zoomReadout(page).textContent()).not.toBe(before);
  const pinched = await transform(page);
  await touch("touchEnd", [a]);
  for (let step = 1; step <= 3; step += 1) {
    await touch("touchMove", [{ ...a, x: a.x + step * 20 }]);
  }
  await expect.poll(() => transform(page)).not.toBe(pinched);
  await touch("touchCancel", []);
});

test("ctrl + wheel zooms around the cursor", async ({ page }) => {
  await openCanvas(page);
  const before = await zoomReadout(page).textContent();
  const start = await emptyPoint(page);
  await page.mouse.move(start.x, start.y);
  await page.keyboard.down("Control");
  await page.mouse.wheel(0, -200);
  await page.keyboard.up("Control");
  await expect.poll(() => zoomReadout(page).textContent()).not.toBe(before);
});

test("dragging inside a preview selects text instead of panning", async ({ page }) => {
  await openCanvas(page);
  await page.getByRole("button", { name: "Reset camera" }).click();
  const before = await transform(page);
  const heading = page.getByRole("heading", { name: "企业文化" });
  const box = await heading.boundingBox();
  if (!box) throw new Error("heading has no box");
  await page.mouse.move(box.x + 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width - 2, box.y + box.height / 2, { steps: 4 });
  await page.mouse.up();
  expect(await transform(page)).toBe(before);
  expect(await page.evaluate(() => window.getSelection()?.toString() ?? "")).not.toBe("");
});

test("keyboard moves the camera only from the canvas shell", async ({ page }) => {
  await openCanvas(page);
  await shell(page).focus();
  await expect(shell(page)).toBeFocused();
  const before = await transform(page);
  await page.keyboard.press("ArrowLeft");
  await expect.poll(() => transform(page)).not.toBe(before);

  const replay = page.getByRole("button", { name: /^Replay CultureScenes/ });
  await replay.focus();
  const focused = await transform(page);
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(100);
  expect(await transform(page)).toBe(focused);
});

test("fit and reset buttons drive the camera", async ({ page }) => {
  await openCanvas(page);
  await page.getByRole("button", { name: "Reset camera" }).click();
  await expect(zoomReadout(page)).toHaveText("100%");
  await page.getByRole("button", { name: "Fit all" }).click();
  await expect(zoomReadout(page)).not.toHaveText("100%");
});

test("tabbing to an offscreen control brings it into view", async ({ page }) => {
  await openCanvas(page);
  await page.getByRole("button", { name: "Reset camera" }).click();
  await expect(zoomReadout(page)).toHaveText("100%");
  const offscreen = page.getByRole("button", { name: /^Replay CultureScenes/ });
  await expect(offscreen).not.toBeInViewport();
  await offscreen.focus();
  await expect(offscreen).toBeInViewport();
});

test("the camera survives a reload and bad storage falls back to fit", async ({ page }) => {
  await openCanvas(page);
  await page.getByRole("button", { name: "Reset camera" }).click();
  await expect(zoomReadout(page)).toHaveText("100%");
  await expect
    .poll(() => page.evaluate((key) => window.localStorage.getItem(key), STORAGE_KEY))
    .toContain('"zoom":1');
  await page.reload();
  await expect(zoomReadout(page)).toHaveText("100%");

  await page.evaluate((key) => window.localStorage.setItem(key, "{not json"), STORAGE_KEY);
  await page.reload();
  await expect(world(page)).toBeVisible();
  await expect(zoomReadout(page)).not.toHaveText("100%");
});

test("culture emblems draw on and replay redraws them", async ({ page }) => {
  await openCanvas(page);
  const stroke = page.locator("#about-culture svg path").first();
  await expect.poll(() => stroke.evaluate((node) => getComputedStyle(node).opacity)).toBe("1");
  await page.getByRole("button", { name: /^Replay CultureScenes/ }).click();
  await expect(page.locator("#about-culture svg")).toHaveCount(3);
  await expect.poll(() => stroke.evaluate((node) => getComputedStyle(node).opacity)).toBe("1");
});
