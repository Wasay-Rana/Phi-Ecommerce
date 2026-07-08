import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="container-page py-16">
      <h2 className="mb-6 text-section text-primary">You might also like</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.slug} className="w-56 shrink-0 sm:w-auto">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
