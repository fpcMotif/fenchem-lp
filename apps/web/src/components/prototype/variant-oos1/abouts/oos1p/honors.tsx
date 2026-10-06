import * as stylex from "@stylexjs/stylex";
import type { CSSProperties } from "react";

import { ABOUT_HONORS } from "../../about-data";
import { ui } from "./layout";
import { PlateHead } from "./plate-head";
import { TICK, echoIndexes, strobe, trailOpacity, useEntry, type Phase } from "./strobe";
import { bp, face, tone } from "./tokens.stylex";

type Level = (typeof ABOUT_HONORS.items)[number]["level"];

const LEVELS: Record<Level, { label: string; english: string; exposures: number }> = {
  national: { label: "国家级", english: "National", exposures: 3 },
  provincial: { label: "省级", english: "Provincial", exposures: 2 },
  municipal: { label: "市级", english: "Municipal", exposures: 1 },
};

const FRAME_STAGGER = 2 * TICK;
const MARK_TRAIL_BRIGHTEST = 0.42;

const styles = stylex.create({
  sequence: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.abovePhone]: "repeat(4, minmax(0, 1fr))",
    },
    columnGap: { default: 12, [bp.tablet]: 16, [bp.desktop]: 24 },
    rowGap: { default: 28, [bp.tablet]: 48, [bp.desktop]: 64 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  frame: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 8, [bp.desktop]: 12 },
    minWidth: 0,
    paddingInlineEnd: { default: 0, [bp.abovePhone]: 12 },
  },
  head: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  mark: {
    position: "relative",
    display: "block",
    flexShrink: 0,
    width: 44,
    height: 22,
  },
  dot: {
    position: "absolute",
    top: 0,
    left: "var(--x)",
    width: 22,
    height: 22,
  },
  dotInk: {
    display: "block",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    backgroundColor: tone.navy,
  },
  dotEcho: {
    opacity: "var(--o)",
  },
  level: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    margin: 0,
  },
  levelLabel: {
    fontFamily: face.sans,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.navy,
  },
  levelEnglish: {
    fontSize: { default: 17, [bp.desktop]: 18 },
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 18, [bp.tablet]: 18, [bp.desktop]: 21 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.02em",
    color: tone.ink,
    textWrap: "balance",
  },
});

const DOT_STEP = 11;

function ExposureMark({
  exposures,
  phase,
  delay,
}: {
  exposures: number;
  phase: Phase;
  delay: number;
}) {
  const echoes = echoIndexes(exposures - 1);
  const landingX = (LEVELS.national.exposures - 1) * DOT_STEP;
  return (
    <span aria-hidden="true" {...stylex.props(styles.mark)}>
      {echoes.map((k) => (
        <span
          key={k}
          {...stylex.props(
            styles.dot,
            phase === "armed" && strobe.hidden,
            phase === "fire" && strobe.pop,
          )}
          style={
            {
              "--x": `${landingX - k * DOT_STEP}px`,
              "--o": trailOpacity(k, exposures - 1, MARK_TRAIL_BRIGHTEST).toFixed(3),
              "--pop-at": `${delay + (exposures - 1 - k) * TICK}ms`,
            } as CSSProperties
          }
        >
          <span {...stylex.props(styles.dotInk, styles.dotEcho)} />
        </span>
      ))}
      <span
        {...stylex.props(
          styles.dot,
          phase === "armed" && strobe.hidden,
          phase === "fire" && strobe.pop,
        )}
        style={
          {
            "--x": `${landingX}px`,
            "--pop-at": `${delay + (exposures - 1) * TICK}ms`,
          } as CSSProperties
        }
      >
        <span {...stylex.props(styles.dotInk)} />
      </span>
    </span>
  );
}

export function Honors() {
  const [sequenceRef, phase] = useEntry<HTMLOListElement>();
  return (
    <section id="about-honor" aria-labelledby="oos1p-honor" {...stylex.props(ui.plate)}>
      <PlateHead plate={5} english="Honors" title={ABOUT_HONORS.title} titleId="oos1p-honor" />
      <div {...stylex.props(ui.shell)}>
        <ol ref={sequenceRef} {...stylex.props(styles.sequence)}>
          {ABOUT_HONORS.items.map((item, index) => {
            const level = LEVELS[item.level];
            return (
              <li key={item.id} {...stylex.props(styles.frame)}>
                <div {...stylex.props(styles.head)}>
                  <ExposureMark
                    exposures={level.exposures}
                    phase={phase}
                    delay={index * FRAME_STAGGER}
                  />
                  <p {...stylex.props(styles.level)}>
                    <span {...stylex.props(styles.levelLabel)}>{level.label}</span>
                    <span lang="en" {...stylex.props(ui.eyebrow, styles.levelEnglish)}>
                      {level.english}
                    </span>
                  </p>
                </div>
                <p {...stylex.props(styles.title)}>{item.title}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
