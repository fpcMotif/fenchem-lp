import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  createSignal,
  createUniqueId,
  For,
  onSettled,
  Show,
  untrack,
  type Component,
} from "solid-js";
import type { ComponentProps, JSX } from "@solidjs/web";
import { AnimatePresence, m, type MotionStyle, type MotionValue } from "@/compat/motion";
import { ArrowUpRight, Menu, Search, X } from "@fenchem-lp/ui/components/lucide";
import { EASE, STAGGER } from "../motion-constants";
import { useReducedMotion } from "../use-reduced-motion";
import { LiquidImage } from "./liquid-image";
import { FooterNavigation, FooterLegal } from "./footer-content";
type RevealComponent = Component<{ children: JSX.Element; delay?: number; sx?: StyleXStyles }>;
function useScrolledPastTop() {
  const [scrolled, setScrolled] = createSignal(false);
  onSettled(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  });
  return scrolled;
}
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = createSignal(ids[0]);
  onSettled(() => {
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        const next = ids.find((id) => (ratios.get(id) ?? 0) > 0);
        if (next) setActive(next);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.01] },
    );
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  });
  return active;
}
export function CorporateHeader(props: {
  styles: Record<
    | "header"
    | "headerSolid"
    | "shell"
    | "headerInner"
    | "headerEnter"
    | "logoLink"
    | "nav"
    | "navLink"
    | "navLinkActive"
    | "headerActions"
    | "searchPill"
    | "langButton"
    | "menuButton"
    | "menuPanel"
    | "menuList"
    | "menuLink"
    | "menuLinkActive",
    StyleXStyles
  >;
  logo: JSX.Element;
  navItems: readonly { href: string; label: string }[];
  sectionIds: readonly string[];
}) {
  const [menuOpen, setMenuOpen] = createSignal(false);
  const menuId = createUniqueId();
  const reduce = useReducedMotion();
  const scrolled = useScrolledPastTop();
  const activeId = useActiveSection(untrack(() => props.sectionIds));
  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && menuOpen()) setMenuOpen(false);
  };
  const isActive = (href: string) => href.slice(1) === activeId();
  return (
    <header
      onKeyDown={closeOnEscape}
      {...stylex.attrs(props.styles.header, (scrolled() || menuOpen()) && props.styles.headerSolid)}
    >
      <div
        {...stylex.attrs(props.styles.shell, props.styles.headerInner, props.styles.headerEnter)}
      >
        <a href="#top" aria-label="FENCHEM home" {...stylex.attrs(props.styles.logoLink)}>
          {props.logo}
        </a>
        <nav aria-label="Main" {...stylex.attrs(props.styles.nav)}>
          <For each={props.navItems}>
            {(item) => (
              <a
                href={item.href}
                aria-current={isActive(item.href) ? "location" : undefined}
                {...stylex.attrs(
                  props.styles.navLink,
                  isActive(item.href) && props.styles.navLinkActive,
                )}
              >
                {item.label}
              </a>
            )}
          </For>
        </nav>
        <div {...stylex.attrs(props.styles.headerActions)}>
          <button type="button" aria-label="AI search" {...stylex.attrs(props.styles.searchPill)}>
            <Search size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="CN, switch language"
            {...stylex.attrs(props.styles.langButton)}
          >
            CN
          </button>
          <button
            type="button"
            aria-label={menuOpen() ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen() ? "true" : "false"}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
            {...stylex.attrs(props.styles.menuButton)}
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
            class={stylex.attrs(props.styles.menuPanel).class}
            initial={{ opacity: 0, transform: "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: reduce() ? 0.15 : 0.2, ease: EASE }}
          >
            <ul {...stylex.attrs(props.styles.menuList)}>
              <For each={props.navItems}>
                {(item) => (
                  <li>
                    <a
                      href={item.href}
                      aria-current={isActive(item.href) ? "location" : undefined}
                      onClick={() => setMenuOpen(false)}
                      {...stylex.attrs(
                        props.styles.menuLink,
                        isActive(item.href) && props.styles.menuLinkActive,
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </m.nav>
        </Show>
      </AnimatePresence>
    </header>
  );
}
export function HeroBackdrop(props: {
  styles: Record<
    | "heroParallax"
    | "heroBackdrop"
    | "heroLayer"
    | "heroImage"
    | "heroTintColor"
    | "heroTintScreen",
    StyleXStyles
  >;
  source: string;
  motionStyle?: MotionStyle;
  liquidFragment?: string;
  liquidProgress?: MotionValue<number>;
}) {
  return (
    <m.div
      aria-hidden="true"
      {...stylex.attrs(props.styles.heroParallax)}
      style={props.motionStyle}
    >
      <div {...stylex.attrs(props.styles.heroBackdrop)}>
        <img
          src={props.source}
          alt=""
          decoding="async"
          {...stylex.attrs(props.styles.heroLayer, props.styles.heroImage)}
        />
        <LiquidImage
          src={props.source}
          sx={props.styles.heroImage}
          fragment={props.liquidFragment}
          progress={props.liquidProgress}
        />
        <div {...stylex.attrs(props.styles.heroLayer, props.styles.heroTintColor)} />
        <div {...stylex.attrs(props.styles.heroLayer, props.styles.heroTintScreen)} />
      </div>
    </m.div>
  );
}
export function StrengthDetails(props: {
  styles: Record<
    | "strengthText"
    | "strengthTextInverse"
    | "strengthCopy"
    | "strengthTitle"
    | "strengthSmall"
    | "strengthLink",
    StyleXStyles
  >;
  strength: { tone: string; title: string; description?: string | null; link?: string | null };
}) {
  return (
    <div
      {...stylex.attrs(
        props.styles.strengthText,
        props.strength.tone === "blue" && props.styles.strengthTextInverse,
      )}
    >
      <div {...stylex.attrs(props.styles.strengthCopy)}>
        <h3 {...stylex.attrs(props.styles.strengthTitle)}>{props.strength.title}</h3>
        {props.strength.description ? (
          <p {...stylex.attrs(props.styles.strengthSmall)}>{props.strength.description}</p>
        ) : null}
      </div>
      {props.strength.link ? (
        <a href="#offices" {...stylex.attrs(props.styles.strengthLink)}>
          {props.strength.link}
          <ArrowUpRight size={12} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}
export function OfficeDirectory(props: {
  styles: Record<
    | "officesBand"
    | "shell"
    | "inset120"
    | "regions"
    | "officeColumn"
    | "officeGroup"
    | "regionHeader"
    | "list"
    | "regionBody"
    | "mutedText",
    StyleXStyles
  >;
  columns: readonly (readonly { region: string; offices: readonly string[] }[])[];
  Reveal: RevealComponent;
}) {
  return (
    <div {...stylex.attrs(props.styles.officesBand)}>
      <div {...stylex.attrs(props.styles.shell, props.styles.inset120, props.styles.regions)}>
        <For each={props.columns}>
          {(column, index) => (
            <props.Reveal delay={index() * STAGGER} sx={props.styles.officeColumn}>
              <For each={column}>
                {(group) => (
                  <div {...stylex.attrs(props.styles.officeGroup)}>
                    <h3 {...stylex.attrs(props.styles.regionHeader)}>{group.region}</h3>
                    <ul {...stylex.attrs(props.styles.list, props.styles.regionBody)}>
                      <For each={group.offices}>
                        {(office) => <li {...stylex.attrs(props.styles.mutedText)}>{office}</li>}
                      </For>
                    </ul>
                  </div>
                )}
              </For>
            </props.Reveal>
          )}
        </For>
      </div>
    </div>
  );
}
export function CorporateNews(props: {
  styles: Record<
    | "news"
    | "anchor"
    | "shell"
    | "inset120"
    | "newsInner"
    | "sectionTitle"
    | "accordion"
    | "newsItem",
    StyleXStyles
  >;
  title: string;
  items: readonly { title: string; details: readonly string[] }[];
  Reveal: RevealComponent;
  Item: Component<{
    item: { title: string; details: readonly string[] };
    open: boolean;
    onToggle: () => void;
  }>;
}) {
  const [openIndex, setOpenIndex] = createSignal<number | null>(null);
  return (
    <section
      id="news"
      aria-labelledby="oo-news-title"
      {...stylex.attrs(props.styles.news, props.styles.anchor)}
    >
      <div {...stylex.attrs(props.styles.shell, props.styles.inset120, props.styles.newsInner)}>
        <props.Reveal>
          <h2 id="oo-news-title" {...stylex.attrs(props.styles.sectionTitle)}>
            {props.title}
          </h2>
        </props.Reveal>
        <ul {...stylex.attrs(props.styles.accordion)}>
          <For each={props.items}>
            {(item, index) => (
              <m.li layout="position" transition={{ duration: 0.25, ease: EASE }}>
                <props.Reveal delay={index() * STAGGER} sx={props.styles.newsItem}>
                  <props.Item
                    item={item}
                    open={openIndex() === index()}
                    onToggle={() => setOpenIndex(openIndex() === index() ? null : index())}
                  />
                </props.Reveal>
              </m.li>
            )}
          </For>
        </ul>
      </div>
    </section>
  );
}
export function CorporateFooter(props: {
  styles: Record<"footer" | "shell" | "inset120" | "footerInner" | "footerRule", StyleXStyles> &
    ComponentProps<typeof FooterNavigation>["styles"] &
    ComponentProps<typeof FooterLegal>["styles"];
  logo: ComponentProps<typeof FooterNavigation>["logo"];
  columns: ComponentProps<typeof FooterNavigation>["columns"];
  copyright: string;
  children: JSX.Element;
}) {
  return (
    <footer {...stylex.attrs(props.styles.footer)}>
      <div {...stylex.attrs(props.styles.shell, props.styles.inset120, props.styles.footerInner)}>
        <FooterNavigation logo={props.logo} columns={props.columns} styles={props.styles} />
        <hr {...stylex.attrs(props.styles.footerRule)} />
        <FooterLegal copyright={props.copyright} styles={props.styles}>
          {props.children}
        </FooterLegal>
      </div>
    </footer>
  );
}
