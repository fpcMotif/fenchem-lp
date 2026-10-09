import { animate } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { useReducedMotion } from "../use-reduced-motion";

const NUMBER_FORMAT = new Intl.NumberFormat("en-US");
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useCountUp(value: string, run: boolean) {
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const target = Number(value.replace(/[^\d]/g, ""));
  const [frame, setFrame] = useState<{ target: number; display: string } | null>(null);

  useEffect(() => {
    if (!run || reduce || !Number.isFinite(target)) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setFrame({ target, display: NUMBER_FORMAT.format(Math.round(latest)) }),
    });
    return () => controls.stop();
  }, [run, reduce, target]);

  if (!hydrated || reduce || !Number.isFinite(target)) return value;
  return run && frame?.target === target ? frame.display : "0";
}
