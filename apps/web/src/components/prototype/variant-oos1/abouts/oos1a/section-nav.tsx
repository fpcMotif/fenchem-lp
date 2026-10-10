import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_HERO } from "../../about-data";
import { useActiveSection } from "../../use-active-section";
import { ease, fonts, palette } from "./lattice.stylex";
import { Frame } from "./parts";
import { shared } from "./parts-values";

type ChipId = (typeof ABOUT_HERO.navChips)[number]["id"];

const SECTION_IDS = ABOUT_HERO.navChips.map((chip) => chip.id);

const ENGLISH: Record<ChipId, string> = {
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
    backgroundColor: palette.glass,
    backdropFilter: "blur(14px)",
    boxShadow: `0 1px 0 0 ${palette.inkHair}`,
  },
  row: {
    display: { default: "flex", [breakpoints.lg]: "grid" },
    gridTemplateColumns: { default: null, [breakpoints.lg]: "repeat(16, minmax(0, 1fr))" },
    alignItems: "center",
    height: 52,
  },
  crumbs: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    gridColumn: { default: null, [breakpoints.lg]: "1 / span 4" },
    paddingInlineEnd: { default: 16, [breakpoints.lg]: 0 },
    fontFamily: fonts.cjk,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: palette.body,
  },
  crumbLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 2,
    height: 32,
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
  crumbCurrent: {
    display: { default: "none", [breakpoints.lg]: "inline" },
    marginInlineStart: 12,
    color: palette.ink,
  },
  list: {
    display: { default: "flex", [breakpoints.lg]: "grid" },
    gridTemplateColumns: { default: null, [breakpoints.lg]: "repeat(6, minmax(0, 1fr))" },
    gridColumn: { default: null, [breakpoints.lg]: "5 / span 12" },
    flexGrow: 1,
    minWidth: 0,
    height: "100%",
    margin: 0,
    padding: 0,
    listStyle: "none",
    overflowX: { default: "auto", [breakpoints.lg]: "visible" },
    scrollbarWidth: "none",
  },
  item: {
    display: "flex",
    flexShrink: 0,
  },
  link: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    width: "100%",
    height: 52,
    paddingInline: { default: 14, [breakpoints.lg]: 0 },
    fontFamily: fonts.cjk,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: { default: palette.body, ":hover": palette.ink },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
  },
  label: {
    position: "relative",
    display: "inline-block",
  },
  markInk: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -9,
    height: 1,
    backgroundColor: palette.ink,
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "260ms",
    transitionTimingFunction: ease.out,
  },
  markBlue: {
    position: "absolute",
    left: 4,
    right: -4,
    bottom: -12,
    height: 1,
    backgroundColor: colors.brandBlue700,
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "260ms",
    transitionTimingFunction: ease.out,
  },
  markOn: {
    opacity: 1,
  },
});

export function SectionNav({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const active = useActiveSection(SECTION_IDS);
  const listRef = useRef<HTMLUListElement>(null);
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
      <Frame>
        <div {...stylex.props(styles.row)}>
          <nav aria-label="Breadcrumb" {...stylex.props(styles.crumbs)}>
            <button
              type="button"
              onClick={() => onNavigateHome("top")}
              {...stylex.props(styles.crumbLink, shared.focusRing)}
            >
              <ChevronLeft size={14} aria-hidden="true" />
              <span lang="en">Home</span>
            </button>
            <span aria-current="page" {...stylex.props(styles.crumbCurrent)}>
              <span lang="en">About</span>
            </span>
          </nav>
          <ul ref={listRef} aria-label="On this page" {...stylex.props(styles.list)}>
            {ABOUT_HERO.navChips.map((chip) => {
              const on = active === chip.id;
              return (
                <li key={chip.id} {...stylex.props(styles.item)}>
                  <a
                    href={`#${chip.id}`}
                    aria-current={on ? "location" : undefined}
                    {...stylex.props(styles.link, shared.focusRing)}
                  >
                    <span lang="en" {...stylex.props(styles.label)}>
                      {ENGLISH[chip.id]}
                      <span
                        aria-hidden="true"
                        {...stylex.props(styles.markInk, on && styles.markOn)}
                      />
                      <span
                        aria-hidden="true"
                        {...stylex.props(styles.markBlue, on && styles.markOn)}
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Frame>
    </div>
  );
}
