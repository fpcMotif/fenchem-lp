import { useEffect, type RefObject } from "react";

const MIN_LAST_LINE_FILL = 0.5;
// Kinsoku can push a character to the next line, so leave room for two.
const LINE_BREAK_SLACK = 2;
const MIN_WIDTH_SHARE = 0.75;
const MAX_ADVANCE = 1.08;

const endsWell = (length: number, columns: number) => {
  const last = length - (Math.ceil(length / columns) - 1) * columns;
  return last >= columns * MIN_LAST_LINE_FILL && columns - last >= LINE_BREAK_SLACK;
};

/** Widest shared width, in em, at which every paragraph's last line is at least half full. */
export function balancedColumns(room: number, lengths: readonly number[]) {
  const narrowest = Math.ceil(room * MIN_WIDTH_SHARE);
  for (const maxAdvance of [1, MAX_ADVANCE]) {
    for (let width = room; width >= narrowest; width--) {
      const columns = lengths.map((length) => {
        for (let count = width; count >= Math.ceil(width / maxAdvance); count--) {
          if (endsWell(length, count)) return count;
        }
        return 0;
      });
      if (columns.every(Boolean)) return { width, columns };
    }
  }
  return undefined;
}

/** Sizes every `[data-balanced]` paragraph under the root to whole-character lines. */
export function useBalancedColumns(rootRef: RefObject<HTMLElement | null>, maxColumns: number) {
  useEffect(() => {
    const texts = Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>("[data-balanced]") ?? [],
    );
    const context = document.createElement("canvas").getContext("2d");
    if (!texts.length || !context) return;
    const measure = () => {
      const em = parseFloat(getComputedStyle(texts[0]).fontSize);
      const frame = Math.min(...texts.map((text) => text.parentElement?.clientWidth ?? 0));
      const lengths = texts.map((text) => {
        const style = getComputedStyle(text);
        context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        return context.measureText(text.textContent ?? "").width / em;
      });
      const layout = balancedColumns(Math.min(maxColumns, Math.floor(frame / em)), lengths);
      texts.forEach((text, index) => {
        const spacing = layout ? layout.width / layout.columns[index] - 1 : 0;
        text.style.inlineSize = layout ? `${layout.width}em` : "";
        text.style.letterSpacing = spacing ? `${spacing.toFixed(4)}em` : "";
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    for (const frame of new Set(texts.map((text) => text.parentElement))) {
      if (frame) observer.observe(frame);
    }
    void document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [rootRef, maxColumns]);
}
