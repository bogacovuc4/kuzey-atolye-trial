/**
 * TAROT — Büyük Arkana (22 kart)
 * Anlamlar sembolik ve yansıtıcıdır; kehanet iddiası taşımaz.
 */

export type TarotCard = {
  id: number;
  slug: string;
  numeral: string;
  name: string;
  english: string;
  keywords: string[];
  essence: string;
  meaning: string;
  symbols: string[];
  light: string;
  shadow: string;
  question: string;
  affirmation: string;
};

export const tarotCards: TarotCard[] = [
  {
    id: 0, slug: "deli", numeral: "0", name: "Deli", english: "The Fool",
    keywords: ["başlangıç", "merak", "cesaret", "özgürlük"],
    essence: "Bilinmeyene açık bir kalple atılan ilk adım.",
    meaning: "Deli, yolculuğun en başındaki ruhu temsil eder. Henüz hiçbir şeyi bilmemenin verdiği hafiflikle, merakla ve güvenle yeni bir deneyime adım atar. Bu kart, kontrol etme ihtiyacını bir kenara bırakıp hayata taze bir gözle bakmaya davet eder.",
    symbols: ["Uçurumun kenarı: bilinmeyene güven", "Beyaz çiçek: saflık", "Yükselen güneş: yeni bir döngü"],
    light: "Spontanlık, açıklık, yeni başlangıçlara cesaret.",
    shadow: "Düşüncesizlik, sorumluluktan kaçış, aceleci kararlar.",
    question: "Hayatımda hangi yeni kapıya korkmadan adım atmak istiyorum?",
    affirmation: "Bilinmeyene merakla ve güvenle açılıyorum.",
  },
  {
    id: 1, slug: "buyucu", numeral: "I", name: "Büyücü", english: "The Magician",
    keywords: ["irade", "beceri", "odak", "yaratım"],
    essence: "Elindeki kaynakları niyetle buluşturma gücü.",
    meaning: "Büyücü, ihtiyaç duyduğun araçların zaten elinde olduğunu hatırlatır. Düşünce, duygu, beden ve eylem bir araya geldiğinde niyet somut bir forma bürünür. Bu kart odaklanmaya ve yeteneklerini bilinçli kullanmaya çağırır.",
    symbols: ["Sonsuzluk işareti: sınırsız potansiyel", "Yukarı ve aşağı işaret eden eller: düşünce ile eylemin bağı", "Masadaki dört araç: dört element"],
    light: "Kararlılık, yaratıcılık, kendine güven.",
    shadow: "Manipülasyon, dağınık enerji, potansiyeli kullanmamak.",
    question: "Niyetimi gerçekleştirmek için hangi kaynaklarım zaten elimde?",
    affirmation: "Niyetimi odakla ve eylemle buluşturuyorum.",
  },
  {
    id: 2, slug: "azize", numeral: "II", name: "Azize", english: "The High Priestess",
    keywords: ["sezgi", "sessizlik", "gizem", "iç bilgelik"],
    essence: "Sessizlikte duyulan iç ses.",
    meaning: "Azize, bilinçaltının ve sezginin kapısında oturur. Her şeyin hemen anlaşılması gerekmediğini, bazı cevapların ancak sessizlikte ve sabırla belirdiğini anlatır. İçine dönmeye ve kendi bilgeliğine güvenmeye davet eder.",
    symbols: ["Hilal: döngüler ve sezgi", "İki sütun: zıtlıkların dengesi", "Perde: görünenin ardındaki gizem"],
    light: "Sezgisel netlik, derin dinleme, iç huzur.",
    shadow: "Kendi sesini bastırmak, duygulardan kopukluk, aşırı içe kapanma.",
    question: "Sessiz kaldığımda iç sesim bana ne söylüyor?",
    affirmation: "Sezgime güveniyor, iç bilgeliğimi dinliyorum.",
  },
  {
    id: 3, slug: "imparatorice", numeral: "III", name: "İmparatoriçe", english: "The Empress",
    keywords: ["bereket", "şefkat", "yaratıcılık", "doğa"],
    essence: "Besleyen, büyüten ve yaratan sevgi.",
    meaning: "İmparatoriçe, doğanın bereketini ve yaratıcı gücü simgeler. Kendine ve sevdiklerine şefkatle yaklaşmayı, bedenini onurlandırmayı ve hayatın güzelliklerinin tadını çıkarmayı hatırlatır.",
    symbols: ["Buğday başakları: bereket", "Yıldızlı taç: evrenle bağ", "Akan su: duygusal akış"],
    light: "Bolluk, öz şefkat, yaratıcı akış.",
    shadow: "Kendini ihmal etmek, aşırı fedakârlık, tıkanmış yaratıcılık.",
    question: "Kendimi ve hayallerimi nasıl daha şefkatle besleyebilirim?",
    affirmation: "Kendimi sevgiyle besliyor, yaratıcılığıma alan açıyorum.",
  },
  {
    id: 4, slug: "imparator", numeral: "IV", name: "İmparator", english: "The Emperor",
    keywords: ["yapı", "düzen", "sınır", "sorumluluk"],
    essence: "Sağlam temeller üzerine kurulan güven.",
    meaning: "İmparator, düzenin, yapının ve sağlıklı sınırların arketipidir. Hayallerin kalıcı olabilmesi için sağlam bir zemine ihtiyaç duyduğunu anlatır. Sorumluluk almayı ve kendi hayatının liderliğini üstlenmeyi simgeler.",
    symbols: ["Taş taht: istikrar", "Dağlar: kararlılık", "Asa: liderlik"],
    light: "Disiplin, güvenilirlik, net sınırlar.",
    shadow: "Katılık, kontrol ihtiyacı, esneyememek.",
    question: "Hayallerimin büyüyebilmesi için hangi temeli kurmam gerekiyor?",
    affirmation: "Hayatıma sağlam ve sevgi dolu sınırlar çiziyorum.",
  },
  {
    id: 5, slug: "aziz", numeral: "V", name: "Aziz", english: "The Hierophant",
    keywords: ["gelenek", "öğrenme", "rehberlik", "değerler"],
    essence: "Bilginin kuşaktan kuşağa aktarılan ışığı.",
    meaning: "Aziz, öğretiyi, geleneği ve rehberliği temsil eder. Bir öğretmenden, bir topluluktan ya da köklerden öğrenmenin değerini hatırlatır. Aynı zamanda hangi değerlerin gerçekten sana ait olduğunu sorgulamaya davet eder.",
    symbols: ["Üç katlı taç: bilginin katmanları", "Anahtarlar: anlamın kapıları", "Kutsayan el: aktarım"],
    light: "Öğrenmeye açıklık, değerlere bağlılık, topluluk.",
    shadow: "Sorgulamadan kabul, kalıplara sıkışmak, dogmatizm.",
    question: "Hangi değerler gerçekten benim ve hangilerini sorgulamam gerekiyor?",
    affirmation: "Öğrenmeye açığım ve kendi değerlerimle yol alıyorum.",
  },
  {
    id: 6, slug: "asiklar", numeral: "VI", name: "Âşıklar", english: "The Lovers",
    keywords: ["seçim", "uyum", "bağ", "değerler"],
    essence: "Kalbin ve aklın aynı yöne baktığı an.",
    meaning: "Âşıklar kartı yalnızca romantik ilişkileri değil, değerlerimizle uyumlu seçimler yapmayı da anlatır. Kendinle ve başkalarıyla kurduğun bağların, aldığın kararların yönünü nasıl belirlediğini düşünmeye davet eder.",
    symbols: ["İki figür: birlik ve karşılaşma", "Melek: yüksek bakış açısı", "Güneş: açıklık"],
    light: "Uyum, içten bağ, değerlere dayalı seçim.",
    shadow: "Kararsızlık, dengesiz ilişkiler, kendinden ödün vermek.",
    question: "Önümdeki seçim, gerçekten değer verdiğim şeylerle uyumlu mu?",
    affirmation: "Kalbimle ve değerlerimle uyumlu seçimler yapıyorum.",
  },
  {
    id: 7, slug: "savas-arabasi", numeral: "VII", name: "Savaş Arabası", english: "The Chariot",
    keywords: ["irade", "ilerleme", "kararlılık", "yön"],
    essence: "Zıt güçleri tek bir yöne dizgin vermek.",
    meaning: "Savaş Arabası, kararlılıkla ileri gitmeyi simgeler. Farklı yönlere çeken duyguları ve düşünceleri tek bir hedefe yönlendirme becerisini anlatır. Hedefine odaklanmaya ve yolculuğun kontrolünü eline almaya çağırır.",
    symbols: ["Siyah ve beyaz sfenksler: zıt güçler", "Yıldızlı örtü: ilahi rehberlik", "Hilal omuzluklar: duygusal denge"],
    light: "Odak, öz disiplin, kazanımlar.",
    shadow: "Kontrolü kaybetmek, yönsüzlük, inatçılık.",
    question: "Beni farklı yönlere çeken güçleri nasıl tek bir hedefe bağlayabilirim?",
    affirmation: "Yönümü biliyor ve kararlılıkla ilerliyorum.",
  },
  {
    id: 8, slug: "guc", numeral: "VIII", name: "Güç", english: "Strength",
    keywords: ["iç güç", "şefkat", "sabır", "cesaret"],
    essence: "Yumuşaklığın en derin kuvvet olduğu yer.",
    meaning: "Güç kartı, kaba kuvvetle değil şefkatle, sabırla ve iç cesaretle gelen gücü anlatır. Korkularını ve içgüdülerini bastırmak yerine onları nazikçe evcilleştirmeyi simgeler.",
    symbols: ["Aslan: içgüdüler ve tutku", "Nazik eller: şefkatli kontrol", "Sonsuzluk işareti: tükenmeyen iç kaynak"],
    light: "Öz güven, şefkat, duygusal dayanıklılık.",
    shadow: "Kendinden şüphe, bastırılmış duygular, öfke.",
    question: "Hangi korkuma şefkatle yaklaşırsam o bana güç verir?",
    affirmation: "Gücümü nezaketimden ve cesaretimden alıyorum.",
  },
  {
    id: 9, slug: "ermis", numeral: "IX", name: "Ermiş", english: "The Hermit",
    keywords: ["içe dönüş", "bilgelik", "yalnızlık", "arayış"],
    essence: "Kendi fenerinle karanlıkta yol bulmak.",
    meaning: "Ermiş, dış dünyanın gürültüsünden çekilip içe dönmenin zamanını anlatır. Cevapları dışarıda değil, kendi iç ışığında aramaya davet eder. Yalnızlık burada bir eksiklik değil, bir derinleşme alanıdır.",
    symbols: ["Fener: iç ışık", "Yıldız: rehber bilgelik", "Dağ zirvesi: elde edilen bakış açısı"],
    light: "Derin düşünme, öz farkındalık, sakin bilgelik.",
    shadow: "İzolasyon, geri çekilmek, kendini kapatmak.",
    question: "Biraz geri çekildiğimde neyi daha net görebilirim?",
    affirmation: "Kendi iç ışığım bana yol gösteriyor.",
  },
  {
    id: 10, slug: "kader-carki", numeral: "X", name: "Kader Çarkı", english: "Wheel of Fortune",
    keywords: ["döngü", "değişim", "akış", "fırsat"],
    essence: "Hayatın sürekli dönen ritmi.",
    meaning: "Kader Çarkı, hiçbir şeyin sabit kalmadığını, her döngünün yerini bir yenisine bıraktığını hatırlatır. Değişimle direnmek yerine onunla birlikte akmayı ve dönemin sunduğu fırsatları görmeyi simgeler.",
    symbols: ["Dönen çark: döngüler", "Dört köşedeki figürler: sabit unsurlar", "Merkez: değişmeyen öz"],
    light: "Uyum sağlamak, yeni fırsatlar, akışa güven.",
    shadow: "Değişime direnç, kontrol kaybı hissi, tekrar eden kalıplar.",
    question: "Hayatımdaki hangi döngü kapanıyor, hangisi başlıyor?",
    affirmation: "Hayatın döngülerine güveniyor ve değişimle birlikte akıyorum.",
  },
  {
    id: 11, slug: "adalet", numeral: "XI", name: "Adalet", english: "Justice",
    keywords: ["denge", "hakikat", "sorumluluk", "netlik"],
    essence: "Neden ile sonuç arasındaki dürüst bağ.",
    meaning: "Adalet, dürüstlüğü, dengeyi ve eylemlerimizin sonuçlarını üstlenmeyi simgeler. Bir durumu tarafsız bir gözle tartmaya ve kendi payına düşen sorumluluğu görmeye davet eder.",
    symbols: ["Terazi: denge", "Kılıç: netlik ve karar", "İki sütun: tarafsızlık"],
    light: "Dürüstlük, adil kararlar, sorumluluk.",
    shadow: "Kendini kandırmak, dengesizlik, suçu başkasına atmak.",
    question: "Bu durumu tüm dürüstlüğümle tarttığımda ne görüyorum?",
    affirmation: "Kararlarımı dürüstlük ve dengeyle veriyorum.",
  },
  {
    id: 12, slug: "asilan-adam", numeral: "XII", name: "Asılan Adam", english: "The Hanged Man",
    keywords: ["teslimiyet", "bekleyiş", "yeni bakış", "durgunluk"],
    essence: "Dünyaya ters açıdan bakınca beliren anlam.",
    meaning: "Asılan Adam, bir süre durmanın, beklemenin ve bakış açısını değiştirmenin değerini anlatır. Zorlamak yerine bırakmak, bazen en büyük farkındalığı getirir.",
    symbols: ["Ters duruş: yeni perspektif", "Başın etrafındaki ışık: aydınlanma", "Yaşayan ağaç: büyüme"],
    light: "Sabır, kabullenme, yeni bakış açısı.",
    shadow: "Erteleme, kurban rolü, anlamsız fedakârlık.",
    question: "Olaylara farklı bir açıdan baksam neyi fark ederim?",
    affirmation: "Bırakmanın ve beklemenin bilgeliğine güveniyorum.",
  },
  {
    id: 13, slug: "olum", numeral: "XIII", name: "Dönüşüm", english: "Death",
    keywords: ["bitiş", "dönüşüm", "yenilenme", "bırakmak"],
    essence: "Bir kapı kapanırken açılan yeni alan.",
    meaning: "Geleneksel adıyla Ölüm kartı, fiziksel bir ölümü değil; bir dönemin, bir alışkanlığın ya da bir kimliğin sona ermesini simgeler. Artık hizmet etmeyeni bırakmanın, yeniye yer açtığını hatırlatır.",
    symbols: ["Batan ve doğan güneş: döngü", "Beyaz gül: arınma", "Akan nehir: süreklilik"],
    light: "Yenilenme, köklü değişim, özgürleşme.",
    shadow: "Bitenlere tutunmak, değişim korkusu, durağanlık.",
    question: "Yeni bir şeye yer açmak için neyi bırakmaya hazırım?",
    affirmation: "Bana artık hizmet etmeyeni sevgiyle bırakıyorum.",
  },
  {
    id: 14, slug: "denge", numeral: "XIV", name: "Denge", english: "Temperance",
    keywords: ["ölçü", "uyum", "sabır", "şifa"],
    essence: "Zıtları sabırla harmanlayan simya.",
    meaning: "Denge kartı, ölçülü olmayı, zıtlıkları uyum içinde birleştirmeyi ve acele etmeden ilerlemeyi anlatır. Hayatındaki farklı parçaları bir bütün haline getirmenin sanatıdır.",
    symbols: ["İki kâse arasında akan su: harmanlama", "Bir ayak suda bir ayak karada: denge", "Uzaktaki yol: sabırlı ilerleyiş"],
    light: "Uyum, sükûnet, ölçülülük.",
    shadow: "Aşırılıklar, sabırsızlık, iç çatışma.",
    question: "Hayatımın hangi alanında daha fazla dengeye ihtiyaç duyuyorum?",
    affirmation: "Hayatımın tüm parçalarını uyumla bir araya getiriyorum.",
  },
  {
    id: 15, slug: "seytan", numeral: "XV", name: "Gölge", english: "The Devil",
    keywords: ["bağımlılık", "gölge", "arzu", "farkındalık"],
    essence: "Fark edildiğinde gevşeyen zincirler.",
    meaning: "Geleneksel adıyla Şeytan kartı, bizi kısıtlayan alışkanlıkları, korkuları ve bağımlılıkları simgeler. Kartta zincirlerin gevşek olduğu dikkat çeker: Seni bağlayan şeyi fark ettiğinde, ondan özgürleşme gücü de sende olabilir.",
    symbols: ["Gevşek zincirler: seçim özgürlüğü", "Ters pentagram: maddeye odaklanma", "Karanlık arka plan: bilinçaltı"],
    light: "Gölgeyle yüzleşme, dürüst farkındalık, özgürleşme.",
    shadow: "Kısıtlayıcı alışkanlıklar, korkular, kendini sınırlamak.",
    question: "Beni kısıtlayan hangi düşünce veya alışkanlığı fark etmeye hazırım?",
    affirmation: "Gölgemi şefkatle görüyor, kendimi özgürleştiriyorum.",
  },
  {
    id: 16, slug: "kule", numeral: "XVI", name: "Kule", english: "The Tower",
    keywords: ["sarsıntı", "uyanış", "kırılma", "hakikat"],
    essence: "Sağlam sanılanın yıkılıp hakikatin göründüğü an.",
    meaning: "Kule, beklenmedik değişimleri ve sarsıntıları simgeler. Yanlış temeller üzerine kurulmuş yapıların yıkılması zor olabilir; ancak bu yıkım, daha gerçek bir zeminin ortaya çıkması için alan açar.",
    symbols: ["Şimşek: ani farkındalık", "Düşen taç: egonun çözülmesi", "Kıvılcımlar: uyanış"],
    light: "Uyanış, gerçekle yüzleşme, yeniden yapılanma.",
    shadow: "Değişim korkusu, kaosa direnç, inkâr.",
    question: "Hangi eski inanç ya da yapı artık beni taşımıyor?",
    affirmation: "Değişimin getirdiği hakikate açılıyorum.",
  },
  {
    id: 17, slug: "yildiz", numeral: "XVII", name: "Yıldız", english: "The Star",
    keywords: ["umut", "ilham", "şifa", "güven"],
    essence: "Fırtınadan sonra gökyüzünde beliren umut.",
    meaning: "Yıldız, umudun, ilhamın ve yenilenmenin kartıdır. Zor bir dönemin ardından gelen sakinliği ve evrenle yeniden bağ kurmayı simgeler. Hayallerine yeniden inanmaya davet eder.",
    symbols: ["Büyük yıldız: rehber ışık", "Akan su: duygusal arınma", "Kuş: ruhun yükselişi"],
    light: "Umut, iyileşme, ilham, içsel huzur.",
    shadow: "Umutsuzluk, inançsızlık, kendinden kopukluk.",
    question: "Beni yeniden umutlandıran, ilham veren şey ne?",
    affirmation: "Umudumu yeniliyor, kendi ışığıma güveniyorum.",
  },
  {
    id: 18, slug: "ay", numeral: "XVIII", name: "Ay", english: "The Moon",
    keywords: ["bilinçaltı", "rüya", "belirsizlik", "sezgi"],
    essence: "Gölgelerin ve rüyaların aydınlattığı yol.",
    meaning: "Ay, belirsizliğin, rüyaların ve bilinçaltının kartıdır. Her şeyin göründüğü gibi olmayabileceğini, korkularımızın ve hayallerimizin algımızı nasıl renklendirdiğini anlatır. Sezgine güvenerek yavaşça ilerlemeye davet eder.",
    symbols: ["Dolunay ve hilal: döngüler", "Patika: belirsiz yol", "Sudan çıkan yengeç: bilinçaltından yükselenler"],
    light: "Sezgi, yaratıcı hayal gücü, rüyalarla bağ.",
    shadow: "Kaygı, yanılsama, kafa karışıklığı.",
    question: "Korkularım şu anda neyi görmemi zorlaştırıyor olabilir?",
    affirmation: "Belirsizlikte bile sezgimle yolumu buluyorum.",
  },
  {
    id: 19, slug: "gunes", numeral: "XIX", name: "Güneş", english: "The Sun",
    keywords: ["neşe", "canlılık", "başarı", "açıklık"],
    essence: "İçindeki çocuğun ışıl ışıl kahkahası.",
    meaning: "Güneş, neşenin, canlılığın ve açıklığın kartıdır. Her şeyin aydınlandığı, kendini olduğun gibi ifade edebildiğin anları simgeler. Hayatın basit güzelliklerine ve kendi parlaklığına davet eder.",
    symbols: ["Parlayan güneş: yaşam enerjisi", "Ayçiçekleri: büyüme", "Çocuk: masumiyet ve neşe"],
    light: "Mutluluk, özgüven, berraklık.",
    shadow: "Aşırı iyimserlik, kendini gösterme ihtiyacı, yüzeysellik.",
    question: "Bugün bana gerçekten neşe veren ne?",
    affirmation: "Işığımı çekinmeden paylaşıyorum.",
  },
  {
    id: 20, slug: "mahkeme", numeral: "XX", name: "Uyanış", english: "Judgement",
    keywords: ["uyanış", "çağrı", "yeniden doğuş", "affetmek"],
    essence: "İçinden yükselen çağrıya kulak vermek.",
    meaning: "Geleneksel adıyla Mahkeme kartı, bir yargılanmayı değil; uyanışı, kendini affetmeyi ve hayatının yeni bir evresine çağrılmayı simgeler. Geçmişe dürüstçe bakıp ondan öğrenerek ilerlemeye davet eder.",
    symbols: ["Boru: uyanış çağrısı", "Yükselen figürler: yeniden doğuş", "Dağlar: aşılmış engeller"],
    light: "Yenilenme, öz değerlendirme, iç çağrı.",
    shadow: "Kendini yargılamak, geçmişe takılmak, çağrıyı duymazdan gelmek.",
    question: "İçimden yükselen çağrı beni nereye davet ediyor?",
    affirmation: "Geçmişimi affediyor, yeni bir uyanışa açılıyorum.",
  },
  {
    id: 21, slug: "dunya", numeral: "XXI", name: "Dünya", english: "The World",
    keywords: ["tamamlanma", "bütünlük", "kutlama", "döngü"],
    essence: "Yolculuğun tamamlandığı ve yenisinin belirdiği an.",
    meaning: "Dünya, bir döngünün tamamlanmasını, bütünlük hissini ve emeğin karşılığını simgeler. Kat ettiğin yolu kutlamaya ve bir sonraki yolculuğa hazırlanmaya davet eder.",
    symbols: ["Defne çelengi: zafer ve tamamlanma", "Dans eden figür: uyum", "Dört köşe: dört element ve bütünlük"],
    light: "Bütünlük, başarı, minnettarlık.",
    shadow: "Tamamlanmamış işler, kapanışı erteleme, durağanlık.",
    question: "Hangi yolculuğumu tamamladım ve bunu nasıl kutlayabilirim?",
    affirmation: "Yolculuğumu onurlandırıyor, bütünlüğümü kutluyorum.",
  },
];

export const getCard = (slug: string) => tarotCards.find((c) => c.slug === slug);

/** Tarih için deterministik "günün kartı" (Türkiye saatiyle). */
export function cardOfDay(date = new Date()): TarotCard {
  const key = dayKey(date);
  let h = 2166136261;
  for (const ch of "kart-" + key) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return tarotCards[Math.abs(h) % tarotCards.length];
}

export function dayKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(date);
}

export const tarotDisclaimer =
  "Tarot yorumları kesin bir gelecek tahmini değildir. Kartlar; kişisel düşünme, farkındalık ve eğlence amaçlı sembolik yorumlar sunar. Önemli kararlarınızda lütfen kendi muhakemenize ve ilgili uzmanlara başvurun.";
