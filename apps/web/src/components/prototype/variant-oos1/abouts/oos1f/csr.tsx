import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { NodeMarker, Reveal, Section, Shell } from "./layout";
import { color, font, media } from "./palette.stylex";

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 6fr) minmax(0, 5fr)",
    },
    columnGap: { default: 0, [breakpoints.lg]: 80 },
    rowGap: 48,
    alignItems: "center",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: 28,
    minWidth: 0,
    fontFamily: font.cjk,
  },
  statement: {
    margin: 0,
    fontSize: {
      default: 28,
      [media.mdOnly]: 40,
      [media.lgOnly]: 30,
      [breakpoints.xl]: "clamp(34px, 3vw, 44px)",
    },
    fontWeight: 400,
    lineHeight: 1.45,
    letterSpacing: "0.03em",
    color: color.ink,
  },
  statementLine: {
    display: "block",
    textWrap: "balance",
  },
  desc: {
    margin: 0,
    maxWidth: "32em",
    fontSize: { default: 16, [breakpoints.lg]: 17 },
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: color.body,
    textWrap: "pretty",
  },
  outcomes: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: 12,
    margin: 0,
    marginTop: 8,
    paddingTop: 24,
    paddingInline: 0,
    listStyle: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.hairline,
  },
  outcome: {
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: color.ink,
  },
  image: {
    display: "block",
    width: "100%",
    aspectRatio: { default: "4 / 3", [breakpoints.lg]: "4 / 5" },
    objectFit: "cover",
    objectPosition: "56% 50%",
    borderRadius: 2,
  },
});

export function Csr() {
  const [lead, close] = ABOUT_CSR.statement;
  return (
    <Section id="about-csr" name={ABOUT_CSR.title}>
      <Shell>
        <NodeMarker />
        <div {...stylex.props(styles.grid)}>
          <Reveal sx={styles.copy}>
            <h3 {...stylex.props(styles.statement)}>
              <span {...stylex.props(styles.statementLine)}>{lead}</span>
              <span {...stylex.props(styles.statementLine)}>{close}</span>
            </h3>
            <p {...stylex.props(styles.desc)}>{ABOUT_CSR.desc}</p>
            <ul {...stylex.props(styles.outcomes)}>
              {ABOUT_CSR.outcomes.map((outcome) => (
                <li key={outcome.title} {...stylex.props(styles.outcome)}>
                  {outcome.title}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <img
              src={ABOUT_CSR.image}
              alt={ABOUT_CSR.imageAlt}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.image)}
            />
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
