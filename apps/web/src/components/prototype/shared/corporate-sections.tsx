import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  useEffect,
  useId,
  useState,
  type ComponentType,
  type ComponentProps,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, m, type MotionStyle, type MotionValue } from "motion/react";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { EASE, STAGGER } from "../motion-constants";
import { useReducedMotion } from "../use-reduced-motion";
import { LiquidImage } from "./liquid-image";
import { FooterNavigation, FooterLegal } from "./footer-content";
type RevealComponent = ComponentType<{ children: ReactNode; delay?: number; sx?: StyleXStyles }>;
function useScrolledPastTop() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return scrolled;
}
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
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
  }, [ids]);
  return active;
}
export function CorporateHeader({
  styles,
  logo,
  navItems,
  sectionIds,
}: {
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
  logo: ReactNode;
  navItems: readonly { href: string; label: string }[];
  sectionIds: readonly string[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const reduce = useReducedMotion();
  const scrolled = useScrolledPastTop();
  const activeId = useActiveSection(sectionIds);
  const closeOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && menuOpen) setMenuOpen(false);
  };
  const isActive = (href: string) => href.slice(1) === activeId;
  return (
    <header
      onKeyDown={closeOnEscape}
      {...stylex.props(styles.header, (scrolled || menuOpen) && styles.headerSolid)}
    >
      <div {...stylex.props(styles.shell, styles.headerInner, styles.headerEnter)}>
        <a href="#top" aria-label="FENCHEM home" {...stylex.props(styles.logoLink)}>
          {logo}
        </a>
        <nav aria-label="Main" {...stylex.props(styles.nav)}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "location" : undefined}
              {...stylex.props(styles.navLink, isActive(item.href) && styles.navLinkActive)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div {...stylex.props(styles.headerActions)}>
          <button type="button" aria-label="AI search" {...stylex.props(styles.searchPill)}>
            <Search size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="CN, switch language"
            {...stylex.props(styles.langButton)}
          >
            CN
          </button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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
            aria-label="Main"
            {...stylex.props(styles.menuPanel)}
            initial={{ opacity: 0, transform: "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: reduce ? 0.15 : 0.2, ease: EASE }}
          >
            <ul {...stylex.props(styles.menuList)}>
              {navItems.map((item) => (
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
export function HeroBackdrop({
  styles,
  source,
  motionStyle,
  liquidFragment,
  liquidProgress,
}: {
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
    <m.div aria-hidden="true" {...stylex.props(styles.heroParallax)} style={motionStyle}>
      <div {...stylex.props(styles.heroBackdrop)}>
        <img
          src={source}
          alt=""
          decoding="async"
          {...stylex.props(styles.heroLayer, styles.heroImage)}
        />
        <LiquidImage
          src={source}
          sx={styles.heroImage}
          fragment={liquidFragment}
          progress={liquidProgress}
        />
        <div {...stylex.props(styles.heroLayer, styles.heroTintColor)} />
        <div {...stylex.props(styles.heroLayer, styles.heroTintScreen)} />
      </div>
    </m.div>
  );
}
export function StrengthDetails({
  styles,
  strength,
}: {
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
      {...stylex.props(styles.strengthText, strength.tone === "blue" && styles.strengthTextInverse)}
    >
      <div {...stylex.props(styles.strengthCopy)}>
        <h3 {...stylex.props(styles.strengthTitle)}>{strength.title}</h3>
        {strength.description ? (
          <p {...stylex.props(styles.strengthSmall)}>{strength.description}</p>
        ) : null}
      </div>
      {strength.link ? (
        <a href="#offices" {...stylex.props(styles.strengthLink)}>
          {strength.link}
          <ArrowUpRight size={12} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}
export function OfficeDirectory({
  styles,
  columns,
  Reveal,
}: {
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
    <div {...stylex.props(styles.officesBand)}>
      <div {...stylex.props(styles.shell, styles.inset120, styles.regions)}>
        {columns.map((column, index) => (
          <Reveal key={column[0].region} delay={index * STAGGER} sx={styles.officeColumn}>
            {column.map((group) => (
              <div key={group.region} {...stylex.props(styles.officeGroup)}>
                <h3 {...stylex.props(styles.regionHeader)}>{group.region}</h3>
                <ul {...stylex.props(styles.list, styles.regionBody)}>
                  {group.offices.map((office) => (
                    <li key={office} {...stylex.props(styles.mutedText)}>
                      {office}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
export function CorporateNews({
  styles,
  title,
  items,
  Reveal,
  Item,
}: {
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
  Item: ComponentType<{
    item: { title: string; details: readonly string[] };
    open: boolean;
    onToggle: () => void;
  }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section
      id="news"
      aria-labelledby="oo-news-title"
      {...stylex.props(styles.news, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120, styles.newsInner)}>
        <Reveal>
          <h2 id="oo-news-title" {...stylex.props(styles.sectionTitle)}>
            {title}
          </h2>
        </Reveal>
        <ul {...stylex.props(styles.accordion)}>
          {items.map((item, index) => (
            <m.li layout="position" transition={{ duration: 0.25, ease: EASE }} key={item.title}>
              <Reveal delay={index * STAGGER} sx={styles.newsItem}>
                <Item
                  item={item}
                  open={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              </Reveal>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export function CorporateFooter({
  styles,
  logo,
  columns,
  copyright,
  children,
}: {
  styles: Record<"footer" | "shell" | "inset120" | "footerInner" | "footerRule", StyleXStyles> &
    ComponentProps<typeof FooterNavigation>["styles"] &
    ComponentProps<typeof FooterLegal>["styles"];
  logo: ComponentProps<typeof FooterNavigation>["logo"];
  columns: ComponentProps<typeof FooterNavigation>["columns"];
  copyright: string;
  children: ReactNode;
}) {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.shell, styles.inset120, styles.footerInner)}>
        <FooterNavigation logo={logo} columns={columns} styles={styles} />
        <hr {...stylex.props(styles.footerRule)} />
        <FooterLegal copyright={copyright} styles={styles}>
          {children}
        </FooterLegal>
      </div>
    </footer>
  );
}
