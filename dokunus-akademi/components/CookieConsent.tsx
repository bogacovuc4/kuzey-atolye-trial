"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const KEY = "da-cookie-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * KVKK uyumlu çerez onayı + Google Analytics.
 * GA yalnızca NEXT_PUBLIC_GA_ID tanımlıysa ve ziyaretçi "Kabul Et" derse yüklenir.
 */
export default function CookieConsent() {
  const [choice, setChoice] = useState<"yes" | "no" | null | "pending">("pending");

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      setChoice(v === "yes" || v === "no" ? v : null);
    } catch {
      setChoice(null);
    }
  }, []);

  const save = (v: "yes" | "no") => {
    try { localStorage.setItem(KEY, v); } catch {}
    setChoice(v);
  };

  if (!GA_ID) return null; // analitik yoksa onay gerektiren çerez de yok

  return (
    <>
      {choice === "yes" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {choice === null && (
        <div className="cookie" role="dialog" aria-live="polite" aria-label="Çerez tercihi">
          <p>
            Sitemizi geliştirmek için, onay vermeniz halinde analitik çerezler kullanıyoruz. Ayrıntılar için{" "}
            <Link href="/gizlilik">Gizlilik ve Çerez Politikası</Link>&apos;nı inceleyebilirsiniz.
          </p>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={() => save("yes")}>Kabul Et</button>
            <button className="btn btn-quiet" onClick={() => save("no")}>Yalnızca Zorunlu</button>
          </div>
        </div>
      )}
    </>
  );
}
