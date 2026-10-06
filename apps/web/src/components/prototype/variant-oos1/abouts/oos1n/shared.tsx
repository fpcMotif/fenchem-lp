import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { font, motionCss, step, tone, vessel } from "./tokens.stylex";

const REVEAL_STEP_MS = 90;
const REVEAL_MAX_STEPS = 4;

const revealDelay = (index: number) => Math.min(index, REVEAL_MAX_STEPS) * REVEAL_STEP_MS;

const lift = stylex.keyframes({
  "0%": { clipPath: "inset(0 0 0 0)" },
  "100%": { clipPath: "inset(0 0 100% 0)" },
});

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export const ui = stylex.create({
  root: {
    backgroundColor: tone.page,
    color: tone.ink,
    fontFamily: font.cjk,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInline: { default: 16, [breakpoints.md]: 40, [breakpoints.xl]: "min(124px, 8.611vw)" },
  },
  section: {
    scrollMarginTop: 140,
    paddingBlock: { default: 40, [breakpoints.md]: 64, [breakpoints.xl]: 76 },
  },
  onPage: {
    backgroundColor: tone.page,
  },
  onPaper: {
    backgroundColor: colors.paper,
  },
  onNavy: {
    backgroundColor: tone.navy,
    color: colors.paper,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    fontWeight: 400,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.lg]: 32, [breakpoints.xl]: 40 },
    rowGap: { default: 40, [breakpoints.lg]: 0 },
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  figure: {
    margin: 0,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  caption: {
    marginTop: 12,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.quiet,
  },
  reveal: {
    opacity: { default: 1, [breakpoints.motionOk]: 0 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(24px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: motionCss.out,
  },
  revealShown: {
    opacity: 1,
    transform: "none",
  },
  arch: {
    overflow: "hidden",
    borderTopLeftRadius: vessel.rim,
    borderTopRightRadius: vessel.rim,
    backgroundColor: tone.tint,
  },
  veil: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: tone.tint,
    clipPath: "inset(0 0 100% 0)",
    pointerEvents: "none",
  },
  veilOnLoad: {
    animationName: { default: null, [breakpoints.motionOk]: lift },
    animationDuration: "900ms",
    animationDelay: "250ms",
    animationTimingFunction: motionCss.out,
    animationFillMode: "backwards",
  },
  veilOnView: {
    clipPath: { default: "inset(0 0 100% 0)", [breakpoints.motionOk]: "inset(0 0 0 0)" },
    transitionProperty: "clip-path",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "900ms" },
    transitionTimingFunction: motionCss.out,
  },
  veilLifted: {
    clipPath: "inset(0 0 100% 0)",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    paddingInline: 28,
    borderWidth: 0,
    borderRadius: 2,
    fontFamily: font.cjk,
    fontSize: step.body,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textDecoration: "none",
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.98)" },
    },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: motionCss.out,
  },
  buttonPrimary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 2px ${colors.paper}, 0 0 0 4px ${colors.brandBlue700}`,
    },
    color: colors.paper,
  },
  buttonQuiet: {
    backgroundColor: { default: "transparent", ":hover": tone.tint },
    boxShadow: `inset 0 0 0 1px ${tone.hairlineStrong}`,
    color: tone.ink,
  },
});

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [unobservable, setUnobservable] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") setUnobservable(true);
  }, []);
  return { ref, shown: inView || unobservable };
}

export function Reveal({
  children,
  step: stagger = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const { ref, shown } = useReveal<HTMLDivElement & HTMLLIElement>();
  return (
    <Tag
      ref={ref}
      {...stylex.props(ui.reveal, shown && ui.revealShown, dynamic.delay(revealDelay(stagger)), sx)}
    >
      {children}
    </Tag>
  );
}

export function Section({
  id,
  label,
  background,
  sx,
  children,
}: {
  id: string;
  label: string;
  background: stylex.StyleXStyles;
  sx?: stylex.StyleXStyles;
  children: ReactNode;
}) {
  const nameId = `${id}-name`;
  return (
    <section id={id} aria-labelledby={nameId} {...stylex.props(ui.section, background, sx)}>
      <h2 id={nameId} {...stylex.props(ui.srOnly)}>
        {label}
      </h2>
      <div {...stylex.props(ui.shell, ui.inset)}>{children}</div>
    </section>
  );
}

export function ArchPhoto({
  src,
  alt,
  mode,
  priority = false,
  ratio,
  position,
}: {
  src: string;
  alt: string;
  mode: "load" | "view";
  priority?: boolean;
  ratio: stylex.StyleXStyles;
  position: stylex.StyleXStyles;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} {...stylex.props(ui.frame, ui.arch, ratio)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        {...stylex.props(ui.fill, position)}
      />
      <span
        aria-hidden="true"
        {...stylex.props(
          ui.veil,
          mode === "load" ? ui.veilOnLoad : ui.veilOnView,
          mode === "view" && shown && ui.veilLifted,
        )}
      />
    </div>
  );
}
