import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Star, ShieldCheck, Truck } from "lucide-react";
import { categoryLabels, niches, nicheOf } from "@/data/taxonomy";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToCartPanel } from "@/components/product/AddToCartPanel";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${siteConfig.name}`,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const niche = niches.find((n) => n.id === nicheOf[product.category]);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug,
    image: product.images[0] ? urlFor(product.images[0]).width(1200).url() : undefined,
    brand: { "@type": "Brand", name: siteConfig.name },
    aggregateRating: product.reviewCount > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        }
      : undefined,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.siteUrl}/product/${product.slug}`,
      priceCurrency: "PKR",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="container-page py-10">
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              ...(niche ? [{ label: niche.label, href: `/shop?niche=${niche.id}` }] : []),
              { label: categoryLabels[product.category], href: `/shop?category=${product.category}` },
              { label: product.name },
            ]}
          />
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <ProductGallery images={product.images} alt={product.name} />

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
