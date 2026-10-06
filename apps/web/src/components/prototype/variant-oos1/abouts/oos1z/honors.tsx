import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../about-data";
import { RoomSign } from "./room-sign";
import { sectionTitle, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const FIRST_NUMBER = 12;

const LEVELS = [
  { level: "national", label: "国家级", english: "National", line: "National honour" },
  {
    level: "provincial",
    label: "江苏省级",
    english: "Provincial",
    line: "Provincial honour, Jiangsu",
  },
  {
    level: "municipal",
    label: "南京市级",
    english: "Municipal",
    line: "Municipal honour, Nanjing",
  },
] as const;

const GROUPS = LEVELS.map((entry) => ({
  ...entry,
  items: ABOUT_HONORS.items.flatMap((item, index) =>
    item.level === entry.level
      ? [{ ...item, number: String(FIRST_NUMBER + index).padStart(2, "0") }]
      : [],
  ),
}));

const styles = stylex.create({
  wall: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { default: 48, [bp.desktop]: 64 },
    marginTop: { default: 56, [bp.tablet]: 72, [bp.desktop]: 96 },
  },
  row: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: { default: "100%", [bp.tablet]: "auto", [bp.desktop]: "auto" },
    maxWidth: "100%",
  },
  rail: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    paddingInline: 4,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.lineStrong,
    whiteSpace: "nowrap",
  },
  railLabel: {
    fontFamily: face.sans,
    fontSize: { default: 14, [bp.desktop]: 15 },
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  railCount: {
    fontSize: { default: 15, [bp.desktop]: 16 },
    color: tone.body,
  },
  plaques: {
    display: "flex",
    flexDirection: { default: "column", [bp.tablet]: "row", [bp.desktop]: "row" },
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: { default: 0, [bp.tablet]: 20, [bp.laptop]: 16, [bp.wide]: 24 },
    rowGap: { default: 0, [bp.tablet]: 8 },
    margin: 0,
    paddingInline: { default: 0, [bp.tablet]: 20, [bp.laptop]: 16, [bp.wide]: 28 },
    listStyleType: "none",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  wires: {
    width: "64%",
    height: { default: 20, [bp.desktop]: 28 },
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderLeftColor: tone.line,
    borderRightColor: tone.line,
  },
  plaque: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    boxSizing: "border-box",
    width: { default: "100%", [bp.tablet]: 300, [bp.laptop]: 206, [bp.wide]: 264 },
    padding: 6,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.lineStrong,
    backgroundColor: tone.paper,
  },
  mat: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: 6,
    boxSizing: "border-box",
    minHeight: { default: 112, [bp.desktop]: 128 },
    paddingBlock: { default: 16, [bp.desktop]: 20 },
    paddingInline: { default: 18, [bp.laptop]: 12, [bp.wide]: 16 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.lineSoft,
  },
  number: {
    fontSize: { default: 16, [bp.desktop]: 17 },
    lineHeight: 1,
    color: tone.navy,
  },
  title: {
    marginTop: "auto",
    fontFamily: face.sans,
    fontWeight: 400,
    fontSize: { default: 18, [bp.laptop]: 16, [bp.wide]: 18 },
    lineHeight: 1.45,
    letterSpacing: "0.02em",
    color: tone.ink,
    textWrap: "balance",
  },
  level: {
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.3,
    color: tone.body,
  },
});

export function Honors() {
  return (
    <section id="about-honor" aria-labelledby="oos1z-honor" {...stylex.props(ui.anchor, ui.room)}>
      <div {...stylex.props(ui.shell)}>
        <RoomSign
          numeral="V"
          id="oos1z-honor"
          title={sectionTitle("about-honor")}
          english="Honours, hung on the line"
        />
        <div {...stylex.props(styles.wall)}>
          {GROUPS.map((group) => (
            <div key={group.level} {...stylex.props(styles.row)}>
              <div {...stylex.props(styles.rail)}>
                <span {...stylex.props(styles.railLabel)}>{group.label}</span>
                <span lang="en" {...stylex.props(ui.italic, styles.railCount)}>
                  {group.english}
                </span>
              </div>
              <ol {...stylex.props(styles.plaques)}>
                {group.items.map((item) => (
                  <li key={item.id} {...stylex.props(styles.item)}>
                    <span aria-hidden="true" {...stylex.props(styles.wires)} />
                    <div {...stylex.props(styles.plaque)}>
                      <div {...stylex.props(styles.mat)}>
                        <span lang="en" {...stylex.props(ui.number, styles.number)}>
                          Nº {item.number}
                        </span>
                        <span {...stylex.props(styles.title)}>{item.title}</span>
                        <span lang="en" {...stylex.props(ui.italic, styles.level)}>
                          {group.line}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
