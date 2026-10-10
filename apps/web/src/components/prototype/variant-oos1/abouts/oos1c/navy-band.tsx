import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { ABOUT_HONORS, ABOUT_STRUCTURE } from "../../about-data";
import { Reveal } from "./reveal";
import { mq, tone } from "./tokens.stylex";
import { ui } from "./ui";

const LEVELS = [
  { level: "national", label: "国家级", english: "National" },
  { level: "provincial", label: "江苏省级", english: "Provincial" },
  { level: "municipal", label: "南京市级", english: "Municipal" },
] as const;

const styles = stylex.create({
  band: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, [mq.xl]: 40 },
    paddingBlock: { default: 40, [mq.xl]: 48 },
    backgroundColor: tone.navy,
    color: colors.paper,
  },
  head: {
    marginBottom: { default: 16, [mq.xl]: 20 },
  },
  eyebrow: {
    margin: 0,
    marginBottom: 12,
    fontFamily: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: tone.onNavyMuted,
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [mq.tablet]: 32, [mq.xl]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: colors.paper,
  },
  level: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [mq.lg]: "200px minmax(0, 1fr)" },
    gap: { default: 16, [mq.lg]: 40 },
    paddingBlock: { default: 16, [mq.xl]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.onNavyLine,
  },
  levelLabel: {
    margin: 0,
    paddingTop: { default: 0, [mq.lg]: 8 },
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.12em",
    color: tone.onNavyMuted,
  },
  honorList: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [mq.sm]: "repeat(2, minmax(0, 1fr))",
    },
    gap: { default: "10px 32px", [mq.xl]: "12px 56px" },
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
  honorLead: {
    gridColumn: "1 / -1",
    fontSize: { default: 28, [mq.tablet]: 34, [mq.xl]: 44 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.1em",
    color: colors.paper,
  },
  structure: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [mq.lg]: "minmax(0, 0.42fr) minmax(0, 0.58fr)" },
    columnGap: { default: 0, [mq.lg]: 64, [mq.xl]: 96 },
    rowGap: { default: 40, [mq.xl]: 56 },
    alignItems: "start",
  },
  holding: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  holdingLabel: {
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.12em",
    color: tone.onNavyMuted,
  },
  holdingName: {
    margin: 0,
    fontSize: { default: 28, [mq.tablet]: 34, [mq.xl]: 40 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.06em",
    textWrap: "balance",
  },
  holdingEnglish: {
    fontSize: 14,
    fontWeight: 400,
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

export function NavyBand() {
  const subsLabelId = useId();

  return (
    <div {...stylex.props(styles.band)}>
      <section
        id="about-honor"
        aria-labelledby="about-honor-title"
        {...stylex.props(ui.shell, ui.inset, ui.anchor)}
      >
        <Reveal sx={styles.head}>
          <p lang="en" {...stylex.props(styles.eyebrow)}>
            {ABOUT_HONORS.eyebrow}
          </p>
          <h2 id="about-honor-title" {...stylex.props(styles.title)}>
            {ABOUT_HONORS.title}
          </h2>
        </Reveal>
        {LEVELS.map((entry) => {
          const items = ABOUT_HONORS.items.filter((item) => item.level === entry.level);
          if (items.length === 0) return null;
          return (
            <Reveal key={entry.level} sx={styles.level}>
              <h3 {...stylex.props(styles.levelLabel)}>{entry.label}</h3>
              <ul aria-label={`${entry.english} honors`} {...stylex.props(styles.honorList)}>
                {items.map((honor) => (
                  <li
                    key={honor.id}
                    {...stylex.props(styles.honor, entry.level === "national" && styles.honorLead)}
                  >
                    {honor.title}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </section>

      <section
        id="about-structure"
        aria-labelledby="about-structure-title"
        {...stylex.props(ui.shell, ui.inset, ui.anchor)}
      >
        <Reveal sx={styles.head}>
          <p lang="en" {...stylex.props(styles.eyebrow)}>
            {ABOUT_STRUCTURE.eyebrow}
          </p>
          <h2 id="about-structure-title" {...stylex.props(styles.title)}>
            {ABOUT_STRUCTURE.title}
          </h2>
        </Reveal>
        <div {...stylex.props(styles.structure)}>
          <Reveal sx={styles.holding}>
            <p {...stylex.props(styles.holdingLabel)}>{ABOUT_STRUCTURE.holding.badge}</p>
            <h3 {...stylex.props(styles.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
            <div lang="en" {...stylex.props(styles.holdingEnglish)}>
              {ABOUT_STRUCTURE.holding.english}
            </div>
          </Reveal>

          <div {...stylex.props(styles.holding)}>
            <p id={subsLabelId} {...stylex.props(styles.holdingLabel)}>
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
