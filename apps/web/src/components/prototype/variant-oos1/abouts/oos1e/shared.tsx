import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useRef } from "react";

import { color, font } from "./tokens.stylex";

const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const REVEAL_STEP_MS = 70;
const REVEAL_MAX_STEPS = 4;

export const base = stylex.create({
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  focusRingOnNavy: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 3,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
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
  quiet: {
    fontFamily: font.cjk,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: "0.1em",
    color: color.muted,
  },
  balance: {
    display: "block",
    textWrap: "balance",
  },
  reveal: {
    opacity: { default: 0, [breakpoints.motionReduce]: 1 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(24px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  revealShown: {
    opacity: 1,
    transform: "none",
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
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  buttonPrimary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  buttonOutline: {
    backgroundColor: { default: "transparent", ":hover": color.tint },
    boxShadow: `inset 0 0 0 1px ${color.hairline}`,
    color: color.ink,
  },
});

const dynamic = stylex.create({
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
  as?: "div" | "li" | "figure" | "article";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <Tag
      ref={ref}
      {...stylex.props(
        base.reveal,
        shown && base.revealShown,
        dynamic.delay(Math.min(step, REVEAL_MAX_STEPS) * REVEAL_STEP_MS),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}
