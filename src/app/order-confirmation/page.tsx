"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Phone, Package, Home } from "lucide-react";
import { useOrderStore } from "@/store/order";
import { formatPrice } from "@/lib/utils";
import { whatsappLink } from "@/lib/config";

export default function OrderConfirmationPage() {
  const [mounted, setMounted] = useState(false);
  const lastOrder = useOrderStore((s) => s.lastOrder);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (!lastOrder) {
    return (
      <div className="container-page flex flex-col items-center justify-center gap-4 py-24 text-center">
        <Package className="h-10 w-10 text-secondary" strokeWidth={1.25} />
        <h1 className="text-section text-primary">No recent order found</h1>
        <p className="max-w-sm text-secondary">
          We couldn&apos;t find an order to show you. If you just placed one, check your email
          or WhatsApp for confirmation.
        </p>
        <Link
          href="/shop"
          className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-text shadow-glow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
          <CheckCircle2 className="h-9 w-9 text-accent-text" />
        </div>
        <h1 className="text-section-lg text-primary">Thank you, {lastOrder.name.split(" ")[0]}!</h1>
        <p className="text-secondary">
          Your order has been placed successfully. We&apos;ll call to confirm before it ships.
        </p>
        <span className="rounded-full bg-bg-alt px-4 py-1.5 text-sm font-semibold text-primary">
          Order #{lastOrder.orderId}
        </span>

        {!lastOrder.emailSent && (
          <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-alt px-4 py-3 text-sm text-warning">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            We couldn&apos;t send the confirmation email automatically, but your order was
            recorded — our team will follow up by phone.
          </div>
        )}
      </div>

      <div className="mx-auto mt-10 grid max-w-2xl gap-8 sm:grid-cols-2">
        <div className="rounded-3xl bg-surface p-6 shadow-card ring-1 ring-border/60">
          <h2 className="mb-3 font-semibold text-primary">Delivery details</h2>
          <dl className="flex flex-col gap-2 text-sm text-secondary">
            <div className="flex justify-between gap-4">
              <dt>Name</dt>
              <dd className="text-right font-medium text-primary">{lastOrder.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Phone</dt>
              <dd className="text-right font-medium text-primary">{lastOrder.phone}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Address</dt>
              <dd className="text-right font-medium text-primary">
                {lastOrder.address}, {lastOrder.city}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Payment</dt>
              <dd className="text-right font-medium text-primary">{lastOrder.paymentMethod}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl bg-surface p-6 shadow-card ring-1 ring-border/60">
          <h2 className="mb-3 font-semibold text-primary">Order summary</h2>
          <ul className="flex flex-col gap-2 text-sm text-secondary">
            {lastOrder.items.map((item) => (
              <li key={`${item.slug}-${item.variant ?? ""}`} className="flex justify-between gap-4">
                <span className="text-primary">
                  {item.name} x{item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-border pt-3 font-semibold text-primary">
            <span>Total</span>
            <span>{formatPrice(lastOrder.total)}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-bg-alt p-6">
        <h2 className="mb-3 font-semibold text-primary">What happens next</h2>
        <ol className="flex flex-col gap-2 text-sm text-secondary">
          <li>1. Our team calls {lastOrder.phone} within a few hours to confirm your order.</li>
          <li>2. Your order is packed and handed to our courier partner.</li>
          <li>3. Delivery arrives in 2–4 business days — pay on arrival for COD orders.</li>
        </ol>
      </div>

      <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
        <Link
          href="/shop"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-semibold text-accent-text shadow-glow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
        >
          <Home className="h-4 w-4" />
          Continue shopping
        </Link>
        <a
          href={whatsappLink(`Hi! I'd like an update on order ${lastOrder.orderId}.`)}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-bg-alt"
        >
          <Phone className="h-4 w-4" />
          Message us about this order
        </a>
      </div>
    </div>
  );
}
