import { m } from "@/compat/motion";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useScroll, useTransform } from "@/compat/motion";
import { createSignal, useContext, type Accessor } from "solid-js";
import type { JSX } from "@solidjs/web";
import { useBoxHeight } from "./hooks";
import { base } from "./shared-values";
import type { SheetDef } from "./sheets";
import { color, font, media, metric } from "./tokens.stylex";
import { StackContext } from "./sheet-values";

// stylex.attrs with reactive (accessor) arguments resolves at runtime here, because
// the StyleX compiler tries to evaluate them at build time and throws.
const sxProps: typeof stylex.attrs = (...args) => stylex.attrs(...args);

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

function CoveredBody(props: {
  runway: Accessor<HTMLDivElement | undefined>;
  stacked: boolean;
  children: JSX.Element;
}) {
  const { scrollYProgress } = useScroll({ target: props.runway, offset: ["start end", "end end"] });
  const opacity = useTransform(scrollYProgress, COVERED_RANGE, COVERED_OPACITY);
  return (
    <m.div style={props.stacked ? { opacity } : undefined} {...stylex.attrs(styles.body)}>
      {props.children}
    </m.div>
  );
}

export function Sheet(props: {
  def: SheetDef;
  headingId?: string;
  runway?: boolean;
  children: JSX.Element;
}) {
  const stack = useContext(StackContext);
  const [ref, height] = useBoxHeight<HTMLDivElement>();
  const [runwayEl, setRunwayEl] = createSignal<HTMLDivElement>();
  const runway = () => props.runway ?? true;
  const nameId = () => props.headingId ?? `${props.def.id}-name`;
  const content = (
    <>
      {props.headingId ? null : (
        <h2 id={nameId()} {...stylex.attrs(base.srOnly)}>
          {props.def.english}
        </h2>
      )}
      {props.children}
    </>
  );

  return (
    <section
      id={props.def.id}
      aria-labelledby={nameId()}
      {...sxProps(
        styles.slot,
        props.def.index > 0 && styles.slotOverlap,
        !runway() && styles.slotLast,
      )}
      style={{ "--oos1e-h": `${height()}px` }}
    >
      <div
        ref={ref}
        inert={stack.stacked && stack.reachedIndex > props.def.index}
        {...stylex.attrs(styles.sheet, SHEET_TONES[props.def.tone])}
      >
        {runway() ? (
          <CoveredBody runway={runwayEl} stacked={stack.stacked}>
            {content}
          </CoveredBody>
        ) : (
          <div {...stylex.attrs(styles.body)}>{content}</div>
        )}
      </div>
      {runway() ? (
        <div ref={setRunwayEl} aria-hidden="true" {...stylex.attrs(styles.runway)} />
      ) : null}
    </section>
  );
}
