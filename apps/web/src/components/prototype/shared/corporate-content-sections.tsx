import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { Component, Setter } from "solid-js";
import type { ComponentProps, JSX } from "@solidjs/web";
import { m, type MotionValue } from "@/compat/motion";
import { ArrowUpRight, ArrowRight, FileDown, Menu, X } from "@fenchem-lp/ui/components/lucide";
import { colors, typography } from "@fenchem-lp/ui/tokens.stylex";
import { createInquiryHref, type Ingredient } from "@/components/landing/landing-content";
import { STAGGER } from "../motion-constants";
import { Reveal } from "../motion";
import { FooterNavigation, FooterLegal } from "./footer-content";
import { Flow } from "./flow";
export function EngineeringStatus(props: {
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
  const styles = props.styles;
  return (
    <div {...stylex.attrs(styles.microStrip)}>
      <span {...stylex.attrs(styles.microText)}>
        <span {...stylex.attrs(styles.pingWrap)}>
          <span {...stylex.attrs(styles.pingOuter)} />
          <span {...stylex.attrs(styles.pingInner)} />
        </span>
        {props.status}
      </span>
      <span {...stylex.attrs(styles.microText)}>{props.middle}</span>
      <span {...stylex.attrs(styles.microText)}>{props.last}</span>
    </div>
  );
}
export function IngredientCardDetails(props: {
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
  const styles = props.styles;
  return (
    <div {...stylex.attrs(styles.matrixCardBody)}>
      <div {...stylex.attrs(styles.matrixCardMeta)}>
        <span {...stylex.attrs(styles.matrixCardIndex)}>
          {String(props.i + 1).padStart(2, "0")} —
        </span>
        <span {...stylex.attrs(styles.matrixCardCode)}>{props.item.code}</span>
      </div>
      <h3 {...stylex.attrs(styles.matrixCardTitle)}>{props.item.name}</h3>
      <p {...stylex.attrs(styles.matrixCardLatin)}>{props.item.latin}</p>
      <dl {...stylex.attrs(styles.matrixCardDl)}>
        <div {...stylex.attrs(styles.matrixCardDlRow)}>
          <dt {...stylex.attrs(styles.techLabel)}>Purity</dt>
          <dd
            style={{
              margin: 0,
              "font-family": typography.tech,
              "font-size": "12px",
              color: colors.mute700,
            }}
          >
            {props.item.purity}
          </dd>
        </div>
        <div {...stylex.attrs(styles.matrixCardDlRow)}>
          <dt {...stylex.attrs(styles.techLabel)}>Form</dt>
          <dd
            style={{
              margin: 0,
              "font-family": typography.tech,
              "font-size": "12px",
              color: colors.mute700,
            }}
          >
            {props.item.form}
          </dd>
        </div>
      </dl>
      <a href="#contact" {...stylex.attrs(styles.matrixSpecLink)}>
        Request Spec
        <ArrowUpRight aria-hidden="true" size={12} />
      </a>
    </div>
  );
}
export function IngredientDossierDetails(props: {
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
  const styles = props.styles;
  return (
    <div {...stylex.attrs(styles.dossierBodyCol)}>
      <Reveal>
        <h3 {...stylex.attrs(styles.dossierTitle)}>{props.DOSSIER.name}</h3>
        <p {...stylex.attrs(styles.dossierLatin)}>{props.DOSSIER.latin}</p>
        <p {...stylex.attrs(styles.dossierDescription)}>
          A branded, clinically studied adaptogen standardized by withanolide content. Supplied with
          full identity, potency and stability documentation — chromatographic panels run on every
          production batch, third-party verification on request.
        </p>
      </Reveal>

      <Reveal delay={STAGGER}>
        <dl {...stylex.attrs(styles.dossierDl)}>
          {props.SPEC_ROWS.map((row) => (
            <div {...stylex.attrs(styles.dossierDlRow)}>
              <dt {...stylex.attrs(styles.techLabel)}>{row.label}</dt>
              <dd {...stylex.attrs(styles.dossierDd)}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={STAGGER * 2}>
        <div {...stylex.attrs(styles.dossierFormatsRow)}>
          {["Capsule", "Tablet", "Softgel", "Powder blend"].map((format) => (
            <span {...stylex.attrs(styles.dossierFormatPill)}>{format}</span>
          ))}
        </div>
        <div {...stylex.attrs(styles.dossierActionsRow)}>
          <a href={createInquiryHref("dossier")} {...stylex.attrs(styles.ctaPrimary)}>
            Request this specification
            <ArrowRight aria-hidden="true" size={16} />
          </a>
          <a href={createInquiryHref("tds")} {...stylex.attrs(styles.ctaOutlineBlue)}>
            <FileDown aria-hidden="true" size={16} />
            Technical data sheet
          </a>
        </div>
      </Reveal>
    </div>
  );
}
export function InsetCorporateFooter(props: {
  styles: {
    footer: StyleXStyles;
    shell: StyleXStyles;
    inset132: StyleXStyles;
    footerInner: StyleXStyles;
    footerRule: StyleXStyles;
  };
  children: JSX.Element;
  logo: ComponentProps<typeof FooterNavigation>["logo"];
  columns: ComponentProps<typeof FooterNavigation>["columns"];
  copyright: string;
  navigationStyles: ComponentProps<typeof FooterNavigation>["styles"];
  legalStyles: ComponentProps<typeof FooterLegal>["styles"];
}) {
  const styles = props.styles;
  return (
    <footer {...stylex.attrs(styles.footer)}>
      <div {...stylex.attrs(styles.shell, styles.inset132, styles.footerInner)}>
        <FooterNavigation
          logo={props.logo}
          columns={props.columns}
          styles={props.navigationStyles}
        />
        <hr {...stylex.attrs(styles.footerRule)} />
        <FooterLegal copyright={props.copyright} styles={props.legalStyles}>
          {props.children}
        </FooterLegal>
      </div>
    </footer>
  );
}
export function BloomHeroCopy(props: {
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
  headline: JSX.Element;
}) {
  const styles = props.styles;
  return (
    <m.div
      {...stylex.attrs(styles.shell, styles.inset120, styles.heroContent)}
      style={props.reduce ? undefined : { y: props.contentY, opacity: props.contentOpacity }}
    >
      <div {...stylex.attrs(styles.heroCopy)}>
        <h1 id="oo-hero-title" {...stylex.attrs(styles.heroTitle)}>
          {props.headline}{" "}
          <span
            {...stylex.attrs(
              styles.heroSubtitle,
              styles.heroBloom,
              styles.enterDelay(props.introAfter(600)),
            )}
          >
            {props.HERO.title}
          </span>
        </h1>
      </div>
      <div
        {...stylex.attrs(styles.ctaRow, styles.heroBloom, styles.enterDelay(props.introAfter(760)))}
      >
        <a
          href={props.HERO.primary.href}
          {...stylex.attrs(styles.button, styles.buttonPrimary, styles.buttonHero)}
        >
          {props.HERO.primary.label}
        </a>
        <a
          href={props.HERO.secondary.href}
          {...stylex.attrs(styles.button, styles.buttonSecondary, styles.buttonHero)}
        >
          {props.HERO.secondary.label}
        </a>
      </div>
    </m.div>
  );
}
export function PinnedCampusFrame(props: {
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
  trackRef: (el: HTMLDivElement) => void;
  pinned: boolean;
  windowClip: MotionValue<string>;
  photoScale: MotionValue<number>;
  CAMPUS_LAKE: { src: string; alt: string };
  lake: JSX.Element;
  statistics: JSX.Element;
}) {
  const styles = props.styles;
  return (
    <section id="campus" aria-label="R&D and production" {...stylex.attrs(styles.anchor)}>
      <div ref={(el) => props.trackRef(el)} {...stylex.attrs(styles.campusTrack)}>
        <div {...stylex.attrs(styles.campusSticky)}>
          <m.div
            {...stylex.attrs(styles.campusWindow)}
            style={props.pinned ? { clipPath: props.windowClip } : undefined}
          >
            <m.div
              {...stylex.attrs(styles.campusStage)}
              style={props.pinned ? { scale: props.photoScale } : undefined}
            >
              <img
                src={props.CAMPUS_LAKE.src}
                alt={props.CAMPUS_LAKE.alt}
                loading="lazy"
                decoding="async"
                {...stylex.attrs(styles.campusImage)}
              />
              {props.lake}
            </m.div>
          </m.div>
        </div>
      </div>
      {props.pinned ? null : (
        <div {...stylex.attrs(styles.shell, styles.inset132, styles.statsBand)}>
          {props.statistics}
        </div>
      )}
    </section>
  );
}
type RevealComponent = Component<{ children: JSX.Element; delay?: number; sx?: StyleXStyles }>;
export function StrengthsSection(props: {
  styles: {
    strengths: StyleXStyles;
    inset120: StyleXStyles;
    anchor: StyleXStyles;
    introBlock: StyleXStyles;
    sectionTitle: StyleXStyles;
    sectionLead: StyleXStyles;
    strengthGrid: StyleXStyles;
  };
  Reveal: RevealComponent;
  STRENGTHS_INTRO: { title: string; lead: string };
  cards: JSX.Element;
}) {
  const styles = props.styles;
  return (
    <section
      id="strengths"
      aria-labelledby="oo-strengths-title"
      {...stylex.attrs(styles.strengths, styles.inset120, styles.anchor)}
    >
      <props.Reveal sx={styles.introBlock}>
        <h2 id="oo-strengths-title" {...stylex.attrs(styles.sectionTitle)}>
          {props.STRENGTHS_INTRO.title}
        </h2>
        <p {...stylex.attrs(styles.sectionLead)}>{props.STRENGTHS_INTRO.lead}</p>
      </props.Reveal>
      <div {...stylex.attrs(styles.strengthGrid)}>{props.cards}</div>
    </section>
  );
}

export function ZoomingProducts(props: {
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
  Reveal: RevealComponent;
  PRODUCTS_INTRO: { title: string; lead: string; cta: { href: string; label: string } };
  cards: JSX.Element;
  delay: number;
}) {
  const styles = props.styles;
  return (
    <section
      id="products"
      aria-labelledby="oo-products-title"
      {...stylex.attrs(styles.products, styles.inset120, styles.anchor)}
    >
      <props.Reveal sx={styles.introBlock}>
        <h2 id="oo-products-title" {...stylex.attrs(styles.sectionTitle)}>
          {props.PRODUCTS_INTRO.title}
        </h2>
        <p {...stylex.attrs(styles.sectionLead)}>{props.PRODUCTS_INTRO.lead}</p>
      </props.Reveal>
      <props.Reveal delay={props.delay} sx={styles.productsCta}>
        <a
          href={props.PRODUCTS_INTRO.cta.href}
          {...stylex.attrs(styles.button, styles.buttonPrimary, styles.buttonSmall)}
        >
          {props.PRODUCTS_INTRO.cta.label}
        </a>
      </props.Reveal>
      <div id="product-list" {...stylex.attrs(styles.productGrid)}>
        {props.cards}
      </div>
    </section>
  );
}
export function RisingProducts(props: {
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
  Reveal: RevealComponent;
  PRODUCTS_INTRO: { title: string; lead: string; cta: { href: string; label: string } };
  cards: JSX.Element;
  delay: number;
}) {
  const styles = props.styles;
  return (
    <section
      id="products"
      aria-labelledby="oo-products-title"
      {...stylex.attrs(styles.products, styles.inset120, styles.anchor)}
    >
      <props.Reveal sx={styles.introBlock}>
        <h2 id="oo-products-title" {...stylex.attrs(styles.sectionTitle)}>
          {props.PRODUCTS_INTRO.title}
        </h2>
        <p {...stylex.attrs(styles.sectionLead)}>{props.PRODUCTS_INTRO.lead}</p>
      </props.Reveal>
      <props.Reveal delay={props.delay} sx={styles.productsCta}>
        <a
          href={props.PRODUCTS_INTRO.cta.href}
          {...stylex.attrs(styles.button, styles.buttonPrimary, styles.buttonCompact)}
        >
          {props.PRODUCTS_INTRO.cta.label}
        </a>
      </props.Reveal>
      <div id="product-list" {...stylex.attrs(styles.productGrid)}>
        {props.cards}
      </div>
    </section>
  );
}
export function OfficeMapOverview(props: {
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
  ZoomReveal: RevealComponent;
  IMAGES: { officeMap: { src: string; alt: string } };
  OFFICE_MAP_PINS: readonly { left: number; top: number }[];
  GLOBAL_INTRO: { title: string; lead: string };
}) {
  const styles = props.styles;
  return (
    <div {...stylex.attrs(styles.globalBand)}>
      <props.ZoomReveal sx={styles.globalRow}>
        <div {...stylex.attrs(styles.mapWrap)}>
          <img
            src={props.IMAGES.officeMap.src}
            alt={props.IMAGES.officeMap.alt}
            width={611}
            height={321}
            loading="lazy"
            decoding="async"
            {...stylex.attrs(styles.mapImage)}
          />
          {props.OFFICE_MAP_PINS.map((pin, index) => (
            <span
              aria-hidden="true"
              {...stylex.attrs(
                styles.mapRing,
                styles.mapRingAt(`${pin.left}%`, `${pin.top}%`, `${(index * 370) % 2800}ms`),
              )}
            />
          ))}
        </div>
        <div {...stylex.attrs(styles.globalCopy)}>
          <h2 id="oo-offices-title" {...stylex.attrs(styles.sectionTitle)}>
            {props.GLOBAL_INTRO.title}
          </h2>
          <p {...stylex.attrs(styles.sectionLead)}>{props.GLOBAL_INTRO.lead}</p>
        </div>
      </props.ZoomReveal>
    </div>
  );
}
export function CorporateMain(props: {
  styles: { mainTarget: StyleXStyles };
  Hero: Component;
  About: Component;
  Campus: Component;
  Strengths: Component;
  Products: Component;
  Offices: Component;
  News: Component;
  ContactCta: Component;
}) {
  return (
    <main id="main-content" tabindex={-1} {...stylex.attrs(props.styles.mainTarget)}>
      <props.Hero />
      <props.About />
      <props.Campus />
      <props.Strengths />
      <props.Products />
      <props.Offices />
      <props.News />
      <Flow>
        <props.ContactCta />
      </Flow>
    </main>
  );
}
export function SpecificationNavActions(props: {
  styles: {
    navRight: StyleXStyles;
    ctaPrimary: StyleXStyles;
    ctaCompact: StyleXStyles;
    navCta: StyleXStyles;
    menuButton: StyleXStyles;
  };
  open: boolean;
  panelId: string;
  setOpen: Setter<boolean>;
}) {
  const styles = props.styles;
  return (
    <div {...stylex.attrs(styles.navRight)}>
      <a
        href={createInquiryHref("contact")}
        {...stylex.attrs(styles.ctaPrimary, styles.ctaCompact, styles.navCta)}
      >
        Request a specification
        <ArrowRight aria-hidden="true" size={14} />
      </a>
      <button
        type="button"
        aria-expanded={props.open ? "true" : "false"}
        aria-controls={props.panelId}
        aria-label={props.open ? "Close menu" : "Open menu"}
        onClick={() => props.setOpen((v) => !v)}
        {...stylex.attrs(styles.menuButton)}
      >
        {props.open ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
      </button>
    </div>
  );
}
