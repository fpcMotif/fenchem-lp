import gsap from "gsap";
import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import { ingredients } from "@/components/landing/landing-content";
import { marquee, useReducedMotionFlag, useSectionAnimation } from "../motion";

/*
 * Variant J — ingredient index ticker. A thin dark band that carries the
 * cinematic hero into the white ledger: the eight portfolio entries scroll
 * past as ledger rows, mono index + name, diamond-separated.
 *
 * Contrast on bark: cream/60 ≈ 7.1:1, green-400 ≈ 7.4:1 — both clear of the
 * 4.5:1 floor at the 11px mono size. The diamonds are decoration only.
 *
 * WCAG 2.2.2 (Pause, Stop, Hide): the motion starts on its own and never
 * ends, so it needs a real control — the button pauses the GSAP tween and
 * is keyboard reachable. Under reduced motion nothing moves and no control
 * is offered; the row simply sits there as a static index.
 */

/** Track content is rendered twice; marquee() loops the first copy out. */
const TRACK_COPIES = [0, 1] as const;

export function TickerSection() {
  const reduced = useReducedMotionFlag();
  const loop = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);

  const ref = useSectionAnimation<HTMLElement>((root) => {
    marquee(root, "[data-ticker-track]", 36);
    const track = root.querySelector<HTMLElement>("[data-ticker-track]");
    loop.current = track ? (gsap.getTweensOf(track)[0] ?? null) : null;
  });

  const togglePaused = () => {
    const next = !paused;
    setPaused(next);
    loop.current?.paused(next);
  };

  return (
    <section
      ref={ref}
      id="ticker"
      aria-label="Ingredient index"
      className="relative overflow-hidden border-cream/10 border-t border-b bg-bark py-4"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-bark to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bark to-transparent"
      />

      <div className="overflow-hidden">
        <div data-ticker-track className="flex w-max will-change-transform">
          {TRACK_COPIES.map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {ingredients.map((ingredient, index) => (
                <li key={ingredient.code} className="flex items-center">
                  <span className="whitespace-nowrap font-tech text-[11px] uppercase tracking-[0.26em]">
                    <span className="text-brand-green-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="pl-3 text-cream/60">{ingredient.name}</span>
                  </span>
                  <span aria-hidden="true" className="mx-7 size-[5px] rotate-45 bg-cream/25" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {reduced ? null : (
        <button
          type="button"
          onClick={togglePaused}
          aria-pressed={paused}
          aria-label={paused ? "Resume the ingredient ticker" : "Pause the ingredient ticker"}
          className="absolute top-1/2 right-3 z-20 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-bark text-cream/70 transition-colors hover:border-cream/40 hover:text-cream focus-visible:outline-2 focus-visible:outline-brand-green-300"
        >
          {paused ? (
            /* ml-px: a play triangle reads centered slightly right of its box */
            <Play aria-hidden="true" className="ml-px size-3" />
          ) : (
            <Pause aria-hidden="true" className="size-3" />
          )}
        </button>
      )}
    </section>
  );
}
