import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef } from "react";

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
    <div {...stylex.props(s.bar)}>
      <div {...stylex.props(ui.shell, ui.inset, s.inner)}>
        <nav aria-label="Breadcrumb" lang="en" {...stylex.props(s.crumb)}>
          <button
            type="button"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(s.crumbLink, ui.focusRing)}
          >
            Home
          </button>
          <span aria-hidden="true" {...stylex.props(s.crumbSep)}>
            /
          </span>
          <span aria-current="page" {...stylex.props(s.crumbCurrent)}>
            About
          </span>
        </nav>
        <nav aria-label="On this page" ref={tabsRef} {...stylex.props(s.tabs)}>
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                {...stylex.props(s.tab, isActive && s.tabActive, ui.focusRing)}
              >
                <span lang="en">{item.english}</span>
                <span
                  aria-hidden="true"
                  {...stylex.props(s.tabMark, isActive && s.tabMarkActive)}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
