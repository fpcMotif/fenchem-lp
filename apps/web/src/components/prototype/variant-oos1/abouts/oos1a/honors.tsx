import { colors } from "@fenchem-lp/ui/tokens.stylex";
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
      ["@media (min-width: 1024px)"]: "repeat(16, minmax(0, 1fr))",
    },
    rowGap: 8,
    paddingBlock: { default: 28, ["@media (min-width: 1024px)"]: 40 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: palette.inkRule,
  },
  level: {
    gridColumn: { default: null, ["@media (min-width: 1024px)"]: "1 / span 4" },
    paddingTop: { default: 0, ["@media (min-width: 1024px)"]: 6 },
  },
  items: {
    gridColumn: { default: null, ["@media (min-width: 1024px)"]: "5 / span 12" },
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.smBelowLg]: "repeat(2, minmax(0, 1fr))",
      ["@media (min-width: 1024px)"]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [media.smBelowLg]: 32 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  itemsNational: {
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1024px)"]: "repeat(12, minmax(0, 1fr))",
    },
  },
  spanNational: { gridColumn: { default: null, ["@media (min-width: 1024px)"]: "span 12" } },
  spanHalf: { gridColumn: { default: null, ["@media (min-width: 1024px)"]: "span 6" } },
  title: {
    margin: 0,
    paddingBlock: 12,
    paddingInlineEnd: 24,
    fontFamily: fonts.cjk,
    fontSize: { default: 19, ["@media (min-width: 1280px)"]: 22 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.05em",
    color: palette.ink,
    textWrap: "balance",
  },
  titleNational: {
    paddingBlock: 0,
    fontSize: { default: 28, [media.tablet]: 40, ["@media (min-width: 1280px)"]: 48 },
    lineHeight: 1.25,
  },
});

export function Honors() {
  return (
    <section
      id="about-honor"
      aria-labelledby="about-honor-title"
      {...stylex.attrs(styles.section, shared.anchor)}
    >
      <SectionName id="about-honor-title">{ABOUT_HONORS.eyebrow}</SectionName>
      <Frame innerSx={shared.sectionPad}>
        {LEVELS.map(({ level, label }) => {
          const items = ABOUT_HONORS.items.filter((item) => item.level === level);
          const national = level === "national";
          const labelId = `about-honor-${level}`;
          return (
            <Reveal sx={styles.group}>
              <p id={labelId} {...stylex.attrs(shared.small, styles.level)}>
                {label}
              </p>
              <ul
                aria-labelledby={labelId}
                {...stylex.attrs(styles.items, national && styles.itemsNational)}
              >
                {items.map((honor) => (
                  <li {...stylex.attrs(national ? styles.spanNational : styles.spanHalf)}>
                    <h3 {...stylex.attrs(styles.title, national && styles.titleNational)}>
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
