/*
 * PROTOTYPE — Variant H: "Production" — the recommended direction.
 * VariantG's hybrid structure with every finding from the 2026-08 design
 * review applied, plus the three modules the set was missing: a real product
 * dropdown in the nav, an ingredient dossier (product intro), and an
 * interactive formulation presenter.
 *
 * Measured color decisions (WCAG ratios in docs/brand/landing-variants-design-review.md):
 *   - Primary CTA: text-brand-green-950 on bg-brand-green-500 (5.18:1);
 *     hover bg-brand-green-400 (6.92:1). White-on-green-500 failed at 2.95:1.
 *   - Blue is INTERACTIVE-ONLY (outline CTAs, links). Eyebrows/section
 *     numerals use brand-green-700 (5.73:1 on paper).
 *   - Small text floor: mute-600 (6.00:1); mute-400/500 are border/decoration
 *     tier only. font-tech micro-labels floor at 11px.
 *   - Division badges: solid paper chip + ink text + color dot — readable
 *     over any photograph (white-on-food failed at 2.76:1).
 *   - Finale labels: full-opacity green-400 (6.92:1) / green-300 coords
 *     (9.35:1); the alpha-muted greens failed at 2.2–2.8:1.
 *
 * Section order:
 *   Nav (portfolio menu) → Hero (stat band) → Ticker → Industries → Matrix
 *   → Product Dossier → Formulation Presenter → Origin + Standards → Finale → Footer
 */
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  FileDown,
  FlaskConical,
  Globe,
  Leaf,
  Menu,
  Pause,
  Play,
  Sprout,
  X,
} from "lucide-react";
import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certificationDetails,
  certifications,
  company,
  createInquiryHref,
  divisionForApplication,
  getFeaturedIngredients,
  getIngredientsByApplication,
  industries,
  ingredients,
  pillars,
  processSteps,
  regions,
  type Ingredient,
  type IngredientApplication,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Constants ─────────────────────────────── */

const IMG = {
  hero: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80",
  heroThumb:
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  lab: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=1400&q=80",
  origin:
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
} as const;

/*
 * Local overrides for shared-data stock images the design review rejected
 * (competitor-branded tube, drugstore pill piles). Verified-rendering assets;
 * the durable fix is origin photography — see the review doc.
 */
const IMAGE_OVERRIDES: Record<string, { src: string; alt: string }> = {
  /* Ashwagandha: renders as a pill bottle upstream — root story instead. */
  "FN-014": {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
    alt: "Hands holding soil and a young seedling — the root origin of Ashwagandha KSM-66",
  },
  /* Curcumin: colorful pharma pile upstream — clean-label food instead. */
  "FN-052": {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
    alt: "Fresh food bowl with vibrant natural ingredients — curcumin as clean-label color",
  },
  /* Hyaluronic acid: competitor-branded tube upstream — dew as hydration. */
  "FN-068": {
    src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
    alt: "Macro leaf covered in dew droplets — hydration, the signature of hyaluronic acid",
  },
};

const imgFor = (item: Ingredient) => IMAGE_OVERRIDES[item.code] ?? item.image;

const STATS = [
  { value: "30+", unit: "Years", desc: "Botanical expertise since 1995" },
  { value: "6", unit: "Global Bases", desc: "R&D hubs across three continents" },
  { value: "ISO/GMP", unit: "Certified", desc: "Audited quality on every lot" },
  { value: "40+", unit: "Countries", desc: "Regulated markets supplied" },
] as const;

const INDUSTRY_COPY = [
  "Bioavailable actives standardized for potency, stability and dose accuracy — from Ashwagandha KSM-66 to Coenzyme Q10.",
  "Heat- and pH-stable carotenoids, plant proteins and functional botanicals for clean-label fortification at scale.",
  "Dermatologically active botanicals and hyaluronic acid systems formulated for cellular compatibility and sensory performance.",
] as const;

/** Division accent dot for badge chips — chip stays paper/ink for contrast. */
const DIVISION_DOT: Record<string, string> = {
  nutrition: "bg-nutrition border border-brand-green-700/30",
  food: "bg-food",
  cosmetics: "bg-cosmetics",
  chem: "bg-chem",
  agro: "bg-agro",
  feed: "bg-feed",
};

const PILLAR_ICONS = [Sprout, FlaskConical, Globe] as const;

const FOOTER_COLS = [
  {
    head: "Portfolio",
    links: [
      { label: "Ingredient Matrix", href: "#matrix" },
      { label: "Product Dossiers", href: "#product" },
      { label: "Formulation Support", href: "#formulation" },
      { label: "Nutrition Actives", href: "#matrix" },
    ],
  },
  {
    head: "Standards",
    links: [
      { label: "Quality Charter", href: "#standards" },
      { label: "Regulatory Dossiers", href: "#contact" },
      { label: "Sourcing Standards", href: "#standards" },
      { label: "Ingredient Transparency", href: "#matrix" },
    ],
  },
  {
    head: "Partner",
    links: [
      { label: "Request a Specification", href: "#contact" },
      { label: "Partner Inquiries", href: "#contact" },
      { label: "Technical Dossiers", href: "#contact" },
      { label: "Global Offices", href: "#contact" },
    ],
  },
] as const;

