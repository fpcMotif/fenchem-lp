import gsap from "gsap";
import { FlaskConical, Globe, Sprout } from "lucide-react";
import { certifications, pillars } from "@/components/landing/landing-content";
import { IMAGES, ORIGIN_QUOTE, TECH_LABEL_DARK } from "../content";
import { drawRule, riseIn, settleImage, useSectionAnimation } from "../motion";

/*
 * Variant I — the editorial dark beat: origin pull-quote, then the quality
 * standards it commits to. This is the page's second and last scrubbed
 * moment — the four quote lines ink in line by line as you scroll, which is
 * why they stay plain text (the line, not the word, is the unit here).
 * Everything below the quote is the shared germination voice: the canopy
 * band settles, the pillars rise, the certification rule draws itself in.
 */

const PILLAR_ICONS = [Sprout, FlaskConical, Globe] as const;

export function OriginStandardsSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    const lines = root.querySelectorAll("[data-quote-line]");
    const quote = root.querySelector("[data-quote]");
    if (lines.length && quote) {
      gsap.from(lines, {
        opacity: 0.18,
        y: 12,
        stagger: 0.25,
        ease: "none",
        scrollTrigger: { trigger: quote, start: "top 75%", end: "top 30%", scrub: true },
      });
    }

    riseIn(root, "[data-quote-eyebrow]");
    riseIn(root, "[data-quote-attribution]", { start: "top 88%" });
    settleImage(root, "[data-standards-img]");
    riseIn(root, "[data-standards-head] > *", { stagger: 0.1 });
    riseIn(root, "[data-pillar]", { stagger: 0.12 });
    drawRule(root, "[data-cert-rule]");
    riseIn(root, "[data-cert-line]", { stagger: 0.08 });
  });

  return (
    <section
      ref={ref}
      id="quality"
      aria-labelledby="quality-heading"
      className="scroll-mt-28 bg-bark py-32 text-cream"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Origin — the pull-quote, inked in line by line on scroll */}
        <div className="mx-auto max-w-4xl text-center">
          <p data-quote-eyebrow className={TECH_LABEL_DARK}>
            {ORIGIN_QUOTE.eyebrow}
          </p>
          <blockquote data-quote className="mt-10">
            <p className="font-display font-light text-4xl leading-[1.15] tracking-[-0.02em] md:text-6xl">
              {ORIGIN_QUOTE.lines.map((line, index) => (
                <span
                  key={line}
                  data-quote-line
                  className={
                    index === ORIGIN_QUOTE.lines.length - 1
                      ? "block italic text-mist will-change-transform"
                      : "block will-change-transform"
                  }
                >
                  {line}
                </span>
              ))}
            </p>
            <footer
              data-quote-attribution
              className="mt-10 font-tech text-[11px] text-cream/50 uppercase tracking-[0.26em]"
            >
              {ORIGIN_QUOTE.attribution}
            </footer>
          </blockquote>
        </div>

        {/* The canopy the record starts under */}
        <div className="mt-24 aspect-[21/9] overflow-hidden rounded-[24px]">
          <img
            data-standards-img
            src={IMAGES.standards.src}
            alt={IMAGES.standards.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Standards — the three pillars of the quality program */}
        <div data-standards-head className="mt-20 grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
          <h2
            id="quality-heading"
            className="font-display font-light text-3xl leading-[1.15] tracking-[-0.02em] md:text-4xl"
          >
            Science-backed <span className="text-brand-green-400">standards.</span>
          </h2>
          <p className="max-w-md text-cream/60 text-sm leading-relaxed">
            Every lot. Every market. Every release — documented to your regulatory map before you
            ask for it.
          </p>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index];
            return (
              <div key={pillar.title} data-pillar>
                <span className="flex size-10 items-center justify-center rounded-lg bg-brand-green-900">
                  <Icon
                    aria-hidden="true"
                    className="size-4 text-brand-green-300"
                    strokeWidth={1.5}
                  />
                </span>
                <h3 className="mt-5 font-display text-xl tracking-tight">{pillar.title}</h3>
                <p className="mt-3 text-cream/60 text-sm leading-relaxed">{pillar.copy}</p>
              </div>
            );
          })}
        </div>

        {/* Certification ledger strip */}
        <div className="mt-20">
          <div data-cert-rule className="block h-px origin-left bg-cream/15" />
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <p
              data-cert-line
              className="font-tech text-[11px] text-cream/50 uppercase tracking-[0.26em]"
            >
              Certified quality systems
            </p>
            <ul
              data-cert-line
              className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-tech text-[11px] text-cream/50 uppercase tracking-[0.26em]"
            >
              {certifications.map((certification) => (
                <li key={certification}>{certification}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
