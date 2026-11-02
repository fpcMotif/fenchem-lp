import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { For, type Component, type JSX, type Setter } from "solid-js";
import { Menu, Search, X, ArrowRight } from "lucide-solid";
import { Collapse } from "./collapse";
import { EASE } from "../motion-constants";
import { createInquiryHref } from "../../landing/landing-content";
export function BloomHeadline(props: {
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
    <span lang="en" {...stylex.props(props.styles.heroHeadline)}>
      <span
        {...stylex.props(props.styles.heroLead, props.styles.heroBloom, props.styles.enterDelay(props.introAfter(300)))}
      >
        {props.OPENING_BEFORE}
        <span {...stylex.props(props.styles.heroAccent)}>{props.HERO.accent}</span>
        {props.OPENING_AFTER}
      </span>{" "}
      <span
        {...stylex.props(props.styles.heroLead, props.styles.heroBloom, props.styles.enterDelay(props.introAfter(400)))}
      >
        {props.CLOSING_LEAD}
      </span>{" "}
      <span {...stylex.props(props.styles.heroBreakLine)}>
        <span
          {...stylex.props(props.styles.heroBreak, props.styles.heroBloom, props.styles.enterDelay(props.introAfter(500)))}
        >
          <span {...stylex.props(props.styles.heroBreakInk, props.styles.heroBreakHead)}>{props.CLOSING_WORD}</span>
          <span aria-hidden="true" {...stylex.props(props.styles.heroBreakInk, props.styles.heroBreakTail)}>
            {props.CLOSING_WORD}
          </span>
        </span>
        <span aria-hidden="true" {...stylex.props(props.styles.heroPeriodSeat)}>
          <span {...stylex.props(props.styles.heroPeriod)} />
        </span>
        <span {...stylex.props(props.styles.visuallyHidden)}>.</span>
      </span>
    </span>
  );
}
export function CorporateHeaderActions(props: {
  styles: {
    headerActions: StyleXStyles;
    searchPill: StyleXStyles;
    searchPlaceholder: StyleXStyles;
    langButton: StyleXStyles;
    menuButton: StyleXStyles;
  };
  menuOpen: boolean;
  menuId: string;
  setMenuOpen: Setter<boolean>;
}) {
  return (
    <div {...stylex.props(props.styles.headerActions)}>
      <button type="button" {...stylex.props(props.styles.searchPill)}>
        <Search size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
        <span {...stylex.props(props.styles.searchPlaceholder)}>AI 搜索</span>
      </button>
      <button type="button" aria-label="CN, switch language" {...stylex.props(props.styles.langButton)}>
        CN
      </button>
      <button
        type="button"
        aria-label={props.menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={props.menuOpen}
        aria-controls={props.menuId}
        onClick={() => props.setMenuOpen((open) => !open)}
        {...stylex.props(props.styles.menuButton)}
      >
        {props.menuOpen ? (
          <X size={24} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
        ) : (
          <Menu size={24} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
export function CampusStatistic(props: {
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
  RiseReveal: Component<{ children: JSX.Element; delay?: number; sx?: StyleXStyles }>;
  Odometer: Component<{ value: string; offset: number }>;
  riseDelay: (index: number) => number;
  STAT_STAGGER: number;
}) {
  return (
    <>
      {props.index > 0 ? <span aria-hidden="true" {...stylex.props(props.styles.statDivider)} /> : null}
      <props.RiseReveal delay={props.riseDelay(props.index)} sx={props.styles.stat}>
        <p {...stylex.props(props.styles.statText)}>{props.stat.label}</p>
        <p {...stylex.props(props.styles.statFigure)}>
          <props.Odometer value={props.stat.value} offset={props.index * props.STAT_STAGGER} />
          {props.stat.unit ? (
            <span aria-hidden="true" {...stylex.props(props.styles.statUnit)}>
              {props.stat.unit}
            </span>
          ) : null}
          <span {...stylex.props(props.styles.visuallyHidden)}>
            {props.stat.value}
            {props.stat.unit ?? ""}
          </span>
        </p>
        <p {...stylex.props(props.styles.statText)}>{props.stat.caption}</p>
      </props.RiseReveal>
    </>
  );
}
export function SpecificationMobileMenu(props: {
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
  setOpen: Setter<boolean>;
}) {
  return (
    <Collapse
      id={props.panelId}
      open={props.open}

      transition={{ duration: props.reduce ? 0 : 0.36, ease: EASE }}
      {...stylex.props(props.styles.mobilePanel)}
    >
      <div {...stylex.props(props.styles.container)}>
        <ul {...stylex.props(props.styles.mobileList)}>
          <For each={props.links}>
            {(link) => (
              <li>
                <a
                  href={link.href}
                  onClick={() => props.setOpen(false)}
                  {...stylex.props(props.styles.mobileLink)}
                >
                  {link.label}
                </a>
              </li>
            )}
          </For>
          <li>
            <a
              href={createInquiryHref("contact")}
              onClick={() => props.setOpen(false)}
              {...stylex.props(props.styles.ctaPrimary)}
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
