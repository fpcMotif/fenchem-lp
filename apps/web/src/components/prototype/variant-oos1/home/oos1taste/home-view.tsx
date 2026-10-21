import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { m, useInView, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { HERO as FIGMA_HERO } from "../../../variant-o/content";
import {
  ABOUT,
  CTA,
  GLOBAL_INTRO,
  HERO,
  IMAGES,
  NEWS,
  NEWS_TITLE,
  OFFICE_COLUMNS,
  PRODUCTS,
  PRODUCTS_CTA_SUBTITLE,
  PRODUCTS_INTRO,
  STATS,
  STRENGTHS,
  STRENGTHS_INTRO,
} from "../../content";
import type { HomePageProps } from "../../index";
import { RiseReveal } from "../../rise-reveal";
import { color, ease, layout, media } from "../../tokens.stylex";

const DESKTOP = breakpoints.xl;
const TINT = "#e6ecf7";
const TINT_HOVER = "#d7e1f1";
const SURFACE = "#f6f6f6";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const FIGURE_FONT = '"Inter Tight", "Helvetica Neue", Arial, "Noto Sans SC", sans-serif';
const PHOTO = "/prototype/about";
const STAGGER = 0.08;
const DIGIT_STAGGER = 0.06;
const RISE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const WORDMARK_EM_WIDTH = 4.52;

const HERO_LINES = ["链接全球优质原料", "打造创新解决方案"] as const;
const REGIONS = OFFICE_COLUMNS.flat();
const OFFICE_COUNT = REGIONS.reduce((count, region) => count + region.offices.length, 0);
const [YEARS_STAT, BRANCH_STAT, BASE_STAT] = STATS;

type Proof =
  | { kind: "figure"; value: string; unit: string | null; caption: string }
  | { kind: "photo"; src: string; srcSet: string; alt: string };

const PROOFS: readonly Proof[] = [
  {
    kind: "figure",
    value: String(OFFICE_COUNT),
    unit: null,
    caption: `${BRANCH_STAT.label}，覆盖 ${REGIONS.length} 个大洲`,
  },
  { kind: "figure", value: BASE_STAT.value, unit: BASE_STAT.unit, caption: BASE_STAT.caption },
  {
    kind: "photo",
    src: `${PHOTO}/campus-lab.webp`,
    srcSet: `${PHOTO}/campus-lab.webp 1400w, ${PHOTO}/campus-lab-lg.webp 2400w`,
    alt: "泛成研发实验室",
  },
  { kind: "figure", value: YEARS_STAT.value, unit: YEARS_STAT.unit, caption: YEARS_STAT.caption },
];

const TONES = ["blue", "gray", "green", "cream"] as const;
type Tone = (typeof TONES)[number];

const riseDelay = (step: number) => step * STAGGER;

const styles = stylex.create({
  root: {
    fontFamily: BODY_FONT,
    color: color.ink,
  },
  anchor: {
    scrollMarginTop: layout.headerHeight,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [media.tablet]: 40, [DESKTOP]: layout.inset120 },
  },
  section: {
    paddingBlock: { default: 56, [media.tablet]: 96, [DESKTOP]: 144 },
  },
  paper: { backgroundColor: colors.paper },
  surface: { backgroundColor: SURFACE },
  tint: { backgroundColor: TINT },

  display: {
    margin: 0,
    fontSize: "clamp(40px, 5.6vw, 88px)",
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    color: colors.brandBlue900,
  },
  displayLine: { display: "block" },
  title: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: color.ink,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    fontSize: { default: 20, [DESKTOP]: 24 },
    fontWeight: 700,
    lineHeight: 1.3,
  },
  body: {
    margin: 0,
    fontSize: { default: 16, [DESKTOP]: 18 },
    lineHeight: 1.6,
    color: color.ink,
    textWrap: "pretty",
  },
  small: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.5,
  },
  intro: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 640,
  },

  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    minWidth: 144,
    height: 48,
    paddingInline: 24,
    borderWidth: 0,
    fontFamily: "inherit",
    fontSize: 16,
    lineHeight: 1.2,
    textDecoration: "none",
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  primary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  secondary: {
    backgroundColor: { default: TINT, ":hover": TINT_HOVER },
    color: colors.brandBlue700,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },

  hero: {
    paddingTop: { default: `calc(${layout.headerHeight} + 40px)`, [DESKTOP]: "136px" },
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [DESKTOP]: "7fr 5fr" },
    alignItems: "end",
    gap: { default: 24, [DESKTOP]: 48 },
    paddingBottom: { default: 32, [DESKTOP]: 48 },
  },
  heroAside: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  heroFigure: {
    position: "relative",
    margin: 0,
    overflow: "hidden",
    height: { default: "64vw", [media.tablet]: "52vw", [DESKTOP]: "min(66vh, 680px)" },
    backgroundColor: TINT,
  },
  coverImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  heroImage: {
    objectPosition: "50% 38%",
    transformOrigin: "50% 40%",
  },

  about: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [breakpoints.md]: "5fr 6fr" },
    alignItems: "center",
    gap: { default: 32, [DESKTOP]: 72 },
  },
  aboutCopy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 24,
  },
  photoFrame: {
    margin: 0,
    overflow: "hidden",
    aspectRatio: "3 / 2",
    backgroundColor: SURFACE,
  },

  strengthsHead: {
    marginBottom: { default: 40, [DESKTOP]: 64 },
  },
  quadrants: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(2, minmax(0, 1fr))",
    },
  },
  quadrant: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 32,
    minHeight: { default: 320, [DESKTOP]: 360 },
    padding: { default: 24, [DESKTOP]: 40 },
    boxSizing: "border-box",
    overflow: "hidden",
  },
  quadrantPhoto: {
    paddingBottom: 0,
  },
  quadrantText: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  blue: { backgroundColor: "#4668a5", color: colors.paper },
  gray: { backgroundColor: "#e3e3e3", color: color.ink },
  green: { backgroundColor: "#93c170", color: color.ink },
  cream: { backgroundColor: "#fffae5", color: color.ink },
  proofPhoto: {
    marginInline: { default: -24, [DESKTOP]: -40 },
    marginTop: 0,
    marginBottom: 0,
    height: { default: 160, [DESKTOP]: 200 },
    overflow: "hidden",
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    margin: 0,
  },
  figureValue: {
    display: "flex",
    alignItems: "baseline",
    margin: 0,
    fontFamily: FIGURE_FONT,
    fontSize: "clamp(56px, 6vw, 88px)",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  figureUnit: {
    marginInlineStart: 4,
    fontSize: { default: 20, [DESKTOP]: 24 },
    fontWeight: 700,
    letterSpacing: 0,
  },
  digitSlot: {
    display: "inline-block",
    overflow: "hidden",
    paddingBottom: "0.08em",
    marginBottom: "-0.08em",
  },
  digit: { display: "inline-block" },

  productsHead: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 24,
    marginBottom: { default: 40, [DESKTOP]: 64 },
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.sm]: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: "repeat(4, minmax(0, 1fr))",
    },
    gap: { default: 40, [breakpoints.sm]: 24 },
  },
  product: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  productPhoto: {
    margin: 0,
    overflow: "hidden",
    aspectRatio: "4 / 5",
    backgroundColor: TINT,
  },
  productText: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    margin: 0,
    marginTop: 8,
    padding: 0,
    listStyle: "none",
  },
  tag: {
    paddingBlock: 4,
    paddingInline: 10,
    backgroundColor: colors.paper,
    fontSize: 14,
    lineHeight: 1.5,
    color: color.ink,
  },

  globalGrid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [DESKTOP]: "4fr 8fr" },
    alignItems: "center",
    gap: { default: 32, [DESKTOP]: 48 },
  },
  map: {
    display: "block",
    width: "100%",
    height: "auto",
  },
  regions: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
      [DESKTOP]: "repeat(5, minmax(0, 1fr))",
    },
    gap: { default: 32, [DESKTOP]: 24 },
    marginTop: { default: 48, [DESKTOP]: 72 },
  },
  region: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  cityList: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },

  newsGrid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [DESKTOP]: "4fr 8fr" },
    gap: { default: 32, [DESKTOP]: 48 },
  },
  newsHead: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 24,
  },
  newsList: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, [DESKTOP]: 40 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  newsItem: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [breakpoints.md]: "minmax(0, 1fr) 320px" },
    gap: { default: 8, [breakpoints.md]: 24 },
  },
  newsWhen: {
    color: colors.brandBlue700,
  },
  newsMain: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  close: {
    paddingTop: { default: 72, [DESKTOP]: 144 },
    overflow: "hidden",
  },
  closeRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 24,
  },
  wordmark: {
    display: "block",
    marginTop: { default: 48, [DESKTOP]: 72 },
    fontFamily: FIGURE_FONT,
    fontSize: {
      default: `calc((100vw - 32px) / ${WORDMARK_EM_WIDTH})`,
      [media.tablet]: `calc((100vw - 80px) / ${WORDMARK_EM_WIDTH})`,
      [DESKTOP]: `min(calc(83.33vw / ${WORDMARK_EM_WIDTH}), calc(1200px / ${WORDMARK_EM_WIDTH}))`,
    },
    fontWeight: 800,
    lineHeight: 0.76,
    letterSpacing: "-0.04em",
    color: colors.brandBlue700,
    whiteSpace: "nowrap",
    userSelect: "none",
  },
});

