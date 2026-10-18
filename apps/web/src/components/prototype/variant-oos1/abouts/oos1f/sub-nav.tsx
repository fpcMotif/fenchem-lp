import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { createEffect } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_HERO } from "../../about-data";
import { useActiveSection } from "../../use-active-section";
import { Shell } from "./layout";
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
    display: { default: "none", ["@media (min-width: 1024px)"]: "flex" },
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
    justifyContent: { default: "flex-start", ["@media (min-width: 1024px)"]: "flex-end" },
    gap: { default: 24, ["@media (min-width: 768px)"]: 32 },
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

function Braid(props: { shown: boolean }) {
  return (
    <svg
      aria-hidden="true"
      {...{ focusable: "false" }}
      width="20"
      height="7"
      viewBox="0 0 20 7"
      {...stylex.attrs(styles.braid, props.shown && styles.braidShown)}
    >
      <path d="M0 3.5C3.3 0.4 6.7 0.4 10 3.5S16.7 6.6 20 3.5" {...stylex.attrs(styles.braidBlue)} />
      <path d="M0 3.5C3.3 6.6 6.7 6.6 10 3.5S16.7 0.4 20 3.5" {...stylex.attrs(styles.braidMint)} />
    </svg>
  );
}

export function SubNav(props: { onNavigateHome: (hash?: string) => void }) {
  const active = useActiveSection(SECTION_IDS);
  let tabsRef: HTMLElement | undefined;
  const reduce = useReducedMotion();

  createEffect(
    () => [active(), reduce()] as const,
    ([current, reduceNow]) => {
      const list = tabsRef;
      const tab = current ? list?.querySelector<HTMLElement>(`[href="#${current}"]`) : null;
      if (!list || !tab) return;
      const listBox = list.getBoundingClientRect();
      const tabBox = tab.getBoundingClientRect();
      if (tabBox.left < listBox.left || tabBox.right > listBox.right) {
        list.scrollBy({
          left: tabBox.left - listBox.left - 16,
          behavior: reduceNow ? "auto" : "smooth",
        });
      }
    },
  );

  return (
    <div {...stylex.attrs(styles.bar)}>
      <Shell sx={styles.inner}>
        <nav aria-label="Breadcrumb" {...stylex.attrs(styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => props.onNavigateHome("top")}
            {...stylex.attrs(styles.breadcrumbLink)}
          >
            首页
          </button>
          <span aria-hidden="true">/</span>
          <span aria-current="page" {...stylex.attrs(styles.breadcrumbCurrent)}>
            关于我们
          </span>
        </nav>
        <nav aria-label="On this page" ref={tabsRef} {...stylex.attrs(styles.tabs)}>
          {ABOUT_HERO.navChips.map((chip) => (
            <a
              href={`#${chip.id}`}
              aria-current={active() === chip.id ? "location" : undefined}
              {...stylex.attrs(styles.tab, active() === chip.id && styles.tabActive)}
            >
              <span lang="en">{ENGLISH_LABELS[chip.id]}</span>
              <Braid shown={active() === chip.id} />
            </a>
          ))}
        </nav>
      </Shell>
    </div>
  );
}
