import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, m } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import {
  scrollToBookmark,
  useBookmarkActive,
  type CodexBookmarkItem,
} from "../variant-oos1/codex-bookmark-rail";
import type { SubPageProps } from "../variant-oos1/index";
import { INSIGHTS_ARTICLES, type InsightSection } from "../variant-oos1/insights-data";
import { InsightsView } from "../variant-oos1/insights-view";
import { color, ease } from "../variant-oos1/tokens.stylex";

const DESKTOP = breakpoints.xl;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const CARD_SPRING = { type: "spring", duration: 0.3, bounce: 0 } as const;
const CLOSE_DELAY_MS = 120;
const RAIL_PAD = 6;
const HIDE_PRODUCTION_RAIL = 'aside[aria-label="文章书签"] { display: none !important; }';

type BarState = "open" | "near" | "active" | "rest";

type RailConfig = {
  tick: number;
  gap: number;
  bar: number;
  scales: Record<BarState, number>;
  align: "center" | "start" | "end";
};

function sectionSummary(section: InsightSection): string {
  for (const block of section.blocks) {
    if (block.kind === "paragraphs" && block.items[0]) return block.items[0];
    if (block.kind === "terms" && block.items.length > 0) {
      return block.items.map((item) => item.term).join(" · ");
    }
    if (block.kind === "bullets" && block.items.length > 0) {
      return block.items.slice(0, 2).join("；");
    }
  }
  return "";
}

function featuredItems(): CodexBookmarkItem[] {
  const article = INSIGHTS_ARTICLES[0];
  if (!article) return [];
  return [
    {
      id: `${article.id}-article`,
      title: article.navLabel ?? article.title,
      summary: article.thesis?.statement ?? article.lead ?? article.intro[0] ?? "",
    },
    ...article.sections.map((section) => ({
      id: `${article.id}-${section.slug}`,
      title: section.navLabel || section.title,
      summary: sectionSummary(section),
    })),
  ];
}

function useArticleInView(firstId: string | undefined, lastId: string | undefined) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const first = firstId ? document.getElementById(firstId) : null;
      const last = lastId ? document.getElementById(lastId) : null;
      if (!first || !last) return setInView(false);
      const startsAbove = first.getBoundingClientRect().top < window.innerHeight * 0.6;
      const endsBelow = last.getBoundingClientRect().bottom > 240;
      setInView(startsAbove && endsBelow);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [firstId, lastId]);
  return inView;
}

const styles = stylex.create({
  frame: {
    display: { default: "none", [DESKTOP]: "block" },
    position: "fixed",
    zIndex: 20,
    transitionProperty: "opacity",
    transitionDuration: { default: "200ms", "@media (prefers-reduced-motion: reduce)": "0ms" },
    transitionTimingFunction: ease.out,
  },
  hidden: {
    opacity: 0,
    pointerEvents: "none",
  },
  marginCenter: {
    left: "calc((max(0px, (100vw - 1440px) / 2) + min(120px, 8.333vw) + 50vw - 400px) / 2)",
    transform: "translateX(-50%)",
  },
  shellEdge: {
    left: "calc(max(0px, (100vw - 1440px) / 2) + min(120px, 8.333vw))",
  },
  articleGutter: {
    left: "calc(50vw - 400px - 40px)",
    transform: "translateX(-100%)",
  },
  opticalMiddle: {
    top: "calc(144px + (100vh - 144px) * 0.44)",
    translate: "0 -50%",
  },
  pinnedTop: {
    top: 184,
  },
  rail: {
    display: "flex",
    flexDirection: "column",
    paddingBlock: RAIL_PAD,
    position: "relative",
  },
  tickButton: {
    appearance: "none",
    borderWidth: 0,
    backgroundColor: "transparent",
    padding: 0,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    position: "relative",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
    borderRadius: 4,
  },
  bar: {
    display: "block",
    height: 2,
    borderRadius: 1,
    flexShrink: 0,
    transitionProperty: "transform, background-color",
    transitionDuration: { default: "180ms", "@media (prefers-reduced-motion: reduce)": "0ms" },
    transitionTimingFunction: ease.out,
  },
  cardAnchor: {
    position: "absolute",
    top: 0,
    left: "calc(100% + 8px)",
    height: 0,
    transformOrigin: "left top",
    zIndex: 50,
  },
  card: {
    position: "relative",
    transform: "translateY(-50%)",
    width: 240,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.08)",
    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
    padding: "10px 12px",
    textAlign: "start",
    userSelect: "none",
    cursor: "pointer",
    overflow: "hidden",
  },
  cardTitle: {
    display: "block",
    marginBottom: 4,
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 1.35,
    color: color.ink,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  },
  cardSummary: {
    margin: 0,
    fontSize: 12,
    lineHeight: 1.55,
    color: color.bodyText,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
  },
});

const BAR_COLORS: Record<BarState, string> = {
  open: "#1a1a1a",
  active: "#1a1a1a",
  near: "rgba(26, 26, 26, 0.4)",
  rest: "rgba(26, 26, 26, 0.22)",
};

const ALIGN_ORIGIN = { center: "center", start: "left center", end: "right center" } as const;
const ALIGN_FLEX = { center: "center", start: "flex-start", end: "flex-end" } as const;

function barStateFor(index: number, openIndex: number, isActive: boolean): BarState {
  if (index === openIndex) return "open";
  if (isActive) return "active";
  if (openIndex !== -1 && Math.abs(index - openIndex) === 1) return "near";
  return "rest";
}

