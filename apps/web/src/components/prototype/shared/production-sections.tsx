import { useRef, useState, type ReactNode } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowRight, CheckCircle2, Leaf } from "lucide-react";
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
export function NavBar({
  styles,
  portfolioMenu,
  mobileNav,
}: {
  styles: ProductionStyles;
  portfolioMenu: ReactNode;
  mobileNav: ReactNode;
}) {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.container)}>
        {/* Micro-strip */}
        <div {...stylex.props(styles.microStrip)}>
          <span {...stylex.props(styles.microStripItem)}>
            <span {...stylex.props(styles.liveDotOuter)}>
              <span {...stylex.props(styles.liveDotPing)} />
              <span {...stylex.props(styles.liveDotInner)} />
            </span>
            Botanical Intelligence Since 1995
          </span>
          <span {...stylex.props(styles.techLabel)}>ISO 9001 · GMP · HACCP</span>
          <span {...stylex.props(styles.techLabel)}>{company.hq.coords} — Nanjing HQ</span>
        </div>
        {/* Main nav */}
        <nav aria-label="Main navigation" {...stylex.props(styles.navInner)}>
          <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.brandLink)}>
            <span {...stylex.props(styles.brandText)}>FENCHEM</span>
            <Leaf aria-hidden strokeWidth={1.5} {...stylex.props(styles.brandLeaf)} />
          </a>
          <div {...stylex.props(styles.navDesktopLinks)}>
            <a href="#industries" {...stylex.props(styles.navLink)}>
              Industries
            </a>
            {portfolioMenu}
            <a href="#formulation" {...stylex.props(styles.navLink)}>
              Formulation
            </a>
            <a href="#standards" {...stylex.props(styles.navLink)}>
              Standards
            </a>
          </div>
          <div {...stylex.props(styles.navRight)}>
            {mobileNav}
            <a href="#contact" {...stylex.props(styles.ctaPrimaryCompact)}>
              Request a Specification
              <ArrowRight aria-hidden size={14} />
            </a>
          </div>
        </nav>
      </div>
      {!reduce && (
        <m.div
          aria-hidden
          style={{
            scaleX: scrollYProgress,
          }}
          {...stylex.props(styles.progressHairline)}
        />
      )}
    </header>
  );
}
export function HeroSection({ styles }: { styles: ProductionStyles }) {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  return (
    <section id="top" aria-label="Hero" {...stylex.props(styles.heroSection)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.heroGrid)}>
          {/* Left: Headline block */}
          <div {...stylex.props(styles.heroLeft)}>
            <Reveal>
              <p {...stylex.props(styles.heroBadge)}>Botanical Intelligence Since 1995</p>
            </Reveal>
            <Reveal delay={STAGGER}>
              <h1 {...stylex.props(styles.heroHeading)}>
                Nurturing Vitality
                <br />
                through <span {...stylex.props(styles.textGreen600)}>Botanical Excellence</span>
              </h1>
            </Reveal>
            <Reveal delay={STAGGER * 2}>
              <p {...stylex.props(styles.heroLead)}>
                Fenchem converts raw botanical complexity into precisely specified, clinically
                validated actives — supplied at industrial scale to formulators in more than forty
                countries.
              </p>
            </Reveal>
            <Reveal delay={STAGGER * 3}>
              <div {...stylex.props(styles.heroActions)}>
                <a href="#matrix" {...stylex.props(styles.ctaPrimary)}>
                  Explore Portfolio
                  <ArrowRight aria-hidden size={16} />
                </a>
                <a href="#formulation" {...stylex.props(styles.ctaOutlineBlue)}>
                  Build a Formulation
                </a>
              </div>
            </Reveal>

            {/* Stat band */}
            <Reveal delay={STAGGER * 4}>
              <dl {...stylex.props(styles.heroStatGrid)}>
                {STATS.map((s) => (
                  <div key={s.unit} {...stylex.props(styles.heroStatItem)}>
                    <dt {...stylex.props(styles.heroStatUnit)}>{s.unit}</dt>
                    <dd
                      style={{
                        margin: 0,
                        marginTop: 6,
                      }}
                    >
                      <span {...stylex.props(styles.heroStatValue)}>{s.value}</span>
                      <p {...stylex.props(styles.heroStatDesc)}>{s.desc}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: botanical image */}
          <div {...stylex.props(styles.heroRight)}>
            <div ref={imgRef} {...stylex.props(styles.heroImgContainer)}>
              <m.img
                src={IMG.hero}
                alt="Lush green botanical leaves in morning light — representing Fenchem's natural ingredient sourcing"
                style={{
                  y: reduce ? 0 : imgY,
                }}
                initial={
                  reduce
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
                {...stylex.props(styles.heroImg)}
              />
              <div aria-hidden {...stylex.props(styles.heroImgScrim)} />
            </div>
            {/* Caption badge */}
            <div {...stylex.props(styles.heroCaptionBadge)}>
              <span {...stylex.props(styles.techLabel)}>{company.tagline}</span>
              <span {...stylex.props(styles.eyebrowGreen)}>{company.since}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function FormulationSection({ styles }: { styles: ProductionStyles }) {
  const [application, setApplication] = useState<IngredientApplication>("Nutrition");
  const [form, setForm] = useState<(typeof FORM_OPTIONS)[number]>("Beadlet");
  const [regulatory, setRegulatory] = useState<string[]>(["ISO 9001", "GMP"]);
  const regulatoryNames = new Set(regulatory);
  const matches = getIngredientsByApplication(application);
  const toggleRegulatory = (name: string) =>
    setRegulatory((current) =>
      current.includes(name) ? current.filter((c) => c !== name) : [...current, name],
    );
  return (
    <section
      id="formulation"
      aria-labelledby="formulation-heading"
      {...stylex.props(styles.formulationSection)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHeader
          styles={styles}
          id="formulation-heading"
          number="04"
          label="Formulation"
          title="Your target spec,"
          accent="engineered back to you"
          aside={
            <p {...stylex.props(styles.sectionAsideLead)}>
              Pick the shape of your formulation — our laboratory returns a validated proposal
              within one business day.
            </p>
          }
        />

        <div {...stylex.props(styles.formulationGrid)}>
          {/* Pickers */}
          <div {...stylex.props(styles.formulationLeft)}>
            <div>
              <p id="formulation-application-label" {...stylex.props(styles.techLabel)}>
                Application
              </p>
              <RadioChips
                styles={styles}
                label="Application"
                options={MENU_APPLICATIONS}
                value={application}
                onChange={setApplication}
              />
            </div>

            <div
              style={{
                marginTop: 32,
              }}
            >
              <p {...stylex.props(styles.techLabel)}>Delivery form</p>
              <RadioChips
                styles={styles}
                label="Delivery form"
                options={FORM_OPTIONS}
                value={form}
                onChange={setForm}
              />
            </div>

            <fieldset {...stylex.props(styles.formulationFieldset)}>
              <legend {...stylex.props(styles.techLabel)}>Regulatory map</legend>
              <div {...stylex.props(styles.chipsWrapRow)}>
                {certificationDetails.map((cert) => (
                  <Chip
                    styles={styles}
                    key={cert.name}
                    label={cert.name}
                    selected={regulatoryNames.has(cert.name)}
                    onClick={() => toggleRegulatory(cert.name)}
                  />
                ))}
              </div>
            </fieldset>

            {/* Process strip */}
            <div {...stylex.props(styles.processStripOuter)}>
              <p {...stylex.props(styles.techLabel)}>What happens next</p>
              <ol {...stylex.props(styles.processOl)}>
                {processSteps.map((step, i) => (
                  <li key={step.title} {...stylex.props(styles.processLi)}>
                    <span {...stylex.props(styles.processIndex)}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p {...stylex.props(styles.processTitle)}>{step.title}</p>
                      <p {...stylex.props(styles.processCopy)}>{step.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Live spec sheet */}
          <div {...stylex.props(styles.formulationRight)}>
            <div {...stylex.props(styles.specDraftHeader)}>
              <span {...stylex.props(styles.specDraftLabel)}>Draft Specification</span>
              <span {...stylex.props(styles.specDraftCode)}>FN-REQ / 2026</span>
            </div>
            <div aria-live="polite">
              <dl {...stylex.props(styles.specDraftDl)}>
                {[
                  ["Application", application],
                  ["Delivery form", form],
                  ["Regulatory", regulatory.length ? regulatory.join(" · ") : "—"],
                  ["Matching actives", `${matches.length} of ${ingredients.length} in portfolio`],
                  ["Response", "< 24h with full documentation"],
                ].map(([label, value]) => (
                  <div key={label} {...stylex.props(styles.specDraftDlRow)}>
                    <dt {...stylex.props(styles.specDraftDt)}>{label}</dt>
                    <dd {...stylex.props(styles.specDraftDd)}>{value}</dd>
                  </div>
                ))}
              </dl>
              <ul {...stylex.props(styles.specMatchesList)}>
                {matches.slice(0, 3).map((item) => (
                  <li key={item.code} {...stylex.props(styles.specMatchItem)}>
                    <CheckCircle2 aria-hidden size={12} color={colors.brandGreen400} />
                    {item.name} — {item.purity}
                  </li>
                ))}
              </ul>
            </div>
            <a href={createInquiryHref("formulation")} {...stylex.props(styles.specSubmitBtn)}>
              Submit this specification
              <ArrowRight aria-hidden size={16} />
            </a>
            <p {...stylex.props(styles.specDossiersRequestNote)}>Technical dossiers on request</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export function StandardsSection({ styles }: { styles: ProductionStyles }) {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <section
      id="standards"
      aria-labelledby="standards-heading"
      {...stylex.props(styles.standardsSection)}
    >
      <div {...stylex.props(styles.container)}>
        {/* Origin editorial beat */}
        <div {...stylex.props(styles.originGrid)}>
          <div {...stylex.props(styles.originImgCol)}>
            <img
              src={IMG.origin}
              alt="Rows of cultivated green crops on a partner farm at golden hour"
              loading="lazy"
              {...stylex.props(styles.originImg)}
            />
          </div>
          <div {...stylex.props(styles.originTextCol)}>
            <Reveal>
              <p {...stylex.props(styles.eyebrowGreen)}>Origin</p>
              <h2 {...stylex.props(styles.originTitle)}>
                Grown with{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: colors.brandGreen600,
                  }}
                >
                  patience.
                </em>
              </h2>
              <p {...stylex.props(styles.heroLead)}>
                Our botanicals begin in soil we know by name — a global network of partner farms
                cultivated over decades, where harvests are timed to the plant, never to the
                quarter.
              </p>
              <blockquote {...stylex.props(styles.originQuote)}>
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
            <p {...stylex.props(styles.sectionAsideLead)}>
              Every lot. Every market. Every release — documented to your regulatory map.
            </p>
          }
        />

        <div {...stylex.props(styles.standardsGrid)}>
          {/* Image */}
          <div {...stylex.props(styles.labImgCol)}>
            <div ref={imgRef} {...stylex.props(styles.labImgContainer)}>
              <m.img
                src={IMG.lab}
                alt="Dense botanical foliage awaiting quality-control intake at the Nanjing laboratory"
                style={{
                  y: reduce ? 0 : imgY,
                }}
                loading="lazy"
                {...stylex.props(styles.labImg)}
              />
              <div aria-hidden {...stylex.props(styles.labImgScrim)} />
              <div {...stylex.props(styles.labCaptionBadge)}>
                <span {...stylex.props(styles.techLabel)}>QC Program — Nanjing</span>
                <span {...stylex.props(styles.eyebrowGreen)}>Identity · Potency · Stability</span>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div {...stylex.props(styles.pillarsCol)}>
            {pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal key={pillar.title} delay={i * STAGGER}>
                  <div
                    {...stylex.props(
                      styles.pillarInner,
                      i < pillars.length - 1 && styles.pillarRowBorder,
                    )}
                  >
                    <div {...stylex.props(styles.pillarIconBox)}>
                      <Icon aria-hidden strokeWidth={1.5} size={24} />
                    </div>
                    <div>
                      <h3 {...stylex.props(styles.pillarTitle)}>{pillar.title}</h3>
                      <p {...stylex.props(styles.pillarCopy)}>{pillar.copy}</p>
                      <div {...stylex.props(styles.pillarCert)}>
                        <CheckCircle2 aria-hidden size={14} />
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
export function FinaleSection({ styles }: { styles: ProductionStyles }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      {...stylex.props(styles.finaleSection)}
    >
      <m.div
        aria-hidden
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          y: reduce ? 0 : bgY,
        }}
      >
        <img src={IMG.heroThumb} alt="" loading="lazy" {...stylex.props(styles.finaleThumbImg)} />
      </m.div>
      <div aria-hidden {...stylex.props(styles.finaleScrim)} />

      <div {...stylex.props(styles.container, styles.finaleInner)}>
        <Reveal>
          <p {...stylex.props(styles.eyebrowGreen400)}>06 — Partner with Fenchem</p>
          <h2 id="contact-heading" {...stylex.props(styles.finaleHeading)}>
            Your next formulation,{" "}
            <span
              style={{
                color: colors.brandGreen400,
              }}
            >
              engineered to specification
            </span>
          </h2>
          <p {...stylex.props(styles.finaleLead)}>
            Submit a target spec — purity, form, matrix, regulatory map — and our laboratory returns
            a validated proposal with full documentation within one business day.
          </p>
        </Reveal>

        <Reveal delay={STAGGER * 2}>
          <div {...stylex.props(styles.finaleActions)}>
            <a href={createInquiryHref("contact")} {...stylex.props(styles.ctaPrimaryDark)}>
              Partner with Fenchem
              <ArrowRight aria-hidden size={16} />
            </a>
            <a href="#matrix" {...stylex.props(styles.finaleSecondaryBtn)}>
              Explore Portfolio
            </a>
          </div>
        </Reveal>

        <Reveal delay={STAGGER * 3}>
          <p {...stylex.props(styles.finaleResponseTime)}>
            Response Time &lt; 24h — Technical Dossiers on Request
          </p>
        </Reveal>

        {/* Office nodes */}
        <div {...stylex.props(styles.officesOuter)}>
          <Reveal>
            <p {...stylex.props(styles.eyebrowGreen400)}>6 Global Bases — 40+ Countries Served</p>
          </Reveal>
          <div {...stylex.props(styles.officesGrid)}>
            {regions.map((region, i) => (
              <Reveal key={region.city} delay={i * (STAGGER * 0.75)}>
                <div {...stylex.props(styles.officeCardBg)}>
                  <div {...stylex.props(styles.officeCardInner)}>
                    <p {...stylex.props(styles.officeCity)}>{region.city}</p>
                    <p {...stylex.props(styles.officeShort)}>{region.short}</p>
                    <p {...stylex.props(styles.officeCoords)}>{region.coords}</p>
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
export function FooterSection({ styles }: { styles: ProductionStyles }) {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.footerGrid)}>
          {/* Brand block */}
          <div {...stylex.props(styles.footerBrandCol)}>
            <div {...stylex.props(styles.footerBrandRow)}>
              <span {...stylex.props(styles.brandText)}>FENCHEM</span>
              <Leaf aria-hidden strokeWidth={1.5} size={20} color={colors.brandGreen500} />
            </div>
            <p {...stylex.props(styles.footerBrandTagline)}>{company.tagline}.</p>
            <p {...stylex.props(styles.footerEst)}>
              ISO 9001 : 2015 · GMP · HACCP
              <br />
              Est. {company.founded} — {company.hq.city}, {company.hq.country}
            </p>
            <div {...stylex.props(styles.footerCertsList)}>
              {certifications.map((cert) => (
                <span key={cert} {...stylex.props(styles.footerCertBadge)}>
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.head} {...stylex.props(styles.footerNavCol)}>
              <p {...stylex.props(styles.techLabel)}>{col.head}</p>
              <ul {...stylex.props(styles.footerNavList)}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} {...stylex.props(styles.footerNavLink)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark watermark */}
        <p aria-hidden {...stylex.props(styles.footerWordmark)}>
          FENCHEM
        </p>

        {/* Legal strip */}
        <div {...stylex.props(styles.footerLegal)}>
          <span>© 2026 {company.legalName} — All Rights Reserved</span>
          <span
            style={{
              fontVariantNumeric: "tabular-nums",
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
export function SectionHeader({
  styles,
  id,
  number,
  label,
  title,
  accent,
  aside,
}: {
  styles: ProductionStyles;
  id: string;
  number: string;
  label: string;
  title: string;
  accent: string;
  aside?: ReactNode;
}) {
  return (
    <div {...stylex.props(styles.sectionHeaderRow)}>
      <Reveal>
        <p {...stylex.props(styles.eyebrowGreen)}>
          {number} — {label}
        </p>
        <h2 id={id} {...stylex.props(styles.sectionHeading)}>
          {title} <span {...stylex.props(styles.textGreen600)}>{accent}</span>
        </h2>
      </Reveal>
      {aside && <Reveal delay={STAGGER}>{aside}</Reveal>}
    </div>
  );
}
export function Chip({
  styles,
  label,
  selected,
  onClick,
}: {
  styles: ProductionStyles;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      {...stylex.props(styles.chipBase, selected ? styles.chipSelected : styles.chipUnselected)}
    >
      {label}
    </button>
  );
}
export function RadioChips<T extends string>({
  styles,
  label,
  options,
  value,
  onChange,
}: {
  styles: ProductionStyles;
  label: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
}) {
  const move = (delta: number) => {
    const next = options[(options.indexOf(value) + delta + options.length) % options.length];
    onChange(next);
  };
  return (
    <div role="radiogroup" aria-label={label} {...stylex.props(styles.chipsWrapRow)}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          tabIndex={value === option ? 0 : -1}
          ref={(node) => {
            if (
              node &&
              value === option &&
              node.closest('[role="radiogroup"]')?.contains(document.activeElement)
            ) {
              node.focus();
            }
          }}
          onClick={() => onChange(option)}
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
          {...stylex.props(
            styles.chipBase,
            value === option ? styles.chipSelected : styles.chipUnselected,
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
