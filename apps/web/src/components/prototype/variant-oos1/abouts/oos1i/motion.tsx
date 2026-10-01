import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  animate,
  m,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { wipeClip } from "./geometry";
import { ease } from "./shear.stylex";

const S = stylex.create({
  host: {
    display: "block",
    width: "100%",
    containerType: "inline-size",
  },
  inner: {
    display: "block",
  },
  reveal: {
    opacity: 0,
    transform: { default: null, [breakpoints.motionOk]: "translateY(24px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: ease.out,
  },
  revealShown: {
    opacity: 1,
    transform: "none",
  },
});

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

function useWipeStyle(progress: MotionValue<number>) {
  const reduce = useReducedMotion();
  const clipPath = useTransform(progress, wipeClip);
  return { clipPath: reduce ? "none" : clipPath };
}

function useMountProgress(delay: number, duration: number) {
  const progress = useMotionValue(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      progress.set(1);
      return;
    }
    const controls = animate(progress, 1, { duration, delay, ease: EASE });
    return () => controls.stop();
  }, [delay, duration, progress, reduce]);
  return progress;
}

type WipeBoxProps = {
  progress: MotionValue<number>;
  as?: "div" | "span";
  sx?: stylex.StyleXStyles;
  children: ReactNode;
};

function WipeBox({ progress, as = "div", sx, children }: WipeBoxProps) {
  const style = useWipeStyle(progress);
  const Host = as;
  const Inner = as === "span" ? m.span : m.div;
  return (
    <Host {...stylex.props(S.host, sx)}>
      <Inner {...stylex.props(S.inner)} style={style}>
        {children}
      </Inner>
    </Host>
  );
}

export function MountWipe({
  delay,
  duration = 1.1,
  ...rest
}: Omit<WipeBoxProps, "progress"> & { delay: number; duration?: number }) {
  const progress = useMountProgress(delay, duration);
  return <WipeBox progress={progress} {...rest} />;
}

export function ScrollWipe({
  sx,
  start = 0.96,
  end = 0.5,
  children,
}: {
  sx?: stylex.StyleXStyles;
  start?: number;
  end?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${start}`, `start ${end}`] as const,
  });
  const style = useWipeStyle(scrollYProgress);
  return (
    <div ref={ref} {...stylex.props(S.host, sx)}>
      <m.div {...stylex.props(S.inner)} style={style}>
        {children}
      </m.div>
    </div>
  );
}

export function Reveal({
  as: Tag = "div",
  delay = 0,
  sx,
  children,
}: {
  as?: "div" | "li" | "figure";
  delay?: number;
  sx?: stylex.StyleXStyles;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement & HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  return (
    <Tag
      ref={ref}
      {...stylex.props(
        S.reveal,
        (inView || reduce) && S.revealShown,
        delay > 0 && dynamic.delay(delay),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}
