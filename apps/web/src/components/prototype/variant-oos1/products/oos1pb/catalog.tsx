import { Collapse } from "../../../shared/collapse";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Plus, X } from "@fenchem-lp/ui/components/lucide";
import { m } from "@/compat/motion";
import type { JSX } from "@solidjs/web";
import { createMemo, createSignal, createUniqueId, For, Show, untrack } from "solid-js";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS } from "../../products-data";
import { FLAT_ITEMS, FUNCTION_TAGS, type FlatItem, type FunctionTag } from "../shared/derived";
import { frame } from "./frame";
import { font, ink, layout, matrix, mq } from "./theme.stylex";

const LG = breakpoints.lg;
const MD_ONLY = mq.mdOnly;
const EDGE = { default: 16, [MD_ONLY]: 40, [LG]: 16 } as const;
const COLUMN_COUNT = FUNCTION_TAGS.length + 1;

const GROUP_ROWS = CATALOG_GROUPS.map((group) => ({
  group,
  items: FLAT_ITEMS.filter((item) => item.group.id === group.id),
}));

const hasTag = (item: FlatItem, tag: FunctionTag) => item.traits.tags.includes(tag);

const TAG_TOTALS = new Map(
  FUNCTION_TAGS.map((tag) => [tag, FLAT_ITEMS.filter((item) => hasTag(item, tag)).length]),
);

const stackedLabel = (tag: string) => (tag.length === 4 ? [tag.slice(0, 2), tag.slice(2)] : [tag]);

const INCI_LATIN = /（[^）]*）/g;

