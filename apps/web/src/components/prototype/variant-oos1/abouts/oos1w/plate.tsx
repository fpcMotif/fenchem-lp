import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { m, useTransform, type MotionValue } from "motion/react";
import type { ReactNode } from "react";

import { BAND_LOOK, PencilRing } from "./band";
import { face, tone } from "./tokens.stylex";
import type { Development } from "./use-development";

export type BandTone = "navy" | "mid" | "blue";

export type PlateBand = {
  id: string;
  lane: number;
  rf: number;
  tone: BandTone;
  revealAt: number;
  ahead?: boolean;
};

export type PlateGeometry = {
  figure: StyleXStyles;
  plate: StyleXStyles;
  run: StyleXStyles;
  band: StyleXStyles;
  tail: StyleXStyles;
  afterPlate: StyleXStyles;
  label: StyleXStyles;
  leader: StyleXStyles;
};

const styles = stylex.create({
  figure: {
    position: "relative",
    overflow: "hidden",
  },
  plate: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  },
  surface: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    backgroundColor: tone.plate,
    boxShadow: "inset 0 0 0 1px rgba(11, 42, 92, 0.14)",
    borderRadius: 2,
  },
  clip: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
  },
  run: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  inert: {
    pointerEvents: "none",
  },
  fill: {
    position: "absolute",
    inset: 0,
  },
  foot: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: tone.wet,
  },
  wetBody: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: tone.wet,
  },
  meniscus: {
    position: "absolute",
    top: 6,
    left: 0,
    right: 0,
    height: 40,
    backgroundImage: "linear-gradient(180deg, rgba(7, 67, 169, 0.1) 0%, rgba(7, 67, 169, 0) 100%)",
  },
  curve: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: 10,
    overflow: "visible",
  },
  origin: {
    position: "absolute",
    bottom: 0,
    left: 10,
    right: 10,
    height: 1,
    backgroundColor: tone.pencil,
  },
  tick: {
    position: "absolute",
    bottom: -4,
    width: 1,
    height: 9,
    marginLeft: -0.5,
    backgroundColor: tone.pencil,
  },
  pencilFront: {
    position: "absolute",
    top: 3,
    left: -5,
    right: -5,
    height: 1,
    backgroundColor: tone.graphite,
  },
  mover: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  tail: {
    position: "absolute",
    top: 0,
    height: "100%",
    transformOrigin: "50% 0%",
  },
  annotation: {
    position: "absolute",
    top: 0,
    right: 0,
    pointerEvents: "auto",
  },
  leader: {
    position: "absolute",
    top: 0,
    height: 1,
    backgroundColor: tone.pencil,
  },
  dashed: {
    position: "absolute",
    right: 0,
    height: 1,
    backgroundImage: "linear-gradient(90deg, rgba(26, 26, 26, 0.36) 50%, rgba(26, 26, 26, 0) 50%)",
    backgroundSize: "6px 1px",
  },
  dashedFront: {
    top: 3,
  },
  dashedOrigin: {
    bottom: 0,
  },
  axisWord: {
    position: "absolute",
    right: 0,
    margin: 0,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 16,
    lineHeight: 1,
    color: tone.body,
    whiteSpace: "nowrap",
  },
  axisFront: {
    top: 12,
  },
  axisOrigin: {
    top: "calc(100% + 10px)",
  },
  laneLabel: {
    position: "absolute",
    top: "calc(100% + 14px)",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
  },
});

const percent = (value: number) => `${(value * 100).toFixed(3)}%`;
const laneCenter = (lane: number, lanes: number) => percent((lane + 0.5) / lanes);

function useBandMotion(band: PlateBand, development: Development) {
  const travel = useTransform(development.progress, (p) => p * band.rf);
  const y = useTransform(travel, (t) => percent(1 - t));
  const reveal = useTransform(development.progress, [band.revealAt, band.revealAt + 0.14], [0, 1]);
  return { travel, y, reveal };
}

function Front({ development }: { development: Development }) {
  const y = useTransform(development.progress, (p) => percent(1 - p));
  const wetLine = useTransform(development.marks, (mark) => 1 - mark);
  return (
    <m.div style={{ y }} {...stylex.props(styles.mover)}>
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" {...stylex.props(styles.curve)}>
        <path d="M0 1.5 C 20 7, 80 7, 100 1.5 L 100 10 L 0 10 Z" fill="rgba(7, 67, 169, 0.06)" />
        <m.path
          d="M0 1.5 C 20 7, 80 7, 100 1.5"
          fill="none"
          stroke="rgba(7, 67, 169, 0.55)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          style={{ opacity: wetLine }}
        />
      </svg>
      <span {...stylex.props(styles.meniscus)} />
      <span {...stylex.props(styles.wetBody)} />
    </m.div>
  );
}

