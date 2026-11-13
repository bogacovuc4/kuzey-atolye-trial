-- ==========================================================
-- Kuzey Atölye — SQLite şeması
-- Yeniden oluşturmak için: python db/seed.py
-- ==========================================================
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS contact_requests;
DROP TABLE IF EXISTS faqs;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS team_members;
DROP TABLE IF EXISTS process_steps;
DROP TABLE IF EXISTS principles;
DROP TABLE IF EXISTS service_tags;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS stats;

CREATE TABLE stats (
  id          INTEGER PRIMARY KEY,
  value       INTEGER NOT NULL,
  suffix      TEXT    NOT NULL DEFAULT '',
  label       TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL
);

CREATE TABLE categories (
  id          TEXT    PRIMARY KEY,          -- 'konut', 'ic-mekan' …
  label       TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL
);

CREATE TABLE projects (
  id          TEXT    PRIMARY KEY,          -- slug
  title       TEXT    NOT NULL,
  category_id TEXT    NOT NULL REFERENCES categories(id),
  location    TEXT    NOT NULL,
  year        INTEGER NOT NULL CHECK (year BETWEEN 1990 AND 2100),
  area        TEXT    NOT NULL,
  image       TEXT    NOT NULL,             -- Unsplash fotoğraf kimliği
  alt         TEXT    NOT NULL,
  summary     TEXT    NOT NULL,
  body        TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL
);
CREATE INDEX idx_projects_category ON projects(category_id);

CREATE TABLE services (
  id          INTEGER PRIMARY KEY,
  icon        TEXT    NOT NULL,
  title       TEXT    NOT NULL,
  text        TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL
);

CREATE TABLE service_tags (
  service_id  INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  tag         TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL,
  PRIMARY KEY (service_id, tag)
);

CREATE TABLE principles (
  id          INTEGER PRIMARY KEY,
  icon        TEXT    NOT NULL,
  title       TEXT    NOT NULL,
  text        TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL
);

CREATE TABLE process_steps (
  id          INTEGER PRIMARY KEY,
  title       TEXT    NOT NULL,
  duration    TEXT    NOT NULL,
  text        TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL
);

CREATE TABLE team_members (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  role        TEXT    NOT NULL,
  image       TEXT    NOT NULL,
  bio         TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL
);

CREATE TABLE testimonials (
  id          INTEGER PRIMARY KEY,
  quote       TEXT    NOT NULL,
  name        TEXT    NOT NULL,
  project     TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL
);

CREATE TABLE faqs (
  id          INTEGER PRIMARY KEY,
  question    TEXT    NOT NULL,
  answer      TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL
);

-- İletişim formundan gelen talepler
CREATE TABLE contact_requests (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT    NOT NULL,
  email        TEXT    NOT NULL,
  phone        TEXT,
  project_type TEXT    NOT NULL,
  budget       TEXT    NOT NULL DEFAULT 'belirsiz',
  message      TEXT    NOT NULL,
  kvkk_consent INTEGER NOT NULL CHECK (kvkk_consent IN (0, 1)),
  status       TEXT    NOT NULL DEFAULT 'yeni'
               CHECK (status IN ('yeni', 'görüşüldü', 'teklif verildi', 'kazanıldı', 'kapandı')),
  created_at   TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
);
CREATE INDEX idx_contact_status ON contact_requests(status);
CREATE INDEX idx_contact_created ON contact_requests(created_at);
