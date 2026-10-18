import { Collapse } from "../../../shared/collapse";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, m } from "@/compat/motion";
import type { JSX } from "@solidjs/web";
import {
  createMemo,
  createSignal,
  createUniqueId,
  flush,
  For,
  onCleanup,
  Show,
  untrack,
} from "solid-js";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS } from "../../products-data";
import { FLAT_ITEMS, REGION_META, padIndex, type FlatItem } from "../shared/derived";
import { font, mq, ui } from "./theme.stylex";
import { useWideLayout } from "./use-wide-layout";

const TABLET = mq.tablet;
const BELOW_MD = mq.belowMd;
const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;
const MD = breakpoints.md;
const ACCENT = colors.brandGreen700;
const FOCUS = colors.brandBlue700;
const HEADER_HEIGHT = 80;
const STICKY_GAP = 24;
const CARD_RULE = "#e6e8d8";

const ALL = "all";

interface RegionFilter {
  id: string;
  label: string;
  englishLabel: string;
  count: number;
}

const FILTERS: RegionFilter[] = [
  { id: ALL, label: "全部", englishLabel: "All", count: FLAT_ITEMS.length },
  ...CATALOG_GROUPS.map((group) => ({
    id: group.id,
    label: REGION_META[group.id]?.short ?? group.label,
    englishLabel: REGION_META[group.id]?.english ?? group.englishLabel,
    count: group.items.length,
  })),
];

const itemsFor = (filterId: string) =>
  filterId === ALL ? FLAT_ITEMS : FLAT_ITEMS.filter((item) => item.group.id === filterId);

const regionShort = (item: FlatItem) => REGION_META[item.group.id]?.short ?? item.group.label;

const isGeographic = (item: FlatItem) => (REGION_META[item.group.id]?.latitude ?? null) !== null;

const INCI_LATIN = /（[^）]*）/g;

