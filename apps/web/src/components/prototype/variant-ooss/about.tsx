import * as stylex from "@stylexjs/stylex";

import { CAMPUS, STATS } from "./content";
import { Reveal } from "./motion";
import { color, font, layout as layoutTokens, media } from "./tokens.stylex";
import { SectionTitle } from "./ui";
import { layout } from "./ui-values";

const styles = stylex.create({
  grid: {
    display: { default: "block", [media.tabletUp]: "grid" },
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    columnGap: layoutTokens.gutter,
    alignItems: "start",
  },
  head: {
    gridColumn: { default: "1 / -1", [media.desktop]: "1 / span 5" },
  },
  lead: {
    margin: 0,
    marginTop: 24,
    fontFamily: font.cjk,
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 1.7,
    color: color.inkMuted,
  },
  statsSlot: {
    gridColumn: { default: "1 / -1", [media.desktop]: "7 / -1" },
    marginTop: { default: 48, [media.tablet]: 64, [media.desktop]: 0 },
  },
  stats: {
    margin: 0,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: color.rule,
  },
  row: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    paddingBlock: { default: 28, [media.tablet]: 36, [media.desktop]: 40 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.rule,
  },
  label: {
    margin: 0,
    fontFamily: font.cjk,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.4,
    color: color.inkMuted,
  },
  figure: {
    display: "flex",
    alignItems: "baseline",
    margin: 0,
    fontFamily: font.display,
    fontSize: { default: 56, [media.tablet]: 72, [media.desktop]: 88 },
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
    color: color.ink,
  },
  unit: {
    display: "inline-block",
    minWidth: "1.5em",
    paddingInlineStart: "0.12em",
    fontSize: "0.4em",
    letterSpacing: 0,
  },
});

export function Campus() {
  return (
    <section id="campus" aria-labelledby="oo-campus-title" {...stylex.props(layout.section)}>
      <div {...stylex.props(layout.shell, layout.inset)}>
        <div {...stylex.props(styles.grid)}>
          <div {...stylex.props(styles.head)}>
            <SectionTitle id="oo-campus-title">{CAMPUS.title}</SectionTitle>
            <Reveal as="p" index={1} sx={styles.lead}>
              {CAMPUS.lead}
            </Reveal>
          </div>
          <Reveal sx={styles.statsSlot}>
            <dl {...stylex.props(styles.stats)}>
              {STATS.map((stat) => (
                <div key={stat.label} {...stylex.props(styles.row)}>
                  <dt {...stylex.props(styles.label)}>{stat.label}</dt>
                  <dd {...stylex.props(styles.figure)}>
                    <span {...stylex.props(layout.visuallyHidden)}>
                      {CAMPUS.spoken[stat.label]}
                    </span>
                    <span aria-hidden="true">{stat.value}</span>
                    <span aria-hidden="true" {...stylex.props(styles.unit)}>
                      {stat.unit}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
