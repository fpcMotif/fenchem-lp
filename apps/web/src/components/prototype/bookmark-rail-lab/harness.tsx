import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  For,
  onSettled,
  Show,
  untrack,
  useContext,
  type Accessor,
  type Component,
} from "solid-js";
import { Portal } from "@solidjs/web";

import { useIsClient } from "../insights-lab/kit";
import { VariantOOS1, type SubPageProps } from "../variant-oos1/index";

export type RailLabVariant = { name: string; Component: Component<SubPageProps> };

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

type ActiveVariant = { Component: Component<SubPageProps>; mountKey: string };

const ActiveVariantContext = createContext<Accessor<ActiveVariant | null>>(() => null);

function LabInsightsPage(props: SubPageProps) {
  const active = useContext(ActiveVariantContext);
  // React remounted the page through `key={mountKey}`; a keyed Show does the same here.
  return (
    <Show when={active()?.mountKey} keyed>
      {(_mountKey) => {
        const Variant = untrack(() => active()!.Component);
        return <Variant {...props} />;
      }}
    </Show>
  );
}

export function BookmarkRailLab(props: {
  variants: readonly RailLabVariant[];
  initial: number;
  onVariantChange: (v: number) => void;
}) {
  const [current, setCurrent] = createSignal(
    untrack(() => Math.min(Math.max(props.initial, 0), props.variants.length - 1)),
  );
  const [replays, setReplays] = createSignal(0);
  const mounted = useIsClient();
  const [ready, setReady] = createSignal(false);
  let highlightEl: HTMLSpanElement | undefined;
  const itemEls: (HTMLButtonElement | undefined)[] = [];

  const moveHighlight = () => {
    const item = itemEls[untrack(current)];
    const highlight = highlightEl;
    if (!item || !highlight) return;
    highlight.style.width = `${item.offsetWidth}px`;
    highlight.style.transform = `translateX(${item.offsetLeft}px)`;
  };

  createEffect(
    () => [current(), mounted()],
    () => moveHighlight(),
  );

  onSettled(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  });

  onSettled(() => {
    window.addEventListener("resize", moveHighlight);
    return () => window.removeEventListener("resize", moveHighlight);
  });

  const setActive = (index: number) => {
    if (index < 0 || index >= props.variants.length) return;
    setCurrent(index);
    setReplays((value) => value + 1);
    props.onVariantChange(index + 1);
  };

  onSettled(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const count = props.variants.length;
      const digit = Number.parseInt(event.key, 10);
      if (digit >= 1 && digit <= count) setActive(digit - 1);
      else if (event.key === "ArrowRight") setActive((current() + 1) % count);
      else if (event.key === "ArrowLeft") setActive((current() - 1 + count) % count);
      else if (event.key === "r" || event.key === "R") setReplays((value) => value + 1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  const active = createMemo<ActiveVariant | null>(() => {
    const variant = props.variants[current()] ?? props.variants[0];
    return variant ? { Component: variant.Component, mountKey: `${current()}-${replays()}` } : null;
  });

  return (
    <>
      <style>{PICKER_CSS}</style>
      <ActiveVariantContext value={active}>
        <VariantOOS1 startView="insights" InsightsPage={LabInsightsPage} />
      </ActiveVariantContext>
      <Show when={mounted()}>
        <Portal mount={document.body}>
          <nav
            class="proto-picker"
            aria-label="Prototype variants"
            data-ready={ready() ? "" : undefined}
          >
            <span ref={highlightEl} class="proto-picker-highlight" aria-hidden="true" />
            <For each={props.variants}>
              {(entry, index) => (
                <button
                  ref={(node) => {
                    itemEls[index()] = node;
                  }}
                  type="button"
                  class="proto-picker-item"
                  data-active={index() === current() ? "" : undefined}
                  aria-current={index() === current() ? "true" : undefined}
                  onClick={() => setActive(index())}
                >
                  {entry.name}
                </button>
              )}
            </For>
            <span class="proto-picker-divider" aria-hidden="true" />
            <button
              type="button"
              class="proto-picker-item proto-picker-replay"
              aria-label="Replay animation (R)"
              onClick={() => setReplays((value) => value + 1)}
            >
              ↻
            </button>
          </nav>
        </Portal>
      </Show>
    </>
  );
}
