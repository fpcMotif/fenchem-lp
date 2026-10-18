import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "@fenchem-lp/ui/components/lucide";
import { createSignal, createUniqueId } from "solid-js";

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
      ["@media (min-width: 1024px)"]: "repeat(16, minmax(0, 1fr))",
    },
    rowGap: 40,
  },
  holding: {
    gridColumn: { default: null, ["@media (min-width: 1024px)"]: "1 / span 6" },
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    paddingInlineEnd: { default: 0, ["@media (min-width: 1024px)"]: 32 },
  },
  holdingName: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: { default: 26, ["@media (min-width: 1280px)"]: 32 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.03em",
    color: palette.ink,
  },
  holdingEnglish: {
    fontSize: { default: 20, ["@media (min-width: 1280px)"]: 24 },
  },
  branches: {
    gridColumn: { default: null, ["@media (min-width: 1024px)"]: "8 / span 9" },
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
    flexDirection: { default: "column", ["@media (min-width: 768px)"]: "row" },
    alignItems: { default: "flex-start", ["@media (min-width: 768px)"]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 4, ["@media (min-width: 768px)"]: 24 },
    paddingBlock: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: palette.inkRule,
  },
  branchName: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: { default: 17, ["@media (min-width: 1280px)"]: 19 },
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
    marginTop: { default: 48, ["@media (min-width: 1024px)"]: 72 },
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
    padding: { default: 8, ["@media (min-width: 768px)"]: 16 },
    backgroundColor: colors.paper,
    animationName: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: fadeIn },
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
  const [showDiagram, setShowDiagram] = createSignal(false);
  const diagramId = createUniqueId();

  return (
    <section
      id="about-structure"
      aria-labelledby="about-structure-title"
      {...stylex.attrs(styles.section, shared.anchor)}
    >
      <SectionName id="about-structure-title">{ABOUT_STRUCTURE.eyebrow}</SectionName>
      <Frame innerSx={shared.sectionPad}>
        <div {...stylex.attrs(styles.tree)}>
          <Reveal sx={styles.holding}>
            <p {...stylex.attrs(shared.small)}>{ABOUT_STRUCTURE.holding.badge}</p>
            <h3 {...stylex.attrs(styles.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
            <p lang="en" {...stylex.attrs(shared.serifLine, styles.holdingEnglish)}>
              {ABOUT_STRUCTURE.holding.english}
            </p>
          </Reveal>
          <Reveal step={1} sx={styles.branches}>
            <p id="about-structure-subsidiaries" {...stylex.attrs(shared.small)}>
              {ABOUT_STRUCTURE.subsidiaryBadge}
            </p>
            <ul aria-labelledby="about-structure-subsidiaries" {...stylex.attrs(styles.branchList)}>
              {ABOUT_STRUCTURE.subsidiaries.map((sub) => (
                <li {...stylex.attrs(styles.branch)}>
                  <h3 {...stylex.attrs(styles.branchName)}>{sub.name}</h3>
                  <span lang="en" {...stylex.attrs(shared.small)}>
                    {sub.english}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div {...stylex.attrs(styles.toggleRow)}>
          <button
            type="button"
            aria-expanded={showDiagram() ? "true" : "false"}
            aria-controls={diagramId}
            onClick={() => setShowDiagram((previous) => !previous)}
            {...stylex.attrs(shared.button, shared.buttonOutline, shared.focusRing)}
          >
            <span>{showDiagram() ? "收起组织架构图" : "查看官方组织架构图"}</span>
            <ChevronDown
              size={16}
              aria-hidden="true"
              {...stylex.attrs(styles.toggleIcon, showDiagram() && styles.toggleIconOpen)}
            />
          </button>
          <div id={diagramId} hidden={!showDiagram()} {...stylex.attrs(styles.diagram)}>
            <img
              src={ABOUT_STRUCTURE.chartImage}
              alt="Official organizational chart of Nanjing Fenchem International Holdings Corporation Limited"
              loading="lazy"
              decoding="async"
              {...stylex.attrs(styles.diagramImage)}
            />
          </div>
        </div>
      </Frame>
    </section>
  );
}
