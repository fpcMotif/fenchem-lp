import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId, useState } from "react";

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
      [breakpoints.lg]: "minmax(0, 5fr) minmax(0, 7fr)",
    },
    columnGap: { default: 0, [breakpoints.lg]: 80 },
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
    fontSize: { default: 26, [breakpoints.lg]: 32 },
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
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: { default: "flex-start", [breakpoints.md]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 4, [breakpoints.md]: 24 },
    paddingBlock: 18,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.hairline,
  },
  subsidiaryName: {
    margin: 0,
    fontSize: { default: 17, [breakpoints.lg]: 19 },
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
    marginTop: { default: 40, [breakpoints.lg]: 56 },
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
  const [showChart, setShowChart] = useState(false);
  const chartId = useId();
  const { holding, subsidiaries, subsidiaryBadge } = ABOUT_STRUCTURE;

  return (
    <Section id="about-structure" name={ABOUT_STRUCTURE.title}>
      <Shell>
        <NodeMarker />
        <Reveal>
          <div {...stylex.props(styles.grid)}>
            <div {...stylex.props(styles.holding)}>
              <p {...stylex.props(styles.quiet)}>{holding.badge}</p>
              <h3 {...stylex.props(styles.holdingName)}>{holding.name}</h3>
              <div lang="en" {...stylex.props(styles.english)}>
                {holding.english}
              </div>
            </div>
            <div {...stylex.props(styles.subsidiaries)}>
              <p {...stylex.props(styles.quiet)}>{subsidiaryBadge}</p>
              <ul {...stylex.props(styles.list)}>
                {subsidiaries.map((sub) => (
                  <li key={sub.id} {...stylex.props(styles.subsidiary)}>
                    <h4 {...stylex.props(styles.subsidiaryName)}>{sub.name}</h4>
                    <span lang="en" {...stylex.props(styles.english)}>
                      {sub.english}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div {...stylex.props(styles.toggleWrap)}>
            <button
              type="button"
              aria-expanded={showChart}
              aria-controls={chartId}
              onClick={() => setShowChart((prev) => !prev)}
              {...stylex.props(styles.toggle)}
            >
              {showChart ? "收起组织架构图" : "查看官方组织架构图"}
            </button>
            <div id={chartId} hidden={!showChart} {...stylex.props(styles.frame)}>
              <img
                src={ABOUT_STRUCTURE.chartImage}
                alt="南京泛成国际控股有限公司官方组织架构图"
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.chart)}
              />
            </div>
          </div>
        </Reveal>
      </Shell>
    </Section>
  );
}
