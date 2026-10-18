import * as stylex from "@stylexjs/stylex";
import { useMotionValueEvent, useScroll } from "@/compat/motion";
import type { JSX } from "@solidjs/web";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_BANNER, ABOUT_HERO } from "../../about-data";
import { ui } from "./layout";
import { TICK, echoIndexes, trailOpacity } from "./strobe-values";
import { frameLabel } from "./time-grid-values";
import { bp, face, tone } from "./tokens.stylex";
import { createEffect, createSignal, type Accessor } from "solid-js";

const EXPOSURES = 7;
const ECHOES = EXPOSURES - 1;
const PHONE_ECHOES = 3;
const BRIGHTEST_ECHO = 0.24;
const REDUCED_ECHO_OPACITY = 0.12;
const LOAD_DELAY_MS = 240;
const NAME_BREAK = 6;
const DESKTOP_QUERY = "(min-width: 1024px)";
const PHONE_QUERY = "(max-width: 767.98px)";

const NAME_LINES = [ABOUT_HERO.title.slice(0, NAME_BREAK), ABOUT_HERO.title.slice(NAME_BREAK)];

const pop = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  section: {
    position: "relative",
    height: {
      default: "auto",
      [bp.pin]: "calc(max(640px, 100svh - 80px) + 72svh)",
    },
  },
  frame: {
    position: { default: "relative", [bp.pin]: "sticky" },
    top: { default: "auto", [bp.pin]: "80px" },
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    height: { default: "auto", [bp.pin]: "max(640px, 100svh - 80px)" },
    minHeight: { default: 0, [bp.desktop]: "max(640px, 100svh - 80px)" },
    paddingTop: { default: 40, [bp.tablet]: 64, [bp.desktop]: 48 },
    paddingBottom: { default: 40, [bp.tablet]: 56, [bp.desktop]: 44 },
  },
  topRow: {
    alignItems: "baseline",
    rowGap: 8,
  },
  kicker: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    margin: 0,
  },
  kickerTitle: {
    fontFamily: face.sans,
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  kickerEnglish: {
    fontSize: { default: 19, [bp.desktop]: 22 },
  },
  place: {
    margin: 0,
    justifySelf: "end",
    fontFamily: face.latin,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: tone.navy,
    display: { default: "none", [bp.abovePhone]: "block" },
  },
  middle: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingBlock: { default: 36, [bp.tablet]: 56, [bp.desktop]: 16 },
  },
  plate: {
    containerType: "inline-size",
  },
  title: {
    "--dx": "0.32em",
    "--dy": "0.18em",
    margin: 0,
    paddingTop: {
      default: "calc(3 * var(--dy))",
      [bp.abovePhone]: "calc(6 * var(--dy))",
    },
    paddingInlineStart: { default: "calc(3 * var(--dx) * 0.5)", [bp.abovePhone]: 0 },
    fontFamily: face.sans,
    fontWeight: 500,
    fontSize: {
      default: "calc(100cqw / 6.8)",
      [bp.tablet]: "calc((75cqw - 12px) / 6.2)",
      [bp.desktop]: "min(calc((75cqw - 18px) / 6.2), calc((100svh - 400px) / 3.7))",
    },
    lineHeight: 1.08,
    letterSpacing: "0.02em",
    color: tone.ink,
    whiteSpace: "nowrap",
  },
  titleReduced: {
    paddingTop: "var(--dy)",
  },
  stack: {
    position: "relative",
    display: "block",
  },
  nameLine: {
    display: "block",
  },
  finalName: {
    display: "block",
    animationName: { default: pop, [bp.motionReduce]: "none" },
    animationDuration: "1ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + var(--pop-at))",
    animationFillMode: "both",
  },
  echo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    color: tone.navy,
    pointerEvents: "none",
    userSelect: "none",
    animationName: { default: pop, [bp.motionReduce]: "none" },
    animationDuration: "1ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + var(--pop-at))",
    animationFillMode: "both",
  },
  echoInner: {
    display: "block",
    transform: {
      default:
        "translate3d(calc(max(0, var(--k) - var(--m)) * var(--dx) * -0.5), calc(max(0, var(--k) - var(--m)) * var(--dy) * -1), 0)",
      [bp.abovePhone]:
        "translate3d(calc(max(0, var(--k) - var(--m)) * var(--dx) * -1), calc(max(0, var(--k) - var(--m)) * var(--dy) * -1), 0)",
    },
    opacity: "calc(var(--o) * clamp(0, (var(--k) - var(--m)) * 2, 1))",
    willChange: "transform, opacity",
  },
  echoBeyondPhone: {
    display: { default: "none", [bp.abovePhone]: "block" },
  },
  english: {
    display: "block",
    marginTop: { default: 14, [bp.desktop]: 18 },
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: { default: 26, [bp.tablet]: 32, [bp.desktop]: "clamp(34px, 2.9vw, 44px)" },
    lineHeight: 1.1,
    letterSpacing: 0,
    color: tone.navy,
    whiteSpace: "normal",
  },
  bottomRow: {
    alignItems: "end",
    rowGap: 20,
  },
  year: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    margin: 0,
  },
  yearLabel: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 22,
    color: tone.navy,
  },
  yearDigits: {
    fontFamily: face.latin,
    fontWeight: 500,
    fontSize: { default: 48, [bp.desktop]: 60 },
    lineHeight: 0.9,
    letterSpacing: "-0.01em",
    fontVariantNumeric: "tabular-nums",
    color: tone.ink,
  },
  yearEcho: {
    marginInlineEnd: "-0.1em",
    color: tone.navy,
    opacity: 0.3,
  },
  lead: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 17, [bp.desktop]: 19 },
    lineHeight: 1.75,
    color: tone.ink,
    textWrap: "balance",
  },
  readout: {
    display: { default: "none", [bp.abovePhone]: "flex" },
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 7,
    margin: 0,
  },
  readoutLine: {
    display: "flex",
    gap: 10,
  },
  readoutValue: {
    color: tone.navy,
  },
});

