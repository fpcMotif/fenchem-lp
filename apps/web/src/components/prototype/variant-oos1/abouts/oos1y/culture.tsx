import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef, type RefObject } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CAMPUS, ABOUT_CULTURE } from "../../about-data";
import { CHROME_HEIGHT, srOnly, ui } from "./shared";
import { bp, face, pane, tone } from "./tokens.stylex";

const photoById = (id: string) =>
  ABOUT_CAMPUS.photos.find((photo) => photo.id === id) ?? ABOUT_CAMPUS.photos[0];

const SCENES = [
  {
    lead: "在实验室里",
    image: photoById("lab").large,
    alt: photoById("lab").alt,
    value: ABOUT_CULTURE.values[0],
  },
  {
    lead: "在湖边",
    image: "/prototype/official-site/campus-lake.webp",
    alt: "湖面与对岸的园区建筑",
    value: ABOUT_CULTURE.values[1],
  },
  {
    lead: "在人们相遇的地方",
    image: photoById("lounge").large,
    alt: photoById("lounge").alt,
    value: ABOUT_CULTURE.values[2],
  },
] as const;

const styles = stylex.create({
  section: {
    paddingTop: { default: 88, [bp.tablet]: 120, [bp.desktop]: 144 },
  },
  scenes: {
    position: "relative",
    isolation: "isolate",
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  pane: {
    position: "relative",
    alignSelf: "flex-start",
    overflow: "hidden",
    borderRadius: 2,
    backgroundColor: "#cfd9e8",
    boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.75), 0 50px 90px -50px rgba(11, 42, 92, 0.55)",
    filter: { default: "blur(calc((1 - var(--focus, 1)) * 7px))", [bp.motionReduce]: "none" },
    opacity: { default: "calc(0.58 + var(--focus, 1) * 0.42)", [bp.motionReduce]: 1 },
    transform: {
      default: "scale(calc(0.955 + var(--focus, 1) * 0.045))",
      [bp.motionReduce]: "none",
    },
    willChange: { default: "filter, transform, opacity", [bp.motionReduce]: "auto" },
  },
  paneLab: {
    width: { default: "94%", [bp.tablet]: "80%", [bp.desktop]: "64%" },
    aspectRatio: { default: "3 / 4", [bp.tablet]: "4 / 3", [bp.desktop]: "16 / 9.5" },
  },
  paneLake: {
    width: { default: "94%", [bp.tablet]: "80%", [bp.desktop]: "38%" },
    aspectRatio: { default: "3 / 4", [bp.tablet]: "4 / 3", [bp.desktop]: "4 / 5" },
    marginLeft: { default: "6%", [bp.tablet]: "20%", [bp.desktop]: "54%" },
    marginTop: { default: -36, [bp.tablet]: -56, [bp.desktop]: "-14%" },
  },
  paneLounge: {
    width: { default: "94%", [bp.tablet]: "80%", [bp.desktop]: "60%" },
    aspectRatio: { default: "3 / 4", [bp.tablet]: "4 / 3", [bp.desktop]: "3 / 2" },
    marginLeft: { default: 0, [bp.tablet]: "4%", [bp.desktop]: "8%" },
    marginTop: { default: -36, [bp.tablet]: -56, [bp.desktop]: "-12%" },
  },
  photoLab: { objectPosition: { default: "56% 50%", [bp.desktop]: "58% 55%" } },
  photoLake: { objectPosition: { default: "46% 50%", [bp.desktop]: "47% 60%" } },
  photoLounge: { objectPosition: { default: "54% 50%", [bp.desktop]: "30% 55%" } },
  strip: {
    position: "absolute",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: { default: 10, [bp.desktop]: 14 },
    top: 0,
    left: 0,
    right: 0,
    padding: {
      default: "22px 22px 24px",
      [bp.tablet]: "28px 32px 32px",
      [bp.desktop]: "36px 36px 38px",
    },
    backgroundImage: pane.fill,
    backdropFilter: "blur(18px) saturate(160%)",
    WebkitBackdropFilter: "blur(18px) saturate(160%)",
    boxShadow: "inset 0 -1px 0 rgba(255, 255, 255, 0.8)",
  },
  stripLab: {
    bottom: { default: "auto", [bp.desktop]: 0 },
    right: { default: 0, [bp.desktop]: "auto" },
    width: { default: "auto", [bp.desktop]: "44%" },
    justifyContent: "flex-end",
    boxShadow: {
      default: "inset 0 -1px 0 rgba(255, 255, 255, 0.8)",
      [bp.desktop]: "inset -1px 0 0 rgba(255, 255, 255, 0.8)",
    },
  },
  stripLounge: {
    bottom: { default: "auto", [bp.desktop]: 0 },
    left: { default: 0, [bp.desktop]: "auto" },
    width: { default: "auto", [bp.desktop]: "46%" },
    justifyContent: "flex-end",
    boxShadow: {
      default: "inset 0 -1px 0 rgba(255, 255, 255, 0.8)",
      [bp.desktop]: "inset 1px 0 0 rgba(255, 255, 255, 0.8)",
    },
  },
  lead: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: 14,
    lineHeight: 1.4,
    letterSpacing: "0.08em",
    color: tone.body,
  },
  title: {
    fontSize: { default: 30, [bp.tablet]: 34, [bp.desktop]: 40 },
    lineHeight: 1.2,
    letterSpacing: "0.06em",
  },
  desc: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: 15,
    lineHeight: 1.85,
    color: tone.onGlass,
    maxWidth: "21em",
    textWrap: "pretty",
  },
});

