import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Check, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";

import { SOLUTION_AREAS, type SolutionAreaId, type SolutionItem } from "./products-data";

export type AreaFilter = SolutionAreaId | "all";

const TINT_INK = "oklch(0.26 0.035 261.5)";
const TINT_BODY = "oklch(0.44 0.025 261.5)";
const TINT_MUTED = "oklch(0.52 0.02 261.5)";
const TINT_RULE_SOFT = "oklch(0.424 0.18 261.5 / 0.08)";
const TINT_FILL = "oklch(0.965 0.009 261.5)";
const BACKDROP = "oklch(0.22 0.04 261.5 / 0.36)";
const FRAME_SHADOW = "0 2px 6px rgba(7, 26, 74, 0.06), 0 32px 72px -24px rgba(7, 26, 74, 0.36)";
const ACCENT = colors.brandBlue700;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

const MD = breakpoints.md;
const HOVER = "@media (hover: hover) and (pointer: fine)";
const FRAME_TOP = "max(48px, 10dvh)";

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const riseIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(8px) scale(0.985)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  dialog: {
    width: "100vw",
    height: "100dvh",
    maxWidth: "none",
    maxHeight: "none",
    margin: 0,
    padding: 0,
    borderWidth: 0,
    overflow: "hidden",
    backgroundColor: "transparent",
    outlineStyle: "none",
    "::backdrop": {
      backgroundColor: BACKDROP,
      animationName: fadeIn,
      animationDuration: "200ms",
      animationTimingFunction: EASE_OUT_CSS,
    },
  },
  dismiss: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "default",
  },
  frame: {
    position: "absolute",
    insetInline: 0,
    top: { default: 0, [MD]: FRAME_TOP },
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    width: { default: "100%", [MD]: "min(880px, calc(100vw - 64px))" },
    height: { default: "100dvh", [MD]: `min(680px, calc(100dvh - ${FRAME_TOP} - 48px))` },
    marginInline: "auto",
    overflow: "hidden",
    borderRadius: { default: 0, [MD]: 16 },
    backgroundColor: colors.paper,
    boxShadow: FRAME_SHADOW,
    color: TINT_INK,
    animationName: { default: fadeIn, [breakpoints.motionOk]: riseIn },
    animationDuration: "220ms",
    animationTimingFunction: EASE_OUT_CSS,
  },
  head: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    flexShrink: 0,
    paddingInline: { default: 16, [MD]: 24 },
    paddingTop: { default: 12, [MD]: 20 },
    paddingBottom: { default: 12, [MD]: 16 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: TINT_RULE_SOFT,
  },
  searchRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  searchField: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    minWidth: 0,
    gap: 10,
    height: 48,
    paddingInlineStart: 16,
    paddingInlineEnd: 6,
    boxSizing: "border-box",
    borderRadius: 999,
    backgroundColor: TINT_FILL,
    color: TINT_MUTED,
    outlineStyle: { default: "none", ":focus-within": "solid" },
    outlineWidth: 2,
    outlineColor: ACCENT,
    outlineOffset: 0,
  },
  searchInput: {
    flexGrow: 1,
    minWidth: 0,
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 16,
    color: TINT_INK,
    outlineStyle: "none",
    "::placeholder": { color: TINT_MUTED },
  },
  iconButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 36,
    height: 36,
    padding: 0,
    borderWidth: 0,
    borderRadius: 999,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: "transparent", [HOVER]: TINT_FILL },
    },
    color: TINT_BODY,
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: ACCENT,
    outlineOffset: 0,
  },
  clearButton: {
    width: 32,
    height: 32,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: "transparent", [HOVER]: colors.paper },
    },
  },
  closeButton: {
    width: 44,
    height: 44,
  },
  chips: {
    display: "flex",
    gap: 6,
    marginInline: { default: -16, [MD]: 0 },
    paddingInline: { default: 16, [MD]: 0 },
    overflowX: "auto",
    scrollbarWidth: "none",
    overscrollBehaviorX: "contain",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    gap: 6,
    height: 32,
    paddingInline: 12,
    borderWidth: 0,
    borderRadius: 999,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: "transparent", [HOVER]: TINT_FILL },
    },
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    color: TINT_BODY,
    whiteSpace: "nowrap",
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "150ms" },
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: ACCENT,
    outlineOffset: 0,
    ":disabled": { color: TINT_MUTED, opacity: 0.5, cursor: "default" },
  },
  chipActive: {
    backgroundColor: ACCENT,
    color: colors.paper,
    cursor: "default",
  },
  chipCount: {
    fontSize: 12,
    fontWeight: 400,
    fontVariantNumeric: "tabular-nums",
    opacity: 0.72,
  },
  body: {
    flexGrow: 1,
    minHeight: 0,
    overflowY: "auto",
    overscrollBehavior: "contain",
    paddingInline: { default: 8, [MD]: 16 },
    paddingBottom: 16,
  },
  group: {
    paddingTop: 12,
  },
  groupHead: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    margin: 0,
    paddingInline: 12,
    paddingBlock: 8,
    backgroundColor: colors.paper,
    fontSize: 13,
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: TINT_INK,
  },
  groupCount: {
    fontWeight: 400,
    fontVariantNumeric: "tabular-nums",
    color: TINT_MUTED,
  },
  options: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    columnCount: { default: 1, [MD]: 2 },
    columnGap: 8,
  },
  optionItem: {
    breakInside: "avoid",
    paddingBottom: 2,
  },
  option: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 20px",
    alignItems: "center",
    columnGap: 12,
    width: "100%",
    paddingBlock: 10,
    paddingInline: 12,
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: "transparent", [HOVER]: TINT_FILL },
    },
    fontFamily: "inherit",
    textAlign: "start",
    color: TINT_INK,
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: ACCENT,
    outlineOffset: -2,
  },
  optionSelected: {
    backgroundColor: colors.brandBlue50,
  },
  optionText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    textWrap: "pretty",
  },
  optionTitleSelected: {
    color: ACCENT,
  },
  optionSub: {
    overflow: "hidden",
    fontSize: 13,
    lineHeight: "20px",
    color: TINT_MUTED,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  optionHint: {
    color: ACCENT,
  },
  check: {
    color: ACCENT,
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    paddingBlock: 64,
    paddingInline: 16,
    textAlign: "center",
  },
  emptyText: {
    margin: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: TINT_BODY,
    textWrap: "balance",
  },
  emptyAction: {
    height: 40,
    paddingInline: 16,
    borderWidth: 0,
    borderRadius: 999,
    backgroundColor: {
      default: TINT_FILL,
      ":hover": { default: TINT_FILL, [HOVER]: colors.brandBlue100 },
    },
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    color: ACCENT,
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: ACCENT,
    outlineOffset: 2,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
});

