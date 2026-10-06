import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { ui } from "./shared";
import { font, motionCss, slit, step, tone } from "./tokens.stylex";

const openSlit = stylex.keyframes({
  "0%": { clipPath: slit.openingClosed },
  "100%": { clipPath: slit.openingOpen },
});

const s = stylex.create({
  hero: {
    paddingTop: { default: 104, [breakpoints.md]: 120, [breakpoints.xl]: 112 },
    backgroundColor: tone.page,
  },
  head: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 1fr) minmax(0, 1fr)",
    },
    columnGap: { default: 0, [breakpoints.lg]: 64, [breakpoints.xl]: 96 },
    rowGap: { default: 20, [breakpoints.lg]: 0 },
    alignItems: "end",
    marginBottom: { default: 28, [breakpoints.md]: 36, [breakpoints.xl]: 40 },
  },
  title: {
    margin: 0,
    fontSize: { default: step.display, [breakpoints.md]: step.large, [breakpoints.xl]: "96px" },
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  opening: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 12, [breakpoints.md]: 16 },
  },
  tagline: {
    margin: 0,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: step.title, [breakpoints.md]: step.display },
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: "0.005em",
    color: tone.ink,
  },
  taglineLine: {
    display: "block",
  },
  lead: {
    margin: 0,
    maxWidth: "32em",
    fontSize: step.body,
    lineHeight: 1.9,
    letterSpacing: "0.06em",
    color: tone.body,
    textWrap: "pretty",
  },
  figure: {
    margin: 0,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    aspectRatio: {
      default: "4 / 3",
      [breakpoints.md]: "2 / 1",
      [breakpoints.lg]: "2.4 / 1",
      [breakpoints.xl]: "2.9 / 1",
    },
    backgroundColor: tone.tint,
    animationName: { default: null, [breakpoints.motionOk]: openSlit },
    animationDuration: "1600ms",
    animationDelay: "700ms",
    animationTimingFunction: motionCss.shutter,
    animationFillMode: "backwards",
  },
  image: {
    objectPosition: { default: "42% 62%", [breakpoints.lg]: "50% 64%" },
  },
  subtitle: {
    margin: 0,
    paddingBlock: { default: 20, [breakpoints.md]: 24 },
    textAlign: "center",
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.14em",
    color: tone.body,
  },
});

export function Hero() {
  const [taglineLead, taglineClose] = ABOUT_BANNER.tagline.split(", ");

  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(s.hero)}>
      <div {...stylex.props(ui.shell, ui.inset, s.head)}>
        <h1 id="about-banner-title" {...stylex.props(s.title)}>
          {ABOUT_BANNER.title}
        </h1>
        <div {...stylex.props(s.opening)}>
          <p lang="en" {...stylex.props(s.tagline)}>
            <span {...stylex.props(s.taglineLine)}>{taglineLead},</span>
            <span {...stylex.props(s.taglineLine)}>{taglineClose}</span>
          </p>
          <p {...stylex.props(s.lead)}>{ABOUT_BANNER.lead}</p>
        </div>
      </div>
      <figure {...stylex.props(s.figure)}>
        <div {...stylex.props(s.frame)}>
          <img
            src={ABOUT_BANNER.image}
            alt={ABOUT_BANNER.alt}
            fetchPriority="high"
            decoding="async"
            {...stylex.props(ui.fill, s.image)}
          />
        </div>
        <figcaption lang="en" {...stylex.props(s.subtitle)}>
          {ABOUT_BANNER.established} · {ABOUT_BANNER.place}
        </figcaption>
      </figure>
    </section>
  );
}
