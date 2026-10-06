import * as stylex from "@stylexjs/stylex";
import { ArrowUpRight } from "lucide-react";
import {
  m,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { activeStop, corridorGeometry, linger, STOP_PROGRESS } from "./corridor-geometry";
import { CorridorScene } from "./corridor-scene";
import { DWELL_RATIO, LAKE, WORKS, srOnly, ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

const settle = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  track: {
    position: "relative",
    display: { default: "none", [bp.corridor]: "block" },
    height: chrome.track,
  },
  stage: {
    position: "sticky",
    top: chrome.header,
    height: chrome.stage,
    overflow: "hidden",
    backgroundColor: tone.paper,
  },
  scene: {
    position: "absolute",
    inset: 0,
    perspectiveOrigin: "50% 50%",
  },
  world: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 0,
    height: 0,
    transformStyle: "preserve-3d",
  },
  dock: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 28,
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
  },
  plate: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    height: 48,
    paddingInlineStart: 20,
    paddingInlineEnd: 8,
    backgroundColor: tone.paper,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.line,
    pointerEvents: "auto",
    animationName: settle,
    animationDuration: "360ms",
    animationTimingFunction: chrome.ease,
  },
  plateLake: {
    paddingInlineEnd: 20,
  },
  number: {
    fontSize: 20,
    lineHeight: 1,
    color: tone.navy,
  },
  rule: {
    width: 1,
    height: 18,
    backgroundColor: tone.line,
  },
  title: {
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.ink,
  },
  english: {
    fontSize: 16,
    color: tone.body,
  },
  view: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    height: 32,
    paddingInline: 12,
    fontFamily: face.sans,
    fontSize: 13,
    color: { default: tone.navy, ":hover": tone.paper },
    backgroundColor: { default: tone.mist, ":hover": tone.navy },
    transitionProperty: "background-color, color",
    transitionDuration: "180ms",
  },
});

function Caption({
  active,
  opacity,
  onOpen,
}: {
  active: number;
  opacity: MotionValue<number>;
  onOpen: (index: number) => void;
}) {
  const work = active < WORKS.length ? WORKS[active] : null;
  return (
    <m.div style={{ opacity }} {...stylex.props(styles.dock)}>
      <div key={active} {...stylex.props(styles.plate, work === null && styles.plateLake)}>
        <span lang="en" {...stylex.props(ui.number, styles.number)}>
          Nº {work ? work.number : LAKE.number}
        </span>
        <span aria-hidden="true" {...stylex.props(styles.rule)} />
        <span {...stylex.props(styles.title)}>{work ? work.caption : LAKE.title}</span>
        <span lang="en" {...stylex.props(ui.italic, styles.english)}>
          {work ? work.english : LAKE.facing}
        </span>
        {work ? (
          <button
            type="button"
            onClick={() => onOpen(active)}
            {...stylex.props(ui.button, ui.focus, styles.view)}
          >
            查看<span {...srOnly}>大图：{work.caption}</span>
            <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </m.div>
  );
}

export function Corridor({ onOpen }: { onOpen: (index: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [size, setSize] = useState({ width: 1440, height: 820 });
  const [dwell, setDwell] = useState(0.1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const measure = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (width === 0 || height === 0) return;
      setSize((current) =>
        current.width === width && current.height === height ? current : { width, height },
      );
      const travel = track.offsetHeight - height;
      setDwell(travel > 0 ? Math.min(0.24, (DWELL_RATIO * window.innerHeight) / travel) : 0.1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const geometry = useMemo(() => corridorGeometry(size.width, size.height), [size]);
  const fadeStart = 1 - dwell;
  const fillAt = fadeStart - 0.02;
  const lakeAt = STOP_PROGRESS[STOP_PROGRESS.length - 1];

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 80px", "end end"] });
  const walk = useSpring(scrollYProgress, { stiffness: 170, damping: 34, mass: 0.6 });
  const camera = useTransform(
    walk,
    [0, ...STOP_PROGRESS, fillAt, 1],
    [0, ...geometry.stops, geometry.fill, geometry.fill],
    { ease: [...STOP_PROGRESS.map(() => linger), linger, (x: number) => x] },
  );
  const veil = useTransform(scrollYProgress, (progress) =>
    Math.min(1, Math.max(0, 1 - (progress - fadeStart) / (dwell * 0.7))),
  );
  const reach = useTransform(veil, (value) => (value < 0.05 ? "none" : "auto"));
  const captionOpacity = useTransform(scrollYProgress, (progress) =>
    Math.min(1, Math.max(0, 1 - (progress - (lakeAt + 0.015)) / 0.035)),
  );

  useMotionValueEvent(camera, "change", (value) => {
    const next = activeStop(geometry.stops, value);
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
  });

  return (
    <div ref={trackRef} data-track="" {...stylex.props(styles.track)}>
      <m.div
        ref={stageRef}
        style={{ opacity: veil, pointerEvents: reach }}
        {...stylex.props(styles.stage)}
      >
        <div
          aria-hidden="true"
          style={{ perspective: geometry.perspective }}
          {...stylex.props(styles.scene)}
        >
          <m.div style={{ z: camera }} {...stylex.props(styles.world)}>
            <CorridorScene geometry={geometry} onOpen={onOpen} />
          </m.div>
        </div>
        <Caption active={active} opacity={captionOpacity} onOpen={onOpen} />
      </m.div>
    </div>
  );
}
