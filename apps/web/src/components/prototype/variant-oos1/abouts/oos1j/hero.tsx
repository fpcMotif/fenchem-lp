import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_BANNER, ABOUT_CSR } from "../../about-data";
import { CropMarks, Monument, RiseText } from "./parts";
import { base, ty } from "./shared";
import { hue, size } from "./theme.stylex";

const TITLE_LEAD_CHARS = 2;
const TITLE_DELAY_MS = 180;
const STRIP_DELAY_MS = 420;
const MONUMENT_WATER = ["0% 0%, 50% 92%", "0% 0%, 50% 28%"];

const rise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(24px)" },
  "100%": { opacity: 1, transform: "none" },
});

const open = stylex.keyframes({
  "0%": { clipPath: "inset(0 50% 0 50%)" },
  "100%": { clipPath: "inset(0 0 0 0)" },
});

const settle = stylex.keyframes({
  "0%": { transform: "scale(1.2)" },
  "100%": { transform: "none" },
});

const surface = stylex.keyframes({
  "0%": { clipPath: "inset(100% 0 0 0)" },
  "100%": { clipPath: "inset(0 0 0 0)" },
});

const draw = stylex.keyframes({
  "0%": { transform: "scaleX(0)" },
  "100%": { transform: "none" },
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
    alignItems: "center",
    gap: { default: 16, [breakpoints.lg]: 28 },
    margin: 0,
    color: hue.quiet,
  },
  metaRule: {
    flexGrow: 1,
    height: 1,
    backgroundColor: hue.hairline,
    transformOrigin: "left center",
    animationName: { default: null, [breakpoints.motionOk]: draw },
    animationDuration: "1400ms",
    animationDelay: "260ms",
    animationTimingFunction: size.ease,
    animationFillMode: "backwards",
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
    animationDuration: "900ms",
    animationDelay: "620ms",
    animationTimingFunction: size.ease,
    animationFillMode: "backwards",
  },
  lead: {
    fontSize: 15,
    lineHeight: 1.85,
  },
  stripWrap: {
    position: "relative",
    display: "flex",
    flexGrow: 1,
    minHeight: { default: 240, [breakpoints.md]: 200 },
  },
  strip: {
    position: "relative",
    flexGrow: 1,
    overflow: "clip",
    backgroundColor: hue.tint,
    animationName: { default: null, [breakpoints.motionOk]: open },
    animationDuration: "1500ms",
    animationDelay: `${STRIP_DELAY_MS}ms`,
    animationTimingFunction: size.ease,
    animationFillMode: "backwards",
  },
  settle: {
    position: "absolute",
    inset: 0,
    animationName: { default: null, [breakpoints.motionOk]: settle },
    animationDuration: "2400ms",
    animationDelay: `${STRIP_DELAY_MS}ms`,
    animationTimingFunction: size.ease,
    animationFillMode: "backwards",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "50% 62%",
  },
  monument: {
    left: "-0.035em",
    bottom: { default: "-0.3em", [breakpoints.md]: "-0.36em" },
    fontSize: "24vw",
    animationName: { default: null, [breakpoints.motionOk]: surface },
    animationDuration: "1800ms",
    animationDelay: "900ms",
    animationTimingFunction: size.ease,
    animationFillMode: "backwards",
  },
});

export function Hero() {
  const lead = ABOUT_BANNER.title.slice(0, TITLE_LEAD_CHARS);
  const reduce = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: stripRef, offset: ["start start", "end start"] });
  const water = useTransform(
    scrollY,
    [0, 900],
    reduce ? [MONUMENT_WATER[0], MONUMENT_WATER[0]] : MONUMENT_WATER,
  );
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "8%"]);

  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(styles.hero)}>
      <Monument
        text="Fenchem"
        photo={ABOUT_CSR.image}
        style={{ backgroundPosition: water }}
        sx={styles.monument}
      />
      <div {...stylex.props(base.shell, styles.inner)}>
        <p lang="en" {...stylex.props(ty.quiet, styles.meta)}>
          <span>{ABOUT_BANNER.established}</span>
          <span aria-hidden="true" {...stylex.props(styles.metaRule)} />
          <span>{ABOUT_BANNER.place}</span>
        </p>
        <div {...stylex.props(styles.head)}>
          <h1 id="about-banner-title" {...stylex.props(styles.title)}>
            <RiseText
              text={ABOUT_BANNER.title}
              srText="About Fenchem"
              play
              delay={TITLE_DELAY_MS}
              stagger={90}
              charSx={(index) => index >= lead.length && styles.titleAccent}
            />
          </h1>
          <div {...stylex.props(styles.text)}>
            <p lang="en" {...stylex.props(ty.serif)}>
              {ABOUT_BANNER.tagline}
            </p>
            <p {...stylex.props(ty.body, styles.lead)}>{ABOUT_BANNER.lead}</p>
          </div>
        </div>
        <div {...stylex.props(styles.stripWrap)}>
          <div ref={stripRef} {...stylex.props(styles.strip)}>
            <div {...stylex.props(styles.settle)}>
              <m.img
                src={ABOUT_BANNER.image}
                alt={ABOUT_BANNER.alt}
                fetchPriority="high"
                decoding="async"
                {...stylex.props(styles.image)}
                style={{ y: imageY, scale: reduce ? 1 : 1.18 }}
              />
            </div>
          </div>
          <CropMarks delay={1500} />
        </div>
      </div>
    </section>
  );
}
