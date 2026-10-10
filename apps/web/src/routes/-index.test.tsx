import { configure, fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { DEFAULT_VARIANT } from "@/components/prototype/variants";
import { Route } from "./index";

configure({ asyncUtilTimeout: 5000 });
describe("home route", () => {
  test("renders the variant switcher entry point", () => {
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
    expect(validate({ variant: "s" })).toEqual({ variant: "s" });
    expect(validate({ variant: "t" })).toEqual({ variant: "t" });
    expect(validate({ variant: "y" })).toEqual({ variant: "y" });
    expect(validate({ variant: "o" })).toEqual({ variant: "o" });
    expect(validate({ variant: "oo" })).toEqual({ variant: "oo" });
    expect(validate({ variant: "oo1" })).toEqual({ variant: "oo1" });
    expect(validate({ variant: "oo2" })).toEqual({ variant: "oo2" });
    expect(validate({ variant: "oos" })).toEqual({ variant: "oos" });
    expect(validate({ variant: "z" })).toEqual({ variant: DEFAULT_VARIANT });
    expect(validate({ variant: 42 as unknown as string })).toEqual({ variant: DEFAULT_VARIANT });
  });
  test("renders the active variant and prototype switcher", () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "d" } as never);

    const { container } = render(<Component />);
    expect(container).toBeTruthy();
  });

  test("renders the vivid production variant (k)", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "k" } as never);

    const { container } = render(<Component />);
    await waitFor(() => {
      expect(container.textContent).toContain("FENCHEM");
    });
  });

  test("renders the chevron variant (t)", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "t" } as never);

    const { container } = render(<Component />);
    await waitFor(() => {
      expect(container.textContent).toContain("FENCHEM");
    });
  });

  test("renders the ledger variant (u)", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "u" } as never);

    const { container } = render(<Component />);
    await waitFor(() => {
      expect(container.textContent).toContain("FENCHEM");
    });
  });

  test("renders the folio variant (x)", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "x" } as never);

    const { container } = render(<Component />);
    await waitFor(() => {
      expect(container.textContent).toContain("FENCHEM");
    });
  });

  test("renders the atlas variant (y)", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "y" } as never);

    const { container } = render(<Component />);
    await waitFor(() => {
      expect(container.textContent).toContain("FENCHEM");
    });
  });

  test("renders the official site Figma variant (o)", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "o" } as never);

    const { container } = render(<Component />);
    await waitFor(() => {
      expect(container.textContent).toContain("链接全球优质原料，打造创新解决方案。");
    });
    expect(container.querySelector("#products")).toBeTruthy();
    expect(container.querySelector("#offices")).toBeTruthy();
    expect(container.querySelector("#contact")).toBeTruthy();
  });

  test("renders the refined official site variant (oo) with a working news accordion", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "oo" } as never);

    const { container, getByRole } = render(<Component />);
    await waitFor(() => {
      expect(
        getByRole("heading", {
          level: 1,
          name: "Global ingredients Your next breakthrough. 创新，从源头开始",
        }),
      ).toBeTruthy();
    });
    expect(container.querySelector('a[href="#main-content"]')).toBeTruthy();

    const first = getByRole("button", { name: /In-cosmetics® 拉丁美洲展/ });
    const second = getByRole("button", { name: /IFSCC 大会 2026/ });
    expect(first.getAttribute("aria-expanded")).toBe("true");
    expect(second.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(second);
    expect(second.getAttribute("aria-expanded")).toBe("true");
    expect(first.getAttribute("aria-expanded")).toBe("false");

    const menu = getByRole("button", { name: "Open menu" });
    expect(container.querySelectorAll('nav[aria-label="Main"]')).toHaveLength(1);
    fireEvent.click(menu);
    expect(menu.getAttribute("aria-expanded")).toBe("true");
    expect(container.querySelectorAll('nav[aria-label="Main"]')).toHaveLength(2);
    fireEvent.keyDown(menu, { key: "Escape" });
    expect(menu.getAttribute("aria-expanded")).toBe("false");
  });

  test("renders the strontium periodic index variant (s)", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "s" } as never);

    const { container } = render(<Component />);
    await waitFor(() => {
      expect(container.textContent).toContain("Periodic index");
    });
    expect(container.querySelector("#index")).toBeTruthy();
    expect(container.querySelector("#global-supply")).toBeTruthy();
    expect(container.querySelector("#contact")).toBeTruthy();
  });

  test("renders the vivid duotone variant (v)", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "v" } as never);

    const { container } = render(<Component />);
    await waitFor(() => {
      expect(container.textContent).toContain("FENCHEM");
    });
  });

  test("renders production variant (h)", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "h" } as never);

    const { container } = render(<Component />);
    await waitFor(() => {
      expect(container.textContent).toContain("FENCHEM");
    });
  });

  test("renders portal variant (i)", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "i" } as never);

    const { container } = render(<Component />);
    await waitFor(() => {
      expect(container.textContent).toContain("FENCHEM");
    });
  });

  test("renders greenhouse ledger variant (j)", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "j" } as never);

    const { container } = render(<Component />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  test("renders the waterfall fountain variant (w)", async () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "w" } as never);

    const { container } = render(<Component />);
    await waitFor(() => {
      expect(container.textContent).toContain("Botanical actives, documented to the lot.");
    });
    expect(container.querySelector("#matrix")).toBeTruthy();
    expect(container.querySelector("#contact")).toBeTruthy();
  });
  test("handles variant without matching component", () => {
    const Component = Route.options.component as React.ComponentType;
    vi.spyOn(Route, "useSearch").mockReturnValue({ variant: "unknown" } as never);

    const { container } = render(<Component />);
    expect(container).toBeTruthy();
  });
});
