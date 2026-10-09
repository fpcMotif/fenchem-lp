import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { Bevel, Mat, SectionHead, Tag, useArrived } from "./shared";
import { ROMAN, bevel, stepIn, ui } from "./shared-values";
import { bp, face, space, tone } from "./tokens.stylex";

const styles = stylex.create({
  plate: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
  },
  photo: {
    position: "relative",
    gridArea: "1 / 1",
    aspectRatio: { default: "4 / 3", [bp.tablet]: "16 / 9", [bp.desktop]: "2400 / 1100" },
    overflow: "hidden",
    backgroundColor: tone.whisper,
  },
  image: {
    objectPosition: "50% 60%",
  },
  window: {
    position: "relative",
    gridArea: { default: "2 / 1", [bp.desktop]: "1 / 1" },
    justifySelf: { default: "stretch", [bp.desktop]: "end" },
    alignSelf: { default: "stretch", [bp.desktop]: "end" },
    width: { default: "auto", [bp.desktop]: "42%" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    boxSizing: "border-box",
    margin: { default: 0, [bp.desktop]: space.mat },
    marginTop: { default: 12, [bp.tablet]: 16, [bp.desktop]: space.mat },
    padding: { default: "28px 20px 24px", [bp.tablet]: "36px 32px 32px", [bp.desktop]: "40px" },
    backgroundColor: tone.page,
  },
  statement: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 20, [bp.tablet]: 28, [bp.laptop]: 22, [bp.wide]: 32 },
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: tone.navy,
  },
  line: {
    display: "block",
  },
  desc: {
    margin: 0,
    marginTop: { default: 16, [bp.desktop]: 22 },
    maxWidth: { default: "26em", [bp.desktop]: "17em" },
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.tablet]: 17, [bp.desktop]: 18 },
    lineHeight: 1.8,
    color: tone.ink,
    textWrap: "pretty",
  },
  outcomes: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.upTablet]: "repeat(3, minmax(0, 1fr))" },
    rowGap: 10,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  outcome: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    paddingInlineStart: { default: 0, [bp.upTablet]: 20 },
    borderInlineStartWidth: { default: 0, [bp.upTablet]: 1 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: tone.rule,
  },
  outcomeFirst: {
    paddingInlineStart: 0,
    borderInlineStartWidth: 0,
  },
  numeral: {
    minWidth: 22,
    fontFamily: face.latin,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.navy,
  },
  outcomeTitle: {
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 19 },
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
});

export function Csr() {
  const [ref, arrived] = useArrived<HTMLDivElement>();
  return (
    <section
      id="about-csr"
      aria-labelledby="oos1b-csr"
      {...stylex.props(ui.anchor, ui.section, ui.shell)}
    >
      <SectionHead
        id="oos1b-csr"
        index={4}
        eyebrow="Responsibility"
        title={ABOUT_CSR.title}
        note="Ecology and demand, kept in balance."
      />
      <div ref={ref} {...stylex.props(...stepIn(arrived, 0))}>
        <Mat
          raised
          foot={
            <ul {...stylex.props(styles.outcomes)}>
              {ABOUT_CSR.outcomes.map((outcome, index) => (
                <li
                  key={outcome.title}
                  {...stylex.props(styles.outcome, index === 0 && styles.outcomeFirst)}
                >
                  <span lang="en" {...stylex.props(styles.numeral)}>
                    {ROMAN[index].toLowerCase()}
                  </span>
                  <span {...stylex.props(styles.outcomeTitle)}>{outcome.title}</span>
                </li>
              ))}
            </ul>
          }
        >
          <Tag numeral="I" />
          <Bevel>
            <div {...stylex.props(styles.plate)}>
              <div {...stylex.props(styles.photo)}>
                <img
                  src={ABOUT_CSR.image}
                  alt={ABOUT_CSR.imageAlt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(ui.fill, styles.image)}
                />
              </div>
              <div {...stylex.props(styles.window, bevel.edge, ...stepIn(arrived, 2))}>
                <Tag numeral="II" />
                <p {...stylex.props(styles.statement)}>
                  {ABOUT_CSR.statement.map((line) => (
                    <span key={line} {...stylex.props(styles.line)}>
                      {line}
                    </span>
                  ))}
                </p>
                <p {...stylex.props(styles.desc)}>{ABOUT_CSR.desc}</p>
              </div>
            </div>
          </Bevel>
        </Mat>
      </div>
    </section>
  );
}
