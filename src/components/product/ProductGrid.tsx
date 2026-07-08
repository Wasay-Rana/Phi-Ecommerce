import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { Package } from "lucide-react";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
        <Package className="h-10 w-10 text-secondary" strokeWidth={1.25} />
        <p className="font-semibold text-primary">No products found</p>
        <p className="max-w-xs text-meta text-secondary">
          Try adjusting your filters or check back soon — we&apos;re restocking regularly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
