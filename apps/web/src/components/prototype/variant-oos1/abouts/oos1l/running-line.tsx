import * as stylex from "@stylexjs/stylex";
import type { Ref } from "react";

import { Words } from "./clause";
import { UNITS } from "./sentence";
import { ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  bar: {
    position: "sticky",
    top: chrome.header,
    zIndex: 2,
    height: chrome.bar,
    marginBottom: "-48px",
    boxSizing: "border-box",
    backgroundColor: tone.page,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
    transform: "translateY(-100%)",
    opacity: 0,
    visibility: "hidden",
  },
  row: {
    display: "flex",
    height: "100%",
  },
  track: {
    display: "flex",
    flexGrow: 1,
    minWidth: 0,
    marginBlock: 0,
    marginInlineStart: 0,
    marginInlineEnd: "-1em",
    padding: 0,
    listStyleType: "none",
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "none",
    scrollPaddingInlineStart: "7em",
    fontFamily: face.sans,
    fontSize: { default: 14, [bp.desktop]: 15 },
    lineHeight: "47px",
    whiteSpace: "nowrap",
    color: tone.body,
    fontFeatureSettings: '"palt"',
  },
  item: {
    display: "flex",
    flexShrink: 0,
  },
  subject: {
    position: "sticky",
    left: 0,
    zIndex: 1,
    marginInlineStart: "auto",
    backgroundColor: tone.page,
  },
  clip: {
    display: "block",
    width: 0,
    overflow: "hidden",
    visibility: "hidden",
  },
  link: {
    display: "block",
    width: "max-content",
    color: "inherit",
    textDecorationLine: { default: "none", ":hover": "underline" },
    textDecorationColor: tone.blue,
    textDecorationThickness: 1,
    textUnderlineOffset: 7,
    boxShadow: {
      default: "none",
      ":focus-visible": "inset 0 -2px 0 #0743a9, inset 0 2px 0 #0743a9",
    },
    transitionProperty: "color",
    transitionDuration: "240ms",
  },
  heavy: {
    fontWeight: 900,
  },
  light: {
    fontWeight: 300,
  },
  hinge: {
    fontWeight: 300,
    letterSpacing: 0,
    color: tone.blue,
    fontFeatureSettings: "normal",
  },
  ellipsis: {
    position: "absolute",
    top: 0,
    left: "100%",
    display: "none",
    paddingInlineEnd: "0.6em",
    backgroundColor: tone.page,
    color: tone.body,
  },
});

const tracking = stylex.create({
  s0: { letterSpacing: "-0.015em" },
  s1: { letterSpacing: "-0.01em" },
  s2: { letterSpacing: "-0.005em" },
  s3: { letterSpacing: 0 },
});

export function RunningLine({
  barRef,
  trackRef,
}: {
  barRef: Ref<HTMLElement>;
  trackRef: Ref<HTMLOListElement>;
}) {
  return (
    <nav ref={barRef} aria-label="On this page" {...stylex.props(styles.bar)}>
      <div {...stylex.props(ui.shell, styles.row)}>
        <ol ref={trackRef} {...stylex.props(styles.track)}>
          {UNITS.map((unit) => (
            <li key={unit.id} {...stylex.props(styles.item, unit.index === 0 && styles.subject)}>
              <span data-slot={unit.index} {...stylex.props(styles.clip)}>
                <a href={`#${unit.id}`} {...stylex.props(styles.link, tracking[unit.size])}>
                  <Words segments={unit.segments} heavy={styles.heavy} light={styles.light} />
                  {unit.hinge ? <span {...stylex.props(styles.hinge)}>{unit.hinge}</span> : null}
                </a>
              </span>
              {unit.index === 0 ? (
                <span data-ellipsis aria-hidden="true" {...stylex.props(styles.ellipsis)}>
                  ……
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
