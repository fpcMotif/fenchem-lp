import { ArrowRight, ArrowUpRight, ChevronDown, FlaskConical, Globe2, Sprout } from "lucide-react";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE } from "@/components/prototype/motion-constants";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { getFeaturedIngredients, pillars } from "@/components/landing/landing-content";

/*
 * PROTOTYPE — Variant C: "Deep Forest"
 * Immersive cinematic dark luxury. Full-viewport hero, story chapters with
 * parallax, horizontal scroll-snap ingredient rail, glowing mint CTA.
 * New direction — no Stitch base. See PROTOTYPE-BRIEF.md.
 */

const img = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

const NAV_LINKS = [
  { label: "Origin", href: "#origin" },
  { label: "Science", href: "#science" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Standards", href: "#standards" },
] as const;

const PILLAR_DETAIL = [
  {
    icon: Sprout,
    copy: "A documented chain of custody from origin farm to finished extract — every lot, every season.",
  },
  {
    icon: FlaskConical,
    copy: "Identity, potency and stability validated in-house; third-party verification on request.",
  },
  {
    icon: Globe2,
    copy: "ISO and GMP certified systems with regulatory dossiers prepared for 40+ markets.",
  },
] as const;

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
      <m.img
        src={src}
        alt={alt}
        style={{ y: reduce ? 0 : y }}
        className="absolute inset-0 h-[116%] w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bark/70 via-transparent to-bark/30" />
    </div>
  );
}

function HeroNav({ reduce }: { reduce: boolean | null }) {
  return (
    <m.nav
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      className="fixed inset-x-4 top-4 z-50 md:inset-x-0 md:top-6"
    >
      <div className="mx-auto flex max-w-[880px] items-center justify-between rounded-full border border-white/10 bg-white/5 py-2 pr-2 pl-6 backdrop-blur-xl">
        <a href="#top" className="font-display text-cream text-xl tracking-tight">
          Fenchem
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-cream/60 text-sm transition-colors duration-300 hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-full bg-mint px-5 py-2.5 font-semibold text-forest text-sm shadow-[0_0_24px_oklch(from_var(--color-mint)_l_c_h_/_0.25)] transition-shadow duration-300 hover:shadow-[0_0_40px_oklch(from_var(--color-mint)_l_c_h_/_0.45)]"
        >
          Inquire
        </a>
      </div>
    </m.nav>
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
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      <m.div style={{ y: reduce ? 0 : heroY }} className="absolute inset-0">
        <img
          src={img("photo-1542601906990-b4d3fb778b09", 2000)}
          alt="Sunlight breaking through a deep forest canopy"
          className="h-full w-full scale-110 object-cover"
          loading="eager"
        />
      </m.div>
      <div className="absolute inset-0 bg-gradient-to-b from-bark/80 via-forest/40 to-bark" />

      <m.div style={{ opacity: reduce ? 1 : heroFade }} className="relative z-10 px-6 text-center">
        <m.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="font-tech text-[11px] text-mint uppercase tracking-[0.45em] md:text-xs"
        >
          Botanical Intelligence Since 1995
        </m.p>
        <m.h1
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
          className="mx-auto mt-8 max-w-5xl font-display font-light text-[clamp(3rem,9vw,7.5rem)] text-cream leading-[1.02] tracking-[-0.02em]"
        >
          Rooted in Nature,
          <br />
          <em className="text-mist italic">Refined by Science.</em>
        </m.h1>
        <m.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: EASE }}
          className="mx-auto mt-8 max-w-xl text-cream/70 text-lg leading-relaxed"
        >
          Premium botanical ingredients for the world&rsquo;s most demanding formulations — grown
          with patience, perfected in the laboratory.
        </m.p>
        <m.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="rounded-full bg-mint px-9 py-4 font-semibold text-forest text-sm shadow-[0_0_32px_oklch(from_var(--color-mint)_l_c_h_/_0.3)] transition-shadow duration-300 hover:shadow-[0_0_56px_oklch(from_var(--color-mint)_l_c_h_/_0.5)]"
          >
            Explore the Portfolio
          </a>
          <a
            href="#origin"
            className="rounded-full border border-cream/25 px-9 py-4 font-semibold text-cream text-sm transition-colors duration-300 hover:border-cream/60 hover:bg-white/5"
          >
            Our Story
          </a>
        </m.div>
      </m.div>

      <m.a
        href="#origin"
        aria-label="Scroll to story"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="-translate-x-1/2 absolute bottom-8 left-1/2 z-10 text-cream/50 transition-colors hover:text-mint"
      >
        <ChevronDown className="h-6 w-6" />
      </m.a>
    </header>
  );
}

