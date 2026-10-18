import { m } from "@/compat/motion";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useScroll } from "@/compat/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { ABOUT_HERO } from "../../about-data";
import { useActiveSection } from "../../use-active-section";
import { base, ty } from "./shared";
import { hue, size } from "./theme.stylex";
import { SECTION_IDS } from "./index-bar-values";
import { createEffect, createSignal } from "solid-js";

const NAV_LABELS: Record<(typeof ABOUT_HERO.navChips)[number]["id"], string> = {
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
    top: size.header,
    zIndex: 1,
    backgroundColor: hue.barSurface,
    backdropFilter: "blur(14px)",
    boxShadow: `0 1px 0 0 ${hue.hairline}`,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    height: size.bar,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    gap: 8,
    height: "100%",
    paddingInlineEnd: { default: 12, [breakpoints.lg]: 0 },
  },
  crumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    letterSpacing: "inherit",
    color: { default: hue.body, ":hover": hue.ink },
    cursor: "pointer",
  },
  list: {
    position: "relative",
    display: "flex",
    alignItems: "stretch",
    justifyContent: { default: "flex-start", [breakpoints.lg]: "flex-end" },
    flexGrow: 1,
    minWidth: 0,
    height: "100%",
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    paddingInline: { default: 12, [breakpoints.lg]: 18 },
    textDecoration: "none",
    whiteSpace: "nowrap",
    color: { default: hue.body, ":hover": hue.ink },
  },
  linkOn: {
    color: hue.ink,
  },
  marker: {
    position: "absolute",
    left: 0,
    bottom: 14,
    width: 1,
    height: 1,
    backgroundColor: hue.ink,
    transformOrigin: "left center",
    opacity: 0,
    pointerEvents: "none",
    transitionProperty: "transform, opacity",
    transitionDuration: "560ms",
    transitionTimingFunction: size.ease,
  },
  markerOn: {
    opacity: 1,
  },
  markerAt: (left: number, width: number) => ({
    transform: `translateX(${left}px) scaleX(${width})`,
  }),
  progress: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: colors.brandBlue700,
    transformOrigin: "left center",
    pointerEvents: "none",
  },
});

type MarkerBox = { left: number; width: number };

function measureMarker(list: HTMLElement, label: HTMLElement): MarkerBox {
  const listBox = list.getBoundingClientRect();
  const labelBox = label.getBoundingClientRect();
  return { left: labelBox.left - listBox.left + list.scrollLeft, width: labelBox.width };
}

export function IndexBar(props: { onNavigateHome: (hash?: string) => void }) {
  const active = useActiveSection(SECTION_IDS);
  const [listRef, setListRef] = createSignal<HTMLElement>();
  const reduce = useReducedMotion();
  const [marker, setMarker] = createSignal<MarkerBox | null>(null);
  const { scrollYProgress } = useScroll();

  createEffect(
    () => ({ list: listRef(), active: active(), reduce: reduce() }),
    ({ list, active, reduce }) => {
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
    },
  );

  createEffect(
    () => ({ list: listRef(), active: active() }),
    ({ list, active }) => {
      const label = active
        ? list?.querySelector<HTMLElement>(`[href="#${active}"] > [lang="en"]`)
        : null;
      if (!list || !label) return;
      const place = () => setMarker(measureMarker(list, label));
      place();
      window.addEventListener("resize", place);
      return () => window.removeEventListener("resize", place);
    },
  );

  return (
    <div {...stylex.attrs(styles.bar)}>
      <div {...stylex.attrs(base.shell, styles.inner)}>
        <nav aria-label="Breadcrumb" lang="en" {...stylex.attrs(ty.quiet, styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => props.onNavigateHome("top")}
            {...stylex.attrs(styles.crumbLink, base.focus)}
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span aria-current="page">About</span>
        </nav>
        <nav aria-label="On this page" ref={setListRef} {...stylex.attrs(styles.list)}>
          {ABOUT_HERO.navChips.map((chip) => (
            <a
              href={`#${chip.id}`}
              aria-current={active() === chip.id ? "location" : undefined}
              {...stylex.attrs(
                ty.quiet,
                styles.link,
                active() === chip.id && styles.linkOn,
                base.focus,
              )}
            >
              <span lang="en">{NAV_LABELS[chip.id]}</span>
            </a>
          ))}
          <span
            aria-hidden="true"
            {...stylex.attrs(
              styles.marker,
              active() !== undefined && marker() !== null && styles.markerOn,
              marker() !== null && styles.markerAt(marker()!.left, marker()!.width),
            )}
          />
        </nav>
      </div>
      <m.span
        aria-hidden="true"
        {...stylex.attrs(styles.progress)}
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
