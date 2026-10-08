import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { CATALOG_GROUPS, type CatalogGroup } from "../../products-data";
import { splitTitle } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const MOSS = "#f0f6ed";
const MOSS_EDGE = "#d4e2ce";
const MOSS_RULE = "#e4ece0";
const PAPER = "#ffffff";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT =
  '"Inter Tight", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

const SM = breakpoints.sm;
const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const MEASURE = 560;

const COLUMNS: string[][] = [
  ["brazil", "active", "other"],
  ["mediterranean", "south-africa", "north-america"],
];

const TOTAL_ITEMS = CATALOG_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

const styles = stylex.create({
  section: {
    backgroundColor: MOSS,
    color: INK,
    fontFamily: BODY_FONT,
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET },
  },
  head: {
    marginBottom: { default: 32, [DESKTOP]: 48 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: INK,
  },
  meta: {
    margin: 0,
    marginTop: 12,
    fontFamily: NUMERAL_FONT,
    fontSize: 14,
    lineHeight: "22px",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  board: {
    display: "flex",
    flexDirection: { default: "column", [DESKTOP]: "row" },
    alignItems: { default: "stretch", [DESKTOP]: "flex-start" },
    gap: { default: 16, [SM]: 24 },
  },
  column: {
    display: { default: "contents", [DESKTOP]: "flex" },
    flexDirection: "column",
    gap: 24,
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 0,
  },
  panel: {
    boxSizing: "border-box",
    minWidth: 0,
    paddingTop: { default: 20, [SM]: 24 },
    paddingBottom: { default: 4, [SM]: 8 },
    paddingInline: { default: 16, [SM]: 24 },
    backgroundColor: PAPER,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: MOSS_EDGE,
  },
  table: {
    display: { default: "block", [SM]: "table" },
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "collapse",
    borderSpacing: 0,
  },
  caption: {
    display: { default: "block", [SM]: "table-caption" },
    captionSide: "top",
    paddingBottom: 16,
    textAlign: "start",
  },
  captionRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
  },
  regionName: {
    margin: 0,
    fontSize: 17,
    fontWeight: 500,
    lineHeight: "26px",
    letterSpacing: "0.04em",
    color: INK,
  },
  count: {
    flexShrink: 0,
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  intro: {
    margin: 0,
    marginTop: 8,
    maxWidth: MEASURE,
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  colName: {
    width: { default: "auto", [SM]: "40%" },
  },
  colFeatures: {
    width: { default: "auto", [SM]: "60%" },
  },
  thead: {
    display: { default: "block", [SM]: "table-header-group" },
    position: { default: "absolute", [SM]: "static" },
    width: { default: 1, [SM]: "auto" },
    height: { default: 1, [SM]: "auto" },
    overflow: { default: "hidden", [SM]: "visible" },
    clipPath: { default: "inset(50%)", [SM]: "none" },
    whiteSpace: { default: "nowrap", [SM]: "normal" },
  },
  colHead: {
    paddingTop: 0,
    paddingBottom: 10,
    paddingInlineStart: 0,
    paddingInlineEnd: 20,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: MOSS_EDGE,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    textAlign: "start",
    color: MUTED,
  },
  colHeadLast: {
    paddingInlineEnd: 0,
  },
  body: {
    display: { default: "block", [SM]: "table-row-group" },
  },
  row: {
    display: { default: "block", [SM]: "table-row" },
    paddingBlock: { default: 14, [SM]: 0 },
    borderTopWidth: { default: 1, ":first-child": { default: 1, [SM]: 0 } },
    borderTopStyle: "solid",
    borderTopColor: { default: MOSS_RULE, ":first-child": MOSS_EDGE },
  },
  nameCell: {
    display: { default: "block", [SM]: "table-cell" },
    paddingTop: { default: 0, [SM]: 14 },
    paddingBottom: { default: 6, [SM]: 14 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [SM]: 20 },
    verticalAlign: "top",
    textAlign: "start",
    fontWeight: 400,
  },
  primary: {
    display: "block",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
  },
  secondary: {
    marginInlineStart: 6,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: 0,
    color: MUTED,
  },
  inci: {
    display: "block",
    marginTop: 2,
    fontSize: 12,
    lineHeight: "18px",
    letterSpacing: "0.01em",
    color: MUTED,
    textWrap: "pretty",
  },
  featureCell: {
    display: { default: "block", [SM]: "table-cell" },
    paddingTop: { default: 0, [SM]: 14 },
    paddingBottom: { default: 0, [SM]: 14 },
    paddingInline: 0,
    verticalAlign: "top",
  },
  features: {
    margin: 0,
    maxWidth: MEASURE,
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
});

const orderStyles = stylex.create({
  slot: (position: number) => ({
    order: { default: position, [DESKTOP]: 0 },
  }),
});

function RegionTable({ group, position }: { group: CatalogGroup; position: number }) {
  const captionId = useId();
  return (
    <div {...stylex.props(styles.panel, orderStyles.slot(position))}>
      <table role="table" aria-labelledby={captionId} {...stylex.props(styles.table)}>
        <caption {...stylex.props(styles.caption)}>
          <div {...stylex.props(styles.captionRow)}>
            <h3 id={captionId} {...stylex.props(styles.regionName)}>
              {group.label}
            </h3>
            <span {...stylex.props(styles.count)}>{group.items.length} 款</span>
          </div>
          {group.intro && <p {...stylex.props(styles.intro)}>{group.intro}</p>}
        </caption>
        <colgroup>
          <col {...stylex.props(styles.colName)} />
          <col {...stylex.props(styles.colFeatures)} />
        </colgroup>
        <thead role="rowgroup" {...stylex.props(styles.thead)}>
          <tr role="row">
            <th role="columnheader" scope="col" {...stylex.props(styles.colHead)}>
              名称
            </th>
            <th
              role="columnheader"
              scope="col"
              {...stylex.props(styles.colHead, styles.colHeadLast)}
            >
              特性&应用
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup" {...stylex.props(styles.body)}>
          {group.items.map((item) => {
            const { primary, secondary } = splitTitle(item.title);
            return (
              <tr key={item.id} role="row" {...stylex.props(styles.row)}>
                <th role="rowheader" scope="row" {...stylex.props(styles.nameCell)}>
                  <span {...stylex.props(styles.primary)}>
                    {primary}
                    {secondary && <span {...stylex.props(styles.secondary)}>{secondary}</span>}
                  </span>
                  <span {...stylex.props(styles.inci)}>{item.inci}</span>
                </th>
                <td role="cell" {...stylex.props(styles.featureCell)}>
                  <p {...stylex.props(styles.features)}>{item.features}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function Catalog() {
  const titleId = useId();
  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            产品目录
          </h2>
          <p {...stylex.props(styles.meta)}>
            {CATALOG_GROUPS.length} 个分类 · {TOTAL_ITEMS} 款原料
          </p>
        </header>
        <div {...stylex.props(styles.board)}>
          {COLUMNS.map((ids) => (
            <div key={ids.join()} {...stylex.props(styles.column)}>
              {ids.map((id) => {
                const position = CATALOG_GROUPS.findIndex((group) => group.id === id);
                const group = CATALOG_GROUPS[position];
                return group ? <RegionTable key={id} group={group} position={position} /> : null;
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
