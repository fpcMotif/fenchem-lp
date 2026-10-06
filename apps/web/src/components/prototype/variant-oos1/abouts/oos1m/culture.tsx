import * as stylex from "@stylexjs/stylex";
import { m, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { ABOUT_CULTURE } from "../../about-data";
import {
  Camera,
  cq,
  Drawing,
  easeInOut,
  GroundPlane,
  GroundShadow,
  IsoBox,
  projectIso,
  span,
} from "./iso";
import { PlateFace } from "./plate-face";
import { SheetHeader } from "./sheet-header";
import { pad2, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";
import { useViewAssembly } from "./use-assembly-progress";

const ENGLISH = ["Expertise", "Steadiness", "Innovation"] as const;

const TILE = 540;
const HALF = TILE / 2;
const THICK = 54;
const LIFT = 150;
const ORIGIN = { x: 470, y: 428 } as const;
const BALLOON = { x: 880, y: 120 } as const;
const SHEET_HEIGHT = 690;

const CORNERS = [
  [-HALF, -HALF],
  [-HALF, HALF],
  [HALF, HALF],
] as const;

const at = (x: number, y: number, z: number) => {
  const offset = projectIso(x, y, z);
  return { x: ORIGIN.x + offset.x, y: ORIGIN.y + offset.y };
};

const liftOf = (progress: number, index: number) =>
  easeInOut(span(progress, 0.08 + index * 0.14, 0.62 + index * 0.14));

function guidesFor(lift: number) {
  const bottom = lift * LIFT;
  if (bottom < 1) return "M0 0";
  return CORNERS.map(([x, y]) => {
    const top = at(x, y, bottom);
    const foot = at(x, y, 0);
    return `M${top.x.toFixed(2)} ${top.y.toFixed(2)}V${foot.y.toFixed(2)}`;
  }).join("");
}

const leaderAnchor = (lift: number) => at(HALF * 0.62, -HALF * 0.1, lift * LIFT + THICK);

function leaderFor(lift: number) {
  const anchor = leaderAnchor(lift);
  return `M${anchor.x.toFixed(2)} ${anchor.y.toFixed(2)}L${BALLOON.x - 50} ${BALLOON.y}H${BALLOON.x}`;
}

const styles = stylex.create({
  list: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.desktop]: "repeat(3, minmax(0, 1fr))" },
    columnGap: 24,
    rowGap: { default: 56, [bp.tablet]: 48 },
    margin: 0,
    marginTop: { default: 32, [bp.tablet]: 48, [bp.desktop]: 64 },
    padding: 0,
    listStyleType: "none",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  component: {
    display: { default: "block", [bp.tablet]: "grid" },
    gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
    columnGap: 32,
    alignItems: "center",
  },
  footprint: {
    position: "absolute",
    inset: 0,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(11, 42, 92, 0.42)",
  },
  balloon: {
    position: "absolute",
    marginTop: { default: -12, [bp.tabletUp]: -14 },
    marginLeft: { default: -12, [bp.tabletUp]: -14 },
  },
  spec: {
    marginTop: { default: 8, [bp.tablet]: 0, [bp.desktop]: 16 },
    borderTopWidth: 1.5,
    borderTopStyle: "solid",
    borderTopColor: tone.navy,
  },
  specHead: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingTop: 12,
  },
  name: {
    margin: 0,
    marginTop: 14,
    fontFamily: face.sans,
    fontSize: { default: 26, [bp.desktop]: 32 },
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: tone.navy,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "48px minmax(0, 1fr)",
    columnGap: 12,
    margin: 0,
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.rule,
  },
  rowLabel: {
    paddingTop: 4,
  },
  desc: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: 15,
    lineHeight: 1.85,
    color: tone.body,
    textWrap: "pretty",
  },
});

const STROKE = {
  fill: "none",
  stroke: "rgba(11, 42, 92, 0.88)",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
} as const;

function Component({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const value = ABOUT_CULTURE.values[index];
  const topZ = useTransform(progress, (p) => cq(THICK + liftOf(p, index) * LIFT));
  const guides = useTransform(progress, (p) => guidesFor(liftOf(p, index)));
  const leader = useTransform(progress, (p) => leaderFor(liftOf(p, index)));
  const dotX = useTransform(progress, (p) => leaderAnchor(liftOf(p, index)).x);
  const dotY = useTransform(progress, (p) => leaderAnchor(liftOf(p, index)).y);

  return (
    <li {...stylex.props(styles.component)}>
      <Drawing heightUnits={SHEET_HEIGHT} label={`分解图：「${value.glyph}」构件抬离其底座`}>
        <Camera>
          <GroundPlane width={TILE} depth={TILE} centerX={ORIGIN.x} centerY={ORIGIN.y}>
            <span {...stylex.props(styles.footprint)} />
            <GroundShadow x={TILE * 0.06} y={TILE * 0.12} w={TILE * 0.94} d={TILE * 0.94} />
            <IsoBox
              x={0}
              y={0}
              w={TILE}
              d={TILE}
              t={THICK}
              topZ={topZ}
              etch={`C-${pad2(index + 1)} — ${ENGLISH[index]}`}
            >
              <PlateFace glyph={value.glyph} glyphSize={cq(TILE * 0.44)} />
            </IsoBox>
          </GroundPlane>
        </Camera>
        <svg
          viewBox={`0 0 1000 ${SHEET_HEIGHT}`}
          aria-hidden="true"
          {...stylex.props(styles.overlay)}
        >
          <m.path d={guides} {...STROKE} stroke="rgba(11, 42, 92, 0.5)" strokeDasharray="5 4" />
          <m.path d={leader} {...STROKE} />
          <m.circle cx={dotX} cy={dotY} r={6} fill="rgba(11, 42, 92, 0.92)" />
        </svg>
        <span
          style={{ left: cq(BALLOON.x), top: cq(BALLOON.y) }}
          {...stylex.props(ui.balloon, styles.balloon)}
        >
          {index + 1}
        </span>
      </Drawing>
      <div {...stylex.props(styles.spec)}>
        <p {...stylex.props(ui.caps, styles.specHead)}>
          <span lang="en">Component C-{pad2(index + 1)}</span>
          <span lang="en" {...stylex.props(ui.label)}>
            {ENGLISH[index]}
          </span>
        </p>
        <h3 {...stylex.props(styles.name)}>{value.title}</h3>
        <p {...stylex.props(styles.row)}>
          <span lang="en" {...stylex.props(ui.caps, styles.rowLabel)}>
            Spec.
          </span>
          <span {...stylex.props(styles.desc)}>{value.desc}</span>
        </p>
      </div>
    </li>
  );
}

export function Culture() {
  const listRef = useRef<HTMLOListElement>(null);
  const progress = useViewAssembly(listRef, 2.2);

  return (
    <section
      id="about-culture"
      aria-labelledby="oos1m-culture"
      {...stylex.props(ui.shell, ui.section, ui.anchor)}
    >
      <SheetHeader
        sheet={3}
        title={ABOUT_CULTURE.title}
        english="Components, exploded"
        titleId="oos1m-culture"
      />
      <ol ref={listRef} {...stylex.props(styles.list)}>
        {ABOUT_CULTURE.values.map((value, index) => (
          <Component key={value.glyph} progress={progress} index={index} />
        ))}
      </ol>
    </section>
  );
}
