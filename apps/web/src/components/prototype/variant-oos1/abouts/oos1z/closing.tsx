import * as stylex from "@stylexjs/stylex";
import { ArrowUp, ArrowUpRight } from "lucide-react";

import { corridorDrawing, type Drawing } from "./perspective";
import { ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

const PHONE = corridorDrawing(13, false);
const WIDE = corridorDrawing(22, false);

const styles = stylex.create({
  section: {
    paddingTop: { default: 56, [bp.tablet]: 64, [bp.desktop]: 72 },
    paddingBottom: { default: 72, [bp.tablet]: 88, [bp.desktop]: 104 },
    scrollMarginTop: 80,
  },
  head: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  sign: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    margin: 0,
    paddingBlock: 8,
    paddingInline: 16,
    backgroundColor: tone.navy,
    color: tone.paper,
  },
  signChinese: {
    fontFamily: face.sans,
    fontSize: 14,
    letterSpacing: "0.08em",
  },
  title: {
    margin: 0,
    marginTop: { default: 28, [bp.desktop]: 36 },
    fontFamily: face.sans,
    fontWeight: 300,
    fontSize: { default: 34, [bp.tablet]: 48, [bp.desktop]: 60 },
    lineHeight: 1.25,
    letterSpacing: "0.04em",
    color: tone.navy,
    fontFeatureSettings: '"palt"',
  },
  subtitle: {
    margin: 0,
    marginTop: { default: 10, [bp.desktop]: 14 },
    fontSize: { default: 19, [bp.desktop]: 24 },
    lineHeight: 1.35,
    color: tone.body,
  },
  vestibule: {
    position: "relative",
    marginTop: { default: 40, [bp.desktop]: 56 },
    height: { default: 460, [bp.tablet]: 480, [bp.desktop]: "min(600px, 62svh)" },
  },
  drawing: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  phone: {
    display: { default: "block", [bp.tablet]: "none", [bp.desktop]: "none" },
  },
  wide: {
    display: { default: "none", [bp.tablet]: "block", [bp.desktop]: "block" },
  },
  edges: {
    fill: "none",
    stroke: tone.lineStrong,
    strokeWidth: 1,
  },
  fine: {
    fill: "none",
    stroke: tone.line,
    strokeWidth: 1,
  },
  door: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: { default: 8, [bp.desktop]: 12 },
    boxSizing: "border-box",
    left: { default: "31%", [bp.tablet]: "40%", [bp.desktop]: "41.5%" },
    width: { default: "38%", [bp.tablet]: "20%", [bp.desktop]: "17%" },
    top: { default: "33%", [bp.tablet]: "30%", [bp.desktop]: "28%" },
    bottom: { default: "13%", [bp.tablet]: "22%", [bp.desktop]: "22%" },
    backgroundColor: { default: tone.dusk, ":hover": tone.navy },
    color: tone.paper,
    transitionProperty: "background-color",
    transitionDuration: "320ms",
    transitionTimingFunction: chrome.ease,
  },
  doorLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: face.sans,
    fontWeight: 400,
    fontSize: { default: 22, [bp.tablet]: 24, [bp.desktop]: 30 },
    letterSpacing: "0.06em",
  },
  arrow: {
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.motionOk]: "translate(3px, -3px)" },
    },
    transitionProperty: "transform",
    transitionDuration: "320ms",
    transitionTimingFunction: chrome.ease,
  },
  doorNote: {
    fontSize: { default: 17, [bp.desktop]: 20 },
    color: "rgba(255, 255, 255, 0.82)",
  },
  back: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: { default: 32, [bp.desktop]: 40 },
    paddingBlock: 8,
    paddingInline: 4,
    fontFamily: face.sans,
    fontSize: 15,
    color: { default: tone.body, ":hover": tone.navy },
    textDecorationLine: "none",
  },
  backRow: {
    display: "flex",
    justifyContent: "center",
  },
});

function Lines({ drawing, sx }: { drawing: Drawing; sx: stylex.StyleXStyles }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      {...stylex.props(styles.drawing, sx)}
    >
      <path d={drawing.fine} vectorEffect="non-scaling-stroke" {...stylex.props(styles.fine)} />
      <path d={drawing.edges} vectorEffect="non-scaling-stroke" {...stylex.props(styles.edges)} />
    </svg>
  );
}

export function Closing({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section id="oos1z-exit" aria-labelledby="oos1z-closing" {...stylex.props(styles.section)}>
      <div {...stylex.props(ui.shell, styles.head)}>
        <p {...stylex.props(styles.sign)}>
          <span {...stylex.props(styles.signChinese)}>出口</span>
          <span lang="en" {...stylex.props(ui.caps)}>
            Exit
          </span>
        </p>
        <h2 id="oos1z-closing" {...stylex.props(styles.title)}>
          感谢参观
        </h2>
        <p lang="en" {...stylex.props(ui.italic, styles.subtitle)}>
          Thank you for visiting. This way out leads to contact.
        </p>
      </div>
      <div {...stylex.props(styles.vestibule)}>
        <Lines drawing={PHONE} sx={styles.phone} />
        <Lines drawing={WIDE} sx={styles.wide} />
        <button
          type="button"
          onClick={() => onNavigateHome("contact")}
          {...stylex.props(ui.button, ui.focus, styles.door, stylex.defaultMarker())}
        >
          <span {...stylex.props(styles.doorLabel)}>
            联系我们
            <ArrowUpRight
              size={24}
              strokeWidth={1.25}
              aria-hidden="true"
              {...stylex.props(styles.arrow)}
            />
          </span>
          <span lang="en" {...stylex.props(ui.italic, styles.doorNote)}>
            Contact us
          </span>
        </button>
      </div>
      <div {...stylex.props(styles.backRow)}>
        <a href="#about-top" {...stylex.props(ui.focus, styles.back)}>
          <ArrowUp size={14} strokeWidth={1.5} aria-hidden="true" />
          回到入口
          <span lang="en" {...stylex.props(ui.italic)}>
            Back to the entrance
          </span>
        </a>
      </div>
    </section>
  );
}
