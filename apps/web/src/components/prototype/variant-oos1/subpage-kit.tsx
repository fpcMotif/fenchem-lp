import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-react";
import { useInView } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { useActiveSection } from "./use-active-section";

/*
 * Shared chrome for the oos1 interior pages (研发与生产 / 新闻资讯 / 联系我们).
 * Reuses the about-view editorial language: full-bleed banner with navy scrim
 * and grain, serif-italic English tagline, sticky sub-bar with breadcrumb and
 * pill chips, uppercase display-font eyebrows, and hairline-ruled reveals.
 */

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const NAVY_DEEP = "#0b2a5c";
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const SERIF_ACCENT = '"Instrument Serif", Georgia, serif';
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

const HEADER_HEIGHT = 80;
const SUB_BAR_HEIGHT = 64;

const NAVY_SCRIM = "rgba(6, 28, 66, 0.78)";
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const INSET_120 = "min(120px, 8.333vw)";

const REVEAL_STEP_MS = 70;
const REVEAL_MAX_STEPS = 5;

const revealDelay = (index: number) => Math.min(index, REVEAL_MAX_STEPS) * REVEAL_STEP_MS;

const bannerSettle = stylex.keyframes({
  "0%": { scale: "1.08" },
  "100%": { scale: "1" },
});

