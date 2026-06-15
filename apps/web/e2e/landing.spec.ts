import { expect, type Page, test } from "@playwright/test";

const gotoLanding = async (page: Page, path = "/") => {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1, name: "Fenchem" })).toBeVisible();
};

test.describe("Fenchem landing page", () => {
  test("loads the production landing page without prototype friction", async ({ page }) => {
    const messages: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        messages.push(message.text());
      }
    });

    await gotoLanding(page, "/?variant=c");

    await expect(page).toHaveTitle(/Fenchem/);
    await expect(page.getByText("Botanical intelligence since 1995")).toBeVisible();
    await expect(page.getByLabel("Previous variant")).toHaveCount(0);
    await expect(page.getByText("Deep Forest")).toHaveCount(0);
    await expect(page.getByText("TanStack Router")).toHaveCount(0);
    expect(messages).toEqual([]);
  });

  test("lets buyers move from nav to quality proof and contact", async ({ page }) => {
    await gotoLanding(page);

    await page.getByRole("link", { name: "Quality" }).click();
    await expect(page).toHaveURL(/#quality$/);
    await expect(
      page.getByRole("heading", {
        name: "Every lot has a paper trail before it has a sales story.",
      }),
    ).toBeVisible();

    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Contact" })
      .click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(
      page.getByRole("heading", { name: "Tell Fenchem what you are formulating." }),
    ).toBeVisible();
  });

  test("keeps the desktop layout free of horizontal overflow", async ({ page }) => {
    await gotoLanding(page);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("stays usable with reduced motion preferences", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoLanding(page);

    await expect(page.getByRole("link", { name: "Explore portfolio" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Built for real formulation work." }),
    ).toBeVisible();
  });

  test("keeps every shipped link safe and every hash target valid", async ({ page }) => {
    await gotoLanding(page);

    const linkAudit = await page.evaluate(() => {
      const ids = new Set([...document.querySelectorAll("[id]")].map((element) => element.id));
      return [...document.querySelectorAll<HTMLAnchorElement>("a[href]")].map((link) => {
        const href = link.getAttribute("href") ?? "";
        const hash = href.startsWith("#") ? href.slice(1) : "";
        return {
          href,
          text: link.textContent?.replace(/\s+/g, " ").trim() ?? "",
          isSafe: href.startsWith("#") || href.startsWith("mailto:sales@fenchem.com?"),
          targetExists: !hash || ids.has(hash),
        };
      });
    });

    expect(linkAudit.length).toBeGreaterThan(8);
    expect(linkAudit.filter((link) => !link.isSafe || !link.targetExists)).toEqual([]);
  });

  test("supports keyboard users with a visible skip link", async ({ page }) => {
    await gotoLanding(page);

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to ingredients" });
    await expect(skipLink).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#industries$/);
    await expect(
      page.getByRole("heading", { name: "Built for real formulation work." }),
    ).toBeVisible();
  });

  test("keeps keyboard focus visible in the header", async ({ page }) => {
    await gotoLanding(page);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const focusState = await page.evaluate(() => {
      const element = document.activeElement;
      if (!(element instanceof HTMLElement)) {
        return null;
      }
      const style = window.getComputedStyle(element);
      return {
        label: element.textContent?.replace(/\s+/g, " ").trim(),
        outlineStyle: style.outlineStyle,
        outlineWidth: Number.parseFloat(style.outlineWidth),
      };
    });

    expect(focusState?.label).toBe("Fenchem");
    expect(focusState?.outlineStyle).not.toBe("none");
    expect(focusState?.outlineWidth).toBeGreaterThan(0);
  });
});

test.describe("Fenchem landing page mobile", () => {
  test("keeps core actions visible on a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoLanding(page);

    await expect(page.getByRole("link", { name: "Request specs" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore portfolio" })).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", {
        name: "Quality",
      }),
    ).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("keeps enlarged text operable without horizontal clipping", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 740 });
    await gotoLanding(page);
    await page.addStyleTag({ content: "html { font-size: 150% !important; }" });

    await expect(page.getByRole("link", { name: "Request specs" })).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", {
        name: "Contact",
      }),
    ).toBeVisible();

    const layout = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth;
      const clippedControls = [...document.querySelectorAll<HTMLElement>("main a, main button")]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          if (element.classList.contains("sr-only")) {
            return false;
          }
          if (style.display === "none" || style.visibility === "hidden") {
            return false;
          }
          if (rect.width === 0 || rect.height === 0) {
            return false;
          }
          if (
            (style.position === "absolute" || style.position === "fixed") &&
            rect.width <= 1 &&
            rect.height <= 1 &&
            (style.overflow === "hidden" || style.clip !== "auto" || style.clipPath !== "none")
          ) {
            return false;
          }
          return rect.left < -1 || rect.right > viewportWidth + 1;
        })
        .map((element) => element.textContent?.replace(/\s+/g, " ").trim() ?? element.tagName);

      return {
        clippedControls,
        overflow: document.documentElement.scrollWidth - viewportWidth,
      };
    });

    expect(layout.overflow).toBeLessThanOrEqual(1);
    expect(layout.clippedControls).toEqual([]);
  });
});

test.describe("Fenchem landing page viewport extremes", () => {
  const viewports = [
    { name: "tiny mobile", width: 320, height: 740 },
    { name: "standard mobile", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 1000 },
    { name: "wide desktop", width: 1920, height: 1080 },
  ] as const;

  for (const viewport of viewports) {
    test(`keeps ${viewport.name} usable without overflow`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoLanding(page);

      await expect(page.getByRole("link", { name: "Request specs" })).toBeVisible();

      const layout = await page.evaluate(() => {
        const hero = document.querySelector("section");
        const stats = [...document.querySelectorAll("dd")].map((element) =>
          element.textContent?.trim(),
        );
        const smallTargets = [...document.querySelectorAll<HTMLElement>("main a, main button")]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            if (element.classList.contains("sr-only")) {
              return false;
            }
            if (style.display === "none" || style.visibility === "hidden") {
              return false;
            }
            if (rect.width === 0 || rect.height === 0) {
              return false;
            }
            if (
              (style.position === "absolute" || style.position === "fixed") &&
              rect.width <= 1 &&
              rect.height <= 1 &&
              (style.overflow === "hidden" || style.clip !== "auto" || style.clipPath !== "none")
            ) {
              return false;
            }
            return rect.width < 40 || rect.height < 40;
          })
          .map((element) => element.textContent?.replace(/\s+/g, " ").trim() ?? element.tagName);
        return {
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          firstViewportHasStats: stats.includes("25+") && stats.includes("40+"),
          heroHeight: hero?.getBoundingClientRect().height ?? 0,
          smallTargets,
        };
      });

      expect(layout.overflow).toBeLessThanOrEqual(1);
      expect(layout.firstViewportHasStats).toBe(true);
      expect(layout.heroHeight).toBeGreaterThan(420);
      expect(layout.smallTargets).toEqual([]);
    });
  }
});
