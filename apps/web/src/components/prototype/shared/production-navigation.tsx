import { createEffect, createSignal, Show } from "solid-js";
import { AnimatePresence, m } from "@/compat/motion";
import { ArrowRight, ChevronDown, Menu, Pause, Play, X } from "@fenchem-lp/ui/components/lucide";
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
export function PortfolioMenu(props: { styles: ProductionNavigationStyles }) {
  const styles = props.styles;
  const [open, setOpen] = createSignal(false);
  const reduce = useReducedMotion();
  let root!: HTMLDivElement;
  let button!: HTMLButtonElement;
  createEffect(open, (isOpen) => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  });
  return (
    <div
      ref={root}
      {...stylex.attrs(styles.portfolioMenuRoot)}
      onFocusOut={(event) => {
        if (!root.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open() ? "true" : "false"}
        aria-controls="portfolio-menu"
        onClick={() => setOpen((v) => !v)}
        {...stylex.attrs(styles.portfolioMenuBtn)}
      >
        Portfolio
        <ChevronDown
          aria-hidden="true"
          {...stylex.attrs(styles.portfolioChevron, open() && styles.portfolioChevronOpen)}
        />
      </button>

      <AnimatePresence>
        <Show when={open()}>
          <m.div
            id="portfolio-menu"
            initial={
              reduce()
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
              reduce()
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: -4,
                  }
            }
            transition={{
              duration: reduce() ? 0 : 0.22,
              ease: EASE,
            }}
            {...stylex.attrs(styles.portfolioPopover)}
            style={{
              x: "-50%",
            }}
          >
            <div {...stylex.attrs(styles.portfolioGrid)}>
              {MENU_APPLICATIONS.map((application) => {
                const items = getIngredientsByApplication(application).slice(0, 4);
                const division = divisionForApplication(application);
                return (
                  <div {...stylex.attrs(styles.portfolioCol)}>
                    <p {...stylex.attrs(styles.portfolioColHeader)}>
                      <span
                        aria-hidden="true"
                        {...stylex.attrs(styles.dotBase, styles[DIVISION_DOT_KEYS[division]])}
                      />
                      {application}
                    </p>
                    <ul {...stylex.attrs(styles.portfolioItemList)}>
                      {items.map((item) => (
                        <li>
                          <a
                            href="#matrix"
                            onClick={() => setOpen(false)}
                            {...stylex.attrs(styles.portfolioItemLink)}
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
            <div {...stylex.attrs(styles.portfolioFooter)}>
              <span {...stylex.attrs(styles.techLabel)}>{ingredients.length} active compounds</span>
              <a
                href="#formulation"
                onClick={() => setOpen(false)}
                {...stylex.attrs(styles.portfolioFooterLink)}
              >
                Build a formulation
                <ArrowRight aria-hidden="true" size={14} />
              </a>
            </div>
          </m.div>
        </Show>
      </AnimatePresence>
    </div>
  );
}
export function MobileNav(props: { styles: ProductionNavigationStyles }) {
  const styles = props.styles;
  const [open, setOpen] = createSignal(false);
  const reduce = useReducedMotion();
  return (
    <div {...stylex.attrs(styles.mobileNavWrapper)}>
      <button
        type="button"
        aria-expanded={open() ? "true" : "false"}
        aria-controls="mobile-menu"
        aria-label={open() ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        {...stylex.attrs(styles.mobileMenuBtn)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <Show when={open() ? "close" : "open"} keyed>
            {(icon) => (
              <m.span
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
                  reduce()
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
                {icon === "close" ? (
                  <X aria-hidden="true" size={20} />
                ) : (
                  <Menu aria-hidden="true" size={20} />
                )}
              </m.span>
            )}
          </Show>
        </AnimatePresence>
      </button>
      <AnimatePresence>
        <Show when={open()}>
          <m.div
            id="mobile-menu"
            initial={
              reduce()
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
              reduce()
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: -4,
                  }
            }
            transition={{
              duration: reduce() ? 0 : 0.22,
              ease: EASE,
            }}
            {...stylex.attrs(styles.mobileMenuPopover)}
          >
            <ul {...stylex.attrs(styles.mobileMenuList)}>
              {MOBILE_NAV_LINKS.map((link, idx) => (
                <li>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    {...stylex.attrs(
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
        </Show>
      </AnimatePresence>
    </div>
  );
}
export function TickerSection(props: { styles: ProductionNavigationStyles }) {
  const styles = props.styles;
  const [paused, setPaused] = createSignal(false);
  const reduce = useReducedMotion();
  return (
    <section aria-label="Ingredient index ticker" {...stylex.attrs(styles.tickerSection)}>
      <span aria-hidden="true" {...stylex.attrs(styles.tickerFadeLeft)} />
      <span aria-hidden="true" {...stylex.attrs(styles.tickerFadeRight)} />
      <button
        type="button"
        aria-pressed={paused() ? "true" : "false"}
        aria-label={paused() ? "Resume ingredient ticker" : "Pause ingredient ticker"}
        onClick={() => setPaused((v) => !v)}
        {...stylex.attrs(styles.tickerPauseBtn)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <Show when={paused() ? "play" : "pause"} keyed>
            {(icon) => (
              <m.span
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
                  reduce()
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
                {icon === "play" ? (
                  <Play
                    aria-hidden="true"
                    size={14}
                    style={{
                      "margin-left": "1px",
                    }}
                  />
                ) : (
                  <Pause aria-hidden="true" size={14} />
                )}
              </m.span>
            )}
          </Show>
        </AnimatePresence>
      </button>
      <div
        {...stylex.attrs(styles.tickerMarqueeTrack)}
        style={
          paused()
            ? {
                "animation-play-state": "paused",
              }
            : undefined
        }
      >
        {([0, 1] as const).map((copy) => (
          <ul aria-hidden={copy === 1 ? "true" : undefined} {...stylex.attrs(styles.tickerList)}>
            {ingredients.map((ingredient, i) => (
              <li {...stylex.attrs(styles.tickerItem)}>
                <span {...stylex.attrs(styles.tickerText)}>
                  <span {...stylex.attrs(styles.tickerIndex)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {" — "}
                  {ingredient.name}
                </span>
                <span aria-hidden="true" {...stylex.attrs(styles.tickerDiamond)} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
export function DivisionBadge(props: {
  styles: ProductionNavigationStyles;
  ingredient: Ingredient;
}) {
  const division = () => divisionForApplication(props.ingredient.application);
  return (
    <span {...stylex.attrs(props.styles.divisionBadge)}>
      <span
        aria-hidden="true"
        {...stylex.attrs(props.styles.dotBase, props.styles[DIVISION_DOT_KEYS[division()]])}
      />
      {props.ingredient.application}
    </span>
  );
}
