import * as stylex from "@stylexjs/stylex";
import { m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_BANNER } from "../../about-data";
import { corridorDrawing, type Drawing } from "./perspective";
import { ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

const PHONE = corridorDrawing(15, false);
const TABLET = corridorDrawing(21, true);
const LOOK_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const EYE_RANGE = 4;
const EYE_SPRING = { stiffness: 60, damping: 18, mass: 0.8 };

const openPhone = stylex.keyframes({
  "0%": { clipPath: "inset(15% 15%)" },
  "100%": { clipPath: "inset(0% 0%)" },
});
const openTablet = stylex.keyframes({
  "0%": { clipPath: "inset(21% 21%)" },
  "100%": { clipPath: "inset(0% 0%)" },
});
const openDesktop = stylex.keyframes({
  "0%": { clipPath: "inset(30% 30%)" },
  "100%": { clipPath: "inset(0% 0%)" },
});
const appear = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  hero: {
    position: "relative",
    height: chrome.stage,
    overflow: "hidden",
    backgroundColor: tone.paper,
  },
  stage: {
    position: "absolute",
    inset: 0,
    transformOrigin: "50% 50%",
  },
  drawing: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    animationDuration: "1600ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 280ms)",
    animationTimingFunction: chrome.ease,
    animationFillMode: "both",
  },
  phone: {
    display: { default: "block", [bp.tablet]: "none", [bp.desktop]: "none" },
    animationName: { default: openPhone, [bp.motionReduce]: "none" },
  },
  tablet: {
    display: { default: "none", [bp.tablet]: "block" },
    animationName: { default: openTablet, [bp.motionReduce]: "none" },
  },
  desktop: {
    display: { default: "none", [bp.desktop]: "block" },
    animationName: { default: openDesktop, [bp.motionReduce]: "none" },
  },
  edges: {
    fill: "none",
    stroke: tone.lineStrong,
    strokeWidth: 1,
  },
  fine: {
    fill: "none",
    stroke: tone.line,
    strokeWidth: 1,
  },
  works: {
    fill: tone.paper,
    stroke: tone.lineStrong,
    strokeWidth: 1,
  },
  farWall: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    textAlign: "center",
    inset: { default: "15%", [bp.tablet]: "21%", [bp.desktop]: "30%" },
    paddingInline: { default: 12, [bp.desktop]: 24 },
    animationName: { default: appear, [bp.motionReduce]: "none" },
    animationDuration: "900ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 80ms)",
    animationTimingFunction: chrome.ease,
    animationFillMode: "both",
  },
  eyebrow: {
    margin: 0,
    color: tone.navy,
  },
  title: {
    margin: 0,
    marginTop: { default: 18, [bp.desktop]: 14, [bp.wide]: 20 },
    fontFamily: face.sans,
    fontWeight: 300,
    fontSize: {
      default: 48,
      [bp.tablet]: 76,
      [bp.laptop]: 62,
      [bp.wide]: "clamp(76px, 6.4vw, 104px)",
    },
    lineHeight: 1.08,
    letterSpacing: "0.06em",
    marginInlineEnd: "-0.06em",
    color: tone.navy,
    fontFeatureSettings: '"palt"',
  },
  tagline: {
    margin: 0,
    marginTop: { default: 12, [bp.desktop]: 10, [bp.wide]: 14 },
    fontSize: { default: 20, [bp.tablet]: 24, [bp.laptop]: 20, [bp.wide]: 26 },
    lineHeight: 1.25,
    color: tone.ink,
  },
  lead: {
    margin: 0,
    marginTop: { default: 18, [bp.desktop]: 14, [bp.wide]: 20 },
    maxWidth: "30em",
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.wide]: 16 },
    lineHeight: 1.75,
    color: tone.body,
  },
  balanced: {
    display: "block",
    textWrap: "balance",
  },
});

function Lines({ drawing, sx }: { drawing: Drawing; sx: stylex.StyleXStyles }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      {...stylex.props(styles.drawing, sx)}
    >
      <path d={drawing.fine} vectorEffect="non-scaling-stroke" {...stylex.props(styles.fine)} />
      <path d={drawing.edges} vectorEffect="non-scaling-stroke" {...stylex.props(styles.edges)} />
      {drawing.works ? (
        <path d={drawing.works} vectorEffect="non-scaling-stroke" {...stylex.props(styles.works)} />
      ) : null}
    </svg>
  );
}

function LookingLines({ eyeX, eyeY }: { eyeX: MotionValue<number>; eyeY: MotionValue<number> }) {
  const fine = useTransform(() => corridorDrawing(30, true, [eyeX.get(), eyeY.get()]).fine);
  const edges = useTransform(() => corridorDrawing(30, true, [eyeX.get(), eyeY.get()]).edges);
  const works = useTransform(() => corridorDrawing(30, true, [eyeX.get(), eyeY.get()]).works);
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      {...stylex.props(styles.drawing, styles.desktop)}
    >
      <m.path d={fine} vectorEffect="non-scaling-stroke" {...stylex.props(styles.fine)} />
      <m.path d={edges} vectorEffect="non-scaling-stroke" {...stylex.props(styles.edges)} />
      <m.path d={works} vectorEffect="non-scaling-stroke" {...stylex.props(styles.works)} />
    </svg>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const lookRef = useRef(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start 80px", "end 80px"] });
  const dolly = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.24]);
  const eyeX = useSpring(50, EYE_SPRING);
  const eyeY = useSpring(50, EYE_SPRING);
  const wallX = useTransform(eyeX, (x) => `${(x - 50) * 1.5}%`);
  const wallY = useTransform(eyeY, (y) => `${(y - 50) * 1.5}%`);

  useEffect(() => {
    const query = window.matchMedia(LOOK_QUERY);
    const update = () => {
      lookRef.current = query.matches && !reduce;
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [reduce]);

  return (
    <section
      ref={heroRef}
      aria-labelledby="oos1z-title"
      onPointerMove={(event) => {
        if (!lookRef.current) return;
        const box = event.currentTarget.getBoundingClientRect();
        eyeX.set(50 + ((event.clientX - box.left) / box.width - 0.5) * 2 * EYE_RANGE);
        eyeY.set(50 + ((event.clientY - box.top) / box.height - 0.5) * 2 * EYE_RANGE * 0.6);
      }}
      onPointerLeave={() => {
        eyeX.set(50);
        eyeY.set(50);
      }}
      {...stylex.props(styles.hero)}
    >
      <m.div style={{ scale: dolly }} {...stylex.props(styles.stage)}>
        <Lines drawing={PHONE} sx={styles.phone} />
        <Lines drawing={TABLET} sx={styles.tablet} />
        <LookingLines eyeX={eyeX} eyeY={eyeY} />
        <m.div style={{ x: wallX, y: wallY }} {...stylex.props(styles.farWall)}>
          <p lang="en" {...stylex.props(ui.caps, styles.eyebrow)}>
            {ABOUT_BANNER.established} — {ABOUT_BANNER.place}
          </p>
          <h1 id="oos1z-title" {...stylex.props(styles.title)}>
            {ABOUT_BANNER.title}
          </h1>
          <p lang="en" {...stylex.props(ui.italic, styles.tagline)}>
            {ABOUT_BANNER.tagline}
          </p>
          <p {...stylex.props(styles.lead)}>
            <span {...stylex.props(styles.balanced)}>{ABOUT_BANNER.lead}</span>
          </p>
        </m.div>
      </m.div>
    </section>
  );
}
