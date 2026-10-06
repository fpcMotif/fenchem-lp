import * as stylex from "@stylexjs/stylex";
import { ArrowDown } from "lucide-react";
import { useRef, useState } from "react";

import { ABOUT_BANNER, ABOUT_HERO } from "../../about-data";
import { AssemblySteps } from "./assembly-steps";
import { HeroDrawing } from "./hero-drawing";
import type { HeroPartId } from "./hero-geometry";
import { PartsList } from "./parts-list";
import { pad2, SHEET_COUNT, ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";
import { useScrollAssembly } from "./use-assembly-progress";

const CHAIN = "集研产销于一体";
const [LEAD_BEFORE, LEAD_AFTER] = ABOUT_HERO.lead.split(CHAIN);
const EST_YEAR = ABOUT_BANNER.established.replace("Est. ", "");

const styles = stylex.create({
  track: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.desktop]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
  },
  textCell: {
    gridColumn: { default: "1", [bp.laptop]: "1 / 6", [bp.wide]: "1 / 5" },
  },
  heroCell: {
    gridRow: "1",
  },
  profileCell: {
    gridRow: { default: "3", [bp.desktop]: "2" },
  },
  stageCell: {
    gridRow: { default: "2", [bp.desktop]: "1 / 3" },
    gridColumn: { default: "1", [bp.laptop]: "6 / 13", [bp.wide]: "5 / 13" },
    marginInlineStart: { default: -20, [bp.tabletUp]: 0 },
    marginInlineEnd: {
      default: -20,
      [bp.tablet]: 0,
      [bp.desktop]: "calc(24px - min(120px, 8.333vw))",
    },
    paddingInlineStart: { default: 0, [bp.laptop]: 32, [bp.wide]: 16 },
  },
  stage: {
    position: { default: "relative", [bp.desktop]: "sticky" },
    top: { default: "auto", [bp.desktop]: chrome.header },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: { default: "auto", [bp.desktop]: chrome.stage },
    paddingBlock: { default: 40, [bp.tablet]: 64, [bp.desktop]: 0 },
  },
  drawingFrame: {
    width: {
      default: "100%",
      [bp.desktop]: "min(100%, calc((100svh - 80px - 72px) * 1.25))",
    },
  },
  heroText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
    minHeight: { default: 0, [bp.still]: "calc(100svh - 80px)", [bp.pin]: "calc(100svh - 150px)" },
    paddingTop: { default: 48, [bp.tablet]: 88, [bp.desktop]: 24 },
    paddingBottom: { default: 0, [bp.desktop]: 24 },
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 60, [bp.tablet]: 88, [bp.laptop]: 76, [bp.wide]: "min(96px, 6.4vw)" },
    fontWeight: 700,
    lineHeight: 1.04,
    letterSpacing: "0.02em",
    color: tone.navy,
  },
  tagline: {
    margin: 0,
    marginTop: { default: 18, [bp.desktop]: 22 },
    fontSize: { default: 24, [bp.desktop]: 30 },
    lineHeight: 1.2,
    color: tone.ink,
  },
  lead: {
    margin: 0,
    marginTop: { default: 16, [bp.desktop]: 20 },
    maxWidth: "24em",
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 18 },
    lineHeight: 1.8,
    color: tone.body,
    textWrap: "pretty",
  },
  titleBlock: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)",
    maxWidth: 380,
    margin: 0,
    marginTop: { default: 28, [bp.desktop]: 36 },
    borderTopWidth: 1.5,
    borderTopStyle: "solid",
    borderTopColor: tone.navy,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.rule,
  },
  titleCell: {
    display: "flex",
    flexDirection: "column-reverse",
    gap: 6,
    paddingBlock: 14,
    paddingInlineStart: { default: 0, ":nth-child(2)": 16 },
    borderInlineStartWidth: { default: 0, ":nth-child(2)": 1 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: tone.rule,
  },
  titleValue: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: 18,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: tone.ink,
  },
  cue: {
    display: { default: "none", [bp.pin]: "flex" },
    alignItems: "center",
    gap: 10,
    marginTop: 40,
  },
  profileText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
    minHeight: { default: 0, [bp.desktop]: chrome.stage },
    paddingBlock: { default: 0, [bp.desktop]: 40 },
  },
  sheetLine: {
    paddingBottom: 12,
    borderBottomWidth: 1.5,
    borderBottomStyle: "solid",
    borderBottomColor: tone.navy,
  },
  profileTitle: {
    margin: 0,
    marginTop: { default: 18, [bp.desktop]: 22 },
    fontFamily: face.sans,
    fontSize: { default: 34, [bp.desktop]: 40 },
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: "0.03em",
    color: tone.navy,
  },
  company: {
    margin: 0,
    marginTop: { default: 14, [bp.desktop]: 16 },
    fontFamily: face.sans,
    fontSize: { default: 20, [bp.tablet]: 24, [bp.laptop]: 22, [bp.wide]: "min(24px, 1.7vw)" },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.02em",
    color: tone.ink,
    textWrap: "balance",
  },
  english: {
    marginTop: 6,
  },
  profileLead: {
    margin: 0,
    marginTop: { default: 18, [bp.desktop]: 20 },
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 17 },
    lineHeight: 1.85,
    color: tone.body,
    textWrap: "pretty",
  },
  chain: {
    fontWeight: 500,
    color: tone.navy,
    textDecorationLine: "underline",
    textDecorationThickness: 1,
    textUnderlineOffset: 5,
    textDecorationColor: "rgba(11, 42, 92, 0.45)",
  },
  network: {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    columnGap: 12,
    margin: 0,
    marginTop: 24,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.8,
    color: tone.body,
  },
  networkBalloon: {
    marginTop: 1,
  },
});

