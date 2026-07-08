"use client";

import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/config";

export function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="bg-primary">
      <div className="container-page flex flex-col items-center gap-6 py-14 text-center">
        <h2 className="text-section text-inverse">Get restock alerts &amp; deals first</h2>
        <p className="max-w-md text-sm text-inverse/70">
          Join the list for early access to new drops and sale-only pricing, or message us
          directly on WhatsApp for order help.
        </p>

        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          {submitted ? (
            <p className="w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-text">
              You&apos;re on the list — thanks!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full flex-1 gap-2">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-transparent bg-surface py-3 pl-10 pr-4 text-sm text-primary outline-none ring-accent focus:ring-2"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-text transition-colors hover:bg-accent-hover"
              >
                Subscribe
              </button>
            </form>
          )}

          <a
            href={whatsappLink("Hi! I'd like to know more about Phi products.")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-inverse/20 px-5 py-3 text-sm font-semibold text-inverse transition-colors hover:bg-inverse/10"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
