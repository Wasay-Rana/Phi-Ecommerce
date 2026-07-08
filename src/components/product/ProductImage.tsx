import {
  Headphones,
  BatteryCharging,
  Watch,
  Smartphone,
  Lightbulb,
  Monitor,
  Lamp,
  Sparkles,
  Blocks,
  Package,
} from "lucide-react";
import { ProductCategory } from "@/types/product";
import { cn } from "@/lib/utils";

const categoryIcon: Record<ProductCategory, typeof Package> = {
  audio: Headphones,
  charging: BatteryCharging,
  wearables: Watch,
  "phone-accessories": Smartphone,
  "smart-home": Lightbulb,
  desk: Monitor,
  lamps: Lamp,
  decor: Sparkles,
  kits: Blocks,
};

interface ProductImageProps {
  category: ProductCategory;
  className?: string;
  iconClassName?: string;
  variantIndex?: number;
  style?: React.CSSProperties;
}

export function ProductImage({
  category,
  className,
  iconClassName,
  variantIndex = 0,
  style,
}: ProductImageProps) {
  const Icon = categoryIcon[category] ?? Package;
  const tilt = variantIndex % 2 === 0 ? "" : "scale-x-[-1]";

  return (
    <div
      style={style}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg-alt via-bg-alt to-accent-soft",
        className
      )}
    >
      <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-accent/40 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent-dark/15 blur-3xl" />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/[0.03]" />
      <div className="relative flex aspect-square w-[64%] items-center justify-center rounded-full bg-surface/70 shadow-card backdrop-blur-sm">
        <Icon
          className={cn("text-primary/75", tilt, iconClassName)}
          strokeWidth={1.25}
        />
      </div>
    </div>
  );
}
