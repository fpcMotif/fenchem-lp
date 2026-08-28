import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { HERO, IMAGES, TECH_LABEL_DARK } from "../content";
import { EASE_OUT, SplitWords, useSectionAnimation } from "../motion";

/*
 * Variant I — cinematic hero. Full-viewport botanical photograph under a
 * bark scrim; cream Newsreader headline revealed word-by-word; one green
 * primary CTA. Scroll scrubs a slow parallax while the scrim deepens.
 * The SSR frame is complete: image, scrim, and copy are all visible
 * without JavaScript.
 */
export function HeroSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
    tl.from(
      root.querySelectorAll("[data-hero-eyebrow]"),
      { y: 22, autoAlpha: 0, duration: 0.7 },
      0.15,
    )
      .from(
        root.querySelectorAll(".vi-word-inner"),
        { yPercent: 112, duration: 1, stagger: 0.055 },
        0.3,
      )
      .from(
        root.querySelectorAll("[data-hero-lede], [data-hero-ctas]"),
        { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.12 },
        0.95,
      )
      .from(root.querySelector("[data-hero-scroll]"), { autoAlpha: 0, duration: 0.6 }, 1.5);

    gsap.to(root.querySelector("[data-hero-img]"), {
      yPercent: 14,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(root.querySelector("[data-hero-deepen]"), {
      opacity: 0.75,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom 30%", scrub: true },
    });
  });

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-bark"
    >
      <div data-hero-img className="absolute inset-0 will-change-transform">
        <img
          src={IMAGES.hero.src}
          alt={IMAGES.hero.alt}
          className="h-full w-full scale-110 object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-bark/80 via-forest/40 to-bark"
      />
      <div aria-hidden="true" data-hero-deepen className="absolute inset-0 bg-bark opacity-0" />

      <div className="relative z-10 max-w-5xl px-6 pt-24 pb-16 text-center">
        <p data-hero-eyebrow className={TECH_LABEL_DARK}>
          {HERO.eyebrow}
        </p>
        <h1 className="mx-auto mt-8 font-display font-light text-[clamp(3rem,8.5vw,7rem)] text-cream leading-[1.04] tracking-[-0.02em]">
          <SplitWords
            segments={[
              { text: "Rooted in Nature," },
              { text: "Refined by Science.", className: "italic text-mist" },
            ]}
          />
        </h1>
        <p data-hero-lede className="mx-auto mt-8 max-w-xl text-cream/75 text-lg leading-relaxed">
          {HERO.lede}
        </p>
        <div data-hero-ctas className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#ingredients"
            className="rounded-full bg-brand-green-500 px-7 py-3.5 font-semibold text-brand-green-950 text-sm transition-colors hover:bg-brand-green-400 focus-visible:outline-2 focus-visible:outline-cream"
          >
            {HERO.primaryCta}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-cream/30 px-7 py-3.5 font-semibold text-cream text-sm transition-colors hover:border-cream/70 hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-brand-green-300"
          >
            {HERO.secondaryCta}
          </a>
        </div>
      </div>

      <a
        data-hero-scroll
        href="#ticker"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-cream/60 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-brand-green-300"
      >
        <ChevronDown aria-hidden="true" className="size-5" />
      </a>
    </section>
  );
}
