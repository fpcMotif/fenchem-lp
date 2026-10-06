import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { Reveal, SectionName, useInViewOnce } from "./parts";
import { base, btn, ty } from "./shared";
import { hue, size } from "./theme.stylex";

const COMPANY_SUFFIX = "有限公司";
const SUBSIDIARY_GAP = 24;

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
    marginBottom: { default: 40, [breakpoints.lg]: 80 },
  },
  tree: {
    position: "relative",
  },
  trunk: {
    display: { default: "none", [breakpoints.lg]: "block" },
    position: "absolute",
    bottom: "100%",
    left: 0,
    width: 1,
    height: 52,
    backgroundColor: hue.ink,
    transformOrigin: "center top",
    transform: { default: null, [breakpoints.motionOk]: "scaleY(0)" },
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: size.ease,
  },
  bus: {
    display: { default: "none", [breakpoints.lg]: "block" },
    position: "absolute",
    top: 0,
    left: 0,
    right: `calc((100% - ${4 * SUBSIDIARY_GAP}px) / 5)`,
    height: 1,
    backgroundColor: hue.ink,
    transformOrigin: "left center",
    transform: { default: null, [breakpoints.motionOk]: "scaleX(0)" },
    transitionProperty: "transform",
    transitionDuration: "1400ms",
    transitionDelay: "520ms",
    transitionTimingFunction: size.ease,
  },
  grown: {
    transform: "none",
  },
  subsidiaries: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(5, minmax(0, 1fr))",
    },
    columnGap: SUBSIDIARY_GAP,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  subsidiary: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingTop: { default: 24, [breakpoints.lg]: 36 },
    paddingBottom: 24,
    borderTopWidth: { default: 1, [breakpoints.lg]: 0 },
    borderTopStyle: "solid",
    borderTopColor: hue.hairline,
  },
  drop: {
    display: { default: "none", [breakpoints.lg]: "block" },
    position: "absolute",
    top: 0,
    left: 0,
    width: 1,
    height: 16,
    backgroundColor: hue.ink,
    transformOrigin: "center top",
    transform: { default: null, [breakpoints.motionOk]: "scaleY(0)" },
    transitionProperty: "transform",
    transitionDuration: "500ms",
    transitionTimingFunction: size.ease,
  },
  dropDelay: (index: number) => ({ transitionDelay: `${900 + index * 140}ms` }),
  name: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    fontSize: { default: 18, [breakpoints.lg]: 19 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: hue.ink,
  },
  suffix: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.12em",
    color: hue.quiet,
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
  const [treeRef, grown] = useInViewOnce<HTMLDivElement>();

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
        <div ref={treeRef} {...stylex.props(styles.tree)}>
          <span aria-hidden="true" {...stylex.props(styles.trunk, grown && styles.grown)} />
          <span aria-hidden="true" {...stylex.props(styles.bus, grown && styles.grown)} />
          <ul aria-label={ABOUT_STRUCTURE.subsidiaryBadge} {...stylex.props(styles.subsidiaries)}>
            {ABOUT_STRUCTURE.subsidiaries.map((sub, idx) => {
              const stem = sub.name.endsWith(COMPANY_SUFFIX)
                ? sub.name.slice(0, -COMPANY_SUFFIX.length)
                : sub.name;
              return (
                <Reveal key={sub.id} as="li" step={idx} sx={styles.subsidiary}>
                  <span
                    aria-hidden="true"
                    {...stylex.props(styles.drop, grown && styles.grown, styles.dropDelay(idx))}
                  />
                  <h4 {...stylex.props(styles.name)}>
                    <span>{stem}</span>
                    {stem === sub.name ? null : (
                      <span {...stylex.props(styles.suffix)}>{COMPANY_SUFFIX}</span>
                    )}
                  </h4>
                  <span lang="en" {...stylex.props(ty.quiet)}>
                    {sub.english}
                  </span>
                </Reveal>
              );
            })}
          </ul>
        </div>
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
