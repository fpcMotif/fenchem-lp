import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../about-data";
import { NodeMarker, Reveal, Section, Shell } from "./layout";
import { color, font } from "./palette.stylex";

const TIERS = [
  { level: "national", label: "国家级" },
  { level: "provincial", label: "江苏省级" },
  { level: "municipal", label: "南京市级" },
] as const;

const styles = stylex.create({
  tiers: {
    display: "flex",
    flexDirection: "column",
    rowGap: { default: 40, ["@media (min-width: 1024px)"]: 56 },
    fontFamily: font.cjk,
  },
  tier: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1024px)"]: "minmax(0, 3fr) minmax(0, 9fr)",
    },
    columnGap: 40,
    rowGap: 12,
    alignItems: "start",
  },
  level: {
    margin: 0,
    paddingBlock: { default: 0, ["@media (min-width: 1024px)"]: 18 },
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: color.body,
  },
  items: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  item: {
    paddingBlock: 18,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.hairline,
    fontSize: { default: 20, ["@media (min-width: 1024px)"]: 24 },
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: color.ink,
  },
});

export function Honors() {
  return (
    <Section id="about-honor" name={ABOUT_HONORS.eyebrow}>
      <Shell>
        <NodeMarker />
        <Reveal sx={styles.tiers}>
          {TIERS.map((tier) => (
            <div {...stylex.attrs(styles.tier)}>
              <h3 {...stylex.attrs(styles.level)}>{tier.label}</h3>
              <ul {...stylex.attrs(styles.items)}>
                {ABOUT_HONORS.items
                  .filter((honor) => honor.level === tier.level)
                  .map((honor) => (
                    <li {...stylex.attrs(styles.item)}>{honor.title}</li>
                  ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </Shell>
    </Section>
  );
}
