import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowUpRight } from "lucide-react";
import { useId, useRef, useState } from "react";

import { FLAT_FORMULAS, padIndex } from "../shared/derived";
import { SheetDialog } from "./sheet-dialog";
import { font, media, motionCss, tone } from "./tokens.stylex";

const HEADER_HEIGHT = 80;
const COUNT = FLAT_FORMULAS.length;

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [media.desktop]: 96 },
    paddingBottom: { default: 72, [media.desktop]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: tone.mint,
    color: tone.ink,
    fontFamily: font.body,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [media.tablet]: 40, [media.desktop]: "min(120px, 8.333vw)" },
  },
  head: {
    marginBottom: { default: 32, [media.desktop]: 48 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 28, [media.desktop]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [media.tablet]: "36px", [media.desktop]: "40px" },
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  meta: {
    margin: 0,
    marginTop: 12,
    fontSize: 14,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    color: tone.muted,
  },
  metaCount: {
    fontFamily: font.numeral,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: tone.ink,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [media.tablet]: "repeat(3, minmax(0, 1fr))",
      [media.desktop]: "repeat(5, minmax(0, 1fr))",
    },
    gap: { default: 12, [media.tablet]: 16, [media.desktop]: 24 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  item: {
    display: "flex",
    minWidth: 0,
  },
  card: {
    appearance: "none",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: { default: 200, [media.desktop]: 220 },
    padding: 0,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: tone.mintRule, ":hover": tone.mintRuleStrong },
    borderRadius: 2,
    backgroundColor: tone.paper,
    boxShadow: "0 1px 2px rgba(20, 36, 43, 0.04)",
    fontFamily: "inherit",
    textAlign: "start",
    color: tone.ink,
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [media.motionOk]: "scale(0.98)" },
    },
    transitionProperty: "border-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: motionCss.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  cardHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44,
    paddingInline: { default: 14, [media.md]: 20 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.mintHairline,
  },
  cardIndex: {
    fontFamily: font.numeral,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: {
      default: tone.muted,
      [stylex.when.ancestor(":hover")]: colors.brandGreen700,
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  cardArrow: {
    display: "flex",
    color: {
      default: tone.muted,
      [stylex.when.ancestor(":hover")]: colors.brandBlue700,
    },
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: { default: null, [media.motionOk]: "translate(2px, -2px)" },
    },
    transitionProperty: "color, transform",
    transitionDuration: "200ms",
    transitionTimingFunction: motionCss.out,
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: 8,
    paddingInline: { default: 14, [media.md]: 20 },
    paddingTop: { default: 16, [media.md]: 20 },
    paddingBottom: 20,
  },
  cardTitle: {
    fontSize: { default: 15, [media.md]: 16 },
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: {
      default: tone.ink,
      [stylex.when.ancestor(":hover")]: colors.brandBlue700,
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  cardSubtitle: {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    fontSize: 13,
    lineHeight: "20px",
    color: tone.body,
    textWrap: "pretty",
  },
  cardFoot: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    minWidth: 0,
    paddingInline: { default: 14, [media.md]: 20 },
    paddingBlock: 12,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.mintHairline,
    fontSize: 12,
    lineHeight: "18px",
  },
  footLabel: {
    flexShrink: 0,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: tone.muted,
  },
  footValue: {
    minWidth: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: tone.body,
  },
});

export function Solutions() {
  const titleId = useId();
  const dialogId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const open = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setDirection(1);
    setOpenIndex(index);
  };

  const route = (delta: 1 | -1) => {
    setDirection(delta);
    setOpenIndex((current) => (current === null ? current : (current + delta + COUNT) % COUNT));
  };

  const close = () => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  };

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            应用方案
          </h2>
          <p {...stylex.props(styles.meta)}>
            共 <span {...stylex.props(styles.metaCount)}>{COUNT}</span> 款配方
          </p>
        </header>
        <ol {...stylex.props(styles.grid)}>
          {FLAT_FORMULAS.map((formula) => (
            <li key={formula.id} {...stylex.props(styles.item)}>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-controls={dialogId}
                onClick={(event) => open(formula.index, event.currentTarget)}
                {...stylex.props(styles.card, stylex.defaultMarker())}
              >
                <span {...stylex.props(styles.cardHead)}>
                  <span {...stylex.props(styles.cardIndex)}>{padIndex(formula.index)}</span>
                  <span aria-hidden="true" {...stylex.props(styles.cardArrow)}>
                    <ArrowUpRight size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </span>
                </span>
                <span {...stylex.props(styles.cardBody)}>
                  <span {...stylex.props(styles.cardTitle)}>{formula.title}</span>
                  <span {...stylex.props(styles.cardSubtitle)}>{formula.subtitle}</span>
                </span>
                {formula.texture[0] && (
                  <span {...stylex.props(styles.cardFoot)}>
                    <span {...stylex.props(styles.footLabel)}>质地</span>
                    <span {...stylex.props(styles.footValue)}>{formula.texture[0]}</span>
                  </span>
                )}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <SheetDialog
        id={dialogId}
        index={openIndex}
        direction={direction}
        onRoute={route}
        onClose={close}
      />
    </section>
  );
}
