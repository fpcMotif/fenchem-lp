import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { NodeMarker, Shell } from "./layout";
import { color, ease, font, media } from "./palette.stylex";

const TILT = "3deg";

const settleStraight = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(24px) rotate(var(--oos1f-tilt))" },
  "100%": { opacity: 1, transform: "none" },
});

const fadeRise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(16px)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  banner: {
    position: "relative",
    paddingTop: { default: 112, ["@media (min-width: 1024px)"]: 152 },
    paddingBottom: { default: 40, [media.mdOnly]: 56, ["@media (min-width: 1024px)"]: 72 },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1024px)"]: "minmax(0, 5fr) minmax(0, 6fr)",
    },
    columnGap: { default: 0, ["@media (min-width: 1024px)"]: 72 },
    rowGap: { default: 40, ["@media (min-width: 1024px)"]: 0 },
    alignItems: "center",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 20, ["@media (min-width: 1024px)"]: 28 },
    minWidth: 0,
  },
  title: {
    margin: 0,
    fontFamily: font.cjk,
    fontSize: {
      default: 56,
      [media.mdOnly]: 80,
      [media.lgOnly]: 72,
      ["@media (min-width: 1280px)"]: "clamp(80px, 7.2vw, 104px)",
    },
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "0.04em",
    color: color.ink,
    animationName: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: fadeRise },
    animationDuration: "800ms",
    animationDelay: "100ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  tagline: {
    margin: 0,
    fontFamily: font.serif,
    fontSize: { default: 28, [media.mdOnly]: 34, ["@media (min-width: 1024px)"]: 36 },
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: 1.15,
    color: color.ink,
    animationName: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: fadeRise },
    animationDuration: "800ms",
    animationDelay: "250ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  lead: {
    margin: 0,
    maxWidth: "26em",
    fontFamily: font.cjk,
    fontSize: { default: 16, ["@media (min-width: 1024px)"]: 17 },
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.06em",
    color: color.body,
    animationName: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: fadeRise },
    animationDuration: "800ms",
    animationDelay: "400ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  leadLine: {
    display: "block",
    textWrap: "balance",
  },
  settle: {
    animationName: {
      default: null,
      ["@media (prefers-reduced-motion: no-preference)"]: settleStraight,
    },
    animationDuration: "900ms",
    animationDelay: "200ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  figure: {
    position: "relative",
    margin: 0,
  },
  image: {
    display: "block",
    width: "100%",
    aspectRatio: { default: "4 / 3", ["@media (min-width: 1024px)"]: "5 / 4" },
    objectFit: "cover",
    objectPosition: "46% 50%",
    borderRadius: 2,
  },
  caption: {
    display: "flex",
    columnGap: 20,
    fontFamily: font.cjk,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.14em",
    color: color.body,
    writingMode: { default: "horizontal-tb", ["@media (min-width: 1024px)"]: "vertical-rl" },
    position: { default: "static", ["@media (min-width: 1024px)"]: "absolute" },
    top: { default: null, ["@media (min-width: 1024px)"]: 0 },
    left: { default: null, ["@media (min-width: 1024px)"]: "calc(100% + 18px)" },
    marginBlock: { default: 14, ["@media (min-width: 1024px)"]: 0 },
    whiteSpace: "nowrap",
  },
});

export function Banner() {
  return (
    <section aria-labelledby="about-banner-title" {...stylex.attrs(styles.banner)}>
      <Shell>
        <NodeMarker />
        <div {...stylex.attrs(styles.grid)}>
          <div {...stylex.attrs(styles.copy)}>
            <h1 id="about-banner-title" {...stylex.attrs(styles.title)}>
              {ABOUT_BANNER.title}
            </h1>
            <p lang="en" {...stylex.attrs(styles.tagline)}>
              {ABOUT_BANNER.tagline}
            </p>
            <p {...stylex.attrs(styles.lead)}>
              {ABOUT_BANNER.lead.split(" · ").map((line) => (
                <span {...stylex.attrs(styles.leadLine)}>{line}</span>
              ))}
            </p>
          </div>
          <div {...stylex.attrs(styles.settle)} style={{ "--oos1f-tilt": TILT }}>
            <figure {...stylex.attrs(styles.figure)}>
              <img
                src={ABOUT_BANNER.image}
                alt={ABOUT_BANNER.alt}
                fetchpriority="high"
                decoding="async"
                {...stylex.attrs(styles.image)}
              />
              <figcaption lang="en" {...stylex.attrs(styles.caption)}>
                <span>{ABOUT_BANNER.established}</span>
                <span>{ABOUT_BANNER.place}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </Shell>
    </section>
  );
}
