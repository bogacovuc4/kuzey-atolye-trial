"use client";
import Link from "next/link";
import { useState } from "react";
import { modeOptions, serviceOptions } from "@/lib/options";
import { SymbolIcon } from "./Symbols";

type Errors = Partial<Record<"name" | "phone" | "email" | "service" | "mode" | "message" | "consent" | "form", string>>;

export default function AppointmentForm({ defaultService }: { defaultService?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const errs: Errors = {};
    if (data.name.trim().length < 3) errs.name = "Lütfen adınızı ve soyadınızı yazın.";
    if (data.phone.replace(/\D/g, "").length < 10) errs.phone = "Lütfen geçerli bir telefon numarası yazın.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) errs.email = "Lütfen geçerli bir e-posta adresi yazın.";
    if (!data.service) errs.service = "Lütfen bir hizmet seçin.";
    if (!data.mode) errs.mode = "Lütfen görüşme tercihinizi seçin.";
    if (!fd.get("consent")) errs.consent = "Devam etmek için aydınlatma metnini onaylamanız gerekiyor.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/randevu", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(json.errors || { form: json.error || "Bir sorun oluştu. Lütfen tekrar deneyin." });
        setState("idle");
        return;
      }
      setState("done");
    } catch {
      setErrors({ form: "Bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin." });
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="success-box fade-in" role="status">
        <SymbolIcon name="lotus" size={64} className="icon" />
        <h3>Talebin bize ulaştı.</h3>
        <p className="muted">Teşekkür ederiz. En kısa sürede seninle iletişime geçerek görüşme detaylarını birlikte planlayacağız.</p>
        <button className="btn btn-quiet" onClick={() => setState("idle")}>Yeni Talep Oluştur</button>
      </div>
    );
  }

  const err = (k: keyof Errors) => errors[k] && <span className="field-error" id={`${k}-err`}>{errors[k]}</span>;
  const aria = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Ad Soyad <span className="req">*</span></label>
          <input id="name" name="name" className="input" autoComplete="name" required maxLength={120} {...aria("name")} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="phone">Telefon <span className="req">*</span></label>
          <input id="phone" name="phone" type="tel" className="input" autoComplete="tel" inputMode="tel" placeholder="05XX XXX XX XX" required maxLength={30} {...aria("phone")} />
          {err("phone")}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="email">E-posta <span className="req">*</span></label>
          <input id="email" name="email" type="email" className="input" autoComplete="email" required maxLength={200} {...aria("email")} />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor="service">Hizmet Tercihi <span className="req">*</span></label>
          <select id="service" name="service" className="select" defaultValue={defaultService && (serviceOptions as readonly string[]).includes(defaultService) ? defaultService : ""} required {...aria("service")}>
            <option value="" disabled>Seçiniz</option>
            {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {err("service")}
        </div>
      </div>
      <fieldset className="field">
        <legend>Görüşme Tercihi <span className="req">*</span></legend>
        <div className="choices" style={{ marginTop: 8 }}>
          {modeOptions.map((m, i) => (
            <label className="choice" key={m}>
              <input type="radio" name="mode" value={m} defaultChecked={i === 0} />
              <span>{m}</span>
            </label>
          ))}
        </div>
        {err("mode")}
      </fieldset>
      <div className="field">
        <label htmlFor="message">Mesajın</label>
        <textarea id="message" name="message" className="textarea" maxLength={2000} placeholder="Seni bu yolculuğa getiren şeyi, beklentilerini ya da uygun olduğun zamanları paylaşabilirsin." {...aria("message")} />
        {err("message")}
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Web sitesi</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="check">
        <input type="checkbox" name="consent" value="1" {...aria("consent")} />
        <span>
          Kişisel verilerimin talebimin yanıtlanması amacıyla işlenmesine ilişkin <Link href="/kvkk" target="_blank">KVKK Aydınlatma Metni</Link>&apos;ni okudum ve kabul ediyorum. <span className="req">*</span>
        </span>
      </label>
      {err("consent")}
      {errors.form && <div className="alert err" role="alert">{errors.form}</div>}
      <div>
        <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
          {state === "sending" ? "Gönderiliyor…" : "Görüşme Talebi Gönder"}
        </button>
      </div>
    </form>
  );
}
