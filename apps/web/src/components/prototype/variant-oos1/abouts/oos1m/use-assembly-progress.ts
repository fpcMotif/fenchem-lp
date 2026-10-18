import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "@/compat/motion";
import { createEffect, type Accessor } from "solid-js";

import { createExternalStore } from "@/compat/external-store";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function useIsDesktop() {
  return createExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

export function useScrollAssembly(
  track: Accessor<HTMLElement | undefined>,
  drawing: Accessor<HTMLElement | undefined>,
): MotionValue<number> {
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const progress = useMotionValue(0);
  const inView = useInView(drawing, { once: true, amount: 0.55 });
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 80px", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (desktop() && !reduce()) progress.set(value);
  });

  createEffect(
    () => ({ reduce: reduce(), desktop: desktop(), inView: inView() }),
    ({ reduce, desktop, inView }) => {
      if (reduce) {
        progress.set(1);
        return;
      }
      if (desktop) {
        progress.set(scrollYProgress.get());
        return;
      }
      if (!inView) return;
      const controls = animate(progress, 1, { duration: 2.6, ease: "linear" });
      return () => controls.stop();
    },
  );

  return progress;
}

export function useViewAssembly(
  target: Accessor<HTMLElement | undefined>,
  duration: number,
): MotionValue<number> {
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const inView = useInView(target, { once: true, amount: 0.45 });

  createEffect(
    () => ({ reduce: reduce(), inView: inView() }),
    ({ reduce, inView }) => {
      if (reduce) {
        progress.set(1);
        return;
      }
      if (!inView) return;
      const controls = animate(progress, 1, { duration, ease: "linear" });
      return () => controls.stop();
    },
  );

  return progress;
}
