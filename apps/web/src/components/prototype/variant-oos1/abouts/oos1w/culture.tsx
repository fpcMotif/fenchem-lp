import * as stylex from "@stylexjs/stylex";
import { m, useTransform } from "motion/react";
import { useRef } from "react";

import { ABOUT_CULTURE } from "../../about-data";
import { PinnedSection } from "./pinned-section";
import { Plate, type PlateBand, type PlateGeometry } from "./plate";
import { Rf, SectionHead, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";
import { useDevelopment, type Development } from "./use-development";

const [FOCUS, QUIET, NEW] = ABOUT_CULTURE.values;

const VALUES = [
  { band: { id: "zhuan", lane: 0, rf: 0.8, tone: "navy", revealAt: 0.58 }, value: FOCUS },
  { band: { id: "jing", lane: 0, rf: 0.5, tone: "mid", revealAt: 0.6 }, value: QUIET },
  { band: { id: "xin", lane: 0, rf: 0.2, tone: "blue", revealAt: 0.62 }, value: NEW },
] as const satisfies readonly { band: PlateBand; value: (typeof ABOUT_CULTURE.values)[number] }[];

const BANDS: readonly PlateBand[] = VALUES.map((entry) => entry.band);
const valueOf = (band: PlateBand) =>
  VALUES.find((entry) => entry.band.id === band.id)?.value ?? FOCUS;

const geometry = stylex.create({
  figure: {
    height: { default: 760, [bp.tablet]: 700, [bp.desktop]: "max(480px, calc(100svh - 176px))" },
  },
  plate: {
    width: { default: 92, [bp.tablet]: 200, [bp.desktop]: 220, [bp.wide]: 300 },
  },
  run: {
    top: { default: 52, [bp.desktop]: 64 },
    bottom: { default: 72, [bp.desktop]: 88 },
  },
  band: {
    width: { default: 66, [bp.tablet]: 128, [bp.desktop]: 140, [bp.wide]: 184 },
    height: { default: 26, [bp.tablet]: 40, [bp.desktop]: 44, [bp.wide]: 56 },
    marginLeft: { default: -33, [bp.tablet]: -64, [bp.desktop]: -70, [bp.wide]: -92 },
    marginTop: { default: -13, [bp.tablet]: -20, [bp.desktop]: -22, [bp.wide]: -28 },
  },
  tail: {
    width: { default: 30, [bp.tablet]: 56, [bp.desktop]: 64, [bp.wide]: 84 },
    marginLeft: { default: -15, [bp.tablet]: -28, [bp.desktop]: -32, [bp.wide]: -42 },
  },
  afterPlate: {
    left: { default: 98, [bp.tablet]: 208, [bp.desktop]: 228, [bp.wide]: 308 },
  },
  label: {
    left: { default: 110, [bp.tablet]: 240, [bp.desktop]: 276, [bp.wide]: 372 },
    transform: {
      default: "translateY(-35px)",
      [bp.tablet]: "translateY(-38px)",
      [bp.desktop]: "translateY(-38px)",
      [bp.wide]: "translateY(-40px)",
    },
  },
  leader: {
    left: { default: 97, [bp.tablet]: 206, [bp.desktop]: 226, [bp.wide]: 306 },
    width: { default: 8, [bp.tablet]: 26, [bp.desktop]: 42, [bp.wide]: 58 },
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
  legendTail: {
    marginTop: { default: 28, [bp.desktop]: "auto" },
    marginBottom: { default: 0, [bp.desktop]: 76 },
  },
  formula: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: 0,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 30,
    lineHeight: 1,
    color: tone.ink,
  },
  sub: {
    fontSize: "0.56em",
    verticalAlign: "-0.32em",
  },
  fraction: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 26,
  },
  numerator: {
    paddingInline: 6,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.ink,
  },
  denominator: {
    paddingTop: 3,
  },
  formulaNote: {
    marginTop: 14,
    maxWidth: "17em",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    paddingInlineEnd: 8,
  },
  pair: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.wide]: "160px minmax(0, 1fr)" },
    columnGap: 24,
    rowGap: { default: 6, [bp.tablet]: 8, [bp.desktop]: 6 },
    alignItems: "start",
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 20, [bp.tablet]: 24, [bp.desktop]: 24, [bp.wide]: 28 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: tone.ink,
    whiteSpace: "nowrap",
  },
  desc: {
    margin: 0,
    maxWidth: "22em",
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.7,
    color: tone.body,
    textWrap: "pretty",
  },
  glyph: {
    display: "block",
    fontFamily: face.sans,
    fontSize: { default: 13, [bp.tablet]: 18, [bp.desktop]: 20, [bp.wide]: 24 },
    fontWeight: 500,
    lineHeight: 1,
    color: "#ffffff",
  },
  sample: {
    position: "absolute",
    top: "auto",
    bottom: 12,
    transform: "none",
  },
  dims: {
    position: "absolute",
    inset: 0,
    display: { default: "none", [bp.desktop]: "block" },
  },
  dim: {
    position: "absolute",
    bottom: 0,
    width: 1,
    backgroundColor: tone.graphite,
    "::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: -3,
      width: 7,
      height: 1,
      backgroundColor: tone.graphite,
    },
    "::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: -3,
      width: 7,
      height: 1,
      backgroundColor: tone.graphite,
    },
  },
  dimFront: {
    left: 16,
    top: 3,
  },
  dimSpot: {
    left: 30,
    top: "50%",
  },
  dimWord: {
    position: "absolute",
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 14,
    lineHeight: 1,
    color: tone.ink,
  },
  dimWordFront: {
    left: 20,
    top: "30%",
  },
  dimWordSpot: {
    left: 34,
    top: "62%",
  },
});

