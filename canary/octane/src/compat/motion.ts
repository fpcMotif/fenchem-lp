// motion/react → @octanejs/motion, plus the two hooks the binding has not ported.
import { useScroll as baseUseScroll } from "@octanejs/motion";
import { useEffect, useState } from "octane";
import { inView } from "motion";

export * from "@octanejs/motion";
export type {
  MotionValue,
  MotionStyle,
  HTMLMotionProps,
  Transition,
} from "./motion-types";

type InViewOptions = { once?: boolean; amount?: number | "some" | "all"; margin?: string; root?: { current: Element | null } };

/** `useInView` from motion/react, on motion's framework-neutral `inView`. */
export function useInView(ref: { current: Element | null }, options: InViewOptions = {}): boolean {
  const [isInView, setInView] = useState(false);
  const { once, amount, margin, root } = options;
  useEffect(() => {
    const el = ref.current;
    if (!el || (once && isInView)) return;
    return inView(
      el,
      () => {
        setInView(true);
        return once ? undefined : () => setInView(false);
      },
      { root: root?.current ?? undefined, margin: margin as never, amount },
    );
  }, [ref, once, amount, margin, root, isInView]);
  return isInView;
}

/**
 * motion/react's `useInstantLayoutTransition` makes the next layout animation
 * jump. @octanejs/motion's `layout` is a single-element FLIP with no projection
 * tree, so there is no queued transition to skip: run the callback and return.
 */
export function useInstantLayoutTransition(): (callback?: () => void) => void {
  return (callback) => callback?.();
}

type RefLike = { current: Element | null };
const isRef = (value: unknown): value is RefLike =>
  !!value && typeof value === "object" && "current" in (value as object);

/**
 * motion/react's `useScroll` accepts `target`/`container` as refs. The Octane
 * binding hands options straight to motion's `scroll()`, which wants elements,
 * so a ref target measured the whole page (hero content sat at progress 1).
 * Getters defer the unwrap to the binding's effect, after the ref is attached.
 */
export function useScroll(options?: Record<string, unknown>, ...slot: unknown[]) {
  if (!options || !(isRef(options.target) || isRef(options.container))) {
    return (baseUseScroll as (...args: unknown[]) => ReturnType<typeof baseUseScroll>)(options, ...slot);
  }
  const { target, container, ...rest } = options;
  const resolved = {
    ...rest,
    get target() {
      return isRef(target) ? target.current ?? undefined : target;
    },
    get container() {
      return isRef(container) ? container.current ?? undefined : container;
    },
  };
  return (baseUseScroll as (...args: unknown[]) => ReturnType<typeof baseUseScroll>)(resolved, ...slot);
}
