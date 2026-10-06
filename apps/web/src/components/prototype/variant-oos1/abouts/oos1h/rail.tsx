import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { YearReadout } from "./odometer";
import { shared } from "./shared";
import { font, layout, mq, ui } from "./theme.stylex";
import { RAIL_STOPS } from "./use-rail";

const OVERSHOOT = "cubic-bezier(0.34, 1.7, 0.64, 1)";

const styles = stylex.create({
  column: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    width: 80,
    display: { default: "none", [breakpoints.xl]: "block" },
    pointerEvents: "none",
  },
  plate: {
    position: "sticky",
    top: 104,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    width: 56,
    height: "calc(100svh - 128px)",
    maxHeight: 780,
    marginInlineStart: 12,
    paddingBlock: 12,
    paddingInline: 8,
    backgroundColor: ui.plate,
    pointerEvents: "auto",
  },
  readout: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 12,
  },
  readoutDigits: {
    fontSize: 14,
    fontWeight: 500,
    color: ui.ink,
  },
  track: {
    position: "relative",
    flexGrow: 1,
    minHeight: 0,
    marginBottom: 6,
  },
  spine: {
    position: "absolute",
    top: 0,
    left: 6,
    width: 1,
    height: "100%",
    backgroundColor: ui.hairline,
    pointerEvents: "none",
  },
  stop: {
    position: "absolute",
    left: 0,
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    paddingTop: 4,
    paddingInlineStart: 24,
    textDecoration: "none",
  },
  stopAt: (at: number) => ({ top: `${at * 100}%` }),
  stopTick: {
    position: "absolute",
    top: 0,
    left: 6,
    width: 8,
    height: 1,
    backgroundColor: ui.tickStrong,
    transitionProperty: "width",
    transitionDuration: "420ms",
    transitionTimingFunction: OVERSHOOT,
  },
  stopTickActive: {
    width: 18,
  },
  label: {
    display: "block",
    writingMode: "vertical-rl",
    fontFamily: font.cjk,
    fontSize: 10,
    fontWeight: 400,
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    color: ui.body,
    opacity: {
      default: 1,
      [mq.shortViewport]: 0,
    },
  },
  labelShown: {
    opacity: 1,
  },

  bar: {
    position: "sticky",
    top: layout.header,
    zIndex: 1,
    display: { default: "block", [breakpoints.xl]: "none" },
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    backdropFilter: "blur(14px)",
    boxShadow: `0 1px 0 0 ${ui.hairlineSoft}`,
  },
  barRow: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    height: 48,
  },
  barYear: {
    display: "flex",
    flexShrink: 0,
    alignItems: "baseline",
    gap: 3,
    color: ui.ink,
  },
  barYearDigits: {
    fontSize: 16,
    fontWeight: 500,
    color: ui.ink,
  },
  barYearUnit: {
    fontSize: 12,
    color: ui.body,
  },
  chips: {
    display: "flex",
    alignItems: "center",
    gap: 22,
    flexGrow: 1,
    minWidth: 0,
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: 48,
    boxSizing: "border-box",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    fontFamily: font.cjk,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: { default: ui.body, ":hover": ui.ink },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color, border-color",
    transitionDuration: "200ms",
    transitionTimingFunction: layout.easeOut,
  },
  chipActive: {
    borderBottomColor: ui.ink,
  },
  barFill: {
    height: 1,
    backgroundColor: ui.ink,
    transformOrigin: "left",
  },
});

export function Rail({ progress, active }: { progress: MotionValue<number>; active: number }) {
  return (
    <div {...stylex.props(styles.column)}>
      <nav aria-label="本页导航" {...stylex.props(styles.plate)}>
        <div {...stylex.props(styles.readout)}>
          <YearReadout progress={progress} sx={styles.readoutDigits} />
        </div>
        <div {...stylex.props(styles.track)}>
          <span aria-hidden="true" {...stylex.props(styles.spine)} />
          {RAIL_STOPS.map((stop, position) => (
            <a
              key={stop.id}
              href={`#${stop.id}`}
              aria-current={active === position ? "location" : undefined}
              {...stylex.props(styles.stop, styles.stopAt(stop.at), shared.focusRing)}
            >
              <span
                aria-hidden="true"
                {...stylex.props(styles.stopTick, active === position && styles.stopTickActive)}
              />
              <span
                lang="en"
                {...stylex.props(styles.label, active === position && styles.labelShown)}
              >
                {stop.label}
              </span>
              <span {...stylex.props(shared.srOnly)}> {stop.name}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

export function TopBar({ progress, active }: { progress: MotionValue<number>; active: number }) {
  const listRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    const stop = RAIL_STOPS[active];
    const chip = stop ? list?.querySelector<HTMLElement>(`[href="#${stop.id}"]`) : null;
    if (!list || !chip) return;
    const listBox = list.getBoundingClientRect();
    const chipBox = chip.getBoundingClientRect();
    if (chipBox.left < listBox.left || chipBox.right > listBox.right) {
      list.scrollBy({
        left: chipBox.left - listBox.left - 16,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  }, [active, reduce]);

  return (
    <div {...stylex.props(styles.bar)}>
      <div {...stylex.props(shared.shell, shared.inset, styles.barRow)}>
        <div {...stylex.props(styles.barYear)}>
          <YearReadout progress={progress} sx={styles.barYearDigits} />
          <span aria-hidden="true" {...stylex.props(styles.barYearUnit)}>
            年
          </span>
        </div>
        <nav aria-label="本页导航" ref={listRef} {...stylex.props(styles.chips)}>
          {RAIL_STOPS.map((stop, position) => (
            <a
              key={stop.id}
              href={`#${stop.id}`}
              aria-current={active === position ? "location" : undefined}
              {...stylex.props(
                styles.chip,
                active === position && styles.chipActive,
                shared.focusRing,
              )}
            >
              <span lang="en">{stop.label}</span>
              <span {...stylex.props(shared.srOnly)}> {stop.name}</span>
            </a>
          ))}
        </nav>
      </div>
      <m.div aria-hidden="true" {...stylex.props(styles.barFill)} style={{ scaleX: progress }} />
    </div>
  );
}
