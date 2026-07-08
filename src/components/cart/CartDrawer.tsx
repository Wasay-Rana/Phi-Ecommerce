"use client";

import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore, cartSubtotal } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/product/ProductImage";
import { getProductBySlug } from "@/data/products";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = cartSubtotal(items);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-primary/40 animate-fade-in"
        onClick={closeDrawer}
        aria-hidden
      />
      <div className="relative flex h-full w-full max-w-md flex-col bg-surface shadow-xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-primary">Your Cart</h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg-alt"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingBag className="h-10 w-10 text-secondary" strokeWidth={1.25} />
            <p className="font-semibold text-primary">Your cart is empty</p>
            <p className="text-meta text-secondary">Add something you&apos;ll love.</p>
            <Link
              href="/shop"
              onClick={closeDrawer}
              className="mt-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-text shadow-glow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => {
                  const product = getProductBySlug(item.slug);
                  return (
                    <li key={`${item.slug}-${item.variant ?? ""}`} className="flex gap-3">
                      <ProductImage
                        category={product?.category ?? "phone-accessories"}
                        className="h-20 w-20 shrink-0 rounded-xl"
                        iconClassName="h-8 w-8"
                      />
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeDrawer}
                            className="line-clamp-2 text-sm font-medium text-primary hover:underline"
                          >
                            {item.name}
                          </Link>
                          <button
                            type="button"
                            aria-label="Remove item"
                            onClick={() => removeItem(item.slug, item.variant)}
                            className="text-secondary hover:text-error"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        {item.variant && (
                          <span className="text-meta text-secondary">{item.variant}</span>
                        )}
                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-border">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                setQuantity(item.slug, item.variant, item.quantity - 1)
                              }
                              className="flex h-7 w-7 items-center justify-center text-primary hover:bg-bg-alt"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() =>
                                setQuantity(item.slug, item.variant, item.quantity + 1)
                              }
                              className="flex h-7 w-7 items-center justify-center text-primary hover:bg-bg-alt"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-primary">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-border p-4">
              <div className="mb-3 flex items-center justify-between text-sm text-secondary">
                <span>Subtotal</span>
                <span className="text-base font-semibold text-primary">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mb-3 text-meta text-secondary">
                Shipping and totals calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="block w-full rounded-full bg-accent py-3 text-center text-sm font-semibold text-accent-text shadow-glow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="mt-2 block w-full rounded-full border border-border py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-bg-alt"
              >
                View cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
