import * as stylex from "@stylexjs/stylex";

import { useLightbox } from "@/components/prototype/shared/lightbox";

import { ABOUT_CAMPUS } from "../../about-data";
import { Cast } from "./cast";
import { LIFT } from "./cast-values";
import { SectionHead } from "./head";
import { Lightbox, type LightboxPhoto } from "./lightbox";
import { srOnly, ui } from "./shared";
import { SECTION_HOURS } from "./sun";
import { bp, face, tone } from "./tokens.stylex";

const PHOTOS: readonly LightboxPhoto[] = ABOUT_CAMPUS.photos.map((photo) => ({
  id: photo.id,
  large: photo.large,
  alt: photo.alt,
  caption: photo.caption,
}));

const styles = stylex.create({
  field: {
    marginTop: { default: 48, [bp.desktop]: 96 },
    marginBottom: 0,
    rowGap: { default: 72, [bp.tablet]: 120, [bp.desktop]: 168 },
    padding: 0,
    listStyleType: "none",
  },
  button: {
    display: "block",
    width: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    textAlign: "start",
    cursor: "zoom-in",
    color: "inherit",
  },
  plate: {
    display: "block",
    width: { default: "86%", [bp.tabletUp]: "100%" },
  },
  photo: {
    display: "block",
    height: { default: 232, [bp.tablet]: 260, [bp.desktop]: "clamp(300px, 27vw, 400px)" },
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    marginTop: 16,
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.ink,
  },
});

const place = stylex.create({
  aerial: {
    gridColumn: { default: "1 / -1", [bp.tablet]: "1 / span 4", [bp.desktop]: "1 / span 7" },
    gridRow: { default: "auto", [bp.tabletUp]: "1" },
  },
  lab: {
    gridColumn: { default: "1 / -1", [bp.tablet]: "5 / span 2", [bp.desktop]: "9 / span 3" },
    gridRow: { default: "auto", [bp.tabletUp]: "1" },
  },
  showroom: {
    gridColumn: { default: "1 / -1", [bp.tablet]: "1 / span 2", [bp.desktop]: "1 / span 3" },
    gridRow: { default: "auto", [bp.tabletUp]: "2" },
  },
  reception: {
    gridColumn: { default: "1 / -1", [bp.tablet]: "3 / span 2", [bp.desktop]: "5 / span 3" },
    gridRow: { default: "auto", [bp.tabletUp]: "2" },
  },
  lounge: {
    gridColumn: { default: "1 / -1", [bp.tablet]: "5 / span 2", [bp.desktop]: "9 / span 3" },
    gridRow: { default: "auto", [bp.tabletUp]: "2" },
  },
  office: {
    gridColumn: { default: "1 / -1", [bp.tablet]: "1 / span 3", [bp.desktop]: "1 / span 5" },
    gridRow: { default: "auto", [bp.tabletUp]: "3" },
  },
  grounds: {
    gridColumn: { default: "1 / -1", [bp.tablet]: "4 / span 3", [bp.desktop]: "7 / span 5" },
    gridRow: { default: "auto", [bp.tabletUp]: "3" },
  },
});

export function Campus() {
  const lightbox = useLightbox(PHOTOS.length);

  return (
    <section
      id="about-campus"
      aria-labelledby="oos1t-campus"
      data-hour={SECTION_HOURS.campus}
      {...stylex.props(ui.section, ui.shell)}
    >
      <SectionHead titleId="oos1t-campus" hour={SECTION_HOURS.campus} title={ABOUT_CAMPUS.title} />
      <ul {...stylex.props(ui.grid, styles.field)}>
        {ABOUT_CAMPUS.photos.map((photo, index) => (
          <li key={photo.id} {...stylex.props(place[photo.id])}>
            <button
              type="button"
              onClick={() => lightbox.open(index)}
              {...stylex.props(styles.button, ui.focus)}
            >
              <span {...stylex.props(ui.plate, styles.plate)}>
                <Cast lift={LIFT.block} still />
                <span {...stylex.props(ui.face, styles.photo)}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    {...stylex.props(ui.fill)}
                  />
                </span>
              </span>
              <span {...stylex.props(styles.caption)}>
                <span>{photo.caption}</span>
                <span {...srOnly}>View larger</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox lightbox={lightbox} photos={PHOTOS} />
    </section>
  );
}
