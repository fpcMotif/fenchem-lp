/*
 * PROTOTYPE — Variant I: "Market Portal" — buyer wayfinding, Seppic-style.
 *
 * Philosophy: the visitor is a formulator who wants to FIND their ingredient
 * in seconds. Utility-first portal structure modeled on seppic.com (the
 * same-industry reference): slim navy nav, a hero whose signature module is a
 * live ingredient search, market cards as the primary wayfinding surface, and
 * a compact spec table instead of a gallery. Provenance: VariantH supplies the
 * code canon (LazyMotion wrapper, MobileNav disclosure, DivisionBadge chip,
 * deep-green finale, ghost-wordmark footer); the shared landing-content module
 * supplies every fact.
 *
 * Lane traits (deliberate deviations from the H baseline, recorded here):
 *   - ALL-SANS: font-body (Plus Jakarta Sans) everywhere including display
 *     headlines at font-extrabold / tight tracking. No Newsreader serif.
 *   - Blue-led structural: brand-blue-700/800/900 carry nav, heading accents,
 *     stat band and footer (Seppic navy energy). Green is strictly primary
 *     CTAs and live-status accents.
 *   - Eyebrows/section accents use brand-blue-700 on paper (8.38:1 measured,
 *     above the 5.73:1 green-700 floor the review set) instead of H's
 *     brand-green-700 — the blue lane's one sanctioned divergence.
 *   - Larger radii than H: rounded-lg cards throughout.
 *
 * Measured color decisions inherited from the 2026-08 design review:
 *   - Primary CTA: text-brand-green-950 on bg-brand-green-500 (5.18:1);
 *     hover bg-brand-green-400 (6.92:1). Never white on green-500.
 *   - Small text floor mute-600 on paper; full-opacity brand-blue-100/200 on
 *     navy, brand-green-100/300/400 on the deep-green finale (9.35:1 coords).
 *   - font-tech micro-labels floor at 11px.
 *   - Text over photographs sits on an ink/65+ scrim gradient.
 *   - Division chips: solid paper chip + ink text + accent dot.
 *
 * Section order:
 *   Slim NavBar → Hero + ingredient search (#top) → Market cards (#markets)
 *   → Stat band → Heritage narrative → Portfolio table (#matrix)
 *   → Global network (#network) → Finale (#contact) → Footer
 */
