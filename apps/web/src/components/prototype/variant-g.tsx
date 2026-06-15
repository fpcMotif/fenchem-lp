/*
 * PROTOTYPE — Variant G: "Green-Led Hybrid — Production Candidate"
 * Curates the strongest modules from D/E/F into one coherent page.
 * All font-brand (Noto Sans SC). Clean White canvas, Brand Green dominant,
 * Brand Blue structural, division colours in matrix only.
 *
 * Section order (mirrors variant-b.tsx structure):
 *   Nav → Hero (editorial-scale, stat band inline) → Industries → Ingredient Matrix → Deep-Green Finale → Footer
 */
import { useRef } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  FlaskConical,
  Globe,
  Leaf,
  Sprout,
  CheckCircle2,
} from "lucide-react";

/* ─────────────────────────────── Constants ─────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const IMG = {
  hero: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80",
  heroThumb: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  lab: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=80",
  glassware: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=900&q=80",
  leafMacro: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
  paleLeaves: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
  capsules: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80",
  skincare: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
  foodBowl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
  herbalTea: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=900&q=80",
} as const;

const NAV_LINKS = [
  { label: "Industries", href: "#industries" },
  { label: "Portfolio", href: "#matrix" },
  { label: "Standards", href: "#standards" },
  { label: "Contact", href: "#contact" },
] as const;

const STATS = [
  { value: "25+", unit: "Years", desc: "Botanical expertise since 1995" },
  { value: "6", unit: "Global Bases", desc: "R&D hubs across three continents" },
  { value: "ISO/GMP", unit: "Certified", desc: "Audited quality on every lot" },
  { value: "40+", unit: "Countries", desc: "Regulated markets supplied" },
] as const;

const TICKER = [
  "Ashwagandha KSM-66",
  "Lutein",
  "Astaxanthin",
  "Coenzyme Q10",
  "Phytosterols",
  "Curcumin",
  "Hyaluronic Acid",
  "Beta-Carotene",
] as const;

type Industry = {
  index: string;
  title: string;
  copy: string;
  img: string;
  alt: string;
};

const INDUSTRIES: Industry[] = [
  {
    index: "01",
    title: "Nutrition & Supplements",
    copy: "Bioavailable actives standardized for potency, stability and dose accuracy — from Ashwagandha KSM-66 to Coenzyme Q10.",
    img: IMG.capsules,
    alt: "Botanical supplement capsules arranged on a neutral surface in clinical lighting",
  },
  {
    index: "02",
    title: "Food & Beverage",
    copy: "Heat- and pH-stable carotenoids, plant proteins and functional botanicals for clean-label fortification at scale.",
    img: IMG.foodBowl,
    alt: "Fresh, vibrant food bowl with greens and grains in soft natural daylight",
  },
  {
    index: "03",
    title: "Personal Care & Cosmeceuticals",
    copy: "Dermatologically active botanicals and hyaluronic acid systems formulated for cellular compatibility and sensory performance.",
    img: IMG.skincare,
    alt: "Minimal cosmetic serum bottle in clean studio lighting",
  },
];

type MatrixItem = {
  index: string;
  code: string;
  name: string;
  latin: string;
  purity: string;
  form: string;
  division: string;
  divisionClass: string;
  divisionBg: string;
  img: string;
  alt: string;
};

const MATRIX: MatrixItem[] = [
  {
    index: "01",
    code: "FN-014",
    name: "Ashwagandha KSM-66",
    latin: "Withania somnifera",
    purity: "≥ 5% withanolides",
    form: "Root extract · Powder",
    division: "Nutrition",
    divisionClass: "text-ink bg-nutrition/30 border-nutrition",
    divisionBg: "bg-nutrition/10",
    img: IMG.herbalTea,
    alt: "Dried botanical herbs and roots arranged for extraction processing",
  },
  {
    index: "02",
    code: "FN-027",
    name: "Lutein",
    latin: "Tagetes erecta",
    purity: "5% – 80% gradient",
    form: "Beadlet · Oil suspension",
    division: "Nutrition",
    divisionClass: "text-ink bg-nutrition/30 border-nutrition",
    divisionBg: "bg-nutrition/10",
    img: IMG.paleLeaves,
    alt: "Pale botanical leaves photographed in soft, diffused laboratory light",
  },
  {
    index: "03",
    code: "FN-033",
    name: "Astaxanthin",
    latin: "Haematococcus pluvialis",
    purity: "2.5% – 10% oleoresin",
    form: "Beadlet · Softgel-ready",
    division: "Food & Bev",
    divisionClass: "text-paper bg-food border-food",
    divisionBg: "bg-food/10",
    img: IMG.leafMacro,
    alt: "Close-up macro photograph of a leaf surface with dew droplets in golden light",
  },
  {
    index: "04",
    code: "FN-041",
    name: "Coenzyme Q10",
    latin: "Fermentation grade",
    purity: "≥ 98% ubiquinone",
    form: "Powder · Water-dispersible",
    division: "Nutrition",
    divisionClass: "text-ink bg-nutrition/30 border-nutrition",
    divisionBg: "bg-nutrition/10",
    img: IMG.capsules,
    alt: "Supplement capsules arranged in a precise grid on a clinical white surface",
  },
  {
    index: "05",
    code: "FN-052",
    name: "Curcumin",
    latin: "Curcuma longa",
    purity: "≥ 95% curcuminoids",
    form: "Granular · Micronized",
    division: "Food & Bev",
    divisionClass: "text-paper bg-food border-food",
    divisionBg: "bg-food/10",
    img: IMG.glassware,
    alt: "Laboratory glassware showing botanical extraction process",
  },
  {
    index: "06",
    code: "FN-068",
    name: "Hyaluronic Acid",
    latin: "Bio-fermented · Na-HA",
    purity: "Cosmetic & food grade",
    form: "Sodium hyaluronate",
    division: "Cosmetics",
    divisionClass: "text-paper bg-cosmetics border-cosmetics",
    divisionBg: "bg-cosmetics/10",
    img: IMG.skincare,
    alt: "Minimal skincare product bottle in warm natural light on clean surface",
  },
];

const PILLARS = [
  {
    icon: Sprout,
    title: "Traceable Sourcing",
    copy: "Every botanical lot is geo-tagged at origin and tracked through extraction, refinement and release — an unbroken record from field to finished certificate of analysis.",
  },
  {
    icon: FlaskConical,
    title: "Clinical-Grade R&D",
    copy: "In-house laboratories run identity, potency and stability programs on every compound — chromatographic and microbiological panels executed on each production batch.",
  },
  {
    icon: Globe,
    title: "Global Compliance",
    copy: "Documentation engineered for your regulatory map — ISO, GMP, HACCP, Halal and Kosher dossiers prepared and maintained for more than forty markets.",
  },
] as const;

const FOOTER_COLS = [
  {
    head: "Portfolio",
    links: [
      { label: "Ingredient Matrix", href: "#matrix" },
      { label: "Nutrition Actives", href: "#matrix" },
      { label: "Food & Beverage", href: "#matrix" },
      { label: "Cosmeceuticals", href: "#matrix" },
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

/* ─────────────────────────────── Primitives ─────────────────────────────── */

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0.01 : 0.8, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────── Nav ─────────────────────────────── */

