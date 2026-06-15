export const sectionIds = ["industries", "quality", "global-supply", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];
export type SectionAnchor = `#${SectionId}`;

export type NavLink = {
  label: string;
  section: SectionId;
};

export type ImageAsset = {
  src: string;
  alt: string;
};

export type ProofCard = {
  title: string;
  copy: string;
  metric: string;
  image: ImageAsset;
};

export type Ingredient = {
  name: string;
  application: "Nutrition" | "Food & Beverage" | "Personal Care";
  specification: string;
};

export type ProcessStep = {
  title: string;
  copy: string;
};

export type Region = {
  city: string;
  role: string;
};

export const navLinks: NavLink[] = [
  { label: "Industries", section: "industries" },
  { label: "Quality", section: "quality" },
  { label: "Global Supply", section: "global-supply" },
  { label: "Contact", section: "contact" },
];

export const heroImage: ImageAsset = {
  src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2200&q=82",
  alt: "Macro view of a fresh green leaf with dew, representing botanical ingredient sourcing",
};

export const proofCards: ProofCard[] = [
  {
    title: "Nutrition actives",
    copy: "Standardized botanical extracts, carotenoids, and bioenergetic compounds built for precise dose targets.",
    metric: "25+ years",
    image: {
      src: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1000&q=80",
      alt: "Supplement capsules arranged on a neutral laboratory surface",
    },
  },
  {
    title: "Food and beverage",
    copy: "Clean-label colors, plant proteins, and stability-aware ingredients for scaled formulation.",
    metric: "40+ markets",
    image: {
      src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80",
      alt: "Fresh food bowl with greens, grains, and natural ingredients",
    },
  },
  {
    title: "Personal care",
    copy: "Bioactive beauty ingredients, humectants, and skin-compatible systems with clear documentation.",
    metric: "ISO / GMP",
    image: {
      src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=80",
      alt: "Minimal skincare bottle beside botanical materials",
    },
  },
  {
    title: "Documentation first",
    copy: "Specifications, allergen statements, regulatory dossiers, and lot traceability prepared before sampling.",
    metric: "24h response",
    image: {
      src: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1000&q=80",
      alt: "Scientist using laboratory equipment for ingredient analysis",
    },
  },
];

export const ingredients: Ingredient[] = [
  { name: "Ashwagandha KSM-66", application: "Nutrition", specification: "Root extract" },
  { name: "Lutein", application: "Nutrition", specification: "Beadlet and oil suspension" },
  { name: "Astaxanthin", application: "Nutrition", specification: "Softgel-ready oleoresin" },
  { name: "Coenzyme Q10", application: "Nutrition", specification: "Powder and water-dispersible" },
  { name: "Curcumin", application: "Food & Beverage", specification: "Granular and micronized" },
  { name: "Phytosterols", application: "Food & Beverage", specification: "Food-grade powder" },
  { name: "Hyaluronic Acid", application: "Personal Care", specification: "Sodium hyaluronate" },
  { name: "Beta-Carotene", application: "Food & Beverage", specification: "Natural color system" },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Source by origin",
    copy: "Grower relationships, harvest records, and chain-of-custody checks keep each lot traceable.",
  },
  {
    title: "Validate identity",
    copy: "In-house chromatography and microbiology panels confirm potency, stability, and safety.",
  },
  {
    title: "Match the format",
    copy: "Powder, beadlet, oil, and water-dispersible formats are selected around your delivery system.",
  },
  {
    title: "Release with proof",
    copy: "Certificates, dossiers, and compliance documents travel with every production-ready ingredient.",
  },
];

export const certifications = [
  "ISO 9001",
  "FSSC 22000",
  "GMP",
  "HACCP",
  "Kosher",
  "Halal",
] as const;

export const regions: Region[] = [
  { city: "Nanjing", role: "Headquarters and R&D" },
  { city: "Hackensack", role: "Americas support" },
  { city: "Frankfurt", role: "European compliance" },
  { city: "Johannesburg", role: "Africa gateway" },
  { city: "Sao Paulo", role: "LATAM supply" },
  { city: "Kuala Lumpur", role: "Southeast Asia logistics" },
];

export function toAnchor(section: SectionId): SectionAnchor {
  return `#${section}`;
}

export function isSectionId(value: string): value is SectionId {
  const normalized = value.trim().replace(/^#+/, "").toLowerCase();
  return sectionIds.includes(normalized as SectionId);
}

export function resolveSectionAnchor(
  value: unknown,
  fallback: SectionId = "contact",
): SectionAnchor {
  if (typeof value !== "string") {
    return toAnchor(fallback);
  }
  const normalized = value.trim().replace(/^#+/, "").toLowerCase();
  return isSectionId(normalized) ? toAnchor(normalized) : toAnchor(fallback);
}

export function getIngredientsByApplication(application?: string): Ingredient[] {
  const normalized = application?.trim().toLowerCase();
  if (!normalized) {
    return [...ingredients];
  }
  return ingredients.filter((ingredient) => ingredient.application.toLowerCase() === normalized);
}

export function createInquiryHref(source: unknown = "contact"): string {
  const anchor = resolveSectionAnchor(source);
  const section = anchor.slice(1) as SectionId;
  const subjectBySection: Record<SectionId, string> = {
    industries: "Fenchem ingredient portfolio inquiry",
    quality: "Fenchem quality documentation request",
    "global-supply": "Fenchem global supply inquiry",
    contact: "Fenchem partnership inquiry",
  };
  const subject = encodeURIComponent(subjectBySection[section]);
  const body = encodeURIComponent("Please send specifications, lead times, and documentation.");
  return `mailto:sales@fenchem.com?subject=${subject}&body=${body}`;
}

export function getLandingSummary() {
  return {
    navLinks: navLinks.length,
    proofCards: proofCards.length,
    ingredients: ingredients.length,
    processSteps: processSteps.length,
    certifications: certifications.length,
    regions: regions.length,
  };
}
