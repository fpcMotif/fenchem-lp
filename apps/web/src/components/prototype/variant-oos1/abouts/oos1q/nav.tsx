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

export function Nav(props: { onNavigateHome: (hash?: string) => void }) {
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
          left: tabBox.left - listBox.left,
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
                {...stylex.attrs(s.tab, isActive() && s.tabActive, ui.focusRing, s.tabFocus)}
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
