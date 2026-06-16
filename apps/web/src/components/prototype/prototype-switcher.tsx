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

export function PrototypeSwitcher({ current }: { current: VariantKey }) {
  const navigate = useNavigate({ from: "/" });

  const step = useCallback(
    (dir: 1 | -1) => {
      const i = VARIANTS.findIndex((v) => v.key === current);
      const next = VARIANTS[(i + dir + VARIANTS.length) % VARIANTS.length].key;
      navigate({ search: { variant: next }, replace: true });
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
    <div className="-translate-x-1/2 fixed bottom-5 left-1/2 z-[9999] flex items-center gap-1 rounded-full border border-white/15 bg-zinc-950/90 px-2 py-1.5 font-mono text-white text-xs shadow-2xl backdrop-blur">
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous variant"
        className="rounded-full p-1.5 transition-colors hover:bg-white/15"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="min-w-64 select-none text-center tracking-wide">
        {current.toUpperCase()} — {name}
      </span>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next variant"
        className="rounded-full p-1.5 transition-colors hover:bg-white/15"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
