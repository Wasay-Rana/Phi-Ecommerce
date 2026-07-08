"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
  description: string;
  specs: { label: string; value: string }[];
}

const tabs = ["Description", "Specifications", "Shipping & Returns"] as const;

export function ProductTabs({ description, specs }: ProductTabsProps) {
  const [openTab, setOpenTab] = useState<(typeof tabs)[number] | null>("Description");

  function toggle(tab: (typeof tabs)[number]) {
    setOpenTab((prev) => (prev === tab ? null : tab));
  }

  return (
    <div className="divide-y divide-border border-y border-border">
      {tabs.map((tab) => (
        <div key={tab}>
          <button
            type="button"
            onClick={() => toggle(tab)}
            className="flex w-full items-center justify-between py-4 text-left font-semibold text-primary"
          >
            {tab}
            <ChevronDown
              className={cn(
                "h-4 w-4 text-secondary transition-transform",
                openTab === tab && "rotate-180"
              )}
            />
          </button>
          {openTab === tab && (
            <div className="pb-5 text-sm leading-relaxed text-secondary">
              {tab === "Description" && <p>{description}</p>}
              {tab === "Specifications" && (
                <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-4 border-b border-border py-2 sm:border-none sm:py-0">
                      <dt className="text-secondary">{spec.label}</dt>
                      <dd className="font-medium text-primary">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === "Shipping & Returns" && (
                <ul className="flex flex-col gap-2">
                  <li>Dispatched within 24 hours of order confirmation.</li>
                  <li>2–4 business day delivery across Pakistan.</li>
                  <li>Cash on delivery available nationwide.</li>
                  <li>7-day return window for unused items in original packaging.</li>
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
