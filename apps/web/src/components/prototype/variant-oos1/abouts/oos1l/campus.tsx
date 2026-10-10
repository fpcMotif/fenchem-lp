import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { Clause } from "./clause";
import { SectionLabel } from "./label";
import { headingId } from "./label-values";
import { Lightbox, type LightboxPhoto } from "./lightbox";
import { SENTENCE } from "./sentence";
import { srOnly, ui } from "./shared";
import { bp, chrome, tone } from "./tokens.stylex";

type PhotoId = (typeof ABOUT_CAMPUS.photos)[number]["id"];

const ENGLISH: Record<PhotoId, string> = {
  aerial: "Headquarters",
  lab: "Laboratory",
  showroom: "Showroom",
  reception: "Reception",
  lounge: "Lounge",
  office: "Open office",
  grounds: "Grounds",
};

const PHOTOS: readonly LightboxPhoto[] = ABOUT_CAMPUS.photos.map((photo, index) => ({
  id: photo.id,
  large: photo.large,
  alt: photo.alt,
  english: ENGLISH[photo.id],
  line: SENTENCE.campus[index],
}));

const styles = stylex.create({
  section: {
    paddingTop: { default: 144, [bp.tablet]: 176, [bp.desktop]: 224 },
  },
  essay: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 80, [bp.tablet]: 112, [bp.desktop]: 128 },
    marginTop: { default: 40, [bp.desktop]: 56 },
    marginBottom: 0,
    padding: 0,
    listStyleType: "none",
  },
  entry: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: { default: 16, [bp.desktop]: 24 },
  },
  caption: {
    alignSelf: "stretch",
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    margin: 0,
  },
  large: {
    width: { default: "100%", [bp.tablet]: "75%", [bp.desktop]: "66.6%" },
  },
  small: {
    width: { default: "72%", [bp.tablet]: "50%", [bp.desktop]: "41.5%" },
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
    color: tone.blue,
  },
  largeFrame: {
    aspectRatio: "3 / 2",
  },
  smallFrame: {
    aspectRatio: "4 / 5",
  },
  image: {
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hoverMotion]: "scale(1.025)" },
    },
    transitionProperty: "transform",
    transitionDuration: "900ms",
    transitionTimingFunction: chrome.ease,
  },
  note: {
    display: "flex",
    gap: 12,
  },
  number: {
    color: tone.ink,
  },
});

const crops = stylex.create({
  aerial: { objectPosition: "50% 55%" },
  lab: { objectPosition: "50% 50%" },
  showroom: { objectPosition: "50% 50%" },
  reception: { objectPosition: "50% 55%" },
  lounge: { objectPosition: "50% 55%" },
  office: { objectPosition: "55% 50%" },
  grounds: { objectPosition: "50% 38%" },
});

export function Campus() {
  const [open, setOpen] = useState<number | null>(null);
  const count = PHOTOS.length;

  return (
    <section
      id="about-campus"
      aria-labelledby={headingId("about-campus")}
      {...stylex.props(ui.section, styles.section)}
    >
      <div {...stylex.props(ui.shell)}>
        <SectionLabel section="about-campus" />
        <ol {...stylex.props(styles.essay)}>
          {ABOUT_CAMPUS.photos.map((photo, index) => {
            const large = index % 2 === 0;
            return (
              <li key={photo.id} {...stylex.props(styles.entry)}>
                <Clause line={SENTENCE.campus[index]} sx={styles.caption} />
                <figure {...stylex.props(styles.figure, large ? styles.large : styles.small)}>
                  <button
                    type="button"
                    onClick={() => setOpen(index)}
                    {...stylex.props(styles.button, large ? styles.largeFrame : styles.smallFrame)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      {...stylex.props(ui.photo, styles.image, crops[photo.id])}
                    />
                    <span {...srOnly}>, View larger</span>
                  </button>
                  <figcaption lang="en" {...stylex.props(ui.note, styles.note)}>
                    <span {...stylex.props(styles.number)}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{ENGLISH[photo.id]}</span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ol>
      </div>
      <Lightbox
        photos={PHOTOS}
        index={open}
        onClose={() => setOpen(null)}
        onStep={(delta) =>
          setOpen((current) => (current === null ? null : (current + delta + count) % count))
        }
      />
    </section>
  );
}
