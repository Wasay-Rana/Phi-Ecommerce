import { sanityClient } from "./client";
import { nicheOf } from "@/data/taxonomy";
import { Niche, Product } from "@/types/product";

async function sanityFetch<T>(query: string, params: Record<string, unknown>, tags: string[]): Promise<T> {
  return sanityClient.fetch<T>(query, params, { cache: "force-cache", next: { tags } });
}

const PRODUCT_PROJECTION = `{
  "slug": slug.current,
  name,
  tagline,
  description,
  specs,
  price,
  compareAtPrice,
  category,
  badges,
  images[defined(asset._ref)]{ _key, asset, hotspot, alt },
  colorVariants,
  rating,
  reviewCount,
  inStock
}`;

export async function getAllProducts(): Promise<Product[]> {
  return sanityFetch<Product[]>(`*[_type == "product"] | order(name asc) ${PRODUCT_PROJECTION}`, {}, ["products"]);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const result = await sanityFetch<Product | null>(
    `*[_type == "product" && slug.current == $slug][0] ${PRODUCT_PROJECTION}`,
    { slug },
    ["products", `product:${slug}`]
  );
  return result ?? undefined;
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const all = await getAllProducts();
  return all
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(all.filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, limit);
}

export async function getProductsByNiche(niche: Niche): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => nicheOf[p.category] === niche);
}
