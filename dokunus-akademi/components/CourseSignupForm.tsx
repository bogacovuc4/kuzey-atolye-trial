"use client";
import Link from "next/link";
import { useState } from "react";

export default function CourseSignupForm({ courseSlug, open }: { courseSlug: string; open: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (data.name.trim().length < 3) return setError("Lütfen adınızı ve soyadınızı yazın.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) return setError("Lütfen geçerli bir e-posta adresi yazın.");
    if (!fd.get("consent")) return setError("Devam etmek için aydınlatma metnini onaylamanız gerekiyor.");
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/egitim-kayit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, course: courseSlug }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Bir sorun oluştu. Lütfen tekrar deneyin.");
        setState("idle");
        return;
      }
      setState("done");
    } catch {
      setError("Bağlantı kurulamadı. Lütfen tekrar deneyin.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="alert ok fade-in" role="status">
        {open
          ? "Başvurun alındı. Kayıt detayları için seninle iletişime geçeceğiz."
          : "Listeye eklendin. Eğitim açıldığında ilk sen haberdar olacaksın."}
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="cs-name">Ad Soyad <span className="req">*</span></label>
        <input id="cs-name" name="name" className="input" autoComplete="name" maxLength={120} required />
      </div>
      <div className="field">
        <label htmlFor="cs-email">E-posta <span className="req">*</span></label>
        <input id="cs-email" name="email" type="email" className="input" autoComplete="email" maxLength={200} required />
      </div>
      <div className="field">
        <label htmlFor="cs-phone">Telefon</label>
        <input id="cs-phone" name="phone" type="tel" className="input" autoComplete="tel" maxLength={30} />
      </div>
      <div className="field">
        <label htmlFor="cs-msg">Not</label>
        <textarea id="cs-msg" name="message" className="textarea" style={{ minHeight: 90 }} maxLength={1000} placeholder="Bu eğitimden beklentin (isteğe bağlı)" />
      </div>
      <div className="hp" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="check">
        <input type="checkbox" name="consent" value="1" />
        <span><Link href="/kvkk" target="_blank">KVKK Aydınlatma Metni</Link>&apos;ni okudum, kabul ediyorum.</span>
      </label>
      {error && <div className="alert err" role="alert">{error}</div>}
      <button className="btn btn-primary" disabled={state === "sending"}>
        {state === "sending" ? "Gönderiliyor…" : open ? "Başvur" : "Ön Kayıt Listesine Katıl"}
      </button>
    </form>
  );
}
