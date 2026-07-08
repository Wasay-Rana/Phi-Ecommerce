"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShoppingBag } from "lucide-react";
import { useCartStore, cartSubtotal } from "@/store/cart";
import { useOrderStore, generateOrderId } from "@/store/order";
import { sendOrderEmail } from "@/lib/emailjs";
import { formatPrice } from "@/lib/utils";
import { useHasMounted } from "@/lib/useHasMounted";
import { siteConfig } from "@/lib/config";
import { getProductBySlug } from "@/data/products";
import { ProductImage } from "@/components/product/ProductImage";

interface FormState {
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: "cod" | "jazzcash" | "easypaisa";
  notes: string;
}

const initialForm: FormState = {
  name: "",
  phone: "",
  address: "",
  city: "",
  paymentMethod: "cod",
  notes: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const mounted = useHasMounted();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const setLastOrder = useOrderStore((s) => s.setLastOrder);

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (mounted && items.length === 0 && !orderPlaced) {
      router.replace("/shop");
    }
  }, [mounted, items.length, orderPlaced, router]);

  const subtotal = cartSubtotal(items);
  const shipping = subtotal >= siteConfig.freeShippingThreshold ? 0 : siteConfig.shippingFee;
  const total = subtotal + shipping;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: typeof errors = {};
    if (!form.name.trim()) nextErrors.name = "Enter your full name";
    if (!/^0?3\d{9}$/.test(form.phone.replace(/[\s-]/g, "")))
      nextErrors.phone = "Enter a valid Pakistani mobile number";
    if (!form.address.trim()) nextErrors.address = "Enter your delivery address";
    if (!form.city.trim()) nextErrors.city = "Enter your city";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const orderId = generateOrderId();
    const paymentLabels: Record<FormState["paymentMethod"], string> = {
      cod: "Cash on Delivery",
      jazzcash: "JazzCash",
      easypaisa: "EasyPaisa",
    };

    const result = await sendOrderEmail({
      orderId,
      name: form.name,
      phone: form.phone,
      address: form.address,
      city: form.city,
      paymentMethod: paymentLabels[form.paymentMethod],
      items,
      subtotal,
      shipping,
      total,
      notes: form.notes,
    });

    setLastOrder({
      orderId,
      name: form.name,
      phone: form.phone,
      address: form.address,
      city: form.city,
      paymentMethod: paymentLabels[form.paymentMethod],
      items,
      subtotal,
      shipping,
      total,
      emailSent: result.ok,
    });

    setOrderPlaced(true);
    clearCart();
    setSubmitting(false);
    router.push("/order-confirmation");
  }

  if (!mounted || orderPlaced || items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center justify-center gap-3 py-24 text-center">
        <ShoppingBag className="h-10 w-10 text-secondary" strokeWidth={1.25} />
        <p className="text-secondary">{orderPlaced ? "Redirecting to your order confirmation…" : "Redirecting…"}</p>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="mb-8 text-section text-primary sm:text-section-lg">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Ayesha Khan"
                className={inputClass(!!errors.name)}
              />
            </Field>

            <Field label="Phone number" error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="03001234567"
                className={inputClass(!!errors.phone)}
              />
            </Field>
          </div>

          <Field label="Delivery address" error={errors.address}>
            <textarea
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="House 12, Street 4, DHA Phase 6"
              rows={3}
              className={inputClass(!!errors.address)}
            />
          </Field>

          <Field label="City" error={errors.city}>
            <input
              type="text"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Lahore"
              className={inputClass(!!errors.city)}
            />
          </Field>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-primary">Payment method</span>
            <div className="flex flex-col gap-2">
              {(
                [
                  { id: "cod", label: "Cash on Delivery", note: "Pay when your order arrives" },
                  { id: "jazzcash", label: "JazzCash", note: "Manual transfer, confirmed on call" },
                  { id: "easypaisa", label: "EasyPaisa", note: "Manual transfer, confirmed on call" },
                ] as const
              ).map((method) => (
                <label
                  key={method.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 has-checked:border-accent has-checked:bg-accent-soft"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={form.paymentMethod === method.id}
                    onChange={() => updateField("paymentMethod", method.id)}
                    className="h-4 w-4 accent-accent"
                  />
                  <div>
                    <p className="text-sm font-medium text-primary">{method.label}</p>
                    <p className="text-meta text-secondary">{method.note}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Field label="Order notes (optional)">
            <textarea
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Landmark, preferred delivery time, etc."
              rows={2}
              className={inputClass(false)}
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-semibold text-accent-text shadow-glow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Placing your order…" : `Place order — ${formatPrice(total)}`}
          </button>
        </form>

        <div className="h-fit rounded-3xl bg-surface p-6 shadow-card ring-1 ring-border/60">
          <h2 className="mb-4 font-semibold text-primary">Order Summary</h2>
          <ul className="flex flex-col gap-4">
            {items.map((item) => {
              const product = getProductBySlug(item.slug);
              return (
                <li key={`${item.slug}-${item.variant ?? ""}`} className="flex items-center gap-3">
                  <ProductImage
                    category={product?.category ?? "phone-accessories"}
                    className="h-14 w-14 shrink-0 rounded-lg"
                    iconClassName="h-6 w-6"
                  />
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-medium text-primary">{item.name}</p>
                    <p className="text-meta text-secondary">Qty {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 text-sm text-secondary">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-primary">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-primary">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
          </div>
          <div className="mt-3 flex justify-between border-t border-border pt-3 font-semibold text-primary">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border ${
    hasError ? "border-error" : "border-border"
  } bg-surface px-4 py-3 text-sm text-primary outline-hidden focus:ring-2 focus:ring-accent`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-primary">{label}</span>
      {children}
      {error && <span className="text-meta text-error">{error}</span>}
    </label>
  );
}
