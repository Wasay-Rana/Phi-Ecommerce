import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsletterStrip } from "@/components/home/NewsletterStrip";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/data/products";

export default function Home() {
  const featured = products.filter((p) => p.badges?.includes("bestseller")).slice(0, 4);
  const featuredProducts = featured.length >= 4 ? featured : products.slice(0, 4);

  return (
    <>
      <Hero />
      <TrustStrip />

      <section className="container-page py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-section text-primary sm:text-section-lg">Featured products</h2>
            <p className="mt-1 text-secondary">Our most-loved picks this month.</p>
          </div>
          <Link
            href="/shop"
            className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
        <Link
          href="/shop"
          className="mt-8 flex items-center justify-center gap-1 text-sm font-semibold text-primary hover:underline sm:hidden"
        >
          View all products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <Testimonials />
      <NewsletterStrip />
    </>
  );
}
