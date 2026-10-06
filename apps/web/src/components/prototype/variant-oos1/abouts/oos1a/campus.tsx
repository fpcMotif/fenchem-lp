import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, type MotionValue, useScroll, useTransform } from "motion/react";
import { useRef, useState, useSyncExternalStore } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CAMPUS } from "../../about-data";
import { fonts, media, palette } from "./lattice.stylex";
import { Lightbox } from "./lightbox";
import { Frame, SectionName, shared } from "./parts";

type PhotoId = (typeof ABOUT_CAMPUS.photos)[number]["id"];

const COUNT = ABOUT_CAMPUS.photos.length;
const START_BASE = 0.18;
const START_STEP = 0.08;
const WINDOW = 0.28;
const RISE_PX = 18;
const DESKTOP_QUERY = "(min-width: 1024px)";

const easeOut = (t: number) => 1 - (1 - t) ** 3;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const subscribeWide = (onChange: () => void) => {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

function usePinned() {
  const reduce = useReducedMotion();
  const wide = useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
  return wide && !reduce;
}

const styles = stylex.create({
  section: {
    scrollMarginTop: 132,
    backgroundColor: palette.page,
  },
  track: {
    height: "calc(200svh - 132px)",
  },
  stage: {
    position: "sticky",
    top: 132,
    height: "calc(100svh - 132px)",
  },
  full: {
    height: "100%",
  },
  stageInner: {
    boxSizing: "border-box",
    height: "100%",
    paddingTop: 20,
    paddingBottom: 28,
  },
  cells: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [media.mdOnly]: "repeat(4, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(16, minmax(0, 1fr))",
    },
    gridTemplateRows: { default: null, [breakpoints.lg]: "repeat(7, minmax(0, 1fr))" },
    gridAutoRows: { default: 150, [media.mdOnly]: 190 },
    height: "100%",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  cellsStatic: {
    height: { default: "auto", [breakpoints.lg]: "min(720px, 54vw)" },
  },
  cell: {
    position: "relative",
    boxSizing: "border-box",
    padding: 1,
    minWidth: 0,
    minHeight: 0,
  },
  cellAerial: {
    gridColumn: { default: "span 2", [breakpoints.lg]: "1 / span 8" },
    gridRow: { default: "span 2", [breakpoints.lg]: "1 / span 4" },
  },
  cellLab: {
    gridColumn: { default: "span 2", [breakpoints.lg]: "9 / span 8" },
    gridRow: { default: null, [breakpoints.lg]: "1 / span 2" },
  },
  cellShowroom: {
    gridColumn: { default: "span 1", [breakpoints.lg]: "9 / span 4" },
    gridRow: { default: null, [breakpoints.lg]: "3 / span 2" },
  },
  cellReception: {
    gridColumn: { default: "span 1", [breakpoints.lg]: "13 / span 4" },
    gridRow: { default: null, [breakpoints.lg]: "3 / span 2" },
  },
  cellLounge: {
    gridColumn: { default: "span 2", [breakpoints.lg]: "1 / span 6" },
    gridRow: { default: null, [breakpoints.lg]: "5 / span 3" },
  },
  cellOffice: {
    gridColumn: { default: "span 1", [breakpoints.lg]: "7 / span 6" },
    gridRow: { default: null, [breakpoints.lg]: "5 / span 3" },
  },
  cellGrounds: {
    gridColumn: { default: "span 1", [breakpoints.lg]: "13 / span 4" },
    gridRow: { default: null, [breakpoints.lg]: "5 / span 3" },
  },
  face: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    margin: 0,
    backgroundColor: palette.tint,
  },
  hit: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "zoom-in",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 3,
    outlineColor: colors.paper,
    outlineOffset: -7,
  },
  caption: {
    position: "absolute",
    left: 0,
    bottom: 0,
    boxSizing: "border-box",
    width: "100%",
    padding: "28px 14px 10px",
    backgroundImage: "linear-gradient(to top, rgba(6, 28, 66, 0.6), rgba(6, 28, 66, 0))",
    fontFamily: fonts.cjk,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: colors.paper,
    pointerEvents: "none",
  },
});

const PLACEMENT: Record<PhotoId, stylex.StyleXStyles> = {
  aerial: styles.cellAerial,
  lab: styles.cellLab,
  showroom: styles.cellShowroom,
  reception: styles.cellReception,
  lounge: styles.cellLounge,
  office: styles.cellOffice,
  grounds: styles.cellGrounds,
};

function CampusCell({
  photo,
  index,
  progress,
  animated,
  onOpen,
  onFocusCell,
}: {
  photo: (typeof ABOUT_CAMPUS.photos)[number];
  index: number;
  progress: MotionValue<number>;
  animated: boolean;
  onOpen: () => void;
  onFocusCell: () => void;
}) {
  const start = START_BASE + index * START_STEP;
  const settled = useTransform(progress, (value) => easeOut(clamp01((value - start) / WINDOW)));
  const rise = useTransform(settled, (value) => RISE_PX * (1 - value));

  return (
    <li {...stylex.props(styles.cell, PLACEMENT[photo.id])}>
      <m.figure
        style={animated ? { opacity: settled, y: rise } : undefined}
        {...stylex.props(styles.face)}
      >
        <button
          type="button"
          aria-label={`查看大图：${photo.caption}`}
          onClick={onOpen}
          onFocus={onFocusCell}
          {...stylex.props(styles.hit)}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            {...stylex.props(shared.cover)}
          />
        </button>
        <figcaption {...stylex.props(styles.caption)}>{photo.caption}</figcaption>
      </m.figure>
    </li>
  );
}

export function Campus() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinned = usePinned();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end end"],
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);

  const completeAssembly = () => {
    const track = trackRef.current;
    if (!pinned || !track || scrollYProgress.get() > 0.98) return;
    const top = window.scrollY + track.getBoundingClientRect().bottom - window.innerHeight;
    window.scrollTo({ top, behavior: "instant" });
  };

  return (
    <section
      id="about-campus"
      aria-labelledby="about-campus-title"
      {...stylex.props(styles.section)}
    >
      <SectionName id="about-campus-title">园区环境</SectionName>
      <div ref={trackRef} {...stylex.props(pinned && styles.track)}>
        <div {...stylex.props(pinned && styles.stage)}>
          <Frame
            lattice="full"
            sx={pinned ? styles.full : undefined}
            innerSx={pinned ? styles.stageInner : shared.sectionPad}
          >
            <ul
              aria-label="园区照片"
              {...stylex.props(styles.cells, !pinned && styles.cellsStatic)}
            >
              {ABOUT_CAMPUS.photos.map((photo, index) => (
                <CampusCell
                  key={photo.id}
                  photo={photo}
                  index={index}
                  progress={scrollYProgress}
                  animated={pinned}
                  onOpen={() => {
                    setStepped(false);
                    setOpenIndex(index);
                  }}
                  onFocusCell={completeAssembly}
                />
              ))}
            </ul>
          </Frame>
        </div>
      </div>
      <Lightbox
        index={openIndex}
        stepped={stepped}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) => {
          setStepped(true);
          setOpenIndex((current) => (current === null ? null : (current + delta + COUNT) % COUNT));
        }}
      />
    </section>
  );
}
