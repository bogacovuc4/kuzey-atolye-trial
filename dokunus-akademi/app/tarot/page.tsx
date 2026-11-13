import type { Metadata } from "next";
import Link from "next/link";
import { getService } from "@/content/services";
import { tarotCards } from "@/content/tarot";
import { getToday } from "@/lib/daily";
import { ServiceView } from "@/components/ServiceView";
import { SectionHead } from "@/components/Blocks";
import TarotExperience from "@/components/TarotExperience";
import { TarotFace } from "@/components/TarotArt";

export const dynamic = "force-dynamic";

const s = getService("tarot")!;

export const metadata: Metadata = { title: s.title, description: s.seoDescription, alternates: { canonical: "/tarot" } };

export default function TarotPage() {
  const today = getToday();
  return (
    <ServiceView s={s}>
      <section className="section" id="interaktif" style={{ scrollMarginTop: 40, background: "radial-gradient(900px 500px at 50% 30%, rgba(59,36,112,0.35), transparent 70%)" }}>
        <div className="container">
          <SectionHead
            kicker="İnteraktif Tarot"
            title={<>Desteye dokun, <span className="gold-text">kartın seni bulsun</span></>}
            lead="Bir an dur, nefesini yavaşlat ve aklındaki soruya odaklan. Ardından sana çağrı yapan kartı seç."
          />
          <TarotExperience dailyCardSlug={today.card.slug} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead kicker="Büyük Arkana" title={<>22 kart, <span className="gold-text">22 arketip</span></>} lead="Her kartın sembolik anlamını, ışık ve gölge yönlerini ve sana soracağı soruyu keşfet." />
          <div className="card-gallery">
            {tarotCards.map((c) => (
              <Link key={c.slug} href={`/tarot/kartlar/${c.slug}`} className="reveal">
                <TarotFace card={c} />
                <span>{c.numeral} · {c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ServiceView>
  );
}
