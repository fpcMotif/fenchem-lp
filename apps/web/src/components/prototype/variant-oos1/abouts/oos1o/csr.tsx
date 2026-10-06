import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { SectionHead } from "./section-head";
import { ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

const NUMERALS = ["i", "ii", "iii"] as const;

const styles = stylex.create({
  section: {
    paddingTop: { default: 96, [bp.tablet]: 128, [bp.desktop]: 176 },
    paddingBottom: { default: 96, [bp.tablet]: 128, [bp.desktop]: 168 },
    scrollMarginTop: chrome.header,
  },
  head: {
    gridColumn: "1 / -1",
  },
  statement: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "1 / 12" },
    margin: 0,
    marginTop: { default: 36, [bp.tablet]: 48, [bp.desktop]: 64 },
    fontFamily: face.sans,
    fontWeight: 300,
    fontSize: { default: 26, [bp.tablet]: 44, [bp.laptop]: 50, [bp.wide]: 62 },
    lineHeight: 1.3,
    letterSpacing: "0.02em",
    color: tone.ink,
    fontFeatureSettings: '"palt"',
  },
  line: {
    display: "block",
  },
  lineIndent: {
    paddingInlineStart: { default: 0, [bp.tablet]: "16.666%", [bp.desktop]: "calc(200% / 11)" },
  },
  desc: {
    gridColumn: { default: "1 / -1", [bp.tablet]: "3 / 9", [bp.desktop]: "3 / 8" },
    marginTop: { default: 28, [bp.desktop]: 40 },
  },
  figure: {
    gridColumn: "1 / -1",
    position: "relative",
    margin: 0,
    marginTop: { default: 48, [bp.tablet]: 64, [bp.desktop]: 88 },
    aspectRatio: { default: "4 / 3", [bp.tablet]: "16 / 9", [bp.desktop]: "21 / 9" },
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  image: {
    objectPosition: "50% 62%",
  },
  outcomes: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.tablet]: "repeat(3, minmax(0, 1fr))",
      [bp.desktop]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 24,
    margin: 0,
    marginTop: { default: 8, [bp.tablet]: 0, [bp.desktop]: 0 },
    padding: 0,
    listStyleType: "none",
  },
  outcome: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    paddingBlock: { default: 16, [bp.tablet]: 22, [bp.desktop]: 26 },
    borderBottomWidth: { default: 1, [bp.tablet]: 0, [bp.desktop]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
    fontFamily: face.sans,
    fontSize: { default: 18, [bp.desktop]: 20 },
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  numeral: {
    minWidth: 26,
    fontSize: 24,
    lineHeight: 1,
    color: tone.blue,
  },
});

export function Csr() {
  return (
    <section id="about-csr" aria-labelledby="oos1o-csr" {...stylex.props(styles.section)}>
      <div {...stylex.props(ui.shell, ui.grid)}>
        <SectionHead
          id="oos1o-csr"
          label="Responsibility"
          title={ABOUT_CSR.title}
          quiet
          sx={styles.head}
        />
        <p {...stylex.props(styles.statement)}>
          <span {...stylex.props(styles.line)}>{ABOUT_CSR.statement[0]}</span>
          <span {...stylex.props(styles.line, styles.lineIndent)}>{ABOUT_CSR.statement[1]}</span>
        </p>
        <p {...stylex.props(ui.lead, styles.desc)}>{ABOUT_CSR.desc}</p>
        <figure {...stylex.props(styles.figure)}>
          <img
            src={ABOUT_CSR.image}
            alt={ABOUT_CSR.imageAlt}
            loading="lazy"
            decoding="async"
            {...stylex.props(ui.fill, styles.image)}
          />
        </figure>
        <ol {...stylex.props(styles.outcomes)}>
          {ABOUT_CSR.outcomes.map((outcome, index) => (
            <li key={outcome.icon} {...stylex.props(styles.outcome)}>
              <span aria-hidden="true" {...stylex.props(ui.serif, styles.numeral)}>
                {NUMERALS[index]}
              </span>
              {outcome.title}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
