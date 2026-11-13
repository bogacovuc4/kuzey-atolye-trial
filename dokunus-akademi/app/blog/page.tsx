import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, formatDate } from "@/lib/blog";
import { readingMinutes, toSlug } from "@/lib/markdown";
import { Cta, PageHero } from "@/components/Blocks";
import { Mandala, SymbolIcon } from "@/components/Symbols";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog ve Spiritüel Rehber",
  description: "Kuantum düşünce, tarot, metafizik, meditasyon, çakra ve kişisel dönüşüm üzerine yazılar.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ kategori?: string }> }) {
  const { kategori } = await searchParams;
  const all = getPosts();
  const cats = Array.from(new Set(all.map((p) => p.category)));
  const posts = kategori ? all.filter((p) => toSlug(p.category) === kategori) : all;

  return (
    <>
      <PageHero kicker="Spiritüel Rehber" title="Blog" symbol="eye" lead="Kendini keşfetme yolculuğuna eşlik eden yazılar, düşünceler ve pratikler." crumbs={[{ label: "Blog" }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <nav className="filters" aria-label="Kategoriler">
            <Link href="/blog" aria-current={!kategori ? "true" : undefined}>Tümü</Link>
            {cats.map((c) => (
              <Link key={c} href={`/blog?kategori=${toSlug(c)}`} aria-current={kategori === toSlug(c) ? "true" : undefined}>{c}</Link>
            ))}
          </nav>
          <div className="grid grid-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="panel panel-link post-card reveal">
                <div className="post-art"><Mandala className="mandala-bg" /><SymbolIcon name={p.symbol} size={56} /></div>
                <div className="meta"><span className="tag soft">{p.category}</span><span>{formatDate(p.date)}</span><span>· {readingMinutes(p.body)} dk</span></div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="link-arrow">Oku →</span>
              </Link>
            ))}
          </div>
          {posts.length === 0 && <p className="center muted">Bu kategoride henüz yazı yok.</p>}
        </div>
      </section>
      <Cta />
    </>
  );
}
