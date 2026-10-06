import * as stylex from "@stylexjs/stylex";

import { ui } from "./layout";
import { bp, chrome, tone } from "./tokens.stylex";

const styles = stylex.create({
  layer: {
    position: "absolute",
    top: chrome.header,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    pointerEvents: "none",
  },
  fullHeight: {
    height: "100%",
  },
  lines: {
    height: "100%",
    gridTemplateRows: "100%",
  },
  line: {
    gridRow: "1",
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: tone.timeLine,
  },
  lineEnd: {
    gridRow: "1",
    gridColumn: "12 / 13",
    borderInlineEndWidth: 1,
    borderInlineEndStyle: "solid",
    borderInlineEndColor: tone.timeLine,
  },
  inner: {
    display: { default: "none", [bp.abovePhone]: "block" },
  },
  arrow: {
    display: "block",
    flexShrink: 0,
  },
});

const columns = stylex.create({
  c1: { gridColumn: "1 / 2" },
  c4: { gridColumn: "4 / 5" },
  c7: { gridColumn: "7 / 8" },
  c10: { gridColumn: "10 / 11" },
});

const INNER_COLUMNS = [columns.c4, columns.c7, columns.c10];

export function TimeLines() {
  return (
    <div aria-hidden="true" {...stylex.props(styles.layer)}>
      <div {...stylex.props(ui.shell, styles.fullHeight)}>
        <div {...stylex.props(ui.grid, styles.lines)}>
          <span {...stylex.props(styles.line, columns.c1)} />
          {INNER_COLUMNS.map((column, index) => (
            <span key={index} {...stylex.props(styles.line, column, styles.inner)} />
          ))}
          <span {...stylex.props(styles.lineEnd)} />
        </div>
      </div>
    </div>
  );
}

export function ForwardArrow() {
  return (
    <svg width="5" height="6" viewBox="0 0 5 6" aria-hidden="true" {...stylex.props(styles.arrow)}>
      <path d="M0 0L5 3L0 6Z" fill="currentColor" />
    </svg>
  );
}

export function frameLabel(value: number) {
  return String(value).padStart(2, "0");
}
