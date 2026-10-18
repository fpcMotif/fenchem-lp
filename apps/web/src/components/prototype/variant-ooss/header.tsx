import * as stylex from "@stylexjs/stylex";
import { Menu, Search, X } from "@fenchem-lp/ui/components/lucide";
import { AnimatePresence, m } from "@/compat/motion";
import { createSignal, createUniqueId, onSettled, Show, type Accessor } from "solid-js";
import type { JSX } from "@solidjs/web";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { LOGO_PATHS } from "../variant-o/vectors";
import { NAV_ITEMS, SECTION_IDS } from "./content";
import { EASE_OUT } from "./motion-values";
import { color, ease, font, layout as layoutTokens, media } from "./tokens.stylex";
import { layout } from "./ui-values";

const SPY_LINE = 0.4;
const SOLID_PROGRESS = 0.02;
const HEADER_HEIGHT_PX = 80;
const NAV_IDS: readonly string[] = NAV_ITEMS.map((item) => item.href.slice(1));

type HeaderState = { solid: boolean; activeId: string | null };

function readSolid(): boolean {
  const hero = document.getElementById("top");
  if (!hero) return true;
  const rect = hero.getBoundingClientRect();
  const travel = rect.height - window.innerHeight;
  if (travel > 1) return -rect.top / travel > SOLID_PROGRESS;
  const photo = hero.querySelector("[data-hero-photo]");
  return (photo ?? hero).getBoundingClientRect().bottom <= HEADER_HEIGHT_PX;
}

function readActiveId(): string | null {
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  let current: string | null = null;
  for (const id of SECTION_IDS) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= window.innerHeight * SPY_LINE) {
      current = id;
    }
  }
  if (atBottom) current = SECTION_IDS[SECTION_IDS.length - 1] ?? current;
  return current && NAV_IDS.includes(current) ? current : null;
}

function useHeaderState(): Accessor<HeaderState> {
  const [state, setState] = createSignal<HeaderState>({ solid: false, activeId: "top" });
  onSettled(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const solid = readSolid();
      const activeId = readActiveId();
      setState((previous) =>
        previous.solid === solid && previous.activeId === activeId ? previous : { solid, activeId },
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  });
  return state;
}

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const SWITCH_MS = "180ms";
const SWITCH_PROPERTIES = "background-color, border-bottom-color, color";

const styles = stylex.create({
  header: {
    position: "fixed",
    top: 0,
    insetInline: 0,
    zIndex: 20,
    boxSizing: "border-box",
    height: layoutTokens.headerHeight,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    transitionProperty: SWITCH_PROPERTIES,
    transitionTimingFunction: "ease",
  },
  headerHero: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    color: color.paper,
    transitionDuration: { default: `${SWITCH_MS}, ${SWITCH_MS}, 0ms`, [media.motionReduce]: "0ms" },
    transitionDelay: { default: `0ms, 0ms, ${SWITCH_MS}`, [media.motionReduce]: "0ms" },
  },
  headerSolid: {
    backgroundColor: color.paper,
    borderBottomColor: color.headerRule,
    color: color.ink,
    transitionDuration: { default: `${SWITCH_MS}, ${SWITCH_MS}, 0ms`, [media.motionReduce]: "0ms" },
    transitionDelay: "0ms",
  },
  inner: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    opacity: { default: 0, [media.motionReduce]: 1 },
  },
  innerIn: {
    animationName: { default: fadeIn, [media.motionReduce]: "none" },
    animationDuration: "400ms",
    animationDelay: "700ms",
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  logoLink: {
    display: "block",
    width: 161,
    height: 52,
    flexShrink: 0,
    color: "inherit",
  },
  logo: {
    display: "block",
    width: 161,
    height: 52,
  },
  logoPathHero: {
    fill: "currentColor",
    transitionProperty: "fill",
    transitionDuration: "0ms",
    transitionDelay: { default: SWITCH_MS, [media.motionReduce]: "0ms" },
  },
  logoPathSolid: {
    transitionProperty: "fill",
    transitionDuration: "0ms",
    transitionDelay: "0ms",
  },
  nav: {
    display: { default: "none", [media.desktop]: "flex" },
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  navLink: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: 40,
    paddingInline: 16,
    fontFamily: font.cjk,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    textDecoration: "none",
    color: "inherit",
  },
  navHoverHero: {
    opacity: { default: 1, ":hover": 0.72 },
    transitionProperty: "opacity",
    transitionDuration: ease.hover,
    transitionTimingFunction: "ease",
  },
  navHoverSolid: {
    color: { default: "inherit", ":hover": color.royal },
  },
  navActiveHero: {
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 16,
      bottom: 2,
      height: 2,
      backgroundColor: color.paper,
      transitionProperty: "background-color",
      transitionDuration: "0ms",
      transitionDelay: { default: SWITCH_MS, [media.motionReduce]: "0ms" },
    },
  },
  navActiveSolid: {
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 16,
      bottom: 2,
      height: 2,
      backgroundColor: color.royal,
      transitionProperty: "background-color",
      transitionDuration: "0ms",
      transitionDelay: "0ms",
    },
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  iconButton: {
    display: { default: "none", [media.tabletUp]: "inline-flex" },
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
    color: "inherit",
    cursor: "pointer",
    opacity: { default: 1, ":hover": 0.72 },
    transitionProperty: "opacity",
    transitionDuration: ease.hover,
    transitionTimingFunction: "ease",
  },
  langButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
    height: 40,
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
    color: "inherit",
    fontFamily: font.display,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.2,
    cursor: "pointer",
    opacity: { default: 1, ":hover": 0.72 },
    transitionProperty: "opacity",
    transitionDuration: ease.hover,
    transitionTimingFunction: "ease",
  },
  menuButton: {
    display: { default: "inline-flex", [media.desktop]: "none" },
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
    color: "inherit",
    cursor: "pointer",
  },
  menuPanel: {
    position: "absolute",
    top: layoutTokens.headerHeight,
    insetInline: 0,
    paddingBlock: 8,
    paddingInline: { default: 8, [media.tablet]: 32 },
    backgroundColor: color.paper,
    color: color.ink,
    boxShadow: `0 24px 48px -12px rgba(13, 26, 51, 0.14), 0 1px 0 0 ${color.hairline}`,
  },
  menuList: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  menuLink: {
    display: "flex",
    alignItems: "center",
    minHeight: 48,
    paddingInline: 8,
    fontFamily: font.cjk,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.2,
    color: { default: color.ink, ":hover": color.royal },
    textDecoration: "none",
  },
  menuLinkActive: {
    color: color.royal,
    fontWeight: 700,
  },
});

