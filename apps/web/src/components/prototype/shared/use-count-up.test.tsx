import { act, renderHook } from "@/test/render";
import { createRoot, createSignal, flush } from "solid-js";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useCountUp } from "./use-count-up";

const motion = vi.hoisted(() => ({ animate: vi.fn() }));
const [reduce, setReduce] = createSignal(false);

vi.mock("@/compat/motion", () => ({ animate: motion.animate }));
vi.mock("../use-reduced-motion", () => ({ useReducedMotion: () => reduce }));

describe("useCountUp", () => {
  beforeEach(() => {
    setReduce(false);
    flush();
    motion.animate.mockReset();
    motion.animate.mockReturnValue({ stop: vi.fn() });
  });

  it("renders the final value before the client settles", () => {
    let dispose!: () => void;
    const display = createRoot((rootDispose) => {
      dispose = rootDispose;
      return useCountUp("1,200", false);
    });
    expect(display()).toBe("1,200");
    expect(motion.animate).not.toHaveBeenCalled();
    dispose();
  });

  it("waits for visibility before counting and stops on unmount", async () => {
    const [run, setRun] = createSignal(false);
    const { result, unmount } = renderHook(() => useCountUp("1,200", run));
    expect(result()).toBe("0");
    expect(motion.animate).not.toHaveBeenCalled();
    await act(() => setRun(true));
    const [from, to, options] = motion.animate.mock.calls[0];
    expect([from, to]).toEqual([0, 1200]);
    await act(() => options.onUpdate(1100.6));
    expect(result()).toBe("1,101");
    const controls = motion.animate.mock.results[0].value;
    unmount();
    expect(controls.stop).toHaveBeenCalledOnce();
  });

  it("stops an active animation when reduced motion is enabled", async () => {
    const { result } = renderHook(() => useCountUp("1,200", true));
    await act(() => motion.animate.mock.calls[0][2].onUpdate(300));
    expect(result()).toBe("300");
    const controls = motion.animate.mock.results[0].value;
    await act(() => setReduce(true));
    expect(controls.stop).toHaveBeenCalledOnce();
    expect(result()).toBe("1,200");
    expect(motion.animate).toHaveBeenCalledOnce();
  });

  it("keeps current props visible without animation under reduced motion", async () => {
    setReduce(true);
    flush();
    const [value, setValue] = createSignal("1,200");
    const { result } = renderHook(() => useCountUp(value, true));
    expect(result()).toBe("1,200");
    await act(() => setValue("2,400"));
    expect(result()).toBe("2,400");
    expect(motion.animate).not.toHaveBeenCalled();
  });

  it("does not display the previous target while starting a new animation", async () => {
    const [value, setValue] = createSignal("1,200");
    const { result } = renderHook(() => useCountUp(value, true));
    await act(() => motion.animate.mock.calls[0][2].onUpdate(1200));
    const controls = motion.animate.mock.results[0].value;
    await act(() => setValue("2,400"));
    expect(controls.stop).toHaveBeenCalledOnce();
    expect(result()).toBe("0");
    await act(() => motion.animate.mock.calls[1][2].onUpdate(2400));
    expect(result()).toBe("2,400");
  });
});
