import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { ui } from "./shared-values";
import { font, motionCss, step, tone } from "./tokens.stylex";

const rise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(24px)" },
  "100%": { opacity: 1, transform: "none" },
});

const dynamic = stylex.create({
  delay: (ms: number) => ({ animationDelay: `${ms}ms` }),
});

const s = stylex.create({
  hero: {
    paddingTop: { default: 104, [breakpoints.md]: 144, [breakpoints.xl]: 152 },
    paddingBottom: { default: 40, [breakpoints.md]: 40, [breakpoints.xl]: 40 },
  },
  enter: {
    animationName: { default: null, [breakpoints.motionOk]: rise },
    animationDuration: "900ms",
    animationTimingFunction: motionCss.out,
    animationFillMode: "both",
  },
  head: {
    rowGap: 40,
    alignItems: "end",
  },
  titleBlock: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 8" },
  },
  title: {
    margin: 0,
    fontSize: { default: 56, [breakpoints.md]: 80, [breakpoints.xl]: 96 },
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: "0.16em",
    color: tone.ink,
  },
  tagline: {
    margin: 0,
    marginTop: { default: 28, [breakpoints.xl]: 40 },
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: 28, [breakpoints.md]: 34, [breakpoints.xl]: 40 },
    fontWeight: 400,
    lineHeight: 1.2,
    color: tone.ink,
  },
  taglineLine: {
    display: "block",
  },
  lead: {
    gridColumn: { default: "auto", [breakpoints.lg]: "9 / 13" },
    margin: 0,
    maxWidth: "22em",
    fontSize: step.small,
    lineHeight: 2,
    letterSpacing: "0.06em",
    color: tone.body,
    textWrap: "pretty",
  },
  figure: {
    margin: 0,
    marginTop: { default: 40, [breakpoints.md]: 56, [breakpoints.xl]: 72 },
  },
  frame: {
    aspectRatio: { default: "5 / 4", [breakpoints.md]: "16 / 9", [breakpoints.lg]: "24 / 9" },
  },
  image: {
    objectPosition: "48% 50%",
  },
  captionRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 24,
  },
});

export function Hero() {
  const [taglineLead, taglineClose] = ABOUT_BANNER.tagline.split(", ");

  return (
    <section aria-labelledby="about-banner-title" {...stylex.attrs(s.hero)}>
      <div {...stylex.attrs(ui.shell, ui.inset)}>
        <div {...stylex.attrs(ui.grid, s.head)}>
          <div {...stylex.attrs(s.titleBlock)}>
            <h1 id="about-banner-title" {...stylex.attrs(s.title, s.enter, dynamic.delay(200))}>
              {ABOUT_BANNER.title}
            </h1>
            <p lang="en" {...stylex.attrs(s.tagline, s.enter, dynamic.delay(420))}>
              <span {...stylex.attrs(s.taglineLine)}>{taglineLead},</span>
              <span {...stylex.attrs(s.taglineLine)}>{taglineClose}</span>
            </p>
          </div>
          <p {...stylex.attrs(s.lead, s.enter, dynamic.delay(600))}>{ABOUT_BANNER.lead}</p>
        </div>
        <figure {...stylex.attrs(s.figure, s.enter, dynamic.delay(760))}>
          <div {...stylex.attrs(ui.frame, s.frame)}>
            <img
              src={ABOUT_BANNER.image}
              alt={ABOUT_BANNER.alt}
              fetchpriority="high"
              decoding="async"
              {...stylex.attrs(ui.fill, s.image)}
            />
          </div>
          <figcaption lang="en" {...stylex.attrs(ui.caption, s.captionRow)}>
            <span>{ABOUT_BANNER.place}</span>
            <span>{ABOUT_BANNER.established}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
