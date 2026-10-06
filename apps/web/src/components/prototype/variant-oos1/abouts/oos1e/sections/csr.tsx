import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../../about-data";
import { Sheet } from "../sheet";
import { base, Reveal } from "../shared";
import { CSR_SHEET } from "../sheets";
import { color, media } from "../tokens.stylex";

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.lgUp]: "minmax(0, 1fr) minmax(0, 0.9fr)",
    },
    columnGap: 96,
    rowGap: 56,
    alignItems: "center",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, [media.lgUp]: 40 },
  },
  statement: {
    margin: 0,
    fontSize: { default: 24, [media.md]: 36, [media.lgUp]: 38, [media.xlUp]: 44 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  desc: {
    margin: 0,
    maxWidth: "27em",
    fontSize: 15,
    lineHeight: 1.95,
    letterSpacing: "0.04em",
    color: color.body,
  },
  outcomes: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  outcome: {
    paddingBlock: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.hairline,
    fontSize: { default: 17, [media.lgUp]: 19 },
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: color.ink,
  },
  figure: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    aspectRatio: { default: "4 / 3", [media.lgUp]: "4 / 5" },
    borderRadius: 2,
    backgroundColor: color.tint,
  },
});

export function CsrSheet() {
  const [statementLead, statementClose] = ABOUT_CSR.statement;
  return (
    <Sheet def={CSR_SHEET}>
      <div {...stylex.props(styles.grid)}>
        <div {...stylex.props(styles.text)}>
          <Reveal>
            <p {...stylex.props(styles.statement)}>
              <span {...stylex.props(base.balance)}>{statementLead}</span>
              <span {...stylex.props(base.balance)}>{statementClose}</span>
            </p>
          </Reveal>
          <Reveal step={1}>
            <p {...stylex.props(styles.desc)}>
              <span {...stylex.props(base.balance)}>{ABOUT_CSR.desc}</span>
            </p>
          </Reveal>
          <Reveal step={2}>
            <ul {...stylex.props(styles.outcomes)}>
              {ABOUT_CSR.outcomes.map((outcome) => (
                <li key={outcome.title} {...stylex.props(styles.outcome)}>
                  {outcome.title}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal step={1}>
          <figure {...stylex.props(styles.figure)}>
            <img
              src={ABOUT_CSR.image}
              alt={ABOUT_CSR.imageAlt}
              loading="lazy"
              decoding="async"
              {...stylex.props(base.fill)}
            />
          </figure>
        </Reveal>
      </div>
    </Sheet>
  );
}
