import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import {
  certifications,
  ingredients,
  navLinks,
  processSteps,
  proofCards,
  regions,
  sectionIds,
  toAnchor,
} from "./landing-content";
import { LandingPage } from "./landing-page";

describe("LandingPage", () => {
  test("renders one production landing page without prototype controls", () => {
    render(<LandingPage />);

    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1, name: "Fenchem" })).toBeTruthy();
    expect(screen.queryByLabelText("Previous variant")).toBeNull();
    expect(screen.queryByText(/Botanical Editorial|Innovation Lab|Deep Forest/)).toBeNull();
  });

  test("links primary navigation to each section", () => {
    render(<LandingPage />);

    const navigation = screen.getByRole("navigation", { name: "Primary navigation" });
    for (const link of navLinks) {
      const element = within(navigation).getByRole("link", { name: link.label });
      expect(element.getAttribute("href")).toBe(toAnchor(link.section));
    }
  });

  test("renders stable section ids with no duplicates", () => {
    const { container } = render(<LandingPage />);
    const ids = Array.from(container.querySelectorAll("[id]"), (element) => element.id);

    for (const sectionId of sectionIds) {
      expect(document.getElementById(sectionId)).toBeTruthy();
    }
    expect(ids).toHaveLength(new Set(ids).size);
  });

  test("shows all proof cards with accessible imagery", () => {
    render(<LandingPage />);

    for (const card of proofCards) {
      expect(screen.getByRole("heading", { name: card.title })).toBeTruthy();
      expect(screen.getByAltText(card.image.alt).getAttribute("src")).toBe(card.image.src);
      expect(screen.getByText(card.metric)).toBeTruthy();
    }
  });

  test("shows the quality process and certification evidence", () => {
    render(<LandingPage />);

    for (const step of processSteps) {
      expect(screen.getByRole("heading", { name: step.title })).toBeTruthy();
      expect(screen.getByText(step.copy)).toBeTruthy();
    }
    for (const certification of certifications) {
      expect(screen.getByText(certification)).toBeTruthy();
    }
  });

  test("shows all ingredient groups and specifications", () => {
    render(<LandingPage />);

    for (const ingredient of ingredients) {
      expect(screen.getByText(ingredient.name)).toBeTruthy();
      expect(screen.getByText(ingredient.specification)).toBeTruthy();
    }
  });

  test("shows regional support and frictionless inquiry links", () => {
    render(<LandingPage />);

    for (const region of regions) {
      expect(screen.getByRole("heading", { name: region.city })).toBeTruthy();
      expect(screen.getByText(region.role)).toBeTruthy();
    }

    const inquiryLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("mailto:"));
    expect(inquiryLinks.length).toBeGreaterThanOrEqual(3);
    for (const link of inquiryLinks) {
      expect(link.getAttribute("href")).toContain("sales@fenchem.com");
      expect(link.getAttribute("href")).toContain("subject=");
    }
  });

  test("keeps every rendered image accessible", () => {
    const { container } = render(<LandingPage />);
    const images = Array.from(container.querySelectorAll("img"));

    expect(images.length).toBeGreaterThanOrEqual(5);
    for (const image of images) {
      expect(image.getAttribute("alt")?.trim()).not.toBe("");
      expect(["eager", "lazy"]).toContain(image.getAttribute("loading"));
    }
  });
});
