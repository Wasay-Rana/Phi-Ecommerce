export const siteConfig = {
  name: "Phi",
  tagline: "Everyday tech, made better.",
  description:
    "Phi sells fast-shipping tech accessories — earbuds, power banks, wearables and desk gear — with cash on delivery across Pakistan.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923032823122",
  currency: "Rs.",
  shippingFee: 200,
  freeShippingThreshold: 5000,
  social: {
    instagram: "https://instagram.com/phi.store",
    tiktok: "https://tiktok.com/@phi.store",
    facebook: "https://facebook.com/phi.store",
  },
  contactEmail: "hello@phi.store",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
