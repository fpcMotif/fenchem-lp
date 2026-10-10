import * as stylex from "@stylexjs/stylex";
import { ArrowUpRight } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import type { AboutPageProps } from "../../index";
import { Clause } from "./clause";
import { CLOSING } from "./sentence";
import { srOnly, ui } from "./shared";
import { bp, face, size, tone } from "./tokens.stylex";

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

export function Closing({ onNavigateHome }: AboutPageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const stopRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [startScale, setStartScale] = useState(1);

  useEffect(() => {
    const box = boxRef.current;
    const stop = stopRef.current;
    if (!box || !stop) return;
    const measure = () => {
      const font = Number.parseFloat(getComputedStyle(box).fontSize);
      setStartScale((STOP_INK_WIDTH * font) / stop.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    void document.fonts.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.85", "end end"] });
  const scale = useTransform(
    scrollYProgress,
    (value) => startScale + (1 - startScale) * ease((value - 0.1) / 0.6),
  );

  return (
    <section ref={sectionRef} aria-label="Closing" {...stylex.props(styles.section)}>
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(styles.coda)}>
          <div {...stylex.props(styles.column)}>
            <div {...stylex.props(styles.links)}>
              <button
                type="button"
                onClick={() => onNavigateHome("contact")}
                {...stylex.props(styles.contact)}
              >
                <span>
                  <span {...stylex.props(styles.contactStrong)}>联系</span>我们
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  {...stylex.props(styles.arrow)}
                />
              </button>
              <button type="button" onClick={() => onNavigateHome()} {...stylex.props(styles.home)}>
                <span>回到首页</span>
                <span lang="en" {...stylex.props(styles.homeEn)}>
                  Home
                </span>
              </button>
            </div>
            <Clause line={CLOSING} sx={styles.line} />
          </div>
          <div ref={boxRef} {...stylex.props(styles.stopBox)}>
            <m.div
              ref={stopRef}
              style={reduce ? undefined : { scale, originX: -STOP_BEARING, originY: 1 }}
              {...stylex.props(styles.stop)}
            >
              <svg
                viewBox={`0 0 ${STOP_VIEW} ${STOP_VIEW}`}
                aria-hidden="true"
                {...stylex.props(styles.svg)}
              >
                <circle
                  cx={STOP_VIEW / 2}
                  cy={STOP_VIEW / 2}
                  r={STOP_RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={STOP_VIEW * STOP_STROKE}
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
