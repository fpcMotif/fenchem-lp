import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR, ABOUT_HERO } from "../../about-data";
import { Figure, Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { step, tone } from "./tokens.stylex";

const s = stylex.create({
  csr: {
    backgroundColor: tone.navy,
    color: colors.paper,
  },
  ratio: {
    aspectRatio: "1.618 / 1",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, ["@media (min-width: 1280px)"]: 48 },
  },
  statement: {
    margin: 0,
    fontSize: { default: step.title, ["@media (min-width: 1280px)"]: "32px" },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: colors.paper,
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
    color: tone.onNavy,
    textWrap: "pretty",
  },
  outcomes: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 768px)"]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 24,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  outcome: {
    paddingBlock: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.navyRule,
    fontSize: step.lead,
    fontWeight: 400,
    letterSpacing: "0.08em",
  },
});

export function Csr() {
  const chip = ABOUT_HERO.navChips[3];
  const [statementLead, statementClose] = ABOUT_CSR.statement;

  return (
    <Section id={chip.id} label="Responsibility" background={s.csr}>
      <div {...stylex.attrs(ui.phi)}>
        <div {...stylex.attrs(ui.asideCol)}>
          <Figure src={ABOUT_CSR.image} alt={ABOUT_CSR.imageAlt} ratio={s.ratio} />
        </div>
        <div {...stylex.attrs(ui.main, s.body)}>
          <Reveal>
            <p {...stylex.attrs(s.statement)}>
              <span {...stylex.attrs(s.statementLine)}>{statementLead}</span>
              <span {...stylex.attrs(s.statementLine)}>{statementClose}</span>
            </p>
          </Reveal>
          <Reveal step={1}>
            <p {...stylex.attrs(s.desc)}>{ABOUT_CSR.desc}</p>
          </Reveal>
          <ul {...stylex.attrs(s.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome, idx) => (
              <Reveal as="li" step={idx + 2} sx={s.outcome}>
                {outcome.title}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