const TONE_STYLES: Record<Tone, StyleXStyles> = {
  blue: styles.blue,
  gray: styles.gray,
  green: styles.green,
  cream: styles.cream,
};

function Rise({
  step = 0,
  sx,
  children,
}: {
  step?: number;
  sx?: StyleXStyles;
  children: ReactNode;
}) {
  return (
    <RiseReveal delay={riseDelay(step)} sx={sx}>
      {children}
    </RiseReveal>
  );
}

function Hero({ onNavigate, onOpenContactDialog }: HomePageProps) {
  const figureRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: figureRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  return (
    <section
      id="top"
      aria-labelledby="taste-hero-title"
      {...stylex.props(styles.hero, styles.paper)}
    >
      <div {...stylex.props(styles.shell, styles.heroGrid)}>
        <h1 id="taste-hero-title" {...stylex.props(styles.display)}>
          {HERO_LINES.map((line) => (
            <span key={line} {...stylex.props(styles.displayLine)}>
              {line}
            </span>
          ))}
        </h1>
        <m.div
          {...stylex.props(styles.heroAside)}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: STAGGER, ease: RISE_EASE }}
        >
          <p {...stylex.props(styles.body)}>
            {HERO.title}。{FIGMA_HERO.lead}
          </p>
          <div {...stylex.props(styles.actions)}>
            <button
              type="button"
              onClick={() => onNavigate("products", "products-top")}
              {...stylex.props(styles.button, styles.primary)}
            >
              {HERO.primary.label}
            </button>
            <button
              type="button"
              onClick={onOpenContactDialog}
              {...stylex.props(styles.button, styles.secondary)}
            >
              {HERO.secondary.label}
            </button>
          </div>
        </m.div>
      </div>
      <figure ref={figureRef} {...stylex.props(styles.heroFigure)}>
        <m.img
          src={`${PHOTO}/campus-aerial.webp`}
          srcSet={`${PHOTO}/campus-aerial.webp 1400w, ${PHOTO}/campus-aerial-lg.webp 2000w`}
          sizes="100vw"
          alt="泛成园区大楼与屋顶花园"
          fetchPriority="high"
          style={reduce ? undefined : { scale }}
          {...stylex.props(styles.coverImage, styles.heroImage)}
        />
      </figure>
    </section>
  );
}

