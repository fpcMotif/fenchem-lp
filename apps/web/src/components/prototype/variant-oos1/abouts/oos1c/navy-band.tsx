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
    gridTemplateColumns: { default: "1fr", [mq.lg]: "180px minmax(0, 1fr)" },
    gap: { default: 16, [mq.lg]: 32 },
    paddingBlock: { default: 28, [mq.xl]: 40 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.onNavyLine,
  },
  levelLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: tone.onNavyMuted,
  },
  honorList: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [mq.sm]: "repeat(auto-fill, minmax(200px, 1fr))",
    },
    gap: { default: "20px 24px", [mq.xl]: "32px 40px" },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  honor: {
    fontSize: { default: 20, [mq.xl]: 22 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    textWrap: "balance",
  },
  honorLead: {
    gridColumn: "1 / -1",
    fontSize: { default: 32, [mq.tablet]: 40, [mq.xl]: 56 },
    lineHeight: 1.3,
    letterSpacing: "0.08em",
  },
  holding: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: { default: 40, [mq.xl]: 64 },
  },
  holdingLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: tone.onNavyMuted,
  },
  holdingName: {
    margin: 0,
    fontSize: { default: 28, [mq.tablet]: 36, [mq.xl]: 44 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
  },
  holdingEnglish: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: tone.onNavy,
  },
  subs: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [mq.lg]: "repeat(5, minmax(0, 1fr))" },
    gap: { default: 0, [mq.lg]: 24 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  sub: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    paddingBlock: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.onNavyLine,
  },
  subName: {
    margin: 0,
    fontSize: 17,
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
  },
  subEnglish: {
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: tone.onNavyMuted,
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
        <Reveal sx={styles.holding}>
          <p {...stylex.props(styles.holdingLabel)}>{ABOUT_STRUCTURE.holding.badge}</p>
          <h3 {...stylex.props(styles.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
          <div lang="en" {...stylex.props(styles.holdingEnglish)}>
            {ABOUT_STRUCTURE.holding.english}
          </div>
        </Reveal>

        <ul aria-label={ABOUT_STRUCTURE.subsidiaryBadge} {...stylex.props(styles.subs)}>
          {ABOUT_STRUCTURE.subsidiaries.map((sub, index) => (
            <Reveal key={sub.id} as="li" step={index} sx={styles.sub}>
              <h4 {...stylex.props(styles.subName)}>{sub.name}</h4>
              <span lang="en" {...stylex.props(styles.subEnglish)}>
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
