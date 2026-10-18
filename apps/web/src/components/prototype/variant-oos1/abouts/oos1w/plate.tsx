import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";
import { Show } from "solid-js";
import type { StyleXStyles } from "@stylexjs/stylex";
import { m, useTransform, type MotionValue } from "@/compat/motion";

import { PencilRing } from "./band";
import { BAND_LOOK } from "./band-values";
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
  nativeList: { listStyleType: "none", padding: 0, margin: 0 },
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

function Front(props: { development: Development }) {
  const y = useTransform(props.development.progress, (p) => percent(1 - p));
  const wetLine = useTransform(props.development.marks, (mark) => 1 - mark);
  return (
    <m.div style={{ y }} {...stylex.attrs(styles.mover)}>
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" {...stylex.attrs(styles.curve)}>
        <path d="M0 1.5 C 20 7, 80 7, 100 1.5 L 100 10 L 0 10 Z" fill="rgba(7, 67, 169, 0.06)" />
        <m.path
          d="M0 1.5 C 20 7, 80 7, 100 1.5"
          fill="none"
          stroke="rgba(7, 67, 169, 0.55)"
          stroke-width={1}
          vector-effect="non-scaling-stroke"
          style={{ opacity: wetLine }}
        />
      </svg>
      <span {...stylex.attrs(styles.meniscus)} />
      <span {...stylex.attrs(styles.wetBody)} />
    </m.div>
  );
}

function BandMark(props: {
  band: PlateBand;
  lanes: number;
  development: Development;
  geometry: Pick<PlateGeometry, "band" | "tail">;
  glyph?: JSX.Element;
}) {
  const { travel, y, reveal } = useBandMotion(props.band, props.development);
  const spread = useTransform(travel, (t) => Math.sqrt(Math.min(1.1, t)));
  const scaleX = useTransform(spread, (s) => 0.46 + 0.54 * s);
  const scaleY = useTransform(spread, (s) => 0.8 + 0.2 * s);
  const density = useTransform(spread, (s) => 1 - 0.16 * s);
  const left = laneCenter(props.band.lane, props.lanes);
  const look = BAND_LOOK[props.band.ahead ? "ahead" : props.band.tone];

  return (
    <m.div aria-hidden="true" style={{ y }} {...stylex.attrs(styles.mover)}>
      <m.span
        style={{ left, scaleY: travel }}
        {...stylex.attrs(styles.tail, props.geometry.tail, look.tail)}
      />
      <m.span
        style={{ left, scaleX, scaleY, opacity: density }}
        {...stylex.attrs(BAND_LOOK.base, props.geometry.band, look.body)}
      >
        <PencilRing visible={props.development.marks} ahead={props.band.ahead} />
      </m.span>
      <Show when={props.glyph}>
        {(glyph) => (
          <m.span style={{ left, opacity: reveal }} {...stylex.attrs(BAND_LOOK.glyphSlot)}>
            {glyph()}
          </m.span>
        )}
      </Show>
    </m.div>
  );
}

function BandNote(props: {
  band: PlateBand;
  development: Development;
  geometry: PlateGeometry;
  children: JSX.Element;
}) {
  const { y, reveal } = useBandMotion(props.band, props.development);
  return (
    <m.li style={{ y }} {...stylex.attrs(styles.mover)}>
      <m.div style={{ opacity: reveal }}>
        <span aria-hidden="true" {...stylex.attrs(styles.leader, props.geometry.leader)} />
        <div {...stylex.attrs(styles.annotation, props.geometry.label)}>{props.children}</div>
      </m.div>
    </m.li>
  );
}

function FrontExtension(props: { progress: MotionValue<number>; geometry: PlateGeometry }) {
  const y = useTransform(props.progress, (p) => percent(1 - p));
  const named = useTransform(props.progress, [0.04, 0.14], [0, 1]);
  return (
    <m.div aria-hidden="true" style={{ y }} {...stylex.attrs(styles.mover)}>
      <span {...stylex.attrs(styles.dashed, styles.dashedFront, props.geometry.afterPlate)} />
      <m.span
        lang="en"
        style={{ opacity: named }}
        {...stylex.attrs(styles.axisWord, styles.axisFront)}
      >
        solvent front
      </m.span>
    </m.div>
  );
}

function PlateBody(props: {
  lanes: number;
  development: Development;
  run: StyleXStyles;
  sx?: StyleXStyles;
  children: JSX.Element;
}) {
  const dryPlate = useTransform(props.development.marks, (mark) => 1 - 0.5 * mark);
  return (
    <div {...stylex.attrs(styles.plate, props.sx)}>
      <div aria-hidden="true" {...stylex.attrs(styles.surface)}>
        <m.div style={{ opacity: dryPlate }} {...stylex.attrs(styles.fill)}>
          <div {...stylex.attrs(styles.run, props.run)}>
            <span {...stylex.attrs(styles.foot)} />
            <div {...stylex.attrs(styles.clip)}>
              <Front development={props.development} />
            </div>
          </div>
        </m.div>
      </div>

      <div {...stylex.attrs(styles.run, props.run)}>
        <span aria-hidden="true" {...stylex.attrs(styles.origin)} />
        {Array.from({ length: props.lanes }, (_, lane) => (
          <span
            aria-hidden="true"
            style={{ left: laneCenter(lane, props.lanes) }}
            {...stylex.attrs(styles.tick)}
          />
        ))}
        <m.span
          aria-hidden="true"
          style={{ opacity: props.development.marks }}
          {...stylex.attrs(styles.pencilFront)}
        />
        {props.children}
      </div>
    </div>
  );
}

export function Plate(props: {
  lanes: number;
  bands: readonly PlateBand[];
  development: Development;
  geometry: PlateGeometry;
  renderLabel: (band: PlateBand) => JSX.Element;
  renderGlyph?: (band: PlateBand) => JSX.Element;
  laneLabels?: readonly JSX.Element[];
  plateOverlay?: JSX.Element;
  noteOverlay?: JSX.Element;
  listLabel: string;
  sx?: StyleXStyles;
}) {
  return (
    <div {...stylex.attrs(styles.figure, props.geometry.figure, props.sx)}>
      <PlateBody
        lanes={props.lanes}
        development={props.development}
        run={props.geometry.run}
        sx={props.geometry.plate}
      >
        {props.plateOverlay}
        {props.bands.map((band) => (
          <BandMark
            band={band}
            lanes={props.lanes}
            development={props.development}
            geometry={props.geometry}
            glyph={props.renderGlyph?.(band)}
          />
        ))}
        {props.laneLabels?.map((label, lane) => (
          <div style={{ left: laneCenter(lane, props.lanes) }} {...stylex.attrs(styles.laneLabel)}>
            {label}
          </div>
        ))}
      </PlateBody>

      <div {...stylex.attrs(styles.run, styles.inert, props.geometry.run)}>
        <FrontExtension progress={props.development.progress} geometry={props.geometry} />
        <span
          aria-hidden="true"
          {...stylex.attrs(styles.dashed, styles.dashedOrigin, props.geometry.afterPlate)}
        />
        <span lang="en" aria-hidden="true" {...stylex.attrs(styles.axisWord, styles.axisOrigin)}>
          origin
        </span>
        {props.noteOverlay}
        <ul {...stylex.attrs(styles.nativeList)} aria-label={props.listLabel}>
          {props.bands.map((band) => (
            <BandNote band={band} development={props.development} geometry={props.geometry}>
              {props.renderLabel(band)}
            </BandNote>
          ))}
        </ul>
      </div>
    </div>
  );
}
