import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../about-data";
import { fonts, media, palette } from "./lattice.stylex";
import { Frame, Reveal, SectionName } from "./parts";
import { shared } from "./parts-values";

type Level = (typeof ABOUT_HONORS.items)[number]["level"];

const LEVELS: readonly { level: Level; label: string }[] = [
  { level: "national", label: "国家级" },
  { level: "provincial", label: "江苏省级" },
  { level: "municipal", label: "南京市级" },
];

const styles = stylex.create({
  section: {
    backgroundColor: colors.paper,
  },
  group: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(16, minmax(0, 1fr))",
    },
    rowGap: 8,
    paddingBlock: { default: 28, [breakpoints.lg]: 40 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: palette.inkRule,
  },
  level: {
    gridColumn: { default: null, [breakpoints.lg]: "1 / span 4" },
    paddingTop: { default: 0, [breakpoints.lg]: 6 },
  },
  items: {
    gridColumn: { default: null, [breakpoints.lg]: "5 / span 12" },
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.smBelowLg]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [media.smBelowLg]: 32 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  itemsNational: {
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
  },
  spanNational: { gridColumn: { default: null, [breakpoints.lg]: "span 12" } },
  spanHalf: { gridColumn: { default: null, [breakpoints.lg]: "span 6" } },
  title: {
    margin: 0,
    paddingBlock: 12,
    paddingInlineEnd: 24,
    fontFamily: fonts.cjk,
    fontSize: { default: 19, [breakpoints.xl]: 22 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.05em",
    color: palette.ink,
    textWrap: "balance",
  },
  titleNational: {
    paddingBlock: 0,
    fontSize: { default: 28, [media.tablet]: 40, [breakpoints.xl]: 48 },
    lineHeight: 1.25,
  },
});

export function Honors() {
  return (
    <section
      id="about-honor"
      aria-labelledby="about-honor-title"
      {...stylex.props(styles.section, shared.anchor)}
    >
      <SectionName id="about-honor-title">{ABOUT_HONORS.title}</SectionName>
      <Frame innerSx={shared.sectionPad}>
        {LEVELS.map(({ level, label }) => {
          const items = ABOUT_HONORS.items.filter((item) => item.level === level);
          const national = level === "national";
          const labelId = `about-honor-${level}`;
          return (
            <Reveal key={level} sx={styles.group}>
              <p id={labelId} {...stylex.props(shared.small, styles.level)}>
                {label}
              </p>
              <ul
                aria-labelledby={labelId}
                {...stylex.props(styles.items, national && styles.itemsNational)}
              >
                {items.map((honor) => (
                  <li
                    key={honor.id}
                    {...stylex.props(national ? styles.spanNational : styles.spanHalf)}
                  >
                    <h3 {...stylex.props(styles.title, national && styles.titleNational)}>
                      {honor.title}
                    </h3>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </Frame>
    </section>
  );
}
