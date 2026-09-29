import * as stylex from "@stylexjs/stylex";
import { m, useMotionValueEvent, useTransform } from "motion/react";
import { useRef, useState } from "react";

import { HERO } from "./content";
import { LiquidImage } from "./liquid-hero";
import { LoadFade, MaskLine, usePinEnabled, usePinProgress } from "./motion";
import { color, ease, font, hero as heroTokens, media } from "./tokens.stylex";
import { Button, TextLink, layout } from "./ui";

const PIN_VH = 130;
const SCRUB_VH = 100;
const SCRUB_END = SCRUB_VH / PIN_VH;
const COPY_SPEED = 0.6;
const COPY_FADE_END = 0.7;
const PHOTO_SCALE_END = 1.08;
const PHOTO_ZOOM = 1.12;
const COVERED_AT = 0.98;
const PHOTO_FOCUS = [0.42, 1] as const;

const HEADLINE_START_MS = 150;
const HEADLINE_STAGGER_MS = 90;
const HEADLINE_MS = 700;
const ZH_START_MS = 350;
const ZH_MS = 700;
const CTA_START_MS = 800;
const CTA_MS = 400;

function gridEdge() {
  const shell = document.documentElement.clientWidth;
  if (window.innerWidth < 1280) return 40;
  return Math.max(0, (shell - 1440) / 2) + Math.min(120, window.innerWidth * 0.08333);
}

const photoSettle = stylex.keyframes({
  "0%": { transform: "scale(1.06)" },
  "100%": { transform: "scale(1)" },
});

const styles = stylex.create({
  hero: {
    position: "relative",
    height: { default: heroTokens.stage, [media.pin]: heroTokens.height },
    backgroundColor: color.paper,
  },
  stage: {
    position: { default: "relative", [media.pin]: "sticky" },
    top: 0,
    isolation: "isolate",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: heroTokens.stage,
    color: color.paper,
  },
  photo: {
    position: "absolute",
    inset: 0,
    backgroundColor: color.deep,
    willChange: { default: null, [media.pin]: "transform" },
  },
  photoSettle: {
    position: "absolute",
    inset: 0,
    scale: { default: 1, [media.tabletUp]: PHOTO_ZOOM },
    transformOrigin: { default: "42% 100%", [media.tabletUp]: "0% 100%" },
    animationName: { default: photoSettle, [media.motionReduce]: "none" },
    animationDuration: "1600ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  photoImage: {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "42% 100%",
  },
  scrimTop: {
    position: "absolute",
    top: 0,
    insetInline: 0,
    height: 220,
    backgroundImage: "linear-gradient(to bottom, rgba(6, 22, 56, 0.38), rgba(6, 22, 56, 0))",
    pointerEvents: "none",
  },
  scrimBottom: {
    position: "absolute",
    bottom: 0,
    insetInline: 0,
    height: "45%",
    backgroundImage: "linear-gradient(to top, rgba(6, 22, 56, 0.55), rgba(6, 22, 56, 0))",
    pointerEvents: "none",
  },
  copy: {
    position: "relative",
    paddingBottom: { default: 48, [media.tabletUp]: 72 },
  },
  zh: {
    margin: 0,
    marginBottom: { default: 20, [media.tabletUp]: 32 },
    fontFamily: font.cjk,
    fontSize: { default: 20, [media.tabletUp]: 28 },
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: 0,
    color: color.white90,
    textShadow: "0 1px 16px rgba(6, 22, 56, 0.5)",
  },
  title: {
    margin: 0,
    fontFamily: font.display,
    fontSize: { default: "10.4vw", [media.tabletUp]: "min(118px, 8.2vw)" },
    fontWeight: 600,
    lineHeight: 0.95,
    letterSpacing: "-0.04em",
    wordSpacing: "0.04em",
    color: color.paper,
  },
  titleLine: {
    whiteSpace: { default: "normal", [media.tabletUp]: "nowrap" },
  },
  cta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 24,
    marginTop: { default: 28, [media.tabletUp]: 40 },
  },
});

const viewportHeight = () => (typeof window === "undefined" ? 900 : window.innerHeight);
const edgeAt = () => (typeof window === "undefined" ? 120 : gridEdge());

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pinned = usePinEnabled();
  const [covered, setCovered] = useState(false);
  const pin = usePinProgress(sectionRef);
  const scrub = useTransform(pin, [0, SCRUB_END], [0, 1], { clamp: true });
  const clipPath = useTransform(scrub, (value) => {
    const inset = Math.round(edgeAt()) * value;
    return `inset(0px ${inset}px 0px ${inset}px)`;
  });
  const photoScale = useTransform(scrub, [0, 1], [1, PHOTO_SCALE_END]);
  const copyY = useTransform(scrub, (value) => -COPY_SPEED * value * viewportHeight());
  const copyOpacity = useTransform(scrub, [0, COPY_FADE_END], [1, 0]);
  useMotionValueEvent(pin, "change", (value) => setCovered(value >= COVERED_AT));

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="oo-hero-title"
      {...stylex.props(styles.hero)}
    >
      <m.div
        ref={stageRef}
        {...stylex.props(styles.stage)}
        style={pinned ? { clipPath } : undefined}
      >
        <m.div
          aria-hidden="true"
          {...stylex.props(styles.photo)}
          style={pinned ? { scale: photoScale } : undefined}
        >
          <div {...stylex.props(styles.photoSettle)}>
            <img
              src={HERO.image}
              alt=""
              width={2400}
              height={1712}
              decoding="async"
              fetchPriority="high"
              {...stylex.props(styles.photoImage)}
            />
            <LiquidImage
              src={HERO.image}
              focus={PHOTO_FOCUS}
              hostRef={stageRef}
              paused={pinned && covered}
            />
          </div>
        </m.div>
        <div aria-hidden="true" {...stylex.props(styles.scrimTop)} />
        <div aria-hidden="true" {...stylex.props(styles.scrimBottom)} />
        <m.div
          {...stylex.props(layout.shell, layout.inset, styles.copy)}
          style={pinned ? { y: copyY, opacity: copyOpacity } : undefined}
        >
          <LoadFade as="p" delay={ZH_START_MS} duration={ZH_MS} sx={styles.zh}>
            {HERO.zh}
          </LoadFade>
          <h1 id="oo-hero-title" lang="en" {...stylex.props(styles.title)}>
            {HERO.headline.map((line, index) => (
              <MaskLine
                key={line}
                sx={styles.titleLine}
                when="load"
                delay={HEADLINE_START_MS + index * HEADLINE_STAGGER_MS}
                duration={HEADLINE_MS}
              >
                {line}
              </MaskLine>
            ))}
          </h1>
          <LoadFade delay={CTA_START_MS} duration={CTA_MS} sx={styles.cta}>
            <Button href={HERO.primary.href} onDark>
              {HERO.primary.label}
            </Button>
            <TextLink href={HERO.secondary.href} tone="white">
              {HERO.secondary.label}
            </TextLink>
          </LoadFade>
        </m.div>
      </m.div>
    </section>
  );
}
