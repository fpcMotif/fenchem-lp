import * as stylex from "@stylexjs/stylex";
import { animate, m, useInView, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_BANNER, ABOUT_HERO } from "../../about-data";
import { CompanyName } from "./company-name";
import { GrowthDisc } from "./growth-disc";
import { SectionHead } from "./section-head";
import { PINNED_QUERY, ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";
import { useMediaQuery } from "./use-media-query";

const GROWTH_END = 0.5;
const SAPLING = 0.14;
const PINNED_GUTTER = "calc(max(0px, (100% - 1440px) / 2) + min(120px, 8.333vw))";
const FOUR_COLUMNS = "calc((100% - 264px) / 3 + 72px)";
const HERO_EDGE = "clamp(28px, 6svh, 64px)";

const smooth = (value: number) => value * value * (3 - 2 * value);

const styles = stylex.create({
  track: {
    position: "relative",
    display: { default: "grid", [bp.pinned]: "block" },
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.desktopStill]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
    width: "100%",
    maxWidth: { default: 1440, [bp.pinned]: "none" },
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: {
      default: 20,
      [bp.tablet]: 40,
      [bp.desktopStill]: chrome.inset,
      [bp.pinned]: 0,
    },
    paddingBottom: { default: 96, [bp.tablet]: 128, [bp.desktopStill]: 144, [bp.pinned]: 0 },
  },
  stage: {
    display: { default: "contents", [bp.pinned]: "block" },
    position: { default: "static", [bp.pinned]: "sticky" },
    top: chrome.header,
    zIndex: 0,
    height: { default: "auto", [bp.pinned]: chrome.stage },
    overflow: { default: "visible", [bp.pinned]: "hidden" },
    boxSizing: "border-box",
    paddingInline: { default: 0, [bp.pinned]: PINNED_GUTTER },
  },
  canvas: {
    display: { default: "contents", [bp.pinned]: "block" },
    position: "relative",
    height: "100%",
  },
  intro: {
    gridColumn: { default: "1 / -1", [bp.desktopStill]: "1 / 7" },
    paddingTop: { default: 40, [bp.tablet]: 72, [bp.desktopStill]: 96, [bp.pinned]: 0 },
    position: { default: "relative", [bp.pinned]: "absolute" },
    top: { default: "auto", [bp.pinned]: HERO_EDGE },
    left: 0,
    width: { default: "auto", [bp.pinned]: FOUR_COLUMNS },
    zIndex: 1,
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 72, [bp.tablet]: 104, [bp.laptop]: 112, [bp.wide]: 136 },
    lineHeight: 1.02,
    letterSpacing: "0.01em",
    fontFeatureSettings: '"palt"',
  },
  titleWord: {
    display: { default: "inline", [bp.desktop]: "block" },
  },
  titleLight: {
    fontWeight: 300,
    color: tone.ink,
  },
  titleStrong: {
    fontWeight: 700,
    color: tone.navy,
  },
  lead: {
    marginTop: { default: 24, [bp.desktop]: 32 },
    maxWidth: "22em",
  },
  motto: {
    gridColumn: { default: "1 / -1", [bp.desktopStill]: "8 / 13" },
    alignSelf: "end",
    paddingTop: { default: 28, [bp.desktopStill]: 0 },
    position: { default: "relative", [bp.pinned]: "absolute" },
    bottom: { default: "auto", [bp.pinned]: HERO_EDGE },
    left: 0,
    width: { default: "auto", [bp.pinned]: FOUR_COLUMNS },
    zIndex: 1,
  },
  tagline: {
    margin: 0,
    fontSize: { default: 30, [bp.tablet]: 36, [bp.laptop]: 32, [bp.wide]: 40 },
    lineHeight: 1.1,
    color: tone.ink,
    textWrap: "balance",
  },
  caption: {
    margin: 0,
    marginTop: 16,
    fontSize: 14,
    letterSpacing: "0.03em",
    color: tone.body,
  },
  discSlot: {
    gridColumn: { default: "1 / -1", [bp.desktopStill]: "1 / 7" },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: { default: 48, [bp.tablet]: 64, [bp.desktopStill]: 96, [bp.pinned]: 0 },
    position: { default: "relative", [bp.pinned]: "absolute" },
    top: 0,
    bottom: 0,
    left: { default: "auto", [bp.pinned]: "calc((100% + 24px) / 3)" },
    right: 0,
  },
  disc: {
    width: {
      default: "min(100%, 440px)",
      [bp.tablet]: "min(100%, 560px)",
      [bp.desktopStill]: "100%",
      [bp.pinned]: "min(calc(100svh - 192px), 100%, 760px)",
    },
    willChange: { default: "auto", [bp.pinned]: "transform" },
  },
  runway: {
    display: { default: "none", [bp.pinned]: "block" },
    height: "220svh",
  },
  profile: {
    gridColumn: { default: "1 / -1", [bp.desktopStill]: "8 / 13" },
    alignSelf: "center",
    position: "relative",
    zIndex: 1,
    paddingTop: { default: 56, [bp.tablet]: 72, [bp.desktopStill]: 96, [bp.pinned]: 0 },
    marginTop: { default: 0, [bp.pinned]: chrome.stageLift },
    minHeight: { default: 0, [bp.pinned]: chrome.stage },
    display: { default: "block", [bp.pinned]: "grid" },
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    columnGap: 24,
    alignItems: "center",
    boxSizing: "border-box",
    paddingInline: { default: 0, [bp.pinned]: PINNED_GUTTER },
    scrollMarginTop: chrome.header,
  },
  profileCopy: {
    gridColumn: "8 / 13",
    maxWidth: { default: 560, [bp.desktop]: "none" },
  },
  company: {
    margin: 0,
    marginTop: { default: 22, [bp.desktop]: 28 },
    fontFamily: face.sans,
    fontWeight: 400,
    fontSize: { default: 28, [bp.tablet]: 36, [bp.laptop]: 32, [bp.wide]: 40 },
    lineHeight: 1.3,
    letterSpacing: "0.03em",
    color: tone.ink,
  },
  english: {
    margin: 0,
    marginTop: 12,
    fontSize: 14,
    letterSpacing: "0.03em",
    color: tone.body,
  },
  profileLead: {
    marginTop: { default: 24, [bp.desktop]: 28 },
  },
  network: {
    marginTop: { default: 24, [bp.desktop]: 32 },
    paddingTop: { default: 20, [bp.desktop]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  networkLabel: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.6,
    color: tone.navy,
  },
  countries: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(4, minmax(0, 1fr))",
      [bp.laptop]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 16,
    rowGap: 6,
    margin: 0,
    marginTop: 14,
    padding: 0,
    listStyleType: "none",
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.6,
    color: tone.body,
    whiteSpace: "nowrap",
  },
});

