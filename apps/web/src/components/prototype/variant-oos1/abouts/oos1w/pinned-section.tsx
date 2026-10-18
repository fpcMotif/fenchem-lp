import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";

import { ui } from "./shared-values";
import { bp, chrome } from "./tokens.stylex";

const styles = stylex.create({
  section: {
    scrollMarginTop: chrome.header,
    paddingBlock: { default: 72, [bp.tablet]: 104, [bp.still]: 136, [bp.pinned]: 0 },
  },
  track: {
    height: { default: "auto", [bp.pinned]: "330svh" },
  },
  stage: {
    position: { default: "relative", [bp.pinned]: "sticky" },
    top: chrome.header,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
    height: { default: "auto", [bp.pinned]: chrome.stage },
    paddingBlock: { default: 0, [bp.pinned]: 32 },
  },
  head: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  figure: {
    marginTop: { default: 40, [bp.tablet]: 56, [bp.desktop]: 0 },
  },
});

export function PinnedSection(props: {
  id: string;
  titleId: string;
  sectionRef: (element: HTMLElement) => void;
  head: JSX.Element;
  children: JSX.Element;
}) {
  return (
    <section
      ref={props.sectionRef}
      id={props.id}
      aria-labelledby={props.titleId}
      {...stylex.attrs(styles.section)}
    >
      <div {...stylex.attrs(styles.track)}>
        <div {...stylex.attrs(styles.stage)}>
          <div {...stylex.attrs(ui.shell)}>
            <div {...stylex.attrs(ui.grid, ui.ruled)}>
              <div {...stylex.attrs(ui.headCol, styles.head)}>{props.head}</div>
              <div {...stylex.attrs(ui.bodyCol, styles.figure)}>{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
