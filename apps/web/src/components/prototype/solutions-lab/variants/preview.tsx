import * as stylex from "@stylexjs/stylex";
import { m } from "motion/react";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import {
  AreaChips,
  LabSection,
  areaOf,
  padIndex,
  sheetRows,
  useSolutionsBrowser,
  type SheetRow,
} from "../kit";
import { bp, depth, face, motion, tone } from "../tokens.stylex";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const INTENT_MS = 90;
const SOFT_SURFACE = "rgba(255, 255, 255, 0.62)";
const NO_BREAK_SPACE = String.fromCharCode(0xa0);
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match
    ? { primary: match[1] ?? text, note: match[2] ?? null }
    : { primary: text, note: null };
};

const TAB_STEPS: Record<string, (index: number, count: number) => number> = {
  ArrowDown: (index, count) => (index + 1) % count,
  ArrowRight: (index, count) => (index + 1) % count,
  ArrowUp: (index, count) => (index - 1 + count) % count,
  ArrowLeft: (index, count) => (index - 1 + count) % count,
  Home: () => 0,
  End: (_, count) => count - 1,
};

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  browser: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.lg]: "300px minmax(0, 1fr)",
      [bp.xl]: "340px minmax(0, 1fr)",
    },
    rowGap: 12,
    marginTop: { default: 16, [bp.xl]: 24 },
    height: { default: "auto", [bp.lg]: 640, [bp.xl]: 680 },
    overflow: { default: "visible", [bp.lg]: "hidden" },
    borderWidth: { default: 0, [bp.lg]: 1 },
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: { default: 0, [bp.lg]: 16 },
    backgroundColor: { default: "transparent", [bp.lg]: tone.paper },
    boxShadow: { default: "none", [bp.lg]: depth.card },
  },
  railFrame: {
    position: "relative",
    minWidth: 0,
    backgroundColor: { default: "transparent", [bp.lg]: tone.tintFill },
    borderInlineEndWidth: { default: 0, [bp.lg]: 1 },
    borderInlineEndStyle: "solid",
    borderInlineEndColor: tone.tintRuleSoft,
  },
  rail: {
    position: { default: "relative", [bp.lg]: "absolute" },
    inset: { default: "auto", [bp.lg]: 0 },
    display: { default: "flex", [bp.lg]: "block" },
    alignItems: "center",
    gap: 2,
    paddingTop: { default: 4, [bp.lg]: 8 },
    paddingBottom: { default: 4, [bp.lg]: 20 },
    paddingInline: { default: 4, [bp.lg]: 10 },
    scrollPaddingInline: 4,
    scrollPaddingTop: { default: 0, [bp.lg]: 48 },
    overflowX: { default: "auto", [bp.lg]: "hidden" },
    overflowY: { default: "hidden", [bp.lg]: "auto" },
    overscrollBehaviorX: { default: "contain", [bp.lg]: "auto" },
    overscrollBehaviorY: { default: "auto", [bp.lg]: "contain" },
    scrollbarWidth: "none",
    borderRadius: { default: 12, [bp.lg]: 0 },
    backgroundColor: { default: tone.tintFill, [bp.lg]: "transparent" },
  },
  railGroup: {
    display: { default: "contents", [bp.lg]: "block" },
  },
  railHeading: {
    position: { default: "static", [bp.lg]: "sticky" },
    top: 0,
    zIndex: 2,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 8,
    flexShrink: 0,
    marginBlock: 0,
    marginInline: { default: 0, [bp.lg]: -10 },
    paddingInlineStart: { default: 12, [bp.lg]: 24 },
    paddingInlineEnd: { default: 8, [bp.lg]: 24 },
    paddingTop: { default: 0, [bp.lg]: 14 },
    paddingBottom: { default: 0, [bp.lg]: 6 },
    borderInlineStartWidth: { default: 1, [bp.lg]: 0 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: tone.tintRule,
    backgroundColor: { default: "transparent", [bp.lg]: tone.tintFill },
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
    color: tone.tintMuted,
  },
  railHeadingFirst: {
    paddingInlineStart: { default: 8, [bp.lg]: 24 },
    borderInlineStartWidth: 0,
  },
  railHeadingCount: {
    display: { default: "none", [bp.lg]: "inline" },
    fontWeight: 400,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
  },
  tab: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: { default: "auto auto", [bp.lg]: "22px minmax(0, 1fr) 6px" },
    alignItems: "baseline",
    columnGap: { default: 8, [bp.lg]: 12 },
    flexShrink: 0,
    width: { default: "auto", [bp.lg]: "100%" },
    paddingBlock: { default: 8, [bp.lg]: 12 },
    paddingInline: 14,
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: { default: 9, [bp.lg]: 12 },
    backgroundColor: {
      default: "transparent",
      ":hover": { default: "transparent", [bp.hover]: SOFT_SURFACE },
    },
    fontFamily: "inherit",
    textAlign: "start",
    color: tone.tintInk,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "120ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: -2,
  },
  tabPeeked: {
    backgroundColor: SOFT_SURFACE,
  },
  tabPinned: {
    cursor: "default",
  },
  pinSurface: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    borderRadius: { default: 9, [bp.lg]: 12 },
    backgroundColor: tone.paper,
    boxShadow: depth.lift,
  },
  tabIndex: {
    position: "relative",
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  tabIndexPinned: {
    color: tone.ink,
  },
  tabText: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  tabTitle: {
    maxWidth: { default: "16em", [bp.lg]: "none" },
    overflow: { default: "hidden", [bp.lg]: "visible" },
    fontSize: { default: 14, [bp.lg]: 15 },
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    whiteSpace: { default: "nowrap", [bp.lg]: "normal" },
    textOverflow: "ellipsis",
    textWrap: "pretty",
    color: {
      default: tone.tintInk,
      [stylex.when.ancestor(":hover")]: { default: tone.tintInk, [bp.hover]: tone.accent },
    },
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "120ms" },
    transitionTimingFunction: motion.easeOut,
  },
  tabTitlePinned: {
    color: tone.ink,
  },
  tabMeta: {
    display: { default: "none", [bp.lg]: "block" },
    overflow: "hidden",
    fontSize: 13,
    lineHeight: "20px",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  pinDot: {
    position: "relative",
    display: { default: "none", [bp.lg]: "block" },
    alignSelf: "start",
    width: 6,
    height: 6,
    marginTop: 8,
    borderRadius: 999,
    backgroundColor: tone.ink,
  },
  sheet: {
    position: "relative",
    minWidth: 0,
    overflowY: { default: "visible", [bp.lg]: "auto" },
    overscrollBehaviorY: { default: "auto", [bp.lg]: "contain" },
    paddingInline: { default: 20, [bp.md]: 40, [bp.xl]: 48 },
    paddingTop: { default: 24, [bp.md]: 36, [bp.xl]: 44 },
    paddingBottom: { default: 12, [bp.md]: 28 },
    borderWidth: { default: 1, [bp.lg]: 0 },
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: { default: 12, [bp.lg]: 0 },
    backgroundColor: tone.paper,
    boxShadow: { default: depth.card, [bp.lg]: "none" },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: -2,
  },
  panel: {
    minWidth: 0,
    animationName: { default: "none", [bp.motionOk]: fadeIn },
    animationDuration: "140ms",
    animationTimingFunction: motion.easeOut,
  },
  sheetHead: {
    paddingBottom: { default: 20, [bp.md]: 28 },
  },
  sheetMeta: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    height: 20,
    marginTop: 0,
    marginBottom: 12,
  },
  sheetArea: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  previewTag: {
    display: "inline-flex",
    alignItems: "center",
    height: 20,
    paddingInline: 8,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: 999,
    fontSize: 12,
    lineHeight: "18px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
    animationName: { default: "none", [bp.motionOk]: fadeIn },
    animationDuration: "120ms",
    animationTimingFunction: motion.easeOut,
  },
  sheetTitle: {
    margin: 0,
    fontSize: { default: 20, [bp.md]: 24 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.04em",
    color: tone.tintInk,
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
    borderTopColor: tone.tintRuleSoft,
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
  muted: {
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

function RowValue({ row }: { row: SheetRow }) {
  if (row.values.length === 0) return <span {...stylex.props(styles.absent)}>无</span>;
  if (row.kind === "strong") {
    return <span {...stylex.props(styles.strong)}>{row.values.join(" · ")}</span>;
  }
  if (row.kind === "lines") {
    return (
      <ul {...stylex.props(styles.lines, styles.muted)}>
        {row.values.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    );
  }
  if (row.kind === "list") {
    return (
      <ul {...stylex.props(styles.lines)}>
        {row.values.map((value) => {
          const { primary, note } = splitNote(value);
          return (
            <li key={value} {...stylex.props(styles.keepWords)}>
              <span {...stylex.props(styles.strong)}>
                {primary.replaceAll(" / ", `${NO_BREAK_SPACE}/ `)}
              </span>
              {note && <span {...stylex.props(styles.note)}>{note}</span>}
            </li>
          );
        })}
      </ul>
    );
  }
  return <>{row.values.join("、")}</>;
}

export function PreviewVariant() {
  const browser = useSolutionsBrowser();
  const { area, scope, groups, selected, position, select } = browser;
  const uid = useId();
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const intentTimer = useRef<number | undefined>(undefined);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const preview = previewId ? scope.find((item) => item.id === previewId) : undefined;
  const shown = preview ?? selected;
  const isPreviewing = preview !== undefined && preview.id !== selected?.id;

  useEffect(() => () => window.clearTimeout(intentTimer.current), []);

  useEffect(() => {
    const rail = railRef.current;
    const tab = rail?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!rail || !tab) return;
    const behavior = reduce ? "auto" : "smooth";
    if (rail.scrollWidth > rail.clientWidth + 1) {
      const left = tab.offsetLeft - (rail.clientWidth - tab.offsetWidth) / 2;
      rail.scrollTo({ left: Math.max(0, left), behavior });
      return;
    }
    const visibleTop =
      rail.scrollTop + (Number.parseFloat(getComputedStyle(rail).scrollPaddingTop) || 0);
    const visibleBottom = rail.scrollTop + rail.clientHeight;
    if (tab.offsetTop >= visibleTop && tab.offsetTop + tab.offsetHeight <= visibleBottom) return;
    const top = tab.offsetTop - (rail.clientHeight - tab.offsetHeight) / 2;
    rail.scrollTo({ top: Math.max(0, top), behavior });
  }, [area, selected?.id, reduce]);

  useLayoutEffect(() => {
    sheetRef.current?.scrollTo({ top: 0 });
  }, [shown?.id]);

  if (!selected || !shown) return null;

  const cancelIntent = () => {
    window.clearTimeout(intentTimer.current);
    intentTimer.current = undefined;
  };

  const intend = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    if (event.pointerType !== "mouse") return;
    cancelIntent();
    intentTimer.current = window.setTimeout(() => setPreviewId(id), INTENT_MS);
  };

  const endPreview = () => {
    cancelIntent();
    setPreviewId(null);
  };

  const pin = (id: string) => {
    cancelIntent();
    select(id);
    setPreviewId(null);
  };

  const handleRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && previewId !== null) {
      endPreview();
      return;
    }
    const step = TAB_STEPS[event.key];
    if (!step || event.metaKey || event.ctrlKey || event.altKey) return;
    event.preventDefault();
    event.stopPropagation();
    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'));
    const current = tabs.indexOf(document.activeElement as HTMLElement);
    tabs[step(current === -1 ? position : current, tabs.length)]?.focus();
  };

  const handleRailBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    cancelIntent();
    setPreviewId(null);
  };

  const isAll = area === "all";

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <div {...stylex.props(styles.browser)}>
        <div {...stylex.props(styles.railFrame)}>
          <m.div
            ref={railRef}
            layoutScroll
            role="tablist"
            aria-label="应用方案"
            aria-orientation="vertical"
            onKeyDown={handleRailKeyDown}
            onPointerLeave={endPreview}
            onBlur={handleRailBlur}
            {...stylex.props(styles.rail)}
          >
            {groups.map((group, groupIndex) => (
              <div key={group.id} role="none" {...stylex.props(styles.railGroup)}>
                {isAll && (
                  <p
                    aria-hidden="true"
                    {...stylex.props(
                      styles.railHeading,
                      groupIndex === 0 && styles.railHeadingFirst,
                    )}
                  >
                    {group.label}
                    <span {...stylex.props(styles.railHeadingCount)}>{group.items.length} 款</span>
                  </p>
                )}
                {group.items.map((item) => {
                  const isPinned = item.id === selected.id;
                  const isPeeked = isPreviewing && item.id === shown.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      id={`${uid}-tab-${item.id}`}
                      aria-selected={isPinned}
                      aria-controls={`${uid}-panel`}
                      tabIndex={isPinned ? 0 : -1}
                      onClick={() => pin(item.id)}
                      onPointerEnter={(event) => intend(event, item.id)}
                      onPointerLeave={cancelIntent}
                      onFocus={(event) => {
                        if (event.currentTarget.matches(":focus-visible")) setPreviewId(item.id);
                      }}
                      {...stylex.props(
                        styles.tab,
                        isPeeked && styles.tabPeeked,
                        isPinned && styles.tabPinned,
                        stylex.defaultMarker(),
                      )}
                    >
                      {isPinned && (
                        <m.span
                          layoutId={`${uid}-pin`}
                          transition={reduce ? { duration: 0 } : { duration: 0.2, ease: EASE_OUT }}
                          {...stylex.props(styles.pinSurface)}
                        />
                      )}
                      <span {...stylex.props(styles.tabIndex, isPinned && styles.tabIndexPinned)}>
                        {padIndex(scope.indexOf(item))}
                      </span>
                      <span {...stylex.props(styles.tabText)}>
                        <span {...stylex.props(styles.tabTitle, isPinned && styles.tabTitlePinned)}>
                          {item.title}
                        </span>
                        <span {...stylex.props(styles.tabMeta)}>{item.functions.join(" · ")}</span>
                      </span>
                      {isPinned && <span aria-hidden="true" {...stylex.props(styles.pinDot)} />}
                    </button>
                  );
                })}
              </div>
            ))}
          </m.div>
        </div>
        <div
          ref={sheetRef}
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${shown.id}`}
          tabIndex={0}
          {...stylex.props(styles.sheet)}
        >
          <div key={shown.id} {...stylex.props(styles.panel)}>
            <header {...stylex.props(styles.sheetHead)}>
              <p {...stylex.props(styles.sheetMeta)}>
                <span {...stylex.props(styles.sheetArea)}>{areaOf(shown.area)?.label}</span>
                {isPreviewing && <span {...stylex.props(styles.previewTag)}>预览</span>}
              </p>
              <h3 {...stylex.props(styles.sheetTitle)}>{shown.title}</h3>
              <p {...stylex.props(styles.sheetSubtitle)}>{shown.subtitle}</p>
            </header>
            <dl {...stylex.props(styles.fields)}>
              {sheetRows(shown).map((row) => (
                <div key={row.label} {...stylex.props(styles.field)}>
                  <dt {...stylex.props(styles.fieldLabel)}>{row.label}</dt>
                  <dd {...stylex.props(styles.fieldValue)}>
                    <RowValue row={row} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </LabSection>
  );
}
