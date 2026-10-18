import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { animate, motionValue, useInView } from "@/compat/motion";
import { createEffect } from "solid-js";

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
      ["@media (min-width: 1280px)"]: space.bandXl,
    },
    backgroundColor: color.navy,
    color: colors.paper,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1024px)"]: "repeat(3, minmax(0, 1fr))",
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
      ["@media (min-width: 1280px)"]: "clamp(56px, 5.2vw, 80px)",
    },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  unit: {
    fontSize: { default: 28, ["@media (min-width: 1280px)"]: 32 },
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

function CountUp(props: { value: string }) {
  const target = () => Number(props.value.replaceAll(",", ""));
  let ref: HTMLSpanElement | undefined;
  const inView = useInView(() => ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  createEffect(
    () => [inView(), reduce(), target()] as const,
    ([inViewNow, reduceNow, targetNow]) => {
      const node = ref;
      if (!node) return;
      if (reduceNow) {
        node.textContent = formatCount(targetNow);
        return;
      }
      if (!inViewNow) {
        node.textContent = "0";
        return;
      }
      const controls = animate(motionValue(0), targetNow, {
        duration: COUNT_UP_SECONDS,
        ease: EASE,
        onUpdate: (latest: number) => {
          node.textContent = formatCount(Math.round(latest));
        },
      });
      return () => controls.stop();
    },
  );

  return (
    <span {...stylex.attrs(styles.value)}>
      <span ref={ref} aria-hidden="true">
        {formatCount(target())}
      </span>
      <span {...stylex.attrs(styles.srOnly)}>{props.value}</span>
    </span>
  );
}

export function Stats() {
  return (
    <Section id="about-stats" name="Growth figures" band sx={styles.band}>
      <Shell>
        <NodeMarker />
        <ul {...stylex.attrs(styles.stats)}>
          {STATS.map((stat) => (
            <li {...stylex.attrs(styles.stat)}>
              <p {...stylex.attrs(styles.label)}>{stat.label}</p>
              <div {...stylex.attrs(styles.figure)}>
                <CountUp value={stat.value} />
                {stat.unit ? <span {...stylex.attrs(styles.unit)}>{stat.unit}</span> : null}
              </div>
              <p {...stylex.attrs(styles.caption)}>{stat.caption}</p>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}
