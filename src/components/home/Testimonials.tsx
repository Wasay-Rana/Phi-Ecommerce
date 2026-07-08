import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha K.",
    city: "Lahore",
    quote:
      "Ordered the Pulse earbuds on a Tuesday, they were at my door in Gulberg by Thursday afternoon. Battery life is exactly as advertised.",
    rating: 5,
  },
  {
    name: "Hamza R.",
    city: "Karachi",
    quote:
      "Was skeptical about COD tech stores but the power bank came properly packed and the rider even waited while I tested it. Would order again.",
    rating: 5,
  },
  {
    name: "Sana M.",
    city: "Islamabad",
    quote:
      "The fitness watch screen is genuinely visible in sunlight, unlike my old one. Customer support replied on WhatsApp within minutes.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border bg-bg">
      <div className="container-page py-16">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="text-section text-primary sm:text-section-lg">
            Trusted by shoppers across Pakistan
          </h2>
          <p className="mt-2 max-w-md text-secondary">
            Over 4,000 orders delivered, from Karachi to Peshawar.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-3xl bg-surface p-6 shadow-card ring-1 ring-border/60 transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating ? "fill-accent-dark text-accent-dark" : "text-border"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-secondary">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-primary">
                {t.name} <span className="font-normal text-secondary">— {t.city}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