export function Growth() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const saplingRef = useRef(0);
  const pinned = useMediaQuery(PINNED_QUERY);
  const reduce = useReducedMotion();
  const growth = useMotionValue(0);
  const travel = useMotionValue(0);
  const fit = useMotionValue(1);
  const inView = useInView(discRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80px", "end end"],
  });

  useEffect(() => {
    if (reduce) {
      growth.set(1);
      return;
    }
    if (pinned) {
      const sapling = saplingRef;
      const sync = () => {
        const scrolled = Math.min(Math.max(scrollYProgress.get() / GROWTH_END, 0), 1);
        growth.set(Math.min(sapling.current + (1 - SAPLING) * scrolled, 1));
      };
      const intro = animate(sapling.current, SAPLING, {
        duration: 2,
        delay: 0.4,
        ease: [0.3, 0, 0.2, 1],
        onUpdate: (value) => {
          sapling.current = value;
          sync();
        },
      });
      sync();
      const unsubscribe = scrollYProgress.on("change", sync);
      return () => {
        intro.stop();
        unsubscribe();
      };
    }
    if (!inView) {
      growth.set(0);
      return;
    }
    const controls = animate(growth, 1, { duration: 3.4, ease: [0.42, 0, 0.3, 1] });
    return () => controls.stop();
  }, [growth, inView, pinned, reduce, scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const disc = discRef.current;
    if (!pinned || !canvas || !disc) return;
    const measure = () => {
      const width = canvas.clientWidth;
      travel.set((5 * width) / 12 + 10);
      fit.set(Math.min(0.86, (width - 24) / 2 / Math.max(disc.offsetWidth, 1)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [fit, pinned, travel]);

  const settle = useTransform(scrollYProgress, [0.5, 0.92], [0, 1], { ease: smooth });
  const discX = useTransform([settle, travel], ([s, t]: number[]) => -s * t);
  const discScale = useTransform([settle, fit], ([s, f]: number[]) => 1 - s * (1 - f));
  const heroOpacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0.4, 0.5], [0, -24]);
  const heroMotion = pinned ? { opacity: heroOpacity, y: heroY } : { opacity: 1, y: 0 };

  return (
    <div ref={trackRef} {...stylex.props(styles.track)}>
      <div {...stylex.props(styles.stage)}>
        <div ref={canvasRef} {...stylex.props(styles.canvas)}>
          <m.header style={heroMotion} {...stylex.props(styles.intro)}>
            <h1 {...stylex.props(styles.title)}>
              <span {...stylex.props(styles.titleWord, styles.titleLight)}>
                {ABOUT_BANNER.title.slice(0, 2)}
              </span>
              <span {...stylex.props(styles.titleWord, styles.titleStrong)}>
                {ABOUT_BANNER.title.slice(2)}
              </span>
            </h1>
            <p {...stylex.props(ui.lead, styles.lead)}>{ABOUT_BANNER.lead}</p>
          </m.header>

          <m.div style={heroMotion} {...stylex.props(styles.motto)}>
            <p lang="en" {...stylex.props(ui.serif, styles.tagline)}>
              {ABOUT_BANNER.tagline}
            </p>
            <p lang="en" {...stylex.props(ui.latin, styles.caption)}>
              One ring for every year since 1995.
            </p>
          </m.div>

          <div {...stylex.props(styles.discSlot)}>
            <m.div
              ref={discRef}
              style={pinned ? { x: discX, scale: discScale } : { x: 0, scale: 1 }}
              {...stylex.props(styles.disc)}
            >
              <GrowthDisc growth={growth} />
            </m.div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" {...stylex.props(styles.runway)} />

      <section id="about-profile" aria-labelledby="oos1o-profile" {...stylex.props(styles.profile)}>
        <div {...stylex.props(styles.profileCopy)}>
          <SectionHead id="oos1o-profile" label="Profile" title="企业概况" quiet />
          <p {...stylex.props(styles.company)}>
            <CompanyName name={ABOUT_HERO.title} />
          </p>
          <p lang="en" {...stylex.props(ui.latin, styles.english)}>
            {ABOUT_HERO.englishTitle}
          </p>
          <p {...stylex.props(ui.lead, styles.profileLead)}>{ABOUT_HERO.lead}</p>
          <div {...stylex.props(styles.network)}>
            <p {...stylex.props(styles.networkLabel)}>{ABOUT_HERO.networkLabel}</p>
            <ul {...stylex.props(styles.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li key={country}>{country}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
