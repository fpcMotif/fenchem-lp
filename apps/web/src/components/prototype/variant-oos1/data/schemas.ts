import * as z from "zod/mini";

const text = z.string().check(z.minLength(1));
const textList = z.array(text);

export const solutionAreaId = z.enum(["face", "body", "hair", "sun", "dairy", "bakery"]);

export const solutionAreaRowSchema = z.strictObject({
  categoryId: text,
  id: solutionAreaId,
  label: text,
  englishLabel: text,
});

export const solutionRowSchema = z.strictObject({
  categoryId: text,
  id: text,
  area: solutionAreaId,
  title: text,
  englishName: text,
  subtitle: text,
  overview: textList,
  functions: textList,
  keyIngredients: textList,
  challenges: textList,
  texture: textList,
  applications: textList,
});

export const catalogItemSchema = z.strictObject({
  id: text,
  title: text,
  englishName: text,
  inci: text,
  features: text,
  tag: z.optional(text),
});

export const catalogGroupRowSchema = z.strictObject({
  categoryId: text,
  id: text,
  label: text,
  englishLabel: text,
  intro: z.optional(text),
  items: z.array(catalogItemSchema),
});

export const catalogCategoryRowSchema = z.strictObject({
  categoryId: text,
  lead: z.optional(text),
  specLabel: text,
  featuresLabel: text,
});

export type SolutionAreaId = z.infer<typeof solutionAreaId>;
export type CatalogItem = z.infer<typeof catalogItemSchema>;
