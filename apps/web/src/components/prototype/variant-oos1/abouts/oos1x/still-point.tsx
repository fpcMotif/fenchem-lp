import * as stylex from "@stylexjs/stylex";
import { m, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, type CSSProperties } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CSR } from "../../about-data";
import { HEADER_HEIGHT, READING_LINE_RATIO, useTwoColumn } from "./counterweight";
import { FulcrumMark } from "./pair";
import { type, ui } from "./shared";
import { bp, tone } from "./tokens.stylex";

const HOLD = 0.6;
const APPROACH = 0.4;
const LEVEL_SPAN = 0.8;
const LEVEL_DEPTH = 0.15;
const PHONE_LEVEL_SHARE = 0.5;

const BAND_GEOMETRY = {
  "--oos1x-band": String(1 + HOLD),
  "--oos1x-entry": String(READING_LINE_RATIO - APPROACH / 2),
} as CSSProperties;

function restOffset(travel: number, approach: number, hold: number, arrive: number) {
  const leave = arrive + hold;
  if (travel <= arrive - approach) return 0;
  if (travel <= arrive) {
    const into = travel - (arrive - approach);
    return (into * into) / (2 * approach);
  }
  if (travel <= leave) return approach / 2 + (travel - arrive);
  if (travel <= leave + approach) {
    const out = travel - leave;
    return approach / 2 + hold + out - (out * out) / (2 * approach);
  }
  return approach + hold;
}

const styles = stylex.create({
  band: {
    position: "relative",
    zIndex: 1,
    overflow: "hidden",
    backgroundColor: tone.navy,
    color: tone.onNavy,
  },
  bandMoving: {
    height: "calc((100svh - 80px) * var(--oos1x-band))",
  },
  bandStill: {
    paddingBlock: "clamp(150px, 24vh, 240px)",
  },
  probe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 1,
    height: "100svh",
    visibility: "hidden",
    pointerEvents: "none",
  },
  blockMoving: {
    position: "absolute",
    top: "calc((100svh - 80px) * var(--oos1x-entry))",
    left: 0,
    right: 0,
  },
  blockStill: {
    position: "relative",
  },
  measure: {
    position: "relative",
    containerType: "inline-size",
  },
  standing: {
    position: "absolute",
    bottom: "100%",
    left: 0,
    right: 0,
    alignItems: { default: "start", [bp.wide]: "last baseline" },
    rowGap: 10,
    paddingBottom: { default: 24, [bp.wide]: 34 },
  },
  label: {
    gridColumn: { default: "auto", [bp.wide]: "1 / 3" },
    color: tone.onNavyQuiet,
  },
  heading: {
    gridColumn: { default: "auto", [bp.wide]: "3 / 8" },
    color: tone.onNavyQuiet,
  },
  sentence: {
    margin: 0,
    fontSize: {
      default: "calc(100cqw / 12)",
      [bp.wide]: "calc((100cqw + 24px) * 7 / 144)",
    },
    lineHeight: 1.25,
    letterSpacing: 0,
    color: tone.onNavy,
    rowGap: { default: "0.2em", [bp.wide]: 0 },
  },
  lead: {
    display: "block",
    gridColumn: { default: "auto", [bp.wide]: "1 / 8" },
    whiteSpace: "nowrap",
  },
  trail: {
    display: "block",
    gridColumn: { default: "auto", [bp.wide]: "8 / 13" },
    whiteSpace: "nowrap",
  },
  pivotSlot: {
    position: "relative",
    display: { default: "none", [bp.wide]: "block" },
    gridColumn: "8 / 13",
    gridRow: "2",
    height: 0,
  },
  pivot: {
    top: 22,
    color: tone.onNavy,
  },
});

export function StillPoint() {
  const bandRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const twoColumn = useTwoColumn();
  const { scrollY } = useScroll();
  const rest = useMotionValue(0);
  const leadX = useMotionValue(0);
  const leadY = useMotionValue(0);
  const trailX = useMotionValue(0);
  const trailY = useMotionValue(0);

  const update = useCallback(() => {
    const band = bandRef.current;
    const probe = probeRef.current;
    if (!band || !probe) return;
    if (reduce) {
      for (const value of [rest, leadX, leadY, trailX, trailY]) value.set(0);
      return;
    }
    const viewport = probe.offsetHeight;
    const visible = viewport - HEADER_HEIGHT;
    const travel = viewport - band.getBoundingClientRect().top;
    rest.set(restOffset(travel, APPROACH * visible, HOLD * visible, visible));
    const remaining = Math.min(1, Math.max(0, (visible - travel) / (LEVEL_SPAN * visible)));
    const depth = LEVEL_DEPTH * visible * remaining * remaining;
    leadY.set(twoColumn ? depth : 0);
    trailY.set(twoColumn ? -depth : 0);
    leadX.set(twoColumn ? 0 : -depth * PHONE_LEVEL_SHARE);
    trailX.set(twoColumn ? 0 : depth * PHONE_LEVEL_SHARE);
  }, [reduce, twoColumn, rest, leadX, leadY, trailX, trailY]);

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return (
    <div
      ref={bandRef}
      {...stylex.props(styles.band, reduce ? styles.bandStill : styles.bandMoving)}
      style={BAND_GEOMETRY}
    >
      <span ref={probeRef} aria-hidden="true" {...stylex.props(styles.probe)} />
      <m.div {...stylex.props(reduce ? styles.blockStill : styles.blockMoving)} style={{ y: rest }}>
        <div {...stylex.props(ui.shell)}>
          <div {...stylex.props(styles.measure)}>
            <div {...stylex.props(ui.columns, styles.standing)}>
              <p
                lang="en"
                aria-hidden="true"
                {...stylex.props(type.counterweight, type.counterHeading, styles.label)}
              >
                Responsibility
              </p>
              <h2 id="oos1x-csr" {...stylex.props(type.light, type.heading, styles.heading)}>
                {ABOUT_CSR.title}
              </h2>
            </div>
            <p {...stylex.props(ui.columns, type.light, styles.sentence)}>
              <m.span {...stylex.props(styles.lead)} style={{ x: leadX, y: leadY }}>
                {ABOUT_CSR.statement[0]}
              </m.span>
              <m.span {...stylex.props(styles.trail)} style={{ x: trailX, y: trailY }}>
                {ABOUT_CSR.statement[1]}
              </m.span>
              <span aria-hidden="true" {...stylex.props(styles.pivotSlot)}>
                <FulcrumMark sx={styles.pivot} />
              </span>
            </p>
          </div>
        </div>
      </m.div>
    </div>
  );
}
