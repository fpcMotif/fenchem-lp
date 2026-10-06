import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_HERO } from "../../about-data";
import { base } from "./shared";
import { NAV_ENGLISH, SHEETS } from "./sheets";
import { color, font, media, metric } from "./tokens.stylex";

const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

const styles = stylex.create({
  rail: {
    position: "sticky",
    top: metric.header,
    zIndex: 1,
    height: metric.rail,
    backgroundColor: color.page,
  },
  frame: {
    boxSizing: "border-box",
    width: { default: "calc(100% - 32px)", [media.mdUp]: "calc(100% - 48px)" },
    maxWidth: metric.sheetMax,
    height: "100%",
    marginInline: "auto",
  },
  list: {
    display: "flex",
    alignItems: "center",
    gap: { default: 28, [media.lgUp]: 44 },
    boxSizing: "border-box",
    height: "100%",
    margin: 0,
    paddingBlock: 0,
    paddingInlineStart: { default: 4, [media.md]: 36, [media.lgUp]: 72 },
    paddingInlineEnd: 16,
    listStyle: "none",
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "none",
  },
  item: {
    flexShrink: 0,
  },
  link: {
    position: "relative",
    display: "block",
    paddingBlock: 8,
    fontFamily: font.cjk,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: { default: color.muted, ":hover": color.ink },
    textDecoration: "none",
    whiteSpace: "nowrap",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: EASE_OUT_CSS,
    "::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 2,
      width: "100%",
      height: 1,
      backgroundColor: color.ink,
      transform: "scaleX(0)",
      transformOrigin: "0% 50%",
      transitionProperty: "transform",
      transitionDuration: "400ms",
      transitionTimingFunction: EASE_OUT_CSS,
    },
  },
  linkActive: {
    color: color.ink,
    "::after": {
      transform: "scaleX(1)",
    },
  },
});

export function Rail({ reachedIndex }: { reachedIndex: number }) {
  const listRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const activeNav = SHEETS[reachedIndex]?.nav ?? null;

  useEffect(() => {
    const list = listRef.current;
    const link = activeNav ? list?.querySelector<HTMLElement>(`[href="#${activeNav}"]`) : null;
    if (!list || !link) return;
    const listBox = list.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    if (linkBox.left < listBox.left || linkBox.right > listBox.right) {
      list.scrollBy({
        left: linkBox.left - listBox.left - 16,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  }, [activeNav, reduce]);

  return (
    <nav aria-label="本页导航" {...stylex.props(styles.rail)}>
      <div {...stylex.props(styles.frame)}>
        <ul ref={listRef} {...stylex.props(styles.list)}>
          {ABOUT_HERO.navChips.map((chip) => (
            <li key={chip.id} {...stylex.props(styles.item)}>
              <a
                href={`#${chip.id}`}
                aria-current={activeNav === chip.id ? "location" : undefined}
                {...stylex.props(styles.link, activeNav === chip.id && styles.linkActive)}
              >
                <span lang="en">{NAV_ENGLISH[chip.id]}</span>
                <span {...stylex.props(base.srOnly)}> {chip.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
