import * as stylex from "@stylexjs/stylex";
import { m } from "@/compat/motion";
import type { JSX } from "@solidjs/web";
import { createSignal, createUniqueId, flush, For, Show, untrack } from "solid-js";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS } from "../../products-data";
import { FLAT_ITEMS, FUNCTION_TAGS, REGION_META, type FlatItem } from "../shared/derived";
import { SegmentButton, SegmentTrack } from "./shared";
import { ui } from "./shared-values";
import { chrome, face, media, tone } from "./tokens.stylex";

type PivotId = "region" | "function";
type ColumnId = "name" | "region" | "inci" | "features" | "tags";

interface RowGroup {
  id: string;
  label: string;
  intro: string | null;
  items: FlatItem[];
}

interface Column {
  id: ColumnId;
  label: string;
  width: keyof typeof widths;
}

interface Pivot {
  id: PivotId;
  label: string;
  columns: Column[];
  groups: RowGroup[];
}

const REGION_GROUPS: RowGroup[] = CATALOG_GROUPS.map((group) => ({
  id: group.id,
  label: group.label,
  intro: group.intro ?? null,
  items: FLAT_ITEMS.filter((item) => item.group.id === group.id),
}));

const FUNCTION_GROUPS: RowGroup[] = FUNCTION_TAGS.map((tag) => ({
  id: tag,
  label: tag,
  intro: null,
  items: FLAT_ITEMS.filter((item) => item.traits.tags.includes(tag)),
})).filter((group) => group.items.length > 0);

const PIVOTS: Pivot[] = [
  {
    id: "region",
    label: "按产地",
    columns: [
      { id: "name", label: "名称", width: "w20" },
      { id: "inci", label: "INCI 名称", width: "w27" },
      { id: "features", label: "特性&应用", width: "w37" },
      { id: "tags", label: "功效", width: "w16" },
    ],
    groups: REGION_GROUPS,
  },
  {
    id: "function",
    label: "按功效",
    columns: [
      { id: "name", label: "名称", width: "w20" },
      { id: "region", label: "产地", width: "w11" },
      { id: "inci", label: "INCI 名称", width: "w27" },
      { id: "features", label: "特性&应用", width: "w42" },
    ],
    groups: FUNCTION_GROUPS,
  },
];

const NOTE = "功效分组依据原料描述整理，一款原料可出现在多个分组";
const INCI_LATIN = /（[^）]*）/g;

const widths = stylex.create({
  w11: { width: "11%" },
  w16: { width: "16%" },
  w20: { width: "20%" },
  w27: { width: "27%" },
  w37: { width: "37%" },
  w42: { width: "42%" },
});

