import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { Reveal } from "./reveal";
import { shared } from "./shared";
import { font, layout, mq, ui } from "./theme.stylex";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  section: {
    backgroundColor: colors.paper,
  },
  holding: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  holdingRole: {
    fontSize: 13,
    letterSpacing: "0.12em",
    color: ui.body,
  },
  holdingName: {
    margin: 0,
    fontSize: { default: 28, [mq.tablet]: 36, [breakpoints.xl]: 44 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.03em",
    color: ui.ink,
  },
  english: {
    fontFamily: font.display,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.02em",
    color: ui.body,
  },
  subsidiaries: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [mq.mdOnly]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(5, minmax(0, 1fr))",
    },
    columnGap: 32,
    rowGap: 0,
    margin: 0,
    marginTop: { default: 56, [breakpoints.xl]: 96 },
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
    borderTopColor: ui.hairline,
  },
  subsidiaryName: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.04em",
    color: ui.ink,
  },
  subsidiaryEnglish: {
    fontFamily: font.display,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.02em",
    color: ui.body,
  },
  toggleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 32,
    marginTop: { default: 40, [breakpoints.xl]: 64 },
  },
  toggle: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: 14,
    letterSpacing: "0.06em",
    color: ui.ink,
    textDecorationLine: "underline",
    textUnderlineOffset: 6,
    textDecorationColor: ui.hairline,
    cursor: "pointer",
  },
  toggleIcon: {
    transitionProperty: "transform",
    transitionDuration: "200ms",
    transitionTimingFunction: layout.easeOut,
  },
  toggleIconOpen: {
    transform: "rotate(180deg)",
  },
  diagram: {
    width: "100%",
    maxWidth: 960,
    animationName: fadeIn,
    animationDuration: "400ms",
    animationTimingFunction: layout.easeOut,
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
      {...stylex.props(shared.anchor, shared.section, styles.section)}
    >
      <h2 id="about-structure-title" {...stylex.props(shared.srOnly)}>
        {ABOUT_STRUCTURE.eyebrow}
      </h2>
      <div {...stylex.props(shared.shell, shared.inset)}>
        <Reveal sx={styles.holding}>
          <span {...stylex.props(styles.holdingRole)}>{ABOUT_STRUCTURE.holding.badge}</span>
          <h3 {...stylex.props(styles.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
          <div lang="en" {...stylex.props(styles.english)}>
            {ABOUT_STRUCTURE.holding.english}
          </div>
        </Reveal>

        <ul
          aria-label={ABOUT_STRUCTURE.subsidiaryBadgeEnglish}
          {...stylex.props(styles.subsidiaries)}
        >
          {ABOUT_STRUCTURE.subsidiaries.map((sub, position) => (
            <Reveal key={sub.id} as="li" step={position} sx={styles.subsidiary}>
              <h4 {...stylex.props(styles.subsidiaryName)}>{sub.name}</h4>
              <span lang="en" {...stylex.props(styles.subsidiaryEnglish)}>
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
            {...stylex.props(styles.toggle, shared.focusRing)}
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
      </div>
    </section>
  );
}
