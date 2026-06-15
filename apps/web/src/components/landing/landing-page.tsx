import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Globe2,
  Leaf,
  ShieldCheck,
  Sprout,
  Truck,
} from "lucide-react";

import {
  certifications,
  createInquiryHref,
  getIngredientsByApplication,
  heroImage,
  navLinks,
  processSteps,
  proofCards,
  regions,
  toAnchor,
} from "./landing-content";

const focusOnDark =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint";
const focusOnLight =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest";
const actionBase =
  "box-border inline-flex min-h-11 w-full max-w-full min-w-0 flex-wrap items-center justify-center gap-2 whitespace-normal break-words rounded-full text-center font-semibold text-sm/5 transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.96] sm:w-fit";
const darkAction = `${actionBase} ${focusOnDark}`;
const lightAction = `${actionBase} ${focusOnLight}`;
const eyebrow = "font-tech text-xs/5 uppercase";

const proofIcons = [Leaf, FlaskConical, Sprout, ShieldCheck] as const;
const ingredientGroups = [
  { label: "Nutrition", items: getIngredientsByApplication("Nutrition") },
  { label: "Food & Beverage", items: getIngredientsByApplication("Food & Beverage") },
  { label: "Personal Care", items: getIngredientsByApplication("Personal Care") },
] as const;

