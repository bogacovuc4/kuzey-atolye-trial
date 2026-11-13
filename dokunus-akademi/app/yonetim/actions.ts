"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, destroySession, isAdmin } from "@/lib/auth";
import { appointmentStatuses, db } from "@/lib/db";
import { clean, clientIp, rateLimit } from "@/lib/validate";
import { toSlug } from "@/lib/markdown";
import { getCard } from "@/content/tarot";
import type { DailyType } from "@/content/daily";

async function guard() {
  if (!(await isAdmin())) redirect("/yonetim");
}

export async function login(_prev: string | null, fd: FormData): Promise<string | null> {
  const ip = clientIp(await headers());
  if (!rateLimit(`login:${ip}`, 6, 15 * 60 * 1000)) return "Çok fazla deneme. 15 dakika sonra tekrar deneyin.";
  if (!checkPassword(String(fd.get("password") || ""))) return "Şifre hatalı.";
  await createSession();
  redirect("/yonetim");
}

export async function logout() {
  await destroySession();
  redirect("/yonetim");
}

/* ---------- Randevular ---------- */
export async function updateAppointment(fd: FormData) {
  await guard();
  const id = Number(fd.get("id"));
  const status = clean(fd.get("status"), 40);
  const note = clean(fd.get("note"), 1000);
  if (!(appointmentStatuses as readonly string[]).includes(status)) return;
  db().prepare("UPDATE appointments SET status = ?, note = ? WHERE id = ?").run(status, note, id);
  revalidatePath("/yonetim");
}

export async function deleteAppointment(fd: FormData) {
  await guard();
  db().prepare("DELETE FROM appointments WHERE id = ?").run(Number(fd.get("id")));
  revalidatePath("/yonetim");
}

export async function deleteSignup(fd: FormData) {
  await guard();
  db().prepare("DELETE FROM course_signups WHERE id = ?").run(Number(fd.get("id")));
  revalidatePath("/yonetim");
}

/* ---------- Günlük içerikler ---------- */
const types: DailyType[] = ["quote", "intention", "weekly", "meditation"];

export async function addDaily(fd: FormData) {
  await guard();
  const type = clean(fd.get("type"), 20) as DailyType;
  const text = clean(fd.get("text"), 600);
  const date = clean(fd.get("pinned_date"), 10);
  if (!types.includes(type) || text.length < 3) return;
  db().prepare("INSERT INTO daily_items (type, text, pinned_date) VALUES (?, ?, ?)").run(type, text, /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null);
  revalidatePath("/", "layout");
}

export async function updateDaily(fd: FormData) {
  await guard();
  const id = Number(fd.get("id"));
  const text = clean(fd.get("text"), 600);
  const date = clean(fd.get("pinned_date"), 10);
  const active = fd.get("active") ? 1 : 0;
  if (text.length < 3) return;
  db().prepare("UPDATE daily_items SET text = ?, active = ?, pinned_date = ? WHERE id = ?").run(text, active, /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null, id);
  revalidatePath("/", "layout");
}

export async function deleteDaily(fd: FormData) {
  await guard();
  db().prepare("DELETE FROM daily_items WHERE id = ?").run(Number(fd.get("id")));
  revalidatePath("/", "layout");
}

export async function pinCard(fd: FormData) {
  await guard();
  const date = clean(fd.get("date"), 10);
  const slug = clean(fd.get("card"), 60);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
  if (!slug) db().prepare("DELETE FROM daily_card_pins WHERE date = ?").run(date);
  else if (getCard(slug)) db().prepare("INSERT INTO daily_card_pins (date, card_slug) VALUES (?, ?) ON CONFLICT(date) DO UPDATE SET card_slug = excluded.card_slug").run(date, slug);
  revalidatePath("/", "layout");
}

/* ---------- Blog ---------- */
export async function savePost(fd: FormData) {
  await guard();
  const id = Number(fd.get("id") || 0);
  const title = clean(fd.get("title"), 160);
  const slug = toSlug(clean(fd.get("slug"), 100) || title);
  const description = clean(fd.get("description"), 300);
  const category = clean(fd.get("category"), 60) || "Genel";
  const symbol = clean(fd.get("symbol"), 20) || "eye";
  const body = String(fd.get("body") || "").slice(0, 60000);
  const date = clean(fd.get("date"), 10);
  const published = fd.get("published") ? 1 : 0;
  if (!title || !slug || !body.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(date)) redirect(`/yonetim?sekme=blog&hata=1${id ? `&duzenle=${id}` : ""}`);
  const d = db();
  try {
    if (id) {
      d.prepare("UPDATE posts SET slug=?, title=?, description=?, category=?, symbol=?, body=?, published=?, date=?, updated_at=datetime('now') WHERE id=?")
        .run(slug, title, description, category, symbol, body, published, date, id);
    } else {
      d.prepare("INSERT INTO posts (slug, title, description, category, symbol, body, published, date) VALUES (?,?,?,?,?,?,?,?)")
        .run(slug, title, description, category, symbol, body, published, date);
    }
  } catch {
    redirect(`/yonetim?sekme=blog&hata=slug${id ? `&duzenle=${id}` : ""}`);
  }
  revalidatePath("/", "layout");
  redirect("/yonetim?sekme=blog&kaydedildi=1");
}

export async function deletePost(fd: FormData) {
  await guard();
  db().prepare("DELETE FROM posts WHERE id = ?").run(Number(fd.get("id")));
  revalidatePath("/", "layout");
  redirect("/yonetim?sekme=blog");
}
