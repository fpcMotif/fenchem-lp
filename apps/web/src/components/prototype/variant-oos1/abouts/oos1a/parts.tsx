import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useRef } from "react";

import { ease, fonts, media, metrics, palette } from "./lattice.stylex";

type Tone = "light" | "dark";
type Strength = "full" | "quiet" | "none";

const LINE_COUNT = 17;
const LINE_STEP_MS = 26;
const SLIP_LINE = 11;
const REVEAL_STEP_MS = 80;
const REVEAL_MAX_STEPS = 4;

const ALL_LINES = Array.from({ length: LINE_COUNT }, (_, index) => index);
const MAJOR_LINES = [0, 4, 8, 12, 16] as const;

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
  line: (left: string, ms: number) => ({ left, transitionDelay: `${ms}ms` }),
});

export const shared = stylex.create({
  anchor: {
    scrollMarginTop: metrics.anchor,
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
  cover: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  sectionPad: {
    paddingTop: { default: 48, [media.tablet]: 64, [breakpoints.xl]: 72 },
    paddingBottom: { default: 48, [media.tablet]: 64, [breakpoints.xl]: 72 },
  },
  grid16: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(16, minmax(0, 1fr))",
    },
  },
  headline: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: { default: 30, [media.tablet]: 44, [breakpoints.xl]: 56 },
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.01em",
    color: palette.ink,
    textWrap: "balance",
  },
  serifLine: {
    margin: 0,
    fontFamily: fonts.serif,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: { default: 22, [media.tablet]: 28, [breakpoints.xl]: 34 },
    lineHeight: 1.2,
    color: palette.body,
  },
  body: {
    margin: 0,
    maxWidth: "34em",
    fontFamily: fonts.cjk,
    fontSize: { default: 16, [breakpoints.xl]: 17 },
    fontWeight: 400,
    lineHeight: 1.95,
    letterSpacing: "0.03em",
    color: palette.body,
    textWrap: "pretty",
  },
  small: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: "0.04em",
    color: palette.body,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 48,
    paddingInline: 28,
    borderWidth: 0,
    borderRadius: 0,
    fontFamily: fonts.cjk,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: "200ms",
    transitionTimingFunction: ease.out,
  },
  buttonPrimary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  buttonOutline: {
    backgroundColor: { default: "transparent", ":hover": palette.page },
    boxShadow: `inset 0 0 0 1px ${palette.ink}`,
    color: palette.ink,
  },
});

const styles = stylex.create({
  frameShell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: {
      default: 16,
      [media.mdOnly]: 32,
      [media.lgOnly]: 56,
      [breakpoints.xl]: "min(124px, 8.611vw)",
    },
  },
  frameInner: {
    position: "relative",
    isolation: "isolate",
  },
  lattice: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    pointerEvents: "none",
  },
  line: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
  },
  lineMinor: {
    display: { default: "none", [breakpoints.lg]: "block" },
  },
  lineDraw: {
    transformOrigin: "top",
    transitionProperty: "transform",
    transitionDuration: "1300ms",
    transitionTimingFunction: ease.out,
  },
  lineHidden: {
    transform: { default: null, [breakpoints.motionOk]: "scaleY(0)" },
  },
  lineLight: { backgroundColor: palette.inkHair },
  lineLightMajor: { backgroundColor: palette.inkRule },
  lineDark: { backgroundColor: palette.paleHair },
  lineDarkMajor: { backgroundColor: palette.paleRule },
  lineSlip: { backgroundColor: palette.blueLine },
  reveal: {
    opacity: { default: null, [breakpoints.motionOk]: 0 },
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

export function Lattice({
  strength = "quiet",
  tone = "light",
  slip = false,
}: {
  strength?: Exclude<Strength, "none">;
  tone?: Tone;
  slip?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const full = strength === "full";
  const dark = tone === "dark";
  const lines = full ? ALL_LINES : MAJOR_LINES;

  return (
    <div ref={ref} aria-hidden="true" {...stylex.props(styles.lattice)}>
      {lines.map((index) => {
        const major = index % 4 === 0;
        const slipped = full && slip && index === SLIP_LINE;
        const edge = index === LINE_COUNT - 1 ? "calc(100% - 1px)" : `${(index / 16) * 100}%`;
        return (
          <span
            key={index}
            {...stylex.props(
              styles.line,
              !major && styles.lineMinor,
              dark
                ? major
                  ? styles.lineDarkMajor
                  : styles.lineDark
                : major
                  ? styles.lineLightMajor
                  : styles.lineLight,
              full && styles.lineDraw,
              full && !shown && styles.lineHidden,
              slipped && styles.lineSlip,
              dynamic.line(slipped ? `calc(${edge} + 3px)` : edge, full ? index * LINE_STEP_MS : 0),
            )}
          />
        );
      })}
    </div>
  );
}

export function Frame({
  lattice = "none",
  tone = "light",
  slip = false,
  sx,
  innerSx,
  children,
}: {
  lattice?: Strength;
  tone?: Tone;
  slip?: boolean;
  sx?: stylex.StyleXStyles;
  innerSx?: stylex.StyleXStyles;
  children?: ReactNode;
}) {
  return (
    <div {...stylex.props(styles.frameShell, sx)}>
      <div {...stylex.props(styles.frameInner, innerSx)}>
        {lattice === "none" ? null : <Lattice strength={lattice} tone={tone} slip={slip} />}
        {children}
      </div>
    </div>
  );
}

export function Reveal({
  children,
  step = 0,
  as: Tag = "div",
  sx,
}: {
  children: ReactNode;
  step?: number;
  as?: "div" | "li" | "article" | "figure";
  sx?: stylex.StyleXStyles;
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement & HTMLElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <Tag
      ref={ref}
      {...stylex.props(
        styles.reveal,
        shown && styles.revealShown,
        dynamic.delay(Math.min(step, REVEAL_MAX_STEPS) * REVEAL_STEP_MS),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionName({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} {...stylex.props(shared.srOnly)}>
      {children}
    </h2>
  );
}

export function Action({
  kind = "primary",
  onClick,
  children,
  icon,
}: {
  kind?: "primary" | "outline";
  onClick: () => void;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...stylex.props(
        shared.button,
        kind === "primary" ? shared.buttonPrimary : shared.buttonOutline,
        shared.focusRing,
      )}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
}
