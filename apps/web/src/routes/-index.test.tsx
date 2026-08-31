import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { DEFAULT_VARIANT } from "@/components/prototype/variants";
import { Route } from "./index";

describe("home route", () => {
  test("renders the variant switcher entry point", () => {
    expect(typeof Route.options.component).toBe("function");
  });

  test("validates the variant search param and defaults to the production candidate", () => {
    const validate = Route.options.validateSearch as (search: Record<string, unknown>) => {
      variant: string;
    };

    expect(validate({})).toEqual({ variant: DEFAULT_VARIANT });
    expect(validate({ variant: "g" })).toEqual({ variant: "g" });
    expect(validate({ variant: "k" })).toEqual({ variant: "k" });
    expect(validate({ variant: "v" })).toEqual({ variant: "v" });
    expect(validate({ variant: "z" })).toEqual({ variant: DEFAULT_VARIANT });
    expect(validate({ variant: 42 })).toEqual({ variant: DEFAULT_VARIANT });
  });

  test("renders the active variant and prototype switcher", () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "d" } as never);

    const { container } = render(<Component />);
    expect(container).toBeTruthy();
  });

  test("renders the vivid production variant (k)", () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "k" } as never);

    const { container } = render(<Component />);
    expect(container.textContent).toContain("FENCHEM");
  });

  test("renders the vivid duotone variant (v)", () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "v" } as never);

    const { container } = render(<Component />);
    expect(container.textContent).toContain("FENCHEM");
  });

  test("renders production variant (h)", () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "h" } as never);

    const { container } = render(<Component />);
    expect(container.textContent).toContain("FENCHEM");
  });

  test("renders portal variant (i)", () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "i" } as never);

    const { container } = render(<Component />);
    expect(container.textContent).toContain("FENCHEM");
  });

  test("renders greenhouse ledger variant (j)", () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "j" } as never);

    const { container } = render(<Component />);
    expect(container).toBeTruthy();
  });

  test("renders the waterfall fountain variant (w)", () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "w" } as never);

    const { container } = render(<Component />);
    expect(container.textContent).toContain("FENCHEM");
  });

  test("handles variant without matching component", () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "unknown" } as never);

    const { container } = render(<Component />);
    expect(container).toBeTruthy();
  });
});