function ProtoRail({ items, config }: { items: readonly CodexBookmarkItem[]; config: RailConfig }) {
  const reduce = useReducedMotion();
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useBookmarkActive(ids);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const pinTimerRef = useRef<number | undefined>(undefined);
  const closeTimerRef = useRef<number | undefined>(undefined);

  const cancelClose = useCallback(() => clearTimeout(closeTimerRef.current), []);
  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setHoveredId(null), CLOSE_DELAY_MS);
  }, []);
  const openTick = useCallback((id: string) => {
    clearTimeout(closeTimerRef.current);
    setHoveredId(id);
  }, []);
  const handleSelect = useCallback((id: string, event?: MouseEvent) => {
    event?.stopPropagation();
    scrollToBookmark(id);
    setPinnedId(id);
    clearTimeout(pinTimerRef.current);
    pinTimerRef.current = window.setTimeout(() => setPinnedId(null), 1400);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(pinTimerRef.current);
      clearTimeout(closeTimerRef.current);
    },
    [],
  );

  const openId = hoveredId ?? pinnedId;
  const openIndex = openId === null ? -1 : items.findIndex((item) => item.id === openId);
  const openItem = openIndex === -1 ? null : items[openIndex];
  const cardY = RAIL_PAD + openIndex * (config.tick + config.gap) + config.tick / 2;

  return (
    <nav
      aria-label="文章书签导航"
      {...stylex.props(styles.rail)}
      style={{ gap: config.gap, alignItems: ALIGN_FLEX[config.align] }}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        const state = barStateFor(index, openIndex, isActive);
        return (
          <button
            key={item.id}
            type="button"
            aria-label={`${item.title} — 书签`}
            aria-current={isActive ? "location" : undefined}
            onClick={(event) => handleSelect(item.id, event)}
            onMouseEnter={() => openTick(item.id)}
            onFocus={() => openTick(item.id)}
            onBlur={scheduleClose}
            {...stylex.props(styles.tickButton)}
            style={{
              height: config.tick,
              minWidth: config.bar + 6,
              justifyContent: ALIGN_FLEX[config.align],
            }}
          >
            <span
              aria-hidden="true"
              {...stylex.props(styles.bar)}
              style={{
                width: config.bar,
                transform: `scaleX(${config.scales[state]})`,
                transformOrigin: ALIGN_ORIGIN[config.align],
                backgroundColor: BAR_COLORS[state],
              }}
            />
          </button>
        );
      })}

      <AnimatePresence>
        {openItem ? (
          <m.div
            key="card-anchor"
            initial={
              reduce ? { opacity: 0, y: cardY } : { opacity: 0, x: -4, scale: 0.97, y: cardY }
            }
            animate={{ opacity: 1, x: 0, scale: 1, y: cardY }}
            exit={
              reduce
                ? { opacity: 0, transition: { duration: 0.12 } }
                : { opacity: 0, x: -4, scale: 0.97, transition: { duration: 0.12, ease: EASE_OUT } }
            }
            transition={
              reduce
                ? { duration: 0.12, y: { duration: 0 } }
                : { duration: 0.18, ease: EASE_OUT, y: CARD_SPRING }
            }
            {...stylex.props(styles.cardAnchor)}
            onMouseEnter={cancelClose}
            onClick={(event) => handleSelect(openItem.id, event)}
          >
            <div {...stylex.props(styles.card)}>
              <AnimatePresence mode="popLayout" initial={false}>
                <m.div
                  key={openItem.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(2px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: reduce ? 0 : 0.14, ease: EASE_OUT }}
                >
                  <span {...stylex.props(styles.cardTitle)} title={openItem.title}>
                    {openItem.title}
                  </span>
                  <p {...stylex.props(styles.cardSummary)}>{openItem.summary}</p>
                </m.div>
              </AnimatePresence>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}

type Placement = {
  horizontal: "marginCenter" | "shellEdge" | "articleGutter";
  vertical: "opticalMiddle" | "pinnedTop";
};

function makeVariant(placement: Placement, config: RailConfig) {
  return function RailVariant({ onNavigateHome }: SubPageProps) {
    const items = useMemo(featuredItems, []);
    const inView = useArticleInView(items[0]?.id, items.at(-1)?.id);
    return (
      <>
        <style>{HIDE_PRODUCTION_RAIL}</style>
        <InsightsView onNavigateHome={onNavigateHome} />
        <div
          {...stylex.props(
            styles.frame,
            styles[placement.horizontal],
            styles[placement.vertical],
            !inView && styles.hidden,
          )}
        >
          <ProtoRail items={items} config={config} />
        </div>
      </>
    );
  };
}

export const CenteredVariant = makeVariant(
  { horizontal: "marginCenter", vertical: "opticalMiddle" },
  {
    tick: 20,
    gap: 4,
    bar: 22,
    scales: { open: 1, near: 0.727, active: 0.818, rest: 0.545 },
    align: "center",
  },
);

export const EdgeVariant = makeVariant(
  { horizontal: "shellEdge", vertical: "pinnedTop" },
  {
    tick: 28,
    gap: 8,
    bar: 28,
    scales: { open: 1, near: 0.71, active: 0.86, rest: 0.5 },
    align: "start",
  },
);

export const GutterVariant = makeVariant(
  { horizontal: "articleGutter", vertical: "opticalMiddle" },
  {
    tick: 14,
    gap: 2,
    bar: 14,
    scales: { open: 1, near: 0.71, active: 0.86, rest: 0.57 },
    align: "end",
  },
);

export const LooseVariant = makeVariant(
  { horizontal: "marginCenter", vertical: "opticalMiddle" },
  {
    tick: 32,
    gap: 12,
    bar: 32,
    scales: { open: 1, near: 0.69, active: 0.81, rest: 0.44 },
    align: "center",
  },
);