function About({ onNavigate }: HomePageProps) {
  return (
    <section
      id="about"
      aria-labelledby="taste-about-title"
      {...stylex.props(styles.section, styles.paper, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.about)}>
        <div {...stylex.props(styles.aboutCopy)}>
          <Rise>
            <h2 id="taste-about-title" {...stylex.props(styles.title)}>
              {ABOUT.title}
            </h2>
          </Rise>
          <Rise step={1}>
            <p {...stylex.props(styles.body)}>{ABOUT.lines.join("")}</p>
          </Rise>
          <Rise step={2}>
            <button
              type="button"
              onClick={() => onNavigate("about", "about-top")}
              {...stylex.props(styles.button, styles.primary)}
            >
              了解泛成
            </button>
          </Rise>
        </div>
        <Rise step={2}>
          <figure {...stylex.props(styles.photoFrame)}>
            <img
              src={`${PHOTO}/campus-showroom.webp`}
              srcSet={`${PHOTO}/campus-showroom.webp 900w, ${PHOTO}/campus-showroom-lg.webp 2000w`}
              sizes="(min-width: 768px) 55vw, 100vw"
              alt="泛成展厅"
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.coverImage)}
            />
          </figure>
        </Rise>
      </div>
    </section>
  );
}

function RollingFigure({ value, unit }: { value: string; unit: string | null }) {
  const reduce = useReducedMotion();
  const figureRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(figureRef, { once: true, margin: "0px 0px -60px 0px" });
  return (
    <p ref={figureRef} {...stylex.props(styles.figureValue)}>
      {value.split("").map((character, index) =>
        /\d/.test(character) ? (
          <span key={index} {...stylex.props(styles.digitSlot)}>
            <m.span
              {...stylex.props(styles.digit)}
              initial={reduce ? false : { y: "105%" }}
              animate={inView ? { y: "0%" } : undefined}
              transition={{ duration: 0.9, delay: index * DIGIT_STAGGER, ease: RISE_EASE }}
            >
              {character}
            </m.span>
          </span>
        ) : (
          <span key={index}>{character}</span>
        ),
      )}
      {unit ? <span {...stylex.props(styles.figureUnit)}>{unit}</span> : null}
    </p>
  );
}

