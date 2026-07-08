import { Suspense } from "react";
import { Metadata } from "next";
import { ShopPageClient } from "./ShopPageClient";
import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";

export const metadata: Metadata = {
  title: "Shop — Phi",
  description: "Browse Phi's full range of tech accessories.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-10">
          <ProductGridSkeleton />
        </div>
      }
    >
      <ShopPageClient />
    </Suspense>
  );
}
