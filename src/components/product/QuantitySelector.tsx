"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className="flex items-center rounded-full border border-border">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="flex h-11 w-11 items-center justify-center text-primary hover:bg-bg-alt"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-10 text-center font-medium text-primary">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        className="flex h-11 w-11 items-center justify-center text-primary hover:bg-bg-alt"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
