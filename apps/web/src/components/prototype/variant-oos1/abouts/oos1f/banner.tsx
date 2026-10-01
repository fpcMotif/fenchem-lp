import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { CSSProperties } from "react";

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
    paddingTop: { default: 112, [breakpoints.lg]: 152 },
    paddingBottom: { default: 40, [media.mdOnly]: 56, [breakpoints.lg]: 72 },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 5fr) minmax(0, 6fr)",
    },
    columnGap: { default: 0, [breakpoints.lg]: 72 },
    rowGap: { default: 40, [breakpoints.lg]: 0 },
    alignItems: "center",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 20, [breakpoints.lg]: 28 },
    minWidth: 0,
  },
  title: {
    margin: 0,
    fontFamily: font.cjk,
    fontSize: {
      default: 56,
      [media.mdOnly]: 80,
      [media.lgOnly]: 72,
      [breakpoints.xl]: "clamp(80px, 7.2vw, 104px)",
    },
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "0.04em",
    color: color.ink,
    animationName: { default: null, [breakpoints.motionOk]: fadeRise },
    animationDuration: "800ms",
    animationDelay: "100ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  tagline: {
    margin: 0,
    fontFamily: font.serif,
    fontSize: { default: 28, [media.mdOnly]: 34, [breakpoints.lg]: 36 },
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: 1.15,
    color: color.ink,
    animationName: { default: null, [breakpoints.motionOk]: fadeRise },
    animationDuration: "800ms",
    animationDelay: "250ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  lead: {
    margin: 0,
    maxWidth: "26em",
    fontFamily: font.cjk,
    fontSize: { default: 16, [breakpoints.lg]: 17 },
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.06em",
    color: color.body,
    animationName: { default: null, [breakpoints.motionOk]: fadeRise },
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
    animationName: { default: null, [breakpoints.motionOk]: settleStraight },
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
    aspectRatio: { default: "4 / 3", [breakpoints.lg]: "5 / 4" },
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
    writingMode: { default: "horizontal-tb", [breakpoints.lg]: "vertical-rl" },
    position: { default: "static", [breakpoints.lg]: "absolute" },
    top: { default: null, [breakpoints.lg]: 0 },
    left: { default: null, [breakpoints.lg]: "calc(100% + 18px)" },
    marginBlock: { default: 14, [breakpoints.lg]: 0 },
    whiteSpace: "nowrap",
  },
});

export function Banner() {
  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(styles.banner)}>
      <Shell>
        <NodeMarker />
        <div {...stylex.props(styles.grid)}>
          <div {...stylex.props(styles.copy)}>
            <h1 id="about-banner-title" {...stylex.props(styles.title)}>
              {ABOUT_BANNER.title}
            </h1>
            <p lang="en" {...stylex.props(styles.tagline)}>
              {ABOUT_BANNER.tagline}
            </p>
            <p {...stylex.props(styles.lead)}>
              {ABOUT_BANNER.lead.split(" · ").map((line) => (
                <span key={line} {...stylex.props(styles.leadLine)}>
                  {line}
                </span>
              ))}
            </p>
          </div>
          <div {...stylex.props(styles.settle)} style={{ "--oos1f-tilt": TILT } as CSSProperties}>
            <figure {...stylex.props(styles.figure)}>
              <img
                src={ABOUT_BANNER.image}
                alt={ABOUT_BANNER.alt}
                fetchPriority="high"
                decoding="async"
                {...stylex.props(styles.image)}
              />
              <figcaption lang="en" {...stylex.props(styles.caption)}>
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