type ScrubRefs = {
  title: Accessor<HTMLHeadingElement | undefined>;
  count: Accessor<HTMLSpanElement | undefined>;
  travel: { current: number };
  echoes: { current: number };
};

function mergeExposures(scrollTop: number, refs: ScrubRefs) {
  const title = refs.title();
  if (!title) return;
  const echoes = refs.echoes.current;
  const merged = Math.min(1, Math.max(0, scrollTop / refs.travel.current)) * echoes;
  title.style.setProperty("--m", merged.toFixed(3));
  const visible = 1 + echoIndexes(echoes).filter((k) => k - merged > 0.5).length;
  const label = frameLabel(visible);
  const count = refs.count();
  if (count && count.textContent !== label) count.textContent = label;
}

function useHeroScrub(reduce: Accessor<boolean>) {
  const [sectionRef, setSectionRef] = createSignal<HTMLElement>();
  const [frameRef, setFrameRef] = createSignal<HTMLDivElement>();
  const [titleRef, setTitleRef] = createSignal<HTMLHeadingElement>();
  const [countRef, setCountRef] = createSignal<HTMLSpanElement>();
  const travelRef = { current: 1 };
  const echoesRef = { current: ECHOES };
  const refs: ScrubRefs = {
    title: titleRef,
    count: countRef,
    travel: travelRef,
    echoes: echoesRef,
  };
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (scrollTop) => {
    if (!reduce()) mergeExposures(scrollTop, refs);
  });

  createEffect(
    () => ({ section: sectionRef(), frame: frameRef(), title: titleRef(), reduce: reduce() }),
    ({ section, frame, title, reduce }) => {
      if (!section || !frame || !title) return;
      const scrubRefs: ScrubRefs = {
        title: titleRef,
        count: countRef,
        travel: travelRef,
        echoes: echoesRef,
      };
      if (reduce) {
        title.style.setProperty("--m", "0");
        const count = countRef();
        if (count) count.textContent = frameLabel(2);
        return;
      }
      const measure = () => {
        const pinned = window.matchMedia(DESKTOP_QUERY).matches;
        echoesRef.current = window.matchMedia(PHONE_QUERY).matches ? PHONE_ECHOES : ECHOES;
        travelRef.current = Math.max(
          1,
          pinned ? (section.offsetHeight - frame.offsetHeight) * 0.9 : frame.offsetHeight * 0.5,
        );
        mergeExposures(window.scrollY, scrubRefs);
      };
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(section);
      return () => observer.disconnect();
    },
  );

  return { setSectionRef, setFrameRef, setTitleRef, setCountRef };
}

