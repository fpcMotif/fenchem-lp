import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "motion/react";
import { useEffect, useSyncExternalStore, type RefObject } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

const PIN_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(PIN_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePinnedLayout() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(PIN_QUERY).matches,
    () => false,
  );
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export type Development = {
  progress: MotionValue<number>;
  marks: MotionValue<number>;
};

function followCapillaryRise(scroll: number, { progress, marks }: Development) {
  const elapsed = clamp01((scroll - 0.04) / 0.74);
  progress.set(1 - (1 - elapsed) * (1 - elapsed));
  marks.set(clamp01((scroll - 0.8) / 0.1));
}

export function useDevelopment({
  section,
  figure,
  pinnable,
}: {
  section: RefObject<HTMLElement | null>;
  figure: RefObject<HTMLElement | null>;
  pinnable: boolean;
}): Development {
  const reduce = useReducedMotion();
  const pinLayout = usePinnedLayout();
  const pinned = pinnable && pinLayout && !reduce;
  const progress = useMotionValue(0);
  const marks = useMotionValue(0);
  const inView = useInView(figure, { amount: 0.4, once: true });
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (scroll) => {
    if (pinned) followCapillaryRise(scroll, { progress, marks });
  });

  useEffect(() => {
    if (reduce) {
      progress.set(1);
      marks.set(1);
      return;
    }
    if (pinned) {
      followCapillaryRise(scrollYProgress.get(), { progress, marks });
      return;
    }
    if (!inView) return;
    const develop = animate(progress, 1, { duration: 3.4, ease: [0.3, 0.75, 0.4, 1] });
    const mark = animate(marks, 1, { duration: 0.9, delay: 3.2, ease: "easeOut" });
    return () => {
      develop.stop();
      mark.stop();
    };
  }, [reduce, pinned, inView, progress, marks, scrollYProgress]);

  return { progress, marks };
}
