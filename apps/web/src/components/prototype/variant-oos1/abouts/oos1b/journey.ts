import { ABOUT_CAMPUS, ABOUT_HERO } from "../../about-data";

type CampusId = (typeof ABOUT_CAMPUS.photos)[number]["id"];

const photo = (id: CampusId) => {
  const found = ABOUT_CAMPUS.photos.find((entry) => entry.id === id);
  if (!found) throw new Error(`missing campus photo ${id}`);
  return found;
};

export type Plate = {
  id: string;
  numeral: string;
  src: string;
  large: string;
  alt: string;
  caption: string;
  english: string;
  aspect: number;
};

export type Doorway = {
  x: number;
  y: number;
  scale: number;
};

const LOBBY: Plate = {
  id: "lobby",
  numeral: "I",
  src: ABOUT_HERO.lobbyImage,
  large: ABOUT_HERO.lobbyImage,
  alt: ABOUT_HERO.lobbyEnglish,
  caption: ABOUT_HERO.lobbyCaption,
  english: "Lobby",
  aspect: 1400 / 933,
};

const fromCampus = (id: CampusId, numeral: string, english: string, aspect: number): Plate => {
  const entry = photo(id);
  return {
    id,
    numeral,
    src: entry.src,
    large: entry.large,
    alt: entry.alt,
    caption: entry.caption,
    english,
    aspect,
  };
};

const RECEPTION = fromCampus("reception", "II", "Reception", 2000 / 1333);
const SHOWROOM = fromCampus("showroom", "III", "Showroom", 2000 / 1333);
const LAB = fromCampus("lab", "IV", "Laboratory", 2400 / 988);
const OFFICE = fromCampus("office", "V", "Open office", 2000 / 1334);
const AERIAL = fromCampus("aerial", "VI", "Headquarters, from above", 2000 / 1498);
const LOUNGE = fromCampus("lounge", "VII", "Lounge", 2000 / 1333);
const GROUNDS = fromCampus("grounds", "VIII", "Grounds", 1400 / 2100);

export const ROOMS_IN_WALKING_ORDER: readonly { plate: Plate; doorwayToNext?: Doorway }[] = [
  { plate: LOBBY, doorwayToNext: { x: 0.504, y: 0.63, scale: 0.2 } },
  { plate: RECEPTION, doorwayToNext: { x: 0.5, y: 0.45, scale: 0.17 } },
  { plate: SHOWROOM, doorwayToNext: { x: 0.474, y: 0.606, scale: 0.115 } },
  { plate: LAB, doorwayToNext: { x: 0.52, y: 0.5, scale: 0.18 } },
  { plate: OFFICE },
];

export const AERIAL_PLATE = AERIAL;

export const OFFICE_ON_AERIAL = { x: 0.645, y: 0.45, shareOfAerialWidth: 0.19 } as const;

export const INDEX_PLATES_VISITED_THEN_UNVISITED: readonly Plate[] = [
  RECEPTION,
  SHOWROOM,
  LAB,
  OFFICE,
  AERIAL,
  LOUNGE,
  GROUNDS,
];