const styles = stylex.create({
  section: {
    backgroundColor: ui.catalogBand,
    color: ui.ink,
    fontFamily: font.body,
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: "min(120px, 8.333vw)" },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: ui.ink,
  },
  filterScroller: {
    marginTop: { default: 24, [DESKTOP]: 32 },
    marginInline: { default: -16, [MD]: 0 },
    paddingInline: { default: 16, [MD]: 0 },
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  segmented: {
    display: "inline-flex",
    verticalAlign: "top",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: ui.catalogRule,
    borderRadius: 2,
  },
  segment: {
    position: "relative",
    display: "inline-flex",
    alignItems: "baseline",
    flexShrink: 0,
    gap: 6,
    minHeight: 40,
    paddingBlock: 10,
    paddingInline: { default: 14, [MD]: 16 },
    boxSizing: "border-box",
    borderWidth: 0,
    borderInlineStartWidth: { default: 1, ":first-child": 0 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: ui.catalogRule,
    backgroundColor: { default: "transparent", ":hover": "rgba(255, 255, 255, 0.5)" },
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    color: { default: ui.body, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -2,
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 0,
      bottom: -1,
      height: 2,
      backgroundColor: ACCENT,
      transform: "scaleX(0)",
      transformOrigin: "center",
      transitionProperty: "transform",
      transitionDuration: "220ms",
      transitionTimingFunction: ui.ease,
    },
  },
  segmentOn: {
    backgroundColor: { default: ui.paper, ":hover": ui.paper },
    fontWeight: 500,
    color: { default: ui.ink, ":hover": ui.ink },
    "::after": {
      transform: "scaleX(1)",
    },
  },
  segmentCount: {
    fontFamily: font.numeral,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    fontVariantNumeric: "tabular-nums",
    color: ui.muted,
  },
  segmentCountOn: {
    color: ACCENT,
  },

  layout: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    alignItems: "start",
    marginTop: { default: 20, [DESKTOP]: 24 },
  },
  tableColumn: {
    gridColumn: { default: "1 / -1", [LG]: "1 / 8" },
    minWidth: 0,
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    tableLayout: "fixed",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  headCell: {
    paddingBlock: 12,
    paddingInline: 12,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: ui.ink,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: ui.catalogRule,
    textAlign: "start",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: ui.muted,
  },
  headName: {
    width: { default: "auto", [MD]: "46%" },
    borderInlineStartWidth: 2,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: "transparent",
  },
  headLatin: {
    display: { default: "table-cell", [BELOW_MD]: "none" },
    width: { default: "auto", [MD]: "36%" },
  },
  headOrigin: {
    width: { default: 84, [MD]: "18%" },
  },
  row: {
    position: "relative",
    backgroundColor: { default: "transparent", ":hover": "rgba(255, 255, 255, 0.42)" },
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", [stylex.when.descendant(":focus-visible")]: "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -2,
  },
  rowActive: {
    backgroundColor: { default: ui.catalogTint, ":hover": ui.catalogTint },
  },
  cell: {
    paddingBlock: 12,
    paddingInline: 12,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: ui.catalogRule,
    verticalAlign: "baseline",
    textAlign: "start",
    fontWeight: 400,
  },
  cellJoined: {
    borderBottomColor: "transparent",
  },
  nameCell: {
    borderInlineStartWidth: 2,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: "transparent",
    transitionProperty: "border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  nameCellActive: {
    borderInlineStartColor: ACCENT,
  },
  rowButton: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    width: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: ui.ink,
    cursor: "pointer",
    outlineStyle: "none",
    "::after": {
      content: '""',
      position: "absolute",
      inset: 0,
    },
  },
  index: {
    flexShrink: 0,
    width: 20,
    fontFamily: font.numeral,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    fontVariantNumeric: "tabular-nums",
    color: ui.muted,
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  indexActive: {
    color: ACCENT,
  },
  names: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  primaryLine: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 8,
  },
  primary: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: { default: ui.ink, [stylex.when.ancestor(":hover")]: FOCUS },
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  primaryActive: {
    fontWeight: 500,
  },
  secondary: {
    fontSize: 13,
    lineHeight: "20px",
    color: ui.muted,
  },
  latinInline: {
    display: { default: "block", [MD]: "none" },
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: 16,
    lineHeight: "22px",
    color: ui.body,
  },
  latinCell: {
    display: { default: "table-cell", [BELOW_MD]: "none" },
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: 17,
    lineHeight: "24px",
    color: ui.body,
  },
  more: {
    marginInlineStart: 6,
    fontFamily: font.numeral,
    fontStyle: "normal",
    fontSize: 12,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: ui.muted,
  },
  none: {
    fontFamily: font.body,
    fontStyle: "normal",
    color: ui.muted,
  },
  originCell: {
    fontSize: 14,
    lineHeight: "24px",
    color: ui.body,
    whiteSpace: "nowrap",
  },
  detailCell: {
    padding: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: ui.catalogRule,
    borderInlineStartWidth: 2,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: ACCENT,
    backgroundColor: ui.catalogTint,
  },
  detailClip: {
    overflow: "hidden",
  },
  detailInner: {
    paddingInlineStart: 44,
    paddingInlineEnd: 16,
    paddingBottom: 20,
  },

  cardColumn: {
    display: { default: "none", [LG]: "block" },
    gridColumn: { default: "1 / -1", [LG]: "8 / 13" },
    position: "sticky",
    top: HEADER_HEIGHT + STICKY_GAP,
  },
  card: {
    backgroundColor: ui.paper,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: ui.catalogRule,
    borderRadius: 2,
    paddingBlock: { default: 28, [DESKTOP]: 36 },
    paddingInline: { default: 28, [DESKTOP]: 36 },
  },
  cardStack: {
    display: "grid",
    minHeight: { default: 600, [DESKTOP]: 560 },
  },
  cardLayer: {
    gridArea: "1 / 1",
    minWidth: 0,
  },
  counter: {
    margin: 0,
    fontFamily: font.numeral,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ui.muted,
  },
  counterCurrent: {
    color: ACCENT,
  },
  cardName: {
    margin: 0,
    marginTop: 16,
    fontSize: { default: 24, [DESKTOP]: 28 },
    fontWeight: 500,
    lineHeight: { default: "32px", [DESKTOP]: "36px" },
    letterSpacing: "0.04em",
    color: ui.ink,
    textWrap: "balance",
  },
  cardSecondary: {
    margin: 0,
    marginTop: 4,
    fontSize: 14,
    lineHeight: "22px",
    color: ui.muted,
  },
  cardLatin: {
    margin: 0,
    marginTop: 8,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: 20,
    lineHeight: "28px",
    color: ACCENT,
    textWrap: "pretty",
  },
  inlineLatin: {
    margin: 0,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: 17,
    lineHeight: "24px",
    color: ACCENT,
    textWrap: "pretty",
  },
  facts: {
    margin: 0,
    marginTop: 24,
  },
  factsInline: {
    marginTop: 12,
  },
  factRow: {
    paddingBlock: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: CARD_RULE,
  },
  factRowInline: {
    paddingBlock: 12,
    borderTopColor: ui.catalogRule,
  },
  factLabel: {
    margin: 0,
    marginBottom: 6,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: ui.muted,
  },
  factValue: {
    margin: 0,
    fontSize: 14,
    lineHeight: "22px",
    color: ui.body,
    textWrap: "pretty",
  },
  lead: {
    margin: 0,
    maxWidth: "40em",
    fontSize: 17,
    lineHeight: "30px",
    color: ui.ink,
    textWrap: "pretty",
  },
  leadInline: {
    fontSize: 15,
    lineHeight: "26px",
  },
  regionName: {
    display: "block",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: ui.ink,
  },
  regionIntro: {
    display: "-webkit-box",
    marginTop: 6,
    overflow: "hidden",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    fontSize: 13,
    lineHeight: "22px",
    color: ui.muted,
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

function LatinPreview(props: { latin: string[] }) {
  return (
    <Show
      when={props.latin.length > 0}
      fallback={
        <span {...stylex.attrs(styles.none)}>
          <span aria-hidden="true">—</span>
          <span {...stylex.attrs(styles.srOnly)}>No botanical name</span>
        </span>
      }
    >
      {props.latin[0]}
      {props.latin.length > 1 && (
        <span {...stylex.attrs(styles.more)}>+{props.latin.length - 1}</span>
      )}
    </Show>
  );
}

function ItemFacts(props: { item: FlatItem; inline: boolean }) {
  const item = props.item;
  const factRow = () => [styles.factRow, props.inline && styles.factRowInline];
  return (
    <dl {...stylex.attrs(styles.facts, props.inline && styles.factsInline)}>
      <div {...stylex.attrs(factRow())}>
        <dt {...stylex.attrs(styles.factLabel)}>INCI 名称</dt>
        <dd {...stylex.attrs(styles.factValue)}>
          <Inci text={item.inci} />
        </dd>
      </div>
      <div {...stylex.attrs(factRow())}>
        <dt {...stylex.attrs(styles.factLabel)}>特性&应用</dt>
        <dd {...stylex.attrs(styles.lead, props.inline && styles.leadInline)}>{item.features}</dd>
      </div>
      <div {...stylex.attrs(factRow())}>
        <dt {...stylex.attrs(styles.factLabel)}>{isGeographic(item) ? "产地" : "类别"}</dt>
        <dd {...stylex.attrs(styles.factValue)}>
          <span {...stylex.attrs(styles.regionName)}>{item.group.label}</span>
          {item.group.intro && (
            <span {...stylex.attrs(styles.regionIntro)}>{item.group.intro}</span>
          )}
        </dd>
      </div>
    </dl>
  );
}

function DetailCard(props: { item: FlatItem; position: number; total: number }) {
  const item = props.item;
  return (
    <>
      <p {...stylex.attrs(styles.counter)}>
        <span {...stylex.attrs(styles.counterCurrent)}>{padIndex(props.position)}</span> /{" "}
        {String(props.total).padStart(2, "0")}
      </p>
      <h3 {...stylex.attrs(styles.cardName)}>{item.primary}</h3>
      {item.secondary && <p {...stylex.attrs(styles.cardSecondary)}>{item.secondary}</p>}
      {item.latin.length > 0 && (
        <p lang="la" {...stylex.attrs(styles.cardLatin)}>
          {item.latin.join(", ")}
        </p>
      )}
      <ItemFacts item={item} inline={false} />
    </>
  );
}

export function Catalog() {
  const reduce = useReducedMotion();
  const wide = useWideLayout();
  const titleId = createUniqueId();
  const tableId = createUniqueId();
  const cardId = createUniqueId();
  const detailBaseId = createUniqueId();
  const [filterId, setFilterId] = createSignal(ALL);
  const [filterVersion, setFilterVersion] = createSignal(0);
  const [selectedId, setSelectedId] = createSignal(FLAT_ITEMS[0].id);
  const [openId, setOpenId] = createSignal<string | null>(null);
  const buttons = new Map<string, HTMLButtonElement>();

  const items = createMemo(() => itemsFor(filterId()));
  const selectedIndex = () =>
    Math.max(
      0,
      items().findIndex((item) => item.id === selectedId()),
    );
  const selected = () => items()[selectedIndex()];
  const activeFilter = () => FILTERS.find((filter) => filter.id === filterId()) ?? FILTERS[0];

  const applyFilter = (id: string) => {
    if (id === filterId()) return;
    setFilterId(id);
    setFilterVersion((version) => version + 1);
    setSelectedId(itemsFor(id)[0].id);
    setOpenId(null);
  };

  const activate = (item: FlatItem) => {
    setSelectedId(item.id);
    setOpenId((current) => (!wide() && current === item.id ? null : item.id));
  };

  const moveWithKeys = (event: KeyboardEvent) => {
    const currentId = (event.target as HTMLElement).closest<HTMLElement>("[data-item-id]")?.dataset
      .itemId;
    if (!currentId) return;
    const list = items();
    const from = list.findIndex((item) => item.id === currentId);
    let to: number;
    if (event.key === "ArrowDown") to = Math.min(list.length - 1, from + 1);
    else if (event.key === "ArrowUp") to = Math.max(0, from - 1);
    else if (event.key === "Home") to = 0;
    else if (event.key === "End") to = list.length - 1;
    else return;
    event.preventDefault();
    const next = list[to];
    setSelectedId(next.id);
    if (wide() || openId() !== null) setOpenId(next.id);
    flush();
    buttons.get(next.id)?.focus();
  };

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.shell)}>
        <h2 id={titleId} {...stylex.attrs(styles.title)}>
          产品目录
        </h2>
        <div {...stylex.attrs(styles.filterScroller)}>
          <div role="group" aria-label="Filter by origin" {...stylex.attrs(styles.segmented)}>
            {FILTERS.map((filter) => {
              const on = () => filter.id === filterId();
              return (
                <button
                  type="button"
                  aria-pressed={on() ? "true" : "false"}
                  aria-controls={tableId}
                  onClick={() => applyFilter(filter.id)}
                  {...stylex.attrs(styles.segment, on() && styles.segmentOn)}
                >
                  {filter.label}
                  <span {...stylex.attrs(styles.segmentCount, on() && styles.segmentCountOn)}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div {...stylex.attrs(styles.layout)}>
          <div {...stylex.attrs(styles.tableColumn)}>
            <table id={tableId} {...stylex.attrs(styles.table)}>
              <caption {...stylex.attrs(styles.srOnly)}>
                Product catalog: {activeFilter().englishLabel}, {items().length} items
              </caption>
              <thead>
                <m.tr layout="position" transition={{ duration: 0.26, ease: EASE }}>
                  <th scope="col" {...stylex.attrs(styles.headCell, styles.headName)}>
                    名称
                  </th>
                  <th scope="col" {...stylex.attrs(styles.headCell, styles.headLatin)}>
                    学名
                  </th>
                  <th scope="col" {...stylex.attrs(styles.headCell, styles.headOrigin)}>
                    产地
                  </th>
                </m.tr>
              </thead>
              <Show when={filterId()} keyed>
                <m.tbody
                  onKeyDown={moveWithKeys}
                  initial={untrack(filterVersion) === 0 ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: reduce() ? 0 : 0.2, ease: EASE }}
                >
                  <For each={items()}>
                    {(item, index) => {
                      const active = () =>
                        wide() ? item.id === selected().id : item.id === openId();
                      const expanded = () => !wide() && item.id === openId();
                      const detailId = `${detailBaseId}-${item.id}`;
                      onCleanup(() => buttons.delete(item.id));
                      return (
                        <>
                          <m.tr
                            layout="position"
                            transition={{ duration: 0.26, ease: EASE }}
                            {...stylex.attrs(
                              styles.row,
                              active() && styles.rowActive,
                              stylex.defaultMarker(),
                            )}
                          >
                            <th
                              scope="row"
                              {...stylex.attrs(
                                styles.cell,
                                styles.nameCell,
                                active() && styles.nameCellActive,
                                expanded() && styles.cellJoined,
                              )}
                            >
                              <button
                                type="button"
                                data-item-id={item.id}
                                ref={(node) => {
                                  buttons.set(item.id, node);
                                }}
                                onClick={() => activate(item)}
                                aria-pressed={wide() ? (active() ? "true" : "false") : undefined}
                                aria-expanded={wide() ? undefined : expanded() ? "true" : "false"}
                                aria-controls={wide() ? cardId : expanded() ? detailId : undefined}
                                {...stylex.attrs(styles.rowButton, stylex.defaultMarker())}
                              >
                                <span
                                  {...stylex.attrs(styles.index, active() && styles.indexActive)}
                                >
                                  {padIndex(index())}
                                </span>
                                <span {...stylex.attrs(styles.names)}>
                                  <span {...stylex.attrs(styles.primaryLine)}>
                                    <span
                                      {...stylex.attrs(
                                        styles.primary,
                                        active() && styles.primaryActive,
                                      )}
                                    >
                                      {item.primary}
                                    </span>
                                    {item.secondary && (
                                      <span {...stylex.attrs(styles.secondary)}>
                                        {item.secondary}
                                      </span>
                                    )}
                                  </span>
                                  {item.latin.length > 0 && (
                                    <span lang="la" {...stylex.attrs(styles.latinInline)}>
                                      <LatinPreview latin={item.latin} />
                                    </span>
                                  )}
                                </span>
                              </button>
                            </th>
                            <td
                              lang={item.latin.length > 0 ? "la" : undefined}
                              {...stylex.attrs(
                                styles.cell,
                                styles.latinCell,
                                expanded() && styles.cellJoined,
                              )}
                            >
                              <LatinPreview latin={item.latin} />
                            </td>
                            <td
                              {...stylex.attrs(
                                styles.cell,
                                styles.originCell,
                                expanded() && styles.cellJoined,
                              )}
                            >
                              {regionShort(item)}
                            </td>
                          </m.tr>
                          <m.tr
                            layout="position"
                            transition={{ duration: 0.26, ease: EASE }}
                            aria-hidden={expanded() ? "false" : "true"}
                            inert={!expanded()}
                          >
                            <td
                              colspan={3}
                              {...stylex.attrs(styles.detailCell)}
                              style={{ "border-bottom-width": expanded() ? "1px" : "0" }}
                            >
                              <Collapse
                                id={detailId}
                                open={expanded()}
                                transition={{ duration: reduce() ? 0 : 0.26, ease: EASE }}
                                {...stylex.attrs(styles.detailClip)}
                              >
                                <div {...stylex.attrs(styles.detailInner)}>
                                  {item.latin.length > 0 && (
                                    <p lang="la" {...stylex.attrs(styles.inlineLatin)}>
                                      {item.latin.join(", ")}
                                    </p>
                                  )}
                                  <ItemFacts item={item} inline />
                                </div>
                              </Collapse>
                            </td>
                          </m.tr>
                        </>
                      );
                    }}
                  </For>
                </m.tbody>
              </Show>
            </table>
          </div>

          <div {...stylex.attrs(styles.cardColumn)}>
            <div
              id={cardId}
              role="region"
              aria-label="Ingredient details"
              aria-live="polite"
              {...stylex.attrs(styles.card)}
            >
              <div {...stylex.attrs(styles.cardStack)}>
                <AnimatePresence initial={false}>
                  <Show when={selected()} keyed>
                    {(current) => {
                      // An exiting card keeps the position it was rendered with, as in React.
                      const position = untrack(selectedIndex);
                      const total = untrack(items).length;
                      return (
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: reduce() ? 0 : 0.22, ease: EASE }}
                          {...stylex.attrs(styles.cardLayer)}
                        >
                          <DetailCard item={current} position={position} total={total} />
                        </m.div>
                      );
                    }}
                  </Show>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
