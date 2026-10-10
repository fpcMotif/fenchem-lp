import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";

import {
  AreaChips,
  LabSection,
  areaOf,
  padIndex,
  sheetRows,
  useSolutionsBrowser,
  type SheetRow,
  type SolutionItem,
} from "../kit";
import { bp, depth, face, motion, tone } from "../tokens.stylex";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const SCRIM = "oklch(0.22 0.04 261.5 / 0.32)";
const SOFT_SURFACE = "rgba(255, 255, 255, 0.6)";
const NO_BREAK_SPACE = String.fromCharCode(0xa0);
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1] ?? text, note: match[2] ?? null } : { primary: text, note: null };
};

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  list: {
    marginTop: { default: 20, [bp.xl]: 28 },
    padding: { default: 6, [bp.md]: 8, [bp.xl]: 12 },
    borderRadius: { default: 12, [bp.xl]: 16 },
    backgroundColor: tone.tintFill,
  },
  groupHead: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    marginInline: { default: 14, [bp.md]: 16, [bp.xl]: 20 },
    marginTop: 12,
    marginBottom: 0,
    paddingTop: 20,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRule,
  },
  groupHeadFirst: {
    marginTop: 0,
    paddingTop: 12,
    borderTopWidth: 0,
  },
  groupLabel: {
    fontSize: 13,
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintInk,
  },
  groupEnglish: {
    overflow: "hidden",
    fontFamily: face.display,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: tone.tintMuted,
  },
  groupCount: {
    flexShrink: 0,
    marginInlineStart: "auto",
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  rows: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.lg]: "repeat(2, minmax(0, 1fr))" },
    columnGap: 8,
    rowGap: 2,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  rowItem: {
    minWidth: 0,
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "24px minmax(0, 1fr) auto",
      [bp.md]: "28px minmax(0, 1fr) auto",
    },
    alignItems: "center",
    columnGap: { default: 12, [bp.md]: 16 },
    width: "100%",
    height: "100%",
    minHeight: 72,
    paddingBlock: 14,
    paddingInline: { default: 14, [bp.md]: 16, [bp.xl]: 20 },
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 12,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: "transparent", [bp.hover]: SOFT_SURFACE },
    },
    boxShadow: "none",
    fontFamily: "inherit",
    textAlign: "start",
    color: tone.tintInk,
    cursor: "pointer",
    transitionProperty: "background-color, box-shadow",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 0,
  },
  rowViewed: {
    backgroundColor: tone.paper,
    boxShadow: depth.lift,
  },
  rowIndex: {
    alignSelf: "start",
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  rowIndexViewed: {
    color: tone.ink,
  },
  rowText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  rowName: {
    fontSize: { default: 15, [bp.md]: 16 },
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: {
      default: tone.tintInk,
      [stylex.when.ancestor(":hover")]: { default: tone.tintInk, [bp.hover]: tone.accent },
    },
    textWrap: "pretty",
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
  },
  rowNameViewed: {
    color: tone.ink,
  },
  rowMeta: {
    overflow: "hidden",
    fontSize: 13,
    lineHeight: "20px",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  cue: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    color: {
      default: tone.tintMuted,
      [stylex.when.ancestor(":hover")]: { default: tone.tintMuted, [bp.hover]: tone.tintInk },
    },
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
  },
  cueLabel: {
    display: { default: "none", [bp.md]: "inline" },
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: { default: 0, [bp.hover]: 1 },
      [stylex.when.ancestor(":focus-visible")]: 1,
    },
    transform: {
      default: "translateX(4px)",
      [stylex.when.ancestor(":hover")]: { default: "translateX(4px)", [bp.hover]: "none" },
      [stylex.when.ancestor(":focus-visible")]: "none",
    },
    transitionProperty: "opacity, transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
  },
  cueLabelViewed: {
    display: "inline",
    opacity: 1,
    transform: "none",
    color: tone.tintBody,
  },
  cueGlyph: {
    display: "flex",
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hover]: "translateX(2px)" },
    },
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
  },

  dialog: {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100dvh",
    maxWidth: "none",
    maxHeight: "none",
    margin: 0,
    padding: 0,
    borderWidth: 0,
    overflow: "hidden",
    backgroundColor: "transparent",
    color: tone.tintInk,
    fontFamily: face.body,
    outlineStyle: "none",
    "::backdrop": {
      backgroundColor: "transparent",
    },
  },
  scrim: {
    position: "absolute",
    inset: 0,
    backgroundColor: SCRIM,
  },
  panel: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    width: "min(600px, 100%)",
    backgroundColor: tone.paper,
    boxShadow: depth.float,
  },
  head: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
    height: { default: 56, [bp.md]: 64 },
    paddingInlineStart: { default: 20, [bp.md]: 40 },
    paddingInlineEnd: { default: 8, [bp.md]: 16 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRuleSoft,
  },
  headMeta: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    flexGrow: 1,
    minWidth: 0,
  },
  headArea: {
    overflow: "hidden",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: tone.tintBody,
  },
  headCount: {
    flexShrink: 0,
    fontFamily: face.display,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  headCountCurrent: {
    color: tone.ink,
  },
  headActions: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    flexShrink: 0,
  },
  iconButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    padding: 0,
    borderWidth: 0,
    borderRadius: 999,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: "transparent", [bp.hover]: tone.tintFill },
    },
    color: tone.tintInk,
    cursor: "pointer",
    transform: { default: "none", ":active": "scale(0.96)" },
    transitionProperty: "background-color, color, transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 0,
  },
  iconButtonOff: {
    backgroundColor: "transparent",
    color: tone.tintMuted,
    opacity: 0.45,
    cursor: "default",
    transform: "none",
  },
  divider: {
    width: 1,
    height: 20,
    marginInline: 6,
    backgroundColor: tone.tintRule,
  },
  body: {
    flexGrow: 1,
    minHeight: 0,
    overflowY: "auto",
    overscrollBehavior: "contain",
    paddingInline: { default: 20, [bp.md]: 40 },
    paddingTop: { default: 28, [bp.md]: 40 },
    paddingBottom: { default: 40, [bp.md]: 56 },
  },
  sheet: {
    animationName: { default: "none", [bp.motionOk]: fadeIn },
    animationDuration: "180ms",
    animationTimingFunction: motion.easeOut,
  },
  title: {
    margin: 0,
    fontSize: { default: 22, [bp.md]: 26 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.04em",
    color: tone.tintInk,
    textWrap: "balance",
    outlineStyle: "none",
  },
  english: {
    margin: 0,
    marginTop: 6,
    fontFamily: face.display,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: tone.tintMuted,
  },
  subtitle: {
    margin: 0,
    marginTop: 14,
    fontSize: 15,
    lineHeight: 1.7,
    color: tone.tintBody,
    textWrap: "pretty",
  },
  fields: {
    margin: 0,
    marginTop: { default: 28, [bp.md]: 36 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRuleSoft,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.md]: "96px minmax(0, 1fr)" },
    columnGap: 24,
    rowGap: 6,
    paddingBlock: { default: 16, [bp.md]: 18 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.06em",
    color: tone.tintMuted,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: tone.tintInk,
    textWrap: "pretty",
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  muted: {
    color: tone.tintBody,
  },
  strong: {
    fontWeight: 500,
  },
  absent: {
    color: tone.tintMuted,
  },
  keepWords: {
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
  note: {
    marginInlineStart: 6,
    fontSize: 13,
    color: tone.tintMuted,
  },
  nextCard: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "center",
    columnGap: 16,
    width: "100%",
    marginTop: 32,
    paddingBlock: 18,
    paddingInline: 20,
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 12,
    backgroundColor: {
      default: tone.tintFill,
      ":hover": { default: tone.tintFill, [bp.hover]: tone.accentSoft },
    },
    fontFamily: "inherit",
    textAlign: "start",
    color: tone.tintMuted,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  nextText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  nextLabel: {
    fontSize: 12,
    lineHeight: "18px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
});

function RowValue({ row }: { row: SheetRow }) {
  if (row.values.length === 0) return <span {...stylex.props(styles.absent)}>无</span>;
  if (row.kind === "strong") {
    return <span {...stylex.props(styles.strong)}>{row.values.join(" · ")}</span>;
  }
  if (row.kind === "lines") {
    return (
      <ul {...stylex.props(styles.lines, styles.muted)}>
        {row.values.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    );
  }
  if (row.kind === "list") {
    return (
      <ul {...stylex.props(styles.lines)}>
        {row.values.map((value) => {
          const { primary, note } = splitNote(value);
          return (
            <li key={value} {...stylex.props(styles.keepWords)}>
              <span {...stylex.props(styles.strong)}>
                {primary.replaceAll(" / ", `${NO_BREAK_SPACE}/ `)}
              </span>
              {note && <span {...stylex.props(styles.note)}>{note}</span>}
            </li>
          );
        })}
      </ul>
    );
  }
  return <>{row.values.join("、")}</>;
}

function Sheet({
  item,
  titleId,
  titleRef,
}: {
  item: SolutionItem;
  titleId: string;
  titleRef: RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div {...stylex.props(styles.sheet)}>
      <h2 ref={titleRef} id={titleId} tabIndex={-1} {...stylex.props(styles.title)}>
        {item.title}
      </h2>
      <p lang="en" {...stylex.props(styles.english)}>
        {item.englishName}
      </p>
      <p {...stylex.props(styles.subtitle)}>{item.subtitle}</p>
      <dl {...stylex.props(styles.fields)}>
        {sheetRows(item).map((row) => (
          <div key={row.label} {...stylex.props(styles.field)}>
            <dt {...stylex.props(styles.fieldLabel)}>{row.label}</dt>
            <dd {...stylex.props(styles.fieldValue)}>
              <RowValue row={row} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function DrawerVariant() {
  const browser = useSolutionsBrowser();
  const { area, scope, groups, selected, position, select } = browser;
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [viewedId, setViewedId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const refocusTitle = useRef(false);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    if (!dialog.open) dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });
    const root = document.documentElement;
    const overflow = root.style.overflow;
    const gutter = root.style.getPropertyValue("scrollbar-gutter");
    root.style.overflow = "hidden";
    root.style.setProperty("scrollbar-gutter", "stable");
    return () => {
      root.style.overflow = overflow;
      root.style.setProperty("scrollbar-gutter", gutter);
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
    if (!refocusTitle.current) return;
    refocusTitle.current = false;
    titleRef.current?.focus({ preventScroll: true });
  }, [selected?.id]);

  if (!selected) return null;

  const previous = scope[position - 1];
  const next = scope[position + 1];
  const isAll = area === "all";

  const open = (id: string) => {
    select(id);
    setViewedId(id);
    setAnnouncement("");
    setOpen(true);
  };

  const step = (delta: number) => {
    const target = scope[position + delta];
    if (!target) return;
    refocusTitle.current = !!bodyRef.current?.contains(document.activeElement);
    select(target.id);
    setViewedId(target.id);
    setAnnouncement(`${padIndex(position + delta)} / ${padIndex(scope.length - 1)} ${target.title}`);
  };

  const handleClosed = () => {
    setOpen(false);
    const row = listRef.current?.querySelector<HTMLElement>(
      `[data-row="${CSS.escape(viewedId ?? selected.id)}"]`,
    );
    row?.focus();
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    event.stopPropagation();
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    step(event.key === "ArrowLeft" ? -1 : 1);
  };

  const renderRow = (item: SolutionItem) => {
    const isViewed = item.id === viewedId;
    return (
      <li key={item.id} {...stylex.props(styles.rowItem)}>
        <button
          type="button"
          data-row={item.id}
          aria-haspopup="dialog"
          onClick={() => open(item.id)}
          {...stylex.props(styles.row, isViewed && styles.rowViewed, stylex.defaultMarker())}
        >
          <span {...stylex.props(styles.rowIndex, isViewed && styles.rowIndexViewed)}>
            {padIndex(scope.indexOf(item))}
          </span>
          <span {...stylex.props(styles.rowText)}>
            <span {...stylex.props(styles.rowName, isViewed && styles.rowNameViewed)}>
              {item.title}
            </span>
            <span {...stylex.props(styles.rowMeta)}>{item.functions.join(" · ")}</span>
          </span>
          <span {...stylex.props(styles.cue)}>
            <span {...stylex.props(styles.cueLabel, isViewed && styles.cueLabelViewed)}>
              {isViewed ? "上次查看" : "查看"}
            </span>
            <span aria-hidden="true" {...stylex.props(styles.cueGlyph)}>
              <ChevronRight size={16} strokeWidth={1.5} absoluteStrokeWidth />
            </span>
          </span>
        </button>
      </li>
    );
  };

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <div ref={listRef} {...stylex.props(styles.list)}>
        {isAll ? (
          groups.map((group, index) => (
            <section key={group.id} aria-labelledby={`${titleId}-${group.id}`}>
              <h3
                id={`${titleId}-${group.id}`}
                {...stylex.props(styles.groupHead, index === 0 && styles.groupHeadFirst)}
              >
                <span {...stylex.props(styles.groupLabel)}>{group.label}</span>
                <span lang="en" aria-hidden="true" {...stylex.props(styles.groupEnglish)}>
                  {group.englishLabel}
                </span>
                <span {...stylex.props(styles.groupCount)}>{group.items.length} 款</span>
              </h3>
              <ul {...stylex.props(styles.rows)}>{group.items.map(renderRow)}</ul>
            </section>
          ))
        ) : (
          <ul aria-label={areaOf(selected.area)?.label} {...stylex.props(styles.rows)}>
            {scope.map(renderRow)}
          </ul>
        )}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClose={handleClosed}
        onKeyDown={handleDialogKeyDown}
        {...stylex.props(styles.dialog)}
      >
        <AnimatePresence onExitComplete={() => dialogRef.current?.close()}>
          {isOpen && (
            <m.div
              key="scrim"
              aria-hidden="true"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.26, ease: EASE_OUT } }}
              exit={{ opacity: 0, transition: { duration: 0.18, ease: EASE_OUT } }}
              {...stylex.props(styles.scrim)}
            />
          )}
          {isOpen && (
            <m.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0, transition: { duration: 0.26, ease: EASE_OUT } }}
              exit={{ x: "100%", transition: { duration: 0.18, ease: EASE_OUT } }}
              {...stylex.props(styles.panel)}
            >
              <header {...stylex.props(styles.head)}>
                <p {...stylex.props(styles.headMeta)}>
                  <span {...stylex.props(styles.headArea)}>{areaOf(selected.area)?.label}</span>
                  <span {...stylex.props(styles.headCount)}>
                    <span {...stylex.props(styles.headCountCurrent)}>{padIndex(position)}</span>
                    {` / ${padIndex(scope.length - 1)}`}
                  </span>
                </p>
                <div {...stylex.props(styles.headActions)}>
                  <button
                    type="button"
                    aria-label="上一个方案"
                    aria-keyshortcuts="ArrowLeft"
                    aria-disabled={!previous}
                    onClick={() => step(-1)}
                    {...stylex.props(styles.iconButton, !previous && styles.iconButtonOff)}
                  >
                    <ChevronLeft size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="下一个方案"
                    aria-keyshortcuts="ArrowRight"
                    aria-disabled={!next}
                    onClick={() => step(1)}
                    {...stylex.props(styles.iconButton, !next && styles.iconButtonOff)}
                  >
                    <ChevronRight size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                  </button>
                  <span aria-hidden="true" {...stylex.props(styles.divider)} />
                  <button
                    type="button"
                    aria-label="关闭"
                    onClick={() => setOpen(false)}
                    {...stylex.props(styles.iconButton)}
                  >
                    <X size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                  </button>
                </div>
              </header>
              <div ref={bodyRef} {...stylex.props(styles.body)}>
                <Sheet key={selected.id} item={selected} titleId={titleId} titleRef={titleRef} />
                {next && (
                  <button
                    type="button"
                    onClick={() => step(1)}
                    {...stylex.props(styles.nextCard, stylex.defaultMarker())}
                  >
                    <span {...stylex.props(styles.nextText)}>
                      <span {...stylex.props(styles.nextLabel)}>下一个方案</span>
                      <span {...stylex.props(styles.rowName)}>{next.title}</span>
                    </span>
                    <span aria-hidden="true" {...stylex.props(styles.cueGlyph)}>
                      <ChevronRight size={18} strokeWidth={1.5} absoluteStrokeWidth />
                    </span>
                  </button>
                )}
              </div>
              <p aria-live="polite" {...stylex.props(styles.srOnly)}>
                {announcement}
              </p>
            </m.div>
          )}
        </AnimatePresence>
      </dialog>
    </LabSection>
  );
}
