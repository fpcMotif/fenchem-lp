import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { STATS } from "../../content";
import { fonts, media, palette } from "./lattice.stylex";
import { Frame, Reveal, SectionName } from "./parts";

const styles = stylex.create({
  band: {
    backgroundColor: palette.navy,
    color: colors.paper,
  },
  inner: {
    paddingTop: { default: 64, [media.tablet]: 96, [breakpoints.xl]: 120 },
    paddingBottom: { default: 72, [media.tablet]: 104, [breakpoints.xl]: 136 },
  },
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(16, minmax(0, 1fr))",
    },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxSizing: "border-box",
    paddingBlock: { default: 20, [breakpoints.lg]: 0 },
    paddingInlineStart: { default: 0, [breakpoints.lg]: 16 },
  },
  one: { gridColumn: { default: null, [breakpoints.lg]: "1 / span 4" } },
  two: { gridColumn: { default: null, [breakpoints.lg]: "5 / span 4" } },
  three: { gridColumn: { default: null, [breakpoints.lg]: "9 / span 8" } },
  label: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: palette.paleText,
  },
  figure: {
    margin: 0,
    fontFamily: fonts.display,
    fontSize: {
      default: 76,
      [media.mdOnly]: 120,
      [breakpoints.lg]: "clamp(88px, 9.6vw, 144px)",
    },
    fontWeight: 500,
    lineHeight: 0.95,
    letterSpacing: "-0.04em",
    fontVariantNumeric: "tabular-nums",
    color: colors.paper,
  },
  unit: {
    marginInlineStart: "0.06em",
    fontSize: "0.34em",
    letterSpacing: "0",
    color: palette.mint,
  },
  caption: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: palette.paleText,
  },
});

const COLUMN_STYLES = [styles.one, styles.two, styles.three] as const;

export function StatsBand() {
  return (
    <section id="about-stats" aria-labelledby="about-stats-title" {...stylex.props(styles.band)}>
      <SectionName id="about-stats-title">Growth figures</SectionName>
      <Frame lattice="quiet" tone="dark" innerSx={styles.inner}>
        <ul {...stylex.props(styles.list)}>
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} as="li" step={index} sx={[styles.stat, COLUMN_STYLES[index]]}>
              <p {...stylex.props(styles.label)}>{stat.label}</p>
              <p {...stylex.props(styles.figure)}>
                <span>{stat.value}</span>
                {stat.unit ? (
                  <span lang="en" {...stylex.props(styles.unit)}>
                    {stat.unit}
                  </span>
                ) : null}
              </p>
              <p {...stylex.props(styles.caption)}>{stat.caption}</p>
            </Reveal>
          ))}
        </ul>
      </Frame>
    </section>
  );
}
