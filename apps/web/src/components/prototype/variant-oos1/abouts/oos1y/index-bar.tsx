import * as stylex from "@stylexjs/stylex";
import { createEffect } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { useActiveSection } from "../../use-active-section";
import { SECTION_IDS, ui } from "./shared";
import { bp, chrome, face, pane, tone } from "./tokens.stylex";

const ENTRIES: Record<(typeof SECTION_IDS)[number], string> = {
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
    top: chrome.header,
    zIndex: 1,
    height: chrome.index,
    backgroundColor: "rgba(243, 245, 250, 0.74)",
    backdropFilter: pane.blur,
    WebkitBackdropFilter: pane.blur,
    boxShadow: "inset 0 -1px 0 rgba(26, 26, 26, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
  },
  row: {
    display: "flex",
    alignItems: "stretch",
    height: "100%",
  },
  list: {
    display: "flex",
    alignItems: "center",
    gap: { default: 22, [bp.desktop]: 36 },
    marginBlock: 0,
    marginInline: -8,
    paddingBlock: 0,
    paddingInline: 8,
    listStyleType: "none",
    overflowX: "auto",
    scrollbarWidth: "none",
    maskImage: {
      default: "linear-gradient(to right, #000 85%, transparent)",
      [bp.desktop]: "none",
    },
  },
  item: {
    display: "flex",
    flexShrink: 0,
  },
  link: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: 30,
    fontFamily: face.sans,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
    color: { default: tone.body, ":hover": tone.ink },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "160ms",
  },
  marker: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 2,
    height: 1,
    backgroundColor: tone.ink,
    transformOrigin: "left center",
    transform: "scaleX(0)",
    opacity: 0.7,
    transitionProperty: "transform",
    transitionDuration: { default: "420ms", [bp.motionReduce]: "0ms" },
    transitionTimingFunction: pane.ease,
  },
  markerOn: {
    transform: "scaleX(1)",
  },
});

export function IndexBar() {
  const active = useActiveSection(SECTION_IDS);
  const reduce = useReducedMotion();
  let listRef!: HTMLOListElement;

  createEffect(
    () => [active(), reduce()] as const,
    ([current, reduced]) => {
      const list = listRef;
      if (!list || !current || list.scrollWidth <= list.clientWidth) return;
      const link = list.querySelector<HTMLElement>(`[href="#${current}"]`);
      if (!link) return;
      list.scrollTo({ left: link.offsetLeft - 16, behavior: reduced ? "auto" : "smooth" });
    },
  );

  return (
    <nav aria-label="On this page" {...stylex.attrs(styles.bar)}>
      <div {...stylex.attrs(ui.shell, styles.row)}>
        <ol ref={listRef} {...stylex.attrs(styles.list)}>
          {SECTION_IDS.map((id) => (
            <li {...stylex.attrs(styles.item)}>
              <a
                href={`#${id}`}
                aria-current={active() === id ? "location" : undefined}
                {...stylex.attrs(styles.link)}
              >
                <span lang="en">{ENTRIES[id]}</span>
                <span
                  aria-hidden="true"
                  {...stylex.attrs(styles.marker, active() === id && styles.markerOn)}
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
