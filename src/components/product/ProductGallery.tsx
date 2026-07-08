"use client";

import { useState, useRef, MouseEvent } from "react";
import { ProductCategory } from "@/types/product";
import { ProductImage } from "@/components/product/ProductImage";
import { cn } from "@/lib/utils";

export function ProductGallery({
  category,
  images,
}: {
  category: ProductCategory;
  images: string[];
}) {
  const [active, setActive] = useState(0);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [zoomed, setZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
        className="overflow-hidden rounded-2xl"
      >
        <ProductImage
          category={category}
          variantIndex={active}
          className="aspect-square w-full transition-transform duration-200"
          iconClassName="h-28 w-28 sm:h-36 sm:w-36"
          style={
            zoomed
              ? { transform: "scale(1.5)", transformOrigin: zoomOrigin }
              : undefined
          }
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors",
                active === i ? "border-accent" : "border-border"
              )}
            >
              <ProductImage category={category} variantIndex={i} className="h-full w-full" iconClassName="h-6 w-6" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
