import type { Metadata } from "next";
import Link from "next/link";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { appointmentStatuses, db, type Appointment, type CourseSignup, type DailyItem, type DbPost } from "@/lib/db";
import { getToday } from "@/lib/daily";
import { getFilePosts } from "@/lib/blog";
import { courses } from "@/content/courses";
import { tarotCards, dayKey } from "@/content/tarot";
import { dailyTypeLabels, type DailyType } from "@/content/daily";
import LoginForm from "./LoginForm";
import {
  addDaily, deleteAppointment, deleteDaily, deletePost, deleteSignup, logout, pinCard, savePost, updateAppointment, updateDaily,
} from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Yönetim", robots: { index: false, follow: false } };

type SP = Promise<{ sekme?: string; duzenle?: string; hata?: string; kaydedildi?: string; durum?: string }>;

const fmt = (s: string) => new Intl.DateTimeFormat("tr-TR", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Istanbul" }).format(new Date(s.replace(" ", "T") + "Z"));

export default async function AdminPage({ searchParams }: { searchParams: SP }) {
  if (!adminConfigured()) {
    return (
      <div className="admin container narrow">
        <h1 style={{ fontSize: "2.4rem" }}>Yönetim Paneli</h1>
        <div className="note">
          Yönetim paneli henüz yapılandırılmamış. Sunucuda <code>ADMIN_PASSWORD</code> (en az 8 karakter) ve <code>SESSION_SECRET</code> ortam değişkenlerini tanımlayın. Ayrıntılar README dosyasında.
        </div>
      </div>
    );
  }
  if (!(await isAdmin())) {
    return (
      <div className="admin container" style={{ maxWidth: 460 }}>
        <div className="panel glow corner">
          <div className="kicker">Dokunuş Akademi</div>
          <h1 style={{ fontSize: "2.2rem" }}>Yönetim Paneli</h1>
          <LoginForm />
        </div>
      </div>
    );
  }

  const sp = await searchParams;
  const tab = sp.sekme || "randevular";
  const d = db();
  const counts = {
    yeni: (d.prepare("SELECT COUNT(*) n FROM appointments WHERE status = 'yeni'").get() as { n: number }).n,
    toplam: (d.prepare("SELECT COUNT(*) n FROM appointments").get() as { n: number }).n,
    onKayit: (d.prepare("SELECT COUNT(*) n FROM course_signups").get() as { n: number }).n,
    yazi: (d.prepare("SELECT COUNT(*) n FROM posts").get() as { n: number }).n + getFilePosts().length,
  };
  const tabs = [
    ["randevular", "Randevu Talepleri"],
    ["on-kayit", "Eğitim Ön Kayıtları"],
    ["gunluk", "Günlük İçerikler"],
    ["blog", "Blog"],
  ];

  return (
    <div className="admin container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        <h1 style={{ fontSize: "2.4rem", margin: 0 }}>Yönetim Paneli</h1>
        <form action={logout}><button className="btn btn-quiet btn-sm">Çıkış Yap</button></form>
      </div>
      <div className="stat-row">
        <div className="panel stat"><b>{counts.yeni}</b><span className="muted">Yeni talep</span></div>
        <div className="panel stat"><b>{counts.toplam}</b><span className="muted">Toplam randevu talebi</span></div>
        <div className="panel stat"><b>{counts.onKayit}</b><span className="muted">Eğitim ön kaydı</span></div>
        <div className="panel stat"><b>{counts.yazi}</b><span className="muted">Blog yazısı</span></div>
      </div>
      <nav className="admin-tabs">
        {tabs.map(([k, l]) => <Link key={k} href={`/yonetim?sekme=${k}`} aria-current={tab === k ? "page" : undefined}>{l}</Link>)}
      </nav>

      {tab === "randevular" && <Appointments status={sp.durum} />}
      {tab === "on-kayit" && <Signups />}
      {tab === "gunluk" && <Daily />}
      {tab === "blog" && <Blog edit={sp.duzenle} error={sp.hata} saved={!!sp.kaydedildi} />}
    </div>
  );
}

function Appointments({ status }: { status?: string }) {
  const rows = (status
    ? db().prepare("SELECT * FROM appointments WHERE status = ? ORDER BY id DESC").all(status)
    : db().prepare("SELECT * FROM appointments ORDER BY id DESC LIMIT 500").all()) as Appointment[];
  return (
    <>
      <div className="filters" style={{ justifyContent: "flex-start", marginBottom: 20 }}>
        <Link href="/yonetim?sekme=randevular" aria-current={!status ? "true" : undefined}>Tümü</Link>
        {appointmentStatuses.map((s) => <Link key={s} href={`/yonetim?sekme=randevular&durum=${encodeURIComponent(s)}`} aria-current={status === s ? "true" : undefined}>{s}</Link>)}
      </div>
      {rows.length === 0 ? <p className="muted">Henüz talep yok.</p> : (
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Tarih</th><th>Kişi</th><th>Hizmet</th><th>Mesaj</th><th>Durum ve Not</th><th /></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td style={{ whiteSpace: "nowrap" }}>{fmt(r.created_at)}</td>
                  <td>
                    <strong style={{ fontWeight: 500, color: "var(--ivory)" }}>{r.name}</strong><br />
                    <a href={`tel:${r.phone.replace(/\s/g, "")}`}>{r.phone}</a><br />
                    <a href={`mailto:${r.email}`}>{r.email}</a>
                  </td>
                  <td>{r.service}<br /><span className="muted">{r.mode}</span></td>
                  <td style={{ maxWidth: 320, whiteSpace: "pre-wrap" }}>{r.message || <span className="muted">—</span>}</td>
                  <td>
                    <form action={updateAppointment} style={{ display: "grid", gap: 6, minWidth: 200 }}>
                      <input type="hidden" name="id" value={r.id} />
                      <select name="status" defaultValue={r.status} className="select">
                        {appointmentStatuses.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      <input name="note" defaultValue={r.note} placeholder="Not" className="input" />
                      <button className="btn btn-ghost btn-sm">Kaydet</button>
                    </form>
                  </td>
                  <td>
                    <form action={deleteAppointment}>
                      <input type="hidden" name="id" value={r.id} />
                      <button className="btn btn-quiet btn-sm" title="Talebi sil">Sil</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function Signups() {
  const rows = db().prepare("SELECT * FROM course_signups ORDER BY id DESC LIMIT 1000").all() as CourseSignup[];
  const title = (s: string) => courses.find((c) => c.slug === s)?.title || s;
  return rows.length === 0 ? <p className="muted">Henüz ön kayıt yok.</p> : (
    <div className="table-wrap">
      <table className="table">
        <thead><tr><th>Tarih</th><th>Eğitim</th><th>Kişi</th><th>Not</th><th /></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td style={{ whiteSpace: "nowrap" }}>{fmt(r.created_at)}</td>
              <td>{title(r.course_slug)}</td>
              <td><strong style={{ fontWeight: 500, color: "var(--ivory)" }}>{r.name}</strong><br /><a href={`mailto:${r.email}`}>{r.email}</a>{r.phone && <><br />{r.phone}</>}</td>
              <td style={{ maxWidth: 320 }}>{r.message || <span className="muted">—</span>}</td>
              <td><form action={deleteSignup}><input type="hidden" name="id" value={r.id} /><button className="btn btn-quiet btn-sm">Sil</button></form></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Daily() {
  const today = getToday();
  const key = dayKey();
  const items = db().prepare("SELECT * FROM daily_items ORDER BY type, id").all() as DailyItem[];
  const pin = db().prepare("SELECT card_slug FROM daily_card_pins WHERE date = ?").get(key) as { card_slug: string } | undefined;
  return (
    <div className="grid" style={{ gap: 28 }}>
      <div className="panel">
        <div className="kicker">Bugün sitede ({key})</div>
        <ul className="list-check" style={{ fontSize: "0.95rem" }}>
          <li><strong>Kart:</strong>&nbsp;{today.card.name}{pin ? " (sabitlendi)" : " (otomatik)"}</li>
          <li><strong>Söz:</strong>&nbsp;{today.quote}</li>
          <li><strong>Niyet:</strong>&nbsp;{today.intention}</li>
          <li><strong>Meditasyon:</strong>&nbsp;{today.meditation}</li>
          <li><strong>Haftalık mesaj:</strong>&nbsp;{today.weekly}</li>
        </ul>
        <p className="muted" style={{ fontSize: "0.88rem" }}>
          İçerikler her gün aktif havuzdan sırayla seçilir. Bir içeriğe tarih verirseniz o gün o içerik gösterilir.
        </p>
      </div>

      <div className="grid grid-2">
        <form action={pinCard} className="panel form">
          <div className="kicker">Günün Kartını Sabitle</div>
          <div className="form-row">
            <div className="field"><label htmlFor="pin-date">Tarih</label><input id="pin-date" type="date" name="date" defaultValue={key} className="input" required /></div>
            <div className="field">
              <label htmlFor="pin-card">Kart</label>
              <select id="pin-card" name="card" className="select" defaultValue="">
                <option value="">Otomatik seçim</option>
                {tarotCards.map((c) => <option key={c.slug} value={c.slug}>{c.numeral} · {c.name}</option>)}
              </select>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm">Kaydet</button>
        </form>

        <form action={addDaily} className="panel form">
          <div className="kicker">Yeni İçerik Ekle</div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="d-type">Tür</label>
              <select id="d-type" name="type" className="select">
                {(Object.keys(dailyTypeLabels) as DailyType[]).map((t) => <option key={t} value={t}>{dailyTypeLabels[t]}</option>)}
              </select>
            </div>
            <div className="field"><label htmlFor="d-date">Belirli gün (isteğe bağlı)</label><input id="d-date" type="date" name="pinned_date" className="input" /></div>
          </div>
          <div className="field"><label htmlFor="d-text">Metin</label><textarea id="d-text" name="text" className="textarea" style={{ minHeight: 90 }} required maxLength={600} /></div>
          <button className="btn btn-primary btn-sm">Ekle</button>
        </form>
      </div>

      {(Object.keys(dailyTypeLabels) as DailyType[]).map((t) => (
        <div key={t}>
          <h3 style={{ fontSize: "1.4rem" }}>{dailyTypeLabels[t]}</h3>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Metin</th><th>Belirli gün</th><th>Aktif</th><th /></tr></thead>
              <tbody>
                {items.filter((i) => i.type === t).map((i) => (
                  <tr key={i.id}>
                    <td colSpan={3}>
                      <form action={updateDaily} id={`d${i.id}`} style={{ display: "grid", gridTemplateColumns: "1fr 160px 60px auto", gap: 8, alignItems: "center" }}>
                        <input type="hidden" name="id" value={i.id} />
                        <textarea name="text" defaultValue={i.text} className="input" rows={2} maxLength={600} />
                        <input type="date" name="pinned_date" defaultValue={i.pinned_date || ""} className="input" />
                        <input type="checkbox" name="active" defaultChecked={!!i.active} aria-label="Aktif" style={{ width: 20, height: 20, accentColor: "var(--gold)" }} />
                        <button className="btn btn-ghost btn-sm">Kaydet</button>
                      </form>
                    </td>
                    <td><form action={deleteDaily}><input type="hidden" name="id" value={i.id} /><button className="btn btn-quiet btn-sm">Sil</button></form></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function Blog({ edit, error, saved }: { edit?: string; error?: string; saved: boolean }) {
  const posts = db().prepare("SELECT * FROM posts ORDER BY date DESC").all() as DbPost[];
  const files = getFilePosts();
  const current = edit ? posts.find((p) => p.id === Number(edit)) : undefined;
  const today = dayKey();
  return (
    <div className="grid" style={{ gap: 28 }}>
      {saved && <div className="alert ok">Yazı kaydedildi.</div>}
      {error && <div className="alert err">{error === "slug" ? "Bu adres (slug) başka bir yazıda kullanılıyor." : "Başlık, içerik ve tarih zorunludur."}</div>}
      <form action={savePost} className="panel form">
        <div className="kicker">{current ? "Yazıyı Düzenle" : "Yeni Yazı"}</div>
        {current && <input type="hidden" name="id" value={current.id} />}
        <div className="form-row">
          <div className="field"><label htmlFor="b-title">Başlık</label><input id="b-title" name="title" className="input" defaultValue={current?.title} required /></div>
          <div className="field"><label htmlFor="b-slug">Adres (boşsa başlıktan)</label><input id="b-slug" name="slug" className="input" defaultValue={current?.slug} placeholder="ornek-yazi" /></div>
        </div>
        <div className="field"><label htmlFor="b-desc">Kısa açıklama (SEO)</label><input id="b-desc" name="description" className="input" defaultValue={current?.description} maxLength={300} /></div>
        <div className="form-row">
          <div className="field"><label htmlFor="b-cat">Kategori</label><input id="b-cat" name="category" className="input" defaultValue={current?.category || "Kişisel Gelişim"} /></div>
          <div className="field">
            <label htmlFor="b-sym">Simge</label>
            <select id="b-sym" name="symbol" className="select" defaultValue={current?.symbol || "eye"}>
              {[["sun", "Güneş"], ["atom", "Atom"], ["eye", "Göz"], ["moon", "Ay"], ["lotus", "Lotus"], ["spiral", "Spiral"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div className="field"><label htmlFor="b-date">Tarih</label><input id="b-date" type="date" name="date" className="input" defaultValue={current?.date || today} required /></div>
        </div>
        <div className="field">
          <label htmlFor="b-body">İçerik (Markdown: ## başlık, **kalın**, *italik*, - liste)</label>
          <textarea id="b-body" name="body" className="textarea" style={{ minHeight: 320, fontFamily: "ui-monospace, monospace", fontSize: 14 }} defaultValue={current?.body} required />
        </div>
        <label className="check"><input type="checkbox" name="published" defaultChecked={current ? !!current.published : true} /> Yayında</label>
        <div className="btn-row">
          <button className="btn btn-primary btn-sm">Kaydet</button>
          {current && <Link href="/yonetim?sekme=blog" className="btn btn-quiet btn-sm">Vazgeç</Link>}
        </div>
      </form>

      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Tarih</th><th>Başlık</th><th>Kaynak</th><th>Durum</th><th /></tr></thead>
          <tbody>
            {posts.map((p) => (
              <tr key={`db${p.id}`}>
                <td>{p.date}</td>
                <td><Link href={`/blog/${p.slug}`} target="_blank">{p.title}</Link></td>
                <td>Panel</td>
                <td>{p.published ? "Yayında" : "Taslak"}</td>
                <td style={{ display: "flex", gap: 8 }}>
                  <Link href={`/yonetim?sekme=blog&duzenle=${p.id}`} className="btn btn-ghost btn-sm">Düzenle</Link>
                  <form action={deletePost}><input type="hidden" name="id" value={p.id} /><button className="btn btn-quiet btn-sm">Sil</button></form>
                </td>
              </tr>
            ))}
            {files.map((p) => (
              <tr key={p.slug}>
                <td>{p.date}</td>
                <td><Link href={`/blog/${p.slug}`} target="_blank">{p.title}</Link></td>
                <td>Dosya</td>
                <td>Yayında</td>
                <td className="muted" style={{ fontSize: "0.8rem" }}>content/blog/{p.slug}.md</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
