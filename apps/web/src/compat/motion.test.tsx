import { createSignal, flush } from "solid-js";
import { describe, expect, it, vi } from "vitest";

import { m, useMotionValue, useMotionValueEvent, useTransform } from "@/compat/motion";
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

  it("reads props and motion values without strict untracked-read warnings", () => {
    const warnings: string[] = [];
    const spy = vi.spyOn(console, "warn").mockImplementation((message: unknown) => {
      warnings.push(String(message));
    });
    let node: HTMLElement | undefined;
    const [wide, setWide] = createSignal(false);
    const attrs = (name: string) => ({ class: name });
    function Scene() {
      const source = useMotionValue(0);
      const mapped = useTransform(() => source() * 2);
      useMotionValueEvent(mapped, "change", () => wide());
      return (
        <m.div
          ref={(el: HTMLElement) => (node = el)}
          variants={{ shown: { opacity: wide() ? 1 : 0.5 } }}
          initial="shown"
          animate="shown"
          onClick={() => source.set(source.get() + 1)}
          {...attrs("scene")}
        >
          scene
        </m.div>
      );
    }
    try {
      render(() => <Scene />);
      fireEvent.click(screen.getByText("scene"));
      flush();
      setWide(true);
      flush();
    } finally {
      spy.mockRestore();
    }
    expect(node).toBeInstanceOf(HTMLElement);
    expect(warnings.filter((message) => message.includes("STRICT_READ_UNTRACKED"))).toEqual([]);
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
