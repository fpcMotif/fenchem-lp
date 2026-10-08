import { SOLUTION_ITEMS } from "../../products-data";
import { FORMULA_TRAITS, INGREDIENT_BY_ID, type Ingredient } from "../shared/derived";

export interface IngredientPart {
  key: string;
  name: string;
  note: string | null;
  catalogId: string | null;
}

export interface FormulaIngredients {
  parts: IngredientPart[];
  catalogCount: number;
}

const PART_SEPARATOR = /\s*\/\s*|、/;
const TRAILING_NOTE = /^(.+?)（([^）]+)）$/;

const containsInOrder = (needle: string, haystack: string) => {
  let matched = 0;
  for (const char of haystack) {
    if (char === needle[matched]) matched += 1;
    if (matched === needle.length) return true;
  }
  return false;
};

const matchesIngredient = (name: string, ingredient: Ingredient) =>
  name.includes(ingredient.label) ||
  ingredient.label.includes(name) ||
  containsInOrder(ingredient.label, name);

const catalogCandidates = (formulaId: string): Ingredient[] =>
  (FORMULA_TRAITS[formulaId]?.uses ?? [])
    .map((id) => INGREDIENT_BY_ID[id])
    .filter((ingredient): ingredient is Ingredient => Boolean(ingredient?.catalogId));

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  if (!match) return { name: text, note: null };
  return { name: match[1] ?? text, note: match[2] ?? null };
};

const formulaIngredients = (formulaId: string, keyIngredients: string[]): FormulaIngredients => {
  const candidates = catalogCandidates(formulaId);
  const parts = keyIngredients.flatMap((line) =>
    line
      .split(PART_SEPARATOR)
      .filter(Boolean)
      .map((piece) => {
        const { name, note } = splitNote(piece.trim());
        const match = candidates.find((ingredient) => matchesIngredient(name, ingredient));
        return { key: piece, name, note, catalogId: match?.catalogId ?? null };
      }),
  );
  const catalogCount = new Set(parts.map((part) => part.catalogId).filter(Boolean)).size;
  return { parts, catalogCount };
};

export const FORMULA_INGREDIENTS: Record<string, FormulaIngredients> = Object.fromEntries(
  SOLUTION_ITEMS.map((item) => [item.id, formulaIngredients(item.id, item.keyIngredients)]),
);
