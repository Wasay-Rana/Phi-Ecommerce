import emailjs from "@emailjs/browser";
import { CartLineItem } from "@/types/product";
import { formatPrice } from "@/lib/utils";

export interface OrderPayload {
  orderId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  items: CartLineItem[];
  subtotal: number;
  shipping: number;
  total: number;
  notes?: string;
}

function formatItemsList(items: CartLineItem[]): string {
  return items
    .map(
      (item) =>
        `${item.name}${item.variant ? ` (${item.variant})` : ""} x${item.quantity} — ${formatPrice(
          item.price * item.quantity
        )}`
    )
    .join("\n");
}

export async function sendOrderEmail(order: OrderPayload): Promise<{ ok: boolean; error?: unknown }> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error(
      "EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY."
    );
    return { ok: false, error: "missing-config" };
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        order_id: order.orderId,
        customer_name: order.name,
        customer_phone: order.phone,
        customer_address: `${order.address}, ${order.city}`,
        order_items: formatItemsList(order.items),
        order_subtotal: formatPrice(order.subtotal),
        order_shipping: formatPrice(order.shipping),
        order_total: formatPrice(order.total),
        payment_method: order.paymentMethod,
        order_notes: order.notes ?? "-",
      },
      publicKey
    );
    return { ok: true };
  } catch (error) {
    console.error("Failed to send order notification email:", error);
    return { ok: false, error };
  }
}
