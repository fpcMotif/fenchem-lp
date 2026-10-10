import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";
import { Fragment, useEffect, useId, useRef, useState } from "react";

import {
  ABOUT_BANNER,
  ABOUT_CAMPUS,
  ABOUT_CSR,
  ABOUT_HERO,
  ABOUT_HONORS,
  ABOUT_MOMENT,
  ABOUT_STRUCTURE,
} from "../../about-data";
import { CTA, STATS } from "../../content";
import type { AboutPageProps } from "../../index";
import { useActiveSection } from "../../use-active-section";
import { CAMPUS_CAPTION_EN, CAMPUS_HANG, type CampusPhoto } from "./campus-hang";
import { CultureStory } from "./culture";
import { BrushCoat, CyanotypeDefs, useDeveloped } from "./cyanotype";
import { shared } from "./cyanotype-values";
import { Lightbox } from "./lightbox";
import { curve, font, media, tone } from "./tokens.stylex";

const NAV_EN: Record<(typeof ABOUT_HERO.navChips)[number]["id"], string> = {
  "about-profile": "Profile",
  "about-campus": "Campus",
  "about-culture": "Culture",
  "about-csr": "Responsibility",
  "about-honor": "Honors",
  "about-structure": "Structure",
};

const SECTION_IDS = ABOUT_HERO.navChips.map((chip) => chip.id);

const LEVEL_LABEL = {
  national: "国家级",
  provincial: "江苏省级",
  municipal: "南京市级",
} as const;

export function AboutOOS1V({ onNavigateHome }: AboutPageProps) {
  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <CyanotypeDefs />
      <Banner onNavigateHome={onNavigateHome} />
      <PageNav />
      <Profile />
      <Campus />
      <CultureStory />
      <Responsibility />
      <Honors />
      <Structure />
      <Closing onNavigateHome={onNavigateHome} />
    </div>
  );
}

