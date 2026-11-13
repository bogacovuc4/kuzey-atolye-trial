import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serviceOptions, modeOptions } from "@/lib/options";
import { clean, clientIp, hashIp, rateLimit, sameOrigin, validEmail, validPhone } from "@/lib/validate";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });

  const ip = clientIp(req.headers);
  if (!rateLimit(`randevu:${ip}`, 5)) {
    return NextResponse.json({ error: "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  // Bot tuzağı: gizli alan doluysa sessizce başarılı dön.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const data = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 30),
    email: clean(body.email, 200).toLowerCase(),
    service: clean(body.service, 80),
    mode: clean(body.mode, 30),
    message: clean(body.message, 2000),
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 3) errors.name = "Lütfen adınızı ve soyadınızı yazın.";
  if (!validPhone(data.phone)) errors.phone = "Lütfen geçerli bir telefon numarası yazın.";
  if (!validEmail(data.email)) errors.email = "Lütfen geçerli bir e-posta adresi yazın.";
  if (!(serviceOptions as readonly string[]).includes(data.service)) errors.service = "Lütfen listeden bir hizmet seçin.";
  if (!(modeOptions as readonly string[]).includes(data.mode)) errors.mode = "Lütfen görüşme tercihinizi seçin.";
  if (!body.consent) errors.consent = "Aydınlatma metnini onaylamanız gerekiyor.";
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const r = db()
    .prepare("INSERT INTO appointments (name, phone, email, service, mode, message, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .run(data.name, data.phone, data.email, data.service, data.mode, data.message, hashIp(ip));

  const hook = process.env.NOTIFY_WEBHOOK_URL;
  if (hook) {
    fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "randevu", id: Number(r.lastInsertRowid), ...data }),
      signal: AbortSignal.timeout(5000),
    }).catch((e) => console.error("[randevu] bildirim gönderilemedi:", e?.message));
  }

  console.log(`[randevu] yeni talep #${r.lastInsertRowid} — ${data.service} (${data.mode})`);
  return NextResponse.json({ ok: true });
}
