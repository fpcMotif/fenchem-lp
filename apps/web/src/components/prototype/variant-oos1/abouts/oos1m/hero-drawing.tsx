import * as stylex from "@stylexjs/stylex";
import { m, useTransform, type MotionValue } from "motion/react";

import {
  guideArrowOpacity,
  guideArrows,
  guidePath,
  HERO_PARTS,
  HERO_SHEET,
  heroPose,
  labelY,
  leaderAnchor,
  leaderPath,
  liftDimension,
  type HeroPartId,
} from "./hero-geometry";
import { Camera, Drawing, GroundPlane, GroundShadow, IsoBox } from "./iso";
import { cq } from "./iso-values";
import { FlagNote } from "./marks";
import { PlateFace } from "./plate-face";
import { ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const PLATE = HERO_SHEET.plate;
const STACK_ORDER: readonly HeroPartId[] = ["sell", "make", "rd"];

const styles = stylex.create({
  overlay: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
  },
  label: {
    position: "absolute",
    top: 0,
    display: "flex",
    alignItems: "center",
    gap: { default: 6, [bp.tabletUp]: 10 },
    marginTop: { default: -12, [bp.tabletUp]: -14 },
    marginLeft: { default: -12, [bp.tabletUp]: -14 },
    whiteSpace: "nowrap",
  },
  labelName: {
    fontFamily: face.sans,
    fontSize: { default: 14, [bp.tabletUp]: 17 },
    fontWeight: 500,
    lineHeight: 1.2,
    color: tone.ink,
  },
  labelEnglish: {
    display: { default: "none", [bp.wide]: "inline" },
    marginInlineStart: 8,
  },
  delta: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: { default: "column", [bp.tabletUp]: "row" },
    alignItems: "center",
    gap: { default: 2, [bp.tabletUp]: 6 },
    transform: "translate(-100%, -50%)",
    whiteSpace: "nowrap",
  },
  deltaGlyph: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 18, [bp.tabletUp]: 24 },
    lineHeight: 1,
    color: tone.navy,
  },
  figure: {
    position: "absolute",
    left: { default: 20, [bp.tabletUp]: 0 },
    bottom: 0,
    display: "flex",
    alignItems: "baseline",
    gap: 10,
  },
  figureState: {
    position: "relative",
    display: "inline-grid",
  },
  figureWord: {
    gridArea: "1 / 1",
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 16, [bp.tabletUp]: 19 },
    lineHeight: 1,
    color: tone.navy,
  },
});

const STROKE = {
  fill: "none",
  stroke: "rgba(11, 42, 92, 0.88)",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
} as const;

type Hover = {
  active: HeroPartId | null;
  onActive: (id: HeroPartId | null) => void;
};

function PlateLabel({
  progress,
  id,
  active,
  onActive,
}: { progress: MotionValue<number>; id: HeroPartId } & Hover) {
  const part = HERO_PARTS.find((entry) => entry.id === id) ?? HERO_PARTS[0];
  const y = useTransform(progress, (value) => cq(labelY(heroPose(value), id)));
  return (
    <m.div
      style={{ left: cq(HERO_SHEET.balloonX), y }}
      onPointerEnter={() => onActive(id)}
      onPointerLeave={() => onActive(null)}
      {...stylex.props(styles.label)}
    >
      <span {...stylex.props(ui.balloon, active === id && ui.balloonActive)}>{part.item}</span>
      <span {...stylex.props(styles.labelName)}>
        {part.name}
        <span lang="en" {...stylex.props(ui.label, styles.labelEnglish)}>
          {part.english}
        </span>
      </span>
    </m.div>
  );
}

function Leader({
  progress,
  id,
  active,
}: {
  progress: MotionValue<number>;
  id: HeroPartId;
  active: boolean;
}) {
  const d = useTransform(progress, (value) => leaderPath(heroPose(value), id));
  const cx = useTransform(progress, (value) => leaderAnchor(heroPose(value), id).x);
  const cy = useTransform(progress, (value) => leaderAnchor(heroPose(value), id).y);
  const color = active ? "#0743a9" : "rgba(11, 42, 92, 0.92)";
  return (
    <>
      <m.path d={d} {...STROKE} stroke={color} strokeWidth={active ? 1.5 : 1} />
      <m.circle cx={cx} cy={cy} r={4.2} fill={color} />
    </>
  );
}

