import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, type MouseEvent } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_BANNER, ABOUT_HERO } from "../../about-data";
import { CTA } from "../../content";
import type { AboutPageProps } from "../../index";
import { useActiveSection } from "../../use-active-section";
import { CultureStory } from "./culture";
import { CampusLoom } from "./loom";
import { Honors, Profile, Responsibility, Structure } from "./sections";
import { Reveal } from "./shared";
import { ui } from "./shared-values";
import { curve, media, tone, type } from "./tokens.stylex";

const HEADER_HEIGHT = 80;
const BAR_HEIGHT = 48;
const WARP = 16;
const SECTION_IDS = ABOUT_HERO.navChips.map((chip) => chip.id);
const NAV_WORDS: Record<string, string> = {
  "about-profile": "Profile",
  "about-campus": "Campus",
  "about-culture": "Culture",
  "about-csr": "Responsibility",
  "about-honor": "Honors",
  "about-structure": "Structure",
};

const warpRise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(22px)" },
  "100%": { opacity: 1, transform: "none" },
});

const warpFall = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(-22px)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  root: {
    position: "relative",
    backgroundColor: tone.paper,
    color: tone.ink,
    fontFamily: type.sans,
    WebkitFontSmoothing: "antialiased",
    "::selection": {
      backgroundColor: "rgba(48, 54, 97, 0.16)",
    },
  },

  banner: {
    paddingTop: {
      default: HEADER_HEIGHT + 40,
      [media.tablet]: HEADER_HEIGHT + 56,
      [media.wide]: HEADER_HEIGHT + 64,
    },
    paddingBottom: { default: 56, [media.wide]: 72 },
    backgroundColor: tone.paper,
  },
  bannerHead: {
    display: "flex",
    flexDirection: { default: "column", [media.wide]: "row" },
    alignItems: { default: "flex-start", [media.wide]: "flex-end" },
    justifyContent: "space-between",
    gap: { default: 18, [media.wide]: 48 },
  },
  title: {
    margin: 0,
    fontSize: { default: 44, [media.tablet]: 60, [media.wide]: 76 },
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  bannerAside: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxWidth: "26em",
    paddingBottom: { default: 0, [media.wide]: 6 },
  },
  bannerLead: {
    margin: 0,
    fontSize: { default: 15, [media.wide]: 16 },
    lineHeight: 1.9,
    letterSpacing: "0.04em",
    color: tone.body,
    textWrap: "pretty",
  },
  warp: {
    position: "relative",
    height: {
      default: 280,
      [media.tablet]: 420,
      [media.wide]: "clamp(420px, calc(100svh - 360px), 540px)",
    },
    marginTop: { default: 32, [media.wide]: 48 },
  },
  warpStrip: (index: number) => ({
    position: "absolute",
    top: 0,
    left: `${(index * 100) / WARP}%`,
    width: `calc(${100 / WARP}% - 3px)`,
    height: "100%",
    overflow: "hidden",
    backgroundColor: tone.page,
    animationDelay: `${120 + index * 40}ms`,
  }),
  warpSettle: {
    animationDuration: "900ms",
    animationTimingFunction: curve.out,
    animationFillMode: "both",
  },
  warpRise: {
    animationName: { default: "none", [media.motionOk]: warpRise },
  },
  warpFall: {
    animationName: { default: "none", [media.motionOk]: warpFall },
  },
  warpImage: (index: number) => ({
    position: "absolute",
    top: 0,
    left: `calc(${-index * 100}% - ${index * 3}px)`,
    width: `calc(${WARP * 100}% + ${WARP * 3}px)`,
    height: "100%",
    maxWidth: "none",
    objectFit: "cover",
    objectPosition: "50% 62%",
  }),

  bar: {
    position: "sticky",
    top: HEADER_HEIGHT,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    backdropFilter: "blur(14px)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  barInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 32,
    height: BAR_HEIGHT,
  },
  crumbs: {
    display: { default: "none", [media.wide]: "flex" },
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
    fontSize: 13,
    letterSpacing: "0.02em",
    color: tone.label,
  },
  crumbLink: {
    color: { default: tone.label, ":hover": tone.ink },
    textDecoration: "none",
  },
  crumbJoin: {
    color: tone.label,
  },
  sectionNav: {
    display: "flex",
    alignItems: "center",
    gap: { default: 22, [media.wide]: 32 },
    flexGrow: 1,
    justifyContent: { default: "flex-start", [media.wide]: "flex-end" },
    minWidth: 0,
    height: "100%",
    marginInline: { default: -16, [media.tablet]: -40, [media.wide]: 0 },
    paddingInline: { default: 16, [media.tablet]: 40, [media.wide]: 0 },
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  navLink: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: 32,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: { default: tone.label, ":hover": tone.ink },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color",
    transitionDuration: "160ms",
    transitionTimingFunction: curve.out,
    "::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 2,
      height: 1,
      backgroundColor: tone.indigo,
      transform: "scaleX(0)",
      transformOrigin: "0% 50%",
      transitionProperty: "transform",
      transitionDuration: "300ms",
      transitionTimingFunction: curve.out,
    },
  },
  navLinkActive: {
    "::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 2,
      height: 1,
      backgroundColor: tone.indigo,
      transform: "scaleX(1)",
      transformOrigin: "0% 50%",
      transitionProperty: "transform",
      transitionDuration: "300ms",
      transitionTimingFunction: curve.out,
    },
  },
  navFocus: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.indigo,
    outlineOffset: { default: 2, [media.belowWide]: -2 },
  },

  closing: {
    backgroundColor: tone.page,
  },
  closingInner: {
    display: "flex",
    flexDirection: { default: "column", [media.wide]: "row" },
    alignItems: { default: "flex-start", [media.wide]: "flex-end" },
    justifyContent: "space-between",
    gap: 32,
  },
  closingTitle: {
    margin: 0,
    fontSize: { default: 28, [media.wide]: 36 },
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "0.08em",
    color: tone.ink,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 28,
  },
  primary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    height: 48,
    paddingInline: 28,
    borderWidth: 0,
    backgroundColor: { default: tone.indigo, ":hover": tone.indigoDeep },
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: tone.paper,
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [media.motionOk]: "scale(0.97)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: curve.out,
  },
  secondary: {
    paddingBlock: 8,
    paddingInline: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: { default: tone.thread, ":hover": tone.indigo },
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 15,
    letterSpacing: "0.06em",
    color: tone.ink,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "160ms",
    transitionTimingFunction: curve.out,
  },
});

