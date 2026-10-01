import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { Reveal, SectionName } from "./parts";
import { base, ty } from "./shared";
import { hue } from "./theme.stylex";

const styles = stylex.create({
  csr: {
    backgroundColor: colors.paper,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
    },
    columnGap: 96,
    rowGap: 48,
    alignItems: "center",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  statement: {
    margin: 0,
    fontSize: "clamp(26px, 3vw, 44px)",
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.03em",
    color: hue.ink,
  },
  statementLine: {
    display: "block",
  },
  outcomes: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  outcome: {
    paddingBlock: 18,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: hue.hairline,
    fontSize: 18,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: hue.ink,
  },
  photo: {
    position: "relative",
    aspectRatio: { default: "4 / 3", [breakpoints.lg]: "4 / 5" },
    overflow: "clip",
    backgroundColor: hue.tint,
  },
});

export function Csr() {
  const [lead, close] = ABOUT_CSR.statement;
  return (
    <section
      id="about-csr"
      aria-labelledby="about-csr-title"
      {...stylex.props(base.section, base.anchor, styles.csr)}
    >
      <SectionName id="about-csr-title">社会责任</SectionName>
      <div {...stylex.props(base.shell, styles.grid)}>
        <Reveal sx={styles.text}>
          <p {...stylex.props(styles.statement)}>
            <span {...stylex.props(styles.statementLine)}>{lead}</span>
            <span {...stylex.props(styles.statementLine)}>{close}</span>
          </p>
          <p {...stylex.props(ty.body)}>{ABOUT_CSR.desc}</p>
          <ul {...stylex.props(styles.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome) => (
              <li key={outcome.title} {...stylex.props(styles.outcome)}>
                {outcome.title}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal step={1}>
          <div {...stylex.props(styles.photo)}>
            <img
              src={ABOUT_CSR.image}
              alt={ABOUT_CSR.imageAlt}
              loading="lazy"
              decoding="async"
              {...stylex.props(base.fill)}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
