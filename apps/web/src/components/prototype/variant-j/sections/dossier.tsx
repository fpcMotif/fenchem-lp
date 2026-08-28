import { ArrowRight, FileDown } from "lucide-react";
import { createInquiryHref, ingredients } from "@/components/landing/landing-content";
import { IMAGES, TECH_LABEL } from "../content";
import {
  SplitWords,
  drawRule,
  revealWords,
  riseIn,
  settleImage,
  useSectionAnimation,
} from "../motion";

/*
 * Variant J — Product Dossier: the flagship deep-dive on the page's white
 * ground. Left, a single botanical plate with a ledger caption; right, the
 * spec sheet itself. The signature moment is the ledger — five rows rise in
 * sequence while their hairlines draw left to right, so the section reads as
 * a record being filled in rather than a card fading up. Every value comes
 * from the ingredient registry; nothing here is asserted beyond the entry.
 */

/** Ashwagandha KSM-66 — the flagship trade-name active, as in variant H. */
const DOSSIER = ingredients[0];

const SPEC_ROWS = [
  { label: "Botanical source", value: DOSSIER.latin },
  { label: "Assay", value: DOSSIER.purity },
  { label: "Form", value: DOSSIER.form },
  { label: "Application", value: DOSSIER.useCase },
  { label: "Spec ref", value: DOSSIER.code },
];

/** Finished formats the extract ships into (variant H's documented list). */
const FORMATS = ["Capsule", "Tablet", "Softgel", "Powder blend"];

export function DossierSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    settleImage(root, "[data-dossier-img]");
    riseIn(root, "[data-dossier-caption]", { delay: 0.15 });
    riseIn(root, "[data-dossier-eyebrow]");
    revealWords(root, "[data-dossier-heading]", { delay: 0.1 });
    riseIn(root, "[data-dossier-intro]", { delay: 0.35 });
    drawRule(root, "[data-dossier-rule]", { stagger: 0.06 });
    riseIn(root, "[data-dossier-row]", { stagger: 0.06 });
    riseIn(root, "[data-dossier-chip]", { stagger: 0.05 });
    riseIn(root, "[data-dossier-ctas]");
  });

  return (
    <section
      ref={ref}
      id="dossier"
      aria-labelledby="dossier-heading"
      className="scroll-mt-28 bg-paper py-28"
    >
      <div className="mx-auto grid max-w-[1240px] gap-14 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden rounded-[24px] bg-mist/40">
            <img
              data-dossier-img
              src={IMAGES.dossier.src}
              alt={IMAGES.dossier.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-dossier-caption
            className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 rounded-[14px] border border-line px-4 py-3"
          >
            <span className={TECH_LABEL}>{DOSSIER.code} — dossier reference</span>
            <span className="font-tech text-[11px] text-ink uppercase tracking-[0.26em]">
              {DOSSIER.category}
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p data-dossier-eyebrow className={TECH_LABEL}>
            03 — Product Dossier
          </p>

          <h2
            id="dossier-heading"
            data-dossier-heading
            className="mt-6 font-display font-light text-[clamp(2.25rem,4.6vw,3.75rem)] text-ink leading-[1.06] tracking-[-0.02em]"
          >
            <SplitWords
              segments={[
                { text: "One active," },
                { text: "documented to the lot.", className: "italic text-brand-green-700" },
              ]}
            />
          </h2>

          <p data-dossier-intro className="mt-7 max-w-xl text-lg text-mute-600 leading-relaxed">
            {DOSSIER.name} — {DOSSIER.latin}, supplied as a {DOSSIER.specification.toLowerCase()}{" "}
            standardised to {DOSSIER.purity}. Every compound in the matrix carries this depth of
            documentation; the {DOSSIER.category.toLowerCase()} is shown here as the working
            example.
          </p>

          <div
            aria-hidden="true"
            data-dossier-rule
            className="mt-10 block h-px max-w-xl origin-left bg-line"
          />
          <dl className="max-w-xl">
            {SPEC_ROWS.map((row) => (
              <div
                key={row.label}
                data-dossier-row
                className="relative flex items-baseline justify-between gap-6 py-3.5"
              >
                <dt className={TECH_LABEL}>{row.label}</dt>
                <dd className="text-right font-tech text-ink text-sm">
                  {row.value}
                  <span
                    aria-hidden="true"
                    data-dossier-rule
                    className="absolute inset-x-0 bottom-0 h-px origin-left bg-line"
                  />
                </dd>
              </div>
            ))}
          </dl>

          <p className={`mt-8 ${TECH_LABEL}`}>Finished formats</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {FORMATS.map((format) => (
              <li
                key={format}
                data-dossier-chip
                className="rounded-full border border-brand-green-200 bg-brand-green-50 px-3.5 py-1.5 font-medium text-brand-green-800 text-xs"
              >
                {format}
              </li>
            ))}
          </ul>

          <div data-dossier-ctas className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={createInquiryHref("quality")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-brand-green-500 px-7 py-3.5 font-semibold text-brand-green-950 text-sm transition-colors hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-700"
            >
              Request this specification
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={createInquiryHref("contact")}
              className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue-700 px-7 py-3.5 font-semibold text-brand-blue-700 text-sm transition-colors hover:bg-brand-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-700"
            >
              <FileDown aria-hidden="true" className="size-4" />
              Technical data sheet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
