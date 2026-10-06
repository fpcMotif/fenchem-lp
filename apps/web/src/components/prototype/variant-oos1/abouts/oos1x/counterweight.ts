import { useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

export const HEADER_HEIGHT = 80;
export const READING_LINE_RATIO = 0.4;
export const LEVER = 1 / 6;
export const AT_REST = 0;
export const LOAD_GAP = 56;
export const ENGAGE_RANGE = 150;
export const COUNTERWEIGHT_SELECTOR = "[data-counterweight]";

export function readingLine(viewportHeight: number) {
  return HEADER_HEIGHT + READING_LINE_RATIO * (viewportHeight - HEADER_HEIGHT);
}

export function compressionPadding(loadRatio: number) {
  const sink = LEVER / (1 - LEVER);
  return `calc(${((100 * sink) / loadRatio).toFixed(3)}% + ${(LOAD_GAP / (1 - LEVER)).toFixed(1)}px)`;
}

const TWO_COLUMN_QUERY = "(min-width: 768px)";

function subscribeTwoColumn(onChange: () => void) {
  const query = window.matchMedia(TWO_COLUMN_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function useTwoColumn(): boolean {
  return useSyncExternalStore(
    subscribeTwoColumn,
    () => window.matchMedia(TWO_COLUMN_QUERY).matches,
    () => true,
  );
}

export function useCounterweight<T extends HTMLElement>(lever: number) {
  const beamRef = useRef<T>(null);
  const reduce = useReducedMotion();
  const twoColumn = useTwoColumn();
  const balanced = reduce || !twoColumn;
  const { scrollY } = useScroll();
  const arm = useMotionValue(0);
  const load = useTransform(arm, (offset) => -offset);
  const engage = useMotionValue(0);

  const update = useCallback(() => {
    const beam = beamRef.current;
    if (!beam) return;
    if (balanced) {
      arm.set(0);
      engage.set(0);
      return;
    }
    const distance = beam.getBoundingClientRect().top - readingLine(window.innerHeight);
    arm.set(lever * distance);
    engage.set(Math.max(0, 1 - Math.abs(distance) / ENGAGE_RANGE));
  }, [arm, engage, lever, balanced]);

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    update();
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return { beamRef, arm, load, engage };
}
