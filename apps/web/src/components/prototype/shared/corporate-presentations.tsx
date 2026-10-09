import type { STATS as CampusStats } from "../variant-oos/content";
type CampusStat = (typeof CampusStats)[number];
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  Fragment,
  type ComponentType,
  type ComponentProps,
  type ReactNode,
  type Ref,
  type KeyboardEventHandler,
  type Dispatch,
  type SetStateAction,
} from "react";
import { m, AnimatePresence, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { EASE, STAGGER } from "../motion-constants";
import { HeroGradeFilter } from "../hero-grade";
import { HeroBackdrop } from "./corporate-sections";
import { CorporateHeaderActions } from "./navigation-and-headline";
import { ProductSummary } from "./product-summary";
import type { STRENGTHS as StrengthItems } from "../variant-oos1/content";
type Strength = (typeof StrengthItems)[number];
export function LakeStatistic({
  styles,
  stat,
  surfacing,
  lift,
  display,
  drawn,
}: {
  styles: {
    lakeStat: StyleXStyles;
    lakeLabel: StyleXStyles;
    lakeFigure: StyleXStyles;
    lakeFigureDrawn: StyleXStyles;
    visuallyHidden: StyleXStyles;
    lakeUnit: StyleXStyles;
    lakeCaption: StyleXStyles;
  };
  stat: CampusStat;
  surfacing: MotionValue<number>;
  lift: MotionValue<number>;
  display: string;
  drawn: boolean;
}) {
  return (
    <div {...stylex.props(styles.lakeStat)}>
      <m.p {...stylex.props(styles.lakeLabel)} style={{ opacity: surfacing, y: lift }}>
        {stat.label}
      </m.p>
      <m.p
        data-lake-glyph={display}
        data-lake-final={stat.value}
        data-lake-unit={stat.unit ?? ""}
        {...stylex.props(styles.lakeFigure, drawn && styles.lakeFigureDrawn)}
        style={{ opacity: surfacing }}
      >
        <span aria-hidden="true">{display}</span>
        <span {...stylex.props(styles.visuallyHidden)}>{stat.value}</span>
        {stat.unit ? <span {...stylex.props(styles.lakeUnit)}>{stat.unit}</span> : null}
      </m.p>
      <m.p {...stylex.props(styles.lakeCaption)} style={{ opacity: surfacing, y: lift }}>
        {stat.caption}
      </m.p>
    </div>
  );
}
export function CountedStatistic({
  styles,
  index,
  stat,
  ZoomReveal,
  CountUp,
}: {
  styles: {
    statDivider: StyleXStyles;
    stat: StyleXStyles;
    statText: StyleXStyles;
    statFigure: StyleXStyles;
    statUnit: StyleXStyles;
  };
  index: number;
  stat: CampusStat;
  ZoomReveal: ComponentType<{ children: ReactNode; delay?: number; sx?: StyleXStyles }>;
  CountUp: ComponentType<{ value: string }>;
}) {
  return (
    <>
      {index > 0 ? <span aria-hidden="true" {...stylex.props(styles.statDivider)} /> : null}
      <ZoomReveal delay={index * STAGGER} sx={styles.stat}>
        <p {...stylex.props(styles.statText)}>{stat.label}</p>
        <p {...stylex.props(styles.statFigure)}>
          <CountUp value={stat.value} />
          {stat.unit ? <span {...stylex.props(styles.statUnit)}>{stat.unit}</span> : null}
        </p>
        <p {...stylex.props(styles.statText)}>{stat.caption}</p>
      </ZoomReveal>
    </>
  );
}
export function TiltedProductCard({
  styles,
  index,
  product,
  ZoomReveal,
  tiltRef,
  summaryStyles,
}: {
  styles: {
    productCard: StyleXStyles;
    productTilt: StyleXStyles;
    productImageFrame: StyleXStyles;
    productImage: StyleXStyles;
    productPanel: StyleXStyles;
    productPanelAlt: StyleXStyles;
    productGlare: StyleXStyles;
  };
  index: number;
  product: ComponentProps<typeof ProductSummary>["product"] & { image: string };
  ZoomReveal: ComponentType<{ children: ReactNode; delay?: number; sx?: StyleXStyles }>;
  tiltRef: Ref<HTMLDivElement>;
  summaryStyles: ComponentProps<typeof ProductSummary>["styles"];
}) {
  return (
    <ZoomReveal delay={index * STAGGER} sx={[styles.productCard, stylex.defaultMarker()]}>
      <div ref={tiltRef} {...stylex.props(styles.productTilt)}>
        <div {...stylex.props(styles.productImageFrame)}>
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.productImage)}
          />
        </div>
        <ProductSummary
          product={product}
          sx={[styles.productPanel, index % 2 === 1 && styles.productPanelAlt]}
          styles={summaryStyles}
        />
        <span aria-hidden="true" {...stylex.props(styles.productGlare)} />
      </div>
    </ZoomReveal>
  );
}
export function CorporateMenu({
  styles,
  closeOnEscape,
  scrolled,
  menuOpen,
  menuId,
  reduce,
  setMenuOpen,
  LogoMark,
  NAV_ITEMS,
  isActive,
  actionStyles,
}: {
  styles: {
    header: StyleXStyles;
    headerSolid: StyleXStyles;
    shell: StyleXStyles;
    headerInner: StyleXStyles;
    logoLink: StyleXStyles;
    nav: StyleXStyles;
    navLink: StyleXStyles;
    navLinkActive: StyleXStyles;
    menuPanel: StyleXStyles;
    menuList: StyleXStyles;
    menuLink: StyleXStyles;
    menuLinkActive: StyleXStyles;
  };
  closeOnEscape: KeyboardEventHandler<HTMLElement>;
  scrolled: boolean;
  menuOpen: boolean;
  menuId: string;
  reduce: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  LogoMark: ComponentType;
  NAV_ITEMS: readonly { href: string; label: string }[];
  isActive: (href: string) => boolean;
  actionStyles: ComponentProps<typeof CorporateHeaderActions>["styles"];
}) {
  return (
    <header
      onKeyDown={closeOnEscape}
      {...stylex.props(styles.header, (scrolled || menuOpen) && styles.headerSolid)}
    >
      <div {...stylex.props(styles.shell, styles.headerInner)}>
        <a href="#top" aria-label="FENCHEM 泛成 首页" {...stylex.props(styles.logoLink)}>
          <LogoMark />
        </a>
        <nav aria-label="主导航" {...stylex.props(styles.nav)}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "location" : undefined}
              {...stylex.props(styles.navLink, isActive(item.href) && styles.navLinkActive)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <CorporateHeaderActions
          styles={actionStyles}
          menuOpen={menuOpen}
          menuId={menuId}
          setMenuOpen={setMenuOpen}
        />
      </div>
      <AnimatePresence initial={false}>
        {menuOpen ? (
          <m.nav
            key="menu"
            id={menuId}
            aria-label="主导航"
            {...stylex.props(styles.menuPanel)}
            initial={{ opacity: 0, transform: "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: reduce ? 0.15 : 0.2, ease: EASE }}
          >
            <ul {...stylex.props(styles.menuList)}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive(item.href) ? "location" : undefined}
                    onClick={() => setMenuOpen(false)}
                    {...stylex.props(styles.menuLink, isActive(item.href) && styles.menuLinkActive)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
export function RisingHero({
  styles,
  heroRef,
  reduce,
  backdropY,
  contentY,
  contentOpacity,
  IMAGES,
  HERO,
  OPENING_BEFORE,
  OPENING_AFTER,
  CLOSING_LEAD,
  CLOSING_WORD,
  introAfter,
  backdropStyles,
}: {
  styles: {
    hero: StyleXStyles;
    shell: StyleXStyles;
    inset120: StyleXStyles;
    heroContent: StyleXStyles;
    heroCopy: StyleXStyles;
    heroTitle: StyleXStyles;
    heroHeadline: StyleXStyles;
    heroLead: StyleXStyles;
    heroRise: StyleXStyles;
    enterDelay: (delay: string) => StyleXStyles;
    heroAccent: StyleXStyles;
    heroBreakLine: StyleXStyles;
    heroBreak: StyleXStyles;
    heroBreakInk: StyleXStyles;
    heroBreakHead: StyleXStyles;
    heroBreakTail: StyleXStyles;
    heroPeriodSeat: StyleXStyles;
    heroPeriod: StyleXStyles;
    visuallyHidden: StyleXStyles;
    heroSubtitle: StyleXStyles;
    ctaRow: StyleXStyles;
    heroFade: StyleXStyles;
    button: StyleXStyles;
    buttonPrimary: StyleXStyles;
    buttonHero: StyleXStyles;
    buttonSecondary: StyleXStyles;
  };
  heroRef: Ref<HTMLElement>;
  reduce: boolean;
  backdropY: MotionValue<string>;
  contentY: MotionValue<number>;
  contentOpacity: MotionValue<number>;
  IMAGES: { hero: string };
  HERO: {
    accent: string;
    title: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  };
  OPENING_BEFORE: string;
  OPENING_AFTER: string;
  CLOSING_LEAD: string;
  CLOSING_WORD: string;
  introAfter: (delay: number) => string;
  backdropStyles: ComponentProps<typeof HeroBackdrop>["styles"];
}) {
  return (
    <section ref={heroRef} id="top" aria-labelledby="oo-hero-title" {...stylex.props(styles.hero)}>
      <HeroGradeFilter />
      <HeroBackdrop
        styles={backdropStyles}
        source={IMAGES.hero}
        motionStyle={reduce ? undefined : { y: backdropY }}
      />
      <m.div
        {...stylex.props(styles.shell, styles.inset120, styles.heroContent)}
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div {...stylex.props(styles.heroCopy)}>
          <h1 id="oo-hero-title" {...stylex.props(styles.heroTitle)}>
            <span lang="en" {...stylex.props(styles.heroHeadline)}>
              <span
                {...stylex.props(
                  styles.heroLead,
                  styles.heroRise,
                  styles.enterDelay(introAfter(0)),
                )}
              >
                {OPENING_BEFORE}
                <span {...stylex.props(styles.heroAccent)}>{HERO.accent}</span>
                {OPENING_AFTER}
              </span>{" "}
              <span
                {...stylex.props(
                  styles.heroLead,
                  styles.heroRise,
                  styles.enterDelay(introAfter(80)),
                )}
              >
                {CLOSING_LEAD}
              </span>{" "}
              <span {...stylex.props(styles.heroBreakLine)}>
                <span
                  {...stylex.props(
                    styles.heroBreak,
                    styles.heroRise,
                    styles.enterDelay(introAfter(160)),
                  )}
                >
                  <span {...stylex.props(styles.heroBreakInk, styles.heroBreakHead)}>
                    {CLOSING_WORD}
                  </span>
                  <span
                    aria-hidden="true"
                    {...stylex.props(styles.heroBreakInk, styles.heroBreakTail)}
                  >
                    {CLOSING_WORD}
                  </span>
                </span>
                <span aria-hidden="true" {...stylex.props(styles.heroPeriodSeat)}>
                  <span {...stylex.props(styles.heroPeriod)} />
                </span>
                <span {...stylex.props(styles.visuallyHidden)}>.</span>
              </span>
            </span>{" "}
            <span
              {...stylex.props(
                styles.heroSubtitle,
                styles.heroRise,
                styles.enterDelay(introAfter(240)),
              )}
            >
              {HERO.title}
            </span>
          </h1>
        </div>
        <div {...stylex.props(styles.ctaRow, styles.heroFade, styles.enterDelay(introAfter(600)))}>
          <a
            href={HERO.primary.href}
            {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonHero)}
          >
            {HERO.primary.label}
          </a>
          <a
            href={HERO.secondary.href}
            {...stylex.props(styles.button, styles.buttonSecondary, styles.buttonHero)}
          >
            {HERO.secondary.label}
          </a>
        </div>
      </m.div>
    </section>
  );
}
export function InkedAbout({
  styles,
  RiseReveal,
  ABOUT,
  textRef,
  ABOUT_INK_LINES,
  scrollYProgress,
  InkPhrase,
}: {
  styles: {
    about: StyleXStyles;
    inset124: StyleXStyles;
    anchor: StyleXStyles;
    aboutInner: StyleXStyles;
    sectionTitle: StyleXStyles;
    aboutBody: StyleXStyles;
    button: StyleXStyles;
    buttonPrimary: StyleXStyles;
    buttonCompact: StyleXStyles;
  };
  RiseReveal: ComponentType<{ children: ReactNode; delay?: number; sx?: StyleXStyles }>;
  ABOUT: { title: string; cta: { href: string; label: string } };
  textRef: Ref<HTMLParagraphElement>;
  ABOUT_INK_LINES: readonly (readonly { text: string; range: [number, number] }[])[];
  scrollYProgress: MotionValue<number>;
  InkPhrase: ComponentType<{
    children: ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
  }>;
}) {
  return (
    <section
      id="about"
      aria-labelledby="oo-about-title"
      {...stylex.props(styles.about, styles.inset124, styles.anchor)}
    >
      <RiseReveal sx={styles.aboutInner}>
        <h2 id="oo-about-title" {...stylex.props(styles.sectionTitle)}>
          {ABOUT.title}
        </h2>
        <p ref={textRef} {...stylex.props(styles.aboutBody)}>
          {ABOUT_INK_LINES.map((segments, lineIndex) => (
            <Fragment key={segments[0].text}>
              {lineIndex > 0 ? <br /> : null}
              {segments.map((segment) => (
                <InkPhrase key={segment.text} progress={scrollYProgress} range={segment.range}>
                  {segment.text}
                </InkPhrase>
              ))}
            </Fragment>
          ))}
        </p>
        <a
          href={ABOUT.cta.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonCompact)}
        >
          {ABOUT.cta.label}
        </a>
      </RiseReveal>
    </section>
  );
}
export function FramedCampus({
  styles,
  stageRef,
  reduce,
  windowClip,
  photoScale,
  IMAGES,
  STATS,
  StatItem,
}: {
  styles: {
    anchor: StyleXStyles;
    campusStage: StyleXStyles;
    campusFrame: StyleXStyles;
    campusImage: StyleXStyles;
    shell: StyleXStyles;
    inset132: StyleXStyles;
    statsBand: StyleXStyles;
  };
  stageRef: Ref<HTMLDivElement>;
  reduce: boolean;
  windowClip: MotionValue<string>;
  photoScale: MotionValue<number>;
  IMAGES: { campus: { src: string; alt: string } };
  STATS: readonly CampusStat[];
  StatItem: ComponentType<{ stat: CampusStat; index: number }>;
}) {
  return (
    <section id="campus" aria-label="研发与生产" {...stylex.props(styles.anchor)}>
      <div ref={stageRef} {...stylex.props(styles.campusStage)}>
        <m.div
          {...stylex.props(styles.campusFrame)}
          style={reduce ? undefined : { clipPath: windowClip }}
        >
          <m.img
            src={IMAGES.campus.src}
            alt={IMAGES.campus.alt}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.campusImage)}
            style={reduce ? undefined : { scale: photoScale }}
          />
        </m.div>
      </div>
      <div {...stylex.props(styles.shell, styles.inset132, styles.statsBand)}>
        {STATS.map((stat, index) => (
          <StatItem key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
export function SweepingOffices({
  styles,
  rowRef,
  rowInView,
  IMAGES,
  OFFICE_MAP_PINS,
  MAP_SWEEP_MS,
  MAP_PIN_STAGGER_MS,
  GLOBAL_INTRO,
  OFFICE_COLUMNS,
  RiseReveal,
  riseDelay,
}: {
  styles: {
    anchor: StyleXStyles;
    globalBand: StyleXStyles;
    globalRow: StyleXStyles;
    mapWrap: StyleXStyles;
    mapWrapEnter: StyleXStyles;
    mapWrapEnterRun: StyleXStyles;
    mapImage: StyleXStyles;
    mapSweep: StyleXStyles;
    mapSweepRun: StyleXStyles;
    mapRing: StyleXStyles;
    mapRingPulse: StyleXStyles;
    mapRingAt: (left: string, top: string, delay: string) => StyleXStyles;
    globalCopy: StyleXStyles;
    globalCopyEnter: StyleXStyles;
    globalCopyEnterRun: StyleXStyles;
    sectionTitle: StyleXStyles;
    sectionLead: StyleXStyles;
    officesBand: StyleXStyles;
    shell: StyleXStyles;
    inset120: StyleXStyles;
    regions: StyleXStyles;
    officeColumn: StyleXStyles;
    officeGroup: StyleXStyles;
    regionHeader: StyleXStyles;
    list: StyleXStyles;
    regionBody: StyleXStyles;
    mutedText: StyleXStyles;
  };
  rowRef: Ref<HTMLDivElement>;
  rowInView: boolean;
  IMAGES: { officeMap: { src: string; alt: string } };
  OFFICE_MAP_PINS: readonly { left: number; top: number }[];
  MAP_SWEEP_MS: number;
  MAP_PIN_STAGGER_MS: number;
  GLOBAL_INTRO: { title: string; lead: string };
  OFFICE_COLUMNS: readonly (readonly { region: string; offices: readonly string[] }[])[];
  RiseReveal: ComponentType<{ children: ReactNode; delay?: number; sx?: StyleXStyles }>;
  riseDelay: (index: number) => number;
}) {
  return (
    <section id="offices" aria-labelledby="oo-offices-title" {...stylex.props(styles.anchor)}>
      <div {...stylex.props(styles.globalBand)}>
        <div ref={rowRef} {...stylex.props(styles.globalRow)}>
          <div
            {...stylex.props(
              styles.mapWrap,
              styles.mapWrapEnter,
              rowInView && styles.mapWrapEnterRun,
            )}
          >
            <img
              src={IMAGES.officeMap.src}
              alt={IMAGES.officeMap.alt}
              width={611}
              height={321}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.mapImage, styles.mapSweep, rowInView && styles.mapSweepRun)}
            />
            {OFFICE_MAP_PINS.map((pin, index) => (
              <span
                key={`${pin.left}-${pin.top}`}
                aria-hidden="true"
                {...stylex.props(
                  styles.mapRing,
                  rowInView && styles.mapRingPulse,
                  styles.mapRingAt(
                    `${pin.left}%`,
                    `${pin.top}%`,
                    `${MAP_SWEEP_MS / 4 + index * MAP_PIN_STAGGER_MS}ms`,
                  ),
                )}
              />
            ))}
          </div>
          <div
            {...stylex.props(
              styles.globalCopy,
              styles.globalCopyEnter,
              rowInView && styles.globalCopyEnterRun,
            )}
          >
            <h2 id="oo-offices-title" {...stylex.props(styles.sectionTitle)}>
              {GLOBAL_INTRO.title}
            </h2>
            <p {...stylex.props(styles.sectionLead)}>{GLOBAL_INTRO.lead}</p>
          </div>
        </div>
      </div>
      <div {...stylex.props(styles.officesBand)}>
        <div {...stylex.props(styles.shell, styles.inset120, styles.regions)}>
          {OFFICE_COLUMNS.map((column, index) => (
            <RiseReveal key={column[0].region} delay={riseDelay(index)} sx={styles.officeColumn}>
              {column.map((group) => (
                <div key={group.region} {...stylex.props(styles.officeGroup)}>
                  <h3 {...stylex.props(styles.regionHeader)}>{group.region}</h3>
                  <ul {...stylex.props(styles.list, styles.regionBody)}>
                    {group.offices.map((office) => (
                      <li key={office} {...stylex.props(styles.mutedText)}>
                        {office}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </RiseReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
export function StrengthQuadrantCopy({
  styles,
  inverse,
  index,
  strength,
  idPrefix,
}: {
  styles: {
    quadrantText: StyleXStyles;
    quadrantInverse: StyleXStyles;
    quadrantCopy: StyleXStyles;
    quadrantTitle: StyleXStyles;
    quadrantSmall: StyleXStyles;
    quadrantLink: StyleXStyles;
  };
  inverse: boolean;
  index: number;
  strength: { title: string; description?: string | null; link?: string | null };
  idPrefix: string;
}) {
  return (
    <div {...stylex.props(styles.quadrantText, inverse && styles.quadrantInverse)}>
      <div {...stylex.props(styles.quadrantCopy)}>
        <h3 id={`${idPrefix}-strength-${index}`} {...stylex.props(styles.quadrantTitle)}>
          {strength.title}
        </h3>
        {strength.description ? (
          <p {...stylex.props(styles.quadrantSmall)}>{strength.description}</p>
        ) : null}
      </div>
      {strength.link ? (
        <a href="#offices" {...stylex.props(styles.quadrantLink)}>
          {strength.link}
          <ArrowUpRight size={12} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}
export function QuadrantStrengths({
  styles,
  RiseReveal,
  STRENGTHS_INTRO,
  gridRef,
  STRENGTHS,
  Quadrant,
  apart,
  rotate,
  RING_RADIUS,
  RING_LENGTH,
}: {
  styles: {
    strengths: StyleXStyles;
    inset120: StyleXStyles;
    anchor: StyleXStyles;
    introBlock: StyleXStyles;
    sectionTitle: StyleXStyles;
    sectionLead: StyleXStyles;
    quadrants: StyleXStyles;
    badge: StyleXStyles;
    badgeSvg: StyleXStyles;
    badgeText: StyleXStyles;
    badgeCross: StyleXStyles;
  };
  RiseReveal: ComponentType<{ children: ReactNode; delay?: number; sx?: StyleXStyles }>;
  STRENGTHS_INTRO: { title: string; lead: string };
  gridRef: Ref<HTMLDivElement>;
  STRENGTHS: readonly Strength[];
  Quadrant: ComponentType<{ strength: Strength; index: number; apart: MotionValue<number> }>;
  apart: MotionValue<number>;
  rotate: MotionValue<number>;
  RING_RADIUS: number;
  RING_LENGTH: number;
}) {
  return (
    <section
      id="strengths"
      aria-labelledby="oos1-strengths-title"
      {...stylex.props(styles.strengths, styles.inset120, styles.anchor)}
    >
      <RiseReveal sx={styles.introBlock}>
        <h2 id="oos1-strengths-title" {...stylex.props(styles.sectionTitle)}>
          {STRENGTHS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.sectionLead)}>{STRENGTHS_INTRO.lead}</p>
      </RiseReveal>
      <div ref={gridRef} {...stylex.props(styles.quadrants)}>
        {STRENGTHS.map((strength, index) => (
          <Quadrant key={strength.title} strength={strength} index={index} apart={apart} />
        ))}
        <m.div aria-hidden="true" {...stylex.props(styles.badge)} style={{ rotate }}>
          <svg viewBox="0 0 160 160" {...stylex.props(styles.badgeSvg)}>
            <defs>
              <path
                id="oos1-badge-ring"
                d={`M80,80 m-${RING_RADIUS},0 a${RING_RADIUS},${RING_RADIUS} 0 1,1 ${RING_RADIUS * 2},0 a${RING_RADIUS},${RING_RADIUS} 0 1,1 -${RING_RADIUS * 2},0`}
              />
            </defs>
            <text {...stylex.props(styles.badgeText)}>
              <textPath href="#oos1-badge-ring" textLength={RING_LENGTH} lengthAdjust="spacing">
                WHY FENCHEM · 为什么选择泛成 · WHY FENCHEM · 为什么选择泛成 ·
              </textPath>
            </text>
            <g {...stylex.props(styles.badgeCross)} stroke="currentColor" strokeWidth="1">
              <line x1="80" y1="56" x2="80" y2="104" />
              <line x1="56" y1="80" x2="104" y2="80" />
            </g>
          </svg>
        </m.div>
      </div>
    </section>
  );
}
