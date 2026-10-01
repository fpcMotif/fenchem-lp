import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_HERO } from "../../about-data";
import { useActiveSection } from "../../use-active-section";
import { s } from "./shared";
import { fonts, layout, media, palette } from "./tokens.stylex";

export const SECTION_IDS = ABOUT_HERO.navChips.map((chip) => chip.id);

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
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    backdropFilter: "blur(16px)",
    boxShadow: `0 1px 0 0 ${palette.hairline}`,
  },
  list: {
    display: "flex",
    justifyContent: { default: "flex-start", [breakpoints.md]: "center" },
    height: 52,
    margin: 0,
    padding: 0,
    overflowX: "auto",
    listStyle: "none",
    scrollbarWidth: "none",
  },
  link: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingInline: { default: 14, [breakpoints.lg]: 28 },
    fontFamily: fonts.cjk,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: { default: palette.quiet, ":hover": palette.ink },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: layout.ease,
  },
  linkActive: {
    color: palette.ink,
  },
  marker: {
    position: "absolute",
    bottom: 0,
    insetInline: { default: 14, [breakpoints.lg]: 28 },
    height: 1,
    backgroundColor: palette.ink,
    transform: "scaleX(0)",
    transformOrigin: "center",
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [media.motion]: "500ms" },
    transitionTimingFunction: layout.ease,
  },
  markerActive: {
    transform: "scaleX(1)",
  },
});

export function SubNav() {
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
    <nav aria-label="本页导航" {...stylex.props(styles.bar)}>
      <div {...stylex.props(s.shell)}>
        <ul ref={listRef} {...stylex.props(styles.list)}>
          {ABOUT_HERO.navChips.map((chip) => {
            const isActive = active === chip.id;
            return (
              <li key={chip.id}>
                <a
                  href={`#${chip.id}`}
                  aria-label={chip.label}
                  aria-current={isActive ? "location" : undefined}
                  {...stylex.props(styles.link, isActive && styles.linkActive, s.focusRing)}
                >
                  <span lang="en">{ENGLISH_LABELS[chip.id]}</span>
                  <span
                    aria-hidden="true"
                    {...stylex.props(styles.marker, isActive && styles.markerActive)}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
