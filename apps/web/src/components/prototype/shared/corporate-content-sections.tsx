import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type {
  ComponentType,
  ComponentProps,
  ReactNode,
  Ref,
  Dispatch,
  SetStateAction,
} from "react";
import { m, type MotionValue } from "motion/react";
import { ArrowUpRight, ArrowRight, FileDown, Menu, X } from "lucide-react";
import { colors, typography } from "@fenchem-lp/ui/tokens.stylex";
import { createInquiryHref, type Ingredient } from "@/components/landing/landing-content";
import { STAGGER } from "../motion-constants";
import { Reveal } from "../motion";
import { FooterNavigation, FooterLegal } from "./footer-content";
import { Flow } from "./flow";
export function EngineeringStatus({
  styles,
  status,
  middle,
  last,
}: {
  styles: {
    microStrip: StyleXStyles;
    microText: StyleXStyles;
    pingWrap: StyleXStyles;
    pingOuter: StyleXStyles;
    pingInner: StyleXStyles;
  };
  status: string;
  middle: string;
  last: string;
}) {
  return (
    <div {...stylex.props(styles.microStrip)}>
      <span {...stylex.props(styles.microText)}>
        <span {...stylex.props(styles.pingWrap)}>
          <span {...stylex.props(styles.pingOuter)} />
          <span {...stylex.props(styles.pingInner)} />
        </span>
        {status}
      </span>
      <span {...stylex.props(styles.microText)}>{middle}</span>
      <span {...stylex.props(styles.microText)}>{last}</span>
    </div>
  );
}
export function IngredientCardDetails({
  styles,
  i,
  item,
}: {
  styles: {
    matrixCardBody: StyleXStyles;
    matrixCardMeta: StyleXStyles;
    matrixCardIndex: StyleXStyles;
    matrixCardCode: StyleXStyles;
    matrixCardTitle: StyleXStyles;
    matrixCardLatin: StyleXStyles;
    matrixCardDl: StyleXStyles;
    matrixCardDlRow: StyleXStyles;
    techLabel: StyleXStyles;
    matrixSpecLink: StyleXStyles;
  };
  i: number;
  item: Ingredient;
}) {
  return (
    <div {...stylex.props(styles.matrixCardBody)}>
      <div {...stylex.props(styles.matrixCardMeta)}>
        <span {...stylex.props(styles.matrixCardIndex)}>{String(i + 1).padStart(2, "0")} —</span>
        <span {...stylex.props(styles.matrixCardCode)}>{item.code}</span>
      </div>
      <h3 {...stylex.props(styles.matrixCardTitle)}>{item.name}</h3>
      <p {...stylex.props(styles.matrixCardLatin)}>{item.latin}</p>
      <dl {...stylex.props(styles.matrixCardDl)}>
        <div {...stylex.props(styles.matrixCardDlRow)}>
          <dt {...stylex.props(styles.techLabel)}>Purity</dt>
          <dd
            style={{
              margin: 0,
              fontFamily: typography.tech,
              fontSize: 12,
              color: colors.mute700,
            }}
          >
            {item.purity}
          </dd>
        </div>
        <div {...stylex.props(styles.matrixCardDlRow)}>
          <dt {...stylex.props(styles.techLabel)}>Form</dt>
          <dd
            style={{
              margin: 0,
              fontFamily: typography.tech,
              fontSize: 12,
              color: colors.mute700,
            }}
          >
            {item.form}
          </dd>
        </div>
      </dl>
      <a href="#contact" {...stylex.props(styles.matrixSpecLink)}>
        Request Spec
        <ArrowUpRight aria-hidden size={12} />
      </a>
    </div>
  );
}
export function IngredientDossierDetails({
  styles,
  DOSSIER,
  SPEC_ROWS,
}: {
  styles: {
    dossierBodyCol: StyleXStyles;
    dossierTitle: StyleXStyles;
    dossierLatin: StyleXStyles;
    dossierDescription: StyleXStyles;
    dossierDl: StyleXStyles;
    dossierDlRow: StyleXStyles;
    techLabel: StyleXStyles;
    dossierDd: StyleXStyles;
    dossierFormatsRow: StyleXStyles;
    dossierFormatPill: StyleXStyles;
    dossierActionsRow: StyleXStyles;
    ctaPrimary: StyleXStyles;
    ctaOutlineBlue: StyleXStyles;
  };
  DOSSIER: Ingredient;
  SPEC_ROWS: readonly { label: string; value: string }[];
}) {
  return (
    <div {...stylex.props(styles.dossierBodyCol)}>
      <Reveal>
        <h3 {...stylex.props(styles.dossierTitle)}>{DOSSIER.name}</h3>
        <p {...stylex.props(styles.dossierLatin)}>{DOSSIER.latin}</p>
        <p {...stylex.props(styles.dossierDescription)}>
          A branded, clinically studied adaptogen standardized by withanolide content. Supplied with
          full identity, potency and stability documentation — chromatographic panels run on every
          production batch, third-party verification on request.
        </p>
      </Reveal>

      <Reveal delay={STAGGER}>
        <dl {...stylex.props(styles.dossierDl)}>
          {SPEC_ROWS.map((row) => (
            <div key={row.label} {...stylex.props(styles.dossierDlRow)}>
              <dt {...stylex.props(styles.techLabel)}>{row.label}</dt>
              <dd {...stylex.props(styles.dossierDd)}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={STAGGER * 2}>
        <div {...stylex.props(styles.dossierFormatsRow)}>
          {["Capsule", "Tablet", "Softgel", "Powder blend"].map((format) => (
            <span key={format} {...stylex.props(styles.dossierFormatPill)}>
              {format}
            </span>
          ))}
        </div>
        <div {...stylex.props(styles.dossierActionsRow)}>
          <a href={createInquiryHref("dossier")} {...stylex.props(styles.ctaPrimary)}>
            Request this specification
            <ArrowRight aria-hidden size={16} />
          </a>
          <a href={createInquiryHref("tds")} {...stylex.props(styles.ctaOutlineBlue)}>
            <FileDown aria-hidden size={16} />
            Technical data sheet
          </a>
        </div>
      </Reveal>
    </div>
  );
}
export function InsetCorporateFooter({
  styles,
  children,
  logo,
  columns,
  copyright,
  navigationStyles,
  legalStyles,
}: {
  styles: {
    footer: StyleXStyles;
    shell: StyleXStyles;
    inset132: StyleXStyles;
    footerInner: StyleXStyles;
    footerRule: StyleXStyles;
  };
  children: ReactNode;
  logo: ComponentProps<typeof FooterNavigation>["logo"];
  columns: ComponentProps<typeof FooterNavigation>["columns"];
  copyright: string;
  navigationStyles: ComponentProps<typeof FooterNavigation>["styles"];
  legalStyles: ComponentProps<typeof FooterLegal>["styles"];
}) {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.shell, styles.inset132, styles.footerInner)}>
        <FooterNavigation logo={logo} columns={columns} styles={navigationStyles} />
        <hr {...stylex.props(styles.footerRule)} />
        <FooterLegal copyright={copyright} styles={legalStyles}>
          {children}
        </FooterLegal>
      </div>
    </footer>
  );
}
export function BloomHeroCopy({
  styles,
  reduce,
  contentY,
  contentOpacity,
  HERO,
  introAfter,
  headline,
}: {
  styles: {
    shell: StyleXStyles;
    inset120: StyleXStyles;
    heroContent: StyleXStyles;
    heroCopy: StyleXStyles;
    heroTitle: StyleXStyles;
    heroSubtitle: StyleXStyles;
    heroBloom: StyleXStyles;
    enterDelay: (delay: string) => StyleXStyles;
    ctaRow: StyleXStyles;
    button: StyleXStyles;
    buttonPrimary: StyleXStyles;
    buttonHero: StyleXStyles;
    buttonSecondary: StyleXStyles;
  };
  reduce: boolean;
  contentY: MotionValue<number>;
  contentOpacity: MotionValue<number>;
  HERO: {
    title: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  };
  introAfter: (delay: number) => string;
  headline: ReactNode;
}) {
  return (
    <m.div
      {...stylex.props(styles.shell, styles.inset120, styles.heroContent)}
      style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
    >
      <div {...stylex.props(styles.heroCopy)}>
        <h1 id="oo-hero-title" {...stylex.props(styles.heroTitle)}>
          {headline}{" "}
          <span
            {...stylex.props(
              styles.heroSubtitle,
              styles.heroBloom,
              styles.enterDelay(introAfter(600)),
            )}
          >
            {HERO.title}
          </span>
        </h1>
      </div>
      <div {...stylex.props(styles.ctaRow, styles.heroBloom, styles.enterDelay(introAfter(760)))}>
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
  );
}
export function PinnedCampusFrame({
  styles,
  trackRef,
  pinned,
  windowClip,
  photoScale,
  CAMPUS_LAKE,
  lake,
  statistics,
}: {
  styles: {
    anchor: StyleXStyles;
    campusTrack: StyleXStyles;
    campusSticky: StyleXStyles;
    campusWindow: StyleXStyles;
    campusStage: StyleXStyles;
    campusImage: StyleXStyles;
    shell: StyleXStyles;
    inset132: StyleXStyles;
    statsBand: StyleXStyles;
  };
  trackRef: Ref<HTMLDivElement>;
  pinned: boolean;
  windowClip: MotionValue<string>;
  photoScale: MotionValue<number>;
  CAMPUS_LAKE: { src: string; alt: string };
  lake: ReactNode;
  statistics: ReactNode;
}) {
  return (
    <section id="campus" aria-label="研发与生产" {...stylex.props(styles.anchor)}>
      <div ref={trackRef} {...stylex.props(styles.campusTrack)}>
        <div {...stylex.props(styles.campusSticky)}>
          <m.div
            {...stylex.props(styles.campusWindow)}
            style={pinned ? { clipPath: windowClip } : undefined}
          >
            <m.div
              {...stylex.props(styles.campusStage)}
              style={pinned ? { scale: photoScale } : undefined}
            >
              <img
                src={CAMPUS_LAKE.src}
                alt={CAMPUS_LAKE.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.campusImage)}
              />
              {lake}
            </m.div>
          </m.div>
        </div>
      </div>
      {pinned ? null : (
        <div {...stylex.props(styles.shell, styles.inset132, styles.statsBand)}>{statistics}</div>
      )}
    </section>
  );
}
export function StrengthsSection({
  styles,
  Reveal,
  STRENGTHS_INTRO,
  cards,
}: {
  styles: {
    strengths: StyleXStyles;
    inset120: StyleXStyles;
    anchor: StyleXStyles;
    introBlock: StyleXStyles;
    sectionTitle: StyleXStyles;
    sectionLead: StyleXStyles;
    strengthGrid: StyleXStyles;
  };
  Reveal: ComponentType<{ children: ReactNode; delay?: number; sx?: StyleXStyles }>;
  STRENGTHS_INTRO: { title: string; lead: string };
  cards: ReactNode;
}) {
  return (
    <section
      id="strengths"
      aria-labelledby="oo-strengths-title"
      {...stylex.props(styles.strengths, styles.inset120, styles.anchor)}
    >
      <Reveal sx={styles.introBlock}>
        <h2 id="oo-strengths-title" {...stylex.props(styles.sectionTitle)}>
          {STRENGTHS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.sectionLead)}>{STRENGTHS_INTRO.lead}</p>
      </Reveal>
      <div {...stylex.props(styles.strengthGrid)}>{cards}</div>
    </section>
  );
}

