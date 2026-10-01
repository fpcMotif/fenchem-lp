import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { Reveal, SectionName } from "./parts";
import { base, btn, ty } from "./shared";
import { hue, size } from "./theme.stylex";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  structure: {
    backgroundColor: colors.paper,
  },
  holding: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: { default: 40, [breakpoints.lg]: 64 },
  },
  subsidiaries: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(5, minmax(0, 1fr))",
    },
    columnGap: 24,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  subsidiary: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingBlock: 24,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: hue.hairline,
  },
  name: {
    margin: 0,
    fontSize: { default: 18, [breakpoints.lg]: 19 },
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.04em",
    color: hue.ink,
  },
  toggleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 32,
    marginTop: { default: 32, [breakpoints.lg]: 56 },
  },
  chevron: {
    transitionProperty: "transform",
    transitionDuration: "200ms",
    transitionTimingFunction: size.ease,
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  diagram: {
    width: "100%",
    maxWidth: 960,
    animationName: { default: null, [breakpoints.motionOk]: fadeIn },
    animationDuration: "400ms",
    animationTimingFunction: size.ease,
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
      {...stylex.props(base.section, base.anchor, styles.structure)}
    >
      <SectionName id="about-structure-title">企业架构</SectionName>
      <div {...stylex.props(base.shell)}>
        <Reveal sx={styles.holding}>
          <span {...stylex.props(base.srOnly)}>{ABOUT_STRUCTURE.holding.badge}</span>
          <h3 {...stylex.props(ty.headline)}>{ABOUT_STRUCTURE.holding.name}</h3>
          <p lang="en" {...stylex.props(ty.serif)}>
            {ABOUT_STRUCTURE.holding.english}
          </p>
        </Reveal>
        <ul aria-label={ABOUT_STRUCTURE.subsidiaryBadge} {...stylex.props(styles.subsidiaries)}>
          {ABOUT_STRUCTURE.subsidiaries.map((sub, idx) => (
            <Reveal key={sub.id} as="li" step={idx} sx={styles.subsidiary}>
              <h4 {...stylex.props(styles.name)}>{sub.name}</h4>
              <span lang="en" {...stylex.props(ty.quiet)}>
                {sub.english}
              </span>
            </Reveal>
          ))}
        </ul>
        <div {...stylex.props(styles.toggleWrap)}>
          <button
            type="button"
            aria-expanded={showDiagram}
            aria-controls={diagramId}
            onClick={() => setShowDiagram((prev) => !prev)}
            {...stylex.props(btn.base, btn.outline, base.focus)}
          >
            <span>{showDiagram ? "收起组织架构图" : "查看官方组织架构图"}</span>
            <ChevronDown
              size={16}
              aria-hidden="true"
              {...stylex.props(styles.chevron, showDiagram && styles.chevronOpen)}
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
      </div>
    </section>
  );
}