const styles = stylex.create({
  ground: {
    backgroundColor: matrix.ground,
  },
  head: {
    marginBottom: { default: 24, [breakpoints.xl]: 32 },
  },
  note: {
    margin: 0,
    marginTop: 8,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: ink.muted,
  },
  status: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    minHeight: 40,
    marginBottom: 8,
  },
  statusText: {
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    color: ink.primary,
  },
  statusDivider: {
    marginInline: 8,
    color: ink.muted,
  },
  numeral: {
    fontFamily: font.numeral,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
  },
  statusUnit: {
    marginInlineStart: 4,
  },
  hint: {
    fontSize: 13,
    lineHeight: "20px",
    color: ink.muted,
    textAlign: "end",
  },
  clear: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    minHeight: 40,
    paddingInline: 8,
    marginInlineEnd: -8,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: { default: ink.body, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineOffset: -2,
  },
  scroller: {
    position: "relative",
    marginInline: { default: -16, [MD_ONLY]: -40, [LG]: -16 },
    overflowX: { default: "auto", [LG]: "visible" },
    overscrollBehaviorX: "contain",
    containerType: { default: "inline-size", [LG]: "normal" },
  },
  table: {
    width: { default: "max(100%, 740px)", [MD_ONLY]: "max(100%, 836px)", [LG]: "100%" },
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  nameCol: {
    width: { default: 168, [MD_ONLY]: 220, [LG]: "27%" },
  },
  tagCol: {
    width: { default: 52, [MD_ONLY]: 56, [LG]: "auto" },
  },
  headCell: {
    padding: 0,
    verticalAlign: "bottom",
    backgroundColor: matrix.ground,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: ink.primary,
    fontWeight: 500,
    position: { default: "static", [LG]: "sticky" },
    top: { default: "auto", [LG]: 80 },
    zIndex: 2,
  },
  nameHead: {
    position: "sticky",
    insetInlineStart: { default: 0, [LG]: "auto" },
    zIndex: 3,
    paddingBlock: 12,
    paddingInlineStart: EDGE,
    textAlign: "start",
    fontSize: 13,
    lineHeight: "18px",
    letterSpacing: "0.04em",
    color: ink.muted,
    borderInlineEndWidth: { default: 1, [LG]: 0 },
    borderInlineEndStyle: "solid",
    borderInlineEndColor: matrix.rule,
  },
  tagHeadOn: {
    backgroundColor: matrix.column,
  },
  tagButton: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    minHeight: 64,
    paddingBlock: 12,
    paddingInline: 2,
    borderWidth: 0,
    backgroundColor: { default: "transparent", ":hover": matrix.column },
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0.04em",
    color: { default: ink.muted, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineOffset: -2,
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 8,
      bottom: -1,
      height: 2,
      backgroundColor: colors.brandGreen700,
      transform: "scaleX(0)",
      transitionProperty: "transform",
      transitionDuration: "240ms",
      transitionTimingFunction: layout.easeOut,
    },
  },
  tagButtonOn: {
    color: { default: ink.primary, ":hover": ink.primary },
    "::after": {
      transform: "scaleX(1)",
    },
  },
  tagLine: {
    display: "block",
    whiteSpace: "nowrap",
  },
  groupCell: {
    padding: 0,
    paddingTop: 32,
    textAlign: "start",
    fontWeight: 400,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: matrix.rule,
  },
  groupInner: {
    display: "block",
    position: { default: "sticky", [LG]: "static" },
    insetInlineStart: 0,
    width: { default: "100cqi", [LG]: "auto" },
    boxSizing: "border-box",
    paddingInline: EDGE,
    paddingBottom: 10,
  },
  groupTitle: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
  },
  groupLabel: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: ink.primary,
  },
  groupCount: {
    fontSize: 12,
    lineHeight: "18px",
    color: ink.muted,
    whiteSpace: "nowrap",
  },
  groupIntro: {
    display: "block",
    maxWidth: "40em",
    marginTop: 6,
    fontSize: 13,
    lineHeight: "22px",
    color: ink.muted,
    textWrap: "pretty",
  },
  row: {
    backgroundColor: { default: matrix.ground, ":hover": "#eef1fe" },
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  rowOpen: {
    backgroundColor: { default: matrix.raised, ":hover": matrix.raised },
  },
  nameCell: {
    position: { default: "sticky", [LG]: "static" },
    insetInlineStart: 0,
    zIndex: 1,
    padding: 0,
    textAlign: "start",
    fontWeight: 400,
    backgroundColor: "inherit",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: matrix.rule,
    borderInlineEndWidth: { default: 1, [LG]: 0 },
    borderInlineEndStyle: "solid",
    borderInlineEndColor: matrix.rule,
  },
  nameCellOpen: {
    borderBottomColor: "transparent",
    boxShadow: `inset 2px 0 0 ${colors.brandGreen700}`,
  },
  nameButton: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 14px",
    alignItems: "center",
    columnGap: { default: 6, [breakpoints.md]: 10 },
    width: "100%",
    minHeight: 60,
    paddingBlock: 10,
    paddingInlineStart: EDGE,
    paddingInlineEnd: { default: 8, [LG]: 16 },
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: ink.primary, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineOffset: -2,
  },
  names: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    transitionProperty: "opacity",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  },
  primary: {
    fontSize: { default: 14, [breakpoints.md]: 15 },
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: "inherit",
  },
  secondary: {
    marginInlineStart: 6,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: ink.muted,
  },
  latin: {
    marginTop: 1,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: 14,
    lineHeight: "18px",
    letterSpacing: "0.01em",
    color: ink.muted,
  },
  latinMore: {
    marginInlineStart: 4,
    fontFamily: font.numeral,
    fontStyle: "normal",
    fontSize: 11,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 14,
    height: 14,
    color: ink.muted,
  },
  tagCell: {
    padding: 0,
    textAlign: "center",
    verticalAlign: "middle",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: matrix.rule,
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  tagCellOn: {
    backgroundColor: matrix.column,
  },
  tagCellOpen: {
    borderBottomColor: "transparent",
  },
  dot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: colors.brandGreen700,
    verticalAlign: "middle",
    transitionProperty: "opacity",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  },
  detailCell: {
    padding: 0,
    backgroundColor: matrix.raised,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: matrix.rule,
    boxShadow: `inset 2px 0 0 ${colors.brandGreen700}`,
  },
  detailClip: {
    position: { default: "sticky", [LG]: "static" },
    insetInlineStart: 0,
    width: { default: "100cqi", [LG]: "auto" },
    overflow: "hidden",
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    margin: 0,
    paddingTop: 4,
    paddingBottom: 28,
    paddingInlineStart: EDGE,
    paddingInlineEnd: { default: 16, [MD_ONLY]: 40, [LG]: 16 },
  },
  field: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [MD_ONLY]: "140px minmax(0, 1fr)",
      [LG]: "calc((100% + 32px) * 0.27 - 32px) minmax(0, 1fr)",
    },
    columnGap: { default: 0, [MD_ONLY]: 40, [LG]: 16 },
    rowGap: 4,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.06em",
    color: ink.muted,
  },
  inci: {
    margin: 0,
    maxWidth: "40em",
    fontSize: 14,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: ink.body,
    textWrap: "pretty",
  },
  features: {
    margin: 0,
    maxWidth: "36em",
    fontSize: 15,
    lineHeight: "26px",
    color: ink.primary,
    textWrap: "pretty",
  },
  keepTogether: {
    whiteSpace: "nowrap",
  },
});

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