// stylex.attrs with reactive (accessor) arguments: the StyleX compiler tries to
// evaluate local arrow functions at build time and throws, so these call sites
// resolve at runtime instead.
const sxProps: typeof stylex.attrs = (...args) => stylex.attrs(...args);

// `focusable` (legacy SVG attribute) is not in Solid's JSX types.
const UNFOCUSABLE = { focusable: "false" } as JSX.SvgSVGAttributes<SVGSVGElement>;

function LogoMark(props: { white: boolean }) {
  return (
    <svg viewBox="0 0 161 52" aria-hidden="true" {...UNFOCUSABLE} {...stylex.attrs(styles.logo)}>
      {LOGO_PATHS.map((path) => (
        <path
          d={path.d}
          fill={path.fill}
          {...stylex.attrs(props.white ? styles.logoPathHero : styles.logoPathSolid)}
        />
      ))}
    </svg>
  );
}

export function SiteHeader(props: { introStarted: boolean }) {
  const [menuOpen, setMenuOpen] = createSignal(false);
  const menuId = createUniqueId();
  const reduce = useReducedMotion();
  const headerState = useHeaderState();
  const onLight = () => menuOpen() || headerState().solid;
  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && menuOpen()) setMenuOpen(false);
  };
  const isActive = (href: string) => href.slice(1) === headerState().activeId;
  return (
    <header
      onKeyDown={closeOnEscape}
      {...sxProps(styles.header, onLight() ? styles.headerSolid : styles.headerHero)}
    >
      <div
        {...stylex.attrs(
          layout.shell,
          layout.inset,
          styles.inner,
          props.introStarted && styles.innerIn,
        )}
      >
        <a href="#top" aria-label="FENCHEM home" {...stylex.attrs(styles.logoLink)}>
          <LogoMark white={!onLight()} />
        </a>
        <nav aria-label="Main" {...stylex.attrs(styles.nav)}>
          {NAV_ITEMS.map((item) => (
            <a
              href={item.href}
              aria-current={isActive(item.href) ? "location" : undefined}
              {...sxProps(
                styles.navLink,
                onLight() ? styles.navHoverSolid : styles.navHoverHero,
                isActive(item.href) && (onLight() ? styles.navActiveSolid : styles.navActiveHero),
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div {...stylex.attrs(styles.actions)}>
          <button type="button" aria-label="Search" {...stylex.attrs(styles.iconButton)}>
            <Search size={18} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
          </button>
          <button type="button" aria-label="Switch to English" {...stylex.attrs(styles.langButton)}>
            EN
          </button>
          <button
            type="button"
            aria-label={menuOpen() ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen() ? "true" : "false"}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
            {...stylex.attrs(styles.menuButton)}
          >
            {menuOpen() ? (
              <X size={24} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
            ) : (
              <Menu size={24} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        <Show when={menuOpen()}>
          <m.nav
            id={menuId}
            aria-label="Main"
            {...stylex.attrs(styles.menuPanel)}
            initial={{ opacity: 0, transform: "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: reduce() ? 0.15 : 0.2, ease: EASE_OUT }}
          >
            <ul {...stylex.attrs(styles.menuList)}>
              {NAV_ITEMS.map((item) => (
                <li>
                  <a
                    href={item.href}
                    aria-current={isActive(item.href) ? "location" : undefined}
                    onClick={() => setMenuOpen(false)}
                    {...stylex.attrs(styles.menuLink, isActive(item.href) && styles.menuLinkActive)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>
        </Show>
      </AnimatePresence>
    </header>
  );
}
