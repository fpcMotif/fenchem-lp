import {
  ArrowUpRight,
  FlaskConical,
  Globe,
  Leaf,
  Sprout,
  Award,
  MapPin,
} from "lucide-react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { EASE, Reveal, Intro, Eyebrow } from "@/components/prototype/motion";
import {
  company,
  stats,
  industries,
  pillars,
  ingredients,
  certificationDetails,
  regions,
} from "@/components/landing/landing-content";

/*
 * PROTOTYPE — Variant D: "Botanical Editorial" (green-led, brand book)
 * Premium wellness-magazine feel. Clean white (bg-paper) canvas, NOT warm cream.
 * font-display (Newsreader serif) for display headlines; font-body (Plus Jakarta) elsewhere.
 * GREEN-LED: brand-green-500/600 as primary accents, brand-blue-700 secondary.
 * Deep green footer (bg-brand-green-950) with paper text.
 * Floating pill nav, blob-masked hero image, asymmetric industry cards,
 * split "Rooted in Nature, Refined by Science" section, ingredient chips,
 * quiet certification strip, full-width CTA band.
 */

const NAV_LINKS = [
  { label: "Industries", href: "#industries" },
  { label: "Science", href: "#science" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Quality", href: "#quality" },
] as const;

const INDUSTRY_LAYOUT = [
  { offset: "", aspect: "aspect-[3/4]" },
  { offset: "md:mt-16 lg:mt-24", aspect: "aspect-[4/5]" },
  { offset: "md:mt-8 lg:mt-12", aspect: "aspect-[3/4]" },
] as const;

const STAT_COLORS = [
  "text-brand-green-600",
  "text-brand-blue-700",
  "text-brand-green-600",
  "text-brand-blue-700",
] as const;

const PILLAR_ICONS = [Sprout, FlaskConical, Globe] as const;

/* ─── NavBar ─────────────────────────────────────────────────── */

function NavBar() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <m.nav
      role="navigation"
      aria-label="Main navigation"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
      className="fixed inset-x-4 top-4 z-50 md:inset-x-0 md:top-6"
    >
      <div className="mx-auto flex max-w-[960px] items-center justify-between rounded-full border border-line bg-paper/85 py-2 pl-6 pr-2 shadow-sm backdrop-blur-md">
        <a
          href="#top"
          className="font-body text-xl font-semibold tracking-tight text-ink transition-colors duration-300 hover:text-brand-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-500"
        >
          Fenchem
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex" aria-label="Site sections">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-mute-500 transition-colors duration-300 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-500 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-500 px-5 py-2.5 font-body text-sm font-semibold text-paper shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400 min-h-11"
          >
            Partner with Us
          </a>
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mute-500 transition-colors hover:border-brand-green-300 hover:text-brand-green-600 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-500"
          >
            <span aria-hidden className="grid gap-1">
              <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="mx-auto mt-2 max-w-[960px] overflow-hidden rounded-3xl border border-line bg-paper/95 px-6 py-5 shadow-md backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 font-body text-sm text-mute-600 transition-colors hover:bg-brand-green-50 hover:text-brand-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-500 min-h-11"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </m.nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */

type HeroSectionProps = {
  heroRef: React.RefObject<HTMLElement | null>;
  blobY: MotionValue<number>;
};

function HeroSection({ heroRef, blobY }: HeroSectionProps) {
  const reduce = useReducedMotion();

  return (
    <header id="top" ref={heroRef} className="relative overflow-hidden pb-24 pt-36 md:pb-40 md:pt-52">
      {/* Subtle green radial glow behind hero text */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-[-10%] h-[600px] w-[600px] rounded-full bg-brand-green-50 blur-3xl opacity-60"
      />

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 md:px-12 lg:grid-cols-12 lg:gap-10 lg:px-16">

        {/* Left: headline copy */}
        <div className="lg:col-span-7">
          <Intro delay={0.05}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-green-200 bg-brand-green-50 px-4 py-1.5 font-tech text-[10px] uppercase tracking-[0.25em] text-brand-green-600 md:text-[11px]">
              <Leaf className="h-3.5 w-3.5" aria-hidden />
              Botanical Intelligence Since 1995
            </span>
          </Intro>

          <Intro delay={0.18}>
            <h1 className="mt-8 font-display text-[clamp(3rem,7.5vw,6.25rem)] font-normal leading-[1.02] tracking-[-0.03em] text-ink">
              Nurturing{" "}
              <em className="not-italic text-brand-green-700">Vitality</em>
              <br />
              through Botanical
              <br />
              <em className="italic text-brand-blue-700">Excellence</em>
            </h1>
          </Intro>

          <Intro delay={0.3}>
            <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-mute-600 md:text-xl">
              Premium botanical and functional ingredients for nutrition, food and personal care —
              bridging ancient plant wisdom with modern scientific precision.
            </p>
          </Intro>

          <Intro delay={0.44} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#ingredients"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green-500 px-8 py-4 font-body text-sm font-semibold tracking-wide text-paper shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400 min-h-11"
            >
              Explore Portfolio
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-brand-blue-200 px-8 py-4 font-body text-sm font-semibold tracking-wide text-brand-blue-700 transition-all duration-300 hover:border-brand-blue-400 hover:bg-brand-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue-500 min-h-11"
            >
              Request a Specification
            </a>
          </Intro>
        </div>

        {/* Right: blob-masked botanical image */}
        <Intro delay={0.28} className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[520px]">
            {/* Glow halo */}
            <div
              aria-hidden
              className="absolute -inset-6 rotate-6 opacity-40"
              style={{
                borderRadius: "42% 58% 62% 38% / 47% 59% 41% 53%",
                background: "oklch(0.78 0.15 145)",
                filter: "blur(32px)",
              }}
            />

            <m.div style={{ y: reduce ? 0 : blobY }} className="relative">
              {/* Blob image */}
              <div
                className="overflow-hidden shadow-lg"
                style={{ borderRadius: "58% 42% 38% 62% / 53% 41% 59% 47%" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80"
                  alt="Macro photograph of a green leaf with morning dew, representing botanical purity"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                />
              </div>

              {/* ISO badge */}
              <span className="absolute right-0 top-8 rounded-full border border-line bg-paper/90 px-4 py-2 font-tech text-[10px] uppercase tracking-[0.25em] text-brand-green-600 shadow-sm backdrop-blur md:-right-4 md:top-12">
                ISO · GMP Certified
              </span>

              {/* Floating stat card */}
              <m.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={
                  reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }
                className="absolute -bottom-6 left-0 max-w-[220px] rounded-3xl border border-line bg-paper p-6 shadow-md md:-bottom-8 md:-left-8"
              >
                <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-mute-400">
                  Extraction Yield
                </p>
                <p className="mt-2 font-display text-4xl font-light text-brand-green-500">98%</p>
                <p className="mt-1 font-body text-xs leading-relaxed text-mute-400">
                  Bio-active retention across our extraction process.
                </p>
              </m.div>
            </m.div>
          </div>
        </Intro>
      </div>
    </header>
  );
}

/* ─── Industries ─────────────────────────────────────────────── */

function IndustriesSection() {
  return (
    <section id="industries" className="scroll-mt-28 py-28 md:py-40">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>Where our ingredients work</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-light tracking-tight text-ink md:text-5xl lg:text-6xl">
              Purity across{" "}
              <em className="italic text-brand-green-500">industries</em>
            </h2>
          </div>
          <p className="max-w-sm font-body text-base leading-relaxed text-mute-500">
            Crafted to meet the rigorous demands of global leaders in health, wellness and beauty.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-3 md:gap-8 lg:gap-10">
          {industries.map((industry, i) => (
            <Reveal key={industry.title} delay={i * 0.12} className={INDUSTRY_LAYOUT[i].offset}>
              <a
                href="#ingredients"
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-500 rounded-3xl"
              >
                <div
                  className={`overflow-hidden rounded-[24px] shadow-sm transition-shadow duration-500 group-hover:shadow-md ${INDUSTRY_LAYOUT[i].aspect}`}
                >
                  <img
                    src={industry.image.src}
                    alt={industry.image.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-7 flex items-baseline gap-4">
                  <span className="font-tech text-xs tracking-[0.2em] text-brand-green-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-tight text-ink md:text-[1.65rem]">
                    {industry.title}
                  </h3>
                </div>
                <p className="mt-3 font-body text-sm leading-relaxed text-mute-500">
                  {industry.copy}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-green-600 transition-colors duration-300 group-hover:text-brand-green-700">
                  Explore applications
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Science / Split Section ────────────────────────────────── */

function ScienceSection() {
  return (
    <section id="science" className="scroll-mt-28 py-28 md:py-40">
      {/* Subtle full-width tint band — NOT a dark section */}
      <div className="bg-brand-green-50/50 py-1" aria-hidden />

      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16 pt-20 pb-8">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2 lg:gap-28">

          {/* Image collage */}
          <Reveal>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-brand-green-100 blur-3xl opacity-50"
              />
              <div className="relative overflow-hidden rounded-[28px] shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Sunlight filtering through a lush forest canopy representing nature and botanical sourcing"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                {/* Green gradient overlay for brand feel */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 60%, oklch(0.35 0.12 145 / 0.35) 100%)" }}
                />
              </div>

              {/* Tilted inset second image */}
              <div className="absolute -bottom-10 right-2 w-40 rotate-2 overflow-hidden rounded-[20px] border-[5px] border-paper shadow-md transition-transform duration-500 hover:rotate-0 md:-right-10 md:w-56">
                <img
                  src="https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=640&q=80"
                  alt="Scientific laboratory glassware used during botanical extract analysis"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <Eyebrow>The Fenchem legacy</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-6xl">
                Rooted in Nature,
                <br />
                <em className="italic text-brand-green-500">Refined by Science.</em>
              </h2>
              <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-mute-500">
                Our journey began with a simple belief: that nature holds the keys to human vitality.
                Today we manage a global network of sustainable farms and advanced laboratories to
                bring those keys to our partners, lot after lot.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stats.map((stat, i) => (
                <Reveal key={stat.value} delay={i * 0.08}>
                  <div className="h-full rounded-[20px] border border-line bg-paper px-6 py-5 shadow-sm transition-all duration-300 hover:border-brand-green-300 hover:shadow-md">
                    <span className={`font-display text-3xl font-light md:text-4xl ${STAT_COLORS[i]}`}>
                      {stat.value}
                    </span>
                    <p className="mt-1.5 font-body text-xs leading-relaxed text-mute-400 md:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="mt-24 border-t border-line pt-16 md:mt-32 md:pt-20">
          <Reveal>
            <Eyebrow className="text-center">Three pillars of excellence</Eyebrow>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal key={pillar.title} delay={i * 0.12}>
                  <div className="group">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-600 transition-colors duration-300 group-hover:bg-brand-green-500 group-hover:text-paper">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-mute-500">
                      {pillar.copy}
                    </p>
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

/* ─── Ingredients ────────────────────────────────────────────── */

function IngredientsSection() {
  return (
    <section id="ingredients" className="scroll-mt-28 py-28 md:py-40">
      {/* Ingredient image marquee strip */}
      <div className="relative mb-20 overflow-hidden" aria-hidden>
        <div className="animate-marquee flex gap-4">
          {[
            "photo-1416879595882-3373a0480b5b",
            "photo-1466781783364-36c955e42a7f",
            "photo-1576086213369-97a306d36557",
            "photo-1559757148-5c350d0d3c56",
            "photo-1512069772995-ec65ed45afd6",
            "photo-1501004318641-b39e6451bec6",
            "photo-1416879595882-3373a0480b5b",
            "photo-1466781783364-36c955e42a7f",
            "photo-1576086213369-97a306d36557",
            "photo-1559757148-5c350d0d3c56",
            "photo-1512069772995-ec65ed45afd6",
            "photo-1501004318641-b39e6451bec6",
          ].map((id, idx) => (
            <div
              key={`${id}-${idx}`}
              className="h-28 w-40 flex-none overflow-hidden rounded-2xl shadow-sm"
            >
              <img
                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=320&q=70`}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1080px] px-6 text-center md:px-12">
        <Reveal>
          <Eyebrow className="text-center">The portfolio</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-light tracking-tight text-ink md:text-5xl lg:text-6xl">
            A <em className="italic text-brand-green-500">living library</em> of botanical actives
          </h2>
          <p className="mx-auto mt-7 max-w-xl font-body text-base leading-relaxed text-mute-500 md:text-lg">
            Standardized extracts and functional ingredients, each backed by full identity, potency
            and stability documentation.
          </p>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-14 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {ingredients.map((ingredient) => (
            <a
              key={ingredient.name}
              href={`mailto:${company.email}`}
              className="group inline-flex items-center gap-2.5 rounded-full border border-brand-green-200 bg-brand-green-50 px-6 py-3 font-body text-sm font-medium text-brand-green-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green-400 hover:bg-brand-green-100 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-500 min-h-11"
            >
              <Leaf
                className="h-3.5 w-3.5 text-brand-green-500 transition-transform duration-300 group-hover:rotate-12"
                aria-hidden
              />
              {ingredient.name}
            </a>
          ))}
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          <a
            href={`mailto:${company.email}`}
            className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-green-600 transition-colors duration-300 hover:text-brand-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-500 rounded-sm"
          >
            Request a Specification
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Quality / Certification Strip ─────────────────────────── */

function QualitySection() {
  return (
    <section id="quality" className="scroll-mt-28 py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16">
        <Reveal>
          <div className="rounded-3xl border border-line bg-brand-green-50/40 px-8 py-10 md:px-14 md:py-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-600">
                  <Award className="h-5 w-5" aria-hidden />
                </span>
                <p className="font-tech text-[10px] uppercase tracking-[0.3em] text-mute-400 md:text-[11px]">
                  Certified quality systems
                </p>
              </div>

              <ul className="flex flex-wrap items-center gap-x-6 gap-y-4 md:gap-x-10">
                {certificationDetails.map((cert) => (
                  <li key={cert.name} className="flex flex-col items-center gap-0.5">
                    <span className="font-tech text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:text-brand-green-600">
                      {cert.name}
                    </span>
                    <span className="font-body text-[10px] text-mute-400">{cert.sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Global Presence Strip ──────────────────────────────────── */

function GlobalSection() {
  return (
    <section aria-label="Global presence" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16">
        <Reveal className="flex flex-col gap-10 md:flex-row md:items-start md:gap-20">
          <div className="shrink-0 md:w-64">
            <Eyebrow>Global intelligent research</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-ink md:text-4xl">
              Six bases,<br />
              <em className="italic text-brand-blue-700">one standard.</em>
            </h2>
          </div>

          <div className="flex-1">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {regions.map((region, i) => (
                <Reveal key={region.city} delay={i * 0.07}>
                  <li className="flex items-center gap-3 rounded-2xl border border-line px-5 py-4 transition-all duration-300 hover:border-brand-blue-200 hover:bg-brand-blue-50/30">
                    <MapPin className="h-4 w-4 shrink-0 text-brand-blue-400" aria-hidden />
                    <span className="font-body text-sm text-mute-600">
                      {`${region.city}, ${region.country}${region.city === "Nanjing" ? " — HQ" : ""}`}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CTA Section ────────────────────────────────────────────── */

function CtaSection() {
  return (
    <section id="contact" className="scroll-mt-28 py-28 md:py-40">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] border border-brand-green-200 bg-brand-green-50 px-6 py-20 text-center md:px-20 md:py-28">
            {/* Decorative background blobs */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-green-200/50 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-brand-blue-100/40 blur-3xl"
            />

            <div className="relative">
              <Eyebrow className="text-center">Start the conversation</Eyebrow>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-light leading-[1.08] tracking-tight text-ink md:text-6xl">
                Let&rsquo;s formulate{" "}
                <em className="italic text-brand-green-500">what&rsquo;s next.</em>
              </h2>
              <p className="mx-auto mt-7 max-w-xl font-body text-base leading-relaxed text-mute-500 md:text-lg">
                From first sample to full-scale supply — tell us what you&rsquo;re building and our
                technical team will respond within one business day.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-green-500 px-9 py-4 font-body text-sm font-semibold tracking-wide text-paper shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400 min-h-11"
                >
                  Partner with Fenchem
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href="#ingredients"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-blue-300 bg-paper/60 px-9 py-4 font-body text-sm font-semibold tracking-wide text-brand-blue-700 transition-all duration-300 hover:border-brand-blue-500 hover:bg-brand-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue-500 min-h-11"
                >
                  Explore Portfolio
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */

function FooterSection() {
  return (
    <footer className="bg-brand-green-950 text-paper">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-20 md:px-12 md:pt-28 lg:px-16">
        <Reveal>
          <p className="font-tech text-[10px] uppercase tracking-[0.3em] text-brand-green-400/70 md:text-[11px]">
            Rooted in Nature, Refined by Science
          </p>
          <p className="mt-6 font-display text-[clamp(4rem,13vw,10rem)] font-light leading-[0.95] tracking-tight text-paper">
            Fenchem<span className="text-brand-green-400">.</span>
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          <Reveal>
            <p className="max-w-xs font-body text-sm leading-relaxed text-brand-green-200/70">
              A global B2B supplier of botanical and functional ingredients for nutrition, food
              &amp; beverage and personal care — since 1995.
            </p>
            <a
              href={`mailto:${company.email}`}
              className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-green-400 transition-colors duration-300 hover:text-brand-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400 rounded-sm"
            >
              {company.email}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-brand-green-400/50">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-brand-green-200/70 transition-colors duration-300 hover:text-brand-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400 rounded-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="font-body text-sm text-brand-green-200/70 transition-colors duration-300 hover:text-brand-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400 rounded-sm"
                >
                  Partner with Us
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-brand-green-400/50">
              Global bases
            </p>
            <ul className="mt-5 space-y-3">
              {regions.map((region) => (
                <li key={region.city} className="font-body text-sm text-brand-green-200/70">
                  {`${region.city}, ${region.country}${region.city === "Nanjing" ? " — HQ" : ""}`}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-brand-green-800 pt-8 md:flex-row">
          <p className="font-body text-xs text-brand-green-400/50">
            © 2026 Fenchem Biotek Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a
              href="#top"
              className="font-body text-xs text-brand-green-400/50 transition-colors duration-300 hover:text-brand-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400 rounded-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#top"
              className="font-body text-xs text-brand-green-400/50 transition-colors duration-300 hover:text-brand-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400 rounded-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root export ────────────────────────────────────────────── */

export function VariantD() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const reduce = useReducedMotion();
  const blobY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 72]);

  return (
    <LazyMotion features={domAnimation} strict>
      <main
        className="overflow-x-clip bg-paper font-body text-ink antialiased selection:bg-brand-green-100 selection:text-brand-green-800"
        id="top"
      >
        <NavBar />
        <HeroSection heroRef={heroRef} blobY={blobY} />
        <IndustriesSection />
        <ScienceSection />
        <IngredientsSection />
        <QualitySection />
        <GlobalSection />
        <CtaSection />
        <FooterSection />
      </main>
    </LazyMotion>
  );
}