function Banner() {
  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(styles.banner)}>
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(styles.bannerHead)}>
          <h1 id="about-banner-title" {...stylex.props(styles.title)}>
            {ABOUT_BANNER.title}
          </h1>
          <div {...stylex.props(styles.bannerAside)}>
            <p {...stylex.props(styles.bannerLead)}>{ABOUT_BANNER.lead}</p>
            <p lang="en" {...stylex.props(ui.caption)}>
              {ABOUT_BANNER.established} · {ABOUT_BANNER.place}
            </p>
          </div>
        </div>
        <div role="img" aria-label={ABOUT_BANNER.alt} {...stylex.props(styles.warp)}>
          {Array.from({ length: WARP }, (_, index) => (
            <span
              key={`warp-${index}`}
              {...stylex.props(
                styles.warpStrip(index),
                styles.warpSettle,
                index % 2 === 0 ? styles.warpRise : styles.warpFall,
              )}
            >
              <img
                src={ABOUT_BANNER.image}
                alt=""
                fetchPriority="high"
                decoding="async"
                {...stylex.props(styles.warpImage(index))}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionBar({ onNavigateHome }: AboutPageProps) {
  const active = useActiveSection(SECTION_IDS);
  const navRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const nav = navRef.current;
    const link = active ? nav?.querySelector<HTMLElement>(`[href="#${active}"]`) : null;
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    const navBox = nav.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    if (linkBox.left < navBox.left + 16 || linkBox.right > navBox.right - 16) {
      nav.scrollBy({ left: linkBox.left - navBox.left - 16, behavior: reduce ? "auto" : "smooth" });
    }
  }, [active, reduce]);

  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigateHome("top");
  };

  return (
    <div {...stylex.props(styles.bar)}>
      <div {...stylex.props(ui.shell, styles.barInner)}>
        <nav aria-label="Breadcrumb" {...stylex.props(styles.crumbs)}>
          <a href="#top" onClick={goHome} {...stylex.props(styles.crumbLink, styles.navFocus)}>
            <span lang="en">Home</span>
          </a>
          <span aria-hidden="true" {...stylex.props(styles.crumbJoin)}>
            /
          </span>
          <span aria-current="page">
            <span lang="en">About</span>
          </span>
        </nav>
        <nav aria-label="On this page" ref={navRef} {...stylex.props(styles.sectionNav)}>
          {ABOUT_HERO.navChips.map((chip) => (
            <a
              key={chip.id}
              href={`#${chip.id}`}
              aria-current={active === chip.id ? "location" : undefined}
              {...stylex.props(
                styles.navLink,
                active === chip.id && styles.navLinkActive,
                styles.navFocus,
              )}
            >
              <span lang="en">{NAV_WORDS[chip.id]}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

function Closing({ onNavigateHome }: AboutPageProps) {
  return (
    <section aria-labelledby="about-cta-title" {...stylex.props(ui.section, styles.closing)}>
      <Reveal sx={[ui.shell, styles.closingInner]}>
        <h2 id="about-cta-title" {...stylex.props(styles.closingTitle)}>
          {CTA.title}
        </h2>
        <div {...stylex.props(styles.actions)}>
          <button
            type="button"
            onClick={() => onNavigateHome("contact")}
            {...stylex.props(styles.primary, ui.focusRing)}
          >
            {CTA.action.label}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateHome("products")}
            {...stylex.props(styles.secondary, ui.focusRing)}
          >
            产品与应用
          </button>
        </div>
      </Reveal>
    </section>
  );
}

export function AboutOOS1U({ onNavigateHome }: AboutPageProps) {
  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <Banner />
      <SectionBar onNavigateHome={onNavigateHome} />
      <Profile />
      <CampusLoom />
      <CultureStory />
      <Responsibility />
      <Honors />
      <Structure />
      <Closing onNavigateHome={onNavigateHome} />
    </div>
  );
}
