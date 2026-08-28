import { ArrowRight } from "lucide-react";
import { createInquiryHref, regions } from "@/components/landing/landing-content";
import { TECH_LABEL_DARK } from "../content";
import { SplitWords, drawRule, revealWords, riseIn, useSectionAnimation } from "../motion";

/*
 * Variant J — deep-green finale. The page arc closes where the hero opened:
 * dark ground, one green emphasis phrase, a single primary CTA. A soft CSS
 * radial glow sits behind the type (no motion — it is ambience, not an
 * event), and the six global bases land underneath as a ledger of office
 * nodes ruled off by a hairline that draws itself in.
 */
export function FinaleSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    revealWords(root, "[data-finale-heading]");
    riseIn(root, "[data-finale-rise]", { stagger: 0.1, delay: 0.2 });
    drawRule(root, "[data-finale-rule]");
    riseIn(root, "[data-finale-node]", { stagger: 0.07 });
  });

  return (
    <section
      ref={ref}
      id="global-supply"
      aria-labelledby="finale-heading"
      className="relative scroll-mt-24 overflow-hidden bg-brand-green-950 py-32 text-paper"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 size-[720px] max-w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,oklch(from_var(--color-brand-green-500)_l_c_h_/_0.25),transparent)] blur-2xl"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p data-finale-rise className={TECH_LABEL_DARK}>
          Partner with Fenchem
        </p>

        <h2
          id="finale-heading"
          data-finale-heading
          className="mx-auto mt-8 max-w-3xl font-display font-light text-5xl leading-[1.05] tracking-[-0.02em] text-paper md:text-7xl"
        >
          <SplitWords
            segments={[
              { text: "Your next formulation," },
              { text: "engineered to specification.", className: "italic text-brand-green-300" },
            ]}
          />
        </h2>

        <p data-finale-rise className="mx-auto mt-8 max-w-xl text-lg text-paper/70 leading-relaxed">
          Submit a target spec — purity, form, matrix, regulatory map — and our laboratory returns a
          validated proposal with full documentation within one business day.
        </p>

        <div data-finale-rise className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={createInquiryHref("contact")}
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-brand-green-500 px-8 py-3.5 font-semibold text-brand-green-950 text-sm transition-colors hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            Request a Specification
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#ingredients"
            className="inline-flex min-h-11 items-center rounded-full border border-paper/30 px-8 py-3.5 font-semibold text-paper text-sm transition-colors hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-300"
          >
            Explore the Portfolio
          </a>
        </div>

        <p data-finale-rise className={`mt-10 ${TECH_LABEL_DARK}`}>
          Response time under 24h — technical dossiers on request
        </p>
      </div>

      <div className="relative mx-auto mt-24 max-w-5xl px-6">
        <div
          aria-hidden="true"
          data-finale-rule
          className="block h-px w-full origin-left bg-brand-green-800"
        />
        <h3 id="finale-bases" className={`mt-10 text-center ${TECH_LABEL_DARK}`}>
          6 Global Bases — 40+ Countries Served
        </h3>
        <ul
          aria-labelledby="finale-bases"
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6"
        >
          {regions.map((region) => (
            <li key={region.city} data-finale-node className="text-center">
              <p className="font-display text-lg text-paper leading-tight">{region.city}</p>
              <p className={`mt-2 ${TECH_LABEL_DARK}`}>{region.country}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
