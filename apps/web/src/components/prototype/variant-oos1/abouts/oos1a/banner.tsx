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
    paddingBottom: { default: 48, ["@media (min-width: 1024px)"]: 72 },
  },
  grid: {
    rowGap: 28,
    alignItems: "end",
  },
  titleCell: {
    gridColumn: { default: null, ["@media (min-width: 1024px)"]: "1 / span 10" },
  },
  title: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: {
      default: 68,
      [media.mdOnly]: 104,
      ["@media (min-width: 1024px)"]: "clamp(104px, 9.8vw, 148px)",
    },
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "0.01em",
    color: palette.ink,
  },
  tagline: {
    marginTop: { default: 14, ["@media (min-width: 1024px)"]: 24 },
  },
  metaCell: {
    gridColumn: { default: null, ["@media (min-width: 1024px)"]: "11 / span 6" },
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
    marginTop: { default: 40, ["@media (min-width: 1024px)"]: 64 },
    backgroundColor: palette.tint,
    aspectRatio: {
      default: "4 / 3",
      [media.mdOnly]: "16 / 9",
      ["@media (min-width: 1024px)"]: "2400 / 1150",
    },
  },
  image: {
    objectPosition: "center 60%",
    animationName: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: fadeIn },
    animationDuration: "1200ms",
    animationDelay: "300ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
});

export function Banner() {
  return (
    <section aria-labelledby="about-banner-title" {...stylex.attrs(styles.banner)}>
      <Frame lattice="full" slip innerSx={styles.inner}>
        <div {...stylex.attrs(shared.grid16, styles.grid)}>
          <div {...stylex.attrs(styles.titleCell)}>
            <h1 id="about-banner-title" {...stylex.attrs(styles.title)}>
              {ABOUT_BANNER.title}
            </h1>
            <p lang="en" {...stylex.attrs(shared.serifLine, styles.tagline)}>
              {ABOUT_BANNER.tagline}
            </p>
          </div>
          <div {...stylex.attrs(styles.metaCell)}>
            <p {...stylex.attrs(shared.body)}>{ABOUT_BANNER.lead}</p>
            <div lang="en" {...stylex.attrs(styles.facts)}>
              <p {...stylex.attrs(styles.est)}>{ABOUT_BANNER.established}</p>
              <p {...stylex.attrs(shared.small)}>{ABOUT_BANNER.place}</p>
            </div>
          </div>
        </div>
        <figure {...stylex.attrs(styles.figure)}>
          <img
            src={ABOUT_BANNER.image}
            alt={ABOUT_BANNER.alt}
            fetchpriority="high"
            decoding="async"
            {...stylex.attrs(shared.cover, styles.image)}
          />
        </figure>
      </Frame>
    </section>
  );
}
