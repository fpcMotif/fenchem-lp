import { m } from "motion/react";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useScroll, useTransform } from "motion/react";
import { type CSSProperties, type ReactNode, type RefObject, useContext, useRef } from "react";
import { useBoxHeight } from "./hooks";
import { base } from "./shared-values";
import type { SheetDef } from "./sheets";
import { color, font, media, metric } from "./tokens.stylex";
import { StackContext } from "./sheet-values";

const styles = stylex.create({
  slot: {
    position: "relative",
    display: "flow-root",
    marginBottom: { default: 24, [media.stack]: 0 },
    scrollMarginTop: { default: metric.flowAnchor, [media.stack]: metric.pin },
  },
  slotOverlap: {
    marginTop: { default: 0, [media.stack]: "-100svh" },
  },
  slotLast: {
    minHeight: { default: null, [media.stack]: "100svh" },
  },
  runway: {
    display: { default: "none", [media.stack]: "block" },
    height: "100svh",
    pointerEvents: "none",
  },
  sheet: {
    position: { default: "relative", [media.stack]: "sticky" },
    top: {
      default: null,
      [media.stack]: `min(${metric.pin}, calc(100svh - var(--oos1e-h, 0px)))`,
    },
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    width: { default: "calc(100% - 32px)", [media.mdUp]: "calc(100% - 48px)" },
    maxWidth: metric.sheetMax,
    minHeight: { default: null, [media.stack]: `calc(100svh - ${metric.pin})` },
    marginInline: "auto",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: { default: 14, [media.stack]: 0 },
    borderBottomRightRadius: { default: 14, [media.stack]: 0 },
    boxShadow: {
      default: `0 0 0 1px ${color.hairline}`,
      [media.stack]: `0 0 0 1px ${color.hairline}, 0 -16px 40px -12px ${color.lift}`,
    },
    color: color.ink,
    fontFamily: font.cjk,
  },
  tonePaper: { backgroundColor: colors.paper },
  toneWarm: { backgroundColor: color.paperWarm },
  toneNavy: { backgroundColor: color.navy, color: color.onNavy },
  body: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    gap: { default: 48, [media.lgUp]: 72 },
    boxSizing: "border-box",
    paddingBlock: { default: 44, [media.md]: 60, [media.lgUp]: 80 },
    paddingInline: { default: 20, [media.md]: 36, [media.lgUp]: 72 },
  },
});

const SHEET_TONES = {
  paper: styles.tonePaper,
  warm: styles.toneWarm,
  navy: styles.toneNavy,
} as const;

const COVERED_RANGE = [0.25, 0.75];
const COVERED_OPACITY = [1, 0.16];

function CoveredBody({
  runwayRef,
  stacked,
  children,
}: {
  runwayRef: RefObject<HTMLDivElement | null>;
  stacked: boolean;
  children: ReactNode;
}) {
  const { scrollYProgress } = useScroll({ target: runwayRef, offset: ["start end", "end end"] });
  const opacity = useTransform(scrollYProgress, COVERED_RANGE, COVERED_OPACITY);
  return (
    <m.div style={stacked ? { opacity } : undefined} {...stylex.props(styles.body)}>
      {children}
    </m.div>
  );
}

export function Sheet({
  def,
  headingId,
  runway = true,
  children,
}: {
  def: SheetDef;
  headingId?: string;
  runway?: boolean;
  children: ReactNode;
}) {
  const { reachedIndex, stacked } = useContext(StackContext);
  const [ref, height] = useBoxHeight<HTMLDivElement>();
  const runwayRef = useRef<HTMLDivElement>(null);
  const nameId = headingId ?? `${def.id}-name`;
  const vars = { "--oos1e-h": `${height}px` } as CSSProperties;
  const content = (
    <>
      {headingId ? null : (
        <h2 id={nameId} {...stylex.props(base.srOnly)}>
          {def.english}
        </h2>
      )}
      {children}
    </>
  );

  return (
    <section
      id={def.id}
      aria-labelledby={nameId}
      style={vars}
      {...stylex.props(
        styles.slot,
        def.index > 0 && styles.slotOverlap,
        !runway && styles.slotLast,
      )}
    >
      <div
        ref={ref}
        inert={stacked && reachedIndex > def.index}
        {...stylex.props(styles.sheet, SHEET_TONES[def.tone])}
      >
        {runway ? (
          <CoveredBody runwayRef={runwayRef} stacked={stacked}>
            {content}
          </CoveredBody>
        ) : (
          <div {...stylex.props(styles.body)}>{content}</div>
        )}
      </div>
      {runway ? <div ref={runwayRef} aria-hidden="true" {...stylex.props(styles.runway)} /> : null}
    </section>
  );
}
