import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";

import { ABOUT_STRUCTURE } from "../../about-data";
import { srOnly, ui } from "./layout";
import { PlateHead } from "./plate-head";
import { useEntry, type Phase } from "./strobe";
import { TICK, strobe } from "./strobe-values";
import { bp, face, tone } from "./tokens.stylex";

const LAST_EXPOSURE = ABOUT_STRUCTURE.subsidiaries.length;

const styles = stylex.create({
  rows: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 22, [bp.desktop]: 26 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  row: {
    alignItems: "start",
    rowGap: 6,
  },
  track: {
    position: "relative",
    gridColumn: { default: "1 / 3", [bp.abovePhone]: "1 / 4" },
    alignSelf: "stretch",
  },
  mark: {
    position: "absolute",
    left: "calc(var(--k) / var(--last) * (100% - 14px))",
    width: 14,
    height: 14,
    borderRadius: "50%",
    backgroundColor: tone.navy,
  },
  markHolding: {
    top: { default: 9, [bp.tablet]: 11, [bp.desktop]: 15 },
  },
  markSubsidiary: {
    top: { default: 6, [bp.tablet]: 8, [bp.desktop]: 10 },
  },
  text: {
    gridColumn: { default: "3 / -1", [bp.abovePhone]: "4 / 10" },
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  badge: {
    gridColumn: { default: "3 / -1", [bp.abovePhone]: "10 / 13" },
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 10,
    rowGap: 2,
    margin: 0,
    paddingTop: { default: 0, [bp.abovePhone]: 6 },
  },
  badgeLabel: {
    whiteSpace: "nowrap",
    fontFamily: face.sans,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.navy,
  },
  badgeEnglish: {
    fontSize: 19,
  },
  holdingName: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: { default: 22, [bp.tablet]: 26, [bp.desktop]: 30 },
    lineHeight: 1.45,
    letterSpacing: "0.03em",
    color: tone.ink,
  },
  name: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: { default: 17, [bp.tablet]: 19, [bp.desktop]: 22 },
    lineHeight: 1.5,
    letterSpacing: "0.03em",
    color: tone.ink,
  },
  english: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: { default: 14, [bp.desktop]: 15 },
    fontWeight: 500,
    letterSpacing: "0.02em",
    color: tone.body,
  },
  firstSubsidiary: {
    marginTop: { default: 18, [bp.desktop]: 30 },
  },
});

function Mark(props: { exposure: number; phase: Phase }) {
  return (
    <span aria-hidden="true" {...stylex.attrs(styles.track)}>
      <span
        {...stylex.attrs(
          styles.mark,
          props.exposure === 0 ? styles.markHolding : styles.markSubsidiary,
          props.phase === "armed" && strobe.hidden,
          props.phase === "fire" && strobe.pop,
        )}
        style={
          {
            "--k": props.exposure,
            "--last": LAST_EXPOSURE,
            "--pop-at": `${props.exposure * TICK}ms`,
          } as JSX.CSSProperties
        }
      />
    </span>
  );
}

export function Structure() {
  const [rowsRef, phase] = useEntry<HTMLDivElement>();
  const { holding, subsidiaries, subsidiaryBadge, subsidiaryBadgeEnglish } = ABOUT_STRUCTURE;
  return (
    <section id="about-structure" aria-labelledby="oos1p-structure" {...stylex.attrs(ui.plate)}>
      <PlateHead
        plate={6}
        english="Structure"
        title={ABOUT_STRUCTURE.title}
        titleId="oos1p-structure"
      />
      <div {...stylex.attrs(ui.shell)}>
        <div ref={rowsRef} {...stylex.attrs(styles.rows)}>
          <div {...stylex.attrs(ui.grid, styles.row)}>
            <Mark exposure={0} phase={phase()} />
            <div {...stylex.attrs(styles.text)}>
              <h3 {...stylex.attrs(styles.holdingName)}>{holding.name}</h3>
              <p lang="en" {...stylex.attrs(styles.english)}>
                {holding.english}
              </p>
            </div>
            <p {...stylex.attrs(styles.badge)}>
              <span {...stylex.attrs(styles.badgeLabel)}>{holding.badge}</span>
              <span lang="en" {...stylex.attrs(ui.eyebrow, styles.badgeEnglish)}>
                Holding
              </span>
            </p>
          </div>

          <h3 {...srOnly}>{subsidiaryBadgeEnglish}</h3>
          <ol {...stylex.attrs(styles.rows, styles.firstSubsidiary)}>
            {subsidiaries.map((subsidiary, index) => (
              <li {...stylex.attrs(ui.grid, styles.row)}>
                <Mark exposure={index + 1} phase={phase()} />
                <div {...stylex.attrs(styles.text)}>
                  <p {...stylex.attrs(styles.name)}>{subsidiary.name}</p>
                  <p lang="en" {...stylex.attrs(styles.english)}>
                    {subsidiary.english}
                  </p>
                </div>
                {index === 0 ? (
                  <p aria-hidden="true" {...stylex.attrs(styles.badge)}>
                    <span {...stylex.attrs(styles.badgeLabel)}>{subsidiaryBadge}</span>
                    <span lang="en" {...stylex.attrs(ui.eyebrow, styles.badgeEnglish)}>
                      Subsidiaries
                    </span>
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
