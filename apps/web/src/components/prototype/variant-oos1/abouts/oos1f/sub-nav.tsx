import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_HERO } from "../../about-data";
import { useActiveSection } from "../../use-active-section";
import { Shell } from "./layout";
import { srOnly } from "./layout-values";
import { color, ease, font } from "./palette.stylex";

const SECTION_IDS = ABOUT_HERO.navChips.map((chip) => chip.id);

const ENGLISH_LABELS: Record<string, string> = {
  "about-profile": "Profile",
  "about-campus": "Campus",
  "about-culture": "Culture",
  "about-csr": "Responsibility",
  "about-honor": "Honors",
  "about-structure": "Structure",
};

const styles = stylex.create({
  bar: {
    position: "sticky",
    top: 80,
    zIndex: 1,
    backgroundColor: "rgba(243, 245, 250, 0.92)",
    backdropFilter: "blur(16px)",
    boxShadow: `0 1px 0 0 ${color.hairline}`,
    fontFamily: font.cjk,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    height: 56,
  },
  breadcrumb: {
    display: { default: "none", [breakpoints.lg]: "flex" },
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: color.body,
  },
  breadcrumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: 400,
    letterSpacing: "inherit",
    color: { default: color.body, ":hover": color.ink },
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  breadcrumbCurrent: {
    color: color.ink,
  },
  tabs: {
    display: "flex",
    alignItems: "center",
    justifyContent: { default: "flex-start", [breakpoints.lg]: "flex-end" },
    gap: { default: 24, [breakpoints.md]: 32 },
    flexGrow: 1,
    minWidth: 0,
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  tab: {
    position: "relative",
    flexShrink: 0,
    paddingBlock: 12,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: { default: color.body, ":hover": color.ink },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  tabActive: {
    color: color.ink,
  },
  braid: {
    position: "absolute",
    left: "50%",
    bottom: 3,
    marginLeft: -10,
    display: "block",
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    transitionTimingFunction: ease.out,
    pointerEvents: "none",
  },
  braidShown: {
    opacity: 1,
  },
  braidBlue: {
    fill: "none",
    stroke: colors.brandBlue700,
    strokeWidth: 1,
  },
  braidMint: {
    fill: "none",
    stroke: colors.brandGreen500,
    strokeWidth: 1,
  },
});

function Braid({ shown }: { shown: boolean }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="7"
      viewBox="0 0 20 7"
      {...stylex.props(styles.braid, shown && styles.braidShown)}
    >
      <path d="M0 3.5C3.3 0.4 6.7 0.4 10 3.5S16.7 6.6 20 3.5" {...stylex.props(styles.braidBlue)} />
      <path d="M0 3.5C3.3 6.6 6.7 6.6 10 3.5S16.7 0.4 20 3.5" {...stylex.props(styles.braidMint)} />
    </svg>
  );
}

export function SubNav({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const active = useActiveSection(SECTION_IDS);
  const tabsRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const list = tabsRef.current;
    const tab = active ? list?.querySelector<HTMLElement>(`[href="#${active}"]`) : null;
    if (!list || !tab) return;
    const listBox = list.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    if (tabBox.left < listBox.left || tabBox.right > listBox.right) {
      list.scrollBy({
        left: tabBox.left - listBox.left - 16,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  }, [active, reduce]);

  return (
    <div {...stylex.props(styles.bar)}>
      <Shell sx={styles.inner}>
        <nav aria-label="面包屑导航" {...stylex.props(styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(styles.breadcrumbLink)}
          >
            首页
          </button>
          <span aria-hidden="true">/</span>
          <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
            关于我们
          </span>
        </nav>
        <nav aria-label="本页导航" ref={tabsRef} {...stylex.props(styles.tabs)}>
          {ABOUT_HERO.navChips.map((chip) => (
            <a
              key={chip.id}
              href={`#${chip.id}`}
              aria-current={active === chip.id ? "location" : undefined}
              {...stylex.props(styles.tab, active === chip.id && styles.tabActive)}
            >
              <span lang="en">{ENGLISH_LABELS[chip.id]}</span>
              <span {...stylex.props(srOnly)}> {chip.label}</span>
              <Braid shown={active === chip.id} />
            </a>
          ))}
        </nav>
      </Shell>
    </div>
  );
}
