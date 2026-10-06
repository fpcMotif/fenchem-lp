import {
  ABOUT_CAMPUS,
  ABOUT_CSR,
  ABOUT_CULTURE,
  ABOUT_HERO,
  ABOUT_HONORS,
  ABOUT_STRUCTURE,
} from "../../about-data";

export type SectionId =
  | "about-top"
  | "about-profile"
  | "about-campus"
  | "about-culture"
  | "about-csr"
  | "about-honor"
  | "about-structure";

export type Segment = { text: string; heavy: boolean };
export type Hinge = "，" | "、";
export type DisplaySize = "s0" | "s1" | "s2" | "s3";

export type Phrase = {
  section: SectionId;
  size: DisplaySize;
  segments: readonly Segment[];
  hinge: Hinge | null;
};

export type Unit = Phrase & { index: number; id: string };

function weigh(text: string, heavy: readonly string[]): Segment[] {
  const segments: Segment[] = [];
  let rest = text;
  while (rest) {
    const hits = heavy
      .map((word) => ({ word, at: rest.indexOf(word) }))
      .filter((hit) => hit.at >= 0)
      .sort((a, b) => a.at - b.at);
    const first = hits[0];
    if (!first) {
      segments.push({ text: rest, heavy: false });
      break;
    }
    if (first.at > 0) segments.push({ text: rest.slice(0, first.at), heavy: false });
    segments.push({ text: first.word, heavy: true });
    rest = rest.slice(first.at + first.word.length);
  }
  return segments;
}

function phrase(
  section: SectionId,
  size: DisplaySize,
  text: string,
  heavy: readonly string[],
): Phrase {
  const last = text.at(-1);
  const hinge = last === "，" || last === "、" ? last : null;
  return { section, size, segments: weigh(hinge ? text.slice(0, -1) : text, heavy), hinge };
}

function cut(text: string, markers: readonly string[]): string[] {
  const pieces: string[] = [];
  let rest = text;
  for (const marker of markers) {
    const end = rest.indexOf(marker) + marker.length;
    pieces.push(rest.slice(0, end));
    rest = rest.slice(end);
  }
  return [...pieces, rest];
}

const enumerate = (index: number, count: number) => (index === count - 1 ? "，" : "、");

const units: Unit[] = [];

function take(phrases: readonly Phrase[]): Unit[] {
  return phrases.map((item) => {
    const unit = { ...item, index: units.length, id: `oos1l-line-${units.length}` };
    units.push(unit);
    return unit;
  });
}

const [subjectHead, subjectTail] = cut(ABOUT_HERO.title, ["南京泛成"]);
const [founding, focus, chain] = ABOUT_HERO.lead.replace(/。$/u, "").split("，");
const [branches, spread] = ABOUT_HERO.networkLabel.split("，");
const countryRows = [
  ABOUT_HERO.countries.slice(0, 4),
  ABOUT_HERO.countries.slice(4, 8),
  ABOUT_HERO.countries.slice(8, 10),
  ABOUT_HERO.countries.slice(10),
];
const [focusA, focusB, focusC] = cut(`${focus}，`, ["食品营养品、", "行业"]);
const [chainA, chainB] = cut(`${chain}，`, ["研产销"]);
const [csrA, csrB] = ABOUT_CSR.statement;

const HONOR_PREFIXES = ["南京市级", "江苏省", "南京市", "国家"];
const honorPrefix = (title: string) =>
  HONOR_PREFIXES.find((prefix) => title.startsWith(prefix)) ?? "";
const tradeName = (name: string) => name.slice(2, name.indexOf("生物"));

const hero = take([
  phrase("about-top", "s0", subjectHead, ["泛成"]),
  phrase("about-top", "s0", `${subjectTail}，`, []),
]);

const profile = {
  founding: take([phrase("about-profile", "s1", `${founding}，`, ["1995", "南京"])]),
  focus: take([
    phrase("about-profile", "s2", focusA, ["食品营养品"]),
    phrase("about-profile", "s2", focusB, ["宠物健康", "个人护理"]),
    phrase("about-profile", "s2", focusC, ["原料", "解决方案"]),
  ]),
  chain: take([
    phrase("about-profile", "s2", chainA, ["研产销"]),
    phrase("about-profile", "s2", chainB, ["完整产业链"]),
  ]),
  branches: take([phrase("about-profile", "s2", `${branches}，`, ["16"])]),
  countries: take(
    countryRows.map((row, index) =>
      phrase(
        "about-profile",
        "s3",
        `${index === 0 ? spread : ""}${row.join("、")}${enumerate(index, countryRows.length)}`,
        row,
      ),
    ),
  ),
};

const campus = take(
  ABOUT_CAMPUS.photos.map((photo, index, all) =>
    phrase("about-campus", "s2", `${photo.caption}${enumerate(index, all.length)}`, [
      photo.caption.slice(2),
    ]),
  ),
);

const culture = take(
  ABOUT_CULTURE.values.map((value, index, all) =>
    phrase("about-culture", "s1", `${value.title}${enumerate(index, all.length)}`, [
      value.title.slice(0, 2),
      value.title.slice(3),
    ]),
  ),
);

const csr = take([
  phrase("about-csr", "s2", csrA, ["生态环境", "客户需求"]),
  phrase("about-csr", "s2", csrB.replace(/。$/u, "，"), ["可持续发展"]),
]);

const honors = take(
  ABOUT_HONORS.items.map((item, index, all) =>
    phrase("about-honor", "s3", `${item.title}${enumerate(index, all.length)}`, [
      item.title.slice(honorPrefix(item.title).length),
    ]),
  ),
);

const structure = {
  lead: take([
    phrase("about-structure", "s2", `旗下${ABOUT_STRUCTURE.subsidiaryBadge}，`, [
      ABOUT_STRUCTURE.subsidiaryBadge,
    ]),
  ]),
  subsidiaries: take(
    ABOUT_STRUCTURE.subsidiaries.map((company, index, all) =>
      phrase("about-structure", "s3", `${company.name}${enumerate(index, all.length)}`, [
        tradeName(company.name),
      ]),
    ),
  ),
};

const closingText = ABOUT_CULTURE.values[2].desc.replace(/。$/u, "").split("，").at(-1) ?? "";

export const SENTENCE = { hero, profile, campus, culture, csr, honors, structure };

export const CLOSING: Phrase = phrase("about-structure", "s1", closingText, ["客户", "成长"]);

export const UNITS: readonly Unit[] = units;
