import { useEffect, type RefObject } from "react";

import { UNITS } from "./sentence";
import { BAR_PX, HEADER_PX } from "./shared";

const INK = "#1a1a1a";
const CONDENSE_RANGE_VH = 0.24;
const CONDENSE_RANGE_MAX = 220;
const CONDENSE_RANGE_LINES = 2;
const ARRIVE = 0.84;
const HANDOFF = 0.88;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (from: number, to: number, value: number) => {
  const t = clamp01((value - from) / (to - from));
  return t * t * (3 - 2 * t);
};

function collect(scope: HTMLElement, selector: string, key: string) {
  const found: HTMLElement[] = [];
  for (const element of scope.querySelectorAll<HTMLElement>(selector)) {
    found[Number(element.dataset[key])] = element;
  }
  return found;
}

export function useSentence(
  rootRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLOListElement | null>,
  reduce: boolean,
) {
  useEffect(() => {
    const root = rootRef.current;
    const bar = barRef.current;
    const track = trackRef.current;
    if (!root || !bar || !track) return;

    const count = UNITS.length;
    const lines = collect(root, "[data-unit]", "unit");
    const slots = collect(track, "[data-slot]", "slot");
    const inks = lines.map((line) => line.querySelector<HTMLElement>("span"));
    const links = slots.map((slot) => slot.querySelector<HTMLElement>("a"));
    const ellipsis = track.querySelector<HTMLElement>("[data-ellipsis]");
    if (lines.length !== count || slots.length !== count) return;

    const followers = lines.map((): HTMLElement[] => []);
    for (const element of root.querySelectorAll<HTMLElement>("[data-follows]")) {
      followers[Number(element.dataset.follows)]?.push(element);
    }
    const hinged = lines.map((line) => line.dataset.hinge === "true");
    const last = Array.from({ length: count }, () => -1);
    let widths: number[] = [];
    let fontPx: number[] = [];
    let linePx: number[] = [];
    let barFont = 15;
    let newest = -2;
    let frame = 0;
    let disposed = false;

    const measure = () => {
      widths = links.map((link) => link?.getBoundingClientRect().width ?? 0);
      fontPx = inks.map((ink) => (ink ? Number.parseFloat(getComputedStyle(ink).fontSize) : 1));
      linePx = inks.map((ink) => (ink ? Number.parseFloat(getComputedStyle(ink).lineHeight) : 1));
      barFont = Number.parseFloat(getComputedStyle(track).fontSize);
      last.fill(-1);
      newest = -2;
    };

    const update = () => {
      frame = 0;
      const barBottom = HEADER_PX + BAR_PX;
      const reach = Math.min(window.innerHeight * CONDENSE_RANGE_VH, CONDENSE_RANGE_MAX);
      const rects = lines.map((line) => line.getBoundingClientRect());
      const progress = rects.map((rect, index) => {
        if (reduce) return rect.top + linePx[index] / 2 < barBottom ? 1 : 0;
        const start = barBottom + Math.min(reach, linePx[index] * CONDENSE_RANGE_LINES);
        const end = barBottom - linePx[index] * 0.5;
        return clamp01((start - rect.top) / (start - end));
      });
      const rooms = progress.map((value) => (reduce ? value : smooth(0.62, 0.8, value)));
      const trailing: number[] = [];
      let open = 0;
      for (let index = count - 1; index >= 0; index--) {
        trailing[index] = open;
        open += rooms[index] * widths[index];
      }
      let current = -1;
      for (let index = 0; index < count; index++) if (rooms[index] >= 1) current = index;
      const section = current >= 0 ? UNITS[current].section : null;
      const colorOf = (index: number) =>
        progress[index] < 1 || UNITS[index].section === section ? INK : "";

      let changed = false;
      for (let index = 0; index < count; index++) {
        const value = progress[index];
        if (value === last[index]) continue;
        last[index] = value;
        changed = true;
        const room = rooms[index];
        const slot = slots[index];
        slot.style.width = room >= 1 ? "auto" : `${(room * widths[index]).toFixed(2)}px`;
        slot.style.visibility = room > 0 ? "visible" : "hidden";
        const link = links[index];
        const ink = inks[index];
        if (reduce || !link || !ink) continue;
        link.style.color = colorOf(index);
        link.style.opacity = String(smooth(HANDOFF, 1, value));
        for (const follower of followers[index]) {
          follower.style.opacity = String(1 - smooth(0, 0.22, value));
        }
        if (value <= 0) {
          ink.style.transform = "";
          ink.style.opacity = "";
        } else if (value >= 1) {
          ink.style.opacity = "0";
        }
      }
      if (!changed) return;

      const overflow = open - track.clientWidth;
      if (!track.contains(document.activeElement)) track.scrollLeft = Math.max(0, overflow);
      if (ellipsis) ellipsis.style.display = overflow > 1 ? "block" : "none";
      const reveal = reduce ? progress[0] : smooth(0, 0.35, progress[0]);
      bar.style.visibility = reveal > 0 ? "visible" : "hidden";
      bar.style.opacity = String(reveal);
      bar.style.transform = `translateY(${((reveal - 1) * 100).toFixed(2)}%)`;

      if (!reduce) {
        const docking = progress.flatMap((value, index) => (value > 0 && value < 1 ? [index] : []));
        const slotRects = docking.map((index) => links[index]?.getBoundingClientRect());
        const trackRight = track.getBoundingClientRect().right;
        const subjectEnd =
          ellipsis?.style.display === "block"
            ? ellipsis.getBoundingClientRect().right
            : (slots[0]?.getBoundingClientRect().right ?? 0);
        docking.forEach((index, at) => {
          const slotRect = slotRects[at];
          const ink = inks[index];
          if (!slotRect || !ink) return;
          const value = progress[index];
          const finalScale = barFont / fontPx[index];
          const shrink = smooth(0.04, ARRIVE, value);
          const rise = clamp01(value / ARRIVE) ** 2;
          const scale = 1 + (finalScale - 1) * shrink;
          const targetTop = slotRect.top + slotRect.height / 2 - (finalScale * linePx[index]) / 2;
          const slotEnd = rooms[index] < 1 ? trackRight - trailing[index] : slotRect.right;
          const clearOfSubject = index > 0 ? subjectEnd + widths[index] : -Infinity;
          const textEnd =
            Math.max(Math.min(slotEnd, slotRect.right), clearOfSubject) -
            (hinged[index] ? barFont : 0);
          const x = shrink * (textEnd - rects[index].right);
          const y = rise * (targetTop - rects[index].top);
          ink.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
          ink.style.opacity = String(1 - smooth(HANDOFF, 1, value));
        });
      }

      if (current === newest) return;
      newest = current;
      links.forEach((link, index) => {
        if (!link) return;
        link.style.color = colorOf(index);
        if (index === current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      if (disposed) return;
      measure();
      schedule();
    };

    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    document.fonts.addEventListener("loadingdone", remeasure);
    void document.fonts.ready.then(remeasure);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      document.fonts.removeEventListener("loadingdone", remeasure);
      for (const ink of inks) ink?.style.removeProperty("transform");
      for (const ink of inks) ink?.style.removeProperty("opacity");
      for (const follower of followers.flat()) follower.style.removeProperty("opacity");
      for (const slot of slots) slot.removeAttribute("style");
      for (const link of links) link?.removeAttribute("style");
      for (const link of links) link?.removeAttribute("aria-current");
      bar.removeAttribute("style");
      ellipsis?.removeAttribute("style");
    };
  }, [rootRef, barRef, trackRef, reduce]);
}
