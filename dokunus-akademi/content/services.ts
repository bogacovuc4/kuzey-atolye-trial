/**
 * HİZMETLER — her hizmetin kendi sayfası bu verilerden oluşur.
 * Metinleri dilediğiniz gibi düzenleyebilirsiniz.
 */

export type Symbol = "sun" | "atom" | "eye" | "moon" | "lotus" | "spiral";

export type Service = {
  slug: string;
  menuLabel: string;
  title: string;
  kicker: string;
  symbol: Symbol;
  tagline: string;
  intro: string[];
  items: { title: string; text: string }[];
  forWhom: string[];
  process: { title: string; text: string }[];
  note?: string;
  faqs: { q: string; a: string }[];
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "yasam-koclugu",
    menuLabel: "Yaşam Koçluğu",
    title: "Yaşam Koçluğu",
    kicker: "Hedef · Denge · Dönüşüm",
    symbol: "sun",
    tagline: "Hayatının direksiyonuna yeniden geçmek için net, sakin ve cesur bir alan.",
    intro: [
      "Yaşam koçluğu, nerede olduğunu ve nereye gitmek istediğini netleştirdiğin, aradaki yolu kendi değerlerine uygun adımlarla planladığın bir süreçtir.",
      "Bu çalışmalarda cevaplar senden gelir. Güçlü sorular, yapılandırılmış egzersizler ve düzenli takip ile kendi kaynaklarını fark etmeni ve harekete geçmeni destekliyoruz.",
    ],
    items: [
      { title: "Bireysel Yaşam Koçluğu", text: "Sana özel, birebir ve gizlilik içinde ilerleyen görüşmelerle hayatının farklı alanlarına odaklanma." },
      { title: "Hedef Belirleme", text: "Belirsiz isteklerini ölçülebilir, anlamlı ve ulaşılabilir hedeflere dönüştürme." },
      { title: "Öz Farkındalık", text: "Değerlerini, ihtiyaçlarını ve tekrar eden kalıplarını tanıyarak bilinçli seçimler yapma." },
      { title: "Özgüven Geliştirme", text: "İç sesini güçlendirme, kendine yönelik eleştirel düşünceleri dönüştürme ve sınır koyabilme." },
      { title: "Motivasyon", text: "Ertelemenin arkasındakini anlama ve sürdürülebilir bir harekete geçme ritmi oluşturma." },
      { title: "Yaşam Dengesi", text: "İş, ilişkiler, sağlık ve kendine ayırdığın zaman arasında sana iyi gelen dengeyi bulma." },
      { title: "Kişisel Dönüşüm", text: "Hayatında yeni bir sayfa açmak istediğin dönemlerde değişimi adım adım yönetme." },
    ],
    forWhom: [
      "Hayatında bir dönüm noktasında olduğunu hissedenler",
      "Hedeflerini netleştirmek ve planlamak isteyenler",
      "Özgüvenini ve iç motivasyonunu güçlendirmek isteyenler",
      "İş ve özel hayat arasında denge arayanlar",
    ],
    process: [
      { title: "Tanışma", text: "İhtiyacını ve beklentilerini konuştuğumuz ilk görüşme." },
      { title: "Netleştirme", text: "Odak alanlarını ve hedeflerini birlikte belirleme." },
      { title: "Yol Haritası", text: "Sana uygun adımlar, egzersizler ve takip ritmi." },
      { title: "Dönüşüm", text: "Düzenli görüşmelerle ilerlemeyi gözlemleme ve kutlama." },
    ],
    note: "Yaşam koçluğu; psikoterapi, psikolojik danışmanlık veya tıbbi tedavinin yerini tutmaz. Ruh sağlığınızla ilgili bir destek ihtiyacınız varsa lütfen bir uzmana başvurun.",
    faqs: [
      { q: "Görüşmeler nasıl yapılıyor?", a: "Görüşmeler online veya yüz yüze yapılabilir. Tercihini randevu formunda belirtebilirsin." },
      { q: "Kaç görüşme gerekir?", a: "Bu tamamen ihtiyacına ve hedeflerine bağlıdır. İlk tanışma görüşmesinde birlikte sana uygun bir plan oluşturuyoruz." },
      { q: "Konuştuklarımız gizli kalır mı?", a: "Evet. Görüşmelerde paylaştığın her şey gizlilik ilkesiyle korunur." },
    ],
    seoDescription: "Türkan Demir ile bireysel yaşam koçluğu: hedef belirleme, öz farkındalık, özgüven, motivasyon ve yaşam dengesi çalışmaları.",
  },
  {
    slug: "kuantum",
    menuLabel: "Kuantum",
    title: "Kuantum Düşünce ve Farkındalık",
    kicker: "Niyet · Algı · Olasılık",
    symbol: "atom",
    tagline: "Düşüncelerinin, algının ve seçimlerinin hayatına nasıl yön verdiğini keşfet.",
    intro: [
      "Kuantum düşünce, kişisel gelişim alanında kullanılan bir bakış açısıdır: dünyaya hangi gözle baktığımızın, neye odaklandığımızın ve hangi olasılıkları görebildiğimizin deneyimimizi nasıl şekillendirdiğini sorgular.",
      "Bu çalışmalarda niyet belirleme, algı farkındalığı, meditasyon ve bakış açısı egzersizleriyle zihnini daha açık, esnek ve bilinçli kullanmayı hedefliyoruz.",
    ],
    items: [
      { title: "Kuantum Düşünce Kavramlarına Giriş", text: "Kişisel gelişim literatüründe kullanılan temel kavramlar ve bu kavramların günlük hayata nasıl uyarlanabileceği." },
      { title: "Düşünce ve Algı Farkındalığı", text: "Otomatik düşünceleri fark etme, yorumlarımızın deneyimimizi nasıl renklendirdiğini gözlemleme." },
      { title: "Niyet Belirleme", text: "Ne istediğini netleştirme, niyetini sade ve olumlu bir dille ifade etme ve onu eyleme bağlama." },
      { title: "Bilinç ve Farkındalık Çalışmaları", text: "Ana dönme, gözlemci bakış açısı ve dikkat egzersizleri." },
      { title: "Olasılıklar ve Bakış Açısı", text: "Tek bir doğru yerine birden fazla seçeneği görebilme, alternatif senaryolar üzerine çalışma." },
      { title: "Meditasyon ve İçsel Odaklanma", text: "Zihni sakinleştiren, dikkati toparlayan rehberli pratikler." },
    ],
    forWhom: [
      "Düşünce kalıplarını fark edip dönüştürmek isteyenler",
      "Niyet ve hedef çalışmalarıyla ilgilenenler",
      "Farklı bakış açıları geliştirmek isteyenler",
      "Meditasyon ve farkındalık pratiğini derinleştirmek isteyenler",
    ],
    process: [
      { title: "Fark Et", text: "Mevcut düşünce ve algı kalıplarını gözlemle." },
      { title: "Niyet Et", text: "Ne istediğini sade ve net bir dille belirle." },
      { title: "Odaklan", text: "Meditasyon ve dikkat çalışmalarıyla zihnini topla." },
      { title: "Harekete Geç", text: "Niyetini somut ve küçük adımlara dönüştür." },
    ],
    note: "Önemli not: Buradaki \"kuantum düşünce\", kişisel gelişim amaçlı kullanılan metaforik bir yaklaşımdır. Fizik biliminin bir dalı olan kuantum mekaniği ile aynı şey değildir ve bilimsel bir iddia taşımaz. Çalışmalarımız düşünce, algı ve farkındalık üzerine kişisel bir keşif alanı sunar.",
    faqs: [
      { q: "Kuantum düşünce bilimsel mi?", a: "Hayır, kuantum düşünce bir bilim dalı değil; kişisel gelişim alanında kullanılan bir bakış açısıdır. Kuantum fiziğinden ilham alan bazı metaforlar kullanılsa da bilimsel kuantum fiziğinin bulgularıyla karıştırılmamalıdır." },
      { q: "Niyet etmek tek başına yeterli mi?", a: "Niyet, yönünü belirlemene yardımcı olur; ancak değişim için farkındalık ve somut adımlar da gerekir. Çalışmalarımız bu üçünü bir arada ele alır." },
    ],
    seoDescription: "Kuantum düşünce ve farkındalık çalışmaları: niyet belirleme, algı farkındalığı, bakış açısı ve meditasyon. Kişisel gelişim odaklı, bilimsel iddia taşımayan bir yaklaşım.",
  },
  {
    slug: "metafizik",
    menuLabel: "Metafizik",
    title: "Metafizik ve Spiritüel Farkındalık",
    kicker: "Bilinç · Varoluş · İçsel Yolculuk",
    symbol: "eye",
    tagline: "Görünenin ötesine dair sorular sormak, kendine dair cevaplara yaklaşmaktır.",
    intro: [
      "Metafizik, insanlık tarihinin en eski sorularıyla ilgilenir: Ben kimim? Varoluşun anlamı nedir? Bilinç nedir? Bu sorular kesin cevaplardan çok, derin bir düşünme ve keşif alanı açar.",
      "Spiritüel farkındalık çalışmalarında bu sorularla kendi hayatın arasında bağ kurmanı, iç sesini duymanı ve anlam arayışını güvenli bir alanda sürdürmeni destekliyoruz.",
    ],
    items: [
      { title: "Metafizik Üzerine Keşif", text: "Farklı düşünce gelenekleri ışığında varlık, zaman ve anlam üzerine sohbetler." },
      { title: "Spiritüel Farkındalık", text: "Dini bir öğreti dayatmadan, kendi inanç ve değerlerine saygılı bir içsel keşif." },
      { title: "Bilinç ve Varoluş", text: "Bilinç, benlik ve varoluş üzerine düşünce egzersizleri ve günlük yazımı." },
      { title: "İçsel Yolculuk", text: "Hayat hikâyene, dönüm noktalarına ve sana anlam veren şeylere yakından bakmak." },
      { title: "Enerji Kavramları ve Kişisel Farkındalık", text: "Spiritüel geleneklerde kullanılan enerji kavramlarını, kendi duygu ve beden farkındalığınla ilişkilendirmek." },
      { title: "Meditasyon ve Ruhsal Keşif", text: "Sessizlik, tefekkür ve içe dönüş pratikleri." },
    ],
    forWhom: [
      "Hayatın anlamı üzerine düşünmeyi sevenler",
      "Spiritüel bir yolculuğa güvenli bir başlangıç yapmak isteyenler",
      "İç sesini ve sezgilerini daha iyi tanımak isteyenler",
      "Felsefi ve varoluşsal sorularla ilgilenenler",
    ],
    process: [
      { title: "Soru", text: "Seni bu yolculuğa çağıran soruyu birlikte bul." },
      { title: "Tefekkür", text: "Okuma, yazma ve sessizlik pratikleriyle derinleş." },
      { title: "Bağ", text: "Keşiflerini kendi hayatınla ilişkilendir." },
      { title: "Bütünleşme", text: "Farkındalığını günlük yaşamına taşı." },
    ],
    note: "Metafizik ve spiritüel çalışmalar kişisel bir keşif ve düşünme alanıdır; bilimsel bir kanıt ya da kesin bir hakikat iddiası taşımaz. Her bireyin inancına ve dünya görüşüne saygı duyulur.",
    faqs: [
      { q: "Belirli bir inanca sahip olmam gerekir mi?", a: "Hayır. Çalışmalar herhangi bir inanç sistemi dayatmaz; kendi değerlerine ve dünya görüşüne saygılı bir şekilde ilerler." },
      { q: "Daha önce hiç deneyimim yok, katılabilir miyim?", a: "Elbette. Tüm çalışmalar başlangıç seviyesine uygun şekilde, adım adım planlanır." },
    ],
    seoDescription: "Metafizik ve spiritüel farkındalık: bilinç, varoluş, içsel yolculuk ve meditasyon üzerine kişisel keşif çalışmaları.",
  },
  {
    slug: "tarot",
    menuLabel: "Tarot",
    title: "Tarot Danışmanlığı",
    kicker: "Sembol · Sezgi · Yansıma",
    symbol: "moon",
    tagline: "Kartlar geleceği söylemez; sana kendi hikâyeni farklı bir aynadan gösterir.",
    intro: [
      "Tarot, yüzyıllardır kullanılan zengin bir sembol dilidir. Her kart; arketipler, renkler ve imgeler aracılığıyla insan deneyiminin farklı bir yönünü temsil eder.",
      "Tarot danışmanlığında kartları bir kehanet aracı olarak değil, düşünmeni, hissetmeni ve kendi durumuna yeni bir açıdan bakmanı sağlayan bir yansıma aracı olarak kullanıyoruz.",
    ],
    items: [
      { title: "Tarot Kartı Açılımları", text: "Sorunun ve niyetinin etrafında şekillenen kişisel kart açılımları." },
      { title: "Genel Yaşam Açılımı", text: "Hayatının farklı alanlarını sembolik bir bakışla ele alan kapsamlı açılım." },
      { title: "Aşk ve İlişkiler", text: "İlişkilerindeki dinamikleri, ihtiyaçlarını ve duygularını sembollerle keşfetme." },
      { title: "Kariyer ve Yaşam Yolu", text: "İş hayatın ve yönelimlerin üzerine düşünmeni sağlayan sembolik açılım." },
      { title: "Kendini Keşfetme Açılımları", text: "Güçlü yönlerini, gölge taraflarını ve iç kaynaklarını yansıtan açılımlar." },
      { title: "Günlük ve Haftalık Kart Yorumları", text: "Güne ya da haftaya bir niyet ve farkındalık çerçevesiyle başlamak için kart yorumları." },
    ],
    forWhom: [
      "Sembollerle düşünmeyi ve sezgisel çalışmayı sevenler",
      "Bir durum hakkında farklı bir bakış açısı arayanlar",
      "Kendini keşfetme yolculuğuna yaratıcı bir araç eklemek isteyenler",
      "Tarotun sembol dilini merak edenler",
    ],
    process: [
      { title: "Niyet", text: "Açılımın odağını ve sorunu birlikte netleştiriyoruz." },
      { title: "Açılım", text: "Kartlar seçilir ve yerleştirilir." },
      { title: "Yorum", text: "Sembollerin senin hikâyende neye karşılık geldiğini birlikte konuşuyoruz." },
      { title: "Yansıma", text: "Açılımdan kendi hayatına taşıyabileceğin farkındalıkları belirliyoruz." },
    ],
    note: "Tarot yorumları kesin bir gelecek tahmini değildir. Kişisel düşünme, farkındalık ve eğlence amaçlı sembolik yorumlardır. Sağlık, hukuk, finans gibi önemli kararlarınızda mutlaka ilgili uzmanlara danışın.",
    faqs: [
      { q: "Tarot geleceği gösterir mi?", a: "Hayır. Tarot geleceği bilme iddiasında değildir. Kartlar, durumuna farklı açılardan bakmanı sağlayan semboller sunar; yorumlar kişisel düşünme ve eğlence amaçlıdır." },
      { q: "Online açılım yapılabilir mi?", a: "Evet, açılımlar online görüntülü görüşme ile de yapılabilir." },
      { q: "Kendi kartımı sitede çekebilir miyim?", a: "Evet! Tarot sayfasındaki interaktif alanda günün kartını keşfedebilir ve üç kartlık sembolik açılım yapabilirsin." },
    ],
    seoDescription: "Tarot danışmanlığı: genel yaşam, aşk ve ilişkiler, kariyer ve kendini keşfetme açılımları. İnteraktif tarot ile günün kartını keşfet.",
  },
  {
    slug: "enerji-ve-cakra",
    menuLabel: "Enerji ve Çakra",
    title: "Enerji ve Çakra Farkındalığı",
    kicker: "Nefes · Denge · Beden",
    symbol: "lotus",
    tagline: "Bedenini, nefesini ve duygularını dinlemeyi öğrendiğinde iç dengen de görünür olur.",
    intro: [
      "Çakra kavramı, Hint kökenli geleneklerden gelen ve bedenin farklı bölgelerini duygusal ve ruhsal temalarla ilişkilendiren sembolik bir sistemdir.",
      "Bu çalışmalarda çakraları bir harita gibi kullanarak bedenine, nefesine ve duygularına dikkat etmeyi; iç dengeni gözlemleyip desteklemeyi hedefliyoruz.",
    ],
    items: [
      { title: "Çakra Kavramları", text: "Yedi ana çakranın sembolik anlamları, renkleri ve ilişkilendirildiği temalar." },
      { title: "Meditasyon", text: "Her çakra temasına odaklanan rehberli meditasyon pratikleri." },
      { title: "Nefes ve Farkındalık Çalışmaları", text: "Sakinleşmeye ve ana dönmeye yardımcı basit nefes teknikleri." },
      { title: "Enerji Farkındalığı", text: "Gün içinde seni neyin yorduğunu ve neyin beslediğini fark etme çalışmaları." },
      { title: "İçsel Denge", text: "Duygusal dengeyi destekleyen günlük ritüeller ve öz bakım pratikleri." },
    ],
    forWhom: [
      "Beden ve duygu farkındalığını geliştirmek isteyenler",
      "Nefes ve meditasyon pratiğine başlamak isteyenler",
      "Çakra sistemini merak edenler",
      "Günlük hayatında daha dengeli hissetmek isteyenler",
    ],
    process: [
      { title: "Dinle", text: "Bedeninin ve duygularının sana ne söylediğini fark et." },
      { title: "Nefes Al", text: "Nefesi bir çapa olarak kullan." },
      { title: "Odaklan", text: "Çakra temaları üzerine meditasyon yap." },
      { title: "Dengele", text: "Sana iyi gelen pratikleri gündelik hayatına ekle." },
    ],
    note: "Çakra ve enerji kavramları geleneksel ve sembolik sistemlerdir; bilimsel olarak kanıtlanmış bir tedavi yöntemi değildir. Bu çalışmalar tıbbi veya psikolojik tedavinin yerini tutmaz.",
    faqs: [
      { q: "Çakra çalışmaları bir tedavi yöntemi mi?", a: "Hayır. Çakra çalışmaları farkındalık ve rahatlama amaçlı sembolik pratiklerdir; herhangi bir sağlık sorununun tedavisi değildir." },
      { q: "Nefes çalışmalarında dikkat etmem gereken bir şey var mı?", a: "Nefes çalışmaları nazik ve zorlamasız yapılmalıdır. Herhangi bir sağlık durumunuz varsa önce doktorunuza danışmanızı öneririz." },
    ],
    seoDescription: "Enerji ve çakra farkındalığı: yedi çakra, nefes çalışmaları, meditasyon ve içsel denge pratikleri.",
  },
  {
    slug: "meditasyon",
    menuLabel: "Meditasyon",
    title: "Meditasyon ve İçsel Yolculuk",
    kicker: "Sessizlik · An · Kendine Dönüş",
    symbol: "spiral",
    tagline: "Gürültünün ortasında kendine ayırdığın birkaç dakika, en derin dönüşümün başlangıcı olabilir.",
    intro: [
      "Meditasyon, dikkatini nazikçe şimdiki ana getirme pratiğidir. Düşünceleri durdurmak değil, onları yargılamadan gözlemlemeyi öğrenmektir.",
      "Rehberli meditasyonlar, sessizlik çalışmaları ve günlük farkındalık pratikleriyle kendine düzenli olarak zaman ayırmanı ve içsel yolculuğunu derinleştirmeni destekliyoruz.",
    ],
    items: [
      { title: "Rehberli Meditasyon İçerikleri", text: "Başlangıç seviyesinden ileri seviyeye, farklı temalarda rehberli meditasyonlar." },
      { title: "Sessizlik ve Farkındalık Çalışmaları", text: "Sessizlikte kalabilmeyi ve iç sesini duyabilmeyi öğrenmek." },
      { title: "Kendine Zaman Ayırma", text: "Yoğun bir hayatın içinde kendine ait küçük alanlar yaratmak." },
      { title: "Günlük Farkındalık Pratikleri", text: "Yemek yerken, yürürken, nefes alırken: anı fark etmenin basit yolları." },
    ],
    forWhom: [
      "Meditasyona yeni başlamak isteyenler",
      "Zihnini sakinleştirmek ve odaklanmak isteyenler",
      "Düzenli bir öz bakım pratiği oluşturmak isteyenler",
      "İçsel yolculuğunu derinleştirmek isteyenler",
    ],
    process: [
      { title: "Yerleş", text: "Rahat bir oturuş ve sakin bir alan bul." },
      { title: "Nefese Dön", text: "Dikkatini nefesine getir." },
      { title: "Gözlemle", text: "Düşünceleri yargılamadan izle." },
      { title: "Taşı", text: "Bu sakinliği gününe taşı." },
    ],
    note: "Meditasyon pratikleri genel iyi oluş ve farkındalık amaçlıdır; tıbbi veya psikolojik tedavinin yerini tutmaz.",
    faqs: [
      { q: "Meditasyon için ne kadar zaman ayırmalıyım?", a: "Günde 5 dakika ile başlamak bile değerlidir. Önemli olan süre değil, düzenliliktir." },
      { q: "Düşüncelerimi durduramıyorum, yanlış mı yapıyorum?", a: "Hayır. Meditasyonun amacı düşünceleri durdurmak değil, onları fark edip nazikçe dikkatini geri getirmektir. Bunu her fark edişin, pratiğin kendisidir." },
    ],
    seoDescription: "Meditasyon ve içsel yolculuk: rehberli meditasyon, sessizlik çalışmaları ve günlük farkındalık pratikleri.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
