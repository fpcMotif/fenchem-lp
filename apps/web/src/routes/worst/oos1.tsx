import { createFileRoute, notFound } from "@tanstack/solid-router";
import {
  createEffect,
  createSignal,
  Errored,
  onSettled,
  Show,
  untrack,
  type Component,
} from "solid-js";

import {
  applyDataset,
  ARTICLE_COUNTS,
  DATASETS,
  type ArticleCount,
  type Dataset,
} from "@/components/prototype/variant-oos1/worst-case-data";

const PAGES = ["home", "about", "products", "insights"] as const;
type Page = (typeof PAGES)[number];

const PAGE_LABELS: Record<Page, string> = {
  home: "Home",
  about: "About",
  products: "Products",
  insights: "Insights",
};
const DATASET_LABELS: Record<Dataset, string> = {
  demo: "Demo data",
  worst: "Worst case",
  empty: "Empty",
  one: "One",
  many: "Many",
};

const ANCHOR_KEY = "worst-oos1-anchor";
const RESTORE_DELAY_MS = 500;

export const Route = createFileRoute("/worst/oos1")({
  validateSearch: (search: {
    data?: unknown;
    page?: unknown;
    fixed?: unknown;
    articles?: unknown;
  }): { data?: Dataset; page?: Page; fixed?: boolean; articles?: ArticleCount } => ({
    data: DATASETS.find((dataset) => dataset === search.data),
    page: PAGES.find((page) => page === search.page),
    fixed: search.fixed === 1 || search.fixed === "1" || search.fixed === true ? true : undefined,
    articles: ARTICLE_COUNTS.find((count) => String(count) === String(search.articles)),
  }),
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  component: WorstOOS1,
});

type Loaded = { Variant: Component } | { error: unknown };

function WorstOOS1() {
  const search = Route.useSearch();
  const data = () => search().data ?? "demo";
  const fixed = () => search().fixed ?? false;
  const articles = () => search().articles ?? 1;
  const [loaded, setLoaded] = createSignal<Loaded | null>(null);

  createEffect(
    () => [data(), fixed(), articles()] as const,
    ([nextData, nextFixed, nextArticles]) => {
      let active = true;
      applyDataset(nextData, nextFixed, nextArticles);
      import("@/components/prototype/variant-oos1").then(
        (module) => {
          if (active) setLoaded({ Variant: module.VariantOOS1 as Component });
        },
        (error: unknown) => {
          if (active) setLoaded({ error });
        },
      );
      return () => {
        active = false;
      };
    },
  );

  createEffect(loaded, (current) => {
    if (current && "Variant" in current) restoreAnchor();
  });

  return (
    <>
      <div style={{ "min-width": 0 }}>
        <Show when={loaded()}>
          {(current) => {
            const state = current();
            if ("error" in state) return <CrashNotice error={state.error} />;
            const Variant = state.Variant;
            return (
              <Errored fallback={(error) => <CrashNotice error={error()} />}>
                <Variant />
              </Errored>
            );
          }}
        </Show>
      </div>
      <DataToggle data={data()} fixed={fixed()} articles={articles()} />
    </>
  );
}

function CrashNotice(props: { error: unknown }) {
  const error = untrack(() => props.error);
  const message = error instanceof Error ? error.message : String(error);
  const stack =
    error instanceof Error ? (error.stack ?? "").split("\n").slice(1, 6).join("\n") : "";
  return (
    <div
      role="alert"
      style={{
        "box-sizing": "border-box",
        "min-height": "100vh",
        padding: "96px 16px 160px",
        background: "#fafafa",
        color: "#1a1a1a",
        font: "14px/1.5 system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ "max-width": "720px", "margin-inline": "auto" }}>
        <p style={{ margin: 0, "font-size": "18px", "font-weight": 600 }}>
          This dataset crashes the page
        </p>
        <p style={{ margin: "8px 0 0", "overflow-wrap": "anywhere" }}>{message}</p>
        {stack ? (
          <pre
            style={{
              margin: "16px 0 0",
              padding: "12px",
              "overflow-x": "auto",
              background: "#f0f0f0",
              "border-radius": "8px",
              "font-size": "12px",
            }}
          >
            {stack}
          </pre>
        ) : null}
      </div>
    </div>
  );
}

const TOGGLE_CSS = `
.data-toggle {
  position: fixed;
  bottom: max(16px, env(safe-area-inset-bottom));
  inset-inline: 16px;
  width: fit-content;
  margin-inline: auto;
  z-index: 2147483000;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-sizing: border-box;
  padding: 4px;
  border-radius: 12px;
  background: rgb(255 255 255 / 0.94);
  box-shadow: 0 0 0 1px rgb(0 0 0 / 0.08), 0 8px 24px rgb(0 0 0 / 0.16);
  font: 12px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #1a1a1a;
}
.data-toggle-track {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  gap: 2px;
  padding: 2px;
  border-radius: 9px;
  background: #e9e9e9;
}
.data-toggle button {
  all: unset;
  padding: 6px 10px;
  border-radius: 7px;
  color: #555;
  cursor: pointer;
  white-space: nowrap;
}
.data-toggle-track span {
  padding: 6px 4px 6px 8px;
  color: #555;
}
.data-toggle button[aria-pressed="true"] {
  background: #fff;
  color: #1a1a1a;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.14);
}
.data-toggle button:focus-visible {
  outline: 2px solid #1a1a1a;
  outline-offset: 1px;
}
.data-toggle label {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 6px;
  color: #555;
  white-space: nowrap;
}
`;

function currentPage(): Page {
  const page = new URLSearchParams(window.location.search).get("page");
  return PAGES.find((candidate) => candidate === page) ?? "home";
}

function saveAnchor() {
  let anchor: { id: string; top: number } | null = null;
  for (const element of document.querySelectorAll<HTMLElement>("main [id]")) {
    const top = element.getBoundingClientRect().top;
    if (top <= 120) anchor = { id: element.id, top };
  }
  try {
    sessionStorage.setItem(ANCHOR_KEY, JSON.stringify(anchor));
  } catch {
    return;
  }
}

function restoreAnchor() {
  let anchor: { id: string; top: number } | null = null;
  try {
    anchor = JSON.parse(sessionStorage.getItem(ANCHOR_KEY) ?? "null");
    sessionStorage.removeItem(ANCHOR_KEY);
  } catch {
    return;
  }
  if (!anchor) return;
  const { id, top } = anchor;
  window.setTimeout(() => {
    const element = document.getElementById(id);
    if (!element) return;
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - top,
      behavior: "instant",
    });
  }, RESTORE_DELAY_MS);
}

