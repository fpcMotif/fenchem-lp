import * as stylex from "@stylexjs/stylex";
import type { CSSProperties } from "react";

import { ABOUT_CULTURE } from "../../about-data";
import { Cast } from "./cast";
import { LIFT as LIFTS } from "./cast-values";
import { SectionHead } from "./head";
import { ui } from "./shared";
import { SECTION_HOURS } from "./sun";
import { bp, face, tone } from "./tokens.stylex";

const ENGLISH = ["Focus", "Stillness", "Renewal"] as const;
const STILL_GLYPH = "静";
const LIFT = LIFTS.stele;

const styles = stylex.create({
  field: {
    gridTemplateColumns: {
      default: "repeat(3, minmax(0, 1fr))",
      [bp.desktop]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 22, [bp.tablet]: 40, [bp.desktop]: 24 },
    rowGap: { default: 28, [bp.desktop]: 0 },
    marginBlock: 0,
    marginInline: 0,
    paddingTop: { default: 140, [bp.tablet]: 240, [bp.desktop]: 330 },
    paddingInline: 0,
    listStyleType: "none",
  },
  value: {
    display: { default: "contents", [bp.desktop]: "flex" },
    flexDirection: "column",
    gap: 48,
  },
  stele: {
    position: "relative",
    gridRow: "1",
    width: { default: "80%", [bp.desktop]: "100%" },
    height: { default: 248, [bp.tablet]: 380, [bp.desktop]: "clamp(460px, 38vw, 540px)" },
    marginBottom: { default: 72, [bp.tablet]: 120, [bp.desktop]: 0 },
  },
  face: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    height: "100%",
    paddingTop: { default: 18, [bp.tablet]: 32, [bp.desktop]: 44 },
    paddingBottom: { default: 14, [bp.desktop]: 26 },
    backgroundColor: tone.face,
    boxShadow: `inset 0 0 0 1px ${tone.edge}`,
  },
  glyph: {
    fontFamily: face.sans,
    fontWeight: 900,
    fontSize: { default: 44, [bp.tablet]: 76, [bp.desktop]: "clamp(96px, 8.4vw, 128px)" },
    lineHeight: 1,
    color: tone.navy,
    textShadow: "0 1px 0 rgba(255, 255, 255, 0.95), 0 -1px 0 rgba(11, 42, 92, 0.18)",
  },
  title: {
    flexGrow: 1,
    marginInline: 0,
    marginBottom: 0,
    marginTop: { default: 14, [bp.desktop]: 36 },
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: { default: 15, [bp.tablet]: 18, [bp.desktop]: 20 },
    lineHeight: 1,
    letterSpacing: "0.12em",
    writingMode: "vertical-rl",
    color: tone.ink,
  },
  english: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 14, [bp.desktop]: 17 },
    color: tone.quiet,
  },
  desc: {
    gridColumn: "1 / -1",
    display: "flex",
    gap: 14,
    margin: 0,
    maxWidth: { default: "none", [bp.desktop]: "19em" },
  },
  descGlyph: {
    display: { default: "inline", [bp.desktop]: "none" },
    flexShrink: 0,
    fontFamily: face.sans,
    fontWeight: 900,
    fontSize: 15,
    lineHeight: 1.85,
    color: tone.navy,
  },
  against: {
    position: "absolute",
    zIndex: 1,
    bottom: "100%",
    left: "50%",
    whiteSpace: "nowrap",
    transform:
      "translate(calc(var(--sun-ux) * var(--lift) * var(--sun-scale) * -1px), calc(var(--sun-uy) * var(--lift) * var(--sun-scale) * -1px)) translate(-50%, -14px)",
    willChange: "transform",
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 14, [bp.desktop]: 18 },
    color: tone.navy,
  },
});

const columns = stylex.create({
  0: { gridColumn: { default: "1", [bp.desktop]: "2 / span 3" } },
  1: { gridColumn: { default: "2", [bp.desktop]: "6 / span 3" } },
  2: { gridColumn: { default: "3", [bp.desktop]: "10 / span 3" } },
});

export function Culture() {
  return (
    <section
      id="about-culture"
      aria-labelledby="oos1t-culture"
      data-hour={SECTION_HOURS.culture}
      {...stylex.props(ui.section, ui.shell)}
    >
      <SectionHead
        titleId="oos1t-culture"
        hour={SECTION_HOURS.culture}
        title={ABOUT_CULTURE.title}
        english="Culture"
      />
      <ul {...stylex.props(ui.grid, styles.field)}>
        {ABOUT_CULTURE.values.map((value, index) => {
          const toward = value.glyph === STILL_GLYPH;
          const column = index === 0 ? columns[0] : index === 1 ? columns[1] : columns[2];
          return (
            <li key={value.glyph} {...stylex.props(styles.value, column)}>
              <div
                style={{ "--lift": LIFT } as CSSProperties}
                {...stylex.props(styles.stele, column)}
              >
                <Cast lift={LIFT} toward={toward} />
                {toward ? (
                  <span aria-hidden="true" lang="en" {...stylex.props(styles.against)}>
                    against the light
                  </span>
                ) : null}
                <div {...stylex.props(styles.face)}>
                  <span aria-hidden="true" {...stylex.props(styles.glyph)}>
                    {value.glyph}
                  </span>
                  <h3 {...stylex.props(styles.title)}>{value.title}</h3>
                  <span lang="en" aria-hidden="true" {...stylex.props(styles.english)}>
                    {ENGLISH[index]}
                  </span>
                </div>
              </div>
              <p {...stylex.props(ui.body, styles.desc)}>
                <span aria-hidden="true" {...stylex.props(styles.descGlyph)}>
                  {value.glyph}
                </span>
                <span>{value.desc}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
