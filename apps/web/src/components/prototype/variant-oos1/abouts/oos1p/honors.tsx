import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";

import { ABOUT_HONORS } from "../../about-data";
import { ui } from "./layout";
import { PlateHead } from "./plate-head";
import { useEntry, type Phase } from "./strobe";
import { TICK, echoIndexes, strobe, trailOpacity } from "./strobe-values";
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

function ExposureMark(props: { exposures: number; phase: Phase; delay: number }) {
  const echoes = echoIndexes(props.exposures - 1);
  const landingX = (LEVELS.national.exposures - 1) * DOT_STEP;
  return (
    <span aria-hidden="true" {...stylex.attrs(styles.mark)}>
      {echoes.map((k) => (
        <span
          {...stylex.attrs(
            styles.dot,
            props.phase === "armed" && strobe.hidden,
            props.phase === "fire" && strobe.pop,
          )}
          style={
            {
              "--x": `${landingX - k * DOT_STEP}px`,
              "--o": trailOpacity(k, props.exposures - 1, MARK_TRAIL_BRIGHTEST).toFixed(3),
              "--pop-at": `${props.delay + (props.exposures - 1 - k) * TICK}ms`,
            } as JSX.CSSProperties
          }
        >
          <span {...stylex.attrs(styles.dotInk, styles.dotEcho)} />
        </span>
      ))}
      <span
        {...stylex.attrs(
          styles.dot,
          props.phase === "armed" && strobe.hidden,
          props.phase === "fire" && strobe.pop,
        )}
        style={
          {
            "--x": `${landingX}px`,
            "--pop-at": `${props.delay + (props.exposures - 1) * TICK}ms`,
          } as JSX.CSSProperties
        }
      >
        <span {...stylex.attrs(styles.dotInk)} />
      </span>
    </span>
  );
}

export function Honors() {
  const [sequenceRef, phase] = useEntry<HTMLOListElement>();
  return (
    <section id="about-honor" aria-labelledby="oos1p-honor" {...stylex.attrs(ui.plate)}>
      <PlateHead plate={5} english="Honors" title={ABOUT_HONORS.title} titleId="oos1p-honor" />
      <div {...stylex.attrs(ui.shell)}>
        <ol ref={sequenceRef} {...stylex.attrs(styles.sequence)}>
          {ABOUT_HONORS.items.map((item, index) => {
            const level = LEVELS[item.level];
            return (
              <li {...stylex.attrs(styles.frame)}>
                <div {...stylex.attrs(styles.head)}>
                  <ExposureMark
                    exposures={level.exposures}
                    phase={phase()}
                    delay={index * FRAME_STAGGER}
                  />
                  <p {...stylex.attrs(styles.level)}>
                    <span {...stylex.attrs(styles.levelLabel)}>{level.label}</span>
                    <span lang="en" {...stylex.attrs(ui.eyebrow, styles.levelEnglish)}>
                      {level.english}
                    </span>
                  </p>
                </div>
                <p {...stylex.attrs(styles.title)}>{item.title}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
