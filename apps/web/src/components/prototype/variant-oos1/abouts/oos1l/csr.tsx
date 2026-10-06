import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { Clause, Hinge } from "./clause";
import { SectionLabel, headingId } from "./label";
import { SENTENCE } from "./sentence";
import { ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  section: {
    paddingTop: { default: 144, [bp.tablet]: 176, [bp.desktop]: 224 },
  },
  statement: {
    marginTop: { default: 40, [bp.desktop]: 56 },
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.tablet]: "minmax(0, 1fr) minmax(0, 1fr)",
      [bp.desktop]: "minmax(0, 50%) minmax(0, 41.5%)",
    },
    justifyContent: "space-between",
    alignItems: "start",
    gap: { default: 40, [bp.tablet]: 32, [bp.desktop]: 24 },
    marginTop: { default: 56, [bp.tablet]: 80, [bp.desktop]: 104 },
  },
  frame: {
    aspectRatio: "3 / 2",
    margin: 0,
    overflow: "hidden",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, [bp.desktop]: 40 },
  },
  outcomes: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    fontFamily: face.sans,
    fontSize: { default: 20, [bp.desktop]: 24 },
    lineHeight: 1.5,
    textAlign: "end",
    color: tone.ink,
  },
  outcome: {
    fontWeight: 500,
  },
});

export function Csr() {
  const outcomes = ABOUT_CSR.outcomes;
  return (
    <section
      id="about-csr"
      aria-labelledby={headingId("about-csr")}
      {...stylex.props(ui.section, styles.section)}
    >
      <div {...stylex.props(ui.shell)}>
        <SectionLabel section="about-csr" />
        <div {...stylex.props(styles.statement)}>
          {SENTENCE.csr.map((line) => (
            <Clause key={line.id} line={line} />
          ))}
        </div>
        <div {...stylex.props(styles.row)}>
          <figure {...stylex.props(styles.frame)}>
            <img
              src={ABOUT_CSR.image}
              alt={ABOUT_CSR.imageAlt}
              loading="lazy"
              decoding="async"
              {...stylex.props(ui.photo)}
            />
          </figure>
          <div {...stylex.props(styles.text)}>
            <p {...stylex.props(ui.body)}>{ABOUT_CSR.desc}</p>
            <ul {...stylex.props(styles.outcomes)}>
              {outcomes.map((outcome, index) => (
                <li key={outcome.icon} {...stylex.props(styles.outcome)}>
                  {outcome.title}
                  {index < outcomes.length - 1 ? <Hinge mark="、" /> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
