import { Collapse } from "../../../shared/collapse";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown, ChevronsDownUp, ChevronsUpDown } from "@fenchem-lp/ui/components/lucide";
import { m } from "@/compat/motion";
import type { JSX } from "@solidjs/web";
import { createSignal, createUniqueId, For, untrack } from "solid-js";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS } from "../../products-data";
import { FLAT_ITEMS, FORM_LABEL, REGION_META, type Form, type FlatItem } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED_LABEL = "#6b6b70";
const BAND = "#fcf3f0";
const PANEL = "#fefaf8";
const RULE = "#eedcd4";
const GROUP_RULE = "#d9bfb4";
const BODY_FONT =
  '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const SERIF_FONT =
  '"Instrument Serif", "Times New Roman", "Source Han Sans SC", "Noto Sans SC", serif';
const NUMERAL_FONT = '"Inter Tight", "Source Han Sans SC", "Noto Sans SC", sans-serif';

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

const FORM_ENGLISH: Record<Form, string> = {
  liquid: "Liquid oil",
  solid: "Solid butter",
  wax: "Wax",
  extract: "Extract / active",
  water: "Floral water",
  unspecified: "Not specified",
};

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
      <span aria-hidden="true" {...stylex.attrs(styles.empty)}>
        —
      </span>
      <span {...stylex.attrs(styles.srOnly)}>None</span>
    </>
  );
}