function Formula() {
  return (
    <div {...stylex.props(styles.legendTail)}>
      <p aria-hidden="true" {...stylex.props(styles.formula)}>
        <span>
          R<span {...stylex.props(styles.sub)}>f</span>
        </span>
        <span>=</span>
        <span {...stylex.props(styles.fraction)}>
          <span {...stylex.props(styles.numerator)}>
            d<span {...stylex.props(styles.sub)}>s</span>
          </span>
          <span {...stylex.props(styles.denominator)}>
            d<span {...stylex.props(styles.sub)}>f</span>
          </span>
        </span>
      </p>
      <p lang="en" {...stylex.props(ui.note, styles.formulaNote)}>
        Retention factor: how far a band travels, over how far the solvent front travels.
      </p>
    </div>
  );
}

function Dimensions({ development }: { development: Development }) {
  return (
    <m.div aria-hidden="true" style={{ opacity: development.marks }} {...stylex.props(styles.dims)}>
      <span {...stylex.props(styles.dim, styles.dimFront)} />
      <span {...stylex.props(styles.dim, styles.dimSpot)} />
      <span {...stylex.props(styles.dimWord, styles.dimWordFront)}>
        d<span {...stylex.props(styles.sub)}>f</span>
      </span>
      <span {...stylex.props(styles.dimWord, styles.dimWordSpot)}>
        d<span {...stylex.props(styles.sub)}>s</span>
      </span>
    </m.div>
  );
}

function Sample({ development }: { development: Development }) {
  const opacity = useTransform(development.progress, [0.02, 0.14], [1, 0]);
  return (
    <m.p
      aria-hidden="true"
      style={{ opacity }}
      {...stylex.props(ui.note, geometry.label, styles.sample)}
    >
      泛成 · 1995 · 南京 — <span lang="en">one spot at the origin</span>
    </m.p>
  );
}

export function Culture() {
  const sectionRef = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const development = useDevelopment({ section: sectionRef, figure: figureRef, pinnable: true });

  return (
    <PinnedSection
      id="about-culture"
      titleId="oos1w-culture"
      sectionRef={sectionRef}
      head={
        <>
          <SectionHead
            num="03"
            word="Values"
            title={ABOUT_CULTURE.title}
            titleId="oos1w-culture"
            fig="Fig. 3"
            legend="One sample, developed. As the front climbs, it resolves into the three values it was made of."
          />
          <Formula />
        </>
      }
    >
      <div ref={figureRef}>
        <Plate
          lanes={1}
          bands={BANDS}
          development={development}
          geometry={GEOMETRY}
          listLabel="企业文化"
          renderGlyph={(band) => <span {...stylex.props(styles.glyph)}>{valueOf(band).glyph}</span>}
          renderLabel={(band) => {
            const value = valueOf(band);
            return (
              <div {...stylex.props(styles.label)}>
                <Rf value={band.rf} />
                <div {...stylex.props(styles.pair)}>
                  <h3 {...stylex.props(styles.title)}>{value.title}</h3>
                  <p {...stylex.props(styles.desc)}>{value.desc}</p>
                </div>
              </div>
            );
          }}
          plateOverlay={<Dimensions development={development} />}
          noteOverlay={<Sample development={development} />}
        />
      </div>
    </PinnedSection>
  );
}