function LatinLine(props: { names: string[] }) {
  return (
    <Show when={props.names[0]}>
      {(first) => (
        <span lang="la" title={props.names.join(", ")} {...stylex.attrs(styles.latin)}>
          {first()}
          {props.names.length > 1 && (
            <span {...stylex.attrs(styles.latinMore)}>+{props.names.length - 1}</span>
          )}
        </span>
      )}
    </Show>
  );
}

function ItemRows(props: {
  item: FlatItem;
  activeTag: FunctionTag | null;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const detailId = createUniqueId();
  const item = props.item;

  return (
    <>
      <m.tr
        layout="position"
        transition={{ duration: 0.26, ease: EASE }}
        {...stylex.attrs(styles.row, props.open && styles.rowOpen)}
      >
        <th scope="row" {...stylex.attrs(styles.nameCell, props.open && styles.nameCellOpen)}>
          <button
            type="button"
            aria-expanded={props.open ? "true" : "false"}
            aria-controls={props.open ? detailId : undefined}
            onClick={() => props.onToggle()}
            {...stylex.attrs(frame.focusRing, styles.nameButton)}
          >
            <span {...stylex.attrs(styles.names)}>
              <span {...stylex.attrs(styles.primary)}>
                {item.primary}
                {item.secondary && (
                  <span {...stylex.attrs(styles.secondary)}>{item.secondary}</span>
                )}
              </span>
              <LatinLine names={item.latin} />
            </span>
            <m.span
              aria-hidden="true"
              initial={false}
              animate={{ rotate: props.open ? 45 : 0 }}
              transition={reduce() ? { duration: 0 } : { duration: 0.2, ease: EASE }}
              {...stylex.attrs(styles.toggle)}
            >
              <Plus size={14} strokeWidth={1.5} absoluteStrokeWidth />
            </m.span>
          </button>
        </th>
        {FUNCTION_TAGS.map((tag) => (
          <td
            {...stylex.attrs(
              styles.tagCell,
              props.activeTag === tag && styles.tagCellOn,
              props.open && styles.tagCellOpen,
            )}
          >
            {hasTag(item, tag) && (
              <>
                <span aria-hidden="true" {...stylex.attrs(styles.dot)} />
                <span {...stylex.attrs(frame.srOnly)}>Yes</span>
              </>
            )}
          </td>
        ))}
      </m.tr>
      <m.tr
        layout="position"
        transition={{ duration: 0.26, ease: EASE }}
        aria-hidden={props.open ? "false" : "true"}
        inert={!props.open}
      >
        <td
          colspan={COLUMN_COUNT}
          {...stylex.attrs(styles.detailCell)}
          style={{ "border-bottom-width": props.open ? "1px" : "0" }}
        >
          <Collapse
            id={detailId}
            open={props.open}
            transition={{ duration: reduce() ? 0 : 0.24, ease: EASE }}
            {...stylex.attrs(styles.detailClip)}
          >
            <dl {...stylex.attrs(styles.detail)}>
              <div {...stylex.attrs(styles.field)}>
                <dt {...stylex.attrs(styles.fieldLabel)}>INCI 名称</dt>
                <dd {...stylex.attrs(styles.inci)}>
                  <Inci text={item.inci} />
                </dd>
              </div>
              <div {...stylex.attrs(styles.field)}>
                <dt {...stylex.attrs(styles.fieldLabel)}>特性&应用</dt>
                <dd {...stylex.attrs(styles.features)}>{item.features}</dd>
              </div>
            </dl>
          </Collapse>
        </td>
      </m.tr>
    </>
  );
}

export function Catalog() {
  const tableId = createUniqueId();
  const noteId = createUniqueId();
  const [activeTag, setActiveTag] = createSignal<FunctionTag | null>(null);
  const [openId, setOpenId] = createSignal<string | null>(null);
  const matchCount = () => {
    const tag = activeTag();
    return tag ? (TAG_TOTALS.get(tag) ?? 0) : FLAT_ITEMS.length;
  };

  return (
    <section
      id="products-catalog"
      aria-labelledby="catalog-title"
      {...stylex.attrs(frame.section, styles.ground)}
    >
      <div {...stylex.attrs(frame.shell)}>
        <header {...stylex.attrs(styles.head)}>
          <h2 id="catalog-title" {...stylex.attrs(frame.title)}>
            产品目录
          </h2>
          <p id={noteId} {...stylex.attrs(styles.note)}>
            功效依据原料描述整理
          </p>
        </header>
        <div {...stylex.attrs(styles.status)}>
          <p aria-live="polite" {...stylex.attrs(styles.statusText)}>
            {activeTag() ?? "全部"}
            <span aria-hidden="true" {...stylex.attrs(styles.statusDivider)}>
              ·
            </span>
            <span {...stylex.attrs(styles.numeral)}>{matchCount()}</span>
            <span {...stylex.attrs(styles.statusUnit)}>款</span>
          </p>
          <Show
            when={activeTag()}
            fallback={<span {...stylex.attrs(styles.hint)}>点按功效列标题筛选</span>}
          >
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              {...stylex.attrs(frame.focusRing, styles.clear)}
            >
              <X size={14} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
              清除
            </button>
          </Show>
        </div>
        <div {...stylex.attrs(styles.scroller)}>
          <table
            id={tableId}
            aria-labelledby="catalog-title"
            aria-describedby={noteId}
            {...stylex.attrs(styles.table)}
          >
            <colgroup>
              <col {...stylex.attrs(styles.nameCol)} />
              {FUNCTION_TAGS.map(() => (
                <col {...stylex.attrs(styles.tagCol)} />
              ))}
            </colgroup>
            <thead>
              <m.tr layout="position" transition={{ duration: 0.26, ease: EASE }}>
                <th scope="col" {...stylex.attrs(styles.headCell, styles.nameHead)}>
                  名称
                </th>
                {FUNCTION_TAGS.map((tag) => {
                  const pressed = () => activeTag() === tag;
                  return (
                    <th
                      scope="col"
                      {...stylex.attrs(styles.headCell, pressed() && styles.tagHeadOn)}
                    >
                      <button
                        type="button"
                        aria-pressed={pressed() ? "true" : "false"}
                        aria-controls={tableId}
                        onClick={() => setActiveTag(pressed() ? null : tag)}
                        {...stylex.attrs(
                          frame.focusRing,
                          styles.tagButton,
                          pressed() && styles.tagButtonOn,
                        )}
                      >
                        {stackedLabel(tag).map((part) => (
                          <span {...stylex.attrs(styles.tagLine)}>{part}</span>
                        ))}
                      </button>
                    </th>
                  );
                })}
              </m.tr>
            </thead>
            <For each={GROUP_ROWS}>
              {({ group, items }) => {
                const visibleItems = createMemo(() => {
                  const tag = activeTag();
                  return tag ? items.filter((item) => hasTag(item, tag)) : items;
                });
                const matching = () => visibleItems().length;
                return (
                  <Show when={matching() > 0}>
                    <m.tbody layout="position" transition={{ duration: 0.26, ease: EASE }}>
                      <m.tr layout="position" transition={{ duration: 0.26, ease: EASE }}>
                        <th
                          scope="rowgroup"
                          colspan={COLUMN_COUNT}
                          {...stylex.attrs(styles.groupCell)}
                        >
                          <span {...stylex.attrs(styles.groupInner)}>
                            <span {...stylex.attrs(styles.groupTitle)}>
                              <span {...stylex.attrs(styles.groupLabel)}>{group.label}</span>
                              <span {...stylex.attrs(styles.groupCount)}>
                                <span {...stylex.attrs(styles.numeral)}>
                                  {activeTag() ? `${matching()} / ${items.length}` : items.length}
                                </span>
                                <span {...stylex.attrs(styles.statusUnit)}>款</span>
                              </span>
                            </span>
                            {group.intro && (
                              <span {...stylex.attrs(styles.groupIntro)}>{group.intro}</span>
                            )}
                          </span>
                        </th>
                      </m.tr>
                      <For each={visibleItems()}>
                        {(item) => (
                          <ItemRows
                            item={item}
                            activeTag={activeTag()}
                            open={openId() === item.id}
                            onToggle={() =>
                              setOpenId((prev) => (prev === item.id ? null : item.id))
                            }
                          />
                        )}
                      </For>
                    </m.tbody>
                  </Show>
                );
              }}
            </For>
          </table>
        </div>
      </div>
    </section>
  );
}
