import { colors, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { HERO, IMAGES } from "../content";
import { EASE_OUT, SplitWords, useSectionAnimation } from "../motion";
import { sharedStyles } from "../styles";

/*
 * Variant I — cinematic hero. Full-viewport botanical photograph under a
 * bark scrim; cream Newsreader headline revealed word-by-word; one green
 * primary CTA. Scroll scrubs a slow parallax while the scrim deepens.
 * The SSR frame is complete: image, scrim, and copy are all visible
 * without JavaScript.
 */

const styles = stylex.create({
  section: {
    position: "relative",
    display: "flex",
    minHeight: "100svh",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.bark,
  },
  imgWrap: {
    position: "absolute",
    inset: 0,
    willChange: "transform",
  },
  img: {
    height: "100%",
    width: "100%",
    transform: "scale(1.1)",
    objectFit: "cover",
  },
  scrim: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(to bottom, color-mix(in oklch, var(--color-bark) 80%, transparent), color-mix(in oklch, var(--color-forest) 40%, transparent), var(--color-bark))",
  },
  deepen: {
    position: "absolute",
    inset: 0,
    backgroundColor: colors.bark,
    opacity: 0,
  },
  content: {
    position: "relative",
    zIndex: 10,
    maxWidth: "64rem",
    paddingInline: "1.5rem",
    paddingTop: "6rem",
    paddingBottom: "4rem",
    textAlign: "center",
    marginInline: "auto",
  },
  heading: {
    marginInline: "auto",
    marginTop: "2rem",
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: "clamp(3rem, 8.5vw, 7rem)",
    color: colors.cream,
    lineHeight: 1.04,
    letterSpacing: "-0.02em",
  },
  headingItalic: {
    fontStyle: "italic",
    color: colors.mist,
  },
  lede: {
    marginInline: "auto",
    marginTop: "2rem",
    maxWidth: "36rem",
    color: "color-mix(in oklch, var(--color-cream) 75%, transparent)",
    fontSize: "1.125rem",
    lineHeight: 1.625,
  },
  ctas: {
    marginTop: "2.5rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  scrollButton: {
    position: "absolute",
    bottom: "1.5rem",
    left: "50%",
    zIndex: 10,
    transform: "translateX(-50%)",
    color: {
      default: "color-mix(in oklch, var(--color-cream) 60%, transparent)",
      ":hover": colors.cream,
    },
    transition: "color 200ms ease",
    outline: {
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  chevronIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },
});

export function HeroSection() {
  const ref = useSectionAnimation<HTMLElement>((root) => {
    const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
    tl.from(
      root.querySelectorAll("[data-hero-eyebrow]"),
      { y: 22, autoAlpha: 0, duration: 0.7 },
      0.15,
    )
      .from(
        root.querySelectorAll("[data-word-inner], .vi-word-inner"),
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
    <section ref={ref} id="top" {...stylex.props(styles.section)}>
      <div data-hero-img {...stylex.props(styles.imgWrap)}>
        <img
          src={IMAGES.hero.src}
          alt={IMAGES.hero.alt}
          {...stylex.props(styles.img)}
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div aria-hidden="true" {...stylex.props(styles.scrim)} />
      <div aria-hidden="true" data-hero-deepen {...stylex.props(styles.deepen)} />

      <div {...stylex.props(styles.content)}>
        <p data-hero-eyebrow {...stylex.props(sharedStyles.techLabelDark)}>
          {HERO.eyebrow}
        </p>
        <h1 {...stylex.props(styles.heading)}>
          <SplitWords
            segments={[
              { text: "Rooted in Nature," },
              { text: "Refined by Science.", sx: styles.headingItalic },
            ]}
          />
        </h1>
        <p data-hero-lede {...stylex.props(styles.lede)}>
          {HERO.lede}
        </p>
        <div data-hero-ctas {...stylex.props(styles.ctas)}>
          <a href="#ingredients" {...stylex.props(sharedStyles.primaryCta)}>
            {HERO.primaryCta}
          </a>
          <a href="#global-supply" {...stylex.props(sharedStyles.secondaryCta)}>
            {HERO.secondaryCta}
          </a>
        </div>
      </div>

      <a
        data-hero-scroll
        href="#ticker"
        aria-label="Scroll to content"
        {...stylex.props(styles.scrollButton)}
      >
        <ChevronDown aria-hidden="true" {...stylex.props(styles.chevronIcon)} />
      </a>
    </section>
  );
}
