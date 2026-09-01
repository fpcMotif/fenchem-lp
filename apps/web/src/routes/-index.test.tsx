import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { DEFAULT_VARIANT } from "@/components/prototype/variants";
import { Route } from "./index";

describe("home route", () => {
  test("renders the production landing page entry point", () => {
    expect(typeof Route.options.component).toBe("function");
  });

  test("validates the variant search param and defaults to the production candidate", () => {
    const validate = Route.options.validateSearch as (
      search: Record<string, string | number | undefined>,
    ) => {
      variant: string;
    };

    expect(validate({})).toEqual({ variant: DEFAULT_VARIANT });
    expect(validate({ variant: "g" })).toEqual({ variant: "g" });
    expect(validate({ variant: "k" })).toEqual({ variant: "k" });
    expect(validate({ variant: "v" })).toEqual({ variant: "v" });
    expect(validate({ variant: "z" })).toEqual({ variant: DEFAULT_VARIANT });
    expect(validate({ variant: 42 as unknown as string })).toEqual({
      variant: DEFAULT_VARIANT,
    });
  });

  test("renders the landing page component with brand heading and navigation", () => {
    const Component = Route.options.component as React.ComponentType;
    const { container } = render(<Component />);
    expect(container).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1, name: "Fenchem" })).toBeTruthy();
    expect(screen.getByText("Botanical intelligence since 1995")).toBeTruthy();
  });
});
