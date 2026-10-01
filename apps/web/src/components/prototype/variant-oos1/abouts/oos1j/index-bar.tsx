import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_HERO } from "../../about-data";
import { useActiveSection } from "../../use-active-section";
import { base, ty } from "./shared";
import { hue, size } from "./theme.stylex";

export const SECTION_IDS = ABOUT_HERO.navChips.map((chip) => chip.id);

const NAV_LABELS: Record<(typeof ABOUT_HERO.navChips)[number]["id"], string> = {
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
    top: size.header,
    zIndex: 1,
    backgroundColor: hue.barSurface,
    backdropFilter: "blur(14px)",
    boxShadow: `0 1px 0 0 ${hue.hairline}`,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    height: size.bar,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    gap: 8,
    height: "100%",
    paddingInlineEnd: { default: 12, [breakpoints.lg]: 0 },
  },
  crumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    letterSpacing: "inherit",
    color: { default: hue.body, ":hover": hue.ink },
    cursor: "pointer",
  },
  list: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: { default: "flex-start", [breakpoints.lg]: "flex-end" },
    flexGrow: 1,
    minWidth: 0,
    height: "100%",
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  link: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    paddingInline: { default: 12, [breakpoints.lg]: 18 },
    textDecoration: "none",
    whiteSpace: "nowrap",
    color: { default: hue.body, ":hover": hue.ink },
  },
  marker: {
    position: "absolute",
    left: { default: 12, [breakpoints.lg]: 18 },
    right: { default: 12, [breakpoints.lg]: 18 },
    bottom: 14,
    height: 1,
    backgroundColor: hue.ink,
    transformOrigin: "left center",
    transform: "scaleX(0)",
    transitionProperty: "transform",
    transitionDuration: "400ms",
    transitionTimingFunction: size.ease,
  },
  markerOn: {
    transform: "scaleX(1)",
  },
});

export function IndexBar({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const active = useActiveSection(SECTION_IDS);
  const listRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    const link = active ? list?.querySelector<HTMLElement>(`[href="#${active}"]`) : null;
    if (!list || !link) return;
    const listBox = list.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    if (linkBox.left < listBox.left || linkBox.right > listBox.right) {
      list.scrollBy({
        left: linkBox.left - listBox.left - 16,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  }, [active, reduce]);

  return (
    <div {...stylex.props(styles.bar)}>
      <div {...stylex.props(base.shell, styles.inner)}>
        <nav aria-label="面包屑导航" lang="en" {...stylex.props(ty.quiet, styles.breadcrumb)}>
          <button
            type="button"
            aria-label="首页"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(styles.crumbLink, base.focus)}
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span aria-current="page">About</span>
        </nav>
        <nav aria-label="本页导航" ref={listRef} {...stylex.props(styles.list)}>
          {ABOUT_HERO.navChips.map((chip) => (
            <a
              key={chip.id}
              href={`#${chip.id}`}
              aria-label={chip.label}
              aria-current={active === chip.id ? "location" : undefined}
              {...stylex.props(ty.quiet, styles.link, base.focus)}
            >
              <span lang="en">{NAV_LABELS[chip.id]}</span>
              <span
                aria-hidden="true"
                {...stylex.props(styles.marker, active === chip.id && styles.markerOn)}
              />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
