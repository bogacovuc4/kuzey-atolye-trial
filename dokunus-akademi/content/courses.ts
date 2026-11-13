/**
 * EĞİTİMLER — Dokunuş Akademi eğitim altyapısı
 * ------------------------------------------------------------------
 * status:
 *   "hazirlaniyor" → Eğitim henüz açılmadı. Sitede "Hazırlanıyor" olarak
 *                    görünür, ziyaretçi yalnızca ön kayıt / haber listesine katılır.
 *   "kayit-acik"   → Kayıtlar açık. Başvuru formu gösterilir.
 *   "tamamlandi"   → Dönem kapandı; yeni dönem için ön kayıt alınır.
 *
 * Ödeme sistemi eklendiğinde `price` ve `checkoutUrl` alanlarını doldurmanız
 * yeterlidir; detay sayfası "Satın Al" butonunu otomatik gösterir.
 * Bilinmeyen bilgiler (tarih, süre, ücret) boş bırakılır ve sitede gösterilmez.
 */

import type { Symbol } from "./services";

export type CourseStatus = "hazirlaniyor" | "kayit-acik" | "tamamlandi";

export type Course = {
  slug: string;
  category: string;
  title: string;
  symbol: Symbol;
  summary: string;
  description: string[];
  topics: string[];
  outcomes: string[];
  status: CourseStatus;
  format?: string; // ör. "Online · Canlı"
  duration?: string; // ör. "6 hafta"
  startDate?: string; // ör. "2027-02-01"
  price?: number; // TL
  checkoutUrl?: string;
};

export const statusLabels: Record<CourseStatus, string> = {
  hazirlaniyor: "Hazırlanıyor",
  "kayit-acik": "Kayıtlar Açık",
  tamamlandi: "Dönem Tamamlandı",
};