function Guide({
  progress,
  upper,
  lower,
}: {
  progress: MotionValue<number>;
  upper: HeroPartId;
  lower: HeroPartId;
}) {
  const d = useTransform(progress, (value) => guidePath(heroPose(value), upper, lower));
  const arrows = useTransform(progress, (value) => guideArrows(heroPose(value), upper, lower));
  const arrowOpacity = useTransform(progress, (value) =>
    guideArrowOpacity(heroPose(value), upper, lower),
  );
  return (
    <>
      <m.path d={d} {...STROKE} stroke="rgba(11, 42, 92, 0.5)" strokeDasharray="5 4" />
      <m.path d={arrows} {...STROKE} style={{ opacity: arrowOpacity }} />
    </>
  );
}

export function HeroDrawing({
  progress,
  active,
  onActive,
}: { progress: MotionValue<number> } & Hover) {
  const groundY = useTransform(progress, (value) => cq(heroPose(value).groundY));
  const rdTop = useTransform(progress, (value) => cq(heroPose(value).top.rd));
  const makeTop = useTransform(progress, (value) => cq(heroPose(value).top.make));
  const sellTop = useTransform(progress, (value) => cq(heroPose(value).top.sell));
  const dimensionOpacity = useTransform(progress, (value) => heroPose(value).dimension);
  const explodedOpacity = useTransform(progress, (value) => heroPose(value).exploded);
  const assembledOpacity = useTransform(progress, (value) => heroPose(value).assembled);
  const dimension = liftDimension(heroPose(1));
  const tops: Record<HeroPartId, MotionValue<string>> = {
    rd: rdTop,
    make: makeTop,
    sell: sellTop,
  };

  return (
    <Drawing
      heightUnits={HERO_SHEET.heightUnits}
      label="装配图：研、产、销三块板沿竖轴装配为一体，研发板始终微微抬起，未完全落座。"
    >
      <Camera y={groundY}>
        <GroundPlane width={PLATE} depth={PLATE} centerX={HERO_SHEET.originX} centerY={0}>
          <GroundShadow x={PLATE * 0.03} y={PLATE * 0.09} w={PLATE} d={PLATE} />
          {STACK_ORDER.map((id) => {
            const part = HERO_PARTS.find((entry) => entry.id === id) ?? HERO_PARTS[0];
            return (
              <IsoBox
                key={id}
                x={0}
                y={0}
                w={PLATE}
                d={PLATE}
                t={HERO_SHEET.thickness}
                topZ={tops[id]}
                highlighted={active === id}
                etch={`${String(part.item).padStart(2, "0")} — ${part.english}`}
              >
                <PlateFace glyph={part.glyph} glyphSize={cq(PLATE * 0.4)} />
              </IsoBox>
            );
          })}
        </GroundPlane>
      </Camera>

      <svg
        viewBox={`0 0 1000 ${HERO_SHEET.heightUnits}`}
        aria-hidden="true"
        {...stylex.props(styles.overlay)}
      >
        <Guide progress={progress} upper="rd" lower="make" />
        <Guide progress={progress} upper="make" lower="sell" />
        {HERO_PARTS.map((part) => (
          <Leader key={part.id} progress={progress} id={part.id} active={active === part.id} />
        ))}
        <m.g style={{ opacity: dimensionOpacity }}>
          <path d={dimension.ext} {...STROKE} stroke="rgba(11, 42, 92, 0.6)" />
          <path d={dimension.stem} {...STROKE} />
          <path d={dimension.heads} fill="rgba(11, 42, 92, 0.92)" />
        </m.g>
      </svg>

      {HERO_PARTS.map((part) => (
        <PlateLabel
          key={part.id}
          progress={progress}
          id={part.id}
          active={active}
          onActive={onActive}
        />
      ))}

      <m.div
        aria-hidden="true"
        style={{ left: cq(dimension.labelX), top: cq(dimension.labelY), opacity: dimensionOpacity }}
        {...stylex.props(styles.delta)}
      >
        <span {...stylex.props(styles.deltaGlyph)}>δ</span>
        <FlagNote number={1} />
      </m.div>

      <div aria-hidden="true" {...stylex.props(styles.figure)}>
        <span {...stylex.props(ui.caps)}>Fig. 1</span>
        <span {...stylex.props(styles.figureState)}>
          <m.span
            lang="en"
            style={{ opacity: explodedOpacity }}
            {...stylex.props(styles.figureWord)}
          >
            Exploded view
          </m.span>
          <m.span
            lang="en"
            style={{ opacity: assembledOpacity }}
            {...stylex.props(styles.figureWord)}
          >
            Assembly — 研 · 产 · 销
          </m.span>
        </span>
      </div>
    </Drawing>
  );
}
