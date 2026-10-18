import { m } from "@/compat/motion";
import { Collapse } from "../../../shared/collapse";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "@fenchem-lp/ui/components/lucide";

import { createSignal, createUniqueId, For, onSettled } from "solid-js";
import type { JSX } from "@solidjs/web";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS, type CatalogGroup } from "../../products-data";
import { FLAT_ITEMS, padIndex, type FlatItem } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const LEAF = "#edf3e5";
const LEAF_LIGHT = "#f6f9f1";
const LEAF_RULE = "#d2ddc4";
const FOCUS = colors.brandBlue700;
const BODY_FONT =
  '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Source Han Sans SC", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = "@media (min-width: 1280px)";
const MD = "@media (min-width: 768px)";
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const HEAD_ROW_HEIGHT = 41;
const GROUP_TOP = HEADER_HEIGHT + HEAD_ROW_HEIGHT;
const INDEX_WIDTH = { default: 32, [MD]: 40 } as const;
const TABLE_LAYOUT_QUERY = "(min-width: 768px)";

const LATIN_IN_INCI = /（[^）]*）/g;

interface IndexedItem {
  item: FlatItem;
  index: number;
}

const ROWS_BY_GROUP: IndexedItem[][] = CATALOG_GROUPS.map((group) =>
  FLAT_ITEMS.flatMap((item, index) => (item.group.id === group.id ? [{ item, index }] : [])),
);

