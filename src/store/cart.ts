"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartLineItem } from "@/types/product";

interface CartState {
  items: CartLineItem[];
  isDrawerOpen: boolean;
  addItem: (item: CartLineItem) => void;
  removeItem: (slug: string, variant?: string) => void;
  setQuantity: (slug: string, variant: string | undefined, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

function sameLine(a: CartLineItem, slug: string, variant?: string) {
  return a.slug === slug && a.variant === variant;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isDrawerOpen: false,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => sameLine(i, item.slug, item.variant));
          if (existing) {
            return {
              items: state.items.map((i) =>
                sameLine(i, item.slug, item.variant)
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isDrawerOpen: true,
            };
          }
          return { items: [...state.items, item], isDrawerOpen: true };
        }),
      removeItem: (slug, variant) =>
        set((state) => ({
          items: state.items.filter((i) => !sameLine(i, slug, variant)),
        })),
      setQuantity: (slug, variant, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (sameLine(i, slug, variant) ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
    }),
    {
      name: "phi-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export function cartCount(items: CartLineItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartSubtotal(items: CartLineItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}
