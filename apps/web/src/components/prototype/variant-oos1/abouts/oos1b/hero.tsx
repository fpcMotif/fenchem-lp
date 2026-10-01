import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { Fold, s } from "./shared";
import { fonts, layout, media, palette } from "./tokens.stylex";

const unfold = stylex.keyframes({
  "0%": { clipPath: "inset(0 50% 0 50%)" },
  "100%": { clipPath: "inset(0 0 0 0)" },
});

const riseIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(20px)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  section: {
    paddingTop: { default: 112, [breakpoints.lg]: 128 },
    paddingBottom: { default: 44, [breakpoints.lg]: 72 },
  },
  head: {
    position: "relative",
    paddingBottom: { default: 40, [breakpoints.lg]: 64 },
    "::before": {
      content: { default: "none", [breakpoints.lg]: '""' },
      position: "absolute",
      top: 0,
      bottom: 0,
      left: "50%",
      width: 1,
      backgroundColor: palette.hairline,
    },
  },
  crumbs: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    marginBottom: { default: 28, [breakpoints.lg]: 36 },
    fontFamily: fonts.cjk,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: palette.quiet,
  },
  crumbHome: {
    justifySelf: "end",
    paddingBlock: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 14,
    borderWidth: 0,
    backgroundColor: "transparent",
    font: "inherit",
    letterSpacing: "inherit",
    color: { default: "inherit", ":hover": palette.ink },
    cursor: "pointer",
  },
  crumbCurrent: {
    justifySelf: "start",
    paddingInlineStart: 14,
  },
  title: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: {
      default: 76,
      [breakpoints.md]: "min(15vw, 150px)",
      [breakpoints.lg]: "min(14.4vw, 224px)",
    },
    fontWeight: 900,
    lineHeight: 1.04,
    color: palette.ink,
  },
  titleStart: {
    display: "block",
    justifySelf: "end",
    paddingInlineEnd: "0.07em",
  },
  titleEnd: {
    display: "block",
    justifySelf: "start",
    paddingInlineStart: "0.07em",
  },
  spread: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(2, minmax(0, 1fr))",
    },
    alignItems: "start",
    rowGap: 20,
    marginTop: { default: 24, [breakpoints.lg]: 32 },
    textAlign: { default: "center", [breakpoints.lg]: "start" },
  },
  tagline: {
    gridColumn: { default: 1, [breakpoints.lg]: 2 },
    gridRow: 1,
    margin: 0,
    paddingInlineStart: { default: 0, [breakpoints.lg]: 32 },
    fontFamily: fonts.serif,
    fontStyle: "italic",
    fontSize: { default: 26, [breakpoints.md]: 30, [breakpoints.lg]: 36 },
    fontWeight: 400,
    lineHeight: 1.2,
    color: colors.brandBlue700,
    textWrap: "balance",
  },
  lead: {
    gridColumn: 1,
    gridRow: { default: 2, [breakpoints.lg]: 1 },
    justifySelf: { default: "center", [breakpoints.lg]: "end" },
    maxWidth: "24em",
    margin: 0,
    paddingInlineEnd: { default: 0, [breakpoints.lg]: 32 },
    fontSize: { default: 15, [breakpoints.lg]: 16 },
    fontWeight: 400,
    lineHeight: 1.9,
    letterSpacing: "0.06em",
    textAlign: { default: "center", [breakpoints.lg]: "end" },
    color: palette.body,
    textWrap: "pretty",
  },
  stage: {
    maxWidth: 1536,
    marginInline: "auto",
    paddingInline: { default: 16, [breakpoints.md]: 40, [breakpoints.lg]: 48 },
    boxSizing: "border-box",
  },
  figure: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    aspectRatio: { default: "4 / 3", [breakpoints.md]: "16 / 8", [breakpoints.lg]: "21 / 9" },
    backgroundColor: palette.tint,
    animationName: { default: null, [media.fold]: unfold, [media.fade]: riseIn },
    animationDuration: "1000ms",
    animationDelay: "500ms",
    animationTimingFunction: layout.ease,
    animationFillMode: "both",
  },
  image: {
    objectPosition: "center 60%",
  },
});

export function Hero({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const glyphs = Array.from(ABOUT_BANNER.title);
  const half = Math.ceil(glyphs.length / 2);
  return (
    <section
      aria-labelledby="about-banner-title"
      {...stylex.props(s.section, s.bandPage, styles.section)}
    >
      <div {...stylex.props(s.shell)}>
        <div {...stylex.props(styles.head)}>
          <nav aria-label="面包屑导航" {...stylex.props(styles.crumbs)}>
            <button
              type="button"
              lang="en"
              aria-label="首页"
              onClick={() => onNavigateHome("top")}
              {...stylex.props(styles.crumbHome, s.focusRing)}
            >
              Home
            </button>
            <span lang="en" aria-current="page" {...stylex.props(styles.crumbCurrent)}>
              About
            </span>
          </nav>
          <h1 id="about-banner-title" {...stylex.props(styles.title)}>
            <span {...stylex.props(s.srOnly)}>{ABOUT_BANNER.title}</span>
            <Fold as="span" side="left" sx={styles.titleStart}>
              <span aria-hidden="true">{glyphs.slice(0, half).join("")}</span>
            </Fold>
            <Fold as="span" side="right" sx={styles.titleEnd}>
              <span aria-hidden="true">{glyphs.slice(half).join("")}</span>
            </Fold>
          </h1>
          <div {...stylex.props(styles.spread)}>
            <p lang="en" {...stylex.props(styles.tagline)}>
              {ABOUT_BANNER.tagline}
            </p>
            <p {...stylex.props(styles.lead)}>{ABOUT_BANNER.lead}</p>
          </div>
        </div>
      </div>
      <div {...stylex.props(styles.stage)}>
        <figure {...stylex.props(styles.figure)}>
          <img
            src={ABOUT_BANNER.image}
            alt={ABOUT_BANNER.alt}
            fetchPriority="high"
            decoding="async"
            {...stylex.props(s.fill, styles.image)}
          />
        </figure>
      </div>
    </section>
  );
}
