import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { tarotCards } from "@/content/tarot";
import { courses } from "@/content/courses";
import { getPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.url}${p}`;
  const now = new Date();
  return [
    { url: u("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: u("/turkan-demir"), priority: 0.9 },
    ...services.map((s) => ({ url: u(`/${s.slug}`), priority: 0.9 })),
    { url: u("/tarot/kartlar"), priority: 0.7 },
    ...tarotCards.map((c) => ({ url: u(`/tarot/kartlar/${c.slug}`), priority: 0.6 })),
    { url: u("/egitimler"), priority: 0.8 },
    ...courses.map((c) => ({ url: u(`/egitimler/${c.slug}`), priority: 0.6 })),
    { url: u("/blog"), changeFrequency: "weekly" as const, priority: 0.8 },
    ...getPosts().map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: new Date(p.date), priority: 0.7 })),
    { url: u("/iletisim"), priority: 0.9 },
    { url: u("/kvkk"), priority: 0.2 },
    { url: u("/gizlilik"), priority: 0.2 },
  ];
}
