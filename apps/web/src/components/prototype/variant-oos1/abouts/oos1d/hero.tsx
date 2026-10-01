import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { ui } from "./shared";
import { font, motionCss, step, tone } from "./tokens.stylex";

const rise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(20px)" },
  "100%": { opacity: 1, transform: "none" },
});

const dynamic = stylex.create({
  delay: (ms: number) => ({ animationDelay: `${ms}ms` }),
});

const s = stylex.create({
  hero: {
    paddingTop: { default: 112, [breakpoints.md]: 128, [breakpoints.xl]: 144 },
    paddingBottom: { default: 40, [breakpoints.md]: 56, [breakpoints.xl]: 72 },
  },
  enter: {
    animationName: { default: null, [breakpoints.motionOk]: rise },
    animationDuration: "900ms",
    animationTimingFunction: motionCss.out,
    animationFillMode: "both",
  },
  headRow: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 61.8fr) minmax(0, 38.2fr)",
    },
    columnGap: { default: 0, [breakpoints.lg]: 48, [breakpoints.xl]: 80 },
    rowGap: 8,
    alignItems: "end",
    marginBottom: { default: 32, [breakpoints.xl]: 48 },
  },
  title: {
    margin: 0,
    fontSize: { default: step.display, [breakpoints.md]: step.large, [breakpoints.xl]: step.huge },
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  est: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    margin: 0,
    justifySelf: { default: "start", [breakpoints.lg]: "end" },
  },
  estLabel: {
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.body,
  },
  estYear: {
    fontFamily: font.serif,
    fontSize: { default: step.display, [breakpoints.md]: step.large, [breakpoints.xl]: step.huge },
    fontWeight: 400,
    lineHeight: 0.82,
    letterSpacing: "-0.03em",
    color: colors.brandBlue700,
    fontVariantNumeric: "lining-nums",
  },
  bodyRow: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 38.2fr) minmax(0, 61.8fr)",
    },
    columnGap: { default: 0, [breakpoints.lg]: 48, [breakpoints.xl]: 80 },
    rowGap: 32,
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 32,
  },
  tagline: {
    margin: 0,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: step.title, [breakpoints.md]: step.display },
    fontWeight: 400,
    lineHeight: 1.12,
    color: tone.ink,
  },
  taglineLine: {
    display: "block",
  },
  lead: {
    margin: 0,
    maxWidth: "26em",
    fontSize: step.body,
    lineHeight: 2,
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
    aspectRatio: { default: "4 / 3", [breakpoints.lg]: "1.618 / 1" },
    backgroundColor: tone.tint,
  },
  image: {
    objectPosition: "40% 50%",
  },
});

export function Hero() {
  const [estLabel, estYear] = ABOUT_BANNER.established.split(" ");
  const [taglineLead, taglineClose] = ABOUT_BANNER.tagline.split(", ");

  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(s.hero, ui.onPage)}>
      <div {...stylex.props(ui.shell, ui.inset)}>
        <div {...stylex.props(s.headRow)}>
          <h1 id="about-banner-title" {...stylex.props(s.title, s.enter, dynamic.delay(250))}>
            {ABOUT_BANNER.title}
          </h1>
          <p lang="en" {...stylex.props(s.est, s.enter, dynamic.delay(400))}>
            <span {...stylex.props(s.estLabel)}>{estLabel}</span>
            <span {...stylex.props(s.estYear)}>{estYear}</span>
          </p>
        </div>
        <div {...stylex.props(s.bodyRow)}>
          <div {...stylex.props(s.copy, s.enter, dynamic.delay(550))}>
            <p lang="en" {...stylex.props(s.tagline)}>
              <span {...stylex.props(s.taglineLine)}>{taglineLead},</span>
              <span {...stylex.props(s.taglineLine)}>{taglineClose}</span>
            </p>
            <p {...stylex.props(s.lead)}>{ABOUT_BANNER.lead}</p>
          </div>
          <figure {...stylex.props(s.figure, s.enter, dynamic.delay(700))}>
            <div {...stylex.props(s.frame)}>
              <img
                src={ABOUT_BANNER.image}
                alt={ABOUT_BANNER.alt}
                fetchPriority="high"
                decoding="async"
                {...stylex.props(ui.fill, s.image)}
              />
            </div>
            <figcaption lang="en" {...stylex.props(ui.caption)}>
              {ABOUT_BANNER.place}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
