import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { STATS } from "../../content";
import { NodeMarker, Section, Shell } from "./layout";
import { color, font, media, space } from "./palette.stylex";

const COUNT_UP_SECONDS = 1.6;

const styles = stylex.create({
  band: {
    paddingBlock: {
      default: space.bandSm,
      [media.lgOnly]: space.bandLg,
      [breakpoints.xl]: space.bandXl,
    },
    backgroundColor: color.navy,
    color: colors.paper,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 40,
    rowGap: 56,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontFamily: font.cjk,
  },
  label: {
    margin: 0,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: color.onNavySoft,
  },
  figure: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 8,
    fontFamily: font.display,
  },
  value: {
    fontSize: {
      default: 72,
      [media.mdOnly]: 88,
      [media.lgOnly]: 60,
      [breakpoints.xl]: "clamp(56px, 5.2vw, 80px)",
    },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  unit: {
    fontSize: { default: 28, [breakpoints.xl]: 32 },
    fontWeight: 500,
    color: color.mint,
  },
  caption: {
    margin: 0,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: color.onNavy,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
});

function formatCount(value: number) {
  return value.toLocaleString("en-US");
}

function CountUp({ value }: { value: string }) {
  const target = Number(value.replaceAll(",", ""));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce) {
      node.textContent = formatCount(target);
      return;
    }
    if (!inView) {
      node.textContent = "0";
      return;
    }
    const controls = animate(0, target, {
      duration: COUNT_UP_SECONDS,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = formatCount(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  return (
    <span {...stylex.props(styles.value)}>
      <span ref={ref} aria-hidden="true">
        {formatCount(target)}
      </span>
      <span {...stylex.props(styles.srOnly)}>{value}</span>
    </span>
  );
}

export function Stats() {
  return (
    <Section id="about-stats" name="发展数据" band sx={styles.band}>
      <Shell>
        <NodeMarker />
        <ul {...stylex.props(styles.stats)}>
          {STATS.map((stat) => (
            <li key={stat.label} {...stylex.props(styles.stat)}>
              <p {...stylex.props(styles.label)}>{stat.label}</p>
              <div {...stylex.props(styles.figure)}>
                <CountUp value={stat.value} />
                {stat.unit ? <span {...stylex.props(styles.unit)}>{stat.unit}</span> : null}
              </div>
              <p {...stylex.props(styles.caption)}>{stat.caption}</p>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}