function NavBar() {
  const { scrollYProgress } = useScroll();

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-md border-b border-line">
      <div className="mx-auto max-w-[1480px]">
        {/* Micro-strip */}
        <div className="hidden md:flex items-center justify-between border-b border-line px-6 py-1.5">
          <span className="flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.28em] text-mute-500">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green-500/50 motion-reduce:animate-none" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-green-500" />
            </span>
            Global Intelligent Research — Botanical Intelligence Since 1995
          </span>
          <span className="font-tech text-[10px] uppercase tracking-[0.28em] text-mute-400">
            ISO 9001 · GMP · HACCP
          </span>
          <span className="font-tech text-[10px] uppercase tracking-[0.28em] text-mute-400">
            N 32.06 / E 118.79 — Nanjing HQ
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
            <span className="font-brand text-xl font-bold tracking-[-0.04em] text-brand-green-600">
              FENCHEM
            </span>
            <Leaf
              aria-hidden
              className="size-4 text-brand-green-500 self-center"
              strokeWidth={1.5}
            />
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-brand text-sm text-mute-600 transition-colors duration-300 hover:text-brand-green-600 focus-visible:outline-2"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-sm bg-brand-green-500 px-5 py-2.5 font-brand text-sm font-semibold text-paper transition-all duration-300 hover:bg-brand-green-600 focus-visible:outline-2 min-h-11"
          >
            Request a Specification
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </nav>
      </div>
      {/* Progress hairline */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-green-500"
        style={{ scaleX: scrollYProgress }}
      />
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
        <div className="grid lg:grid-cols-12 min-h-[80vh]">

          {/* Left: Headline block */}
          <div className="flex flex-col justify-center px-5 py-16 md:px-10 md:py-24 lg:col-span-7 lg:py-32">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-green-50 border border-brand-green-200 px-4 py-1.5 font-tech text-[11px] uppercase tracking-[0.32em] text-brand-blue-700">
                Botanical Intelligence Since 1995
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-8 font-brand text-[clamp(2.6rem,6vw,5.5rem)] font-bold leading-[1.0] tracking-[-0.04em] text-ink">
                Nurturing Vitality
                <br />
                <span className="text-brand-green-500">through Botanical</span>
                <br />
                <span className="text-brand-green-500">Excellence</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-7 max-w-lg font-brand text-base leading-relaxed text-mute-600 md:text-lg">
                Fenchem converts raw botanical complexity into precisely specified, clinically
                validated actives — supplied at industrial scale to formulators in more than forty
                countries.
              </p>
            </Reveal>
            <Reveal delay={0.26} className="mt-9 flex flex-wrap gap-3">
              <a
                href="#matrix"
                className="group inline-flex items-center gap-2.5 rounded-sm bg-brand-green-500 px-7 py-4 font-brand text-sm font-semibold text-paper transition-all duration-300 hover:bg-brand-green-600 focus-visible:outline-2 min-h-11"
              >
                Explore Portfolio
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 rounded-sm border border-brand-blue-700 px-7 py-4 font-brand text-sm font-semibold text-brand-blue-700 transition-all duration-300 hover:bg-brand-blue-50 focus-visible:outline-2 min-h-11"
              >
                Partner with Fenchem
              </a>
            </Reveal>

            {/* Stat band */}
            <Reveal delay={0.34}>
              <dl className="mt-14 grid grid-cols-2 gap-px border border-line rounded-sm overflow-hidden bg-line sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.value} className="bg-paper px-4 py-5">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.24em] text-mute-400">
                      {s.unit}
                    </dt>
                    <dd className="mt-1.5 font-brand text-2xl font-bold tracking-[-0.03em] text-brand-green-600 md:text-3xl">
                      {s.value}
                    </dd>
                    <p className="mt-1 font-brand text-xs text-mute-500">{s.desc}</p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: botanical image */}
          <div className="relative overflow-hidden border-t border-line lg:col-span-5 lg:border-l lg:border-t-0">
            <div ref={imgRef} className="absolute inset-0">
              <motion.img
                src={IMG.hero}
                alt="Lush green botanical leaves in morning light — representing Fenchem's natural ingredient sourcing"
                className="h-[116%] w-full object-cover"
                style={{ y: reduce ? 0 : imgY }}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/30 via-transparent to-transparent" />
            </div>
            {/* Caption badge */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between rounded-sm border border-paper/20 bg-paper/90 px-4 py-2.5 backdrop-blur-sm">
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-mute-600">
                  Rooted in Nature, Refined by Science
                </span>
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-brand-green-600">
                  Since 1995
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
  return (
    <section
      aria-label="Ingredient index ticker"
      className="overflow-hidden border-b border-line bg-brand-green-50 py-3.5"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {([0, 1] as const).map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {TICKER.map((name, i) => (
              <li key={name} className="flex items-center gap-8 pr-8">
                <span className="whitespace-nowrap font-tech text-[11px] uppercase tracking-[0.3em] text-brand-green-700">
                  <span className="text-brand-blue-700">{String(i + 1).padStart(2, "0")}</span>
                  {" — "}
                  {name}
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

/* ─────────────────────────────── Industries ─────────────────────────────── */

function IndustriesSection() {
  return (
    <section id="industries" aria-labelledby="industries-heading" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-[1480px]">
        {/* Section header */}
        <div className="flex flex-col gap-6 border-b border-line px-5 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
          <Reveal>
            <p className="font-tech text-[11px] uppercase tracking-[0.32em] text-brand-blue-700">
              01 — Application Domains
            </p>
            <h2
              id="industries-heading"
              className="mt-4 font-brand text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink md:text-5xl"
            >
              Built for three{" "}
              <span className="text-brand-green-500">industries</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs font-brand text-sm leading-relaxed text-mute-500">
              Clinically supported actives engineered for the precise demands of each formulation discipline.
            </p>
          </Reveal>
        </div>

        {/* Industry rows */}
        <div>
          {INDUSTRIES.map((ind, i) => (
            <a
              key={ind.index}
              href="#contact"
              className="group block border-b border-line last:border-b-0 transition-colors duration-400 hover:bg-brand-green-50 focus-visible:outline-2"
            >
              <Reveal
                delay={i * 0.07}
                className="grid items-center gap-4 px-5 py-10 md:grid-cols-12 md:gap-6 md:px-10 md:py-12"
              >
                {/* Index */}
                <div className="md:col-span-1">
                  <span className="font-tech text-sm tracking-[0.22em] text-brand-green-500">
                    {ind.index}
                  </span>
                </div>
                {/* Title */}
                <h3 className="font-brand text-2xl font-bold tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-brand-green-600 md:col-span-4 md:text-3xl">
                  {ind.title}
                </h3>
                {/* Copy */}
                <p className="font-brand text-sm leading-relaxed text-mute-600 md:col-span-5">
                  {ind.copy}
                </p>
                {/* Image thumbnail */}
                <div className="relative aspect-video overflow-hidden rounded-sm md:col-span-1 md:aspect-square">
                  <img
                    src={ind.img}
                    alt={ind.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                </div>
                {/* Arrow */}
                <div className="flex justify-end md:col-span-1">
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 text-mute-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-green-500"
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

function MatrixSection() {
  return (
    <section id="matrix" aria-labelledby="matrix-heading" className="border-b border-line bg-mute-50">
      <div className="mx-auto max-w-[1480px]">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-line px-5 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
          <Reveal>
            <p className="font-tech text-[11px] uppercase tracking-[0.32em] text-brand-blue-700">
              02 — Active Compounds
            </p>
            <h2
              id="matrix-heading"
              className="mt-4 font-brand text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink md:text-5xl"
            >
              Ingredient{" "}
              <span className="text-brand-green-500">matrix</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-sm border border-brand-blue-700 px-5 py-3 font-brand text-sm font-semibold text-brand-blue-700 transition-all duration-300 hover:bg-brand-blue-50 focus-visible:outline-2 min-h-11"
            >
              Request Full Specifications
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        {/* Matrix grid */}
        <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {MATRIX.map((item, i) => (
            <Reveal key={item.code} delay={(i % 3) * 0.08} className="group bg-paper">
              <article>
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  {/* Division badge */}
                  <span
                    className={`absolute right-3 top-3 rounded-sm border px-2 py-1 font-tech text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm ${item.divisionClass}`}
                  >
                    {item.division}
                  </span>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand-green-950/0 transition-colors duration-500 group-hover:bg-brand-green-950/10" />
                </div>
                {/* Content */}
                <div className="px-5 py-7 md:px-7 md:py-8">
                  <div className="flex items-baseline justify-between">
                    <span className="font-tech text-[11px] tracking-[0.22em] text-brand-green-600">
                      {item.index} —
                    </span>
                    <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-mute-400">
                      {item.code}
                    </span>
                  </div>
                  <h3 className="mt-3 font-brand text-xl font-bold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-brand-green-600">
                    {item.name}
                  </h3>
                  <p className="font-tech text-[11px] italic tracking-[0.06em] text-mute-500">
                    {item.latin}
                  </p>
                  <dl className="mt-5 space-y-2.5 border-t border-line pt-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-mute-400">
                        Purity
                      </dt>
                      <dd className="text-right font-tech text-[11px] text-mute-700">
                        {item.purity}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-mute-400">
                        Form
                      </dt>
                      <dd className="text-right font-tech text-[11px] text-mute-700">{item.form}</dd>
                    </div>
                  </dl>
                  <a
                    href="#contact"
                    className="group/spec mt-6 inline-flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.24em] text-brand-blue-700 transition-colors duration-300 hover:text-brand-green-600 focus-visible:outline-2 min-h-11"
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

/* ─────────────────────────────── Science / Standards ─────────────────────────────── */

function StandardsSection() {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section id="standards" aria-labelledby="standards-heading" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-[1480px]">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-line px-5 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
          <Reveal>
            <p className="font-tech text-[11px] uppercase tracking-[0.32em] text-brand-blue-700">
              03 — Quality Infrastructure
            </p>
            <h2
              id="standards-heading"
              className="mt-4 font-brand text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink md:text-5xl"
            >
              Science-backed{" "}
              <span className="text-brand-green-500">standards</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs font-brand text-sm leading-relaxed text-mute-500">
              Every lot. Every market. Every release — documented to your regulatory map.
            </p>
          </Reveal>
        </div>

        {/* Layout: lab image + pillars */}
        <div className="grid lg:grid-cols-12">
          {/* Image */}
          <div className="relative overflow-hidden border-b border-line lg:col-span-5 lg:border-b-0 lg:border-r">
            <div ref={imgRef} className="relative min-h-72 lg:min-h-full">
              <motion.img
                src={IMG.lab}
                alt="Fenchem analyst at a microscope inside the quality control laboratory in Nanjing"
                className="h-[480px] w-full object-cover lg:absolute lg:inset-0 lg:h-full"
                style={{ y: reduce ? 0 : imgY }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/20 via-transparent to-transparent" />
              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-sm border border-paper/20 bg-paper/90 px-4 py-2.5 backdrop-blur-sm">
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-mute-600">
                  QC Laboratory — Nanjing
                </span>
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-brand-green-600">
                  HPLC · GC · Micro
                </span>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="lg:col-span-7">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal
                  key={p.title}
                  delay={i * 0.09}
                  className={
                    i < PILLARS.length - 1 ? "border-b border-line" : ""
                  }
                >
                  <div className="flex gap-5 px-5 py-10 transition-colors duration-400 hover:bg-brand-green-50 md:gap-8 md:px-10 md:py-12">
                    <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-sm bg-brand-green-100 text-brand-green-600 md:size-12">
                      <Icon aria-hidden className="size-5 md:size-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-brand text-xl font-bold tracking-[-0.02em] text-ink md:text-2xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 font-brand text-sm leading-relaxed text-mute-600 md:text-base">
                        {p.copy}
                      </p>
                      <div className="mt-4 flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.22em] text-brand-green-600">
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
      className="relative overflow-hidden bg-brand-green-950"
    >
      {/* Parallax botanical background */}
      <motion.div
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
      </motion.div>
      {/* Gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-green-950/90 via-brand-green-950/70 to-brand-green-900/90"
      />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="px-5 py-24 md:px-10 md:py-36">
          <Reveal>
            <p className="font-tech text-[11px] uppercase tracking-[0.32em] text-brand-green-400">
              04 — Partner with Fenchem
            </p>
            <h2
              id="contact-heading"
              className="mt-6 max-w-4xl font-brand text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-paper md:text-6xl"
            >
              Your next formulation,
              <br />
              <span className="text-brand-green-400">engineered to specification</span>
            </h2>
            <p className="mt-7 max-w-xl font-brand text-base leading-relaxed text-brand-green-100/70 md:text-lg">
              Submit a target spec — purity, form, matrix, regulatory map — and our laboratory returns
              a validated proposal with full documentation within one business day.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:sales@fenchem.com"
              className="group inline-flex items-center gap-3 rounded-sm bg-brand-green-500 px-8 py-4 font-brand text-sm font-bold text-paper shadow-[0_0_40px_oklch(0.66_0.163_134.7_/_0.3)] transition-all duration-300 hover:bg-brand-green-400 hover:shadow-[0_0_64px_oklch(0.66_0.163_134.7_/_0.5)] focus-visible:outline-2 min-h-11"
            >
              Partner with Fenchem
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#matrix"
              className="inline-flex items-center gap-3 rounded-sm border border-brand-green-500/40 px-8 py-4 font-brand text-sm font-semibold text-brand-green-200 transition-all duration-300 hover:border-brand-green-400 hover:bg-brand-green-900/40 hover:text-paper focus-visible:outline-2 min-h-11"
            >
              Explore Portfolio
            </a>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-10 font-tech text-[10px] uppercase tracking-[0.28em] text-brand-green-500/50">
              Response Time &lt; 24h — Technical Dossiers on Request
            </p>
          </Reveal>

          {/* Office nodes */}
          <div className="mt-20 border-t border-brand-green-800 pt-14">
            <Reveal>
              <p className="font-tech text-[10px] uppercase tracking-[0.3em] text-brand-green-500/60">
                6 Global Bases — 40+ Countries Served
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-px bg-brand-green-800 sm:grid-cols-3 lg:grid-cols-6">
              {(
                [
                  { city: "Nanjing", role: "HQ · R&D", coords: "N 32° E 118°" },
                  { city: "California", role: "Americas", coords: "N 34° W 117°" },
                  { city: "Frankfurt", role: "Europe", coords: "N 50° E 8°" },
                  { city: "Tokyo", role: "Japan", coords: "N 35° E 139°" },
                  { city: "Bangkok", role: "SE Asia", coords: "N 13° E 100°" },
                  { city: "Johannesburg", role: "Africa", coords: "S 26° E 28°" },
                ] as const
              ).map((node, i) => (
                <Reveal key={node.city} delay={i * 0.06} className="bg-brand-green-950/80">
                  <div className="px-4 py-6 transition-colors duration-300 hover:bg-brand-green-900/60">
                    <p className="font-brand text-sm font-semibold text-paper">{node.city}</p>
                    <p className="mt-0.5 font-brand text-xs text-brand-green-400/70">{node.role}</p>
                    <p className="mt-2 font-tech text-[9px] tracking-[0.16em] text-brand-green-600/60">
                      {node.coords}
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
    <footer className="bg-paper border-t border-line">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-12 px-5 py-14 md:grid-cols-12 md:px-10 md:py-16">
          {/* Brand block */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="font-brand text-2xl font-bold tracking-[-0.04em] text-brand-green-600">
                FENCHEM
              </span>
              <Leaf aria-hidden className="size-5 text-brand-green-500" strokeWidth={1.5} />
            </div>
            <p className="mt-3 font-brand text-base font-medium text-brand-green-600">
              Rooted in Nature, Refined by Science.
            </p>
            <p className="mt-5 font-tech text-[10px] uppercase leading-loose tracking-[0.22em] text-mute-400">
              ISO 9001 : 2015 · GMP · HACCP
              <br />
              Est. 1995 — Nanjing, China
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(["ISO 9001", "GMP", "HACCP", "Kosher", "Halal"] as const).map((cert) => (
                <span
                  key={cert}
                  className="rounded-sm border border-brand-blue-200 bg-brand-blue-50 px-2.5 py-1 font-tech text-[9px] uppercase tracking-[0.18em] text-brand-blue-700"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.head} className="md:col-span-2">
              <p className="font-tech text-[10px] uppercase tracking-[0.3em] text-mute-400">
                {col.head}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-brand text-sm text-mute-600 underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-brand-green-600 hover:decoration-brand-green-400 focus-visible:outline-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark watermark */}
        <p
          aria-hidden
          className="select-none overflow-hidden whitespace-nowrap px-5 font-brand text-[17vw] font-black leading-[0.78] tracking-[-0.06em] text-brand-green-500/5 md:px-10 min-[1481px]:text-[15rem]"
        >
          FENCHEM
        </p>

        {/* Legal strip */}
        <div className="flex flex-col gap-2 border-t border-line px-5 py-4 font-tech text-[10px] uppercase tracking-[0.22em] text-mute-400 md:flex-row md:items-center md:justify-between md:px-10">
          <span>© 2026 Fenchem Biochemical Group — All Rights Reserved</span>
          <span>N 32.06 / E 118.79 — Nanjing, China</span>
          <span className="text-brand-green-500/60">Botanical Intelligence Since 1995</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── Root export ─────────────────────────────── */

export function VariantG() {
  return (
    <div className="bg-paper font-brand text-ink antialiased selection:bg-brand-green-200 selection:text-brand-green-900">
      <NavBar />
      <main>
        <HeroSection />
        <TickerSection />
        <IndustriesSection />
        <MatrixSection />
        <StandardsSection />
        <FinaleSection />
      </main>
      <FooterSection />
    </div>
  );
}
