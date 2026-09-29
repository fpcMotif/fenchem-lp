import * as stylex from "@stylexjs/stylex";
import { m, useInView, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_STATEMENT, ABOUT_SUPPORT, HERO } from "./content";
import { LiquidImage } from "./liquid-hero";
import {
  EASE_OUT,
  LoadFade,
  MaskLine,
  REVEAL_MARGIN,
  usePinEnabled,
  usePinProgress,
} from "./motion";
import {
  color,
  ease,
  font,
  hero as heroTokens,
  layout as layoutTokens,
  media,
} from "./tokens.stylex";
import { Button, TextLink, layout } from "./ui";

const CARD_TOP_PX = 96;
const CARD_BOTTOM_PERCENT = 38;
const CARD_END = 0.42;
const COPY_END = 0.35;
const COPY_FADE_END = 0.28;
const COPY_RISE_PX = 60;
const TOP_SCRIM_END = 0.1;
const STATEMENT_START = 0.26;
const STATEMENT_LINE_SPAN = 0.15;
const STATEMENT_LINE_STEP = 0.05;
const SUPPORT_START = 0.44;
const SUPPORT_END = 0.6;
const SUPPORT_RISE_PX = 12;
const PHOTO_ZOOM_END = 1.06;
const PHOTO_FOCUS = [0.42, 1] as const;

const READY_TIMEOUT_MS = 1500;
const PHOTO_SETTLE_MS = 1400;
const TITLE_START_MS = 250;
const LINE_START_MS = 400;
const LINE_MS = 900;
const CTA_START_MS = 1000;
const CTA_MS = 500;

const STATEMENT_RISE_S = 0.7;
const STATEMENT_STAGGER_S = 0.1;
const SUPPORT_DELAY_S = 0.35;
const MASK_HIDDEN = "120%";

function gridEdge() {
  const shell = document.documentElement.clientWidth;
  if (window.innerWidth < 1280) return 40;
  return Math.max(0, (shell - 1440) / 2) + Math.min(120, window.innerWidth * 0.08333);
}

function cardInset(amount: number) {
  if (typeof window === "undefined") return "inset(0px)";
  const edge = Math.round(gridEdge()) * amount;
  return `inset(${CARD_TOP_PX * amount}px ${edge}px ${CARD_BOTTOM_PERCENT * amount}% ${edge}px)`;
}

const photoSettle = stylex.keyframes({
  "0%": { transform: "scale(1.08)" },
  "100%": { transform: "scale(1)" },
});

