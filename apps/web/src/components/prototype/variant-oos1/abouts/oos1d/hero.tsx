import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { ui } from "./shared-values";
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
    paddingTop: {
      default: 112,
      ["@media (min-width: 768px)"]: 128,
      ["@media (min-width: 1280px)"]: 144,
    },
    paddingBottom: {
      default: 40,
      ["@media (min-width: 768px)"]: 56,
      ["@media (min-width: 1280px)"]: 72,
    },
  },
  enter: {
    animationName: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: rise },
    animationDuration: "900ms",
    animationTimingFunction: motionCss.out,
    animationFillMode: "both",
  },
  headRow: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1024px)"]: "minmax(0, 61.8fr) minmax(0, 38.2fr)",
    },
    columnGap: {
      default: 0,
      ["@media (min-width: 1024px)"]: 48,
      ["@media (min-width: 1280px)"]: 80,
    },
    rowGap: 20,
    alignItems: "end",
    marginBottom: { default: 32, ["@media (min-width: 1280px)"]: 48 },
  },
  title: {
    margin: 0,
    fontSize: {
      default: step.display,
      ["@media (min-width: 768px)"]: step.large,
      ["@media (min-width: 1280px)"]: step.huge,
    },
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
    justifySelf: { default: "start", ["@media (min-width: 1024px)"]: "end" },
  },
  estLabel: {
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.body,
  },
  estYear: {
    fontFamily: font.serif,
    fontSize: {
      default: step.display,
      ["@media (min-width: 768px)"]: step.large,
      ["@media (min-width: 1280px)"]: step.huge,
    },
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
      ["@media (min-width: 1024px)"]: "minmax(0, 38.2fr) minmax(0, 61.8fr)",
    },
    columnGap: {
      default: 0,
      ["@media (min-width: 1024px)"]: 48,
      ["@media (min-width: 1280px)"]: 80,
    },
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
    fontSize: { default: step.title, ["@media (min-width: 768px)"]: step.display },
    fontWeight: 400,
    lineHeight: 1.12,
    color: tone.ink,
  },
  taglineLine: {
    display: "block",
  },
  lead: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    margin: 0,
    fontSize: step.body,
    lineHeight: 1.9,
    letterSpacing: "0.06em",
    color: tone.body,
  },
  leadMeta: {
    fontSize: step.label,
    letterSpacing: "0.12em",
    color: tone.quiet,
  },
  figure: {
    margin: 0,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: { default: "4 / 3", ["@media (min-width: 1024px)"]: "1.618 / 1" },
    backgroundColor: tone.tint,
  },
  image: {
    objectPosition: "40% 50%",
  },
});

export function Hero() {
  const [estLabel, estYear] = ABOUT_BANNER.established.split(" ");
  const [taglineLead, taglineClose] = ABOUT_BANNER.tagline.split(", ");
  const [leadMeta, leadClose] = ABOUT_BANNER.lead.split(" · ");

  return (
    <section aria-labelledby="about-banner-title" {...stylex.attrs(s.hero, ui.onPage)}>
      <div {...stylex.attrs(ui.shell, ui.inset)}>
        <div {...stylex.attrs(s.headRow)}>
          <h1 id="about-banner-title" {...stylex.attrs(s.title, s.enter, dynamic.delay(250))}>
            {ABOUT_BANNER.title}
          </h1>
          <p lang="en" {...stylex.attrs(s.est, s.enter, dynamic.delay(400))}>
            <span {...stylex.attrs(s.estLabel)}>{estLabel}</span>
            <span {...stylex.attrs(s.estYear)}>{estYear}</span>
          </p>
        </div>
        <div {...stylex.attrs(s.bodyRow)}>
          <div {...stylex.attrs(s.copy, s.enter, dynamic.delay(550))}>
            <p lang="en" {...stylex.attrs(s.tagline)}>
              <span {...stylex.attrs(s.taglineLine)}>{taglineLead},</span>
              <span {...stylex.attrs(s.taglineLine)}>{taglineClose}</span>
            </p>
            <p {...stylex.attrs(s.lead)}>
              <span {...stylex.attrs(s.leadMeta)}>{leadMeta}</span>
              <span {...stylex.attrs(ui.srOnly)}> · </span>
              <span>{leadClose}</span>
            </p>
          </div>
          <figure {...stylex.attrs(s.figure, s.enter, dynamic.delay(700))}>
            <div {...stylex.attrs(s.frame)}>
              <img
                src={ABOUT_BANNER.image}
                alt={ABOUT_BANNER.alt}
                fetchpriority="high"
                decoding="async"
                {...stylex.attrs(ui.fill, s.image)}
              />
            </div>
            <figcaption lang="en" {...stylex.attrs(ui.caption)}>
              {ABOUT_BANNER.place}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
