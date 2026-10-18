import { animate as animateAny, type AnimationPlaybackControls } from "@/compat/motion";
import { createExternalStore } from "@/compat/external-store";
import { createEffect, createSignal, type Accessor } from "solid-js";

import { useReducedMotion } from "../use-reduced-motion";

// The compat `animate` types only the motion-value and DOM overloads; it accepts plain numbers at runtime.
const animate = animateAny as unknown as (
  from: number,
  to: number,
  options: {
    duration: number;
    ease: [number, number, number, number];
    onUpdate: (latest: number) => void;
  },
) => AnimationPlaybackControls;

const NUMBER_FORMAT = new Intl.NumberFormat("en-US");
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

type MaybeAccessor<T> = T | Accessor<T>;
const read = <T>(source: MaybeAccessor<T>): T =>
  typeof source === "function" ? (source as Accessor<T>)() : source;

export function useCountUp(value: MaybeAccessor<string>, run: MaybeAccessor<boolean>) {
  const reduce = useReducedMotion();
  const hydrated = createExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const target = () => Number(read(value).replace(/[^\d]/g, ""));
  const [frame, setFrame] = createSignal<{ target: number; display: string } | null>(null);

  createEffect(
    () => ({ run: read(run), reduce: reduce(), target: target() }),
    (next) => {
      if (!next.run || next.reduce || !Number.isFinite(next.target)) return;
      const controls = animate(0, next.target, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) =>
          setFrame({ target: next.target, display: NUMBER_FORMAT.format(Math.round(latest)) }),
      });
      return () => controls.stop();
    },
  );

  return (): string => {
    if (!hydrated() || reduce() || !Number.isFinite(target())) return read(value);
    const current = frame();
    return read(run) && current?.target === target() ? current.display : "0";
  };
}
