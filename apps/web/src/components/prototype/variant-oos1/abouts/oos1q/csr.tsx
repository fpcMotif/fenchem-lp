import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR, ABOUT_HERO } from "../../about-data";
import { Figure, Reveal, Section } from "./shared";
import { step, tone } from "./tokens.stylex";

const s = stylex.create({
  stage: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) auto",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 24, [breakpoints.xl]: 32 },
    rowGap: { default: 40, [breakpoints.lg]: 0 },
  },
  photo: {
    gridColumn: { default: "1 / -1", [breakpoints.lg]: "1 / 8" },
    gridRow: "1",
  },
  ratio: {
    aspectRatio: { default: "4 / 3", [breakpoints.lg]: "4 / 5" },
  },
  lake: {
    objectPosition: "62% 50%",
  },
  statement: {
    gridColumn: { default: "2", [breakpoints.lg]: "8 / 10" },
    gridRow: { default: "2", [breakpoints.lg]: "1" },
    justifySelf: "end",
    alignSelf: "start",
    margin: 0,
    writingMode: "vertical-rl",
    textOrientation: "mixed",
    fontSize: {
      default: 28,
      [breakpoints.md]: 36,
      [breakpoints.lg]: 30,
      [breakpoints.xl]: 44,
    },
    fontWeight: 400,
    lineHeight: 1.8,
    letterSpacing: "0.2em",
    color: tone.ink,
  },
  statementLine: {
    display: "block",
  },
  text: {
    gridColumn: { default: "1", [breakpoints.lg]: "10 / 13" },
    gridRow: { default: "2", [breakpoints.lg]: "1" },
    alignSelf: "end",
    minWidth: 0,
  },
  desc: {
    margin: 0,
    fontSize: step.small,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: tone.body,
    textWrap: "pretty",
  },
  outcomes: {
    margin: 0,
    marginTop: { default: 32, [breakpoints.xl]: 48 },
    padding: 0,
    listStyle: "none",
  },
  outcome: {
    position: "relative",
    fontSize: { default: step.body, [breakpoints.xl]: step.lead },
    lineHeight: 2.3,
    letterSpacing: "0.1em",
    color: tone.ink,
  },
  leaf: {
    position: "absolute",
    top: "calc(50% - 5px)",
    left: -16,
    width: 10,
    height: 10,
    borderRadius: "0 100% 0 100%",
    backgroundColor: colors.brandGreen500,
    transform: "rotate(-18deg)",
  },
});

export function Csr() {
  const chip = ABOUT_HERO.navChips[3];
  const [statementLead, statementClose] = ABOUT_CSR.statement;
  const leafIndex = ABOUT_CSR.outcomes.findIndex((outcome) => outcome.icon === "leaf");

  return (
    <Section id={chip.id} label={chip.english}>
      <div {...stylex.props(s.stage)}>
        <Figure
          src={ABOUT_CSR.image}
          alt={ABOUT_CSR.imageAlt}
          ratio={s.ratio}
          fit={s.lake}
          sx={s.photo}
        />
        <Reveal as="p" sx={s.statement}>
          <span {...stylex.props(s.statementLine)}>{statementLead}</span>
          <span {...stylex.props(s.statementLine)}>{statementClose}</span>
        </Reveal>
        <Reveal sx={s.text}>
          <p {...stylex.props(s.desc)}>{ABOUT_CSR.desc}</p>
          <ul {...stylex.props(s.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome, idx) => (
              <li key={outcome.title} {...stylex.props(s.outcome)}>
                {idx === leafIndex ? <span aria-hidden="true" {...stylex.props(s.leaf)} /> : null}
                {outcome.title}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
