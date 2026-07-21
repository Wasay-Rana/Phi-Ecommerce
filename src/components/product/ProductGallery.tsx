"use client";

import { useState, useRef, MouseEvent } from "react";
import { SanityImage } from "@/types/sanity";
import { ProductImage } from "@/components/product/ProductImage";
import { cn } from "@/lib/utils";

const MAX_TILT = 8;

export function ProductGallery({ images, alt }: { images: SanityImage[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [zoomed, setZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${xPct}% ${yPct}%`);
    setTilt({ x: (0.5 - yPct / 100) * MAX_TILT, y: (xPct / 100 - 0.5) * MAX_TILT });
  }

  function handleMouseEnter() {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setZoomed(true);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
        className="overflow-hidden rounded-2xl"
      >
        <ProductImage
          images={images}
          variantIndex={active}
          alt={alt}
          className="aspect-square w-full transition-transform duration-200"
          iconClassName="h-28 w-28 sm:h-36 sm:w-36"
          style={
            zoomed
              ? {
                  transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.5)`,
                  transformOrigin: zoomOrigin,
                }
              : undefined
          }
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={img._key}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors",
                active === i ? "border-accent" : "border-border"
              )}
            >
              <ProductImage images={images} variantIndex={i} alt={alt} className="h-full w-full" iconClassName="h-6 w-6" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
