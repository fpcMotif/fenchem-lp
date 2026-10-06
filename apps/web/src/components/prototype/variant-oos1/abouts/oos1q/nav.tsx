import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { useActiveSection } from "../../use-active-section";
import { NAV_ITEMS, SECTION_IDS, ui } from "./shared";
import { font, motionCss, step, tone } from "./tokens.stylex";

const s = stylex.create({
  bar: {
    position: "sticky",
    top: 80,
    zIndex: 1,
    backgroundColor: tone.paperVeil,
    backdropFilter: "blur(14px)",
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
    letterSpacing: "0.06em",
    color: tone.quiet,
  },
  crumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: "inherit",
    fontWeight: 400,
    letterSpacing: "inherit",
    color: { default: tone.quiet, ":hover": tone.ink },
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
    maskImage: {
      default:
        "linear-gradient(to right, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%)",
      [breakpoints.lg]: "none",
    },
  },
  tab: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    paddingInline: { default: 12, [breakpoints.xl]: 18 },
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: { default: tone.quiet, ":hover": tone.ink },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: motionCss.out,
  },
  tabActive: {
    color: tone.ink,
  },
  tabFocus: {
    outlineOffset: -4,
  },
  tabMark: {
    position: "absolute",
    bottom: 9,
    left: "calc(50% - 8px)",
    width: 16,
    height: 1,
    backgroundColor: tone.ink,
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "240ms",
    transitionTimingFunction: motionCss.out,
  },
  tabMarkActive: {
    opacity: 1,
  },
});

export function Nav({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
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
        left: tabBox.left - listBox.left,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  }, [active, reduce]);

  return (
    <div {...stylex.props(s.bar)}>
      <div {...stylex.props(ui.shell, ui.inset, s.inner)}>
        <nav aria-label="面包屑导航" lang="en" {...stylex.props(s.crumb)}>
          <button
            type="button"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(s.crumbLink, ui.focusRing)}
          >
            Home
            <span lang="zh-CN" {...stylex.props(ui.srOnly)}>
              {" "}
              首页
            </span>
          </button>
          <span aria-hidden="true" {...stylex.props(s.crumbSep)}>
            /
          </span>
          <span aria-current="page" {...stylex.props(s.crumbCurrent)}>
            About
            <span lang="zh-CN" {...stylex.props(ui.srOnly)}>
              {" "}
              关于我们
            </span>
          </span>
        </nav>
        <nav aria-label="本页导航" ref={tabsRef} {...stylex.props(s.tabs)}>
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                {...stylex.props(s.tab, isActive && s.tabActive, ui.focusRing, s.tabFocus)}
              >
                <span lang="en">{item.english}</span>
                <span {...stylex.props(ui.srOnly)}> {item.label}</span>
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
