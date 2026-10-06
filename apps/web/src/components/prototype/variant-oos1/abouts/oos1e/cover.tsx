import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-react";

import { ABOUT_BANNER } from "../../about-data";
import { base } from "./shared";
import { Stamp } from "./stamp";
import { color, font, media } from "./tokens.stylex";

const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const PAPER_INSET = "max(96px, calc(50vw - 624px))";

const styles = stylex.create({
  cover: {
    position: "relative",
    isolation: "isolate",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.lgUp]: "minmax(0, 5fr) minmax(0, 7fr)",
    },
    minHeight: { default: null, [media.lgUp]: "clamp(640px, 88svh, 820px)" },
    backgroundColor: colors.paper,
  },
  photo: {
    position: "relative",
    overflow: "hidden",
    height: { default: 360, [media.md]: 500, [media.lgUp]: "auto" },
    gridColumn: { default: "auto", [media.lgUp]: "2" },
    gridRow: { default: "auto", [media.lgUp]: "1" },
    backgroundColor: color.tint,
  },
  image: {
    objectPosition: { default: "58% 40%", [media.lgUp]: "50% 50%" },
  },
  scrim: {
    backgroundImage:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0px, rgba(255, 255, 255, 0) 150px)",
    pointerEvents: "none",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: { default: 36, [media.lgUp]: 56 },
    boxSizing: "border-box",
    paddingTop: { default: 28, [media.md]: 40, [media.lgUp]: 112 },
    paddingBottom: { default: 52, [media.md]: 64, [media.lgUp]: 80 },
    paddingInlineStart: { default: 20, [media.md]: 36, [media.lgUp]: PAPER_INSET },
    paddingInlineEnd: { default: 20, [media.md]: 36, [media.lgUp]: 48 },
    gridColumn: { default: "auto", [media.lgUp]: "1" },
    gridRow: { default: "auto", [media.lgUp]: "1" },
    fontFamily: font.cjk,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    letterSpacing: "0.05em",
    color: color.body,
  },
  breadcrumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    letterSpacing: "inherit",
    color: { default: color.body, ":hover": color.ink },
    textDecoration: { default: "none", ":hover": "underline" },
    textUnderlineOffset: 4,
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  breadcrumbCurrent: {
    color: color.ink,
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 16, [media.lgUp]: 20 },
  },
  title: {
    margin: 0,
    fontSize: { default: 60, [media.md]: 84, [media.lgUp]: "clamp(56px, 6.4vw, 104px)" },
    fontWeight: 700,
    lineHeight: 1.08,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  tagline: {
    margin: 0,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: 22, [media.lgUp]: 28 },
    fontWeight: 400,
    lineHeight: 1.25,
    color: color.body,
  },
  lead: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    margin: 0,
    fontSize: { default: 15, [media.lgUp]: 16 },
    lineHeight: 1.9,
    letterSpacing: "0.06em",
    color: color.body,
  },
  leadYear: {
    color: color.muted,
  },
  stamp: {
    top: { default: 296, [media.md]: 436, [media.lgUp]: "auto" },
    right: { default: 20, [media.md]: 36, [media.lgUp]: "auto" },
    bottom: { default: "auto", [media.lgUp]: "20%" },
    left: { default: "auto", [media.lgUp]: "calc(41.667% - 40px)" },
    zIndex: 1,
    width: { default: 104, [media.md]: 140, [media.lgUp]: 168 },
  },
});

export function Cover({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const [leadYear, leadFocus] = ABOUT_BANNER.lead.split(" · ");
  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(styles.cover)}>
      <div {...stylex.props(styles.photo)}>
        <img
          src={ABOUT_BANNER.image}
          alt={ABOUT_BANNER.alt}
          fetchPriority="high"
          decoding="async"
          {...stylex.props(base.fill, styles.image)}
        />
        <div aria-hidden="true" {...stylex.props(base.fill, styles.scrim)} />
      </div>
      <div {...stylex.props(styles.paper)}>
        <nav aria-label="面包屑导航" {...stylex.props(styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(styles.breadcrumbLink, base.focusRing)}
          >
            首页
          </button>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
            关于我们
          </span>
        </nav>
        <div {...stylex.props(styles.heading)}>
          <h1 id="about-banner-title" {...stylex.props(styles.title)}>
            {ABOUT_BANNER.title}
          </h1>
          <p lang="en" {...stylex.props(styles.tagline)}>
            {ABOUT_BANNER.tagline}
          </p>
        </div>
        <p {...stylex.props(styles.lead)}>
          <span {...stylex.props(base.balance, styles.leadYear)}>
            {leadYear}
            <span {...stylex.props(base.srOnly)}>，</span>
          </span>
          <span {...stylex.props(base.balance)}>{leadFocus}</span>
        </p>
      </div>
      <Stamp kind="year" ring="FENCHEM · EST. 1995 · NANJING · " tilt={-9} sx={styles.stamp} />
    </section>
  );
}
