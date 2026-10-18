/*
 * PROTOTYPE — Variant C: "Deep Forest"
 * Immersive cinematic dark luxury. Full-viewport hero, story chapters with
 * parallax, horizontal scroll-snap ingredient rail, glowing mint CTA.
 * New direction — no Stitch base. See PROTOTYPE-BRIEF.md.
 */
import { getFeaturedIngredients, pillars } from "@/components/landing/landing-content";
import { Reveal } from "@/components/prototype/motion";
import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  FlaskConical,
  Globe2,
  Sprout,
} from "@fenchem-lp/ui/components/lucide";
import { domAnimation, LazyMotion, m, useScroll, useTransform } from "@/compat/motion";
import { createSignal } from "solid-js";

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

const styles = stylex.create({
  main: {
    backgroundColor: colors.bark,
    fontFamily: typography.body,
    color: colors.cream,
    WebkitFontSmoothing: "antialiased",
  },
  // Nav
  nav: {
    position: "fixed",
    left: { default: "1rem", [breakpoints.md]: 0 },
    right: { default: "1rem", [breakpoints.md]: 0 },
    top: { default: "1rem", [breakpoints.md]: "1.5rem" },
    zIndex: 50,
  },
  navInner: {
    marginInline: "auto",
    display: "flex",
    maxWidth: "880px",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingBlock: "0.5rem",
    paddingLeft: "1.5rem",
    paddingRight: "0.5rem",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
  },
  navLogo: {
    fontFamily: typography.display,
    color: colors.cream,
    fontSize: "1.25rem",
    letterSpacing: "-0.025em",
    textDecoration: "none",
  },
  navLinksWrapper: {
    display: { default: "none", [breakpoints.md]: "flex" },
    alignItems: "center",
    gap: "1.75rem",
  },
  navLink: {
    color: {
      default: "color-mix(in oklab, var(--color-cream) 60%, transparent)",
      ":hover": colors.cream,
    },
    fontSize: "0.875rem",
    transitionProperty: "color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  navInquireBtn: {
    borderRadius: radii.full,
    backgroundColor: colors.mint,
    paddingInline: "1.25rem",
    paddingBlock: "0.625rem",
    fontWeight: 600,
    color: colors.forest,
    fontSize: "0.875rem",
    boxShadow: {
      default: "0 0 24px color-mix(in oklab, var(--color-mint) 25%, transparent)",
      ":hover": "0 0 40px color-mix(in oklab, var(--color-mint) 45%, transparent)",
    },
    transitionProperty: "box-shadow",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  // Hero
  heroHeader: {
    position: "relative",
    display: "flex",
    minHeight: "100svh",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroBgDiv: {
    position: "absolute",
    inset: 0,
  },
  heroBgImg: {
    height: "100%",
    width: "100%",
    transform: "scale(1.1)",
    objectFit: "cover",
    display: "block",
  },
  heroGradientOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(to bottom, color-mix(in oklab, var(--color-bark) 80%, transparent), color-mix(in oklab, var(--color-forest) 40%, transparent), var(--color-bark))",
  },
  heroTextContainer: {
    position: "relative",
    zIndex: 10,
    paddingInline: "1.5rem",
    textAlign: "center",
  },
  heroEyebrow: {
    fontFamily: typography.tech,
    fontSize: { default: "11px", [breakpoints.md]: "12px" },
    color: colors.mint,
    textTransform: "uppercase",
    letterSpacing: "0.45em",
  },
  heroTitle: {
    marginInline: "auto",
    marginTop: "2rem",
    maxWidth: "80rem",
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: "clamp(3rem, 9vw, 7.5rem)",
    color: colors.cream,
    lineHeight: 1.02,
    letterSpacing: "-0.02em",
  },
  heroMistItalic: {
    color: colors.mist,
    fontStyle: "italic",
  },
  heroDesc: {
    marginInline: "auto",
    marginTop: "2rem",
    maxWidth: "36rem",
    color: "color-mix(in oklab, var(--color-cream) 70%, transparent)",
    fontSize: "1.125rem",
    lineHeight: 1.625,
  },
  heroButtons: {
    marginTop: "3rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  heroPrimaryBtn: {
    borderRadius: radii.full,
    backgroundColor: colors.mint,
    paddingInline: "2.25rem",
    paddingBlock: "1rem",
    fontWeight: 600,
    color: colors.forest,
    fontSize: "0.875rem",
    boxShadow: {
      default: "0 0 32px color-mix(in oklab, var(--color-mint) 30%, transparent)",
      ":hover": "0 0 56px color-mix(in oklab, var(--color-mint) 50%, transparent)",
    },
    transitionProperty: "box-shadow",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  heroSecondaryBtn: {
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "color-mix(in oklab, var(--color-cream) 25%, transparent)",
      ":hover": "color-mix(in oklab, var(--color-cream) 60%, transparent)",
    },
    paddingInline: "2.25rem",
    paddingBlock: "1rem",
    fontWeight: 600,
    color: colors.cream,
    fontSize: "0.875rem",
    backgroundColor: {
      default: "transparent",
      ":hover": "rgba(255, 255, 255, 0.05)",
    },
    transitionProperty: "border-color, background-color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  scrollChevron: {
    position: "absolute",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
    color: {
      default: "color-mix(in oklab, var(--color-cream) 50%, transparent)",
      ":hover": colors.mint,
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  chevronIcon: {
    width: "1.5rem",
    height: "1.5rem",
  },
  // Stats
  statsSection: {
    position: "relative",
    paddingInline: "1.5rem",
    paddingBlock: { default: "6rem", [breakpoints.md]: "8rem" },
  },
  statsGrid: {
    marginInline: "auto",
    display: "grid",
    maxWidth: "64rem",
    gap: "1.25rem",
    gridTemplateColumns: { default: "1fr", [breakpoints.sm]: "repeat(3, 1fr)" },
  },
  statCard: {
    borderRadius: "24px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "rgba(255, 255, 255, 0.1)",
      ":hover": "color-mix(in oklab, var(--color-mint) 40%, transparent)",
    },
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingInline: "2rem",
    paddingBlock: "2.5rem",
    textAlign: "center",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    transitionProperty: "border-color",
    transitionDuration: "500ms",
  },
  statNumber: {
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: { default: "3rem", [breakpoints.md]: "3.75rem" },
    color: colors.mist,
  },
  statLabel: {
    marginTop: "0.75rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    color: "color-mix(in oklab, var(--color-cream) 50%, transparent)",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  },
  // Chapters
  chapterImgBox: {
    position: "relative",
    height: { default: "60vh", [breakpoints.md]: "78vh" },
    overflow: "hidden",
    borderRadius: "28px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  chapterImg: {
    position: "absolute",
    inset: 0,
    height: "116%",
    width: "100%",
    objectFit: "cover",
  },
  chapterImgOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(to top, color-mix(in oklab, var(--color-bark) 70%, transparent), transparent, color-mix(in oklab, var(--color-bark) 30%, transparent))",
  },
  originSection: {
    scrollMarginTop: "6rem",
    paddingInline: "1.5rem",
    paddingBlock: { default: "4rem", [breakpoints.md]: "6rem" },
  },
  chapterGrid: {
    marginInline: "auto",
    display: "grid",
    maxWidth: "72rem",
    alignItems: "center",
    gap: "3.5rem",
    gridTemplateColumns: { default: "1fr", [breakpoints.lg]: "repeat(2, 1fr)" },
  },
  originTextCol: {
    paddingLeft: { default: 0, [breakpoints.lg]: "2rem" },
  },
  chapterEyebrow: {
    fontFamily: typography.tech,
    fontSize: "11px",
    color: colors.mint,
    textTransform: "uppercase",
    letterSpacing: "0.4em",
  },
  chapterTitle: {
    marginTop: "1.5rem",
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: { default: "2.25rem", [breakpoints.md]: "3.75rem" },
    color: colors.cream,
    lineHeight: 1.08,
    letterSpacing: "-0.025em",
  },
  chapterCopy: {
    marginTop: "2rem",
    maxWidth: "28rem",
    color: "color-mix(in oklab, var(--color-cream) 65%, transparent)",
    lineHeight: 1.625,
    fontSize: { default: "1rem", [breakpoints.md]: "1.125rem" },
  },
  originQuote: {
    marginTop: "2.5rem",
    borderLeftWidth: "2px",
    borderLeftStyle: "solid",
    borderLeftColor: "color-mix(in oklab, var(--color-mint) 30%, transparent)",
    paddingLeft: "1.5rem",
    fontFamily: typography.display,
    fontSize: { default: "1.5rem", [breakpoints.md]: "1.875rem" },
    color: colors.mist,
    fontStyle: "italic",
    lineHeight: 1.375,
  },
  scienceSection: {
    scrollMarginTop: "6rem",
    paddingInline: "1.5rem",
    paddingBlock: { default: "4rem", [breakpoints.md]: "6rem" },
  },
  scienceTextCol: {
    order: { default: 2, [breakpoints.lg]: 1 },
    paddingRight: { default: 0, [breakpoints.lg]: "2rem" },
  },
  scienceImgCol: {
    order: { default: 1, [breakpoints.lg]: 2 },
  },
  scienceLink: {
    marginTop: "2.5rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.75rem",
    color: {
      default: colors.mint,
      ":hover": colors.mist,
    },
    fontSize: "0.875rem",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    transitionProperty: "color",
    transitionDuration: "150ms",
    textDecoration: "none",
  },
  iconSm: {
    width: "1rem",
    height: "1rem",
  },
  // Portfolio Rail
  portfolioSection: {
    scrollMarginTop: "6rem",
    paddingBlock: { default: "6rem", [breakpoints.md]: "8rem" },
  },
  portfolioHeaderWrap: {
    marginInline: "auto",
    maxWidth: "72rem",
    paddingInline: "1.5rem",
  },
  portfolioHeaderFlex: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "1.5rem",
  },
  portfolioScrollTag: {
    fontFamily: typography.tech,
    fontSize: "11px",
    color: "color-mix(in oklab, var(--color-cream) 55%, transparent)",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
  },
  portfolioRailScroll: {
    marginTop: "3.5rem",
    overflowX: "auto",
    paddingBottom: "1.5rem",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  portfolioRailTrack: {
    display: "flex",
    scrollSnapType: "x mandatory",
    gap: "1.5rem",
    paddingInline: {
      default: "1.5rem",
      [breakpoints.md]: "max(1.5rem, calc((100vw - 72rem) / 2))",
    },
  },
  portfolioRailItem: {
    scrollSnapAlign: "start",
  },
  ingredientCard: {
    width: { default: "300px", [breakpoints.md]: "340px" },
    flexShrink: 0,
    overflow: "hidden",
    borderRadius: "24px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "rgba(255, 255, 255, 0.1)",
      ":hover": "color-mix(in oklab, var(--color-mint) 40%, transparent)",
    },
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    transitionProperty: "border-color",
    transitionDuration: "500ms",
  },
  ingredientCardImgWrap: {
    height: "13rem",
    overflow: "hidden",
  },
  ingredientCardImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    transform: {
      default: "scale(1)",
      ":hover": "scale(1.05)",
    },
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
  },
  ingredientCardBody: {
    padding: "1.75rem",
  },
  ingredientCardTitle: {
    fontFamily: typography.display,
    fontSize: "1.5rem",
    color: colors.cream,
  },
  ingredientCardLatin: {
    marginTop: "0.25rem",
    color: "color-mix(in oklab, var(--color-cream) 55%, transparent)",
    fontSize: "0.875rem",
    fontStyle: "italic",
  },
  ingredientCardDl: {
    marginTop: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.625rem",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    paddingTop: "1.25rem",
  },
  ingredientCardDlRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "1rem",
  },
  ingredientCardDt: {
    fontFamily: typography.tech,
    fontSize: "10px",
    color: "color-mix(in oklab, var(--color-mint) 70%, transparent)",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  },
  ingredientCardDd: {
    fontFamily: typography.tech,
    color: "color-mix(in oklab, var(--color-cream) 70%, transparent)",
    fontSize: "0.75rem",
  },
  // Standards Pillars
  standardsSection: {
    scrollMarginTop: "6rem",
    paddingInline: "1.5rem",
    paddingBlock: { default: "4rem", [breakpoints.md]: "6rem" },
  },
  standardsGrid: {
    marginInline: "auto",
    display: "grid",
    maxWidth: "72rem",
    gap: "1.5rem",
    gridTemplateColumns: { default: "1fr", [breakpoints.md]: "repeat(3, 1fr)" },
  },
  pillarCard: {
    height: "100%",
    borderRadius: "24px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "rgba(255, 255, 255, 0.1)",
      ":hover": "color-mix(in oklab, var(--color-mint) 40%, transparent)",
    },
    backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.07), transparent)",
    padding: "2.25rem",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    transitionProperty: "border-color",
    transitionDuration: "500ms",
  },
  pillarIconBox: {
    display: "flex",
    height: "3rem",
    width: "3rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "color-mix(in oklab, var(--color-mint) 30%, transparent)",
    color: colors.mint,
  },
  pillarIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },
  pillarTitle: {
    marginTop: "1.75rem",
    fontFamily: typography.display,
    fontSize: "1.5rem",
    color: colors.cream,
  },
  pillarCopy: {
    marginTop: "0.75rem",
    color: "color-mix(in oklab, var(--color-cream) 55%, transparent)",
    fontSize: "0.875rem",
    lineHeight: 1.625,
  },
  // CTA
  ctaSection: {
    position: "relative",
    scrollMarginTop: "6rem",
    overflow: "hidden",
    paddingInline: "1.5rem",
    paddingBlock: { default: "8rem", [breakpoints.md]: "11rem" },
    textAlign: "center",
  },
  ctaGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "28rem",
    width: "28rem",
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklab, var(--color-mint) 10%, transparent)",
    filter: "blur(48px)",
  },
  ctaContentWrap: {
    position: "relative",
  },
  ctaEyebrow: {
    fontFamily: typography.tech,
    fontSize: "11px",
    color: colors.mint,
    textTransform: "uppercase",
    letterSpacing: "0.45em",
  },
  ctaHeading: {
    marginInline: "auto",
    marginTop: "2rem",
    maxWidth: "48rem",
    fontFamily: typography.display,
    fontWeight: 300,
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
    color: colors.cream,
    lineHeight: 1.05,
    letterSpacing: "-0.025em",
  },
  ctaBtn: {
    marginTop: "3rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.75rem",
    borderRadius: radii.full,
    backgroundColor: colors.mint,
    paddingInline: "2.5rem",
    paddingBlock: "1.25rem",
    fontWeight: 600,
    color: colors.forest,
    fontSize: "0.875rem",
    boxShadow: {
      default: "0 0 40px color-mix(in oklab, var(--color-mint) 35%, transparent)",
      ":hover": "0 0 72px color-mix(in oklab, var(--color-mint) 55%, transparent)",
    },
    transitionProperty: "box-shadow",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  // Site footer
  footer: {
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundImage: "linear-gradient(to bottom, var(--color-bark), #000000)",
    paddingInline: "1.5rem",
    paddingTop: "4rem",
    paddingBottom: "2.5rem",
  },
  footerContainer: {
    marginInline: "auto",
    display: "flex",
    maxWidth: "72rem",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    textAlign: "center",
  },
  footerTitle: {
    fontFamily: typography.display,
    fontSize: "1.875rem",
    color: "color-mix(in oklab, var(--color-cream) 80%, transparent)",
  },
  footerNav: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "2rem",
    rowGap: "0.75rem",
  },
  footerLink: {
    color: {
      default: "color-mix(in oklab, var(--color-cream) 55%, transparent)",
      ":hover": colors.mint,
    },
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    transitionProperty: "color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  footerCopyright: {
    fontFamily: typography.tech,
    fontSize: "10px",
    color: "color-mix(in oklab, var(--color-cream) 50%, transparent)",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
  },
});

