import type { Metadata } from "next";
import Link from "next/link";
import { tarotCards, tarotDisclaimer } from "@/content/tarot";
import { Cta, PageHero } from "@/components/Blocks";
import { TarotFace } from "@/components/TarotArt";

export const metadata: Metadata = {
  title: "Tarot Kartlarının Anlamları — Büyük Arkana",
  description: "Büyük Arkana'nın 22 kartının sembolik anlamları, ışık ve gölge yönleri ve kendine sorabileceğin sorular.",
  alternates: { canonical: "/tarot/kartlar" },
};

export default function CardsPage() {
  return (
    <>
      <PageHero kicker="Büyük Arkana" title="Tarot Kartlarının Anlamları" symbol="moon" lead="Deli'nin yolculuğu: saf bir başlangıçtan bütünlüğe uzanan 22 arketip." crumbs={[{ label: "Tarot", href: "/tarot" }, { label: "Kartlar" }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="card-gallery">
            {tarotCards.map((c) => (
              <Link key={c.slug} href={`/tarot/kartlar/${c.slug}`} className="reveal">
                <TarotFace card={c} />
                <span>{c.numeral} · {c.name}</span>
              </Link>
            ))}
          </div>
          <p className="note mt-l">{tarotDisclaimer}</p>
        </div>
      </section>
      <Cta />
    </>
  );
}