export function ZoomingProducts({
  styles,
  Reveal,
  PRODUCTS_INTRO,
  cards,
  delay,
}: {
  styles: {
    products: StyleXStyles;
    inset120: StyleXStyles;
    anchor: StyleXStyles;
    introBlock: StyleXStyles;
    sectionTitle: StyleXStyles;
    sectionLead: StyleXStyles;
    productsCta: StyleXStyles;
    button: StyleXStyles;
    buttonPrimary: StyleXStyles;
    buttonSmall: StyleXStyles;
    productGrid: StyleXStyles;
  };
  Reveal: ComponentType<{ children: ReactNode; delay?: number; sx?: StyleXStyles }>;
  PRODUCTS_INTRO: { title: string; lead: string; cta: { href: string; label: string } };
  cards: ReactNode;
  delay: number;
}) {
  return (
    <section
      id="products"
      aria-labelledby="oo-products-title"
      {...stylex.props(styles.products, styles.inset120, styles.anchor)}
    >
      <Reveal sx={styles.introBlock}>
        <h2 id="oo-products-title" {...stylex.props(styles.sectionTitle)}>
          {PRODUCTS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.sectionLead)}>{PRODUCTS_INTRO.lead}</p>
      </Reveal>
      <Reveal delay={delay} sx={styles.productsCta}>
        <a
          href={PRODUCTS_INTRO.cta.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonSmall)}
        >
          {PRODUCTS_INTRO.cta.label}
        </a>
      </Reveal>
      <div id="product-list" {...stylex.props(styles.productGrid)}>
        {cards}
      </div>
    </section>
  );
}
export function RisingProducts({
  styles,
  Reveal,
  PRODUCTS_INTRO,
  cards,
  delay,
}: {
  styles: {
    products: StyleXStyles;
    inset120: StyleXStyles;
    anchor: StyleXStyles;
    introBlock: StyleXStyles;
    sectionTitle: StyleXStyles;
    sectionLead: StyleXStyles;
    productsCta: StyleXStyles;
    button: StyleXStyles;
    buttonPrimary: StyleXStyles;
    buttonCompact: StyleXStyles;
    productGrid: StyleXStyles;
  };
  Reveal: ComponentType<{ children: ReactNode; delay?: number; sx?: StyleXStyles }>;
  PRODUCTS_INTRO: { title: string; lead: string; cta: { href: string; label: string } };
  cards: ReactNode;
  delay: number;
}) {
  return (
    <section
      id="products"
      aria-labelledby="oo-products-title"
      {...stylex.props(styles.products, styles.inset120, styles.anchor)}
    >
      <Reveal sx={styles.introBlock}>
        <h2 id="oo-products-title" {...stylex.props(styles.sectionTitle)}>
          {PRODUCTS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.sectionLead)}>{PRODUCTS_INTRO.lead}</p>
      </Reveal>
      <Reveal delay={delay} sx={styles.productsCta}>
        <a
          href={PRODUCTS_INTRO.cta.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonCompact)}
        >
          {PRODUCTS_INTRO.cta.label}
        </a>
      </Reveal>
      <div id="product-list" {...stylex.props(styles.productGrid)}>
        {cards}
      </div>
    </section>
  );
}
export function OfficeMapOverview({
  styles,
  ZoomReveal,
  IMAGES,
  OFFICE_MAP_PINS,
  GLOBAL_INTRO,
}: {
  styles: {
    globalBand: StyleXStyles;
    globalRow: StyleXStyles;
    mapWrap: StyleXStyles;
    mapImage: StyleXStyles;
    mapRing: StyleXStyles;
    mapRingAt: (left: string, top: string, delay: string) => StyleXStyles;
    globalCopy: StyleXStyles;
    sectionTitle: StyleXStyles;
    sectionLead: StyleXStyles;
  };
  ZoomReveal: ComponentType<{ children: ReactNode; delay?: number; sx?: StyleXStyles }>;
  IMAGES: { officeMap: { src: string; alt: string } };
  OFFICE_MAP_PINS: readonly { left: number; top: number }[];
  GLOBAL_INTRO: { title: string; lead: string };
}) {
  return (
    <div {...stylex.props(styles.globalBand)}>
      <ZoomReveal sx={styles.globalRow}>
        <div {...stylex.props(styles.mapWrap)}>
          <img
            src={IMAGES.officeMap.src}
            alt={IMAGES.officeMap.alt}
            width={611}
            height={321}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.mapImage)}
          />
          {OFFICE_MAP_PINS.map((pin, index) => (
            <span
              key={`${pin.left}-${pin.top}`}
              aria-hidden="true"
              {...stylex.props(
                styles.mapRing,
                styles.mapRingAt(`${pin.left}%`, `${pin.top}%`, `${(index * 370) % 2800}ms`),
              )}
            />
          ))}
        </div>
        <div {...stylex.props(styles.globalCopy)}>
          <h2 id="oo-offices-title" {...stylex.props(styles.sectionTitle)}>
            {GLOBAL_INTRO.title}
          </h2>
          <p {...stylex.props(styles.sectionLead)}>{GLOBAL_INTRO.lead}</p>
        </div>
      </ZoomReveal>
    </div>
  );
}
export function CorporateMain({
  styles,
  Hero,
  About,
  Campus,
  Strengths,
  Products,
  Offices,
  News,
  ContactCta,
}: {
  styles: { mainTarget: StyleXStyles };
  Hero: ComponentType;
  About: ComponentType;
  Campus: ComponentType;
  Strengths: ComponentType;
  Products: ComponentType;
  Offices: ComponentType;
  News: ComponentType;
  ContactCta: ComponentType;
}) {
  return (
    <main id="main-content" tabIndex={-1} {...stylex.props(styles.mainTarget)}>
      <Hero />
      <About />
      <Campus />
      <Strengths />
      <Products />
      <Offices />
      <News />
      <Flow>
        <ContactCta />
      </Flow>
    </main>
  );
}
export function SpecificationNavActions({
  styles,
  open,
  panelId,
  setOpen,
}: {
  styles: {
    navRight: StyleXStyles;
    ctaPrimary: StyleXStyles;
    ctaCompact: StyleXStyles;
    navCta: StyleXStyles;
    menuButton: StyleXStyles;
  };
  open: boolean;
  panelId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div {...stylex.props(styles.navRight)}>
      <a
        href={createInquiryHref("contact")}
        {...stylex.props(styles.ctaPrimary, styles.ctaCompact, styles.navCta)}
      >
        Request a specification
        <ArrowRight aria-hidden size={14} />
      </a>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        {...stylex.props(styles.menuButton)}
      >
        {open ? <X aria-hidden size={18} /> : <Menu aria-hidden size={18} />}
      </button>
    </div>
  );
}
