import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../about-data";
import { SheetHeader } from "./sheet-header";
import { pad2, srOnly, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

type Level = (typeof ABOUT_HONORS.items)[number]["level"];

const LEVELS: Record<Level, { plates: number; label: string; english: string }> = {
  national: { plates: 3, label: "国家级", english: "National" },
  provincial: { plates: 2, label: "江苏省级", english: "Provincial" },
  municipal: { plates: 1, label: "南京市级", english: "Municipal" },
};

const STACK = { halfWidth: 15, halfHeight: 7.5, thickness: 5, width: 34, height: 33 } as const;

function plateShapes(level: number) {
  const cx = STACK.width / 2;
  const y = STACK.height - STACK.halfHeight - STACK.thickness - 1 - level * STACK.thickness;
  const { halfWidth: a, halfHeight: b, thickness: t } = STACK;
  return {
    top: `M${cx} ${y - b}L${cx + a} ${y}L${cx} ${y + b}L${cx - a} ${y}Z`,
    left: `M${cx - a} ${y}L${cx} ${y + b}V${y + b + t}L${cx - a} ${y + t}Z`,
    front: `M${cx} ${y + b}L${cx + a} ${y}V${y + t}L${cx} ${y + b + t}Z`,
  };
}

function LevelStack({ plates }: { plates: number }) {
  return (
    <svg
      viewBox={`0 0 ${STACK.width} ${STACK.height}`}
      width={STACK.width}
      height={STACK.height}
      aria-hidden="true"
    >
      {Array.from({ length: plates }, (_, level) => {
        const shape = plateShapes(level);
        return (
          <g key={level} stroke="rgba(11, 42, 92, 0.88)" strokeWidth={1} strokeLinejoin="round">
            <path d={shape.left} fill="#e6ecf7" />
            <path d={shape.front} fill="#d2dcee" />
            <path d={shape.top} fill="#ffffff" />
          </g>
        );
      })}
    </svg>
  );
}

const styles = stylex.create({
  table: {
    marginTop: { default: 32, [bp.tablet]: 48, [bp.desktop]: 64 },
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) auto",
      [bp.tabletUp]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 16, [bp.tablet]: 20, [bp.desktop]: 24 },
    alignItems: "center",
  },
  head: {
    display: { default: "none", [bp.tabletUp]: "grid" },
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomStyle: "solid",
    borderBottomColor: tone.navy,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    borderTopWidth: { default: 1.5, [bp.tabletUp]: 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.navy,
    borderBottomWidth: 1.5,
    borderBottomStyle: "solid",
    borderBottomColor: tone.navy,
  },
  item: {
    rowGap: 6,
    paddingBlock: { default: 16, [bp.tabletUp]: 14 },
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.rule,
  },
  number: {
    gridColumn: { default: "1", [bp.tabletUp]: "1 / 3" },
    gridRow: "1",
    fontFamily: face.latin,
    fontSize: 15,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.04em",
    color: tone.muted,
  },
  title: {
    gridColumn: { default: "1 / -1", [bp.tabletUp]: "3 / 10" },
    gridRow: { default: "2", [bp.tabletUp]: "1" },
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 20, [bp.desktop]: 26 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.03em",
    color: tone.ink,
  },
  level: {
    gridColumn: { default: "2", [bp.tabletUp]: "10 / 13" },
    gridRow: "1",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  levelText: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.body,
  },
  headTitle: {
    gridColumn: "3 / 10",
  },
  headLevel: {
    gridColumn: "10 / 13",
  },
});

export function Honors() {
  return (
    <section
      id="about-honor"
      aria-labelledby="oos1m-honor"
      {...stylex.props(ui.shell, ui.section, ui.anchor)}
    >
      <SheetHeader
        sheet={5}
        title={ABOUT_HONORS.title}
        english="Specification"
        titleId="oos1m-honor"
      />
      <div {...stylex.props(styles.table)}>
        <div aria-hidden="true" {...stylex.props(ui.caps, styles.row, styles.head)}>
          <span lang="en">Item</span>
          <span lang="en" {...stylex.props(styles.headTitle)}>
            Designation
          </span>
          <span lang="en" {...stylex.props(styles.headLevel)}>
            Level
          </span>
        </div>
        <ol {...stylex.props(styles.list)}>
          {ABOUT_HONORS.items.map((item, index) => {
            const level = LEVELS[item.level];
            return (
              <li key={item.id} {...stylex.props(styles.row, styles.item)}>
                <span aria-hidden="true" lang="en" {...stylex.props(styles.number)}>
                  H-{pad2(index + 1)}
                </span>
                <p {...stylex.props(styles.title)}>{item.title}</p>
                <span {...stylex.props(styles.level)}>
                  <LevelStack plates={level.plates} />
                  <span {...stylex.props(styles.levelText)}>
                    <span {...srOnly}>级别：</span>
                    {level.label}
                    <span lang="en" {...stylex.props(ui.label)}>
                      {level.english}
                    </span>
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
