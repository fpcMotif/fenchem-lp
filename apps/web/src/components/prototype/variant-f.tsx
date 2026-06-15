import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  FlaskConical,
  Globe2,
  Sprout,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import type { ReactNode } from "react";

/*
 * PROTOTYPE — Variant F: "Deep Green Immersive"
 * Green-led dark luxury flagship. Full-viewport hero on deep brand-green-950,
 * story chapters, horizontal snap ingredient rail, glowing brand-green CTA.
 * Reinterpretation of Variant C with full brand-book compliance.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const img = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

const NAV_LINKS = [
  { label: "Origin", href: "#origin" },
  { label: "Science", href: "#science" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Standards", href: "#standards" },
] as const;

const RAIL = [
  {
    name: "Ashwagandha KSM-66",
    latin: "Withania somnifera",
    data: [
      ["PURITY", "≥ 5% withanolides"],
      ["FORM", "Root extract"],
    ],
    image: img("photo-1501004318641-b39e6451bec6", 800),
  },
  {
    name: "Lutein",
    latin: "Tagetes erecta",
    data: [
      ["PURITY", "≥ 98% trans"],
      ["FORM", "Beadlet · Oil"],
    ],
    image: img("photo-1518531933037-91b2f5f229cc", 800),
  },
  {
    name: "Astaxanthin",
    latin: "Haematococcus pluvialis",
    data: [
      ["PURITY", "≥ 10% oleoresin"],
      ["FORM", "Softgel-ready"],
    ],
    image: img("photo-1610348725531-843dff563e2c", 800),
  },
  {
    name: "Coenzyme Q10",
    latin: "Fermentation grade",
    data: [
      ["PURITY", "≥ 99.5%"],
      ["FORM", "Powder · Liposomal"],
    ],
    image: img("photo-1559757148-5c350d0d3c56", 800),
  },
  {
    name: "Curcumin",
    latin: "Curcuma longa",
    data: [
      ["PURITY", "≥ 95% curcuminoids"],
      ["FORM", "Water-dispersible"],
    ],
    image: img("photo-1490645935967-10de6ba17061", 800),
  },
  {
    name: "Hyaluronic Acid",
    latin: "Bio-fermented",
    data: [
      ["GRADE", "Cosmetic · Food"],
      ["MW", "8 kDa – 1.8 MDa"],
    ],
    image: img("photo-1512069772995-ec65ed45afd6", 800),
  },
] as const;

const PILLARS = [
  {
    icon: Sprout,
    title: "Traceable Sourcing",
    copy: "A documented chain of custody from origin farm to finished extract — every lot, every season.",
  },
  {
    icon: FlaskConical,
    title: "Clinical-Grade R&D",
    copy: "Identity, potency and stability validated in-house; third-party verification on request.",
  },
  {
    icon: Globe2,
    title: "Global Compliance",
    copy: "ISO and GMP certified systems with regulatory dossiers prepared for 40+ markets.",
  },
] as const;

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
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ChapterImage({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div
      ref={ref}
      className="relative h-[60vh] overflow-hidden rounded-[28px] border border-white/10 md:h-[78vh]"
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y: reduce ? 0 : y }}
        className="absolute inset-0 h-[116%] w-full object-cover"
        loading="lazy"
      />
      {/* Dark green gradient overlay using oklch matching brand-green-950 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.14 0.06 145) 0%, transparent 55%, oklch(0.14 0.06 145 / 0.3) 100%)",
        }}
        aria-hidden
      />
    </div>
  );
}

function HeroNav({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.nav
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      aria-label="Main navigation"
      className="fixed inset-x-4 top-4 z-50 md:inset-x-0 md:top-6"
    >
      <div className="mx-auto flex max-w-[880px] items-center justify-between rounded-full border border-white/10 bg-brand-green-950/60 py-2 pr-2 pl-6 backdrop-blur-xl">
        <a
          href="#top"
          className="font-display text-xl font-light tracking-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400"
        >
          Fenchem
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 transition-colors duration-300 hover:text-brand-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:sales@fenchem.com"
          className="min-h-11 rounded-full bg-brand-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_oklch(0.55_0.17_145_/_0.35)] transition-all duration-300 hover:bg-brand-green-400 hover:shadow-[0_0_40px_oklch(0.55_0.17_145_/_0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          Inquire
        </a>
      </div>
    </motion.nav>
  );
}

function HeroHeader({ reduce }: { reduce: boolean | null }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <header
      id="top"
      ref={heroRef}
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-brand-green-950"
    >
      {/* Parallax canopy image */}
      <motion.div style={{ y: reduce ? 0 : heroY }} className="absolute inset-0">
        <img
          src={img("photo-1542601906990-b4d3fb778b09", 2000)}
          alt="Sunlight breaking through a deep forest canopy of green leaves"
          className="h-full w-full scale-110 object-cover"
          loading="eager"
        />
      </motion.div>
      {/* Deep brand-green-950 gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.14 0.06 145 / 0.85) 0%, oklch(0.14 0.06 145 / 0.35) 45%, oklch(0.14 0.06 145) 100%)",
        }}
        aria-hidden
      />

      <motion.div
        style={{ opacity: reduce ? 1 : heroFade }}
        className="relative z-10 px-6 text-center"
      >
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="font-tech text-[11px] uppercase tracking-[0.45em] text-brand-green-400 md:text-xs"
        >
          Botanical Intelligence Since 1995
        </motion.p>
        <motion.h1
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
          className="mx-auto mt-8 max-w-5xl font-display text-[clamp(3rem,9vw,7.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-white"
        >
          Rooted in Nature,
          <br />
          <span className="text-brand-green-300 italic">Refined by Science.</span>
        </motion.h1>
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: EASE }}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/70"
        >
          Premium botanical ingredients for the world&rsquo;s most demanding formulations — grown
          with patience, perfected in the laboratory.
        </motion.p>
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="min-h-11 rounded-full bg-brand-green-500 px-9 py-4 text-sm font-semibold text-white shadow-[0_0_32px_oklch(0.55_0.17_145_/_0.35)] transition-all duration-300 hover:bg-brand-green-400 hover:shadow-[0_0_56px_oklch(0.55_0.17_145_/_0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            Explore the Portfolio
          </a>
          <a
            href="#origin"
            className="min-h-11 rounded-full border border-white/25 px-9 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-brand-green-400/60 hover:bg-brand-green-900/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400"
          >
            Our Story
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#origin"
        aria-label="Scroll down to read our story"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={
          reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
        className="-translate-x-1/2 absolute bottom-8 left-1/2 z-10 min-h-11 text-white/50 transition-colors hover:text-brand-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400"
      >
        <ChevronDown className="h-6 w-6" aria-hidden />
      </motion.a>
    </header>
  );
}

function StatsBand() {
  return (
    <section
      aria-label="Company statistics"
      className="relative bg-brand-green-950 px-6 py-24 md:py-32"
    >
      {/* Subtle glow at top edge */}
      <div
        aria-hidden
        className="-translate-x-1/2 pointer-events-none absolute top-0 left-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-brand-green-500/40 to-transparent"
      />
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
        {(
          [
            ["25+", "Years of botanical R&D"],
            ["6", "Global production bases"],
            ["40+", "Markets with full dossiers"],
          ] as const
        ).map(([stat, label], i) => (
          <Reveal key={label} delay={i * 0.1}>
            <div className="rounded-3xl border border-brand-green-800/60 bg-brand-green-900/40 px-8 py-10 text-center backdrop-blur transition-colors duration-500 hover:border-brand-green-500/50">
              <p className="font-display text-5xl font-light text-brand-green-300 md:text-6xl">
                {stat}
              </p>
              <p className="mt-3 font-tech text-[11px] uppercase tracking-[0.2em] text-white/50">
                {label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function OriginChapter() {
  return (
    <section
      id="origin"
      aria-labelledby="origin-heading"
      className="scroll-mt-24 bg-brand-green-950 px-6 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <ChapterImage
            src={img("photo-1466781783364-36c955e42a7f", 1200)}
            alt="Dense green foliage in diffused soft light, symbolising traceable botanical sourcing"
          />
        </Reveal>
        <div className="lg:pl-8">
          <Reveal>
            <p className="font-tech text-[11px] uppercase tracking-[0.4em] text-brand-green-400">
              01 — Origin
            </p>
            <h2
              id="origin-heading"
              className="mt-6 font-display text-4xl font-light leading-[1.08] tracking-tight text-white md:text-6xl"
            >
              Grown with{" "}
              <span className="italic text-brand-green-300">patience.</span>
            </h2>
            <p className="mt-8 max-w-md leading-relaxed text-white/65 md:text-lg">
              Our botanicals begin in soil we know by name — a global network of partner farms
              cultivated over decades, where harvests are timed to the plant, never to the quarter.
            </p>
            <blockquote className="mt-10 border-l-2 border-brand-green-500/40 pl-6 font-display text-2xl italic leading-snug text-brand-green-200 md:text-3xl">
              "Nature holds the keys to human vitality. We simply refuse to lose them in
              translation."
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ScienceChapter() {
  return (
    <section
      id="science"
      aria-labelledby="science-heading"
      className="scroll-mt-24 bg-gradient-to-b from-brand-green-950 to-brand-green-900 px-6 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div className="order-2 lg:order-1 lg:pr-8">
          <Reveal>
            <p className="font-tech text-[11px] uppercase tracking-[0.4em] text-brand-green-400">
              02 — Science
            </p>
            <h2
              id="science-heading"
              className="mt-6 font-display text-4xl font-light leading-[1.08] tracking-tight text-white md:text-6xl"
            >
              Refined to the{" "}
              <span className="italic text-brand-green-300">molecule.</span>
            </h2>
            <p className="mt-8 max-w-md leading-relaxed text-white/65 md:text-lg">
              Every extract passes through clinical-grade validation — identity, potency, stability
              — before it carries the Fenchem name. 98% bio-active retention across our extraction
              process is not a goal; it is the specification.
            </p>
            <a
              href="#portfolio"
              className="group mt-10 inline-flex min-h-11 items-center gap-3 text-sm uppercase tracking-[0.2em] text-brand-green-400 transition-colors hover:text-brand-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400"
            >
              See what we make
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </a>
          </Reveal>
        </div>
        <Reveal className="order-1 lg:order-2">
          <ChapterImage
            src={img("photo-1576086213369-97a306d36557", 1200)}
            alt="Biotech laboratory with scientific glassware and precision instruments"
          />
        </Reveal>
      </div>
    </section>
  );
}

function IngredientRail() {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-24 bg-brand-green-900 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-tech text-[11px] uppercase tracking-[0.4em] text-brand-green-400">
              03 — Portfolio
            </p>
            <h2
              id="portfolio-heading"
              className="mt-6 font-display text-4xl font-light leading-tight tracking-tight text-white md:text-6xl"
            >
              The <span className="italic text-brand-green-300">living</span> library
            </h2>
          </div>
          <p className="font-tech text-[11px] uppercase tracking-[0.25em] text-white/40">
            Scroll →
          </p>
        </Reveal>
      </div>
      <div className="mt-14 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex snap-x snap-mandatory gap-6 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))]">
          {RAIL.map((item, i) => (
            <Reveal key={item.name} delay={Math.min(i * 0.08, 0.3)} className="snap-start">
              <article className="group w-[300px] shrink-0 overflow-hidden rounded-3xl border border-brand-green-700/40 bg-white/5 backdrop-blur transition-colors duration-500 hover:border-brand-green-400/60 md:w-[340px]">
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.name} — ${item.latin} ingredient`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl font-light text-white">{item.name}</h3>
                  <p className="mt-1 text-sm italic text-white/40">{item.latin}</p>
                  <dl className="mt-6 space-y-2.5 border-t border-brand-green-800/60 pt-5">
                    {item.data.map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-4">
                        <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-brand-green-400/70">
                          {k}
                        </dt>
                        <dd className="font-tech text-xs text-white/70">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StandardsPillars() {
  return (
    <section
      id="standards"
      aria-labelledby="standards-heading"
      className="scroll-mt-24 bg-gradient-to-b from-brand-green-900 to-brand-green-950 px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <p className="font-tech text-[11px] uppercase tracking-[0.4em] text-brand-green-400">
            04 — Standards
          </p>
          <h2
            id="standards-heading"
            className="mx-auto mt-6 max-w-2xl font-display text-4xl font-light leading-tight tracking-tight text-white md:text-5xl"
          >
            Our promise, <span className="italic text-brand-green-300">codified.</span>
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl border border-brand-green-800/60 bg-gradient-to-b from-brand-green-900/60 to-brand-green-950/40 p-9 backdrop-blur transition-colors duration-500 hover:border-brand-green-500/50">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-green-500/40 text-brand-green-400 shadow-[0_0_16px_oklch(0.55_0.17_145_/_0.15)] transition-shadow duration-500 group-hover:shadow-[0_0_28px_oklch(0.55_0.17_145_/_0.3)]"
                  aria-hidden
                >
                  <pillar.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-7 font-display text-2xl font-light text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{pillar.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const items = [
    "Nutrition & Supplements",
    "Food & Beverage",
    "Personal Care & Cosmeceuticals",
    "ISO Certified",
    "GMP Compliant",
    "40+ Countries",
    "25+ Years",
  ];
  const track = [...items, ...items];

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-brand-green-800/40 bg-brand-green-950 py-4"
    >
      <div className="animate-marquee flex w-max gap-16">
        {track.map((label, i) => (
          <span
            key={i}
            className="shrink-0 font-tech text-[11px] uppercase tracking-[0.3em] text-brand-green-500/60"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function CtaSection() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative scroll-mt-24 overflow-hidden bg-brand-green-950 px-6 py-32 text-center md:py-44"
    >
      {/* Central brand-green glow orb */}
      <div
        aria-hidden
        className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-[32rem] w-[32rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.17 145 / 0.12) 0%, transparent 70%)",
        }}
      />
      {/* Secondary brand-blue glow accent — minor */}
      <div
        aria-hidden
        className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-[48rem] w-[48rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.42 0.18 265 / 0.06) 0%, transparent 65%)",
        }}
      />
      <Reveal className="relative">
        <p className="font-tech text-[11px] uppercase tracking-[0.45em] text-brand-green-400">
          Partner with Fenchem
        </p>
        <h2
          id="cta-heading"
          className="mx-auto mt-8 max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] tracking-tight text-white"
        >
          Bring the forest to{" "}
          <span className="italic text-brand-green-300">your formulation.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/55">
          Our team of botanical scientists and regulatory specialists are ready to accelerate your
          next ingredient partnership.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:sales@fenchem.com"
            className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-brand-green-500 px-10 py-5 text-sm font-semibold text-white shadow-[0_0_40px_oklch(0.55_0.17_145_/_0.4)] transition-all duration-300 hover:bg-brand-green-400 hover:shadow-[0_0_72px_oklch(0.55_0.17_145_/_0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            Request a Specification
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
          <a
            href="#portfolio"
            className="inline-flex min-h-11 items-center rounded-full border border-brand-green-700/60 px-10 py-5 text-sm font-semibold text-brand-green-300 transition-colors duration-300 hover:border-brand-green-400/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400"
          >
            Explore Portfolio
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-brand-green-800/40 bg-gradient-to-b from-brand-green-950 to-black px-6 pb-10 pt-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <div>
          <p className="font-display text-3xl font-light text-white/80">Fenchem</p>
          <p className="mt-1 font-tech text-[11px] uppercase tracking-[0.3em] text-brand-green-500/60">
            Rooted in Nature, Refined by Science
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {["Privacy Policy", "Terms of Service", "Ingredient Transparency", "Global Offices"].map(
            (label) => (
              <a
                key={label}
                href="#top"
                className="text-xs uppercase tracking-[0.15em] text-white/40 transition-colors duration-300 hover:text-brand-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green-400"
              >
                {label}
              </a>
            ),
          )}
        </nav>
        <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-white/25">
          &copy; 2026 Fenchem Biotek Ltd. — ISO &amp; GMP Certified · 40+ Countries
        </p>
      </div>
    </footer>
  );
}

export function VariantF() {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      <main className="bg-brand-green-950 font-body text-white antialiased selection:bg-brand-green-500 selection:text-white">
        <HeroNav reduce={reduce} />
        <HeroHeader reduce={reduce} />
        <StatsBand />
        <MarqueeStrip />
        <OriginChapter />
        <ScienceChapter />
        <IngredientRail />
        <StandardsPillars />
        <CtaSection />
        <SiteFooter />
      </main>
    </AnimatePresence>
  );
}
