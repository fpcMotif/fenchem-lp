import * as stylex from "@stylexjs/stylex";
import { ArrowUpRight } from "@fenchem-lp/ui/components/lucide";
import { m, useScroll, useTransform } from "@/compat/motion";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import type { AboutPageProps } from "../../index";
import { Clause } from "./clause";
import { CLOSING } from "./sentence";
import { srOnly, ui } from "./shared";
import { bp, face, size, tone } from "./tokens.stylex";
import { createSignal, onSettled } from "solid-js";

const STOP_INK_WIDTH = 0.294;
const STOP_BEARING = 0.048 / STOP_INK_WIDTH;
const STOP_STROKE = 0.13;
const STOP_VIEW = 1000;
const STOP_RADIUS = (STOP_VIEW - STOP_VIEW * STOP_STROKE) / 2;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => 1 - (1 - clamp01(value)) ** 3;

const styles = stylex.create({
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    boxSizing: "border-box",
    minHeight: "calc(100svh - 80px)",
    paddingTop: 96,
    paddingBottom: { default: 56, [bp.desktop]: 72 },
  },
  coda: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 24,
    minWidth: 0,
  },
  line: {
    maxWidth: { default: "4.3em", [bp.desktop]: "none" },
    marginInlineStart: "auto",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 8, [bp.desktop]: 12 },
  },
  contact: {
    display: "inline-flex",
    alignItems: "center",
    gap: { default: 6, [bp.desktop]: 10 },
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: face.sans,
    fontSize: { default: 20, [bp.tablet]: 28, [bp.desktop]: 34 },
    fontWeight: 300,
    lineHeight: 1.15,
    color: tone.ink,
    cursor: "pointer",
    textDecorationLine: { default: "none", ":hover": "underline" },
    textDecorationColor: tone.blue,
    textDecorationThickness: 1,
    textUnderlineOffset: "0.22em",
  },
  contactStrong: {
    fontWeight: 900,
  },
  arrow: {
    flexShrink: 0,
    width: "0.66em",
    height: "0.66em",
    color: tone.blue,
  },
  home: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 8,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: face.sans,
    fontSize: 14,
    color: tone.body,
    cursor: "pointer",
    textDecorationLine: { default: "none", ":hover": "underline" },
    textUnderlineOffset: 5,
  },
  homeEn: {
    fontFamily: face.serif,
    fontSize: 17,
    fontStyle: "italic",
  },
  stopBox: {
    flexShrink: 0,
    alignSelf: "flex-end",
    fontSize: { default: size.s1Phone, [bp.tablet]: size.s1Tablet, [bp.desktop]: size.s1Desktop },
    position: "relative",
    width: {
      default: "calc(min(46vw, 100svh - 420px) * 1.1633)",
      [bp.tablet]: "calc(min(40vw, 100svh - 538px) * 1.1633)",
      [bp.desktop]: "calc(clamp(200px, min(24vw, 100svh - 538px), 440px) * 1.1633)",
    },
    aspectRatio: "1.1633 / 1",
    marginInlineEnd: "-0.342em",
    marginBottom: "0.062em",
  },
  stop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "14.04%",
    width: "85.96%",
    color: tone.blue,
  },
  svg: {
    display: "block",
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
});

export function Closing(props: AboutPageProps) {
  const [sectionRef, setSectionRef] = createSignal<HTMLElement>();
  const [boxRef, setBoxRef] = createSignal<HTMLDivElement>();
  const [stopRef, setStopRef] = createSignal<HTMLDivElement>();
  const reduce = useReducedMotion();
  const [startScale, setStartScale] = createSignal(1);

  onSettled(() => {
    const box = boxRef();
    const stop = stopRef();
    if (!box || !stop) return;
    const measure = () => {
      const font = Number.parseFloat(getComputedStyle(box).fontSize);
      setStartScale((STOP_INK_WIDTH * font) / stop.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    void document.fonts.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.85", "end end"] });
  const scale = useTransform(
    () => startScale() + (1 - startScale()) * ease((scrollYProgress() - 0.1) / 0.6),
  );

  return (
    <section ref={setSectionRef} aria-label="Closing" {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(ui.shell)}>
        <div {...stylex.attrs(styles.coda)}>
          <div {...stylex.attrs(styles.column)}>
            <div {...stylex.attrs(styles.links)}>
              <button
                type="button"
                onClick={() => props.onNavigateHome("contact")}
                {...stylex.attrs(styles.contact)}
              >
                <span>
                  <span {...stylex.attrs(styles.contactStrong)}>联系</span>我们
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  {...stylex.attrs(styles.arrow)}
                />
              </button>
              <button
                type="button"
                onClick={() => props.onNavigateHome()}
                {...stylex.attrs(styles.home)}
              >
                <span>回到首页</span>
                <span lang="en" {...stylex.attrs(styles.homeEn)}>
                  Home
                </span>
              </button>
            </div>
            <Clause line={CLOSING} sx={styles.line} />
          </div>
          <div ref={setBoxRef} {...stylex.attrs(styles.stopBox)}>
            <m.div
              ref={setStopRef}
              style={
                reduce() ? undefined : { scale, transformOrigin: `${-STOP_BEARING * 100}% 100%` }
              }
              {...stylex.attrs(styles.stop)}
            >
              <svg
                viewBox={`0 0 ${STOP_VIEW} ${STOP_VIEW}`}
                aria-hidden="true"
                {...stylex.attrs(styles.svg)}
              >
                <circle
                  cx={STOP_VIEW / 2}
                  cy={STOP_VIEW / 2}
                  r={STOP_RADIUS}
                  fill="none"
                  stroke="currentColor"
                  stroke-width={STOP_VIEW * STOP_STROKE}
                />
              </svg>
            </m.div>
            <span {...srOnly}>.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
