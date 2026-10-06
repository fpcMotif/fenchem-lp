import * as stylex from "@stylexjs/stylex";
import {
  m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { type Plate, PLATES } from "./plates";
import { Registration } from "./registration";
import { srOnly, ui } from "./shared";
import { bp, chrome, face, sky } from "./tokens.stylex";

const LAST = PLATES.length - 1;
const SMALL = 0.19;

type Geometry = { width: number; height: number; plateW: number; plateH: number; radius: number };

function measure(width: number, height: number): Geometry {
  const plateW = Math.max(320, Math.min(width * 0.45, (height - 300) * 1.5, 640));
  return { width, height, plateW, plateH: plateW / 1.5, radius: width / 2 - plateW / 2 };
}

function stations(geometry: Geometry) {
  const clear = (geometry.plateH * (1 + SMALL)) / 2 + 20;
  const first = Math.asin(Math.min(0.97, clear / geometry.radius));
  const step = (geometry.plateW * SMALL + 30) / geometry.radius;
  return [0, first, first + step, first + step * 2];
}

function angleFor(offset: number, geometry: Geometry) {
  const steps = stations(geometry);
  const distance = Math.min(Math.abs(offset), 3);
  const whole = Math.floor(distance);
  const angle =
    whole >= 3 ? steps[3] : steps[whole] + (steps[whole + 1] - steps[whole]) * (distance - whole);
  return Math.sign(offset) * angle;
}

function place(offset: number, width: number, height: number) {
  const geometry = measure(width, height);
  const angle = angleFor(offset, geometry);
  return {
    x: width / 2 - geometry.radius * Math.cos(angle) - geometry.plateW / 2,
    y: height / 2 + geometry.radius * Math.sin(angle) - geometry.plateH / 2,
  };
}

function detent(position: number) {
  const whole = Math.floor(position);
  const travel = Math.min(1, Math.max(0, (position - whole - 0.22) / 0.56));
  return whole + travel * travel * (3 - 2 * travel);
}

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  track: {
    display: { default: "none", [bp.desktop]: "block" },
    height: "calc(100svh - 80px + 372svh)",
  },
  pin: {
    position: "sticky",
    top: chrome.header,
    height: chrome.sky,
  },
  stage: {
    position: "relative",
    height: "100%",
  },
  arc: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
  },
  arcLine: {
    fill: "none",
    stroke: sky.tint,
    strokeOpacity: 0.34,
    strokeWidth: 1,
  },
  station: {
    stroke: sky.tint,
    strokeOpacity: 0.55,
    strokeWidth: 1,
  },
  poleRing: {
    fill: "none",
    stroke: sky.tint,
    strokeOpacity: 0.5,
    strokeWidth: 1,
  },
  polePoint: {
    fill: sky.star,
  },
  frame: {
    position: "absolute",
    left: 0,
    pointerEvents: "none",
  },
  plate: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    padding: 10,
    borderWidth: 0,
    backgroundColor: sky.navy,
    boxShadow: `inset 0 0 0 1px ${sky.hairStrong}`,
    cursor: "zoom-in",
    transformOrigin: "50% 50%",
  },
  glass: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  card: {
    position: "absolute",
    top: "50%",
    right: 0,
    width: { default: 340, [bp.wide]: 380 },
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  entry: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    animationName: fadeIn,
    animationDuration: "420ms",
    animationTimingFunction: chrome.ease,
  },
  plateWord: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
  },
  numeral: {
    fontSize: 96,
    lineHeight: 0.9,
    color: sky.star,
  },
  caption: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: 30,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: sky.star,
  },
  english: {
    margin: 0,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 22,
    color: sky.muted,
  },
  note: {
    marginTop: 6,
  },
  register: {
    display: "flex",
    gap: 4,
    margin: 0,
    padding: 0,
    paddingTop: 20,
    listStyleType: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: sky.hair,
  },
  registerButton: {
    minWidth: 40,
    height: 40,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 20,
    color: { default: sky.faint, ":hover": sky.star },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "200ms",
  },
  registerActive: {
    color: sky.star,
    textDecorationLine: "underline",
    textDecorationThickness: 1,
    textUnderlineOffset: 8,
  },
});

const sized = stylex.create({
  frame: (top: number, width: number, height: number) => ({ top, width, height }),
  focus: (value: string) => ({ objectPosition: value }),
});