import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { ArrowRight, ArrowUpRight, Menu, Search, X } from "lucide-react";
import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { Eyebrow, Intro, Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certifications,
  company,
  createInquiryHref,
  divisionForApplication,
  getFeaturedIngredients,
  industries,
  ingredients,
  regions,
  type Ingredient,
  type IngredientApplication,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Constants ─────────────────────────────── */

/** Verified-rendering Unsplash assets reused from VariantH's IMG set. */
const IMG = {
  hero: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80",
  origin:
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
} as const;

/** Local stat const — this page needs unit/desc splits the shared `stats` shape lacks. */
const STATS = [
  { value: "30+", unit: "Years", desc: "Botanical supply since 1995" },
  { value: "6", unit: "Global Bases", desc: "Across three continents" },
  { value: "40+", unit: "Countries", desc: "Regulated markets supplied" },
  { value: "ISO/GMP", unit: "Certified", desc: "Audited quality on every lot" },
] as const;

const NAV_LINKS = [
  { label: "Markets", href: "#markets" },
  { label: "Portfolio", href: "#matrix" },
  { label: "Network", href: "#network" },
  { label: "Contact", href: "#contact" },
] as const;

/** Industry index → ingredient application, resolving each market's division accent. */
const MARKET_APPLICATIONS: readonly IngredientApplication[] = [
  "Nutrition",
  "Food & Beverage",
  "Personal Care",
] as const;

/** Division accent dot for chips — chip stays paper/ink for contrast (H's pattern). */
const DIVISION_DOT: Record<string, string> = {
  nutrition: "bg-nutrition border border-brand-green-700/30",
  food: "bg-food",
  cosmetics: "bg-cosmetics",
  chem: "bg-chem",
  agro: "bg-agro",
  feed: "bg-feed",
};

/** Saturated division accent bar across the top edge of each market card. */
const DIVISION_BAR: Record<string, string> = {
  nutrition: "bg-nutrition",
  food: "bg-food",
  cosmetics: "bg-cosmetics",
  chem: "bg-chem",
  agro: "bg-agro",
  feed: "bg-feed",
};

const FOOTER_COLS = [
  {
    head: "Markets",
    links: [
      { label: "Nutrition & Supplements", href: "#markets" },
      { label: "Food & Beverage", href: "#markets" },
      { label: "Personal Care", href: "#markets" },
    ],
  },
  {
    head: "Portfolio",
    links: [
      { label: "Featured Compounds", href: "#matrix" },
      { label: "Ingredient Search", href: "#top" },
      { label: "Request Specifications", href: "#contact" },
    ],
  },
  {
    head: "Network",
    links: [
      { label: "Six Global Bases", href: "#network" },
      { label: "Nanjing HQ & R&D", href: "#network" },
      { label: "Contact Sales", href: "#contact" },
    ],
  },
] as const;

/** Spec-sheet micro-label at its measured floors: 11px; mute-600 on paper. */
const TECH_LABEL_LIGHT = "font-tech text-[11px] uppercase tracking-[0.26em] text-mute-600";
/** Navy-surface counterpart — full-opacity blue-200 (alpha-muted tints failed review). */
const TECH_LABEL_NAVY = "font-tech text-[11px] uppercase tracking-[0.26em] text-brand-blue-200";

/** Case-insensitive portfolio filter across name / latin / category / application. */
function searchIngredients(query: string): Ingredient[] {
  const q = query.toLowerCase();
  return ingredients
    .filter((item) =>
      [item.name, item.latin, item.category, item.application].some((field) =>
        field.toLowerCase().includes(q),
      ),
    )
    .slice(0, 6);
}

/** Green live-status pulse — the lane's only non-CTA green. Decorative. */
function LiveDot() {
  return (
    <span aria-hidden className="relative flex size-1.5 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-brand-green-500/60 [animation-duration:2.4s] motion-reduce:animate-none" />
      <span className="relative inline-flex size-1.5 rounded-full bg-brand-green-500" />
    </span>
  );
}

/* ─────────────────────────────── Nav ─────────────────────────────── */

function MobileNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-paper transition-colors duration-200 hover:text-brand-green-300 focus-visible:outline-2"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <m.span
            key={open ? "close" : "open"}
            className="inline-flex"
            initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </m.span>
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
            className="absolute inset-x-0 top-full border-b border-brand-blue-800 bg-brand-blue-900 shadow-lg"
          >
            <ul className="px-5 py-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-brand-blue-800 py-3 font-body text-base text-brand-blue-100 last:border-b-0 hover:text-paper focus-visible:outline-2"
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
    <header className="sticky top-0 z-50 border-b border-brand-blue-800 bg-brand-blue-900/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8"
      >
        <a
          href="#top"
          aria-label="Fenchem home"
          className="font-body text-xl font-extrabold tracking-[-0.04em] text-paper transition-opacity duration-300 hover:opacity-80 focus-visible:outline-2"
        >
          FENCHEM
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center font-body text-sm text-brand-blue-100 transition-colors duration-300 hover:text-paper focus-visible:outline-2"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <MobileNav />
          <a
            href={createInquiryHref()}
            className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-green-500 px-4 py-2.5 font-body text-sm font-semibold text-brand-green-950 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-300 md:px-5"
          >
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

/* ─────────────────────────────── Hero + Ingredient search ─────────────────────────────── */

function IngredientSearch() {
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();
  const trimmed = query.trim();
  const matches = trimmed ? searchIngredients(trimmed) : [];

  return (
    <div className="mx-auto mt-10 w-full max-w-2xl rounded-lg bg-paper p-4 text-left shadow-lift md:p-5">
      <form role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="ingredient-search" className={`block ${TECH_LABEL_LIGHT}`}>
          Search the ingredient portfolio
        </label>
        <div className="relative mt-2.5">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-mute-500"
          />
          <input
            id="ingredient-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Try "Lutein", "Curcuma longa" or "Personal Care"'
            autoComplete="off"
            className="min-h-11 w-full rounded-lg border border-line bg-mute-50 py-3 pl-10 pr-4 font-body text-base text-ink placeholder:text-mute-600 focus-visible:outline-2"
          />
        </div>
      </form>

      {/* Result count — live region so filtering is announced, not silent. */}
      <p aria-live="polite" className="mt-3 flex items-center gap-2">
        <LiveDot />
        <span className="font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600">
          {trimmed
            ? matches.length > 0
              ? `${matches.length} matching compound${matches.length === 1 ? "" : "s"}`
              : "No matching compounds"
            : `${ingredients.length} active compounds indexed`}
        </span>
      </p>

      <AnimatePresence initial={false}>
        {trimmed && (
          <m.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
            className="mt-3 border-t border-line pt-2"
          >
            {matches.length > 0 ? (
              <ul>
                {matches.map((item) => (
                  <li key={item.code}>
                    <a
                      href="#matrix"
                      className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-brand-blue-50 focus-visible:outline-2"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          aria-hidden
                          className={`size-1.5 shrink-0 rounded-full ${DIVISION_DOT[divisionForApplication(item.application)]}`}
                        />
                        <span className="truncate font-body text-sm font-semibold text-ink">
                          {item.name}
                        </span>
                        <span className="hidden truncate font-body text-xs italic text-mute-600 sm:inline">
                          {item.latin}
                        </span>
                      </span>
                      <span className="shrink-0 font-tech text-[11px] text-mute-600">
                        {item.purity}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-2 font-body text-sm text-mute-600">
                Nothing in the featured index matches "{trimmed}" — our sourcing desk covers far
                more.{" "}
                <a
                  href="#contact"
                  className="font-semibold text-brand-blue-700 underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-brand-blue-800 focus-visible:outline-2"
                >
                  Ask for a sourcing brief
                </a>
                .
              </p>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="top"
      aria-label="Hero and ingredient search"
      className="relative scroll-mt-24 overflow-hidden bg-brand-blue-950"
    >
      <img
        src={IMG.hero}
        alt="Lush green botanical leaves in morning light — Fenchem's raw-material world"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      {/* ink/65+ scrim guarantees white-text contrast over the photograph */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/65 to-ink/85"
      />
      <div className="relative mx-auto flex min-h-[82vh] max-w-7xl flex-col items-center justify-center px-5 py-20 text-center md:px-8 md:py-28">
        <Intro>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-paper/25 px-4 py-1.5">
            <LiveDot />
            <span className="font-tech text-[11px] uppercase tracking-[0.32em] text-brand-green-300">
              Ingredient supply portal — 40+ countries
            </span>
          </p>
        </Intro>
        <Intro delay={STAGGER}>
          <h1 className="mt-8 max-w-4xl text-balance font-body text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-paper">
            Botanical intelligence, supplied worldwide.
          </h1>
        </Intro>
        <Intro delay={STAGGER * 2}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty font-body text-base leading-relaxed text-mute-100 md:text-lg">
            Find the standardized active your formulation needs — specifications, regulatory
            documentation and samples from one audited supplier, since 1995.
          </p>
        </Intro>
        <Intro delay={STAGGER * 3} className="w-full">
          <IngredientSearch />
        </Intro>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Market cards ─────────────────────────────── */

function MarketsSection() {
  return (
    <section
      id="markets"
      aria-labelledby="markets-heading"
      className="scroll-mt-24 border-b border-line bg-paper py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow accent="text-brand-blue-700">01 — Markets</Eyebrow>
            <h2
              id="markets-heading"
              className="mt-4 max-w-2xl text-balance font-body text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink md:text-4xl"
            >
              Start from <span className="text-brand-blue-700">your market</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <p className="max-w-xs text-pretty font-body text-sm leading-relaxed text-mute-600">
              Three application domains, one documentation standard. Pick a lane and land on the
              compounds built for it.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {industries.map((industry, i) => {
            const division = divisionForApplication(MARKET_APPLICATIONS[i]);
            return (
              <Reveal key={industry.title} delay={i * STAGGER}>
                <a
                  href="#matrix"
                  aria-label={`${industry.title} — explore ingredients in the portfolio table`}
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <img
                    src={industry.image.src}
                    alt={industry.image.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  {/* Bottom scrim to ink/85 carries the white title + copy */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/10"
                  />
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-1.5 ${DIVISION_BAR[division]}`}
                  />
                  <div className="relative p-6">
                    <p className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.24em] text-paper">
                      <span
                        aria-hidden
                        className={`size-1.5 rounded-full ${DIVISION_DOT[division]}`}
                      />
                      {MARKET_APPLICATIONS[i]}
                    </p>
                    <h3 className="mt-3 font-body text-2xl font-extrabold tracking-[-0.02em] text-paper">
                      {industry.title}
                    </h3>
                    <p className="mt-2 text-pretty font-body text-sm leading-relaxed text-paper/90">
                      {industry.copy}
                    </p>
                    <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-tech text-xs uppercase tracking-[0.2em] text-paper transition-colors duration-300 group-hover:text-brand-green-300">
                      Explore ingredients
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Stat band ─────────────────────────────── */

function StatBand() {
  return (
    <section
      aria-label="Company metrics"
      className="border-b border-brand-blue-800 bg-brand-blue-900"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.unit} delay={i * STAGGER}>
              <div
                className={`px-2 py-8 md:px-6 md:py-10 ${i > 0 ? "md:border-l md:border-brand-blue-800" : ""}`}
              >
                <dt className={TECH_LABEL_NAVY}>{stat.unit}</dt>
                <dd className="mt-2">
                  <span className="font-body text-3xl font-extrabold tracking-[-0.02em] text-paper md:text-4xl">
                    {stat.value}
                  </span>
                  <p className="mt-1 font-body text-xs text-brand-blue-200">{stat.desc}</p>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Heritage narrative ─────────────────────────────── */

function HeritageSection() {
  const otherBases = regions
    .slice(1)
    .map((region) => region.city)
    .join(", ");

  return (
    <section
      aria-labelledby="heritage-heading"
      className="border-b border-line bg-paper py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow accent="text-brand-blue-700">02 — Since {company.founded}</Eyebrow>
          <h2
            id="heritage-heading"
            className="mt-4 text-balance font-body text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink md:text-4xl"
          >
            Thirty years from Nanjing{" "}
            <span className="text-brand-blue-700">to six global bases</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty font-body text-base leading-relaxed text-mute-600">
            Fenchem began in {company.founded} as a Nanjing ingredient laboratory with one
            conviction: botanical actives deserve the same specification discipline as any fine
            chemical. Three decades on, that discipline runs an audited supply chain serving
            formulators in more than forty countries.
          </p>
          <p className="mt-4 max-w-xl text-pretty font-body text-base leading-relaxed text-mute-600">
            Six bases — the {company.hq.city} headquarters and R&D campus plus {otherBases} — keep
            documentation, compliance and logistics close to every regulated market we supply.
          </p>
          <p className={`mt-6 ${TECH_LABEL_LIGHT}`}>{certifications.join(" · ")}</p>
          <a
            href="#network"
            className="group mt-6 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-brand-blue-700 transition-colors duration-300 hover:text-brand-blue-800 focus-visible:outline-2"
          >
            See the network
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>

        <Reveal delay={STAGGER}>
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={IMG.origin}
              alt="Rows of cultivated green crops on a partner farm at golden hour"
              className="aspect-[4/3] w-full object-cover outline outline-1 -outline-offset-1 outline-black/10"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-line bg-paper/95 px-4 py-2.5 backdrop-blur-sm">
              <span className="font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600">
                {company.hq.city}, {company.hq.country} — HQ
              </span>
              <span className="font-tech text-[11px] uppercase tracking-[0.2em] text-brand-blue-700 tabular-nums">
                {company.hq.coords}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Portfolio table ─────────────────────────────── */

function ApplicationChip({ application }: { application: IngredientApplication }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-line bg-paper px-2 py-1 font-tech text-[11px] uppercase tracking-[0.16em] text-ink">
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${DIVISION_DOT[divisionForApplication(application)]}`}
      />
      {application}
    </span>
  );
}

function MatrixSection() {
  const featured = getFeaturedIngredients();

  return (
    <section
      id="matrix"
      aria-labelledby="matrix-heading"
      className="scroll-mt-24 border-b border-line bg-mute-50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow accent="text-brand-blue-700">03 — Portfolio</Eyebrow>
            <h2
              id="matrix-heading"
              className="mt-4 max-w-2xl text-balance font-body text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink md:text-4xl"
            >
              The featured <span className="text-brand-blue-700">compound index</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <a
              href="#contact"
              className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-brand-blue-700 px-5 py-3 font-body text-sm font-semibold text-brand-blue-700 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-blue-50 focus-visible:outline-2"
            >
              Request Full Specifications
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        <Reveal delay={STAGGER} className="mt-10">
          <div className="overflow-x-auto rounded-lg border border-line bg-paper shadow-ambient">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="sr-only">
                Featured ingredient portfolio with botanical source, assay, form and application
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className={`px-5 py-4 ${TECH_LABEL_LIGHT}`}>
                    Compound
                  </th>
                  <th scope="col" className={`px-5 py-4 ${TECH_LABEL_LIGHT}`}>
                    Botanical Source
                  </th>
                  <th scope="col" className={`px-5 py-4 ${TECH_LABEL_LIGHT}`}>
                    Assay
                  </th>
                  <th scope="col" className={`px-5 py-4 ${TECH_LABEL_LIGHT}`}>
                    Form
                  </th>
                  <th scope="col" className={`px-5 py-4 ${TECH_LABEL_LIGHT}`}>
                    Application
                  </th>
                </tr>
              </thead>
              <tbody>
                {featured.map((item) => (
                  <tr
                    key={item.code}
                    className="border-b border-line transition-colors duration-200 last:border-b-0 hover:bg-brand-blue-50/60"
                  >
                    <td className="px-5 py-4">
                      <p className="font-body text-sm font-bold text-ink">{item.name}</p>
                      <p className="mt-0.5 font-tech text-[11px] uppercase tracking-[0.18em] text-mute-600">
                        {item.code}
                      </p>
                    </td>
                    <td className="px-5 py-4 font-body text-sm italic text-mute-600">
                      {item.latin}
                    </td>
                    <td className="px-5 py-4 font-tech text-xs text-mute-700">{item.purity}</td>
                    <td className="px-5 py-4 font-tech text-xs text-mute-700">{item.form}</td>
                    <td className="px-5 py-4">
                      <ApplicationChip application={item.application} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={STAGGER * 2}>
          <p className="mt-5 font-body text-sm text-mute-600">
            {ingredients.length - featured.length} further actives ship under the same documentation
            standard —{" "}
            <a
              href="#contact"
              className="font-semibold text-brand-blue-700 underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-brand-blue-800 focus-visible:outline-2"
            >
              ask for the full index
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Global network ─────────────────────────────── */

function NetworkSection() {
  return (
    <section
      id="network"
      aria-labelledby="network-heading"
      className="scroll-mt-24 border-b border-line bg-brand-blue-50/50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow accent="text-brand-blue-700">04 — Network</Eyebrow>
            <h2
              id="network-heading"
              className="mt-4 max-w-2xl text-balance font-body text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink md:text-4xl"
            >
              Six bases, <span className="text-brand-blue-700">one supply standard</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <p className="max-w-xs text-pretty font-body text-sm leading-relaxed text-mute-600">
              Documentation, compliance and logistics handled from the base nearest your regulatory
              map.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region, i) => (
            <Reveal key={region.city} delay={(i % 3) * STAGGER}>
              <div className="rounded-lg border border-line bg-paper p-5 shadow-lift transition-colors duration-300 hover:border-brand-blue-300">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-body text-lg font-bold tracking-[-0.02em] text-ink">
                    {region.city}
                  </h3>
                  <span className="font-tech text-[11px] uppercase tracking-[0.18em] text-mute-600">
                    {region.country}
                  </span>
                </div>
                <p className="mt-1.5 font-body text-sm text-mute-600">{region.role}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="flex items-center gap-2">
                    <LiveDot />
                    <span className="font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600">
                      {region.short}
                    </span>
                  </span>
                  <span className="font-tech text-[11px] tracking-[0.14em] text-brand-blue-700 tabular-nums">
                    {region.coords}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
      className="relative scroll-mt-24 overflow-hidden bg-brand-green-950"
    >
      {/* Soft radial glow — H's finale pattern, composed instead of loud. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,var(--color-brand-green-500),transparent)] opacity-20"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-20 text-center md:px-8 md:py-28">
        <Reveal>
          <Eyebrow accent="text-brand-green-400">05 — Contact</Eyebrow>
          <h2
            id="contact-heading"
            className="mx-auto mt-6 max-w-3xl text-balance font-body text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-paper md:text-5xl"
          >
            Found your ingredient?{" "}
            <span className="text-brand-green-400">Get its specification.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty font-body text-base leading-relaxed text-brand-green-100 md:text-lg">
            Send your target — compound, assay, form, regulatory map — and the nearest base returns
            specifications, documentation and lead times within one business day.
          </p>
        </Reveal>
        <Reveal delay={STAGGER * 2}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={createInquiryHref()}
              className="group inline-flex min-h-11 items-center gap-2.5 rounded-lg bg-brand-green-500 px-7 py-4 font-body text-sm font-bold text-brand-green-950 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-300"
            >
              Request Specifications
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href={`mailto:${company.email}`}
              className="inline-flex min-h-11 items-center font-body text-sm font-semibold text-brand-green-300 underline decoration-brand-green-700 underline-offset-4 transition-colors duration-300 hover:text-paper focus-visible:outline-2"
            >
              {company.email}
            </a>
          </div>
          <p className="mt-8 font-tech text-[11px] uppercase tracking-[0.28em] text-brand-green-400">
            Response &lt; 24h — Technical Dossiers on Request
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Footer ─────────────────────────────── */

function FooterSection() {
  return (
    <footer className="bg-brand-blue-950">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 py-14 md:grid-cols-12 md:py-16">
          <div className="md:col-span-5">
            <p className="font-body text-2xl font-extrabold tracking-[-0.04em] text-paper">
              FENCHEM
            </p>
            <p className="mt-3 font-body text-sm font-medium text-brand-blue-100">
              {company.tagline}.
            </p>
            <p className="mt-5 font-tech text-[11px] uppercase leading-loose tracking-[0.22em] text-brand-blue-200">
              Est. {company.founded} — {company.hq.city}, {company.hq.country}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="rounded-lg border border-brand-blue-700 bg-brand-blue-900 px-2.5 py-1 font-tech text-[11px] uppercase tracking-[0.16em] text-brand-blue-100"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.head} className="md:col-span-2">
              <p className={TECH_LABEL_NAVY}>{col.head}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-brand-blue-200 transition-colors duration-300 hover:text-paper focus-visible:outline-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Ghost wordmark — extrabold: Jakarta loads 300–800; 900 would synthesize */}
        <p
          aria-hidden
          className="select-none overflow-hidden whitespace-nowrap font-body text-[17vw] font-extrabold leading-[0.78] tracking-[-0.06em] text-paper/5 min-[1281px]:text-[13rem]"
        >
          FENCHEM
        </p>

        <div className="flex flex-col gap-2 border-t border-brand-blue-800 py-4 font-tech text-[11px] uppercase tracking-[0.2em] text-brand-blue-200 md:flex-row md:items-center md:justify-between">
          <span>© 2026 {company.legalName} — All Rights Reserved</span>
          <span className="tabular-nums">{company.hq.coords} — Nanjing, China</span>
          <span>Botanical Intelligence Since {company.founded}</span>
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

export function VariantI() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="bg-paper font-body text-ink antialiased selection:bg-brand-blue-100 selection:text-brand-blue-900">
        <SmoothScroll />
        <NavBar />
        <main>
          <HeroSection />
          <MarketsSection />
          <StatBand />
          <HeritageSection />
          <MatrixSection />
          <NetworkSection />
          <FinaleSection />
        </main>
        <FooterSection />
      </div>
    </LazyMotion>
  );
}
