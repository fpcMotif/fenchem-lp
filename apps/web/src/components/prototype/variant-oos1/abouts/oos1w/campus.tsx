import * as stylex from "@stylexjs/stylex";
import { useRef } from "react";

import { useLightbox } from "@/components/prototype/shared/lightbox";

import { ABOUT_CAMPUS } from "../../about-data";
import { Lightbox, type LightboxPhoto } from "./lightbox";
import { SectionHead } from "./shared";
import { ui } from "./shared-values";
import { bp, chrome, face, tone } from "./tokens.stylex";

const PHOTOS: readonly (LightboxPhoto & { src: string; english: string; description: string })[] =
  ABOUT_CAMPUS.photos.map((photo) => ({
    id: photo.id,
    src: photo.src,
    large: photo.large,
    alt: photo.alt,
    description: photo.description,
    caption: photo.caption,
    english: photo.english,
  }));

const styles = stylex.create({
  lead: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "4 / -1" },
    margin: 0,
    marginTop: { default: 36, [bp.desktop]: 0 },
  },
  series: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [bp.tablet]: "repeat(2, minmax(0, 1fr))",
      [bp.desktop]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: { default: 12, [bp.tablet]: 20, [bp.desktop]: 24 },
    rowGap: { default: 32, [bp.tablet]: 48, [bp.desktop]: 64 },
    margin: 0,
    marginTop: { default: 40, [bp.tablet]: 56, [bp.desktop]: 80 },
    padding: 0,
    listStyleType: "none",
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 12, [bp.desktop]: 16 },
    margin: 0,
  },
  button: {
    position: "relative",
    display: "block",
    width: "100%",
    aspectRatio: "3 / 2",
    padding: 0,
    overflow: "hidden",
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: tone.tint,
    cursor: "zoom-in",
  },
  image: {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transitionProperty: "transform",
    transitionDuration: "800ms",
    transitionTimingFunction: chrome.ease,
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: { default: null, [bp.hover]: "scale(1.03)" },
    },
  },
  legend: {
    display: "flex",
    flexDirection: "column",
    rowGap: 4,
    margin: 0,
  },
  caption: {
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 17 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  captionLead: {
    fontSize: { default: 17, [bp.desktop]: 20 },
  },
  detail: {
    display: { default: "none", [bp.tablet]: "block", [bp.desktop]: "block" },
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.6,
    color: tone.body,
  },
  detailLead: {
    display: "block",
  },
});

const positions = stylex.create({
  aerial: { objectPosition: "50% 42%" },
  lab: { objectPosition: "50% 50%" },
  showroom: { objectPosition: "50% 50%" },
  reception: { objectPosition: "50% 50%" },
  lounge: { objectPosition: "50% 50%" },
  office: { objectPosition: "50% 50%" },
  grounds: { objectPosition: "50% 62%" },
});

const POSITION_BY_ID = new Map<string, (typeof positions)[keyof typeof positions]>([
  ["aerial", positions.aerial],
  ["lab", positions.lab],
  ["showroom", positions.showroom],
  ["reception", positions.reception],
  ["lounge", positions.lounge],
  ["office", positions.office],
  ["grounds", positions.grounds],
]);

function Panel({
  photo,
  index,
  lead,
  onOpen,
  registerTrigger,
}: {
  photo: (typeof PHOTOS)[number];
  index: number;
  lead: boolean;
  onOpen: (index: number) => void;
  registerTrigger: (index: number, node: HTMLButtonElement | null) => void;
}) {
  return (
    <figure {...stylex.props(styles.figure)}>
      <button
        ref={(node) => registerTrigger(index, node)}
        type="button"
        aria-label={`${photo.english}, view larger`}
        onClick={() => onOpen(index)}
        {...stylex.props(styles.button, ui.focusRing, stylex.defaultMarker())}
      >
        <img
          src={lead ? photo.large : photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.image, POSITION_BY_ID.get(photo.id))}
        />
      </button>
      <figcaption {...stylex.props(styles.legend)}>
        <span {...stylex.props(styles.caption, lead && styles.captionLead)}>{photo.caption}</span>
        <span aria-hidden="true" {...stylex.props(styles.detail, lead && styles.detailLead)}>
          {photo.description}
        </span>
      </figcaption>
    </figure>
  );
}

export function Campus() {
  const lightbox = useLightbox(PHOTOS.length);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const [lead, ...series] = PHOTOS;

  const registerTrigger = (index: number, node: HTMLButtonElement | null) => {
    triggers.current[index] = node;
  };
  const close = () => {
    const returnTo = lightbox.index;
    lightbox.close();
    if (returnTo !== null) triggers.current[returnTo]?.focus();
  };

  return (
    <section id="about-campus" aria-labelledby="oos1w-campus" {...stylex.props(ui.section)}>
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(ui.grid, ui.ruled)}>
          <div {...stylex.props(ui.headCol)}>
            <SectionHead title={ABOUT_CAMPUS.title} titleId="oos1w-campus" />
          </div>

          <div {...stylex.props(styles.lead)}>
            <Panel
              photo={lead}
              index={0}
              lead
              onOpen={lightbox.open}
              registerTrigger={registerTrigger}
            />
          </div>

          <ul {...stylex.props(styles.series)}>
            {series.map((photo, offset) => (
              <li key={photo.id}>
                <Panel
                  photo={photo}
                  index={offset + 1}
                  lead={false}
                  onOpen={lightbox.open}
                  registerTrigger={registerTrigger}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Lightbox lightbox={{ ...lightbox, close }} photos={PHOTOS} />
    </section>
  );
}
