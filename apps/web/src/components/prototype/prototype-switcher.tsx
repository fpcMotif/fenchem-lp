import { radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect } from "react";

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
    minWidth: "16rem",
    userSelect: "none",
    textAlign: "center",
    letterSpacing: "0.025em",
  },
  icon: {
    width: "1rem",
    height: "1rem",
  },
});

export function PrototypeSwitcher({ current }: { current: VariantKey }) {
  const navigate = useNavigate({ from: "/" });

  const step = useCallback(
    (dir: 1 | -1) => {
      const i = VARIANTS.findIndex((v) => v.key === current);
      const nextEntry = VARIANTS[(i + dir + VARIANTS.length) % VARIANTS.length];
      if (nextEntry) {
        void navigate({ search: { variant: nextEntry.key }, replace: true });
      }
    },
    [current, navigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) {
        return;
      }
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  // Never ship the switcher: the whole prototype bar is dev-only.
  if (import.meta.env.PROD) return null;

  const name = VARIANTS.find((v) => v.key === current)?.name ?? "";

  return (
    <div {...stylex.props(styles.container)}>
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous variant"
        {...stylex.props(styles.button)}
      >
        <ChevronLeft {...stylex.props(styles.icon)} />
      </button>
      <span {...stylex.props(styles.label)}>
        {current.toUpperCase()} — {name}
      </span>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next variant"
        {...stylex.props(styles.button)}
      >
        <ChevronRight {...stylex.props(styles.icon)} />
      </button>
    </div>
  );
}
