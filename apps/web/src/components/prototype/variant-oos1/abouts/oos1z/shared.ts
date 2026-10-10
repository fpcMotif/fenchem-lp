import * as stylex from "@stylexjs/stylex";

import { ABOUT_CAMPUS, ABOUT_CSR, ABOUT_HERO } from "../../about-data";
import { bp, face, tone } from "./tokens.stylex";

export const LIGHT_WEIGHT_FONT =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap";

export const HEADER_HEIGHT = 80;
export const DWELL_RATIO = 0.7;

export type Wall = "left" | "right";
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

const ASPECT: Record<PhotoId, number> = {
  aerial: 1400 / 1048,
  lab: 1400 / 577,
  showroom: 3 / 2,
  reception: 3 / 2,
  lounge: 1400 / 933,
  office: 3 / 2,
  grounds: 2 / 3,
};

export type Work = {
  id: PhotoId;
  number: string;
  src: string;
  large: string;
  alt: string;
  caption: string;
  englishCaption: string;
  english: string;
  wall: Wall;
  aspect: number;
};

export const WORKS: readonly Work[] = ABOUT_CAMPUS.photos.map((photo, index) => ({
  id: photo.id,
  number: String(index + 1).padStart(2, "0"),
  src: photo.src,
  large: photo.large,
  alt: photo.alt,
  caption: photo.caption,
  englishCaption: photo.english,
  english: ENGLISH[photo.id],
  wall: index % 2 === 0 ? "left" : "right",
  aspect: ASPECT[photo.id],
}));

export const LAKE = {
  number: "08",
  title: "园区水景",
  english: "The lake",
  facing: "The lake, facing you",
  src: ABOUT_CSR.image,
  alt: ABOUT_CSR.imageAlt,
  aspect: 3 / 2,
} as const;

export const PLACE = "Nanjing";

export function sectionTitle(id: string): string {
  return ABOUT_HERO.navChips.find((chip) => chip.id === id)?.label ?? "";
}

export const ui = stylex.create({
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 20, [bp.tablet]: 48, [bp.laptop]: 64, [bp.wide]: 120 },
  },
  anchor: {
    scrollMarginTop: 80,
  },
  room: {
    paddingTop: { default: 88, [bp.tablet]: 112, [bp.desktop]: 136 },
    paddingBottom: { default: 88, [bp.tablet]: 112, [bp.desktop]: 136 },
  },
  focus: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.blue,
    outlineOffset: 4,
  },
  number: {
    fontFamily: face.serif,
    fontVariantNumeric: "lining-nums tabular-nums",
    letterSpacing: "0.01em",
  },
  caps: {
    fontFamily: face.latin,
    fontWeight: 500,
    fontSize: 11,
    lineHeight: 1.4,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  italic: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  button: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "inherit",
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    textAlign: "inherit",
    cursor: "pointer",
  },
});

export const srOnly = stylex.props(ui.srOnly);