function StatsBand() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
        {[
          ["30+", "Years of botanical R&D"],
          ["6", "Global production bases"],
          ["40+", "Markets with full dossiers"],
        ].map(([stat, label], i) => (
          <Reveal key={label} delay={i * 0.1}>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center backdrop-blur transition-colors duration-500 hover:border-mint/40">
              <p className="font-display font-light text-5xl text-mist md:text-6xl">{stat}</p>
              <p className="mt-3 font-tech text-[11px] text-cream/50 uppercase tracking-[0.2em]">
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
    <section id="origin" className="scroll-mt-24 px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <ChapterImage
            src={img("photo-1466781783364-36c955e42a7f", 1200)}
            alt="Dense green foliage in soft light"
          />
        </Reveal>
        <div className="lg:pl-8">
          <Reveal>
            <p className="font-tech text-[11px] text-mint uppercase tracking-[0.4em]">
              01 — Origin
            </p>
            <h2 className="mt-6 font-display font-light text-4xl text-cream leading-[1.08] tracking-tight md:text-6xl">
              Grown with <em className="text-mist italic">patience.</em>
            </h2>
            <p className="mt-8 max-w-md text-cream/65 leading-relaxed md:text-lg">
              Our botanicals begin in soil we know by name — a global network of partner farms
              cultivated over decades, where harvests are timed to the plant, never to the quarter.
            </p>
            <blockquote className="mt-10 border-mint/30 border-l-2 pl-6 font-display text-2xl text-mist italic leading-snug md:text-3xl">
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
    <section id="science" className="scroll-mt-24 px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div className="order-2 lg:order-1 lg:pr-8">
          <Reveal>
            <p className="font-tech text-[11px] text-mint uppercase tracking-[0.4em]">
              02 — Science
            </p>
            <h2 className="mt-6 font-display font-light text-4xl text-cream leading-[1.08] tracking-tight md:text-6xl">
              Refined to the <em className="text-mist italic">molecule.</em>
            </h2>
            <p className="mt-8 max-w-md text-cream/65 leading-relaxed md:text-lg">
              Every extract passes through clinical-grade validation — identity, potency, stability
              — before it carries the Fenchem name. 98% bio-active retention across our extraction
              process is not a goal; it is the specification.
            </p>
            <a
              href="#portfolio"
              className="group mt-10 inline-flex items-center gap-3 text-mint text-sm uppercase tracking-[0.2em] transition-colors hover:text-mist"
            >
              See what we make
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
        <Reveal className="order-1 lg:order-2">
          <ChapterImage
            src={img("photo-1576086213369-97a306d36557", 1200)}
            alt="Biotech laboratory with microscope under red light"
          />
        </Reveal>
      </div>
    </section>
  );
}

function IngredientRail() {
  return (
    <section id="portfolio" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-tech text-[11px] text-mint uppercase tracking-[0.4em]">
              03 — Portfolio
            </p>
            <h2 className="mt-6 font-display font-light text-4xl text-cream leading-tight tracking-tight md:text-6xl">
              The <em className="text-mist italic">living</em> library
            </h2>
          </div>
          <p className="font-tech text-[11px] text-cream/55 uppercase tracking-[0.25em]">
            Scroll →
          </p>
        </Reveal>
      </div>
      <div className="mt-14 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex snap-x snap-mandatory gap-6 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))]">
          {getFeaturedIngredients().map((item, i) => (
            <Reveal key={item.name} delay={Math.min(i * 0.08, 0.3)} className="snap-start">
              <article className="group w-[300px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition-colors duration-500 hover:border-mint/40 md:w-[340px]">
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl text-cream">{item.name}</h3>
                  <p className="mt-1 text-cream/55 text-sm italic">{item.latin}</p>
                  <dl className="mt-6 space-y-2.5 border-white/10 border-t pt-5">
                    {[
                      ["Purity", item.purity],
                      ["Form", item.form],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-4">
                        <dt className="font-tech text-[10px] text-mint/70 uppercase tracking-[0.2em]">
                          {k}
                        </dt>
                        <dd className="font-tech text-cream/70 text-xs">{v}</dd>
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
    <section id="standards" className="scroll-mt-24 px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {pillars.map((pillar, i) => {
          const Icon = PILLAR_DETAIL[i].icon;
          return (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-9 backdrop-blur transition-colors duration-500 hover:border-mint/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-mint/30 text-mint">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-7 font-display text-2xl text-cream">{pillar.title}</h3>
                <p className="mt-3 text-cream/55 text-sm leading-relaxed">
                  {PILLAR_DETAIL[i].copy}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden px-6 py-32 text-center md:py-44"
    >
      <div
        aria-hidden
        className="-translate-x-1/2 absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-mint/10 blur-3xl"
      />
      <Reveal className="relative">
        <p className="font-tech text-[11px] text-mint uppercase tracking-[0.45em]">
          Partner with Fenchem
        </p>
        <h2 className="mx-auto mt-8 max-w-3xl font-display font-light text-[clamp(2.5rem,6vw,5rem)] text-cream leading-[1.05] tracking-tight">
          Bring the forest to <em className="text-mist italic">your formulation.</em>
        </h2>
        <a
          href="#top"
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-mint px-10 py-5 font-semibold text-forest text-sm shadow-[0_0_40px_oklch(from_var(--color-mint)_l_c_h_/_0.35)] transition-shadow duration-300 hover:shadow-[0_0_72px_oklch(from_var(--color-mint)_l_c_h_/_0.55)]"
        >
          Request a Specification
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-white/10 border-t bg-gradient-to-b from-bark to-black px-6 pt-16 pb-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <p className="font-display text-3xl text-cream/80">Fenchem</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {["Privacy Policy", "Terms of Service", "Ingredient Transparency", "Global Offices"].map(
            (l) => (
              <a
                key={l}
                href="#top"
                className="text-cream/55 text-xs uppercase tracking-[0.15em] transition-colors duration-300 hover:text-mint"
              >
                {l}
              </a>
            ),
          )}
        </nav>
        <p className="font-tech text-[10px] text-cream/50 uppercase tracking-[0.25em]">
          © 2026 Fenchem Biotek Ltd. — Rooted in Nature, Refined by Science
        </p>
      </div>
    </footer>
  );
}

export function VariantC() {
  const reduce = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <main className="bg-bark font-body text-cream antialiased selection:bg-mint selection:text-forest">
        <HeroNav reduce={reduce} />
        <HeroHeader reduce={reduce} />
        <StatsBand />
        <OriginChapter />
        <ScienceChapter />
        <IngredientRail />
        <StandardsPillars />
        <CtaSection />
        <SiteFooter />
      </main>
    </LazyMotion>
  );
}
