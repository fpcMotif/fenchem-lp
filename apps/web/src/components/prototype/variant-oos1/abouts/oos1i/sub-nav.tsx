import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_HERO } from "../../about-data";
import { useActiveSection } from "../../use-active-section";
import { base } from "./primitives-values";
import { ease, font, layout, tone } from "./shear.stylex";

const ENGLISH: Record<string, string> = {
  "about-profile": "Profile",
  "about-campus": "Campus",
  "about-culture": "Culture",
  "about-csr": "Responsibility",
  "about-honor": "Honors",
  "about-structure": "Structure",
  "about-products": "Products",
};

const LINKS = [
  ...ABOUT_HERO.navChips,
  { english: "Products and applications", id: "about-products" },
] as const;
const SECTION_IDS = LINKS.map((link) => link.id);

const S = stylex.create({
  bar: {
    position: "sticky",
    top: layout.header,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    backdropFilter: "blur(16px)",
    boxShadow: `0 1px 0 0 ${tone.rule}`,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    height: 56,
  },
  crumbs: {
    display: { default: "none", [breakpoints.lg]: "flex" },
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: tone.body,
  },
  crumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    letterSpacing: "inherit",
    color: { default: tone.body, ":hover": tone.ink },
    cursor: "pointer",
  },
  crumbSlash: {
    fontStyle: "italic",
    color: tone.body,
  },
  tabs: {
    display: "flex",
    alignItems: "center",
    justifyContent: { default: "flex-start", [breakpoints.lg]: "flex-end" },
    gap: { default: 22, [breakpoints.lg]: 30 },
    flexGrow: 1,
    minWidth: 0,
    paddingBlock: 8,
    paddingInline: 6,
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  tab: {
    position: "relative",
    display: "inline-block",
    flexShrink: 0,
    paddingBlock: 6,
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: { default: tone.body, ":hover": tone.ink },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
  },
  tabActive: {
    color: tone.ink,
  },
  tick: {
    position: "absolute",
    left: 0,
    bottom: -2,
    width: 24,
    height: 2,
    backgroundColor: tone.ink,
    rotate: "-7deg",
    transformOrigin: "0% 100%",
    transform: "scaleX(0)",
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "260ms" },
    transitionTimingFunction: ease.out,
  },
  tickActive: {
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
    <div {...stylex.props(S.bar)}>
      <div {...stylex.props(base.shell, base.inset, S.inner)}>
        <nav aria-label="Breadcrumb" {...stylex.props(S.crumbs)}>
          <button
            type="button"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(S.crumbLink, base.focusRing)}
          >
            首页
          </button>
          <span aria-hidden="true" {...stylex.props(S.crumbSlash)}>
            /
          </span>
          <span aria-current="page">关于我们</span>
        </nav>
        <nav aria-label="On this page" ref={tabsRef} {...stylex.props(S.tabs)}>
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "location" : undefined}
              {...stylex.props(S.tab, active === link.id && S.tabActive, base.focusRing)}
            >
              <span lang="en">{ENGLISH[link.id]}</span>
              <span
                aria-hidden="true"
                {...stylex.props(S.tick, active === link.id && S.tickActive)}
              />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
