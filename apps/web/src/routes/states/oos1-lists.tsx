import { createFileRoute, notFound } from "@tanstack/solid-router";
import { createEffect, createSignal, onSettled, Show, type Component } from "solid-js";

import { LIST_STATES, type ListState } from "./-oos1-lists-fixtures";

const SCROLL_KEY = "states-oos1-lists-scroll";
let appliedStateId: string | null = null;

export const Route = createFileRoute("/states/oos1-lists")({
  validateSearch: (search: { __state?: unknown; page?: unknown }) => ({
    __state: LIST_STATES.find((state) => state.id === search.__state)?.id,
    page: typeof search.page === "string" ? search.page : undefined,
  }),
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  component: Oos1ListsStatePage,
});

const SWITCHER_CSS = `
.state-switcher {
  all: unset;
  position: fixed;
  bottom: max(24px, env(safe-area-inset-bottom));
  left: 50%;
  translate: -50% 0;
  z-index: 9999;
  display: flex;
  gap: 2px;
  max-width: calc(100vw - 32px);
  overflow-x: auto;
  scrollbar-width: none;
  padding: 4px;
  border-radius: 999px;
  background: rgb(20 20 20 / 0.9);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1), 0 8px 24px rgb(0 0 0 / 0.25);
  font: 13px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  user-select: none;
}
.state-switcher[hidden] { display: none; }
.state-switcher button {
  all: unset;
  flex: none;
  padding: 7px 14px;
  border-radius: 999px;
  font: inherit;
  color: rgb(255 255 255 / 0.6);
  cursor: pointer;
}
.state-switcher button:hover { color: rgb(255 255 255 / 0.85); }
.state-switcher button[aria-pressed="true"] {
  background: rgb(255 255 255 / 0.14);
  color: rgb(255 255 255);
}
.state-switcher button:focus-visible {
  outline: 2px solid rgb(255 255 255 / 0.7);
  outline-offset: 2px;
}
`;

function reloadInto(next: ListState, current: ListState) {
  const url = new URL(window.location.href);
  url.searchParams.set("__state", next.id);
  url.searchParams.set("page", next.page);
  url.hash = "";
  sessionStorage.setItem(SCROLL_KEY, next.page === current.page ? String(window.scrollY) : "0");
  window.location.assign(url);
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable;
}

function Oos1ListsStatePage() {
  const search = Route.useSearch();
  const active = () => LIST_STATES.find((state) => state.id === search().__state) ?? LIST_STATES[0];
  const [variant, setVariant] = createSignal<Component | null>(null);
  const [hidden, setHidden] = createSignal(false);
  let nav: HTMLElement | undefined;

  createEffect(
    () => [active(), search().page] as const,
    ([state, page]) => {
      if (page !== state.page) {
        reloadInto(state, state);
        return;
      }
      if (appliedStateId === null) {
        appliedStateId = state.id;
        state.apply();
      }
      void import("@/components/prototype/variant-oos1").then((module) => {
        setVariant(() => module.VariantOOS1 as Component);
        const scroll = Number(sessionStorage.getItem(SCROLL_KEY) ?? 0);
        requestAnimationFrame(() => window.scrollTo(0, scroll));
      });
    },
  );

  createEffect(
    () => active().id,
    (id) => {
      nav
        ?.querySelector(`[data-state="${id}"]`)
        ?.scrollIntoView({ block: "nearest", inline: "nearest" });
    },
  );

  onSettled(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      const current = active();
      const index = LIST_STATES.indexOf(current);
      if (event.key === "h" || event.key === "H") {
        setHidden((value) => !value);
      } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const step = event.key === "ArrowRight" ? 1 : -1;
        reloadInto(LIST_STATES[(index + step + LIST_STATES.length) % LIST_STATES.length], current);
      } else if (/^[1-9]$/.test(event.key) && LIST_STATES[Number(event.key) - 1]) {
        reloadInto(LIST_STATES[Number(event.key) - 1], current);
      } else {
        return;
      }
      event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <>
      <div style={{ "min-width": 0 }}>
        <Show when={variant()} keyed>
          {(Variant) => <Variant />}
        </Show>
      </div>
      <style>{SWITCHER_CSS}</style>
      <nav ref={nav} class="state-switcher" aria-label="States" hidden={hidden()}>
        {LIST_STATES.map((state) => (
          <button
            type="button"
            data-state={state.id}
            aria-pressed={state.id === active().id ? "true" : "false"}
            onClick={() => reloadInto(state, active())}
          >
            {state.label}
          </button>
        ))}
      </nav>
    </>
  );
}
