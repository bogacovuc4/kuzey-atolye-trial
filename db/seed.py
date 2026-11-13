"""
Kuzey Atölye — veritabanını sıfırdan oluşturur ve doldurur.

    python db/seed.py

- Şemayı db/schema.sql dosyasından kurar (mevcut tabloları siler).
- Site içeriğini data/content.json dosyasından aktarır.
- Örnek iletişim taleplerini ekler.
"""
import json
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DB_PATH = ROOT / "db" / "kuzey.db"
SCHEMA_PATH = ROOT / "db" / "schema.sql"
CONTENT_PATH = ROOT / "data" / "content.json"

# Örnek talepler (kurgusal kişiler; e-postalar ayrılmış örnek alan adını kullanır)
SAMPLE_REQUESTS = [
    ("Selin Arıkan", "selin.arikan@example.com", "0532 410 22 18", "Konut — iç mimari / yenileme", "1-3M",
     "Moda'da 1962 yapımı bir binada 135 m² dairemizi yenilemek istiyoruz. Mutfak ve salonu birleştirmeyi düşünüyoruz, Mart'ta başlamak istiyoruz.",
     "teklif verildi", "2026-10-02 10:14:00"),
    ("Kerem Tunalı", "kerem@example.com", "0541 772 09 63", "Konut — yeni yapı", "8M+",
     "Çeşme Ovacık'ta 1.200 m² arsamız var. 4 yatak odalı, havuzlu bir yazlık ev için mimari proje arıyoruz.",
     "görüşüldü", "2026-10-09 16:42:00"),
    ("Nihan Ersoy", "nihan.ersoy@example.com", None, "Ticari mekân (ofis, mağaza, restoran)", "3-8M",
     "Karaköy'de 220 m² bir zemin katı 60 kişilik bir restorana dönüştürmek istiyoruz. Mutfak projesi de dahil olmalı.",
     "kazanıldı", "2026-10-15 11:05:00"),
    ("Baran Öztürk", "baran.ozturk@example.com", "0505 318 44 70", "Restorasyon", "3-8M",
     "Büyükada'da tescilli ahşap bir köşkümüz var. Kurul süreci dahil restorasyon için fikir almak istiyoruz.",
     "teklif verildi", "2026-10-21 09:30:00"),
    ("Defne Kaya", "defne.kaya@example.com", "0533 290 61 15", "Konut — iç mimari / yenileme", "belirsiz",
     "Ataşehir'de yeni aldığımız 3+1 dairenin mobilya ve aydınlatma tasarımı için destek arıyoruz.",
     "kapandı", "2026-10-24 14:18:00"),
    ("Onur Akgül", "onur@example.com", "0212 555 77 31", "Ticari mekân (ofis, mağaza, restoran)", "1-3M",
     "Maslak'ta 35 kişilik ekibimiz için 400 m² ofis katı kiraladık. Ocak sonunda taşınmamız gerekiyor.",
     "görüşüldü", "2026-11-01 13:47:00"),
    ("Ece Yıldırım", "ece.yildirim@example.com", None, "Diğer", "belirsiz",
     "Bir butik otel projesi için ön fizibilite ve konsept çalışması yaptırmak istiyoruz. Yer: Alaçatı.",
     "yeni", "2026-11-06 18:02:00"),
    ("Tolga Sezer", "tolga.sezer@example.com", "0544 610 83 27", "Konut — yeni yapı", "8M+",
     "Riva'da 2 katlı müstakil bir ev için ruhsat projesi ve uygulama hizmeti almak istiyoruz.",
     "yeni", "2026-11-10 10:26:00"),
    ("Aslı Demir", "asli.demir@example.com", "0532 905 12 48", "Konut — iç mimari / yenileme", "1-3M",
     "Cihangir'de 90 m² bir çatı katı. Teras düzenlemesi ve banyo yenilemesi en büyük önceliğimiz.",
     "yeni", "2026-11-12 21:40:00"),
]


def seed():
    content = json.loads(CONTENT_PATH.read_text(encoding="utf-8"))
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)

    con = sqlite3.connect(DB_PATH)
    try:
        con.executescript(SCHEMA_PATH.read_text(encoding="utf-8"))
        cur = con.cursor()

        cur.executemany(
            "INSERT INTO stats (value, suffix, label, sort_order) VALUES (?, ?, ?, ?)",
            [(s["value"], s["suffix"], s["label"], i) for i, s in enumerate(content["stats"])],
        )
        cur.executemany(
            "INSERT INTO categories (id, label, sort_order) VALUES (?, ?, ?)",
            [(c["id"], c["label"], i) for i, c in enumerate(content["categories"])],
        )
        cur.executemany(
            """INSERT INTO projects (id, title, category_id, location, year, area, image, alt, summary, body, sort_order)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            [
                (p["id"], p["title"], p["category"], p["location"], p["year"], p["area"],
                 p["image"], p["alt"], p["summary"], p["body"], i)
                for i, p in enumerate(content["projects"])
            ],
        )
        for i, s in enumerate(content["services"]):
            cur.execute(
                "INSERT INTO services (icon, title, text, sort_order) VALUES (?, ?, ?, ?)",
                (s["icon"], s["title"], s["text"], i),
            )
            sid = cur.lastrowid
            cur.executemany(
                "INSERT INTO service_tags (service_id, tag, sort_order) VALUES (?, ?, ?)",
                [(sid, t, j) for j, t in enumerate(s["tags"])],
            )
        cur.executemany(
            "INSERT INTO principles (icon, title, text, sort_order) VALUES (?, ?, ?, ?)",
            [(p["icon"], p["title"], p["text"], i) for i, p in enumerate(content["principles"])],
        )
        cur.executemany(
            "INSERT INTO process_steps (title, duration, text, sort_order) VALUES (?, ?, ?, ?)",
            [(s["title"], s["duration"], s["text"], i) for i, s in enumerate(content["process"])],
        )
        cur.executemany(
            "INSERT INTO team_members (name, role, image, bio, sort_order) VALUES (?, ?, ?, ?, ?)",
            [(m["name"], m["role"], m["image"], m["bio"], i) for i, m in enumerate(content["team"])],
        )
        cur.executemany(
            "INSERT INTO testimonials (quote, name, project, sort_order) VALUES (?, ?, ?, ?)",
            [(t["quote"], t["name"], t["project"], i) for i, t in enumerate(content["testimonials"])],
        )
        cur.executemany(
            "INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)",
            [(f["q"], f["a"], i) for i, f in enumerate(content["faq"])],
        )
        cur.executemany(
            """INSERT INTO contact_requests
               (name, email, phone, project_type, budget, message, kvkk_consent, status, created_at)
               VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)""",
            SAMPLE_REQUESTS,
        )
        con.commit()

        tables = [r[0] for r in cur.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")]
        print(f"Veritabanı hazır: {DB_PATH.relative_to(ROOT)}")
        for t in tables:
            n = cur.execute(f'SELECT COUNT(*) FROM "{t}"').fetchone()[0]
            print(f"  {t:<18} {n:>3} kayıt")
    finally:
        con.close()


if __name__ == "__main__":
    seed()
