"use client";

import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { Product } from "@/types/product";
import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { urlFor } from "@/lib/sanity/image";

const badgeStyles: Record<string, string> = {
  new: "bg-surface text-accent-text",
  bestseller: "bg-primary text-inverse",
  sale: "bg-error text-inverse",
};

const badgeLabels: Record<string, string> = {
  new: "New",
  bestseller: "Bestseller",
  sale: "Sale",
};

const badgeOrder = ["sale", "bestseller", "new"];

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  // "Sale" is the stronger signal — drop "Bestseller" when both apply so the
  // badge row stays compact, and keep "Sale" leftmost when badges do combine.
  const displayBadges = (
    product.badges?.includes("sale")
      ? product.badges.filter((b) => b !== "bestseller")
      : product.badges
  )
    ?.slice()
    .sort((a, b) => badgeOrder.indexOf(a) - badgeOrder.indexOf(b));

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:ring-transparent">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden">
        <ProductImage
          images={product.images}
          alt={product.name}
          className="aspect-square w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          iconClassName="h-16 w-16"
        />
        {displayBadges && displayBadges.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-row gap-1.5">
            {displayBadges.map((badge) => (
              <span
                key={badge}
                className={`rounded-full px-2.5 py-1 text-meta font-semibold shadow-xs ${badgeStyles[badge]}`}
              >
                {badgeLabels[badge]}
              </span>
            ))}
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/70 backdrop-blur-[2px]">
            <span className="rounded-full bg-primary px-3 py-1 text-meta font-semibold text-inverse">
              Out of stock
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-1 font-semibold text-primary">{product.name}</h3>
        </Link>
        <p className="line-clamp-1 text-meta text-secondary">{product.tagline}</p>

        <div className="flex items-center gap-1 text-meta text-secondary">
          <Star className="h-3.5 w-3.5 fill-accent-dark text-accent-dark" />
          <span>{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-primary">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-meta text-secondary line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            disabled={!product.inStock}
            onClick={() =>
              addItem({
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0] ? urlFor(product.images[0]).width(200).url() : "",
                category: product.category,
                quantity: 1,
              })
            }
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-text transition-all hover:scale-110 hover:bg-accent-hover hover:shadow-glow-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
