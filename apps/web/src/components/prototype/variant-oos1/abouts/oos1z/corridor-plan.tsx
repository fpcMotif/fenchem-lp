import * as stylex from "@stylexjs/stylex";
import { createSignal } from "solid-js";

import { corridorGeometry } from "./corridor-geometry";
import { LAKE, WORKS, srOnly, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const REFERENCE = corridorGeometry(1440, 820);
const percent = (depth: number) => `${(depth / REFERENCE.end) * 100}%`;
const LAKE_INSET = `${50 - (REFERENCE.lake.width / (REFERENCE.halfWidth * 2)) * 50}%`;
const LAKE_TICK = { top: LAKE_INSET, bottom: LAKE_INSET };

const styles = stylex.create({
  plan: {
    display: { default: "none", [bp.corridor]: "block" },
    position: "relative",
    width: "min(100%, 1080px)",
    marginInline: "auto",
    marginTop: 72,
    paddingInlineEnd: 176,
    boxSizing: "border-box",
  },
  field: {
    position: "relative",
    height: 216,
  },
  corridor: {
    position: "absolute",
    top: 72,
    left: 0,
    right: 0,
    height: 72,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 2,
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderRightStyle: "solid",
    borderTopColor: tone.lineStrong,
    borderBottomColor: tone.lineStrong,
    borderRightColor: tone.navy,
  },
  sight: {
    position: "absolute",
    top: "50%",
    left: 22,
    right: 0,
    height: 0,
    borderTopWidth: 1,
    borderTopStyle: "dashed",
    borderTopColor: tone.line,
  },
  here: {
    position: "absolute",
    top: "50%",
    left: 0,
    width: 9,
    height: 9,
    marginTop: -4.5,
    marginLeft: 8,
    borderRadius: "50%",
    backgroundColor: tone.navy,
  },
  hereLabel: {
    position: "absolute",
    top: "50%",
    left: 26,
    transform: "translateY(calc(-100% - 6px))",
    color: tone.navy,
    whiteSpace: "nowrap",
  },
  tick: {
    position: "absolute",
    height: 4,
    backgroundColor: { default: tone.lineStrong },
    transitionProperty: "background-color",
    transitionDuration: "160ms",
  },
  tickLeft: {
    top: 0,
  },
  tickRight: {
    bottom: 0,
  },
  tickActive: {
    backgroundColor: tone.blue,
  },
  lakeTick: {
    position: "absolute",
    right: -2,
    width: 4,
    backgroundColor: tone.blue,
  },
  lakeLabel: {
    position: "absolute",
    margin: 0,
    top: 72,
    height: 72,
    left: "100%",
    width: 176,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 2,
    paddingInlineStart: 20,
    whiteSpace: "nowrap",
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  item: {
    position: "absolute",
    transform: "translateX(-50%)",
  },
  itemLeft: {
    top: 18,
  },
  itemRight: {
    top: 162,
  },
  work: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 8,
    paddingBlock: 6,
    paddingInline: 4,
    whiteSpace: "nowrap",
    textDecorationLine: { default: "none", ":hover": "underline" },
    textDecorationColor: tone.line,
    textUnderlineOffset: 6,
  },
  number: {
    fontSize: 18,
    color: tone.navy,
  },
  caption: {
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.ink,
  },
  lakeTitle: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
  },
  lakeNote: {
    fontSize: 15,
    color: tone.body,
  },
});

export function CorridorPlan(props: { onOpen: (index: number) => void }) {
  const [hovered, setHovered] = createSignal<number | null>(null);
  return (
    <div {...stylex.attrs(styles.plan)}>
      <div {...stylex.attrs(styles.field)}>
        <div aria-hidden="true" {...stylex.attrs(styles.corridor)}>
          <span {...stylex.attrs(styles.sight)} />
          <span {...stylex.attrs(styles.here)} />
          <span lang="en" {...stylex.attrs(ui.caps, styles.hereLabel)}>
            You are here
          </span>
          {REFERENCE.frames.map((frame, index) => (
            <span
              style={{
                left: percent(frame.depth - frame.length / 2),
                width: percent(frame.length),
              }}
              {...stylex.attrs(
                styles.tick,
                frame.wall === "left" ? styles.tickLeft : styles.tickRight,
                hovered() === index && styles.tickActive,
              )}
            />
          ))}
          <span style={LAKE_TICK} {...stylex.attrs(styles.lakeTick)} />
        </div>
        <ol {...stylex.attrs(styles.list)}>
          {WORKS.map((work, index) => (
            <li
              style={{ left: percent(REFERENCE.frames[index].depth) }}
              {...stylex.attrs(
                styles.item,
                work.wall === "left" ? styles.itemLeft : styles.itemRight,
              )}
            >
              <button
                type="button"
                onClick={() => props.onOpen(index)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                {...stylex.attrs(ui.button, ui.focus, styles.work)}
              >
                <span lang="en" {...stylex.attrs(ui.number, styles.number)}>
                  {work.number}
                </span>
                <span {...stylex.attrs(styles.caption)}>{work.caption}</span>
                <span {...srOnly}>, View larger</span>
              </button>
            </li>
          ))}
        </ol>
        <p {...stylex.attrs(styles.lakeLabel)}>
          <span {...stylex.attrs(styles.lakeTitle)}>
            <span lang="en" {...stylex.attrs(ui.number, styles.number)}>
              {LAKE.number}
            </span>
            <span {...stylex.attrs(styles.caption)}>{LAKE.title}</span>
          </span>
          <span lang="en" {...stylex.attrs(ui.italic, styles.lakeNote)}>
            facing you
          </span>
        </p>
      </div>
    </div>
  );
}
