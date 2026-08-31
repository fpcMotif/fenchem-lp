/*
 * PROTOTYPE — Variant J: "Spec Sheet" — Swiss / international-typographic-style
 * information design. The entire page is type, hairline rules, numbers, and
 * tables: ZERO photography. If Variant B had the spec-sheet conviction and
 * Variant H the measured discipline, J is the document itself — the page a
 * formulator would staple to a purchase order.
 *
 * Provenance: B's spec-table voice + H's measured contrast decisions + the
 * 2026-08 design review (tight vertical rhythm per complaint #5 — no cavernous
 * gaps; hairline-rule pacing throughout; max-w-[1480px] grid like H).
 *
 * Typography: Plus Jakarta Sans ONLY (font-body) at heavy weights with tight
 * tracking (-0.03em to -0.05em) for display; JetBrains Mono (font-tech) for
 * ALL data/labels. NO font-display/serif anywhere — latin binomials are set in
 * italic Jakarta, not Newsreader (deliberate single-face discipline).
 *
 * Color budget (deliberate, stricter than H):
 *   - Ink on paper. brand-blue-700 is the ONLY interactive color (links,
 *     outline CTAs) — 8.6:1 on paper.
 *   - brand-green appears EXACTLY twice on the page: the word "botanical" in
 *     the hero headline (green-600), and the primary CTA buttons
 *     (text-brand-green-950 on bg-brand-green-500, 5.18:1; hover green-400,
 *     6.92:1 — per H's measured floor; never white on green-500).
 *   - Section numerals/eyebrows are ink/mute-600 (6.00:1), NOT brand-green-700
 *     — a deliberate deviation from H's eyebrow rule, forced by the
 *     two-appearances green budget. Same reason the wordmark is ink, not green.
 *   - Division dots keep their brand-book accents (sanctioned data encoding);
 *     the pale nutrition dot gets a neutral ink/20 outline instead of H's
 *     green-tinted one (green budget).
 *   - Small-text floor mute-600; font-tech micro-labels at 11px minimum.
 *
 * Deliberate lane deviations (recorded per task):
 *   1. The contact finale is a full-width mute-900 (near-black ink) band, NOT
 *      the deep-green finale the other variants share — ink-on-paper inverted
 *      is the Swiss move.
 *   2. On that mute-900 band the email link is paper with a mute-500 underline
 *      (blue-700 fails contrast on near-black); labels there use paper /
 *      mute-300 (≥10:1).
 *   3. No photography → no scrim rules apply anywhere.
 *
 * Section order (each carries a font-tech "0N — NAME" header rule; the nav is
 * the implicit 01, numbered in its wordmark suffix):
 *   01 Nav → 02 Hero (headline, spec subline, stat strip, page index)
 *   → 03 Matrix (full 8-compound spec table) → 04 Process → 05 Standards
 *   → 06 Network (coordinates table) → 07 Contact (mute-900 band)
 *   → 08 Colophon (footer)
 */
import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useScroll } from "motion/react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { Eyebrow, Intro, Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certificationDetails,
  certifications,
  company,
  createInquiryHref,
  divisionForApplication,
  ingredients,
  pillars,
  processSteps,
  regions,
  type DivisionKey,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Constants ─────────────────────────────── */

/** Local stat literals — this page's phrasing diverges from the shared `stats` labels. */
const STATS = [
  { value: "30+", label: "Years — botanical actives since 1995" },
  { value: "6", label: "Global bases on three continents" },
  { value: "40+", label: "Countries under active supply" },
  { value: "ISO/GMP", label: "Certified quality on every lot" },
] as const;

const NAV_LINKS = [
  { index: "03", label: "Matrix", href: "#matrix" },
  { index: "04", label: "Process", href: "#process" },
  { index: "05", label: "Standards", href: "#standards" },
  { index: "06", label: "Network", href: "#network" },
] as const;

const HERO_SPECS = ["Est. 1995", "Nanjing HQ", "40+ Markets", "ISO 9001 · FSSC 22000"] as const;

const PAGE_INDEX = [
  { index: "03", name: "Ingredient Matrix", href: "#matrix" },
  { index: "04", name: "Process", href: "#process" },
  { index: "05", name: "Standards", href: "#standards" },
  { index: "06", name: "Global Network", href: "#network" },
  { index: "07", name: "Contact", href: "#contact" },
  { index: "08", name: "Colophon", href: "#colophon" },
] as const;

