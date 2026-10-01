import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { Fold, s } from "./shared";
import { fonts, layout, media, palette } from "./tokens.stylex";

const fadeRise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  tree: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  holding: {
    margin: 0,
    textAlign: "center",
    fontSize: { default: 26, [breakpoints.md]: 34 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: palette.ink,
  },
  english: {
    marginTop: 8,
    fontFamily: fonts.latin,
    fontSize: 14,
    fontWeight: 400,
    textAlign: "center",
    color: palette.quiet,
  },
  trunk: {
    width: 1,
    height: { default: 28, [breakpoints.lg]: 40 },
    backgroundColor: palette.rule,
  },
  branches: {
    display: { default: "flex", [breakpoints.lg]: "grid" },
    flexDirection: "column",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    width: "100%",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  branch: {
    position: "relative",
    boxSizing: "border-box",
    paddingTop: 28,
    paddingInline: { default: 0, [breakpoints.lg]: 12 },
    textAlign: "center",
  },
  bus: {
    display: { default: "none", [breakpoints.lg]: "block" },
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 1,
    backgroundColor: palette.rule,
  },
  busFirst: { left: "50%", width: "50%" },
  busLast: { width: "50%" },
  drop: {
    position: "absolute",
    top: 0,
    left: "50%",
    width: 1,
    height: 28,
    backgroundColor: palette.rule,
  },
  name: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: palette.ink,
    textWrap: "balance",
  },
  branchEnglish: {
    marginTop: 4,
    fontFamily: fonts.latin,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.4,
    color: palette.quiet,
  },
  toggleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 28,
    marginTop: { default: 56, [breakpoints.lg]: 96 },
  },
  toggleIcon: {
    transitionProperty: "transform",
    transitionDuration: "200ms",
    transitionTimingFunction: layout.ease,
  },
  toggleIconOpen: {
    transform: "rotate(180deg)",
  },
  frame: {
    boxSizing: "border-box",
    width: "100%",
    maxWidth: 960,
    animationName: { default: null, [media.motion]: fadeRise },
    animationDuration: "600ms",
    animationTimingFunction: layout.ease,
  },
  chart: {
    display: "block",
    width: "100%",
    height: "auto",
  },
});

export function Structure() {
  const [showChart, setShowChart] = useState(false);
  const chartId = useId();
  return (
    <section
      id="about-structure"
      aria-labelledby="about-structure-title"
      {...stylex.props(s.section, s.bandPaper)}
    >
      <h2 id="about-structure-title" {...stylex.props(s.srOnly)}>
        {ABOUT_STRUCTURE.title}
      </h2>
      <div {...stylex.props(s.shell)}>
        <div {...stylex.props(styles.tree)}>
          <Fold>
            <h3 {...stylex.props(styles.holding)}>{ABOUT_STRUCTURE.holding.name}</h3>
            <p lang="en" {...stylex.props(styles.english)}>
              {ABOUT_STRUCTURE.holding.english}
            </p>
          </Fold>
          <span aria-hidden="true" {...stylex.props(styles.trunk)} />
          <ul aria-label={ABOUT_STRUCTURE.subsidiaryBadge} {...stylex.props(styles.branches)}>
            {ABOUT_STRUCTURE.subsidiaries.map((sub, idx, all) => (
              <Fold key={sub.id} as="li" step={idx} sx={styles.branch}>
                <span
                  aria-hidden="true"
                  {...stylex.props(
                    styles.bus,
                    idx === 0 && styles.busFirst,
                    idx === all.length - 1 && styles.busLast,
                  )}
                />
                <span aria-hidden="true" {...stylex.props(styles.drop)} />
                <h4 {...stylex.props(styles.name)}>{sub.name}</h4>
                <p lang="en" {...stylex.props(styles.branchEnglish)}>
                  {sub.english}
                </p>
              </Fold>
            ))}
          </ul>
        </div>
        <div {...stylex.props(styles.toggleWrap)}>
          <button
            type="button"
            aria-expanded={showChart}
            aria-controls={chartId}
            onClick={() => setShowChart((prev) => !prev)}
            {...stylex.props(s.textLink, s.focusRing)}
          >
            <span>{showChart ? "收起组织架构图" : "查看官方组织架构图"}</span>
            <ChevronDown
              size={16}
              aria-hidden="true"
              {...stylex.props(styles.toggleIcon, showChart && styles.toggleIconOpen)}
            />
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
      </div>
    </section>
  );
}
