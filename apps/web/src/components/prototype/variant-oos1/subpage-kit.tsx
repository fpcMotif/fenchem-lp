import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-react";
import { useInView } from "motion/react";
import { Fragment, useEffect, useMemo, useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { color, ease, font, layout, media, texture, zIndex } from "./tokens.stylex";
import { useActiveSection } from "./use-active-section";

/*
 * Shared chrome for the oos1 interior pages (研发与生产 / 新闻资讯 / 联系我们).
 * Reuses the about-view editorial language: full-bleed banner with navy scrim
 * and grain, serif-italic English tagline, sticky sub-bar with breadcrumb and
 * pill chips, uppercase display-font eyebrows, and hairline-ruled reveals.
 */

const NAVY_SCRIM = "rgba(6, 28, 66, 0.78)";

const DESKTOP = breakpoints.xl;
const HOVER = "@media (hover: hover)";

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
    color: color.ink,
    fontFamily: font.body,
    minHeight: "100vh",
  },
  shell: {
    width: "100%",
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset120: {
    paddingInline: { default: 16, [media.tablet]: 40, [DESKTOP]: layout.insetFluid },
  },
  anchor: {
    scrollMarginTop: `calc(${layout.headerHeight} + ${layout.subBarHeight} + 24px)`,
  },
  section: {
    paddingBlock: { default: 72, [DESKTOP]: 112 },
  },
  sectionAlt: {
    backgroundColor: color.pageTint,
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
    transitionTimingFunction: ease.out,
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
    backgroundImage: texture.grain,
    opacity: 0.14,
    mixBlendMode: "overlay",
    pointerEvents: "none",
  },

  banner: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    boxSizing: "border-box",
    minHeight: { default: 240, [breakpoints.md]: "clamp(300px, 31vw, 480px)" },
    paddingTop: {
      default: `calc(${layout.headerHeight} + 40px)`,
      [breakpoints.md]: layout.headerHeight,
    },
    backgroundColor: color.navyDeep,
    color: colors.paper,
  },
  bannerImage: {
    animationName: { default: null, [breakpoints.motionOk]: bannerSettle },
    animationDuration: "1800ms",
    animationDelay: "200ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  bannerScrim: {
    backgroundImage: {
      default: `linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0px, rgba(255, 255, 255, 0) 112px), linear-gradient(to top, ${NAVY_SCRIM} 0%, rgba(6, 28, 66, 0.6) 55%, rgba(6, 28, 66, 0.2) 100%)`,
      [breakpoints.md]: `linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0px, rgba(255, 255, 255, 0) 160px), linear-gradient(to top, ${NAVY_SCRIM} 0%, rgba(6, 28, 66, 0.5) 50%, rgba(6, 28, 66, 0.12) 100%)`,
    },
    pointerEvents: "none",
  },
  bannerContent: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 40,
    paddingBottom: { default: 44, [media.tablet]: 56, [DESKTOP]: 72 },
  },
  bannerContentCompact: {
    paddingBottom: { default: 32, [media.tablet]: 40, [DESKTOP]: 52 },
  },
  bannerContentTall: {
    paddingBottom: { default: 44, [media.tablet]: 60, [DESKTOP]: 80 },
  },
  bannerText: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  bannerTextCompact: {
    gap: 12,
  },
  bannerEyebrow: {
    margin: 0,
    fontFamily: font.display,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.9)",
  },
  bannerTitle: {
    margin: 0,
    fontSize: { default: 40, [media.tablet]: 56, [DESKTOP]: 72 },
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "0.06em",
    textShadow: "0 2px 24px rgba(6, 28, 66, 0.35)",
  },
  bannerTitleCompact: {
    fontSize: { default: 36, [media.tablet]: 48, [DESKTOP]: 56 },
  },
  bannerTagline: {
    margin: 0,
    fontFamily: font.serifAccent,
    fontStyle: "italic",
    fontSize: { default: 21, [media.tablet]: 25, [DESKTOP]: 29 },
    fontWeight: 400,
    lineHeight: 1.2,
    color: "rgba(255, 255, 255, 0.94)",
  },
  bannerTaglineTall: {
    fontSize: { default: 22, [media.tablet]: 26, [DESKTOP]: 30 },
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
  bannerLeadTall: {
    maxWidth: 640,
  },
  bannerMeta: {
    display: { default: "none", [breakpoints.md]: "flex" },
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 14,
    flexShrink: 0,
    fontFamily: font.display,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.paper,
    textShadow: "0 1px 12px rgba(6, 28, 66, 0.55)",
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
    top: layout.headerHeight,
    zIndex: zIndex.subBar,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 1px 0 0 rgba(26, 26, 26, 0.08)",
  },
  subBarInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    height: layout.subBarHeight,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    fontSize: 13,
    letterSpacing: "0.04em",
    color: color.bodyText,
  },
  breadcrumbLink: {
    position: "relative",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontSize: "inherit",
    letterSpacing: "inherit",
    fontFamily: "inherit",
    color: { default: color.bodyText, ":hover": { default: null, [HOVER]: colors.brandBlue700 } },
    cursor: "pointer",
    "::before": {
      content: '""',
      position: "absolute",
      insetBlock: -12,
      insetInline: -8,
    },
  },
  breadcrumbCurrent: {
    color: color.ink,
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
    backgroundColor: { default: color.chip, ":hover": { default: null, [HOVER]: color.chipHover } },
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: { default: color.ink, ":hover": { default: null, [HOVER]: colors.brandBlue700 } },
    textDecoration: "none",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, color, transform, box-shadow",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
    WebkitTapHighlightColor: "transparent",
  },
  chipLead: {
    marginInlineStart: { default: 0, [breakpoints.lg]: "auto" },
  },
  chipActive: {
    backgroundColor: {
      default: colors.brandBlue700,
      ":hover": { default: null, [HOVER]: colors.brandBlue800 },
    },
    color: { default: colors.paper, ":hover": { default: null, [HOVER]: colors.paper } },
    boxShadow: "0 4px 12px -2px rgba(29, 78, 216, 0.32)",
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
  meta = [],
  image,
  imageAlt,
  imagePosition = "center 58%",
  titleId,
  size,
}: {
  eyebrow?: string;
  title: string;
  tagline?: string;
  lead: string;
  meta?: readonly string[];
  image: string;
  imageAlt: string;
  imagePosition?: string;
  titleId: string;
  size?: "compact" | "tall";
}) {
  const compact = size === "compact";
  const tall = size === "tall";
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
      <div
        {...stylex.props(
          kitStyles.shell,
          kitStyles.inset120,
          styles.bannerContent,
          compact && styles.bannerContentCompact,
          tall && styles.bannerContentTall,
        )}
      >
        <div {...stylex.props(styles.bannerText, compact && styles.bannerTextCompact)}>
          {eyebrow ? (
            <p lang="en" {...stylex.props(styles.bannerEyebrow)}>
              {eyebrow}
            </p>
          ) : null}
          <h1
            id={titleId}
            {...stylex.props(styles.bannerTitle, compact && styles.bannerTitleCompact)}
          >
            {title}
          </h1>
          {tagline ? (
            <p lang="en" {...stylex.props(styles.bannerTagline, tall && styles.bannerTaglineTall)}>
              {tagline}
            </p>
          ) : null}
          <p {...stylex.props(styles.bannerLead, tall && styles.bannerLeadTall)}>{lead}</p>
        </div>
        <div lang="en" {...stylex.props(styles.bannerMeta)}>
          {meta.map((item, index) => (
            <Fragment key={item}>
              {index > 0 ? (
                <span aria-hidden="true" {...stylex.props(styles.bannerMetaRule)} />
              ) : null}
              <span>{item}</span>
            </Fragment>
          ))}
          <span aria-hidden="true" {...stylex.props(styles.scrollTrack)}>
            <span {...stylex.props(styles.scrollThumb)} />
          </span>
        </div>
      </div>
    </section>
  );
}

const NO_CHIPS: readonly { id: string; label: string }[] = [];

export function SubPageNav({
  current,
  chips = NO_CHIPS,
  onNavigateHome,
  activeChip,
  onSelectChip,
  chipsLabel = "On this page",
}: {
  current: string;
  chips?: readonly { id: string; label: string }[];
  onNavigateHome: (hash?: string) => void;
  /** Controlled mode (filters): render buttons instead of scroll-spy anchors. */
  activeChip?: string;
  onSelectChip?: (id: string) => void;
  chipsLabel?: string;
}) {
  const controlled = onSelectChip !== undefined;
  const spyIds = useMemo(
    () => (controlled ? [] : chips.map((chip) => chip.id)),
    [controlled, chips],
  );
  const spy = useActiveSection(spyIds);
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
        {chips.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
