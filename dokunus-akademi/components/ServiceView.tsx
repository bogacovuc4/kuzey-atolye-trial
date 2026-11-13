import Link from "next/link";
import type { Service } from "@/content/services";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Cta, Faq, JsonLd, PageHero, SectionHead } from "./Blocks";
import { SymbolIcon } from "./Symbols";

export function ServiceView({ s, children }: { s: Service; children?: React.ReactNode }) {
  const others = services.filter((o) => o.slug !== s.slug).slice(0, 3);
  const formService = {
    "yasam-koclugu": "Yaşam Koçluğu",
    kuantum: "Kuantum Düşünce ve Farkındalık",
    metafizik: "Metafizik ve Spiritüel Farkındalık",
    tarot: "Tarot Danışmanlığı",
    "enerji-ve-cakra": "Enerji ve Çakra Farkındalığı",
    meditasyon: "Meditasyon ve İçsel Yolculuk",
  }[s.slug];
  const href = `/iletisim?hizmet=${encodeURIComponent(formService || "")}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.seoDescription,
          provider: { "@type": "Organization", name: site.name, url: site.url },
          areaServed: "TR",
          url: `${site.url}/${s.slug}`,
        }}
      />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <PageHero kicker={s.kicker} title={s.title} lead={s.tagline} symbol={s.symbol} crumbs={[{ label: s.menuLabel }]} />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container narrow reveal">
          {s.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "lead" : "muted"} style={{ margin: "0 auto 1.2em", maxWidth: 760, textAlign: "center" }}>{p}</p>
          ))}
          <div className="btn-row" style={{ justifyContent: "center", marginTop: 32 }}>
            <Link href={href} className="btn btn-primary">Görüşme Talep Et</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead kicker="Çalışma Alanları" title={<>Neler <span className="gold-text">keşfedeceğiz?</span></>} />
          <div className="grid grid-3">
            {s.items.map((it, i) => (
              <div key={it.title} className="panel corner reveal">
                <div className="kicker" style={{ marginBottom: 12 }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 style={{ fontSize: "1.45rem" }}>{it.title}</h3>
                <p className="muted mb-0" style={{ fontSize: "0.96rem" }}>{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {children}

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "start" }}>
            <div className="panel glow reveal">
              <div className="kicker">Kimler İçin?</div>
              <h3 style={{ marginBottom: 22 }}>Bu yolculuk sana göre olabilir, eğer…</h3>
              <ul className="list-check">{s.forWhom.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
            <div className="reveal">
              <div className="kicker">Süreç</div>
              <h3 style={{ marginBottom: 30 }}>Adım adım ilerliyoruz</h3>
              <div className="steps">
                {s.process.map((p) => (
                  <div key={p.title} className="step">
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {s.note && <p className="note mt-l reveal">{s.note}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <SectionHead kicker="Sıkça Sorulanlar" title="Merak ettiklerin" />
          <Faq items={s.faqs} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead kicker="Diğer Yollar" title="Keşfetmeye devam et" />
          <div className="grid grid-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/${o.slug}`} className="panel panel-link reveal">
                <SymbolIcon name={o.symbol} size={44} className="icon" />
                <h3 style={{ fontSize: "1.4rem" }}>{o.title}</h3>
                <p className="muted" style={{ fontSize: "0.94rem" }}>{o.tagline}</p>
                <span className="link-arrow">Keşfet →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
