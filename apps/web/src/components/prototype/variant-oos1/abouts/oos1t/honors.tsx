import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../about-data";
import { Cast } from "./cast";
import { LIFT } from "./cast-values";
import { Phrase } from "./phrase";
import { SectionHead } from "./head";
import { ui } from "./shared";
import { SECTION_HOURS } from "./sun";
import { bp, face, tone } from "./tokens.stylex";

type Level = (typeof ABOUT_HONORS.items)[number]["level"];

const TIERS: readonly { level: Level; label: string; english: string }[] = [
  { level: "national", label: "国家级", english: "National" },
  { level: "provincial", label: "省级", english: "Provincial" },
  { level: "municipal", label: "市级", english: "Municipal" },
];

const styles = stylex.create({
  wall: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 64, [bp.desktop]: 104 },
    marginTop: { default: 48, [bp.desktop]: 88 },
  },
  row: {
    rowGap: { default: 56, [bp.laptop]: 72, [bp.wide]: 0 },
    alignItems: "center",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  single: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "1 / span 6" },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  noon: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "8 / span 4" },
    margin: 0,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 20, [bp.desktop]: 24 },
    lineHeight: 1.35,
    color: tone.quiet,
  },
  plaque: {
    position: "relative",
  },
  face: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: { default: 12, [bp.desktop]: 16 },
    boxSizing: "border-box",
    paddingInline: { default: 18, [bp.desktop]: 32 },
    paddingBlock: 24,
    textAlign: "center",
    backgroundColor: tone.face,
    boxShadow: `inset 0 0 0 1px ${tone.edge}, inset 0 0 0 9px ${tone.face}, inset 0 0 0 10px ${tone.line}`,
  },
  level: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    margin: 0,
  },
  levelChinese: {
    fontFamily: face.sans,
    fontSize: 14,
    letterSpacing: "0.08em",
    color: tone.quiet,
  },
  levelSerif: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 16, [bp.desktop]: 18 },
    color: tone.navy,
  },
  rule: {
    display: "block",
    width: 28,
    height: 1,
    backgroundColor: tone.line,
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    color: tone.ink,
    textWrap: "balance",
  },
});

const tiers = stylex.create({
  national: {
    gridColumn: "auto",
  },
  provincial: {
    gridColumn: {
      default: "span 2",
      [bp.tablet]: "span 3",
      [bp.laptop]: "span 6",
      [bp.wide]: "span 3",
    },
  },
  municipal: {
    gridColumn: {
      default: "span 2",
      [bp.tablet]: "span 3",
      [bp.laptop]: "span 6",
      [bp.wide]: "span 4",
    },
  },
  lastOdd: {
    gridColumn: { default: "1 / -1", [bp.wide]: "span 4" },
  },
});

const faces = stylex.create({
  national: {
    minHeight: { default: 184, [bp.desktop]: 248 },
    fontSize: { default: 26, [bp.desktop]: 34 },
  },
  provincial: {
    minHeight: { default: 176, [bp.desktop]: 208 },
    fontSize: { default: 17, [bp.desktop]: 22 },
  },
  municipal: {
    minHeight: { default: 168, [bp.desktop]: 192 },
    fontSize: { default: 17, [bp.desktop]: 21 },
  },
});

export function Honors() {
  return (
    <section
      id="about-honor"
      aria-labelledby="oos1t-honor"
      data-hour={SECTION_HOURS.honor}
      {...stylex.props(ui.section, ui.shell)}
    >
      <SectionHead
        titleId="oos1t-honor"
        hour={SECTION_HOURS.honor}
        title={ABOUT_HONORS.title}
        english="Honors"
      />
      <div {...stylex.props(styles.wall)}>
        {TIERS.map((tier) => {
          const items = ABOUT_HONORS.items.filter((item) => item.level === tier.level);
          const oddTail = items.length > 1 && items.length % 2 === 1;
          const plaques = items.map((item, index) => (
            <li
              key={item.id}
              {...stylex.props(
                styles.plaque,
                tiers[tier.level],
                oddTail && index === items.length - 1 && tiers.lastOdd,
              )}
            >
              <Cast lift={LIFT.block} still />
              <div {...stylex.props(styles.face, faces[tier.level])}>
                <p {...stylex.props(styles.level)}>
                  <span {...stylex.props(styles.levelChinese)}>{tier.label}</span>
                  <span lang="en" {...stylex.props(styles.levelSerif)}>
                    {tier.english}
                  </span>
                </p>
                <span aria-hidden="true" {...stylex.props(styles.rule)} />
                <p {...stylex.props(styles.title)}>
                  <Phrase text={item.title} />
                </p>
              </div>
            </li>
          ));
          if (tier.level !== "national") {
            return (
              <ul key={tier.level} aria-label={tier.label} {...stylex.props(ui.grid, styles.row)}>
                {plaques}
              </ul>
            );
          }
          return (
            <div key={tier.level} {...stylex.props(ui.grid, styles.row)}>
              <ul aria-label={tier.label} {...stylex.props(styles.single)}>
                {plaques}
              </ul>
              <p lang="en" {...stylex.props(styles.noon)}>
                High noon. The sun stands overhead and every shadow is at its shortest.
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
