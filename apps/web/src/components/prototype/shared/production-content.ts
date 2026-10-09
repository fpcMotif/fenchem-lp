import { Sprout, FlaskConical, Globe } from "lucide-react";
import type { IngredientApplication } from "@/components/landing/landing-content";
export const IMG = {
  hero: "https://images.unsplash.com/photo-1530013526807-2ec93afddab9?auto=format&fit=crop&w=1600&q=80",
  heroThumb:
    "https://images.unsplash.com/photo-1530013526807-2ec93afddab9?auto=format&fit=crop&w=900&q=80",
  lab: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=1400&q=80",
  origin:
    "https://images.unsplash.com/photo-1630095829654-b734f5cb2b25?auto=format&fit=crop&w=1200&q=80",
} as const;
export const STATS = [
  {
    value: "30+",
    unit: "Years",
    desc: "Botanical expertise since 1995",
  },
  {
    value: "6",
    unit: "Global Bases",
    desc: "R&D hubs across three continents",
  },
  {
    value: "ISO/GMP",
    unit: "Certified",
    desc: "Audited quality on every lot",
  },
  {
    value: "40+",
    unit: "Countries",
    desc: "Regulated markets supplied",
  },
] as const;
export const PILLAR_ICONS = [Sprout, FlaskConical, Globe] as const;
export const FOOTER_COLS = [
  {
    head: "Portfolio",
    links: [
      {
        label: "Ingredient Matrix",
        href: "#matrix",
      },
      {
        label: "Product Dossiers",
        href: "#product",
      },
      {
        label: "Formulation Support",
        href: "#formulation",
      },
      {
        label: "Nutrition Actives",
        href: "#matrix",
      },
    ],
  },
  {
    head: "Standards",
    links: [
      {
        label: "Quality Charter",
        href: "#standards",
      },
      {
        label: "Regulatory Dossiers",
        href: "#contact",
      },
      {
        label: "Sourcing Standards",
        href: "#standards",
      },
      {
        label: "Ingredient Transparency",
        href: "#matrix",
      },
    ],
  },
  {
    head: "Partner",
    links: [
      {
        label: "Request a Specification",
        href: "#contact",
      },
      {
        label: "Partner Inquiries",
        href: "#contact",
      },
      {
        label: "Technical Dossiers",
        href: "#contact",
      },
      {
        label: "Global Offices",
        href: "#contact",
      },
    ],
  },
] as const;
export const MENU_APPLICATIONS: IngredientApplication[] = [
  "Nutrition",
  "Food & Beverage",
  "Personal Care",
];
export const FORM_OPTIONS = ["Powder", "Beadlet", "Oil suspension", "Granular"] as const;
