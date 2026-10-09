import { Lightbox } from "./lightbox";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { ABOUT_CAMPUS } from "../../about-data";
import { useReveal } from "./reveal";
import { srOnly, ui } from "./shared";
import { bp, face, pane, tone } from "./tokens.stylex";
import { CAMPUS_PHOTOS, ENGLISH } from "./campus-values";

const styles = stylex.create({
  section: {
    paddingTop: { default: 88, [bp.tablet]: 120, [bp.desktop]: 144 },
  },
  wall: {
    display: "flex",
    flexDirection: { default: "column", [bp.desktop]: "row" },
    gap: 1,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 1px 0 rgba(26, 26, 26, 0.06), 0 -1px 0 rgba(26, 26, 26, 0.06)",
  },
  bay: {
    position: "relative",
    flexGrow: { default: 0, [bp.desktop]: 1 },
    flexBasis: { default: "auto", [bp.desktop]: 0 },
    flexShrink: 0,
    minWidth: 0,
    height: { default: 104, [bp.tablet]: 132, [bp.desktop]: "clamp(440px, 40vw, 600px)" },
    overflow: "hidden",
    transitionProperty: "opacity",
    transitionDuration: "900ms",
    transitionTimingFunction: pane.ease,
  },
  bayHidden: {
    opacity: { default: 0, [bp.motionReduce]: 1 },
  },
  bayDelay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
  button: {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "#dfe6f1",
    cursor: "zoom-in",
  },
  focusFrame: {
    position: "absolute",
    inset: 6,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.95), inset 0 0 0 2px rgba(255, 255, 255, 0.95)",
    opacity: { default: 0, [stylex.when.ancestor(":focus-visible")]: 1 },
    pointerEvents: "none",
  },
  image: {
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hoverMotion]: "scale(1.04)" },
    },
    transitionProperty: "transform",
    transitionDuration: "900ms",
    transitionTimingFunction: pane.ease,
  },
  band: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    top: { default: 0, [bp.desktop]: "71%" },
    bottom: { default: 0, [bp.desktop]: "auto" },
    left: 0,
    width: { default: "42%", [bp.tablet]: "34%", [bp.desktop]: "100%" },
    height: { default: "auto", [bp.desktop]: 76 },
    paddingInline: { default: 16, [bp.tablet]: 24, [bp.desktop]: 16 },
    backgroundColor: {
      default: "rgba(255, 255, 255, 0.46)",
      [stylex.when.ancestor(":hover")]: "rgba(255, 255, 255, 0.6)",
    },
    backdropFilter: "blur(14px) saturate(150%)",
    WebkitBackdropFilter: "blur(14px) saturate(150%)",
    boxShadow: {
      default: "inset -1px 0 0 rgba(255, 255, 255, 0.7)",
      [bp.desktop]:
        "inset 0 1px 0 rgba(255, 255, 255, 0.75), inset 0 -1px 0 rgba(255, 255, 255, 0.5)",
    },
    transitionProperty: "background-color",
    transitionDuration: "300ms",
  },
  caption: {
    fontFamily: face.sans,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: tone.ink,
    textAlign: "start",
  },
});

const positions = stylex.create({
  aerial: { objectPosition: { default: "50% 42%", [bp.desktop]: "46% 50%" } },
  lab: { objectPosition: { default: "50% 58%", [bp.desktop]: "52% 50%" } },
  showroom: { objectPosition: { default: "50% 56%", [bp.desktop]: "40% 50%" } },
  reception: { objectPosition: { default: "50% 62%", [bp.desktop]: "50% 50%" } },
  lounge: { objectPosition: { default: "50% 62%", [bp.desktop]: "46% 50%" } },
  office: { objectPosition: { default: "50% 52%", [bp.desktop]: "47% 50%" } },
  grounds: { objectPosition: { default: "50% 58%", [bp.desktop]: "68% 50%" } },
});

export function CampusWall() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const [wallRef, phase] = useReveal<HTMLUListElement>();
  const count = CAMPUS_PHOTOS.length;

  return (
    <section
      id="about-campus"
      aria-labelledby="oos1y-campus"
      {...stylex.props(ui.anchor, styles.section)}
    >
      <h2 id="oos1y-campus" {...srOnly}>
        园区环境
      </h2>
      <ul ref={wallRef} {...stylex.props(styles.wall)}>
        {ABOUT_CAMPUS.photos.map((photo, index) => (
          <li
            key={photo.id}
            {...stylex.props(
              styles.bay,
              phase === "hidden" && styles.bayHidden,
              phase === "shown" && styles.bayDelay(index * 80),
            )}
          >
            <button
              type="button"
              onClick={() => {
                setStepped(false);
                setOpenIndex(index);
              }}
              {...stylex.props(styles.button, stylex.defaultMarker())}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, styles.image, positions[photo.id])}
              />
              <span {...stylex.props(styles.band)}>
                <span {...stylex.props(styles.caption)}>
                  <span lang="en">{ENGLISH[photo.id]}</span>
                  <span {...srOnly}> {photo.caption}，查看大图</span>
                </span>
              </span>
              <span aria-hidden="true" {...stylex.props(styles.focusFrame)} />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        photos={CAMPUS_PHOTOS}
        index={openIndex}
        stepped={stepped}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) => {
          setStepped(true);
          setOpenIndex((current) => (current === null ? null : (current + delta + count) % count));
        }}
      />
    </section>
  );
}