function Banner({ onNavigateHome }: AboutPageProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const developed = useDeveloped(printRef, 0.2);

  return (
    <section aria-labelledby="about-title" {...stylex.props(styles.banner)}>
      <div {...stylex.props(styles.column)}>
        <nav aria-label="Breadcrumb" {...stylex.props(styles.crumbs)}>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              onNavigateHome();
            }}
            {...stylex.props(styles.crumbLink, shared.focusRing)}
          >
            <span lang="en">Home</span>
          </a>
          <span aria-hidden="true" {...stylex.props(styles.crumbDivider)}>
            /
          </span>
          <span aria-current="page">
            <span lang="en">About</span>
          </span>
        </nav>
        <div {...stylex.props(styles.titleRow)}>
          <h1 id="about-title" {...stylex.props(styles.title)}>
            {ABOUT_BANNER.title}
          </h1>
          <p lang="en" {...stylex.props(styles.tagline)}>
            {ABOUT_BANNER.tagline}
          </p>
        </div>
        <figure {...stylex.props(styles.heroFigure)}>
          <div
            ref={printRef}
            {...stylex.props(styles.heroPrint, shared.develop, developed && shared.developed)}
          >
            <BrushCoat />
            <div {...stylex.props(styles.heroFrame)}>
              <img
                src={ABOUT_BANNER.image}
                alt={ABOUT_BANNER.alt}
                fetchPriority="high"
                decoding="async"
                {...stylex.props(shared.fill, shared.cyanotype, styles.heroImage)}
              />
            </div>
          </div>
          <figcaption {...stylex.props(styles.heroCaption)}>
            <span {...stylex.props(styles.heroLead)}>{ABOUT_BANNER.lead}</span>
            <span lang="en" {...stylex.props(styles.inscription)}>
              <span>{ABOUT_BANNER.place}</span>
              <span>{ABOUT_BANNER.established}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function PageNav() {
  const active = useActiveSection(SECTION_IDS);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !link) return;
    const start = link.offsetLeft - list.offsetLeft;
    const end = start + link.offsetWidth;
    if (start >= list.scrollLeft && end <= list.scrollLeft + list.clientWidth) return;
    list.scrollTo({ left: Math.max(0, start - 16) });
  }, [active]);

  return (
    <nav aria-label="On this page" {...stylex.props(styles.pageNav)}>
      <ul ref={listRef} {...stylex.props(styles.navList)}>
        {ABOUT_HERO.navChips.map((chip) => {
          const current = active === chip.id;
          return (
            <li key={chip.id} {...stylex.props(styles.navItem)}>
              <a
                href={`#${chip.id}`}
                aria-current={current ? "true" : undefined}
                {...stylex.props(
                  styles.navLink,
                  current && styles.navLinkCurrent,
                  shared.focusRing,
                )}
              >
                <span
                  aria-hidden="true"
                  {...stylex.props(styles.navMark, current && styles.navMarkCurrent)}
                />
                <span lang="en">{NAV_EN[chip.id]}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Profile() {
  const lobbyRef = useRef<HTMLDivElement>(null);
  const developed = useDeveloped(lobbyRef, 0.3);

  return (
    <section
      id="about-profile"
      aria-labelledby="about-profile-heading"
      {...stylex.props(styles.section)}
    >
      <h2 id="about-profile-heading" {...stylex.props(shared.srOnly)}>
        Profile
      </h2>
      <div {...stylex.props(styles.column, styles.grid)}>
        <div {...stylex.props(styles.profileText)}>
          <h3 {...stylex.props(styles.companyName)}>{ABOUT_HERO.title}</h3>
          <p lang="en" {...stylex.props(styles.companyEnglish)}>
            {ABOUT_HERO.englishTitle}
          </p>
          <p {...stylex.props(styles.lead)}>{ABOUT_HERO.lead}</p>
          <p {...stylex.props(styles.network)}>
            {ABOUT_HERO.networkLabel}
            {ABOUT_HERO.countries.join("、")}。
          </p>
        </div>
        <figure {...stylex.props(styles.lobbyFigure)}>
          <div
            ref={lobbyRef}
            {...stylex.props(
              styles.lobbySheet,
              shared.develop,
              shared.developEcho,
              developed && shared.developed,
            )}
          >
            <img
              src={ABOUT_HERO.lobbyImage}
              alt={ABOUT_HERO.lobbyEnglish}
              loading="lazy"
              decoding="async"
              {...stylex.props(shared.fill, shared.cyanotype)}
            />
            <img
              src={ABOUT_MOMENT.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              {...stylex.props(shared.fill, shared.cyanotype, styles.verso)}
            />
          </div>
          <figcaption lang="en" {...stylex.props(shared.caption)}>
            Lobby, with the campus showing through from the reverse
          </figcaption>
        </figure>
        <dl {...stylex.props(styles.strip)}>
          {STATS.map((stat, index) => (
            <div key={stat.label} {...stylex.props(styles.band, STRIP_EXPOSURES[index])}>
              <dt {...stylex.props(styles.bandLabel)}>{stat.label}</dt>
              <dd {...stylex.props(styles.bandValue)}>
                {stat.value}
                {stat.unit ? <span {...stylex.props(styles.bandUnit)}>{stat.unit}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Campus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const count = CAMPUS_HANG.length;

  return (
    <section
      id="about-campus"
      aria-labelledby="about-campus-heading"
      {...stylex.props(styles.section)}
    >
      <h2 id="about-campus-heading" {...stylex.props(shared.srOnly)}>
        {ABOUT_CAMPUS.eyebrow}
      </h2>
      <ul {...stylex.props(styles.column, styles.grid, styles.campusList)}>
        {CAMPUS_HANG.map((photo, index) => (
          <li key={photo.id} {...stylex.props(styles.campusItem, placement[photo.id])}>
            <CampusPrint
              photo={photo}
              onOpen={() => {
                setStepped(false);
                setOpenIndex(index);
              }}
            />
          </li>
        ))}
      </ul>
      <Lightbox
        index={openIndex}
        stepped={stepped}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) => {
          setStepped(true);
          setOpenIndex((current) => (current === null ? null : (current + delta + count) % count));
        }}
      />
    </section>
  );
}

function CampusPrint({ photo, onOpen }: { photo: CampusPhoto; onOpen: () => void }) {
  const ref = useRef<HTMLSpanElement>(null);
  const developed = useDeveloped(ref, 0.35);

  return (
    <figure {...stylex.props(styles.campusFigure)}>
      <button
        type="button"
        aria-label={`View larger: ${photo.english}`}
        onClick={onOpen}
        {...stylex.props(styles.printButton, shared.focusRing)}
      >
        <span
          ref={ref}
          {...stylex.props(
            styles.printSheet,
            ratio[photo.id],
            shared.develop,
            shared.developEcho,
            developed && shared.developed,
          )}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            {...stylex.props(shared.fill, shared.cyanotype)}
          />
        </span>
      </button>
      <figcaption {...stylex.props(shared.caption)}>
        <span lang="en">{CAMPUS_CAPTION_EN[photo.id]}</span>
      </figcaption>
    </figure>
  );
}

function Responsibility() {
  const lakeRef = useRef<HTMLDivElement>(null);
  const alive = useDeveloped(lakeRef, 0.6);

  return (
    <section id="about-csr" aria-labelledby="about-csr-heading" {...stylex.props(styles.section)}>
      <h2 id="about-csr-heading" {...stylex.props(shared.srOnly)}>
        Responsibility
      </h2>
      <div {...stylex.props(styles.column, styles.grid)}>
        <h3 {...stylex.props(styles.statement)}>
          {ABOUT_CSR.statement.map((line) => (
            <span key={line} {...stylex.props(styles.statementLine)}>
              {line}
            </span>
          ))}
        </h3>
        <div {...stylex.props(styles.csrText)}>
          <p {...stylex.props(styles.csrDesc)}>{ABOUT_CSR.desc}</p>
          <ul {...stylex.props(styles.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome, index) => (
              <Fragment key={outcome.title}>
                {index > 0 ? (
                  <li aria-hidden="true" {...stylex.props(styles.outcomeDot)}>
                    ·
                  </li>
                ) : null}
                <li>{outcome.title}</li>
              </Fragment>
            ))}
          </ul>
        </div>
        <figure {...stylex.props(styles.lakeFigure)}>
          <div ref={lakeRef} {...stylex.props(styles.lakeFrame)}>
            <img
              src={ABOUT_CSR.image}
              alt={ABOUT_CSR.imageAlt}
              loading="lazy"
              decoding="async"
              {...stylex.props(shared.fill, shared.cyanotype, styles.lakeFocus)}
            />
            <div aria-hidden="true" {...stylex.props(styles.rise, alive && styles.risen)}>
              <img
                src={ABOUT_CSR.image}
                alt=""
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.riseImage, styles.lakeFocus, alive && styles.risen)}
              />
            </div>
          </div>
          <figcaption lang="en" {...stylex.props(shared.caption)}>
            Campus lake, in its own color
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Honors() {
  return (
    <section
      id="about-honor"
      aria-labelledby="about-honor-heading"
      {...stylex.props(styles.section)}
    >
      <h2 id="about-honor-heading" {...stylex.props(shared.srOnly)}>
        {ABOUT_HONORS.eyebrow}
      </h2>
      <div {...stylex.props(styles.column, styles.grid)}>
        <ul {...stylex.props(styles.honorList)}>
          {ABOUT_HONORS.items.map((item, index) => (
            <li
              key={item.id}
              {...stylex.props(
                styles.honor,
                index > 0 &&
                  ABOUT_HONORS.items[index - 1].level !== item.level &&
                  styles.honorNewLevel,
              )}
            >
              <span {...stylex.props(styles.honorTitle)}>{item.title}</span>
              <span aria-hidden="true" {...stylex.props(styles.leader)} />
              <span {...stylex.props(styles.honorLevel)}>{LEVEL_LABEL[item.level]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Structure() {
  const [chartOpen, setChartOpen] = useState(false);
  const chartId = useId();
  const { holding, subsidiaries } = ABOUT_STRUCTURE;

  return (
    <section
      id="about-structure"
      aria-labelledby="about-structure-heading"
      {...stylex.props(styles.section)}
    >
      <h2 id="about-structure-heading" {...stylex.props(shared.srOnly)}>
        {ABOUT_STRUCTURE.eyebrow}
      </h2>
      <div {...stylex.props(styles.column, styles.grid)}>
        <div {...stylex.props(styles.holding)}>
          <p {...stylex.props(styles.quiet)}>{holding.badge}</p>
          <h3 {...stylex.props(styles.holdingName)}>{holding.name}</h3>
          <p lang="en" {...stylex.props(styles.english)}>
            {holding.english}
          </p>
          <button
            type="button"
            aria-expanded={chartOpen}
            aria-controls={chartId}
            onClick={() => setChartOpen((open) => !open)}
            {...stylex.props(styles.chartToggle, shared.focusRing)}
          >
            <span lang="en">{chartOpen ? "Hide chart" : "View chart"}</span>
            <span {...stylex.props(shared.srOnly)}> Organizational chart</span>
          </button>
        </div>
        <div {...stylex.props(styles.branches)}>
          <p {...stylex.props(styles.quiet)}>{ABOUT_STRUCTURE.subsidiaryBadge}</p>
          <ul {...stylex.props(styles.branchList)}>
            {subsidiaries.map((subsidiary) => (
              <li key={subsidiary.id} {...stylex.props(styles.branch)}>
                <span {...stylex.props(styles.branchName)}>{subsidiary.name}</span>
                <span lang="en" {...stylex.props(styles.english)}>
                  {subsidiary.english}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <figure id={chartId} hidden={!chartOpen} {...stylex.props(styles.chart)}>
          <img
            src={ABOUT_STRUCTURE.chartImage}
            alt="Organizational chart: Nanjing Fenchem International Holdings Corporation Limited and its five wholly owned subsidiaries"
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.chartImage, shared.cyanotype)}
          />
        </figure>
      </div>
    </section>
  );
}

function Closing({ onNavigateHome }: AboutPageProps) {
  return (
    <section aria-labelledby="about-cta-heading" {...stylex.props(styles.section, styles.closing)}>
      <div {...stylex.props(styles.column)}>
        <h2 id="about-cta-heading" {...stylex.props(styles.ctaTitle)}>
          {CTA.title}
        </h2>
        <div {...stylex.props(styles.ctaActions)}>
          <button
            type="button"
            onClick={() => onNavigateHome("contact")}
            {...stylex.props(styles.ctaPrimary, shared.focusRing)}
          >
            {CTA.action.label}
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateHome("products")}
            {...stylex.props(styles.ctaSecondary, shared.focusRing)}
          >
            产品与应用
          </button>
        </div>
      </div>
    </section>
  );
}

const GUTTER = { default: 16, [media.tablet]: 40, [media.desktop]: "min(120px, 8.333vw)" };
const ANCHOR_OFFSET = 152;

const styles = stylex.create({
  root: {
    position: "relative",
    overflowX: "clip",
    backgroundColor: tone.paper,
    color: tone.ink,
    fontFamily: font.sans,
  },
  column: {
    maxWidth: 1200,
    marginInline: "auto",
  },
  grid: {
    display: { default: "block", [media.wide]: "grid" },
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    columnGap: 24,
  },
  section: {
    paddingTop: { default: 84, [media.desktop]: 144 },
    paddingInline: GUTTER,
    scrollMarginTop: ANCHOR_OFFSET,
  },

  banner: {
    paddingTop: { default: 100, [media.desktop]: 108 },
    paddingInline: GUTTER,
  },
  crumbs: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13,
    color: tone.pencil,
  },
  crumbLink: {
    color: { default: tone.pencil, ":hover": tone.ink },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "160ms",
  },
  crumbDivider: {
    color: tone.hairline,
  },
  titleRow: {
    display: "flex",
    flexDirection: { default: "column", [media.wide]: "row" },
    alignItems: { default: "flex-start", [media.wide]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 12, [media.wide]: 32 },
    marginTop: { default: 28, [media.desktop]: 36 },
  },
  title: {
    margin: 0,
    fontSize: { default: 52, [media.tablet]: 72, [media.desktop]: 88 },
    fontWeight: 700,
    lineHeight: 1.08,
    letterSpacing: "0.04em",
    color: tone.prussian,
  },
  tagline: {
    margin: 0,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: 20, [media.desktop]: 26 },
    lineHeight: 1.3,
    color: tone.body,
  },
  heroFigure: {
    marginInline: 0,
    marginTop: { default: 32, [media.desktop]: 44 },
    marginBottom: 0,
  },
  heroPrint: {
    position: "relative",
    isolation: "isolate",
    padding: { default: 12, [media.wide]: 28 },
    transitionDelay: "300ms",
  },
  heroFrame: {
    position: "relative",
    aspectRatio: { default: "4 / 3", [media.tablet]: "2.2 / 1", [media.desktop]: "2.6 / 1" },
  },
  heroImage: {
    objectPosition: { default: "38% 60%", [media.wide]: "50% 58%" },
  },
  heroCaption: {
    display: "flex",
    flexDirection: { default: "column", [media.wide]: "row" },
    justifyContent: "space-between",
    alignItems: { default: "flex-start", [media.wide]: "baseline" },
    gap: { default: 10, [media.wide]: 32 },
    marginTop: { default: 28, [media.wide]: 40 },
  },
  heroLead: {
    fontSize: 15,
    lineHeight: 1.8,
    color: tone.body,
  },
  inscription: {
    display: "flex",
    gap: 28,
    fontSize: 13,
    letterSpacing: "0.02em",
    color: tone.pencil,
    whiteSpace: "nowrap",
  },

  pageNav: {
    position: "sticky",
    top: 80,
    zIndex: 1,
    marginTop: { default: 56, [media.desktop]: 72 },
    paddingInline: GUTTER,
    backgroundColor: "rgba(250, 248, 244, 0.94)",
    backdropFilter: "blur(14px)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  navList: {
    display: "flex",
    alignItems: "center",
    gap: { default: 22, [media.desktop]: 36 },
    maxWidth: 1200,
    height: 52,
    marginInline: "auto",
    marginBlock: 0,
    padding: 0,
    listStyle: "none",
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  navItem: {
    flexShrink: 0,
  },
  navLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    paddingBlock: 6,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: { default: tone.pencil, ":hover": tone.ink },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
  },
  navLinkCurrent: {
    color: tone.ink,
  },
  navMark: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: tone.prussian,
    opacity: 0,
    transform: "scale(0.4)",
    transitionProperty: "opacity, transform",
    transitionDuration: "600ms",
    transitionTimingFunction: curve.develop,
  },
  navMarkCurrent: {
    opacity: 1,
    transform: "none",
  },

  profileText: {
    gridColumn: { default: "1 / span 5", [media.tablet]: "1 / span 7" },
    gridRow: 1,
  },
  companyName: {
    margin: 0,
    fontSize: { default: 24, [media.desktop]: 32 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.03em",
    color: tone.ink,
  },
  companyEnglish: {
    marginBlock: "10px 0",
    fontSize: 13,
    color: tone.pencil,
  },
  lead: {
    marginBlock: "32px 0",
    maxWidth: "30em",
    fontSize: 16,
    lineHeight: 1.95,
    color: tone.body,
    textWrap: "pretty",
  },
  network: {
    marginBlock: "18px 0",
    maxWidth: "30em",
    fontSize: 15,
    lineHeight: 1.95,
    color: tone.body,
  },
  lobbyFigure: {
    gridColumn: { default: "7 / span 6", [media.tablet]: "1 / span 12" },
    gridRow: { default: "1 / span 2", [media.tablet]: 2 },
    marginInline: 0,
    marginTop: { default: 48, [media.tablet]: 56, [media.desktop]: 8 },
    marginBottom: 0,
  },
  lobbySheet: {
    position: "relative",
    display: "block",
    isolation: "isolate",
    aspectRatio: "3 / 2",
  },
  verso: {
    transform: "scaleX(-1)",
    mixBlendMode: "multiply",
    opacity: 0.26,
  },
  strip: {
    gridColumn: { default: "1 / span 4", [media.tablet]: "8 / span 5" },
    gridRow: { default: 2, [media.tablet]: 1 },
    alignSelf: "start",
    width: { default: "min(100%, 300px)", [media.wide]: "auto" },
    maxWidth: 300,
    marginInline: 0,
    marginTop: { default: 48, [media.tablet]: 8, [media.desktop]: 72 },
    marginBottom: 0,
    transform: "rotate(-1.6deg)",
    transformOrigin: "0 0",
    boxShadow: "0 1px 2px rgba(26, 26, 26, 0.06), 0 14px 28px -18px rgba(10, 39, 88, 0.4)",
  },
  band: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    paddingBlock: 18,
    paddingInline: 20,
  },
  bandLabel: {
    fontSize: 13,
    letterSpacing: "0.04em",
  },
  bandValue: {
    margin: 0,
    fontFamily: font.display,
    fontSize: { default: 30, [media.desktop]: 34 },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.01em",
    fontVariantNumeric: "tabular-nums",
  },
  bandUnit: {
    marginInlineStart: 3,
    fontSize: "0.5em",
    letterSpacing: 0,
  },

  campusList: {
    marginBlock: 0,
    padding: 0,
    listStyle: "none",
  },
  campusItem: {
    alignSelf: "start",
    marginTop: { default: 40, [media.wide]: 0 },
  },
  campusFigure: {
    margin: 0,
  },
  printButton: {
    display: "block",
    width: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "zoom-in",
    transform: { default: null, [media.hover]: { default: null, ":hover": "translateY(-3px)" } },
    transitionProperty: "transform",
    transitionDuration: "400ms",
    transitionTimingFunction: curve.out,
  },
  printSheet: {
    position: "relative",
    display: "block",
  },

  statement: {
    gridColumn: { default: "1 / span 7", [media.tablet]: "1 / span 12" },
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [media.desktop]: 38 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.03em",
    color: tone.ink,
  },
  statementLine: {
    display: "block",
  },
  csrText: {
    gridColumn: { default: "8 / span 5", [media.tablet]: "1 / span 9" },
    alignSelf: "end",
    marginTop: { default: 24, [media.desktop]: 0 },
  },
  csrDesc: {
    margin: 0,
    maxWidth: "28em",
    fontSize: 16,
    lineHeight: 1.95,
    color: tone.body,
    textWrap: "pretty",
  },
  outcomes: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px 12px",
    marginBlock: "18px 0",
    padding: 0,
    listStyle: "none",
    fontSize: 15,
    lineHeight: 1.7,
    color: tone.ink,
  },
  outcomeDot: {
    color: tone.pencil,
  },
  lakeFigure: {
    gridColumn: "1 / span 12",
    marginInline: 0,
    marginTop: { default: 40, [media.desktop]: 64 },
    marginBottom: 0,
  },
  lakeFrame: {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    aspectRatio: { default: "4 / 3", [media.wide]: "2 / 1" },
  },
  lakeFocus: {
    objectPosition: "50% 72%",
  },
  rise: {
    position: "absolute",
    top: "-30%",
    left: 0,
    width: "100%",
    height: "130%",
    overflow: "hidden",
    maskImage: "linear-gradient(to bottom, transparent 0%, #000 23.0769%)",
    transform: { default: "translateY(100%)", [media.reduce]: "none" },
    transitionProperty: "transform",
    transitionDuration: "5200ms",
    transitionDelay: "400ms",
    transitionTimingFunction: curve.tide,
  },
  riseImage: {
    position: "absolute",
    top: "23.0769%",
    left: 0,
    display: "block",
    width: "100%",
    height: "76.9231%",
    objectFit: "cover",
    transform: { default: "translateY(-130%)", [media.reduce]: "none" },
    transitionProperty: "transform",
    transitionDuration: "5200ms",
    transitionDelay: "400ms",
    transitionTimingFunction: curve.tide,
  },
  risen: {
    transform: "none",
  },

  honorList: {
    gridColumn: { default: "3 / span 8", [media.tablet]: "1 / span 12" },
    marginBlock: 0,
    padding: 0,
    listStyle: "none",
  },
  honor: {
    display: "flex",
    alignItems: "flex-end",
    gap: 14,
    paddingBlock: 13,
  },
  honorNewLevel: {
    marginTop: 22,
  },
  honorTitle: {
    fontSize: { default: 16, [media.desktop]: 19 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.03em",
    color: tone.ink,
  },
  leader: {
    flexGrow: 1,
    minWidth: 24,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
    borderBottomColor: tone.leader,
  },
  honorLevel: {
    flexShrink: 0,
    fontSize: 13,
    lineHeight: 1.9,
    color: tone.pencil,
  },

  holding: {
    gridColumn: { default: "1 / span 5", [media.tablet]: "1 / span 12" },
  },
  quiet: {
    margin: 0,
    fontSize: 13,
    color: tone.pencil,
  },
  holdingName: {
    marginBlock: "12px 0",
    fontSize: { default: 22, [media.desktop]: 28 },
    fontWeight: 500,
    lineHeight: 1.45,
    letterSpacing: "0.03em",
    color: tone.ink,
  },
  english: {
    display: "block",
    marginBlock: "6px 0",
    fontSize: 13,
    lineHeight: 1.5,
    color: tone.pencil,
  },
  chartToggle: {
    marginTop: 28,
    paddingBlock: 4,
    paddingInline: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: { default: tone.stem, ":hover": tone.prussian },
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    color: tone.ink,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "160ms",
  },
  branches: {
    gridColumn: { default: "7 / span 6", [media.tablet]: "1 / span 12" },
    marginTop: { default: 48, [media.desktop]: 0 },
  },
  branchList: {
    marginBlock: "18px 0",
    paddingBlock: 0,
    paddingInlineStart: 28,
    paddingInlineEnd: 0,
    listStyle: "none",
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: tone.stem,
  },
  branch: {
    position: "relative",
    paddingBlock: 12,
    "::before": {
      content: "''",
      position: "absolute",
      top: 25,
      insetInlineStart: -28,
      width: 16,
      height: 1,
      backgroundColor: tone.stem,
    },
  },
  branchName: {
    fontSize: { default: 16, [media.desktop]: 17 },
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  chart: {
    gridColumn: "1 / span 12",
    marginInline: 0,
    marginTop: 56,
    marginBottom: 0,
  },
  chartImage: {
    display: "block",
    width: "100%",
    maxWidth: 960,
    height: "auto",
    marginInline: "auto",
  },

  closing: {
    paddingBottom: { default: 96, [media.desktop]: 160 },
  },
  ctaTitle: {
    margin: 0,
    fontSize: { default: 28, [media.desktop]: 40 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.04em",
    color: tone.prussian,
  },
  ctaActions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "16px 32px",
    marginTop: 36,
  },
  ctaPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    paddingBlock: 14,
    paddingInline: 24,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: { default: tone.prussian, ":hover": "#123f78" },
    color: tone.light,
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.06em",
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
  },
  ctaSecondary: {
    paddingBlock: 4,
    paddingInline: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: { default: tone.hairline, ":hover": tone.ink },
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 15,
    color: tone.body,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "200ms",
  },
});

const exposure = stylex.create({
  short: {
    backgroundColor: tone.wash,
    color: tone.prussian,
  },
  middle: {
    backgroundColor: tone.cobalt,
    color: tone.light,
  },
  long: {
    backgroundColor: tone.prussian,
    color: tone.light,
  },
});

const STRIP_EXPOSURES = [exposure.short, exposure.middle, exposure.long];

const placement = stylex.create({
  aerial: {
    gridColumn: { default: "1 / span 7", [media.tablet]: "1 / span 8" },
  },
  grounds: {
    gridColumn: { default: "9 / span 4", [media.tablet]: "9 / span 4" },
    width: { default: "62%", [media.wide]: "auto" },
    marginInlineStart: { default: "auto", [media.wide]: 0 },
    marginTop: { default: 40, [media.wide]: 120 },
  },
  lab: {
    gridColumn: { default: "3 / span 10", [media.tablet]: "1 / span 12" },
    marginTop: { default: 40, [media.wide]: 96 },
  },
  showroom: {
    gridColumn: { default: "1 / span 5", [media.tablet]: "1 / span 7" },
    width: { default: "82%", [media.wide]: "auto" },
    marginTop: { default: 40, [media.wide]: 96 },
  },
  reception: {
    gridColumn: { default: "7 / span 4", [media.tablet]: "8 / span 5" },
    width: { default: "64%", [media.wide]: "auto" },
    marginInlineStart: { default: "auto", [media.wide]: 0 },
    marginTop: { default: 40, [media.wide]: 200 },
  },
  lounge: {
    gridColumn: { default: "2 / span 7", [media.tablet]: "1 / span 8" },
    marginTop: { default: 40, [media.wide]: 96 },
  },
  office: {
    gridColumn: { default: "10 / span 3", [media.tablet]: "9 / span 4" },
    width: { default: "70%", [media.wide]: "auto" },
    marginInlineStart: { default: "auto", [media.wide]: 0 },
    marginTop: { default: 40, [media.wide]: 260 },
  },
});

const ratio = stylex.create({
  aerial: { aspectRatio: "1400 / 1048" },
  lab: { aspectRatio: "1400 / 577" },
  showroom: { aspectRatio: "3 / 2" },
  reception: { aspectRatio: "3 / 2" },
  lounge: { aspectRatio: "1400 / 933" },
  office: { aspectRatio: "3 / 2" },
  grounds: { aspectRatio: "2 / 3" },
});
