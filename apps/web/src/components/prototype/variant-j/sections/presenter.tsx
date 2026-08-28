import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import {
  createInquiryHref,
  getIngredientsByApplication,
  ingredients,
  type IngredientApplication,
} from "@/components/landing/landing-content";
import { TECH_LABEL } from "../content";
import { drawRule, revealWords, riseIn, SplitWords, useSectionAnimation } from "../motion";

/*
 * Variant J — formulation presenter: the one interactive moment on the page.
 * Three single-choice chip groups write a live draft specification into a dark
 * ledger sheet. State is plain React — GSAP only choreographs the entrance, so
 * the swap stays instant and keyboard-driven. Chips are real buttons with
 * aria-pressed; the sheet is a polite live region so the rewrite is announced.
 */

const APPLICATIONS: IngredientApplication[] = ["Nutrition", "Food & Beverage", "Personal Care"];
const FORMATS = ["Powder", "Beadlet", "Oil suspension", "Granular"] as const;
const STANDARDS = ["ISO 9001 + GMP", "FSSC 22000", "Kosher + Halal"] as const;

/** Value cell fade. @starting-style + a transition: no JS, dies under reduced motion. */
const SWAP =
  "opacity-100 transition-opacity duration-500 ease-out starting:opacity-0 motion-reduce:transition-none";

function Chip({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`inline-flex min-h-11 items-center rounded-full px-5 py-2.5 font-body text-sm transition-colors focus-visible:outline-2 focus-visible:outline-brand-blue-700 focus-visible:outline-offset-2 ${
        selected
          ? "border border-ink bg-ink text-paper"
          : "border border-line bg-paper text-ink hover:border-mute-400"
      }`}
    >
      {label}
    </button>
  );
}

function ChipGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <fieldset data-vj-field className="min-w-0">
      <legend className={TECH_LABEL}>{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={option === value}
            onSelect={() => onChange(option)}
          />
        ))}
      </div>
    </fieldset>
  );
}

export function PresenterSection() {
  const [application, setApplication] = useState<IngredientApplication>("Nutrition");
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("Beadlet");
  const [standard, setStandard] = useState<(typeof STANDARDS)[number]>("ISO 9001 + GMP");

  const matches = getIngredientsByApplication(application);
  const shortlist = matches.slice(0, 3);

  const ref = useSectionAnimation<HTMLElement>((root) => {
    revealWords(root, "[data-vj-heading]");
    riseIn(root, "[data-vj-intro]", { stagger: 0.1 });
    drawRule(root, "[data-vj-rule]");
    riseIn(root, "[data-vj-field]", { stagger: 0.1 });
    riseIn(root, "[data-vj-sheet]");
  });

  const rows: { label: string; value: string }[] = [
    { label: "Application", value: application },
    { label: "Delivery format", value: format },
    { label: "Standards", value: standard },
    {
      label: "Matching actives",
      value: `${matches.length} of ${ingredients.length} in portfolio`,
    },
    { label: "Response", value: "< 24h with full documentation" },
  ];

  return (
    <section
      ref={ref}
      id="formulation"
      aria-labelledby="formulation-heading"
      className="scroll-mt-28 bg-paper py-28"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p data-vj-intro className={TECH_LABEL}>
          04 — Formulation
        </p>
        <h2
          data-vj-heading
          id="formulation-heading"
          className="mt-5 max-w-2xl font-display font-light text-[clamp(2.25rem,4.6vw,3.5rem)] text-ink leading-[1.06] tracking-[-0.02em]"
        >
          <SplitWords
            segments={[
              { text: "Your target spec," },
              { text: "engineered back to you", className: "italic text-brand-green-700" },
            ]}
          />
        </h2>
        <p
          data-vj-intro
          className="mt-6 max-w-xl text-pretty text-base text-mute-600 leading-relaxed"
        >
          Pick the shape of your formulation — our laboratory returns a validated proposal within
          one business day.
        </p>

        <span
          data-vj-rule
          aria-hidden="true"
          className="mt-10 block h-px w-full origin-left bg-line"
        />

        <div className="mt-10 rounded-[32px] border border-line bg-mute-50 p-8 md:p-12">
          <div className="grid gap-9 md:grid-cols-3">
            <ChipGroup
              legend="Application"
              options={APPLICATIONS}
              value={application}
              onChange={setApplication}
            />
            <ChipGroup legend="Format" options={FORMATS} value={format} onChange={setFormat} />
            <ChipGroup
              legend="Standard"
              options={STANDARDS}
              value={standard}
              onChange={setStandard}
            />
          </div>

          <div data-vj-sheet className="mt-10 rounded-3xl bg-ink p-8 text-paper md:mt-12">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-paper/15 border-b pb-5">
              <p className="font-tech text-[11px] text-brand-green-400 uppercase tracking-[0.26em]">
                Formulation brief — live
              </p>
              <p className="font-tech text-[11px] text-mute-400 uppercase tabular-nums tracking-[0.26em]">
                FN-REQ / 2026
              </p>
            </div>

            <div aria-live="polite">
              <dl>
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-6 border-paper/10 border-b py-3.5"
                  >
                    <dt className="font-tech text-[12px] text-mute-400 uppercase tracking-[0.2em]">
                      {row.label}
                    </dt>
                    <dd
                      key={row.value}
                      className={`text-right font-tech text-[12px] text-brand-green-400 ${SWAP}`}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <ul key={application} className="mt-6 space-y-2.5">
                {shortlist.map((item, index) => (
                  <li
                    key={item.code}
                    style={{ transitionDelay: `${index * 70}ms` }}
                    className={`flex items-center gap-3 font-tech text-[12px] ${SWAP}`}
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-brand-green-500"
                    />
                    <span className="text-mute-400 tabular-nums">{item.code}</span>
                    <span className="text-brand-green-400">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={createInquiryHref("contact")}
              className="group mt-8 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-brand-green-500 px-6 py-3 font-semibold text-brand-green-950 text-sm transition-colors hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-brand-green-300 focus-visible:outline-offset-2"
            >
              Submit this specification
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
