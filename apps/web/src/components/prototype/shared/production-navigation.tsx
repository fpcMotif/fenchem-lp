import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight, ChevronDown, Menu, Pause, Play, X } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { EASE } from "../motion-constants";
import { useReducedMotion } from "../use-reduced-motion";
import {
  divisionForApplication,
  getIngredientsByApplication,
  ingredients,
  type Ingredient,
  type DivisionKey,
} from "@/components/landing/landing-content";
import { MENU_APPLICATIONS } from "./production-content";
type ProductionNavigationStyles = Record<
  | "portfolioMenuRoot"
  | "portfolioMenuBtn"
  | "portfolioChevron"
  | "portfolioChevronOpen"
  | "portfolioPopover"
  | "portfolioGrid"
  | "portfolioCol"
  | "portfolioColHeader"
  | "dotBase"
  | "portfolioItemList"
  | "portfolioItemLink"
  | "portfolioFooter"
  | "techLabel"
  | "portfolioFooterLink"
  | "mobileNavWrapper"
  | "mobileMenuBtn"
  | "mobileMenuPopover"
  | "mobileMenuList"
  | "mobileNavLink"
  | "mobileNavLinkLast"
  | "tickerSection"
  | "tickerFadeLeft"
  | "tickerFadeRight"
  | "tickerPauseBtn"
  | "tickerMarqueeTrack"
  | "tickerList"
  | "tickerItem"
  | "tickerText"
  | "tickerIndex"
  | "tickerDiamond"
  | "divisionBadge"
  | "dot_nutrition"
  | "dot_food"
  | "dot_cosmetics"
  | "dot_chem"
  | "dot_agro"
  | "dot_feed",
  StyleXStyles
