import * as stylex from "@stylexjs/stylex";
import { LazyMotion, MotionConfig, domMax } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type ComponentType } from "react";

import { face, tone } from "./tokens.stylex";
import { AtlasVariant } from "./variants/atlas";
import { CardsVariant } from "./variants/cards";
import { CompareVariant } from "./variants/compare";
import { DrawerVariant } from "./variants/drawer";
import { FacetsVariant } from "./variants/facets";
import { FolderVariant } from "./variants/folder";
import { GridVariant } from "./variants/grid";
import { LedgerVariant } from "./variants/ledger";
import { MarginVariant } from "./variants/margin";
import { PagesVariant } from "./variants/pages";
import { PreviewVariant } from "./variants/preview";
import { RibbonVariant } from "./variants/ribbon";
import { SpotlightVariant } from "./variants/spotlight";
import { StudioVariant } from "./variants/studio";
import { TableVariant } from "./variants/table";

const VARIANTS: { name: string; Component: ComponentType }[] = [
  { name: "Margin", Component: MarginVariant },
  { name: "Ribbon", Component: RibbonVariant },
  { name: "Grid", Component: GridVariant },
  { name: "Ledger", Component: LedgerVariant },
  { name: "Table", Component: TableVariant },
  { name: "Atlas", Component: AtlasVariant },
  { name: "Drawer", Component: DrawerVariant },
  { name: "Cards", Component: CardsVariant },
  { name: "Spotlight", Component: SpotlightVariant },
  { name: "Pages", Component: PagesVariant },
  { name: "Studio", Component: StudioVariant },
  { name: "Facets", Component: FacetsVariant },
  { name: "Folder", Component: FolderVariant },
  { name: "Preview", Component: PreviewVariant },
  { name: "Compare", Component: CompareVariant },
];

const PICKER_CSS = `
.proto-picker {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483647;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.82);
  -webkit-backdrop-filter: blur(12px) saturate(1.4);
  backdrop-filter: blur(12px) saturate(1.4);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08) inset,
    0 8px 24px rgba(0, 0, 0, 0.24),
    0 2px 6px rgba(0, 0, 0, 0.12);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  user-select: none;
  -webkit-user-select: none;
}

.proto-picker-highlight {
  position: absolute;
  top: 4px;
  left: 0;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  will-change: transform;
}

.proto-picker[data-ready] .proto-picker-highlight {
  transition:
    transform 250ms cubic-bezier(0.23, 1, 0.32, 1),
    width 250ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (prefers-reduced-motion: reduce) {
  .proto-picker[data-ready] .proto-picker-highlight { transition: none; }
}

.proto-picker-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  font: inherit;
  cursor: pointer;
  transition: color 150ms ease-out;
}

.proto-picker-item:hover {
  color: rgba(255, 255, 255, 0.85);
}

.proto-picker-item:active {
  transform: scale(0.97);
}

.proto-picker-item:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.4);
  outline-offset: 2px;
}

.proto-picker-item[data-active] {
  color: #fff;
}

.proto-picker-divider {
  width: 1px;
  height: 16px;
  margin: 0 4px;
  background: rgba(255, 255, 255, 0.12);
}

.proto-picker-replay {
  padding: 0 10px;
  font-size: 14px;
}

.proto-picker[data-position="top"] {
  bottom: auto;
  top: 24px;
}
`;

const styles = stylex.create({
  root: {
    minHeight: "100dvh",
    backgroundColor: tone.paper,
    color: tone.ink,
    fontFamily: face.body,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  band: {
    height: { default: 96, "@media (min-width: 1280px)": 160 },
    backgroundColor: tone.surface,
  },
  stage: {
    paddingBottom: 96,
  },
});

const clampIndex = (index: number) => Math.min(Math.max(index, 0), VARIANTS.length - 1);

export function SolutionsLab({ initial }: { initial: number }) {
  const [current, setCurrent] = useState(() => clampIndex(initial));
  const [mountKey, setMountKey] = useState(0);
  const [ready, setReady] = useState(false);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const moveHighlight = () => {
    const item = itemRefs.current[current];
    const highlight = highlightRef.current;
    if (!item || !highlight) return;
    highlight.style.width = `${item.offsetWidth}px`;
    highlight.style.transform = `translateX(${item.offsetLeft}px)`;
  };

  useLayoutEffect(moveHighlight);

  useEffect(() => {
    window.addEventListener("resize", moveHighlight);
    return () => window.removeEventListener("resize", moveHighlight);
  });

  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  const setActive = (index: number) => {
    if (index < 0 || index >= VARIANTS.length) return;
    setCurrent(index);
    setMountKey((key) => key + 1);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(index + 1));
    window.history.replaceState(window.history.state, "", url);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const digit = Number.parseInt(event.key, 10);
      if (!Number.isNaN(digit)) setActive(digit === 0 ? 9 : digit - 1);
      else if (event.key === "ArrowRight") setActive((current + 1) % VARIANTS.length);
      else if (event.key === "ArrowLeft") setActive((current - 1 + VARIANTS.length) % VARIANTS.length);
      else if (event.key === "r" || event.key === "R") setMountKey((key) => key + 1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  const Variant = VARIANTS[current]?.Component;

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <style>{PICKER_CSS}</style>
        <div lang="zh-CN" {...stylex.props(styles.root)}>
          <div aria-hidden="true" {...stylex.props(styles.band)} />
          <div {...stylex.props(styles.stage)}>{Variant && <Variant key={`${current}-${mountKey}`} />}</div>
        </div>
        <nav className="proto-picker" aria-label="Prototype variants" data-ready={ready ? "" : undefined}>
          <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true" />
          {VARIANTS.map((variant, index) => (
            <button
              key={variant.name}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              className="proto-picker-item"
              data-active={index === current ? "" : undefined}
              aria-current={index === current ? "true" : undefined}
              onClick={() => setActive(index)}
            >
              {variant.name}
            </button>
          ))}
          <span className="proto-picker-divider" aria-hidden="true" />
          <button
            type="button"
            className="proto-picker-item proto-picker-replay"
            aria-label="Replay animation (R)"
            onClick={() => setMountKey((key) => key + 1)}
          >
            ↻
          </button>
        </nav>
      </MotionConfig>
    </LazyMotion>
  );
}