const haystack = (item: SolutionItem) =>
  [
    item.title,
    item.englishName,
    item.subtitle,
    ...item.functions,
    ...item.keyIngredients,
    ...item.applications,
    ...item.texture,
  ]
    .join(" ")
    .toLowerCase();

const ingredientHint = (item: SolutionItem, query: string) => {
  if (!query) return null;
  if (item.title.toLowerCase().includes(query) || item.subtitle.toLowerCase().includes(query)) {
    return null;
  }
  return item.keyIngredients.find((ingredient) => ingredient.toLowerCase().includes(query)) ?? null;
};

const OPTION_SELECTOR = "[data-solution-option]";

export function SolutionDialog({
  solutions,
  selectedId,
  initialArea,
  onSelect,
  onClose,
}: {
  solutions: SolutionItem[];
  selectedId: string;
  initialArea: AreaFilter;
  onSelect: (id: string, area: AreaFilter) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const composing = useRef(false);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<AreaFilter>(initialArea);

  const searchIndex = useMemo(
    () => new Map(solutions.map((item) => [item.id, haystack(item)])),
    [solutions],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLElement>('[aria-current="true"]')?.scrollIntoView({ block: "center" });
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
    else dialog.focus();

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  const needle = query.trim().toLowerCase();
  const matches = needle
    ? solutions.filter((item) => searchIndex.get(item.id)?.includes(needle))
    : solutions;
  const shown = area === "all" ? matches : matches.filter((item) => item.area === area);
  const groups = SOLUTION_AREAS.map((entry) => ({
    area: entry,
    items: shown.filter((item) => item.area === entry.id),
  })).filter((group) => group.items.length > 0);
  const areaLabel = SOLUTION_AREAS.find((entry) => entry.id === area)?.label;

  const choose = (id: string) => {
    onSelect(id, area);
    dialogRef.current?.close();
  };

  const clearSearch = () => {
    setDraft("");
    setQuery("");
    inputRef.current?.focus();
  };

  const focusOption = (target: "first" | "last" | 1 | -1) => {
    const options = Array.from(
      bodyRef.current?.querySelectorAll<HTMLButtonElement>(OPTION_SELECTOR) ?? [],
    );
    if (options.length === 0) return;
    if (target === "first") return options[0]?.focus();
    if (target === "last") return options.at(-1)?.focus();
    const current = options.indexOf(document.activeElement as HTMLButtonElement);
    const next = current + target;
    if (next < 0) return inputRef.current?.focus();
    options[Math.min(next, options.length - 1)]?.focus();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption("first");
    }
    if (event.key === "Enter" && shown[0]) {
      event.preventDefault();
      choose(shown[0].id);
    }
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, "first" | "last" | 1 | -1> = {
      ArrowDown: 1,
      ArrowUp: -1,
      Home: "first",
      End: "last",
    };
    const move = moves[event.key];
    if (move === undefined || !(event.target as HTMLElement).matches(OPTION_SELECTOR)) return;
    event.preventDefault();
    focusOption(move);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="选择应用方案"
      tabIndex={-1}
      onClose={onClose}
      onCancel={(event) => {
        if (!draft) return;
        event.preventDefault();
        clearSearch();
      }}
      {...stylex.props(styles.dialog)}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => dialogRef.current?.close()}
        {...stylex.props(styles.dismiss)}
      />
      <div {...stylex.props(styles.frame)}>
        <div {...stylex.props(styles.head)}>
          <div {...stylex.props(styles.searchRow)}>
            <div {...stylex.props(styles.searchField)}>
              <Search size={18} strokeWidth={1.75} aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={draft}
                enterKeyHint="search"
                autoComplete="off"
                spellCheck={false}
                aria-label="搜索应用方案"
                placeholder="搜索方案名称、成分或功能"
                onChange={(event) => {
                  setDraft(event.target.value);
                  if (!composing.current) setQuery(event.target.value);
                }}
                onCompositionStart={() => {
                  composing.current = true;
                }}
                onCompositionEnd={(event) => {
                  composing.current = false;
                  setQuery(event.currentTarget.value);
                }}
                onKeyDown={handleInputKeyDown}
                {...stylex.props(styles.searchInput)}
              />
              {draft && (
                <button
                  type="button"
                  aria-label="清除搜索"
                  onClick={clearSearch}
                  {...stylex.props(styles.iconButton, styles.clearButton)}
                >
                  <X size={16} strokeWidth={1.75} aria-hidden="true" />
                </button>
              )}
            </div>
            <button
              type="button"
              aria-label="关闭"
              onClick={() => dialogRef.current?.close()}
              {...stylex.props(styles.iconButton, styles.closeButton)}
            >
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <div role="group" aria-label="按应用领域筛选" {...stylex.props(styles.chips)}>
            {[{ id: "all" as const, label: "全部" }, ...SOLUTION_AREAS].map((entry) => {
              const count =
                entry.id === "all"
                  ? matches.length
                  : matches.filter((item) => item.area === entry.id).length;
              const isActive = area === entry.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  aria-pressed={isActive}
                  disabled={count === 0 && !isActive}
                  onClick={() => setArea(entry.id)}
                  {...stylex.props(styles.chip, isActive && styles.chipActive)}
                >
                  {entry.label}
                  <span {...stylex.props(styles.chipCount)}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div ref={bodyRef} onKeyDown={handleListKeyDown} {...stylex.props(styles.body)}>
          <p aria-live="polite" {...stylex.props(styles.srOnly)}>
            {needle || area !== "all" ? `找到 ${shown.length} 款方案` : ""}
          </p>
          {groups.map(({ area: group, items }) => (
            <section key={group.id} {...stylex.props(styles.group)}>
              <h3 {...stylex.props(styles.groupHead)}>
                {group.label}
                <span {...stylex.props(styles.groupCount)}>{items.length}</span>
              </h3>
              <ul {...stylex.props(styles.options)}>
                {items.map((item) => {
                  const isSelected = item.id === selectedId;
                  const hint = ingredientHint(item, needle);
                  return (
                    <li key={item.id} {...stylex.props(styles.optionItem)}>
                      <button
                        type="button"
                        data-solution-option=""
                        aria-current={isSelected ? "true" : undefined}
                        onClick={() => choose(item.id)}
                        {...stylex.props(styles.option, isSelected && styles.optionSelected)}
                      >
                        <span {...stylex.props(styles.optionText)}>
                          <span
                            {...stylex.props(
                              styles.optionTitle,
                              isSelected && styles.optionTitleSelected,
                            )}
                          >
                            {item.title}
                          </span>
                          <span
                            {...stylex.props(styles.optionSub, hint !== null && styles.optionHint)}
                          >
                            {hint ? `含 ${hint}` : item.subtitle}
                          </span>
                        </span>
                        {isSelected && (
                          <Check
                            size={18}
                            strokeWidth={2}
                            aria-hidden="true"
                            {...stylex.props(styles.check)}
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
          {shown.length === 0 && (
            <div {...stylex.props(styles.empty)}>
              {area !== "all" && matches.length > 0 ? (
                <>
                  <p {...stylex.props(styles.emptyText)}>
                    {areaLabel}中没有匹配“{draft.trim()}”的方案
                  </p>
                  <button
                    type="button"
                    onClick={() => setArea("all")}
                    {...stylex.props(styles.emptyAction)}
                  >
                    查看全部 {matches.length} 个结果
                  </button>
                </>
              ) : (
                <>
                  <p {...stylex.props(styles.emptyText)}>没有匹配“{draft.trim()}”的方案</p>
                  <button type="button" onClick={clearSearch} {...stylex.props(styles.emptyAction)}>
                    清除搜索
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