const styles = stylex.create({
  ground: {
    backgroundColor: tone.catalogGround,
  },
  head: {
    display: "flex",
    flexDirection: { default: "column", [media.table]: "row" },
    alignItems: { default: "flex-start", [media.table]: "flex-end" },
    justifyContent: "space-between",
    gap: { default: 24, [media.table]: 32 },
    marginBottom: { default: 28, [media.desktop]: 40 },
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    alignItems: { default: "flex-start", [media.table]: "flex-end" },
    gap: 10,
  },
  note: {
    margin: 0,
    fontSize: 12,
    lineHeight: "18px",
    letterSpacing: "0.02em",
    color: tone.muted,
    textAlign: { default: "start", [media.table]: "end" },
  },
  panel: {
    isolation: "isolate",
  },
  table: {
    display: { default: "block", [media.table]: "table" },
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: 0,
    fontSize: 14,
    lineHeight: "24px",
  },
  colgroup: {
    display: { default: "none", [media.table]: "table-column-group" },
  },
  thead: {
    display: { default: "none", [media.table]: "table-header-group" },
  },
  headCell: {
    position: "sticky",
    top: chrome.header,
    zIndex: 2,
    height: 44,
    boxSizing: "border-box",
    paddingBlock: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 24, ":last-child": 0 },
    verticalAlign: "middle",
    textAlign: "start",
    backgroundColor: tone.catalogGround,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.ink,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.catalogRule,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
    color: tone.muted,
  },
  tbody: {
    display: { default: "block", [media.table]: "table-row-group" },
  },
  blockRow: {
    display: { default: "block", [media.table]: "table-row" },
  },
  groupCell: {
    display: { default: "block", [media.table]: "table-cell" },
    position: "sticky",
    top: { default: chrome.header, [media.table]: chrome.groupTop },
    zIndex: 1,
    paddingTop: { default: 28, [media.table]: 32 },
    paddingBottom: 10,
    paddingInline: 0,
    textAlign: "start",
    fontWeight: 400,
    backgroundColor: tone.catalogGround,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.ink,
  },
  groupLine: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  groupLabel: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  groupCount: {
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: tone.muted,
  },
  groupNumber: {
    fontFamily: face.numeral,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    marginInlineEnd: 2,
  },
  introCell: {
    display: { default: "block", [media.table]: "table-cell" },
    paddingTop: { default: 12, [media.table]: 16 },
    paddingBottom: { default: 16, [media.table]: 20 },
    paddingInline: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.catalogRule,
  },
  intro: {
    margin: 0,
    maxWidth: "40em",
    fontSize: 14,
    lineHeight: "24px",
    color: tone.body,
    textWrap: "pretty",
  },
  row: {
    display: { default: "grid", [media.table]: "table-row" },
    gridTemplateColumns: "minmax(0, 1fr) auto",
    columnGap: 16,
    paddingBlock: { default: 16, [media.table]: 0 },
    borderBottomWidth: { default: 1, [media.table]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.catalogRule,
  },
  cell: {
    display: { default: "block", [media.table]: "table-cell" },
    gridColumn: "1 / -1",
    minWidth: 0,
    paddingBottom: { default: 0, [media.table]: 16 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [media.table]: { default: 24, ":last-child": 0 } },
    verticalAlign: "top",
    textAlign: "start",
    fontWeight: 400,
    borderBottomWidth: { default: 0, [media.table]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.catalogRule,
  },
  nameCell: {
    gridColumn: "1 / 2",
    paddingTop: { default: 0, [media.table]: 16 },
  },
  regionCell: {
    gridColumn: "2 / 3",
    gridRow: "1",
    paddingTop: { default: 2, [media.table]: 16 },
    fontSize: { default: 12, [media.table]: 13 },
    lineHeight: { default: "20px", [media.table]: "24px" },
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    color: { default: tone.muted, [media.table]: tone.body },
  },
  inciCell: {
    paddingTop: { default: 4, [media.table]: 17 },
    fontSize: 13,
    lineHeight: "22px",
    color: tone.muted,
    wordBreak: "keep-all",
  },
  inciLatin: {
    fontSize: 12,
    letterSpacing: "0.01em",
  },
  featuresCell: {
    paddingTop: { default: 10, [media.table]: 16 },
    color: tone.body,
    textWrap: "pretty",
  },
  tagsCell: {
    paddingTop: { default: 8, [media.table]: 17 },
    fontSize: 13,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: tone.muted,
  },
  primary: {
    display: "block",
    fontSize: { default: 16, [media.table]: 15 },
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  secondary: {
    display: "block",
    fontSize: 13,
    lineHeight: "20px",
    color: tone.muted,
  },
  keepTogether: {
    whiteSpace: "nowrap",
  },
});

function tabTarget(key: string, current: number, last: number): number | null {
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return current === last ? 0 : current + 1;
    case "ArrowLeft":
    case "ArrowUp":
      return current === 0 ? last : current - 1;
    case "Home":
      return 0;
    case "End":
      return last;
    default:
      return null;
  }
}

function Inci(props: { text: string }) {
  const text = untrack(() => props.text);
  const parts: JSX.Element[] = [];
  let last = 0;
  for (const match of text.matchAll(INCI_LATIN)) {
    parts.push(text.slice(last, match.index));
    parts.push(<span {...stylex.attrs(styles.inciLatin)}>{match[0]}</span>);
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function ItemCell(props: { column: ColumnId; item: FlatItem }) {
  const item = props.item;
  switch (untrack(() => props.column)) {
    case "name":
      return (
        <th scope="row" {...stylex.attrs(styles.cell, styles.nameCell)}>
          <span {...stylex.attrs(styles.primary)}>{item.primary}</span>
          {item.secondary && <span {...stylex.attrs(styles.secondary)}>{item.secondary}</span>}
        </th>
      );
    case "region":
      return (
        <td {...stylex.attrs(styles.cell, styles.regionCell)}>
          {REGION_META[item.group.id].short}
        </td>
      );
    case "inci":
      return (
        <td {...stylex.attrs(styles.cell, styles.inciCell)}>
          <Inci text={item.inci} />
        </td>
      );
    case "features":
      return <td {...stylex.attrs(styles.cell, styles.featuresCell)}>{item.features}</td>;
    case "tags":
      return (
        <td {...stylex.attrs(styles.cell, styles.tagsCell)}>
          {item.traits.tags.map((tag, tagIndex) => (
            <>
              {tagIndex > 0 && " · "}
              <span {...stylex.attrs(styles.keepTogether)}>{tag}</span>
            </>
          ))}
        </td>
      );
  }
}

function GroupBody(props: { group: RowGroup; columns: Column[] }) {
  const group = props.group;
  return (
    <tbody {...stylex.attrs(styles.tbody)}>
      <tr {...stylex.attrs(styles.blockRow)}>
        <th scope="rowgroup" colspan={props.columns.length} {...stylex.attrs(styles.groupCell)}>
          <span {...stylex.attrs(styles.groupLine)}>
            <span {...stylex.attrs(styles.groupLabel)}>{group.label}</span>
            <span {...stylex.attrs(styles.groupCount)}>
              <span {...stylex.attrs(styles.groupNumber)}>{group.items.length}</span> 款原料
            </span>
          </span>
        </th>
      </tr>
      {group.intro && (
        <tr {...stylex.attrs(styles.blockRow)}>
          <td colspan={props.columns.length} {...stylex.attrs(styles.introCell)}>
            <p {...stylex.attrs(styles.intro)}>{group.intro}</p>
          </td>
        </tr>
      )}
      <For each={group.items}>
        {(item) => (
          <tr {...stylex.attrs(styles.row)}>
            <For each={props.columns}>
              {(column) => <ItemCell column={column.id} item={item} />}
            </For>
          </tr>
        )}
      </For>
    </tbody>
  );
}

export function Catalog() {
  const reduce = useReducedMotion();
  const baseId = createUniqueId();
  const titleId = `${baseId}-title`;
  const noteId = `${baseId}-note`;
  const panelId = `${baseId}-panel`;
  const tabId = (pivot: PivotId) => `${baseId}-tab-${pivot}`;
  const tabRefs: (HTMLButtonElement | undefined)[] = [];
  const [pivotId, setPivotId] = createSignal<PivotId>("region");
  const [switched, setSwitched] = createSignal(false);
  const pivot = () => PIVOTS.find((candidate) => candidate.id === pivotId()) ?? PIVOTS[0];

  const choose = (next: PivotId) => {
    if (next === pivotId()) return;
    setPivotId(next);
    setSwitched(true);
  };

  const onTabKeyDown = (event: KeyboardEvent) => {
    const current = PIVOTS.findIndex((candidate) => candidate.id === pivotId());
    const target = tabTarget(event.key, current, PIVOTS.length - 1);
    if (target === null) return;
    event.preventDefault();
    choose(PIVOTS[target].id);
    flush();
    tabRefs[target]?.focus();
  };

  return (
    <section
      id="products-catalog"
      aria-labelledby={titleId}
      {...stylex.attrs(ui.section, styles.ground)}
    >
      <div {...stylex.attrs(ui.shell)}>
        <header {...stylex.attrs(styles.head)}>
          <h2 id={titleId} {...stylex.attrs(ui.sectionTitle)}>
            产品目录
          </h2>
          <div {...stylex.attrs(styles.controls)}>
            <SegmentTrack role="tablist" aria-label="Group by" onKeyDown={onTabKeyDown}>
              {PIVOTS.map((candidate, index) => {
                const selected = () => candidate.id === pivotId();
                return (
                  <SegmentButton
                    ref={(node: HTMLButtonElement) => {
                      tabRefs[index] = node;
                    }}
                    id={tabId(candidate.id)}
                    role="tab"
                    aria-selected={selected() ? "true" : "false"}
                    aria-controls={panelId}
                    tabindex={selected() ? 0 : -1}
                    selected={selected()}
                    onClick={() => choose(candidate.id)}
                  >
                    {candidate.label}
                  </SegmentButton>
                );
              })}
            </SegmentTrack>
            <p id={noteId} {...stylex.attrs(styles.note)}>
              {NOTE}
            </p>
          </div>
        </header>
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(pivot().id)}
          {...stylex.attrs(styles.panel)}
        >
          <Show when={pivot()} keyed>
            {(current) => (
              <m.div
                initial={untrack(switched) ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ duration: reduce() ? 0 : 0.22, ease: EASE }}
              >
                <table
                  aria-labelledby={titleId}
                  aria-describedby={noteId}
                  {...stylex.attrs(styles.table)}
                >
                  <colgroup {...stylex.attrs(styles.colgroup)}>
                    {current.columns.map((column) => (
                      <col {...stylex.attrs(widths[column.width])} />
                    ))}
                  </colgroup>
                  <thead {...stylex.attrs(styles.thead)}>
                    <tr>
                      {current.columns.map((column) => (
                        <th scope="col" {...stylex.attrs(styles.headCell)}>
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {current.groups.map((group) => (
                    <GroupBody group={group} columns={current.columns} />
                  ))}
                </table>
              </m.div>
            )}
          </Show>
        </div>
      </div>
    </section>
  );
}
