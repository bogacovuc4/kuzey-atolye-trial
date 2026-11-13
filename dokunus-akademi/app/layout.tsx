import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import { site } from "@/content/site";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const body = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.founder} | Yaşam Koçluğu, Tarot ve Spiritüel Farkındalık`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  keywords: ["yaşam koçluğu", "tarot", "kuantum düşünce", "metafizik", "spiritüel farkındalık", "meditasyon", "çakra", "Türkan Demir", "Dokunuş Akademi"],
  openGraph: { type: "website", locale: "tr_TR", siteName: site.name, url: site.url, title: site.name, description: site.description },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#080a1f", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    slogan: site.slogan,
    founder: { "@type": "Person", name: site.founder },
    sameAs: Object.values(site.social).filter(Boolean),
  };
  return (
    <html lang="tr" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#icerik" className="skip-link">İçeriğe geç</a>
        <Starfield />
        <div className="site">
          <Header />
          <main id="icerik">{children}</main>
          <Footer />
        </div>
        <WhatsAppButton />
        <CookieConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
