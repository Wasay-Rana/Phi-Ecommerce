import Image from "next/image";
import { ProductCategory } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  category: ProductCategory;
  className?: string;
  iconClassName?: string;
  variantIndex?: number;
  style?: React.CSSProperties;
}

export function ProductImage({ className, style }: ProductImageProps) {
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