const styles = stylex.create({
  section: {
    backgroundColor: LEAF,
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
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: 24,
    rowGap: 8,
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
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  numeral: {
    fontFamily: NUMERAL_FONT,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
  },

  table: {
    display: { default: "block", [MD]: "table" },
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: INK,
  },
  colgroup: {
    display: { default: "none", [MD]: "table-column-group" },
  },
  colName: { width: "25.5%" },
  colInci: { width: "34%" },
  colFeatures: { width: "40.5%" },

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
  thead: {
    display: { default: "block", [MD]: "table-header-group" },
    position: { default: "absolute", [MD]: "static" },
    width: { default: 1, [MD]: "auto" },
    height: { default: 1, [MD]: "auto" },
    overflow: { default: "hidden", [MD]: "visible" },
    clipPath: { default: "inset(50%)", [MD]: "none" },
    whiteSpace: { default: "nowrap", [MD]: "normal" },
  },
  headCell: {
    position: "sticky",
    top: HEADER_HEIGHT,
    zIndex: 2,
    boxSizing: "border-box",
    height: HEAD_ROW_HEIGHT,
    paddingBlock: 12,
    paddingInlineStart: 0,
    paddingInlineEnd: 24,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
    backgroundColor: LEAF,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    textAlign: "start",
    verticalAlign: "bottom",
    color: MUTED,
  },
  headCellName: {
    paddingInlineStart: INDEX_WIDTH,
  },
  headCellLast: {
    paddingInlineEnd: 0,
  },

  group: {
    display: { default: "block", [MD]: "table-row-group" },
  },
  groupRow: {
    display: { default: "block", [MD]: "table-row" },
    position: { default: "sticky", [MD]: "static" },
    top: HEADER_HEIGHT,
    zIndex: 1,
    backgroundColor: LEAF,
    borderTopWidth: { default: 1, [MD]: 0 },
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  groupCell: {
    display: { default: "block", [MD]: "table-cell" },
    position: { default: "static", [MD]: "sticky" },
    top: GROUP_TOP,
    zIndex: 1,
    padding: 0,
    borderTopWidth: { default: 0, [MD]: 1 },
    borderTopStyle: "solid",
    borderTopColor: INK,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: LEAF_RULE,
    backgroundColor: LEAF,
    fontWeight: 400,
    textAlign: "start",
  },
  groupBar: {
    display: "flex",
    alignItems: "center",
    columnGap: 12,
    height: 48,
  },
  groupLabel: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: INK,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    minWidth: 0,
  },
  groupCount: {
    flexShrink: 0,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  introToggle: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    columnGap: 6,
    height: 40,
    marginInlineStart: "auto",
    marginInlineEnd: -8,
    paddingInline: 8,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: { default: BODY_TEXT, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -2,
  },
  introToggleOpen: {
    color: { default: INK, ":hover": FOCUS },
  },
  chevron: {
    flexShrink: 0,
    transitionProperty: "transform",
    transitionDuration: "200ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },

  introRow: {
    display: { default: "block", [MD]: "table-row" },
  },
  introCell: {
    display: { default: "block", [MD]: "table-cell" },
    padding: 0,
  },
  introClip: {
    overflow: "hidden",
  },
  introInner: {
    paddingBlock: 20,
    paddingInlineStart: INDEX_WIDTH,
    paddingInlineEnd: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: LEAF_RULE,
    backgroundColor: LEAF_LIGHT,
  },
  introText: {
    margin: 0,
    maxWidth: "36em",
    fontSize: 15,
    lineHeight: "26px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  itemRow: {
    display: { default: "grid", [MD]: "table-row" },
    gridTemplateColumns: { default: "32px minmax(0, 1fr)", [MD]: "none" },
    paddingBlock: { default: 16, [MD]: 0 },
    borderBottomWidth: { default: 1, [MD]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: LEAF_RULE,
  },
  itemRowLast: {
    borderBottomWidth: 0,
  },
  cell: {
    display: { default: "block", [MD]: "table-cell" },
    paddingBlock: { default: 0, [MD]: 16 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [MD]: 24 },
    borderBottomWidth: { default: 0, [MD]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: LEAF_RULE,
    fontWeight: 400,
    textAlign: "start",
    verticalAlign: "top",
  },
  cellLastRow: {
    borderBottomWidth: 0,
  },
  nameCell: {
    gridColumn: "1 / -1",
  },
  nameWrap: {
    display: "flex",
    alignItems: "baseline",
  },
  index: {
    flexShrink: 0,
    width: INDEX_WIDTH,
    fontSize: 12,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: MUTED,
  },
  names: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  primary: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
  },
  secondary: {
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED,
  },
  inciCell: {
    gridColumn: "2",
    order: 3,
    marginTop: { default: 6, [MD]: 0 },
    fontSize: 13,
    lineHeight: { default: "22px", [MD]: "24px" },
    color: { default: MUTED, [MD]: BODY_TEXT },
  },
  inciLabel: {
    display: { default: "inline", [MD]: "none" },
    marginInlineEnd: 8,
    fontSize: 11,
    letterSpacing: "0.08em",
    color: MUTED,
  },
  featuresCell: {
    gridColumn: "2",
    order: 2,
    marginTop: { default: 6, [MD]: 0 },
    paddingInlineEnd: 0,
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  keepTogether: {
    whiteSpace: "nowrap",
  },
});

function Inci(props: { text: string }) {
  return <>{inciParts(props.text)}</>;
}

function inciParts(text: string) {
  const parts: JSX.Element[] = [];
  let last = 0;
  for (const match of text.matchAll(LATIN_IN_INCI)) {
    parts.push(text.slice(last, match.index));
    parts.push(<span {...stylex.attrs(styles.keepTogether)}>{match[0]}</span>);
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return parts;
}

function ItemRow(props: IndexedItem & { last: boolean }) {
  const item = props.item;
  return (
    <m.tr
      layout="position"
      transition={{ duration: 0.26, ease: EASE }}
      {...stylex.attrs(styles.itemRow, props.last && styles.itemRowLast)}
    >
      <th
        scope="row"
        {...stylex.attrs(styles.cell, styles.nameCell, props.last && styles.cellLastRow)}
      >
        <span {...stylex.attrs(styles.nameWrap)}>
          <span {...stylex.attrs(styles.index, styles.numeral)}>{padIndex(props.index)}</span>
          <span {...stylex.attrs(styles.names)}>
            <span {...stylex.attrs(styles.primary)}>{item.primary}</span>
            {item.secondary && <span {...stylex.attrs(styles.secondary)}>{item.secondary}</span>}
          </span>
        </span>
      </th>
      <td {...stylex.attrs(styles.cell, styles.inciCell, props.last && styles.cellLastRow)}>
        <span {...stylex.attrs(styles.inciLabel, styles.numeral)}>INCI</span>
        <Inci text={item.inci} />
      </td>
      <td {...stylex.attrs(styles.cell, styles.featuresCell, props.last && styles.cellLastRow)}>
        {item.features}
      </td>
    </m.tr>
  );
}

function RegionGroup(props: { group: CatalogGroup; rows: IndexedItem[] }) {
  const group = props.group;
  const reduce = useReducedMotion();
  const introId = createUniqueId();
  const [introOpen, setIntroOpen] = createSignal(false);
  let body: HTMLElement | undefined;
  let head: HTMLTableCellElement | undefined;

  const toggleIntro = () => {
    if (!introOpen() && body && head) {
      const offset = body.getBoundingClientRect().top - head.getBoundingClientRect().top;
      if (offset < -1) window.scrollBy({ top: offset, behavior: reduce() ? "auto" : "smooth" });
    }
    setIntroOpen((open) => !open);
  };

  return (
    <m.tbody
      layout="position"
      transition={{ duration: 0.26, ease: EASE }}
      ref={(node: HTMLElement) => {
        body = node;
      }}
      {...stylex.attrs(styles.group)}
    >
      <m.tr
        layout="position"
        transition={{ duration: 0.26, ease: EASE }}
        {...stylex.attrs(styles.groupRow)}
      >
        <th ref={head} scope="rowgroup" colspan={3} {...stylex.attrs(styles.groupCell)}>
          <div {...stylex.attrs(styles.groupBar)}>
            <span {...stylex.attrs(styles.groupLabel)}>{group.label}</span>
            <span {...stylex.attrs(styles.groupCount)}>
              <span {...stylex.attrs(styles.numeral)}>{props.rows.length}</span> 款
            </span>
            {group.intro && (
              <button
                type="button"
                aria-expanded={introOpen() ? "true" : "false"}
                aria-controls={introId}
                onClick={toggleIntro}
                {...stylex.attrs(styles.introToggle, introOpen() && styles.introToggleOpen)}
              >
                产地介绍
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  absoluteStrokeWidth
                  aria-hidden="true"
                  {...stylex.attrs(styles.chevron, introOpen() && styles.chevronOpen)}
                />
              </button>
            )}
          </div>
        </th>
      </m.tr>
      {group.intro && (
        <m.tr
          layout="position"
          transition={{ duration: 0.26, ease: EASE }}
          {...stylex.attrs(styles.introRow)}
        >
          <td id={introId} colspan={3} {...stylex.attrs(styles.introCell)}>
            <Collapse
              open={introOpen()}
              transition={{ duration: reduce() ? 0 : 0.26, ease: EASE }}
              {...stylex.attrs(styles.introClip)}
            >
              <div {...stylex.attrs(styles.introInner)}>
                <p {...stylex.attrs(styles.introText)}>{group.intro}</p>
              </div>
            </Collapse>
          </td>
        </m.tr>
      )}
      <For each={props.rows}>
        {(row, position) => <ItemRow {...row} last={position() === props.rows.length - 1} />}
      </For>
    </m.tbody>
  );
}

function usePushOffRegionHeads(table: () => HTMLTableElement | undefined) {
  onSettled(() => {
    const element = table();
    if (!element) return;
    const tableLayout = window.matchMedia(TABLE_LAYOUT_QUERY);
    let frame = 0;

    const update = () => {
      frame = 0;
      const bodies = Array.from(element.tBodies);
      bodies.forEach((body, index) => {
        const head = body.rows[0]?.cells[0];
        if (!head) return;
        const next = bodies[index + 1];
        const overlap =
          tableLayout.matches && next
            ? next.getBoundingClientRect().top - (GROUP_TOP + head.offsetHeight)
            : 0;
        head.style.transform = overlap < 0 ? `translateY(${Math.round(overlap)}px)` : "";
      });
    };
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    tableLayout.addEventListener("change", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      tableLayout.removeEventListener("change", schedule);
    };
  });
}

export function Catalog() {
  const titleId = createUniqueId();
  let table: HTMLTableElement | undefined;
  usePushOffRegionHeads(() => table);

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.shell)}>
        <header {...stylex.attrs(styles.head)}>
          <h2 id={titleId} {...stylex.attrs(styles.title)}>
            产品目录
          </h2>
          <p {...stylex.attrs(styles.meta)}>
            <span {...stylex.attrs(styles.numeral)}>{CATALOG_GROUPS.length}</span> 类 ·{" "}
            <span {...stylex.attrs(styles.numeral)}>{FLAT_ITEMS.length}</span> 款原料
          </p>
        </header>
        <table ref={table} aria-labelledby={titleId} {...stylex.attrs(styles.table)}>
          <colgroup {...stylex.attrs(styles.colgroup)}>
            <col {...stylex.attrs(styles.colName)} />
            <col {...stylex.attrs(styles.colInci)} />
            <col {...stylex.attrs(styles.colFeatures)} />
          </colgroup>
          <thead {...stylex.attrs(styles.thead)}>
            <m.tr layout="position" transition={{ duration: 0.26, ease: EASE }}>
              <th scope="col" {...stylex.attrs(styles.headCell, styles.headCellName)}>
                <span aria-hidden="true">名称</span>
                <span {...stylex.attrs(styles.srOnly)}>Name</span>
              </th>
              <th scope="col" {...stylex.attrs(styles.headCell)}>
                <span aria-hidden="true">INCI 名称</span>
                <span {...stylex.attrs(styles.srOnly)}>INCI name</span>
              </th>
              <th scope="col" {...stylex.attrs(styles.headCell, styles.headCellLast)}>
                <span aria-hidden="true">特性&应用</span>
                <span {...stylex.attrs(styles.srOnly)}>Features & applications</span>
              </th>
            </m.tr>
          </thead>
          {CATALOG_GROUPS.map((group, groupIndex) => (
            <RegionGroup group={group} rows={ROWS_BY_GROUP[groupIndex] ?? []} />
          ))}
        </table>
      </div>
    </section>
  );
}
