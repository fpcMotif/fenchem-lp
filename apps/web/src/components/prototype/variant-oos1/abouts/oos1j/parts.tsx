import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { animate, m, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { base } from "./shared";
import { font, hue, size } from "./theme.stylex";

const REVEAL_STEP_MS = 90;
const REVEAL_MAX_STEPS = 4;
const IN_VIEW_MARGIN = "0px 0px -8% 0px";

const reveal = stylex.create({
  hidden: {
    opacity: { default: 1, [breakpoints.motionOk]: 0 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(24px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: size.ease,
  },
  shown: {
    opacity: 1,
    transform: "none",
  },
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export const wipe = stylex.create({
  hidden: {
    clipPath: { default: null, [breakpoints.motionOk]: "inset(100% 0 0 0)" },
    transitionProperty: "clip-path",
    transitionDuration: "1300ms",
    transitionTimingFunction: size.ease,
  },
  shown: {
    clipPath: "inset(0 0 0 0)",
  },
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export function Reveal({
  children,
  step = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const shown = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });
  return (
    <Tag
      ref={ref}
      {...stylex.props(
        reveal.hidden,
        shown && reveal.shown,
        reveal.delay(Math.min(step, REVEAL_MAX_STEPS) * REVEAL_STEP_MS),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionName({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} {...stylex.props(base.srOnly)}>
      {children}
    </h2>
  );
}

const CROP_REACH = 23;
const CROP_LINE = "linear-gradient(currentColor, currentColor)";
const CROP_ACROSS = "14px 1px";
const CROP_DOWN = "1px 14px";
const CROP_REACH_PX = `${CROP_REACH}px`;

const crop = stylex.create({
  marks: {
    display: { default: "none", [breakpoints.md]: "block" },
    position: "absolute",
    inset: -CROP_REACH,
    pointerEvents: "none",
    color: hue.cropInk,
    backgroundImage: `${CROP_LINE}, ${CROP_LINE}, ${CROP_LINE}, ${CROP_LINE}, ${CROP_LINE}, ${CROP_LINE}, ${CROP_LINE}, ${CROP_LINE}`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${CROP_ACROSS}, ${CROP_DOWN}, ${CROP_ACROSS}, ${CROP_DOWN}, ${CROP_ACROSS}, ${CROP_DOWN}, ${CROP_ACROSS}, ${CROP_DOWN}`,
    backgroundPosition: `left 0 top ${CROP_REACH_PX}, left ${CROP_REACH_PX} top 0, right 0 top ${CROP_REACH_PX}, right ${CROP_REACH_PX} top 0, left 0 bottom ${CROP_REACH_PX}, left ${CROP_REACH_PX} bottom 0, right 0 bottom ${CROP_REACH_PX}, right ${CROP_REACH_PX} bottom 0`,
    opacity: { default: 1, [breakpoints.motionOk]: 0 },
    transform: { default: null, [breakpoints.motionOk]: "scale(1.04)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "900ms",
    transitionTimingFunction: size.ease,
  },
  shown: {
    opacity: 1,
    transform: "none",
  },
  onHover: {
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: 1,
      [stylex.when.ancestor(":focus-within")]: 1,
    },
    transform: {
      default: "scale(1.04)",
      [stylex.when.ancestor(":hover")]: "none",
      [stylex.when.ancestor(":focus-within")]: "none",
    },
    transitionDuration: "520ms",
  },
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export function CropMarks({ delay = 0, hover = false }: { delay?: number; hover?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });
  return (
    <span
      ref={ref}
      aria-hidden="true"
      {...stylex.props(crop.marks, hover ? crop.onHover : [shown && crop.shown, crop.delay(delay)])}
    />
  );
}

const climb = stylex.keyframes({
  "0%": { transform: "translateY(108%)" },
  "100%": { transform: "none" },
});

const rise = stylex.create({
  mask: {
    display: "inline-block",
    overflow: "clip",
    verticalAlign: "top",
    paddingBlock: "0.08em",
    marginBlock: "-0.08em",
  },
  char: {
    display: "inline-block",
    transform: { default: null, [breakpoints.motionOk]: "translateY(108%)" },
  },
  play: {
    transform: "none",
    animationName: { default: null, [breakpoints.motionOk]: climb },
    animationDuration: "1100ms",
    animationTimingFunction: size.ease,
    animationFillMode: "backwards",
  },
  delay: (ms: number) => ({ animationDelay: `${ms}ms` }),
});

export function RiseText({
  text,
  play,
  delay = 0,
  stagger = 70,
  charSx,
}: {
  text: string;
  play: boolean;
  delay?: number;
  stagger?: number;
  charSx?: (index: number) => stylex.StyleXStyles;
}) {
  return (
    <>
      <span {...stylex.props(base.srOnly)}>{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((char, index) => (
          <span key={`${char}-${index}`} {...stylex.props(rise.mask)}>
            <span
              {...stylex.props(
                rise.char,
                play && rise.play,
                rise.delay(delay + index * stagger),
                charSx?.(index),
              )}
            >
              {char}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}

const lines = stylex.create({
  mask: {
    display: "block",
    overflow: "clip",
    paddingBlock: "0.06em",
    marginBlock: "-0.06em",
  },
  line: {
    display: "block",
    transform: { default: null, [breakpoints.motionOk]: "translateY(105%)" },
    transitionProperty: "transform",
    transitionDuration: "1100ms",
    transitionTimingFunction: size.ease,
  },
  shown: {
    transform: "none",
  },
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export function RiseLines({
  lines: text,
  play,
  stagger = 130,
}: {
  lines: readonly string[];
  play: boolean;
  stagger?: number;
}) {
  return text.map((line, index) => (
    <span key={line} {...stylex.props(lines.mask)}>
      <span {...stylex.props(lines.line, play && lines.shown, lines.delay(index * stagger))}>
        {line}
      </span>
    </span>
  ));
}

export function useInViewOnce<T extends Element>() {
  const ref = useRef<T>(null);
  const shown = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });
  return [ref, shown] as const;
}

const COUNT_EASE = [0.22, 1, 0.36, 1] as const;

const count = stylex.create({
  figure: {
    display: "inline-block",
    fontVariantNumeric: "tabular-nums",
  },
});

export function CountUp({ value, sx }: { value: string; sx?: stylex.StyleXStyles }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const near = useInView(ref, { once: true });
  useEffect(() => {
    const node = ref.current;
    if (!near || reduce || !node) return;
    const target = Number(value.replaceAll(",", ""));
    const grouped = value.includes(",");
    node.style.minWidth = `${node.offsetWidth}px`;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: COUNT_EASE,
      onUpdate: (latest) => {
        const whole = Math.round(latest);
        node.textContent = grouped ? whole.toLocaleString("en-US") : String(whole);
      },
    });
    return () => controls.stop();
  }, [near, reduce, value]);
  return (
    <span ref={ref} {...stylex.props(count.figure, sx)}>
      {value}
    </span>
  );
}

const drift = stylex.create({
  frame: {
    position: "relative",
    overflow: "clip",
    backgroundColor: hue.tint,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export function useDrift(target: RefObject<HTMLElement | null>, reach: number) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [`-${reach}%`, `${reach}%`],
  );
  return { y, scale: reduce ? 1 : 1 + (reach * 2.4) / 100 };
}

export function DriftImage({
  src,
  alt,
  reach = 5,
  frame,
  wipeDelay,
}: {
  src: string;
  alt: string;
  reach?: number;
  frame?: stylex.StyleXStyles;
  wipeDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const motion = useDrift(ref, reach);
  const shown = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });
  return (
    <div ref={ref} {...stylex.props(drift.frame, frame)}>
      <m.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        {...stylex.props(
          drift.image,
          wipeDelay !== undefined && [wipe.hidden, shown && wipe.shown, wipe.delay(wipeDelay)],
        )}
        style={motion}
      />
    </div>
  );
}

const monument = stylex.create({
  frame: {
    position: "absolute",
    display: "block",
    margin: 0,
    pointerEvents: "none",
    userSelect: "none",
    fontFamily: font.display,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.055em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  ghost: {
    color: hue.ghost,
  },
  photo: {
    color: "transparent",
    backgroundColor: hue.glyphBlue,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  photoFill: (image: string) => ({
    backgroundImage: image,
  }),
});

export function Monument({
  text,
  sx,
  photo,
  style,
}: {
  text: string;
  sx: stylex.StyleXStyles;
  photo?: string;
  style?: Partial<Record<"backgroundPosition" | "x" | "y", MotionValue<string>>>;
}) {
  const image =
    photo === undefined
      ? ""
      : `linear-gradient(rgba(11, 42, 92, 0.28), rgba(11, 42, 92, 0.28)), url(${photo})`;
  const styled = stylex.props(
    monument.frame,
    photo === undefined ? monument.ghost : monument.photo,
    photo !== undefined && monument.photoFill(image),
    sx,
  );
  return (
    <m.span
      aria-hidden="true"
      lang="en"
      className={styled.className}
      style={{ ...styled.style, ...style }}
    >
      {text}
    </m.span>
  );
}
