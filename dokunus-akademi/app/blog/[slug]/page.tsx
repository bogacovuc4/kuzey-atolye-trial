import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts, formatDate } from "@/lib/blog";
import { readingMinutes, renderMarkdown } from "@/lib/markdown";
import { site } from "@/content/site";
import { Cta, JsonLd, PageHero } from "@/components/Blocks";
import { SymbolIcon } from "@/components/Symbols";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.description, publishedTime: p.date, authors: [site.founder] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const { html, headings } = renderMarkdown(p.body);
  const related = getPosts().filter((o) => o.slug !== p.slug && o.category === p.category).concat(getPosts().filter((o) => o.slug !== p.slug && o.category !== p.category)).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          author: { "@type": "Person", name: site.founder },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/blog/${p.slug}`,
        }}
      />
      <PageHero kicker={`${p.category} · ${formatDate(p.date)} · ${readingMinutes(p.body)} dk okuma`} title={p.title} lead={p.description} symbol={p.symbol} crumbs={[{ label: "Blog", href: "/blog" }, { label: p.title }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container article-grid" style={{ maxWidth: 1080 }}>
          <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          <aside className="article-aside">
            {headings.length > 0 && (
              <nav className="toc panel" aria-label="İçindekiler" style={{ padding: 24 }}>
                <div className="kicker" style={{ marginBottom: 10 }}>İçindekiler</div>
                {headings.map((h) => <a key={h.id} href={`#${h.id}`}>{h.text}</a>)}
              </nav>
            )}
            <div className="panel" style={{ padding: 24, marginTop: 16 }}>
              <p className="muted" style={{ fontSize: "0.92rem" }}>Bu yazı sana dokunduysa, yolculuğuna birlikte devam edelim.</p>
              <Link href="/iletisim" className="btn btn-primary" style={{ width: "100%" }}>Görüşme Talep Et</Link>
            </div>
          </aside>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="kicker both" style={{ display: "flex", justifyContent: "center" }}>Okumaya Devam Et</div>
          <div className="grid grid-3" style={{ marginTop: 24 }}>
            {related.map((o) => (
              <Link key={o.slug} href={`/blog/${o.slug}`} className="panel panel-link">
                <SymbolIcon name={o.symbol} size={36} className="icon" />
                <h3 style={{ fontSize: "1.35rem" }}>{o.title}</h3>
                <p className="muted" style={{ fontSize: "0.92rem" }}>{o.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
