"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartLineItem } from "@/types/product";

export interface CompletedOrder {
  orderId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  items: CartLineItem[];
  subtotal: number;
  shipping: number;
  total: number;
  emailSent: boolean;
}

interface OrderState {
  lastOrder: CompletedOrder | null;
  setLastOrder: (order: CompletedOrder) => void;
  clearLastOrder: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      lastOrder: null,
      setLastOrder: (order) => set({ lastOrder: order }),
      clearLastOrder: () => set({ lastOrder: null }),
    }),
    { name: "phi-last-order" }
  )
);

export function generateOrderId(): string {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `PHI-${random}`;
}
