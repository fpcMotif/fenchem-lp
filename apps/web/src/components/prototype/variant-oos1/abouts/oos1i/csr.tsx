import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { Reveal } from "./motion";
import { Section, SectionName } from "./primitives";
import { base } from "./primitives-values";
import { font, media, tone } from "./shear.stylex";

const S = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 7fr) minmax(0, 5fr)",
    },
    columnGap: { default: 0, [breakpoints.lg]: 80, [media.desktop]: 112 },
    rowGap: 48,
    alignItems: "center",
  },
  photo: {
    display: "block",
    width: "100%",
    aspectRatio: "4 / 3",
    objectFit: "cover",
    backgroundColor: tone.tint,
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  statement: {
    margin: 0,
    fontFamily: font.sans,
    fontSize: { default: 26, [media.tablet]: 32, [media.desktop]: 36 },
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  statementLine: {
    display: "block",
  },
  outcomes: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    marginTop: 8,
    padding: 0,
    listStyle: "none",
  },
  outcome: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    paddingBlock: 18,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.rule,
    fontFamily: font.sans,
    fontSize: { default: 16, [media.desktop]: 18 },
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: tone.ink,
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
  const [lead, tail] = ABOUT_CSR.statement;
  return (
    <Section id="about-csr" labelledBy="about-csr-title" surface="page">
      <SectionName id="about-csr-title">{ABOUT_CSR.title}</SectionName>
      <div {...stylex.props(base.shell, base.inset, S.grid)}>
        <Reveal>
          <img
            src={ABOUT_CSR.image}
            alt={ABOUT_CSR.imageAlt}
            loading="lazy"
            decoding="async"
            {...stylex.props(S.photo)}
          />
        </Reveal>
        <Reveal delay={120} sx={S.copy}>
          <p {...stylex.props(S.statement)}>
            <span {...stylex.props(S.statementLine)}>{lead}</span>
            <span {...stylex.props(S.statementLine)}>{tail}</span>
          </p>
          <p {...stylex.props(base.prose)}>{ABOUT_CSR.desc}</p>
          <ul {...stylex.props(S.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome) => (
              <li key={outcome.title} {...stylex.props(S.outcome)}>
                <span aria-hidden="true" {...stylex.props(S.dot)} />
                {outcome.title}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
