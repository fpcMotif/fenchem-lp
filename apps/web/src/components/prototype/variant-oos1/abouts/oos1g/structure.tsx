import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId, useState } from "react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { layout } from "./layout";
import { palette } from "./palette.stylex";
import { Reveal } from "./reveal";

const LG = breakpoints.lg;

const styles = stylex.create({
  section: {
    backgroundColor: palette.page,
  },
  grid: {
    alignItems: "start",
  },
  holding: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  holdingName: {
    margin: 0,
    fontFamily: palette.fontBody,
    fontSize: { default: 24, [LG]: 32 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: palette.ink,
  },
  english: {
    fontSize: 14,
    letterSpacing: "0.02em",
    color: palette.body,
  },
  branches: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  branch: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingBlock: { default: 16, [LG]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: palette.hairline,
  },
  branchName: {
    margin: 0,
    fontFamily: palette.fontBody,
    fontSize: { default: 18, [LG]: 20 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.04em",
    color: palette.ink,
  },
  diagram: {
    marginTop: { default: 40, [LG]: 64 },
  },
  toggle: {
    alignSelf: "flex-start",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: palette.fontBody,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: palette.ink,
    textDecorationLine: "underline",
    textDecorationColor: palette.hairline,
    textUnderlineOffset: 6,
    cursor: "pointer",
  },
  chart: {
    display: "block",
    width: "100%",
    maxWidth: 1040,
    height: "auto",
  },
});

export function Structure() {
  const [showDiagram, setShowDiagram] = useState(false);
  const diagramId = useId();
  const { holding, subsidiaries, subsidiaryBadge } = ABOUT_STRUCTURE;

  return (
    <section
      id="about-structure"
      aria-labelledby="about-structure-title"
      {...stylex.props(styles.section, layout.sectionY, layout.anchor)}
    >
      <h2 id="about-structure-title" {...stylex.props(layout.srOnly)}>
        Structure
      </h2>
      <div {...stylex.props(layout.shell, layout.split, styles.grid)}>
        <Reveal sx={[layout.padLeft, layout.seam]}>
          <div {...stylex.props(styles.holding)}>
            <p {...stylex.props(layout.label)}>{holding.badge}</p>
            <h3 {...stylex.props(styles.holdingName)}>{holding.name}</h3>
            <div lang="en" {...stylex.props(styles.english)}>
              {holding.english}
            </div>
          </div>
        </Reveal>
        <Reveal step={1} sx={[layout.padRight, styles.branches]}>
          <p {...stylex.props(layout.label)}>{subsidiaryBadge}</p>
          <ul {...stylex.props(styles.list)}>
            {subsidiaries.map((sub) => (
              <li key={sub.id} {...stylex.props(styles.branch)}>
                <h3 {...stylex.props(styles.branchName)}>{sub.name}</h3>
                <span lang="en" {...stylex.props(styles.english)}>
                  {sub.english}
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-expanded={showDiagram}
            aria-controls={diagramId}
            onClick={() => setShowDiagram((previous) => !previous)}
            {...stylex.props(styles.toggle, layout.focusRing)}
          >
            {showDiagram ? "收起组织架构图" : "查看官方组织架构图"}
          </button>
        </Reveal>
      </div>

      <div
        id={diagramId}
        hidden={!showDiagram}
        {...stylex.props(layout.shell, layout.padBoth, styles.diagram)}
      >
        <img
          src={ABOUT_STRUCTURE.chartImage}
          alt="Official organizational chart of Nanjing Fenchem International Holdings Corporation Limited"
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.chart)}
        />
      </div>
    </section>
  );
}