function ChapterImage(props: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  const [ref, setRef] = createSignal<HTMLDivElement>();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={setRef} {...stylex.attrs(styles.chapterImgBox)}>
      <m.img
        src={props.src}
        alt={props.alt}
        style={{ y: reduce() ? 0 : y }}
        {...stylex.attrs(styles.chapterImg)}
        loading="lazy"
      />
      <div aria-hidden="true" {...stylex.attrs(styles.chapterImgOverlay)} />
    </div>
  );
}

function HeroNav(props: { reduce: boolean | null }) {
  return (
    <m.nav
      initial={props.reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      {...stylex.attrs(styles.nav)}
    >
      <div {...stylex.attrs(styles.navInner)}>
        <a href="#top" {...stylex.attrs(styles.navLogo)}>
          Fenchem
        </a>
        <div {...stylex.attrs(styles.navLinksWrapper)}>
          {NAV_LINKS.map((link) => (
            <a href={link.href} {...stylex.attrs(styles.navLink)}>
              {link.label}
            </a>
          ))}
        </div>
        <a href="#contact" {...stylex.attrs(styles.navInquireBtn)}>
          Inquire
        </a>
      </div>
    </m.nav>
  );
}

function HeroHeader(props: { reduce: boolean | null }) {
  const [heroRef, setHeroRef] = createSignal<HTMLElement>();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <header id="top" ref={setHeroRef} {...stylex.attrs(styles.heroHeader)}>
      <m.div style={{ y: props.reduce ? 0 : heroY }} {...stylex.attrs(styles.heroBgDiv)}>
        <img
          src={img("photo-1569936906148-06de87cb0681", 2000)}
          alt="Sunlight breaking through a deep forest canopy"
          {...stylex.attrs(styles.heroBgImg)}
          loading="eager"
        />
      </m.div>
      <div aria-hidden="true" {...stylex.attrs(styles.heroGradientOverlay)} />

      <m.div
        style={{ opacity: props.reduce ? 1 : heroFade }}
        {...stylex.attrs(styles.heroTextContainer)}
      >
        <m.p
          initial={props.reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          {...stylex.attrs(styles.heroEyebrow)}
        >
          Botanical Intelligence Since 1995
        </m.p>
        <m.h1
          initial={props.reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
          {...stylex.attrs(styles.heroTitle)}
        >
          Rooted in Nature,
          <br />
          <em {...stylex.attrs(styles.heroMistItalic)}>Refined by Science.</em>
        </m.h1>
        <m.p
          initial={props.reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: EASE }}
          {...stylex.attrs(styles.heroDesc)}
        >
          Premium botanical ingredients for the world&rsquo;s most demanding formulations — grown
          with patience, perfected in the laboratory.
        </m.p>
        <m.div
          initial={props.reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE }}
          {...stylex.attrs(styles.heroButtons)}
        >
          <a href="#portfolio" {...stylex.attrs(styles.heroPrimaryBtn)}>
            Explore the Portfolio
          </a>
          <a href="#origin" {...stylex.attrs(styles.heroSecondaryBtn)}>
            Our Story
          </a>
        </m.div>
      </m.div>

      <m.a
        href="#origin"
        aria-label="Scroll to story"
        animate={props.reduce ? undefined : { y: [0, 8, 0] }}
        transition={
          props.reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
        {...stylex.attrs(styles.scrollChevron)}
      >
        <ChevronDown {...stylex.attrs(styles.chevronIcon)} />
      </m.a>
    </header>
  );
}

function StatsBand() {
  return (
    <section {...stylex.attrs(styles.statsSection)}>
      <div {...stylex.attrs(styles.statsGrid)}>
        {[
          ["30+", "Years of botanical R&D"],
          ["6", "Global production bases"],
          ["40+", "Markets with full dossiers"],
        ].map(([stat, label], i) => (
          <Reveal delay={i * 0.1}>
            <div {...stylex.attrs(styles.statCard)}>
              <p {...stylex.attrs(styles.statNumber)}>{stat}</p>
              <p {...stylex.attrs(styles.statLabel)}>{label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function OriginChapter() {
  return (
    <section id="origin" {...stylex.attrs(styles.originSection)}>
      <div {...stylex.attrs(styles.chapterGrid)}>
        <Reveal>
          <ChapterImage
            src={img("photo-1741513599050-487ccfb86275", 1200)}
            alt="Dense green foliage in soft light"
          />
        </Reveal>
        <div {...stylex.attrs(styles.originTextCol)}>
          <Reveal>
            <p {...stylex.attrs(styles.chapterEyebrow)}>01 — Origin</p>
            <h2 {...stylex.attrs(styles.chapterTitle)}>
              Grown with <em {...stylex.attrs(styles.heroMistItalic)}>patience.</em>
            </h2>
            <p {...stylex.attrs(styles.chapterCopy)}>
              Our botanicals begin in soil we know by name — a global network of partner farms
              cultivated over decades, where harvests are timed to the plant, never to the quarter.
            </p>
            <blockquote {...stylex.attrs(styles.originQuote)}>
              &ldquo;Nature holds the keys to human vitality. We simply refuse to lose them in
              translation.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ScienceChapter() {
  return (
    <section id="science" {...stylex.attrs(styles.scienceSection)}>
      <div {...stylex.attrs(styles.chapterGrid)}>
        <div {...stylex.attrs(styles.scienceTextCol)}>
          <Reveal>
            <p {...stylex.attrs(styles.chapterEyebrow)}>02 — Science</p>
            <h2 {...stylex.attrs(styles.chapterTitle)}>
              Refined to the <em {...stylex.attrs(styles.heroMistItalic)}>molecule.</em>
            </h2>
            <p {...stylex.attrs(styles.chapterCopy)}>
              Every extract passes through clinical-grade validation — identity, potency, stability
              — before it carries the Fenchem name. 98% bio-active retention across our extraction
              process is not a goal; it is the specification.
            </p>
            <a href="#portfolio" {...stylex.attrs(styles.scienceLink)}>
              See what we make
              <ArrowRight {...stylex.attrs(styles.iconSm)} />
            </a>
          </Reveal>
        </div>
        <Reveal sx={styles.scienceImgCol}>
          <ChapterImage
            src={img("photo-1601961545517-59307b1fbac3", 1200)}
            alt="Biotech laboratory with microscope under red light"
          />
        </Reveal>
      </div>
    </section>
  );
}

function IngredientRail() {
  return (
    <section id="portfolio" {...stylex.attrs(styles.portfolioSection)}>
      <div {...stylex.attrs(styles.portfolioHeaderWrap)}>
        <Reveal sx={styles.portfolioHeaderFlex}>
          <div>
            <p {...stylex.attrs(styles.chapterEyebrow)}>03 — Portfolio</p>
            <h2 {...stylex.attrs(styles.chapterTitle)}>
              The <em {...stylex.attrs(styles.heroMistItalic)}>living</em> library
            </h2>
          </div>
          <p {...stylex.attrs(styles.portfolioScrollTag)}>Scroll &rarr;</p>
        </Reveal>
      </div>
      <div {...stylex.attrs(styles.portfolioRailScroll)}>
        <div {...stylex.attrs(styles.portfolioRailTrack)}>
          {getFeaturedIngredients().map((item, i) => (
            <Reveal delay={Math.min(i * 0.08, 0.3)} sx={styles.portfolioRailItem}>
              <article {...stylex.attrs(styles.ingredientCard)}>
                <div {...stylex.attrs(styles.ingredientCardImgWrap)}>
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    {...stylex.attrs(styles.ingredientCardImg)}
                    loading="lazy"
                  />
                </div>
                <div {...stylex.attrs(styles.ingredientCardBody)}>
                  <h3 {...stylex.attrs(styles.ingredientCardTitle)}>{item.name}</h3>
                  <p {...stylex.attrs(styles.ingredientCardLatin)}>{item.latin}</p>
                  <dl {...stylex.attrs(styles.ingredientCardDl)}>
                    {[
                      ["Purity", item.purity],
                      ["Form", item.form],
                    ].map(([k, v]) => (
                      <div {...stylex.attrs(styles.ingredientCardDlRow)}>
                        <dt {...stylex.attrs(styles.ingredientCardDt)}>{k}</dt>
                        <dd {...stylex.attrs(styles.ingredientCardDd)}>{v}</dd>
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
    <section id="standards" {...stylex.attrs(styles.standardsSection)}>
      <div {...stylex.attrs(styles.standardsGrid)}>
        {pillars.map((pillar, i) => {
          const Icon = PILLAR_DETAIL[i].icon;
          return (
            <Reveal delay={i * 0.1}>
              <div {...stylex.attrs(styles.pillarCard)}>
                <span {...stylex.attrs(styles.pillarIconBox)}>
                  <Icon {...stylex.attrs(styles.pillarIcon)} aria-hidden="true" />
                </span>
                <h3 {...stylex.attrs(styles.pillarTitle)}>{pillar.title}</h3>
                <p {...stylex.attrs(styles.pillarCopy)}>{PILLAR_DETAIL[i].copy}</p>
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
    <section id="contact" {...stylex.attrs(styles.ctaSection)}>
      <div aria-hidden="true" {...stylex.attrs(styles.ctaGlow)} />
      <Reveal sx={styles.ctaContentWrap}>
        <p {...stylex.attrs(styles.ctaEyebrow)}>Partner with Fenchem</p>
        <h2 {...stylex.attrs(styles.ctaHeading)}>
          Bring the forest to <em {...stylex.attrs(styles.heroMistItalic)}>your formulation.</em>
        </h2>
        <a href="#top" {...stylex.attrs(styles.ctaBtn)}>
          Request a Specification
          <ArrowUpRight {...stylex.attrs(styles.iconSm)} />
        </a>
      </Reveal>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer {...stylex.attrs(styles.footer)}>
      <div {...stylex.attrs(styles.footerContainer)}>
        <p {...stylex.attrs(styles.footerTitle)}>Fenchem</p>
        <nav {...stylex.attrs(styles.footerNav)}>
          {["Privacy Policy", "Terms of Service", "Ingredient Transparency", "Global Offices"].map(
            (l) => (
              <a href="#top" {...stylex.attrs(styles.footerLink)}>
                {l}
              </a>
            ),
          )}
        </nav>
        <p {...stylex.attrs(styles.footerCopyright)}>
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
      <main {...stylex.attrs(styles.main)}>
        <HeroNav reduce={reduce()} />
        <HeroHeader reduce={reduce()} />
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
