import { createSignal } from "solid-js";
import { describe, expect, it } from "vitest";

import { m, useMotionValue } from "@/compat/motion";
import { fireEvent, render, screen } from "@/test/render";

describe("solid test harness", () => {
  it("renders, updates on click, and accepts motion values", () => {
    function Counter() {
      const [count, setCount] = createSignal(0);
      const x = useMotionValue(4);
      return (
        <m.button type="button" style={{ x }} onClick={() => setCount((n) => n + 1)}>
          {count()}
        </m.button>
      );
    }
    render(() => <Counter />);
    const button = screen.getByRole("button");
    expect(button.textContent).toBe("0");
    expect(button.style.transform).toBe("translateX(4px)");
    fireEvent.click(button);
    expect(button.textContent).toBe("1");
  });
});