/** Reusable label style: the spec-sheet voice at its measured floor (11px, mute-600). */
const TECH_LABEL = "font-tech text-[11px] uppercase tracking-[0.26em] text-mute-600";

/* ─────────────────────────────── Nav + Portfolio menu ─────────────────────────────── */

const MENU_APPLICATIONS: IngredientApplication[] = [
  "Nutrition",
  "Food & Beverage",
  "Personal Care",
];

function PortfolioMenu() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        /* Close when keyboard focus leaves the disclosure entirely. */
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="portfolio-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 items-center gap-1.5 font-body text-sm text-mute-600 transition-colors duration-300 hover:text-brand-green-700 focus-visible:outline-2"
      >
        Portfolio
        <ChevronDown
          aria-hidden
          className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="portfolio-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
            className="absolute left-1/2 top-full z-50 mt-2 w-[640px] rounded-sm border border-line bg-paper shadow-xl"
            style={{ x: "-50%" }}
          >
            <div className="grid grid-cols-3 gap-px bg-line">
              {MENU_APPLICATIONS.map((application) => {
                const items = getIngredientsByApplication(application).slice(0, 4);
                const division = divisionForApplication(application);
                return (
                  <div key={application} className="bg-paper p-5">
                    <p className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600">
                      <span
                        aria-hidden
                        className={`size-2 rounded-full ${DIVISION_DOT[division]}`}
                      />
                      {application}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {items.map((item) => (
                        <li key={item.code}>
                          <a
                            href="#matrix"
                            onClick={() => setOpen(false)}
                            className="font-body text-sm text-ink transition-colors duration-200 hover:text-brand-green-700 focus-visible:outline-2"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-line px-5 py-3">
              <span className={TECH_LABEL}>{ingredients.length} active compounds</span>
              <a
                href="#formulation"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-blue-700 transition-colors duration-200 hover:text-brand-green-700 focus-visible:outline-2"
              >
                Build a formulation
                <ArrowRight aria-hidden className="size-3.5" />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const links = [
    { label: "Industries", href: "#industries" },
    { label: "Portfolio", href: "#matrix" },
    { label: "Formulation", href: "#formulation" },
    { label: "Standards", href: "#standards" },
  ];

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-ink transition-colors duration-200 hover:text-brand-green-700 focus-visible:outline-2"
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
            className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-lg"
          >
            <ul className="px-5 py-3">
              {links.map((link) => (
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
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="mx-auto max-w-[1480px]">
        {/* Micro-strip */}
        <div className="hidden items-center justify-between border-b border-line px-6 py-1.5 md:flex">
          <span className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.26em] text-mute-600">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-brand-green-500/60 [animation-duration:2.4s] motion-reduce:animate-none" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-green-500" />
            </span>
            Botanical Intelligence Since 1995
          </span>
          <span className="font-tech text-[11px] uppercase tracking-[0.26em] text-mute-600">
            ISO 9001 · GMP · HACCP
          </span>
          <span className="font-tech text-[11px] uppercase tracking-[0.26em] text-mute-600">
            {company.hq.coords} — Nanjing HQ
          </span>
        </div>
        {/* Main nav */}
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between px-5 py-3 md:px-8"
        >
          <a
            href="#top"
            className="flex items-baseline gap-2.5 transition-opacity duration-300 hover:opacity-75 focus-visible:outline-2"
            aria-label="Fenchem home"
          >
            <span className="font-body text-xl font-bold tracking-[-0.04em] text-brand-green-600">
              FENCHEM
            </span>
            <Leaf
              aria-hidden
              className="size-4 self-center text-brand-green-500"
              strokeWidth={1.5}
            />
          </a>
          <div className="hidden items-center gap-7 md:flex">
            <a
              href="#industries"
              className="inline-flex min-h-11 items-center font-body text-sm text-mute-600 transition-colors duration-300 hover:text-brand-green-700 focus-visible:outline-2"
            >
              Industries
            </a>
            <PortfolioMenu />
            <a
              href="#formulation"
              className="inline-flex min-h-11 items-center font-body text-sm text-mute-600 transition-colors duration-300 hover:text-brand-green-700 focus-visible:outline-2"
            >
              Formulation
            </a>
            <a
              href="#standards"
              className="inline-flex min-h-11 items-center font-body text-sm text-mute-600 transition-colors duration-300 hover:text-brand-green-700 focus-visible:outline-2"
            >
              Standards
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MobileNav />
            <a
              href="#contact"
              className="group inline-flex min-h-11 items-center gap-2 rounded-sm bg-brand-green-500 px-5 py-2.5 font-body text-sm font-semibold text-brand-green-950 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-700"
            >
              Request a Specification
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </nav>
      </div>
      {/* Progress hairline — user-scroll-driven; suppressed under reduced motion */}
      {!reduce && (
        <m.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-green-500"
          style={{ scaleX: scrollYProgress }}
        />
      )}
    </header>
  );
}

/* ─────────────────────────────── Hero ─────────────────────────────── */

function HeroSection() {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section id="top" aria-label="Hero" className="relative border-b border-line bg-paper">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid min-h-[80vh] lg:grid-cols-12">
          {/* Left: Headline block */}
          <div className="flex flex-col justify-center px-5 py-16 md:px-10 md:py-24 lg:col-span-7 lg:py-32">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-green-200 bg-brand-green-50 px-4 py-1.5 font-tech text-[11px] uppercase tracking-[0.32em] text-brand-green-700">
                Botanical Intelligence Since 1995
              </p>
            </Reveal>
            <Reveal delay={STAGGER}>
              <h1 className="mt-8 font-display text-[clamp(2.6rem,6vw,5.5rem)] font-bold leading-[1.1] md:leading-[1.05] tracking-[-0.04em] text-ink">
                Nurturing Vitality
                <br />
                through <span className="text-brand-green-600">Botanical Excellence</span>
              </h1>
            </Reveal>
            <Reveal delay={STAGGER * 2}>
              <p className="mt-7 max-w-lg text-pretty font-body text-base leading-relaxed text-mute-600 md:text-lg">
                Fenchem converts raw botanical complexity into precisely specified, clinically
                validated actives — supplied at industrial scale to formulators in more than forty
                countries.
              </p>
            </Reveal>
            <Reveal delay={STAGGER * 3} className="mt-9 flex flex-wrap gap-3">
              <a
                href="#matrix"
                className="group inline-flex min-h-11 items-center gap-2.5 rounded-sm bg-brand-green-500 px-7 py-4 font-body text-sm font-semibold text-brand-green-950 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-700"
              >
                Explore Portfolio
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#formulation"
                className="inline-flex min-h-11 items-center gap-2.5 rounded-sm border border-brand-blue-700 px-7 py-4 font-body text-sm font-semibold text-brand-blue-700 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-blue-50 focus-visible:outline-2"
              >
                Build a Formulation
              </a>
            </Reveal>

            {/* Stat band */}
            <Reveal delay={STAGGER * 4}>
              <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.unit} className="bg-paper px-4 py-5">
                    <dt className="font-tech text-[11px] uppercase tracking-[0.24em] text-mute-600">
                      {s.unit}
                    </dt>
                    <dd className="mt-1.5">
                      <span className="font-display text-3xl font-semibold tracking-[-0.02em] text-brand-green-600 md:text-4xl">
                        {s.value}
                      </span>
                      <p className="mt-1 font-body text-xs text-mute-600">{s.desc}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: botanical image */}
          <div className="relative overflow-hidden border-t border-line lg:col-span-5 lg:border-l lg:border-t-0">
            <div ref={imgRef} className="absolute inset-0">
              <m.img
                src={IMG.hero}
                alt="Lush green botanical leaves in morning light — representing Fenchem's natural ingredient sourcing"
                className="h-[116%] w-full object-cover"
                style={{ y: reduce ? 0 : imgY }}
                initial={reduce ? false : { scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: EASE }}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/30 via-transparent to-transparent" />
            </div>
            {/* Caption badge */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between rounded-sm border border-line bg-paper/95 px-4 py-2.5 backdrop-blur-sm">
                <span className="font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600">
                  {company.tagline}
                </span>
                <span className="font-tech text-[11px] uppercase tracking-[0.2em] text-brand-green-700">
                  {company.since}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Ingredient Ticker ─────────────────────────────── */

function TickerSection() {
  /* WCAG 2.2.2: hover-pause alone is unreachable by keyboard/touch — the
   * button is the real pause mechanism; hover remains a convenience. */
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Ingredient index ticker"
      className="group relative overflow-hidden border-b border-line bg-brand-green-50 py-3.5"
    >
      {/* Edge fades so entries dissolve instead of clipping at the viewport */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-green-50 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-green-50 to-transparent"
      />
      <button
        type="button"
        aria-pressed={paused}
        aria-label={paused ? "Resume ingredient ticker" : "Pause ingredient ticker"}
        onClick={() => setPaused((v) => !v)}
        className="absolute right-2 top-1/2 z-20 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-brand-green-200 bg-paper/95 text-brand-green-700 transition-colors duration-200 after:absolute after:-inset-1.5 hover:bg-brand-green-100 focus-visible:outline-2"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <m.span
            key={paused ? "play" : "pause"}
            className="inline-flex"
            initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }}
          >
            {paused ? (
              /* ml-px: a play triangle's visual center sits left of its geometric center */
              <Play aria-hidden className="ml-px size-3.5" />
            ) : (
              <Pause aria-hidden className="size-3.5" />
            )}
          </m.span>
        </AnimatePresence>
      </button>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={paused ? { animationPlayState: "paused" } : undefined}
      >
        {([0, 1] as const).map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {ingredients.map((ingredient, i) => (
              <li key={ingredient.name} className="flex items-center gap-8 pr-8">
                <span className="whitespace-nowrap font-tech text-[11px] uppercase tracking-[0.3em] text-brand-green-700">
                  <span className="text-brand-green-800">{String(i + 1).padStart(2, "0")}</span>
                  {" — "}
                  {ingredient.name}
                </span>
                <span aria-hidden className="size-1.5 rotate-45 bg-brand-green-400" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────── Section header helper ─────────────────────────────── */

function SectionHeader({
  id,
  number,
  label,
  title,
  accent,
  aside,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  accent: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 border-b border-line px-5 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
      <Reveal>
        <p className="font-tech text-[11px] uppercase tracking-[0.32em] text-brand-green-700">
          {number} — {label}
        </p>
        <h2
          id={id}
          className="mt-4 text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink md:text-5xl"
        >
          {title} <span className="text-brand-green-600">{accent}</span>
        </h2>
      </Reveal>
      {aside && <Reveal delay={STAGGER}>{aside}</Reveal>}
    </div>
  );
}

/* ─────────────────────────────── Industries ─────────────────────────────── */

function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="scroll-mt-28 border-b border-line bg-paper"
    >
      <div className="mx-auto max-w-[1480px]">
        <SectionHeader
          id="industries-heading"
          number="01"
          label="Application Domains"
          title="Built for three"
          accent="industries"
          aside={
            <p className="max-w-xs text-pretty font-body text-sm leading-relaxed text-mute-600">
              Clinically supported actives engineered for the precise demands of each formulation
              discipline.
            </p>
          }
        />

        <div>
          {industries.map((industry, i) => (
            <a
              key={industry.title}
              href="#matrix"
              aria-label={`${industry.title} — view in the ingredient matrix`}
              className="group block border-b border-line transition-colors duration-400 last:border-b-0 hover:bg-brand-green-50 focus-visible:outline-2"
            >
              <Reveal
                delay={i * STAGGER}
                className="grid items-center gap-4 px-5 py-10 md:grid-cols-12 md:gap-6 md:px-10 md:py-12"
              >
                <div className="md:col-span-1">
                  <span className="font-tech text-sm tracking-[0.22em] text-brand-green-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-body text-2xl font-bold tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-brand-green-700 md:col-span-4 md:text-3xl">
                  {industry.title}
                </h3>
                <p className="text-pretty font-body text-sm leading-relaxed text-mute-600 md:col-span-5">
                  {INDUSTRY_COPY[i]}
                </p>
                <div className="relative aspect-video overflow-hidden rounded-sm md:col-span-1 md:aspect-square">
                  <img
                    src={industry.image.src}
                    alt={industry.image.alt}
                    className="h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                </div>
                <div className="flex justify-end md:col-span-1">
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 text-mute-400 transition-[translate,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-green-500"
                  />
                </div>
              </Reveal>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Ingredient Matrix ─────────────────────────────── */

function DivisionBadge({ ingredient }: { ingredient: Ingredient }) {
  const division = divisionForApplication(ingredient.application);
  return (
    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-sm border border-line bg-paper/95 px-2 py-1 font-tech text-[11px] uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
      <span aria-hidden className={`size-1.5 rounded-full ${DIVISION_DOT[division]}`} />
      {ingredient.application}
    </span>
  );
}

function MatrixSection() {
  return (
    <section
      id="matrix"
      aria-labelledby="matrix-heading"
      className="scroll-mt-28 border-b border-line bg-mute-50"
    >
      <div className="mx-auto max-w-[1480px]">
        <SectionHeader
          id="matrix-heading"
          number="02"
          label="Active Compounds"
          title="Ingredient"
          accent="matrix"
          aside={
            <a
              href="#contact"
              className="group inline-flex min-h-11 items-center gap-2 rounded-sm border border-brand-blue-700 px-5 py-3 font-body text-sm font-semibold text-brand-blue-700 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-blue-50 focus-visible:outline-2"
            >
              Request Full Specifications
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          }
        />

        <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {getFeaturedIngredients().map((item, i) => (
            <Reveal key={item.code} delay={(i % 3) * STAGGER} className="group bg-paper">
              <article>
                <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                  <img
                    src={imgFor(item).src}
                    alt={imgFor(item).alt}
                    className="h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <DivisionBadge ingredient={item} />
                  <div className="absolute inset-0 bg-brand-green-950/0 transition-colors duration-500 group-hover:bg-brand-green-950/10" />
                </div>
                <div className="px-5 py-7 md:px-7 md:py-8">
                  <div className="flex items-baseline justify-between">
                    <span className="font-tech text-[11px] tracking-[0.22em] text-brand-green-700">
                      {String(i + 1).padStart(2, "0")} —
                    </span>
                    <span className="font-tech text-[11px] uppercase tracking-[0.22em] text-mute-600">
                      {item.code}
                    </span>
                  </div>
                  <h3 className="mt-3 font-body text-xl font-bold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-brand-green-700">
                    {item.name}
                  </h3>
                  <p className="mt-0.5 font-display text-sm italic text-mute-600">{item.latin}</p>
                  <dl className="mt-5 space-y-2.5 border-t border-line pt-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600">
                        Purity
                      </dt>
                      <dd className="text-right font-tech text-[11px] text-mute-700">
                        {item.purity}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600">
                        Form
                      </dt>
                      <dd className="text-right font-tech text-[11px] text-mute-700">
                        {item.form}
                      </dd>
                    </div>
                  </dl>
                  <a
                    href="#contact"
                    className="group/spec mt-6 inline-flex min-h-11 items-center gap-2 font-tech text-xs uppercase tracking-[0.24em] text-brand-blue-700 transition-colors duration-300 hover:text-brand-green-700 focus-visible:outline-2"
                  >
                    Request Spec
                    <ArrowUpRight
                      aria-hidden
                      className="size-3 transition-transform duration-300 group-hover/spec:-translate-y-0.5 group-hover/spec:translate-x-0.5"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Product Dossier ─────────────────────────────── */

const DOSSIER = ingredients[0]; // Ashwagandha KSM-66 — the flagship trade-name active.

function DossierSection() {
  const division = divisionForApplication(DOSSIER.application);
  const specRows = [
    { label: "Spec Ref", value: DOSSIER.code },
    { label: "Assay", value: DOSSIER.purity },
    { label: "Form", value: DOSSIER.form },
    { label: "Class", value: DOSSIER.category },
    { label: "Application", value: DOSSIER.useCase },
  ];

  return (
    <section
      id="product"
      aria-labelledby="product-heading"
      className="scroll-mt-28 border-b border-line bg-paper"
    >
      <div className="mx-auto max-w-[1480px]">
        <SectionHeader
          id="product-heading"
          number="03"
          label="Product Dossier"
          title="One active,"
          accent="documented to the lot"
          aside={
            <p className="max-w-xs text-pretty font-body text-sm leading-relaxed text-mute-600">
              Every compound in the matrix carries this depth of documentation — {DOSSIER.name}{" "}
              shown as the working example.
            </p>
          }
        />

        <div className="grid lg:grid-cols-12">
          {/* Image */}
          <div className="relative min-h-80 overflow-hidden border-b border-line lg:col-span-5 lg:border-b-0 lg:border-r">
            <img
              src={imgFor(DOSSIER).src}
              alt={imgFor(DOSSIER).alt}
              className="absolute inset-0 h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/25 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-sm border border-line bg-paper/95 px-2 py-1 font-tech text-[11px] uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
              <span aria-hidden className={`size-1.5 rounded-full ${DIVISION_DOT[division]}`} />
              {DOSSIER.application}
            </span>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-sm border border-line bg-paper/95 px-4 py-2.5 backdrop-blur-sm">
              <span className="font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600">
                {DOSSIER.category} · {DOSSIER.specification}
              </span>
              <span className="font-tech text-[11px] uppercase tracking-[0.2em] text-brand-green-700">
                {DOSSIER.code}
              </span>
            </div>
          </div>

          {/* Dossier body */}
          <div className="px-5 py-12 md:px-10 md:py-16 lg:col-span-7">
            <Reveal>
              <h3 className="font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
                {DOSSIER.name}
              </h3>
              <p className="mt-1 font-display text-base italic text-mute-600">{DOSSIER.latin}</p>
              <p className="mt-5 max-w-xl text-pretty font-body text-base leading-relaxed text-mute-600">
                A branded, clinically studied adaptogen standardized by withanolide content.
                Supplied with full identity, potency and stability documentation — chromatographic
                panels run on every production batch, third-party verification on request.
              </p>
            </Reveal>

            <Reveal delay={STAGGER}>
              <dl className="mt-8 max-w-xl border-t border-line">
                {specRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-3"
                  >
                    <dt className="font-tech text-[11px] uppercase tracking-[0.24em] text-mute-600">
                      {row.label}
                    </dt>
                    <dd className="text-right font-tech text-sm text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={STAGGER * 2}>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Capsule", "Tablet", "Softgel", "Powder blend"].map((format) => (
                  <span
                    key={format}
                    className="rounded-full border border-brand-green-200 bg-brand-green-50 px-3 py-1 font-body text-xs font-medium text-brand-green-800"
                  >
                    {format}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={createInquiryHref("dossier")}
                  className="group inline-flex min-h-11 items-center gap-2.5 rounded-sm bg-brand-green-500 px-6 py-3.5 font-body text-sm font-semibold text-brand-green-950 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-700"
                >
                  Request this specification
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
                <a
                  href={createInquiryHref("tds")}
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-sm border border-brand-blue-700 px-6 py-3.5 font-body text-sm font-semibold text-brand-blue-700 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-blue-50 focus-visible:outline-2"
                >
                  <FileDown aria-hidden className="size-4" />
                  Technical data sheet
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Formulation Presenter ─────────────────────────────── */

const FORM_OPTIONS = ["Powder", "Beadlet", "Oil suspension", "Granular"] as const;

const CHIP_CLASS = (selected: boolean) =>
  `min-h-11 rounded-sm border px-4 py-2 font-body text-sm font-medium transition-[background-color,border-color,color,scale] duration-200 active:scale-[0.96] focus-visible:outline-2 ${
    selected
      ? "border-brand-green-600 bg-brand-green-500 text-brand-green-950"
      : "border-line bg-paper text-mute-600 hover:border-brand-green-400 hover:text-ink"
  }`;

/** Multi-select chip — a genuine toggle, so aria-pressed is the right mapping. */
function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={CHIP_CLASS(selected)}
    >
      {label}
    </button>
  );
}

/**
 * Single-select chip row — mutually exclusive choice, so it's a radiogroup
 * (roving tabindex, arrow keys move the selection) rather than toggles.
 */
function RadioChips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
}) {
  const move = (delta: number) => {
    const next = options[(options.indexOf(value) + delta + options.length) % options.length];
    onChange(next);
  };
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="mt-3 flex flex-wrap gap-2"
      onKeyDown={(event) => {
        /* stopPropagation: the prototype switcher listens for arrow keys at the
         * document level and would swap variants mid-selection. */
        if (event.key.startsWith("Arrow")) event.stopPropagation();
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          move(1);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          tabIndex={value === option ? 0 : -1}
          ref={(node) => {
            /* Keep focus with the selection as arrow keys move it. */
            if (
              node &&
              value === option &&
              node.closest('[role="radiogroup"]')?.contains(document.activeElement)
            ) {
              node.focus();
            }
          }}
          onClick={() => onChange(option)}
          className={CHIP_CLASS(value === option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function FormulationSection() {
  const [application, setApplication] = useState<IngredientApplication>("Nutrition");
  const [form, setForm] = useState<(typeof FORM_OPTIONS)[number]>("Beadlet");
  const [regulatory, setRegulatory] = useState<string[]>(["ISO 9001", "GMP"]);
  const matches = getIngredientsByApplication(application);

  const toggleRegulatory = (name: string) =>
    setRegulatory((current) =>
      current.includes(name) ? current.filter((c) => c !== name) : [...current, name],
    );

  return (
    <section
      id="formulation"
      aria-labelledby="formulation-heading"
      className="scroll-mt-28 border-b border-line bg-brand-green-50/60"
    >
      <div className="mx-auto max-w-[1480px]">
        <SectionHeader
          id="formulation-heading"
          number="04"
          label="Formulation"
          title="Your target spec,"
          accent="engineered back to you"
          aside={
            <p className="max-w-xs text-pretty font-body text-sm leading-relaxed text-mute-600">
              Pick the shape of your formulation — our laboratory returns a validated proposal
              within one business day.
            </p>
          }
        />

        <div className="grid gap-px bg-line lg:grid-cols-12">
          {/* Pickers */}
          <div className="bg-paper px-5 py-10 md:px-10 md:py-12 lg:col-span-7">
            <div>
              <p id="formulation-application-label" className={TECH_LABEL}>
                Application
              </p>
              <RadioChips
                label="Application"
                options={MENU_APPLICATIONS}
                value={application}
                onChange={setApplication}
              />
            </div>

            <div className="mt-8">
              <p className={TECH_LABEL}>Delivery form</p>
              <RadioChips
                label="Delivery form"
                options={FORM_OPTIONS}
                value={form}
                onChange={setForm}
              />
            </div>

            <fieldset className="mt-8">
              <legend className={TECH_LABEL}>Regulatory map</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {certificationDetails.map((cert) => (
                  <Chip
                    key={cert.name}
                    label={cert.name}
                    selected={regulatory.includes(cert.name)}
                    onClick={() => toggleRegulatory(cert.name)}
                  />
                ))}
              </div>
            </fieldset>

            {/* Process strip */}
            <div className="mt-12 border-t border-line pt-8">
              <p className={TECH_LABEL}>What happens next</p>
              <ol className="mt-4 grid gap-4 sm:grid-cols-2">
                {processSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="font-tech text-sm tracking-[0.16em] text-brand-green-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-body text-sm font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-pretty font-body text-xs leading-relaxed text-mute-600">
                        {step.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Live spec sheet */}
          <div className="bg-brand-green-950 px-5 py-10 md:px-8 md:py-12 lg:col-span-5">
            <div className="flex items-center justify-between">
              <span className="font-tech text-[11px] uppercase tracking-[0.28em] text-brand-green-400">
                Draft Specification
              </span>
              <span className="font-tech text-[11px] uppercase tracking-[0.28em] text-brand-green-300 tabular-nums">
                FN-REQ / 2026
              </span>
            </div>
            {/* Live region: chip changes rewrite the draft silently otherwise (WCAG 4.1.3) */}
            <div aria-live="polite">
              <dl className="mt-6 border-t border-brand-green-800">
                {[
                  ["Application", application],
                  ["Delivery form", form],
                  ["Regulatory", regulatory.length ? regulatory.join(" · ") : "—"],
                  ["Matching actives", `${matches.length} of ${ingredients.length} in portfolio`],
                  ["Response", "< 24h with full documentation"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-b border-brand-green-800 py-3.5"
                  >
                    <dt className="font-tech text-[11px] uppercase tracking-[0.24em] text-brand-green-400">
                      {label}
                    </dt>
                    <dd className="text-right font-tech text-sm text-paper tabular-nums">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-5 space-y-1.5">
                {matches.slice(0, 3).map((item) => (
                  <li
                    key={item.code}
                    className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.18em] text-brand-green-300"
                  >
                    <CheckCircle2 aria-hidden className="size-3 text-brand-green-400" />
                    {item.name} — {item.purity}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={createInquiryHref("formulation")}
              className="group mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-sm bg-brand-green-500 px-6 py-4 font-body text-sm font-bold text-brand-green-950 transition-[background-color,scale] duration-300 active:scale-[0.96] hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-300"
            >
              Submit this specification
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <p className="mt-4 text-center font-tech text-[11px] uppercase tracking-[0.24em] text-brand-green-400">
              Technical dossiers on request
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Origin + Standards ─────────────────────────────── */

function StandardsSection() {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section
      id="standards"
      aria-labelledby="standards-heading"
      className="scroll-mt-28 border-b border-line bg-paper"
    >
      <div className="mx-auto max-w-[1480px]">
        {/* Origin editorial beat — the pull-quote pacing VariantC proved out */}
        <div className="grid gap-px border-b border-line bg-line lg:grid-cols-12">
          <div className="relative min-h-72 overflow-hidden bg-paper lg:col-span-5">
            <img
              src={IMG.origin}
              alt="Rows of cultivated green crops on a partner farm at golden hour"
              className="absolute inset-0 h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center bg-paper px-5 py-12 md:px-10 md:py-16 lg:col-span-7">
            <Reveal>
              <p className="font-tech text-[11px] uppercase tracking-[0.32em] text-brand-green-700">
                Origin
              </p>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-4xl">
                Grown with <em className="italic text-brand-green-600">patience.</em>
              </h2>
              <p className="mt-5 max-w-xl text-pretty font-body text-base leading-relaxed text-mute-600">
                Our botanicals begin in soil we know by name — a global network of partner farms
                cultivated over decades, where harvests are timed to the plant, never to the
                quarter.
              </p>
              <blockquote className="mt-6 max-w-xl text-pretty border-l-2 border-brand-green-400 pl-5 font-display text-lg italic leading-relaxed text-brand-green-800">
                "Nature holds the keys to human vitality. We simply refuse to lose them in
                translation."
              </blockquote>
            </Reveal>
          </div>
        </div>

        <SectionHeader
          id="standards-heading"
          number="05"
          label="Quality Infrastructure"
          title="Science-backed"
          accent="standards"
          aside={
            <p className="max-w-xs text-pretty font-body text-sm leading-relaxed text-mute-600">
              Every lot. Every market. Every release — documented to your regulatory map.
            </p>
          }
        />

        <div className="grid lg:grid-cols-12">
          {/* Image */}
          <div className="relative overflow-hidden border-b border-line lg:col-span-5 lg:border-b-0 lg:border-r">
            <div ref={imgRef} className="relative min-h-72 lg:min-h-full">
              <m.img
                src={IMG.lab}
                alt="Dense botanical foliage awaiting quality-control intake at the Nanjing laboratory"
                className="h-[480px] w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 lg:absolute lg:inset-0 lg:h-full"
                style={{ y: reduce ? 0 : imgY }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/20 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-sm border border-line bg-paper/95 px-4 py-2.5 backdrop-blur-sm">
                <span className="font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600">
                  QC Program — Nanjing
                </span>
                <span className="font-tech text-[11px] uppercase tracking-[0.2em] text-brand-green-700">
                  Identity · Potency · Stability
                </span>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="lg:col-span-7">
            {pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal
                  key={pillar.title}
                  delay={i * STAGGER}
                  className={i < pillars.length - 1 ? "border-b border-line" : ""}
                >
                  <div className="flex gap-5 px-5 py-10 transition-colors duration-400 hover:bg-brand-green-50 md:gap-8 md:px-10 md:py-12">
                    <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-sm bg-brand-green-100 text-brand-green-700 md:size-12">
                      <Icon aria-hidden className="size-5 md:size-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-body text-xl font-bold tracking-[-0.02em] text-ink md:text-2xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-pretty font-body text-sm leading-relaxed text-mute-600 md:text-base">
                        {pillar.copy}
                      </p>
                      <div className="mt-4 flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.2em] text-brand-green-700">
                        <CheckCircle2 aria-hidden className="size-3.5" />
                        ISO 9001 · GMP Certified
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Deep-Green Finale ─────────────────────────────── */

function FinaleSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="relative scroll-mt-28 overflow-hidden bg-brand-green-950"
    >
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ y: reduce ? 0 : bgY }}
      >
        <img
          src={IMG.heroThumb}
          alt=""
          className="h-full w-full object-cover opacity-10"
          loading="lazy"
        />
      </m.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-green-950/90 via-brand-green-950/70 to-brand-green-900/90"
      />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="font-tech text-[11px] uppercase tracking-[0.32em] text-brand-green-400">
              06 — Partner with Fenchem
            </p>
            <h2
              id="contact-heading"
              className="mt-6 max-w-4xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-paper md:text-6xl"
            >
              Your next formulation,{" "}
              <span className="text-brand-green-400">engineered to specification</span>
            </h2>
            <p className="mt-7 max-w-xl text-pretty font-body text-base leading-relaxed text-brand-green-100/70 md:text-lg">
              Submit a target spec — purity, form, matrix, regulatory map — and our laboratory
              returns a validated proposal with full documentation within one business day.
            </p>
          </Reveal>

          <Reveal delay={STAGGER * 2} className="mt-10 flex flex-wrap gap-4">
            <a
              href={createInquiryHref("contact")}
              className="group inline-flex min-h-11 items-center gap-3 rounded-sm bg-brand-green-500 px-8 py-4 font-body text-sm font-bold text-brand-green-950 shadow-[0_0_40px_oklch(from_var(--color-brand-green-500)_l_c_h_/_0.3)] transition-[background-color,scale,box-shadow] duration-300 active:scale-[0.96] hover:bg-brand-green-400 hover:shadow-[0_0_64px_oklch(from_var(--color-brand-green-500)_l_c_h_/_0.5)] focus-visible:outline-2"
            >
              Partner with Fenchem
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#matrix"
              className="inline-flex min-h-11 items-center gap-3 rounded-sm border border-brand-green-500/40 px-8 py-4 font-body text-sm font-semibold text-brand-green-200 transition-[background-color,border-color,color,scale] duration-300 active:scale-[0.96] hover:border-brand-green-400 hover:bg-brand-green-900/40 hover:text-paper focus-visible:outline-2"
            >
              Explore Portfolio
            </a>
          </Reveal>

          <Reveal delay={STAGGER * 3}>
            <p className="mt-10 font-tech text-[11px] uppercase tracking-[0.28em] text-brand-green-400">
              Response Time &lt; 24h — Technical Dossiers on Request
            </p>
          </Reveal>

          {/* Office nodes */}
          <div className="mt-20 border-t border-brand-green-800 pt-14">
            <Reveal>
              <p className="font-tech text-[11px] uppercase tracking-[0.3em] text-brand-green-400">
                6 Global Bases — 40+ Countries Served
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-px bg-brand-green-800 sm:grid-cols-3 lg:grid-cols-6">
              {regions.map((region, i) => (
                <Reveal
                  key={region.city}
                  delay={i * (STAGGER * 0.75)}
                  className="bg-brand-green-950/80"
                >
                  <div className="px-4 py-6 transition-colors duration-300 hover:bg-brand-green-900/60">
                    <p className="font-body text-sm font-semibold text-paper">{region.city}</p>
                    <p className="mt-0.5 font-body text-xs text-brand-green-300">{region.short}</p>
                    <p className="mt-2 font-tech text-[11px] tracking-[0.14em] text-brand-green-300 tabular-nums">
                      {region.coords}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Footer ─────────────────────────────── */

function FooterSection() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-12 px-5 py-14 md:grid-cols-12 md:px-10 md:py-16">
          {/* Brand block */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="font-body text-2xl font-bold tracking-[-0.04em] text-brand-green-600">
                FENCHEM
              </span>
              <Leaf aria-hidden className="size-5 text-brand-green-500" strokeWidth={1.5} />
            </div>
            <p className="mt-3 font-body text-base font-medium text-brand-green-700">
              {company.tagline}.
            </p>
            <p className="mt-5 font-tech text-[11px] uppercase leading-loose tracking-[0.22em] text-mute-600">
              ISO 9001 : 2015 · GMP · HACCP
              <br />
              Est. {company.founded} — {company.hq.city}, {company.hq.country}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="rounded-sm border border-brand-blue-200 bg-brand-blue-50 px-2.5 py-1 font-tech text-[11px] uppercase tracking-[0.16em] text-brand-blue-700"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.head} className="md:col-span-2">
              <p className="font-tech text-[11px] uppercase tracking-[0.3em] text-mute-600">
                {col.head}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-mute-600 underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-brand-green-700 hover:decoration-brand-green-400 focus-visible:outline-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark watermark — extrabold: Jakarta loads 300–800; 900 would synthesize */}
        <p
          aria-hidden
          className="select-none overflow-hidden whitespace-nowrap px-5 font-body text-[17vw] font-extrabold leading-[0.78] tracking-[-0.06em] text-brand-green-500/5 md:px-10 min-[1481px]:text-[15rem]"
        >
          FENCHEM
        </p>

        {/* Legal strip */}
        <div className="flex flex-col gap-2 border-t border-line px-5 py-4 font-tech text-[11px] uppercase tracking-[0.2em] text-mute-600 md:flex-row md:items-center md:justify-between md:px-10">
          <span>© 2026 {company.legalName} — All Rights Reserved</span>
          <span className="tabular-nums">{company.hq.coords} — Nanjing, China</span>
          <span className="text-brand-green-700">Botanical Intelligence Since 1995</span>
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

export function VariantH() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="bg-paper font-body text-ink antialiased selection:bg-brand-green-200 selection:text-brand-green-900">
        <SmoothScroll />
        <NavBar />
        <main>
          <HeroSection />
          <TickerSection />
          <IndustriesSection />
          <MatrixSection />
          <DossierSection />
          <FormulationSection />
          <StandardsSection />
          <FinaleSection />
        </main>
        <FooterSection />
      </div>
    </LazyMotion>
  );
}