function go(
  next: { data: Dataset; fixed: boolean; page: Page; articles: ArticleCount },
  keepPlace: boolean,
) {
  const url = new URL(window.location.href);
  url.search = "";
  if (next.data !== "demo") url.searchParams.set("data", next.data);
  if (next.page !== "home") url.searchParams.set("page", next.page);
  if (next.fixed) url.searchParams.set("fixed", "1");
  if (next.data === "demo" && next.articles > 1) {
    url.searchParams.set("articles", String(next.articles));
  }
  url.hash = "";
  if (keepPlace) saveAnchor();
  window.location.assign(url);
}

function DataToggle(props: { data: Dataset; fixed: boolean; articles: ArticleCount }) {
  const [page, setPage] = createSignal<Page>("home");
  const [collapsed, setCollapsed] = createSignal(false);

  onSettled(() => {
    const sync = () => window.setTimeout(() => setPage(currentPage()), 0);
    sync();
    window.addEventListener("popstate", sync);
    document.addEventListener("click", sync, true);
    return () => {
      window.removeEventListener("popstate", sync);
      document.removeEventListener("click", sync, true);
    };
  });

  return (
    <>
      <style>{TOGGLE_CSS}</style>
      <div class="data-toggle" role="group" aria-label="Fixture data">
        <Show when={!collapsed()}>
          <div class="data-toggle-track" role="group" aria-label="Page">
            {PAGES.map((candidate) => (
              <button
                type="button"
                aria-pressed={candidate === page() ? "true" : "false"}
                onClick={() =>
                  go(
                    {
                      data: props.data,
                      fixed: props.fixed,
                      page: candidate,
                      articles: props.articles,
                    },
                    false,
                  )
                }
              >
                {PAGE_LABELS[candidate]}
              </button>
            ))}
          </div>
          <div class="data-toggle-track" role="group" aria-label="Dataset">
            {DATASETS.map((candidate) => (
              <button
                type="button"
                aria-pressed={candidate === props.data ? "true" : "false"}
                onClick={() =>
                  go(
                    {
                      data: candidate,
                      fixed: props.fixed,
                      page: currentPage(),
                      articles: props.articles,
                    },
                    true,
                  )
                }
              >
                {DATASET_LABELS[candidate]}
              </button>
            ))}
          </div>
          <Show when={props.data === "demo" && page() === "insights"}>
            <div class="data-toggle-track" role="group" aria-label="Articles">
              <span aria-hidden="true">Articles</span>
              {ARTICLE_COUNTS.map((candidate) => (
                <button
                  type="button"
                  aria-pressed={candidate === props.articles ? "true" : "false"}
                  onClick={() =>
                    go(
                      { data: props.data, fixed: props.fixed, page: page(), articles: candidate },
                      false,
                    )
                  }
                >
                  {candidate}
                </button>
              ))}
            </div>
          </Show>
          <Show when={props.data === "empty" || props.data === "one" || props.data === "many"}>
            <label>
              <input
                type="checkbox"
                checked={props.fixed}
                onChange={(event) =>
                  go(
                    {
                      data: props.data,
                      fixed: event.currentTarget.checked,
                      page: currentPage(),
                      articles: props.articles,
                    },
                    true,
                  )
                }
              />
              Keep fixed-count lists
            </label>
          </Show>
        </Show>
        <button
          type="button"
          aria-expanded={collapsed() ? "false" : "true"}
          aria-label={collapsed() ? "Show data toggle" : "Hide data toggle"}
          onClick={() => setCollapsed((value) => !value)}
        >
          {collapsed() ? `${DATASET_LABELS[props.data]} ▴` : "▾"}
        </button>
      </div>
    </>
  );
}
