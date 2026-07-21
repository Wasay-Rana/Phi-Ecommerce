import Image from "next/image";
import { cn } from "@/lib/utils";
import { sanityLoader, urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/types/sanity";

interface ProductImageProps {
  images?: SanityImage[];
  imageUrl?: string;
  className?: string;
  iconClassName?: string;
  variantIndex?: number;
  alt?: string;
  style?: React.CSSProperties;
}

export function ProductImage({ images, imageUrl, variantIndex = 0, alt, className, style }: ProductImageProps) {
  const image = images?.[variantIndex];
  const src = imageUrl ?? (image ? urlFor(image).url() : undefined);

  if (src) {
    return (
      <div style={style} className={cn("relative overflow-hidden", className)}>
        <Image
          loader={sanityLoader}
          src={src}
          alt={alt ?? image?.alt ?? "Product photo"}
          fill
          sizes="(min-width: 1024px) 320px, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      style={style}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-linear-to-br from-bg-alt via-bg-alt to-accent-soft",
        className
      )}
    >
      <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-accent/40 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent-dark/15 blur-3xl" />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/3" />
      <div className="relative h-[78%] w-[78%]">
        <Image
          src="/comingSoon.png"
          alt="Product photo coming soon"
          fill
          sizes="(min-width: 1024px) 320px, 50vw"
          className="object-contain opacity-80 grayscale"
        />
      </div>
    </div>
  );
}
