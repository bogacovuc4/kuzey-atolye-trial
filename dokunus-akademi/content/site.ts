/**
 * SİTE AYARLARI — Dokunuş Akademi
 * ------------------------------------------------------------------
 * İletişim bilgileri, sosyal medya bağlantıları ve kurucu sayfası
 * içerikleri buradan düzenlenir. Boş bırakılan ("") alanlar sitede
 * görünmez; doldurduğunuz anda ilgili bağlantı/alan otomatik çıkar.
 */

export const site = {
  name: "Dokunuş Akademi",
  founder: "Türkan Demir",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.dokunusakademi.com",
  slogan: "Ruhuna Dokun, Farkındalığını Keşfet, Hayatını Dönüştür.",
  altSlogan: "Her Cevap İçinde, Her Yolculuk Bir Dokunuşla Başlar.",
  description:
    "Türkan Demir'in kurucusu olduğu Dokunuş Akademi: yaşam koçluğu, kuantum düşünce, metafizik, tarot ve spiritüel farkındalık yolculuğunda kendine yeni bir kapı aç.",

  contact: {
    /** Uluslararası biçimde, yalnızca rakam: ör. "905321234567". Boşsa WhatsApp butonu iletişim formuna yönlendirir. */
    whatsapp: "",
    /** Görünen telefon: ör. "+90 532 123 45 67" */
    phone: "",
    email: "",
    /** Yüz yüze görüşme adresi (isteğe bağlı) */
    address: "",
    /** Çalışma saatleri (isteğe bağlı): ör. "Hafta içi 10.00 – 19.00" */
    hours: "",
  },

  social: {
    instagram: "", // ör. "https://instagram.com/kullaniciadi"
    youtube: "",
    tiktok: "",
    facebook: "",
    x: "",
    linkedin: "",
    spotify: "",
  },
};

/** Ana menü — sıralama burada belirlenir. */
export const navigation = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Türkan Demir", href: "/turkan-demir" },
  { label: "Yaşam Koçluğu", href: "/yasam-koclugu" },
  { label: "Kuantum", href: "/kuantum" },
  { label: "Metafizik", href: "/metafizik" },
  { label: "Tarot", href: "/tarot" },
  { label: "Enerji ve Çakra", href: "/enerji-ve-cakra" },
  { label: "Meditasyon", href: "/meditasyon" },
  { label: "Eğitimler", href: "/egitimler" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

/**
 * KURUCU SAYFASI
 * Gerçek bilgiler eklendikçe doldurun. Boş listeler sitede gösterilmez.
 */
export const founder = {
  /** Portre görseli: public/ klasörüne koyup yolunu yazın, ör. "/turkan-demir.jpg". Boşsa zarif bir monogram çerçevesi gösterilir. */
  portrait: "",
  title: "Ben Türkan Demir. Kendine Açılan Kapıda Sana Eşlik Ediyorum.",
  intro:
    "Ben Türkan Demir. Dokunuş Akademi'de kendini keşfetme, farkındalık ve kişisel dönüşüm yolculuğunda sana eşlik ediyorum.",
  /** Kişisel yaklaşım paragrafları — Türkan Hanım'ın kendi cümleleriyle güncellenebilir. */
  approach: [
    "Her insanın içinde, henüz açılmamış bir kapı olduğuna inanıyorum. Bu kapının anahtarı dışarıda değil; kendi sorularımızda, sezgilerimizde ve hayatımıza dürüstçe bakma cesaretimizde saklı.",
    "Benim rolüm sana cevap vermek değil, kendi cevaplarına ulaşabileceğin güvenli ve sakin bir alan açmak. Sorularla, sembollerle, nefesle ve farkındalık çalışmalarıyla bu yolculukta yanında yürüyorum.",
  ],
  philosophy: [
    {
      title: "Kendini Keşfetmek",
      text: "Değişim, kim olduğunu ve neye ihtiyaç duyduğunu fark etmekle başlar. Her çalışma, seni kendine biraz daha yaklaştırmak için tasarlanır.",
    },
    {
      title: "Sorgulamak",
      text: "Alışılmış düşünce kalıplarını nazikçe sorgulamak, hayatında yeni olasılıkların görünür olmasını sağlar.",
    },
    {
      title: "Farkındalık",
      text: "Düşüncelerini, duygularını ve bedenini fark ettiğin anda seçim yapma gücün de artar.",
    },
    {
      title: "Potansiyelini Geliştirmek",
      text: "Amaç başka biri olmak değil; zaten sende var olan potansiyeli görmek ve ona alan açmaktır.",
    },
  ],
  mission:
    "Dokunuş Akademi, insanların kendilerini keşfetmelerine, hayatlarını sorgulamalarına, içsel farkındalık kazanmalarına ve kendi potansiyellerini geliştirmelerine rehberlik etmek amacıyla kuruldu. Yaşam koçluğu, kuantum düşünce yaklaşımları, metafizik, tarot ve meditasyonu tek bir çatı altında buluşturarak; herkesin kendi hızında ilerleyebileceği, saygılı ve özenli bir öğrenme alanı oluşturmayı hedefliyor.",
  /** Eğitim ve sertifikalar — ör. { title: "…", org: "…", year: "2021" }. Boşsa bölüm görünmez. */
  credentials: [] as { title: string; org?: string; year?: string }[],
  /** Kısa kişisel hikâye paragrafları. Boşsa bölüm görünmez. */
  story: [] as string[],
};
