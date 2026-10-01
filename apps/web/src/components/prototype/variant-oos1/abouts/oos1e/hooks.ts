import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { SHEET_IDS } from "./sheets";

const FOCUS_CLEARANCE = 24;
const FOCUS_CLEARANCE_TOP = 148;
const FOCUS_WATCH_MS = 1500;

export function keepFocusClear(target: HTMLElement) {
  const section = target.closest("section[id]");
  if (!section || !target.matches(":focus-visible")) return;
  const nextId = SHEET_IDS[SHEET_IDS.indexOf(section.id) + 1];
  const next = nextId ? document.getElementById(nextId) : null;
  const until = performance.now() + FOCUS_WATCH_MS;
  const check = () => {
    const rect = target.getBoundingClientRect();
    const coveredBelow = next
      ? rect.bottom + FOCUS_CLEARANCE - next.getBoundingClientRect().top
      : 0;
    const hiddenAbove = FOCUS_CLEARANCE_TOP - rect.top;
    const amount = Math.max(coveredBelow, hiddenAbove);
    if (amount > 0) window.scrollBy({ top: -amount, behavior: "instant" });
    if (performance.now() < until && document.activeElement === target)
      requestAnimationFrame(check);
  };
  requestAnimationFrame(check);
}

const STACK_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function subscribeStack(onChange: () => void) {
  const query = window.matchMedia(STACK_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function useStackMode() {
  return useSyncExternalStore(
    subscribeStack,
    () => window.matchMedia(STACK_QUERY).matches,
    () => false,
  );
}

export function useBoxHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const next = entry?.borderBoxSize?.[0]?.blockSize ?? element.offsetHeight;
      setHeight(Math.ceil(next));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, height] as const;
}

export function useReachedSheet(ids: readonly string[], lineTop: number) {
  const [reached, setReached] = useState<string | undefined>();
  useEffect(() => {
    const crossing = new Set<string>();
    let observer: IntersectionObserver | undefined;
    const observe = () => {
      observer?.disconnect();
      crossing.clear();
      const bottomInset = Math.max(0, window.innerHeight - lineTop - 1);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) crossing.add(entry.target.id);
            else crossing.delete(entry.target.id);
          }
          setReached([...ids].reverse().find((id) => crossing.has(id)));
        },
        { rootMargin: `-${lineTop}px 0px -${bottomInset}px 0px` },
      );
      for (const id of ids) {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      }
    };
    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, [ids, lineTop]);
  return reached;
}