export function HeroAssembly() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef<HTMLDivElement>(null);
  const progress = useScrollAssembly(trackRef, drawingRef);
  const [active, setActive] = useState<HeroPartId | null>(null);

  return (
    <div ref={trackRef} {...stylex.props(ui.shell, styles.track)}>
      <section aria-labelledby="oos1m-title" {...stylex.props(styles.textCell, styles.heroCell)}>
        <div {...stylex.props(styles.heroText)}>
          <h1 id="oos1m-title" {...stylex.props(styles.title)}>
            {ABOUT_BANNER.title}
          </h1>
          <p lang="en" {...stylex.props(ui.serif, styles.tagline)}>
            {ABOUT_BANNER.tagline}
          </p>
          <p {...stylex.props(styles.lead)}>{ABOUT_BANNER.lead}</p>
          <dl {...stylex.props(styles.titleBlock)}>
            <div {...stylex.props(styles.titleCell)}>
              <dt lang="en" {...stylex.props(ui.caps)}>
                Est.
              </dt>
              <dd {...stylex.props(styles.titleValue)}>{EST_YEAR}</dd>
            </div>
            <div {...stylex.props(styles.titleCell)}>
              <dt lang="en" {...stylex.props(ui.caps)}>
                Place
              </dt>
              <dd lang="en" {...stylex.props(styles.titleValue)}>
                {ABOUT_BANNER.place}
              </dd>
            </div>
          </dl>
          <p aria-hidden="true" {...stylex.props(ui.caps, styles.cue)}>
            <ArrowDown size={14} strokeWidth={1.25} />
            <span lang="en">Scroll to assemble</span>
          </p>
        </div>
        <AssemblySteps progress={progress} />
      </section>

      <div ref={drawingRef} {...stylex.props(styles.stageCell)}>
        <div {...stylex.props(styles.stage)}>
          <div {...stylex.props(styles.drawingFrame)}>
            <HeroDrawing progress={progress} active={active} onActive={setActive} />
          </div>
        </div>
      </div>

      <section
        id="about-profile"
        aria-labelledby="oos1m-profile"
        {...stylex.props(ui.anchor, styles.textCell, styles.profileCell)}
      >
        <div {...stylex.props(styles.profileText)}>
          <p aria-hidden="true" lang="en" {...stylex.props(ui.caps, styles.sheetLine)}>
            Sheet 01 / {pad2(SHEET_COUNT)} · Profile
          </p>
          <h2 id="oos1m-profile" {...stylex.props(styles.profileTitle)}>
            企业概况
          </h2>
          <p {...stylex.props(styles.company)}>{ABOUT_HERO.title}</p>
          <p lang="en" {...stylex.props(ui.label, styles.english)}>
            {ABOUT_HERO.englishTitle}
          </p>
          <p {...stylex.props(styles.profileLead)}>
            {LEAD_BEFORE}
            <strong {...stylex.props(styles.chain)}>{CHAIN}</strong>
            {LEAD_AFTER}
          </p>
          <PartsList active={active} onActive={setActive} />
          <p {...stylex.props(styles.network)}>
            <span aria-hidden="true" {...stylex.props(ui.balloon, styles.networkBalloon)}>
              3
            </span>
            <span>
              {ABOUT_HERO.networkLabel}
              {ABOUT_HERO.countries.join("、")}。
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
