import { useMotionValue, useMotionValueEvent, useScroll, type MotionValue } from "motion/react";
import { createContext, useContext, useEffect, useRef, type RefObject } from "react";

export const DAY_START = 9;
export const DAY_END = 13;
export const STILL_HOUR = 10;
export const DEG_PER_HOUR = 24;

export const SECTION_HOURS = {
  profile: 10 + 10 / 60,
  campus: 10 + 20 / 60,
  culture: 11,
  csr: 11.5,
  honor: 12,
  structure: 12.5,
  closing: 13,
} as const;

export function hourAngle(hour: number) {
  return (12 - hour) * DEG_PER_HOUR;
}

export function sunAt(hour: number) {
  const deg = hourAngle(hour);
  const rad = (deg * Math.PI) / 180;
  const length = 0.5 + 1.9 * Math.pow(Math.abs(hour - 12) / 3, 1.4);
  return {
    deg,
    ux: length * Math.sin(rad),
    uy: length * Math.cos(rad),
    day: 1 - (Math.abs(hour - 12) / 3) * 0.7,
  };
}

export function clock(hour: number) {
  const total = Math.round(hour * 60);
  const h24 = Math.floor(total / 60);
  const minutes = String(total % 60).padStart(2, "0");
  const h12 = h24 > 12 ? h24 - 12 : h24;
  return { time: `${h12}:${minutes}`, half: h24 >= 12 ? "p.m." : "a.m." };
}

function paint(element: HTMLElement | null, hour: number) {
  if (!element) return;
  const sun = sunAt(hour);
  element.style.setProperty("--sun-deg", sun.deg.toFixed(3));
  element.style.setProperty("--sun-ux", sun.ux.toFixed(4));
  element.style.setProperty("--sun-uy", sun.uy.toFixed(4));
  element.style.setProperty("--sun-len", Math.hypot(sun.ux, sun.uy).toFixed(4));
  element.style.setProperty("--sun-day", sun.day.toFixed(4));
}

type Stop = { y: number; hour: number };

function hourFromStops(stops: readonly Stop[], y: number) {
  if (stops.length === 0) return DAY_START;
  if (y <= stops[0].y) return stops[0].hour;
  for (let i = 1; i < stops.length; i++) {
    const next = stops[i];
    if (y <= next.y) {
      const prev = stops[i - 1];
      return prev.hour + ((y - prev.y) / (next.y - prev.y)) * (next.hour - prev.hour);
    }
  }
  return stops[stops.length - 1].hour;
}

function measureStops(root: HTMLElement): Stop[] {
  const viewport = window.innerHeight;
  const stops: Stop[] = [{ y: 0, hour: DAY_START }];
  const push = (y: number, hour: number) => {
    stops.push({ y: Math.max(y, stops[stops.length - 1].y + 1), hour });
  };
  for (const mark of root.querySelectorAll<HTMLElement>("[data-hour]")) {
    const top = mark.getBoundingClientRect().top + window.scrollY;
    const y = mark.dataset.hourAt === "release" ? top - viewport : top - viewport * 0.5;
    push(y, Number(mark.dataset.hour));
  }
  push(document.documentElement.scrollHeight - viewport, DAY_END);
  return stops;
}

export function useSunClock(root: RefObject<HTMLElement | null>, still: boolean) {
  const hour = useMotionValue(DAY_START);
  const stops = useRef<Stop[]>([]);
  const { scrollY } = useScroll();

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    if (still) {
      hour.set(STILL_HOUR);
      paint(element, STILL_HOUR);
      return;
    }
    const measure = () => {
      stops.current = measureStops(element);
      hour.set(hourFromStops(stops.current, window.scrollY));
      paint(element, hour.get());
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [root, still, hour]);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (!still) hour.set(hourFromStops(stops.current, y));
  });
  useMotionValueEvent(hour, "change", (value) => paint(root.current, value));

  return hour;
}

export const SunContext = createContext<MotionValue<number> | null>(null);

export function useSunHour() {
  const hour = useContext(SunContext);
  if (!hour) throw new Error("useSunHour must be used inside the sundial page");
  return hour;
}
