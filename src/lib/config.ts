export const siteConfig = {
  name: "ePHI",
  tagline: "Everyday tech, made better.",
  description:
    "ePHI sells fast-shipping tech and STEM/maker products — earbuds, power banks, 3D-printed lamps and build kits — with cash on delivery across Pakistan.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923032823122",
  currency: "Rs.",
  shippingFee: 200,
  freeShippingThreshold: 5000,
  social: {
    instagram: "https://instagram.com/ephi.store",
    tiktok: "https://tiktok.com/@ephi.store",
    facebook: "https://facebook.com/ephi.store",
  },
  contactEmail: "hello@ephi.store",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
