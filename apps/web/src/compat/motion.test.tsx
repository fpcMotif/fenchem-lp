import { createSignal, flush } from "solid-js";
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

  it("builds children once", () => {
    let builds = 0;
    function Child() {
      builds++;
      return <span>child</span>;
    }
    render(() => (
      <m.div>
        <Child />
      </m.div>
    ));
    expect(screen.getByText("child")).toBeTruthy();
    expect(builds).toBe(1);
  });

  it("renders motion-value attributes as their current value", () => {
    const d = { value: undefined as ReturnType<typeof useMotionValue<string>> | undefined };
    function Line() {
      d.value = useMotionValue("M0 0L1 1");
      return (
        <svg>
          <m.path data-testid="line" d={d.value} />
        </svg>
      );
    }
    render(() => <Line />);
    const path = screen.getByTestId("line");
    expect(path.getAttribute("d")).toBe("M0 0L1 1");
    d.value!.set("M0 0L2 2");
    flush();
    expect(path.getAttribute("d")).toBe("M0 0L2 2");
  });
});
