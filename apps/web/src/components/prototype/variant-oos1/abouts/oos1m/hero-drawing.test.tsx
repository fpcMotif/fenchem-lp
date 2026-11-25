import { createSignal, flush } from "solid-js";
import { describe, expect, it } from "vitest";

import { useMotionValue } from "@/compat/motion";
import { render } from "@/test/render";

import { HeroDrawing } from "./hero-drawing";
import type { HeroPartId } from "./hero-geometry";

const ACTIVE_BLUE = "#0743a9";

describe("HeroDrawing", () => {
  it("colors the hovered part's leader line and anchor", () => {
    const [active, setActive] = createSignal<HeroPartId | null>(null);
    function Drawing() {
      const progress = useMotionValue(1);
      return <HeroDrawing progress={progress} active={active()} onActive={setActive} />;
    }
    const { container } = render(() => <Drawing />);
    const anchors = () => [...container.querySelectorAll('circle[r="4.2"]')];
    const blue = () => anchors().filter((anchor) => anchor.getAttribute("fill") === ACTIVE_BLUE);

    expect(anchors().length).toBeGreaterThan(0);
    expect(blue()).toHaveLength(0);

    setActive("make");
    flush();
    expect(blue()).toHaveLength(1);

    setActive(null);
    flush();
    expect(blue()).toHaveLength(0);
  });
});
