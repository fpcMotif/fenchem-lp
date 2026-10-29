import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { Reveal } from "./abouts/oos1c/reveal";
import { mq, tone } from "./abouts/oos1c/tokens.stylex";
import { ui } from "./abouts/oos1c/ui";
import { ABOUT_HONORS, ABOUT_STRUCTURE } from "./about-data";
import { kitStyles } from "./subpage-kit";

const BAND_BLUE = "#294f92";

const LEVELS = [
  { level: "national", english: "National" },
  { level: "provincial", english: "Provincial" },
  { level: "municipal", english: "Municipal" },
] as const;

const styles = stylex.create({
  band: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 64, [mq.xl]: 96 },
    paddingTop: { default: 72, [mq.xl]: 128 },
    paddingBottom: { default: 72, [mq.xl]: 123 },
    backgroundColor: BAND_BLUE,
    color: colors.paper,
  },
  title: {
    margin: 0,
    paddingBlock: 12,
    fontSize: { default: 26, [mq.tablet]: 32, [mq.xl]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: colors.paper,
  },
  honorsHead: {
    marginBottom: { default: 20, [mq.xl]: 28 },
  },
  level: {
    paddingBlock: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.onNavyLine,
  },
  levelFirst: {
    paddingBottom: { default: 20, [mq.xl]: 21 },
    borderTopWidth: 0,
  },
  honorList: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [mq.sm]: "repeat(2, minmax(0, 452px))",
      [mq.xl]: "minmax(0, 452fr) minmax(0, 640fr)",
    },
    gap: { default: "12px 32px", [mq.xl]: "12px 9%" },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  honor: {
    fontSize: { default: 18, [mq.md]: 20 },
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: "0.08em",
    color: tone.onNavy,
    textWrap: "balance",
  },
  structureHead: {
    marginBottom: { default: 32, [mq.xl]: 48 },
  },
  structure: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [mq.lg]: "minmax(0, 464fr) minmax(0, 640fr)",
    },
    columnGap: { default: 0, [mq.lg]: 64, [mq.xl]: 96 },
    rowGap: { default: 40, [mq.xl]: 56 },
    alignItems: "start",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  label: {
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "17px",
    letterSpacing: "0.12em",
    color: tone.onNavyMuted,
  },
  holdingName: {
    margin: 0,
    fontSize: 20,
    fontWeight: 500,
    lineHeight: "54px",
    letterSpacing: "0.12em",
    textWrap: "balance",
  },
  holdingEnglish: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "17px",
    letterSpacing: "0.03em",
    color: tone.onNavyMuted,
  },
  subs: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.onNavyLine,
  },
  sub: {
    display: "flex",
    flexDirection: { default: "column", [mq.sm]: "row" },
    alignItems: { default: "flex-start", [mq.sm]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 6, [mq.sm]: 24 },
    paddingBlock: 14,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.onNavyLine,
  },
  subName: {
    margin: 0,
    fontSize: { default: 16, [mq.md]: 18 },
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    color: tone.onNavy,
  },
  subEnglish: {
    flexShrink: 0,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.03em",
    color: tone.onNavyFaint,
  },
});

export function AboutNavyBand() {
  const subsLabelId = useId();
  const levels = LEVELS.map((entry) => ({
    ...entry,
    items: ABOUT_HONORS.items.filter((item) => item.level === entry.level),
  })).filter((entry) => entry.items.length > 0);

  return (
    <div {...stylex.props(styles.band)}>
      <section
        id="about-honor"
        aria-labelledby="about-honor-title"
        {...stylex.props(kitStyles.shell, kitStyles.inset120, ui.anchor)}
      >
        <Reveal sx={styles.honorsHead}>
          <h2 id="about-honor-title" {...stylex.props(styles.title)}>
            {ABOUT_HONORS.title}
          </h2>
        </Reveal>
        {levels.map((entry, index) => (
          <Reveal key={entry.level} sx={[styles.level, index === 0 && styles.levelFirst]}>
            <ul aria-label={`${entry.english} honors`} {...stylex.props(styles.honorList)}>
              {entry.items.map((honor) => (
                <li key={honor.id} {...stylex.props(styles.honor)}>
                  {honor.title}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <section
        id="about-structure"
        aria-labelledby="about-structure-title"
        {...stylex.props(kitStyles.shell, kitStyles.inset120, ui.anchor)}
      >
        <Reveal sx={styles.structureHead}>
          <h2 id="about-structure-title" {...stylex.props(styles.title)}>
            {ABOUT_STRUCTURE.title}
          </h2>
        </Reveal>
        <div {...stylex.props(styles.structure)}>
          <Reveal sx={styles.column}>
            <p {...stylex.props(styles.label)}>{ABOUT_STRUCTURE.holding.badge}</p>
            <h3 {...stylex.props(styles.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
            <div lang="en" {...stylex.props(styles.holdingEnglish)}>
              {ABOUT_STRUCTURE.holding.english}
            </div>
          </Reveal>

          <div {...stylex.props(styles.column)}>
            <p id={subsLabelId} {...stylex.props(styles.label)}>
              {ABOUT_STRUCTURE.subsidiaryBadge}
            </p>
            <ul aria-labelledby={subsLabelId} {...stylex.props(styles.subs)}>
              {ABOUT_STRUCTURE.subsidiaries.map((sub, index) => (
                <Reveal key={sub.id} as="li" step={index} sx={styles.sub}>
                  <h4 {...stylex.props(styles.subName)}>{sub.name}</h4>
                  <span lang="en" {...stylex.props(styles.subEnglish)}>
                    {sub.english}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
