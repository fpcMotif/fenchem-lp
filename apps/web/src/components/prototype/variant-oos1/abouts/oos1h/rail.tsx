import * as stylex from "@stylexjs/stylex";
import { m, type MotionValue } from "@/compat/motion";
import { createEffect } from "solid-js";

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
    display: { default: "none", ["@media (min-width: 1280px)"]: "block" },
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
    display: { default: "block", ["@media (min-width: 1280px)"]: "none" },
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

export function Rail(props: { progress: MotionValue<number>; active: number }) {
  return (
    <div {...stylex.attrs(styles.column)}>
      <nav aria-label="On this page" {...stylex.attrs(styles.plate)}>
        <div {...stylex.attrs(styles.readout)}>
          <YearReadout progress={props.progress} sx={styles.readoutDigits} />
        </div>
        <div {...stylex.attrs(styles.track)}>
          <span aria-hidden="true" {...stylex.attrs(styles.spine)} />
          {RAIL_STOPS.map((stop, position) => (
            <a
              href={`#${stop.id}`}
              aria-current={props.active === position ? "location" : undefined}
              {...stylex.attrs(styles.stop, styles.stopAt(stop.at), shared.focusRing)}
            >
              <span
                aria-hidden="true"
                {...stylex.attrs(
                  styles.stopTick,
                  props.active === position && styles.stopTickActive,
                )}
              />
              <span
                lang="en"
                {...stylex.attrs(styles.label, props.active === position && styles.labelShown)}
              >
                {stop.label}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

export function TopBar(props: { progress: MotionValue<number>; active: number }) {
  let listRef: HTMLElement | undefined;
  const reduce = useReducedMotion();

  createEffect(
    () => [props.active, reduce()] as const,
    ([activeNow, reduceNow]) => {
      const list = listRef;
      const stop = RAIL_STOPS[activeNow];
      const chip = stop ? list?.querySelector<HTMLElement>(`[href="#${stop.id}"]`) : null;
      if (!list || !chip) return;
      const listBox = list.getBoundingClientRect();
      const chipBox = chip.getBoundingClientRect();
      if (chipBox.left < listBox.left || chipBox.right > listBox.right) {
        list.scrollBy({
          left: chipBox.left - listBox.left - 16,
          behavior: reduceNow ? "auto" : "smooth",
        });
      }
    },
  );

  return (
    <div {...stylex.attrs(styles.bar)}>
      <div {...stylex.attrs(shared.shell, shared.inset, styles.barRow)}>
        <div {...stylex.attrs(styles.barYear)}>
          <YearReadout progress={props.progress} sx={styles.barYearDigits} />
          <span aria-hidden="true" {...stylex.attrs(styles.barYearUnit)}>
            年
          </span>
        </div>
        <nav aria-label="On this page" ref={listRef} {...stylex.attrs(styles.chips)}>
          {RAIL_STOPS.map((stop, position) => (
            <a
              href={`#${stop.id}`}
              aria-current={props.active === position ? "location" : undefined}
              {...stylex.attrs(
                styles.chip,
                props.active === position && styles.chipActive,
                shared.focusRing,
              )}
            >
              <span lang="en">{stop.label}</span>
            </a>
          ))}
        </nav>
      </div>
      <m.div
        aria-hidden="true"
        {...stylex.attrs(styles.barFill)}
        style={{ scaleX: props.progress }}
      />
    </div>
  );
}
