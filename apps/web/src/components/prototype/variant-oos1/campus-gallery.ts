import { ABOUT_BANNER, ABOUT_CAMPUS, ABOUT_CSR, ABOUT_HERO } from "./about-data";
import { LOBBY_ALT } from "./abouts/oos1c/data";

const INDOOR = "办公空间";
const OUTDOOR = "园区外景";

type CampusPhoto = {
  id: string;
  image: string;
  srcSet: string;
  alt: string;
  caption: string;
  english: string;
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
const CAMPUS_WIDTHS: ReadonlyMap<string, readonly [small: number, large: number]> = new Map([
  ["aerial", [1400, 2000]],
  ["grounds", [900, 1400]],
  ["lab", [1400, 2400]],
  ["lounge", [1400, 2000]],
  ["office", [900, 2000]],
  ["reception", [900, 2000]],
  ["showroom", [900, 2000]],
]);

const widthSet = (sources: readonly (readonly [src: string, width: number])[]) =>
  sources.map(([src, width]) => `${src} ${width}w`).join(", ");

const fromCampus = (photo: (typeof ABOUT_CAMPUS.photos)[number]): CampusPhoto => {
  const [small, large] = CAMPUS_WIDTHS.get(photo.id) ?? [];
  return {
    id: photo.id,
    image: photo.large,
    srcSet:
      small && large
        ? widthSet([
            [photo.src, small],
            [photo.large, large],
          ])
        : "",
    alt: photo.alt,
    caption: photo.caption,
    english: photo.english,
    area: OUTDOOR_IDS.has(photo.id) ? OUTDOOR : INDOOR,
    focus: FOCUS_BY_ID.get(photo.id) ?? "50% 50%",
  };
};

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
    srcSet: "",
    alt: LOBBY_ALT,
    caption: ABOUT_HERO.lobbyCaption,
    english: ABOUT_HERO.lobbyEnglish,
    area: INDOOR,
    focus: "50% 50%",
  },
  ...LEAD_PHOTOS,
  {
    id: "walkway",
    image: ABOUT_BANNER.image,
    srcSet: widthSet([
      ["/prototype/about/about-hero-campus-1200.webp", 1200],
      [ABOUT_BANNER.image, 2400],
    ]),
    alt: ABOUT_BANNER.alt,
    caption: "水景步道",
    english: "Waterside walkway",
    area: OUTDOOR,
    focus: "50% 50%",
  },
  {
    id: "lake",
    image: ABOUT_CSR.image,
    srcSet: widthSet([
      ["/prototype/about/csr-campus-lake-1200.webp", 1200],
      [ABOUT_CSR.image, 2400],
    ]),
    alt: ABOUT_CSR.imageAlt,
    caption: "园区水景",
    english: "Campus pond",
    area: OUTDOOR,
    focus: "50% 40%",
  },
  {
    id: "building",
    image: "/prototype/official-site/campus.webp",
    srcSet: widthSet([
      ["/prototype/official-site/campus-1200.webp", 1200],
      ["/prototype/official-site/campus.webp", 2674],
    ]),
    alt: "Waterside exterior of the Fenchem R&D and office building",
    caption: "研发办公楼",
    english: "R&D office building",
    area: OUTDOOR,
    focus: "50% 50%",
  },
  ...REMAINING_PHOTOS,
];
