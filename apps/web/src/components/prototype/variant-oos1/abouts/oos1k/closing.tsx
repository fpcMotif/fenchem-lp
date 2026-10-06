import * as stylex from "@stylexjs/stylex";

import type { AboutPageProps } from "../../index";
import { PoleMark, ui } from "./shared";
import { bp, chrome, face, sky } from "./tokens.stylex";

const styles = stylex.create({
  closing: {
    position: "relative",
  },
  stage: {
    position: "relative",
    display: "grid",
    gridTemplateRows: "1fr 0 1fr",
    height: chrome.sky,
    minHeight: 560,
  },
  upper: {
    alignSelf: "end",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
    paddingBottom: { default: 124, [bp.desktop]: 148 },
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 44, [bp.tablet]: 56, [bp.desktop]: 72 },
    fontWeight: 500,
    lineHeight: 1.1,
    letterSpacing: "0.06em",
    color: sky.star,
  },
  ring: {
    position: "absolute",
    top: 0,
    left: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    width: { default: 176, [bp.desktop]: 212 },
    height: { default: 176, [bp.desktop]: 212 },
    paddingBlock: { default: 44, [bp.desktop]: 56 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: sky.hairStrong, ":hover": sky.tint },
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: sky.star,
    cursor: "pointer",
    transform: "translate(-50%, -50%)",
    transitionProperty: "border-color",
    transitionDuration: "300ms",
  },
  ringEn: {
    color: sky.text,
  },
  ringZh: {
    fontFamily: face.sans,
    fontSize: { default: 18, [bp.desktop]: 20 },
    fontWeight: 500,
    letterSpacing: "0.12em",
    marginInlineEnd: "-0.12em",
  },
  lower: {
    alignSelf: "start",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 18,
    paddingTop: { default: 124, [bp.desktop]: 148 },
    textAlign: "center",
  },
  home: {
    paddingBlock: 8,
    paddingInline: 4,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: face.sans,
    fontSize: 16,
    letterSpacing: "0.06em",
    color: { default: sky.text, ":hover": sky.star },
    cursor: "pointer",
    textDecorationLine: "underline",
    textDecorationColor: sky.hairStrong,
    textUnderlineOffset: 6,
    transitionProperty: "color",
    transitionDuration: "200ms",
  },
});

export function Closing({ onNavigateHome }: AboutPageProps) {
  return (
    <section aria-labelledby="oos1k-closing" {...stylex.props(styles.closing)}>
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(styles.stage)}>
          <div {...stylex.props(styles.upper)}>
            <p lang="en" {...stylex.props(ui.label)}>
              The atlas closes at its pole
            </p>
            <h2 id="oos1k-closing" {...stylex.props(styles.title)}>
              回到南京
            </h2>
          </div>
          <div {...stylex.props(styles.closing)}>
            <PoleMark />
            <button
              type="button"
              onClick={() => onNavigateHome("contact")}
              {...stylex.props(styles.ring, ui.focusable)}
            >
              <span lang="en" aria-hidden="true" {...stylex.props(ui.label, styles.ringEn)}>
                Contact
              </span>
              <span {...stylex.props(styles.ringZh)}>联系我们</span>
            </button>
          </div>
          <div {...stylex.props(styles.lower)}>
            <p lang="en" {...stylex.props(ui.label)}>
              Pole · 32°03′ N 118°47′ E
            </p>
            <button
              type="button"
              onClick={() => onNavigateHome()}
              {...stylex.props(styles.home, ui.focusable)}
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
