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
} from "@/compat/motion";
import { dynamic as dynamicTag, type JSX } from "@solidjs/web";
import { createEffect, createSignal, merge } from "solid-js";

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

const sxAttrs = (...args: ReadonlyArray<stylex.StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);

function useWipeStyle(progress: MotionValue<number>) {
  const reduce = useReducedMotion();
  const clipPath = useTransform(progress, wipeClip);
  return () => ({ clipPath: reduce() ? "none" : clipPath });
}

function useMountProgress(delay: () => number, duration: () => number) {
  const progress = useMotionValue(0);
  const reduce = useReducedMotion();
  createEffect(
    () => ({ reduce: reduce(), delay: delay(), duration: duration() }),
    (deps) => {
      if (deps.reduce) {
        progress.set(1);
        return;
      }
      const controls = animate(progress, 1, {
        duration: deps.duration,
        delay: deps.delay,
        ease: EASE,
      });
      return () => controls.stop();
    },
  );
  return progress;
}

type WipeBoxProps = {
  progress: MotionValue<number>;
  as?: "div" | "span";
  sx?: stylex.StyleXStyles;
  children: JSX.Element;
};

function WipeBox(props: WipeBoxProps) {
  const style = useWipeStyle(props.progress);
  const Host = dynamicTag(() => props.as ?? "div");
  const Inner = props.as === "span" ? m.span : m.div;
  return (
    <Host {...stylex.attrs(S.host, props.sx)}>
      <Inner {...stylex.attrs(S.inner)} style={style()}>
        {props.children}
      </Inner>
    </Host>
  );
}

export function MountWipe(
  props: Omit<WipeBoxProps, "progress"> & { delay: number; duration?: number },
) {
  const progress = useMountProgress(
    () => props.delay,
    () => props.duration ?? 1.1,
  );
  return (
    <WipeBox progress={progress} as={props.as} sx={props.sx}>
      {props.children}
    </WipeBox>
  );
}

export function ScrollWipe(props: {
  sx?: stylex.StyleXStyles;
  start?: number;
  end?: number;
  children: JSX.Element;
}) {
  const p = merge({ start: 0.96, end: 0.5 }, props);
  const [ref, setRef] = createSignal<HTMLDivElement>();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${p.start}`, `start ${p.end}`],
  });
  const style = useWipeStyle(scrollYProgress);
  return (
    <div ref={setRef} {...stylex.attrs(S.host, props.sx)}>
      <m.div {...stylex.attrs(S.inner)} style={style()}>
        {props.children}
      </m.div>
    </div>
  );
}

export function Reveal(props: {
  as?: "div" | "li" | "figure";
  delay?: number;
  sx?: stylex.StyleXStyles;
  children: JSX.Element;
}) {
  const Tag = dynamicTag(() => props.as ?? "div");
  const [ref, setRef] = createSignal<HTMLElement>();
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const delay = () => props.delay ?? 0;
  return (
    <Tag
      ref={setRef}
      {...sxAttrs(
        S.reveal,
        (inView() || reduce()) && S.revealShown,
        delay() > 0 && dynamic.delay(delay()),
        props.sx,
      )}
    >
      {props.children}
    </Tag>
  );
}
