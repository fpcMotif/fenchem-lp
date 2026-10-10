import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
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
    rowGap: { default: 40, [breakpoints.lg]: 56 },
    fontFamily: font.cjk,
  },
  tier: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 3fr) minmax(0, 9fr)",
    },
    columnGap: 40,
    rowGap: 12,
    alignItems: "start",
  },
  level: {
    margin: 0,
    paddingBlock: { default: 0, [breakpoints.lg]: 18 },
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
    fontSize: { default: 20, [breakpoints.lg]: 24 },
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
            <div key={tier.level} {...stylex.props(styles.tier)}>
              <h3 {...stylex.props(styles.level)}>{tier.label}</h3>
              <ul {...stylex.props(styles.items)}>
                {ABOUT_HONORS.items
                  .filter((honor) => honor.level === tier.level)
                  .map((honor) => (
                    <li key={honor.id} {...stylex.props(styles.item)}>
                      {honor.title}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </Shell>
    </Section>
  );
}
