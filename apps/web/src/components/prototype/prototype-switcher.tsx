import { radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "@tanstack/solid-router";
import { ChevronLeft, ChevronRight } from "@fenchem-lp/ui/components/lucide";
import { onSettled, Show } from "solid-js";

import { VARIANTS, type VariantKey } from "./variants";

/*
 * PROTOTYPE — floating variant switcher for the Fenchem landing prototype.
 * A/B/C are the original editorial-palette prototypes; D/E/F/G are their
 * green-led brand-book reinterpretations (see docs/brand/fenchem-brand-book.md).
 * Order + labels come from the variants registry, which pairs each original
 * next to its brand twin (A↔D, B↔E, C↔F) so ←/→ toggles between them.
 * Delete this file (and the losing variants) once a direction wins.
 */

const styles = stylex.create({
  container: {
    position: "fixed",
    bottom: "1.25rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    width: "max-content",
    maxWidth: "calc(100vw - 2rem)",
    gap: "0.25rem",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(9, 9, 11, 0.9)",
    paddingInline: "0.5rem",
    paddingBlock: "0.375rem",
    fontFamily: typography.tech,
    color: "#ffffff",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    padding: "0.375rem",
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
  },
  label: {
    flex: 1,
    minWidth: 0,
    maxWidth: "24rem",
    userSelect: "none",
    textAlign: "center",
    letterSpacing: "0.025em",
  },
  icon: {
    width: "1rem",
    height: "1rem",
  },
  comparison: {
    flexBasis: "100%",
    minWidth: 0,
    padding: "0.375rem",
    borderRadius: radii.full,
    color: "#ffffff",
    backgroundColor: "#18181b",
    font: "inherit",
  },
});

const PRODUCT_VARIANTS = VARIANTS.filter((variant) => variant.family === "products");

export function PrototypeSwitcher(props: {
  current: VariantKey;
  compare?: "baseline" | "catalog" | "solutions";
}) {
  const navigate = useNavigate({ from: "/" });
  const isProductVariant = () => PRODUCT_VARIANTS.some((variant) => variant.key === props.current);

  const step = (dir: 1 | -1) => {
    const variants = props.compare && isProductVariant() ? PRODUCT_VARIANTS : VARIANTS;
    const i = variants.findIndex((v) => v.key === props.current);
    const nextEntry = variants[(i + dir + variants.length) % variants.length];
    if (nextEntry) {
      void navigate({ search: { variant: nextEntry.key, compare: props.compare }, replace: true });
    }
  };

  onSettled(() => {
    if (import.meta.env.PROD) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.isContentEditable ||
          t.closest("input, textarea, select, button, a, [contenteditable], [role], [tabindex]"))
      ) {
        return;
      }
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Never ship the switcher: the whole prototype bar is dev-only.
  if (import.meta.env.PROD) return null;

  const name = () => VARIANTS.find((v) => v.key === props.current)?.name ?? "";

  return (
    <div {...stylex.attrs(styles.container)}>
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous variant"
        {...stylex.attrs(styles.button)}
      >
        <ChevronLeft {...stylex.attrs(styles.icon)} />
      </button>
      <span {...stylex.attrs(styles.label)}>
        {props.current.toUpperCase()} — {name()}
      </span>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next variant"
        {...stylex.attrs(styles.button)}
      >
        <ChevronRight {...stylex.attrs(styles.icon)} />
      </button>
      <Show when={isProductVariant()}>
        <select
          aria-label="Product comparison"
          value={props.compare ?? "combined"}
          onChange={(event) => {
            const value = event.currentTarget.value;
            void navigate({
              search: (previous) => ({
                ...previous,
                compare:
                  value === "baseline" || value === "catalog" || value === "solutions"
                    ? value
                    : undefined,
              }),
              replace: true,
              resetScroll: false,
            });
          }}
          {...stylex.attrs(styles.comparison)}
        >
          <option value="combined" selected={!props.compare}>
            Combined design
          </option>
          <option value="baseline" selected={props.compare === "baseline"}>
            OOS1 baseline
          </option>
          <option value="catalog" selected={props.compare === "catalog"}>
            Catalog only · baseline solutions
          </option>
          <option value="solutions" selected={props.compare === "solutions"}>
            Solutions only · baseline catalog
          </option>
        </select>
      </Show>
    </div>
  );
}
