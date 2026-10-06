import * as stylex from "@stylexjs/stylex";
import { m, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import {
  COUNTERWEIGHT_SELECTOR,
  ENGAGE_RANGE,
  LEVER,
  readingLine,
  useTwoColumn,
} from "./counterweight";
import { FulcrumMark } from "./pair";
import { ui } from "./shared";
import { bp, grid, tone } from "./tokens.stylex";

const HANDOVER = 72;
const RELEASE_START = 360;
const RELEASE_SPAN = 220;

function nearestShare(near: number, next: number) {
  const progress = Math.min(1, (Math.abs(next) - Math.abs(near)) / HANDOVER);
  return 0.5 + 0.5 * progress * progress * (3 - 2 * progress);
}

function columnOffset(distances: number[]) {
  const [near = 0, next = near] = distances;
  const share = nearestShare(near, next);
  const offset = 2 * LEVER * (share * near + (1 - share) * next);
  const release = Math.min(1, Math.max(0, (Math.abs(near) - RELEASE_START) / RELEASE_SPAN));
  return offset * (1 - release);
}

const styles = stylex.create({
  bar: {
    position: "sticky",
    top: grid.readingLine,
    display: { default: "none", [bp.wideMotion]: "block" },
    height: 0,
    pointerEvents: "none",
  },
  track: {
    position: "relative",
    gridColumn: "1 / -1",
    gridRow: "1",
    height: 0,
  },
  beam: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 1,
    transformOrigin: "calc(58.3333% + 2px) 50%",
  },
  stroke: {
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: tone.navy,
    transformOrigin: "50% 0",
  },
  fulcrumSlot: {
    position: "relative",
    gridColumn: "8 / 13",
    gridRow: "1",
    height: 0,
  },
});

export function BalanceBeam() {
  const barRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const twoColumn = useTwoColumn();
  const { scrollY } = useScroll();
  const rotate = useMotionValue(0);
  const engage = useMotionValue(1);
  const opacity = useTransform(engage, [0, 1], [0.62, 1]);
  const weight = useTransform(engage, [0, 1], [1, 2]);

  const update = useCallback(() => {
    const bar = barRef.current;
    const beam = beamRef.current;
    const sequence = bar?.parentElement;
    if (!bar || !beam || !sequence || reduce || !twoColumn) return;
    const line = readingLine(window.innerHeight);
    const distances = Array.from(
      sequence.querySelectorAll(COUNTERWEIGHT_SELECTOR),
      (pair) => pair.getBoundingClientRect().top - line,
    ).sort((a, b) => Math.abs(a) - Math.abs(b));
    const span = beam.offsetWidth;
    const offset = columnOffset(distances);
    rotate.set(
      span > 0 ? (-Math.asin(Math.max(-1, Math.min(1, offset / span))) * 180) / Math.PI : 0,
    );
    engage.set(Math.max(0, 1 - Math.abs(distances[0] ?? 0) / ENGAGE_RANGE));
  }, [reduce, twoColumn, rotate, engage]);

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return (
    <div ref={barRef} aria-hidden="true" {...stylex.props(styles.bar)}>
      <div {...stylex.props(ui.shell, ui.columns)}>
        <span {...stylex.props(styles.track)}>
          <m.span ref={beamRef} {...stylex.props(styles.beam)} style={{ rotate, opacity }}>
            <m.span {...stylex.props(styles.stroke)} style={{ scaleY: weight }} />
          </m.span>
        </span>
        <span {...stylex.props(styles.fulcrumSlot)}>
          <FulcrumMark />
        </span>
      </div>
    </div>
  );
}
