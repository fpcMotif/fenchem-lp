import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { STATS } from "../../content";
import { layout } from "./layout";
import { media, palette } from "./palette.stylex";
import { CountUp, Reveal } from "./reveal";

const LG = "@media (min-width: 1024px)";
const MD = "@media (min-width: 768px)";
const EDGE = "min(72px, 5.2vw)";
const BOTTOM_SCRIM =
  "linear-gradient(to top, rgba(6, 28, 66, 0.78) 0%, rgba(6, 28, 66, 0.4) 36%, rgba(6, 28, 66, 0) 68%)";

const rejoinLeft = stylex.keyframes({
  "0%": { transform: "translateY(56px)" },
  "100%": { transform: "translateY(0)" },
});
const rejoinRight = stylex.keyframes({
  "0%": { transform: "translateY(-56px)" },
  "100%": { transform: "translateY(0)" },
});
const rejoinWord = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});
const rejoin = { left: rejoinLeft, right: rejoinRight, word: rejoinWord };

const styles = stylex.create({
  hero: {
    backgroundColor: palette.page,
  },
  stage: {
    position: "relative",
    overflow: "hidden",
    height: {
      default: "clamp(400px, 62svh, 560px)",
      [LG]: "clamp(520px, calc(100svh - 230px), 780px)",
    },
    backgroundColor: palette.page,
  },
  half: {
    position: "absolute",
    top: 0,
    width: "50%",
    height: "100%",
    overflow: "hidden",
    animationDuration: "1400ms",
    animationDelay: "200ms",
    animationTimingFunction: palette.easeOut,
    animationFillMode: "both",
  },
  halfLeft: {
    left: 0,
    animationName: {
      default: null,
      ["@media (prefers-reduced-motion: no-preference)"]: rejoin.left,
    },
  },
  halfRight: {
    left: "50%",
    animationName: {
      default: null,
      ["@media (prefers-reduced-motion: no-preference)"]: rejoin.right,
    },
  },
  image: {
    position: "absolute",
    top: 0,
    display: "block",
    width: "200%",
    height: "100%",
    maxWidth: "none",
    objectFit: "cover",
    objectPosition: "50% 62%",
  },
  imageLeft: {
    left: 0,
  },
  imageRight: {
    left: "-100%",
  },
  scrim: {
    backgroundImage: BOTTOM_SCRIM,
    pointerEvents: "none",
  },
  title: {
    position: "absolute",
    left: 0,
    bottom: { default: 24, [MD]: 36, [LG]: 44 },
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    width: "100%",
    margin: 0,
    boxSizing: "border-box",
    paddingInline: { default: 10, [MD]: 24, [LG]: EDGE },
    fontFamily: palette.fontBody,
    fontSize: {
      default: "clamp(60px, 19.5vw, 96px)",
      [MD]: "clamp(96px, 17vw, 144px)",
      [LG]: "min(14.4vw, 208px)",
    },
    fontWeight: 700,
    lineHeight: 0.98,
    letterSpacing: "0.02em",
    color: "#ffffff",
    animationName: {
      default: null,
      ["@media (prefers-reduced-motion: no-preference)"]: rejoin.word,
    },
    animationDuration: "1000ms",
    animationDelay: "500ms",
    animationTimingFunction: palette.easeOut,
    animationFillMode: "both",
  },
  titleLeft: {
    justifySelf: "end",
    paddingInlineEnd: { default: 6, [LG]: 28 },
  },
  titleRight: {
    justifySelf: "start",
    paddingInlineStart: { default: 6, [LG]: 28 },
  },
  intro: {
    paddingBlock: { default: 32, [LG]: 56 },
  },
  tagline: {
    margin: 0,
    fontFamily: palette.fontSerif,
    fontSize: { default: 28, [MD]: 32, [LG]: 40 },
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: 1.15,
    color: colors.brandBlue800,
    textWrap: "balance",
  },
  introRight: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  lead: {
    margin: 0,
    maxWidth: "28em",
    fontSize: { default: 16, [LG]: 17 },
    lineHeight: 1.9,
    letterSpacing: "0.05em",
    color: palette.body,
    textWrap: "pretty",
  },

  stats: {
    backgroundColor: colors.paper,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [LG]: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)",
    },
  },
  cell: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    boxSizing: "border-box",
    paddingBlock: { default: 32, [LG]: 72 },
  },
  cellMain: {
    alignItems: { default: "flex-start", [LG]: "flex-end" },
    textAlign: { default: "start", [LG]: "end" },
    paddingInlineStart: {
      default: 20,
      ["@media (min-width: 640px)"]: 28,
      [media.tablet]: 40,
      [LG]: EDGE,
    },
    paddingInlineEnd: {
      default: 20,
      ["@media (min-width: 640px)"]: 28,
      [media.tablet]: 40,
      [LG]: 48,
    },
  },
  cellSide: {
    alignItems: "flex-start",
    paddingInlineStart: {
      default: 20,
      ["@media (min-width: 640px)"]: 28,
      [media.tablet]: 40,
      [LG]: 40,
    },
    paddingInlineEnd: {
      default: 20,
      ["@media (min-width: 640px)"]: 28,
      [media.tablet]: 40,
      [LG]: 24,
    },
  },
  figure: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    fontFamily: palette.fontDisplay,
    fontWeight: 500,
    lineHeight: 0.92,
    letterSpacing: "-0.04em",
    color: palette.ink,
  },
  figureMain: {
    fontSize: { default: 88, [MD]: 120, [LG]: "clamp(104px, 11.4vw, 164px)" },
  },
  figureSide: {
    fontSize: { default: 64, [MD]: 80, [LG]: "clamp(40px, 4.6vw, 68px)" },
  },
  unit: {
    fontSize: "0.34em",
    fontWeight: 400,
    letterSpacing: 0,
    color: colors.brandBlue700,
  },
  caption: {
    margin: 0,
    fontSize: 14,
    letterSpacing: "0.1em",
    color: palette.body,
  },
});

