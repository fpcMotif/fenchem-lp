import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, useInView, type Variants } from "motion/react";
import { useId, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { INK_FILTER_ID } from "./ink-defs";

const DISPLAY =
  '"Inter Tight", "Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const CJK =
  '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const RING_RADIUS = 71;
const RING_LENGTH = Math.PI * 2 * RING_RADIUS - 2;

const styles = stylex.create({
  stamp: {
    position: "absolute",
    color: colors.brandBlue700,
    mixBlendMode: "multiply",
    pointerEvents: "none",
    userSelect: "none",
  },
  svg: {
    display: "block",
    width: "100%",
    height: "auto",
    opacity: 0.88,
  },
});

type StampProps = {
  kind: "year" | "cert";
  ring: string;
  tilt?: number;
  thump?: boolean;
  sx?: stylex.StyleXStyles;
};

export function Stamp({ kind, ring, tilt = -6, thump = true, sx }: StampProps) {
  const rawId = useId();
  const pathId = `oos1e-ring-${rawId.replaceAll(":", "")}`;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  const variants: Variants = {
    off: { opacity: 0, scale: 1, rotate: tilt },
    on: {
      opacity: 1,
      scale: [1.3, 0.965, 1],
      rotate: [tilt - 5, tilt + 0.8, tilt],
      transition: reduce
        ? { duration: 0 }
        : { delay: 0.5, duration: 0.52, times: [0, 0.58, 1], ease: ["easeIn", "easeOut"] },
    },
    still: { opacity: 1, scale: 1, rotate: tilt },
  };

  return (
    <m.div
      ref={ref}
      aria-hidden="true"
      variants={variants}
      initial={thump ? "off" : "still"}
      animate={thump ? (reduce || inView ? "on" : "off") : "still"}
      {...stylex.props(styles.stamp, sx)}
    >
      <svg viewBox="0 0 200 200" focusable="false" {...stylex.props(styles.svg)}>
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          filter={`url(#${INK_FILTER_ID})`}
        >
          <circle cx="100" cy="100" r="95" strokeWidth="4.5" />
          <circle cx="100" cy="100" r="87" strokeWidth="1.3" />
          <circle cx="100" cy="100" r="57" strokeWidth="2" />
          <path
            id={pathId}
            d={`M ${100 - RING_RADIUS} 100 a ${RING_RADIUS} ${RING_RADIUS} 0 1 1 ${2 * RING_RADIUS} 0 a ${RING_RADIUS} ${RING_RADIUS} 0 1 1 ${-2 * RING_RADIUS} 0`}
            stroke="none"
          />
          <text
            fontFamily={DISPLAY}
            fontSize="14"
            fontWeight={800}
            fill="currentColor"
            stroke="none"
          >
            <textPath href={`#${pathId}`} textLength={RING_LENGTH} lengthAdjust="spacing">
              {ring}
            </textPath>
          </text>
          <g fill="currentColor" stroke="none" textAnchor="middle">
            {kind === "year" ? (
              <>
                <text x="100" y="118" fontFamily={DISPLAY} fontSize="42" fontWeight={800}>
                  1995
                </text>
                <text
                  x="100"
                  y="150"
                  fontFamily={CJK}
                  fontSize="20"
                  fontWeight={900}
                  letterSpacing="7"
                >
                  南京
                </text>
              </>
            ) : (
              <text
                x="100"
                y="118"
                fontFamily={CJK}
                fontSize="40"
                fontWeight={900}
                letterSpacing="2"
              >
                认证
              </text>
            )}
          </g>
        </g>
      </svg>
    </m.div>
  );
}
