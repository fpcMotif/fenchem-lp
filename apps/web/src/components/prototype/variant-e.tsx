/*
 * PROTOTYPE — Variant E: "Innovation Lab" (Brand Book Green-Led)
 * Clinical white spec-sheet. Hairline border-line grid, font-tech mono
 * micro-labels, grayscale ingredient matrix with division color accents,
 * marquee ticker. Green-led palette from Fenchem brand book.
 * Based on variant-b structure; all old editorial tokens replaced.
 */
import { useRef } from "react";
import type { ReactNode } from "react";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  ingredients,
  getFeaturedIngredients,
  divisionForApplication,
  industries,
  pillars,
  regions,
} from "@/components/landing/landing-content";

const IMG = {
  glassware:
    "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?auto=format&fit=crop&w=1000&q=80",
  microscope:
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=80",
} as const;

const NAV_LINKS = [
  { label: "Matrix", href: "#matrix" },
  { label: "Protocol", href: "#protocol" },
  { label: "Domains", href: "#domains" },
  { label: "Network", href: "#network" },
] as const;

const HERO_META = [
  { k: "SPEC.REF", v: "FN-LP / 2026-E" },
  { k: "ORIGIN", v: "N 32.06 / E 118.79" },
  { k: "ESTABLISHED", v: "1995 — NANJING" },
  { k: "CERT", v: "ISO 9001 / GMP" },
] as const;

