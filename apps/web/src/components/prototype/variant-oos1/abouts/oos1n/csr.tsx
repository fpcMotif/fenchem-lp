import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR, ABOUT_HERO } from "../../about-data";
import { Reveal, Section, ui } from "./shared";
import { step, tone } from "./tokens.stylex";

const s = stylex.create({
  statementCell: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 13" },
  },
  statement: {
    margin: 0,
    fontSize: { default: "30px", [breakpoints.md]: "48px", [breakpoints.xl]: "60px" },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: "#ffffff",
  },
  statementLine: {
    display: "block",
  },
  body: {
    marginTop: { default: 40, [breakpoints.md]: 56, [breakpoints.xl]: 72 },
  },
  descCell: {
    alignSelf: "end",
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 6" },
  },
  desc: {
    margin: 0,
    maxWidth: "30em",
    fontSize: step.body,
    lineHeight: 2,
    letterSpacing: "0.06em",
    color: tone.onNavy,
    textWrap: "balance",
  },
  figure: {
    gridColumn: { default: "auto", [breakpoints.lg]: "7 / 13" },
    minWidth: 0,
    margin: 0,
  },
  ratio: {
    aspectRatio: "3 / 2",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  outcomes: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.md]: 32, [breakpoints.xl]: 40 },
    margin: 0,
    marginTop: { default: 48, [breakpoints.md]: 64, [breakpoints.xl]: 80 },
    padding: 0,
    listStyle: "none",
  },
  outcome: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    paddingBlock: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.navyRule,
    fontSize: { default: step.body, [breakpoints.md]: step.lead },
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: "#ffffff",
  },
  dot: {
    flexShrink: 0,
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: tone.mint,
  },
});

export function Csr() {
  const chip = ABOUT_HERO.navChips[3];

  return (
    <Section id={chip.id} label={ABOUT_CSR.title} background={ui.onNavy}>
      <div {...stylex.props(ui.grid)}>
        <Reveal sx={s.statementCell}>
          <h3 {...stylex.props(s.statement)}>
            {ABOUT_CSR.statement.map((line) => (
              <span key={line} {...stylex.props(s.statementLine)}>
                {line}
              </span>
            ))}
          </h3>
        </Reveal>
      </div>
      <div {...stylex.props(ui.grid, s.body)}>
        <Reveal sx={s.descCell} step={1}>
          <p {...stylex.props(s.desc)}>{ABOUT_CSR.desc}</p>
        </Reveal>
        <Reveal as="figure" step={2} sx={s.figure}>
          <div {...stylex.props(ui.frame, s.ratio)}>
            <img
              src={ABOUT_CSR.image}
              alt={ABOUT_CSR.imageAlt}
              loading="lazy"
              decoding="async"
              {...stylex.props(ui.fill)}
            />
          </div>
        </Reveal>
      </div>
      <ul {...stylex.props(s.outcomes)}>
        {ABOUT_CSR.outcomes.map((outcome, idx) => (
          <Reveal key={outcome.title} as="li" step={idx} sx={s.outcome}>
            <span aria-hidden="true" {...stylex.props(s.dot)} />
            {outcome.title}
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
