import * as stylex from "@stylexjs/stylex";
import { useRef } from "react";

import { ABOUT_STRUCTURE } from "../../about-data";
import { SheetHeader } from "./sheet-header";
import { srOnly, ui } from "./shared";
import { StructureDrawing } from "./structure-drawing";
import { bp, face, tone } from "./tokens.stylex";
import { useViewAssembly } from "./use-assembly-progress";

const ENTRIES = [
  { id: "holding", ...ABOUT_STRUCTURE.holding },
  ...ABOUT_STRUCTURE.subsidiaries.map((subsidiary) => ({
    ...subsidiary,
    badge: ABOUT_STRUCTURE.subsidiaryBadge,
  })),
];

const styles = stylex.create({
  body: {
    alignItems: "center",
    rowGap: 40,
    marginTop: { default: 32, [bp.tablet]: 48, [bp.desktop]: 64 },
  },
  drawing: {
    gridColumn: { default: "1 / -1", [bp.laptop]: "1 / 7", [bp.wide]: "1 / 8" },
  },
  bom: {
    gridColumn: { default: "1 / -1", [bp.laptop]: "7 / 13", [bp.wide]: "8 / 13" },
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomStyle: "solid",
    borderBottomColor: tone.navy,
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "36px minmax(0, 1fr)",
      [bp.tabletUp]: "44px minmax(0, 1fr) auto",
    },
    columnGap: 12,
    alignItems: "start",
  },
  head: {
    display: { default: "none", [bp.tabletUp]: "grid" },
    paddingBlock: 9,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.rule,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    borderBottomWidth: 1.5,
    borderBottomStyle: "solid",
    borderBottomColor: tone.navy,
  },
  item: {
    paddingBlock: 12,
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.rule,
  },
  names: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  name: {
    fontFamily: face.sans,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.45,
    color: tone.ink,
  },
  holdingName: {
    fontSize: 18,
    fontWeight: 700,
    color: tone.navy,
  },
  type: {
    gridColumn: { default: "2", [bp.tabletUp]: "3" },
    paddingTop: { default: 4, [bp.tabletUp]: 2 },
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.body,
    whiteSpace: "nowrap",
  },
  typeHead: {
    textAlign: "right",
  },
});

export function Structure() {
  const drawingRef = useRef<HTMLDivElement>(null);
  const progress = useViewAssembly(drawingRef, 2.2);

  return (
    <section
      id="about-structure"
      aria-labelledby="oos1m-structure"
      {...stylex.props(ui.shell, ui.section, ui.anchor)}
    >
      <SheetHeader
        sheet={6}
        title={ABOUT_STRUCTURE.title}
        english="General assembly"
        titleId="oos1m-structure"
      />
      <div {...stylex.props(ui.grid, styles.body)}>
        <div ref={drawingRef} {...stylex.props(styles.drawing)}>
          <StructureDrawing progress={progress} />
        </div>
        <div {...stylex.props(styles.bom)}>
          <p {...stylex.props(ui.caps, styles.caption)}>
            <span lang="en">Parts list</span>
            <span lang="en">6 items · all flush</span>
          </p>
          <div aria-hidden="true" {...stylex.props(ui.caps, styles.row, styles.head)}>
            <span lang="en">Item</span>
            <span lang="en">Name</span>
            <span lang="en" {...stylex.props(styles.typeHead)}>
              Type
            </span>
          </div>
          <ol {...stylex.props(styles.list)}>
            {ENTRIES.map((entry, index) => (
              <li key={entry.id} {...stylex.props(styles.row, styles.item)}>
                <span aria-hidden="true" {...stylex.props(ui.balloon)}>
                  {index + 1}
                </span>
                <span {...stylex.props(styles.names)}>
                  <span {...stylex.props(styles.name, index === 0 && styles.holdingName)}>
                    {entry.name}
                  </span>
                  <span lang="en" {...stylex.props(ui.label)}>
                    {entry.english}
                  </span>
                </span>
                <span {...stylex.props(styles.type)}>
                  <span {...srOnly}>Type:</span>
                  {entry.badge}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
