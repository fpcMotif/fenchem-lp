import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR, ABOUT_HERO } from "../../about-data";
import { Reveal, Section, ui } from "./shared";
import { band, step, tone } from "./tokens.stylex";

const s = stylex.create({
  statement: {
    margin: 0,
    fontSize: { default: 24, [band.mdToXl]: 40, [breakpoints.xl]: 56 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  line: {
    display: "block",
  },
  lineIndent: {
    paddingLeft: { default: 0, [breakpoints.md]: "2em" },
  },
  lower: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: 40,
    marginTop: { default: 40, [breakpoints.xl]: 96 },
  },
  copyCell: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 5" },
    alignSelf: "end",
    order: { default: 2, [breakpoints.lg]: 1 },
  },
  photoCell: {
    gridColumn: { default: "auto", [breakpoints.lg]: "6 / 13" },
    order: { default: 1, [breakpoints.lg]: 2 },
    margin: 0,
  },
  ratio: {
    aspectRatio: "3 / 2",
  },
  desc: {
    maxWidth: "28em",
    margin: 0,
    fontSize: step.body,
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.05em",
    color: tone.body,
    textWrap: "pretty",
  },
  outcomes: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    margin: 0,
    marginTop: 28,
    padding: 0,
    listStyle: "none",
  },
  outcome: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: step.small,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: tone.ink,
  },
  dot: {
    flexShrink: 0,
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: tone.mint,
  },
});

export function Csr() {
  const chip = ABOUT_HERO.navChips[3];
  const [first, second] = ABOUT_CSR.statement;

  return (
    <Section id={chip.id} label={ABOUT_CSR.title}>
      <Reveal>
        <h3 {...stylex.props(s.statement)}>
          <span {...stylex.props(s.line)}>{first}</span>
          <span {...stylex.props(s.line, s.lineIndent)}>{second}</span>
        </h3>
      </Reveal>
      <div {...stylex.props(s.lower)}>
        <Reveal as="figure" sx={s.photoCell}>
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
        <Reveal delay={120} sx={s.copyCell}>
          <p {...stylex.props(s.desc)}>{ABOUT_CSR.desc}</p>
          <ul {...stylex.props(s.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome) => (
              <li key={outcome.title} {...stylex.props(s.outcome)}>
                <span aria-hidden="true" {...stylex.props(s.dot)} />
                {outcome.title}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
