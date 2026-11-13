import type { Metadata } from "next";
import Link from "next/link";
import { courses, statusLabels } from "@/content/courses";
import { Cta, PageHero } from "@/components/Blocks";
import { SymbolIcon } from "@/components/Symbols";

export const metadata: Metadata = {
  title: "Eğitimler",
  description: "Dokunuş Akademi eğitimleri: yaşam koçluğu, kuantum düşünce, metafizik, tarot, spiritüel farkındalık, meditasyon ve kişisel gelişim programları.",
  alternates: { canonical: "/egitimler" },
};

export default function CoursesPage() {
  const anyOpen = courses.some((c) => c.status === "kayit-acik");
  return (
    <>
      <PageHero
        kicker="Dokunuş Akademi"
        title="Eğitimler"
        symbol="spiral"
        lead="Kendi hızında öğrenebileceğin, derinleşebileceğin ve dönüşebileceğin programlar."
        crumbs={[{ label: "Eğitimler" }]}
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {!anyOpen && (
            <p className="note reveal" style={{ maxWidth: 820, margin: "0 auto 48px" }}>
              Eğitim programlarımız şu anda hazırlık aşamasında. İlgilendiğin eğitimin sayfasından ön kayıt listesine katılabilirsin; kayıtlar açıldığında ilk sen haberdar olursun.
            </p>
          )}
          <div className="grid grid-3">
            {courses.map((c) => (
              <Link key={c.slug} href={`/egitimler/${c.slug}`} className="panel panel-link course-card reveal">
                <span className={`tag status status-${c.status}`}>{statusLabels[c.status]}</span>
                <SymbolIcon name={c.symbol} size={46} className="icon" />
                <div className="kicker" style={{ marginBottom: 8, fontSize: "0.64rem" }}>{c.category}</div>
                <h3>{c.title}</h3>
                {(c.format || c.duration) && (
                  <div className="meta">{c.format && <span>{c.format}</span>}{c.duration && <span>· {c.duration}</span>}</div>
                )}
                <p className="muted" style={{ fontSize: "0.95rem" }}>{c.summary}</p>
                <span className="link-arrow">{c.status === "kayit-acik" ? "Kayıt Ol →" : "Detaylar ve Ön Kayıt →"}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Cta title="Hangi eğitimin sana uygun olduğundan emin değil misin?" text="Bir görüşme talebi oluştur; ihtiyaçlarını birlikte konuşalım." />
    </>
  );
}