/**
 * Division accent dots for the matrix APPLICATION column. Brand-book values;
 * the pale nutrition yellow gets a neutral outline so it survives on paper
 * (ink/20 instead of H's green-tinted border — green budget).
 */
const DIVISION_DOT: Record<DivisionKey, string> = {
  nutrition: "bg-nutrition border border-ink/20",
  food: "bg-food",
  cosmetics: "bg-cosmetics",
  chem: "bg-chem",
  agro: "bg-agro",
  feed: "bg-feed",
};

/** Micro-label voice at its measured floor: 11px font-tech, mute-600 (6.00:1). */
const TECH_LABEL = "font-tech text-[11px] uppercase tracking-[0.26em] text-mute-600";

/** The page's two CTA voices. Green = primary (the second green appearance). */
const GREEN_CTA =
  "group inline-flex min-h-11 items-center gap-2 rounded-sm bg-brand-green-500 px-6 py-3 font-body text-sm font-bold text-brand-green-950 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-offset-2";
const BLUE_CTA =
  "inline-flex min-h-11 items-center gap-2 rounded-sm border border-brand-blue-700 px-6 py-3 font-body text-sm font-semibold text-brand-blue-700 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-blue-50 focus-visible:outline-2";

/** Table header cell: one voice for both tables. */
const TH_CLASS =
  "py-3 text-left font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-mute-600";

/* ─────────────────────────────── Section rule ─────────────────────────────── */

/**
 * The "0N — NAME" hairline header every section opens with. The mono label IS
 * the section heading (h2) — Swiss documents head chapters with file codes,
 * not display type.
 */
