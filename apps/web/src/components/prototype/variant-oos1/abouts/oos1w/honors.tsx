import * as stylex from "@stylexjs/stylex";
import { useRef } from "react";

import { ABOUT_HONORS } from "../../about-data";
import { PinnedSection } from "./pinned-section";
import { Plate, type PlateBand, type PlateGeometry } from "./plate";
import { Rf, SectionHead, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";
import { useDevelopment } from "./use-development";

const LANES = [
  { level: "municipal", code: "M", label: "南京市级", tone: "navy", top: 0.32 },
  { level: "provincial", code: "P", label: "江苏省级", tone: "mid", top: 0.76 },
  { level: "national", code: "N", label: "国家级", tone: "blue", top: 1.1 },
] as const;

const RF_STEP = 0.1;

const BANDS: readonly PlateBand[] = LANES.flatMap((lane, laneIndex) =>
  ABOUT_HONORS.items
    .filter((item) => item.level === lane.level)
    .map((item, order) => ({
      id: item.id,
      lane: laneIndex,
      rf: Number((lane.top - order * RF_STEP).toFixed(2)),
      tone: lane.tone,
      revealAt: lane.level === "national" ? 0.08 : 0.46 + order * 0.03,
      ahead: lane.level === "national",
    })),
).sort((a, b) => b.rf - a.rf);

const titleOf = (band: PlateBand) =>
  ABOUT_HONORS.items.find((item) => item.id === band.id)?.title ?? "";

const geometry = stylex.create({
  figure: {
    height: { default: 640, [bp.tablet]: 680, [bp.desktop]: "max(480px, calc(100svh - 176px))" },
  },
  plate: {
    width: { default: 108, [bp.tablet]: 240, [bp.desktop]: 228, [bp.wide]: 300 },
  },
  run: {
    top: { default: 88, [bp.tablet]: 88, [bp.desktop]: 96 },
    bottom: { default: 72, [bp.desktop]: 88 },
  },
  band: {
    width: { default: 28, [bp.tablet]: 56, [bp.desktop]: 52, [bp.wide]: 66 },
    height: { default: 11, [bp.tablet]: 17, [bp.desktop]: 16, [bp.wide]: 20 },
    marginLeft: { default: -14, [bp.tablet]: -28, [bp.desktop]: -26, [bp.wide]: -33 },
    marginTop: { default: -5.5, [bp.tablet]: -8.5, [bp.desktop]: -8, [bp.wide]: -10 },
  },
  tail: {
    width: { default: 12, [bp.tablet]: 24, [bp.desktop]: 22, [bp.wide]: 28 },
    marginLeft: { default: -6, [bp.tablet]: -12, [bp.desktop]: -11, [bp.wide]: -14 },
  },
  afterPlate: {
    left: { default: 112, [bp.tablet]: 246, [bp.desktop]: 234, [bp.wide]: 306 },
  },
  label: {
    left: { default: 124, [bp.tablet]: 280, [bp.desktop]: 284, [bp.wide]: 372 },
    transform: "translateY(-50%)",
  },
  leader: {
    left: { default: 112, [bp.tablet]: 246, [bp.desktop]: 234, [bp.wide]: 306 },
    width: { default: 8, [bp.tablet]: 28, [bp.desktop]: 42, [bp.wide]: 58 },
  },
});

const GEOMETRY: PlateGeometry = {
  figure: geometry.figure,
  plate: geometry.plate,
  run: geometry.run,
  band: geometry.band,
  tail: geometry.tail,
  afterPlate: geometry.afterPlate,
  label: geometry.label,
  leader: geometry.leader,
};

const styles = stylex.create({
  key: {
    display: "grid",
    gridTemplateColumns: "auto auto 1fr",
    columnGap: 12,
    rowGap: 8,
    alignItems: "baseline",
    margin: 0,
    marginTop: { default: 28, [bp.desktop]: "auto" },
    marginBottom: { default: 0, [bp.desktop]: 76 },
  },
  keyRow: {
    display: "contents",
  },
  code: {
    fontFamily: face.latin,
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  keyLevel: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: 16,
    color: tone.ink,
  },
  keyCount: {
    margin: 0,
  },
  label: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: { default: 8, [bp.tablet]: 12, [bp.desktop]: 14 },
    rowGap: 2,
    paddingInlineEnd: { default: 0, [bp.tablet]: 8, [bp.desktop]: 8 },
  },
  rfSlot: {
    flexShrink: 0,
    width: { default: 42, [bp.tablet]: 48, [bp.desktop]: 52 },
  },
  title: {
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.tablet]: 17, [bp.desktop]: 18, [bp.wide]: 19 },
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: { default: 0, [bp.tablet]: "0.03em", [bp.desktop]: "0.03em" },
    color: tone.ink,
  },
  titleAhead: {
    fontWeight: 500,
    color: tone.blue,
  },
  note: {
    flexBasis: { default: "100%", [bp.tablet]: "auto", [bp.desktop]: "auto" },
    paddingInlineStart: { default: 50, [bp.tablet]: 0, [bp.desktop]: 0 },
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 15, [bp.desktop]: 18 },
    lineHeight: 1.2,
    color: tone.blue,
  },
  lane: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  laneLevel: {
    display: { default: "none", [bp.tablet]: "block", [bp.desktop]: "block" },
    fontFamily: face.sans,
    fontSize: 13,
    lineHeight: 1.2,
    color: tone.body,
  },
});

function LevelKey() {
  return (
    <dl {...stylex.props(styles.key)}>
      {[...LANES].reverse().map((lane) => (
        <div key={lane.level} {...stylex.props(styles.keyRow)}>
          <dt {...stylex.props(styles.code)}>{lane.code}</dt>
          <dd {...stylex.props(styles.keyLevel)}>{lane.label}</dd>
          <dd {...stylex.props(ui.micro, styles.keyCount)}>
            {ABOUT_HONORS.items.filter((item) => item.level === lane.level).length}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Honors() {
  const sectionRef = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const development = useDevelopment({ section: sectionRef, figure: figureRef, pinnable: true });

  return (
    <PinnedSection
      id="about-honor"
      titleId="oos1w-honor"
      sectionRef={sectionRef}
      head={
        <>
          <SectionHead
            num="05"
            word="Recognition"
            title={ABOUT_HONORS.title}
            titleId="oos1w-honor"
            fig="Fig. 5"
            legend="Eight honours, spotted on three lanes by level. Developed, they sort themselves."
          />
          <LevelKey />
        </>
      }
    >
      <div ref={figureRef}>
        <Plate
          lanes={LANES.length}
          bands={BANDS}
          development={development}
          geometry={GEOMETRY}
          listLabel={ABOUT_HONORS.title}
          laneLabels={LANES.map((lane) => (
            <span key={lane.level} aria-hidden="true" {...stylex.props(styles.lane)}>
              <span {...stylex.props(styles.code)}>{lane.code}</span>
              <span {...stylex.props(styles.laneLevel)}>{lane.label}</span>
            </span>
          ))}
          renderLabel={(band) => (
            <p {...stylex.props(ui.micro, styles.label)}>
              <span {...stylex.props(styles.rfSlot)}>
                <Rf value={band.rf} ahead={band.ahead} />
              </span>
              <span {...stylex.props(styles.title, band.ahead && styles.titleAhead)}>
                {titleOf(band)}
              </span>
              {band.ahead ? (
                <span lang="en" aria-hidden="true" {...stylex.props(styles.note)}>
                  past the front
                </span>
              ) : null}
            </p>
          )}
        />
      </div>
    </PinnedSection>
  );
}
