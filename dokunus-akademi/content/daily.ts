/**
 * GÜNLÜK İÇERİKLER — başlangıç havuzu.
 * Bu liste ilk çalıştırmada veritabanına aktarılır. Sonrasında içerikler
 * /yonetim panelinden eklenir, düzenlenir, belirli bir güne sabitlenir
 * veya pasife alınır. Her gün havuzdan sırayla bir içerik seçilir.
 */

export type DailyType = "quote" | "intention" | "weekly" | "meditation";

export const dailyTypeLabels: Record<DailyType, string> = {
  quote: "Günün İlham Veren Sözü",
  intention: "Günün Niyet Cümlesi",
  weekly: "Haftalık Farkındalık Mesajı",
  meditation: "Meditasyon Önerisi",
};

export const dailySeed: Record<DailyType, string[]> = {
  quote: [
    "Aradığın kapı, çoğu zaman en uzun süre bakmaktan kaçındığın yerdedir.",
    "Kendini tanımak, evrenin en sessiz ama en derin keşfidir.",
    "Bir tohum, toprağın altında geçirdiği karanlık günleri büyümeye harcar.",
    "Durmak da yolculuğun bir parçasıdır; nefes, yönünü yeniden bulmanı sağlar.",
    "Değişim önce bir fark ediştir, sonra bir seçim, en sonunda bir yaşam biçimi.",
    "Kendine gösterdiğin nezaket, dünyaya açtığın ilk penceredir.",
    "Her soru, içinde bir cevabın tohumunu taşır.",
    "Işığı görmek için önce gözlerini karanlığa alıştırman gerekir.",
    "Sen sakinleştiğinde, etrafındaki dünya da biraz yavaşlar.",
    "Hayat sana cevap vermeden önce, doğru soruyu sormanı bekler.",
    "Küçük bir farkındalık, büyük bir dönüşümün ilk kıvılcımıdır.",
    "İçindeki sessizliği duyduğunda, kalabalıkta kaybolmazsın.",
  ],
  intention: [
    "Bugün kendime karşı nazik ve sabırlı olmayı seçiyorum.",
    "Bugün beni gerçekten mutlu eden küçük anları fark ediyorum.",
    "Bugün sezgilerime kulak veriyor ve onlara güveniyorum.",
    "Bugün bana iyi gelmeyen bir düşünceyi nazikçe bırakıyorum.",
    "Bugün sınırlarımı sevgiyle ve netlikle ifade ediyorum.",
    "Bugün nefesimle ana dönüyor, acele etmeden ilerliyorum.",
    "Bugün hayatımdaki güzelliklere minnetle bakıyorum.",
    "Bugün kendi ışığımı küçültmeden var oluyorum.",
    "Bugün yeni bir olasılığa kalbimi açıyorum.",
    "Bugün attığım küçük bir adımı kutluyorum.",
  ],
  weekly: [
    "Bu hafta, sana enerji veren ve enerjini tüketen şeyleri gözlemle. Her akşam iki cümleyle not al: Bugün beni ne besledi? Bugün beni ne yordu?",
    "Bu hafta, \"hayır\" demekte zorlandığın bir anı fark et. Sınır koymanın bir sevgi biçimi olabileceğini hatırla.",
    "Bu hafta, her gün en az bir kez telefonunu bir kenara bırakıp beş dakika yalnızca etrafını izle. Neleri fark ettiğine şaşırabilirsin.",
    "Bu hafta, iç sesinin tonuna dikkat et. Kendinle bir arkadaşınla konuşur gibi konuşmayı dene.",
    "Bu hafta, ertelediğin küçük bir işi tamamla. Tamamlanan her şey, zihninde yeni bir alan açar.",
    "Bu hafta, minnettar olduğun üç şeyi her sabah yazmayı dene. Bakışının nasıl yumuşadığını gözlemle.",
  ],
  meditation: [
    "4-4-6 Nefesi: Rahat bir şekilde otur. 4 sayıda burnundan nefes al, 4 sayı tut, 6 sayıda yavaşça ver. Beş tur tekrarla ve bedenindeki değişimi gözlemle.",
    "Beden Taraması: Gözlerini kapat. Dikkatini ayak parmaklarından başının tepesine kadar yavaşça gezdir. Gerginlik fark ettiğin her bölgeye bir nefes gönder.",
    "Beş Duyu Pratiği: Şu an görebildiğin 5 şeyi, duyabildiğin 4 sesi, dokunabildiğin 3 yüzeyi, alabildiğin 2 kokuyu ve 1 tadı fark et.",
    "Işık Meditasyonu: Göğsünün ortasında yumuşak, sıcak bir ışık hayal et. Her nefeste bu ışığın biraz daha genişlediğini ve tüm bedenini sardığını izle.",
    "Sessiz Yürüyüş: Beş dakika boyunca yavaşça yürü. Her adımda ayağının yere değişini, ağırlığının yer değiştirişini hisset.",
    "Niyet Meditasyonu: Üç derin nefes al. Bugün için tek bir kelimelik niyet seç (ör. sabır, cesaret, huzur). Bu kelimeyi her nefes verişinde içinden tekrarla.",
  ],
};
