import * as stylex from "@stylexjs/stylex";
import { m, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { PencilRing } from "./band";
import { BAND_LOOK } from "./band-values";
import { Rf, SectionHead } from "./shared";
import { ui } from "./shared-values";
import { bp, face, tone } from "./tokens.stylex";
import { useDevelopment, type Development } from "./use-development";

const SHARED_RF = 0.9;
const LANES = ABOUT_STRUCTURE.subsidiaries.length;

const percent = (value: number) => `${(value * 100).toFixed(3)}%`;
const laneMiddle = (lane: number) => percent((lane + 0.5) / LANES);

const styles = stylex.create({
  figure: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "4 / -1" },
    marginTop: { default: 36, [bp.desktop]: 0 },
  },
  header: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    columnGap: 24,
    rowGap: 12,
    paddingInlineStart: { default: 40, [bp.desktop]: 64 },
    marginBottom: { default: 16, [bp.desktop]: 20 },
  },
  holding: {
    position: "relative",
  },
  holdingLeader: {
    display: { default: "none", [bp.tablet]: "block", [bp.desktop]: "block" },
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    width: 1,
    height: { default: 12, [bp.desktop]: 16 },
    backgroundColor: tone.pencil,
  },
  originWord: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    margin: 0,
  },
  serif: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 18,
    lineHeight: 1,
    color: tone.ink,
  },
  badge: {
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.body,
  },
  holdingName: {
    margin: 0,
    marginTop: 10,
    fontFamily: face.sans,
    fontSize: { default: 20, [bp.tablet]: 24, [bp.desktop]: 26 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  holdingEnglish: {
    marginTop: 4,
  },
  count: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    margin: 0,
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.body,
  },
  plate: {
    position: "relative",
    height: { default: 440, [bp.desktop]: 460 },
    overflow: "hidden",
    backgroundColor: tone.plate,
    boxShadow: "inset 0 0 0 1px rgba(11, 42, 92, 0.14)",
    borderRadius: 2,
  },
  foot: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: { default: 40, [bp.desktop]: 64 },
    backgroundColor: tone.wet,
  },
  run: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: { default: 40, [bp.desktop]: 64 },
    right: { default: 24, [bp.desktop]: 48 },
  },
  clip: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
  },
  wet: {
    position: "absolute",
    inset: 0,
    backgroundColor: tone.wet,
    boxShadow: "inset -1px 0 0 rgba(7, 67, 169, 0.5)",
  },
  meniscus: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 40,
    backgroundImage: "linear-gradient(270deg, rgba(7, 67, 169, 0.1) 0%, rgba(7, 67, 169, 0) 100%)",
  },
  origin: {
    position: "absolute",
    top: 12,
    bottom: 12,
    left: 0,
    width: 1,
    backgroundColor: tone.pencil,
  },
  pencilFront: {
    position: "absolute",
    top: 8,
    bottom: 8,
    right: 0,
    width: 1,
    backgroundColor: tone.graphite,
  },
  lanes: {
    position: "absolute",
    inset: 0,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  lane: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 0,
  },
  index: {
    position: "absolute",
    top: 0,
    right: "100%",
    width: { default: 40, [bp.desktop]: 64 },
    textAlign: "center",
    transform: "translateY(-50%)",
  },
  tick: {
    position: "absolute",
    top: 0,
    left: -4,
    width: 9,
    height: 1,
    backgroundColor: tone.pencil,
  },
  mover: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 0,
    pointerEvents: "none",
  },
  tail: {
    position: "absolute",
    right: 0,
    width: "100%",
    height: { default: 16, [bp.desktop]: 22 },
    marginTop: { default: -8, [bp.desktop]: -11 },
    transformOrigin: "100% 50%",
    backgroundImage:
      "linear-gradient(270deg, rgba(11, 42, 92, 0.07) 0%, rgba(11, 42, 92, 0.03) 45%, rgba(11, 42, 92, 0) 100%)",
    maskImage: "linear-gradient(180deg, transparent 0%, #000 32%, #000 68%, transparent 100%)",
  },
  band: {
    position: "absolute",
    top: 0,
    right: { default: -8, [bp.desktop]: -11 },
    width: { default: 16, [bp.desktop]: 22 },
    height: { default: 38, [bp.desktop]: 50 },
    marginTop: { default: -19, [bp.desktop]: -25 },
  },
  label: {
    position: "absolute",
    top: 0,
    left: { default: 14, [bp.desktop]: 28 },
    width: { default: "calc(90% - 36px)", [bp.desktop]: "calc(90% - 56px)" },
    display: "flex",
    alignItems: "center",
    gap: { default: 10, [bp.desktop]: 18 },
    transform: "translateY(-50%)",
  },
  names: {
    display: "flex",
    flexDirection: { default: "column", [bp.desktop]: "row" },
    alignItems: { default: "flex-start", [bp.desktop]: "baseline" },
    columnGap: 16,
    rowGap: 2,
    minWidth: 0,
  },
  name: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.tablet]: 17, [bp.desktop]: 18, [bp.wide]: 19 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.02em",
    color: tone.ink,
    whiteSpace: "nowrap",
  },
  english: {
    whiteSpace: "nowrap",
  },
  leader: {
    flexGrow: 1,
    minWidth: 12,
    height: 1,
    backgroundColor: tone.pencil,
  },
  axis: {
    position: "relative",
    height: 28,
  },
  axisWord: {
    position: "absolute",
    top: 10,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 16,
    lineHeight: 1,
    color: tone.body,
    whiteSpace: "nowrap",
  },
  axisOrigin: {
    left: { default: 40, [bp.desktop]: 64 },
    transform: "translateX(-50%)",
  },
  axisFront: {
    right: { default: 0, [bp.desktop]: 48 },
    transform: { default: "none", [bp.desktop]: "translateX(50%)" },
  },
});

