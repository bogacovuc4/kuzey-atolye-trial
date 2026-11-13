/** Form doğrulama ve basit kötüye kullanım koruması (sunucu tarafı). */
import crypto from "node:crypto";

export { serviceOptions, modeOptions } from "./options";

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

export function clean(v: unknown, max: number) {
  return String(v ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

export function validEmail(s: string) {
  return EMAIL_RE.test(s);
}

export function validPhone(s: string) {
  const digits = s.replace(/\D/g, "");
  return /^[+\d\s().-]+$/.test(s) && digits.length >= 10 && digits.length <= 15;
}

/* Bellek içi oran sınırlama: IP başına zaman penceresinde en fazla N istek. */
const hits = new Map<string, number[]>();
export function rateLimit(key: string, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= max) {
    hits.set(key, arr);
    return false;
  }
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) hits.clear();
  return true;
}

export function clientIp(headers: Headers) {
  return (headers.get("x-forwarded-for")?.split(",")[0] || headers.get("x-real-ip") || "local").trim();
}

export function hashIp(ip: string) {
  return crypto.createHash("sha256").update(ip + (process.env.SESSION_SECRET || "dokunus")).digest("hex").slice(0, 16);
}

/** Aynı kökenden gelmeyen POST isteklerini reddet (CSRF koruması). */
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === (req.headers.get("x-forwarded-host") || req.headers.get("host"));
  } catch {
    return false;
  }
}
