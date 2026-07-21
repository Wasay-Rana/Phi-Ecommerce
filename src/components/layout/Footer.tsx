import Link from "next/link";
import { Music2, Truck, ShieldCheck } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";
import { siteConfig } from "@/lib/config";
import { categoriesByNiche, categoryLabels, niches } from "@/data/taxonomy";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-alt">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
          <span className="text-xl font-bold text-primary">{siteConfig.name}</span>
          <p className="max-w-xs text-sm text-secondary">{siteConfig.description}</p>
          <div className="mt-2 flex items-center gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-primary transition-colors hover:bg-accent hover:text-accent-text"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-primary transition-colors hover:bg-accent hover:text-accent-text"
            >
              <Music2 className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-primary transition-colors hover:bg-accent hover:text-accent-text"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {niches.map((niche) => (
          <div key={niche.id} className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-primary">{niche.label}</h4>
            <Link href={`/shop?niche=${niche.id}`} className="text-sm text-secondary hover:text-primary">
              Shop all
            </Link>
            {categoriesByNiche[niche.id].map((category) => (
              <Link
                key={category}
                href={`/shop?category=${category}`}
                className="text-sm text-secondary hover:text-primary"
              >
                {categoryLabels[category]}
              </Link>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-primary">Support</h4>
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-sm text-secondary hover:text-primary">
            {siteConfig.contactEmail}
          </a>
          <span className="text-sm text-secondary">Cash on delivery, nationwide</span>
          <span className="text-sm text-secondary">Mon–Sat, 10am–7pm</span>
          <div className="mt-2 flex items-center gap-2 text-sm text-secondary">
            <Truck className="h-4 w-4 text-accent-text" />
            2–4 day delivery
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary">
            <ShieldCheck className="h-4 w-4 text-accent-text" />
            7-day easy returns
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-meta text-secondary sm:flex-row">
          <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span className="rounded-sm border border-border bg-surface px-2 py-1">COD</span>
            <span className="rounded-sm border border-border bg-surface px-2 py-1">JazzCash</span>
            <span className="rounded-sm border border-border bg-surface px-2 py-1">EasyPaisa</span>
            <span className="rounded-sm border border-border bg-surface px-2 py-1">TCS</span>
            <span className="rounded-sm border border-border bg-surface px-2 py-1">Leopards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
