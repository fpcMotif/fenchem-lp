import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, m, type Variants } from "motion/react";
import { useId, useState, type ReactNode } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS } from "../../products-data";
import { FLAT_ITEMS, FORM_LABEL, REGION_META, type FlatItem, type Form } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const SECTION_BG = "#f6f2f8";
const TRACK = "#ece4f0";
const RULE = "#e2d8e7";
const GROUP_RULE = "#c9bdd1";
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const CELL_GAP = 24;

type GroupMode = "region" | "form";

interface TableGroup {
  key: string;
  label: string;
  intro: string | null;
  rows: FlatItem[];
}

const FORM_ORDER: Form[] = ["liquid", "solid", "wax", "water", "extract", "unspecified"];

const GROUPS_BY_MODE: Record<GroupMode, TableGroup[]> = {
  region: CATALOG_GROUPS.map((group) => ({
    key: group.id,
    label: group.label,
    intro: group.intro ?? null,
    rows: FLAT_ITEMS.filter((item) => item.group.id === group.id),
  })),
  form: FORM_ORDER.map((form) => ({
    key: form,
    label: FORM_LABEL[form],
    intro: null,
    rows: FLAT_ITEMS.filter((item) => item.traits.form === form),
  })).filter((group) => group.rows.length > 0),
};

const MODES: { id: GroupMode; label: string; attributeHeading: string }[] = [
  { id: "region", label: "按产地", attributeHeading: "形态" },
  { id: "form", label: "按形态", attributeHeading: "产地" },
];

const attributeOf = (item: FlatItem, mode: GroupMode) =>
  mode === "region" ? FORM_LABEL[item.traits.form] : REGION_META[item.group.id].short;

