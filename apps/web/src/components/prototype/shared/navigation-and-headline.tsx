import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ComponentType, ReactNode, Dispatch, SetStateAction } from "react";
import { Menu, Search, X, ArrowRight } from "lucide-react";
import { Collapse } from "./collapse";
import { EASE } from "../motion-constants";
import { createInquiryHref } from "@/components/landing/landing-content";
export function BloomHeadline({
  styles,
  OPENING_BEFORE,
  OPENING_AFTER,
  CLOSING_LEAD,
  CLOSING_WORD,
  HERO,
  introAfter,
}: {
  styles: {
    heroHeadline: StyleXStyles;
    heroLead: StyleXStyles;
    heroBloom: StyleXStyles;
    enterDelay: (delay: string) => StyleXStyles;
    heroAccent: StyleXStyles;
    heroBreakLine: StyleXStyles;
    heroBreak: StyleXStyles;
    heroBreakInk: StyleXStyles;
    heroBreakHead: StyleXStyles;
    heroBreakTail: StyleXStyles;
    heroPeriodSeat: StyleXStyles;
    heroPeriod: StyleXStyles;
    visuallyHidden: StyleXStyles;
  };
  OPENING_BEFORE: string;
  OPENING_AFTER: string;
  CLOSING_LEAD: string;
  CLOSING_WORD: string;
  HERO: { accent: string };
  introAfter: (delay: number) => string;
}) {
  return (
    <span lang="en" {...stylex.props(styles.heroHeadline)}>
      <span
        {...stylex.props(styles.heroLead, styles.heroBloom, styles.enterDelay(introAfter(300)))}
      >
        {OPENING_BEFORE}
        <span {...stylex.props(styles.heroAccent)}>{HERO.accent}</span>
        {OPENING_AFTER}
      </span>{" "}
      <span
        {...stylex.props(styles.heroLead, styles.heroBloom, styles.enterDelay(introAfter(400)))}
      >
        {CLOSING_LEAD}
      </span>{" "}
      <span {...stylex.props(styles.heroBreakLine)}>
        <span
          {...stylex.props(styles.heroBreak, styles.heroBloom, styles.enterDelay(introAfter(500)))}
        >
          <span {...stylex.props(styles.heroBreakInk, styles.heroBreakHead)}>{CLOSING_WORD}</span>
          <span aria-hidden="true" {...stylex.props(styles.heroBreakInk, styles.heroBreakTail)}>
            {CLOSING_WORD}
          </span>
        </span>
        <span aria-hidden="true" {...stylex.props(styles.heroPeriodSeat)}>
          <span {...stylex.props(styles.heroPeriod)} />
        </span>
        <span {...stylex.props(styles.visuallyHidden)}>.</span>
      </span>
    </span>
  );
}
export function CorporateHeaderActions({
  styles,
  menuOpen,
  menuId,
  setMenuOpen,
}: {
  styles: {
    headerActions: StyleXStyles;
    searchPill: StyleXStyles;
    searchPlaceholder: StyleXStyles;
    langButton: StyleXStyles;
    menuButton: StyleXStyles;
  };
  menuOpen: boolean;
  menuId: string;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div {...stylex.props(styles.headerActions)}>
      <button type="button" {...stylex.props(styles.searchPill)}>
        <Search size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
        <span {...stylex.props(styles.searchPlaceholder)}>AI 搜索</span>
      </button>
      <button type="button" aria-label="CN，切换语言" {...stylex.props(styles.langButton)}>
        CN
      </button>
      <button
        type="button"
        aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => setMenuOpen((open) => !open)}
        {...stylex.props(styles.menuButton)}
      >
        {menuOpen ? (
          <X size={24} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
        ) : (
          <Menu size={24} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
export function CampusStatistic({
  styles,
  index,
  stat,
  RiseReveal,
  Odometer,
  riseDelay,
  STAT_STAGGER,
}: {
  styles: {
    statDivider: StyleXStyles;
    stat: StyleXStyles;
    statText: StyleXStyles;
    statFigure: StyleXStyles;
    statUnit: StyleXStyles;
    visuallyHidden: StyleXStyles;
  };
  index: number;
  stat: { label: string; value: string; unit: string | null; caption: string };
  RiseReveal: ComponentType<{ children: ReactNode; delay?: number; sx?: StyleXStyles }>;
  Odometer: ComponentType<{ value: string; offset: number }>;
  riseDelay: (index: number) => number;
  STAT_STAGGER: number;
}) {
  return (
    <>
      {index > 0 ? <span aria-hidden="true" {...stylex.props(styles.statDivider)} /> : null}
      <RiseReveal delay={riseDelay(index)} sx={styles.stat}>
        <p {...stylex.props(styles.statText)}>{stat.label}</p>
        <p {...stylex.props(styles.statFigure)}>
          <Odometer value={stat.value} offset={index * STAT_STAGGER} />
          {stat.unit ? (
            <span aria-hidden="true" {...stylex.props(styles.statUnit)}>
              {stat.unit}
            </span>
          ) : null}
          <span {...stylex.props(styles.visuallyHidden)}>
            {stat.value}
            {stat.unit ?? ""}
          </span>
        </p>
        <p {...stylex.props(styles.statText)}>{stat.caption}</p>
      </RiseReveal>
    </>
  );
}
export function SpecificationMobileMenu({
  styles,
  panelId,
  open,
  reduce,
  links,
  setOpen,
}: {
  styles: {
    mobilePanel: StyleXStyles;
    container: StyleXStyles;
    mobileList: StyleXStyles;
    mobileLink: StyleXStyles;
    ctaPrimary: StyleXStyles;
  };
  panelId: string;
  open: boolean;
  reduce: boolean;
  links: readonly { href: string; label: string }[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Collapse
      id={panelId}
      open={open}

      transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}
      {...stylex.props(styles.mobilePanel)}
    >
      <div {...stylex.props(styles.container)}>
        <ul {...stylex.props(styles.mobileList)}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                {...stylex.props(styles.mobileLink)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={createInquiryHref("contact")}
              onClick={() => setOpen(false)}
              {...stylex.props(styles.ctaPrimary)}
            >
              Request a specification
              <ArrowRight aria-hidden size={14} />
            </a>
          </li>
        </ul>
      </div>
    </Collapse>
  );
}