function NameLines() {
  return NAME_LINES.map((line) => <span {...stylex.attrs(styles.nameLine)}>{line}</span>);
}

export function Hero() {
  const reduce = useReducedMotion();
  const { setSectionRef, setFrameRef, setTitleRef, setCountRef } = useHeroScrub(reduce);
  const echoes = () => (reduce() ? [1] : echoIndexes(ECHOES));

  return (
    <section ref={setSectionRef} aria-labelledby="oos1p-title" {...stylex.attrs(styles.section)}>
      <div ref={setFrameRef} {...stylex.attrs(styles.frame)}>
        <div {...stylex.attrs(ui.shell)}>
          <div {...stylex.attrs(ui.grid, styles.topRow)}>
            <p {...stylex.attrs(ui.q1to2, styles.kicker)}>
              <span {...stylex.attrs(styles.kickerTitle)}>{ABOUT_BANNER.title}</span>
              <span lang="en" {...stylex.attrs(ui.eyebrow, styles.kickerEnglish)}>
                About Fenchem
              </span>
            </p>
            <p lang="en" {...stylex.attrs(ui.q3to4, styles.place)}>
              {ABOUT_BANNER.place}
            </p>
          </div>
        </div>

        <div {...stylex.attrs(ui.shell, styles.middle)}>
          <div {...stylex.attrs(ui.grid, styles.plate)}>
            <h1
              ref={setTitleRef}
              id="oos1p-title"
              {...stylex.attrs(ui.q2to4, styles.title, reduce() && styles.titleReduced)}
              style={{ "--m": 0 } as JSX.CSSProperties}
            >
              <span {...stylex.attrs(styles.stack)}>
                <span
                  {...stylex.attrs(styles.finalName)}
                  style={{ "--pop-at": `${LOAD_DELAY_MS + ECHOES * TICK}ms` } as JSX.CSSProperties}
                >
                  <NameLines />
                </span>
                {echoes().map((k) => (
                  <span
                    aria-hidden="true"
                    {...stylex.attrs(styles.echo)}
                    style={
                      {
                        "--k": k,
                        "--o": reduce()
                          ? REDUCED_ECHO_OPACITY
                          : trailOpacity(k, ECHOES, BRIGHTEST_ECHO).toFixed(3),
                        "--pop-at": `${LOAD_DELAY_MS + (ECHOES - k) * TICK}ms`,
                      } as JSX.CSSProperties
                    }
                  >
                    <span
                      {...stylex.attrs(
                        styles.echoInner,
                        k > PHONE_ECHOES && styles.echoBeyondPhone,
                      )}
                    >
                      <NameLines />
                    </span>
                  </span>
                ))}
              </span>
              <span lang="en" {...stylex.attrs(styles.english)}>
                {ABOUT_HERO.englishTitle}
              </span>
            </h1>
          </div>
        </div>

        <div {...stylex.attrs(ui.shell)}>
          <div {...stylex.attrs(ui.grid, styles.bottomRow)}>
            <p {...stylex.attrs(ui.q1, styles.year)}>
              <span lang="en" {...stylex.attrs(styles.yearLabel)}>
                Est.
              </span>
              <span {...stylex.attrs(styles.yearDigits)}>
                1<span {...stylex.attrs(styles.yearEcho)}>9</span>95
              </span>
            </p>
            <p {...stylex.attrs(ui.q2to3, styles.lead)}>{ABOUT_BANNER.lead}</p>
            <p aria-hidden="true" {...stylex.attrs(ui.q4, styles.readout)}>
              <span {...stylex.attrs(ui.frameNumber, styles.readoutLine)}>
                <span>Exposures</span>
                <span ref={setCountRef} {...stylex.attrs(styles.readoutValue)}>
                  {frameLabel(EXPOSURES)}
                </span>
              </span>
              <span {...stylex.attrs(ui.frameNumber, styles.readoutLine)}>
                <span>Interval</span>
                <span {...stylex.attrs(styles.readoutValue)}>1/12 s</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
