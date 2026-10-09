import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { ui } from "./shared-values";
import { band, font, layout, motionCss, step, tone } from "./tokens.stylex";

const rise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(20px)" },
  "100%": { opacity: 1, transform: "none" },
});

const dynamic = stylex.create({
  delay: (ms: number) => ({ animationDelay: `${ms}ms` }),
});

const s = stylex.create({
  banner: {
    paddingTop: { default: 32, [band.mdToXl]: 44, [breakpoints.xl]: 48 },
    paddingBottom: { default: 40, [band.mdToXl]: 60, [breakpoints.xl]: 72 },
  },
  enter: {
    animationName: { default: null, [breakpoints.motionOk]: rise },
    animationDuration: "900ms",
    animationTimingFunction: motionCss.out,
    animationFillMode: "both",
  },
  head: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.lg]: "row" },
    alignItems: { default: "flex-start", [breakpoints.lg]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 8, [breakpoints.lg]: 40 },
  },
  title: {
    margin: 0,
    fontSize: { default: 40, [band.mdToXl]: 56, [breakpoints.xl]: 64 },
    fontWeight: 500,
    lineHeight: 1.1,
    letterSpacing: "0.08em",
    color: tone.ink,
  },
  tagline: {
    margin: 0,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: 22, [band.mdToXl]: 28, [breakpoints.xl]: 32 },
    fontWeight: 400,
    lineHeight: 1.2,
    color: colors.brandBlue700,
  },
  figure: {
    margin: 0,
    marginTop: { default: 24, [breakpoints.xl]: 36 },
    marginLeft: { default: 0, [band.mdToXl]: layout.bleedMd, [breakpoints.xl]: layout.bleedXl },
  },
  frame: {
    aspectRatio: { default: "4 / 3", [band.mdToXl]: "2 / 1", [breakpoints.xl]: "2.5 / 1" },
  },
  image: {
    objectPosition: "50% 58%",
  },
  captionRow: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: { default: "flex-start", [breakpoints.md]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 4, [breakpoints.md]: 32 },
    paddingLeft: { default: 16, [breakpoints.md]: 0 },
    paddingRight: {
      default: 16,
      [band.mdToXl]: layout.bleedMd,
      [breakpoints.xl]: layout.bleedXl,
    },
  },
  lead: {
    margin: 0,
    marginTop: 12,
    fontSize: step.small,
    fontWeight: 400,
    letterSpacing: "0.06em",
    lineHeight: 1.7,
    color: tone.body,
  },
  place: {
    margin: 0,
    marginTop: 12,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.1em",
    lineHeight: 1.6,
    color: tone.body,
  },
});

export function Banner() {
  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(s.banner)}>
      <div {...stylex.props(ui.shell, ui.inset)}>
        <div {...stylex.props(s.head)}>
          <h1 id="about-banner-title" {...stylex.props(s.title, s.enter, dynamic.delay(120))}>
            {ABOUT_BANNER.title}
          </h1>
          <p lang="en" {...stylex.props(s.tagline, s.enter, dynamic.delay(260))}>
            {ABOUT_BANNER.tagline}
          </p>
        </div>
      </div>
      <figure {...stylex.props(s.figure, s.enter, dynamic.delay(400))}>
        <div {...stylex.props(ui.frame, s.frame)}>
          <img
            src={ABOUT_BANNER.image}
            alt={ABOUT_BANNER.alt}
            fetchPriority="high"
            decoding="async"
            {...stylex.props(ui.fill, s.image)}
          />
        </div>
        <figcaption {...stylex.props(s.captionRow)}>
          <p lang="en" {...stylex.props(s.place)}>
            {ABOUT_BANNER.established} · {ABOUT_BANNER.place}
          </p>
          <p {...stylex.props(s.lead)}>{ABOUT_BANNER.lead}</p>
        </figcaption>
      </figure>
    </section>
  );
}
