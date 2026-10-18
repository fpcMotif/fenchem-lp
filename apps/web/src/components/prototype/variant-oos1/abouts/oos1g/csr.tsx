import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { layout } from "./layout";
import { media, palette } from "./palette.stylex";
import { Reveal } from "./reveal";

const LG = "@media (min-width: 1024px)";
const EDGE = "min(72px, 5.2vw)";
const SCRIM =
  "linear-gradient(to bottom, rgba(6, 28, 66, 0.72) 0%, rgba(6, 28, 66, 0.84) 50%, rgba(6, 28, 66, 0.94) 100%)";
const STAIR = 0.36;

const styles = stylex.create({
  section: {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    paddingBlock: { default: 72, [media.tablet]: 96, [LG]: 144 },
    backgroundColor: palette.navy,
    color: "#ffffff",
  },
  scrim: {
    zIndex: -1,
    backgroundImage: SCRIM,
    pointerEvents: "none",
  },
  media: {
    zIndex: -2,
    objectPosition: "50% 44%",
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 48, [LG]: 96 },
  },
  statement: {
    display: { default: "block", [LG]: "grid" },
    gridTemplateColumns: { default: "none", [LG]: "minmax(0, 1fr) minmax(0, 1fr)" },
    margin: 0,
    boxSizing: "border-box",
    paddingInline: {
      default: 20,
      ["@media (min-width: 640px)"]: 28,
      [media.tablet]: 40,
      [LG]: EDGE,
    },
    paddingBlock: { default: 0, [LG]: "0.5em" },
    fontFamily: palette.fontBody,
    fontSize: {
      default: "clamp(22px, 6.8vw, 30px)",
      [media.tablet]: 40,
      [LG]: "min(3.1vw, 46px)",
    },
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: "0.02em",
  },
  statementLead: {
    display: "block",
    textAlign: { default: "start", [LG]: "end" },
    paddingInlineEnd: { default: 0, [LG]: 28 },
    transform: { default: null, [LG]: `translateY(-${STAIR}em)` },
  },
  statementClose: {
    display: "block",
    paddingInlineStart: { default: 28, [LG]: 28 },
    transform: { default: null, [LG]: `translateY(${STAIR}em)` },
  },
  desc: {
    margin: 0,
    maxWidth: "28em",
    fontSize: { default: 16, [LG]: 17 },
    lineHeight: 2,
    letterSpacing: "0.05em",
    color: "rgba(255, 255, 255, 0.86)",
    textWrap: "pretty",
  },
  outcomes: {
    display: "flex",
    flexDirection: "column",
    marginBlock: 0,
    paddingInline: 0,
    listStyle: "none",
  },
  outcome: {
    paddingBlock: { default: 18, [LG]: 22 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: palette.hairlineOnDark,
    fontSize: { default: 18, [LG]: 20 },
    fontWeight: 400,
    letterSpacing: "0.08em",
  },
});

export function Csr() {
  const [statementLead, statementClose] = ABOUT_CSR.statement;

  return (
    <section
      id="about-csr"
      aria-labelledby="about-csr-title"
      {...stylex.attrs(styles.section, layout.anchor)}
    >
      <h2 id="about-csr-title" {...stylex.attrs(layout.srOnly)}>
        Responsibility
      </h2>
      <img
        src={ABOUT_CSR.image}
        alt={ABOUT_CSR.imageAlt}
        loading="lazy"
        decoding="async"
        {...stylex.attrs(layout.fill, styles.media)}
      />
      <div aria-hidden="true" {...stylex.attrs(layout.fillBox, styles.scrim)} />
      <div {...stylex.attrs(layout.shell, styles.inner)}>
        <Reveal>
          <p {...stylex.attrs(styles.statement)}>
            <span {...stylex.attrs(styles.statementLead)}>{statementLead}</span>
            <span {...stylex.attrs(styles.statementClose)}>{statementClose}</span>
          </p>
        </Reveal>
        <div {...stylex.attrs(layout.split)}>
          <Reveal sx={[layout.padLeft, layout.seam]}>
            <p {...stylex.attrs(styles.desc)}>{ABOUT_CSR.desc}</p>
          </Reveal>
          <Reveal step={1} sx={layout.padRight}>
            <ul {...stylex.attrs(styles.outcomes)}>
              {ABOUT_CSR.outcomes.map((outcome) => (
                <li {...stylex.attrs(styles.outcome)}>{outcome.title}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
