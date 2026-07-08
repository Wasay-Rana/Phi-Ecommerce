export type ProductCategory =
  | "audio"
  | "charging"
  | "wearables"
  | "phone-accessories"
  | "smart-home";

export type ProductBadge = "new" | "bestseller" | "sale";

export interface ProductVariant {
  id: string;
  label: string;
  hex?: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  badges?: ProductBadge[];
  images: string[];
  colorVariants?: ProductVariant[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface CartLineItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  variant?: string;
  quantity: number;
}
