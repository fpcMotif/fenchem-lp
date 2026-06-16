import { describe, expect, test } from "vitest";

import { Route } from "./index";

describe("home route", () => {
  test("renders the variant switcher entry point", () => {
    expect(typeof Route.options.component).toBe("function");
  });

  test("validates the variant search param and defaults to the production candidate", () => {
    const validate = Route.options.validateSearch as (
      search: Record<string, unknown>,
    ) => { variant: string };

    expect(validate({})).toEqual({ variant: "d" });
    expect(validate({ variant: "g" })).toEqual({ variant: "g" });
    expect(validate({ variant: "z" })).toEqual({ variant: "d" });
    expect(validate({ variant: 42 })).toEqual({ variant: "d" });
  });
});
