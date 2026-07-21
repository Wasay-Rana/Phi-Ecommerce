import { Niche, ProductCategory } from "@/types/product";

export const categoryLabels: Record<ProductCategory, string> = {
  audio: "Audio",
  charging: "Charging",
  wearables: "Wearables",
  "phone-accessories": "Phone Accessories",
  "smart-home": "Smart Home",
  desk: "Desk Setup",
  lamps: "3D-Printed Lamps",
  decor: "Decor",
  kits: "STEM Kits",
};

export const niches: { id: Niche; label: string; tagline: string }[] = [
  { id: "tech", label: "Tech", tagline: "Everyday electronics & desk gear" },
  { id: "stem", label: "STEM & Maker", tagline: "3D-printed lamps, decor & build kits" },
];

export const nicheOf: Record<ProductCategory, Niche> = {
  audio: "tech",
  charging: "tech",
  wearables: "tech",
  "phone-accessories": "tech",
  "smart-home": "tech",
  desk: "tech",
  lamps: "stem",
  decor: "stem",
  kits: "stem",
};

export const categoriesByNiche: Record<Niche, ProductCategory[]> = {
  tech: ["audio", "charging", "wearables", "phone-accessories", "desk", "smart-home"],
  stem: ["lamps", "decor", "kits"],
};
