import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { useActiveSection } from "../../use-active-section";
import { ui } from "./shared-values";
import { font, motionCss, step, tone } from "./tokens.stylex";
import { NAV_ITEMS } from "./nav-values";
import { createEffect, createSignal } from "solid-js";

const SECTION_IDS: readonly string[] = NAV_ITEMS.map((item) => item.id);

const s = stylex.create({
  bar: {
    position: "sticky",
    top: 80,
    zIndex: 1,
    backgroundColor: tone.barGlass,
    backdropFilter: "blur(14px)",
    boxShadow: `0 1px 0 0 ${tone.hairline}`,
  },
  inner: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: 16,
    height: 52,
  },
  crumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.quiet,
  },
  crumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: "inherit",
    fontWeight: 400,
    letterSpacing: "inherit",
    color: { default: tone.quiet, ":hover": tone.ink },
    cursor: "pointer",
  },
  crumbCurrent: {
    display: { default: "none", [breakpoints.lg]: "inline" },
  },
  crumbSep: {
    display: { default: "none", [breakpoints.lg]: "inline" },
  },
  tabs: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: { default: "flex-start", [breakpoints.lg]: "flex-end" },
    flexGrow: 1,
    minWidth: 0,
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  tab: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    paddingInline: { default: 12, [breakpoints.xl]: 16 },
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: { default: tone.quiet, ":hover": tone.ink },
    boxShadow: { default: null, ":focus-visible": `inset 0 0 0 2px ${tone.ink}` },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color",
    transitionDuration: "160ms",
    transitionTimingFunction: motionCss.out,
  },
  tabActive: {
    color: tone.ink,
  },
  tabMark: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    width: 12,
    height: 6,
    marginLeft: -6,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: tone.ink,
    opacity: 0,
    transform: { default: null, [breakpoints.motionOk]: "translateY(3px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "240ms",
    transitionTimingFunction: motionCss.out,
  },
  tabMarkActive: {
    opacity: 1,
    transform: "none",
  },
});

export function SubNav(props: { onNavigateHome: (hash?: string) => void }) {
  const active = useActiveSection(SECTION_IDS);
  const [tabsRef, setTabsRef] = createSignal<HTMLElement>();
  const reduce = useReducedMotion();

  createEffect(
    () => ({ list: tabsRef(), active: active(), reduce: reduce() }),
    ({ list, active, reduce }) => {
      const tab = active ? list?.querySelector<HTMLElement>(`[href="#${active}"]`) : null;
      if (!list || !tab) return;
      const listBox = list.getBoundingClientRect();
      const tabBox = tab.getBoundingClientRect();
      if (tabBox.left < listBox.left || tabBox.right > listBox.right) {
        list.scrollBy({
          left: tabBox.left - listBox.left - 16,
          behavior: reduce ? "auto" : "smooth",
        });
      }
    },
  );

  return (
    <div {...stylex.attrs(s.bar)}>
      <div {...stylex.attrs(ui.shell, ui.inset, s.inner)}>
        <nav aria-label="Breadcrumb" {...stylex.attrs(s.crumb)}>
          <button
            type="button"
            onClick={() => props.onNavigateHome("top")}
            {...stylex.attrs(s.crumbLink, ui.focusRing)}
          >
            <span lang="en">Home</span>
          </button>
          <span aria-hidden="true" {...stylex.attrs(s.crumbSep)}>
            /
          </span>
          <span aria-current="page" {...stylex.attrs(s.crumbCurrent)}>
            <span lang="en">About</span>
          </span>
        </nav>
        <nav aria-label="On this page" ref={setTabsRef} {...stylex.attrs(s.tabs)}>
          {NAV_ITEMS.map((item) => {
            const isActive = () => active() === item.id;
            return (
              <a
                href={`#${item.id}`}
                aria-current={isActive() ? "location" : undefined}
                {...stylex.attrs(s.tab, isActive() && s.tabActive, ui.focusRing)}
              >
                <span lang="en">{item.english}</span>
                <span
                  aria-hidden="true"
                  {...stylex.attrs(s.tabMark, isActive() && s.tabMarkActive)}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
