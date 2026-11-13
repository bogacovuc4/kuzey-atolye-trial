import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCard, tarotCards, tarotDisclaimer } from "@/content/tarot";
import { site } from "@/content/site";
import { Cta, JsonLd, PageHero } from "@/components/Blocks";
import { TarotFace } from "@/components/TarotArt";

export const dynamicParams = false;
export function generateStaticParams() {
  return tarotCards.map((c) => ({ kart: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ kart: string }> }): Promise<Metadata> {
  const c = getCard((await params).kart);
  if (!c) return {};
  return {
    title: `${c.name} Kartı Anlamı (${c.english})`,
    description: `${c.name} tarot kartının sembolik anlamı: ${c.essence} Anahtar kelimeler: ${c.keywords.join(", ")}.`,
    alternates: { canonical: `/tarot/kartlar/${c.slug}` },
  };
}

export default async function CardPage({ params }: { params: Promise<{ kart: string }> }) {
  const c = getCard((await params).kart);
  if (!c) notFound();
  const prev = tarotCards[(c.id + 21) % 22];
  const next = tarotCards[(c.id + 1) % 22];

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: `${c.name} Kartı Anlamı`, author: { "@type": "Person", name: site.founder }, publisher: { "@type": "Organization", name: site.name } }} />
      <PageHero kicker={`Büyük Arkana · ${c.numeral}`} title={c.name} lead={c.essence} crumbs={[{ label: "Tarot", href: "/tarot" }, { label: "Kartlar", href: "/tarot/kartlar" }, { label: c.name }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container card-detail">
          <div className="big"><TarotFace card={c} /></div>
          <div>
            <div className="tags" style={{ marginBottom: 24 }}>
              {c.keywords.map((k) => <span key={k} className="tag">{k}</span>)}
              <span className="tag soft">{c.english}</span>
            </div>
            <h2 style={{ fontSize: "2rem" }}>Sembolik Anlamı</h2>
            <p className="lead">{c.meaning}</p>

            <h2 style={{ fontSize: "2rem", marginTop: 40 }}>Karttaki Semboller</h2>
            <ul className="list-check" style={{ marginBottom: 32 }}>{c.symbols.map((s) => <li key={s}>{s}</li>)}</ul>

            <div className="light-shadow">
              <div className="panel">
                <div className="kicker">☀ Işık Yönü</div>
                <p className="mb-0">{c.light}</p>
              </div>
              <div className="panel">
                <div className="kicker">☾ Gölge Yönü</div>
                <p className="mb-0">{c.shadow}</p>
              </div>
            </div>

            <div className="panel glow mt-l">
              <div className="kicker">Kendine Sor</div>
              <p className="quote-block" style={{ marginBottom: 20 }}>“{c.question}”</p>
              <div className="kicker">Olumlama</div>
              <p className="italic mb-0" style={{ fontSize: "1.25rem", color: "var(--gold-2)" }}>{c.affirmation}</p>
            </div>

            <p className="note mt-l">{tarotDisclaimer}</p>

            <div className="btn-row mt-l" style={{ justifyContent: "space-between" }}>
              <Link href={`/tarot/kartlar/${prev.slug}`} className="btn btn-quiet">← {prev.name}</Link>
              <Link href="/tarot#interaktif" className="btn btn-primary">Kart Çek</Link>
              <Link href={`/tarot/kartlar/${next.slug}`} className="btn btn-quiet">{next.name} →</Link>
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
