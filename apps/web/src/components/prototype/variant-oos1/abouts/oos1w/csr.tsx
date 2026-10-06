import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { SectionHead, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const NUMERALS = ["i", "ii", "iii"] as const;
const WATERLINE = "60%";

const styles = stylex.create({
  text: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "4 / 10" },
    marginTop: { default: 36, [bp.desktop]: 0 },
  },
  statement: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 300,
    fontSize: { default: 24, [bp.tablet]: 34, [bp.desktop]: 34, [bp.wide]: 38 },
    lineHeight: 1.5,
    letterSpacing: "0.03em",
    color: tone.ink,
  },
  line: {
    display: "block",
  },
  desc: {
    margin: 0,
    marginTop: { default: 24, [bp.desktop]: 32 },
    maxWidth: "28em",
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 18 },
    lineHeight: 1.9,
    color: tone.body,
    textWrap: "pretty",
  },
  outcomes: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [bp.tablet]: "repeat(3, minmax(0, 1fr))",
      [bp.desktop]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 24,
    margin: 0,
    marginTop: { default: 36, [bp.desktop]: 56 },
    padding: 0,
    listStyleType: "none",
  },
  outcome: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    paddingBlock: { default: 14, [bp.tablet]: 16, [bp.desktop]: 16 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    fontFamily: face.sans,
    fontSize: { default: 17, [bp.desktop]: 18 },
    lineHeight: 1.5,
    color: tone.ink,
  },
  numeral: {
    minWidth: "1.4em",
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 20,
    lineHeight: 1,
    color: tone.blue,
  },
  figure: {
    gridColumn: { default: "1 / -1", [bp.tablet]: "2 / -2", [bp.desktop]: "10 / -1" },
    margin: 0,
    marginTop: { default: 48, [bp.desktop]: 0 },
  },
  frame: {
    position: "relative",
    aspectRatio: { default: "4 / 5", [bp.tablet]: "4 / 3", [bp.desktop]: "3 / 4" },
  },
  crop: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    borderRadius: 2,
    backgroundColor: tone.tint,
  },
  image: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "58% 50%",
  },
  tick: {
    position: "absolute",
    top: WATERLINE,
    width: 10,
    height: 1,
    backgroundColor: tone.graphite,
  },
  tickStart: {
    left: -14,
  },
  tickEnd: {
    right: -14,
  },
  tickWord: {
    position: "absolute",
    top: WATERLINE,
    right: "calc(100% + 22px)",
    display: { default: "none", [bp.desktop]: "block" },
    transform: "translateY(-50%)",
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 16,
    lineHeight: 1,
    color: tone.body,
    whiteSpace: "nowrap",
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    marginTop: 12,
  },
  captionNum: {
    color: tone.ink,
  },
  captionItalic: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 17,
    lineHeight: 1.3,
  },
});

export function Csr() {
  return (
    <section id="about-csr" aria-labelledby="oos1w-csr" {...stylex.props(ui.section)}>
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(ui.grid, ui.ruled)}>
          <div {...stylex.props(ui.headCol)}>
            <SectionHead
              num="04"
              word="Responsibility"
              title={ABOUT_CSR.title}
              titleId="oos1w-csr"
            />
          </div>

          <div {...stylex.props(styles.text)}>
            <p {...stylex.props(styles.statement)}>
              {ABOUT_CSR.statement.map((line) => (
                <span key={line} {...stylex.props(styles.line)}>
                  {line}
                </span>
              ))}
            </p>
            <p {...stylex.props(styles.desc)}>{ABOUT_CSR.desc}</p>
            <ul {...stylex.props(styles.outcomes)}>
              {ABOUT_CSR.outcomes.map((outcome, index) => (
                <li key={outcome.title} {...stylex.props(styles.outcome)}>
                  <span lang="en" aria-hidden="true" {...stylex.props(styles.numeral)}>
                    {NUMERALS[index]}
                  </span>
                  {outcome.title}
                </li>
              ))}
            </ul>
          </div>

          <figure {...stylex.props(styles.figure)}>
            <div {...stylex.props(styles.frame)}>
              <div {...stylex.props(styles.crop)}>
                <img
                  src={ABOUT_CSR.image}
                  alt={ABOUT_CSR.imageAlt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(styles.image)}
                />
              </div>
              <span aria-hidden="true" {...stylex.props(styles.tick, styles.tickStart)} />
              <span aria-hidden="true" {...stylex.props(styles.tick, styles.tickEnd)} />
              <span lang="en" aria-hidden="true" {...stylex.props(styles.tickWord)}>
                front
              </span>
            </div>
            <figcaption {...stylex.props(ui.micro, styles.caption)}>
              <span lang="en" {...stylex.props(styles.captionNum)}>
                Fig. 4
              </span>
              <span lang="en" {...stylex.props(styles.captionItalic)}>
                The waterline, read as a solvent front.
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
