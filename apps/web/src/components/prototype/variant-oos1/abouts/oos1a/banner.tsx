import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { ease, fonts, media, palette } from "./lattice.stylex";
import { Frame } from "./parts";
import { shared } from "./parts-values";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  banner: {
    backgroundColor: palette.page,
  },
  inner: {
    paddingTop: 108,
    paddingBottom: { default: 48, [breakpoints.lg]: 72 },
  },
  grid: {
    rowGap: 28,
    alignItems: "end",
  },
  titleCell: {
    gridColumn: { default: null, [breakpoints.lg]: "1 / span 10" },
  },
  title: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: {
      default: 68,
      [media.mdOnly]: 104,
      [breakpoints.lg]: "clamp(104px, 9.8vw, 148px)",
    },
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "0.01em",
    color: palette.ink,
  },
  tagline: {
    marginTop: { default: 14, [breakpoints.lg]: 24 },
  },
  metaCell: {
    gridColumn: { default: null, [breakpoints.lg]: "11 / span 6" },
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  facts: {
    display: "flex",
    alignItems: "baseline",
    gap: 16,
  },
  est: {
    margin: 0,
    fontFamily: fonts.display,
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: "0.01em",
    color: palette.ink,
  },
  figure: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    marginTop: { default: 40, [breakpoints.lg]: 64 },
    backgroundColor: palette.tint,
    aspectRatio: {
      default: "4 / 3",
      [media.mdOnly]: "16 / 9",
      [breakpoints.lg]: "2400 / 1150",
    },
  },
  image: {
    objectPosition: "center 60%",
    animationName: { default: null, [breakpoints.motionOk]: fadeIn },
    animationDuration: "1200ms",
    animationDelay: "300ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
});

export function Banner() {
  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(styles.banner)}>
      <Frame lattice="full" slip innerSx={styles.inner}>
        <div {...stylex.props(shared.grid16, styles.grid)}>
          <div {...stylex.props(styles.titleCell)}>
            <h1 id="about-banner-title" {...stylex.props(styles.title)}>
              {ABOUT_BANNER.title}
            </h1>
            <p lang="en" {...stylex.props(shared.serifLine, styles.tagline)}>
              {ABOUT_BANNER.tagline}
            </p>
          </div>
          <div {...stylex.props(styles.metaCell)}>
            <p {...stylex.props(shared.body)}>{ABOUT_BANNER.lead}</p>
            <div lang="en" {...stylex.props(styles.facts)}>
              <p {...stylex.props(styles.est)}>{ABOUT_BANNER.established}</p>
              <p {...stylex.props(shared.small)}>{ABOUT_BANNER.place}</p>
            </div>
          </div>
        </div>
        <figure {...stylex.props(styles.figure)}>
          <img
            src={ABOUT_BANNER.image}
            alt={ABOUT_BANNER.alt}
            fetchPriority="high"
            decoding="async"
            {...stylex.props(shared.cover, styles.image)}
          />
        </figure>
      </Frame>
    </section>
  );
}
