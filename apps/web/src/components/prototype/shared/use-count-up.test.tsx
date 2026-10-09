import { act, renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useCountUp } from "./use-count-up";

const motion = vi.hoisted(() => ({ reduce: false, animate: vi.fn() }));

vi.mock("motion/react", () => ({ animate: motion.animate }));
vi.mock("../use-reduced-motion", () => ({ useReducedMotion: () => motion.reduce }));

describe("useCountUp", () => {
  beforeEach(() => {
    motion.reduce = false;
    motion.animate.mockReset();
    motion.animate.mockReturnValue({ stop: vi.fn() });
  });

  it("renders the final value on the server", () => {
    function Counter() {
      return <span>{useCountUp("1,200", false)}</span>;
    }
    expect(renderToString(<Counter />)).toBe("<span>1,200</span>");
    expect(motion.animate).not.toHaveBeenCalled();
  });

  it("waits for visibility before counting and stops on unmount", async () => {
    const { result, rerender, unmount } = renderHook(({ run }) => useCountUp("1,200", run), {
      initialProps: { run: false },
    });
    expect(result.current).toBe("0");
    expect(motion.animate).not.toHaveBeenCalled();
    rerender({ run: true });
    const [from, to, options] = motion.animate.mock.calls[0];
    expect([from, to]).toEqual([0, 1200]);
    await act(() => options.onUpdate(1100.6));
    expect(result.current).toBe("1,101");
    const controls = motion.animate.mock.results[0].value;
    unmount();
    expect(controls.stop).toHaveBeenCalledOnce();
  });

  it("stops an active animation when reduced motion is enabled", async () => {
    const { result, rerender } = renderHook(() => useCountUp("1,200", true));
    await act(() => motion.animate.mock.calls[0][2].onUpdate(300));
    expect(result.current).toBe("300");
    const controls = motion.animate.mock.results[0].value;
    motion.reduce = true;
    rerender();
    expect(controls.stop).toHaveBeenCalledOnce();
    expect(result.current).toBe("1,200");
    expect(motion.animate).toHaveBeenCalledOnce();
  });

  it("keeps current props visible without animation under reduced motion", () => {
    motion.reduce = true;
    const { result, rerender } = renderHook(({ value }) => useCountUp(value, true), {
      initialProps: { value: "1,200" },
    });
    expect(result.current).toBe("1,200");
    rerender({ value: "2,400" });
    expect(result.current).toBe("2,400");
    expect(motion.animate).not.toHaveBeenCalled();
  });

  it("does not display the previous target while starting a new animation", async () => {
    const { result, rerender } = renderHook(({ value }) => useCountUp(value, true), {
      initialProps: { value: "1,200" },
    });
    await act(() => motion.animate.mock.calls[0][2].onUpdate(1200));
    const controls = motion.animate.mock.results[0].value;
    rerender({ value: "2,400" });
    expect(controls.stop).toHaveBeenCalledOnce();
    expect(result.current).toBe("0");
    await act(() => motion.animate.mock.calls[1][2].onUpdate(2400));
    expect(result.current).toBe("2,400");
  });
});
