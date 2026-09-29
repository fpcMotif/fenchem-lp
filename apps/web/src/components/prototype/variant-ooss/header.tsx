import * as stylex from "@stylexjs/stylex";
import { Menu, Search, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useId, useState, type KeyboardEvent } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { LOGO_PATHS } from "../variant-o/vectors";
import { NAV_ITEMS, SECTION_IDS } from "./content";
import { EASE_OUT } from "./motion";
import { color, ease, font, layout as layoutTokens, media } from "./tokens.stylex";
import { layout } from "./ui";

const SPY_LINE = 0.4;
const SOLID_EDGE_PX = 40;
const NAV_IDS: readonly string[] = NAV_ITEMS.map((item) => item.href.slice(1));

type HeaderState = { solid: boolean; activeId: string | null };

function readHeaderState(): HeaderState {
  const about = document.getElementById("about");
  const solid = about ? about.getBoundingClientRect().top <= SOLID_EDGE_PX : false;
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  let current: string | null = null;
  for (const id of SECTION_IDS) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= window.innerHeight * SPY_LINE) {
      current = id;
    }
  }
  if (atBottom) current = SECTION_IDS[SECTION_IDS.length - 1] ?? current;
  return { solid, activeId: current && NAV_IDS.includes(current) ? current : null };
}

function useHeaderState(): HeaderState {
  const [state, setState] = useState<HeaderState>({ solid: false, activeId: "top" });
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = readHeaderState();
      setState((previous) =>
        previous.solid === next.solid && previous.activeId === next.activeId ? previous : next,
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
  }, []);
  return state;
}

const styles = stylex.create({
  header: {
    position: "fixed",
    top: 0,
    insetInline: 0,
    zIndex: 20,
    height: layoutTokens.headerHeight,
    color: color.paper,
    transitionProperty: "color",
    transitionDuration: { default: ease.fade, [media.motionReduce]: "0ms" },
    transitionTimingFunction: "ease",
  },
  headerSolid: {
    color: color.ink,
  },
  backdrop: {
    position: "absolute",
    inset: 0,
    backgroundColor: color.headerSolid,
    backdropFilter: "blur(20px)",
    boxShadow: `0 1px 0 0 ${color.hairline}`,
    opacity: 0,
    pointerEvents: "none",
    transitionProperty: "opacity",
    transitionDuration: { default: ease.fade, [media.motionReduce]: "0ms" },
    transitionTimingFunction: "ease",
  },
  backdropOn: {
    opacity: 1,
  },
  inner: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
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
  logoPath: {
    transitionProperty: "fill",
    transitionDuration: { default: ease.fade, [media.motionReduce]: "0ms" },
    transitionTimingFunction: "ease",
  },
  logoPathWhite: {
    fill: "currentColor",
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
  navActive: {
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 16,
      bottom: 2,
      height: 2,
      backgroundColor: color.paper,
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

function LogoMark({ overHero }: { overHero: boolean }) {
  return (
    <svg viewBox="0 0 161 52" aria-hidden="true" focusable="false" {...stylex.props(styles.logo)}>
      {LOGO_PATHS.map((path) => (
        <path
          key={path.d}
          d={path.d}
          fill={path.fill}
          {...stylex.props(styles.logoPath, overHero && styles.logoPathWhite)}
        />
      ))}
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const reduce = useReducedMotion();
  const { solid, activeId } = useHeaderState();
  const showSolid = solid || menuOpen;
  const closeOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && menuOpen) setMenuOpen(false);
  };
  const isActive = (href: string) => href.slice(1) === activeId;
  return (
    <header
      onKeyDown={closeOnEscape}
      {...stylex.props(styles.header, showSolid && styles.headerSolid)}
    >
      <div aria-hidden="true" {...stylex.props(styles.backdrop, showSolid && styles.backdropOn)} />
      <div {...stylex.props(layout.shell, layout.inset, styles.inner)}>
        <a href="#top" aria-label="FENCHEM 泛成 首页" {...stylex.props(styles.logoLink)}>
          <LogoMark overHero={!showSolid} />
        </a>
        <nav aria-label="主导航" {...stylex.props(styles.nav)}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "location" : undefined}
              {...stylex.props(
                styles.navLink,
                showSolid ? styles.navHoverSolid : styles.navHoverHero,
                isActive(item.href) && (showSolid ? styles.navActiveSolid : styles.navActive),
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div {...stylex.props(styles.actions)}>
          <button type="button" aria-label="搜索" {...stylex.props(styles.iconButton)}>
            <Search size={18} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
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
      </div>
      <AnimatePresence initial={false}>
        {menuOpen ? (
          <m.nav
            key="menu"
            id={menuId}
            aria-label="主导航"
            {...stylex.props(styles.menuPanel)}
            initial={{ opacity: 0, transform: "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: reduce ? 0.15 : 0.2, ease: EASE_OUT }}
          >
            <ul {...stylex.props(styles.menuList)}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive(item.href) ? "location" : undefined}
                    onClick={() => setMenuOpen(false)}
                    {...stylex.props(styles.menuLink, isActive(item.href) && styles.menuLinkActive)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