const styles = stylex.create({
  hero: {
    position: "relative",
    height: { default: "auto", [media.pin]: heroTokens.height },
    backgroundColor: color.paper,
  },
  aboutAnchor: {
    position: "absolute",
    left: 0,
    top: { default: heroTokens.stage, [media.pin]: heroTokens.aboutAnchor },
    width: 1,
    height: 0,
    pointerEvents: "none",
  },
  stage: {
    position: { default: "relative", [media.pin]: "sticky" },
    top: 0,
    isolation: "isolate",
    height: { default: "auto", [media.pin]: heroTokens.stage },
    overflow: { default: "visible", [media.pin]: "hidden" },
    backgroundColor: color.paper,
    color: color.paper,
  },
  photoArea: {
    position: { default: "relative", [media.pin]: "absolute" },
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    boxSizing: "border-box",
    width: "100%",
    height: heroTokens.stage,
  },
  photoClip: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    overflow: "hidden",
    backgroundColor: color.deep,
  },
  photoZoom: {
    position: "absolute",
    inset: 0,
    willChange: { default: null, [media.pin]: "transform" },
  },
  photoLayer: {
    position: "absolute",
    inset: 0,
    scale: { default: 1, [media.tabletUp]: 1.12 },
    transformOrigin: { default: "42% 100%", [media.tabletUp]: "0% 100%" },
    transform: { default: "scale(1.08)", [media.motionReduce]: "none" },
  },
  photoSettle: {
    animationName: { default: photoSettle, [media.motionReduce]: "none" },
    animationDuration: `${PHOTO_SETTLE_MS}ms`,
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
    height: "55%",
    backgroundImage: `linear-gradient(to top, ${color.scrim}, ${color.scrimClear})`,
    pointerEvents: "none",
  },
  copy: {
    position: "relative",
    paddingBottom: { default: 48, [media.tabletUp]: 72 },
  },
  title: {
    margin: 0,
    fontFamily: font.cjk,
    fontSize: { default: "min(11vw, 56px)", [media.tabletUp]: "min(104px, 7.2vw)" },
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: 0,
    color: color.paper,
  },
  titleLine: {
    whiteSpace: "nowrap",
  },
  subtitle: {
    margin: 0,
    marginTop: 20,
    fontFamily: font.display,
    fontSize: { default: 18, [media.tabletUp]: 28 },
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: "-0.02em",
    color: color.white90,
  },
  ctaSlot: {
    marginTop: { default: 28, [media.tabletUp]: 40 },
  },
  ctaSlotGone: {
    visibility: "hidden",
  },
  cta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 24,
  },

  statementLayer: {
    position: { default: "relative", [media.pin]: "absolute" },
    left: 0,
    top: { default: "auto", [media.pin]: "65%" },
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    width: "100%",
    height: { default: "auto", [media.pin]: "30%" },
    paddingBlockStart: {
      default: layoutTokens.sectionPadMobile,
      [media.reduceTablet]: layoutTokens.sectionPadTablet,
      [media.reduceDesktop]: layoutTokens.sectionPadDesktop,
      [media.pin]: 0,
    },
    backgroundColor: { default: color.paper, [media.pin]: "transparent" },
    color: color.ink,
  },
  statementGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.tabletUp]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: layoutTokens.gutter,
    rowGap: 24,
    width: "100%",
  },
  statement: {
    gridColumn: { default: "1 / -1", [media.desktop]: "1 / span 9" },
    gridRow: 1,
    alignSelf: { default: null, [media.desktop]: "last baseline" },
    margin: 0,
    fontFamily: font.cjk,
    fontSize: { default: 26, [media.tablet]: 32, [media.desktop]: 40 },
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: 0,
    color: color.ink,
  },
  statementMask: {
    display: { default: "inline", [media.tabletUp]: "block" },
    overflow: "hidden",
    paddingBottom: "0.14em",
    marginBottom: "-0.14em",
  },
  statementInner: {
    display: { default: "inline", [media.tabletUp]: "block" },
  },
  support: {
    gridColumn: { default: "1 / -1", [media.tablet]: "1 / span 9", [media.desktop]: "10 / -1" },
    gridRow: { default: 2, [media.desktop]: 1 },
    alignSelf: { default: null, [media.desktop]: "last baseline" },
    display: { default: "block", [media.pinTablet]: "none" },
    margin: 0,
    fontFamily: font.cjk,
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 1.7,
    color: color.inkMuted,
  },
});

type StatementLineProps = {
  children: string;
  on: boolean;
  index: number;
  pin: MotionValue<number>;
  pinned: boolean;
};

function StatementLine({ children, on, index, pin, pinned }: StatementLineProps) {
  const reduce = useReducedMotion();
  const start = STATEMENT_START + index * STATEMENT_LINE_STEP;
  const y = useTransform(
    pin,
    [0, start, start + STATEMENT_LINE_SPAN, 1],
    [MASK_HIDDEN, MASK_HIDDEN, "0%", "0%"],
  );
  return (
    <span {...stylex.props(styles.statementMask)}>
      <m.span
        {...stylex.props(styles.statementInner)}
        style={pinned ? { y } : undefined}
        initial={pinned ? false : { y: MASK_HIDDEN }}
        animate={pinned ? undefined : { y: on ? "0%" : MASK_HIDDEN }}
        transition={{
          duration: reduce ? 0 : STATEMENT_RISE_S,
          delay: reduce || !on ? 0 : index * STATEMENT_STAGGER_S,
          ease: EASE_OUT,
        }}
      >
        {children}
      </m.span>
    </span>
  );
}

type HeroProps = { ready: boolean; onReady: () => void };

