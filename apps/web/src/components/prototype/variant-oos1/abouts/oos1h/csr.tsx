import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { Reveal } from "./reveal";
import { shared } from "./shared";
import { mq, ui } from "./theme.stylex";

const styles = stylex.create({
  section: {
    paddingTop: { default: 80, [breakpoints.xl]: 144 },
    backgroundColor: colors.paper,
  },
  head: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.xl]: "minmax(0, 7fr) minmax(0, 5fr)",
    },
    columnGap: 96,
    rowGap: 32,
    alignItems: "end",
  },
  statement: {
    margin: 0,
    fontSize: { default: 28, [mq.tablet]: 40, [breakpoints.xl]: "clamp(36px, 3.1vw, 46px)" },
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
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 40,
    margin: 0,
    marginTop: { default: 56, [breakpoints.xl]: 96 },
    padding: 0,
    listStyle: "none",
  },
  outcome: {
    paddingBlock: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: ui.hairline,
    fontSize: { default: 17, [breakpoints.xl]: 19 },
    letterSpacing: "0.08em",
    color: ui.ink,
  },
  figure: {
    margin: 0,
    marginTop: { default: 56, [breakpoints.xl]: 96 },
  },
  image: {
    display: "block",
    width: "100%",
    height: "auto",
    aspectRatio: { default: "4 / 3", [breakpoints.md]: "2400 / 1100" },
    objectFit: "cover",
    objectPosition: "center 42%",
  },
});

export function Csr() {
  const [lead, close] = ABOUT_CSR.statement;

  return (
    <section
      id="about-csr"
      aria-label={ABOUT_CSR.title}
      {...stylex.props(shared.anchor, styles.section)}
    >
      <div {...stylex.props(shared.shell, shared.inset)}>
        <Reveal sx={styles.head}>
          <h2 {...stylex.props(styles.statement)}>
            <span {...stylex.props(styles.statementLine)}>{lead}</span>
            <span {...stylex.props(styles.statementLine)}>{close}</span>
          </h2>
          <p {...stylex.props(styles.desc)}>{ABOUT_CSR.desc}</p>
        </Reveal>
        <ul {...stylex.props(styles.outcomes)}>
          {ABOUT_CSR.outcomes.map((outcome, position) => (
            <Reveal key={outcome.title} as="li" step={position} sx={styles.outcome}>
              {outcome.title}
            </Reveal>
          ))}
        </ul>
      </div>
      <figure {...stylex.props(styles.figure)}>
        <img
          src={ABOUT_CSR.image}
          alt={ABOUT_CSR.imageAlt}
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.image)}
        />
      </figure>
    </section>
  );
}
