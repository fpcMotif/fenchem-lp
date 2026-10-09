import { Collapse } from "../../../shared/collapse";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, m } from "motion/react";
import { Fragment, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

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
  count: number;
}

const FILTERS: RegionFilter[] = [
  { id: ALL, label: "全部", count: FLAT_ITEMS.length },
  ...CATALOG_GROUPS.map((group) => ({
    id: group.id,
    label: REGION_META[group.id]?.short ?? group.label,
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

function LatinPreview({ latin }: { latin: string[] }) {
  if (latin.length === 0) {
    return (
      <span {...stylex.props(styles.none)}>
        <span aria-hidden="true">—</span>
        <span {...stylex.props(styles.srOnly)}>无学名</span>
      </span>
    );
  }
  return (
    <>
      {latin[0]}
      {latin.length > 1 && <span {...stylex.props(styles.more)}>+{latin.length - 1}</span>}
    </>
  );
}

function ItemFacts({ item, inline }: { item: FlatItem; inline: boolean }) {
  const factRow = [styles.factRow, inline && styles.factRowInline];
  return (
    <dl {...stylex.props(styles.facts, inline && styles.factsInline)}>
      <div {...stylex.props(factRow)}>
        <dt {...stylex.props(styles.factLabel)}>INCI 名称</dt>
        <dd {...stylex.props(styles.factValue)}>
          <Inci text={item.inci} />
        </dd>
      </div>
      <div {...stylex.props(factRow)}>
        <dt {...stylex.props(styles.factLabel)}>特性&应用</dt>
        <dd {...stylex.props(styles.lead, inline && styles.leadInline)}>{item.features}</dd>
      </div>
      <div {...stylex.props(factRow)}>
        <dt {...stylex.props(styles.factLabel)}>{isGeographic(item) ? "产地" : "类别"}</dt>
        <dd {...stylex.props(styles.factValue)}>
          <span {...stylex.props(styles.regionName)}>{item.group.label}</span>
          {item.group.intro && (
            <span {...stylex.props(styles.regionIntro)}>{item.group.intro}</span>
          )}
        </dd>
      </div>
    </dl>
  );
}

function DetailCard({
  item,
  position,
  total,
}: {
  item: FlatItem;
  position: number;
  total: number;
}) {
  return (
    <>
      <p {...stylex.props(styles.counter)}>
        <span {...stylex.props(styles.counterCurrent)}>{padIndex(position)}</span> /{" "}
        {String(total).padStart(2, "0")}
      </p>
      <h3 {...stylex.props(styles.cardName)}>{item.primary}</h3>
      {item.secondary && <p {...stylex.props(styles.cardSecondary)}>{item.secondary}</p>}
      {item.latin.length > 0 && (
        <p lang="la" {...stylex.props(styles.cardLatin)}>
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
  const titleId = useId();
  const tableId = useId();
  const cardId = useId();
  const detailBaseId = useId();
  const [filterId, setFilterId] = useState(ALL);
  const [filterVersion, setFilterVersion] = useState(0);
  const [selectedId, setSelectedId] = useState(FLAT_ITEMS[0].id);
  const [openId, setOpenId] = useState<string | null>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());

  const items = itemsFor(filterId);
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.id === selectedId),
  );
  const selected = items[selectedIndex];
  const activeFilter = FILTERS.find((filter) => filter.id === filterId) ?? FILTERS[0];

  const applyFilter = (id: string) => {
    if (id === filterId) return;
    setFilterId(id);
    setFilterVersion((version) => version + 1);
    setSelectedId(itemsFor(id)[0].id);
    setOpenId(null);
  };

  const activate = (item: FlatItem) => {
    setSelectedId(item.id);
    setOpenId((current) => (!wide && current === item.id ? null : item.id));
  };

  const moveWithKeys = (event: KeyboardEvent<HTMLTableSectionElement>) => {
    const currentId = (event.target as HTMLElement).closest<HTMLElement>("[data-item-id]")?.dataset
      .itemId;
    if (!currentId) return;
    const from = items.findIndex((item) => item.id === currentId);
    let to: number;
    if (event.key === "ArrowDown") to = Math.min(items.length - 1, from + 1);
    else if (event.key === "ArrowUp") to = Math.max(0, from - 1);
    else if (event.key === "Home") to = 0;
    else if (event.key === "End") to = items.length - 1;
    else return;
    event.preventDefault();
    const next = items[to];
    setSelectedId(next.id);
    if (wide || openId !== null) setOpenId(next.id);
    buttons.current.get(next.id)?.focus();
  };

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <h2 id={titleId} {...stylex.props(styles.title)}>
          产品目录
        </h2>
        <div {...stylex.props(styles.filterScroller)}>
          <div role="group" aria-label="按产地筛选" {...stylex.props(styles.segmented)}>
            {FILTERS.map((filter) => {
              const on = filter.id === filterId;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={on}
                  aria-controls={tableId}
                  onClick={() => applyFilter(filter.id)}
                  {...stylex.props(styles.segment, on && styles.segmentOn)}
                >
                  {filter.label}
                  <span {...stylex.props(styles.segmentCount, on && styles.segmentCountOn)}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div {...stylex.props(styles.layout)}>
          <div {...stylex.props(styles.tableColumn)}>
            <table id={tableId} {...stylex.props(styles.table)}>
              <caption {...stylex.props(styles.srOnly)}>
                产品目录：{activeFilter.label}，共 {items.length} 款
              </caption>
              <thead>
                <m.tr layout="position" transition={{ duration: 0.26, ease: EASE }}>
                  <th scope="col" {...stylex.props(styles.headCell, styles.headName)}>
                    名称
                  </th>
                  <th scope="col" {...stylex.props(styles.headCell, styles.headLatin)}>
                    学名
                  </th>
                  <th scope="col" {...stylex.props(styles.headCell, styles.headOrigin)}>
                    产地
                  </th>
                </m.tr>
              </thead>
              <m.tbody
                key={filterId}
                onKeyDown={moveWithKeys}
                initial={filterVersion === 0 ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
              >
                {items.map((item, index) => {
                  const active = wide ? item.id === selected.id : item.id === openId;
                  const expanded = !wide && item.id === openId;
                  const detailId = `${detailBaseId}-${item.id}`;
                  const relation = wide
                    ? { "aria-pressed": active, "aria-controls": cardId }
                    : {
                        "aria-expanded": expanded,
                        "aria-controls": expanded ? detailId : undefined,
                      };
                  return (
                    <Fragment key={item.id}>
                      <m.tr
                        layout="position"
                        transition={{ duration: 0.26, ease: EASE }}
                        {...stylex.props(
                          styles.row,
                          active && styles.rowActive,
                          stylex.defaultMarker(),
                        )}
                      >
                        <th
                          scope="row"
                          {...stylex.props(
                            styles.cell,
                            styles.nameCell,
                            active && styles.nameCellActive,
                            expanded && styles.cellJoined,
                          )}
                        >
                          <button
                            type="button"
                            data-item-id={item.id}
                            ref={(node) => {
                              if (node) buttons.current.set(item.id, node);
                              else buttons.current.delete(item.id);
                            }}
                            onClick={() => activate(item)}
                            {...relation}
                            {...stylex.props(styles.rowButton, stylex.defaultMarker())}
                          >
                            <span {...stylex.props(styles.index, active && styles.indexActive)}>
                              {padIndex(index)}
                            </span>
                            <span {...stylex.props(styles.names)}>
                              <span {...stylex.props(styles.primaryLine)}>
                                <span
                                  {...stylex.props(styles.primary, active && styles.primaryActive)}
                                >
                                  {item.primary}
                                </span>
                                {item.secondary && (
                                  <span {...stylex.props(styles.secondary)}>{item.secondary}</span>
                                )}
                              </span>
                              {item.latin.length > 0 && (
                                <span lang="la" {...stylex.props(styles.latinInline)}>
                                  <LatinPreview latin={item.latin} />
                                </span>
                              )}
                            </span>
                          </button>
                        </th>
                        <td
                          lang={item.latin.length > 0 ? "la" : undefined}
                          {...stylex.props(
                            styles.cell,
                            styles.latinCell,
                            expanded && styles.cellJoined,
                          )}
                        >
                          <LatinPreview latin={item.latin} />
                        </td>
                        <td
                          {...stylex.props(
                            styles.cell,
                            styles.originCell,
                            expanded && styles.cellJoined,
                          )}
                        >
                          {regionShort(item)}
                        </td>
                      </m.tr>
                      <m.tr
                        layout="position"
                        transition={{ duration: 0.26, ease: EASE }}
                        key="detail"
                        aria-hidden={!expanded}
                        inert={!expanded}
                      >
                        <td
                          colSpan={3}
                          {...stylex.props(styles.detailCell)}
                          style={{ borderBottomWidth: expanded ? 1 : 0 }}
                        >
                          <Collapse
                            id={detailId}
                            open={expanded}

                            transition={{ duration: reduce ? 0 : 0.26, ease: EASE }}
                            {...stylex.props(styles.detailClip)}
                          >
                            <div {...stylex.props(styles.detailInner)}>
                              {item.latin.length > 0 && (
                                <p lang="la" {...stylex.props(styles.inlineLatin)}>
                                  {item.latin.join(", ")}
                                </p>
                              )}
                              <ItemFacts item={item} inline />
                            </div>
                          </Collapse>
                        </td>
                      </m.tr>
                    </Fragment>
                  );
                })}
              </m.tbody>
            </table>
          </div>

          <div {...stylex.props(styles.cardColumn)}>
            <div
              id={cardId}
              role="region"
              aria-label="原料详情"
              aria-live="polite"
              {...stylex.props(styles.card)}
            >
              <div {...stylex.props(styles.cardStack)}>
                <AnimatePresence initial={false}>
                  <m.div
                    key={selected.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
                    {...stylex.props(styles.cardLayer)}
                  >
                    <DetailCard item={selected} position={selectedIndex} total={items.length} />
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
