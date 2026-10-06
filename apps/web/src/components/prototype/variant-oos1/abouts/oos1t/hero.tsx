import * as stylex from "@stylexjs/stylex";
import { useMotionValueEvent } from "motion/react";
import { useRef } from "react";

import { ABOUT_BANNER } from "../../about-data";
import { Dial } from "./dial";
import { Gnomon } from "./gnomon";
import { ui } from "./shared";
import { clock, DAY_START, useSunHour } from "./sun";
import { bp, chrome, face, sun, tone } from "./tokens.stylex";

const TIP_X =
  "calc(var(--gh) * var(--sun-ux) * 0.55 + var(--tip-gap) * var(--sun-uy) / var(--sun-len))";
const TIP_Y =
  "calc(var(--gh) * var(--sun-uy) * 0.55 - var(--tip-gap) * var(--sun-ux) / var(--sun-len))";

const appear = stylex.keyframes({
  "0%": { opacity: 0 },
});

const styles = stylex.create({
  appear: {
    animationName: { default: appear, [bp.motionReduce]: "none" },
    animationDuration: "700ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 1700ms)",
    animationFillMode: "backwards",
  },
  hero: {
    position: "relative",
    height: {
      default: "calc(100svh - 80px + 60svh)",
      [bp.motionReduce]: "auto",
      [bp.tabletUp]: { default: "calc(100svh - 80px + 100svh)", [bp.motionReduce]: "auto" },
    },
  },
  stage: {
    position: "sticky",
    top: chrome.header,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: { default: 24, [bp.tablet]: 32, [bp.desktop]: 0 },
    boxSizing: "border-box",
    height: { default: "auto", [bp.tabletUp]: "calc(100svh - 80px)" },
    minHeight: { default: "calc(100svh - 80px)", [bp.desktop]: 620 },
    paddingBlock: { default: "24px 32px", [bp.tablet]: "40px", [bp.desktop]: 0 },
    "--gfs": sun.heroFont,
    "--gh": "calc(var(--gfs) * 4.24)",
  },
  overlay: {
    display: { default: "contents", [bp.desktop]: "grid" },
    position: "absolute",
    inset: 0,
    gridTemplateRows: "auto 1fr",
    rowGap: 20,
    paddingBlock: { default: 0, [bp.desktop]: "48px 40px" },
  },
  meta: {
    order: 1,
    gridColumn: { default: "1 / -1", [bp.desktop]: "1 / span 3" },
    gridRow: "1",
    display: "flex",
    flexDirection: { default: "row", [bp.desktop]: "column" },
    alignItems: { default: "baseline", [bp.desktop]: "flex-start" },
    gap: { default: 12, [bp.desktop]: 4 },
    paddingInline: { default: 20, [bp.tablet]: 40, [bp.desktop]: 0 },
  },
  established: {
    margin: 0,
    fontFamily: face.serif,
    fontSize: { default: 24, [bp.desktop]: 32 },
    lineHeight: 1.1,
    color: tone.navy,
  },
  place: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: tone.quiet,
  },
  lead: {
    order: 2,
    gridColumn: { default: "1 / -1", [bp.desktop]: "9 / span 4" },
    gridRow: { default: "auto", [bp.desktop]: "1" },
    margin: 0,
    paddingInline: { default: 20, [bp.tablet]: 40, [bp.desktop]: 0 },
    fontFamily: face.sans,
    fontSize: { default: 17, [bp.desktop]: 19 },
    fontWeight: 500,
    lineHeight: 1.75,
    color: tone.ink,
    textWrap: "pretty",
    maxWidth: "24em",
  },
  hint: {
    order: 4,
    gridColumn: { default: "1 / -1", [bp.desktop]: "9 / span 4" },
    gridRow: { default: "auto", [bp.desktop]: "2" },
    alignSelf: "end",
    justifySelf: { default: "start", [bp.desktop]: "end" },
    display: { default: "flex", [bp.motionReduce]: "none" },
    alignItems: "baseline",
    gap: 10,
    margin: 0,
    paddingInline: { default: 20, [bp.tablet]: 40, [bp.desktop]: 0 },
    fontFamily: face.sans,
    fontSize: 14,
    lineHeight: 1.5,
    color: tone.quiet,
  },
  hintSerif: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 17,
    color: tone.navy,
  },
  comp: {
    order: 3,
    position: { default: "relative", [bp.desktop]: "absolute" },
    inset: { default: "auto", [bp.desktop]: 0 },
    height: { default: "calc(var(--gh) * 1.86)", [bp.desktop]: "auto" },
    pointerEvents: "none",
  },
  anchor: {
    position: "absolute",
    left: {
      default: "calc(50% - var(--gh) * 0.5)",
      [bp.tablet]: "calc(50% - var(--gh) * 0.3)",
      [bp.desktop]: "calc(50% - var(--gh) * 0.2)",
    },
    top: { default: 0, [bp.desktop]: "calc(50% - var(--gh) * 0.9)" },
    marginLeft: "calc(var(--gfs) * -0.5)",
  },
  tip: {
    position: "absolute",
    top: 0,
    left: 0,
    whiteSpace: "nowrap",
    transform: `translate(${TIP_X}, ${TIP_Y}) translate(-50%, -50%)`,
    willChange: "transform",
    "--tip-gap": "24px",
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 16, [bp.desktop]: 20 },
    lineHeight: 1,
    fontVariantNumeric: "tabular-nums",
    color: tone.navy,
  },
  release: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  tipDot: {
    position: "absolute",
    top: -3,
    left: -3,
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: tone.navy,
    opacity: 0.55,
    transform: `translate(${TIP_X}, ${TIP_Y})`,
    willChange: "transform",
    "--tip-gap": "0px",
  },
});

export function Hero() {
  const hour = useSunHour();
  const tipRef = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(hour, "change", (value) => {
    if (tipRef.current) tipRef.current.textContent = clock(value).time;
  });

  return (
    <section aria-labelledby="oos1t-title" {...stylex.props(styles.hero)}>
      <div {...stylex.props(styles.stage)}>
        <div {...stylex.props(ui.shell, ui.grid, styles.overlay)}>
          <div {...stylex.props(styles.meta)}>
            <p lang="en" {...stylex.props(styles.established)}>
              {ABOUT_BANNER.established}
            </p>
            <p lang="en" {...stylex.props(styles.place)}>
              {ABOUT_BANNER.place} · 32° N
            </p>
          </div>
          <p {...stylex.props(styles.lead)}>{ABOUT_BANNER.lead}</p>
          <p {...stylex.props(styles.hint)}>
            <span lang="en" aria-hidden="true" {...stylex.props(styles.hintSerif)}>
              IX — I
            </span>
            <span>向下滚动，日影随时辰移动</span>
          </p>
        </div>
        <div {...stylex.props(styles.comp)}>
          <div {...stylex.props(styles.anchor)}>
            <Gnomon text={ABOUT_BANNER.title} id="oos1t-title" level={1} rise>
              <Dial />
              <span aria-hidden="true" {...stylex.props(styles.tipDot, styles.appear)} />
              <span ref={tipRef} aria-hidden="true" {...stylex.props(styles.tip, styles.appear)}>
                {clock(DAY_START).time}
              </span>
            </Gnomon>
          </div>
        </div>
      </div>
      <span
        aria-hidden="true"
        data-hour="10"
        data-hour-at="release"
        {...stylex.props(styles.release)}
      />
    </section>
  );
}
