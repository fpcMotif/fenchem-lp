import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight } from "@fenchem-lp/ui/components/lucide";
import { LayoutGroup, m } from "@/compat/motion";
import { createMemo, createSignal, createUniqueId, For, Show, untrack } from "solid-js";
import type { JSX } from "@solidjs/web";

import { useReducedMotion } from "../../use-reduced-motion";
import {
  AreaChips,
  LAB_SOLUTIONS,
  LabSection,
  areaOf,
  padIndex,
  sheetRows,
  useSolutionsBrowser,
  type SheetRow,
  type SolutionItem,
} from "../kit";
import { bp, depth, face, motion, tone } from "../tokens.stylex";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const HEADER_OFFSET = 80;
const SHEET_GAP = 16;
const BOTTOM_CLEARANCE = 160;
const FLOW_COLUMNS = 3;
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;
const NO_BREAK_SPACE = String.fromCharCode(0xa0);

const AREA_POSITION = new Map(
  LAB_SOLUTIONS.map((item) => [
    item.id,
    LAB_SOLUTIONS.filter((other) => other.area === item.area).indexOf(item),
  ]),
);

const areaSize = (item: SolutionItem) =>
  LAB_SOLUTIONS.filter((other) => other.area === item.area).length;

const flowColumns = (items: SolutionItem[]) => {
  const size = Math.ceil(items.length / FLOW_COLUMNS);
  return Array.from({ length: FLOW_COLUMNS }, (_, column) =>
    items.slice(column * size, (column + 1) * size),
  ).filter((column) => column.length > 0);
};

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1], note: match[2] } : { primary: text, note: null };
};

