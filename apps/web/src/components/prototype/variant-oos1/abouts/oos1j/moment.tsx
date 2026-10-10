import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_MOMENT } from "../../about-data";
import { STATS } from "../../content";
import { CountUp, DriftImage, Reveal, useInViewOnce } from "./parts";
import { base } from "./shared";
import { font, hue, size } from "./theme.stylex";

const styles = stylex.create({
  moment: {
    overflow: "clip",
    paddingBlock: size.bandY,
    backgroundColor: hue.navy,
    color: hue.onDark,
  },
  scrim: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: hue.navyScrim,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 48, [breakpoints.lg]: 96 },
  },
  caption: {
    margin: 0,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.12em",
    color: hue.onDarkSoft,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 40,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  backdrop: {
    position: "absolute",
    inset: 0,
    zIndex: -1,
    backgroundColor: hue.navy,
  },
  stat: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingBlock: 24,
  },
  statRule: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: hue.hairlineOnDark,
    transformOrigin: "left center",
    transform: { default: null, [breakpoints.motionOk]: "scaleX(0)" },
    transitionProperty: "transform",
    transitionDuration: "1400ms",
    transitionTimingFunction: size.ease,
  },
  statRuleShown: {
    transform: "none",
  },
  statRuleDelay: (index: number) => ({ transitionDelay: `${index * 160}ms` }),
  label: {
    margin: 0,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.12em",
    color: hue.onDarkSoft,
  },
  figure: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    fontFamily: font.display,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1,
    letterSpacing: "-0.04em",
    color: "#ffffff",
  },
  value: {
    fontSize: { default: 72, [breakpoints.lg]: "clamp(64px, 6.4vw, 100px)" },
  },
  unit: {
    fontSize: "clamp(22px, 2.4vw, 36px)",
    letterSpacing: 0,
    color: hue.mint,
  },
  statCaption: {
    margin: 0,
    fontSize: 15,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: hue.onDark,
  },
});

export function Moment() {
  const [statsRef, statsShown] = useInViewOnce<HTMLUListElement>();
  return (
    <section
      id="about-stats"
      aria-label="Fenchem growth figures"
      {...stylex.props(base.section, styles.moment)}
    >
      <DriftImage
        src={ABOUT_MOMENT.image}
        alt={ABOUT_MOMENT.alt}
        reach={7}
        frame={styles.backdrop}
      />
      <div aria-hidden="true" {...stylex.props(styles.scrim)} />
      <div {...stylex.props(base.shell, styles.content)}>
        <p {...stylex.props(styles.caption)}>{ABOUT_MOMENT.caption}</p>
        <ul ref={statsRef} {...stylex.props(styles.stats)}>
          {STATS.map((stat, idx) => (
            <Reveal key={stat.label} as="li" step={idx} sx={styles.stat}>
              <span
                aria-hidden="true"
                {...stylex.props(
                  styles.statRule,
                  statsShown && styles.statRuleShown,
                  styles.statRuleDelay(idx),
                )}
              />
              <p {...stylex.props(styles.label)}>{stat.label}</p>
              <div {...stylex.props(styles.figure)}>
                <CountUp value={stat.value} sx={styles.value} />
                {stat.unit ? (
                  <span lang="en" {...stylex.props(styles.unit)}>
                    {stat.unit}
                  </span>
                ) : null}
              </div>
              <p {...stylex.props(styles.statCaption)}>{stat.caption}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
