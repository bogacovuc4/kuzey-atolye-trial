"""
Kuzey Atölye — yerel geliştirme sunucusu (yalnızca Python standart kütüphanesi)

    python db/seed.py      # veritabanını oluştur / sıfırla
    python server.py       # http://localhost:5173

Statik dosyaları sunar ve SQLite veritabanı üzerinden API sağlar:

    GET  /api/health                  sunucu ve veritabanı durumu
    GET  /api/content                 sitenin tüm içeriği (data/content.json ile aynı yapı)
    GET  /api/projects?category=konut projeler (isteğe bağlı kategori filtresi)
    POST /api/contact                 iletişim formu talebini kaydeder
    GET  /api/contacts?status=yeni    kayıtlı talepler (yalnızca bu bilgisayardan)
"""
import json
import re
import sqlite3
import sys
from datetime import datetime
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parent
DB_PATH = ROOT / "db" / "kuzey.db"
HOST, PORT = "127.0.0.1", int(sys.argv[1]) if len(sys.argv) > 1 else 5173

# Statik olarak sunulmayacak yollar (veritabanı, kaynak kod, git)
BLOCKED_PREFIXES = ("/db/", "/.git", "/.claude", "/server.py")
MAX_BODY = 32 * 1024

PROJECT_TYPES = {
    "Konut — yeni yapı",
    "Konut — iç mimari / yenileme",
    "Ticari mekân (ofis, mağaza, restoran)",
    "Restorasyon",
    "Diğer",
}
BUDGETS = {"1-3M", "3-8M", "8M+", "belirsiz"}
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$")
PHONE_RE = re.compile(r"^[+\d\s()-]{10,20}$")

# Terminal renkleri
DIM, GREEN, YELLOW, RED, CYAN, RESET = "\033[2m", "\033[32m", "\033[33m", "\033[31m", "\033[36m", "\033[0m"


def db():
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    con.execute("PRAGMA foreign_keys = ON")
    return con


def rows(con, sql, params=()):
    return [dict(r) for r in con.execute(sql, params)]


def load_content():
    with db() as con:
        projects = rows(con, """
            SELECT id, title, category_id AS category, location, year, area, image, alt, summary, body
            FROM projects ORDER BY sort_order""")
        services = rows(con, "SELECT id, icon, title, text FROM services ORDER BY sort_order")
        tags = rows(con, "SELECT service_id, tag FROM service_tags ORDER BY service_id, sort_order")
        for s in services:
            s["tags"] = [t["tag"] for t in tags if t["service_id"] == s["id"]]
            del s["id"]
        return {
            "stats": rows(con, "SELECT value, suffix, label FROM stats ORDER BY sort_order"),
            "categories": rows(con, "SELECT id, label FROM categories ORDER BY sort_order"),
            "projects": projects,
            "services": services,
            "principles": rows(con, "SELECT icon, title, text FROM principles ORDER BY sort_order"),
            "process": rows(con, "SELECT title, duration, text FROM process_steps ORDER BY sort_order"),
            "team": rows(con, "SELECT name, role, image, bio FROM team_members ORDER BY sort_order"),
            "testimonials": rows(con, "SELECT quote, name, project FROM testimonials ORDER BY sort_order"),
            "faq": rows(con, "SELECT question AS q, answer AS a FROM faqs ORDER BY sort_order"),
        }


def validate_contact(d):
    """Sunucu tarafı doğrulama — ön yüzdeki kurallarla aynı."""
    errors = {}
    name = str(d.get("name", "")).strip()
    email = str(d.get("email", "")).strip()
    phone = str(d.get("phone", "") or "").strip()
    ptype = str(d.get("type", "")).strip()
    budget = str(d.get("budget", "belirsiz") or "belirsiz").strip()
    message = str(d.get("message", "")).strip()
    kvkk = d.get("kvkk") in (True, "on", "true", 1, "1")

    if not 3 <= len(name) <= 120:
        errors["name"] = "Lütfen adınızı ve soyadınızı girin."
    if not EMAIL_RE.match(email) or len(email) > 200:
        errors["email"] = "Geçerli bir e-posta adresi girin."
    if phone and not PHONE_RE.match(phone):
        errors["phone"] = "Telefon numarasını kontrol edin."
    if ptype not in PROJECT_TYPES:
        errors["type"] = "Lütfen bir proje türü seçin."
    if budget not in BUDGETS:
        errors["budget"] = "Geçersiz bütçe aralığı."
    if not 20 <= len(message) <= 4000:
        errors["message"] = "Projenizi en az 20 karakterle kısaca anlatın."
    if not kvkk:
        errors["kvkk"] = "Devam etmek için aydınlatma metnini onaylayın."

    clean = dict(name=name, email=email, phone=phone or None, project_type=ptype,
                 budget=budget, message=message, kvkk_consent=1)
    return clean, errors


