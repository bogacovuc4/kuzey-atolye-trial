import Link from "next/link";
import { founder, site } from "@/content/site";
import { services } from "@/content/services";
import { courses } from "@/content/courses";
import { tarotCards } from "@/content/tarot";
import { getToday } from "@/lib/daily";
import { getPosts, formatDate } from "@/lib/blog";
import { Mandala, SymbolIcon, LogoMark } from "@/components/Symbols";
import { Cta, SectionHead } from "@/components/Blocks";
import { TarotFace } from "@/components/TarotArt";
import DailyCard from "@/components/DailyCard";
import { Portrait } from "@/components/Portrait";

export const dynamic = "force-dynamic";

export default function Home() {
  const today = getToday();
  const posts = getPosts().slice(0, 3);
  const showcase = [tarotCards[17], tarotCards[2], tarotCards[19]];

  return (
    <>
      {/* ---------- AÇILIŞ ---------- */}
      <section className="hero">
        <Mandala className="hero-mandala" />
        <Mandala className="hero-mandala two" />
        <div className="hero-beam" aria-hidden="true" />
        <div className="hero-orb" style={{ left: "-10%", top: "20%" }} aria-hidden="true" />
        <div className="hero-orb" style={{ right: "-12%", bottom: "0%" }} aria-hidden="true" />
        <div className="container hero-content">
          <LogoMark size={64} className="hero-mark" />
          <div className="kicker both" style={{ opacity: 0, animation: "rise 1.2s var(--ease) 0.1s forwards" }}>Dokunuş Akademi</div>
          <h1>
            <span className="line">Evreni Keşfetmek,</span>
            <span className="line"><span className="gold-text">Kendini Keşfetmekle Başlar.</span></span>
          </h1>
          <p className="lead">
            Yaşam koçluğu, kuantum düşünce, metafizik ve spiritüel farkındalık yolculuğunda kendine yeni bir kapı aç.
          </p>
          <p className="hero-founder">“{founder.intro}”</p>
          <div className="btn-row">
            <Link href="/turkan-demir" className="btn btn-primary">Benimle Tanış</Link>
            <Link href="/tarot#interaktif" className="btn btn-ghost">Spiritüel Yolculuğa Başla</Link>
            <a href="#hizmetler" className="btn btn-quiet">Hizmetlerimizi Keşfet</a>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true" />
      </section>

      {/* ---------- KURUCU ---------- */}
      <section className="section">
        <div className="container founder-intro">
          <div className="reveal">
            <Portrait />
          </div>
          <div className="reveal">
            <div className="kicker">Kurucu</div>
            <h2>Kendine açılan kapıda <span className="gold-text">sana eşlik ediyorum.</span></h2>
            {founder.approach.map((p) => <p key={p.slice(0, 20)} className="muted">{p}</p>)}
            <p className="quote-block" style={{ margin: "28px 0 32px" }}>“{site.altSlogan}”</p>
            <Link href="/turkan-demir" className="btn btn-ghost">Türkan Demir&apos;i Tanı</Link>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ---------- HİZMETLER ---------- */}
      <section className="section" id="hizmetler" style={{ scrollMarginTop: 60 }}>
        <div className="container">
          <SectionHead kicker="Uzmanlık Alanları" title={<>Ruhuna dokunan <span className="gold-text">altı yol</span></>} lead="Her biri kendi kapısını açan; birbirini tamamlayan farkındalık ve dönüşüm alanları." />
          <div className="grid grid-3">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/${s.slug}`} className="panel panel-link service-card reveal">
                <span className="num">{["I", "II", "III", "IV", "V", "VI"][i]}</span>
                <SymbolIcon name={s.symbol} size={52} className="icon" />
                <div className="kicker" style={{ marginBottom: 10, fontSize: "0.64rem" }}>{s.kicker}</div>
                <h3>{s.title}</h3>
                <p>{s.tagline}</p>
                <span className="link-arrow">Keşfet →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- GÜNLÜK ALAN ---------- */}
      <section className="section" id="gunluk" style={{ background: "linear-gradient(180deg, transparent, rgba(42,24,80,0.25), transparent)" }}>
        <div className="container">
          <SectionHead
            kicker="Bugünün Dokunuşu"
            title={<>Her gün <span className="gold-text">yeni bir farkındalık</span></>}
            lead="Günün kartı, ilham veren bir söz, niyet cümlesi ve meditasyon önerisi; her gün yenilenir."
          />
          <div className="daily-grid">
            <DailyCard slug={today.card.slug} />
            <div className="daily-items">
              <div className="panel daily-item quote reveal" style={{ gridColumn: "1 / -1" }}>
                <h3>✦ Günün İlham Veren Sözü</h3>
                <p>“{today.quote}”</p>
              </div>
              <div className="panel daily-item reveal">
                <h3>☾ Günün Niyet Cümlesi</h3>
                <p className="italic" style={{ fontSize: "1.25rem", color: "var(--ivory)" }}>{today.intention}</p>
              </div>
              <div className="panel daily-item reveal">
                <h3>◎ Meditasyon Önerisi</h3>
                <p style={{ fontSize: "0.96rem" }}>{today.meditation}</p>
              </div>
              <div className="panel daily-item reveal" style={{ gridColumn: "1 / -1" }}>
                <h3>✧ Haftalık Farkındalık Mesajı</h3>
                <p>{today.weekly}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TAROT VİTRİNİ ---------- */}
      <section className="section">
        <div className="container founder-intro" style={{ gridTemplateColumns: undefined }}>
          <div className="reveal">
            <div className="kicker">İnteraktif Tarot</div>
            <h2>Kartlar geleceği söylemez; <span className="gold-text">sana seni gösterir.</span></h2>
            <p className="muted">
              Desteyi karıştır, sana çağrı yapan kartı seç ve sembollerin hikâyeni nasıl yansıttığını keşfet. Günün kartı, tek kart ya da geçmiş-şimdi-gelecek temalı üç kartlık sembolik açılım seni bekliyor.
            </p>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link href="/tarot#interaktif" className="btn btn-primary">Kart Çek</Link>
              <Link href="/tarot/kartlar" className="btn btn-ghost">22 Kartın Anlamı</Link>
            </div>
          </div>
          <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: "4%", alignItems: "flex-end" }}>
            {showcase.map((c, i) => (
              <Link key={c.slug} href={`/tarot/kartlar/${c.slug}`} style={{ width: "30%", transform: `rotate(${(i - 1) * 7}deg) translateY(${i === 1 ? -24 : 0}px)`, transition: "transform .5s" }} aria-label={c.name}>
                <TarotFace card={c} className="showcase-card" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- EĞİTİMLER ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead kicker="Dokunuş Akademi Eğitimleri" title={<>Öğrenmenin de <span className="gold-text">bir yolculuk</span> olduğu yer</>} lead="Yaşam koçluğundan tarota, meditasyondan metafiziğe uzanan eğitim programları hazırlanıyor. Ön kayıt listesine katıl, ilk sen haberdar ol." />
          <div className="grid grid-4">
            {courses.slice(0, 4).map((c) => (
              <Link key={c.slug} href={`/egitimler/${c.slug}`} className="panel panel-link reveal">
                <SymbolIcon name={c.symbol} size={40} className="icon" />
                <span className="tag soft" style={{ alignSelf: "flex-start", marginBottom: 14 }}>{c.category}</span>
                <h3 style={{ fontSize: "1.35rem" }}>{c.title}</h3>
                <p className="muted" style={{ fontSize: "0.92rem" }}>{c.summary}</p>
                <span className="link-arrow">Detaylar →</span>
              </Link>
            ))}
          </div>
          <p className="center mt-l"><Link href="/egitimler" className="btn btn-ghost">Tüm Eğitimler</Link></p>
        </div>
      </section>

      {/* ---------- BLOG ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead kicker="Spiritüel Rehber" title={<>Okumak, <span className="gold-text">içe dönmenin</span> bir yolu</>} />
          <div className="grid grid-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="panel panel-link post-card reveal">
                <div className="post-art"><Mandala className="mandala-bg" /><SymbolIcon name={p.symbol} size={56} /></div>
                <div className="meta"><span className="tag soft">{p.category}</span><span>{formatDate(p.date)}</span></div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="link-arrow">Oku →</span>
              </Link>
            ))}
          </div>
          <p className="center mt-l"><Link href="/blog" className="btn btn-ghost">Tüm Yazılar</Link></p>
        </div>
      </section>

      <Cta />
    </>
  );
}
