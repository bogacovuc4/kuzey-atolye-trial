# Dokunuş Akademi — www.dokunusakademi.com

Türkan Demir'in kurucusu olduğu Dokunuş Akademi'nin web sitesi.
Next.js 16 (App Router) + React 19 + TypeScript. Veritabanı olarak Node.js'in yerleşik SQLite'ı (`node:sqlite`) kullanılır; ek bir veritabanı sunucusu gerekmez.

## Hızlı başlangıç

```bash
npm install
cp .env.example .env.local   # ADMIN_PASSWORD ve SESSION_SECRET değerlerini doldurun
npm run dev                  # http://localhost:3000
```

Yayın için:

```bash
npm run build
npm start
```

Gereksinim: **Node.js 22.5 veya üzeri** (yerleşik SQLite için).

## Sayfalar

| Adres | İçerik |
|---|---|
| `/` | Sinematik açılış, kurucu tanıtımı, hizmetler, günlük interaktif alan (günün kartı, söz, niyet, meditasyon, haftalık mesaj), tarot vitrini, eğitimler, blog |
| `/turkan-demir` | Kurucu sayfası |
| `/yasam-koclugu`, `/kuantum`, `/metafizik`, `/enerji-ve-cakra`, `/meditasyon` | Hizmet sayfaları |
| `/tarot` | Tarot danışmanlığı + **interaktif tarot** (günün kartı, tek kart, geçmiş-şimdi-gelecek açılımı) |
| `/tarot/kartlar`, `/tarot/kartlar/[kart]` | 22 Büyük Arkana kartının sembolik anlamları |
| `/egitimler`, `/egitimler/[slug]` | Eğitim kataloğu, detay sayfası, ön kayıt formu |
| `/blog`, `/blog/[slug]` | SEO uyumlu blog (kategori filtresi, içindekiler, yapılandırılmış veri) |
| `/iletisim` | Randevu talep formu |
| `/kvkk`, `/gizlilik` | KVKK aydınlatma metni, gizlilik ve çerez politikası |
| `/yonetim` | Yönetim paneli (şifreli) |

## İçerik nasıl düzenlenir?

| Ne | Nerede |
|---|---|
| **Telefon, e-posta, WhatsApp, adres, sosyal medya** | `content/site.ts` → `contact` ve `social`. Boş alanlar sitede görünmez. WhatsApp numarası boşken sabit buton iletişim formuna gider. |
| **Kurucu sayfası** (portre, yaklaşım, sertifikalar, hikâye) | `content/site.ts` → `founder`. Portre için fotoğrafı `public/` klasörüne koyup yolunu `portrait` alanına yazın. `credentials` ve `story` boşken bu bölümler gösterilmez. |
| Hizmet metinleri, SSS | `content/services.ts` |
| Tarot kart anlamları | `content/tarot.ts` |
| Eğitimler | `content/courses.ts` (aşağıya bakın) |
| Blog yazıları | `/yonetim` → Blog sekmesi **veya** `content/blog/*.md` dosyaları |
| Günlük içerikler | `/yonetim` → Günlük İçerikler |

> Kurucuya ait eğitim, sertifika, deneyim ve başarı bilgileri bilinçli olarak boş bırakılmıştır. Gerçek bilgiler `content/site.ts` içinden eklenmelidir.

### Eğitimler ve ödeme altyapısı

Her eğitimin `status` alanı vardır:

- `hazirlaniyor` — Sitede "Hazırlanıyor" görünür, ücret gösterilmez, yalnızca ön kayıt listesi alınır.
- `kayit-acik` — Başvuru formu açılır. `price` doldurulursa ücret görünür.
- `tamamlandi` — Dönem kapandı; ön kayıt alınmaya devam eder.

Ödeme sistemi (iyzico, PayTR, Stripe vb.) eklendiğinde bir eğitimin `checkoutUrl` alanını doldurmanız, detay sayfasında formu "Kaydı Tamamla" butonuyla değiştirir. Üyelik sistemi için `lib/auth.ts` oturum altyapısı ve `lib/db.ts` şeması genişletilebilir.

## Yönetim paneli (`/yonetim`)

`.env.local` (veya sunucu ortam değişkenleri) içinde `ADMIN_PASSWORD` ve `SESSION_SECRET` tanımlı olmalıdır.

- **Randevu Talepleri** — durum takibi (yeni → iletişime geçildi → randevu verildi → tamamlandı / iptal), not ekleme, silme
- **Eğitim Ön Kayıtları** — eğitime göre liste
- **Günlük İçerikler** — söz, niyet, meditasyon ve haftalık mesaj ekle / düzenle / pasife al, belirli bir güne sabitle; günün tarot kartını sabitle
- **Blog** — Markdown ile yazı ekle, düzenle, taslak/yayında

Yeni randevu talebinde bildirim almak için `NOTIFY_WEBHOOK_URL` tanımlayın (Make, Zapier, n8n, Slack webhook'u vb.); talep JSON olarak gönderilir.

## Güvenlik

- Formlar sunucu tarafında doğrulanır; bot tuzağı (honeypot), IP başına oran sınırlama ve aynı köken (CSRF) kontrolü vardır.
- IP adresleri yalnızca özetlenmiş (hash) olarak saklanır.
- Yönetici oturumu HMAC ile imzalı, `httpOnly` + `SameSite=Strict` çerezdir; giriş denemeleri sınırlandırılır.
- Güvenlik başlıkları `next.config.ts` içinde tanımlıdır.

## Google Analytics

`NEXT_PUBLIC_GA_ID` tanımlandığında çerez onay bildirimi görünür; GA yalnızca ziyaretçi "Kabul Et" derse ve IP anonimleştirme ile yüklenir.

## Barındırma notu

Site, kalıcı diske sahip bir Node.js sunucusunda (VPS, Railway, Render, Fly.io, cPanel Node.js vb.) olduğu gibi çalışır. Veritabanı dosyası `data/dokunus.db` konumundadır (`DATABASE_PATH` ile değiştirilebilir) ve düzenli yedeklenmelidir.

Vercel gibi sunucusuz (serverless) ortamlarda disk kalıcı olmadığı için `lib/db.ts` katmanının barındırılan bir veritabanına (ör. Turso/libSQL, Postgres) taşınması gerekir.

## İçerik ilkeleri

- Kuantum düşünce içerikleri, bilimsel kuantum fiziğinden açıkça ayrılır.
- Tarot yorumları kesin gelecek tahmini olarak sunulmaz; her tarot alanında bu açıklama yer alır.
- Çakra, enerji ve meditasyon içerikleri tıbbi/psikolojik tedavi yerine geçmediğini belirtir.
- KVKK ve gizlilik metinleri genel bir şablondur; yayın öncesi bir hukuk danışmanı tarafından gözden geçirilmesi önerilir.
