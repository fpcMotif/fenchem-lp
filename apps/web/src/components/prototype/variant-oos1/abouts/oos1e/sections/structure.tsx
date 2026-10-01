import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { ABOUT_STRUCTURE } from "../../../about-data";
import { Sheet } from "../sheet";
import { base, Reveal } from "../shared";
import { STRUCTURE_SHEET } from "../sheets";
import { color, font, media } from "../tokens.stylex";

const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  chart: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.lgUp]: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
    },
    columnGap: 96,
    rowGap: 56,
    alignItems: "center",
  },
  holding: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 14,
  },
  holdingName: {
    maxWidth: "9em",
    margin: 0,
    fontSize: { default: 32, [media.md]: 40, [media.xlUp]: 48 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: color.ink,
    textWrap: "balance",
  },
  holdingEnglish: {
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: 20, [media.lgUp]: 24 },
    lineHeight: 1.3,
    color: color.body,
  },
  branches: {
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
    flexDirection: { default: "column", [media.mdUp]: "row" },
    alignItems: { default: "flex-start", [media.mdUp]: "baseline" },
    justifyContent: "space-between",
    columnGap: 24,
    rowGap: 2,
    paddingBlock: { default: 16, [media.lgUp]: 18 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.hairline,
  },
  branchName: {
    margin: 0,
    fontSize: { default: 17, [media.lgUp]: 19 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.05em",
    color: color.ink,
  },
  branchEnglish: {
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: 17, [media.lgUp]: 18 },
    lineHeight: 1.3,
    color: color.body,
  },
  toggleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 32,
  },
  toggleIcon: {
    transitionProperty: "transform",
    transitionDuration: "200ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  toggleIconOpen: {
    transform: "rotate(180deg)",
  },
  diagram: {
    width: "100%",
    maxWidth: 920,
    animationName: { default: null, [breakpoints.motionOk]: fadeIn },
    animationDuration: "260ms",
    animationTimingFunction: EASE_OUT_CSS,
  },
  diagramImage: {
    display: "block",
    width: "100%",
    height: "auto",
    borderRadius: 2,
  },
});

export function StructureSheet() {
  const [showDiagram, setShowDiagram] = useState(false);
  const diagramId = useId();

  return (
    <Sheet def={STRUCTURE_SHEET}>
      <div {...stylex.props(styles.chart)}>
        <Reveal sx={styles.holding}>
          <span {...stylex.props(base.quiet)}>{ABOUT_STRUCTURE.holding.badge}</span>
          <h3 {...stylex.props(styles.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
          <div lang="en" {...stylex.props(styles.holdingEnglish)}>
            {ABOUT_STRUCTURE.holding.english}
          </div>
        </Reveal>
        <Reveal step={1} sx={styles.branches}>
          <span {...stylex.props(base.quiet)}>{ABOUT_STRUCTURE.subsidiaryBadge}</span>
          <ul aria-label={ABOUT_STRUCTURE.subsidiaryBadge} {...stylex.props(styles.branchList)}>
            {ABOUT_STRUCTURE.subsidiaries.map((sub) => (
              <li key={sub.id} {...stylex.props(styles.branch)}>
                <h4 {...stylex.props(styles.branchName)}>{sub.name}</h4>
                <span lang="en" {...stylex.props(styles.branchEnglish)}>
                  {sub.english}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div {...stylex.props(styles.toggleWrap)}>
        <button
          type="button"
          aria-expanded={showDiagram}
          aria-controls={diagramId}
          onClick={() => setShowDiagram((previous) => !previous)}
          {...stylex.props(base.button, base.buttonOutline, base.focusRing)}
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
            alt="南京泛成国际控股有限公司官方组织架构图"
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.diagramImage)}
          />
        </div>
      </div>
    </Sheet>
  );
}
