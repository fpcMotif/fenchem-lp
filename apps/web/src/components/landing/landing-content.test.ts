import { describe, expect, test } from "vitest";

import {
  certifications,
  createInquiryHref,
  getIngredientsByApplication,
  getLandingSummary,
  ingredients,
  isSectionId,
  navLinks,
  processSteps,
  proofCards,
  regions,
  resolveSectionAnchor,
  sectionIds,
  toAnchor,
} from "./landing-content";

describe("landing content contract", () => {
  test("keeps navigation anchored to real sections", () => {
    const sections = new Set(sectionIds);

    expect(navLinks).toHaveLength(sectionIds.length);
    for (const link of navLinks) {
      expect(link.label.trim()).not.toBe("");
      expect(sections.has(link.section)).toBe(true);
      expect(toAnchor(link.section)).toBe(`#${link.section}`);
    }
  });

  test.each([
    ["industries", true],
    ["#quality", true],
    ["  GLOBAL-SUPPLY  ", true],
    ["", false],
    ["unknown", false],
    ["###contact", true],
  ])("detects section ids from %s", (value, expected) => {
    expect(isSectionId(value)).toBe(expected);
  });

  test.each([
    ["industries", "#industries"],
    ["#quality", "#quality"],
    ["  GLOBAL-SUPPLY ", "#global-supply"],
    ["###contact", "#contact"],
    ["", "#contact"],
    ["missing", "#contact"],
    [null, "#contact"],
    [42, "#contact"],
  ])("resolves %s into a safe anchor", (value, expected) => {
    expect(resolveSectionAnchor(value)).toBe(expected);
  });

  test("can override the invalid-anchor fallback", () => {
    expect(resolveSectionAnchor("does-not-exist", "industries")).toBe("#industries");
  });

  test("filters ingredients by application without mutating the source list", () => {
    const all = getIngredientsByApplication();
    const nutrition = getIngredientsByApplication(" nutrition ");
    const food = getIngredientsByApplication("FOOD & BEVERAGE");
    const none = getIngredientsByApplication("industrial coatings");

    all.pop();

    expect(all).toHaveLength(ingredients.length - 1);
    expect(ingredients).toHaveLength(8);
    expect(nutrition.map((ingredient) => ingredient.name)).toEqual([
      "Ashwagandha KSM-66",
      "Lutein",
      "Astaxanthin",
      "Coenzyme Q10",
    ]);
    expect(food.map((ingredient) => ingredient.name)).toEqual([
      "Curcumin",
      "Phytosterols",
      "Beta-Carotene",
    ]);
    expect(none).toEqual([]);
  });

  test("builds encoded inquiry links for every entry point", () => {
    expect(createInquiryHref("industries")).toContain(
      "subject=Fenchem%20ingredient%20portfolio%20inquiry",
    );
    expect(createInquiryHref("quality")).toContain(
      "subject=Fenchem%20quality%20documentation%20request",
    );
    expect(createInquiryHref("global-supply")).toContain(
      "subject=Fenchem%20global%20supply%20inquiry",
    );
    expect(createInquiryHref("unknown")).toContain("subject=Fenchem%20partnership%20inquiry");
    expect(createInquiryHref()).toContain(
      "body=Please%20send%20specifications%2C%20lead%20times%2C%20and%20documentation.",
    );
  });

  test("keeps visible content complete and non-duplicated", () => {
    const ingredientNames = ingredients.map((ingredient) => ingredient.name);
    const proofTitles = proofCards.map((card) => card.title);
    const processTitles = processSteps.map((step) => step.title);
    const regionCities = regions.map((region) => region.city);

    expect(new Set(ingredientNames).size).toBe(ingredientNames.length);
    expect(new Set(proofTitles).size).toBe(proofTitles.length);
    expect(new Set(processTitles).size).toBe(processTitles.length);
    expect(new Set(certifications).size).toBe(certifications.length);
    expect(new Set(regionCities).size).toBe(regionCities.length);
    expect(
      proofCards.every(
        (card) => card.image.alt.length > 24 && card.image.src.startsWith("https://"),
      ),
    ).toBe(true);
  });

  test("summarizes the shipped landing surface", () => {
    expect(getLandingSummary()).toEqual({
      navLinks: 4,
      proofCards: 4,
      ingredients: 8,
      processSteps: 4,
      certifications: 6,
      regions: 6,
    });
  });
});
