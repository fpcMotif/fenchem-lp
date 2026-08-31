/*
 * PROTOTYPE — Variant K: "Color Block" — campaign-editorial color-blocking.
 *
 * Provenance: the owner's moodboard — studio campaign photography on seamless
 * single-hue fields (a subject centered on a flat orange/purple/teal ground).
 * The tension: the brand book forbids the auxiliary division colors from ever
 * becoming a page's PRIMARY surface. K resolves it by demoting each division
 * hue to a SECTION WASH at 8–15% opacity (bg-nutrition/15, bg-food/10,
 * bg-cosmetics/10) with the fully saturated color rationed to small doses:
 * thick image frames, pill-chip borders, dots, and one oversized outlined
 * numeral per band. Clean white (paper) stays the base canvas between bands,
 * so the saturated fields of the moodboard survive only as tints and trims —
 * campaign energy inside brand law.
 *
 * Type: the brand default pairing — Newsreader (font-display) for oversized
 * display lines, Plus Jakarta Sans for body — set BIGGER and friendlier than
 * VariantH: generous, not cavernous, whitespace.
 *
 * Measured color decisions inherited from variant-h.tsx / the 2026-08 review:
 *   - Primary CTA: text-brand-green-950 on bg-brand-green-500 (5.18:1);
 *     hover bg-brand-green-400 (6.92:1). Never white on green-500.
 *   - Blue is INTERACTIVE-ONLY (outline CTA, text links). Eyebrows and
 *     section numerals: brand-green-700 on paper (5.73:1).
 *   - Small-text floor mute-600 (6.00:1); font-tech micro-labels floor 11px.
 *   - Finale labels: full-opacity green-400 (6.92:1) / green-300 on green-950.
 *
 * Deliberate deviations (recorded per the review's DIVISION_DOT precedent):
 *   - Nutrition's #FFF67F fails as text/stroke at any size on paper, so the
 *     Nutrition band's outlined numeral strokes in brand-green-600 and its
 *     hero-panel caption accent is green-700; the yellow itself is reserved
 *     for photo frames, chip borders, and dots where it is decorative.
 *   - Personal Care carries a single ingredient chip (the shared data module
 *     lists exactly one Personal Care active) — no ingredients are invented.
 *
 * Section order:
 *   Nav → Hero (color-block collage) → Division bands (signature module)
 *   → Stat moment → Compact matrix strip → Certifications row
 *   → Deep-green finale → Slim footer
 */
