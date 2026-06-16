import { ArrowUpRight, FlaskConical, Globe, Leaf, Sprout } from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import { EASE, Eyebrow, Intro, Reveal } from "@/components/prototype/motion";
import {
  industries,
  stats,
  pillars,
  ingredients,
  certifications,
  regions,
} from "@/components/landing/landing-content";

/*
 * PROTOTYPE — Variant A: "Botanical Editorial"
 * Warm cream editorial gallery. Floating pill nav, oversized Newsreader serif
 * hero with italic accents, blob-masked botanical imagery, asymmetric industry
 * cards, split "Rooted in Nature, Refined by Science" section, mint ingredient
 * chips, quiet certification strip, deep forest footer.
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

const PILLAR_ICONS = [Sprout, FlaskConical, Globe] as const;

function NavBar() {
  const reduce = useReducedMotion();
  return (
    <m.nav
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed inset-x-4 top-4 z-50 md:inset-x-0 md:top-6"
    >
      <div className="mx-auto flex max-w-[920px] items-center justify-between rounded-full border border-pebble/70 bg-cream/80 py-2 pl-6 pr-2 shadow-ambient backdrop-blur-md">
        <a
          href="#top"
          className="font-display text-2xl font-medium tracking-tight text-forest transition-colors duration-300 hover:text-fern"
        >
          Fenchem
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-bark/60 transition-colors duration-300 hover:text-forest"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 font-body text-sm font-semibold text-cream shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-fern"
        >
          Partner with Us
        </a>
      </div>
    </m.nav>
  );
}

type HeroSectionProps = {
  heroRef: React.RefObject<HTMLElement | null>;
  blobY: MotionValue<number>;
};

function HeroSection({ heroRef, blobY }: HeroSectionProps) {
  const reduce = useReducedMotion();
  return (
    <header id="top" ref={heroRef} className="relative pb-24 pt-36 md:pb-36 md:pt-48">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 md:px-12 lg:grid-cols-12 lg:gap-8 lg:px-16">
        <div className="lg:col-span-7">
          <Intro delay={0.05}>
            <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 font-tech text-[10px] uppercase tracking-[0.25em] text-fern md:text-[11px]">
              <Leaf className="h-3.5 w-3.5" aria-hidden />
              Botanical Intelligence Since 1995
            </span>
          </Intro>
          <Intro delay={0.18}>
            <h1 className="mt-8 font-display text-[clamp(3.25rem,7.5vw,6.5rem)] font-light leading-[1.02] tracking-[-0.025em] text-forest">
              Nurturing <em className="italic text-moss">Vitality</em> through Botanical Excellence
            </h1>
          </Intro>
          <Intro delay={0.32}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-bark/65 md:text-xl">
              Premium botanical and functional ingredients for nutrition, food and personal care —
              bridging ancient plant wisdom with modern scientific precision.
            </p>
          </Intro>
          <Intro delay={0.46} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#ingredients"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-4 font-body text-sm font-semibold tracking-wide text-cream shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-fern hover:shadow-ambient"
            >
              Explore Portfolio
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-moss/40 px-8 py-4 font-body text-sm font-semibold tracking-wide text-forest transition-colors duration-300 hover:border-moss hover:bg-mint/40"
            >
              Request a Specification
            </a>
          </Intro>
        </div>

        <Intro delay={0.3} className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[540px]">
            <div
              aria-hidden
              className="absolute -inset-5 rotate-6 bg-mint/70 blur-2xl"
              style={{ borderRadius: "42% 58% 62% 38% / 47% 59% 41% 53%" }}
            />
            <m.div style={{ y: reduce ? 0 : blobY }} className="relative">
              <div
                className="overflow-hidden shadow-ambient"
                style={{ borderRadius: "58% 42% 38% 62% / 53% 41% 59% 47%" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80"
                  alt="Macro photograph of a green leaf with morning dew"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                />
              </div>
              <span className="absolute right-0 top-8 rounded-full bg-cream/90 px-4 py-2 font-tech text-[10px] uppercase tracking-[0.25em] text-fern shadow-lift backdrop-blur md:-right-4 md:top-12">
                ISO · GMP Certified
              </span>
              <m.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={
                  reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }
                className="absolute -bottom-6 left-0 max-w-[220px] rounded-[24px] bg-white p-6 shadow-ambient md:-bottom-8 md:-left-8"
              >
                <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-moss">
                  Extraction Yield
                </p>
                <p className="mt-2 font-display text-4xl font-light text-forest">98%</p>
                <p className="mt-1 text-xs leading-relaxed text-bark/55">
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

function IndustriesSection() {
  return (
    <section id="industries" className="scroll-mt-28 py-28 md:py-40">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow accent="text-moss">Where our ingredients work</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-light tracking-tight text-forest md:text-5xl lg:text-6xl">
              Purity across <em className="italic text-moss">industries</em>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-bark/60">
            Crafted to meet the rigorous demands of global leaders in health, wellness and beauty.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-3 md:gap-8 lg:gap-10">
          {industries.map((industry, i) => (
            <Reveal key={industry.title} delay={i * 0.12} className={INDUSTRY_LAYOUT[i].offset}>
              <a href="#ingredients" className="group block">
                <div
                  className={`overflow-hidden rounded-[24px] shadow-lift transition-shadow duration-500 group-hover:shadow-ambient ${INDUSTRY_LAYOUT[i].aspect}`}
                >
                  <img
                    src={industry.image.src}
                    alt={industry.image.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-7 flex items-baseline gap-4">
                  <span className="font-tech text-xs tracking-[0.2em] text-moss">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-tight text-forest md:text-[1.65rem]">
                    {industry.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-bark/60">{industry.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-fern transition-colors duration-300 group-hover:text-forest">
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

function ScienceSection() {
  return (
    <section id="science" className="scroll-mt-28 bg-parchment py-28 md:py-40">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-mist/80 blur-3xl"
              />
              <div className="relative overflow-hidden rounded-[28px] shadow-ambient">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80"
                  alt="Tall forest path with sunlight filtering through the canopy"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-10 right-2 w-40 rotate-2 overflow-hidden rounded-[20px] border-[6px] border-cream shadow-ambient transition-transform duration-500 hover:rotate-0 md:-right-10 md:w-56">
                <img
                  src="https://images.unsplash.com/photo-1466781783364-36c955e42a7f?auto=format&fit=crop&w=640&q=80"
                  alt="Laboratory glassware during botanical analysis"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow accent="text-moss">The Fenchem legacy</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.08] tracking-tight text-forest md:text-5xl lg:text-6xl">
                Rooted in Nature,
                <br />
                <em className="italic text-moss">Refined by Science.</em>
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-bark/65">
                Our journey began with a simple belief: that nature holds the keys to human
                vitality. Today we manage a global network of sustainable farms and advanced
                laboratories to bring those keys to our partners, lot after lot.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stats.map((stat, i) => (
                <Reveal key={stat.value} delay={i * 0.08}>
                  <div className="h-full rounded-[20px] border border-pebble bg-white/70 px-6 py-5 shadow-lift transition-colors duration-300 hover:border-mint hover:bg-mint/30">
                    <span className="font-display text-3xl font-light text-forest md:text-4xl">
                      {stat.value}
                    </span>
                    <p className="mt-1.5 text-xs leading-relaxed text-bark/55 md:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="mt-24 border-t border-pebble pt-16 md:mt-32 md:pt-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal key={pillar.title} delay={i * 0.12}>
                  <div className="group">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mint text-fern transition-colors duration-300 group-hover:bg-mist">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-forest">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-bark/60">
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

function IngredientsSection() {
  return (
    <section id="ingredients" className="scroll-mt-28 py-28 md:py-40">
      <div className="mx-auto max-w-[1080px] px-6 text-center md:px-12">
        <Reveal>
          <Eyebrow accent="text-moss" className="text-center">The portfolio</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-light tracking-tight text-forest md:text-5xl lg:text-6xl">
            A <em className="italic text-moss">living library</em> of botanical actives
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-bark/60 md:text-lg">
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
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-mint px-6 py-3 font-body text-sm font-medium text-fern transition-all duration-300 hover:-translate-y-0.5 hover:bg-mist hover:shadow-lift"
            >
              <Leaf
                className="h-3.5 w-3.5 text-moss transition-transform duration-300 group-hover:rotate-12"
                aria-hidden
              />
              {ingredient.name}
            </a>
          ))}
        </Reveal>
        <Reveal delay={0.3} className="mt-12">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-fern transition-colors duration-300 hover:text-forest"
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

function QualitySection() {
  return (
    <section id="quality" className="scroll-mt-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16">
        <Reveal>
          <div className="flex flex-col items-center gap-6 border-y border-pebble py-10 md:flex-row md:justify-between md:py-12">
            <p className="font-tech text-[10px] uppercase tracking-[0.3em] text-bark/40 md:text-[11px]">
              Certified quality systems
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="font-tech text-xs uppercase tracking-[0.2em] text-moss transition-colors duration-300 hover:text-forest"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section id="contact" className="scroll-mt-28 py-28 md:py-40">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] bg-stone px-6 py-20 text-center md:px-20 md:py-28">
            <div
              aria-hidden
              className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-mint/60 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-mist/70 blur-3xl"
            />
            <div className="relative">
              <Eyebrow accent="text-moss" className="text-center">Start the conversation</Eyebrow>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-light leading-[1.08] tracking-tight text-forest md:text-6xl">
                Let&rsquo;s formulate <em className="italic text-moss">what&rsquo;s next.</em>
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-bark/60 md:text-lg">
                From first sample to full-scale supply — tell us what you&rsquo;re building and our
                technical team will respond within one business day.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-9 py-4 font-body text-sm font-semibold tracking-wide text-cream shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-fern hover:shadow-ambient"
                >
                  Partner with Fenchem
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </button>
                <a
                  href="#ingredients"
                  className="inline-flex items-center gap-2 rounded-full border border-moss/40 px-9 py-4 font-body text-sm font-semibold tracking-wide text-forest transition-colors duration-300 hover:border-moss hover:bg-mint/40"
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

function FooterSection() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-20 md:px-12 md:pt-28 lg:px-16">
        <Reveal>
          <p className="font-tech text-[10px] uppercase tracking-[0.3em] text-mist/50 md:text-[11px]">
            Rooted in Nature, Refined by Science
          </p>
          <p className="mt-6 font-display text-[clamp(4rem,13vw,10rem)] font-light leading-[0.95] tracking-tight">
            Fenchem<span className="text-mint">.</span>
          </p>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          <Reveal>
            <p className="max-w-xs text-sm leading-relaxed text-mist/70">
              A global B2B supplier of botanical and functional ingredients for nutrition, food
              &amp; beverage and personal care — since 1995.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-mist/40">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-mist/70 transition-colors duration-300 hover:text-mint"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-sm text-mist/70 transition-colors duration-300 hover:text-mint"
                >
                  Partner with Us
                </a>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-mist/40">
              Global bases
            </p>
            <ul className="mt-5 space-y-3">
              {regions.map((region) => (
                <li key={region.city} className="text-sm text-mist/70">
                  {`${region.city}, ${region.country}${region.city === "Nanjing" ? " — HQ" : ""}`}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 md:flex-row">
          <p className="text-xs text-mist/50">© 2026 Fenchem Biotek Ltd. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <button
              type="button"
              className="text-xs text-mist/50 transition-colors duration-300 hover:text-mint"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className="text-xs text-mist/50 transition-colors duration-300 hover:text-mint"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function VariantA() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 72]);

  return (
    <LazyMotion features={domAnimation} strict>
      <main className="overflow-x-clip bg-cream font-body text-bark antialiased selection:bg-mint selection:text-forest">
        <NavBar />
        <HeroSection heroRef={heroRef} blobY={blobY} />
        <IndustriesSection />
        <ScienceSection />
        <IngredientsSection />
        <QualitySection />
        <CtaSection />
        <FooterSection />
      </main>
    </LazyMotion>
  );
}