export function Hero() {
  const cut = Math.floor(ABOUT_BANNER.title.length / 2);
  const lead = ABOUT_BANNER.title.slice(0, cut);
  const brand = ABOUT_BANNER.title.slice(cut);
  return (
    <section aria-labelledby="about-banner-title" {...stylex.attrs(styles.hero)}>
      <div {...stylex.attrs(styles.stage)}>
        <div {...stylex.attrs(styles.half, styles.halfLeft)}>
          <img
            src={ABOUT_BANNER.image}
            alt={ABOUT_BANNER.alt}
            fetchpriority="high"
            decoding="async"
            {...stylex.attrs(styles.image, styles.imageLeft)}
          />
        </div>
        <div aria-hidden="true" {...stylex.attrs(styles.half, styles.halfRight)}>
          <img
            src={ABOUT_BANNER.image}
            alt=""
            fetchpriority="high"
            decoding="async"
            {...stylex.attrs(styles.image, styles.imageRight)}
          />
        </div>
        <div aria-hidden="true" {...stylex.attrs(layout.fillBox, styles.scrim)} />
        <h1 id="about-banner-title" {...stylex.attrs(styles.title)}>
          <span {...stylex.attrs(styles.titleLeft)}>{lead}</span>
          <span {...stylex.attrs(styles.titleRight)}>{brand}</span>
        </h1>
      </div>
      <div {...stylex.attrs(layout.shell, layout.split, styles.intro)}>
        <div {...stylex.attrs(layout.padLeft, layout.seam)}>
          <p lang="en" {...stylex.attrs(styles.tagline)}>
            {ABOUT_BANNER.tagline}
          </p>
        </div>
        <div {...stylex.attrs(layout.padRight, styles.introRight)}>
          <p {...stylex.attrs(styles.lead)}>{ABOUT_BANNER.lead}</p>
          <p lang="en" {...stylex.attrs(layout.label)}>
            {ABOUT_BANNER.established} · {ABOUT_BANNER.place}
          </p>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section aria-label="Fenchem growth figures" {...stylex.attrs(styles.stats)}>
      <div {...stylex.attrs(layout.shell, styles.statsGrid)}>
        {STATS.map((stat, index) => {
          const main = index === 0;
          return (
            <Reveal step={index} sx={[styles.cell, main ? styles.cellMain : styles.cellSide]}>
              <p {...stylex.attrs(layout.label)}>{stat.label}</p>
              <div {...stylex.attrs(styles.figure, main ? styles.figureMain : styles.figureSide)}>
                <CountUp value={stat.value} />
                {stat.unit ? <span {...stylex.attrs(styles.unit)}>{stat.unit}</span> : null}
              </div>
              <p {...stylex.attrs(styles.caption)}>{stat.caption}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