function Band({ development }: { development: Development }) {
  const travel = useTransform(development.progress, (p) => p * SHARED_RF);
  const x = useTransform(travel, (t) => percent(t - 1));
  const spread = useTransform(travel, (t) => Math.sqrt(t));
  const scaleY = useTransform(spread, (s) => 0.5 + 0.5 * s);
  const scaleX = useTransform(spread, (s) => 0.82 + 0.18 * s);
  return (
    <m.div aria-hidden="true" style={{ x }} {...stylex.props(styles.mover)}>
      <m.span style={{ scaleX: travel }} {...stylex.props(styles.tail)} />
      <m.span
        style={{ scaleX, scaleY }}
        {...stylex.props(BAND_LOOK.base, BAND_LOOK.navy.body, styles.band)}
      >
        <PencilRing visible={development.marks} />
      </m.span>
    </m.div>
  );
}

function Front({ progress }: { progress: MotionValue<number> }) {
  const x = useTransform(progress, (p) => percent(p - 1));
  return (
    <div {...stylex.props(styles.clip)}>
      <m.div style={{ x }} {...stylex.props(styles.wet)}>
        <span {...stylex.props(styles.meniscus)} />
      </m.div>
    </div>
  );
}

export function Structure() {
  const sectionRef = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const development = useDevelopment({ section: sectionRef, figure: figureRef, pinnable: false });
  const labelsShown = useTransform(development.progress, [0.5, 0.8], [0, 1]);
  const dryPlate = useTransform(development.marks, (mark) => 1 - 0.5 * mark);

  return (
    <section
      ref={sectionRef}
      id="about-structure"
      aria-labelledby="oos1w-structure"
      {...stylex.props(ui.section)}
    >
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(ui.grid, ui.ruled)}>
          <div {...stylex.props(ui.headCol)}>
            <SectionHead
              num="06"
              word="Structure"
              title={ABOUT_STRUCTURE.title}
              titleId="oos1w-structure"
              fig="Fig. 6"
              legend="The holding is the origin. Five lanes leave it and travel to the same height."
            />
          </div>

          <div ref={figureRef} {...stylex.props(styles.figure)}>
            <div {...stylex.props(styles.header)}>
              <div {...stylex.props(styles.holding)}>
                <p {...stylex.props(styles.originWord)}>
                  <span lang="en" {...stylex.props(styles.serif)}>
                    Origin
                  </span>
                  <span {...stylex.props(styles.badge)}>{ABOUT_STRUCTURE.holding.badge}</span>
                </p>
                <h3 {...stylex.props(styles.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
                <p lang="en" {...stylex.props(ui.english, styles.holdingEnglish)}>
                  {ABOUT_STRUCTURE.holding.english}
                </p>
                <span aria-hidden="true" {...stylex.props(styles.holdingLeader)} />
              </div>
              <p {...stylex.props(styles.count)}>
                <span>
                  {ABOUT_STRUCTURE.subsidiaryBadge} × {LANES}
                </span>
                <Rf value={SHARED_RF} />
              </p>
            </div>

            <div {...stylex.props(styles.plate)}>
              <span aria-hidden="true" {...stylex.props(styles.foot)} />
              <div {...stylex.props(styles.run)}>
                <m.div
                  aria-hidden="true"
                  style={{ opacity: dryPlate }}
                  {...stylex.props(styles.clip)}
                >
                  <Front progress={development.progress} />
                </m.div>
                <span aria-hidden="true" {...stylex.props(styles.origin)} />
                <m.span
                  aria-hidden="true"
                  style={{ opacity: development.marks }}
                  {...stylex.props(styles.pencilFront)}
                />
                <ol
                  aria-label={ABOUT_STRUCTURE.subsidiaryBadgeEnglish}
                  {...stylex.props(styles.lanes)}
                >
                  {ABOUT_STRUCTURE.subsidiaries.map((subsidiary, lane) => (
                    <li
                      key={subsidiary.id}
                      style={{ top: laneMiddle(lane) }}
                      {...stylex.props(styles.lane)}
                    >
                      <span aria-hidden="true" {...stylex.props(ui.micro, styles.index)}>
                        {String(lane + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true" {...stylex.props(styles.tick)} />
                      <Band development={development} />
                      <m.div style={{ opacity: labelsShown }} {...stylex.props(styles.label)}>
                        <div {...stylex.props(styles.names)}>
                          <h3 {...stylex.props(styles.name)}>{subsidiary.name}</h3>
                          <p lang="en" {...stylex.props(ui.english, styles.english)}>
                            {subsidiary.english}
                          </p>
                        </div>
                        <span aria-hidden="true" {...stylex.props(styles.leader)} />
                      </m.div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div aria-hidden="true" {...stylex.props(styles.axis)}>
              <span lang="en" {...stylex.props(styles.axisWord, styles.axisOrigin)}>
                origin
              </span>
              <span lang="en" {...stylex.props(styles.axisWord, styles.axisFront)}>
                solvent front
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
