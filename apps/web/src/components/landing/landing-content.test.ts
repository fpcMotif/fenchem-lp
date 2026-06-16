import { describe, expect, test } from "vitest";

import {
  certificationDetails,
  certifications,
  company,
  createInquiryHref,
  divisionByApplication,
  divisionForApplication,
  getFeaturedIngredients,
  getIngredientsByApplication,
  getLandingSummary,
  industries,
  ingredients,
  isSectionId,
  navLinks,
  pillars,
  processSteps,
  proofCards,
  regions,
  resolveSectionAnchor,
  sectionIds,
  stats,
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
      industries: 3,
      pillars: 3,
      stats: 4,
      ingredients: 8,
      featuredIngredients: 6,
      processSteps: 4,
      certifications: 6,
      regions: 6,
    });
  });
});

describe("canonical content seam", () => {
  test("derives certification names from the detailed list without drift", () => {
    expect(certifications).toEqual(certificationDetails.map((certification) => certification.name));
    for (const certification of certificationDetails) {
      expect(certification.name.trim()).not.toBe("");
      expect(certification.sub.trim()).not.toBe("");
    }
  });

  test("exposes a curated six-ingredient portfolio subset in stable order", () => {
    const featured = getFeaturedIngredients();

    expect(featured.map((ingredient) => ingredient.name)).toEqual([
      "Ashwagandha KSM-66",
      "Lutein",
      "Astaxanthin",
      "Coenzyme Q10",
      "Curcumin",
      "Hyaluronic Acid",
    ]);
    expect(featured.every((ingredient) => ingredient.featured)).toBe(true);
  });

  test("gives every ingredient the fields each presentation renders", () => {
    const codes = ingredients.map((ingredient) => ingredient.code);

    expect(new Set(codes).size).toBe(codes.length);
    for (const ingredient of ingredients) {
      expect(ingredient.latin.trim()).not.toBe("");
      expect(ingredient.purity.trim()).not.toBe("");
      expect(ingredient.form.trim()).not.toBe("");
      expect(ingredient.category.trim()).not.toBe("");
      expect(ingredient.useCase.trim()).not.toBe("");
      expect(ingredient.code).toMatch(/^FN-\d{3}$/);
      expect(ingredient.image.alt.length).toBeGreaterThan(12);
      expect(ingredient.image.src.startsWith("https://")).toBe(true);
    }
  });

  test("maps every ingredient application to a division accent", () => {
    const applications = new Set(ingredients.map((ingredient) => ingredient.application));

    for (const application of applications) {
      expect(divisionForApplication(application)).toBe(divisionByApplication[application]);
    }
    expect(divisionForApplication("Nutrition")).toBe("nutrition");
    expect(divisionForApplication("Food & Beverage")).toBe("food");
    expect(divisionForApplication("Personal Care")).toBe("cosmetics");
  });

  test("keeps the global footprint complete with coordinates", () => {
    expect(regions).toHaveLength(6);
    for (const region of regions) {
      expect(region.country.trim()).not.toBe("");
      expect(region.short.trim()).not.toBe("");
      expect(region.coords).toMatch(/^[NS] [\d.]+ \/ [EW] [\d.]+$/);
    }
    expect(regions[0].city).toBe(company.hq.city);
    expect(regions[0].coords).toBe(company.hq.coords);
  });

  test("keeps headline content blocks complete and non-duplicated", () => {
    const industryTitles = industries.map((industry) => industry.title);
    const pillarTitles = pillars.map((pillar) => pillar.title);
    const statValues = stats.map((stat) => stat.value);

    expect(new Set(industryTitles).size).toBe(industryTitles.length);
    expect(new Set(pillarTitles).size).toBe(pillarTitles.length);
    expect(new Set(statValues).size).toBe(statValues.length);
    expect(industries.every((industry) => industry.image.src.startsWith("https://"))).toBe(true);
    expect(stats.some((stat) => stat.label.includes("1995"))).toBe(true);
  });

  test("routes inquiry links through the canonical company inbox", () => {
    expect(company.email).toBe("sales@fenchem.com");
    expect(createInquiryHref("contact")).toContain(`mailto:${company.email}`);
  });
});
