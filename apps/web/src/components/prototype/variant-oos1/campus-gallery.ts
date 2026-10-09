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

const [AERIAL, LAB, SHOWROOM, RECEPTION, LOUNGE, OFFICE, GROUNDS] = ABOUT_CAMPUS.photos;

const fromCampus = (
  photo: (typeof ABOUT_CAMPUS.photos)[number],
  area: CampusPhoto["area"],
  focus = "50% 50%",
): CampusPhoto => ({
  id: photo.id,
  image: photo.large,
  alt: photo.alt,
  caption: photo.caption,
  area,
  focus,
});

export const CAMPUS_GALLERY: readonly CampusPhoto[] = [
  {
    id: "lobby",
    image: ABOUT_HERO.lobbyImage,
    alt: LOBBY_ALT,
    caption: ABOUT_HERO.lobbyCaption,
    area: INDOOR,
    focus: "50% 50%",
  },
  fromCampus(RECEPTION, INDOOR),
  fromCampus(OFFICE, INDOOR),
  fromCampus(LAB, INDOOR, "53% 50%"),
  fromCampus(LOUNGE, INDOOR),
  fromCampus(SHOWROOM, INDOOR),
  fromCampus(AERIAL, OUTDOOR, "50% 45%"),
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
  fromCampus(GROUNDS, OUTDOOR, "50% 60%"),
];
