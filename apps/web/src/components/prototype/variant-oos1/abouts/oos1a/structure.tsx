import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { ease, fonts, palette } from "./lattice.stylex";
import { Frame, Reveal, SectionName } from "./parts";
import { shared } from "./parts-values";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  section: {
    backgroundColor: palette.page,
  },
  tree: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(16, minmax(0, 1fr))",
    },
    rowGap: 40,
  },
  holding: {
    gridColumn: { default: null, [breakpoints.lg]: "1 / span 6" },
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    paddingInlineEnd: { default: 0, [breakpoints.lg]: 32 },
  },
  holdingName: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: { default: 26, [breakpoints.xl]: 32 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.03em",
    color: palette.ink,
  },
  holdingEnglish: {
    fontSize: { default: 20, [breakpoints.xl]: 24 },
  },
  branches: {
    gridColumn: { default: null, [breakpoints.lg]: "8 / span 9" },
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  branchList: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  branch: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: { default: "flex-start", [breakpoints.md]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 4, [breakpoints.md]: 24 },
    paddingBlock: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: palette.inkRule,
  },
  branchName: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: { default: 17, [breakpoints.xl]: 19 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.04em",
    color: palette.ink,
  },
  toggleRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 28,
    marginTop: { default: 48, [breakpoints.lg]: 72 },
  },
  toggleIcon: {
    transitionProperty: "transform",
    transitionDuration: "200ms",
    transitionTimingFunction: ease.out,
  },
  toggleIconOpen: {
    transform: "rotate(180deg)",
  },
  diagram: {
    width: "100%",
    maxWidth: 1000,
    boxSizing: "border-box",
    padding: { default: 8, [breakpoints.md]: 16 },
    backgroundColor: colors.paper,
    animationName: { default: null, [breakpoints.motionOk]: fadeIn },
    animationDuration: "400ms",
    animationTimingFunction: ease.out,
  },
  diagramImage: {
    display: "block",
    width: "100%",
    height: "auto",
  },
});

export function Structure() {
  const [showDiagram, setShowDiagram] = useState(false);
  const diagramId = useId();

  return (
    <section
      id="about-structure"
      aria-labelledby="about-structure-title"
      {...stylex.props(styles.section, shared.anchor)}
    >
      <SectionName id="about-structure-title">{ABOUT_STRUCTURE.eyebrow}</SectionName>
      <Frame innerSx={shared.sectionPad}>
        <div {...stylex.props(styles.tree)}>
          <Reveal sx={styles.holding}>
            <p {...stylex.props(shared.small)}>{ABOUT_STRUCTURE.holding.badge}</p>
            <h3 {...stylex.props(styles.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
            <p lang="en" {...stylex.props(shared.serifLine, styles.holdingEnglish)}>
              {ABOUT_STRUCTURE.holding.english}
            </p>
          </Reveal>
          <Reveal step={1} sx={styles.branches}>
            <p id="about-structure-subsidiaries" {...stylex.props(shared.small)}>
              {ABOUT_STRUCTURE.subsidiaryBadge}
            </p>
            <ul aria-labelledby="about-structure-subsidiaries" {...stylex.props(styles.branchList)}>
              {ABOUT_STRUCTURE.subsidiaries.map((sub) => (
                <li key={sub.id} {...stylex.props(styles.branch)}>
                  <h3 {...stylex.props(styles.branchName)}>{sub.name}</h3>
                  <span lang="en" {...stylex.props(shared.small)}>
                    {sub.english}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div {...stylex.props(styles.toggleRow)}>
          <button
            type="button"
            aria-expanded={showDiagram}
            aria-controls={diagramId}
            onClick={() => setShowDiagram((previous) => !previous)}
            {...stylex.props(shared.button, shared.buttonOutline, shared.focusRing)}
          >
            <span>{showDiagram ? "收起组织架构图" : "查看官方组织架构图"}</span>
            <ChevronDown
              size={16}
              aria-hidden="true"
              {...stylex.props(styles.toggleIcon, showDiagram && styles.toggleIconOpen)}
            />
          </button>
          <div id={diagramId} hidden={!showDiagram} {...stylex.props(styles.diagram)}>
            <img
              src={ABOUT_STRUCTURE.chartImage}
              alt="Official organizational chart of Nanjing Fenchem International Holdings Corporation Limited"
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.diagramImage)}
            />
          </div>
        </div>
      </Frame>
    </section>
  );
}
