import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { ui } from "./layout";
import { PlateHead } from "./plate-head";
import { StrobeImage, StrobeText, useEntry } from "./strobe";
import { TICK } from "./strobe-values";
import { bp, face, tone } from "./tokens.stylex";

const LINE_GAP = 6 * TICK;

const styles = stylex.create({
  statement: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: { default: 26, [bp.tablet]: 34, [bp.desktop]: "clamp(38px, 3.3vw, 48px)" },
    lineHeight: 1.45,
    letterSpacing: "0.03em",
    color: tone.ink,
  },
  figure: {
    margin: 0,
    marginTop: { default: 40, [bp.tablet]: 56, [bp.desktop]: 80 },
  },
  image: {
    aspectRatio: { default: "4 / 3", [bp.tablet]: "16 / 9", [bp.desktop]: "21 / 9" },
  },
  imagePosition: {
    objectPosition: "50% 62%",
  },
  details: {
    marginTop: { default: 28, [bp.desktop]: 40 },
    rowGap: 28,
    alignItems: "start",
  },
  caption: {
    margin: 0,
    fontSize: { default: 19, [bp.desktop]: 21 },
  },
  desc: {
    maxWidth: "28em",
  },
  outcomes: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  outcome: {
    paddingBlock: 14,
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    fontFamily: face.sans,
    fontSize: { default: 17, [bp.desktop]: 19 },
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  outcomeFirst: {
    paddingTop: 4,
  },
});

export function Csr() {
  const [statementRef, statementPhase] = useEntry<HTMLParagraphElement>();
  const [figureRef, figurePhase] = useEntry<HTMLElement>();
  return (
    <section id="about-csr" aria-labelledby="oos1p-csr" {...stylex.props(ui.plate)}>
      <PlateHead plate={4} english="Responsibility" title={ABOUT_CSR.title} titleId="oos1p-csr" />
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(ui.grid)}>
          <p ref={statementRef} {...stylex.props(ui.q2to4, styles.statement)}>
            {ABOUT_CSR.statement.map((line, index) => (
              <StrobeText key={line} phase={statementPhase} delay={index * LINE_GAP}>
                {line}
              </StrobeText>
            ))}
          </p>
        </div>

        <figure ref={figureRef} {...stylex.props(styles.figure)}>
          <StrobeImage
            phase={figurePhase}
            count={4}
            unit="3%"
            src={ABOUT_CSR.image}
            alt={ABOUT_CSR.imageAlt}
            sx={styles.image}
            imageSx={styles.imagePosition}
          />
        </figure>

        <div {...stylex.props(ui.grid, styles.details)}>
          <p lang="en" aria-hidden="true" {...stylex.props(ui.q1, ui.eyebrow, styles.caption)}>
            Reflection
          </p>
          <p {...stylex.props(ui.q2to3, ui.body, styles.desc)}>{ABOUT_CSR.desc}</p>
          <ul {...stylex.props(ui.q4, styles.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome, index) => (
              <li
                key={outcome.title}
                {...stylex.props(styles.outcome, index === 0 && styles.outcomeFirst)}
              >
                {outcome.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
