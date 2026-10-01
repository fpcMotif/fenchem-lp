import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_BANNER, ABOUT_CAMPUS, ABOUT_HERO } from "../../about-data";
import type { AboutPageProps } from "../../index";
import { useActiveSection } from "../../use-active-section";
import { NAV_ENGLISH } from "./data";
import { Lightbox } from "./lightbox";
import { NavyBand } from "./navy-band";
import { Panorama } from "./panorama";
import { ClosingCta, CsrSection, ProductsSection } from "./sections";
import { Cross } from "./seam";
import { ease, face, mq, tone } from "./tokens.stylex";
import { ui } from "./ui";
import { usePinned } from "./use-pinned";

const SECTION_IDS = ABOUT_HERO.navChips.map((chip) => chip.id);

const rise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(20px)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  root: {
    overflowX: "clip",
    backgroundColor: tone.page,
    color: tone.ink,
    fontFamily: face.cjk,
  },
  banner: {
    paddingTop: { default: 80 + 32, [mq.md]: 80 + 48, [mq.xl]: 80 + 56 },
    backgroundColor: tone.page,
  },
  head: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [mq.lg]: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
    },
    alignItems: "end",
    columnGap: 72,
    rowGap: 20,
    animationName: { default: "none", [mq.motionOk]: rise },
    animationDuration: "900ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  title: {
    display: "flex",
    alignItems: "baseline",
    margin: 0,
    fontSize: { default: 64, [mq.md]: 104, [mq.xl]: "clamp(120px, 10.4vw, 152px)" },
    lineHeight: 1,
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  titleLight: {
    marginInlineEnd: "0.12em",
    fontSize: "0.56em",
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.body,
  },
  titleHeavy: {
    fontWeight: 700,
  },
  aside: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    paddingBottom: { default: 0, [mq.lg]: 12 },
  },
  tagline: {
    margin: 0,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 28, [mq.md]: 34, [mq.xl]: 40 },
    fontWeight: 400,
    lineHeight: 1.12,
    color: colors.brandBlue700,
    textWrap: "balance",
  },
  lead: {
    margin: 0,
    maxWidth: "30em",
    fontSize: { default: 15, [mq.xl]: 16 },
    fontWeight: 400,
    lineHeight: 1.9,
    letterSpacing: "0.06em",
    color: tone.body,
    textWrap: "pretty",
  },
  figure: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    marginTop: { default: 32, [mq.xl]: 48 },
    height: "clamp(220px, 33vw, 480px)",
    backgroundColor: tone.placeholder,
  },
  figureImage: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 58%",
  },

  subBar: {
    position: "sticky",
    top: 80,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    backdropFilter: "blur(16px)",
    boxShadow: `0 1px 0 0 ${tone.hairline}`,
  },
  subBarInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    height: 48,
  },
  breadcrumb: {
    display: { default: "none", [mq.lg]: "flex" },
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: tone.body,
  },
  breadcrumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    letterSpacing: "inherit",
    color: { default: tone.body, ":hover": tone.ink },
    cursor: "pointer",
  },
  chips: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: { default: "flex-start", [mq.lg]: "flex-end" },
    gap: 28,
    flexGrow: 1,
    minWidth: 0,
    height: "100%",
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  chip: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: { default: tone.body, ":hover": tone.ink },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -4,
  },
  chipMark: {
    position: "absolute",
    bottom: 5,
    left: "50%",
    display: "flex",
    translate: "-50% 0",
    color: tone.ink,
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    transitionTimingFunction: ease.out,
  },
  chipMarkActive: {
    opacity: 1,
  },
});

function Banner() {
  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(styles.banner)}>
      <div {...stylex.props(ui.shell, ui.inset)}>
        <div {...stylex.props(styles.head)}>
          <h1 id="about-banner-title" {...stylex.props(styles.title)}>
            <span {...stylex.props(styles.titleLight)}>关于</span>
            <span {...stylex.props(styles.titleHeavy)}>泛成</span>
          </h1>
          <div {...stylex.props(styles.aside)}>
            <p lang="en" {...stylex.props(styles.tagline)}>
              {ABOUT_BANNER.tagline}
            </p>
            <p {...stylex.props(styles.lead)}>{ABOUT_BANNER.lead}</p>
          </div>
        </div>
      </div>
      <figure {...stylex.props(styles.figure)}>
        <img
          src={ABOUT_BANNER.image}
          alt={ABOUT_BANNER.alt}
          fetchPriority="high"
          decoding="async"
          {...stylex.props(styles.figureImage)}
        />
      </figure>
    </section>
  );
}

function SubNav({
  pinned,
  onNavigateHome,
}: {
  pinned: boolean;
  onNavigateHome: (hash?: string) => void;
}) {
  const ids = useMemo(() => (pinned ? [...SECTION_IDS] : SECTION_IDS), [pinned]);
  const active = useActiveSection(ids);
  const chipListRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const list = chipListRef.current;
    const chip = active ? list?.querySelector<HTMLElement>(`[href="#${active}"]`) : null;
    if (!list || !chip) return;
    const listBox = list.getBoundingClientRect();
    const chipBox = chip.getBoundingClientRect();
    if (chipBox.left < listBox.left || chipBox.right > listBox.right) {
      list.scrollBy({
        left: chipBox.left - listBox.left - 16,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  }, [active, reduce]);

  return (
    <div {...stylex.props(styles.subBar)}>
      <div {...stylex.props(ui.shell, ui.inset, styles.subBarInner)}>
        <nav aria-label="面包屑导航" {...stylex.props(styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(styles.breadcrumbLink, ui.focusRing)}
          >
            首页
          </button>
          <ChevronRight size={12} aria-hidden="true" />
          <span aria-current="page">关于我们</span>
        </nav>
        <nav aria-label="本页导航" ref={chipListRef} {...stylex.props(styles.chips)}>
          {ABOUT_HERO.navChips.map((chip) => {
            const isActive = active === chip.id;
            return (
              <a
                key={chip.id}
                href={`#${chip.id}`}
                aria-label={chip.label}
                aria-current={isActive ? "location" : undefined}
                {...stylex.props(styles.chip)}
              >
                <span lang="en">{NAV_ENGLISH[chip.id]}</span>
                <span
                  aria-hidden="true"
                  {...stylex.props(styles.chipMark, isActive && styles.chipMarkActive)}
                >
                  <Cross size={6} />
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function AboutOOS1C({ onNavigateHome }: AboutPageProps) {
  const pinned = usePinned();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const count = ABOUT_CAMPUS.photos.length;

  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <Banner />
      <SubNav pinned={pinned} onNavigateHome={onNavigateHome} />
      <Panorama
        pinned={pinned}
        onOpenPhoto={(index) => {
          setStepped(false);
          setOpenIndex(index);
        }}
      />
      <CsrSection />
      <ProductsSection onNavigateHome={onNavigateHome} />
      <NavyBand />
      <ClosingCta onNavigateHome={onNavigateHome} />
      <Lightbox
        index={openIndex}
        stepped={stepped}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) => {
          setStepped(true);
          setOpenIndex((current) => (current === null ? null : (current + delta + count) % count));
        }}
      />
    </div>
  );
}