function BandMark({
  band,
  lanes,
  development,
  geometry,
  glyph,
}: {
  band: PlateBand;
  lanes: number;
  development: Development;
  geometry: Pick<PlateGeometry, "band" | "tail">;
  glyph?: ReactNode;
}) {
  const { travel, y, reveal } = useBandMotion(band, development);
  const spread = useTransform(travel, (t) => Math.sqrt(Math.min(1.1, t)));
  const scaleX = useTransform(spread, (s) => 0.46 + 0.54 * s);
  const scaleY = useTransform(spread, (s) => 0.8 + 0.2 * s);
  const density = useTransform(spread, (s) => 1 - 0.16 * s);
  const left = laneCenter(band.lane, lanes);
  const look = BAND_LOOK[band.ahead ? "ahead" : band.tone];

  return (
    <m.div aria-hidden="true" style={{ y }} {...stylex.props(styles.mover)}>
      <m.span
        style={{ left, scaleY: travel }}
        {...stylex.props(styles.tail, geometry.tail, look.tail)}
      />
      <m.span
        style={{ left, scaleX, scaleY, opacity: density }}
        {...stylex.props(BAND_LOOK.base, geometry.band, look.body)}
      >
        <PencilRing visible={development.marks} ahead={band.ahead} />
      </m.span>
      {glyph ? (
        <m.span style={{ left, opacity: reveal }} {...stylex.props(BAND_LOOK.glyphSlot)}>
          {glyph}
        </m.span>
      ) : null}
    </m.div>
  );
}

function BandNote({
  band,
  development,
  geometry,
  children,
}: {
  band: PlateBand;
  development: Development;
  geometry: PlateGeometry;
  children: ReactNode;
}) {
  const { y, reveal } = useBandMotion(band, development);
  return (
    <m.div role="listitem" style={{ y }} {...stylex.props(styles.mover)}>
      <m.div style={{ opacity: reveal }}>
        <span aria-hidden="true" {...stylex.props(styles.leader, geometry.leader)} />
        <div {...stylex.props(styles.annotation, geometry.label)}>{children}</div>
      </m.div>
    </m.div>
  );
}

function FrontExtension({
  progress,
  geometry,
}: {
  progress: MotionValue<number>;
  geometry: PlateGeometry;
}) {
  const y = useTransform(progress, (p) => percent(1 - p));
  const named = useTransform(progress, [0.04, 0.14], [0, 1]);
  return (
    <m.div aria-hidden="true" style={{ y }} {...stylex.props(styles.mover)}>
      <span {...stylex.props(styles.dashed, styles.dashedFront, geometry.afterPlate)} />
      <m.span
        lang="en"
        style={{ opacity: named }}
        {...stylex.props(styles.axisWord, styles.axisFront)}
      >
        solvent front
      </m.span>
    </m.div>
  );
}

function PlateBody({
  lanes,
  development,
  run,
  sx,
  children,
}: {
  lanes: number;
  development: Development;
  run: StyleXStyles;
  sx?: StyleXStyles;
  children: ReactNode;
}) {
  const dryPlate = useTransform(development.marks, (mark) => 1 - 0.5 * mark);
  return (
    <div {...stylex.props(styles.plate, sx)}>
      <div aria-hidden="true" {...stylex.props(styles.surface)}>
        <m.div style={{ opacity: dryPlate }} {...stylex.props(styles.fill)}>
          <div {...stylex.props(styles.run, run)}>
            <span {...stylex.props(styles.foot)} />
            <div {...stylex.props(styles.clip)}>
              <Front development={development} />
            </div>
          </div>
        </m.div>
      </div>

      <div {...stylex.props(styles.run, run)}>
        <span aria-hidden="true" {...stylex.props(styles.origin)} />
        {Array.from({ length: lanes }, (_, lane) => (
          <span
            key={lane}
            aria-hidden="true"
            style={{ left: laneCenter(lane, lanes) }}
            {...stylex.props(styles.tick)}
          />
        ))}
        <m.span
          aria-hidden="true"
          style={{ opacity: development.marks }}
          {...stylex.props(styles.pencilFront)}
        />
        {children}
      </div>
    </div>
  );
}

export function Plate({
  lanes,
  bands,
  development,
  geometry,
  renderLabel,
  renderGlyph,
  laneLabels,
  plateOverlay,
  noteOverlay,
  listLabel,
  sx,
}: {
  lanes: number;
  bands: readonly PlateBand[];
  development: Development;
  geometry: PlateGeometry;
  renderLabel: (band: PlateBand) => ReactNode;
  renderGlyph?: (band: PlateBand) => ReactNode;
  laneLabels?: readonly ReactNode[];
  plateOverlay?: ReactNode;
  noteOverlay?: ReactNode;
  listLabel: string;
  sx?: StyleXStyles;
}) {
  return (
    <div {...stylex.props(styles.figure, geometry.figure, sx)}>
      <PlateBody lanes={lanes} development={development} run={geometry.run} sx={geometry.plate}>
        {plateOverlay}
        {bands.map((band) => (
          <BandMark
            key={band.id}
            band={band}
            lanes={lanes}
            development={development}
            geometry={geometry}
            glyph={renderGlyph?.(band)}
          />
        ))}
        {laneLabels?.map((label, lane) => (
          <div
            key={lane}
            style={{ left: laneCenter(lane, lanes) }}
            {...stylex.props(styles.laneLabel)}
          >
            {label}
          </div>
        ))}
      </PlateBody>

      <div {...stylex.props(styles.run, styles.inert, geometry.run)}>
        <FrontExtension progress={development.progress} geometry={geometry} />
        <span
          aria-hidden="true"
          {...stylex.props(styles.dashed, styles.dashedOrigin, geometry.afterPlate)}
        />
        <span lang="en" aria-hidden="true" {...stylex.props(styles.axisWord, styles.axisOrigin)}>
          origin
        </span>
        {noteOverlay}
        <div role="list" aria-label={listLabel}>
          {bands.map((band) => (
            <BandNote key={band.id} band={band} development={development} geometry={geometry}>
              {renderLabel(band)}
            </BandNote>
          ))}
        </div>
      </div>
    </div>
  );
}
