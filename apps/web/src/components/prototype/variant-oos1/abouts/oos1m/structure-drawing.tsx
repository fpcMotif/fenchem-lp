import * as stylex from "@stylexjs/stylex";
import { m, useTransform, type MotionValue } from "motion/react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { Camera, Drawing, GroundPlane, GroundShadow, IsoBox } from "./iso";
import { cq, easeInOut, lerp, projectIso, span } from "./iso-values";
import { pad2, ui } from "./shared";
import { bp, face } from "./tokens.stylex";

const BLOCK = 140;
const DEPTH = 250;
const LENGTH = BLOCK * 5;
const BLOCK_T = 80;
const SLAB_T = 34;
const SLAB_LIFT = 170;
const SPREAD = 26;
const ORIGIN = { x: 500, y: 444 } as const;
const BALLOON_ROW_Y = ORIGIN.y + 238;
const HOLDING_BALLOON = { x: 90, y: 200 } as const;
const SHEET_HEIGHT = 720;

const pose = (progress: number) => ({
  spread: 1 - easeInOut(span(progress, 0.08, 0.5)),
  slabTop: lerp(
    BLOCK_T + SLAB_T + SLAB_LIFT,
    BLOCK_T + SLAB_T,
    easeInOut(span(progress, 0.32, 0.9)),
  ),
});

const blockX = (index: number, spread: number) => index * BLOCK + (index - 2) * SPREAD * spread;

const at = (x: number, y: number, z: number) => {
  const offset = projectIso(x - LENGTH / 2, y - DEPTH / 2, z);
  return { x: ORIGIN.x + offset.x, y: ORIGIN.y + offset.y };
};

const fmt = (value: number) => value.toFixed(2);

function blockLeader(index: number, spread: number) {
  const face = at(blockX(index, spread) + BLOCK / 2, DEPTH, BLOCK_T / 2);
  return { x: face.x, d: `M${fmt(face.x)} ${fmt(face.y)}V${BALLOON_ROW_Y}` };
}

function holdingLeader(slabTop: number) {
  const point = at(LENGTH * 0.12, DEPTH * 0.5, slabTop);
  return `M${fmt(point.x)} ${fmt(point.y)}L${HOLDING_BALLOON.x + 44} ${HOLDING_BALLOON.y}H${HOLDING_BALLOON.x}`;
}

const styles = stylex.create({
  overlay: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  balloon: {
    position: "absolute",
    top: 0,
    marginTop: { default: -12, [bp.tabletUp]: -14 },
    marginLeft: { default: -12, [bp.tabletUp]: -14 },
  },
  recess: {
    position: "absolute",
    inset: "1.8cqw",
    display: "grid",
    placeItems: "center",
    boxShadow: "inset 0 0 0 1px rgba(11, 42, 92, 0.2)",
  },
  engraving: {
    fontFamily: face.latin,
    fontSize: "3cqw",
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    color: "rgba(11, 42, 92, 0.86)",
  },
  blockTrack: {
    position: "absolute",
    top: 0,
    left: 0,
    transformStyle: "preserve-3d",
  },
  blockRecess: {
    position: "absolute",
    inset: "1.6cqw",
    boxShadow: "inset 0 0 0 1px rgba(11, 42, 92, 0.18)",
  },
});

const STROKE = {
  fill: "none",
  stroke: "rgba(11, 42, 92, 0.88)",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
} as const;

function Block({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const left = useTransform(progress, (value) => cq(blockX(index, pose(value).spread)));
  return (
    <m.div
      style={{ x: left, width: cq(BLOCK), height: cq(DEPTH) }}
      {...stylex.props(styles.blockTrack)}
    >
      <IsoBox x={0} y={0} w={BLOCK} d={DEPTH} t={BLOCK_T} topZ={cq(BLOCK_T)} etch={pad2(index + 2)}>
        <span {...stylex.props(styles.blockRecess)} />
      </IsoBox>
    </m.div>
  );
}

function BlockCallout({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const d = useTransform(progress, (value) => blockLeader(index, pose(value).spread).d);
  const left = useTransform(progress, (value) => cq(blockLeader(index, pose(value).spread).x));
  return (
    <>
      <svg
        viewBox={`0 0 1000 ${SHEET_HEIGHT}`}
        aria-hidden="true"
        {...stylex.props(styles.overlay)}
      >
        <m.path d={d} {...STROKE} />
      </svg>
      <m.span style={{ left, y: cq(BALLOON_ROW_Y) }} {...stylex.props(ui.balloon, styles.balloon)}>
        {index + 2}
      </m.span>
    </>
  );
}

export function StructureDrawing({ progress }: { progress: MotionValue<number> }) {
  const slabTop = useTransform(progress, (value) => cq(pose(value).slabTop));
  const holding = useTransform(progress, (value) => holdingLeader(pose(value).slabTop));

  return (
    <Drawing
      heightUnits={SHEET_HEIGHT}
      label="总装图：控股公司为顶板，五家全资子公司为其下方的五个模块，完全贴合。"
    >
      <Camera>
        <GroundPlane width={LENGTH} depth={DEPTH} centerX={ORIGIN.x} centerY={ORIGIN.y}>
          <GroundShadow x={10} y={DEPTH * 0.14} w={LENGTH} d={DEPTH} />
          {ABOUT_STRUCTURE.subsidiaries.map((subsidiary, index) => (
            <Block key={subsidiary.id} progress={progress} index={index} />
          ))}
          <IsoBox x={0} y={0} w={LENGTH} d={DEPTH} t={SLAB_T} topZ={slabTop} etch="01 — Holding">
            <span {...stylex.props(styles.recess)}>
              <span {...stylex.props(styles.engraving)}>Fenchem Holdings</span>
            </span>
          </IsoBox>
        </GroundPlane>
      </Camera>
      <svg
        viewBox={`0 0 1000 ${SHEET_HEIGHT}`}
        aria-hidden="true"
        {...stylex.props(styles.overlay)}
      >
        <m.path d={holding} {...STROKE} />
      </svg>
      <span
        style={{ left: cq(HOLDING_BALLOON.x), top: cq(HOLDING_BALLOON.y) }}
        {...stylex.props(ui.balloon, styles.balloon)}
      >
        1
      </span>
      {ABOUT_STRUCTURE.subsidiaries.map((subsidiary, index) => (
        <BlockCallout key={subsidiary.id} progress={progress} index={index} />
      ))}
    </Drawing>
  );
}
