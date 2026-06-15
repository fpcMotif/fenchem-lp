/*
 * PROTOTYPE — Variant B: "Innovation Lab"
 * Clinical white spec-sheet. Hairline border-pebble grid, JetBrains Mono
 * micro-labels, grayscale ingredient matrix, marquee ticker.
 * Base layout mined from reference/innovation_home.html.
 */
import { useRef } from "react";
import type { ReactNode } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const IMG = {
  glassware:
    "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?auto=format&fit=crop&w=1000&q=80",
  microscope:
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=80",
  botanicals:
    "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=900&q=80",
  paleLeaves:
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
  leafMacro:
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
  capsules:
    "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80",
  herbalCapsules:
    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80",
  skincare:
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
} as const;

const NAV_LINKS = [
  { label: "Matrix", href: "#matrix" },
  { label: "Protocol", href: "#protocol" },
  { label: "Domains", href: "#domains" },
  { label: "Network", href: "#network" },
] as const;

const HERO_META = [
  { k: "SPEC.REF", v: "FN-LP / 2026-B" },
  { k: "ORIGIN", v: "N 32.06 / E 118.79" },
  { k: "ESTABLISHED", v: "1995 — NANJING" },
  { k: "CERT", v: "ISO 9001 / GMP" },
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

const STATS = [
  {
    label: "[SYS.UPTIME]",
    value: "25+",
    unit: "years",
    desc: "Continuous ingredient engineering and refinement since 1995.",
  },
  {
    label: "[NODES]",
    value: "06",
    unit: "global bases",
    desc: "R&D and manufacturing distributed across three continents.",
  },
  {
    label: "[CERT.INDEX]",
    value: "ISO",
    unit: "/ GMP",
    desc: "Audited quality compliance across every production vector.",
  },
  {
    label: "[REACH]",
    value: "40+",
    unit: "countries",
    desc: "Formulation partners supplied across regulated markets.",
  },
] as const;

const MATRIX = [
  {
    index: "01",
    code: "BTN-014",
    cat: "ADAPTOGEN",
    name: "Ashwagandha KSM-66",
    purity: "≥ 5% withanolides",
    form: "Root extract — powder",
    application: "Nutrition & Supplements",
    img: IMG.botanicals,
    alt: "Dried botanical roots and herbs arranged for extraction",
  },
  {
    index: "02",
    code: "BTN-027",
    cat: "CAROTENOID",
    name: "Lutein",
    purity: "5% – 80% gradient",
    form: "Beadlet / oil suspension",
    application: "Ocular health systems",
    img: IMG.paleLeaves,
    alt: "Pale botanical leaves photographed in soft laboratory light",
  },
  {
    index: "03",
    code: "BTN-033",
    cat: "ANTIOXIDANT",
    name: "Astaxanthin",
    purity: "2.5% – 10% oleoresin",
    form: "Beadlet / softgel-ready",
    application: "Sports & recovery",
    img: IMG.leafMacro,
    alt: "Macro photograph of a leaf surface with dew droplets",
  },
  {
    index: "04",
    code: "BTN-041",
    cat: "BIOENERGETIC",
    name: "Coenzyme Q10",
    purity: "≥ 98% ubiquinone",
    form: "Powder / water-dispersible",
    application: "Cardiovascular health",
    img: IMG.capsules,
    alt: "Supplement capsules arranged in a precise grid",
  },
  {
    index: "05",
    code: "BTN-052",
    cat: "POLYPHENOL",
    name: "Curcumin",
    purity: "≥ 95% curcuminoids",
    form: "Granular / micronized",
    application: "Food & Beverage",
    img: IMG.herbalCapsules,
    alt: "Assorted supplement capsules and tablets in a loose pile",
  },
  {
    index: "06",
    code: "BTN-068",
    cat: "HUMECTANT",
    name: "Hyaluronic Acid",
    purity: "Cosmetic & food grade",
    form: "Sodium hyaluronate",
    application: "Personal Care",
    img: IMG.skincare,
    alt: "Minimal cosmetic serum bottle in clinical lighting",
  },
] as const;

const PROTOCOL = [
  {
    step: "01",
    title: "Traceable Sourcing",
    tag: "CHAIN.OF.CUSTODY",
    desc: "Every botanical lot is geo-tagged at origin and tracked through extraction, refinement and release — an unbroken record from field coordinate to finished certificate of analysis.",
  },
  {
    step: "02",
    title: "Clinical-Grade R&D",
    tag: "HPLC // GC // MICRO",
    desc: "In-house laboratories run identity, potency and stability programs on every compound — chromatographic and microbiological panels executed on each production batch.",
  },
  {
    step: "03",
    title: "Global Compliance",
    tag: "ISO.9001 / GMP / HACCP",
    desc: "Documentation engineered for your regulatory map — ISO, GMP, HACCP, Halal and Kosher dossiers prepared and maintained for more than forty markets.",
  },
] as const;

const DOMAINS = [
  {
    code: "A-01",
    cat: "CAT: NUTRI",
    title: "Nutrition & Supplements",
    desc: "Bioavailable actives engineered for capsules, tablets, softgels and powder delivery systems.",
  },
  {
    code: "B-02",
    cat: "CAT: F&B",
    title: "Food & Beverage",
    desc: "Heat- and pH-stable functional ingredients for fortification, natural color and clean-label claims.",
  },
  {
    code: "C-03",
    cat: "CAT: CARE",
    title: "Personal Care & Cosmeceuticals",
    desc: "Dermatologically active agents formulated for cellular compatibility and sensory performance.",
  },
] as const;

const NODES = [
  {
    id: "NODE 01",
    city: "Nanjing",
    role: "HQ — R&D / manufacturing",
    coords: "N 32.06 / E 118.79",
  },
  {
    id: "NODE 02",
    city: "California",
    role: "Americas distribution",
    coords: "N 34.05 / W 117.75",
  },
  { id: "NODE 03", city: "Frankfurt", role: "European compliance hub", coords: "N 50.11 / E 8.68" },
  { id: "NODE 04", city: "Tokyo", role: "Japan technical office", coords: "N 35.68 / E 139.69" },
  {
    id: "NODE 05",
    city: "Bangkok",
    role: "Southeast Asia logistics",
    coords: "N 13.75 / E 100.50",
  },
  {
    id: "NODE 06",
    city: "Johannesburg",
    role: "Africa market gateway",
    coords: "S 26.20 / E 28.05",
  },
] as const;

const FOOTER_COLS = [
  {
    head: "INDEX",
    links: [
      { label: "Ingredient Matrix", href: "#matrix" },
      { label: "Operating Protocol", href: "#protocol" },
      { label: "Application Domains", href: "#domains" },
      { label: "Global Network", href: "#network" },
    ],
  },
  {
    head: "COMPLIANCE",
    links: [
      { label: "Quality Charter", href: "#protocol" },
      { label: "Regulatory Dossiers", href: "#contact" },
      { label: "Sourcing Standards", href: "#protocol" },
      { label: "Ingredient Transparency", href: "#matrix" },
    ],
  },
  {
    head: "CHANNEL",
    links: [
      { label: "Request a Specification", href: "#contact" },
      { label: "Partner Inquiries", href: "#contact" },
      { label: "Technical Dossiers", href: "#contact" },
      { label: "Global Offices", href: "#network" },
    ],
  },
] as const;

/* Shared scroll-reveal wrapper */
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
    <m.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/* Section header: mono code / big sans title with one serif italic word */
function SectionHead({
  code,
  title,
  italic,
  right,
}: {
  code: string;
  title: string;
  italic: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 border-b border-pebble px-5 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
      <Reveal>
        <p className="font-tech text-[11px] uppercase tracking-[0.28em] text-moss">{code}</p>
        <h2 className="mt-5 font-body text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-bark md:text-5xl">
          {title}{" "}
          <span className="font-display font-light italic tracking-[-0.01em] text-moss">
            {italic}
          </span>
        </h2>
      </Reveal>
      {right ? <Reveal delay={0.15}>{right}</Reveal> : null}
    </div>
  );
}

/* Protocol figure with gentle scroll parallax */
function ProtocolFigure() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <div ref={ref} className="group relative overflow-hidden border border-pebble">
      <m.img
        src={IMG.microscope}
        alt="Analyst working at a microscope inside the Fenchem laboratory"
        className="h-[380px] w-full object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0 md:h-[480px]"
        style={{ y: reduce ? "0%" : y, scale: 1.16 }}
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-pebble bg-white/90 px-4 py-2.5 backdrop-blur-sm">
        <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-bark/60">
          FIG. 02 — ANALYTICAL LAB, NANJING
        </span>
        <span className="font-tech text-[10px] tracking-[0.22em] text-moss">HPLC-7</span>
      </div>
    </div>
  );
}

