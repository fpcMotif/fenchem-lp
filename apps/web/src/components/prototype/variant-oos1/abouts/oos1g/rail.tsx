import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "lucide-react";
import { type MotionValue, m, useMotionValue, useTransform } from "motion/react";
import { type RefObject, useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_HERO } from "../../about-data";
import { useActiveSection } from "../../use-active-section";
import { SECTION_IDS } from "./data";
import { layout } from "./layout";
import { media, palette } from "./palette.stylex";

const LG = breakpoints.lg;

const NAV_NAMES: Readonly<Record<string, string>> = {
  "about-profile": "Profile",
  "about-campus": "Campus",
  "about-culture": "Culture",
  "about-csr": "Responsibility",
  "about-honor": "Honors",
  "about-structure": "Structure",
};

const styles = stylex.create({
  overlay: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    display: { default: "none", [LG]: "block" },
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },
  line: {
    position: "absolute",
    top: 0,
    left: "50%",
    width: 1,
    height: "100%",
    backgroundColor: colors.brandBlue300,
    opacity: 0.55,
  },
  rider: {
    position: "absolute",
    top: 0,
    left: "50%",
    display: "block",
    width: 16,
    height: 16,
    marginTop: -8,
    marginInlineStart: -8,
    lineHeight: 0,
  },
  crossHalo: {
    fill: "none",
    stroke: "#ffffff",
    strokeOpacity: 0.85,
    strokeWidth: 3,
  },
  crossLine: {
    fill: "none",
    stroke: colors.brandBlue700,
    strokeWidth: 1,
  },

  bar: {
    position: "sticky",
    top: palette.headerHeight,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 1px 0 0 rgba(26, 26, 26, 0.1)",
  },
  barSplit: {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: { default: "auto minmax(0, 1fr)", [LG]: "minmax(0, 1fr) minmax(0, 1fr)" },
    columnGap: { default: 12, [LG]: 0 },
    height: palette.barHeight,
  },
  barLeft: {
    boxSizing: "border-box",
    paddingInlineStart: {
      default: 20,
      [breakpoints.sm]: 28,
      [media.tablet]: 40,
      [LG]: "min(72px, 5.2vw)",
    },
    paddingInlineEnd: { default: 0, [LG]: 48 },
    justifyContent: { default: "flex-start", [LG]: "flex-end" },
  },
  barRight: {
    boxSizing: "border-box",
    minWidth: 0,
    paddingInlineEnd: { default: 0, [LG]: "min(72px, 5.2vw)" },
    paddingInlineStart: { default: 0, [LG]: 48 },
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: palette.fontBody,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: palette.body,
    whiteSpace: "nowrap",
  },
  breadcrumbLink: {
    position: "relative",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
    color: { default: palette.body, ":hover": palette.ink },
    cursor: "pointer",
  },
  breadcrumbCurrent: {
    position: "relative",
    display: { default: "none", [breakpoints.md]: "inline" },
    color: palette.ink,
  },
  breadcrumbChevron: {
    flexShrink: 0,
  },
  chips: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 22,
    minWidth: 0,
    overflowX: "auto",
    scrollbarWidth: "none",
    paddingInlineEnd: { default: 20, [LG]: 0 },
  },
  chip: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: palette.barHeight,
    boxSizing: "border-box",
    paddingBlock: 1,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    fontFamily: palette.fontBody,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.05em",
    color: { default: palette.body, ":hover": palette.ink },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color, border-color",
    transitionDuration: "160ms",
    transitionTimingFunction: palette.easeOut,
  },
  chipActive: {
    borderBottomColor: palette.ink,
    color: palette.ink,
  },
});

const CROSS_PATH = "M8 0V16M0 8H16";

export function BisectLine({
  progress,
  rootRef,
}: {
  progress: MotionValue<number>;
  rootRef: RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();
  const rootHeight = useMotionValue(0);
  const riderY = useTransform([progress, rootHeight], ([p, h]: number[]) => p * h);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    rootHeight.set(root.offsetHeight);
    const observer = new ResizeObserver(() => rootHeight.set(root.offsetHeight));
    observer.observe(root);
    return () => observer.disconnect();
  }, [rootRef, rootHeight]);

  return (
    <div aria-hidden="true" {...stylex.props(styles.overlay)}>
      <span {...stylex.props(styles.line)} />
      {reduce ? null : (
        <m.span {...stylex.props(styles.rider)} style={{ y: riderY }}>
          <svg viewBox="0 0 16 16" width="16" height="16" focusable="false">
            <path d={CROSS_PATH} {...stylex.props(styles.crossHalo)} />
            <path d={CROSS_PATH} {...stylex.props(styles.crossLine)} />
          </svg>
        </m.span>
      )}
    </div>
  );
}

export function SubNav({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const active = useActiveSection(SECTION_IDS);
  const chipsRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const list = chipsRef.current;
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
    <div {...stylex.props(styles.bar)}>
      <div {...stylex.props(layout.shell, styles.barSplit)}>
        <nav aria-label="Breadcrumb" {...stylex.props(styles.barLeft, styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(styles.breadcrumbLink, layout.focusRing)}
          >
            <span lang="en">Home</span>
          </button>
          <ChevronRight size={14} aria-hidden="true" {...stylex.props(styles.breadcrumbChevron)} />
          <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
            <span lang="en">About</span>
          </span>
        </nav>
        <nav
          aria-label="On this page"
          ref={chipsRef}
          {...stylex.props(styles.barRight, styles.chips)}
        >
          {ABOUT_HERO.navChips.map((chip) => (
            <a
              key={chip.id}
              href={`#${chip.id}`}
              aria-current={active === chip.id ? "location" : undefined}
              {...stylex.props(
                styles.chip,
                active === chip.id && styles.chipActive,
                layout.focusRing,
              )}
            >
              <span lang="en">{NAV_NAMES[chip.id] ?? chip.id}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
