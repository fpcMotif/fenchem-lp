import type { STATS as CampusStats } from "../variant-oos/content";
type CampusStat = (typeof CampusStats)[number];
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  For,
  Show,
  type Component,
  type ComponentProps,
  type JSX,
  type Ref,
  type Setter,
} from "solid-js";
import { m, AnimatePresence, type MotionValue } from "../../../../compat/motion";
import { ArrowUpRight } from "lucide-solid";
import { EASE, STAGGER } from "../motion-constants";
import { HeroGradeFilter } from "../hero-grade";
import { HeroBackdrop } from "./corporate-sections";
import { CorporateHeaderActions } from "./navigation-and-headline";
import { ProductSummary } from "./product-summary";
import type { STRENGTHS as StrengthItems } from "../variant-oos1/content";
type Strength = (typeof StrengthItems)[number];
const HAN_SCRIPT = /\p{Script=Han}/u;
export function LakeStatistic(props: {
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
    <div {...stylex.props(props.styles.lakeStat)}>
      <m.p {...stylex.props(props.styles.lakeLabel)} style={{ opacity: props.surfacing, y: props.lift }}>
        {props.stat.label}
      </m.p>
      <m.p
        data-lake-glyph={props.display}
        data-lake-final={props.stat.value}
        data-lake-unit={props.stat.unit ?? ""}
        {...stylex.props(props.styles.lakeFigure, props.drawn && props.styles.lakeFigureDrawn)}
        style={{ opacity: props.surfacing }}
      >
        <span aria-hidden="true">{props.display}</span>
        <span {...stylex.props(props.styles.visuallyHidden)}>{props.stat.value}</span>
        {props.stat.unit ? <span {...stylex.props(props.styles.lakeUnit)}>{props.stat.unit}</span> : null}
      </m.p>
      <m.p {...stylex.props(props.styles.lakeCaption)} style={{ opacity: props.surfacing, y: props.lift }}>
        {props.stat.caption}
      </m.p>
    </div>
  );
}
export function CountedStatistic(props: {
  styles: {
    statDivider: StyleXStyles;
    stat: StyleXStyles;
    statText: StyleXStyles;
    statFigure: StyleXStyles;
    statUnit: StyleXStyles;
  };
  index: number;
  stat: CampusStat;
  ZoomReveal: Component<{ children: JSX.Element; delay?: number; sx?: StyleXStyles }>;
  CountUp: Component<{ value: string }>;
}) {
  return (
    <>
      {props.index > 0 ? <span aria-hidden="true" {...stylex.props(props.styles.statDivider)} /> : null}
      <props.ZoomReveal delay={props.index * STAGGER} sx={props.styles.stat}>
        <p {...stylex.props(props.styles.statText)}>{props.stat.label}</p>
        <p {...stylex.props(props.styles.statFigure)}>
          <props.CountUp value={props.stat.value} />
          {props.stat.unit ? <span {...stylex.props(props.styles.statUnit)}>{props.stat.unit}</span> : null}
        </p>
        <p {...stylex.props(props.styles.statText)}>{props.stat.caption}</p>
      </props.ZoomReveal>
    </>
  );
}
export function TiltedProductCard(props: {
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
  product: ComponentProps<typeof ProductSummary>["product"] & { image: string; english: string };
  ZoomReveal: Component<{ children: JSX.Element; delay?: number; sx?: StyleXStyles }>;
  tiltRef: Ref<HTMLDivElement>;
  summaryStyles: ComponentProps<typeof ProductSummary>["styles"];
}) {
  return (
    <props.ZoomReveal delay={props.index * STAGGER} sx={[props.styles.productCard, stylex.defaultMarker()]}>
      <div ref={props.tiltRef} {...stylex.props(props.styles.productTilt)}>
        <div {...stylex.props(props.styles.productImageFrame)}>
          <img
            src={props.product.image}
            alt={props.product.english}
            loading="lazy"
            decoding="async"
            {...stylex.props(props.styles.productImage)}
          />
        </div>
        <ProductSummary
          product={props.product}
          sx={[props.styles.productPanel, props.index % 2 === 1 && props.styles.productPanelAlt]}
          styles={props.summaryStyles}
        />
        <span aria-hidden="true" {...stylex.props(props.styles.productGlare)} />
      </div>
    </props.ZoomReveal>
  );
}
export function CorporateMenu(props: {
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
  closeOnEscape: JSX.EventHandler<HTMLElement, KeyboardEvent>;
  scrolled: boolean;
  menuOpen: boolean;
  menuId: string;
  reduce: boolean;
  setMenuOpen: Setter<boolean>;
  LogoMark: Component;
  NAV_ITEMS: readonly { href: string; label: string }[];
  isActive: (href: string) => boolean;
  actionStyles: ComponentProps<typeof CorporateHeaderActions>["styles"];
}) {
  return (
    <header
      onKeyDown={props.closeOnEscape}
      {...stylex.props(props.styles.header, (props.scrolled || props.menuOpen) && props.styles.headerSolid)}
    >
      <div {...stylex.props(props.styles.shell, props.styles.headerInner)}>
        <a href="#top" aria-label="FENCHEM home" {...stylex.props(props.styles.logoLink)}>
          <props.LogoMark />
        </a>
        <nav aria-label="Main" {...stylex.props(props.styles.nav)}>
          <For each={props.NAV_ITEMS}>
            {(item) => (
              <a
                href={item.href}
                aria-current={props.isActive(item.href) ? "location" : undefined}
                {...stylex.props(
                  props.styles.navLink,
                  props.isActive(item.href) && props.styles.navLinkActive,
                )}
              >
                {item.label}
              </a>
            )}
          </For>
        </nav>
        <CorporateHeaderActions
          styles={props.actionStyles}
          menuOpen={props.menuOpen}
          menuId={props.menuId}
          setMenuOpen={props.setMenuOpen}
        />
      </div>
      <AnimatePresence initial={false}>
        <Show when={props.menuOpen}>
          <m.nav
            id={props.menuId}
            aria-label="Main"
            {...stylex.props(props.styles.menuPanel)}
            initial={{ opacity: 0, transform: "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: props.reduce ? 0.15 : 0.2, ease: EASE }}
          >
            <ul {...stylex.props(props.styles.menuList)}>
              <For each={props.NAV_ITEMS}>
                {(item) => (
                  <li>
                    <a
                      href={item.href}
                      aria-current={props.isActive(item.href) ? "location" : undefined}
                      onClick={() => props.setMenuOpen(false)}
                      {...stylex.props(
                        props.styles.menuLink,
                        props.isActive(item.href) && props.styles.menuLinkActive,
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </m.nav>
        </Show>
      </AnimatePresence>
    </header>
  );
}
export function RisingHero(props: {
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
  backdropFragment?: string;
  backdropProgress?: MotionValue<number>;
  onSecondaryClick?: (event: MouseEvent & { currentTarget: HTMLAnchorElement; target: Element }) => void;
}) {
  return (
    <section ref={props.heroRef} id="top" aria-labelledby="oo-hero-title" {...stylex.props(props.styles.hero)}>
      <HeroGradeFilter />
      <HeroBackdrop
        styles={props.backdropStyles}
        source={props.IMAGES.hero}
        motionStyle={props.reduce ? undefined : { y: props.backdropY }}
        liquidFragment={props.backdropFragment}
        liquidProgress={props.backdropProgress}
      />
      <m.div
        {...stylex.props(props.styles.shell, props.styles.inset120, props.styles.heroContent)}
        style={props.reduce ? undefined : { y: props.contentY, opacity: props.contentOpacity }}
      >
        <div {...stylex.props(props.styles.heroCopy)}>
          <h1 id="oo-hero-title" {...stylex.props(props.styles.heroTitle)}>
            <span
              lang={
                HAN_SCRIPT.test(
                  props.OPENING_BEFORE + props.HERO.accent + props.OPENING_AFTER + props.CLOSING_LEAD + props.CLOSING_WORD,
                )
                  ? undefined
                  : "en"
              }
              {...stylex.props(props.styles.heroHeadline)}
            >
              <span
                {...stylex.props(
                  props.styles.heroLead,
                  props.styles.heroRise,
                  props.styles.enterDelay(props.introAfter(0)),
                )}
              >
                {props.OPENING_BEFORE}
                <span {...stylex.props(props.styles.heroAccent)}>{props.HERO.accent}</span>
                {props.OPENING_AFTER}
              </span>{" "}
              <span
                {...stylex.props(
                  props.styles.heroLead,
                  props.styles.heroRise,
                  props.styles.enterDelay(props.introAfter(80)),
                )}
              >
                {props.CLOSING_LEAD}
              </span>{" "}
              <span {...stylex.props(props.styles.heroBreakLine)}>
                <span
                  {...stylex.props(
                    props.styles.heroBreak,
                    props.styles.heroRise,
                    props.styles.enterDelay(props.introAfter(160)),
                  )}
                >
                  <span {...stylex.props(props.styles.heroBreakInk, props.styles.heroBreakHead)}>
                    {props.CLOSING_WORD}
                  </span>
                  <span
                    aria-hidden="true"
                    {...stylex.props(props.styles.heroBreakInk, props.styles.heroBreakTail)}
                  >
                    {props.CLOSING_WORD}
                  </span>
                </span>
                <span aria-hidden="true" {...stylex.props(props.styles.heroPeriodSeat)}>
                  <span {...stylex.props(props.styles.heroPeriod)} />
                </span>
                <span {...stylex.props(props.styles.visuallyHidden)}>.</span>
              </span>
            </span>{" "}
            <span
              {...stylex.props(
                props.styles.heroSubtitle,
                props.styles.heroRise,
                props.styles.enterDelay(props.introAfter(240)),
              )}
            >
              {props.HERO.title}
            </span>
          </h1>
        </div>
        <div {...stylex.props(props.styles.ctaRow, props.styles.heroFade, props.styles.enterDelay(props.introAfter(600)))}>
          <a
            href={props.HERO.primary.href}
            {...stylex.props(props.styles.button, props.styles.buttonPrimary, props.styles.buttonHero)}
          >
            {props.HERO.primary.label}
          </a>
          <a
            href={props.HERO.secondary.href}
            onClick={(event) => {
              if (props.onSecondaryClick) {
                event.preventDefault();
                props.onSecondaryClick(event);
              }
            }}
            {...stylex.props(props.styles.button, props.styles.buttonSecondary, props.styles.buttonHero)}
          >
            {props.HERO.secondary.label}
          </a>
        </div>
      </m.div>
    </section>
  );
}
export function InkedAbout(props: {
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
  RiseReveal: Component<{ children: JSX.Element; delay?: number; sx?: StyleXStyles }>;
  ABOUT: { title: string; cta: { href: string; label: string } };
  textRef: Ref<HTMLParagraphElement>;
  ABOUT_INK_LINES: readonly (readonly { text: string; range: [number, number] }[])[];
  scrollYProgress: MotionValue<number>;
  InkPhrase: Component<{
    children: JSX.Element;
    progress: MotionValue<number>;
    range: [number, number];
  }>;
}) {
  return (
    <section
      id="about"
      aria-labelledby="oo-about-title"
      {...stylex.props(props.styles.about, props.styles.inset124, props.styles.anchor)}
    >
      <props.RiseReveal sx={props.styles.aboutInner}>
        <h2 id="oo-about-title" {...stylex.props(props.styles.sectionTitle)}>
          {props.ABOUT.title}
        </h2>
        <p ref={props.textRef} {...stylex.props(props.styles.aboutBody)}>
          <For each={props.ABOUT_INK_LINES}>
            {(segments, lineIndex) => (
              <>
                {lineIndex() > 0 ? <br /> : null}
                <For each={segments}>
                  {(segment) => (
                    <props.InkPhrase progress={props.scrollYProgress} range={segment.range}>
                      {segment.text}
                    </props.InkPhrase>
                  )}
                </For>
              </>
            )}
          </For>
        </p>
        <a
          href={props.ABOUT.cta.href}
          {...stylex.props(props.styles.button, props.styles.buttonPrimary, props.styles.buttonCompact)}
        >
          {props.ABOUT.cta.label}
        </a>
      </props.RiseReveal>
    </section>
  );
}
export function FramedCampus(props: {
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
  StatItem: Component<{ stat: CampusStat; index: number }>;
}) {
  return (
    <section id="campus" aria-label="R&D and production" {...stylex.props(props.styles.anchor)}>
      <div ref={props.stageRef} {...stylex.props(props.styles.campusStage)}>
        <m.div
          {...stylex.props(props.styles.campusFrame)}
          style={props.reduce ? undefined : { clipPath: props.windowClip }}
        >
          <m.img
            src={props.IMAGES.campus.src}
            alt={props.IMAGES.campus.alt}
            loading="lazy"
            decoding="async"
            {...stylex.props(props.styles.campusImage)}
            style={props.reduce ? undefined : { scale: props.photoScale }}
          />
        </m.div>
      </div>
      <div {...stylex.props(props.styles.shell, props.styles.inset132, props.styles.statsBand)}>
        <For each={props.STATS}>
          {(stat, index) => <props.StatItem stat={stat} index={index()} />}
        </For>
      </div>
    </section>
  );
}
export function SweepingOffices(props: {
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
  RiseReveal: Component<{ children: JSX.Element; delay?: number; sx?: StyleXStyles }>;
  riseDelay: (index: number) => number;
}) {
  return (
    <section id="offices" aria-labelledby="oo-offices-title" {...stylex.props(props.styles.anchor)}>
      <div {...stylex.props(props.styles.globalBand)}>
        <div ref={props.rowRef} {...stylex.props(props.styles.globalRow)}>
          <div
            {...stylex.props(
              props.styles.mapWrap,
              props.styles.mapWrapEnter,
              props.rowInView && props.styles.mapWrapEnterRun,
            )}
          >
            <img
              src={props.IMAGES.officeMap.src}
              alt={props.IMAGES.officeMap.alt}
              width={611}
              height={321}
              loading="lazy"
              decoding="async"
              {...stylex.props(props.styles.mapImage, props.styles.mapSweep, props.rowInView && props.styles.mapSweepRun)}
            />
            <For each={props.OFFICE_MAP_PINS}>
              {(pin, index) => (
                <span
                  aria-hidden="true"
                  {...stylex.props(
                    props.styles.mapRing,
                    props.rowInView && props.styles.mapRingPulse,
                    props.styles.mapRingAt(
                      `${pin.left}%`,
                      `${pin.top}%`,
                      `${props.MAP_SWEEP_MS / 4 + index() * props.MAP_PIN_STAGGER_MS}ms`,
                    ),
                  )}
                />
              )}
            </For>
          </div>
          <div
            {...stylex.props(
              props.styles.globalCopy,
              props.styles.globalCopyEnter,
              props.rowInView && props.styles.globalCopyEnterRun,
            )}
          >
            <h2 id="oo-offices-title" {...stylex.props(props.styles.sectionTitle)}>
              {props.GLOBAL_INTRO.title}
            </h2>
            <p {...stylex.props(props.styles.sectionLead)}>{props.GLOBAL_INTRO.lead}</p>
          </div>
        </div>
      </div>
      <div {...stylex.props(props.styles.officesBand)}>
        <div {...stylex.props(props.styles.shell, props.styles.inset120, props.styles.regions)}>
          <For each={props.OFFICE_COLUMNS}>
            {(column, index) => (
              <props.RiseReveal delay={props.riseDelay(index())} sx={props.styles.officeColumn}>
                <For each={column}>
                  {(group) => (
                    <div {...stylex.props(props.styles.officeGroup)}>
                      <h3 {...stylex.props(props.styles.regionHeader)}>{group.region}</h3>
                      <ul {...stylex.props(props.styles.list, props.styles.regionBody)}>
                        <For each={group.offices}>
                          {(office) => (
                            <li {...stylex.props(props.styles.mutedText)}>{office}</li>
                          )}
                        </For>
                      </ul>
                    </div>
                  )}
                </For>
              </props.RiseReveal>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
export function StrengthQuadrantCopy(props: {
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
    <div {...stylex.props(props.styles.quadrantText, props.inverse && props.styles.quadrantInverse)}>
      <div {...stylex.props(props.styles.quadrantCopy)}>
        <h3 id={`${props.idPrefix}-strength-${props.index}`} {...stylex.props(props.styles.quadrantTitle)}>
          {props.strength.title}
        </h3>
        {props.strength.description ? (
          <p {...stylex.props(props.styles.quadrantSmall)}>{props.strength.description}</p>
        ) : null}
      </div>
      {props.strength.link ? (
        <a href="#offices" {...stylex.props(props.styles.quadrantLink)}>
          {props.strength.link}
          <ArrowUpRight size={12} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}
export function QuadrantStrengths(props: {
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
  RiseReveal: Component<{ children: JSX.Element; delay?: number; sx?: StyleXStyles }>;
  STRENGTHS_INTRO: { title: string; lead: string };
  gridRef: Ref<HTMLDivElement>;
  STRENGTHS: readonly Strength[];
  Quadrant: Component<{ strength: Strength; index: number; apart: MotionValue<number> }>;
  apart: MotionValue<number>;
  rotate: MotionValue<number>;
  RING_RADIUS: number;
  RING_LENGTH: number;
}) {
  return (
    <section
      id="strengths"
      aria-labelledby="oos1-strengths-title"
      {...stylex.props(props.styles.strengths, props.styles.inset120, props.styles.anchor)}
    >
      <props.RiseReveal sx={props.styles.introBlock}>
        <h2 id="oos1-strengths-title" {...stylex.props(props.styles.sectionTitle)}>
          {props.STRENGTHS_INTRO.title}
        </h2>
        <p {...stylex.props(props.styles.sectionLead)}>{props.STRENGTHS_INTRO.lead}</p>
      </props.RiseReveal>
      <div ref={props.gridRef} {...stylex.props(props.styles.quadrants)}>
        <For each={props.STRENGTHS}>
          {(strength, index) => (
            <props.Quadrant strength={strength} index={index()} apart={props.apart} />
          )}
        </For>
        <m.div aria-hidden="true" {...stylex.props(props.styles.badge)} style={{ rotate: props.rotate }}>
          <svg viewBox="0 0 160 160" {...stylex.props(props.styles.badgeSvg)}>
            <defs>
              <path
                id="oos1-badge-ring"
                d={`M80,80 m-${props.RING_RADIUS},0 a${props.RING_RADIUS},${props.RING_RADIUS} 0 1,1 ${props.RING_RADIUS * 2},0 a${props.RING_RADIUS},${props.RING_RADIUS} 0 1,1 -${props.RING_RADIUS * 2},0`}
              />
            </defs>
            <text {...stylex.props(props.styles.badgeText)}>
              <textPath
                href="#oos1-badge-ring"
                // Solid's TextPath typings omit these valid SVGTextContentElement attributes.
                {...{ textLength: props.RING_LENGTH, lengthAdjust: "spacing" }}
              >
                WHY FENCHEM · 为什么选择泛成 · WHY FENCHEM · 为什么选择泛成 ·
              </textPath>
            </text>
            <g {...stylex.props(props.styles.badgeCross)} stroke="currentColor" stroke-width="1">
              <line x1="80" y1="56" x2="80" y2="104" />
              <line x1="56" y1="80" x2="104" y2="80" />
            </g>
          </svg>
        </m.div>
      </div>
    </section>
  );
}
