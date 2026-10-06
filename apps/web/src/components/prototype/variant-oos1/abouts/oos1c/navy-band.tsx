import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { ABOUT_HONORS, ABOUT_STRUCTURE } from "../../about-data";
import { Reveal } from "./reveal";
import { ease, mq, tone } from "./tokens.stylex";
import { ui } from "./ui";

const LEVELS = [
  { level: "national", label: "国家级" },
  { level: "provincial", label: "江苏省级" },
  { level: "municipal", label: "南京市级" },
] as const;

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  band: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 80, [mq.xl]: 140 },
    paddingBlock: { default: 72, [mq.md]: 96, [mq.xl]: 120 },
    backgroundColor: tone.navy,
    color: colors.paper,
  },
  level: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [mq.lg]: "200px minmax(0, 1fr)" },
    gap: { default: 20, [mq.lg]: 40 },
    paddingBlock: { default: 32, [mq.xl]: 48 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.onNavyLine,
  },
  levelLabel: {
    margin: 0,
    paddingTop: { default: 0, [mq.lg]: 8 },
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.24em",
    color: tone.onNavyFaint,
  },
  honorList: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [mq.sm]: "repeat(2, minmax(0, 1fr))",
    },
    gap: { default: "18px 32px", [mq.xl]: "28px 56px" },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  honor: {
    fontSize: { default: 18, [mq.md]: 20 },
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: "0.08em",
    color: tone.onNavy,
    textWrap: "balance",
  },
  honorLead: {
    gridColumn: "1 / -1",
    fontSize: { default: 28, [mq.tablet]: 34, [mq.xl]: 44 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.1em",
    color: colors.paper,
  },
  structure: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [mq.lg]: "minmax(0, 0.42fr) minmax(0, 0.58fr)" },
    columnGap: { default: 0, [mq.lg]: 64, [mq.xl]: 96 },
    rowGap: { default: 40, [mq.xl]: 56 },
    alignItems: "start",
  },
  holding: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  holdingLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.24em",
    color: tone.onNavyFaint,
  },
  holdingName: {
    margin: 0,
    fontSize: { default: 28, [mq.tablet]: 34, [mq.xl]: 40 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.06em",
    textWrap: "balance",
  },
  holdingEnglish: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.03em",
    color: tone.onNavyMuted,
  },
  subs: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.onNavyLine,
  },
  sub: {
    display: "flex",
    flexDirection: { default: "column", [mq.sm]: "row" },
    alignItems: { default: "flex-start", [mq.sm]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 6, [mq.sm]: 24 },
    paddingBlock: { default: 18, [mq.xl]: 22 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.onNavyLine,
  },
  subName: {
    margin: 0,
    fontSize: { default: 16, [mq.md]: 18 },
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    color: tone.onNavy,
  },
  subEnglish: {
    flexShrink: 0,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.03em",
    color: tone.onNavyFaint,
  },
  toggleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 32,
    marginTop: { default: 40, [mq.xl]: 56 },
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
    maxWidth: 960,
    animationName: fadeIn,
    animationDuration: "400ms",
    animationTimingFunction: ease.out,
  },
  diagramImage: {
    display: "block",
    width: "100%",
    height: "auto",
  },
});

export function NavyBand() {
  const [showDiagram, setShowDiagram] = useState(false);
  const diagramId = useId();
  const subsLabelId = useId();

  return (
    <div {...stylex.props(styles.band)}>
      <section
        id="about-honor"
        aria-labelledby="about-honor-title"
        {...stylex.props(ui.shell, ui.inset, ui.anchor)}
      >
        <h2 id="about-honor-title" {...stylex.props(ui.srOnly)}>
          {ABOUT_HONORS.title}
        </h2>
        {LEVELS.map((entry) => {
          const items = ABOUT_HONORS.items.filter((item) => item.level === entry.level);
          return (
            <Reveal key={entry.level} sx={styles.level}>
              <h3 {...stylex.props(styles.levelLabel)}>{entry.label}</h3>
              <ul aria-label={entry.label} {...stylex.props(styles.honorList)}>
                {items.map((honor) => (
                  <li
                    key={honor.id}
                    {...stylex.props(styles.honor, entry.level === "national" && styles.honorLead)}
                  >
                    {honor.title}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </section>

      <section
        id="about-structure"
        aria-labelledby="about-structure-title"
        {...stylex.props(ui.shell, ui.inset, ui.anchor)}
      >
        <h2 id="about-structure-title" {...stylex.props(ui.srOnly)}>
          {ABOUT_STRUCTURE.title}
        </h2>
        <div {...stylex.props(styles.structure)}>
          <Reveal sx={styles.holding}>
            <p {...stylex.props(styles.holdingLabel)}>{ABOUT_STRUCTURE.holding.badge}</p>
            <h3 {...stylex.props(styles.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
            <div lang="en" {...stylex.props(styles.holdingEnglish)}>
              {ABOUT_STRUCTURE.holding.english}
            </div>
          </Reveal>

          <div {...stylex.props(styles.holding)}>
            <p id={subsLabelId} {...stylex.props(styles.holdingLabel)}>
              {ABOUT_STRUCTURE.subsidiaryBadge}
            </p>
            <ul aria-labelledby={subsLabelId} {...stylex.props(styles.subs)}>
              {ABOUT_STRUCTURE.subsidiaries.map((sub, index) => (
                <Reveal key={sub.id} as="li" step={index} sx={styles.sub}>
                  <h4 {...stylex.props(styles.subName)}>{sub.name}</h4>
                  <span lang="en" {...stylex.props(styles.subEnglish)}>
                    {sub.english}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <div {...stylex.props(styles.toggleWrap)}>
          <button
            type="button"
            aria-expanded={showDiagram}
            aria-controls={diagramId}
            onClick={() => setShowDiagram((previous) => !previous)}
            {...stylex.props(ui.textLink, ui.textLinkOnNavy, ui.focusRing, ui.focusRingOnNavy)}
          >
            <span>{showDiagram ? "收起组织架构图" : "查看官方组织架构图"}</span>
            <ChevronDown
              size={15}
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
      </section>
    </div>
  );
}