function Inci(props: { text: string }) {
  const text = untrack(() => props.text);
  const parts: JSX.Element[] = [];
  let last = 0;
  for (const match of text.matchAll(INCI_LATIN)) {
    parts.push(text.slice(last, match.index));
    parts.push(<span {...stylex.attrs(styles.keepTogether)}>{match[0]}</span>);
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function LatinNames(props: { names: string[]; complete: boolean }) {
  const names = untrack(() => props.names);
  if (names.length === 0) return <Empty />;
  const condensed = !untrack(() => props.complete) && names.length > 2;
  const shown = condensed ? names.slice(0, 1) : names;
  return (
    <>
      {shown.map((name) => (
        <span lang="la" {...stylex.attrs(styles.latin)}>
          {name}
        </span>
      ))}
      {condensed && (
        <>
          <span aria-hidden="true" {...stylex.attrs(styles.latinMore)}>
            等 {names.length} 种
          </span>
          <span {...stylex.attrs(styles.srOnly)}>and others, {names.length} in total</span>
        </>
      )}
    </>
  );
}

function ItemRows(props: { item: FlatItem; open: boolean; onToggle: () => void }) {
  const reduce = useReducedMotion();
  const detailId = createUniqueId();
  const item = props.item;
  const origin = originOf(item);
  const form = formOf(item);

  const toggleFromRow = (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest("button")) return;
    if (window.getSelection()?.toString()) return;
    props.onToggle();
  };

  return (
    <>
      <m.tr
        layout="position"
        transition={{ duration: 0.26, ease: EASE }}
        onClick={toggleFromRow}
        {...stylex.attrs(styles.itemRow, stylex.defaultMarker())}
      >
        <th scope="row" {...stylex.attrs(styles.cell, styles.nameCell)}>
          <button
            type="button"
            aria-expanded={props.open ? "true" : "false"}
            aria-controls={props.open ? detailId : undefined}
            onClick={() => props.onToggle()}
            {...stylex.attrs(styles.disclosure)}
          >
            <m.span
              aria-hidden="true"
              initial={false}
              animate={{ rotate: props.open ? 180 : 0 }}
              transition={{ duration: reduce() ? 0 : 0.22, ease: EASE }}
              {...stylex.attrs(styles.chevron)}
            >
              <ChevronDown size={16} strokeWidth={1.5} absoluteStrokeWidth />
            </m.span>
            <span {...stylex.attrs(styles.names)}>
              <span {...stylex.attrs(styles.primary)}>{item.primary}</span>
              {item.secondary && <span {...stylex.attrs(styles.secondary)}>{item.secondary}</span>}
            </span>
          </button>
        </th>
        <td {...stylex.attrs(styles.cell, styles.foldCell)}>
          <span {...stylex.attrs(styles.foldContent)}>
            <LatinNames names={item.latin} complete={false} />
          </span>
        </td>
        <td {...stylex.attrs(styles.cell)}>{origin ?? <Empty />}</td>
        <td {...stylex.attrs(styles.cell, styles.foldCell)}>
          <span {...stylex.attrs(styles.foldContent)}>
            {form ? (
              <>
                <span aria-hidden="true">{form}</span>
                <span {...stylex.attrs(styles.srOnly)}>{FORM_ENGLISH[item.traits.form]}</span>
              </>
            ) : (
              <Empty />
            )}
          </span>
        </td>
      </m.tr>
      <m.tr
        layout="position"
        transition={{ duration: 0.26, ease: EASE }}
        id={detailId}
        aria-hidden={props.open ? "false" : "true"}
        inert={!props.open}
      >
        <td
          colspan={COLUMN_COUNT}
          {...stylex.attrs(styles.detailCell)}
          style={{ "border-bottom-width": props.open ? "1px" : "0" }}
        >
          <Collapse
            open={props.open}
            transition={{ duration: reduce() ? 0 : 0.26, ease: EASE }}
            {...stylex.attrs(styles.detailClip)}
          >
            <dl {...stylex.attrs(styles.detail)}>
              <div {...stylex.attrs(styles.phonePair)}>
                <div {...stylex.attrs(styles.phonePairField)}>
                  <dt {...stylex.attrs(styles.fieldLabel)}>学名</dt>
                  <dd {...stylex.attrs(styles.fieldValue)}>
                    <LatinNames names={item.latin} complete />
                  </dd>
                </div>
                <div {...stylex.attrs(styles.phonePairField)}>
                  <dt {...stylex.attrs(styles.fieldLabel)}>形态</dt>
                  <dd {...stylex.attrs(styles.fieldValue)}>{form ?? <Empty />}</dd>
                </div>
              </div>
              <div {...stylex.attrs(styles.field, styles.fieldMeasure, styles.fieldInci)}>
                <dt {...stylex.attrs(styles.fieldLabel)}>INCI 名称</dt>
                <dd {...stylex.attrs(styles.fieldValue, styles.inci)}>
                  <Inci text={item.inci} />
                </dd>
              </div>
              <div {...stylex.attrs(styles.field, styles.fieldMeasure, styles.fieldFeatures)}>
                <dt {...stylex.attrs(styles.fieldLabel)}>特性&应用</dt>
                <dd {...stylex.attrs(styles.fieldValue, styles.features)}>{item.features}</dd>
              </div>
            </dl>
          </Collapse>
        </td>
      </m.tr>
    </>
  );
}

export function Catalog() {
  const titleId = createUniqueId();
  const tableId = createUniqueId();
  const [openIds, setOpenIds] = createSignal<ReadonlySet<string>>(new Set(ALL_IDS.slice(0, 1)));
  const allOpen = () => openIds().size === ALL_IDS.length;

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setOpenIds(allOpen() ? new Set<string>() : new Set(ALL_IDS));
  };

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.shell)}>
        <header {...stylex.attrs(styles.head)}>
          <div>
            <h2 id={titleId} {...stylex.attrs(styles.title)}>
              产品目录
            </h2>
            <p {...stylex.attrs(styles.meta)}>
              <span {...stylex.attrs(styles.numeral)}>{CATALOG_GROUPS.length}</span> 个分组 ·{" "}
              <span {...stylex.attrs(styles.numeral)}>{ALL_IDS.length}</span> 款原料
            </p>
          </div>
          <button
            type="button"
            aria-controls={tableId}
            onClick={toggleAll}
            {...stylex.attrs(styles.expandAll)}
          >
            {allOpen() ? (
              <ChevronsDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            ) : (
              <ChevronsUpDown size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            )}
            {allOpen() ? "全部收起" : "全部展开"}
          </button>
        </header>
        <table id={tableId} aria-labelledby={titleId} {...stylex.attrs(styles.table)}>
          <colgroup>
            <col {...stylex.attrs(styles.colName)} />
            <col {...stylex.attrs(styles.colLatin)} />
            <col {...stylex.attrs(styles.colOrigin)} />
            <col {...stylex.attrs(styles.colForm)} />
          </colgroup>
          <thead>
            <m.tr layout="position" transition={{ duration: 0.26, ease: EASE }}>
              <th scope="col" {...stylex.attrs(styles.headCell, styles.headName)}>
                名称
              </th>
              <th scope="col" {...stylex.attrs(styles.headCell, styles.foldCell)}>
                <span {...stylex.attrs(styles.foldContent)}>
                  <span aria-hidden="true">学名</span>
                  <span {...stylex.attrs(styles.srOnly)}>Botanical name</span>
                </span>
              </th>
              <th scope="col" {...stylex.attrs(styles.headCell)}>
                产地
              </th>
              <th scope="col" {...stylex.attrs(styles.headCell, styles.foldCell)}>
                <span {...stylex.attrs(styles.foldContent)}>
                  <span aria-hidden="true">形态</span>
                  <span {...stylex.attrs(styles.srOnly)}>Form</span>
                </span>
              </th>
            </m.tr>
          </thead>
          <For each={GROUPED}>
            {({ group, items }, groupIndex) => (
              <m.tbody layout="position" transition={{ duration: 0.26, ease: EASE }}>
                <m.tr layout="position" transition={{ duration: 0.26, ease: EASE }}>
                  <th
                    scope="rowgroup"
                    colspan={COLUMN_COUNT}
                    {...stylex.attrs(styles.groupCell, groupIndex() === 0 && styles.groupCellFirst)}
                  >
                    <span {...stylex.attrs(styles.groupLine)}>
                      <span {...stylex.attrs(styles.groupLabel)}>{group.label}</span>
                      <span {...stylex.attrs(styles.groupCount)}>
                        <span {...stylex.attrs(styles.numeral)}>{items.length}</span> 款
                      </span>
                    </span>
                    {group.intro && <p {...stylex.attrs(styles.groupIntro)}>{group.intro}</p>}
                  </th>
                </m.tr>
                <For each={items}>
                  {(item) => (
                    <ItemRows
                      item={item}
                      open={openIds().has(item.id)}
                      onToggle={() => toggle(item.id)}
                    />
                  )}
                </For>
              </m.tbody>
            )}
          </For>
        </table>
        <p {...stylex.attrs(styles.note)}>产地按目录分组标注；形态据原料描述整理。</p>
      </div>
    </section>
  );
}
