"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore, cartSubtotal } from "@/store/cart";
import { getProductBySlug } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useHasMounted } from "@/lib/useHasMounted";
import { ProductImage } from "@/components/product/ProductImage";
import { siteConfig } from "@/lib/config";

export default function CartPage() {
  const mounted = useHasMounted();
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!mounted) {
    return (
      <div className="container-page py-10">
        <div className="skeleton h-8 w-48 rounded-sm" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center justify-center gap-4 py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-secondary" strokeWidth={1.25} />
        <h1 className="text-section text-primary">Your cart is empty</h1>
        <p className="max-w-sm text-secondary">
          Looks like you haven&apos;t added anything yet. Explore our collection to find
          something you&apos;ll love.
        </p>
        <Link
          href="/shop"
          className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-text shadow-glow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const subtotal = cartSubtotal(items);
  const shipping = subtotal >= siteConfig.freeShippingThreshold ? 0 : siteConfig.shippingFee;
  const total = subtotal + shipping;

  return (
    <div className="container-page py-10">
      <h1 className="mb-8 text-section text-primary sm:text-section-lg">Your Cart</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="flex flex-col divide-y divide-border">
          {items.map((item) => {
            const product = getProductBySlug(item.slug);
            return (
              <li key={`${item.slug}-${item.variant ?? ""}`} className="flex gap-4 py-5">
                <ProductImage
                  category={product?.category ?? "phone-accessories"}
                  className="h-24 w-24 shrink-0 rounded-xl"
                  iconClassName="h-9 w-9"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {item.name}
                      </Link>
                      {item.variant && (
                        <p className="text-meta text-secondary">{item.variant}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => removeItem(item.slug, item.variant)}
                      className="text-secondary hover:text-error"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity(item.slug, item.variant, item.quantity - 1)}
                        className="flex h-9 w-9 items-center justify-center text-primary hover:bg-bg-alt"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQuantity(item.slug, item.variant, item.quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center text-primary hover:bg-bg-alt"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-semibold text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="h-fit rounded-3xl bg-surface p-6 shadow-card ring-1 ring-border/60">
          <h2 className="mb-4 font-semibold text-primary">Order Summary</h2>
          <div className="flex flex-col gap-2 text-sm text-secondary">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-primary">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-primary">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-meta">
                Add {formatPrice(siteConfig.freeShippingThreshold - subtotal)} more for free
                shipping.
              </p>
            )}
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4 font-semibold text-primary">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-semibold text-accent-text shadow-glow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
          >
            Proceed to checkout
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
