import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, m } from "@/compat/motion";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  Show,
  untrack,
  type Accessor,
} from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { color, ease } from "./tokens.stylex";

export type CodexBookmarkItem = {
  id: string;
  title: string;
  summary: string;
};

const TICK_HEIGHT = 20;
const TICK_GAP = 4;
const RAIL_PAD = 6;
const CLOSE_DELAY_MS = 120;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const CARD_SPRING = { type: "spring", duration: 0.3, bounce: 0 } as const;

function tickCenter(index: number) {
  return RAIL_PAD + index * (TICK_HEIGHT + TICK_GAP) + TICK_HEIGHT / 2;
}

type BarState = "open" | "near" | "active" | "rest";

// stylex.attrs with reactive (accessor) arguments resolves at runtime here, because
// the StyleX compiler tries to evaluate them at build time and throws.
const sxProps: typeof stylex.attrs = (...args) => stylex.attrs(...args);

const styles = stylex.create({
  rail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    paddingBlock: 6,
    position: "relative",
    pointerEvents: "auto",
  },
  tickItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tickButton: {
    appearance: "none",
    borderWidth: 0,
    backgroundColor: "transparent",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 20,
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
    width: 22,
    height: 2,
    borderRadius: 1,
    transformOrigin: "center",
    transitionProperty: "transform, background-color",
    transitionDuration: {
      default: "180ms",
      "@media (prefers-reduced-motion: reduce)": "0ms",
    },
    transitionTimingFunction: ease.out,
  },
  barOpen: {
    transform: "scaleX(1)",
    backgroundColor: color.ink,
  },
  barNear: {
    transform: "scaleX(0.727)",
    backgroundColor: "rgba(26, 26, 26, 0.4)",
  },
  barActive: {
    transform: "scaleX(0.818)",
    backgroundColor: color.ink,
  },
  barRest: {
    transform: "scaleX(0.545)",
    backgroundColor: "rgba(26, 26, 26, 0.22)",
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
    maxWidth: "min(260px, calc(100vw - 80px))",
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
    margin: 0,
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
    textWrap: "pretty",
  },
});

export function scrollToBookmark(id: string, headerOffset = 144) {
  const element = document.getElementById(id);
  if (!element) return;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

export function useBookmarkActive(
  source: readonly string[] | Accessor<readonly string[]>,
  headerOffset = 160,
): Accessor<string> {
  const readIds = typeof source === "function" ? source : () => source;
  const [activeId, setActiveId] = createSignal<string>(untrack(readIds)[0] ?? "");

  createEffect(readIds, (ids) => {
    if (ids.length === 0) return;

    let frame = 0;
    const updateActive = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerOffset + 48) {
            current = id;
          }
        }
      }
      setActiveId(current ?? "");
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  });

  return activeId;
}

function barStateFor(index: number, openIndex: number, isActive: boolean): BarState {
  if (index === openIndex) return "open";
  if (isActive) return "active";
  if (openIndex !== -1 && Math.abs(index - openIndex) === 1) return "near";
  return "rest";
}

export function CodexBookmarkRail(props: {
  items: readonly CodexBookmarkItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const [hoveredId, setHoveredId] = createSignal<string | null>(null);
  const [pinnedId, setPinnedId] = createSignal<string | null>(null);
  let pinTimer: number | undefined;
  let closeTimer: number | undefined;

  const cancelClose = () => {
    clearTimeout(closeTimer);
  };

  const scheduleClose = () => {
    clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      setHoveredId(null);
    }, CLOSE_DELAY_MS);
  };

  const openTick = (id: string) => {
    clearTimeout(closeTimer);
    setHoveredId(id);
  };

  const handleSelect = (id: string, event?: MouseEvent) => {
    event?.stopPropagation();
    props.onSelect(id);
    setPinnedId(id);
    clearTimeout(pinTimer);
    pinTimer = window.setTimeout(() => {
      setPinnedId(null);
    }, 1400);
  };

  onCleanup(() => {
    clearTimeout(pinTimer);
    clearTimeout(closeTimer);
  });

  const openId = () => hoveredId() ?? pinnedId();
  const openIndex = createMemo(() => {
    const id = openId();
    return id === null ? -1 : props.items.findIndex((item) => item.id === id);
  });
  const openItem = () => (openIndex() === -1 ? null : props.items[openIndex()]);
  const cardY = () => (openIndex() === -1 ? 0 : tickCenter(openIndex()));

  return (
    <nav
      aria-label="文章书签导航"
      {...stylex.attrs(styles.rail)}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <For each={props.items}>
        {(item, index) => {
          const isActive = () => item.id === props.activeId;
          const barState = () => barStateFor(index(), openIndex(), isActive());

          return (
            <div {...stylex.attrs(styles.tickItem)}>
              <button
                type="button"
                aria-label={`${item.title} — 书签`}
                aria-current={isActive() ? "location" : undefined}
                onClick={(e) => handleSelect(item.id, e)}
                onMouseEnter={() => openTick(item.id)}
                onFocus={() => openTick(item.id)}
                onBlur={scheduleClose}
                {...stylex.attrs(styles.tickButton)}
              >
                <span
                  aria-hidden="true"
                  {...sxProps(
                    styles.bar,
                    barState() === "open" && styles.barOpen,
                    barState() === "near" && styles.barNear,
                    barState() === "active" && styles.barActive,
                    barState() === "rest" && styles.barRest,
                  )}
                />
              </button>
            </div>
          );
        }}
      </For>

      <AnimatePresence>
        <Show when={openItem()}>
          {(anchored) => (
            <m.div
              initial={
                reduce()
                  ? { opacity: 0, y: cardY() }
                  : { opacity: 0, x: -4, scale: 0.97, y: cardY() }
              }
              animate={{ opacity: 1, x: 0, scale: 1, y: cardY() }}
              exit={
                reduce()
                  ? { opacity: 0, transition: { duration: 0.12 } }
                  : {
                      opacity: 0,
                      x: -4,
                      scale: 0.97,
                      transition: { duration: 0.12, ease: EASE_OUT },
                    }
              }
              transition={
                reduce()
                  ? { duration: 0.12, y: { duration: 0 } }
                  : { duration: 0.18, ease: EASE_OUT, y: CARD_SPRING }
              }
              {...stylex.attrs(styles.cardAnchor)}
              onMouseEnter={cancelClose}
              onClick={(e: MouseEvent) => handleSelect(anchored().id, e)}
            >
              <div {...stylex.attrs(styles.card)}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <Show when={anchored()} keyed>
                    {(shown) => (
                      <m.div
                        initial={reduce() ? { opacity: 0 } : { opacity: 0, filter: "blur(2px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={reduce() ? { opacity: 0 } : { opacity: 0, filter: "blur(2px)" }}
                        transition={{ duration: reduce() ? 0 : 0.14, ease: EASE_OUT }}
                      >
                        <span {...stylex.attrs(styles.cardTitle)} title={shown.title}>
                          {shown.title}
                        </span>
                        <p {...stylex.attrs(styles.cardSummary)}>{shown.summary}</p>
                      </m.div>
                    )}
                  </Show>
                </AnimatePresence>
              </div>
            </m.div>
          )}
        </Show>
      </AnimatePresence>
    </nav>
  );
}
