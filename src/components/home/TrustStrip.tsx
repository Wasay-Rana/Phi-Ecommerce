import { Truck, Banknote, ShieldCheck, RotateCcw } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Fast delivery",
    description: "2–4 business days, nationwide",
  },
  {
    icon: Banknote,
    title: "Cash on delivery",
    description: "Pay when your order arrives",
  },
  {
    icon: ShieldCheck,
    title: "Quality guarantee",
    description: "Checked before it ships",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    description: "7-day hassle-free returns",
  },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-bg-alt">
      <div className="container-page grid grid-cols-2 gap-4 py-10 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-card ring-1 ring-border/60 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft">
              <item.icon className="h-5 w-5 text-accent-dark" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">{item.title}</p>
              <p className="text-meta text-secondary">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
