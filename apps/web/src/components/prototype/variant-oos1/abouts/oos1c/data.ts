import { ABOUT_BANNER, ABOUT_CAMPUS, ABOUT_HERO } from "../../about-data";
import { STATS } from "../../content";

export const PHOTO_ENGLISH = {
  aerial: "Headquarters",
  lab: "R&D Laboratory",
  showroom: "Showroom",
  reception: "Reception Hall",
  lounge: "Staff Lounge",
  office: "Open Office",
  grounds: "Campus Grounds",
} as const satisfies Record<(typeof ABOUT_CAMPUS.photos)[number]["id"], string>;

export const PHOTO_SHAPE = {
  aerial: "classic",
  lab: "wide",
  showroom: "square",
  reception: "square",
  lounge: "broad",
  office: "square",
  grounds: "tall",
} as const satisfies Record<(typeof ABOUT_CAMPUS.photos)[number]["id"], string>;

export const LOBBY_ALT = "Fenchem headquarters lobby with a curved ceiling and marble floor";

export const NAV_ENGLISH: Record<string, string> = {
  "about-profile": "Profile",
  "about-campus": "Campus",
  "about-culture": "Culture",
  "about-csr": "Responsibility",
  "about-honor": "Honors",
  "about-structure": "Structure",
};

export const GROUPS = [
  { id: "about-profile", label: ABOUT_HERO.navChips[0].label },
  { id: "about-campus", label: ABOUT_HERO.navChips[1].label },
  { id: "about-culture", label: ABOUT_HERO.navChips[2].label },
] as const;

export const STAT_ENGLISH = {
  公司历史: "Company history",
  全球分公司: "Global offices",
  生产基地: "Production bases",
} as const satisfies Record<(typeof STATS)[number]["label"], string>;

export const STRIP_PHRASES = [
  ABOUT_BANNER.tagline,
  ABOUT_HERO.englishTitle,
  ABOUT_BANNER.established,
  ABOUT_BANNER.place,
] as const;

export const STRIP_LOOPS = 2;
