import { Collapse } from "../../../shared/collapse";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown, ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { m } from "motion/react";
import { useId, useState, type MouseEvent, type ReactNode } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS } from "../../products-data";
import { FLAT_ITEMS, FORM_LABEL, REGION_META, type FlatItem } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED_LABEL = "#6b6b70";
const BAND = "#fcf3f0";
const PANEL = "#fefaf8";
const RULE = "#eedcd4";
const GROUP_RULE = "#d9bfb4";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const SERIF_FONT = '"Instrument Serif", "Times New Roman", serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const NAME_INDENT = 28;
const COLUMN_COUNT = 4;

const INCI_LATIN = /（[^）]*）/g;

const GROUPED = CATALOG_GROUPS.map((group, groupIndex) => ({
  group,
  items: FLAT_ITEMS.filter((item) => item.groupIndex === groupIndex),
}));

const ALL_IDS = FLAT_ITEMS.map((item) => item.id);

const originOf = (item: FlatItem) => {
  const meta = REGION_META[item.group.id];
  return meta && meta.latitude !== null ? meta.short : null;
};

const formOf = (item: FlatItem) =>
  item.traits.form === "unspecified" ? null : FORM_LABEL[item.traits.form];

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  borderWidth: 0,
} as const;

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: BAND,
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
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    columnGap: 24,
    rowGap: 16,
    marginBottom: { default: 24, [DESKTOP]: 40 },
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
    marginTop: 8,
    fontSize: 14,
    lineHeight: "22px",
    color: MUTED_LABEL,
  },
  numeral: {
    fontFamily: NUMERAL_FONT,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: INK,
  },
  expandAll: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    minHeight: 40,
    paddingInline: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: { default: INK, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  table: {
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: 0,
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
  },
  colName: { width: { default: "68%", [MD]: "32%" } },
  colLatin: { width: { default: 0, [MD]: "28%" } },
  colOrigin: { width: { default: "32%", [MD]: "18%" } },
  colForm: { width: { default: 0, [MD]: "22%" } },
  headCell: {
    position: "sticky",
    top: HEADER_HEIGHT,
    zIndex: 1,
    paddingBlock: 12,
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 12, [MD]: 24 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: INK,
    backgroundColor: BAND,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    textAlign: "start",
    color: MUTED_LABEL,
  },
  headName: {
    paddingInlineStart: NAME_INDENT,
  },
  foldCell: {
    paddingInlineEnd: { default: 0, [MD]: 24 },
  },
  foldContent: {
    position: { default: visuallyHidden.position, [MD]: "static" },
    width: { default: visuallyHidden.width, [MD]: "auto" },
    height: { default: visuallyHidden.height, [MD]: "auto" },
    margin: { default: visuallyHidden.margin, [MD]: 0 },
    overflow: { default: visuallyHidden.overflow, [MD]: "visible" },
    clipPath: { default: visuallyHidden.clipPath, [MD]: "none" },
    whiteSpace: { default: visuallyHidden.whiteSpace, [MD]: "normal" },
  },
  srOnly: visuallyHidden,
  groupCell: {
    paddingTop: { default: 40, [DESKTOP]: 48 },
    paddingBottom: 12,
    paddingInline: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: GROUP_RULE,
    fontWeight: 400,
    textAlign: "start",
  },
  groupCellFirst: {
    paddingTop: { default: 24, [DESKTOP]: 32 },
  },
  groupLine: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 12,
    rowGap: 2,
  },
  groupLabel: {
    fontSize: { default: 16, [DESKTOP]: 17 },
    fontWeight: 500,
    lineHeight: "26px",
    letterSpacing: "0.04em",
    color: INK,
  },
  groupCount: {
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED_LABEL,
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
  itemRow: {
    cursor: "pointer",
  },
  cell: {
    paddingBlock: 12,
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 12, [MD]: 24 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
    verticalAlign: "top",
    textAlign: "start",
    fontWeight: 400,
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
  nameCell: {
    paddingBlock: 0,
  },
  disclosure: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    width: "100%",
    minHeight: 48,
    paddingBlock: 12,
    paddingInline: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: INK,
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  chevron: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 16,
    height: 24,
    color: {
      default: MUTED_LABEL,
      [stylex.when.ancestor(":hover")]: colors.brandBlue700,
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  names: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  primary: {
    fontSize: { default: 15, [DESKTOP]: 16 },
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: {
      default: INK,
      [stylex.when.ancestor(":hover")]: colors.brandBlue700,
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  secondary: {
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED_LABEL,
  },
  latin: {
    display: "block",
    fontFamily: SERIF_FONT,
    fontStyle: "italic",
    fontSize: 17,
    lineHeight: "24px",
    letterSpacing: "0.005em",
    color: INK,
  },
  latinMore: {
    display: "block",
    fontSize: 12,
    lineHeight: "20px",
    color: MUTED_LABEL,
  },
  empty: {
    color: MUTED_LABEL,
  },
  detailCell: {
    padding: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
    backgroundColor: PANEL,
  },
  detailClip: {
    overflow: "hidden",
  },
  detail: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [LG]: "minmax(0, 3fr) minmax(0, 2fr)",
    },
    rowGap: 20,
    margin: 0,
    paddingTop: 20,
    paddingBottom: 28,
  },
  field: {
    minWidth: 0,
    margin: 0,
    paddingInlineStart: NAME_INDENT,
    paddingInlineEnd: { default: 12, [MD]: 24 },
  },
  fieldMeasure: {
    maxWidth: { default: 600, [LG]: "none" },
  },
  fieldInci: {
    paddingInlineEnd: { default: 12, [MD]: 24, [LG]: 48 },
  },
  fieldFeatures: {
    paddingInlineStart: { default: NAME_INDENT, [LG]: 0 },
  },
  phonePair: {
    display: { default: "grid", [MD]: "none" },
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    columnGap: 16,
    paddingInlineStart: NAME_INDENT,
    paddingInlineEnd: 12,
  },
  phonePairField: {
    minWidth: 0,
  },
  fieldLabel: {
    margin: 0,
    marginBottom: 4,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    color: MUTED_LABEL,
  },
  fieldValue: {
    margin: 0,
  },
  inci: {
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    overflowWrap: "anywhere",
  },
  features: {
    fontSize: 15,
    lineHeight: "26px",
    color: INK,
    textWrap: "pretty",
  },
  keepTogether: {
    whiteSpace: "nowrap",
  },
  note: {
    margin: 0,
    marginTop: 20,
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: MUTED_LABEL,
  },
});

function Empty() {
  return (
    <>
      <span aria-hidden="true" {...stylex.props(styles.empty)}>
        —
      </span>
      <span {...stylex.props(styles.srOnly)}>无</span>
    </>
  );
}

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

function LatinNames({ names, complete }: { names: string[]; complete: boolean }) {
  if (names.length === 0) return <Empty />;
  const condensed = !complete && names.length > 2;
  const shown = condensed ? names.slice(0, 1) : names;
  return (
    <>
      {shown.map((name) => (
        <span key={name} lang="la" {...stylex.props(styles.latin)}>
          {name}
        </span>
      ))}
      {condensed && <span {...stylex.props(styles.latinMore)}>等 {names.length} 种</span>}
    </>
  );
}

function ItemRows({
  item,
  open,
  onToggle,
}: {
  item: FlatItem;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const detailId = useId();
  const origin = originOf(item);
  const form = formOf(item);

  const toggleFromRow = (event: MouseEvent<HTMLTableRowElement>) => {
    if (event.target instanceof Element && event.target.closest("button")) return;
    if (window.getSelection()?.toString()) return;
    onToggle();
  };

  return (
    <>
      <m.tr
        layout="position"
        transition={{ duration: 0.26, ease: EASE }}
        onClick={toggleFromRow}
        {...stylex.props(styles.itemRow, stylex.defaultMarker())}
      >
        <th scope="row" {...stylex.props(styles.cell, styles.nameCell)}>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={open ? detailId : undefined}
            onClick={onToggle}
            {...stylex.props(styles.disclosure)}
          >
            <m.span
              aria-hidden="true"
              initial={false}
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
              {...stylex.props(styles.chevron)}
            >
              <ChevronDown size={16} strokeWidth={1.5} absoluteStrokeWidth />
            </m.span>
            <span {...stylex.props(styles.names)}>
              <span {...stylex.props(styles.primary)}>{item.primary}</span>
              {item.secondary && <span {...stylex.props(styles.secondary)}>{item.secondary}</span>}
            </span>
          </button>
        </th>
        <td {...stylex.props(styles.cell, styles.foldCell)}>
          <span {...stylex.props(styles.foldContent)}>
            <LatinNames names={item.latin} complete={false} />
          </span>
        </td>
        <td {...stylex.props(styles.cell)}>{origin ?? <Empty />}</td>
        <td {...stylex.props(styles.cell, styles.foldCell)}>
          <span {...stylex.props(styles.foldContent)}>{form ?? <Empty />}</span>
        </td>
      </m.tr>
      <m.tr
        layout="position"
        transition={{ duration: 0.26, ease: EASE }}
        key="detail"
        id={detailId}
        aria-hidden={!open}
        inert={!open}
      >
        <td
          colSpan={COLUMN_COUNT}
          {...stylex.props(styles.detailCell)}
          style={{ borderBottomWidth: open ? 1 : 0 }}
        >
          <Collapse
            open={open}

            transition={{ duration: reduce ? 0 : 0.26, ease: EASE }}
            {...stylex.props(styles.detailClip)}
          >
            <dl {...stylex.props(styles.detail)}>
              <div {...stylex.props(styles.phonePair)}>
                <div {...stylex.props(styles.phonePairField)}>
                  <dt {...stylex.props(styles.fieldLabel)}>学名</dt>
                  <dd {...stylex.props(styles.fieldValue)}>
                    <LatinNames names={item.latin} complete />
                  </dd>
                </div>
                <div {...stylex.props(styles.phonePairField)}>
                  <dt {...stylex.props(styles.fieldLabel)}>形态</dt>
                  <dd {...stylex.props(styles.fieldValue)}>{form ?? <Empty />}</dd>
                </div>
              </div>
              <div {...stylex.props(styles.field, styles.fieldMeasure, styles.fieldInci)}>
                <dt {...stylex.props(styles.fieldLabel)}>INCI 名称</dt>
                <dd {...stylex.props(styles.fieldValue, styles.inci)}>
                  <Inci text={item.inci} />
                </dd>
              </div>
              <div {...stylex.props(styles.field, styles.fieldMeasure, styles.fieldFeatures)}>
                <dt {...stylex.props(styles.fieldLabel)}>特性&应用</dt>
                <dd {...stylex.props(styles.fieldValue, styles.features)}>{item.features}</dd>
              </div>
            </dl>
          </Collapse>
        </td>
      </m.tr>
    </>
  );
}

export function Catalog() {
  const titleId = useId();
  const tableId = useId();
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set(ALL_IDS.slice(0, 1)));
  const allOpen = openIds.size === ALL_IDS.length;

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setOpenIds(allOpen ? new Set() : new Set(ALL_IDS));
  };

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <div>
            <h2 id={titleId} {...stylex.props(styles.title)}>
              产品目录
            </h2>
            <p {...stylex.props(styles.meta)}>
              <span {...stylex.props(styles.numeral)}>{CATALOG_GROUPS.length}</span> 个分组 ·{" "}
              <span {...stylex.props(styles.numeral)}>{ALL_IDS.length}</span> 款原料
            </p>
          </div>
          <button
            type="button"
            aria-controls={tableId}
            onClick={toggleAll}
            {...stylex.props(styles.expandAll)}
          >
            {allOpen ? (
              <ChevronsDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            ) : (
              <ChevronsUpDown size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            )}
            {allOpen ? "全部收起" : "全部展开"}
          </button>
        </header>
        <table id={tableId} aria-labelledby={titleId} {...stylex.props(styles.table)}>
          <colgroup>
            <col {...stylex.props(styles.colName)} />
            <col {...stylex.props(styles.colLatin)} />
            <col {...stylex.props(styles.colOrigin)} />
            <col {...stylex.props(styles.colForm)} />
          </colgroup>
          <thead>
            <m.tr layout="position" transition={{ duration: 0.26, ease: EASE }}>
              <th scope="col" {...stylex.props(styles.headCell, styles.headName)}>
                名称
              </th>
              <th scope="col" {...stylex.props(styles.headCell, styles.foldCell)}>
                <span {...stylex.props(styles.foldContent)}>学名</span>
              </th>
              <th scope="col" {...stylex.props(styles.headCell)}>
                产地
              </th>
              <th scope="col" {...stylex.props(styles.headCell, styles.foldCell)}>
                <span {...stylex.props(styles.foldContent)}>形态</span>
              </th>
            </m.tr>
          </thead>
          {GROUPED.map(({ group, items }, groupIndex) => (
            <m.tbody layout="position" transition={{ duration: 0.26, ease: EASE }} key={group.id}>
              <m.tr layout="position" transition={{ duration: 0.26, ease: EASE }}>
                <th
                  scope="rowgroup"
                  colSpan={COLUMN_COUNT}
                  {...stylex.props(styles.groupCell, groupIndex === 0 && styles.groupCellFirst)}
                >
                  <span {...stylex.props(styles.groupLine)}>
                    <span {...stylex.props(styles.groupLabel)}>{group.label}</span>
                    <span {...stylex.props(styles.groupCount)}>
                      <span {...stylex.props(styles.numeral)}>{items.length}</span> 款
                    </span>
                  </span>
                  {group.intro && <p {...stylex.props(styles.groupIntro)}>{group.intro}</p>}
                </th>
              </m.tr>
              {items.map((item) => (
                <ItemRows
                  key={item.id}
                  item={item}
                  open={openIds.has(item.id)}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </m.tbody>
          ))}
        </table>
        <p {...stylex.props(styles.note)}>产地按目录分组标注；形态据原料描述整理。</p>
      </div>
    </section>
  );
}
