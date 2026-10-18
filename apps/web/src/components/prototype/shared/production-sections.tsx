import { children, createEffect, createMemo, createSignal, For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";
import { m, useScroll, useTransform } from "@/compat/motion";
import { ArrowRight, CheckCircle2, Leaf } from "@fenchem-lp/ui/components/lucide";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import { EASE, STAGGER } from "../motion-constants";
import { Reveal } from "../motion";
import { useReducedMotion } from "../use-reduced-motion";
import {
  certificationDetails,
  certifications,
  company,
  createInquiryHref,
  getIngredientsByApplication,
  ingredients,
  pillars,
  processSteps,
  regions,
  type IngredientApplication,
} from "@/components/landing/landing-content";
import {
  IMG,
  STATS,
  PILLAR_ICONS,
  FOOTER_COLS,
  MENU_APPLICATIONS,
  FORM_OPTIONS,
} from "./production-content";
type ProductionStyles = Record<
  | "header"
  | "container"
  | "microStrip"
  | "microStripItem"
  | "liveDotOuter"
  | "liveDotPing"
  | "liveDotInner"
  | "techLabel"
  | "navInner"
  | "brandLink"
  | "brandText"
  | "brandLeaf"
  | "navDesktopLinks"
  | "navLink"
  | "navRight"
  | "ctaPrimaryCompact"
  | "progressHairline"
  | "heroSection"
  | "heroGrid"
  | "heroLeft"
  | "heroBadge"
  | "heroHeading"
  | "textGreen600"
  | "heroLead"
  | "heroActions"
  | "ctaPrimary"
  | "ctaOutlineBlue"
  | "heroStatGrid"
  | "heroStatItem"
  | "heroStatUnit"
  | "heroStatValue"
  | "heroStatDesc"
  | "heroRight"
  | "heroImgContainer"
  | "heroImg"
  | "heroImgScrim"
  | "heroCaptionBadge"
  | "eyebrowGreen"
  | "formulationSection"
  | "sectionAsideLead"
  | "formulationGrid"
  | "formulationLeft"
  | "formulationFieldset"
  | "chipsWrapRow"
  | "processStripOuter"
  | "processOl"
  | "processLi"
  | "processIndex"
  | "processTitle"
  | "processCopy"
  | "formulationRight"
  | "specDraftHeader"
  | "specDraftLabel"
  | "specDraftCode"
  | "specDraftDl"
  | "specDraftDlRow"
  | "specDraftDt"
  | "specDraftDd"
  | "specMatchesList"
  | "specMatchItem"
  | "specSubmitBtn"
  | "specDossiersRequestNote"
  | "standardsSection"
  | "originGrid"
  | "originImgCol"
  | "originImg"
  | "originTextCol"
  | "originTitle"
  | "originQuote"
  | "standardsGrid"
  | "labImgCol"
  | "labImgContainer"
  | "labImg"
  | "labImgScrim"
  | "labCaptionBadge"
  | "pillarsCol"
  | "pillarInner"
  | "pillarRowBorder"
  | "pillarIconBox"
  | "pillarTitle"
  | "pillarCopy"
  | "pillarCert"
  | "finaleSection"
  | "finaleThumbImg"
  | "finaleScrim"
  | "finaleInner"
  | "eyebrowGreen400"
  | "finaleHeading"
  | "finaleLead"
  | "finaleActions"
  | "ctaPrimaryDark"
  | "finaleSecondaryBtn"
  | "finaleResponseTime"
  | "officesOuter"
  | "officesGrid"
  | "officeCardBg"
  | "officeCardInner"
  | "officeCity"
  | "officeShort"
  | "officeCoords"
  | "footer"
  | "footerGrid"
  | "footerBrandCol"
  | "footerBrandRow"
  | "footerBrandTagline"
  | "footerEst"
  | "footerCertsList"
  | "footerCertBadge"
  | "footerNavCol"
  | "footerNavList"
  | "footerNavLink"
  | "footerWordmark"
  | "footerLegal"
  | "sectionHeaderRow"
  | "sectionHeading"
  | "chipBase"
  | "chipSelected"
  | "chipUnselected",
  StyleXStyles
>;
export function NavBar(props: {
  styles: ProductionStyles;
  portfolioMenu: JSX.Element;
  mobileNav: JSX.Element;
}) {
  const styles = props.styles;
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  return (
    <header {...stylex.attrs(styles.header)}>
      <div {...stylex.attrs(styles.container)}>
        {/* Micro-strip */}
        <div {...stylex.attrs(styles.microStrip)}>
          <span {...stylex.attrs(styles.microStripItem)}>
            <span {...stylex.attrs(styles.liveDotOuter)}>
              <span {...stylex.attrs(styles.liveDotPing)} />
              <span {...stylex.attrs(styles.liveDotInner)} />
            </span>
            Botanical Intelligence Since 1995
          </span>
          <span {...stylex.attrs(styles.techLabel)}>ISO 9001 · GMP · HACCP</span>
          <span {...stylex.attrs(styles.techLabel)}>{company.hq.coords} — Nanjing HQ</span>
        </div>
        {/* Main nav */}
        <nav aria-label="Main navigation" {...stylex.attrs(styles.navInner)}>
          <a href="#top" aria-label="Fenchem home" {...stylex.attrs(styles.brandLink)}>
            <span {...stylex.attrs(styles.brandText)}>FENCHEM</span>
            <Leaf aria-hidden="true" strokeWidth={1.5} {...stylex.attrs(styles.brandLeaf)} />
          </a>
          <div {...stylex.attrs(styles.navDesktopLinks)}>
            <a href="#industries" {...stylex.attrs(styles.navLink)}>
              Industries
            </a>
            {props.portfolioMenu}
            <a href="#formulation" {...stylex.attrs(styles.navLink)}>
              Formulation
            </a>
            <a href="#standards" {...stylex.attrs(styles.navLink)}>
              Standards
            </a>
          </div>
          <div {...stylex.attrs(styles.navRight)}>
            {props.mobileNav}
            <a href="#contact" {...stylex.attrs(styles.ctaPrimaryCompact)}>
              Request a Specification
              <ArrowRight aria-hidden="true" size={14} />
            </a>
          </div>
        </nav>
      </div>
      <Show when={!reduce()}>
        <m.div
          aria-hidden="true"
          {...stylex.attrs(styles.progressHairline)}
          style={{
            scaleX: scrollYProgress,
          }}
        />
      </Show>
    </header>
  );
}
export function HeroSection(props: { styles: ProductionStyles }) {
  const styles = props.styles;
  const reduce = useReducedMotion();
  const [imgEl, setImgEl] = createSignal<HTMLDivElement>();
  const { scrollYProgress } = useScroll({
    target: imgEl,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  return (
    <section id="top" aria-label="Hero" {...stylex.attrs(styles.heroSection)}>
      <div {...stylex.attrs(styles.container)}>
        <div {...stylex.attrs(styles.heroGrid)}>
          {/* Left: Headline block */}
          <div {...stylex.attrs(styles.heroLeft)}>
            <Reveal>
              <p {...stylex.attrs(styles.heroBadge)}>Botanical Intelligence Since 1995</p>
            </Reveal>
            <Reveal delay={STAGGER}>
              <h1 {...stylex.attrs(styles.heroHeading)}>
                Nurturing Vitality
                <br />
                through <span {...stylex.attrs(styles.textGreen600)}>Botanical Excellence</span>
              </h1>
            </Reveal>
            <Reveal delay={STAGGER * 2}>
              <p {...stylex.attrs(styles.heroLead)}>
                Fenchem converts raw botanical complexity into precisely specified, clinically
                validated actives — supplied at industrial scale to formulators in more than forty
                countries.
              </p>
            </Reveal>
            <Reveal delay={STAGGER * 3}>
              <div {...stylex.attrs(styles.heroActions)}>
                <a href="#matrix" {...stylex.attrs(styles.ctaPrimary)}>
                  Explore Portfolio
                  <ArrowRight aria-hidden="true" size={16} />
                </a>
                <a href="#formulation" {...stylex.attrs(styles.ctaOutlineBlue)}>
                  Build a Formulation
                </a>
              </div>
            </Reveal>

            {/* Stat band */}
            <Reveal delay={STAGGER * 4}>
              <dl {...stylex.attrs(styles.heroStatGrid)}>
                {STATS.map((s) => (
                  <div {...stylex.attrs(styles.heroStatItem)}>
                    <dt {...stylex.attrs(styles.heroStatUnit)}>{s.unit}</dt>
                    <dd
                      style={{
                        margin: 0,
                        "margin-top": "6px",
                      }}
                    >
                      <span {...stylex.attrs(styles.heroStatValue)}>{s.value}</span>
                      <p {...stylex.attrs(styles.heroStatDesc)}>{s.desc}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: botanical image */}
          <div {...stylex.attrs(styles.heroRight)}>
            <div ref={setImgEl} {...stylex.attrs(styles.heroImgContainer)}>
              <m.img
                src={IMG.hero}
                alt="Lush green botanical leaves in morning light — representing Fenchem's natural ingredient sourcing"
                {...stylex.attrs(styles.heroImg)}
                style={{
                  y: reduce() ? 0 : imgY,
                }}
                initial={
                  reduce()
                    ? false
                    : {
                        scale: 1.06,
                      }
                }
                animate={{
                  scale: 1,
                }}
                transition={{
                  duration: 1.4,
                  ease: EASE,
                }}
                loading="eager"
              />
              <div aria-hidden="true" {...stylex.attrs(styles.heroImgScrim)} />
            </div>
            {/* Caption badge */}
            <div {...stylex.attrs(styles.heroCaptionBadge)}>
              <span {...stylex.attrs(styles.techLabel)}>{company.tagline}</span>
              <span {...stylex.attrs(styles.eyebrowGreen)}>{company.since}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function FormulationSection(props: { styles: ProductionStyles }) {
  const styles = props.styles;
  const [application, setApplication] = createSignal<IngredientApplication>("Nutrition");
  const [form, setForm] = createSignal<(typeof FORM_OPTIONS)[number]>("Beadlet");
  const [regulatory, setRegulatory] = createSignal<string[]>(["ISO 9001", "GMP"]);
  const regulatoryNames = createMemo(() => new Set(regulatory()));
  const matches = createMemo(() => getIngredientsByApplication(application()));
  const toggleRegulatory = (name: string) =>
    setRegulatory((current) =>
      current.includes(name) ? current.filter((c) => c !== name) : [...current, name],
    );
  return (
    <section
      id="formulation"
      aria-labelledby="formulation-heading"
      {...stylex.attrs(styles.formulationSection)}
    >
      <div {...stylex.attrs(styles.container)}>
        <SectionHeader
          styles={styles}
          id="formulation-heading"
          number="04"
          label="Formulation"
          title="Your target spec,"
          accent="engineered back to you"
          aside={
            <p {...stylex.attrs(styles.sectionAsideLead)}>
              Pick the shape of your formulation — our laboratory returns a validated proposal
              within one business day.
            </p>
          }
        />

        <div {...stylex.attrs(styles.formulationGrid)}>
          {/* Pickers */}
          <div {...stylex.attrs(styles.formulationLeft)}>
            <div>
              <p id="formulation-application-label" {...stylex.attrs(styles.techLabel)}>
                Application
              </p>
              <RadioChips
                styles={styles}
                label="Application"
                options={MENU_APPLICATIONS}
                value={application()}
                onChange={setApplication}
              />
            </div>

            <div
              style={{
                "margin-top": "32px",
              }}
            >
              <p {...stylex.attrs(styles.techLabel)}>Delivery form</p>
              <RadioChips
                styles={styles}
                label="Delivery form"
                options={FORM_OPTIONS}
                value={form()}
                onChange={setForm}
              />
            </div>

            <fieldset {...stylex.attrs(styles.formulationFieldset)}>
              <legend {...stylex.attrs(styles.techLabel)}>Regulatory map</legend>
              <div {...stylex.attrs(styles.chipsWrapRow)}>
                {certificationDetails.map((cert) => (
                  <Chip
                    styles={styles}
                    label={cert.name}
                    selected={regulatoryNames().has(cert.name)}
                    onClick={() => toggleRegulatory(cert.name)}
                  />
                ))}
              </div>
            </fieldset>

            {/* Process strip */}
            <div {...stylex.attrs(styles.processStripOuter)}>
              <p {...stylex.attrs(styles.techLabel)}>What happens next</p>
              <ol {...stylex.attrs(styles.processOl)}>
                {processSteps.map((step, i) => (
                  <li {...stylex.attrs(styles.processLi)}>
                    <span {...stylex.attrs(styles.processIndex)}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p {...stylex.attrs(styles.processTitle)}>{step.title}</p>
                      <p {...stylex.attrs(styles.processCopy)}>{step.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Live spec sheet */}
          <div {...stylex.attrs(styles.formulationRight)}>
            <div {...stylex.attrs(styles.specDraftHeader)}>
              <span {...stylex.attrs(styles.specDraftLabel)}>Draft Specification</span>
              <span {...stylex.attrs(styles.specDraftCode)}>FN-REQ / 2026</span>
            </div>
            <div aria-live="polite">
              <dl {...stylex.attrs(styles.specDraftDl)}>
                {(
                  [
                    ["Application", () => application()],
                    ["Delivery form", () => form()],
                    ["Regulatory", () => (regulatory().length ? regulatory().join(" · ") : "—")],
                    [
                      "Matching actives",
                      () => `${matches().length} of ${ingredients.length} in portfolio`,
                    ],
                    ["Response", () => "< 24h with full documentation"],
                  ] as const
                ).map(([label, value]) => (
                  <div {...stylex.attrs(styles.specDraftDlRow)}>
                    <dt {...stylex.attrs(styles.specDraftDt)}>{label}</dt>
                    <dd {...stylex.attrs(styles.specDraftDd)}>{value()}</dd>
                  </div>
                ))}
              </dl>
              <ul {...stylex.attrs(styles.specMatchesList)}>
                <For each={matches().slice(0, 3)}>
                  {(item) => (
                    <li {...stylex.attrs(styles.specMatchItem)}>
                      <CheckCircle2 aria-hidden="true" size={12} color={colors.brandGreen400} />
                      {item.name} — {item.purity}
                    </li>
                  )}
                </For>
              </ul>
            </div>
            <a href={createInquiryHref("formulation")} {...stylex.attrs(styles.specSubmitBtn)}>
              Submit this specification
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <p {...stylex.attrs(styles.specDossiersRequestNote)}>Technical dossiers on request</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export function StandardsSection(props: { styles: ProductionStyles }) {
  const styles = props.styles;
  const reduce = useReducedMotion();
  const [imgEl, setImgEl] = createSignal<HTMLDivElement>();
  const { scrollYProgress } = useScroll({
    target: imgEl,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <section
      id="standards"
      aria-labelledby="standards-heading"
      {...stylex.attrs(styles.standardsSection)}
    >
      <div {...stylex.attrs(styles.container)}>
        {/* Origin editorial beat */}
        <div {...stylex.attrs(styles.originGrid)}>
          <div {...stylex.attrs(styles.originImgCol)}>
            <img
              src={IMG.origin}
              alt="Rows of cultivated green crops on a partner farm at golden hour"
              loading="lazy"
              {...stylex.attrs(styles.originImg)}
            />
          </div>
          <div {...stylex.attrs(styles.originTextCol)}>
            <Reveal>
              <p {...stylex.attrs(styles.eyebrowGreen)}>Origin</p>
              <h2 {...stylex.attrs(styles.originTitle)}>
                Grown with{" "}
                <em
                  style={{
                    "font-style": "italic",
                    color: colors.brandGreen600,
                  }}
                >
                  patience.
                </em>
              </h2>
              <p {...stylex.attrs(styles.heroLead)}>
                Our botanicals begin in soil we know by name — a global network of partner farms
                cultivated over decades, where harvests are timed to the plant, never to the
                quarter.
              </p>
              <blockquote {...stylex.attrs(styles.originQuote)}>
                "Nature holds the keys to human vitality. We simply refuse to lose them in
                translation."
              </blockquote>
            </Reveal>
          </div>
        </div>

        <SectionHeader
          styles={styles}
          id="standards-heading"
          number="05"
          label="Quality Infrastructure"
          title="Science-backed"
          accent="standards"
          aside={
            <p {...stylex.attrs(styles.sectionAsideLead)}>
              Every lot. Every market. Every release — documented to your regulatory map.
            </p>
          }
        />

        <div {...stylex.attrs(styles.standardsGrid)}>
          {/* Image */}
          <div {...stylex.attrs(styles.labImgCol)}>
            <div ref={setImgEl} {...stylex.attrs(styles.labImgContainer)}>
              <m.img
                src={IMG.lab}
                alt="Dense botanical foliage awaiting quality-control intake at the Nanjing laboratory"
                {...stylex.attrs(styles.labImg)}
                style={{
                  y: reduce() ? 0 : imgY,
                }}
                loading="lazy"
              />
              <div aria-hidden="true" {...stylex.attrs(styles.labImgScrim)} />
              <div {...stylex.attrs(styles.labCaptionBadge)}>
                <span {...stylex.attrs(styles.techLabel)}>QC Program — Nanjing</span>
                <span {...stylex.attrs(styles.eyebrowGreen)}>Identity · Potency · Stability</span>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div {...stylex.attrs(styles.pillarsCol)}>
            {pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal delay={i * STAGGER}>
                  <div
                    {...stylex.attrs(
                      styles.pillarInner,
                      i < pillars.length - 1 && styles.pillarRowBorder,
                    )}
                  >
                    <div {...stylex.attrs(styles.pillarIconBox)}>
                      <Icon aria-hidden="true" strokeWidth={1.5} size={24} />
                    </div>
                    <div>
                      <h3 {...stylex.attrs(styles.pillarTitle)}>{pillar.title}</h3>
                      <p {...stylex.attrs(styles.pillarCopy)}>{pillar.copy}</p>
                      <div {...stylex.attrs(styles.pillarCert)}>
                        <CheckCircle2 aria-hidden="true" size={14} />
                        ISO 9001 · GMP Certified
                      </div>
                    </div>
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
export function FinaleSection(props: { styles: ProductionStyles }) {
  const styles = props.styles;
  const reduce = useReducedMotion();
  const [sectionEl, setSectionEl] = createSignal<HTMLElement>();
  const { scrollYProgress } = useScroll({
    target: sectionEl,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <section
      id="contact"
      ref={setSectionEl}
      aria-labelledby="contact-heading"
      {...stylex.attrs(styles.finaleSection)}
    >
      <m.div
        aria-hidden="true"
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          y: reduce() ? 0 : bgY,
        }}
      >
        <img src={IMG.heroThumb} alt="" loading="lazy" {...stylex.attrs(styles.finaleThumbImg)} />
      </m.div>
      <div aria-hidden="true" {...stylex.attrs(styles.finaleScrim)} />

      <div {...stylex.attrs(styles.container, styles.finaleInner)}>
        <Reveal>
          <p {...stylex.attrs(styles.eyebrowGreen400)}>06 — Partner with Fenchem</p>
          <h2 id="contact-heading" {...stylex.attrs(styles.finaleHeading)}>
            Your next formulation,{" "}
            <span
              style={{
                color: colors.brandGreen400,
              }}
            >
              engineered to specification
            </span>
          </h2>
          <p {...stylex.attrs(styles.finaleLead)}>
            Submit a target spec — purity, form, matrix, regulatory map — and our laboratory returns
            a validated proposal with full documentation within one business day.
          </p>
        </Reveal>

        <Reveal delay={STAGGER * 2}>
          <div {...stylex.attrs(styles.finaleActions)}>
            <a href={createInquiryHref("contact")} {...stylex.attrs(styles.ctaPrimaryDark)}>
              Partner with Fenchem
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a href="#matrix" {...stylex.attrs(styles.finaleSecondaryBtn)}>
              Explore Portfolio
            </a>
          </div>
        </Reveal>

        <Reveal delay={STAGGER * 3}>
          <p {...stylex.attrs(styles.finaleResponseTime)}>
            Response Time &lt; 24h — Technical Dossiers on Request
          </p>
        </Reveal>

        {/* Office nodes */}
        <div {...stylex.attrs(styles.officesOuter)}>
          <Reveal>
            <p {...stylex.attrs(styles.eyebrowGreen400)}>6 Global Bases — 40+ Countries Served</p>
          </Reveal>
          <div {...stylex.attrs(styles.officesGrid)}>
            {regions.map((region, i) => (
              <Reveal delay={i * (STAGGER * 0.75)}>
                <div {...stylex.attrs(styles.officeCardBg)}>
                  <div {...stylex.attrs(styles.officeCardInner)}>
                    <p {...stylex.attrs(styles.officeCity)}>{region.city}</p>
                    <p {...stylex.attrs(styles.officeShort)}>{region.short}</p>
                    <p {...stylex.attrs(styles.officeCoords)}>{region.coords}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export function FooterSection(props: { styles: ProductionStyles }) {
  const styles = props.styles;
  return (
    <footer {...stylex.attrs(styles.footer)}>
      <div {...stylex.attrs(styles.container)}>
        <div {...stylex.attrs(styles.footerGrid)}>
          {/* Brand block */}
          <div {...stylex.attrs(styles.footerBrandCol)}>
            <div {...stylex.attrs(styles.footerBrandRow)}>
              <span {...stylex.attrs(styles.brandText)}>FENCHEM</span>
              <Leaf aria-hidden="true" strokeWidth={1.5} size={20} color={colors.brandGreen500} />
            </div>
            <p {...stylex.attrs(styles.footerBrandTagline)}>{company.tagline}.</p>
            <p {...stylex.attrs(styles.footerEst)}>
              ISO 9001 : 2015 · GMP · HACCP
              <br />
              Est. {company.founded} — {company.hq.city}, {company.hq.country}
            </p>
            <div {...stylex.attrs(styles.footerCertsList)}>
              {certifications.map((cert) => (
                <span {...stylex.attrs(styles.footerCertBadge)}>{cert}</span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_COLS.map((col) => (
            <div {...stylex.attrs(styles.footerNavCol)}>
              <p {...stylex.attrs(styles.techLabel)}>{col.head}</p>
              <ul {...stylex.attrs(styles.footerNavList)}>
                {col.links.map((link) => (
                  <li>
                    <a href={link.href} {...stylex.attrs(styles.footerNavLink)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark watermark */}
        <p aria-hidden="true" {...stylex.attrs(styles.footerWordmark)}>
          FENCHEM
        </p>

        {/* Legal strip */}
        <div {...stylex.attrs(styles.footerLegal)}>
          <span>© 2026 {company.legalName} — All Rights Reserved</span>
          <span
            style={{
              "font-variant-numeric": "tabular-nums",
            }}
          >
            {company.hq.coords} — Nanjing, China
          </span>
          <span
            style={{
              color: colors.brandGreen700,
            }}
          >
            Botanical Intelligence Since 1995
          </span>
        </div>
      </div>
    </footer>
  );
}
export function SectionHeader(props: {
  styles: ProductionStyles;
  id: string;
  number: string;
  label: string;
  title: string;
  accent: string;
  aside?: JSX.Element;
}) {
  const aside = children(() => props.aside);
  return (
    <div {...stylex.attrs(props.styles.sectionHeaderRow)}>
      <Reveal>
        <p {...stylex.attrs(props.styles.eyebrowGreen)}>
          {props.number} — {props.label}
        </p>
        <h2 id={props.id} {...stylex.attrs(props.styles.sectionHeading)}>
          {props.title} <span {...stylex.attrs(props.styles.textGreen600)}>{props.accent}</span>
        </h2>
      </Reveal>
      <Show when={aside()}>
        <Reveal delay={STAGGER}>{aside()}</Reveal>
      </Show>
    </div>
  );
}
export function Chip(props: {
  styles: ProductionStyles;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={props.selected ? "true" : "false"}
      onClick={() => props.onClick()}
      {...stylex.attrs(
        props.styles.chipBase,
        props.selected ? props.styles.chipSelected : props.styles.chipUnselected,
      )}
    >
      {props.label}
    </button>
  );
}
export function RadioChips<T extends string>(props: {
  styles: ProductionStyles;
  label: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
}) {
  let group!: HTMLDivElement;
  const move = (delta: number) => {
    const options = props.options;
    const next = options[(options.indexOf(props.value) + delta + options.length) % options.length];
    props.onChange(next);
  };
  createEffect(
    () => props.value,
    () => {
      if (!group.contains(document.activeElement)) return;
      group.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
    },
  );
  return (
    <div
      ref={group}
      role="radiogroup"
      aria-label={props.label}
      {...stylex.attrs(props.styles.chipsWrapRow)}
    >
      {props.options.map((option) => (
        <button
          type="button"
          role="radio"
          aria-checked={props.value === option ? "true" : "false"}
          tabindex={props.value === option ? 0 : -1}
          onClick={() => props.onChange(option)}
          onKeyDown={(event) => {
            if (event.key.startsWith("Arrow")) event.stopPropagation();
            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
              event.preventDefault();
              move(1);
            } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
              event.preventDefault();
              move(-1);
            }
          }}
          {...stylex.attrs(
            props.styles.chipBase,
            props.value === option ? props.styles.chipSelected : props.styles.chipUnselected,
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
