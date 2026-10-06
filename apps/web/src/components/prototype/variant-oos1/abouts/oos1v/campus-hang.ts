import { ABOUT_CAMPUS } from "../../about-data";

export type CampusPhoto = (typeof ABOUT_CAMPUS.photos)[number];

export const CAMPUS_CAPTION_EN: Record<CampusPhoto["id"], string> = {
  aerial: "Headquarters",
  lab: "R&D laboratory",
  showroom: "Showroom",
  reception: "Reception hall",
  lounge: "Staff lounge",
  office: "Open office",
  grounds: "Campus green",
};

const HANG_ORDER: readonly CampusPhoto["id"][] = [
  "aerial",
  "grounds",
  "lab",
  "showroom",
  "reception",
  "lounge",
  "office",
];

export const campusPhoto = (id: CampusPhoto["id"]) => {
  const photo = ABOUT_CAMPUS.photos.find((candidate) => candidate.id === id);
  if (!photo) throw new Error(`Missing campus photo ${id}`);
  return photo;
};

export const CAMPUS_HANG = HANG_ORDER.map(campusPhoto);
