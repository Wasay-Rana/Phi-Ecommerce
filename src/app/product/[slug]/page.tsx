import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Star, ShieldCheck, Truck } from "lucide-react";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToCartPanel } from "@/components/product/AddToCartPanel";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — Phi`,
    description: product.tagline,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <>
      <div className="container-page py-10">
        <div className="grid gap-10 md:grid-cols-2">
          <ProductGallery category={product.category} images={product.images} />

          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-section-lg text-primary">{product.name}</h1>
              <p className="mt-1 text-secondary">{product.tagline}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-secondary">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating) ? "fill-accent-dark text-accent-dark" : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span>
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-secondary line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <AddToCartPanel product={product} />

            <div className="flex flex-col gap-2 rounded-2xl bg-bg-alt p-4 text-sm text-secondary">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-accent-text" />
                Free delivery on orders over Rs. 5,000
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent-text" />
                7-day easy returns, no questions asked
              </div>
            </div>

            <ProductTabs description={product.description} specs={product.specs} />
          </div>
        </div>
      </div>

      <RelatedProducts products={related} />
    </>
  );
}
