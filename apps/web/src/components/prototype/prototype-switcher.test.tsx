import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PrototypeSwitcher } from "./prototype-switcher";

const { navigate } = vi.hoisted(() => ({ navigate: vi.fn() }));

vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));

beforeEach(() => {
  navigate.mockClear();
  vi.stubEnv("PROD", false);
});

afterEach(() => vi.unstubAllEnvs());

describe("prototype keyboard isolation", () => {
  it("does not register keyboard navigation in production", () => {
    vi.stubEnv("PROD", true);
    const { queryByLabelText } = render(<PrototypeSwitcher current="oos1pb" />);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(queryByLabelText("Next variant")).toBeNull();
    expect(navigate).not.toHaveBeenCalled();
  });

  it("retains background shortcuts in development and cleans them up", () => {
    const { unmount } = render(<PrototypeSwitcher current="oos1pb" />);
    fireEvent.keyDown(document.body, { key: "ArrowRight" });
    expect(navigate).toHaveBeenCalledTimes(1);
    unmount();
    fireEvent.keyDown(document.body, { key: "ArrowRight" });
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it("leaves interactive controls and their children alone", () => {
    const { getByText, getByRole } = render(
      <>
        <PrototypeSwitcher current="oos1pb" />
        <button type="button" role="tab">
          <span>Product tab</span>
        </button>
        <select aria-label="Product">
          <option>One</option>
        </select>
        <div contentEditable suppressContentEditableWarning>
          Editable
        </div>
      </>,
    );
    for (const target of [
      getByText("Product tab"),
      getByRole("combobox", { name: "Product" }),
      getByText("Editable"),
    ]) {
      fireEvent.keyDown(target, { key: "ArrowRight" });
    }
    expect(navigate).not.toHaveBeenCalled();
  });

  it("respects handled events and modifier shortcuts", () => {
    render(<PrototypeSwitcher current="oos1pb" />);
    const event = new KeyboardEvent("keydown", {
      key: "ArrowRight",
      bubbles: true,
      cancelable: true,
    });
    event.preventDefault();
    window.dispatchEvent(event);
    for (const modifier of ["altKey", "ctrlKey", "metaKey", "shiftKey"]) {
      fireEvent.keyDown(document.body, { key: "ArrowRight", [modifier]: true });
    }
    expect(navigate).not.toHaveBeenCalled();
  });

  it("keeps section comparisons inside the product family", () => {
    const { getByLabelText } = render(<PrototypeSwitcher current="oos1pt" compare="catalog" />);
    fireEvent.click(getByLabelText("Next variant"));
    expect(navigate).toHaveBeenCalledWith({
      search: { variant: "oos1pa", compare: "catalog" },
      replace: true,
    });
  });

  it("changes the comparison without changing the variant or scroll position", () => {
    const { getByLabelText } = render(<PrototypeSwitcher current="oos1pb" />);
    fireEvent.change(getByLabelText("Product comparison"), { target: { value: "solutions" } });
    const options = navigate.mock.calls[0]?.[0];
    expect(options.resetScroll).toBe(false);
    expect(options.search({ variant: "oos1pb", page: "products" })).toEqual({
      variant: "oos1pb",
      page: "products",
      compare: "solutions",
    });
  });
});
