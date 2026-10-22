import * as stylex from "@stylexjs/stylex";

import { useLightbox } from "@/components/prototype/shared/lightbox";

import { ABOUT_CAMPUS } from "../../about-data";
import { LEVER } from "./counterweight";
import { Lightbox, type LightboxPhoto } from "./lightbox";
import { Pair, StandingTitle } from "./pair";
import { srOnly, type, ui } from "./shared";
import { bp, grid, tone } from "./tokens.stylex";

type PhotoId = (typeof ABOUT_CAMPUS.photos)[number]["id"];

const CAMPUS_RATIO: Record<PhotoId, number> = {
  aerial: 4 / 3,
  lab: 16 / 9,
  showroom: 3 / 2,
  reception: 1,
  lounge: 4 / 3,
  office: 3 / 2,
  grounds: 4 / 5,
};

const CAMPUS_PHOTOS: readonly LightboxPhoto[] = ABOUT_CAMPUS.photos.map((photo) => ({
  id: photo.id,
  large: photo.large,
  alt: photo.alt,
  caption: photo.caption,
}));

const styles = stylex.create({
  caption: {
    textWrap: "balance",
  },
  description: {
    marginTop: { default: 12, [bp.wide]: 24 },
    maxWidth: "20em",
  },
  button: {
    position: "relative",
    display: "block",
    width: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: tone.tint,
    cursor: "zoom-in",
    overflow: "hidden",
  },
  image: {
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hoverMotion]: "scale(1.03)" },
    },
    transitionProperty: "transform",
    transitionDuration: "900ms",
    transitionTimingFunction: grid.ease,
  },
});

const ratios = stylex.create({
  aerial: { aspectRatio: "4 / 3" },
  lab: { aspectRatio: "16 / 9" },
  showroom: { aspectRatio: "3 / 2" },
  reception: { aspectRatio: "1 / 1" },
  lounge: { aspectRatio: "4 / 3" },
  office: { aspectRatio: "3 / 2" },
  grounds: { aspectRatio: "4 / 5" },
});

const positions = stylex.create({
  aerial: { objectPosition: "50% 55%" },
  lab: { objectPosition: "50% 50%" },
  showroom: { objectPosition: "45% 50%" },
  reception: { objectPosition: "50% 50%" },
  lounge: { objectPosition: "55% 50%" },
  office: { objectPosition: "40% 50%" },
  grounds: { objectPosition: "60% 50%" },
});

export function Campus() {
  const lightbox = useLightbox(CAMPUS_PHOTOS.length);

  return (
    <section id="about-campus" aria-labelledby="oos1x-campus" {...stylex.props(ui.anchor)}>
      {ABOUT_CAMPUS.photos.map((photo, index) => (
        <Pair
          key={photo.id}
          lever={LEVER}
          loadRatio={CAMPUS_RATIO[photo.id]}
          offset={index % 2 === 0 ? "end" : "start"}
          standing={
            index === 0 ? (
              <StandingTitle id="oos1x-campus">{ABOUT_CAMPUS.title}</StandingTitle>
            ) : undefined
          }
          load={
            <button
              type="button"
              onClick={() => lightbox.open(index)}
              {...stylex.props(
                styles.button,
                ratios[photo.id],
                ui.focusRing,
                stylex.defaultMarker(),
              )}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, styles.image, positions[photo.id])}
              />
              <span {...srOnly}>, View larger</span>
            </button>
          }
        >
          <p {...stylex.props(type.light, type.display, styles.caption)}>{photo.caption}</p>
          <p aria-hidden="true" {...stylex.props(type.body, styles.description)}>
            {photo.description}
          </p>
        </Pair>
      ))}
      <Lightbox lightbox={lightbox} photos={CAMPUS_PHOTOS} />
    </section>
  );
}
