import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { createEffect } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { useActiveSection } from "../../use-active-section";
import { NAV_ITEMS, SECTION_IDS, ui } from "./shared-values";
import { font, motionCss, step, tone } from "./tokens.stylex";

const s = stylex.create({
  bar: {
    position: "sticky",
    top: 80,
    zIndex: 1,
    backgroundColor: "rgba(243, 245, 250, 0.94)",
    backdropFilter: "blur(16px)",
    boxShadow: `0 1px 0 0 ${tone.hairline}`,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    height: 52,
  },
  crumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.body,
  },
  crumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: "inherit",
    fontWeight: 400,
    letterSpacing: "inherit",
    color: { default: tone.body, ":hover": tone.ink },
    cursor: "pointer",
  },
  crumbCurrent: {
    display: { default: "none", [breakpoints.lg]: "inline" },
  },
  crumbSep: {
    display: { default: "none", [breakpoints.lg]: "inline" },
  },
  tabs: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: { default: "flex-start", [breakpoints.lg]: "flex-end" },
    flexGrow: 1,
    minWidth: 0,
    height: "100%",
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  tab: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    paddingInline: { default: 12, [breakpoints.xl]: 16 },
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: { default: tone.body, ":hover": tone.ink },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color",
    transitionDuration: "160ms",
    transitionTimingFunction: motionCss.out,
  },
  tabActive: {
    color: tone.ink,
  },
  tabMark: {
    position: "absolute",
    left: { default: 12, [breakpoints.xl]: 16 },
    right: { default: 12, [breakpoints.xl]: 16 },
    bottom: 10,
    height: 1,
    backgroundColor: tone.ink,
    opacity: 0,
    transform: "scaleX(0)",
    transformOrigin: "50% 50%",
    transitionProperty: "opacity, transform",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "420ms" },
    transitionTimingFunction: motionCss.out,
  },
  tabMarkActive: {
    opacity: 1,
    transform: "scaleX(1)",
  },
});

export function SubNav(props: { onNavigateHome: (hash?: string) => void }) {
  const active = useActiveSection(SECTION_IDS);
  let tabsRef: HTMLElement | undefined;
  const reduce = useReducedMotion();

  createEffect(
    () => [active(), reduce()] as const,
    ([current, reduced]) => {
      const list = tabsRef;
      const tab = current ? list?.querySelector<HTMLElement>(`[href="#${current}"]`) : null;
      if (!list || !tab) return;
      const listBox = list.getBoundingClientRect();
      const tabBox = tab.getBoundingClientRect();
      if (tabBox.left < listBox.left || tabBox.right > listBox.right) {
        list.scrollBy({
          left: tabBox.left - listBox.left - 16,
          behavior: reduced ? "auto" : "smooth",
        });
      }
    },
  );

  return (
    <div {...stylex.attrs(s.bar)}>
      <div {...stylex.attrs(ui.shell, ui.inset, s.inner)}>
        <nav aria-label="Breadcrumb" lang="en" {...stylex.attrs(s.crumb)}>
          <button
            type="button"
            onClick={() => props.onNavigateHome("top")}
            {...stylex.attrs(s.crumbLink, ui.focusRing)}
          >
            Home
          </button>
          <span aria-hidden="true" {...stylex.attrs(s.crumbSep)}>
            /
          </span>
          <span aria-current="page" {...stylex.attrs(s.crumbCurrent)}>
            About
          </span>
        </nav>
        <nav aria-label="On this page" ref={tabsRef} {...stylex.attrs(s.tabs)}>
          {NAV_ITEMS.map((item) => {
            const isActive = () => active() === item.id;
            return (
              <a
                href={`#${item.id}`}
                aria-current={isActive() ? "location" : undefined}
                {...stylex.attrs(s.tab, isActive() && s.tabActive, ui.focusRing)}
              >
                <span lang="en">{item.english}</span>
                <span
                  aria-hidden="true"
                  {...stylex.attrs(s.tabMark, isActive() && s.tabMarkActive)}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
