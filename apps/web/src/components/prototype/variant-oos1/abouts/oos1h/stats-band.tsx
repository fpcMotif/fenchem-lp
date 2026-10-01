import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { STATS } from "../../content";
import { Odometer } from "./odometer";
import { Reveal } from "./reveal";
import { shared } from "./shared";
import { font, mq, ui } from "./theme.stylex";

const STAT_STAGGER_SECONDS = 0.22;

const styles = stylex.create({
  band: {
    paddingBlock: { default: 80, [breakpoints.xl]: 144 },
    backgroundColor: ui.navy,
    color: colors.paper,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.5fr)",
    },
    columnGap: { default: 0, [mq.tablet]: 40, [breakpoints.xl]: 64 },
    rowGap: 56,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 14, [breakpoints.xl]: 20 },
  },
  figure: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.06em",
    fontSize: { default: "min(92px, 20vw)", [breakpoints.md]: "clamp(56px, 8vw, 116px)" },
    lineHeight: 1,
  },
  unit: {
    fontFamily: font.unit,
    fontSize: "0.4em",
    fontStyle: "italic",
    fontWeight: 400,
    color: ui.mint,
  },
  caption: {
    margin: 0,
    fontSize: 14,
    letterSpacing: "0.1em",
    color: ui.inkOnDark,
  },
});

export function StatsBand() {
  return (
    <section id="about-stats" aria-label="发展数据" {...stylex.props(styles.band)}>
      <div {...stylex.props(shared.shell, shared.inset)}>
        <ul {...stylex.props(styles.stats)}>
          {STATS.map((stat, position) => (
            <Reveal key={stat.label} as="li" step={position} sx={styles.stat}>
              <div {...stylex.props(styles.figure)}>
                <Odometer value={stat.value} delay={position * STAT_STAGGER_SECONDS} />
                {stat.unit ? <span {...stylex.props(styles.unit)}>{stat.unit}</span> : null}
              </div>
              <p {...stylex.props(styles.caption)}>
                <span {...stylex.props(shared.srOnly)}>{stat.label}：</span>
                {stat.caption}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