/* ===== Hero section ===== */
function HeroSection() {
  return (
    <section className="relative border-b border-pebble">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.288_0.04_160.598_/_0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.288_0.04_160.598_/_0.035)_1px,transparent_1px)] bg-[size:56px_56px]"
      />
      <Plus aria-hidden strokeWidth={1} className="absolute left-4 top-4 size-4 text-bark/20" />
      <Plus
        aria-hidden
        strokeWidth={1}
        className="absolute bottom-4 right-4 hidden size-4 text-bark/20 lg:block"
      />
      <div className="relative grid lg:grid-cols-12">
        {/* Left: headline block */}
        <div className="px-5 py-16 md:px-10 md:py-24 lg:col-span-8 lg:py-28">
          <Reveal>
            <span className="inline-flex w-fit items-center gap-2.5 border border-pebble bg-white px-3.5 py-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss/50 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-moss" />
              </span>
              <span className="font-tech text-[10px] uppercase tracking-[0.3em] text-bark/60">
                System Active — Botanical Intelligence Since 1995
              </span>
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-10 font-body text-[clamp(2.7rem,6.4vw,6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-bark">
              Engineering high-performance botanical ingredients
              <span className="mt-2 block font-display font-light italic leading-[1.05] tracking-[-0.01em] text-moss">
                for a synthesized world.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-bark/60 md:text-lg">
              Fenchem converts raw botanical complexity into precisely specified, clinically
              validated actives — supplied at industrial scale to formulators in more than forty
              countries.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3 md:gap-4">
            <a
              href="#matrix"
              className="group inline-flex items-center gap-3 bg-forest px-7 py-4 font-tech text-[11px] uppercase tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-fern"
            >
              Explore Portfolio
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-bark/20 px-7 py-4 font-tech text-[11px] uppercase tracking-[0.22em] text-bark/70 transition-colors duration-300 hover:border-forest hover:bg-mint/20 hover:text-forest"
            >
              Request a Specification
            </a>
          </Reveal>
        </div>
        {/* Right: mono metadata rail */}
        <aside className="flex flex-col border-t border-pebble lg:col-span-4 lg:border-l lg:border-t-0">
          <Reveal delay={0.25} className="flex h-full flex-col">
            <dl className="divide-y divide-pebble border-b border-pebble">
              {HERO_META.map((row) => (
                <div key={row.k} className="flex items-baseline justify-between px-5 py-4 md:px-8">
                  <dt className="font-tech text-[10px] uppercase tracking-[0.22em] text-bark/40">
                    {row.k}
                  </dt>
                  <dd className="font-tech text-[11px] uppercase tracking-[0.18em] text-bark/80">
                    {row.v}
                  </dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between px-5 py-4 md:px-8">
                <dt className="font-tech text-[10px] uppercase tracking-[0.22em] text-bark/40">
                  STATUS
                </dt>
                <dd className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.18em] text-moss">
                  <span className="size-1.5 rounded-full bg-moss" />
                  OPERATIONAL
                </dd>
              </div>
            </dl>
            <div className="group relative min-h-64 flex-1 overflow-hidden lg:min-h-72">
              <img
                src={IMG.glassware}
                alt="Laboratory glassware during botanical extraction work"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-pebble bg-white/90 px-4 py-2.5 backdrop-blur-sm">
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-bark/60">
                  FIG. 01 — EXTRACTION LAB
                </span>
                <span className="font-tech text-[10px] tracking-[0.22em] text-moss">
                  BATCH 2026.06
                </span>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}

/* ===== Ingredient ticker ===== */
function TickerSection() {
  return (
    <section
      aria-label="Live ingredient index"
      className="overflow-hidden border-b border-pebble py-4 md:py-5"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {TICKER.map((name, i) => (
              <li key={name} className="flex items-center gap-8 pr-8 md:gap-12 md:pr-12">
                <span className="whitespace-nowrap font-tech text-[11px] uppercase tracking-[0.3em] text-bark/70 md:text-xs">
                  <span className="text-moss">{String(i + 1).padStart(2, "0")}</span>
                  {" — "}
                  {name}
                </span>
                <span aria-hidden className="size-1.5 rotate-45 bg-mint" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

/* ===== Stat band ===== */
function StatBand() {
  return (
    <section
      aria-label="Company metrics"
      className="grid grid-cols-2 gap-px border-b border-pebble bg-pebble lg:grid-cols-4"
    >
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="bg-white">
          <div className="h-full px-5 py-9 transition-colors duration-500 hover:bg-mint/20 md:px-8 md:py-12">
            <p className="font-tech text-[10px] uppercase tracking-[0.28em] text-bark/40">
              {s.label}
            </p>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-2.5">
              <span className="font-body text-4xl font-semibold tracking-[-0.04em] text-forest md:text-6xl">
                {s.value}
              </span>
              <span className="font-display text-lg font-light italic text-moss md:text-2xl">
                {s.unit}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-bark/60">{s.desc}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

/* ===== Ingredient Matrix ===== */
function MatrixSection() {
  return (
    <section id="matrix" className="border-b border-pebble">
      <SectionHead
        code="SYS.CAT_01 // ACTIVE COMPOUNDS"
        title="Ingredient"
        italic="matrix."
        right={
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 border border-pebble px-5 py-3 font-tech text-[10px] uppercase tracking-[0.26em] text-bark/70 transition-colors duration-300 hover:border-forest hover:text-forest"
          >
            View Full Specs
            <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        }
      />
      <div className="grid grid-cols-1 gap-px bg-pebble md:grid-cols-2 lg:grid-cols-3">
        {MATRIX.map((item, i) => (
          <Reveal key={item.code} delay={(i % 3) * 0.08} className="group bg-white">
            <div className="relative aspect-[4/3] overflow-hidden border-b border-pebble">
              <img
                src={item.img}
                alt={item.alt}
                className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                loading="lazy"
              />
              <span className="absolute right-4 top-4 border border-pebble bg-white/90 px-2 py-1 font-tech text-[9px] uppercase tracking-[0.2em] text-bark/70 backdrop-blur-sm">
                {item.cat}
              </span>
            </div>
            <div className="px-5 py-7 md:px-7 md:py-8">
              <div className="flex items-baseline justify-between">
                <span className="font-tech text-[11px] tracking-[0.22em] text-moss">
                  {item.index} —
                </span>
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-bark/40">
                  {item.code}
                </span>
              </div>
              <h3 className="mt-3 font-body text-xl font-semibold tracking-[-0.02em] text-bark transition-colors duration-300 group-hover:text-forest">
                {item.name}
              </h3>
              <dl className="mt-5 space-y-2.5 border-t border-pebble pt-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-bark/40">
                    Purity
                  </dt>
                  <dd className="text-right font-tech text-[11px] text-bark/70">{item.purity}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-bark/40">
                    Form
                  </dt>
                  <dd className="text-right font-tech text-[11px] text-bark/70">{item.form}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-bark/40">
                    Application
                  </dt>
                  <dd className="text-right font-tech text-[11px] text-bark/70">
                    {item.application}
                  </dd>
                </div>
              </dl>
              <a
                href="#contact"
                className="group/spec mt-6 inline-flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.24em] text-bark/60 transition-colors duration-300 hover:text-forest"
              >
                Request Spec
                <ArrowUpRight className="size-3 transition-transform duration-300 group-hover/spec:-translate-y-0.5 group-hover/spec:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ===== Operating Protocol ===== */
function ProtocolSection() {
  return (
    <section id="protocol" className="border-b border-pebble">
      <SectionHead
        code="SYS.METHOD // 02"
        title="Operating"
        italic="protocol."
        right={
          <p className="max-w-xs font-tech text-[10px] uppercase leading-relaxed tracking-[0.2em] text-bark/40">
            Rooted in nature, refined by science — every lot, every market, every release.
          </p>
        }
      />
      <div className="grid lg:grid-cols-12">
        <div className="px-5 py-12 md:px-10 lg:col-span-5 lg:py-16">
          <Reveal>
            <ProtocolFigure />
          </Reveal>
        </div>
        <div className="border-t border-pebble lg:col-span-7 lg:border-l lg:border-t-0">
          {PROTOCOL.map((p, i) => (
            <Reveal
              key={p.step}
              delay={i * 0.08}
              className={i < PROTOCOL.length - 1 ? "border-b border-pebble" : ""}
            >
              <div className="grid gap-4 px-5 py-10 transition-colors duration-500 hover:bg-mint/20 md:grid-cols-12 md:gap-6 md:px-10 md:py-12">
                <span className="font-tech text-sm tracking-[0.22em] text-moss md:col-span-2">
                  {p.step} —
                </span>
                <div className="md:col-span-10">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="font-body text-2xl font-semibold tracking-[-0.02em] text-bark md:text-3xl">
                      {p.title}
                    </h3>
                    <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-bark/40">
                      {p.tag}
                    </span>
                  </div>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-bark/60 md:text-base">
                    {p.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Application Domains ===== */
function DomainsSection() {
  return (
    <section id="domains" className="border-b border-pebble">
      <SectionHead
        code="SYS.CAT_02 // APPLICATION DOMAINS"
        title="Built for three"
        italic="industries."
      />
      <div>
        {DOMAINS.map((d, i) => (
          <a
            key={d.code}
            href="#contact"
            className="group block border-b border-pebble transition-colors duration-500 last:border-b-0 hover:bg-mint/20"
          >
            <Reveal
              delay={i * 0.06}
              className="grid items-center gap-3 px-5 py-9 md:grid-cols-12 md:gap-6 md:px-10 md:py-12"
            >
              <div className="md:col-span-2">
                <p className="font-tech text-[11px] tracking-[0.22em] text-moss">{d.code}</p>
                <p className="mt-1 font-tech text-[10px] uppercase tracking-[0.22em] text-bark/40">
                  {d.cat}
                </p>
              </div>
              <h3 className="font-body text-2xl font-semibold tracking-[-0.03em] text-bark transition-colors duration-300 group-hover:text-forest md:col-span-5 md:text-4xl">
                {d.title}
              </h3>
              <p className="text-sm leading-relaxed text-bark/60 md:col-span-4">{d.desc}</p>
              <div className="flex md:col-span-1 md:justify-end">
                <ArrowUpRight className="size-6 text-bark/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-forest" />
              </div>
            </Reveal>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ===== CTA + Global Network ===== */
function CtaNetworkSection() {
  return (
    <section id="contact" className="bg-forest text-cream">
      <div className="border-b border-cream/10 px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="font-tech text-[11px] uppercase tracking-[0.28em] text-mint/80">
            SYS.CONTACT // OPEN CHANNEL
          </p>
          <h2 className="mt-6 max-w-4xl font-body text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">
            Your next formulation,{" "}
            <span className="font-display font-light italic tracking-[-0.01em] text-mint">
              engineered to specification.
            </span>
          </h2>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-cream/70 md:text-base">
            Submit a target spec — purity, form, matrix, regulatory map — and our laboratory returns
            a validated proposal with full documentation within one business day.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3 md:gap-4">
          <button
            type="button"
            className="group inline-flex items-center gap-3 bg-mint px-7 py-4 font-tech text-[11px] uppercase tracking-[0.22em] text-forest transition-colors duration-300 hover:bg-mist"
          >
            Partner with Fenchem
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <a
            href="#matrix"
            className="inline-flex items-center gap-3 border border-cream/30 px-7 py-4 font-tech text-[11px] uppercase tracking-[0.22em] text-cream/90 transition-colors duration-300 hover:border-cream hover:bg-cream/10 hover:text-cream"
          >
            Explore Portfolio
          </a>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 font-tech text-[10px] uppercase tracking-[0.28em] text-cream/40">
            RESPONSE.TIME &lt; 24H — TECHNICAL DOSSIERS ON REQUEST
          </p>
        </Reveal>
      </div>
      <div id="network">
        <div className="flex items-center justify-between border-b border-cream/10 px-5 py-5 md:px-10">
          <span className="font-tech text-[10px] uppercase tracking-[0.26em] text-mint/70">
            SYS.NET // 6 ACTIVE NODES
          </span>
          <span className="hidden font-tech text-[10px] uppercase tracking-[0.26em] text-cream/40 md:block">
            LAT/LONG VERIFIED — 2026.06
          </span>
        </div>
        <div className="grid grid-cols-1 gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
          {NODES.map((n, i) => (
            <Reveal key={n.id} delay={(i % 3) * 0.08} className="bg-forest">
              <div className="h-full px-5 py-7 transition-colors duration-500 hover:bg-fern md:px-8 md:py-9">
                <div className="flex items-baseline justify-between font-tech text-[10px] uppercase tracking-[0.2em] text-mint/70">
                  <span>{n.id}</span>
                  <span className="text-cream/40">{n.coords}</span>
                </div>
                <p className="mt-4 font-body text-xl font-semibold tracking-[-0.02em] text-cream">
                  {n.city}
                </p>
                <p className="mt-1 text-sm text-cream/60">{n.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function FooterSection() {
  return (
    <footer className="border-t border-pebble bg-white">
      <div className="grid gap-12 px-5 py-14 md:grid-cols-12 md:px-10 md:py-16">
        <div className="md:col-span-5">
          <button
            type="button"
            className="font-body text-2xl font-bold tracking-[-0.04em] text-forest transition-opacity duration-300 hover:opacity-70"
          >
            FENCHEM
          </button>
          <p className="mt-4 max-w-xs font-display text-lg font-light italic text-moss">
            Rooted in nature, refined by science.
          </p>
          <p className="mt-6 font-tech text-[10px] uppercase leading-loose tracking-[0.22em] text-bark/40">
            ISO 9001 : 2015 / GMP / HACCP
            <br />
            EST. 1995 — NANJING, CHINA
          </p>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.head} className="md:col-span-2">
            <p className="font-tech text-[10px] uppercase tracking-[0.28em] text-bark/40">
              {col.head}
            </p>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-bark/70 underline decoration-pebble underline-offset-4 transition-colors duration-300 hover:text-forest hover:decoration-moss"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-1" />
      </div>
      <p
        aria-hidden
        className="select-none overflow-hidden whitespace-nowrap px-5 font-body text-[17vw] font-bold leading-[0.78] tracking-[-0.06em] text-forest/5 md:px-10 min-[1481px]:text-[15rem]"
      >
        FENCHEM
      </p>
      <div className="flex flex-col gap-2 border-t border-pebble px-5 py-4 font-tech text-[10px] uppercase tracking-[0.22em] text-bark/40 md:flex-row md:items-center md:justify-between md:px-10">
        <span>© 2026 Fenchem — All Rights Reserved</span>
        <span>N 32.06 / E 118.79 — Nanjing</span>
        <span className="text-moss/70">SYS.EOF // END OF SPEC</span>
      </div>
    </footer>
  );
}

export function VariantB() {
  const { scrollYProgress } = useScroll();

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="bg-white font-body text-bark antialiased selection:bg-mint selection:text-forest">
        {/* ===== Sticky top bar ===== */}
        <header className="sticky top-0 z-50 border-b border-pebble bg-white/90 backdrop-blur-md">
          <div className="mx-auto max-w-[1480px] border-pebble min-[1481px]:border-x">
            {/* Micro-label strip */}
            <div className="hidden items-center justify-between border-b border-pebble px-5 py-2 md:flex md:px-10">
              <span className="flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.25em] text-bark/50">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss/60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-moss" />
                </span>
                SYS.ACTIVE — INGREDIENT ENGINEERING
              </span>
              <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-bark/50">
                N 32.06 / E 118.79 — NANJING HQ
              </span>
              <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-bark/50">
                ISO 9001 : 2015 / GMP
              </span>
            </div>
            {/* Nav row */}
            <nav className="flex items-center justify-between px-5 py-4 md:px-10">
              <button
                type="button"
                className="flex items-baseline gap-3 transition-opacity duration-300 hover:opacity-70"
              >
                <span className="font-body text-xl font-bold tracking-[-0.04em] text-forest">
                  FENCHEM
                </span>
                <span className="hidden font-tech text-[9px] uppercase tracking-[0.3em] text-bark/40 sm:inline">
                  Innovation Lab
                </span>
              </button>
              <div className="hidden items-center gap-8 md:flex">
                {NAV_LINKS.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-tech text-[11px] uppercase tracking-[0.22em] text-bark/60 transition-colors duration-300 hover:text-forest"
                  >
                    <span className="mr-1.5 text-moss/70">{String(i + 1).padStart(2, "0")}</span>
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 bg-forest px-5 py-2.5 font-tech text-[10px] uppercase tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-fern"
              >
                Request a Specification
                <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </nav>
          </div>
          {/* Scroll progress hairline */}
          <m.div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-moss"
            style={{ scaleX: scrollYProgress }}
          />
        </header>

        {/* ===== Framed sheet ===== */}
        <div className="mx-auto max-w-[1480px] border-pebble min-[1481px]:border-x">
          <main>
            <HeroSection />
            <TickerSection />
            <StatBand />
            <MatrixSection />
            <ProtocolSection />
            <DomainsSection />
            <CtaNetworkSection />
          </main>

          <FooterSection />
        </div>
      </div>
    </LazyMotion>
  );
}
