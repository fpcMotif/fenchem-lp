import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { ABOUT_CAMPUS } from "../../about-data";
import { Lightbox, type LightboxView } from "./lightbox";
import { SheetHeader } from "./sheet-header";
import { srOnly, ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

type PhotoId = (typeof ABOUT_CAMPUS.photos)[number]["id"];

const ORDER: readonly PhotoId[] = [
  "aerial",
  "grounds",
  "lab",
  "showroom",
  "reception",
  "lounge",
  "office",
];

const ENGLISH: Record<PhotoId, string> = {
  aerial: "Headquarters",
  grounds: "Grounds",
  lab: "Laboratory",
  showroom: "Showroom",
  reception: "Reception",
  lounge: "Lounge",
  office: "Open office",
};

const LETTERS = "ABCDEFG";

const VIEWS: readonly (LightboxView & { id: PhotoId; src: string })[] = ORDER.map((id, index) => {
  const photo = ABOUT_CAMPUS.photos.find((entry) => entry.id === id) ?? ABOUT_CAMPUS.photos[0];
  return {
    id,
    letter: LETTERS[index],
    src: photo.src,
    large: photo.large,
    alt: photo.alt,
    caption: photo.caption,
    english: ENGLISH[id],
  };
});

const NOTES = [
  "All views are frontal photographs. No projection is applied.",
  "Select a view to enlarge it. Arrow keys step through the set.",
] as const;

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.tablet]: "repeat(2, minmax(0, 1fr))",
      [bp.desktop]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: { default: 16, [bp.tablet]: 20, [bp.desktop]: 24 },
    rowGap: { default: 32, [bp.tabletUp]: 40 },
    margin: 0,
    marginTop: { default: 40, [bp.tablet]: 56, [bp.desktop]: 72 },
    padding: 0,
    listStyleType: "none",
  },
  view: {
    minWidth: 0,
  },
  photo: {
    position: "relative",
    display: "block",
    width: "100%",
    aspectRatio: "3 / 2",
    padding: 0,
    overflow: "hidden",
    borderWidth: 0,
    backgroundColor: tone.tint,
    cursor: "zoom-in",
  },
  frame: {
    position: "absolute",
    inset: 0,
    boxShadow: {
      default: "inset 0 0 0 1px rgba(11, 42, 92, 0.18)",
      [stylex.when.ancestor(":hover")]: "inset 0 0 0 2px #0743a9",
    },
    transitionProperty: "box-shadow",
    transitionDuration: "200ms",
    pointerEvents: "none",
  },
  image: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  aerial: { objectPosition: "50% 45%" },
  grounds: { objectPosition: "50% 58%" },
  lab: { objectPosition: "50% 50%" },
  showroom: { objectPosition: "50% 55%" },
  reception: { objectPosition: "50% 60%" },
  lounge: { objectPosition: "50% 60%" },
  office: { objectPosition: "50% 50%" },
  caption: {
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    paddingTop: 20,
  },
  marker: {
    position: "relative",
    flexShrink: 0,
    width: 32,
    height: 32,
  },
  stem: {
    position: "absolute",
    left: 15.5,
    bottom: "calc(100% + 7px)",
    width: 1,
    height: 13,
    backgroundColor: tone.line,
  },
  pointer: {
    position: "absolute",
    left: 10,
    top: -8,
    width: 12,
    height: 8,
    overflow: "visible",
  },
  ring: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.line,
    borderRadius: "50%",
    backgroundColor: {
      default: tone.paper,
      [stylex.when.ancestor(":hover")]: tone.blue,
    },
    fontFamily: face.latin,
    fontSize: 14,
    fontWeight: 500,
    color: {
      default: tone.navy,
      [stylex.when.ancestor(":hover")]: tone.paper,
    },
    transitionProperty: "background-color, color",
    transitionDuration: "200ms",
    transitionTimingFunction: chrome.ease,
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
    paddingTop: 4,
  },
  name: {
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 17 },
    fontWeight: 500,
    lineHeight: 1.3,
    color: tone.ink,
  },
  notes: {
    gridColumn: { default: "auto", [bp.desktop]: "span 2" },
    alignSelf: "start",
    paddingTop: { default: 0, [bp.tabletUp]: 4 },
  },
  notesHead: {
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomStyle: "solid",
    borderBottomColor: tone.navy,
  },
  notesList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  note: {
    display: "grid",
    gridTemplateColumns: "24px minmax(0, 1fr)",
    columnGap: 14,
    alignItems: "baseline",
    paddingBlock: 14,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.rule,
  },
  noteNumber: {
    fontFamily: face.latin,
    fontSize: 13,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: tone.navy,
  },
  noteText: {
    fontSize: { default: 17, [bp.desktop]: 19 },
    lineHeight: 1.35,
    color: tone.ink,
  },
});

function ViewMarker({ letter }: { letter: string }) {
  return (
    <span aria-hidden="true" {...stylex.props(styles.marker)}>
      <span {...stylex.props(styles.stem)} />
      <svg viewBox="0 0 12 8" {...stylex.props(styles.pointer)}>
        <path d="M6 0L12 8H0Z" fill="#0b2a5c" />
      </svg>
      <span {...stylex.props(styles.ring)}>{letter}</span>
    </span>
  );
}

export function Campus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const count = VIEWS.length;

  return (
    <section
      id="about-campus"
      aria-labelledby="oos1m-campus"
      {...stylex.props(ui.shell, ui.section, ui.anchor)}
    >
      <SheetHeader
        sheet={2}
        title={ABOUT_CAMPUS.title}
        english="Site views A–G"
        titleId="oos1m-campus"
      />
      <ul {...stylex.props(styles.grid)}>
        {VIEWS.map((view, index) => (
          <li key={view.id} {...stylex.props(styles.view, stylex.defaultMarker())}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              {...stylex.props(styles.photo, ui.focusRing)}
            >
              <img
                src={view.src}
                alt={view.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.image, styles[view.id])}
              />
              <span aria-hidden="true" {...stylex.props(styles.frame)} />
              <span {...srOnly}>
                查看大图：视图 {view.letter}，{view.caption}
              </span>
            </button>
            <div aria-hidden="true" {...stylex.props(styles.caption)}>
              <ViewMarker letter={view.letter} />
              <span {...stylex.props(styles.text)}>
                <span {...stylex.props(styles.name)}>{view.caption}</span>
                <span lang="en" {...stylex.props(ui.label)}>
                  View {view.letter} · {view.english}
                </span>
              </span>
            </div>
          </li>
        ))}
        <li {...stylex.props(styles.notes)}>
          <p lang="en" {...stylex.props(ui.caps, styles.notesHead)}>
            Notes
          </p>
          <ol lang="en" {...stylex.props(styles.notesList)}>
            {NOTES.map((note, index) => (
              <li key={note} {...stylex.props(styles.note)}>
                <span {...stylex.props(styles.noteNumber)}>{index + 1}</span>
                <span {...stylex.props(ui.serif, styles.noteText)}>{note}</span>
              </li>
            ))}
          </ol>
        </li>
      </ul>
      <Lightbox
        views={VIEWS}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) =>
          setOpenIndex((current) => (current === null ? null : (current + delta + count) % count))
        }
      />
    </section>
  );
}
