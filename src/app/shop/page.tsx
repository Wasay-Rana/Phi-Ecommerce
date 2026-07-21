import { Suspense } from "react";
import { Metadata } from "next";
import { ShopPageClient } from "./ShopPageClient";
import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";
import { siteConfig } from "@/lib/config";
import { getAllProducts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: `Shop — ${siteConfig.name}`,
  description: `Browse ${siteConfig.name}'s full range of tech and STEM/maker products.`,
};

export default async function ShopPage() {
  const products = await getAllProducts();
  return (
    <Suspense
      fallback={
        <div className="container-page py-10">
          <ProductGridSkeleton />
        </div>
      }
    >
      <ShopPageClient products={products} />
    </Suspense>
  );
}
