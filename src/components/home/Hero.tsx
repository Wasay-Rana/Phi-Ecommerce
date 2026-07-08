import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-accent-dark/10 blur-3xl" />

      <div className="container-page relative grid items-center gap-10 py-14 md:grid-cols-2 md:py-24">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full bg-accent-soft px-3 py-1 text-meta font-semibold text-accent-text">
            Free delivery on orders over Rs. 5,000
          </span>
          <h1 className="text-hero-sm text-primary sm:text-hero md:text-hero-lg text-balance">
            Everyday tech, <span className="rounded-lg bg-accent px-2 text-accent-text">made better</span>.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-secondary">
            Earbuds, power banks, wearables and desk gear — picked for reliability, priced
            fairly, and delivered across Pakistan with cash on delivery.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-text shadow-glow transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
            >
              Shop the collection
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop?category=audio"
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              See bestsellers
            </Link>
          </div>
        </div>

        <div className="relative">
          <ProductImage
            category="audio"
            className="aspect-square w-full rounded-[2rem] shadow-card-hover"
            iconClassName="h-32 w-32 sm:h-40 sm:w-40"
          />
          <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-card-hover ring-1 ring-border sm:-left-8">
            <div className="flex -space-x-0.5 text-accent-dark">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <div className="text-sm">
              <p className="font-semibold text-primary">4.6/5 rating</p>
              <p className="text-meta text-secondary">4,000+ orders</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
