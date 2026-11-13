import Link from "next/link";
import { site } from "@/content/site";

/** Sabit WhatsApp butonu. Numara tanımlı değilse randevu formuna yönlendirir. */
export default function WhatsAppButton() {
  const n = site.contact.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent("Merhaba, Dokunuş Akademi hakkında bilgi almak istiyorum.");
  const icon = (
    <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
      <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.5.7 4.8 2 6.8L3 29l6.8-2.2a12.7 12.7 0 0 0 6.2 1.6c7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.2c-2 0-3.9-.6-5.5-1.6l-.4-.2-4 1.3 1.3-3.9-.3-.4a10.5 10.5 0 1 1 8.9 4.8zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.6 8.6 0 0 1-4.3-3.7c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
    </svg>
  );
  if (!n) {
    return (
      <Link href="/iletisim" className="wa-btn" aria-label="İletişime geç">
        {icon}
        <span className="wa-label">Bize ulaşın</span>
      </Link>
    );
  }
  return (
    <a href={`https://wa.me/${n}?text=${text}`} className="wa-btn" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile yazın">
      {icon}
      <span className="wa-label">WhatsApp ile yazın</span>
    </a>
  );
}
