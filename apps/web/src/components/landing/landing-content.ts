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

/**
 * A Fenchem business unit. Each maps to one auxiliary brand color. See CONTEXT.md.
 * Ingredients carry an `application`; `divisionForApplication` resolves the accent.
 */
export type DivisionKey = "feed" | "cosmetics" | "agro" | "food" | "chem" | "nutrition";

export type IngredientApplication = "Nutrition" | "Food & Beverage" | "Personal Care";

export type Ingredient = {
  /** Trade / portfolio name, e.g. "Ashwagandha KSM-66". */
  name: string;
  /** Botanical or source name, e.g. "Withania somnifera". */
  latin: string;
  /** Application area the ingredient is sold into. Drives `divisionForApplication`. */
  application: IngredientApplication;
  /** Short delivery-format note shown in the production landing page. */
  specification: string;
  /** Assay / grade headline, e.g. "≥ 5% withanolides". */
  purity: string;
  /** Physical format, e.g. "Beadlet · oil suspension". */
  form: string;
  /** Internal spec reference, e.g. "FN-014". */
  code: string;
  /** Compound class shown as a wayfinding tag, e.g. "Adaptogen". */
  category: string;
  /** Headline application / benefit shown in matrix rows, e.g. "Ocular health systems". */
  useCase: string;
  /** Representative imagery for matrix / rail presentations. */
  image: ImageAsset;
  /** Whether the ingredient appears in the curated 6-item portfolio matrix / rail. */
  featured: boolean;
};

export type Industry = {
  title: string;
  copy: string;
  image: ImageAsset;
};

