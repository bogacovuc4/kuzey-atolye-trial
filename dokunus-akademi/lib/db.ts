import "server-only";
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { dailySeed, type DailyType } from "@/content/daily";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = process.env.DATABASE_PATH || path.join(DATA_DIR, "dokunus.db");

type G = typeof globalThis & { __dokunusDb?: DatabaseSync };
const g = globalThis as G;

function open(): DatabaseSync {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      service TEXT NOT NULL,
      mode TEXT NOT NULL,
      message TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'yeni',
      note TEXT NOT NULL DEFAULT '',
      ip_hash TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS course_signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_slug TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS daily_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      text TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1,
      pinned_date TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS daily_card_pins (
      date TEXT PRIMARY KEY,
      card_slug TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      symbol TEXT NOT NULL DEFAULT 'eye',
      body TEXT NOT NULL,
      published INTEGER NOT NULL DEFAULT 0,
      date TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const count = db.prepare("SELECT COUNT(*) AS n FROM daily_items").get() as { n: number };
  if (count.n === 0) {
    const ins = db.prepare("INSERT INTO daily_items (type, text) VALUES (?, ?)");
    for (const [type, items] of Object.entries(dailySeed) as [DailyType, string[]][]) {
      for (const t of items) ins.run(type, t);
    }
  }
  return db;
}

export function db(): DatabaseSync {
  if (!g.__dokunusDb) g.__dokunusDb = open();
  return g.__dokunusDb;
}

/* ---------- Tipler ---------- */

export type Appointment = {
  id: number; name: string; phone: string; email: string; service: string;
  mode: string; message: string; status: string; note: string; created_at: string;
};
export type CourseSignup = {
  id: number; course_slug: string; name: string; email: string; phone: string; message: string; created_at: string;
};
export type DailyItem = {
  id: number; type: DailyType; text: string; active: number; pinned_date: string | null; created_at: string;
};
export type DbPost = {
  id: number; slug: string; title: string; description: string; category: string; symbol: string;
  body: string; published: number; date: string; updated_at: string;
};

export const appointmentStatuses = ["yeni", "iletişime geçildi", "randevu verildi", "tamamlandı", "iptal"] as const;
