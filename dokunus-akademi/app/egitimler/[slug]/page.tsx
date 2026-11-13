import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse, statusLabels } from "@/content/courses";
import { site } from "@/content/site";
import { Cta, JsonLd, PageHero } from "@/components/Blocks";
import CourseSignupForm from "@/components/CourseSignupForm";

export const dynamicParams = false;
export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCourse((await params).slug);
  if (!c) return {};
  const cat = /eğitimi$/i.test(c.category) ? c.category : `${c.category} Eğitimi`;
  return { title: `${c.title} — ${cat}`, description: c.summary, alternates: { canonical: `/egitimler/${c.slug}` } };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCourse((await params).slug);
  if (!c) notFound();
  const open = c.status === "kayit-acik";
  const price = typeof c.price === "number" ? new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(c.price) : null;
  const start = c.startDate ? new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(c.startDate)) : null;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: c.title,
          description: c.summary,
          provider: { "@type": "Organization", name: site.name, sameAs: site.url },
        }}
      />
      <PageHero kicker={c.category} title={c.title} lead={c.summary} symbol={c.symbol} crumbs={[{ label: "Eğitimler", href: "/egitimler" }, { label: c.title }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container course-layout">
          <div>
            {c.description.map((p, i) => <p key={i} className={i === 0 ? "lead" : "muted"}>{p}</p>)}
            <div className="grid grid-2 mt-l">
              <div className="panel">
                <div className="kicker">Program İçeriği</div>
                <ul className="list-check">{c.topics.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
              <div className="panel">
                <div className="kicker">Kazanımlar</div>
                <ul className="list-check">{c.outcomes.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
            {!open && (
              <p className="note mt-l">
                Bu eğitim şu anda hazırlık aşamasındadır; henüz satışa açık değildir. Program içeriği, tarih ve ücret bilgileri kesinleştiğinde bu sayfada paylaşılacaktır.
              </p>
            )}
          </div>
          <aside className="panel glow corner">
            <span className={`tag status-${c.status}`} style={{ marginBottom: 18 }}>{statusLabels[c.status]}</span>
            <ul className="facts" style={{ marginTop: 18 }}>
              <li><span>Kategori</span><span>{c.category}</span></li>
              {c.format && <li><span>Format</span><span>{c.format}</span></li>}
              {c.duration && <li><span>Süre</span><span>{c.duration}</span></li>}
              {start && <li><span>Başlangıç</span><span>{start}</span></li>}
              {open && price && <li><span>Ücret</span><span className="gold-text">{price}</span></li>}
            </ul>
            {open && c.checkoutUrl ? (
              <a href={c.checkoutUrl} className="btn btn-primary" style={{ width: "100%" }}>Kaydı Tamamla</a>
            ) : (
              <>
                <h3 style={{ fontSize: "1.4rem" }}>{open ? "Başvuru Formu" : "Ön Kayıt Listesi"}</h3>
                <p className="muted" style={{ fontSize: "0.92rem" }}>
                  {open ? "Formu doldur, kayıt detayları için seninle iletişime geçelim." : "Kayıtlar açıldığında ilk sen haberdar ol. Bu bir ödeme ya da kesin kayıt değildir."}
                </p>
                <CourseSignupForm courseSlug={c.slug} open={open} />
              </>
            )}
          </aside>
        </div>
        <div className="container center mt-l">
          <Link href="/egitimler" className="link-arrow">← Tüm eğitimler</Link>
        </div>
      </section>
      <Cta />
    </>
  );
}
