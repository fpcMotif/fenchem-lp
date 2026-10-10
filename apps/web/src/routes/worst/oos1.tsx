import { createFileRoute, notFound } from "@tanstack/react-router";
import { Component, useEffect, useState, type ComponentType, type ReactNode } from "react";

import {
  applyDataset,
  DATASETS,
  type Dataset,
} from "@/components/prototype/variant-oos1/worst-case-data";

const PAGES = ["home", "about", "products"] as const;
type Page = (typeof PAGES)[number];

const PAGE_LABELS: Record<Page, string> = { home: "Home", about: "About", products: "Products" };
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
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  validateSearch: (search: {
    data?: unknown;
    page?: unknown;
    fixed?: unknown;
  }): { data?: Dataset; page?: Page; fixed?: boolean } => ({
    data: DATASETS.find((dataset) => dataset === search.data),
    page: PAGES.find((page) => page === search.page),
    fixed: search.fixed === 1 || search.fixed === "1" || search.fixed === true ? true : undefined,
  }),
  component: WorstOOS1,
});

type Loaded = { Variant: ComponentType } | { error: unknown };

function WorstOOS1() {
  const { data = "demo", fixed = false } = Route.useSearch();
  const [loaded, setLoaded] = useState<Loaded | null>(null);

  useEffect(() => {
    let active = true;
    applyDataset(data, fixed);
    import("@/components/prototype/variant-oos1").then(
      (module) => {
        if (active) setLoaded({ Variant: module.VariantOOS1 });
      },
      (error: unknown) => {
        if (active) setLoaded({ error });
      },
    );
    return () => {
      active = false;
    };
  }, [data, fixed]);

  useEffect(() => {
    if (loaded && "Variant" in loaded) restoreAnchor();
  }, [loaded]);

  return (
    <>
      <div style={{ minWidth: 0 }}>
        {loaded === null ? null : "error" in loaded ? (
          <CrashNotice error={loaded.error} />
        ) : (
          <CrashBoundary>
            <loaded.Variant />
          </CrashBoundary>
        )}
      </div>
      <DataToggle data={data} fixed={fixed} />
    </>
  );
}

class CrashBoundary extends Component<{ children: ReactNode }, { error: unknown }> {
  state: { error: unknown } = { error: null };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  render() {
    return this.state.error === null ? (
      this.props.children
    ) : (
      <CrashNotice error={this.state.error} />
    );
  }
}

function CrashNotice({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : String(error);
  const stack =
    error instanceof Error ? (error.stack ?? "").split("\n").slice(1, 6).join("\n") : "";
  return (
    <div
      role="alert"
      style={{
        boxSizing: "border-box",
        minHeight: "100vh",
        padding: "96px 16px 160px",
        background: "#fafafa",
        color: "#1a1a1a",
        font: "14px/1.5 system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: 720, marginInline: "auto" }}>
        <p style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>This dataset crashes the page</p>
        <p style={{ margin: "8px 0 0", overflowWrap: "anywhere" }}>{message}</p>
        {stack ? (
          <pre
            style={{
              margin: "16px 0 0",
              padding: 12,
              overflowX: "auto",
              background: "#f0f0f0",
              borderRadius: 8,
              fontSize: 12,
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

function go(next: { data: Dataset; fixed: boolean; page: Page }, keepPlace: boolean) {
  const url = new URL(window.location.href);
  url.search = "";
  if (next.data !== "demo") url.searchParams.set("data", next.data);
  if (next.page !== "home") url.searchParams.set("page", next.page);
  if (next.fixed) url.searchParams.set("fixed", "1");
  url.hash = "";
  if (keepPlace) saveAnchor();
  window.location.assign(url);
}

function DataToggle({ data, fixed }: { data: Dataset; fixed: boolean }) {
  const [page, setPage] = useState<Page>("home");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const sync = () => window.setTimeout(() => setPage(currentPage()), 0);
    sync();
    window.addEventListener("popstate", sync);
    document.addEventListener("click", sync, true);
    return () => {
      window.removeEventListener("popstate", sync);
      document.removeEventListener("click", sync, true);
    };
  }, []);

  return (
    <>
      <style>{TOGGLE_CSS}</style>
      <div className="data-toggle" role="group" aria-label="Fixture data">
        {collapsed ? null : (
          <>
            <div className="data-toggle-track" role="group" aria-label="Page">
              {PAGES.map((candidate) => (
                <button
                  key={candidate}
                  type="button"
                  aria-pressed={candidate === page}
                  onClick={() => go({ data, fixed, page: candidate }, false)}
                >
                  {PAGE_LABELS[candidate]}
                </button>
              ))}
            </div>
            <div className="data-toggle-track" role="group" aria-label="Dataset">
              {DATASETS.map((candidate) => (
                <button
                  key={candidate}
                  type="button"
                  aria-pressed={candidate === data}
                  onClick={() => go({ data: candidate, fixed, page: currentPage() }, true)}
                >
                  {DATASET_LABELS[candidate]}
                </button>
              ))}
            </div>
            {data === "empty" || data === "one" || data === "many" ? (
              <label>
                <input
                  type="checkbox"
                  checked={fixed}
                  onChange={(event) =>
                    go({ data, fixed: event.target.checked, page: currentPage() }, true)
                  }
                />
                Keep fixed-count lists
              </label>
            ) : null}
          </>
        )}
        <button
          type="button"
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Show data toggle" : "Hide data toggle"}
          onClick={() => setCollapsed((value) => !value)}
        >
          {collapsed ? `${DATASET_LABELS[data]} ▴` : "▾"}
        </button>
      </div>
    </>
  );
}
