import Link from "next/link";
import { Mandala, SymbolIcon } from "./Symbols";
import type { Symbol } from "@/content/services";

export function PageHero({
  kicker, title, lead, symbol, crumbs,
}: { kicker?: string; title: string; lead?: string; symbol?: Symbol; crumbs?: { label: string; href?: string }[] }) {
  return (
    <section className="page-hero">
      <Mandala className="hero-mandala" />
      <div className="container narrow" style={{ position: "relative" }}>
        {crumbs && (
          <nav className="breadcrumbs" aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            {crumbs.map((c) => (
              <span key={c.label} style={{ display: "contents" }}>
                <span aria-hidden="true">✦</span>
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        {symbol && <SymbolIcon name={symbol} size={64} className="page-symbol" />}
        {kicker && <div className="kicker both">{kicker}</div>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}

export function SectionHead({ kicker, title, lead }: { kicker?: string; title: React.ReactNode; lead?: string }) {
  return (
    <div className="section-head reveal">
      {kicker && <div className="kicker both">{kicker}</div>}
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

export function Cta({
  title = "Yolculuğuna bugün bir dokunuşla başla.",
  text = "Sana en uygun çalışmayı birlikte belirlemek için bir görüşme talebi oluştur. En kısa sürede seninle iletişime geçeceğiz.",
}: { title?: string; text?: string }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta reveal">
          <Mandala className="hero-mandala" />
          <div className="kicker both">Bireysel Görüşme</div>
          <h2>{title}</h2>
          <p className="lead" style={{ margin: "0 auto 34px" }}>{text}</p>
          <div className="btn-row">
            <Link href="/iletisim" className="btn btn-primary">Randevu Talep Et</Link>
            <Link href="/turkan-demir" className="btn btn-ghost">Benimle Tanış</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
