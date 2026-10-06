import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef } from "react";

import { useActiveSection } from "../../use-active-section";
import { SECTION_IDS, srOnly, ui } from "./shared";
import { bp, chrome, face, pane, tone } from "./tokens.stylex";

const ENTRIES: Record<(typeof SECTION_IDS)[number], { en: string; zh: string }> = {
  "about-profile": { en: "Profile", zh: "企业概况" },
  "about-campus": { en: "Campus", zh: "园区环境" },
  "about-culture": { en: "Culture", zh: "企业文化" },
  "about-csr": { en: "Responsibility", zh: "社会责任" },
  "about-honor": { en: "Honors", zh: "企业荣誉" },
  "about-structure": { en: "Structure", zh: "企业架构" },
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
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;
    const link = list.querySelector<HTMLElement>(`[href="#${active}"]`);
    if (!link) return;
    list.scrollTo({ left: link.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="页内导航" {...stylex.props(styles.bar)}>
      <div {...stylex.props(ui.shell, styles.row)}>
        <ol ref={listRef} {...stylex.props(styles.list)}>
          {SECTION_IDS.map((id) => (
            <li key={id} {...stylex.props(styles.item)}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                {...stylex.props(styles.link)}
              >
                <span lang="en">{ENTRIES[id].en}</span>
                <span {...srOnly}> {ENTRIES[id].zh}</span>
                <span
                  aria-hidden="true"
                  {...stylex.props(styles.marker, active === id && styles.markerOn)}
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
