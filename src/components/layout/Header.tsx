"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag, ChevronDown, Search, Cpu, FlaskConical, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useCartStore, cartCount } from "@/store/cart";
import { categoriesByNiche, categoryLabels, niches } from "@/data/taxonomy";

const nicheIcon = { tech: Cpu, stem: FlaskConical } as const;

function ShopMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-8 p-6">
      {niches.map((niche) => {
        const Icon = nicheIcon[niche.id];
        return (
          <div key={niche.id} className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft">
                <Icon className="h-5 w-5 text-accent-dark" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-base font-semibold text-primary">{niche.label}</p>
                <p className="text-sm text-secondary">{niche.tagline}</p>
              </div>
            </div>
            <ul className="flex flex-col gap-0.5">
              {categoriesByNiche[niche.id].map((category) => (
                <li key={category}>
                  <Link
                    href={`/shop?category=${category}`}
                    onClick={onNavigate}
                    className="block rounded-lg px-2 py-1.5 text-base text-secondary transition-colors hover:bg-bg-alt hover:text-primary"
                  >
                    {categoryLabels[category]}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/shop?niche=${niche.id}`}
              onClick={onNavigate}
              className="mt-1 flex items-center gap-1 text-base font-semibold text-primary hover:underline"
            >
              Shop all {niche.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const items = useCartStore((s) => s.items);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const count = cartCount(items);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchValue.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(searchValue.trim())}`);
    setSearchOpen(false);
    setSearchValue("");
  }

  return (
    <header className="sticky top-4 z-40">
      <div className="container-page">
        <div className="flex h-20 items-center justify-between gap-4 rounded-2xl border border-border bg-surface/95 px-5 shadow-card backdrop-blur-sm sm:px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label={siteConfig.name}>
          <Image
            src="/ephi-logo-lockup.svg"
            alt={siteConfig.name}
            width={480}
            height={140}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-12 md:flex">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMegaOpen((v) => !v)}
              className="flex items-center gap-1.5 text-base font-medium text-secondary transition-colors hover:text-primary"
              aria-expanded={megaOpen}
            >
              Shop
              <ChevronDown className={`h-4 w-4 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
            </button>
            {megaOpen && (
              <div className="absolute left-0 top-full mt-3 w-[440px] rounded-2xl border border-border bg-surface shadow-card-hover">
                <ShopMegaMenu onNavigate={() => setMegaOpen(false)} />
              </div>
            )}
          </div>
          <Link
            href="/shop?niche=tech"
            className="text-base font-medium text-secondary transition-colors hover:text-primary"
          >
            Tech
          </Link>
          <Link
            href="/shop?niche=stem"
            className="text-base font-medium text-secondary transition-colors hover:text-primary"
          >
            STEM & Maker
          </Link>
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-1.5">
          <div className="hidden items-center sm:flex">
            {searchOpen ? (
              <form onSubmit={submitSearch} className="flex items-center">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onBlur={() => !searchValue && setSearchOpen(false)}
                  placeholder="Search products…"
                  className="w-52 rounded-full border border-border bg-bg-alt px-4 py-2.5 text-base text-primary outline-hidden focus:ring-2 focus:ring-accent"
                />
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-bg-alt"
              >
                <Search className="h-5 w-5 text-primary" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-bg-alt"
          >
            <ShoppingBag className="h-5 w-5 text-primary" />
            {count > 0 && (
              <span className="absolute right-0 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-text">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-bg-alt md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        </div>

        {mobileOpen && (
          <nav className="mt-2 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 shadow-card md:hidden">
            <form onSubmit={submitSearch} className="flex items-center">
              <Search className="pointer-events-none -mr-8 h-4 w-4 text-secondary" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-full border border-border bg-bg-alt py-2.5 pl-10 pr-4 text-sm text-primary outline-hidden focus:ring-2 focus:ring-accent"
              />
            </form>

            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-bg-alt"
            >
              All products
            </Link>

            {niches.map((niche) => (
              <div key={niche.id} className="flex flex-col gap-1">
                <Link
                  href={`/shop?niche=${niche.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 text-sm font-semibold text-primary"
                >
                  {niche.label}
                </Link>
                <div className="flex flex-col gap-0.5 pl-3">
                  {categoriesByNiche[niche.id].map((category) => (
                    <Link
                      key={category}
                      href={`/shop?category=${category}`}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-1.5 text-sm text-secondary transition-colors hover:bg-bg-alt hover:text-primary"
                    >
                      {categoryLabels[category]}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
