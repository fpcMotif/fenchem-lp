import { ABOUT_CAMPUS } from "../../about-data";
import type { PlatePhoto } from "./lightbox";

type PhotoId = (typeof ABOUT_CAMPUS.photos)[number]["id"];

export type Plate = PlatePhoto & { src: string; focus: string; description: string };

const ENGLISH: Record<PhotoId, string> = {
  aerial: "Headquarters",
  lab: "Laboratory",
  showroom: "Showroom",
  reception: "Reception",
  lounge: "Lounge",
  office: "Open office",
  grounds: "Grounds",
};

const FOCUS: Record<PhotoId, string> = {
  aerial: "50% 50%",
  lab: "50% 50%",
  showroom: "50% 56%",
  reception: "50% 62%",
  lounge: "50% 58%",
  office: "50% 52%",
  grounds: "50% 60%",
};

export const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"] as const;

export const PLATES: readonly Plate[] = ABOUT_CAMPUS.photos.map((photo, index) => ({
  id: photo.id,
  numeral: NUMERALS[index],
  src: photo.src,
  large: photo.large,
  alt: photo.alt,
  description: photo.description,
  caption: photo.caption,
  english: ENGLISH[photo.id],
  focus: FOCUS[photo.id],
}));
