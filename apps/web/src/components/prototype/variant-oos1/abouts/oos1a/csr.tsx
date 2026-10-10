import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { fonts, media, palette } from "./lattice.stylex";
import { Frame, Reveal, SectionName } from "./parts";
import { shared } from "./parts-values";

const styles = stylex.create({
  section: {
    backgroundColor: palette.page,
  },
  photo: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    backgroundColor: palette.tint,
    aspectRatio: { default: "4 / 3", [media.mdOnly]: "16 / 9", [breakpoints.lg]: "2.3 / 1" },
  },
  image: {
    objectPosition: "center 42%",
  },
  text: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(16, minmax(0, 1fr))",
    },
    rowGap: 32,
    marginTop: { default: 40, [breakpoints.lg]: 80 },
  },
  statementCell: {
    gridColumn: { default: null, [breakpoints.lg]: "1 / span 9" },
  },
  statement: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: { default: 24, [media.tablet]: 38, [breakpoints.xl]: 48 },
    fontWeight: 500,
    lineHeight: 1.45,
    letterSpacing: "0.03em",
    color: palette.ink,
  },
  statementLine: {
    display: "block",
  },
  statementMark: {
    backgroundImage: `linear-gradient(transparent 70%, ${palette.mint} 70%, ${palette.mint} 92%, transparent 92%)`,
  },
  desc: {
    gridColumn: { default: null, [breakpoints.lg]: "11 / span 6" },
    alignSelf: "end",
  },
  outcomes: {
    gridColumn: { default: null, [breakpoints.lg]: "1 / span 16" },
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(16, minmax(0, 1fr))",
    },
    margin: 0,
    marginTop: { default: 8, [breakpoints.lg]: 32 },
    padding: 0,
    listStyle: "none",
  },
  outcome: {
    margin: 0,
    paddingBlock: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: palette.inkRule,
    fontFamily: fonts.cjk,
    fontSize: { default: 17, [breakpoints.xl]: 19 },
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: palette.ink,
  },
  one: { gridColumn: { default: null, [breakpoints.lg]: "1 / span 5" } },
  two: { gridColumn: { default: null, [breakpoints.lg]: "6 / span 5" } },
  three: { gridColumn: { default: null, [breakpoints.lg]: "11 / span 6" } },
});

const COLUMN_STYLES = [styles.one, styles.two, styles.three] as const;

export function Csr() {
  const [statementLead, statementClose] = ABOUT_CSR.statement;
  return (
    <section
      id="about-csr"
      aria-labelledby="about-csr-title"
      {...stylex.props(styles.section, shared.anchor)}
    >
      <SectionName id="about-csr-title">Responsibility</SectionName>
      <Frame innerSx={shared.sectionPad}>
        <Reveal as="figure" sx={styles.photo}>
          <img
            src={ABOUT_CSR.image}
            alt={ABOUT_CSR.imageAlt}
            loading="lazy"
            decoding="async"
            {...stylex.props(shared.cover, styles.image)}
          />
        </Reveal>
        <div {...stylex.props(styles.text)}>
          <Reveal sx={styles.statementCell}>
            <p {...stylex.props(styles.statement)}>
              <span {...stylex.props(styles.statementLine)}>{statementLead}</span>
              <span {...stylex.props(styles.statementLine)}>
                <span {...stylex.props(styles.statementMark)}>{statementClose}</span>
              </span>
            </p>
          </Reveal>
          <Reveal step={1} sx={styles.desc}>
            <p {...stylex.props(shared.body)}>{ABOUT_CSR.desc}</p>
          </Reveal>
          <ul {...stylex.props(styles.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome, index) => (
              <Reveal key={outcome.title} as="li" step={index} sx={COLUMN_STYLES[index]}>
                <p {...stylex.props(styles.outcome)}>{outcome.title}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Frame>
    </section>
  );
}