const fade = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const styles = stylex.create({
  matrix: {
    marginTop: { default: 16, [bp.xl]: 24 },
    paddingInline: { default: 12, [bp.md]: 24, [bp.xl]: 32 },
    paddingTop: { default: 12, [bp.md]: 24, [bp.xl]: 28 },
    paddingBottom: { default: 12, [bp.md]: 24, [bp.xl]: 28 },
    borderRadius: { default: 12, [bp.xl]: 16 },
    backgroundColor: tone.tintFill,
  },
  fadeIn: {
    animationName: { default: "none", [bp.motionOk]: fade },
    animationDuration: "180ms",
    animationTimingFunction: motion.easeOut,
  },
  areaGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.md]: "repeat(2, minmax(0, 1fr))",
      [bp.lg]: "repeat(3, minmax(0, 1fr))",
      [bp.xl]: "repeat(5, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [bp.md]: 28, [bp.xl]: 24 },
    rowGap: { default: 20, [bp.md]: 32 },
  },
  column: {
    minWidth: 0,
  },
  flowGrid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.md]: "repeat(3, minmax(0, 1fr))" },
    columnGap: { default: 0, [bp.md]: 28, [bp.xl]: 40 },
  },
  colHead: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "baseline",
    columnGap: 12,
    rowGap: 2,
    paddingInline: { default: 4, [bp.md]: 0 },
    paddingBottom: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRule,
  },
  colHeadActive: {
    borderBottomColor: tone.accent,
  },
  colLabel: {
    margin: 0,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    color: tone.tintInk,
  },
  colLabelActive: {
    color: tone.accent,
  },
  colCount: {
    fontSize: 12,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  colEnglish: {
    gridColumn: "1 / -1",
    margin: 0,
    fontFamily: face.display,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: tone.tintMuted,
  },
  names: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginBlock: 0,
    marginInline: { default: -8, [bp.md]: -10 },
    padding: 0,
    listStyleType: "none",
  },
  name: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "20px minmax(0, 1fr)",
    alignItems: "baseline",
    columnGap: 8,
    width: "100%",
    minHeight: { default: 44, [bp.md]: 36 },
    paddingBlock: { default: 11, [bp.md]: 7 },
    paddingInline: { default: 12, [bp.md]: 10 },
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 0,
  },
  nameSelected: {
    cursor: "default",
  },
  pill: {
    position: "absolute",
    inset: 0,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: 10,
    backgroundColor: tone.paper,
    boxShadow: "0 1px 2px rgba(7, 26, 74, 0.05)",
    pointerEvents: "none",
  },
  nameIndex: {
    position: "relative",
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  nameIndexSelected: {
    color: tone.accent,
  },
  nameText: {
    position: "relative",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: {
      default: tone.tintBody,
      [stylex.when.ancestor(":hover")]: { default: tone.tintBody, [bp.hover]: tone.accent },
    },
    textWrap: "pretty",
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
  },
  nameTextSelected: {
    fontWeight: 500,
    color: tone.ink,
  },
  sheet: {
    marginTop: { default: 16, [bp.md]: 24, [bp.xl]: 32 },
    paddingInline: { default: 20, [bp.md]: 40, [bp.xl]: 48 },
    paddingTop: { default: 24, [bp.md]: 36, [bp.xl]: 40 },
    paddingBottom: { default: 12, [bp.md]: 20 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: { default: 12, [bp.xl]: 16 },
    backgroundColor: tone.paper,
    boxShadow: depth.card,
  },
  sheetHead: {
    paddingBottom: { default: 20, [bp.md]: 28 },
  },
  sheetMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 6,
  },
  sheetArea: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    minWidth: 0,
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    color: tone.accent,
    whiteSpace: "nowrap",
  },
  english: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: face.display,
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: tone.tintMuted,
  },
  stepper: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  stepButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    boxSizing: "border-box",
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: tone.tintRule,
      ":hover": { default: tone.tintRule, [bp.hover]: tone.accentLine },
    },
    borderRadius: 8,
    backgroundColor: tone.paper,
    color: {
      default: tone.tintInk,
      ":hover": { default: tone.tintInk, [bp.hover]: tone.accent },
    },
    cursor: "pointer",
    transform: { default: null, ":active": "scale(0.94)" },
    transitionProperty: "border-color, color, transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "140ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  stepButtonDisabled: {
    borderColor: tone.tintRuleSoft,
    color: tone.tintMuted,
    opacity: 0.5,
    cursor: "default",
    transform: "none",
  },
  sheetCount: {
    margin: 0,
    marginInlineEnd: 4,
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "18px",
    letterSpacing: "0.08em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
  },
  sheetTitle: {
    margin: 0,
    fontSize: { default: 20, [bp.md]: 24 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: 1.6,
    color: tone.tintBody,
    textWrap: "pretty",
  },
  fields: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.xl]: "repeat(2, minmax(0, 1fr))" },
    gridTemplateRows: { default: "none", [bp.xl]: "repeat(3, auto)" },
    gridAutoFlow: { default: "row", [bp.xl]: "column" },
    columnGap: { default: 0, [bp.xl]: 40 },
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.md]: "88px minmax(0, 1fr)",
      [bp.xl]: "minmax(0, 1fr)",
    },
    alignContent: "start",
    columnGap: 16,
    rowGap: { default: 6, [bp.xl]: 4 },
    paddingBlock: { default: 16, [bp.md]: 20, [bp.xl]: 16 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRule,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: tone.tintMuted,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: tone.tintInk,
    textWrap: "pretty",
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  description: {
    color: tone.tintBody,
  },
  strong: {
    fontWeight: 500,
  },
  absent: {
    color: tone.tintMuted,
  },
  keepWords: {
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
  note: {
    marginInlineStart: 6,
    fontSize: 13,
    color: tone.tintMuted,
  },
});

function FieldValue(props: { row: SheetRow }) {
  if (props.row.values.length === 0) return <span {...stylex.attrs(styles.absent)}>无</span>;
  if (props.row.kind === "lines") {
    return (
      <ul {...stylex.attrs(styles.lines, styles.description)}>
        {props.row.values.map((line) => (
          <li>{line}</li>
        ))}
      </ul>
    );
  }
  if (props.row.kind === "strong") {
    return <span {...stylex.attrs(styles.strong)}>{props.row.values.join(" · ")}</span>;
  }
  if (props.row.kind === "list") {
    return (
      <ul {...stylex.attrs(styles.lines)}>
        {props.row.values.map((entry) => {
          const { primary, note } = splitNote(entry);
          return (
            <li {...stylex.attrs(styles.keepWords)}>
              <span {...stylex.attrs(styles.strong)}>
                {primary.replaceAll(" / ", `${NO_BREAK_SPACE}/ `)}
              </span>
              {note && <span {...stylex.attrs(styles.note)}>{note}</span>}
            </li>
          );
        })}
      </ul>
    );
  }
  return <>{props.row.values.join("、")}</>;
}