const STATS = [
  {
    label: "[SYS.UPTIME]",
    value: "30+",
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

/* Division tag config — maps ingredient to division color + label */
type DivisionKey = "nutrition" | "food" | "cosmetics" | "chem" | "agro" | "feed";

const DIVISION_STYLES: Record<
  DivisionKey,
  { bg: string; text: string; border: string; label: string }
> = {
  nutrition: {
    bg: "bg-nutrition",
    text: "text-ink",
    border: "border-brand-green-300",
    label: "NUTRITION",
  },
  food: {
    bg: "bg-food",
    text: "text-ink",
    border: "border-food",
    label: "FOOD & BEV",
  },
  cosmetics: {
    bg: "bg-cosmetics",
    text: "text-paper",
    border: "border-cosmetics",
    label: "PERSONAL CARE",
  },
  chem: {
    bg: "bg-chem",
    text: "text-ink",
    border: "border-chem",
    label: "SPECIALTY CHEM",
  },
  agro: {
    bg: "bg-agro",
    text: "text-ink",
    border: "border-agro",
    label: "AGRO",
  },
  feed: {
    bg: "bg-feed",
    text: "text-ink",
    border: "border-feed",
    label: "FEED",
  },
};

const PROTOCOL_DETAIL = [
  {
    step: "01",
    tag: "CHAIN.OF.CUSTODY",
    desc: "Every botanical lot is geo-tagged at origin and tracked through extraction, refinement and release — an unbroken record from field coordinate to finished certificate of analysis.",
  },
  {
    step: "02",
    tag: "HPLC // GC // MICRO",
    desc: "In-house laboratories run identity, potency and stability programs on every compound — chromatographic and microbiological panels executed on each production batch.",
  },
  {
    step: "03",
    tag: "ISO.9001 / GMP / HACCP",
    desc: "Documentation engineered for your regulatory map — ISO, GMP, HACCP, Halal and Kosher dossiers prepared and maintained for more than forty markets.",
  },
] as const;

const DOMAIN_DETAIL = [
  {
    code: "A-01",
    cat: "CAT: NUTRI",
    desc: "Bioavailable actives engineered for capsules, tablets, softgels and powder delivery systems.",
    division: "nutrition" as DivisionKey,
  },
  {
    code: "B-02",
    cat: "CAT: F&B",
    desc: "Heat- and pH-stable functional ingredients for fortification, natural color and clean-label claims.",
    division: "food" as DivisionKey,
  },
  {
    code: "C-03",
    cat: "CAT: CARE",
    desc: "Dermatologically active agents formulated for cellular compatibility and sensory performance.",
    division: "cosmetics" as DivisionKey,
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

/* Division color dot chip */
function DivisionDot({ division }: { division: DivisionKey }) {
  const style = DIVISION_STYLES[division];
  return (
    <span
      className={`inline-block size-2.5 rounded-full ${style.bg} border ${style.border} shrink-0`}
      aria-hidden
    />
  );
}

/* Division tag badge */
function DivisionTag({ division }: { division: DivisionKey }) {
  const style = DIVISION_STYLES[division];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-tech text-[9px] uppercase tracking-[0.2em] ${style.bg} ${style.text}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-60" aria-hidden />
      {style.label}
    </span>
  );
}

/* Section header with mono code and brand-green heading */
function SectionHead({
  code,
  title,
  sub,
  right,
}: {
  code: string;
  title: string;
  sub: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 border-b border-line px-5 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
      <Reveal>
        <p className="font-tech text-[11px] uppercase tracking-[0.28em] text-mute-600">{code}</p>
        <h2 className="mt-5 font-body text-4xl font-black leading-[1.02] tracking-[-0.03em] text-ink md:text-5xl">
          {title} <span className="text-brand-green-600">{sub}</span>
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
    <div ref={ref} className="group relative overflow-hidden border border-line">
      <m.img
        src={IMG.microscope}
        alt="Analyst working at a microscope inside the Fenchem laboratory"
        className="h-[380px] w-full object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0 md:h-[480px]"
        style={{ y: reduce ? "0%" : y, scale: 1.16 }}
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-paper/90 px-4 py-2.5 backdrop-blur-sm">
        <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-mute-600">
          FIG. 02 — ANALYTICAL LAB, NANJING
        </span>
        <span className="font-tech text-[10px] tracking-[0.22em] text-brand-green-700">HPLC-7</span>
      </div>
    </div>
  );
}

/* ===== Hero section ===== */
function HeroSection() {
  return (
    <section className="relative border-b border-line">
      {/* Grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(from_var(--color-line)_l_c_h_/_0.4)_1px,transparent_1px),linear-gradient(to_bottom,oklch(from_var(--color-line)_l_c_h_/_0.4)_1px,transparent_1px)] bg-[size:56px_56px]"
      />
      <Plus aria-hidden strokeWidth={1} className="absolute left-4 top-4 size-4 text-mute-300" />
      <Plus
        aria-hidden
        strokeWidth={1}
        className="absolute bottom-4 right-4 hidden size-4 text-mute-300 lg:block"
      />
      <div className="relative grid lg:grid-cols-12">
        {/* Left: headline block */}
        <div className="px-5 py-16 md:px-10 md:py-24 lg:col-span-8 lg:py-28">
          <Reveal>
            <span className="inline-flex w-fit items-center gap-2.5 border border-line bg-paper px-3.5 py-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green-500/50 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-green-500" />
              </span>
              <span className="font-tech text-[10px] uppercase tracking-[0.3em] text-mute-600">
                SYS.ACTIVE — Botanical Intelligence Since 1995
              </span>
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-10 font-body text-[clamp(2.7rem,6.4vw,6rem)] font-black leading-[0.98] tracking-[-0.04em] text-ink">
              Nurturing Vitality through{" "}
              <span className="text-brand-green-600">Botanical Excellence</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-mute-600 md:text-lg font-body">
              Fenchem converts raw botanical complexity into precisely specified, clinically
              validated actives — supplied at industrial scale to formulators in more than forty
              countries.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3 md:gap-4">
            <a
              href="#matrix"
              className="group inline-flex min-h-11 items-center gap-3 bg-brand-green-500 px-7 py-4 font-tech text-[11px] uppercase tracking-[0.22em] text-brand-green-950 transition-colors duration-300 hover:bg-brand-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green-500"
            >
              Explore Portfolio
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden
              />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center gap-3 border border-brand-blue-700 px-7 py-4 font-tech text-[11px] uppercase tracking-[0.22em] text-brand-blue-700 transition-colors duration-300 hover:bg-brand-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-700"
            >
              Request a Specification
            </a>
          </Reveal>
        </div>
        {/* Right: mono metadata rail */}
        <aside
          aria-label="System metadata"
          className="flex flex-col border-t border-line lg:col-span-4 lg:border-l lg:border-t-0"
        >
          <Reveal delay={0.25} className="flex h-full flex-col">
            <dl className="divide-y divide-line border-b border-line">
              {HERO_META.map((row) => (
                <div key={row.k} className="flex items-baseline justify-between px-5 py-4 md:px-8">
                  <dt className="font-tech text-[10px] uppercase tracking-[0.22em] text-mute-600">
                    {row.k}
                  </dt>
                  <dd className="font-tech text-[11px] uppercase tracking-[0.18em] text-ink">
                    {row.v}
                  </dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between px-5 py-4 md:px-8">
                <dt className="font-tech text-[10px] uppercase tracking-[0.22em] text-mute-600">
                  STATUS
                </dt>
                <dd className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.18em] text-brand-green-700">
                  <span className="size-1.5 rounded-full bg-brand-green-500" aria-hidden />
                  OPERATIONAL
                </dd>
              </div>
            </dl>
            <div className="group relative min-h-64 flex-1 overflow-hidden lg:min-h-72">
              <img
                src={IMG.glassware}
                alt="Laboratory glassware during botanical extraction work at Fenchem"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-[scale,filter] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-paper/90 px-4 py-2.5 backdrop-blur-sm">
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-mute-600">
                  FIG. 01 — EXTRACTION LAB
                </span>
                <span className="font-tech text-[10px] tracking-[0.22em] text-brand-green-700">
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

/* ===== Ingredient ticker marquee ===== */
function TickerSection() {
  return (
    <section
      aria-label="Live ingredient index"
      className="overflow-hidden border-b border-line py-4 md:py-5"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {ingredients.map((ingredient, i) => (
              <li key={ingredient.name} className="flex items-center gap-8 pr-8 md:gap-12 md:pr-12">
                <span className="whitespace-nowrap font-tech text-[11px] uppercase tracking-[0.3em] text-mute-600 md:text-xs">
                  <span className="text-brand-green-700">{String(i + 1).padStart(2, "0")}</span>
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

/* ===== Stat band ===== */
function StatBand() {
  return (
    <section
      aria-label="Company metrics"
      className="grid grid-cols-2 gap-px border-b border-line bg-line lg:grid-cols-4"
    >
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="bg-paper">
          <div className="h-full px-5 py-9 transition-colors duration-500 hover:bg-brand-green-50 md:px-8 md:py-12">
            <p className="font-tech text-[10px] uppercase tracking-[0.28em] text-mute-600">
              {s.label}
            </p>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-2.5">
              <span className="font-body text-4xl font-black tracking-[-0.04em] text-brand-green-600 md:text-6xl">
                {s.value}
              </span>
              <span className="font-body text-lg font-medium text-mute-600 md:text-2xl">
                {s.unit}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-mute-600 font-body">{s.desc}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

/* ===== Ingredient Matrix ===== */
function MatrixSection() {
  return (
    <section id="matrix" className="border-b border-line">
      <SectionHead
        code="SYS.CAT_01 // ACTIVE COMPOUNDS"
        title="Ingredient"
        sub="matrix."
        right={
          <a
            href="#contact"
            className="group inline-flex min-h-11 items-center gap-2.5 border border-line px-5 py-3 font-tech text-[10px] uppercase tracking-[0.26em] text-mute-600 transition-colors duration-300 hover:border-brand-green-500 hover:text-brand-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green-500"
          >
            View Full Specs
            <ArrowRight
              className="size-3 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              aria-hidden
            />
          </a>
        }
      />
      <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
        {getFeaturedIngredients().map((item, i) => {
          const division = divisionForApplication(item.application);
          const divStyle = DIVISION_STYLES[division];
          return (
            <Reveal key={item.code} delay={(i % 3) * 0.08} className="group bg-paper">
              {/* Left-border accent via division color */}
              <div className={`h-full border-l-2 ${divStyle.border}`}>
                <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    className="h-full w-full object-cover grayscale transition-[scale,filter] duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                    loading="lazy"
                  />
                  {/* Division tag overlay */}
                  <span className="absolute right-4 top-4 flex items-center gap-1.5 border border-line bg-paper/90 px-2 py-1 backdrop-blur-sm">
                    <DivisionDot division={division} />
                    <span className="font-tech text-[9px] uppercase tracking-[0.2em] text-ink">
                      {item.category}
                    </span>
                  </span>
                </div>
                <div className="px-5 py-7 md:px-7 md:py-8">
                  <div className="flex items-baseline justify-between">
                    <span className="font-tech text-[11px] tracking-[0.22em] text-brand-green-700">
                      {String(i + 1).padStart(2, "0")} —
                    </span>
                    <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-mute-600">
                      {item.code}
                    </span>
                  </div>
                  <h3 className="mt-3 font-body text-xl font-bold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-brand-green-600">
                    {item.name}
                  </h3>
                  {/* Division badge */}
                  <div className="mt-2">
                    <DivisionTag division={division} />
                  </div>
                  <dl className="mt-5 space-y-2.5 border-t border-line pt-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-mute-600">
                        Purity
                      </dt>
                      <dd className="text-right font-tech text-[11px] text-mute-600">
                        {item.purity}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-mute-600">
                        Form
                      </dt>
                      <dd className="text-right font-tech text-[11px] text-mute-600">
                        {item.form}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-mute-600">
                        Application
                      </dt>
                      <dd className="text-right font-tech text-[11px] text-mute-600">
                        {item.useCase}
                      </dd>
                    </div>
                  </dl>
                  <a
                    href="#contact"
                    className="group/spec mt-6 inline-flex min-h-11 items-center gap-2 font-tech text-[10px] uppercase tracking-[0.24em] text-mute-600 transition-colors duration-300 hover:text-brand-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green-500"
                  >
                    Request Spec
                    <ArrowUpRight
                      className="size-3 transition-transform duration-300 group-hover/spec:-translate-y-0.5 group-hover/spec:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </a>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ===== Operating Protocol ===== */
function ProtocolSection() {
  return (
    <section id="protocol" className="border-b border-line">
      <SectionHead
        code="SYS.METHOD // 02"
        title="Operating"
        sub="protocol."
        right={
          <p className="max-w-xs font-tech text-[10px] uppercase leading-relaxed tracking-[0.2em] text-mute-600">
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
        <div className="border-t border-line lg:col-span-7 lg:border-l lg:border-t-0">
          {pillars.map((pillar, i) => {
            const detail = PROTOCOL_DETAIL[i];
            return (
              <Reveal
                key={pillar.title}
                delay={i * 0.08}
                className={i < pillars.length - 1 ? "border-b border-line" : ""}
              >
                <div className="grid gap-4 px-5 py-10 transition-colors duration-500 hover:bg-brand-green-50 md:grid-cols-12 md:gap-6 md:px-10 md:py-12">
                  <span className="font-tech text-sm tracking-[0.22em] text-brand-green-700 md:col-span-2">
                    {detail.step} —
                  </span>
                  <div className="md:col-span-10">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="font-body text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">
                        {pillar.title}
                      </h3>
                      <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-mute-600">
                        {detail.tag}
                      </span>
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute-600 font-body md:text-base">
                      {detail.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===== Application Domains ===== */
function DomainsSection() {
  return (
    <section id="domains" className="border-b border-line">
      <SectionHead
        code="SYS.CAT_02 // APPLICATION DOMAINS"
        title="Built for three"
        sub="industries."
      />
      <div>
        {industries.map((industry, i) => {
          const detail = DOMAIN_DETAIL[i];
          const divStyle = DIVISION_STYLES[detail.division];
          return (
            <a
              key={industry.title}
              href="#contact"
              className="group block border-b border-line transition-colors duration-500 last:border-b-0 hover:bg-brand-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green-500"
            >
              <Reveal
                delay={i * 0.06}
                className="grid items-center gap-3 px-5 py-9 md:grid-cols-12 md:gap-6 md:px-10 md:py-12"
              >
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2">
                    <DivisionDot division={detail.division} />
                    <p className="font-tech text-[11px] tracking-[0.22em] text-brand-green-700">
                      {detail.code}
                    </p>
                  </div>
                  <p className="mt-1 font-tech text-[10px] uppercase tracking-[0.22em] text-mute-600">
                    {detail.cat}
                  </p>
                </div>
                <h3
                  className={`font-body text-2xl font-bold tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-brand-green-600 md:col-span-5 md:text-4xl`}
                >
                  {industry.title}
                </h3>
                <p className="text-sm leading-relaxed text-mute-600 font-body md:col-span-4">
                  {detail.desc}
                </p>
                <div className="flex md:col-span-1 md:justify-end">
                  <ArrowUpRight
                    className={`size-6 text-mute-300 transition-[translate,color] duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-green-500 motion-reduce:transition-none`}
                    aria-hidden
                  />
                </div>
                {/* Division accent strip at bottom */}
                <div
                  className={`col-span-full h-0.5 ${divStyle.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  aria-hidden
                />
              </Reveal>
            </a>
          );
        })}
      </div>
    </section>
  );
}

/* ===== CTA + Global Network ===== */
function CtaNetworkSection() {
  return (
    <section id="contact" className="bg-brand-blue-700 text-paper">
      <div className="border-b border-paper/10 px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="font-tech text-[11px] uppercase tracking-[0.28em] text-brand-green-300">
            SYS.CONTACT // OPEN CHANNEL
          </p>
          <h2 className="mt-6 max-w-4xl font-body text-4xl font-black leading-[1.02] tracking-[-0.03em] text-paper md:text-6xl">
            Your next formulation,{" "}
            <span className="text-brand-green-400">engineered to specification.</span>
          </h2>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-paper/70 font-body md:text-base">
            Submit a target spec — purity, form, matrix, regulatory map — and our laboratory returns
            a validated proposal with full documentation within one business day.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3 md:gap-4">
          <a
            href="mailto:sales@fenchem.com"
            className="group inline-flex min-h-11 items-center gap-3 bg-brand-green-500 px-7 py-4 font-tech text-[11px] uppercase tracking-[0.22em] text-brand-green-950 transition-colors duration-300 hover:bg-brand-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green-300"
          >
            Partner with Fenchem
            <ArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              aria-hidden
            />
          </a>
          <a
            href="#matrix"
            className="inline-flex min-h-11 items-center gap-3 border border-paper/30 px-7 py-4 font-tech text-[11px] uppercase tracking-[0.22em] text-paper/90 transition-colors duration-300 hover:border-paper hover:bg-paper/10 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper/60"
          >
            Explore Portfolio
          </a>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 font-tech text-[10px] uppercase tracking-[0.28em] text-paper/65">
            RESPONSE.TIME &lt; 24H — TECHNICAL DOSSIERS ON REQUEST
          </p>
        </Reveal>
      </div>
      <div id="network">
        <div className="flex items-center justify-between border-b border-paper/10 px-5 py-5 md:px-10">
          <span className="font-tech text-[10px] uppercase tracking-[0.26em] text-brand-green-300">
            SYS.NET // 6 ACTIVE NODES
          </span>
          <span className="hidden font-tech text-[10px] uppercase tracking-[0.26em] text-paper/65 md:block">
            LAT/LONG VERIFIED — 2026.06
          </span>
        </div>
        <div className="grid grid-cols-1 gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region, i) => (
            <Reveal key={region.city} delay={(i % 3) * 0.08} className="bg-brand-blue-700">
              <div className="h-full px-5 py-7 transition-colors duration-500 hover:bg-brand-blue-800 md:px-8 md:py-9">
                <div className="flex items-baseline justify-between font-tech text-[10px] uppercase tracking-[0.2em] text-brand-green-300">
                  <span>{`NODE ${String(i + 1).padStart(2, "0")}`}</span>
                  <span className="text-paper/65">{region.coords}</span>
                </div>
                <p className="mt-4 font-body text-xl font-bold tracking-[-0.02em] text-paper">
                  {region.city}
                </p>
                <p className="mt-1 text-sm text-paper/70 font-body">{region.role}</p>
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
    <footer className="border-t border-line bg-paper">
      <div className="grid gap-12 px-5 py-14 md:grid-cols-12 md:px-10 md:py-16">
        <div className="md:col-span-5">
          <a
            href="/"
            className="font-body text-2xl font-black tracking-[-0.04em] text-brand-green-600 transition-opacity duration-300 hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green-500"
          >
            FENCHEM
          </a>
          <p className="mt-4 max-w-xs font-body text-lg font-medium text-mute-600">
            Rooted in nature, refined by science.
          </p>
          <p className="mt-6 font-tech text-[10px] uppercase leading-loose tracking-[0.22em] text-mute-600">
            ISO 9001 : 2015 / GMP / HACCP
            <br />
            EST. 1995 — NANJING, CHINA
          </p>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.head} className="md:col-span-2">
            <p className="font-tech text-[10px] uppercase tracking-[0.28em] text-mute-600">
              {col.head}
            </p>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-mute-600 underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-brand-green-700 hover:decoration-brand-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green-500"
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
        className="select-none overflow-hidden whitespace-nowrap px-5 font-body text-[17vw] font-black leading-[0.78] tracking-[-0.06em] text-brand-green-500/[0.06] md:px-10 min-[1481px]:text-[15rem]"
      >
        FENCHEM
      </p>
      <div className="flex flex-col gap-2 border-t border-line px-5 py-4 font-tech text-[10px] uppercase tracking-[0.22em] text-mute-600 md:flex-row md:items-center md:justify-between md:px-10">
        <span>© 2026 Fenchem — All Rights Reserved</span>
        <span>N 32.06 / E 118.79 — Nanjing</span>
        <span className="text-brand-green-700">SYS.EOF // END OF SPEC</span>
      </div>
    </footer>
  );
}

export function VariantE() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="bg-paper font-body text-ink antialiased selection:bg-brand-green-100 selection:text-brand-green-800">
        {/* ===== Sticky top bar ===== */}
        <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
          <div className="mx-auto max-w-[1480px] border-line min-[1481px]:border-x">
            {/* Micro-label strip */}
            <div className="hidden items-center justify-between border-b border-line bg-mute-50 px-5 py-2 md:flex md:px-10">
              <span className="flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.25em] text-mute-600">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green-500/60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-brand-green-500" />
                </span>
                SYS.ACTIVE — INGREDIENT ENGINEERING
              </span>
              <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-mute-600">
                N 32.06 / E 118.79 — NANJING HQ
              </span>
              <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-mute-600">
                ISO 9001 : 2015 / GMP
              </span>
            </div>
            {/* Nav row */}
            <nav
              aria-label="Main navigation"
              className="flex items-center justify-between px-5 py-4 md:px-10"
            >
              <a
                href="/"
                className="flex items-baseline gap-3 transition-opacity duration-300 hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green-500"
              >
                <span className="font-body text-xl font-black tracking-[-0.04em] text-brand-green-600">
                  FENCHEM
                </span>
                <span className="hidden font-tech text-[9px] uppercase tracking-[0.3em] text-mute-600 sm:inline">
                  Innovation Lab
                </span>
              </a>
              <div className="hidden items-center gap-8 md:flex">
                {NAV_LINKS.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-tech text-[11px] uppercase tracking-[0.22em] text-mute-600 transition-colors duration-300 hover:text-brand-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green-500"
                  >
                    <span className="mr-1.5 text-brand-green-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                className="group inline-flex min-h-11 items-center gap-2.5 bg-brand-blue-700 px-5 py-2.5 font-tech text-[10px] uppercase tracking-[0.22em] text-paper transition-colors duration-300 hover:bg-brand-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-700"
              >
                Request a Specification
                <ArrowRight
                  className="size-3 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden
                />
              </a>
            </nav>
          </div>
          {/* Scroll progress hairline — brand green */}
          <m.div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-green-500"
            style={{ scaleX: reduce ? 0 : scrollYProgress }}
          />
        </header>

        {/* ===== Framed spec-sheet ===== */}
        <div className="mx-auto max-w-[1480px] border-line min-[1481px]:border-x">
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
