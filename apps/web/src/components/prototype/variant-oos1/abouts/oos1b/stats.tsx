import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_MOMENT } from "../../about-data";
import { STATS } from "../../content";
import { Fold, s } from "./shared";
import { fonts, palette } from "./tokens.stylex";

const styles = stylex.create({
  figure: {
    margin: 0,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: { default: "4 / 3", [breakpoints.md]: "21 / 9" },
    backgroundColor: palette.tint,
  },
  image: {
    objectPosition: "50% 68%",
  },
  figcaption: {
    marginTop: 14,
    textAlign: "center",
  },
  figures: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    rowGap: 40,
    margin: 0,
    marginTop: { default: 56, [breakpoints.lg]: 96 },
    padding: 0,
    listStyle: "none",
    textAlign: "center",
  },
  figureValue: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 6,
    margin: 0,
    fontFamily: fonts.latin,
    color: palette.ink,
  },
  value: {
    fontSize: { default: 64, [breakpoints.md]: "min(6.4vw, 96px)" },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  unit: {
    fontSize: { default: 22, [breakpoints.md]: 28 },
    fontWeight: 500,
    color: palette.quiet,
  },
  statCaption: {
    marginTop: 14,
  },
});

export function Stats() {
  return (
    <section id="about-stats" aria-label="发展数据" {...stylex.props(s.section, s.bandPage)}>
      <div {...stylex.props(s.shell)}>
        <Fold side="rise">
          <figure {...stylex.props(styles.figure)}>
            <div {...stylex.props(styles.frame)}>
              <img
                src={ABOUT_MOMENT.image}
                alt={ABOUT_MOMENT.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(s.fill, styles.image)}
              />
            </div>
            <figcaption {...stylex.props(s.caption, styles.figcaption)}>
              {ABOUT_MOMENT.caption}
            </figcaption>
          </figure>
        </Fold>
        <ul {...stylex.props(styles.figures)}>
          {STATS.map((stat, idx) => (
            <Fold key={stat.label} as="li" step={idx}>
              <span {...stylex.props(s.srOnly)}>{stat.label}</span>
              <p {...stylex.props(styles.figureValue)}>
                <span {...stylex.props(styles.value)}>{stat.value}</span>
                {stat.unit ? <span {...stylex.props(styles.unit)}>{stat.unit}</span> : null}
              </p>
              <p {...stylex.props(s.caption, styles.statCaption)}>{stat.caption}</p>
            </Fold>
          ))}
        </ul>
      </div>
    </section>
  );
}
