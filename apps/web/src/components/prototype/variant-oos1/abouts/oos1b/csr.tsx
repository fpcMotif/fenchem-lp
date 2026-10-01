import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { Fold, s } from "./shared";
import { palette } from "./tokens.stylex";

const styles = stylex.create({
  spread: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(2, minmax(0, 1fr))",
    },
    alignItems: "end",
    rowGap: 28,
  },
  statement: {
    margin: 0,
    paddingInlineEnd: { default: 0, [breakpoints.lg]: 48 },
    fontSize: { default: 28, [breakpoints.md]: 40, [breakpoints.lg]: "min(2.9vw, 44px)" },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.02em",
    textAlign: { default: "start", [breakpoints.lg]: "end" },
    color: palette.ink,
  },
  statementLine: {
    display: "block",
  },
  desc: {
    maxWidth: "30em",
    margin: 0,
    paddingInlineStart: { default: 0, [breakpoints.lg]: 48 },
    fontSize: { default: 15, [breakpoints.lg]: 16 },
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: palette.body,
    textWrap: "pretty",
  },
  figure: {
    margin: 0,
    marginTop: { default: 48, [breakpoints.lg]: 96 },
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: { default: "4 / 3", [breakpoints.md]: "21 / 9" },
    backgroundColor: palette.page,
  },
  image: {
    objectPosition: "50% 56%",
  },
  outcomes: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    margin: 0,
    marginTop: { default: 40, [breakpoints.lg]: 72 },
    padding: 0,
    listStyle: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: palette.hairline,
  },
  outcome: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
    paddingBlock: { default: 20, [breakpoints.lg]: 32 },
    fontSize: { default: 18, [breakpoints.lg]: 20 },
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: palette.ink,
  },
  dot: {
    flexShrink: 0,
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: palette.mint,
  },
});

export function Csr() {
  return (
    <section id="about-csr" aria-label="社会责任" {...stylex.props(s.section, s.bandPaper)}>
      <div {...stylex.props(s.shell)}>
        <div {...stylex.props(styles.spread)}>
          <Fold side="rise">
            <h2 {...stylex.props(styles.statement)}>
              {ABOUT_CSR.statement.map((line) => (
                <span key={line} {...stylex.props(styles.statementLine)}>
                  {line}
                </span>
              ))}
            </h2>
          </Fold>
          <Fold side="rise" step={1}>
            <p {...stylex.props(styles.desc)}>{ABOUT_CSR.desc}</p>
          </Fold>
        </div>
        <Fold side="rise">
          <figure {...stylex.props(styles.figure)}>
            <div {...stylex.props(styles.frame)}>
              <img
                src={ABOUT_CSR.image}
                alt={ABOUT_CSR.imageAlt}
                loading="lazy"
                decoding="async"
                {...stylex.props(s.fill, styles.image)}
              />
            </div>
          </figure>
        </Fold>
        <ul {...stylex.props(styles.outcomes)}>
          {ABOUT_CSR.outcomes.map((outcome, idx) => (
            <Fold key={outcome.title} as="li" step={idx} innerSx={styles.outcome}>
              <span aria-hidden="true" {...stylex.props(styles.dot)} />
              <span>{outcome.title}</span>
            </Fold>
          ))}
        </ul>
      </div>
    </section>
  );
}