export type Pillar = {
  title: string;
  copy: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type ProcessStep = {
  title: string;
  copy: string;
};

export type Certification = {
  name: string;
  sub: string;
};

export type Region = {
  city: string;
  country: string;
  role: string;
  /** Compact region label for dense node grids, e.g. "Americas". */
  short: string;
  /** Approximate latitude / longitude, e.g. "N 32.06 / E 118.79". */
  coords: string;
};

/** Stable company facts re-used across every presentation. */
export const company = {
  name: "Fenchem",
  legalName: "Fenchem Biotek Ltd.",
  founded: 1995,
  since: "Since 1995",
  tagline: "Rooted in Nature, Refined by Science",
  email: "sales@fenchem.com",
  hq: { city: "Nanjing", country: "China", coords: "N 32.06 / E 118.79" },
} as const;

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
    metric: "30+ years",
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

/**
 * Headline metrics. Holds the "since 1995" literal the variants used to re-inline.
 * Order: tenure, footprint, reach, certification.
 */
export const stats: Stat[] = [
  { value: "30+", label: "Years of botanical expertise since 1995" },
  { value: "6", label: "Global bases across three continents" },
  { value: "40+", label: "Countries served by our supply network" },
  { value: "ISO/GMP", label: "Certified manufacturing and quality systems" },
];

/** The three application industries Fenchem supplies. */
export const industries: Industry[] = [
  {
    title: "Nutrition & Supplements",
    copy: "Clinically supported actives — from Ashwagandha KSM-66 to Coenzyme Q10 — standardized for potency, stability and dose accuracy.",
    image: {
      src: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80",
      alt: "Botanical supplement capsules arranged on a neutral surface",
    },
  },
  {
    title: "Food & Beverage",
    copy: "Natural carotenoids, plant proteins and functional botanicals engineered for clean-label formulation at production scale.",
    image: {
      src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
      alt: "Fresh, vibrant food bowl with greens and grains in soft daylight",
    },
  },
  {
    title: "Personal Care & Cosmeceuticals",
    copy: "Bioactive botanicals and hyaluronic acid systems for skin, hair and beauty-from-within applications.",
    image: {
      src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
      alt: "Minimal skincare bottle in warm natural light",
    },
  },
];

/** Three pillars of the quality program, re-used across variants. */
export const pillars: Pillar[] = [
  {
    title: "Traceable Sourcing",
    copy: "Direct partnerships with growers and a documented chain of custody — from field and harvest to finished extract.",
  },
  {
    title: "Clinical-Grade R&D",
    copy: "In-house laboratories validate identity, potency and stability on every lot, with third-party verification on request.",
  },
  {
    title: "Global Compliance",
    copy: "Regulatory dossiers and documentation support for more than forty markets, prepared before you ask.",
  },
];

export const ingredients: Ingredient[] = [
  {
    name: "Ashwagandha KSM-66",
    latin: "Withania somnifera",
    application: "Nutrition",
    specification: "Root extract",
    purity: "≥ 5% withanolides",
    form: "Root extract · powder",
    code: "FN-014",
    category: "Adaptogen",
    useCase: "Nutrition & Supplements",
    image: {
      src: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=900&q=80",
      alt: "Dried botanical roots and herbs arranged for extraction",
    },
    featured: true,
  },
  {
    name: "Lutein",
    latin: "Tagetes erecta",
    application: "Nutrition",
    specification: "Beadlet and oil suspension",
    purity: "5% – 80% gradient",
    form: "Beadlet · oil suspension",
    code: "FN-027",
    category: "Carotenoid",
    useCase: "Ocular health systems",
    image: {
      src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
      alt: "Pale botanical leaves photographed in soft laboratory light",
    },
    featured: true,
  },
  {
    name: "Astaxanthin",
    latin: "Haematococcus pluvialis",
    application: "Nutrition",
    specification: "Softgel-ready oleoresin",
    purity: "2.5% – 10% oleoresin",
    form: "Beadlet · softgel-ready",
    code: "FN-033",
    category: "Antioxidant",
    useCase: "Sports & recovery",
    image: {
      src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
      alt: "Macro photograph of a leaf surface with dew droplets",
    },
    featured: true,
  },
  {
    name: "Coenzyme Q10",
    latin: "Fermentation grade",
    application: "Nutrition",
    specification: "Powder and water-dispersible",
    purity: "≥ 98% ubiquinone",
    form: "Powder · water-dispersible",
    code: "FN-041",
    category: "Bioenergetic",
    useCase: "Cardiovascular health",
    image: {
      src: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80",
      alt: "Supplement capsules arranged in a precise grid",
    },
    featured: true,
  },
  {
    name: "Curcumin",
    latin: "Curcuma longa",
    application: "Food & Beverage",
    specification: "Granular and micronized",
    purity: "≥ 95% curcuminoids",
    form: "Granular · micronized",
    code: "FN-052",
    category: "Polyphenol",
    useCase: "Food & Beverage",
    image: {
      src: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80",
      alt: "Assorted supplement capsules and tablets in a loose pile",
    },
    featured: true,
  },
  {
    name: "Phytosterols",
    latin: "Glycine max",
    application: "Food & Beverage",
    specification: "Food-grade powder",
    purity: "≥ 95% total sterols",
    form: "Food-grade powder",
    code: "FN-058",
    category: "Sterol",
    useCase: "Heart health",
    image: {
      src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
      alt: "Fresh food bowl with greens, grains, and natural ingredients",
    },
    featured: false,
  },
  {
    name: "Hyaluronic Acid",
    latin: "Sodium hyaluronate",
    application: "Personal Care",
    specification: "Sodium hyaluronate",
    purity: "Cosmetic & food grade",
    form: "Sodium hyaluronate",
    code: "FN-068",
    category: "Humectant",
    useCase: "Personal Care",
    image: {
      src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
      alt: "Minimal skincare bottle beside botanical materials",
    },
    featured: true,
  },
  {
    name: "Beta-Carotene",
    latin: "Blakeslea trispora",
    application: "Food & Beverage",
    specification: "Natural color system",
    purity: "1% – 30% range",
    form: "Suspension · powder",
    code: "FN-072",
    category: "Carotenoid",
    useCase: "Natural color",
    image: {
      src: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?auto=format&fit=crop&w=900&q=80",
      alt: "Fresh greens and botanical color sources in daylight",
    },
    featured: false,
  },
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

/** Quality certifications with a short qualifier for detailed presentations. */
export const certificationDetails: Certification[] = [
  { name: "ISO 9001", sub: "Quality Management" },
  { name: "FSSC 22000", sub: "Food Safety" },
  { name: "GMP", sub: "Good Manufacturing Practice" },
  { name: "HACCP", sub: "Hazard Analysis" },
  { name: "Kosher", sub: "Dietary Certified" },
  { name: "Halal", sub: "Certified" },
];

/** Certification names only — derived so the two views never drift. */
export const certifications: string[] = certificationDetails.map(
  (certification) => certification.name,
);

export const regions: Region[] = [
  {
    city: "Nanjing",
    country: "China",
    role: "Headquarters and R&D",
    short: "HQ · R&D",
    coords: "N 32.06 / E 118.79",
  },
  {
    city: "Hackensack",
    country: "United States",
    role: "Americas support",
    short: "Americas",
    coords: "N 40.89 / W 74.04",
  },
  {
    city: "Frankfurt",
    country: "Germany",
    role: "European compliance",
    short: "Europe",
    coords: "N 50.11 / E 8.68",
  },
  {
    city: "Johannesburg",
    country: "South Africa",
    role: "Africa gateway",
    short: "Africa",
    coords: "S 26.20 / E 28.05",
  },
  {
    city: "São Paulo",
    country: "Brazil",
    role: "LATAM supply",
    short: "LATAM",
    coords: "S 23.55 / W 46.63",
  },
  {
    city: "Kuala Lumpur",
    country: "Malaysia",
    role: "Southeast Asia logistics",
    short: "SE Asia",
    coords: "N 3.14 / E 101.69",
  },
];

/** Maps an ingredient application to its Fenchem division accent. */
export const divisionByApplication: Record<IngredientApplication, DivisionKey> = {
  Nutrition: "nutrition",
  "Food & Beverage": "food",
  "Personal Care": "cosmetics",
};

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

/** The curated subset shown in matrix / rail presentations (six ingredients). */
export function getFeaturedIngredients(): Ingredient[] {
  return ingredients.filter((ingredient) => ingredient.featured);
}

/** Resolves the division accent for an ingredient application. */
export function divisionForApplication(application: IngredientApplication): DivisionKey {
  return divisionByApplication[application];
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
  return `mailto:${company.email}?subject=${subject}&body=${body}`;
}

export function getLandingSummary() {
  return {
    navLinks: navLinks.length,
    proofCards: proofCards.length,
    industries: industries.length,
    pillars: pillars.length,
    stats: stats.length,
    ingredients: ingredients.length,
    featuredIngredients: getFeaturedIngredients().length,
    processSteps: processSteps.length,
    certifications: certifications.length,
    regions: regions.length,
  };
}
