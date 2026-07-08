import Link from "next/link";
import { ArrowUpRight, Cpu, FlaskConical } from "lucide-react";
import { niches, getProductsByNiche } from "@/data/products";

const nicheIcon = { tech: Cpu, stem: FlaskConical } as const;

export function ShopByNiche() {
  return (
    <section className="container-page py-16">
      <div className="mb-8">
        <h2 className="text-section text-primary sm:text-section-lg">Shop by category</h2>
        <p className="mt-1 text-secondary">Two collections, one checkout.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {niches.map((niche) => {
          const Icon = nicheIcon[niche.id];
          const count = getProductsByNiche(niche.id).length;
          return (
            <Link
              key={niche.id}
              href={`/shop?niche=${niche.id}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-surface p-8 shadow-card ring-1 ring-border/60 transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl transition-opacity group-hover:opacity-80" />
              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft">
                  <Icon className="h-6 w-6 text-accent-dark" strokeWidth={1.75} />
                </div>
                <ArrowUpRight className="h-5 w-5 text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <div className="relative mt-8">
                <h3 className="text-section text-primary">{niche.label}</h3>
                <p className="mt-1 text-secondary">{niche.tagline}</p>
                <p className="mt-3 text-meta font-semibold uppercase tracking-wide text-secondary">
                  {count} products
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
