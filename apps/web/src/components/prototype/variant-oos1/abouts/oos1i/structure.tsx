import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId, useState } from "react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { Reveal } from "./motion";
import { Section, SectionName, base } from "./primitives";
import { font, media, tone } from "./shear.stylex";

const S = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 5fr) minmax(0, 7fr)",
    },
    columnGap: { default: 0, [breakpoints.lg]: 80, [media.desktop]: 112 },
    rowGap: 40,
    alignItems: "start",
  },
  holding: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  name: {
    margin: 0,
    fontFamily: font.sans,
    fontSize: { default: 26, [media.desktop]: 32 },
    fontWeight: 500,
    lineHeight: 1.45,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  rows: {
    margin: 0,
    marginTop: 12,
    padding: 0,
    listStyle: "none",
  },
  row: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: { default: "flex-start", [breakpoints.md]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 4, [breakpoints.md]: 24 },
    paddingBlock: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.rule,
  },
  rowLast: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.rule,
  },
  subName: {
    margin: 0,
    fontFamily: font.sans,
    fontSize: { default: 17, [media.desktop]: 20 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.05em",
    color: tone.ink,
  },
  toggleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 28,
    marginTop: { default: 40, [media.desktop]: 64 },
  },
  toggle: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.sans,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.ink,
    textDecorationLine: "underline",
    textDecorationThickness: 1,
    textUnderlineOffset: 6,
    cursor: "pointer",
  },
  diagram: {
    width: "100%",
    maxWidth: 960,
    backgroundColor: tone.tint,
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
  const { holding, subsidiaries } = ABOUT_STRUCTURE;
  return (
    <Section id="about-structure" labelledBy="about-structure-title" surface="page">
      <SectionName id="about-structure-title">{ABOUT_STRUCTURE.title}</SectionName>
      <div {...stylex.props(base.shell, base.inset)}>
        <div {...stylex.props(S.grid)}>
          <Reveal sx={S.holding}>
            <p {...stylex.props(base.quiet)}>{holding.badge}</p>
            <h3 {...stylex.props(S.name)}>{holding.name}</h3>
            <p lang="en" {...stylex.props(base.quiet)}>
              {holding.english}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p {...stylex.props(base.quiet)}>{ABOUT_STRUCTURE.subsidiaryBadge}</p>
            <ul {...stylex.props(S.rows)}>
              {subsidiaries.map((sub, index) => (
                <li
                  key={sub.id}
                  {...stylex.props(S.row, index === subsidiaries.length - 1 && S.rowLast)}
                >
                  <h4 {...stylex.props(S.subName)}>{sub.name}</h4>
                  <span lang="en" {...stylex.props(base.quiet)}>
                    {sub.english}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div {...stylex.props(S.toggleWrap)}>
          <button
            type="button"
            aria-expanded={showDiagram}
            aria-controls={diagramId}
            onClick={() => setShowDiagram((prev) => !prev)}
            {...stylex.props(S.toggle, base.focusRing)}
          >
            {showDiagram ? "收起组织架构图" : "查看官方组织架构图"}
          </button>
          <div id={diagramId} hidden={!showDiagram} {...stylex.props(S.diagram)}>
            <img
              src={ABOUT_STRUCTURE.chartImage}
              alt="南京泛成国际控股有限公司官方组织架构图"
              loading="lazy"
              decoding="async"
              {...stylex.props(S.diagramImage)}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
