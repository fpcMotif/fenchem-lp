import * as stylex from "@stylexjs/stylex";

import { ABOUT_MOMENT } from "../../../about-data";
import { STATS } from "../../../content";
import { Sheet } from "../sheet";
import { Reveal } from "../shared";
import { base } from "../shared-values";
import { STATS_SHEET } from "../sheets";
import { color, font, media } from "../tokens.stylex";

const styles = stylex.create({
  photo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    pointerEvents: "none",
  },
  photoImage: {
    objectPosition: "center 42%",
    opacity: 0.26,
  },
  stats: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.lgUp]: "repeat(3, minmax(0, 1fr))",
    },
    gap: { default: 56, [media.lgUp]: 48 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  label: {
    color: color.onNavyQuiet,
  },
  figure: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    fontFamily: font.display,
    color: color.onNavy,
  },
  value: {
    fontSize: { default: 80, [media.lgUp]: "clamp(60px, 6.4vw, 96px)" },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    fontVariantNumeric: "tabular-nums",
  },
  unit: {
    fontSize: { default: 28, [media.lgUp]: "clamp(22px, 2.4vw, 34px)" },
    fontWeight: 500,
  },
  caption: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    letterSpacing: "0.08em",
    color: color.onNavyMuted,
  },
  photoCaption: {
    position: "relative",
    margin: 0,
    color: color.onNavyQuiet,
  },
});

export function StatsSheet() {
  return (
    <Sheet def={STATS_SHEET}>
      <div {...stylex.props(styles.photo)}>
        <img
          src={ABOUT_MOMENT.image}
          alt={ABOUT_MOMENT.alt}
          loading="lazy"
          decoding="async"
          {...stylex.props(base.fill, styles.photoImage)}
        />
      </div>
      <ul {...stylex.props(styles.stats)}>
        {STATS.map((stat, idx) => (
          <Reveal key={stat.label} as="li" step={idx} sx={styles.stat}>
            <span {...stylex.props(base.quiet, styles.label)}>{stat.label}</span>
            <div {...stylex.props(styles.figure)}>
              <span {...stylex.props(styles.value)}>{stat.value}</span>
              {stat.unit ? <span {...stylex.props(styles.unit)}>{stat.unit}</span> : null}
            </div>
            <p {...stylex.props(styles.caption)}>{stat.caption}</p>
          </Reveal>
        ))}
      </ul>
      <p {...stylex.props(base.quiet, styles.photoCaption)}>{ABOUT_MOMENT.caption}</p>
    </Sheet>
  );
}