function SheetMeta(props: {
  item: SolutionItem;
  previous: SolutionItem | undefined;
  next: SolutionItem | undefined;
  onStep: (id: string) => void;
}) {
  const area = () => areaOf(props.item.area);
  return (
    <div {...stylex.attrs(styles.sheetMeta)}>
      <p {...stylex.attrs(styles.sheetArea)}>
        <span>{area()?.label}</span>
        <span lang="en" {...stylex.attrs(styles.english)}>
          {area()?.englishLabel}
        </span>
      </p>
      <div {...stylex.attrs(styles.stepper)}>
        <p {...stylex.attrs(styles.sheetCount)}>
          {padIndex(AREA_POSITION.get(props.item.id) ?? 0)} / {padIndex(areaSize(props.item) - 1)}
        </p>
        <button
          type="button"
          aria-label="上一个方案"
          disabled={!props.previous}
          onClick={() => props.previous && props.onStep(props.previous.id)}
          {...stylex.attrs(styles.stepButton, !props.previous && styles.stepButtonDisabled)}
        >
          <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="下一个方案"
          disabled={!props.next}
          onClick={() => props.next && props.onStep(props.next.id)}
          {...stylex.attrs(styles.stepButton, !props.next && styles.stepButtonDisabled)}
        >
          <ChevronRight size={16} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function Sheet(props: { item: SolutionItem; titleId: string }) {
  return (
    <>
      <header {...stylex.attrs(styles.sheetHead)}>
        <h3 id={props.titleId} {...stylex.attrs(styles.sheetTitle)}>
          {props.item.title}
        </h3>
        <p {...stylex.attrs(styles.sheetSubtitle)}>{props.item.subtitle}</p>
      </header>
      <dl {...stylex.attrs(styles.fields)}>
        {sheetRows(props.item).map((row) => (
          <div {...stylex.attrs(styles.field)}>
            <dt {...stylex.attrs(styles.fieldLabel)}>{row.label}</dt>
            <dd {...stylex.attrs(styles.fieldValue)}>
              <FieldValue row={row} />
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function NameList(props: {
  items: SolutionItem[];
  selectedId: string | undefined;
  rovingId: string | undefined;
  sheetId: string;
  onChoose: (id: string) => void;
  onFocusItem: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  return (
    <ul {...stylex.attrs(styles.names)}>
      <For each={props.items}>
        {(item) => {
          const isSelected = () => item.id === props.selectedId;
          return (
            <li>
              <button
                type="button"
                data-solution-id={item.id}
                tabindex={item.id === props.rovingId ? 0 : -1}
                aria-current={isSelected() ? "true" : undefined}
                aria-controls={props.sheetId}
                onClick={() => props.onChoose(item.id)}
                onFocus={() => props.onFocusItem(item.id)}
                {...stylex.attrs(
                  styles.name,
                  isSelected() && styles.nameSelected,
                  stylex.defaultMarker(),
                )}
              >
                <Show when={isSelected()}>
                  <m.span
                    layoutId="atlas-pill"
                    transition={reduce() ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT }}
                    {...stylex.attrs(styles.pill)}
                  />
                </Show>
                <span {...stylex.attrs(styles.nameIndex, isSelected() && styles.nameIndexSelected)}>
                  {padIndex(AREA_POSITION.get(item.id) ?? 0)}
                </span>
                <span {...stylex.attrs(styles.nameText, isSelected() && styles.nameTextSelected)}>
                  {item.title}
                </span>
              </button>
            </li>
          );
        }}
      </For>
    </ul>
  );
}

export function AtlasVariant() {
  const browser = useSolutionsBrowser();
  const reduce = useReducedMotion();
  const uid = createUniqueId();
  const sheetId = `${uid}-sheet`;
  const titleId = `${uid}-title`;
  let matrix: HTMLDivElement | undefined;
  let sheet: HTMLElement | undefined;
  const [focusId, setFocusId] = createSignal(untrack(() => browser.selected?.id));
  const grouped = () => browser.area === "all";
  const columns = createMemo(() =>
    grouped() ? browser.groups.map((group) => group.items) : flowColumns(browser.scope),
  );
  const rovingId = () =>
    browser.scope.some((item) => item.id === focusId()) ? focusId() : browser.selected?.id;
  const currentArea = () => (grouped() ? undefined : browser.groups[0]);

  const choose = (id: string) => {
    browser.select(id);
    setFocusId(id);
    if (!sheet) return;
    const top = sheet.getBoundingClientRect().top;
    if (top >= HEADER_OFFSET && top <= window.innerHeight - BOTTOM_CLEARANCE) return;
    window.scrollTo({
      top: window.scrollY + top - HEADER_OFFSET - SHEET_GAP,
      behavior: reduce() ? "instant" : "smooth",
    });
  };

  const step = (id: string) => {
    browser.select(id);
    setFocusId(id);
  };

  const navigate: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (event) => {
    const id = (event.target as HTMLElement).dataset.solutionId;
    if (!id) return;
    const cols = columns();
    const column = cols.findIndex((entries) => entries.some((item) => item.id === id));
    const entries = cols[column];
    if (!entries) return;
    const row = entries.findIndex((item) => item.id === id);
    const across = (offset: number) => {
      const target = cols[column + offset];
      return target?.[Math.min(row, target.length - 1)];
    };
    const moves: Partial<Record<string, () => SolutionItem | undefined>> = {
      ArrowDown: () => entries[row + 1] ?? cols[column + 1]?.[0],
      ArrowUp: () => entries[row - 1] ?? cols[column - 1]?.at(-1),
      ArrowRight: () => across(1),
      ArrowLeft: () => across(-1),
      Home: () => cols[0]?.[0],
      End: () => cols.at(-1)?.at(-1),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const next = move();
    if (!next) return;
    setFocusId(next.id);
    matrix?.querySelector<HTMLElement>(`[data-solution-id="${next.id}"]`)?.focus();
  };

  const listProps = {
    get selectedId() {
      return browser.selected?.id;
    },
    get rovingId() {
      return rovingId();
    },
    sheetId,
    onChoose: choose,
    onFocusItem: (id: string) => {
      setFocusId(id);
    },
  };

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <LayoutGroup id={`atlas-${browser.area}`}>
        <Show when={browser.area} keyed>
          {(_area) => (
            <div
              ref={matrix}
              role="group"
              aria-label="应用方案索引"
              onKeyDown={navigate}
              {...stylex.attrs(styles.matrix, styles.fadeIn)}
            >
              <Show
                when={currentArea()}
                fallback={
                  <div {...stylex.attrs(styles.areaGrid)}>
                    <For each={browser.groups}>
                      {(group) => {
                        const active = () => group.id === browser.selected?.area;
                        return (
                          <section
                            aria-labelledby={`${uid}-${group.id}`}
                            {...stylex.attrs(styles.column)}
                          >
                            <header
                              {...stylex.attrs(styles.colHead, active() && styles.colHeadActive)}
                            >
                              <h3
                                id={`${uid}-${group.id}`}
                                {...stylex.attrs(
                                  styles.colLabel,
                                  active() && styles.colLabelActive,
                                )}
                              >
                                {group.label}
                              </h3>
                              <span {...stylex.attrs(styles.colCount)}>
                                {group.items.length} 款
                              </span>
                              <p lang="en" {...stylex.attrs(styles.colEnglish)}>
                                {group.englishLabel}
                              </p>
                            </header>
                            <NameList items={group.items} {...listProps} />
                          </section>
                        );
                      }}
                    </For>
                  </div>
                }
              >
                {(area) => (
                  <section aria-labelledby={`${uid}-${area().id}`}>
                    <header {...stylex.attrs(styles.colHead, styles.colHeadActive)}>
                      <h3
                        id={`${uid}-${area().id}`}
                        {...stylex.attrs(styles.colLabel, styles.colLabelActive)}
                      >
                        {area().label}
                      </h3>
                      <span {...stylex.attrs(styles.colCount)}>{area().items.length} 款</span>
                      <p lang="en" {...stylex.attrs(styles.colEnglish)}>
                        {area().englishLabel}
                      </p>
                    </header>
                    <div {...stylex.attrs(styles.flowGrid)}>
                      <For each={columns()}>
                        {(items) => <NameList items={items} {...listProps} />}
                      </For>
                    </div>
                  </section>
                )}
              </Show>
            </div>
          )}
        </Show>
      </LayoutGroup>
      <article ref={sheet} id={sheetId} aria-labelledby={titleId} {...stylex.attrs(styles.sheet)}>
        <Show when={browser.selected}>
          {(selected) => (
            <>
              <SheetMeta
                item={selected()}
                previous={browser.scope[browser.position - 1]}
                next={browser.scope[browser.position + 1]}
                onStep={step}
              />
              <Show when={selected()} keyed>
                {(item) => (
                  <div {...stylex.attrs(styles.fadeIn)}>
                    <Sheet item={item} titleId={titleId} />
                  </div>
                )}
              </Show>
            </>
          )}
        </Show>
      </article>
    </LabSection>
  );
}