const scrollCue = stylex.keyframes({
  "0%": { transform: "translateY(-100%)" },
  "100%": { transform: "translateY(200%)" },
});

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export const kitStyles = stylex.create({
  root: {
    backgroundColor: colors.paper,
    color: INK,
    fontFamily: BODY_FONT,
    minHeight: "100vh",
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset120: {
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_120 },
  },
  anchor: {
    scrollMarginTop: HEADER_HEIGHT + SUB_BAR_HEIGHT + 24,
  },
  section: {
    paddingBlock: { default: 72, [DESKTOP]: 112 },
  },
  sectionAlt: {
    backgroundColor: "#f3f5fa",
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
});

const styles = stylex.create({
  reveal: {
    opacity: 0,
    transform: { default: null, [breakpoints.motionOk]: "translateY(18px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "900ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  revealShown: {
    opacity: 1,
    transform: "none",
  },

  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  grain: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: GRAIN,
    opacity: 0.14,
    mixBlendMode: "overlay",
    pointerEvents: "none",
  },

  banner: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    height: { default: 440, [TABLET]: 520, [DESKTOP]: "clamp(540px, 68svh, 660px)" },
    backgroundColor: NAVY_DEEP,
    color: colors.paper,
  },
  bannerImage: {
    animationName: { default: null, [breakpoints.motionOk]: bannerSettle },
    animationDuration: "1800ms",
    animationDelay: "200ms",
    animationTimingFunction: EASE_OUT_CSS,
    animationFillMode: "both",
  },
  bannerScrim: {
    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0px, rgba(255, 255, 255, 0) 160px), linear-gradient(to top, ${NAVY_SCRIM} 0%, rgba(6, 28, 66, 0.34) 42%, rgba(6, 28, 66, 0) 66%)`,
    pointerEvents: "none",
  },
  bannerContent: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 40,
    paddingBottom: { default: 44, [TABLET]: 56, [DESKTOP]: 72 },
  },
  bannerText: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  bannerEyebrow: {
    margin: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.72)",
  },
  bannerTitle: {
    margin: 0,
    fontSize: { default: 40, [TABLET]: 56, [DESKTOP]: 72 },
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "0.06em",
    textShadow: "0 2px 24px rgba(6, 28, 66, 0.35)",
  },
  bannerTagline: {
    margin: 0,
    fontFamily: SERIF_ACCENT,
    fontStyle: "italic",
    fontSize: { default: 21, [TABLET]: 25, [DESKTOP]: 29 },
    fontWeight: 400,
    lineHeight: 1.2,
    color: "rgba(255, 255, 255, 0.94)",
  },
  bannerLead: {
    margin: 0,
    maxWidth: 620,
    fontSize: { default: 15, [DESKTOP]: 17 },
    lineHeight: 1.8,
    letterSpacing: "0.08em",
    color: "rgba(255, 255, 255, 0.84)",
    textWrap: "pretty",
  },
  bannerMeta: {
    display: { default: "none", [breakpoints.md]: "flex" },
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 14,
    flexShrink: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.92)",
  },
  bannerMetaRule: {
    width: 40,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.72)",
  },
  scrollTrack: {
    position: "relative",
    overflow: "hidden",
    width: 1,
    height: 56,
    marginTop: 10,
    marginInlineEnd: 4,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  scrollThumb: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "40%",
    backgroundColor: colors.paper,
    animationName: { default: null, [breakpoints.motionOk]: scrollCue },
    animationDuration: "2400ms",
    animationTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
    animationIterationCount: "infinite",
  },

  subBar: {
    position: "sticky",
    top: HEADER_HEIGHT,
    zIndex: 30,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 1px 0 0 rgba(26, 26, 26, 0.08)",
  },
  subBarInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    height: SUB_BAR_HEIGHT,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    fontSize: 13,
    letterSpacing: "0.04em",
    color: BODY_TEXT,
  },
  breadcrumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontSize: "inherit",
    letterSpacing: "inherit",
    fontFamily: "inherit",
    color: { default: BODY_TEXT, ":hover": colors.brandBlue700 },
    cursor: "pointer",
  },
  breadcrumbCurrent: {
    color: INK,
    fontWeight: 600,
  },
  chipList: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexGrow: 1,
    minWidth: 0,
    paddingBlock: 4,
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  chip: {
    appearance: "none",
    borderWidth: 0,
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: 36,
    paddingInline: 18,
    borderRadius: 999,
    backgroundColor: { default: "#f3f4f6", ":hover": "#e5e7eb" },
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: { default: INK, ":hover": colors.brandBlue700 },
    textDecoration: "none",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transitionProperty: "background-color, color, transform, box-shadow",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  chipLead: {
    marginInlineStart: { default: 0, [breakpoints.lg]: "auto" },
  },
  chipActive: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: { default: colors.paper, ":hover": colors.paper },
    boxShadow: "0 4px 12px -2px rgba(29, 78, 216, 0.32)",
  },

  sectionHead: {
    maxWidth: 720,
    marginBottom: { default: 40, [DESKTOP]: 56 },
  },
  sectionEyebrow: {
    margin: 0,
    marginBottom: 12,
    fontFamily: DISPLAY_FONT,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.brandBlue700,
  },
  sectionEyebrowInvert: {
    color: "#9db9e8",
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
    textWrap: "balance",
  },
  sectionTitleInvert: {
    color: colors.paper,
  },
  sectionLead: {
    margin: 0,
    marginTop: 14,
    maxWidth: "36em",
    fontSize: { default: 15, [DESKTOP]: 16 },
    lineHeight: 1.8,
    letterSpacing: "0.03em",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  sectionLeadInvert: {
    color: "rgba(255, 255, 255, 0.72)",
  },
});

export function Reveal({
  children,
  step = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  return (
    <Tag
      ref={ref}
      {...stylex.props(
        styles.reveal,
        shown && styles.revealShown,
        dynamic.delay(revealDelay(step)),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}

export function SubPageBanner({
  eyebrow,
  title,
  tagline,
  lead,
  meta,
  image,
  imageAlt,
  imagePosition = "center 58%",
  titleId,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  lead: string;
  meta: readonly string[];
  image: string;
  imageAlt: string;
  imagePosition?: string;
  titleId: string;
}) {
  return (
    <section aria-labelledby={titleId} {...stylex.props(styles.banner)}>
      <img
        src={image}
        alt={imageAlt}
        fetchPriority="high"
        decoding="async"
        style={{ objectPosition: imagePosition }}
        {...stylex.props(styles.fill, styles.bannerImage)}
      />
      <div aria-hidden="true" {...stylex.props(styles.fill, styles.bannerScrim)} />
      <div aria-hidden="true" {...stylex.props(styles.grain)} />
      <div {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.bannerContent)}>
        <div {...stylex.props(styles.bannerText)}>
          <p lang="en" {...stylex.props(styles.bannerEyebrow)}>
            {eyebrow}
          </p>
          <h1 id={titleId} {...stylex.props(styles.bannerTitle)}>
            {title}
          </h1>
          <p lang="en" {...stylex.props(styles.bannerTagline)}>
            {tagline}
          </p>
          <p {...stylex.props(styles.bannerLead)}>{lead}</p>
        </div>
        <div lang="en" {...stylex.props(styles.bannerMeta)}>
          {meta.map((item, index) => (
            <span key={item}>
              {index > 0 ? (
                <span aria-hidden="true" {...stylex.props(styles.bannerMetaRule)} />
              ) : null}
              {item}
            </span>
          ))}
          <span aria-hidden="true" {...stylex.props(styles.scrollTrack)}>
            <span {...stylex.props(styles.scrollThumb)} />
          </span>
        </div>
      </div>
    </section>
  );
}

export function SubPageNav({
  current,
  chips,
  onNavigateHome,
  activeChip,
  onSelectChip,
  chipsLabel = "On this page",
}: {
  current: string;
  chips: readonly { id: string; label: string }[];
  onNavigateHome: (hash?: string) => void;
  /** Controlled mode (filters): render buttons instead of scroll-spy anchors. */
  activeChip?: string;
  onSelectChip?: (id: string) => void;
  chipsLabel?: string;
}) {
  const controlled = onSelectChip !== undefined;
  const spy = useActiveSection(controlled ? [] : chips.map((chip) => chip.id));
  const active = controlled ? activeChip : spy;
  const chipListRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const list = chipListRef.current;
    const chip = active ? list?.querySelector<HTMLElement>(`[data-chip="${active}"]`) : null;
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
      <div {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.subBarInner)}>
        <nav aria-label="Breadcrumb" {...stylex.props(styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(styles.breadcrumbLink, kitStyles.focusRing)}
          >
            首页
          </button>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
            {current}
          </span>
        </nav>
        <nav aria-label={chipsLabel} ref={chipListRef} {...stylex.props(styles.chipList)}>
          {chips.map((chip, index) => {
            const isActive = active === chip.id;
            const sx = stylex.props(
              styles.chip,
              index === 0 && styles.chipLead,
              isActive && styles.chipActive,
              kitStyles.focusRing,
            );
            return controlled ? (
              <button
                key={chip.id}
                type="button"
                data-chip={chip.id}
                aria-pressed={isActive}
                onClick={() => onSelectChip(chip.id)}
                {...sx}
              >
                {chip.label}
              </button>
            ) : (
              <a
                key={chip.id}
                href={`#${chip.id}`}
                data-chip={chip.id}
                aria-current={isActive ? "location" : undefined}
                {...sx}
              >
                {chip.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  titleId,
  lead,
  invert = false,
}: {
  eyebrow: string;
  title: string;
  titleId: string;
  lead?: string;
  invert?: boolean;
}) {
  return (
    <Reveal sx={styles.sectionHead}>
      <p
        lang="en"
        {...stylex.props(styles.sectionEyebrow, invert && styles.sectionEyebrowInvert)}
      >
        {eyebrow}
      </p>
      <h2
        id={titleId}
        {...stylex.props(styles.sectionTitle, invert && styles.sectionTitleInvert)}
      >
        {title}
      </h2>
      {lead ? (
        <p {...stylex.props(styles.sectionLead, invert && styles.sectionLeadInvert)}>{lead}</p>
      ) : null}
    </Reveal>
  );
}
