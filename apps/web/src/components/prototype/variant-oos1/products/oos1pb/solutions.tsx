import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { m } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";
import { frame } from "./frame";
import { blush, font, ink, layout, mq } from "./theme.stylex";

const MD = breakpoints.md;
const LG = breakpoints.lg;
const DESKTOP = breakpoints.xl;
const WIDE_QUERY = "(min-width: 1024px)";
const SHEET_PAD = { default: 20, [MD]: 32, [DESKTOP]: 40 } as const;
const COUNT = SOLUTION_ITEMS.length;

type SectionKey = "overview" | "ingredients" | "challenges" | "usage";

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "overview", label: "概述" },
  { key: "ingredients", label: "功能性成分" },
  { key: "challenges", label: "配方挑战" },
  { key: "usage", label: "质地与应用" },
];

const hasSection = (item: SolutionItem, key: SectionKey) =>
  key !== "challenges" || item.challenges.length > 0;

const wrapIndex = (index: number) => (index + COUNT) % COUNT;

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useWideLayout() {
  return useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true,
  );
}

const styles = stylex.create({
  ground: {
    backgroundColor: blush.ground,
  },
  head: {
    marginBottom: { default: 24, [DESKTOP]: 40 },
  },
  layout: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    rowGap: 20,
    alignItems: "start",
    scrollMarginTop: 96,
  },
  list: {
    position: "relative",
    gridColumn: { default: "1 / -1", [LG]: "1 / 5" },
    alignSelf: { default: "start", [LG]: "stretch" },
    display: "flex",
    flexDirection: { default: "row", [LG]: "column" },
    gap: { default: 24, [LG]: 0 },
    marginInline: { default: -16, [mq.mdOnly]: -40, [LG]: 0 },
    paddingInline: { default: 16, [mq.mdOnly]: 40, [LG]: 0 },
    overflowX: { default: "auto", [LG]: "visible" },
    scrollbarWidth: "none",
    borderTopWidth: { default: 0, [LG]: 1 },
    borderTopStyle: "solid",
    borderTopColor: ink.primary,
    borderBottomWidth: { default: 1, [LG]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: blush.rule,
  },
  listTab: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexGrow: { default: 0, [LG]: 1 },
    flexShrink: 0,
    flexBasis: { default: "auto", [LG]: 0 },
    width: { default: "auto", [LG]: "100%" },
    minHeight: { default: 64, [LG]: 56 },
    paddingBlock: { default: 12, [LG]: 8 },
    paddingInline: { default: 0, [LG]: 16 },
    borderWidth: 0,
    borderBottomWidth: { default: 0, [LG]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: blush.rule,
    backgroundColor: { default: "transparent", ":hover": { default: null, [LG]: blush.hover } },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: ink.body, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineOffset: -2,
    "::after": {
      content: '""',
      position: "absolute",
      insetInlineStart: 0,
      insetInlineEnd: { default: 0, [LG]: "auto" },
      top: { default: "auto", [LG]: 0 },
      bottom: 0,
      width: { default: "auto", [LG]: 2 },
      height: { default: 2, [LG]: "auto" },
      backgroundColor: colors.brandGreen700,
      transform: { default: "scaleX(0)", [LG]: "scaleY(0)" },
      transformOrigin: { default: "left center", [LG]: "center top" },
      transitionProperty: "transform",
      transitionDuration: "240ms",
      transitionTimingFunction: layout.easeOut,
    },
  },
  listTabOn: {
    backgroundColor: { default: "transparent", [LG]: blush.paper },
    color: { default: ink.primary, ":hover": ink.primary },
    "::after": {
      transform: "none",
    },
  },
  listRow: {
    display: "flex",
    flexDirection: { default: "column", [LG]: "row" },
    alignItems: { default: "flex-start", [LG]: "baseline" },
    gap: { default: 2, [LG]: 16 },
  },
  listNumber: {
    flexShrink: 0,
    width: { default: "auto", [LG]: 24 },
    fontFamily: font.numeral,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ink.muted,
  },
  listNumberOn: {
    color: colors.brandGreen700,
  },
  listTitle: {
    fontSize: { default: 14, [LG]: 15 },
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
  },
  listTitleOn: {
    fontWeight: 500,
  },
  sheet: {
    gridColumn: { default: "1 / -1", [LG]: "5 / 13" },
    backgroundColor: blush.paper,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: blush.edge,
    boxShadow: "0 1px 2px rgba(74, 32, 52, 0.04)",
  },
  sheetHead: {
    paddingInline: SHEET_PAD,
    paddingTop: { default: 24, [MD]: 32 },
    paddingBottom: 24,
  },
  eyebrow: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    margin: 0,
    fontFamily: font.numeral,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ink.muted,
  },
  eyebrowNumber: {
    color: colors.brandGreen700,
  },
  sheetTitle: {
    margin: 0,
    marginTop: 8,
    fontSize: { default: 22, [DESKTOP]: 24 },
    fontWeight: 500,
    lineHeight: "32px",
    letterSpacing: "0.04em",
    color: ink.primary,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    marginTop: 6,
    maxWidth: "36em",
    fontSize: 15,
    lineHeight: "24px",
    color: ink.body,
    textWrap: "pretty",
  },
  functions: {
    display: "grid",
    gridTemplateColumns: { default: "auto minmax(0, 1fr)", [MD]: "112px minmax(0, 1fr)" },
    alignItems: "baseline",
    columnGap: { default: 16, [MD]: 24 },
    margin: 0,
    marginTop: 20,
  },
  functionsLabel: {
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.06em",
    color: ink.muted,
  },
  functionsValue: {
    minWidth: 0,
    margin: 0,
    overflow: "hidden",
  },
  functionsList: {
    display: "flex",
    flexWrap: "wrap",
    rowGap: 4,
    margin: 0,
    marginInlineStart: -13,
    padding: 0,
    listStyleType: "none",
  },
  functionsItem: {
    paddingInline: 12,
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: blush.rule,
    fontSize: 14,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: ink.primary,
    whiteSpace: "nowrap",
  },
  sectionTabs: {
    display: "flex",
    gap: { default: 20, [MD]: 32 },
    paddingInline: SHEET_PAD,
    overflowX: "auto",
    scrollbarWidth: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: blush.rule,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: blush.rule,
  },
  sectionTab: {
    position: "relative",
    flexShrink: 0,
    height: 48,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: { default: 14, [MD]: 15 },
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: { default: ink.muted, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineOffset: -2,
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 0,
      bottom: -1,
      height: 2,
      backgroundColor: colors.brandGreen700,
      transform: "scaleX(0)",
      transformOrigin: "left center",
      transitionProperty: "transform",
      transitionDuration: "240ms",
      transitionTimingFunction: layout.easeOut,
    },
  },
  sectionTabOn: {
    fontWeight: 500,
    color: { default: ink.primary, ":hover": ink.primary },
    "::after": {
      transform: "scaleX(1)",
    },
  },
  sectionTabOff: {
    color: { default: ink.disabled, ":hover": ink.disabled },
    cursor: "not-allowed",
  },
  panel: {
    minHeight: { default: 392, [MD]: 336 },
    paddingInline: SHEET_PAD,
    paddingTop: { default: 16, [MD]: 20 },
    paddingBottom: { default: 24, [MD]: 28 },
    outlineOffset: -2,
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: "112px minmax(0, 1fr)" },
    columnGap: 24,
    rowGap: 0,
  },
  fieldLabel: {
    paddingTop: { default: 4, [MD]: 9 },
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    color: ink.muted,
  },
  fieldValue: {
    minWidth: 0,
    margin: 0,
  },
  lines: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  line: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    paddingBlock: 7,
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: blush.rule,
    fontSize: 15,
    lineHeight: "26px",
    color: ink.primary,
    textWrap: "pretty",
  },
  lineNumber: {
    flexShrink: 0,
    width: 20,
    fontFamily: font.numeral,
    fontSize: 12,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: ink.muted,
  },
  pager: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: blush.rule,
  },
  pagerButton: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
    minHeight: 72,
    paddingBlock: 16,
    paddingInline: SHEET_PAD,
    borderWidth: 0,
    backgroundColor: { default: "transparent", ":hover": blush.ground },
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: ink.primary, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineOffset: -2,
  },
  pagerPrev: {
    borderInlineEndWidth: 1,
    borderInlineEndStyle: "solid",
    borderInlineEndColor: blush.rule,
  },
  pagerNext: {
    alignItems: "flex-end",
    textAlign: "end",
  },
  pagerLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    color: ink.muted,
  },
  pagerTitle: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    maxWidth: "100%",
    fontSize: { default: 14, [MD]: 15 },
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: "inherit",
  },
  pagerName: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  pagerNumber: {
    flexShrink: 0,
    fontFamily: font.numeral,
    fontSize: 12,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: ink.muted,
  },
});

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div {...stylex.props(styles.field)}>
      <dt {...stylex.props(styles.fieldLabel)}>{label}</dt>
      <dd {...stylex.props(styles.fieldValue)}>{children}</dd>
    </div>
  );
}

