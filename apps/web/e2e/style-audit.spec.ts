import { expect, test } from "@playwright/test";

test.describe("Style Audit Parity Matrix", () => {
  test("loads the style audit page and verifies computed styles", async ({ page }) => {
    await page.goto("/style-audit", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { level: 1, name: "Design System Style Audit Matrix" }),
    ).toBeVisible();

    // Verify Light Button Primary
    const lightBtn = page.locator("#audit-light #btn-variant-default");
    await expect(lightBtn).toBeVisible();
    const lightBtnStyles = await lightBtn.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        display: s.display,
        borderRadius: s.borderRadius,
        fontWeight: s.fontWeight,
        fontSize: s.fontSize,
        paddingLeft: s.paddingLeft,
        paddingRight: s.paddingRight,
        height: s.height,
      };
    });

    expect(["inline-flex", "flex"]).toContain(lightBtnStyles.display);
    expect(lightBtnStyles.borderRadius).toBe("0px");
    expect(lightBtnStyles.height).toBe("32px"); // h-8

    // Verify Inputs
    const lightInput = page.locator("#audit-light #input-default");
    await expect(lightInput).toBeVisible();
    const lightInputStyles = await lightInput.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        height: s.height,
        borderRadius: s.borderRadius,
        fontSize: s.fontSize,
      };
    });
    expect(lightInputStyles.height).toBe("32px");
    expect(lightInputStyles.borderRadius).toBe("0px");

    // Verify Checkboxes
    const chk = page.locator("#audit-light [data-slot=checkbox]").first();
    await expect(chk).toBeVisible();
    const chkStyles = await chk.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        width: s.width,
        height: s.height,
        borderRadius: s.borderRadius,
      };
    });
    expect(chkStyles.width).toBe("16px");
    expect(chkStyles.height).toBe("16px");
    expect(chkStyles.borderRadius).toBe("0px");

    // Verify Cards
    const card = page.locator("#audit-light #card-default");
    await expect(card).toBeVisible();
    const cardStyles = await card.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        display: s.display,
        flexDirection: s.flexDirection,
        borderRadius: s.borderRadius,
      };
    });
    expect(cardStyles.display).toBe("flex");
    expect(cardStyles.flexDirection).toBe("column");
    expect(cardStyles.borderRadius).toBe("0px");
  });
});
