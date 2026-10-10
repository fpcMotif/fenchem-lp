import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR, ABOUT_HERO } from "../../about-data";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { step, tone } from "./tokens.stylex";

const s = stylex.create({
  cols: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.lg]: 24, [breakpoints.xl]: 32 },
    rowGap: 48,
    alignItems: "end",
  },
  copy: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 8" },
    display: "flex",
    flexDirection: "column",
    gap: { default: 28, [breakpoints.xl]: 40 },
  },
  statement: {
    margin: 0,
    fontSize: { default: step.title, [breakpoints.md]: step.display },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  statementLine: {
    display: "block",
  },
  desc: {
    margin: 0,
    maxWidth: "30em",
    fontSize: step.body,
    lineHeight: 2,
    letterSpacing: "0.06em",
    color: tone.body,
    textWrap: "pretty",
  },
  outcomes: {
    maxWidth: "24em",
    margin: 0,
    marginTop: { default: 8, [breakpoints.xl]: 16 },
    padding: 0,
    listStyle: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  outcome: {
    paddingBlock: { default: 16, [breakpoints.xl]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    fontSize: step.lead,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: tone.ink,
  },
  photo: {
    gridColumn: { default: "auto", [breakpoints.lg]: "9 / 13" },
  },
  frame: {
    aspectRatio: { default: "4 / 3", [breakpoints.lg]: "4 / 5" },
  },
  image: {
    objectPosition: { default: "62% 60%", [breakpoints.lg]: "64% 50%" },
  },
});

export function Csr() {
  const chip = ABOUT_HERO.navChips[3];
  const [statementLead, statementClose] = ABOUT_CSR.statement;

  return (
    <Section id={chip.id} label={chip.english} background={ui.onPaper}>
      <div {...stylex.props(s.cols)}>
        <div {...stylex.props(s.copy)}>
          <Reveal>
            <p {...stylex.props(s.statement)}>
              <span {...stylex.props(s.statementLine)}>{statementLead}</span>
              <span {...stylex.props(s.statementLine)}>{statementClose}</span>
            </p>
          </Reveal>
          <Reveal step={1}>
            <p {...stylex.props(s.desc)}>{ABOUT_CSR.desc}</p>
          </Reveal>
          <ul {...stylex.props(s.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome, idx) => (
              <Reveal key={outcome.title} as="li" step={idx + 2} sx={s.outcome}>
                {outcome.title}
              </Reveal>
            ))}
          </ul>
        </div>
        <div {...stylex.props(s.photo)}>
          <Reveal as="figure" step={1} sx={ui.figure}>
            <div {...stylex.props(ui.frame, s.frame)}>
              <img
                src={ABOUT_CSR.image}
                alt={ABOUT_CSR.imageAlt}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, s.image)}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
