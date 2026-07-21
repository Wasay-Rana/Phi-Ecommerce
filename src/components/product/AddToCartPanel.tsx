"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/image";

export function AddToCartPanel({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.colorVariants?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const selectedVariantLabel = product.colorVariants?.find((v) => v.id === variant)?.label;

  function handleAddToCart() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ? urlFor(product.images[0]).width(200).url() : "",
      category: product.category,
      variant: selectedVariantLabel,
      quantity,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-6">
      {product.colorVariants && product.colorVariants.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-primary">
            Color{selectedVariantLabel ? `: ${selectedVariantLabel}` : ""}
          </span>
          <div className="flex gap-2">
            {product.colorVariants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariant(v.id)}
                aria-label={v.label}
                className={cn(
                  "h-9 w-9 rounded-full border-2 transition-transform hover:scale-105",
                  variant === v.id ? "border-accent" : "border-border"
                )}
                style={{ backgroundColor: v.hex }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-primary">Quantity</span>
        <QuantitySelector quantity={quantity} onChange={setQuantity} />
      </div>

      <button
        type="button"
        disabled={!product.inStock}
        onClick={handleAddToCart}
        className="flex items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-semibold text-accent-text shadow-glow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0"
      >
        {justAdded ? (
          <>
            <Check className="h-4 w-4" />
            Added to cart
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </>
        )}
      </button>
    </div>
  );
}
