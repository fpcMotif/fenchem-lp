import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { Reveal } from "./reveal";
import { shared } from "./shared";
import { mq, ui } from "./theme.stylex";

const styles = stylex.create({
  section: {
    paddingTop: { default: 80, ["@media (min-width: 1280px)"]: 144 },
    backgroundColor: colors.paper,
  },
  head: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1280px)"]: "minmax(0, 7fr) minmax(0, 5fr)",
    },
    columnGap: 96,
    rowGap: 32,
    alignItems: "end",
  },
  statement: {
    margin: 0,
    fontSize: {
      default: 28,
      [mq.tablet]: 40,
      ["@media (min-width: 1280px)"]: "clamp(36px, 3.1vw, 46px)",
    },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.04em",
    color: ui.ink,
  },
  statementLine: {
    display: "block",
  },
  desc: {
    margin: 0,
    maxWidth: "32em",
    fontSize: 15,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: ui.body,
    textWrap: "pretty",
  },
  outcomes: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 768px)"]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 40,
    margin: 0,
    marginTop: { default: 56, ["@media (min-width: 1280px)"]: 96 },
    padding: 0,
    listStyle: "none",
  },
  outcome: {
    paddingBlock: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: ui.hairline,
    fontSize: { default: 17, ["@media (min-width: 1280px)"]: 19 },
    letterSpacing: "0.08em",
    color: ui.ink,
  },
  figure: {
    margin: 0,
    marginTop: { default: 56, ["@media (min-width: 1280px)"]: 96 },
  },
  image: {
    display: "block",
    width: "100%",
    height: "auto",
    aspectRatio: { default: "4 / 3", ["@media (min-width: 768px)"]: "2400 / 1100" },
    objectFit: "cover",
    objectPosition: "center 42%",
  },
});

export function Csr() {
  const [lead, close] = ABOUT_CSR.statement;

  return (
    <section
      id="about-csr"
      aria-label="Responsibility"
      {...stylex.attrs(shared.anchor, styles.section)}
    >
      <div {...stylex.attrs(shared.shell, shared.inset)}>
        <Reveal sx={styles.head}>
          <h2 {...stylex.attrs(styles.statement)}>
            <span {...stylex.attrs(styles.statementLine)}>{lead}</span>
            <span {...stylex.attrs(styles.statementLine)}>{close}</span>
          </h2>
          <p {...stylex.attrs(styles.desc)}>{ABOUT_CSR.desc}</p>
        </Reveal>
        <ul {...stylex.attrs(styles.outcomes)}>
          {ABOUT_CSR.outcomes.map((outcome, position) => (
            <Reveal as="li" step={position} sx={styles.outcome}>
              {outcome.title}
            </Reveal>
          ))}
        </ul>
      </div>
      <figure {...stylex.attrs(styles.figure)}>
        <img
          src={ABOUT_CSR.image}
          alt={ABOUT_CSR.imageAlt}
          loading="lazy"
          decoding="async"
          {...stylex.attrs(styles.image)}
        />
      </figure>
    </section>
  );
}
