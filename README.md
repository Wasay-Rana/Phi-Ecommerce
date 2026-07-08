# Phi — Ecommerce Storefront

A Next.js 14 (App Router) storefront for Phi, a Pakistan-based tech accessories brand. Built with TypeScript, Tailwind CSS (theme driven by CSS variables), Zustand for cart state, and EmailJS for order notification emails.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp business number (country code, no `+` or leading `0`), e.g. `923001234567` |

Without EmailJS credentials, checkout still completes and the customer still sees the confirmation screen — the order notification email is skipped and a warning is logged to the console (see `src/lib/emailjs.ts`).

### Setting up EmailJS

`.env.local` is fully configured, reused from your `manuum-ai` project's EmailJS account (same connected email service, so no new account needed):

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_pda4t1p`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=fQRNWm8poJaCSn3-x`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_3wc1jbp` — a **dedicated** template for orders, not manuum's plumber-trial-signup template (that one uses fields like `business_name`/`greeting_style` that don't match order data)

The `template_3wc1jbp` body is the HTML in [`docs/emailjs-order-template.html`](docs/emailjs-order-template.html) — a card-style layout using the merge fields `src/lib/emailjs.ts` actually sends: `order_id`, `customer_name`, `customer_phone`, `customer_address`, `order_items`, `order_subtotal`, `order_shipping`, `order_total`, `payment_method`, `order_notes`. If you ever need to recreate or edit the template, paste that file's contents into EmailJS's template body editor (Email Templates → `template_3wc1jbp` → Content).

## Theming

All colors live as CSS custom properties in `src/app/globals.css` under `:root`, and are mapped to Tailwind utilities in `tailwind.config.ts` (`bg-accent`, `text-primary`, `border-border`, etc.). To re-theme the site, edit the hex values in `globals.css` only — no component files reference raw hex values.

## Project structure

- `src/app` — routes: home, `shop`, `product/[slug]`, `cart`, `checkout`, `order-confirmation`
- `src/components` — `layout` (header/footer/whatsapp), `home`, `shop`, `product`, `cart`
- `src/store` — Zustand stores for cart (`cart.ts`) and the last completed order (`order.ts`), both persisted to `localStorage`
- `src/data/products.ts` — sample product catalog (replace with a real data source when ready)
- `src/lib/config.ts` — site-wide config (brand name, WhatsApp number, shipping thresholds)
- `src/lib/emailjs.ts` — order notification email sender

## Product images

Products currently render as generated placeholder graphics (`src/components/product/ProductImage.tsx`) keyed by category, since no real product photography was provided. Swap in real images by replacing that component's usage with `next/image` once photos are available.

## Deployment

No server-only dependencies — deploys directly to Vercel. Set the environment variables above in the Vercel project settings before going live.
