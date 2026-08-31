import { ArrowUpRight } from "lucide-react";
import { industries } from "@/components/landing/landing-content";
import { imgForIndustry, INDUSTRY_COPY, TECH_LABEL } from "../content";
import {
  drawRule,
  revealWords,
  riseIn,
  SplitWords,
  settleImage,
  useSectionAnimation,
} from "../motion";

/*
 * Variant J — Industries: the ledger opens. White spec ground, one italic
 * green phrase in the display heading, then the three application domains as
 * full-width numbered rows. Hairlines draw themselves in above each row;
 * hover state (row wash + arrow travel) belongs entirely to CSS, so GSAP
 * never touches a property the transition owns. SSR markup is the final
 * state — under reduced motion nothing is hidden, it simply renders.
 */
export function IndustriesSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    riseIn(root, "[data-ind-eyebrow], [data-ind-intro]", { stagger: 0.12 });
    revealWords(root, "[data-ind-heading]", { delay: 0.08 });
    drawRule(root, "[data-ind-rule]", { stagger: 0.12 });
    riseIn(root, "[data-ind-row]", { stagger: 0.12, delay: 0.14 });
    settleImage(root, "[data-ind-thumb]");
  });

  return (
    <section
      ref={ref}
      id="industries"
      aria-labelledby="industries-heading"
      className="scroll-mt-28 bg-paper py-28"
    >
      <div className="mx-auto max-w-[1480px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
          <div className="md:col-span-7">
            <p data-ind-eyebrow className={TECH_LABEL}>
              01 — Application Domains
            </p>
            <h2
              id="industries-heading"
              data-ind-heading
              className="mt-6 font-display text-5xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl"
            >
              <SplitWords
                segments={[
                  { text: "Built for three" },
                  {
                    text: "industries.",
                    className: "italic text-brand-green-700",
                  },
                ]}
              />
            </h2>
          </div>
          <p
            data-ind-intro
            className="max-w-sm leading-relaxed text-mute-600 md:col-span-5 md:justify-self-end md:text-right"
          >
            Clinically supported actives engineered for the precise demands of each formulation
            discipline.
          </p>
        </div>

        <ul className="mt-20">
          {industries.map((industry, index) => (
            <li key={industry.title}>
              <a
                href="#ingredients"
                aria-label={`${industry.title} — explore the matching ingredients`}
                className="group block focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-green-700"
              >
                <span
                  data-ind-rule
                  aria-hidden="true"
                  className="block h-px w-full origin-left bg-line"
                />
                <div
                  data-ind-row
                  className="grid gap-5 px-4 py-9 transition-colors duration-300 group-hover:bg-mute-50 md:grid-cols-12 md:items-center md:gap-6 md:px-6 md:py-12"
                >
                  <span className="font-tech text-sm tracking-[0.22em] text-brand-green-700 md:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-light tracking-tight text-ink transition-colors duration-300 group-hover:text-brand-green-700 md:col-span-4">
                    {industry.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-mute-600 md:col-span-4">
                    {INDUSTRY_COPY[industry.title] ?? industry.copy}
                  </p>
                  <div className="flex items-center justify-between gap-5 md:col-span-3 md:justify-end">
                    <span className="block size-16 shrink-0 overflow-hidden rounded-xl md:size-20">
                      <img
                        data-ind-thumb
                        src={imgForIndustry(industry).src}
                        alt={imgForIndustry(industry).alt}
                        loading="lazy"
                        className="h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10"
                      />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 shrink-0 text-mute-600 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-green-700"
                    />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <span data-ind-rule aria-hidden="true" className="block h-px w-full origin-left bg-line" />
      </div>
    </section>
  );
}
