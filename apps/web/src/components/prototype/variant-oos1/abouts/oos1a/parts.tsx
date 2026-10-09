import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useRef } from "react";
import { ease, media, palette } from "./lattice.stylex";
import { shared } from "./parts-values";

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