const INCI_LATIN = /（[^）]*）/g;

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: SECTION_BG,
    color: INK,
    fontFamily: BODY_FONT,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET },
  },
  head: {
    display: "flex",
    flexDirection: { default: "column", [MD]: "row" },
    alignItems: { default: "stretch", [MD]: "flex-end" },
    justifyContent: "space-between",
    gap: { default: 24, [MD]: 32 },
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
  controls: {
    display: "flex",
    flexDirection: "column",
    alignItems: { default: "stretch", [MD]: "flex-end" },
    gap: 8,
  },
  segmented: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    width: { default: "100%", [MD]: 224 },
    padding: 2,
    boxSizing: "border-box",
    borderRadius: 4,
    backgroundColor: TRACK,
  },
  thumb: {
    position: "absolute",
    top: 2,
    bottom: 2,
    insetInlineStart: 2,
    width: "calc(50% - 2px)",
    borderRadius: 3,
    backgroundColor: colors.paper,
    boxShadow: "0 1px 2px rgba(48, 28, 60, 0.1)",
    transform: "translateX(0)",
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "240ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  thumbEnd: {
    transform: "translateX(100%)",
  },
  segment: {
    position: "relative",
    height: 40,
    padding: 0,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: { default: BODY_TEXT, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 0,
  },
  segmentOn: {
    fontWeight: 500,
    color: { default: INK, ":hover": INK },
    cursor: "default",
  },
  note: {
    margin: 0,
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  table: {
    display: { default: "block", [MD]: "table" },
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  colgroup: {
    display: { default: "none", [MD]: "table-column-group" },
  },
  colName: { width: "22%" },
  colAttribute: { width: "11%" },
  colInci: { width: "29%" },
  colFeatures: { width: "38%" },
  thead: {
    display: { default: "none", [MD]: "table-header-group" },
  },
  headCell: {
    position: "sticky",
    top: HEADER_HEIGHT,
    zIndex: 1,
    paddingBlock: 12,
    paddingInlineStart: 0,
    paddingInlineEnd: CELL_GAP,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
    backgroundColor: SECTION_BG,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    textAlign: "start",
    color: MUTED,
  },
  lastCell: {
    paddingInlineEnd: 0,
  },
  group: {
    display: { default: "block", [MD]: "table-row-group" },
  },
  groupRow: {
    display: { default: "block", [MD]: "table-row" },
  },
  groupCell: {
    display: { default: "block", [MD]: "table-cell" },
    paddingTop: { default: 40, [MD]: 48 },
    paddingBottom: 12,
    paddingInline: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: GROUP_RULE,
    fontWeight: 400,
    textAlign: "start",
  },
  groupCellFirst: {
    paddingTop: { default: 0, [MD]: 32 },
  },
  groupHeading: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    columnGap: 12,
    rowGap: 2,
  },
  groupLabel: {
    fontSize: { default: 16, [MD]: 17 },
    fontWeight: 500,
    lineHeight: "26px",
    letterSpacing: "0.04em",
    color: INK,
  },
  groupCount: {
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  numeral: {
    marginInlineEnd: 4,
    fontFamily: NUMERAL_FONT,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: 0,
  },
  groupIntro: {
    margin: 0,
    marginTop: 8,
    maxWidth: "40em",
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  row: {
    display: { default: "flex", [MD]: "table-row" },
    flexDirection: "column",
    paddingBlock: { default: 16, [MD]: 0 },
    borderBottomWidth: { default: 1, [MD]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
  },
  cell: {
    display: { default: "block", [MD]: "table-cell" },
    paddingTop: { default: 0, [MD]: 16 },
    paddingBottom: { default: 0, [MD]: 18 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [MD]: CELL_GAP },
    borderBottomWidth: { default: 0, [MD]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
    verticalAlign: "top",
    textAlign: "start",
    fontWeight: 400,
  },
  smallCell: {
    paddingTop: { default: 0, [MD]: 18 },
  },
  nameCell: {
    order: 0,
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
    display: "block",
    marginTop: 2,
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED,
  },
  attributeCell: {
    order: 1,
    marginTop: { default: 4, [MD]: 0 },
    fontSize: 13,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: { default: MUTED, [MD]: BODY_TEXT },
  },
  featuresCell: {
    order: 2,
    marginTop: { default: 8, [MD]: 0 },
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  inciCell: {
    order: 3,
    marginTop: { default: 8, [MD]: 0 },
    fontSize: 13,
    lineHeight: "22px",
    color: MUTED,
    overflowWrap: "anywhere",
  },
  keepTogether: {
    whiteSpace: { default: "normal", [DESKTOP]: "nowrap" },
  },
});

function Inci({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INCI_LATIN)) {
    parts.push(text.slice(last, match.index));
    parts.push(
      <span key={match.index} {...stylex.props(styles.keepTogether)}>
        {match[0]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function GroupBody({
  group,
  mode,
  first,
  variants,
}: {
  group: TableGroup;
  mode: GroupMode;
  first: boolean;
  variants: Variants;
}) {
  return (
    <m.tbody variants={variants} {...stylex.props(styles.group)}>
      <tr {...stylex.props(styles.groupRow)}>
        <th
          scope="rowgroup"
          colSpan={4}
          {...stylex.props(styles.groupCell, first && styles.groupCellFirst)}
        >
          <span {...stylex.props(styles.groupHeading)}>
            <span {...stylex.props(styles.groupLabel)}>{group.label}</span>
            <span {...stylex.props(styles.groupCount)}>
              <span {...stylex.props(styles.numeral)}>{group.rows.length}</span>款原料
            </span>
          </span>
          {group.intro && <p {...stylex.props(styles.groupIntro)}>{group.intro}</p>}
        </th>
      </tr>
      {group.rows.map((item) => (
        <tr key={item.id} {...stylex.props(styles.row)}>
          <th scope="row" {...stylex.props(styles.cell, styles.nameCell)}>
            <span {...stylex.props(styles.primary)}>{item.primary}</span>
            {item.secondary && <span {...stylex.props(styles.secondary)}>{item.secondary}</span>}
          </th>
          <td {...stylex.props(styles.cell, styles.smallCell, styles.attributeCell)}>
            {attributeOf(item, mode)}
          </td>
          <td {...stylex.props(styles.cell, styles.smallCell, styles.inciCell)}>
            <Inci text={item.inci} />
          </td>
          <td {...stylex.props(styles.cell, styles.lastCell, styles.featuresCell)}>
            {item.features}
          </td>
        </tr>
      ))}
    </m.tbody>
  );
}

export function Catalog() {
  const reduce = useReducedMotion();
  const titleId = useId();
  const tableId = useId();
  const noteId = useId();
  const [mode, setMode] = useState<GroupMode>("region");
  const activeMode = MODES.find((option) => option.id === mode) ?? MODES[0];
  const groups = GROUPS_BY_MODE[mode];

  const tableVariants: Variants = {
    hidden: { opacity: 1 },
    shown: { opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.035 } },
    gone: { opacity: 0, transition: { duration: reduce ? 0 : 0.14, ease: "easeOut" } },
  };
  const groupVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 8 },
    shown: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.24, ease: EASE } },
  };

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            产品目录
          </h2>
          <div {...stylex.props(styles.controls)}>
            <div
              role="group"
              aria-label="分组方式"
              aria-describedby={noteId}
              {...stylex.props(styles.segmented)}
            >
              <span
                aria-hidden="true"
                {...stylex.props(styles.thumb, mode === "form" && styles.thumbEnd)}
              />
              {MODES.map((option) => {
                const selected = option.id === mode;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    aria-controls={tableId}
                    onClick={() => setMode(option.id)}
                    {...stylex.props(styles.segment, selected && styles.segmentOn)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <p id={noteId} {...stylex.props(styles.note)}>
              形态依据原料描述整理
            </p>
          </div>
        </header>
        <AnimatePresence mode="wait" initial={false}>
          <m.table
            key={mode}
            id={tableId}
            variants={tableVariants}
            initial="hidden"
            animate="shown"
            exit="gone"
            {...stylex.props(styles.table)}
          >
            <caption {...stylex.props(styles.srOnly)}>产品目录，{activeMode.label}分组</caption>
            <colgroup {...stylex.props(styles.colgroup)}>
              <col {...stylex.props(styles.colName)} />
              <col {...stylex.props(styles.colAttribute)} />
              <col {...stylex.props(styles.colInci)} />
              <col {...stylex.props(styles.colFeatures)} />
            </colgroup>
            <thead {...stylex.props(styles.thead)}>
              <tr>
                <th scope="col" {...stylex.props(styles.headCell)}>
                  名称
                </th>
                <th scope="col" {...stylex.props(styles.headCell)}>
                  {activeMode.attributeHeading}
                </th>
                <th scope="col" {...stylex.props(styles.headCell)}>
                  INCI 名称
                </th>
                <th scope="col" {...stylex.props(styles.headCell, styles.lastCell)}>
                  特性&应用
                </th>
              </tr>
            </thead>
            {groups.map((group, index) => (
              <GroupBody
                key={group.key}
                group={group}
                mode={mode}
                first={index === 0}
                variants={groupVariants}
              />
            ))}
          </m.table>
        </AnimatePresence>
      </div>
    </section>
  );
}
