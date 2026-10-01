import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER, ABOUT_CSR } from "../../about-data";
import { Monument } from "./parts";
import { base, ty } from "./shared";
import { hue, size } from "./theme.stylex";

const TITLE_LEAD_CHARS = 2;

const rise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(24px)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  hero: {
    position: "relative",
    isolation: "isolate",
    display: "flex",
    flexDirection: "column",
    overflow: "clip",
    minHeight: { default: 0, [breakpoints.md]: "calc(100svh - 56px)" },
    paddingTop: { default: 112, [breakpoints.lg]: 128 },
    paddingBottom: { default: "calc(14vw + 20px)", [breakpoints.md]: "14.2vw" },
    backgroundColor: hue.page,
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: { default: 24, [breakpoints.lg]: 32 },
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    margin: 0,
  },
  head: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [breakpoints.lg]: "auto minmax(0, 1fr)" },
    alignItems: "end",
    columnGap: 56,
    rowGap: 20,
  },
  title: {
    margin: 0,
    fontSize: "clamp(72px, 12.4vw, 220px)",
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "0.02em",
    color: hue.ink,
    animationName: { default: null, [breakpoints.motionOk]: rise },
    animationDuration: "800ms",
    animationDelay: "200ms",
    animationTimingFunction: size.ease,
    animationFillMode: "backwards",
  },
  titleAccent: {
    color: colors.brandBlue700,
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    maxWidth: 400,
    justifySelf: { default: "start", [breakpoints.lg]: "end" },
    paddingBottom: { default: 0, [breakpoints.lg]: 12 },
    animationName: { default: null, [breakpoints.motionOk]: rise },
    animationDuration: "800ms",
    animationDelay: "350ms",
    animationTimingFunction: size.ease,
    animationFillMode: "backwards",
  },
  lead: {
    fontSize: 15,
    lineHeight: 1.85,
  },
  strip: {
    position: "relative",
    flexGrow: 1,
    minHeight: { default: 240, [breakpoints.md]: 200 },
    overflow: "clip",
    backgroundColor: hue.tint,
  },
  monument: {
    left: "-0.035em",
    bottom: { default: "-0.3em", [breakpoints.md]: "-0.36em" },
    fontSize: "24vw",
  },
});

export function Hero() {
  const lead = ABOUT_BANNER.title.slice(0, TITLE_LEAD_CHARS);
  const accent = ABOUT_BANNER.title.slice(TITLE_LEAD_CHARS);

  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(styles.hero)}>
      <Monument
        text="Fenchem"
        photo={ABOUT_CSR.image}
        photoPosition="50% 92%"
        sx={styles.monument}
      />
      <div {...stylex.props(base.shell, styles.inner)}>
        <p lang="en" {...stylex.props(ty.quiet, styles.meta)}>
          <span>{ABOUT_BANNER.established}</span>
          <span>{ABOUT_BANNER.place}</span>
        </p>
        <div {...stylex.props(styles.head)}>
          <h1 id="about-banner-title" {...stylex.props(styles.title)}>
            {lead}
            <span {...stylex.props(styles.titleAccent)}>{accent}</span>
          </h1>
          <div {...stylex.props(styles.text)}>
            <p lang="en" {...stylex.props(ty.serif)}>
              {ABOUT_BANNER.tagline}
            </p>
            <p {...stylex.props(ty.body, styles.lead)}>{ABOUT_BANNER.lead}</p>
          </div>
        </div>
        <div {...stylex.props(styles.strip)}>
          <img
            src={ABOUT_BANNER.image}
            alt={ABOUT_BANNER.alt}
            fetchPriority="high"
            decoding="async"
            {...stylex.props(base.fill)}
          />
        </div>
      </div>
    </section>
  );
}