>;
const DIVISION_DOT_KEYS: Record<DivisionKey, keyof ProductionNavigationStyles> = {
  nutrition: "dot_nutrition",
  food: "dot_food",
  cosmetics: "dot_cosmetics",
  chem: "dot_chem",
  agro: "dot_agro",
  feed: "dot_feed",
};
const MOBILE_NAV_LINKS = [
  {
    label: "Industries",
    href: "#industries",
  },
  {
    label: "Portfolio",
    href: "#matrix",
  },
  {
    label: "Formulation",
    href: "#formulation",
  },
  {
    label: "Standards",
    href: "#standards",
  },
];
export function PortfolioMenu({ styles }: { styles: ProductionNavigationStyles }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  return (
    <div
      ref={rootRef}
      {...stylex.props(styles.portfolioMenuRoot)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="portfolio-menu"
        onClick={() => setOpen((v) => !v)}
        {...stylex.props(styles.portfolioMenuBtn)}
      >
        Portfolio
        <ChevronDown
          aria-hidden
          {...stylex.props(styles.portfolioChevron, open && styles.portfolioChevronOpen)}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="portfolio-menu"
            initial={
              reduce
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: -6,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={
              reduce
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: -4,
                  }
            }
            transition={{
              duration: reduce ? 0 : 0.22,
              ease: EASE,
            }}
            style={{
              x: "-50%",
            }}
            {...stylex.props(styles.portfolioPopover)}
          >
            <div {...stylex.props(styles.portfolioGrid)}>
              {MENU_APPLICATIONS.map((application) => {
                const items = getIngredientsByApplication(application).slice(0, 4);
                const division = divisionForApplication(application);
                return (
                  <div key={application} {...stylex.props(styles.portfolioCol)}>
                    <p {...stylex.props(styles.portfolioColHeader)}>
                      <span
                        aria-hidden
                        {...stylex.props(styles.dotBase, styles[DIVISION_DOT_KEYS[division]])}
                      />
                      {application}
                    </p>
                    <ul {...stylex.props(styles.portfolioItemList)}>
                      {items.map((item) => (
                        <li key={item.code}>
                          <a
                            href="#matrix"
                            onClick={() => setOpen(false)}
                            {...stylex.props(styles.portfolioItemLink)}
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div {...stylex.props(styles.portfolioFooter)}>
              <span {...stylex.props(styles.techLabel)}>{ingredients.length} active compounds</span>
              <a
                href="#formulation"
                onClick={() => setOpen(false)}
                {...stylex.props(styles.portfolioFooterLink)}
              >
                Build a formulation
                <ArrowRight aria-hidden size={14} />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export function MobileNav({ styles }: { styles: ProductionNavigationStyles }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  return (
    <div {...stylex.props(styles.mobileNavWrapper)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        {...stylex.props(styles.mobileMenuBtn)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <m.span
            key={open ? "close" : "open"}
            initial={{
              opacity: 0,
              scale: 0.25,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.25,
              filter: "blur(4px)",
            }}
            transition={
              reduce
                ? {
                    duration: 0,
                  }
                : {
                    type: "spring",
                    duration: 0.3,
                    bounce: 0,
                  }
            }
            style={{
              display: "inline-flex",
            }}
          >
            {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
          </m.span>
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={
              reduce
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: -6,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={
              reduce
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: -4,
                  }
            }
            transition={{
              duration: reduce ? 0 : 0.22,
              ease: EASE,
            }}
            {...stylex.props(styles.mobileMenuPopover)}
          >
            <ul {...stylex.props(styles.mobileMenuList)}>
              {MOBILE_NAV_LINKS.map((link, idx) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    {...stylex.props(
                      styles.mobileNavLink,
                      idx === MOBILE_NAV_LINKS.length - 1 && styles.mobileNavLinkLast,
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export function TickerSection({ styles }: { styles: ProductionNavigationStyles }) {
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  return (
    <section aria-label="Ingredient index ticker" {...stylex.props(styles.tickerSection)}>
      <span aria-hidden {...stylex.props(styles.tickerFadeLeft)} />
      <span aria-hidden {...stylex.props(styles.tickerFadeRight)} />
      <button
        type="button"
        aria-pressed={paused}
        aria-label={paused ? "Resume ingredient ticker" : "Pause ingredient ticker"}
        onClick={() => setPaused((v) => !v)}
        {...stylex.props(styles.tickerPauseBtn)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <m.span
            key={paused ? "play" : "pause"}
            initial={{
              opacity: 0,
              scale: 0.25,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.25,
              filter: "blur(4px)",
            }}
            transition={
              reduce
                ? {
                    duration: 0,
                  }
                : {
                    type: "spring",
                    duration: 0.3,
                    bounce: 0,
                  }
            }
            style={{
              display: "inline-flex",
            }}
          >
            {paused ? (
              <Play
                aria-hidden
                size={14}
                style={{
                  marginLeft: 1,
                }}
              />
            ) : (
              <Pause aria-hidden size={14} />
            )}
          </m.span>
        </AnimatePresence>
      </button>
      <div
        style={
          paused
            ? {
                animationPlayState: "paused",
              }
            : undefined
        }
        {...stylex.props(styles.tickerMarqueeTrack)}
      >
        {([0, 1] as const).map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} {...stylex.props(styles.tickerList)}>
            {ingredients.map((ingredient, i) => (
              <li key={ingredient.name} {...stylex.props(styles.tickerItem)}>
                <span {...stylex.props(styles.tickerText)}>
                  <span {...stylex.props(styles.tickerIndex)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {" — "}
                  {ingredient.name}
                </span>
                <span aria-hidden {...stylex.props(styles.tickerDiamond)} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
export function DivisionBadge({
  styles,
  ingredient,
}: {
  styles: ProductionNavigationStyles;
  ingredient: Ingredient;
}) {
  const division = divisionForApplication(ingredient.application);
  return (
    <span {...stylex.props(styles.divisionBadge)}>
      <span aria-hidden {...stylex.props(styles.dotBase, styles[DIVISION_DOT_KEYS[division]])} />
      {ingredient.application}
    </span>
  );
}
