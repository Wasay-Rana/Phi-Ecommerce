import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/config";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hi! I have a question about an order.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" fill="white" strokeWidth={0} />
    </a>
  );
}
