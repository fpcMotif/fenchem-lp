import { describe, expect, test } from "vitest";

import { LandingPage } from "@/components/landing/landing-page";

import { Route } from "./index";

describe("home route", () => {
  test("ships the production landing page directly", () => {
    expect(Route.options.component).toBe(LandingPage);
  });
});
