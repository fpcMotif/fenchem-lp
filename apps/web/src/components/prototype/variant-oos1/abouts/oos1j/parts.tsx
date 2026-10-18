import { m } from "@/compat/motion";
import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  animate,
  motionValue,
  toCss,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "@/compat/motion";
import { dynamic, type JSX } from "@solidjs/web";
import { createEffect, createSignal, merge, type Accessor } from "solid-js";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { base } from "./shared";
import { font, hue, size } from "./theme.stylex";
import { wipe } from "./parts-values";

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

export function Reveal(props: {
  children: JSX.Element;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure";
}) {
  const Tag = dynamic(() => props.as ?? "div");
  const [ref, setRef] = createSignal<HTMLElement>();
  const shown = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });
  return (
    <Tag
      ref={setRef}
      {...sxAttrs(
        reveal.hidden,
        shown() && reveal.shown,
        reveal.delay(Math.min(props.step ?? 0, REVEAL_MAX_STEPS) * REVEAL_STEP_MS),
        props.sx,
      )}
    >
      {props.children}
    </Tag>
  );
}

function sxAttrs(...args: ReadonlyArray<stylex.StyleXStyles | false | null | undefined>) {
  return stylex.attrs(...args);
}

export function SectionName(props: { id: string; children: string }) {
  return (
    <h2 id={props.id} {...stylex.attrs(base.srOnly)}>
      {props.children}
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

export function CropMarks(props: { delay?: number; hover?: boolean }) {
  const p = merge({ delay: 0, hover: false }, props);
  const [ref, setRef] = createSignal<HTMLSpanElement>();
  const shown = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });
  return (
    <span
      ref={setRef}
      aria-hidden="true"
      {...stylex.attrs(
        crop.marks,
        p.hover ? crop.onHover : [shown() && crop.shown, crop.delay(p.delay)],
      )}
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

export function RiseText(props: {
  text: string;
  srText?: string;
  play: boolean;
  delay?: number;
  stagger?: number;
  charSx?: (index: number) => stylex.StyleXStyles;
}) {
  const p = merge({ delay: 0, stagger: 70 }, props);
  return (
    <>
      <span {...stylex.attrs(base.srOnly)}>{p.srText ?? p.text}</span>
      <span aria-hidden="true">
        {Array.from(p.text).map((char, index) => (
          <span {...stylex.attrs(rise.mask)}>
            <span
              {...stylex.attrs(
                rise.char,
                p.play && rise.play,
                rise.delay(p.delay + index * p.stagger),
                p.charSx?.(index),
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

export function RiseLines(props: { lines: readonly string[]; play: boolean; stagger?: number }) {
  const p = merge({ stagger: 130 }, props);
  return (
    <>
      {p.lines.map((line, index) => (
        <span {...stylex.attrs(lines.mask)}>
          <span
            {...stylex.attrs(lines.line, p.play && lines.shown, lines.delay(index * p.stagger))}
          >
            {line}
          </span>
        </span>
      ))}
    </>
  );
}

export function useInViewOnce<T extends Element>() {
  const [ref, setRef] = createSignal<T>();
  const shown = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });
  return [setRef, shown] as const;
}

const COUNT_EASE = [0.22, 1, 0.36, 1] as const;

const count = stylex.create({
  figure: {
    display: "inline-block",
    fontVariantNumeric: "tabular-nums",
  },
});

export function CountUp(props: { value: string; sx?: stylex.StyleXStyles }) {
  const [ref, setRef] = createSignal<HTMLSpanElement>();
  const reduce = useReducedMotion();
  const near = useInView(ref, { once: true });
  createEffect(
    () => ({ near: near(), reduce: reduce(), value: props.value, node: ref() }),
    ({ near, reduce, value, node }) => {
      if (!near || reduce || !node) return;
      const target = Number(value.replaceAll(",", ""));
      const grouped = value.includes(",");
      node.style.minWidth = `${node.offsetWidth}px`;
      const controls = animate(motionValue(0), target, {
        duration: 1.8,
        ease: COUNT_EASE,
        onUpdate: (latest: number) => {
          const whole = Math.round(latest);
          node.textContent = grouped ? whole.toLocaleString("en-US") : String(whole);
        },
      });
      return () => controls.stop();
    },
  );
  return (
    <span ref={setRef} {...stylex.attrs(count.figure, props.sx)}>
      {props.value}
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

export function useDrift(target: Accessor<HTMLElement | undefined>, reach: number) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const y = useTransform(() =>
    reduce() ? "0%" : `${-reach + 2 * reach * Math.min(Math.max(scrollYProgress(), 0), 1)}%`,
  );
  return {
    y,
    get scale() {
      return reduce() ? 1 : 1 + (reach * 2.4) / 100;
    },
  };
}

export function DriftImage(props: {
  src: string;
  alt: string;
  reach?: number;
  frame?: stylex.StyleXStyles;
  wipeDelay?: number;
}) {
  const p = merge({ reach: 5 }, props);
  const [ref, setRef] = createSignal<HTMLDivElement>();
  const motion = useDrift(ref, p.reach);
  const shown = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });
  return (
    <div ref={setRef} {...stylex.attrs(drift.frame, p.frame)}>
      <m.img
        src={p.src}
        alt={p.alt}
        loading="lazy"
        decoding="async"
        {...stylex.attrs(
          drift.image,
          p.wipeDelay !== undefined && [
            wipe.hidden,
            shown() && wipe.shown,
            wipe.delay(p.wipeDelay),
          ],
        )}
        style={{ y: motion.y, scale: motion.scale }}
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

export function Monument(props: {
  text: string;
  sx: stylex.StyleXStyles;
  photo?: string;
  style?: Partial<Record<"backgroundPosition" | "x" | "y", MotionValue<string>>>;
}) {
  const image =
    props.photo === undefined
      ? ""
      : `linear-gradient(rgba(11, 42, 92, 0.28), rgba(11, 42, 92, 0.28)), url(${props.photo})`;
  const styled = stylex.attrs(
    monument.frame,
    props.photo === undefined ? monument.ghost : monument.photo,
    props.photo !== undefined && monument.photoFill(image),
    props.sx,
  );
  return (
    <m.span
      aria-hidden="true"
      lang="en"
      class={styled.class}
      style={{ ...toCss(styled.style), ...props.style }}
    >
      {props.text}
    </m.span>
  );
}