export function LandingPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-cream font-body text-bark selection:bg-mint selection:text-forest">
      <a
        href="#industries"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-cream focus:px-4 focus:py-3 focus:text-forest focus:shadow-ambient focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
      >
        Skip to ingredients
      </a>
      <Hero />
      <IndustryProof />
      <QualityProcess />
      <IngredientPortfolio />
      <GlobalSupply />
      <ContactFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[82svh] overflow-hidden bg-forest text-cream">
      <img
        src={heroImage.src}
        alt={heroImage.alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.224_0.006_121.918_/_0.88),oklch(0.288_0.04_160.598_/_0.62),oklch(0.224_0.006_121.918_/_0.25))]" />
      <header className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-5 py-5 md:px-8 lg:px-10">
        <a
          href="#top"
          className={`order-1 inline-flex min-h-10 items-center rounded-sm font-display text-2xl text-cream ${focusOnDark}`}
        >
          Fenchem
        </a>
        <nav
          aria-label="Primary navigation"
          className="order-2 flex w-full flex-wrap items-center gap-x-4 gap-y-2 md:w-auto md:gap-x-7"
        >
          {navLinks.map((link) => (
            <a
              key={link.section}
              href={toAnchor(link.section)}
              className={`inline-flex min-h-10 items-center rounded-sm py-1 text-cream/85 text-sm/6 transition-[color] duration-200 hover:text-mint ${focusOnDark}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={createInquiryHref("contact")}
          className={`order-3 px-5 py-2.5 text-forest hover:bg-blush md:ml-auto ${lightAction} bg-mint`}
        >
          Request specs
          <ArrowRight className="size-4 shrink-0" aria-hidden />
        </a>
      </header>

      <div
        id="top"
        className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-8 md:pt-24 lg:px-10"
      >
        <div className="max-w-6xl">
          <p className={`${eyebrow} text-mint`}>Botanical intelligence since 1995</p>
          <h1 className="mt-6 max-w-6xl text-balance font-display text-5xl leading-none text-cream sm:text-7xl lg:text-8xl">
            Fenchem
          </h1>
          <p className="mt-7 max-w-2xl text-cream/86 text-lg leading-8 md:text-xl">
            Production-ready botanical and functional ingredients for nutrition, food, beverage, and
            personal care teams that need clean specifications without procurement friction.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={toAnchor("industries")}
              className={`${lightAction} bg-mint px-7 py-4 text-forest hover:bg-blush`}
            >
              Explore portfolio
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </a>
            <a
              href={createInquiryHref("quality")}
              className={`${darkAction} border border-cream/40 px-7 py-4 text-cream hover:border-mint hover:bg-cream/10`}
            >
              Request documentation
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-cream/15 border-t bg-bark/35">
        <dl className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-cream/15 px-5 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8 lg:px-10">
          {[
            ["25+", "years of ingredient expertise"],
            ["40+", "countries supported"],
            ["ISO/GMP", "audited quality systems"],
          ].map(([value, label]) => (
            <div key={label} className="py-5 md:px-6">
              <dt className="text-cream/72 text-sm">{label}</dt>
              <dd className="mt-1 font-display text-3xl text-mint">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function IndustryProof() {
  return (
    <section id="industries" className="scroll-mt-24 bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className={`${eyebrow} text-moss`}>Supply-ready applications</p>
            <h2 className="mt-5 max-w-xl text-balance font-display text-4xl leading-tight text-forest sm:text-5xl md:text-6xl">
              Built for real formulation work.
            </h2>
          </div>
          <p className="max-w-2xl text-bark/72 text-lg leading-8">
            The page is quiet on purpose: direct ingredient categories, visible proof, and clear
            contact routes for buyers who already know what they need.
          </p>
        </div>

        <div className="mt-14 grid grid-flow-dense gap-4 lg:grid-cols-12">
          {proofCards.map((card, index) => {
            const Icon = proofIcons[index];
            const span =
              index === 0
                ? "lg:col-span-7 lg:row-span-2"
                : index < 3
                  ? "lg:col-span-5"
                  : "lg:col-span-12";
            return (
              <article
                key={card.title}
                className={`${span} group overflow-hidden rounded-lg border border-pebble bg-white shadow-lift transition-[box-shadow] duration-200 hover:shadow-ambient`}
              >
                <div className="grid h-full min-h-72 md:grid-cols-2">
                  <div className="overflow-hidden">
                    <img
                      src={card.image.src}
                      alt={card.image.alt}
                      className="h-full min-h-64 w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 transition-transform duration-700 ease-out group-hover:scale-105"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="flex h-full flex-col justify-between p-7">
                    <div>
                      <span className="flex size-11 items-center justify-center rounded-lg bg-mint text-forest">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="mt-7 text-balance font-display text-3xl leading-tight text-forest">
                        {card.title}
                      </h3>
                      <p className="mt-4 text-bark/72 leading-7">{card.copy}</p>
                    </div>
                    <p className={`${eyebrow} mt-8 text-clay`}>{card.metric}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function QualityProcess() {
  return (
    <section id="quality" className="scroll-mt-24 bg-stone py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="min-w-0">
          <p className={`${eyebrow} text-moss`}>Quality without the chase</p>
          <h2 className="mt-5 text-balance font-display text-4xl leading-tight text-forest sm:text-5xl md:text-6xl">
            Every lot has a paper trail before it has a sales story.
          </h2>
          <div className="mt-10 flex w-full min-w-0 flex-wrap gap-3">
            {certifications.map((certification) => (
              <span
                key={certification}
                className={`${eyebrow} rounded-lg border border-moss/30 bg-cream px-4 py-2 text-forest`}
              >
                {certification}
              </span>
            ))}
          </div>
        </div>

        <ol className="space-y-4">
          {processSteps.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-pebble bg-cream p-6">
              <div className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-forest font-tech text-cream text-sm"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-balance font-display text-2xl text-forest">{step.title}</h3>
                  <p className="mt-2 text-bark/72 leading-7">{step.copy}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function IngredientPortfolio() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={`${eyebrow} text-moss`}>Ingredient portfolio</p>
            <h2 className="mt-5 max-w-2xl text-balance font-display text-4xl leading-tight text-forest sm:text-5xl md:text-6xl">
              A tighter route from sample to scale.
            </h2>
          </div>
          <a
            href={createInquiryHref("industries")}
            className={`${darkAction} w-fit bg-forest px-6 py-3 text-cream hover:bg-clay`}
          >
            Ask for a spec sheet
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {ingredientGroups.map((group) => (
            <section
              key={group.label}
              aria-labelledby={`${group.label.toLowerCase().replace(/[^a-z]+/g, "-")}-heading`}
              className="rounded-lg border border-pebble bg-white p-6"
            >
              <h3
                id={`${group.label.toLowerCase().replace(/[^a-z]+/g, "-")}-heading`}
                className="font-display text-3xl text-forest"
              >
                {group.label}
              </h3>
              <ul className="mt-6 space-y-4">
                {group.items.map((ingredient) => (
                  <li
                    key={ingredient.name}
                    className="border-pebble border-t pt-4 first:border-t-0 first:pt-0"
                  >
                    <p className="font-semibold text-forest">{ingredient.name}</p>
                    <p className="mt-1 text-bark/72 text-sm">{ingredient.specification}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlobalSupply() {
  return (
    <section id="global-supply" className="scroll-mt-24 bg-forest py-24 text-cream md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className={`${eyebrow} text-mint`}>Global supply</p>
            <h2 className="mt-5 text-balance font-display text-4xl leading-tight text-cream sm:text-5xl md:text-6xl">
              Regional support without handoff fog.
            </h2>
            <p className="mt-6 max-w-lg text-cream/76 leading-8">
              Fenchem pairs global production with local commercial and documentation support so
              teams can move from inquiry to compliant supply with fewer loops.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-cream/15 bg-cream/15 sm:grid-cols-2">
            {regions.map((region) => (
              <div
                key={region.city}
                className="bg-forest p-6 transition-[background-color] duration-200 hover:bg-fern"
              >
                <div className="flex items-start gap-3">
                  <Globe2 className="mt-1 size-5 shrink-0 text-mint" aria-hidden />
                  <div>
                    <h3 className="font-display text-2xl text-cream">{region.city}</h3>
                    <p className="mt-1 text-cream/72 text-sm">{region.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFooter() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-bark text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div className="min-w-0">
          <p className={`${eyebrow} text-blush`}>Start with the spec</p>
          <h2 className="mt-5 max-w-3xl text-balance font-display text-4xl leading-tight text-cream sm:text-5xl md:text-6xl">
            Tell Fenchem what you are formulating.
          </h2>
          <p className="mt-6 max-w-xl text-cream/74 leading-8">
            Send a target ingredient, application, format, and market. The technical team can return
            documentation, lead times, and sampling options within one business day.
          </p>
          <div className="mt-10 flex w-full min-w-0 flex-wrap gap-3">
            <a
              href={createInquiryHref("contact")}
              className={`${lightAction} w-full bg-mint px-5 py-4 text-forest hover:bg-blush sm:w-fit sm:px-7`}
            >
              <span className="min-w-0">Contact technical sales</span>
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </a>
            <a
              href={toAnchor("industries")}
              className={`${darkAction} w-full border border-cream/30 px-5 py-4 text-cream hover:border-mint hover:bg-cream/10 sm:w-fit sm:px-7`}
            >
              Review portfolio
            </a>
          </div>
        </div>
        <div className="min-w-0 rounded-lg border border-cream/12 bg-cream/[0.04] p-7">
          <Truck className="size-9 text-mint" aria-hidden />
          <h3 className="mt-6 text-balance font-display text-3xl text-cream">What to include</h3>
          <ul className="mt-6 space-y-4 text-cream/72 leading-7">
            {[
              "Target ingredient or blend",
              "Delivery format and annual volume",
              "Destination market and compliance needs",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-blush" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-cream/10 border-t px-5 py-6 md:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-cream/65 text-xs md:flex-row md:items-center md:justify-between">
          <p>Fenchem Biotek Ltd. Rooted in nature, refined by science.</p>
          <p>2026 Fenchem. Specifications available on request.</p>
        </div>
      </div>
    </footer>
  );
}
