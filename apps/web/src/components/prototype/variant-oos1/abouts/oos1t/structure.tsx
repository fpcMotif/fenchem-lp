import * as stylex from "@stylexjs/stylex";

import { ABOUT_STRUCTURE } from "../../about-data";
import { Cast } from "./cast";
import { LIFT } from "./cast-values";
import { Phrase } from "./phrase";
import { SectionHead } from "./head";
import { ui } from "./shared";
import { SECTION_HOURS } from "./sun";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  body: {
    marginTop: { default: 48, [bp.desktop]: 80 },
  },
  holding: {
    position: "relative",
  },
  block: {
    position: "relative",
    zIndex: 1,
    boxSizing: "border-box",
    backgroundColor: tone.face,
    boxShadow: `inset 0 0 0 1px ${tone.edge}`,
  },
  holdingFace: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [bp.desktop]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    rowGap: 12,
    alignItems: "end",
    minHeight: { default: 184, [bp.desktop]: 232 },
    padding: { default: "22px 20px 24px", [bp.desktop]: "32px 0 36px" },
  },
  badge: {
    gridColumn: { default: "auto", [bp.desktop]: "2 / span 2" },
    alignSelf: "start",
    margin: 0,
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.quiet,
  },
  holdingName: {
    gridColumn: { default: "auto", [bp.desktop]: "4 / span 8" },
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 700,
    fontSize: { default: 24, [bp.tablet]: 30, [bp.desktop]: 36 },
    lineHeight: 1.3,
    color: tone.ink,
  },
  holdingEnglish: {
    display: "block",
    marginTop: 8,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: { default: 19, [bp.desktop]: 24 },
    color: tone.quiet,
  },
  rowLabel: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    marginInline: 0,
    marginBottom: 0,
    marginTop: { default: 72, [bp.desktop]: 104 },
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.quiet,
  },
  rowEnglish: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 16,
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [bp.tablet]: "repeat(2, minmax(0, 1fr))",
      [bp.laptop]: "repeat(3, minmax(0, 1fr))",
      [bp.wide]: "repeat(5, minmax(0, 1fr))",
    },
    columnGap: { default: 28, [bp.tablet]: 40, [bp.desktop]: 32 },
    rowGap: { default: 48, [bp.tablet]: 72 },
    marginBlock: "20px 0",
    marginInline: 0,
    padding: 0,
    listStyleType: "none",
  },
  subsidiary: {
    position: "relative",
  },
  subFace: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 20,
    minHeight: { default: 112, [bp.desktop]: 184 },
    padding: { default: "18px 18px 20px", [bp.desktop]: "22px 20px 24px" },
  },
  index: {
    fontFamily: face.serif,
    fontSize: 22,
    lineHeight: 1,
    color: tone.navy,
  },
  subName: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 700,
    fontSize: { default: 16, [bp.desktop]: 17, [bp.wide]: "clamp(16px, 1.18vw, 17px)" },
    lineHeight: 1.45,
    color: tone.ink,
  },
  subEnglish: {
    display: "block",
    marginTop: 6,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: 15,
    color: tone.quiet,
  },
});

export function Structure() {
  const { holding, subsidiaries, subsidiaryBadge } = ABOUT_STRUCTURE;
  return (
    <section
      id="about-structure"
      aria-labelledby="oos1t-structure"
      data-hour={SECTION_HOURS.structure}
      {...stylex.props(ui.section, ui.shell)}
    >
      <SectionHead
        titleId="oos1t-structure"
        hour={SECTION_HOURS.structure}
        title={ABOUT_STRUCTURE.title}
        english="Structure"
      />
      <div {...stylex.props(styles.body)}>
        <div {...stylex.props(styles.holding)}>
          <Cast lift={LIFT.block} />
          <div {...stylex.props(styles.block, styles.holdingFace)}>
            <p {...stylex.props(styles.badge)}>{holding.badge}</p>
            <h3 {...stylex.props(styles.holdingName)}>
              <Phrase text={holding.name} />
              <span lang="en" {...stylex.props(styles.holdingEnglish)}>
                {holding.english}
              </span>
            </h3>
          </div>
        </div>
        <p {...stylex.props(styles.rowLabel)}>
          <span>{subsidiaryBadge}</span>
          <span lang="en" {...stylex.props(styles.rowEnglish)}>
            Wholly owned
          </span>
        </p>
        <ul {...stylex.props(styles.row)}>
          {subsidiaries.map((company, index) => (
            <li key={company.id} {...stylex.props(styles.subsidiary)}>
              <Cast lift={LIFT.block} />
              <div {...stylex.props(styles.block, styles.subFace)}>
                <span aria-hidden="true" {...stylex.props(styles.index)}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 {...stylex.props(styles.subName)}>
                  <Phrase text={company.name} />
                  <span lang="en" {...stylex.props(styles.subEnglish)}>
                    {company.english}
                  </span>
                </h4>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