import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { ArrowRight, ArrowUpRight, Leaf, Menu, X } from "lucide-react";
import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { Eyebrow, Intro, Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certificationDetails,
  company,
  createInquiryHref,
  divisionForApplication,
  getFeaturedIngredients,
  getIngredientsByApplication,
  industries,
  type DivisionKey,
  type Ingredient,
  type IngredientApplication,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Constants ─────────────────────────────── */

/* Verified-rendering Unsplash assets, reused from variant-h / landing-content. */
const IMG = {
  heroLeaves: {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80",
    alt: "Lush green botanical leaves in morning light — Fenchem's raw-material sourcing",
  },
  heroCare: {
    src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    alt: "Minimal skincare bottle in warm natural light — the Personal Care division",
  },
  bandNutrition: {
    src: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=1200&q=80",
    alt: "Dried botanical roots and herbs arranged for extraction",
  },
  bandFood: {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    alt: "Fresh food bowl with greens, grains, and natural color sources in daylight",
  },
  bandCare: {
    src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80",
    alt: "Macro leaf covered in dew droplets — hydration, the signature of hyaluronic acid",
  },
} as const;

const NAV_LINKS = [
  { label: "Divisions", href: "#divisions" },
  { label: "Portfolio", href: "#matrix" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
] as const;

/** Reusable spec-sheet micro-label at its measured floor (11px, mute-600). */
const TECH_LABEL = "font-tech text-[11px] uppercase tracking-[0.24em] text-mute-600";

/** Primary CTA — measured: green-950 on green-500 (5.18:1), hover green-400 (6.92:1). */
const CTA_PRIMARY =
  "group inline-flex min-h-11 items-center gap-2.5 rounded-sm bg-brand-green-500 px-7 py-3.5 font-body text-sm font-semibold text-brand-green-950 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-700";

/** Same CTA on the deep-green finale — light focus ring for the dark ground. */
const CTA_PRIMARY_DARK =
  "group inline-flex min-h-11 items-center gap-2.5 rounded-sm bg-brand-green-500 px-8 py-4 font-body text-sm font-bold text-brand-green-950 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-300";

/** Secondary CTA — blue is interactive-only per the brand review. */
const CTA_OUTLINE_BLUE =
  "inline-flex min-h-11 items-center gap-2.5 rounded-sm border border-brand-blue-700 px-7 py-3.5 font-body text-sm font-semibold text-brand-blue-700 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-blue-50 focus-visible:outline-2";

/** Division accent top-border for matrix cards — saturated hue in a 4px dose. */
const MATRIX_TOP: Record<DivisionKey, string> = {
  nutrition: "border-t-nutrition",
  food: "border-t-food",
  cosmetics: "border-t-cosmetics",
  chem: "border-t-chem",
  agro: "border-t-agro",
  feed: "border-t-feed",
};

/* ─────────────────────────────── Division bands data ─────────────────────────────── */

type BandConfig = {
  key: string;
  numeral: string;
  application: IngredientApplication;
  /** 8–15% wash — the moodboard's saturated field, demoted to a tint. */
  wash: string;
  /** Thick saturated frame around the band photograph. */
  frame: string;
  /** Saturated chip border; chip stays paper/ink for readable text. */
  chipBorder: string;
  /** CSS color for the outlined numeral stroke (nutrition deviates — see header). */
  stroke: string;
  image: { src: string; alt: string };
};

/* Index-paired with `industries` (Nutrition → Food & Beverage → Personal Care). */
const BANDS: readonly BandConfig[] = [
  {
    key: "nutrition",
    numeral: "01",
    application: "Nutrition",
    wash: "bg-nutrition/15",
    frame: "border-nutrition",
    chipBorder: "border-nutrition",
    stroke: "var(--color-brand-green-600)",
    image: IMG.bandNutrition,
  },
  {
    key: "food",
    numeral: "02",
    application: "Food & Beverage",
    wash: "bg-food/10",
    frame: "border-food",
    chipBorder: "border-food",
    stroke: "var(--color-food)",
    image: IMG.bandFood,
  },
  {
    key: "care",
    numeral: "03",
    application: "Personal Care",
    wash: "bg-cosmetics/10",
    frame: "border-cosmetics",
    chipBorder: "border-cosmetics",
    stroke: "var(--color-cosmetics)",
    image: IMG.bandCare,
  },
];

/* ─────────────────────────────── Nav ─────────────────────────────── */

function MobileNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="k-mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-ink transition-colors duration-200 hover:text-brand-green-700 focus-visible:outline-2"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id="k-mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
            className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-lg"
          >
            <ul className="px-5 py-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-3 font-body text-base text-ink last:border-b-0 hover:text-brand-green-700 focus-visible:outline-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-3.5 md:px-10"
      >
        <a
          href="#top"
          aria-label="Fenchem home"
          className="flex items-baseline gap-2.5 transition-opacity duration-300 hover:opacity-85 focus-visible:outline-2"
        >
          <span className="font-body text-xl font-bold tracking-[-0.04em] text-brand-green-600">
            FENCHEM
          </span>
          <Leaf aria-hidden className="size-4 self-center text-brand-green-500" strokeWidth={1.5} />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center font-body text-sm text-mute-600 transition-colors duration-300 hover:text-brand-green-700 focus-visible:outline-2"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MobileNav />
          <a href={createInquiryHref()} className={CTA_PRIMARY}>
            Request Specifications
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ─────────────────────────────── Hero ─────────────────────────────── */

function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section id="top" aria-label="Hero" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-[1480px] px-5 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Headline block */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <Intro>
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-green-200 bg-brand-green-50 px-4 py-1.5 font-tech text-[11px] uppercase tracking-[0.32em] text-brand-green-700">
                Botanical ingredients — since 1995
              </p>
            </Intro>
            <Intro delay={STAGGER}>
              <h1 className="mt-8 font-display text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
                Every division,
                <br />
                <em className="italic text-brand-green-600">one standard.</em>
              </h1>
            </Intro>
            <Intro delay={STAGGER * 2}>
              <p className="mt-8 max-w-xl text-pretty font-body text-lg leading-relaxed text-mute-600 md:text-xl">
                Nutrition, food &amp; beverage, personal care — three color-coded divisions,
                supplied from a single documented quality system to formulators in more than forty
                countries.
              </p>
            </Intro>
            <Intro delay={STAGGER * 3} className="mt-10 flex flex-wrap gap-3">
              <a href={createInquiryHref()} className={CTA_PRIMARY}>
                Request Specifications
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a href="#matrix" className={CTA_OUTLINE_BLUE}>
                See the portfolio
              </a>
            </Intro>
          </div>

          {/* Color-block collage: two tinted panels, thick saturated frames */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Intro delay={STAGGER * 2}>
              <figure className="rounded-sm bg-nutrition/20 p-5 md:p-6">
                <div className="overflow-hidden rounded-sm border-8 border-nutrition">
                  <m.img
                    src={IMG.heroLeaves.src}
                    alt={IMG.heroLeaves.alt}
                    className="aspect-[16/10] w-full object-cover"
                    initial={reduce ? false : { scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: EASE }}
                    loading="eager"
                  />
                </div>
                <figcaption className="mt-3 flex items-center justify-between gap-4">
                  <span className={TECH_LABEL}>Nutrition division</span>
                  <span className="font-tech text-[11px] uppercase tracking-[0.24em] text-brand-green-700">
                    Field — 01
                  </span>
                </figcaption>
              </figure>
            </Intro>
            <Intro delay={STAGGER * 3}>
              <figure className="rounded-sm bg-cosmetics/10 p-5 md:p-6">
                <div className="overflow-hidden rounded-sm border-8 border-cosmetics">
                  <img
                    src={IMG.heroCare.src}
                    alt={IMG.heroCare.alt}
                    className="aspect-[16/9] w-full object-cover"
                    loading="eager"
                  />
                </div>
                <figcaption className="mt-3 flex items-center justify-between gap-4">
                  <span className={TECH_LABEL}>Personal care division</span>
                  <span className="font-tech text-[11px] uppercase tracking-[0.24em] text-brand-green-700">
                    Field — 03
                  </span>
                </figcaption>
              </figure>
            </Intro>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Division bands — signature module ─────────────────────────────── */

function DivisionBand({ band, index }: { band: BandConfig; index: number }) {
  const industry = industries[index];
  const items = getIngredientsByApplication(band.application).slice(0, 3);
  const flip = index % 2 === 1;
  const headingId = `division-${band.key}-heading`;

  return (
    <section aria-labelledby={headingId} className={`border-b border-line ${band.wash}`}>
      <div className="mx-auto max-w-[1480px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Text column */}
          <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
            {/* Oversized outlined numeral — decorative, stroke in the band accent */}
            <span
              aria-hidden
              className="block select-none font-display text-[6rem] font-bold leading-[0.85] text-transparent md:text-[9.5rem]"
              style={{ WebkitTextStroke: `2.5px ${band.stroke}` }}
            >
              {band.numeral}
            </span>
            <Eyebrow accent="text-brand-green-700" className="mt-7">
              Division {band.numeral} — {band.application}
            </Eyebrow>
            <h3
              id={headingId}
              className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink md:text-6xl"
            >
              {industry.title}
            </h3>
            <p className="mt-6 max-w-xl text-pretty font-body text-base leading-relaxed text-mute-600 md:text-lg">
              {industry.copy}
            </p>

            {/* Ingredient pill chips — saturated border, paper ground, ink text */}
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {items.map((item) => (
                <li key={item.code}>
                  <span
                    className={`inline-flex items-center gap-2.5 rounded-full border-2 ${band.chipBorder} bg-paper px-4 py-1.5`}
                  >
                    <span className="font-body text-sm font-medium text-ink">{item.name}</span>
                    <span className="font-tech text-[11px] uppercase tracking-[0.14em] text-mute-600">
                      {item.purity}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#matrix"
              className="group/band mt-8 inline-flex min-h-11 items-center gap-2 font-tech text-xs uppercase tracking-[0.24em] text-brand-blue-700 transition-colors duration-300 hover:text-brand-green-700 focus-visible:outline-2"
            >
              Matching actives in the matrix
              <ArrowUpRight
                aria-hidden
                className="size-3.5 transition-transform duration-300 group-hover/band:-translate-y-0.5 group-hover/band:translate-x-0.5"
              />
            </a>
          </Reveal>

          {/* Image column — thick saturated accent frame */}
          <Reveal delay={STAGGER} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
            <div className={`overflow-hidden rounded-sm border-8 ${band.frame} shadow-lift`}>
              <img
                src={band.image.src}
                alt={band.image.alt}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DivisionsSection() {
  return (
    <div id="divisions" className="scroll-mt-28">
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1480px] px-5 py-14 md:px-10 md:py-20">
          <Reveal>
            <Eyebrow accent="text-brand-green-700">01 — The divisions</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink md:text-6xl">
              Three fields of color, <span className="text-brand-green-600">one signature.</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <p className="mt-6 max-w-xl text-pretty font-body text-base leading-relaxed text-mute-600 md:text-lg">
              Each division carries its own hue from the Fenchem brand book — worn here as a wash,
              never a wall — and every one releases against the same audited standard.
            </p>
          </Reveal>
        </div>
      </div>
      {BANDS.map((band, i) => (
        <DivisionBand key={band.key} band={band} index={i} />
      ))}
    </div>
  );
}

/* ─────────────────────────────── Stat moment ─────────────────────────────── */

function StorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="scroll-mt-28 border-b border-line bg-paper"
    >
      <div className="mx-auto max-w-[1480px] px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <Eyebrow accent="text-brand-green-700">02 — The record</Eyebrow>
          <h2
            id="story-heading"
            className="mt-8 max-w-5xl text-balance font-display text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink"
          >
            <span className="text-brand-green-600">30+ years.</span> 6 bases. 40+ countries.
          </h2>
        </Reveal>
        <Reveal delay={STAGGER * 2}>
          <p className="mt-10 max-w-2xl text-pretty font-body text-lg leading-relaxed text-mute-600 md:text-xl">
            Founded in {company.hq.city} in {company.founded}, Fenchem has spent three decades
            converting raw botanical complexity into precisely documented actives. One laboratory
            became six global bases across three continents; a first shipment became a supply
            network serving more than forty countries — and every lot, in every division, still
            releases against the same audited standard.
          </p>
        </Reveal>
        <Reveal delay={STAGGER * 3}>
          <p className="mt-8 font-tech text-[11px] uppercase tracking-[0.28em] text-brand-green-700">
            {company.tagline} — {company.since}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Compact matrix strip ─────────────────────────────── */

function MatrixCard({ item, index }: { item: Ingredient; index: number }) {
  const division = divisionForApplication(item.application);
  return (
    <article
      className={`min-w-[250px] max-w-[280px] shrink-0 snap-start rounded-sm border border-line border-t-4 ${MATRIX_TOP[division]} bg-paper px-5 py-6 shadow-ambient`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-tech text-[11px] tracking-[0.22em] text-brand-green-700">
          {String(index + 1).padStart(2, "0")} —
        </span>
        <span className="font-tech text-[11px] uppercase tracking-[0.22em] text-mute-600">
          {item.code}
        </span>
      </div>
      <h3 className="mt-3 font-body text-lg font-bold tracking-[-0.02em] text-ink">{item.name}</h3>
      <p className="mt-0.5 font-display text-sm italic text-mute-600">{item.latin}</p>
      <dl className="mt-4 border-t border-line pt-3.5">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600">Purity</dt>
          <dd className="text-right font-tech text-[11px] text-mute-700">{item.purity}</dd>
        </div>
      </dl>
    </article>
  );
}

function MatrixSection() {
  return (
    <section
      id="matrix"
      aria-labelledby="matrix-heading"
      className="scroll-mt-28 border-b border-line bg-paper"
    >
      <div className="mx-auto max-w-[1480px] px-5 py-16 md:px-10 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow accent="text-brand-green-700">03 — Featured portfolio</Eyebrow>
            <h2
              id="matrix-heading"
              className="mt-4 text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink md:text-5xl"
            >
              The compact <span className="text-brand-green-600">matrix</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <a
              href={createInquiryHref()}
              className="group inline-flex min-h-11 items-center gap-2 rounded-sm border border-brand-blue-700 px-5 py-3 font-body text-sm font-semibold text-brand-blue-700 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-blue-50 focus-visible:outline-2"
            >
              Request full specifications
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        {/* Horizontal strip — tabbable so keyboard users can scroll the overflow */}
        <Reveal delay={STAGGER * 2}>
          <div
            role="group"
            aria-label="Featured ingredients — scrolls horizontally"
            tabIndex={0}
            className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4 focus-visible:outline-2"
          >
            {getFeaturedIngredients().map((item, i) => (
              <MatrixCard key={item.code} item={item} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Certifications row ─────────────────────────────── */

function CertificationsSection() {
  return (
    <section aria-labelledby="certs-heading" className="border-b border-line bg-mute-50">
      <div className="mx-auto max-w-[1480px] px-5 py-14 md:px-10 md:py-16">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Eyebrow accent="text-brand-green-700">04 — Certified</Eyebrow>
            <h2
              id="certs-heading"
              className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-ink md:text-4xl"
            >
              Audited on every lot
            </h2>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {certificationDetails.map((cert) => (
              <li
                key={cert.name}
                className="inline-flex items-baseline gap-2 rounded-sm border border-brand-blue-200 bg-brand-blue-50 px-3 py-1.5"
              >
                <span className="font-tech text-[11px] uppercase tracking-[0.16em] text-brand-blue-700">
                  {cert.name}
                </span>
                <span className="font-body text-xs text-mute-600">{cert.sub}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Finale ─────────────────────────────── */

function FinaleSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-28 overflow-hidden bg-brand-green-950"
    >
      {/* Radial glow — the one saturated field the brand book does allow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 0%, oklch(from var(--color-brand-green-500) l c h / 0.16), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-[1480px] px-5 py-24 text-center md:px-10 md:py-36">
        <Reveal>
          <Eyebrow accent="text-brand-green-400">05 — Partner with Fenchem</Eyebrow>
          <h2
            id="contact-heading"
            className="mx-auto mt-8 max-w-4xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-paper md:text-7xl"
          >
            One standard, <span className="text-brand-green-400">signed on every lot.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-pretty font-body text-base leading-relaxed text-brand-green-100/70 md:text-lg">
            Send a target specification — purity, form, matrix, regulatory map — and our laboratory
            returns a validated proposal with full documentation within one business day.
          </p>
        </Reveal>
        <Reveal delay={STAGGER * 2} className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={createInquiryHref()} className={CTA_PRIMARY_DARK}>
            Request Specifications
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </Reveal>
        <Reveal delay={STAGGER * 3}>
          <p className="mt-10 font-tech text-[11px] uppercase tracking-[0.28em] text-brand-green-400">
            Response &lt; 24h — Technical dossiers on request
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Footer ─────────────────────────────── */

function FooterSection() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-[1480px]">
        {/* Ghost wordmark — extrabold: Jakarta loads 300–800; 900 would synthesize */}
        <p
          aria-hidden
          className="select-none overflow-hidden whitespace-nowrap px-5 pt-10 font-body text-[16vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-brand-green-500/5 md:px-10 min-[1481px]:text-[14rem]"
        >
          FENCHEM
        </p>
        <div className="flex flex-col gap-2 border-t border-line px-5 py-4 font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600 md:flex-row md:items-center md:justify-between md:px-10">
          <span>© 2026 {company.legalName} — All Rights Reserved</span>
          <a
            href="#top"
            className="transition-colors duration-300 hover:text-brand-green-700 focus-visible:outline-2"
          >
            Back to top
          </a>
          <span className="text-brand-green-700">{company.tagline}</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── Root export ─────────────────────────────── */

/** Anchor navigation glides instead of jumping; restores on unmount and honors reduced motion. */
function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    return () => {
      root.style.scrollBehavior = previous;
    };
  }, [reduce]);
  return null;
}

export function VariantK() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="bg-paper font-body text-ink antialiased selection:bg-brand-green-200 selection:text-brand-green-900">
        <SmoothScroll />
        <NavBar />
        <main>
          <HeroSection />
          <DivisionsSection />
          <StorySection />
          <MatrixSection />
          <CertificationsSection />
          <FinaleSection />
        </main>
        <FooterSection />
      </div>
    </LazyMotion>
  );
}
