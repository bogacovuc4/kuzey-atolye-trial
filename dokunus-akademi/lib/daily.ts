import "server-only";
import { db, type DailyItem } from "./db";
import { cardOfDay, dayKey, getCard, type TarotCard } from "@/content/tarot";
import type { DailyType } from "@/content/daily";

function dayNumber(key: string) {
  return Math.floor(Date.parse(key + "T00:00:00Z") / 86400000);
}

function pick(type: DailyType, key: string, index: number): string {
  const d = db();
  const pinned = d
    .prepare("SELECT text FROM daily_items WHERE type = ? AND active = 1 AND pinned_date = ? ORDER BY id DESC LIMIT 1")
    .get(type, key) as { text: string } | undefined;
  if (pinned) return pinned.text;
  const pool = d
    .prepare("SELECT text FROM daily_items WHERE type = ? AND active = 1 AND pinned_date IS NULL ORDER BY id")
    .all(type) as Pick<DailyItem, "text">[];
  if (!pool.length) return "";
  return pool[((index % pool.length) + pool.length) % pool.length].text;
}

export type Today = {
  date: string;
  card: TarotCard;
  quote: string;
  intention: string;
  weekly: string;
  meditation: string;
};

export function getToday(now = new Date()): Today {
  const key = dayKey(now);
  const n = dayNumber(key);
  const week = Math.floor((n + 3) / 7); // Pazartesi başlangıçlı hafta
  const pin = db().prepare("SELECT card_slug FROM daily_card_pins WHERE date = ?").get(key) as { card_slug: string } | undefined;
  const card = (pin && getCard(pin.card_slug)) || cardOfDay(now);
  return {
    date: key,
    card,
    quote: pick("quote", key, n),
    intention: pick("intention", key, n + 3),
    weekly: pick("weekly", key, week),
    meditation: pick("meditation", key, n + 1),
  };
}
