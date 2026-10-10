import { ABOUT_BANNER, ABOUT_CAMPUS, ABOUT_CSR, ABOUT_HERO } from "./about-data";
import { LOBBY_ALT } from "./abouts/oos1c/data";

const INDOOR = "办公空间";
const OUTDOOR = "园区外景";

type CampusPhoto = {
  id: string;
  image: string;
  alt: string;
  caption: string;
  area: typeof INDOOR | typeof OUTDOOR;
  focus: string;
};

const OUTDOOR_IDS: ReadonlySet<string> = new Set(["aerial", "grounds"]);
const FOCUS_BY_ID: ReadonlyMap<string, string> = new Map([
  ["lab", "53% 50%"],
  ["aerial", "50% 45%"],
  ["grounds", "50% 60%"],
]);
const LEAD_IDS: readonly string[] = ["reception", "office", "lab", "lounge", "showroom", "aerial"];

const fromCampus = (photo: (typeof ABOUT_CAMPUS.photos)[number]): CampusPhoto => ({
  id: photo.id,
  image: photo.large,
  alt: photo.alt,
  caption: photo.caption,
  area: OUTDOOR_IDS.has(photo.id) ? OUTDOOR : INDOOR,
  focus: FOCUS_BY_ID.get(photo.id) ?? "50% 50%",
});

const LEAD_PHOTOS = LEAD_IDS.flatMap((id) =>
  ABOUT_CAMPUS.photos.filter((photo) => photo.id === id).map(fromCampus),
);
const REMAINING_PHOTOS = ABOUT_CAMPUS.photos
  .filter((photo) => !LEAD_IDS.includes(photo.id))
  .map(fromCampus);

export const CAMPUS_GALLERY: readonly CampusPhoto[] = [
  {
    id: "lobby",
    image: ABOUT_HERO.lobbyImage,
    alt: LOBBY_ALT,
    caption: ABOUT_HERO.lobbyCaption,
    area: INDOOR,
    focus: "50% 50%",
  },
  ...LEAD_PHOTOS,
  {
    id: "walkway",
    image: ABOUT_BANNER.image,
    alt: ABOUT_BANNER.alt,
    caption: "水景步道",
    area: OUTDOOR,
    focus: "50% 50%",
  },
  {
    id: "lake",
    image: ABOUT_CSR.image,
    alt: ABOUT_CSR.imageAlt,
    caption: "园区水景",
    area: OUTDOOR,
    focus: "50% 40%",
  },
  {
    id: "building",
    image: "/prototype/official-site/campus.webp",
    alt: "泛成研发与办公大楼临水外景",
    caption: "研发办公楼",
    area: OUTDOOR,
    focus: "50% 50%",
  },
  ...REMAINING_PHOTOS,
];
