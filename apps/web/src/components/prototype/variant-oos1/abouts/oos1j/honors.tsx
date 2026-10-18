import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useScroll, useTransform } from "@/compat/motion";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_HONORS } from "../../about-data";
import { Monument, Reveal, SectionName, useInViewOnce } from "./parts";
import { base, ty } from "./shared";
import { font, hue, size } from "./theme.stylex";
import { createSignal, merge } from "solid-js";

const LEVEL_LABEL = {
  national: "国家级",
  provincial: "江苏省级",
  municipal: "南京市级",
} as const;

const styles = stylex.create({
  honors: {
    overflow: "clip",
    backgroundColor: hue.page,
  },
  monument: {
    display: { default: "none", [breakpoints.lg]: "block" },
    top: "50%",
    right: "-0.12em",
    fontSize: "34vw",
    letterSpacing: "-0.07em",
    translate: "0 -50%",
  },
  list: {
    position: "relative",
    maxWidth: 960,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  row: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: {
      default: "40px minmax(0, 1fr)",
      [breakpoints.md]: "56px minmax(0, 1fr) 96px",
    },
    alignItems: "baseline",
    columnGap: { default: 12, [breakpoints.md]: 24 },
    rowGap: 4,
    paddingBlock: { default: 18, [breakpoints.lg]: 26 },
  },
  rule: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: hue.hairline,
    transformOrigin: "left center",
    transform: { default: null, [breakpoints.motionOk]: "scaleX(0)" },
    transitionProperty: "transform",
    transitionDuration: "1300ms",
    transitionTimingFunction: size.ease,
  },
  ruleBottom: {
    top: "auto",
    bottom: 0,
  },
  ruleShown: {
    transform: "none",
  },
  numeral: {
    fontFamily: font.display,
    fontSize: 11,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.14em",
    color: hue.quiet,
  },
  title: {
    margin: 0,
    fontSize: "clamp(20px, 2vw, 28px)",
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: "0.05em",
    color: hue.ink,
  },
  level: {
    gridColumn: { default: 2, [breakpoints.md]: "auto" },
    justifySelf: { default: "start", [breakpoints.md]: "end" },
    color: hue.quiet,
  },
});

function HonorRow(props: {
  title: string;
  level: keyof typeof LEVEL_LABEL;
  index: number;
  last: boolean;
}) {
  return (
    <Reveal as="li" step={props.index % 3} sx={styles.row}>
      <RowRule />
      {props.last ? <RowRule bottom /> : null}
      <span aria-hidden="true" lang="en" {...stylex.attrs(styles.numeral)}>
        {String(props.index + 1).padStart(2, "0")}
      </span>
      <h3 {...stylex.attrs(styles.title)}>{props.title}</h3>
      <span {...stylex.attrs(ty.quiet, styles.level)}>{LEVEL_LABEL[props.level]}</span>
    </Reveal>
  );
}

function RowRule(props: { bottom?: boolean }) {
  const p = merge({ bottom: false }, props);
  const [ref, shown] = useInViewOnce<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      aria-hidden="true"
      {...stylex.attrs(styles.rule, p.bottom && styles.ruleBottom, shown() && styles.ruleShown)}
    />
  );
}

export function Honors() {
  const lastIndex = ABOUT_HONORS.items.length - 1;
  const [sectionRef, setSectionRef] = createSignal<HTMLElement>();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const driftMotion = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const drift = useTransform(() => (reduce() ? "0%" : driftMotion()));
  return (
    <section
      ref={setSectionRef}
      id="about-honor"
      aria-labelledby="about-honor-title"
      {...stylex.attrs(base.section, base.anchor, styles.honors)}
    >
      <Monument
        text={String(ABOUT_HONORS.items.length).padStart(2, "0")}
        style={{ y: drift }}
        sx={styles.monument}
      />
      <SectionName id="about-honor-title">{ABOUT_HONORS.eyebrow}</SectionName>
      <div {...stylex.attrs(base.shell)}>
        <ul {...stylex.attrs(styles.list)}>
          {ABOUT_HONORS.items.map((honor, idx) => (
            <HonorRow
              title={honor.title}
              level={honor.level}
              index={idx}
              last={idx === lastIndex}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
