import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCourse } from "@/content/courses";
import { clean, clientIp, rateLimit, sameOrigin, validEmail, validPhone } from "@/lib/validate";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
  const ip = clientIp(req.headers);
  if (!rateLimit(`egitim:${ip}`, 8)) {
    return NextResponse.json({ error: "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const course = getCourse(clean(body.course, 120));
  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const phone = clean(body.phone, 30);
  const message = clean(body.message, 1000);

  if (!course) return NextResponse.json({ error: "Eğitim bulunamadı." }, { status: 404 });
  if (name.length < 3) return NextResponse.json({ error: "Lütfen adınızı ve soyadınızı yazın." }, { status: 422 });
  if (!validEmail(email)) return NextResponse.json({ error: "Lütfen geçerli bir e-posta adresi yazın." }, { status: 422 });
  if (phone && !validPhone(phone)) return NextResponse.json({ error: "Lütfen geçerli bir telefon numarası yazın." }, { status: 422 });
  if (!body.consent) return NextResponse.json({ error: "Aydınlatma metnini onaylamanız gerekiyor." }, { status: 422 });

  const d = db();
  const exists = d.prepare("SELECT id FROM course_signups WHERE course_slug = ? AND email = ?").get(course.slug, email);
  if (!exists) {
    d.prepare("INSERT INTO course_signups (course_slug, name, email, phone, message) VALUES (?, ?, ?, ?, ?)").run(course.slug, name, email, phone, message);
    console.log(`[egitim] yeni ön kayıt — ${course.slug}`);
  }
  return NextResponse.json({ ok: true });
}
