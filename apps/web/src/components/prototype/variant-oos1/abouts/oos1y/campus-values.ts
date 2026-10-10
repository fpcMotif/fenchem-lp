import { ABOUT_CAMPUS } from "../../about-data";
import { type LightboxPhoto } from "./lightbox";

type PhotoId = (typeof ABOUT_CAMPUS.photos)[number]["id"];

export const ENGLISH: Record<PhotoId, string> = {
  aerial: "Headquarters",
  lab: "Laboratory",
  showroom: "Showroom",
  reception: "Reception",
  lounge: "Lounge",
  office: "Open office",
  grounds: "Grounds",
};

export const CAMPUS_PHOTOS: readonly LightboxPhoto[] = ABOUT_CAMPUS.photos.map((photo) => ({
  id: photo.id,
  large: photo.large,
  alt: photo.alt,
  englishCaption: photo.english,
  english: ENGLISH[photo.id],
}));