function ArcPlate({
  plate,
  index,
  position,
  width,
  height,
  onOpen,
  onFocus,
}: {
  plate: Plate;
  index: number;
  position: MotionValue<number>;
  width: MotionValue<number>;
  height: MotionValue<number>;
  onOpen: (index: number) => void;
  onFocus: (index: number) => void;
}) {
  const offset = useTransform(position, (value) => index - value);
  const x = useTransform<number, number>([offset, width, height], ([o, w, h]) => place(o, w, h).x);
  const y = useTransform<number, number>([offset, width, height], ([o, w, h]) => place(o, w, h).y);
  const plateW = useTransform<number, number>([width, height], ([w, h]) => measure(w, h).plateW);
  const plateH = useTransform<number, number>([width, height], ([w, h]) => measure(w, h).plateH);
  const scale = useTransform(
    offset,
    (o) => SMALL + (1 - SMALL) * (0.5 + 0.5 * Math.cos(Math.PI * Math.min(1, Math.abs(o)))),
  );
  const opacity = useTransform(offset, (o) =>
    Math.max(0, Math.min(1, 1 - (Math.abs(o) - 2) / 0.7)),
  );
  const zIndex = useTransform(offset, (o) => 20 - Math.round(Math.abs(o) * 4));
  const pointerEvents = useTransform(offset, (o) => (Math.abs(o) > 2.4 ? "none" : "auto"));

  return (
    <m.button
      type="button"
      onClick={() => onOpen(index)}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) onFocus(index);
      }}
      style={{ x, y, scale, opacity, zIndex, pointerEvents, width: plateW, height: plateH }}
      {...stylex.props(styles.plate, ui.focusable)}
    >
      <img
        src={plate.src}
        alt={plate.alt}
        loading="lazy"
        decoding="async"
        {...stylex.props(styles.glass, sized.focus(plate.focus))}
      />
      <span {...srOnly}>
        Plate {plate.numeral} · {plate.caption}，查看大图
      </span>
    </m.button>
  );
}

export function PlateArc({ onOpen }: { onOpen: (index: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const width = useMotionValue(1200);
  const height = useMotionValue(820);
  const [geometry, setGeometry] = useState(() => measure(1200, 820));
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 80px", "end end"] });
  const position = useTransform(scrollYProgress, (progress) => detent(progress * LAST));

  useMotionValueEvent(position, "change", (value) => {
    const next = Math.round(value);
    setActive((current) => (current === next ? current : next));
  });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      width.set(w);
      height.set(h);
      setGeometry(measure(w, h));
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [width, height]);

  const scrollToPlate = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY - 80;
    const range = track.offsetHeight - (window.innerHeight - 80);
    window.scrollTo({ top: top + (index / LAST) * range });
  };

  const { width: w, height: h, plateW, plateH, radius } = geometry;
  const cx = w / 2;
  const cy = h / 2;
  const steps = stations(geometry);
  const ticks = [-3, -2, -1, 0, 1, 2, 3].map((slot) => {
    const angle = Math.sign(slot) * steps[Math.abs(slot)];
    const inner = radius - 7;
    const outer = radius + 7;
    const ux = -Math.cos(angle);
    const uy = Math.sin(angle);
    return `M${(cx + inner * ux).toFixed(1)} ${(cy + inner * uy).toFixed(1)}L${(cx + outer * ux).toFixed(1)} ${(cy + outer * uy).toFixed(1)}`;
  });
  const plate = PLATES[active];

  return (
    <div ref={trackRef} {...stylex.props(styles.track)}>
      <div {...stylex.props(styles.pin)}>
        <div ref={stageRef} {...stylex.props(styles.stage)}>
          <svg aria-hidden="true" viewBox={`0 0 ${w} ${h}`} {...stylex.props(styles.arc)}>
            <path
              d={`M${cx} ${cy - radius}A${radius} ${radius} 0 0 0 ${cx} ${cy + radius}`}
              {...stylex.props(styles.arcLine)}
            />
            <path d={ticks.join("")} {...stylex.props(styles.station)} />
            <circle cx={cx} cy={cy} r={7.5} {...stylex.props(styles.poleRing)} />
            <circle cx={cx} cy={cy} r={1.7} {...stylex.props(styles.polePoint)} />
          </svg>
          <div {...stylex.props(styles.frame, sized.frame(cy - plateH / 2, plateW, plateH))}>
            <Registration size="large" />
          </div>
          {PLATES.map((item, index) => (
            <ArcPlate
              key={item.id}
              plate={item}
              index={index}
              position={position}
              width={width}
              height={height}
              onOpen={onOpen}
              onFocus={scrollToPlate}
            />
          ))}
          <div {...stylex.props(styles.card)}>
            <div key={plate.id} {...stylex.props(styles.entry)}>
              <p lang="en" {...stylex.props(ui.label, styles.plateWord)}>
                Plate
                <span {...stylex.props(ui.designation, styles.numeral)}>{plate.numeral}</span>
              </p>
              <p {...stylex.props(styles.caption)}>{plate.caption}</p>
              <p lang="en" {...stylex.props(styles.english)}>
                {plate.english}
              </p>
              <p {...stylex.props(ui.body, styles.note)}>{plate.alt}</p>
            </div>
            <ol aria-label="底片目录" {...stylex.props(styles.register)}>
              {PLATES.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-label={`Plate ${item.numeral} · ${item.caption}`}
                    aria-current={index === active ? "true" : undefined}
                    onClick={() => scrollToPlate(index)}
                    {...stylex.props(
                      styles.registerButton,
                      ui.focusable,
                      index === active && styles.registerActive,
                    )}
                  >
                    {item.numeral}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
