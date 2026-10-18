import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronRight } from "@fenchem-lp/ui/components/lucide";
import { type MotionValue, m, useMotionValue, useTransform } from "@/compat/motion";
import { createEffect, Show, type Accessor } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_HERO } from "../../about-data";
import { useActiveSection } from "../../use-active-section";
import { SECTION_IDS } from "./data";
import { layout } from "./layout";
import { media, palette } from "./palette.stylex";

const LG = "@media (min-width: 1024px)";

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
      ["@media (min-width: 640px)"]: 28,
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
    display: { default: "none", ["@media (min-width: 768px)"]: "inline" },
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

export function BisectLine(props: {
  progress: MotionValue<number>;
  root: Accessor<HTMLElement | undefined>;
}) {
  const reduce = useReducedMotion();
  const rootHeight = useMotionValue(0);
  const riderY = useTransform([props.progress, rootHeight], ([p, h]: number[]) => p * h);

  createEffect(props.root, (root) => {
    if (!root) return;
    rootHeight.set(root.offsetHeight);
    const observer = new ResizeObserver(() => rootHeight.set(root.offsetHeight));
    observer.observe(root);
    return () => observer.disconnect();
  });

  return (
    <div aria-hidden="true" {...stylex.attrs(styles.overlay)}>
      <span {...stylex.attrs(styles.line)} />
      <Show when={!reduce()}>
        <m.span {...stylex.attrs(styles.rider)} style={{ y: riderY }}>
          <svg viewBox="0 0 16 16" width="16" height="16" {...{ focusable: "false" }}>
            <path d={CROSS_PATH} {...stylex.attrs(styles.crossHalo)} />
            <path d={CROSS_PATH} {...stylex.attrs(styles.crossLine)} />
          </svg>
        </m.span>
      </Show>
    </div>
  );
}

export function SubNav(props: { onNavigateHome: (hash?: string) => void }) {
  const active = useActiveSection(SECTION_IDS);
  let chipsRef: HTMLElement | undefined;
  const reduce = useReducedMotion();

  createEffect(
    () => [active(), reduce()] as const,
    ([current, reduceNow]) => {
      const list = chipsRef;
      const chip = current ? list?.querySelector<HTMLElement>(`[href="#${current}"]`) : null;
      if (!list || !chip) return;
      const listBox = list.getBoundingClientRect();
      const chipBox = chip.getBoundingClientRect();
      if (chipBox.left < listBox.left || chipBox.right > listBox.right) {
        list.scrollBy({
          left: chipBox.left - listBox.left - 16,
          behavior: reduceNow ? "auto" : "smooth",
        });
      }
    },
  );

  return (
    <div {...stylex.attrs(styles.bar)}>
      <div {...stylex.attrs(layout.shell, styles.barSplit)}>
        <nav aria-label="Breadcrumb" {...stylex.attrs(styles.barLeft, styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => props.onNavigateHome("top")}
            {...stylex.attrs(styles.breadcrumbLink, layout.focusRing)}
          >
            <span lang="en">Home</span>
          </button>
          <ChevronRight size={14} aria-hidden="true" {...stylex.attrs(styles.breadcrumbChevron)} />
          <span aria-current="page" {...stylex.attrs(styles.breadcrumbCurrent)}>
            <span lang="en">About</span>
          </span>
        </nav>
        <nav
          aria-label="On this page"
          ref={chipsRef}
          {...stylex.attrs(styles.barRight, styles.chips)}
        >
          {ABOUT_HERO.navChips.map((chip) => (
            <a
              href={`#${chip.id}`}
              aria-current={active() === chip.id ? "location" : undefined}
              {...stylex.attrs(
                styles.chip,
                active() === chip.id && styles.chipActive,
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