class Handler(SimpleHTTPRequestHandler):
    server_version = "KuzeyAtolye/1.0"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    # ---------- helpers ----------
    def send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        if not self.path.startswith("/api/"):
            self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def is_local(self):
        return self.client_address[0] in ("127.0.0.1", "::1")

    # ---------- routing ----------
    def do_GET(self):
        url = urlparse(self.path)
        path = url.path
        if any(path.startswith(p) for p in BLOCKED_PREFIXES):
            return self.send_error(HTTPStatus.NOT_FOUND)
        if not path.startswith("/api/"):
            return super().do_GET()

        query = parse_qs(url.query)
        try:
            if path == "/api/health":
                with db() as con:
                    n = con.execute("SELECT COUNT(*) FROM projects").fetchone()[0]
                return self.send_json(200, {"ok": True, "projects": n})

            if path == "/api/content":
                return self.send_json(200, load_content())

            if path == "/api/projects":
                cat = query.get("category", [None])[0]
                with db() as con:
                    sql = """SELECT id, title, category_id AS category, location, year, area, image, alt, summary, body
                             FROM projects {} ORDER BY sort_order"""
                    data = rows(con, sql.format("WHERE category_id = ?"), (cat,)) if cat and cat != "tumu" \
                        else rows(con, sql.format(""))
                return self.send_json(200, data)

            if path == "/api/contacts":
                if not self.is_local():
                    return self.send_json(403, {"error": "Yalnızca yerel erişime açık."})
                status = query.get("status", [None])[0]
                with db() as con:
                    sql = "SELECT * FROM contact_requests {} ORDER BY created_at DESC"
                    data = rows(con, sql.format("WHERE status = ?"), (status,)) if status \
                        else rows(con, sql.format(""))
                return self.send_json(200, data)

            return self.send_json(404, {"error": "Bilinmeyen API adresi."})
        except sqlite3.OperationalError as e:
            self.log_error("Veritabanı hatası: %s", e)
            return self.send_json(503, {"error": "Veritabanı hazır değil. Önce: python db/seed.py"})

    def do_POST(self):
        if urlparse(self.path).path != "/api/contact":
            return self.send_json(404, {"error": "Bilinmeyen API adresi."})

        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0 or length > MAX_BODY:
            return self.send_json(413 if length > MAX_BODY else 400, {"error": "Geçersiz istek gövdesi."})
        try:
            data = json.loads(self.rfile.read(length).decode("utf-8"))
            if not isinstance(data, dict):
                raise ValueError
        except (ValueError, UnicodeDecodeError):
            return self.send_json(400, {"error": "Geçersiz JSON."})

        clean, errors = validate_contact(data)
        if errors:
            return self.send_json(422, {"error": "Formda hatalar var.", "fields": errors})

        try:
            with db() as con:
                cur = con.execute(
                    """INSERT INTO contact_requests (name, email, phone, project_type, budget, message, kvkk_consent)
                       VALUES (:name, :email, :phone, :project_type, :budget, :message, :kvkk_consent)""",
                    clean,
                )
                new_id = cur.lastrowid
        except sqlite3.OperationalError as e:
            self.log_error("Veritabanı hatası: %s", e)
            return self.send_json(503, {"error": "Veritabanı hazır değil."})

        print(f"{GREEN}  ✓ Yeni talep #{new_id}{RESET} — {clean['name']} · {clean['project_type']} · bütçe: {clean['budget']}")
        return self.send_json(201, {"ok": True, "id": new_id})

    # ---------- logging ----------
    def log_message(self, fmt, *args):
        ts = datetime.now().strftime("%H:%M:%S")
        print(f"{DIM}{ts}{RESET} {self.address_string()} {fmt % args}")

    def log_request(self, code="-", size="-"):
        code_i = int(code) if str(code).isdigit() else 0
        color = GREEN if code_i < 300 else CYAN if code_i < 400 else YELLOW if code_i < 500 else RED
        ts = datetime.now().strftime("%H:%M:%S")
        print(f"{DIM}{ts}{RESET} {self.command:<4} {self.path:<45} {color}{code}{RESET}")


def main():
    # Windows konsolunda Türkçe karakterler ve renkler için
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace", line_buffering=True)
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    if sys.platform == "win32":
        import os

        os.system("")  # ANSI renk kodlarını etkinleştirir

    if not DB_PATH.exists():
        print(f"{YELLOW}Veritabanı bulunamadı, oluşturuluyor…{RESET}")
        sys.path.insert(0, str(ROOT / "db"))
        import seed  # noqa: E402

        seed.seed()

    httpd = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"\n  {CYAN}Kuzey Atölye{RESET} sunucusu çalışıyor → http://localhost:{PORT}")
    print(f"  Veritabanı: {DB_PATH.relative_to(ROOT)}   ·   Durdurmak için Ctrl+C\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nSunucu durduruldu.")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()
