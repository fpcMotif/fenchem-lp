import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { CSSProperties, ReactNode } from "react";

import { bp, chrome, face, tone } from "./tokens.stylex";

const sunrise = stylex.keyframes({
  "0%": { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  "20%": { opacity: 1 },
  "100%": { clipPath: "inset(0 0 0 0)", opacity: 1 },
});

const styles = stylex.create({
  rise: {
    animationName: { default: sunrise, [bp.motionReduce]: "none" },
    animationDuration: "1800ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 300ms)",
    animationTimingFunction: chrome.ease,
    animationFillMode: "both",
  },
  box: {
    position: "relative",
    display: "inline-block",
    fontFamily: face.sans,
    fontSize: "var(--gfs)",
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "0.06em",
    writingMode: "vertical-rl",
    textOrientation: "upright",
  },
  title: {
    position: "relative",
    zIndex: 1,
    margin: 0,
    font: "inherit",
    letterSpacing: "inherit",
    color: tone.ink,
  },
  shadow: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    height: "100%",
    transformOrigin: "50% 0",
    transform: "skewX(calc(var(--sun-deg) * 1deg)) scaleY(calc(var(--sun-uy) * 0.55))",
    willChange: "transform",
    pointerEvents: "none",
    maskImage:
      "linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.78) 45%, rgba(0, 0, 0, 0.3) 100%)",
  },
  flipped: {
    display: "block",
    transform: "scaleY(-1)",
    color: "rgba(11, 42, 92, 0.36)",
    userSelect: "none",
  },
  foot: {
    position: "absolute",
    top: "100%",
    left: "50%",
    width: 0,
    height: 0,
    writingMode: "horizontal-tb",
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: "normal",
  },
});

export function Gnomon({
  text,
  id,
  level,
  rise = false,
  sx,
  children,
}: {
  text: string;
  id: string;
  level: 1 | 2;
  rise?: boolean;
  sx?: StyleXStyles;
  children?: ReactNode;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  const vars = { "--gh": `calc(var(--gfs) * ${(text.length * 1.06).toFixed(2)})` } as CSSProperties;
  return (
    <div style={vars} {...stylex.props(styles.box, sx)}>
      <Heading id={id} {...stylex.props(styles.title)}>
        {text}
      </Heading>
      <span aria-hidden="true" {...stylex.props(styles.shadow, rise && styles.rise)}>
        <span {...stylex.props(styles.flipped)}>{text}</span>
      </span>
      <span {...stylex.props(styles.foot)}>{children}</span>
    </div>
  );
}
