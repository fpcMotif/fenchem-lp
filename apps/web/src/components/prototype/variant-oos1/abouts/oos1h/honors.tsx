import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../about-data";
import { Reveal } from "./reveal";
import { shared } from "./shared";
import { ui } from "./theme.stylex";

const styles = stylex.create({
  section: {
    backgroundColor: ui.surface,
  },
  levels: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 64, ["@media (min-width: 1280px)"]: 96 },
  },
  level: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1280px)"]: "minmax(0, 3fr) minmax(0, 9fr)",
    },
    columnGap: 48,
    rowGap: 20,
  },
  levelName: {
    margin: 0,
    paddingTop: { default: 0, ["@media (min-width: 1280px)"]: 26 },
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.12em",
    color: ui.body,
  },
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 768px)"]: "repeat(2, minmax(0, 1fr))",
    },
    columnGap: 48,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  item: {
    paddingBlock: 22,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: ui.hairline,
    fontSize: { default: 18, ["@media (min-width: 1280px)"]: 20 },
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.05em",
    color: ui.ink,
  },
  itemNational: {
    gridColumn: { default: "auto", ["@media (min-width: 768px)"]: "1 / -1" },
    fontSize: { default: 24, ["@media (min-width: 1280px)"]: 32 },
    fontWeight: 500,
  },
});

const LEVELS = [
  { level: "national", label: "国家级" },
  { level: "provincial", label: "江苏省级" },
  { level: "municipal", label: "南京市级" },
] as const;

export function Honors() {
  return (
    <section
      id="about-honor"
      aria-labelledby="about-honor-title"
      {...stylex.attrs(shared.anchor, shared.section, styles.section)}
    >
      <h2 id="about-honor-title" {...stylex.attrs(shared.srOnly)}>
        {ABOUT_HONORS.eyebrow}
      </h2>
      <div {...stylex.attrs(shared.shell, shared.inset)}>
        <div {...stylex.attrs(styles.levels)}>
          {LEVELS.map(({ level, label }) => (
            <Reveal sx={styles.level}>
              <h3 {...stylex.attrs(styles.levelName)}>{label}</h3>
              <ul {...stylex.attrs(styles.list)}>
                {ABOUT_HONORS.items
                  .filter((honor) => honor.level === level)
                  .map((honor) => (
                    <li {...stylex.attrs(styles.item, level === "national" && styles.itemNational)}>
                      {honor.title}
                    </li>
                  ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
