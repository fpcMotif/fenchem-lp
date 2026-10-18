import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { createSignal, createUniqueId } from "solid-js";

import { ABOUT_STRUCTURE } from "../../about-data";
import { NodeMarker, Reveal, Section, Shell } from "./layout";
import { color, ease, font } from "./palette.stylex";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1024px)"]: "minmax(0, 5fr) minmax(0, 7fr)",
    },
    columnGap: { default: 0, ["@media (min-width: 1024px)"]: 80 },
    rowGap: 40,
    alignItems: "start",
    fontFamily: font.cjk,
  },
  quiet: {
    margin: 0,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: color.body,
  },
  holding: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  holdingName: {
    margin: 0,
    fontSize: { default: 26, ["@media (min-width: 1024px)"]: 32 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.03em",
    color: color.ink,
    textWrap: "balance",
  },
  english: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: color.body,
  },
  subsidiaries: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  subsidiary: {
    display: "flex",
    flexDirection: { default: "column", ["@media (min-width: 768px)"]: "row" },
    alignItems: { default: "flex-start", ["@media (min-width: 768px)"]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 4, ["@media (min-width: 768px)"]: 24 },
    paddingBlock: 18,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.hairline,
  },
  subsidiaryName: {
    margin: 0,
    fontSize: { default: 17, ["@media (min-width: 1024px)"]: 19 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  toggleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 32,
    marginTop: { default: 40, ["@media (min-width: 1024px)"]: 56 },
  },
  toggle: {
    padding: 0,
    paddingBottom: 4,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: { default: color.hairline, ":hover": color.ink },
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: color.ink,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "200ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
  frame: {
    width: "100%",
    maxWidth: 960,
    animationName: fadeIn,
    animationDuration: "400ms",
    animationTimingFunction: ease.out,
  },
  chart: {
    display: "block",
    width: "100%",
    height: "auto",
    borderRadius: 2,
  },
});

export function Structure() {
  const [showChart, setShowChart] = createSignal(false);
  const chartId = createUniqueId();
  const { holding, subsidiaries, subsidiaryBadge } = ABOUT_STRUCTURE;

  return (
    <Section id="about-structure" name={ABOUT_STRUCTURE.eyebrow}>
      <Shell>
        <NodeMarker />
        <Reveal>
          <div {...stylex.attrs(styles.grid)}>
            <div {...stylex.attrs(styles.holding)}>
              <p {...stylex.attrs(styles.quiet)}>{holding.badge}</p>
              <h3 {...stylex.attrs(styles.holdingName)}>{holding.name}</h3>
              <div lang="en" {...stylex.attrs(styles.english)}>
                {holding.english}
              </div>
            </div>
            <div {...stylex.attrs(styles.subsidiaries)}>
              <p {...stylex.attrs(styles.quiet)}>{subsidiaryBadge}</p>
              <ul {...stylex.attrs(styles.list)}>
                {subsidiaries.map((sub) => (
                  <li {...stylex.attrs(styles.subsidiary)}>
                    <h4 {...stylex.attrs(styles.subsidiaryName)}>{sub.name}</h4>
                    <span lang="en" {...stylex.attrs(styles.english)}>
                      {sub.english}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div {...stylex.attrs(styles.toggleWrap)}>
            <button
              type="button"
              aria-expanded={showChart() ? "true" : "false"}
              aria-controls={chartId}
              onClick={() => setShowChart((prev) => !prev)}
              {...stylex.attrs(styles.toggle)}
            >
              {showChart() ? "收起组织架构图" : "查看官方组织架构图"}
            </button>
            <div id={chartId} hidden={!showChart()} {...stylex.attrs(styles.frame)}>
              <img
                src={ABOUT_STRUCTURE.chartImage}
                alt="Official organizational chart of Nanjing Fenchem International Holdings Corporation Limited"
                loading="lazy"
                decoding="async"
                {...stylex.attrs(styles.chart)}
              />
            </div>
          </div>
        </Reveal>
      </Shell>
    </Section>
  );
}