function ProofView({ proof }: { proof: Proof }) {
  if (proof.kind === "photo") {
    return (
      <figure {...stylex.props(styles.proofPhoto)}>
        <img
          src={proof.src}
          srcSet={proof.srcSet}
          sizes="(min-width: 768px) 50vw, 100vw"
          alt={proof.alt}
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.coverImage)}
        />
      </figure>
    );
  }
  return (
    <div {...stylex.props(styles.figure)}>
      <RollingFigure value={proof.value} unit={proof.unit} />
      <p {...stylex.props(styles.small)}>{proof.caption}</p>
    </div>
  );
}

function Strengths() {
  return (
    <section
      id="campus"
      aria-labelledby="taste-strengths-title"
      {...stylex.props(styles.section, styles.paper, styles.anchor)}
    >
      <div {...stylex.props(styles.shell)}>
        <Rise sx={[styles.intro, styles.strengthsHead]}>
          <h2 id="taste-strengths-title" {...stylex.props(styles.title)}>
            {STRENGTHS_INTRO.title}
          </h2>
          <p {...stylex.props(styles.body)}>{STRENGTHS_INTRO.lead}</p>
        </Rise>
        <div {...stylex.props(styles.quadrants)}>
          {STRENGTHS.map((strength, index) => {
            const proof = PROOFS[index];
            return (
              <article
                key={strength.title}
                aria-labelledby={`taste-strength-${index}`}
                {...stylex.props(
                  styles.quadrant,
                  TONE_STYLES[TONES[index]],
                  proof.kind === "photo" && styles.quadrantPhoto,
                )}
              >
                <Rise step={index % 2} sx={styles.quadrantText}>
                  <h3 id={`taste-strength-${index}`} {...stylex.props(styles.subtitle)}>
                    {strength.title}
                  </h3>
                  {strength.description ? (
                    <p {...stylex.props(styles.small)}>{strength.description}</p>
                  ) : null}
                </Rise>
                <ProofView proof={proof} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Products({ onNavigate }: HomePageProps) {
  return (
    <section
      id="products"
      aria-labelledby="taste-products-title"
      {...stylex.props(styles.section, styles.surface, styles.anchor)}
    >
      <div {...stylex.props(styles.shell)}>
        <div {...stylex.props(styles.productsHead)}>
          <Rise sx={styles.intro}>
            <h2 id="taste-products-title" {...stylex.props(styles.title)}>
              {PRODUCTS_INTRO.title}
            </h2>
            <p {...stylex.props(styles.body)}>{PRODUCTS_INTRO.lead}</p>
          </Rise>
          <Rise step={1}>
            <button
              type="button"
              onClick={() => onNavigate("products", "products-top")}
              {...stylex.props(styles.button, styles.primary)}
            >
              {PRODUCTS_INTRO.cta.label}
            </button>
          </Rise>
        </div>
        <div id="product-list" {...stylex.props(styles.productGrid)}>
          {PRODUCTS.map((product, index) => (
            <Rise key={product.title} step={index} sx={styles.product}>
              <figure {...stylex.props(styles.productPhoto)}>
                <img
                  src={product.image}
                  alt={product.english}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(styles.coverImage)}
                />
              </figure>
              <div {...stylex.props(styles.productText)}>
                <h3 {...stylex.props(styles.subtitle)}>{product.title}</h3>
                <p {...stylex.props(styles.small)}>{product.description}</p>
                <ul {...stylex.props(styles.tags)}>
                  {product.tags.map((tag) => (
                    <li key={tag} {...stylex.props(styles.tag)}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offices() {
  return (
    <section
      id="offices"
      aria-labelledby="taste-offices-title"
      {...stylex.props(styles.section, styles.paper, styles.anchor)}
    >
      <div {...stylex.props(styles.shell)}>
        <div {...stylex.props(styles.globalGrid)}>
          <Rise sx={styles.intro}>
            <h2 id="taste-offices-title" {...stylex.props(styles.title)}>
              {GLOBAL_INTRO.title}
            </h2>
            <p {...stylex.props(styles.body)}>{GLOBAL_INTRO.lead}</p>
          </Rise>
          <Rise step={1}>
            <img
              src={IMAGES.officeMap.src}
              alt={IMAGES.officeMap.alt}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.map)}
            />
          </Rise>
        </div>
        <div {...stylex.props(styles.regions)}>
          {REGIONS.map((region, index) => (
            <Rise key={region.region} step={index} sx={styles.region}>
              <h3 {...stylex.props(styles.subtitle)}>{region.region}</h3>
              <ul {...stylex.props(styles.cityList)}>
                {region.offices.map((office) => (
                  <li key={office} {...stylex.props(styles.small)}>
                    {office}
                  </li>
                ))}
              </ul>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

function News() {
  return (
    <section
      id="news"
      aria-labelledby="taste-news-title"
      {...stylex.props(styles.section, styles.surface, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.newsGrid)}>
        <Rise sx={styles.newsHead}>
          <h2 id="taste-news-title" {...stylex.props(styles.title)}>
            {NEWS_TITLE}
          </h2>
        </Rise>
        <ul {...stylex.props(styles.newsList)}>
          {NEWS.map((item, index) => {
            const [when, ...notes] = item.details;
            return (
              <li key={item.title}>
                <Rise step={index} sx={styles.newsItem}>
                  <div {...stylex.props(styles.newsMain)}>
                    <h3 {...stylex.props(styles.subtitle)}>
                      {item.title.replace(/^\d+\.\s*/, "")}
                    </h3>
                    {notes.map((note) => (
                      <p key={note} {...stylex.props(styles.small)}>
                        {note}
                      </p>
                    ))}
                  </div>
                  {when ? <p {...stylex.props(styles.small, styles.newsWhen)}>{when}</p> : null}
                </Rise>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Close({ onOpenContactDialog }: HomePageProps) {
  return (
    <section
      id="contact"
      aria-labelledby="taste-close-title"
      {...stylex.props(styles.close, styles.tint, styles.anchor)}
    >
      <div {...stylex.props(styles.shell)}>
        <div {...stylex.props(styles.closeRow)}>
          <Rise sx={styles.intro}>
            <h2 id="taste-close-title" {...stylex.props(styles.title)}>
              {CTA.title}
            </h2>
            <p {...stylex.props(styles.body)}>{PRODUCTS_CTA_SUBTITLE}</p>
          </Rise>
          <Rise step={1}>
            <button
              type="button"
              onClick={onOpenContactDialog}
              {...stylex.props(styles.button, styles.primary)}
            >
              联系我们
            </button>
          </Rise>
        </div>
        <span aria-hidden="true" {...stylex.props(styles.wordmark)}>
          FENCHEM
        </span>
      </div>
    </section>
  );
}

export function HomeTaste(props: HomePageProps) {
  return (
    <div {...stylex.props(styles.root)}>
      <Hero {...props} />
      <About {...props} />
      <Strengths />
      <Products {...props} />
      <Offices />
      <News />
      <Close {...props} />
    </div>
  );
}
