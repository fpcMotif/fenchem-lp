import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  type DivisionKey,
  divisionForApplication,
  getFeaturedIngredients,
  type Ingredient,
  ingredients,
} from "@/components/landing/landing-content";
import { imgFor, TECH_LABEL } from "../content";
import { drawRule, revealWords, riseIn, SplitWords, useSectionAnimation } from "../motion";

/*
 * Variant J — the ingredient ledger. Six featured actives on a hairline grid
 * (gap-px over bg-line, paper cards), floated on a quiet mute-50 band so the
 * spec discipline reads as a page in a laboratory register. Division accents
 * appear only here, and only as the chip dot. Cards rise once; the ledger
 * hairlines draw themselves in per card. SSR markup is the final state.
 */

/** Division accent dot — the chip itself stays paper/ink for contrast. */
const DIVISION_DOT: Record<DivisionKey, string> = {
  nutrition: "bg-nutrition border border-brand-green-700/30",
  food: "bg-food",
  cosmetics: "bg-cosmetics",
  feed: "bg-feed",
  agro: "bg-agro",
  chem: "bg-chem",
};

const FEATURED = getFeaturedIngredients();
/** The registry curates six; fall back to the head of the portfolio. */
const MATRIX_ITEMS: Ingredient[] = FEATURED.length === 6 ? FEATURED : ingredients.slice(0, 6);

function LedgerRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span data-rule aria-hidden="true" className="block h-px origin-left bg-line" />
      <dl className="flex items-baseline justify-between gap-4 py-3">
        <dt className={TECH_LABEL}>{label}</dt>
        <dd className="text-right text-ink text-sm leading-snug">{value}</dd>
      </dl>
    </>
  );
}

export function MatrixSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    revealWords(root, "[data-matrix-heading]");
    riseIn(root, "[data-matrix-eyebrow]", { delay: 0.1 });
    riseIn(root, "[data-matrix-aside]", { delay: 0.25 });
    riseIn(root, "[data-matrix-card]", { stagger: 0.08 });
    for (const card of root.querySelectorAll<HTMLElement>("[data-matrix-card]")) {
      drawRule(card, "[data-rule]", { stagger: 0.08, delay: 0.3 });
    }
  });

  return (
    <section
      ref={ref}
      id="ingredients"
      aria-labelledby="ingredients-heading"
      className="scroll-mt-28 bg-paper py-28"
    >
      <div className="mx-auto max-w-[1480px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p data-matrix-eyebrow className={TECH_LABEL}>
              02 — Active Compounds
            </p>
            <h2
              id="ingredients-heading"
              data-matrix-heading
              className="mt-5 max-w-2xl text-balance font-display font-light text-[clamp(2.4rem,4.6vw,4rem)] text-ink leading-[1.06] tracking-[-0.03em]"
            >
              <SplitWords
                segments={[
                  { text: "The ingredient" },
                  { text: "matrix.", className: "italic text-brand-green-700" },
                ]}
              />
            </h2>
          </div>
          <a
            data-matrix-aside
            href="#contact"
            className="group inline-flex min-h-11 items-center gap-2 font-semibold text-brand-blue-700 text-sm underline-offset-4 transition-colors hover:text-brand-blue-800 hover:underline focus-visible:outline-2 focus-visible:outline-brand-blue-700 focus-visible:outline-offset-2"
          >
            Request full specifications
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      <div className="mt-14 bg-mute-50 py-14">
        <div className="mx-auto max-w-[1480px] px-5 md:px-10">
          <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 md:grid-cols-3">
            {MATRIX_ITEMS.map((item) => {
              const art = imgFor(item);
              const division = divisionForApplication(item.application);
              return (
                <article key={item.code} data-matrix-card className="group flex flex-col bg-paper">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={art.src}
                      alt={art.alt}
                      loading="lazy"
                      className="h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-sm border border-line bg-paper px-2 py-1 font-tech text-[10px] text-ink uppercase tracking-[0.18em]">
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-full ${DIVISION_DOT[division]}`}
                      />
                      {item.application}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-6 py-7 md:px-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className={TECH_LABEL}>{item.code}</span>
                      <span className={TECH_LABEL}>{item.category}</span>
                    </div>
                    <h3 className="mt-4 font-display font-light text-2xl text-ink leading-tight tracking-[-0.02em]">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-display text-mute-600 text-sm italic">{item.latin}</p>

                    <div className="mt-6">
                      <LedgerRow label="Purity" value={item.purity} />
                      <LedgerRow label="Form" value={item.form} />
                    </div>

                    <a
                      href="#contact"
                      aria-label={`Request spec for ${item.name}`}
                      className="group/spec mt-auto inline-flex min-h-11 items-center gap-2 pt-5 font-tech text-[11px] text-brand-blue-700 uppercase tracking-[0.26em] underline-offset-4 transition-colors hover:text-brand-blue-800 hover:underline focus-visible:outline-2 focus-visible:outline-brand-blue-700 focus-visible:outline-offset-2"
                    >
                      Request spec
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-300 group-hover/spec:-translate-y-0.5 group-hover/spec:translate-x-0.5"
                      />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
