import * as stylex from "@stylexjs/stylex";
import type { ReactNode, RefObject } from "react";

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

export function PinnedSection({
  id,
  titleId,
  sectionRef,
  head,
  children,
}: {
  id: string;
  titleId: string;
  sectionRef: RefObject<HTMLElement | null>;
  head: ReactNode;
  children: ReactNode;
}) {
  return (
    <section ref={sectionRef} id={id} aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.track)}>
        <div {...stylex.props(styles.stage)}>
          <div {...stylex.props(ui.shell)}>
            <div {...stylex.props(ui.grid, ui.ruled)}>
              <div {...stylex.props(ui.headCol, styles.head)}>{head}</div>
              <div {...stylex.props(ui.bodyCol, styles.figure)}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