function SectionRule({
  number,
  name,
  headingId,
  aside,
  dark = false,
}: {
  number: string;
  name: string;
  headingId: string;
  aside?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 border-b px-5 py-4 md:px-10 ${
        dark ? "border-mute-700" : "border-line"
      }`}
    >
      <h2
        id={headingId}
        className={`font-tech text-xs uppercase tracking-[0.3em] ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        <span className={dark ? "text-mute-300" : "text-mute-600"}>{number}</span>
        {" — "}
        {name}
      </h2>
      {aside && (
        <p
          className={`hidden font-tech text-[11px] uppercase tracking-[0.22em] sm:block ${
            dark ? "text-mute-300" : "text-mute-600"
          }`}
        >
          {aside}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────── 01 — Nav ─────────────────────────────── */

function MobileNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const links = [...NAV_LINKS, { index: "07", label: "Contact", href: "#contact" }];

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-ink transition-colors duration-200 hover:text-brand-blue-700 focus-visible:outline-2"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
            className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-lg"
          >
            <ul className="px-5 py-2">
              {links.map((link) => (
                <li key={link.href} className="border-b border-line last:border-b-0">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center gap-4 py-3 font-tech text-xs uppercase tracking-[0.22em] text-ink transition-colors duration-200 hover:text-brand-blue-700 focus-visible:outline-2"
                  >
                    <span className="text-mute-600">{link.index}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-5 py-4">
              <a
                href={createInquiryHref()}
                onClick={() => setOpen(false)}
                className={`${GREEN_CTA} w-full justify-center`}
              >
                Request Specifications
                <ArrowRight aria-hidden className="size-4" />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavBar() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-5 py-3 md:px-10">
        <a
          href="#top"
          aria-label="Fenchem home"
          className="flex items-baseline gap-3 transition-opacity duration-300 hover:opacity-75 focus-visible:outline-2"
        >
          <span className="font-body text-lg font-extrabold tracking-[-0.04em] text-ink">
            FENCHEM
          </span>
          <span className="hidden font-tech text-[11px] uppercase tracking-[0.24em] text-mute-600 sm:inline">
            01 — Spec Sheet / 2026
          </span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center gap-2 font-tech text-xs uppercase tracking-[0.2em] text-mute-600 transition-colors duration-200 hover:text-brand-blue-700 focus-visible:outline-2"
            >
              <span className="text-[11px]">{link.index}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <MobileNav />
          <a
            href={createInquiryHref()}
            className={`${GREEN_CTA} hidden px-5 py-2.5 sm:inline-flex`}
          >
            Request Specifications
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
      {/* Scroll rule — the page measures itself; suppressed under reduced motion */}
      {!reduce && (
        <m.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-ink"
          style={{ scaleX: scrollYProgress }}
        />
      )}
    </header>
  );
}

/* ─────────────────────────────── 02 — Hero ─────────────────────────────── */

function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-4 md:px-10">
          <Eyebrow accent="text-mute-600">02 — Specification</Eyebrow>
          <p className="hidden font-tech text-[11px] uppercase tracking-[0.22em] text-mute-600 sm:block">
            FN-LP / Rev. J
          </p>
        </div>

        <div className="px-5 pb-12 pt-10 md:px-10 md:pb-14 md:pt-12">
          <Intro>
            <h1 className="max-w-5xl font-body text-[clamp(2.75rem,8vw,7rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-ink">
              Standardized <span className="text-brand-green-600">botanical</span> actives.
            </h1>
          </Intro>
          <Intro delay={STAGGER}>
            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-tech text-xs uppercase tracking-[0.24em] text-mute-600">
              {HERO_SPECS.map((spec, i) => (
                <span key={spec} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden className="text-mute-400">
                      /
                    </span>
                  )}
                  {spec}
                </span>
              ))}
            </p>
          </Intro>
          <Intro delay={STAGGER * 2}>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-mute-600">
              Fenchem converts raw botanical complexity into precisely specified actives — assayed,
              documented, and supplied at industrial scale to formulators in more than forty
              countries.
            </p>
          </Intro>
          <Intro delay={STAGGER * 3} className="mt-8 flex flex-wrap gap-3">
            <a href={createInquiryHref()} className={GREEN_CTA}>
              Request Specifications
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a href="#matrix" className={BLUE_CTA}>
              View the Matrix
            </a>
          </Intro>
        </div>

        {/* Stat strip — a bordered four-column data row, not a marketing band */}
        <Intro delay={STAGGER * 4}>
          <dl className="grid grid-cols-2 gap-px border-t border-line bg-line md:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col-reverse gap-1.5 bg-paper px-5 py-6 md:px-10"
              >
                <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600">
                  {stat.label}
                </dt>
                <dd className="font-body text-3xl font-extrabold tracking-[-0.03em] text-ink md:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Intro>

        {/* Page index — the document's table of contents */}
        <nav aria-label="Page index" className="border-t border-line">
          <p className={`${TECH_LABEL} px-5 py-3 md:px-10`}>Index — Sections 03–08</p>
          <Reveal>
            <ol className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {PAGE_INDEX.map((entry) => (
                <li key={entry.href} className="bg-paper">
                  <a
                    href={entry.href}
                    className="group flex min-h-11 items-center justify-between gap-4 px-5 py-5 transition-colors duration-200 hover:bg-mute-50 focus-visible:outline-2 md:px-10"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-tech text-xs tracking-[0.22em] text-mute-600">
                        {entry.index}
                      </span>
                      <span className="font-body text-base font-bold tracking-[-0.02em] text-brand-blue-700">
                        {entry.name}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-brand-blue-700 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </nav>
      </div>
    </section>
  );
}

/* ─────────────────────────────── 03 — Matrix ─────────────────────────────── */

function MatrixSection() {
  return (
    <section
      id="matrix"
      aria-labelledby="matrix-heading"
      className="scroll-mt-24 border-b border-line bg-paper"
    >
      <div className="mx-auto max-w-[1480px]">
        <SectionRule
          number="03"
          name="Ingredient Matrix"
          headingId="matrix-heading"
          aside={`${ingredients.length} compounds — full portfolio on request`}
        />
        <Reveal>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse">
              <caption className="sr-only">
                Fenchem active-ingredient specification matrix: spec code, compound with botanical
                name, assay, physical form, and application for all eight portfolio compounds.
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className={`${TH_CLASS} pl-5 pr-4 md:pl-10`}>
                    Code
                  </th>
                  <th scope="col" className={`${TH_CLASS} px-4`}>
                    Compound
                  </th>
                  <th scope="col" className={`${TH_CLASS} px-4`}>
                    Assay
                  </th>
                  <th scope="col" className={`${TH_CLASS} px-4`}>
                    Form
                  </th>
                  <th scope="col" className={`${TH_CLASS} pl-4 pr-5 md:pr-10`}>
                    Application
                  </th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((item) => {
                  const division = divisionForApplication(item.application);
                  return (
                    <tr
                      key={item.code}
                      className="border-b border-line transition-colors duration-200 hover:bg-mute-50"
                    >
                      <th
                        scope="row"
                        className="py-4 pl-5 pr-4 text-left align-top font-tech text-xs font-medium tracking-[0.14em] text-mute-700 md:pl-10"
                      >
                        {item.code}
                      </th>
                      <td className="px-4 py-4 align-top">
                        <span className="block font-body text-sm font-bold tracking-[-0.01em] text-ink">
                          {item.name}
                        </span>
                        <span className="mt-0.5 block font-body text-xs italic text-mute-600">
                          {item.latin}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top font-tech text-xs text-mute-700">
                        {item.purity}
                      </td>
                      <td className="px-4 py-4 align-top font-tech text-xs text-mute-700">
                        {item.form}
                      </td>
                      <td className="py-4 pl-4 pr-5 align-top md:pr-10">
                        <span className="inline-flex items-center gap-2 whitespace-nowrap font-tech text-[11px] uppercase tracking-[0.16em] text-ink">
                          <span
                            aria-hidden
                            className={`size-1.5 shrink-0 rounded-full ${DIVISION_DOT[division]}`}
                          />
                          {item.application}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-3 md:px-10">
          <p className={TECH_LABEL}>Assay verified per lot — chromatographic panels</p>
          <a
            href={createInquiryHref("industries")}
            className="inline-flex min-h-11 items-center gap-1.5 font-tech text-xs uppercase tracking-[0.2em] text-brand-blue-700 underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-2"
          >
            Request full specifications
            <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── 04 — Process ─────────────────────────────── */

function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-24 border-b border-line bg-paper"
    >
      <div className="mx-auto max-w-[1480px]">
        <SectionRule
          number="04"
          name="Process"
          headingId="process-heading"
          aside="Four steps — source to release"
        />
        <ol className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.title} className="bg-paper">
              <Reveal delay={i * STAGGER} className="h-full px-5 py-8 md:px-8">
                <p className="font-tech text-xs tracking-[0.22em] text-mute-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-body text-lg font-bold tracking-[-0.02em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-mute-600">{step.copy}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────────── 05 — Standards ─────────────────────────────── */

function StandardsSection() {
  return (
    <section
      id="standards"
      aria-labelledby="standards-heading"
      className="scroll-mt-24 border-b border-line bg-paper"
    >
      <div className="mx-auto max-w-[1480px]">
        <SectionRule
          number="05"
          name="Standards"
          headingId="standards-heading"
          aside="Audited quality infrastructure"
        />

        {/* Certification grid — six bordered cells, name big, qualifier in mono */}
        <ul className="grid grid-cols-2 gap-px border-b border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {certificationDetails.map((cert, i) => (
            <li key={cert.name} className="bg-paper">
              <Reveal delay={(i % 3) * STAGGER} className="h-full px-5 py-8 md:px-6">
                <p className="font-body text-xl font-extrabold tracking-[-0.03em] text-ink md:text-2xl">
                  {cert.name}
                </p>
                <p className="mt-1.5 font-tech text-[11px] uppercase tracking-[0.18em] text-mute-600">
                  {cert.sub}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Pillars — compact numbered rows, no icons, no cards */}
        <ol>
          {pillars.map((pillar, i) => (
            <li key={pillar.title} className="border-b border-line last:border-b-0">
              <Reveal
                delay={i * STAGGER}
                className="grid gap-2 px-5 py-6 md:grid-cols-12 md:items-baseline md:gap-6 md:px-10"
              >
                <p className="font-tech text-xs tracking-[0.22em] text-mute-600 md:col-span-1">
                  P{i + 1}
                </p>
                <h3 className="font-body text-lg font-bold tracking-[-0.02em] text-ink md:col-span-4">
                  {pillar.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-mute-600 md:col-span-7">
                  {pillar.copy}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────────── 06 — Network ─────────────────────────────── */

function NetworkSection() {
  return (
    <section
      id="network"
      aria-labelledby="network-heading"
      className="scroll-mt-24 border-b border-line bg-paper"
    >
      <div className="mx-auto max-w-[1480px]">
        <SectionRule
          number="06"
          name="Global Network"
          headingId="network-heading"
          aside="6 bases — 40+ countries served"
        />
        <Reveal>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <caption className="sr-only">
                Fenchem global network: city, country, role, and geographic coordinates for six
                bases across three continents.
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className={`${TH_CLASS} pl-5 pr-4 md:pl-10`}>
                    City
                  </th>
                  <th scope="col" className={`${TH_CLASS} px-4`}>
                    Country
                  </th>
                  <th scope="col" className={`${TH_CLASS} px-4`}>
                    Role
                  </th>
                  <th scope="col" className={`${TH_CLASS} pl-4 pr-5 text-right md:pr-10`}>
                    Coords
                  </th>
                </tr>
              </thead>
              <tbody>
                {regions.map((region) => (
                  <tr
                    key={region.city}
                    className="border-b border-line transition-colors duration-200 last:border-b-0 hover:bg-mute-50"
                  >
                    <th
                      scope="row"
                      className="py-4 pl-5 pr-4 text-left font-tech text-xs font-semibold tracking-[0.1em] text-ink md:pl-10"
                    >
                      {region.city}
                    </th>
                    <td className="px-4 py-4 font-tech text-xs text-mute-700">{region.country}</td>
                    <td className="px-4 py-4 font-tech text-xs text-mute-700">{region.role}</td>
                    <td className="py-4 pl-4 pr-5 text-right font-tech text-xs tabular-nums text-mute-700 md:pr-10">
                      {region.coords}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── 07 — Contact ─────────────────────────────── */

function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 border-b border-line bg-mute-900"
    >
      <div className="mx-auto max-w-[1480px]">
        <SectionRule
          dark
          number="07"
          name="Contact"
          headingId="contact-heading"
          aside="Response — one business day"
        />
        <div className="px-5 py-16 md:px-10 md:py-20">
          <Reveal>
            <p className="max-w-4xl font-body text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-paper">
              Send a spec. Get a spec back.
            </p>
          </Reveal>
          <Reveal delay={STAGGER}>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-mute-300">
              Purity target, delivery form, matrix, regulatory map — send the outline and our
              laboratory returns a validated counter-specification with full documentation within
              one business day.
            </p>
          </Reveal>
          <Reveal delay={STAGGER * 2} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={createInquiryHref()} className={GREEN_CTA}>
              Request Specifications
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href={createInquiryHref()}
              className="inline-flex min-h-11 items-center font-tech text-xs uppercase tracking-[0.24em] text-paper underline decoration-mute-500 underline-offset-4 transition-colors duration-200 hover:decoration-paper focus-visible:outline-2"
            >
              {company.email} — dossiers on request
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── 08 — Colophon ─────────────────────────────── */

function FooterSection() {
  return (
    <footer id="colophon" aria-labelledby="colophon-heading" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-[1480px]">
        <SectionRule
          number="08"
          name="Colophon"
          headingId="colophon-heading"
          aside={certifications.join(" · ")}
        />

        {/* Ghost wordmark — ink at 4%, not green (green budget) */}
        <p
          aria-hidden
          className="select-none overflow-hidden whitespace-nowrap px-5 pt-6 font-body text-[16vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-ink/[0.04] md:px-10 min-[1481px]:text-[14rem]"
        >
          FENCHEM
        </p>

        {/* Single-row micro-label strip */}
        <div className="flex flex-col gap-2 border-t border-line px-5 py-4 font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600 md:flex-row md:items-center md:justify-between md:px-10">
          <span>© 2026 {company.legalName} — All rights reserved</span>
          <span className="tabular-nums">
            {company.hq.coords} — {company.hq.city}, {company.hq.country}
          </span>
          <span>Est. {company.founded} — Spec Sheet Rev. J</span>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-1.5 font-tech text-[11px] uppercase tracking-[0.2em] text-brand-blue-700 underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-2"
          >
            Back to top
            <ArrowUpRight aria-hidden className="size-3" />
          </a>
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

export function VariantJ() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="bg-paper font-body text-ink antialiased selection:bg-ink selection:text-paper">
        <SmoothScroll />
        <NavBar />
        <main>
          <HeroSection />
          <MatrixSection />
          <ProcessSection />
          <StandardsSection />
          <NetworkSection />
          <ContactSection />
        </main>
        <FooterSection />
      </div>
    </LazyMotion>
  );
}