const PANE_STYLES = [styles.paneLab, styles.paneLake, styles.paneLounge] as const;
const PHOTO_STYLES = [styles.photoLab, styles.photoLake, styles.photoLounge] as const;
const STRIP_STYLES = [styles.stripLab, null, styles.stripLounge] as const;

function useRackFocus(listRef: RefObject<HTMLOListElement | null>) {
  const reduce = useReducedMotion();
  useEffect(() => {
    const list = listRef.current;
    if (!list || reduce) return;
    const panes = Array.from(list.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );
    let frame = 0;
    const measure = () => {
      frame = 0;
      const visible = window.innerHeight - CHROME_HEIGHT;
      const focusLine = CHROME_HEIGHT + visible / 2;
      const reach = visible * 0.62;
      const plateau = reach * 0.18;
      for (const pane of panes) {
        const box = pane.getBoundingClientRect();
        const distance = Math.abs(box.top + box.height / 2 - focusLine);
        const t = Math.min(1, Math.max(0, (reach - distance) / (reach - plateau)));
        const focus = t * t * (3 - 2 * t);
        pane.style.setProperty("--focus", focus.toFixed(3));
        pane.style.zIndex = String(1 + Math.round(focus * 8));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      for (const pane of panes) {
        pane.style.removeProperty("--focus");
        pane.style.removeProperty("z-index");
      }
    };
  }, [listRef, reduce]);
}

export function CultureStory() {
  const listRef = useRef<HTMLOListElement>(null);
  useRackFocus(listRef);

  return (
    <section
      id="about-culture"
      aria-labelledby="oos1y-culture"
      {...stylex.props(ui.anchor, styles.section)}
    >
      <h2 id="oos1y-culture" {...srOnly}>
        企业文化
      </h2>
      <div {...stylex.props(ui.shell)}>
        <ol ref={listRef} {...stylex.props(styles.scenes)}>
          {SCENES.map((scene, index) => (
            <li key={scene.value.title} {...stylex.props(styles.pane, PANE_STYLES[index])}>
              <img
                src={scene.image}
                alt={scene.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, PHOTO_STYLES[index])}
              />
              <div {...stylex.props(styles.strip, STRIP_STYLES[index])}>
                <p {...stylex.props(styles.lead)}>{scene.lead}，</p>
                <h3 {...stylex.props(ui.etched, styles.title)}>{scene.value.title}</h3>
                <p {...stylex.props(styles.desc)}>{scene.value.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
