import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";

import { ABOUT_BANNER, ABOUT_HERO } from "../../about-data";
import { pad2, SHEET_COUNT, ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

const CLOSING_LINES = ["图纸之外的细节，", "请与我们联系。"] as const;

const styles = stylex.create({
  section: {
    paddingTop: { default: 96, [bp.tablet]: 128, [bp.desktop]: 168 },
    paddingBottom: { default: 72, [bp.tablet]: 104, [bp.desktop]: 136 },
  },
  block: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) minmax(0, 1fr)",
      [bp.tabletUp]: "minmax(0, 6fr) minmax(0, 4fr) minmax(0, 2fr)",
    },
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: tone.navy,
  },
  cell: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    boxSizing: "border-box",
    padding: { default: "14px 16px", [bp.desktop]: "18px 22px" },
    borderColor: tone.rule,
    borderStyle: "solid",
    borderWidth: 0,
  },
  titleCell: {
    gridColumn: { default: "1 / -1", [bp.tabletUp]: "1" },
    gridRow: { default: "auto", [bp.tabletUp]: "1 / 3" },
    justifyContent: "space-between",
    minHeight: { default: 0, [bp.tabletUp]: 220 },
    borderBottomWidth: { default: 1, [bp.tabletUp]: 0 },
    borderRightWidth: { default: 0, [bp.tabletUp]: 1 },
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 32, [bp.tablet]: 44, [bp.desktop]: 56 },
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "0.03em",
    color: tone.navy,
  },
  titleLine: {
    display: "block",
  },
  companyCell: {
    gridColumn: { default: "1 / -1", [bp.tabletUp]: "2" },
    borderBottomWidth: 1,
    borderRightWidth: { default: 0, [bp.tabletUp]: 1 },
  },
  sheetCell: {
    borderBottomWidth: 1,
    borderRightWidth: { default: 1, [bp.tabletUp]: 0 },
  },
  estCell: {
    borderBottomWidth: { default: 1, [bp.tabletUp]: 0 },
    borderRightWidth: { default: 0, [bp.tabletUp]: 0 },
    display: { default: "flex", [bp.tabletUp]: "none" },
  },
  value: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.5,
    color: tone.ink,
  },
  latinValue: {
    fontFamily: face.latin,
    fontVariantNumeric: "tabular-nums",
  },
  action: {
    gridColumn: { default: "1 / -1", [bp.tabletUp]: "2 / 4" },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    minHeight: 72,
    paddingInline: { default: 16, [bp.desktop]: 22 },
    borderWidth: 0,
    backgroundColor: { default: tone.blue, ":hover": tone.navy },
    fontFamily: face.sans,
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: "#ffffff",
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    transitionTimingFunction: chrome.ease,
    outline: { default: "none", ":focus-visible": "2px solid #0743a9" },
    outlineOffset: 4,
  },
  arrow: {
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.motionOk]: "translateX(4px)" },
    },
    transitionProperty: "transform",
    transitionDuration: "240ms",
    transitionTimingFunction: chrome.ease,
  },
});

export function Closing({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <section aria-labelledby="oos1m-cta" {...stylex.props(ui.shell, styles.section)}>
      <div {...stylex.props(styles.block)}>
        <div {...stylex.props(styles.cell, styles.titleCell)}>
          <p lang="en" {...stylex.props(ui.caps)}>
            End of set · Sheets 01–{pad2(SHEET_COUNT)}
          </p>
          <h2 id="oos1m-cta" {...stylex.props(styles.title)}>
            {CLOSING_LINES.map((line) => (
              <span key={line} {...stylex.props(styles.titleLine)}>
                {line}
              </span>
            ))}
          </h2>
        </div>
        <div {...stylex.props(styles.cell, styles.companyCell)}>
          <p lang="en" {...stylex.props(ui.caps)}>
            Drawn by
          </p>
          <p {...stylex.props(styles.value)}>{ABOUT_HERO.title}</p>
          <p lang="en" {...stylex.props(ui.caps)}>
            {ABOUT_BANNER.established} · {ABOUT_BANNER.place}
          </p>
        </div>
        <div {...stylex.props(styles.cell, styles.sheetCell)}>
          <p lang="en" {...stylex.props(ui.caps)}>
            Sheets
          </p>
          <p lang="en" {...stylex.props(styles.value, styles.latinValue)}>
            {pad2(SHEET_COUNT)} / {pad2(SHEET_COUNT)}
          </p>
        </div>
        <div aria-hidden="true" {...stylex.props(styles.cell, styles.estCell)}>
          <p lang="en" {...stylex.props(ui.caps)}>
            Est.
          </p>
          <p lang="en" {...stylex.props(styles.value, styles.latinValue)}>
            {ABOUT_BANNER.established.replace("Est. ", "")}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigateHome("contact")}
          {...stylex.props(styles.action)}
        >
          联系我们
          <ArrowRight
            size={20}
            strokeWidth={1.5}
            aria-hidden="true"
            {...stylex.props(styles.arrow)}
          />
        </button>
      </div>
    </section>
  );
}