export function Hero({ ready, onReady }: HeroProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const photoAreaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const pinned = usePinEnabled();
  const [copyGone, setCopyGone] = useState(false);
  const [waterPaused, setWaterPaused] = useState(false);
  const statementSeen = useInView(statementRef, { once: true, margin: REVEAL_MARGIN });
  const pin = usePinProgress(sectionRef);
  const frame = useTransform(pin, [0, CARD_END, 1], [0, 1, 1]);
  const clipPath = useTransform(frame, cardInset);
  const photoScale = useTransform(frame, [0, 1], [1, PHOTO_ZOOM_END]);
  const copyProgress = useTransform(pin, [0, COPY_END, 1], [0, 1, 1]);
  const copyOpacity = useTransform(pin, [0, COPY_FADE_END, 1], [1, 0, 0]);
  const copyY = useTransform(copyProgress, [0, 1], [0, -COPY_RISE_PX]);
  const topScrimOpacity = useTransform(pin, [0, TOP_SCRIM_END, 1], [1, 0, 0]);
  const supportOpacity = useTransform(pin, [0, SUPPORT_START, SUPPORT_END, 1], [0, 0, 1, 1]);
  const supportY = useTransform(
    pin,
    [0, SUPPORT_START, SUPPORT_END, 1],
    [SUPPORT_RISE_PX, SUPPORT_RISE_PX, 0, 0],
  );
  useMotionValueEvent(pin, "change", (value) => {
    setCopyGone(value >= COPY_FADE_END);
    setWaterPaused(value >= CARD_END);
  });

  useEffect(() => {
    const image = imageRef.current;
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      onReady();
    };
    const timer = window.setTimeout(finish, READY_TIMEOUT_MS);
    if (image) image.decode().then(finish, finish);
    else finish();
    return () => {
      settled = true;
      window.clearTimeout(timer);
    };
  }, [onReady]);

  const statementVisible = reduce || statementSeen;

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="oo-hero-title"
      {...stylex.props(styles.hero)}
    >
      <span id="about" aria-hidden="true" {...stylex.props(styles.aboutAnchor)} />
      <div {...stylex.props(styles.stage)}>
        <div ref={photoAreaRef} data-hero-photo="" {...stylex.props(styles.photoArea)}>
          <m.div {...stylex.props(styles.photoClip)} style={pinned ? { clipPath } : undefined}>
            <m.div
              aria-hidden="true"
              {...stylex.props(styles.photoZoom)}
              style={pinned ? { scale: photoScale } : undefined}
            >
              <div {...stylex.props(styles.photoLayer, ready && styles.photoSettle)}>
                <img
                  ref={imageRef}
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
                  hostRef={photoAreaRef}
                  paused={pinned && waterPaused}
                />
              </div>
            </m.div>
            <m.div
              aria-hidden="true"
              {...stylex.props(styles.scrimTop)}
              style={pinned ? { opacity: topScrimOpacity } : undefined}
            />
            <m.div
              aria-hidden="true"
              {...stylex.props(styles.scrimBottom)}
              style={pinned ? { opacity: copyOpacity } : undefined}
            />
            <m.div
              {...stylex.props(layout.shell, layout.inset, styles.copy)}
              style={pinned ? { y: copyY, opacity: copyOpacity } : undefined}
            >
              <h1 id="oo-hero-title" {...stylex.props(styles.title)}>
                <MaskLine
                  sx={styles.titleLine}
                  when="load"
                  start={ready}
                  delay={TITLE_START_MS}
                  duration={LINE_MS}
                >
                  {HERO.zh}
                </MaskLine>
              </h1>
              <p lang="en" {...stylex.props(styles.subtitle)}>
                <MaskLine when="load" start={ready} delay={LINE_START_MS} duration={LINE_MS}>
                  {HERO.en}
                </MaskLine>
              </p>
              <div {...stylex.props(styles.ctaSlot, pinned && copyGone && styles.ctaSlotGone)}>
                <LoadFade start={ready} delay={CTA_START_MS} duration={CTA_MS} sx={styles.cta}>
                  <Button href={HERO.primary.href} tone="white" size="large">
                    {HERO.primary.label}
                  </Button>
                  <TextLink href={HERO.secondary.href} tone="white">
                    {HERO.secondary.label}
                  </TextLink>
                </LoadFade>
              </div>
            </m.div>
          </m.div>
        </div>
        <div ref={statementRef} {...stylex.props(styles.statementLayer)}>
          <div {...stylex.props(layout.shell, layout.inset)}>
            <div {...stylex.props(styles.statementGrid)}>
              <h2 {...stylex.props(styles.statement)}>
                {ABOUT_STATEMENT.map((line, index) => (
                  <StatementLine
                    key={line}
                    on={statementVisible}
                    index={index}
                    pin={pin}
                    pinned={pinned}
                  >
                    {line}
                  </StatementLine>
                ))}
              </h2>
              <m.p
                {...stylex.props(styles.support)}
                style={pinned ? { opacity: supportOpacity, y: supportY } : undefined}
                initial={pinned ? false : { opacity: 0, y: SUPPORT_RISE_PX }}
                animate={
                  pinned
                    ? undefined
                    : {
                        opacity: statementVisible ? 1 : 0,
                        y: statementVisible ? 0 : SUPPORT_RISE_PX,
                      }
                }
                transition={{
                  duration: reduce ? 0 : STATEMENT_RISE_S,
                  delay: reduce || !statementVisible ? 0 : SUPPORT_DELAY_S,
                  ease: EASE_OUT,
                }}
              >
                {ABOUT_SUPPORT}
              </m.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
