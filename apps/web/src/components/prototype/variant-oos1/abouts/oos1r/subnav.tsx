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
    backgroundColor: tone.pageGlass,
    backdropFilter: "blur(14px)",
    boxShadow: `0 1px 0 0 ${tone.hairline}`,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    height: 56,
  },
  crumb: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: tone.body,
  },
  crumbLink: {
    minHeight: 44,
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
  crumbWide: {
    display: { default: "none", [breakpoints.lg]: "inline" },
  },
  tabs: {
    display: "flex",
    alignItems: "center",
    justifyContent: { default: "flex-start", [breakpoints.lg]: "flex-end" },
    flexGrow: 1,
    minWidth: 0,
    height: "100%",
    marginInline: -8,
    paddingInline: 8,
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  tab: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: 44,
    paddingInline: { default: 12, [breakpoints.xl]: 16 },
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: { default: tone.body, ":hover": tone.ink },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: motionCss.out,
  },
  tabActive: {
    color: tone.ink,
  },
  tick: {
    position: "absolute",
    top: "50%",
    left: { default: 3, [breakpoints.xl]: 6 },
    width: 3,
    height: 3,
    marginTop: -1.5,
    borderRadius: "50%",
    backgroundColor: tone.ink,
    opacity: 0,
    transform: "scale(0.4)",
    transitionProperty: "opacity, transform",
    transitionDuration: "240ms",
    transitionTimingFunction: motionCss.out,
  },
  tickActive: {
    opacity: 1,
    transform: "none",
  },
});

export function SubNav({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const active = useActiveSection(SECTION_IDS);
  const tabsRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const list = tabsRef.current;
    if (!list) return;
    if (!active) {
      list.scrollTo({ left: 0, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    const tab = list.querySelector<HTMLElement>(`[href="#${active}"]`);
    if (!tab) return;
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
          <span aria-hidden="true" {...stylex.props(s.crumbWide)}>
            /
          </span>
          <span aria-current="page" {...stylex.props(s.crumbWide)}>
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
                <span aria-hidden="true" {...stylex.props(s.tick, isActive && s.tickActive)} />
                <span lang="en">{item.english}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
