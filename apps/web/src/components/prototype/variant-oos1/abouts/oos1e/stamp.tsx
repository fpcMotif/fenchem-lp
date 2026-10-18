import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, useInView, type Variants } from "@/compat/motion";
import { createUniqueId, merge } from "solid-js";

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

export function Stamp(props: StampProps) {
  const p = merge({ tilt: -6, thump: true }, props);
  const rawId = createUniqueId();
  const pathId = `oos1e-ring-${rawId.replaceAll(":", "")}`;
  let ref: HTMLElement | undefined;
  const inView = useInView(() => ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  const variants = (): Variants => ({
    off: { opacity: 0, scale: 1, rotate: p.tilt },
    on: {
      opacity: 1,
      scale: [1.3, 0.965, 1],
      rotate: [p.tilt - 5, p.tilt + 0.8, p.tilt],
      transition: reduce()
        ? { duration: 0 }
        : { delay: 0.5, duration: 0.52, times: [0, 0.58, 1], ease: ["easeIn", "easeOut"] },
    },
    still: { opacity: 1, scale: 1, rotate: p.tilt },
  });

  return (
    <m.div
      ref={(el: HTMLElement) => (ref = el)}
      aria-hidden="true"
      variants={variants()}
      initial={p.thump ? "off" : "still"}
      animate={p.thump ? (reduce() || inView() ? "on" : "off") : "still"}
      {...stylex.attrs(styles.stamp, p.sx)}
    >
      <svg viewBox="0 0 200 200" {...{ focusable: "false" }} {...stylex.attrs(styles.svg)}>
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          filter={`url(#${INK_FILTER_ID})`}
        >
          <circle cx="100" cy="100" r="95" stroke-width="4.5" />
          <circle cx="100" cy="100" r="87" stroke-width="1.3" />
          <circle cx="100" cy="100" r="57" stroke-width="2" />
          <path
            id={pathId}
            d={`M ${100 - RING_RADIUS} 100 a ${RING_RADIUS} ${RING_RADIUS} 0 1 1 ${2 * RING_RADIUS} 0 a ${RING_RADIUS} ${RING_RADIUS} 0 1 1 ${-2 * RING_RADIUS} 0`}
            stroke="none"
          />
          <text
            font-family={DISPLAY}
            font-size="14"
            font-weight={800}
            fill="currentColor"
            stroke="none"
          >
            <textPath href={`#${pathId}`} {...{ textLength: RING_LENGTH, lengthAdjust: "spacing" }}>
              {p.ring}
            </textPath>
          </text>
          <g fill="currentColor" stroke="none" text-anchor="middle">
            {p.kind === "year" ? (
              <>
                <text x="100" y="118" font-family={DISPLAY} font-size="42" font-weight={800}>
                  1995
                </text>
                <text
                  x="100"
                  y="150"
                  font-family={CJK}
                  font-size="20"
                  font-weight={900}
                  letter-spacing="7"
                >
                  南京
                </text>
              </>
            ) : (
              <text
                x="100"
                y="118"
                font-family={CJK}
                font-size="40"
                font-weight={900}
                letter-spacing="2"
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
