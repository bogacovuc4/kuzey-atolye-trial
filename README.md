# Kuzey Atölye

**🔗 Canlı site: https://bogacovuc4.github.io/kuzey-atolye-trial/**

Mimarlık ve iç mimarlık stüdyosu için tanıtım sitesi. HTML/CSS/JS ön yüz, Python + SQLite arka uç. Harici bağımlılık yok.

## Yerelde çalıştırma

```bash
python db/seed.py     # veritabanını oluşturur ve doldurur (db/kuzey.db)
python server.py      # http://localhost:5173 — istek log'ları terminalde akar
```

`server.py` veritabanı yoksa ilk açılışta kendisi oluşturur.

## Veritabanı (SQLite)

| Tablo | İçerik |
|---|---|
| `projects`, `categories` | Proje galerisi ve filtre kategorileri |
| `services`, `service_tags` | Hizmetler ve etiketleri |
| `team_members`, `testimonials`, `faqs` | Ekip, müşteri yorumları, SSS |
| `stats`, `principles`, `process_steps` | İstatistikler, stüdyo ilkeleri, süreç adımları |
| `contact_requests` | İletişim formundan gelen talepler (durum: yeni → görüşüldü → teklif verildi → kazanıldı / kapandı) |

Şema: `db/schema.sql` · Doldurma: `db/seed.py` (içerik kaynağı `data/content.json`)

## API

| Yöntem | Adres | Açıklama |
|---|---|---|
| GET | `/api/health` | Sunucu ve veritabanı durumu |
| GET | `/api/content` | Sitenin tüm içeriği |
| GET | `/api/projects?category=konut` | Projeler (isteğe bağlı filtre) |
| POST | `/api/contact` | İletişim talebini doğrulayıp kaydeder |
| GET | `/api/contacts?status=yeni` | Kayıtlı talepler (yalnızca yerel erişim) |

## Statik yayın (GitHub Pages)

GitHub Pages sunucu kodu çalıştırmaz. Bu durumda site içeriği `data/content.json` dosyasından okur; form gönderimi kaydedilmez, yalnızca onay mesajı gösterilir.

## Dosyalar

- `index.html` — sayfa iskeleti
- `css/tokens.css` — renk, tipografi, boşluk token'ları
- `js/data.js` — içerik yükleyici (API → statik JSON yedeği)
- `js/components.js` — tekrar kullanılan bileşenler
- `server.py` — yerel sunucu ve API
- `design-system/` — UI Pro Max tasarım sistemi kaydı
