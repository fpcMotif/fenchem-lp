import * as stylex from "@stylexjs/stylex";
import { Fragment, type CSSProperties } from "react";

import type { CorridorGeometry } from "./corridor-geometry";
import { LAKE, PLACE, WORKS, ui } from "./shared";
import { face, tone } from "./tokens.stylex";

const styles = stylex.create({
  part: {
    position: "absolute",
    boxSizing: "border-box",
  },
  line: {
    backgroundColor: tone.line,
  },
  edge: {
    backgroundColor: tone.lineStrong,
  },
  light: {
    backgroundColor: "rgba(11, 42, 92, 0.16)",
  },
  endWall: {
    backgroundColor: tone.navy,
  },
  frame: {
    display: "block",
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: tone.lineStrong, ":hover": tone.blue },
    backgroundColor: tone.paper,
    cursor: "zoom-in",
    transitionProperty: "border-color",
    transitionDuration: "200ms",
  },
  photo: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundColor: tone.tint,
  },
  wire: {
    position: "absolute",
    left: "18%",
    right: "18%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderLeftColor: tone.line,
    borderRightColor: tone.line,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: "0.3em",
    color: tone.ink,
    fontFamily: face.sans,
    lineHeight: 1.3,
  },
  labelNumber: {
    fontSize: "1.5em",
    lineHeight: 1,
    color: tone.navy,
  },
  labelTitle: {
    fontSize: "1em",
  },
  labelMeta: {
    fontSize: "0.86em",
    color: tone.body,
  },
  lakeFrame: {
    backgroundColor: tone.paper,
  },
  lakeLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.2em",
    fontFamily: face.sans,
    color: "rgba(255, 255, 255, 0.86)",
    whiteSpace: "nowrap",
  },
  lakeNumber: {
    fontSize: "1.4em",
    color: tone.paper,
  },
});

function place(
  width: number,
  height: number,
  x: number,
  y: number,
  depth: number,
  turn = "",
): CSSProperties {
  return {
    width,
    height,
    left: -width / 2,
    top: -height / 2,
    transform: `translate3d(${x}px, ${y}px, ${-depth}px)${turn ? ` ${turn}` : ""}`,
  };
}

function run(x: number, y: number, from: number, to: number): CSSProperties {
  return place(to - from, 1, x, y, (from + to) / 2, "rotateY(90deg)");
}

export function CorridorScene({
  geometry,
  onOpen,
}: {
  geometry: CorridorGeometry;
  onOpen: (index: number) => void;
}) {
  const { halfWidth: hw, halfHeight: hh, unit, end, rail, base, lake } = geometry;
  const near = -geometry.perspective * 0.4;

  const edges: [number, number][] = [
    [-hw, -hh],
    [hw, -hh],
    [-hw, hh],
    [hw, hh],
  ];
  const fines: [number, number][] = [
    [-hw, rail],
    [hw, rail],
    [-hw, base],
    [hw, base],
    [-hw / 3, hh],
    [hw / 3, hh],
    [(-hw * 2) / 3, hh],
    [(hw * 2) / 3, hh],
  ];
  const joints: number[] = [];
  for (let depth = unit * 0.42; depth < end; depth += unit * 0.42) joints.push(depth);
  const lights: number[] = [];
  for (let depth = unit * 0.63; depth < end - unit * 0.3; depth += unit * 0.84) lights.push(depth);

  const lakeOuterWidth = lake.width + lake.mat * 2;
  const lakeOuterHeight = lake.height + lake.mat * 2;
  const labelWidth = unit * 0.24;
  const labelHeight = unit * 0.18;

  return (
    <>
      {edges.map(([x, y]) => (
        <span
          key={`edge${x}${y}`}
          style={run(x, y, near, end)}
          {...stylex.props(styles.part, styles.edge)}
        />
      ))}
      {fines.map(([x, y]) => (
        <span
          key={`fine${x}${y}`}
          style={run(x, y, near, end)}
          {...stylex.props(styles.part, styles.line)}
        />
      ))}
      {joints.map((depth) => (
        <span
          key={`joint${depth}`}
          style={place(hw * 2, 1, 0, hh, depth)}
          {...stylex.props(styles.part, styles.line)}
        />
      ))}
      {lights.map((depth) => (
        <span
          key={`light${depth}`}
          style={place(hw * 0.4, 2, 0, -hh, depth)}
          {...stylex.props(styles.part, styles.light)}
        />
      ))}

      <span
        style={place(hw * 2, hh * 2, 0, 0, end)}
        {...stylex.props(styles.part, styles.endWall)}
      />

      {geometry.frames.map((frame, index) => {
        const work = WORKS[index];
        const turn = frame.wall === "left" ? "rotateY(90deg)" : "rotateY(-90deg)";
        const x = frame.wall === "left" ? -hw + 1 : hw - 1;
        const wire = frame.y - frame.height / 2 - rail;
        const offset = frame.length / 2 + unit * 0.05 + labelWidth / 2;
        const labelDepth = frame.wall === "left" ? frame.depth + offset : frame.depth - offset;
        const labelY = frame.y + frame.height / 2 - labelHeight / 2;
        return (
          <Fragment key={work.id}>
            <button
              type="button"
              tabIndex={-1}
              onClick={() => onOpen(index)}
              style={{
                ...place(frame.length, frame.height, x, frame.y, frame.depth, turn),
                padding: frame.mat,
              }}
              {...stylex.props(styles.part, styles.frame)}
            >
              <span style={{ top: -wire - 1, height: wire }} {...stylex.props(styles.wire)} />
              <img
                src={work.src}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                {...stylex.props(styles.photo)}
              />
            </button>
            <span
              style={{
                ...place(labelWidth, labelHeight, x, labelY, labelDepth, turn),
                fontSize: unit * 0.024,
              }}
              {...stylex.props(styles.part, styles.label)}
            >
              <span lang="en" {...stylex.props(ui.number, styles.labelNumber)}>
                Nº {work.number}
              </span>
              <span {...stylex.props(styles.labelTitle)}>{work.caption}</span>
              <span lang="en" {...stylex.props(ui.italic, styles.labelMeta)}>
                {work.english}, {PLACE}
              </span>
            </span>
          </Fragment>
        );
      })}

      <span
        style={{ ...place(lakeOuterWidth, lakeOuterHeight, 0, 0, end - 1), padding: lake.mat }}
        {...stylex.props(styles.part, styles.lakeFrame)}
      >
        <img
          src={LAKE.src}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          {...stylex.props(styles.photo)}
        />
      </span>
      <span
        style={{
          ...place(lakeOuterWidth, unit * 0.06, 0, lakeOuterHeight / 2 + unit * 0.07, end - 1),
          fontSize: unit * 0.018,
        }}
        {...stylex.props(styles.part, styles.lakeLabel)}
      >
        <span lang="en" {...stylex.props(ui.number, styles.lakeNumber)}>
          Nº {LAKE.number}
        </span>
        <span>{LAKE.title}</span>
        <span lang="en" {...stylex.props(ui.italic)}>
          {LAKE.facing}
        </span>
      </span>
    </>
  );
}
