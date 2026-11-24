import { ABOUT_CAMPUS, ABOUT_CSR } from "./about-data";

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
const LEAD_IDS: readonly string[] = ["reception", "office", "lounge", "showroom"];
const SHOWN_IN_RD_SECTION_IDS: ReadonlySet<string> = new Set(["lab"]);
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
  .filter((photo) => !LEAD_IDS.includes(photo.id) && !SHOWN_IN_RD_SECTION_IDS.has(photo.id))
  .map(fromCampus);

const galleryPhoto = (
  id: string,
  area: CampusPhoto["area"],
  caption: string,
  english: string,
  alt: string,
): CampusPhoto => {
  const image = `/prototype/about/campus-${id}-lg.webp`;
  return {
    id,
    image,
    srcSet: widthSet([
      [`/prototype/about/campus-${id}.webp`, 1200],
      [image, 2000],
    ]),
    alt,
    caption,
    english,
    area,
    focus: "50% 50%",
  };
};

const INDOOR_PHOTOS = [
  galleryPhoto(
    "meeting",
    INDOOR,
    "会议室",
    "Meeting room",
    "Glass-walled meeting room with an oval wooden table",
  ),
  galleryPhoto(
    "boardroom",
    INDOOR,
    "多功能会议厅",
    "Boardroom",
    "Long boardroom table with black chairs and wood-panelled walls",
  ),
  galleryPhoto(
    "rd-center",
    INDOOR,
    "研发中心",
    "R&D center",
    "R&D center entrance wall with the Fenchem logo beside glass labs",
  ),
  galleryPhoto(
    "test-center",
    INDOOR,
    "检测中心",
    "Testing laboratory",
    "Fenchem Laboratory corridor with a blue wall of certifications",
  ),
  galleryPhoto(
    "window-lounge",
    INDOOR,
    "休闲洽谈区",
    "Window lounge",
    "Lounge seating beside floor-to-ceiling windows facing the campus",
  ),
  galleryPhoto(
    "canteen",
    INDOOR,
    "员工餐厅",
    "Staff canteen",
    "Bright staff canteen with a serving counter and long tables",
  ),
  galleryPhoto(
    "gym",
    INDOOR,
    "健身房",
    "Fitness room",
    "Staff fitness room with weights and training equipment",
  ),
  galleryPhoto(
    "warehouse",
    INDOOR,
    "仓储中心",
    "Warehouse",
    "Warehouse with tall racks of packed raw materials",
  ),
];

const OUTDOOR_PHOTOS = [
  galleryPhoto(
    "overview",
    OUTDOOR,
    "园区全景",
    "Campus overview",
    "Aerial view of the Fenchem campus buildings and ponds",
  ),
  galleryPhoto(
    "walkway",
    OUTDOOR,
    "水景步道",
    "Waterside walkway",
    "Stone walkway between two reflecting ponds leading to the Fenchem buildings",
  ),
  galleryPhoto(
    "hq-aerial",
    OUTDOOR,
    "总部大楼鸟瞰",
    "Headquarters from above",
    "Aerial view of the Fenchem headquarters building, its courtyard and lawns",
  ),
  galleryPhoto(
    "building",
    OUTDOOR,
    "研发办公楼",
    "R&D office building",
    "Fenchem R&D and office building across a pond and lawn",
  ),
  galleryPhoto(
    "facade",
    OUTDOOR,
    "办公楼外立面",
    "Office facade",
    "Fenchem office building facade above a green lawn",
  ),
  galleryPhoto(
    "pond-aerial",
    OUTDOOR,
    "水景鸟瞰",
    "Pond from above",
    "Aerial view of the reflecting ponds and lawns between the buildings",
  ),
  galleryPhoto(
    "pond-panorama",
    OUTDOOR,
    "中央水景",
    "Central pond",
    "Elevated view of the central reflecting pond framed by the campus buildings",
  ),
  galleryPhoto(
    "surroundings",
    OUTDOOR,
    "园区周边",
    "Campus surroundings",
    "Wide aerial view of the Fenchem campus within the surrounding district",
  ),
];

export const CAMPUS_GALLERY: readonly CampusPhoto[] = [
  ...LEAD_PHOTOS,
  ...INDOOR_PHOTOS,
  ...OUTDOOR_PHOTOS,
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
  ...REMAINING_PHOTOS,
];
