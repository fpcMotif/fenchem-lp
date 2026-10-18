import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "@fenchem-lp/ui/components/lucide";
import { createSignal, createUniqueId } from "solid-js";

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
    fontSize: { default: 28, [mq.tablet]: 36, ["@media (min-width: 1280px)"]: 44 },
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
      ["@media (min-width: 1024px)"]: "repeat(5, minmax(0, 1fr))",
    },
    columnGap: 32,
    rowGap: 0,
    margin: 0,
    marginTop: { default: 56, ["@media (min-width: 1280px)"]: 96 },
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
    marginTop: { default: 40, ["@media (min-width: 1280px)"]: 64 },
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
  const [showDiagram, setShowDiagram] = createSignal(false);
  const diagramId = createUniqueId();

  return (
    <section
      id="about-structure"
      aria-labelledby="about-structure-title"
      {...stylex.attrs(shared.anchor, shared.section, styles.section)}
    >
      <h2 id="about-structure-title" {...stylex.attrs(shared.srOnly)}>
        {ABOUT_STRUCTURE.eyebrow}
      </h2>
      <div {...stylex.attrs(shared.shell, shared.inset)}>
        <Reveal sx={styles.holding}>
          <span {...stylex.attrs(styles.holdingRole)}>{ABOUT_STRUCTURE.holding.badge}</span>
          <h3 {...stylex.attrs(styles.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
          <div lang="en" {...stylex.attrs(styles.english)}>
            {ABOUT_STRUCTURE.holding.english}
          </div>
        </Reveal>

        <ul
          aria-label={ABOUT_STRUCTURE.subsidiaryBadgeEnglish}
          {...stylex.attrs(styles.subsidiaries)}
        >
          {ABOUT_STRUCTURE.subsidiaries.map((sub, position) => (
            <Reveal as="li" step={position} sx={styles.subsidiary}>
              <h4 {...stylex.attrs(styles.subsidiaryName)}>{sub.name}</h4>
              <span lang="en" {...stylex.attrs(styles.subsidiaryEnglish)}>
                {sub.english}
              </span>
            </Reveal>
          ))}
        </ul>

        <div {...stylex.attrs(styles.toggleWrap)}>
          <button
            type="button"
            aria-expanded={showDiagram() ? "true" : "false"}
            aria-controls={diagramId}
            onClick={() => setShowDiagram((prev) => !prev)}
            {...stylex.attrs(styles.toggle, shared.focusRing)}
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
      </div>
    </section>
  );
}
