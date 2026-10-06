import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { MixedSpot } from "./band";
import { ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

const apply = stylex.keyframes({
  "0%": { opacity: 0, transform: "scale(0.25)" },
  "45%": { opacity: 1 },
  "100%": { opacity: 1, transform: "scale(1)" },
});

const wick = stylex.keyframes({
  "0%": { opacity: 0.55, transform: "scale(0.3)" },
  "100%": { opacity: 0, transform: "scale(2.4)" },
});

const styles = stylex.create({
  hero: {
    position: "relative",
    overflowX: "clip",
  },
  frame: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    minHeight: { default: "calc(100svh - 80px)", [bp.desktop]: "max(640px, calc(100svh - 80px))" },
    paddingTop: { default: 20, [bp.desktop]: 28 },
  },
  main: {
    position: "relative",
    flexGrow: 1,
    alignItems: "end",
    marginTop: { default: 40, [bp.desktop]: 32 },
  },
  text: {
    gridColumn: { default: "1 / 4", [bp.tablet]: "1 / 7", [bp.desktop]: "1 / 8" },
    gridRow: 1,
    paddingBottom: { default: 28, [bp.desktop]: 56 },
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 300,
    fontSize: { default: 60, [bp.tablet]: 104, [bp.desktop]: 120, [bp.wide]: 152 },
    lineHeight: 1,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  tagline: {
    margin: 0,
    marginTop: { default: 18, [bp.desktop]: 28 },
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 22, [bp.tablet]: 30, [bp.desktop]: 34 },
    lineHeight: 1.15,
    color: tone.ink,
  },
  lead: {
    margin: 0,
    marginTop: { default: 16, [bp.desktop]: 22 },
    maxWidth: "34em",
    fontFamily: face.sans,
    fontSize: { default: 17, [bp.tablet]: 19, [bp.desktop]: 20 },
    lineHeight: 1.8,
    color: tone.body,
    textWrap: "pretty",
  },
  plate: {
    position: "relative",
    gridColumn: { default: "4 / 5", [bp.tablet]: "7 / 9", [bp.desktop]: "10 / 12" },
    gridRow: 1,
    alignSelf: "stretch",
    minHeight: { default: 300, [bp.desktop]: 420 },
    marginBottom: { default: -48, [bp.desktop]: -64 },
    backgroundColor: tone.plate,
    boxShadow: "inset 0 0 0 1px rgba(11, 42, 92, 0.14)",
    borderRadius: 2,
  },
  spot: {
    position: "absolute",
    left: "50%",
    bottom: { default: 48, [bp.desktop]: 64 },
    width: { default: 40, [bp.tablet]: 60, [bp.desktop]: 64, [bp.wide]: 76 },
    height: { default: 20, [bp.tablet]: 28, [bp.desktop]: 30, [bp.wide]: 34 },
    marginLeft: { default: -20, [bp.tablet]: -30, [bp.desktop]: -32, [bp.wide]: -38 },
    marginBottom: { default: -10, [bp.tablet]: -14, [bp.desktop]: -15, [bp.wide]: -17 },
  },
  pool: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: { default: 16, [bp.desktop]: 22 },
    backgroundColor: "rgba(7, 67, 169, 0.07)",
    boxShadow: "inset 0 1px 0 rgba(7, 67, 169, 0.32)",
  },
  wicking: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: { default: 16, [bp.desktop]: 22 },
    height: 14,
    backgroundImage: "linear-gradient(0deg, rgba(7, 67, 169, 0.06) 0%, rgba(7, 67, 169, 0) 100%)",
  },
  frontMark: {
    position: "absolute",
    top: { default: 28, [bp.desktop]: 40 },
    left: 10,
    right: 10,
    height: 1,
    backgroundImage: "linear-gradient(90deg, rgba(26, 26, 26, 0.36) 50%, rgba(26, 26, 26, 0) 50%)",
    backgroundSize: "6px 1px",
  },
  frontWord: {
    position: "absolute",
    top: { default: 28, [bp.desktop]: 40 },
    right: "calc(100% + 14px)",
    display: { default: "none", [bp.tablet]: "block", [bp.desktop]: "block" },
    transform: "translateY(-50%)",
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 15,
    lineHeight: 1,
    color: tone.body,
    whiteSpace: "nowrap",
  },
  applied: {
    display: "block",
    width: "100%",
    height: "100%",
    animationName: { default: apply, [bp.motionReduce]: "none" },
    animationDuration: "1400ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 500ms)",
    animationTimingFunction: chrome.ease,
    animationFillMode: "both",
  },
  wick: {
    position: "absolute",
    inset: "-30%",
    borderRadius: "50%",
    boxShadow: "inset 0 0 0 1px rgba(7, 67, 169, 0.5)",
    opacity: 0,
    animationName: { default: wick, [bp.motionReduce]: "none" },
    animationDuration: "1900ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 560ms)",
    animationTimingFunction: "cubic-bezier(0.2, 0.7, 0.3, 1)",
    animationFillMode: "backwards",
  },
  laneTag: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: { default: 24, [bp.desktop]: 30 },
    fontFamily: face.sans,
    fontSize: 13,
    lineHeight: 1.3,
    color: tone.body,
    textAlign: "center",
  },
  origin: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: tone.pencil,
    pointerEvents: "none",
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    margin: 0,
    paddingTop: { default: 14, [bp.desktop]: 18 },
    paddingBottom: { default: 72, [bp.desktop]: 64 },
    maxWidth: { default: "62%", [bp.tablet]: "70%", [bp.desktop]: "60%" },
  },
  figNum: {
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  captionItalic: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 16, [bp.desktop]: 18 },
    lineHeight: 1.3,
    color: tone.body,
  },
});

export function Hero() {
  return (
    <section aria-labelledby="oos1w-title" {...stylex.props(styles.hero)}>
      <div {...stylex.props(ui.shell, styles.frame)}>
        <p lang="en" {...stylex.props(ui.english)}>
          {ABOUT_BANNER.established} · {ABOUT_BANNER.place}
        </p>

        <div {...stylex.props(ui.grid, styles.main)}>
          <div {...stylex.props(styles.text)}>
            <h1 id="oos1w-title" {...stylex.props(styles.title)}>
              {ABOUT_BANNER.title}
            </h1>
            <p lang="en" {...stylex.props(styles.tagline)}>
              {ABOUT_BANNER.tagline}
            </p>
            <p {...stylex.props(styles.lead)}>{ABOUT_BANNER.lead}</p>
          </div>

          <div aria-hidden="true" {...stylex.props(styles.plate)}>
            <span {...stylex.props(styles.frontMark)} />
            <span lang="en" {...stylex.props(styles.frontWord)}>
              front, not yet reached
            </span>
            <span {...stylex.props(styles.wicking)} />
            <span {...stylex.props(styles.pool)} />
            <span {...stylex.props(styles.spot)}>
              <span {...stylex.props(styles.wick)} />
              <span {...stylex.props(styles.applied)}>
                <MixedSpot />
              </span>
            </span>
            <span {...stylex.props(styles.laneTag)}>泛成</span>
          </div>
          <span aria-hidden="true" {...stylex.props(styles.origin)} />
        </div>

        <p aria-hidden="true" {...stylex.props(ui.micro, styles.caption)}>
          <span {...stylex.props(styles.figNum)}>Fig. 0</span>
          <span lang="en" {...stylex.props(styles.captionItalic)}>
            One sample on the origin line, before development.
          </span>
        </p>
      </div>
    </section>
  );
}