function Lines({ lines, numbered = false }: { lines: string[]; numbered?: boolean }) {
  return (
    <ul {...stylex.props(styles.lines)}>
      {lines.map((line, index) => (
        <li key={`${index}-${line}`} {...stylex.props(styles.line)}>
          {numbered && <span {...stylex.props(styles.lineNumber)}>{padIndex(index)}</span>}
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionBody({ item, section }: { item: SolutionItem; section: SectionKey }) {
  return (
    <dl {...stylex.props(styles.fields)}>
      {section === "overview" && (
        <Field label="概述">
          <Lines lines={item.overview} />
        </Field>
      )}
      {section === "ingredients" && (
        <Field label="功能性成分">
          <Lines lines={item.keyIngredients} />
        </Field>
      )}
      {section === "challenges" && (
        <Field label="配方挑战">
          <Lines lines={item.challenges} numbered />
        </Field>
      )}
      {section === "usage" && (
        <>
          <Field label="质地">
            <Lines lines={item.texture} />
          </Field>
          <Field label="应用">
            <Lines lines={item.applications} />
          </Field>
        </>
      )}
    </dl>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const wide = useWideLayout();
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [preferredSection, setPreferredSection] = useState<SectionKey>("overview");
  const [interacted, setInteracted] = useState(false);
  const layoutRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionTabs = useRef<Partial<Record<SectionKey, HTMLButtonElement | null>>>({});

  const item = SOLUTION_ITEMS[activeIndex];
  const section = hasSection(item, preferredSection) ? preferredSection : "overview";
  const available = SECTIONS.filter((entry) => hasSection(item, entry.key));
  const prev = SOLUTION_ITEMS[wrapIndex(activeIndex - 1)];
  const next = SOLUTION_ITEMS[wrapIndex(activeIndex + 1)];
  const tabId = (index: number) => `${baseId}-solution-${index}`;
  const sectionTabId = (key: SectionKey) => `${baseId}-section-${key}`;
  const sheetId = `${baseId}-sheet`;
  const panelId = `${baseId}-panel`;
  const enter = { duration: reduce ? 0 : 0.22, ease: EASE };
  const reveal = interacted ? { opacity: 0, y: 4 } : false;

  const selectSolution = (index: number) => {
    setInteracted(true);
    setActiveIndex(wrapIndex(index));
  };

  const selectSection = (key: SectionKey) => {
    setInteracted(true);
    setPreferredSection(key);
  };

  useEffect(() => {
    const row = listRef.current;
    const tab = listTabs.current[activeIndex];
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    const left = tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2;
    row.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [activeIndex, reduce]);

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? wrapIndex(activeIndex + 1)
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? wrapIndex(activeIndex - 1)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? COUNT - 1
              : null;
    if (target === null) return;
    event.preventDefault();
    selectSolution(target);
    listTabs.current[target]?.focus();
  };

  const onSectionKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const position = available.findIndex((entry) => entry.key === section);
    const size = available.length;
    const target =
      event.key === "ArrowRight"
        ? available[(position + 1) % size]
        : event.key === "ArrowLeft"
          ? available[(position - 1 + size) % size]
          : event.key === "Home"
            ? available[0]
            : event.key === "End"
              ? available[size - 1]
              : undefined;
    if (!target) return;
    event.preventDefault();
    selectSection(target.key);
    sectionTabs.current[target.key]?.focus();
  };

  const step = (delta: number) => {
    selectSolution(activeIndex + delta);
    const frameTarget = layoutRef.current;
    if (!frameTarget) return;
    if (frameTarget.getBoundingClientRect().top < 80) {
      frameTarget.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <section
      id="products-solutions"
      aria-labelledby="solutions-title"
      {...stylex.props(frame.section, styles.ground)}
    >
      <div {...stylex.props(frame.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id="solutions-title" {...stylex.props(frame.title)}>
            应用方案
          </h2>
        </header>
        <div ref={layoutRef} {...stylex.props(styles.layout)}>
          <div
            ref={listRef}
            role="tablist"
            aria-labelledby="solutions-title"
            aria-orientation={wide ? "vertical" : "horizontal"}
            onKeyDown={onListKeyDown}
            {...stylex.props(styles.list)}
          >
            {SOLUTION_ITEMS.map((solution, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={solution.id}
                  ref={(node) => {
                    listTabs.current[index] = node;
                  }}
                  id={tabId(index)}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={sheetId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectSolution(index)}
                  {...stylex.props(frame.focusRing, styles.listTab, selected && styles.listTabOn)}
                >
                  <span {...stylex.props(styles.listRow)}>
                    <span {...stylex.props(styles.listNumber, selected && styles.listNumberOn)}>
                      {padIndex(index)}
                    </span>
                    <span {...stylex.props(styles.listTitle, selected && styles.listTitleOn)}>
                      {solution.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <div
            id={sheetId}
            role="tabpanel"
            aria-labelledby={tabId(activeIndex)}
            {...stylex.props(styles.sheet)}
          >
            <m.header
              key={item.id}
              initial={reveal}
              animate={{ opacity: 1, y: 0 }}
              transition={enter}
              {...stylex.props(styles.sheetHead)}
            >
              <p {...stylex.props(styles.eyebrow)}>
                <span {...stylex.props(styles.eyebrowNumber)}>{padIndex(activeIndex)}</span>
                <span aria-hidden="true">/</span>
                <span>{padIndex(COUNT - 1)}</span>
              </p>
              <h3 {...stylex.props(styles.sheetTitle)}>{item.title}</h3>
              <p {...stylex.props(styles.subtitle)}>{item.subtitle}</p>
              <dl {...stylex.props(styles.functions)}>
                <dt {...stylex.props(styles.functionsLabel)}>功能</dt>
                <dd {...stylex.props(styles.functionsValue)}>
                  <ul {...stylex.props(styles.functionsList)}>
                    {item.functions.map((entry) => (
                      <li key={entry} {...stylex.props(styles.functionsItem)}>
                        {entry}
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
            </m.header>
            <div
              role="tablist"
              aria-label="方案内容"
              aria-orientation="horizontal"
              onKeyDown={onSectionKeyDown}
              {...stylex.props(styles.sectionTabs)}
            >
              {SECTIONS.map((entry) => {
                const selected = entry.key === section;
                const enabled = hasSection(item, entry.key);
                return (
                  <button
                    key={entry.key}
                    ref={(node) => {
                      sectionTabs.current[entry.key] = node;
                    }}
                    id={sectionTabId(entry.key)}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={panelId}
                    aria-disabled={!enabled || undefined}
                    disabled={!enabled}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectSection(entry.key)}
                    {...stylex.props(
                      frame.focusRing,
                      styles.sectionTab,
                      selected && styles.sectionTabOn,
                      !enabled && styles.sectionTabOff,
                    )}
                  >
                    {entry.label}
                  </button>
                );
              })}
            </div>
            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={sectionTabId(section)}
              tabIndex={0}
              {...stylex.props(frame.focusRing, styles.panel)}
            >
              <m.div
                key={`${item.id}-${section}`}
                initial={reveal}
                animate={{ opacity: 1, y: 0 }}
                transition={enter}
              >
                <SectionBody item={item} section={section} />
              </m.div>
            </div>
            <nav aria-label="切换方案" {...stylex.props(styles.pager)}>
              <button
                type="button"
                onClick={() => step(-1)}
                {...stylex.props(frame.focusRing, styles.pagerButton, styles.pagerPrev)}
              >
                <span {...stylex.props(styles.pagerLabel)}>
                  <ArrowLeft size={14} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                  上一个
                </span>
                <span {...stylex.props(styles.pagerTitle)}>
                  <span {...stylex.props(styles.pagerNumber)}>
                    {padIndex(wrapIndex(activeIndex - 1))}
                  </span>
                  <span {...stylex.props(styles.pagerName)}>{prev.title}</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                {...stylex.props(frame.focusRing, styles.pagerButton, styles.pagerNext)}
              >
                <span {...stylex.props(styles.pagerLabel)}>
                  下一个
                  <ArrowRight size={14} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                </span>
                <span {...stylex.props(styles.pagerTitle)}>
                  <span {...stylex.props(styles.pagerNumber)}>
                    {padIndex(wrapIndex(activeIndex + 1))}
                  </span>
                  <span {...stylex.props(styles.pagerName)}>{next.title}</span>
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