export const courses: Course[] = [
  {
    slug: "yasam-koclugu-temelleri",
    category: "Yaşam Koçluğu",
    title: "Kendi Hayatının Koçu Olmak",
    symbol: "sun",
    summary: "Hedef belirleme, öz farkındalık ve motivasyon üzerine uygulamalı bir başlangıç programı.",
    description: [
      "Bu program, yaşam koçluğunun temel araçlarını kendi hayatında kullanabilmen için tasarlanıyor.",
      "Değerlerini keşfetmekten hedef planlamaya, motivasyonu sürdürmekten yaşam dengesine kadar pratik egzersizlerle ilerlemen hedefleniyor.",
    ],
    topics: ["Değerler ve öncelikler", "Hedef belirleme teknikleri", "Kendini sınırlayan inançlar", "Motivasyon ve alışkanlık", "Yaşam dengesi çarkı"],
    outcomes: ["Kendi hedeflerini netleştirebilmek", "Uygulanabilir bir eylem planı oluşturmak", "Kendine güçlü sorular sorabilmek"],
    status: "hazirlaniyor",
  },
  {
    slug: "kuantum-dusunce",
    category: "Kuantum Düşünce",
    title: "Kuantum Düşünce ve Niyet",
    symbol: "atom",
    summary: "Algı, niyet ve bakış açısı üzerine kişisel gelişim odaklı bir farkındalık programı.",
    description: [
      "Kişisel gelişim alanındaki kuantum düşünce yaklaşımlarını, bilimsel kuantum fiziğinden ayırarak ve eleştirel bir bakışla ele alan bir program.",
      "Niyet belirleme, algı farkındalığı ve meditasyon pratikleriyle zihnini daha bilinçli kullanmayı hedefliyor.",
    ],
    topics: ["Kuantum düşünce kavramları ve sınırları", "Algı ve yorum", "Niyet belirleme", "Gözlemci bakış açısı", "Odaklanma meditasyonları"],
    outcomes: ["Düşünce kalıplarını fark edebilmek", "Net ve eyleme bağlı niyetler oluşturmak", "Günlük farkındalık pratiği geliştirmek"],
    status: "hazirlaniyor",
  },
  {
    slug: "metafizige-giris",
    category: "Metafizik",
    title: "Metafiziğe Giriş: Bilinç ve Varoluş",
    symbol: "eye",
    summary: "Varoluş, bilinç ve anlam üzerine farklı düşünce geleneklerine açılan bir keşif.",
    description: [
      "İnsanlığın en eski sorularına farklı geleneklerin nasıl yaklaştığını keşfeden, düşünmeye ve tartışmaya dayalı bir program.",
    ],
    topics: ["Metafizik nedir?", "Bilinç üzerine yaklaşımlar", "Zaman ve varoluş", "Anlam arayışı", "Tefekkür pratikleri"],
    outcomes: ["Temel metafizik kavramları tanımak", "Kendi sorularını derinleştirmek", "Tefekkürü günlük hayata taşımak"],
    status: "hazirlaniyor",
  },
  {
    slug: "tarot-egitimi",
    category: "Tarot Eğitimi",
    title: "Tarotun Sembol Dili",
    symbol: "moon",
    summary: "Büyük ve Küçük Arkana'yı, sembolleri ve açılım tekniklerini öğrenmek için kapsamlı bir eğitim.",
    description: [
      "Tarot kartlarını bir kehanet aracı olarak değil, zengin bir sembol ve yansıma dili olarak ele alan bir eğitim.",
      "Kartların arketiplerini, renk ve sembol dilini, temel açılımları ve etik yorumlama ilkelerini kapsaması planlanıyor.",
    ],
    topics: ["Tarotun tarihi", "Büyük Arkana arketipleri", "Küçük Arkana ve elementler", "Açılım teknikleri", "Etik ve sorumlu yorumlama"],
    outcomes: ["78 kartın temel sembolizmini tanımak", "Kendi açılımlarını yapabilmek", "Sembolik ve sorumlu bir yorum dili geliştirmek"],
    status: "hazirlaniyor",
  },
  {
    slug: "spirituel-farkindalik",
    category: "Spiritüel Farkındalık",
    title: "Spiritüel Farkındalık Yolculuğu",
    symbol: "lotus",
    summary: "İç sesini duymak, sezgilerini tanımak ve anlam arayışını derinleştirmek için bir yolculuk.",
    description: [
      "Herhangi bir inanç sistemi dayatmadan, kendi değerlerine saygılı bir içsel keşif programı.",
    ],
    topics: ["Spiritüellik ve farkındalık", "Sezgi çalışmaları", "Çakra sembolizmi", "Günlük yazımı", "Ritüel ve öz bakım"],
    outcomes: ["İç sesini daha net duyabilmek", "Kişisel bir farkındalık pratiği oluşturmak"],
    status: "hazirlaniyor",
  },
  {
    slug: "meditasyon-pratigi",
    category: "Meditasyon",
    title: "Her Gün Bir Nefes: Meditasyon Pratiği",
    symbol: "spiral",
    summary: "Meditasyona yeni başlayanlar için adım adım, sürdürülebilir bir pratik programı.",
    description: [
      "Nefes, beden taraması, sessizlik ve rehberli meditasyonlarla düzenli bir pratik oluşturman için tasarlanan bir program.",
    ],
    topics: ["Meditasyonun temelleri", "Nefes teknikleri", "Beden farkındalığı", "Sevgi dolu şefkat meditasyonu", "Günlük hayatta farkındalık"],
    outcomes: ["Kendi meditasyon rutinini oluşturmak", "Stresli anlarda nefesi bir araç olarak kullanmak"],
    status: "hazirlaniyor",
  },
  {
    slug: "kisisel-gelisim",
    category: "Kişisel Gelişim",
    title: "Hayatında Yeni Bir Sayfa",
    symbol: "sun",
    summary: "Değişim dönemlerinde yön bulmak ve kendini yeniden tanımlamak için bütüncül bir program.",
    description: [
      "Yaşam koçluğu, farkındalık ve sembolik çalışmaları bir araya getiren, dönüşüm dönemlerine eşlik eden bir program.",
    ],
    topics: ["Değişimin evreleri", "Bırakmak ve başlamak", "Öz şefkat", "Yeni alışkanlıklar", "Kişisel vizyon"],
    outcomes: ["Değişim sürecini anlamlandırmak", "Kişisel bir vizyon oluşturmak"],
    status: "hazirlaniyor",
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const courseCategories = Array.from(new Set(courses.map((c) => c.category)));
