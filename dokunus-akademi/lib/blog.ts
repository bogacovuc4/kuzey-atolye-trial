import "server-only";
import fs from "node:fs";
import path from "node:path";
import { db, type DbPost } from "./db";
import type { Symbol } from "@/content/services";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  symbol: Symbol;
  body: string;
  source: "dosya" | "panel";
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parseFile(file: string): Post | null {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  if (meta.draft === "true") return null;
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title || file,
    description: meta.description || "",
    date: meta.date || "2026-01-01",
    category: meta.category || "Genel",
    symbol: (meta.symbol as Symbol) || "eye",
    body: m[2].trim(),
    source: "dosya",
  };
}

function filePosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parseFile)
    .filter((p): p is Post => !!p);
}

function panelPosts(includeDrafts = false): Post[] {
  const rows = db()
    .prepare(`SELECT * FROM posts ${includeDrafts ? "" : "WHERE published = 1"} ORDER BY date DESC`)
    .all() as DbPost[];
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
    date: r.date,
    category: r.category,
    symbol: r.symbol as Symbol,
    body: r.body,
    source: "panel" as const,
  }));
}

export function getPosts(): Post[] {
  const panel = panelPosts();
  const slugs = new Set(panel.map((p) => p.slug));
  return [...panel, ...filePosts().filter((p) => !slugs.has(p.slug))].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getFilePosts() {
  return filePosts();
}

export function formatDate(d: string) {
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d + "T12:00:00"));
}
