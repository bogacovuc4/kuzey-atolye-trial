import type { Metadata } from "next";
import Link from "next/link";
import { founder, site } from "@/content/site";
import { services } from "@/content/services";
import { Cta, JsonLd, PageHero, SectionHead } from "@/components/Blocks";
import { Portrait } from "@/components/Portrait";
import { SymbolIcon } from "@/components/Symbols";

export const metadata: Metadata = {
  title: "Türkan Demir Kimdir?",
  description: "Dokunuş Akademi kurucusu Türkan Demir'in yaklaşımı, yaşam felsefesi ve akademinin kuruluş amacı.",
  alternates: { canonical: "/turkan-demir" },
};

export default function FounderPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: site.founder, worksFor: { "@type": "Organization", name: site.name }, url: `${site.url}/turkan-demir` }} />
      <PageHero kicker="Kurucu" title={founder.title} crumbs={[{ label: "Türkan Demir" }]} />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container founder-intro">
          <div className="reveal"><Portrait /></div>
          <div className="reveal">
            <div className="kicker">Yaklaşımım</div>
            <h2>Cevaplar sende; <span className="gold-text">ben yalnızca kapıyı aralıyorum.</span></h2>
            <p className="lead" style={{ marginBottom: 24 }}>{founder.intro}</p>
            {founder.approach.map((p) => <p key={p.slice(0, 24)} className="muted">{p}</p>)}
            {founder.story.map((p) => <p key={p.slice(0, 24)} className="muted">{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead kicker="Yaşam Felsefesi" title={<>Dokunuş Akademi&apos;nin <span className="gold-text">dört ilkesi</span></>} />
          <div className="philosophy">
            {founder.philosophy.map((p, i) => (
              <div key={p.title} className="panel corner reveal">
                <div className="kicker" style={{ marginBottom: 12 }}>{["I", "II", "III", "IV"][i]}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow center reveal">
          <div className="kicker both">Kuruluş Amacı</div>
          <h2>Neden <span className="gold-text">Dokunuş Akademi?</span></h2>
          <p className="lead" style={{ margin: "0 auto" }}>{founder.mission}</p>
          <p className="quote-block mt-l">“{site.slogan}”</p>
        </div>
      </section>

      {founder.credentials.length > 0 && (
        <section className="section">
          <div className="container narrow">
            <SectionHead kicker="Eğitimler ve Sertifikalar" title="Öğrenme Yolculuğum" />
            <ul className="timeline">
              {founder.credentials.map((c) => (
                <li key={c.title}>
                  <span className="year">{c.year || "✦"}</span>
                  <span><strong style={{ color: "var(--ivory)", fontWeight: 400 }}>{c.title}</strong>{c.org && <span className="muted"> · {c.org}</span>}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <SectionHead kicker="Birlikte Çalışabileceğimiz Alanlar" title="Sana nasıl eşlik edebilirim?" />
          <div className="grid grid-3">
            {services.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="panel panel-link reveal" style={{ flexDirection: "row", gap: 18, alignItems: "center" }}>
                <SymbolIcon name={s.symbol} size={40} className="icon" />
                <div>
                  <h3 style={{ fontSize: "1.3rem", margin: 0 }}>{s.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta title="Birlikte yürümeye hazır mısın?" />
    </>
  );
}
