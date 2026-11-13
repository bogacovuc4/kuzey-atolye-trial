/* ==========================================================
   Content — all site copy rendered by components lives here
   ========================================================== */
(function () {
  const img = (id, w, h) =>
    "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=" + w + (h ? "&h=" + h : "") + "&q=78";

  window.SITE_DATA = {
    img: img,

    stats: [
      { value: 15, suffix: "", label: "Yıllık deneyim" },
      { value: 140, suffix: "+", label: "Tamamlanan proje" },
      { value: 12, suffix: "", label: "Ulusal ve uluslararası ödül" },
      { value: 92, suffix: "%", label: "Tavsiyeyle gelen müşteri" },
    ],

    categories: [
      { id: "tumu", label: "Tümü" },
      { id: "konut", label: "Konut" },
      { id: "ic-mekan", label: "İç Mekân" },
      { id: "ticari", label: "Ticari" },
      { id: "restorasyon", label: "Restorasyon" },
    ],

    projects: [
      {
        id: "kandilli-evi",
        title: "Kandilli Evi",
        category: "konut",
        location: "Üsküdar, İstanbul",
        year: 2025,
        area: "420 m²",
        image: "1600585154340-be6161a56a0c",
        alt: "Ağaçlar arasında, geniş cam cepheli ve ahşap kaplamalı modern bir müstakil ev",
        summary: "Boğaz'a bakan eğimli bir arsada, mevcut çınar ağacını koruyarak kurgulanan üç katlı aile evi.",
        body: "Arsadaki 120 yıllık çınar ağacı projenin çıkış noktası oldu. Yapı kütlesi ağacın etrafında kırılarak iki kanada ayrıldı; ortak yaşam alanları güneye, yatak odaları sabah ışığını alan doğuya yerleştirildi. Cephede yerel kestane ahşabı ve brüt beton bir arada kullanıldı.",
      },
      {
        id: "zekerkoy-villa",
        title: "Zekeriyaköy Villası",
        category: "konut",
        location: "Sarıyer, İstanbul",
        year: 2024,
        area: "560 m²",
        image: "1613490493576-7fde63acd811",
        alt: "Beyaz cepheli, havuzlu ve geniş teraslı iki katlı modern villa",
        summary: "Orman sınırında, peyzajla iç içe geçen yatay kurgulu bir hafta sonu evi.",
        body: "Yapı, eğimli araziye tek bir düz çizgi halinde yerleştirildi. Zemin kat tamamen açılabilen sürme doğramalarla bahçeye bağlanırken üst kat, derin saçak altında korunaklı bir yatak katı olarak tasarlandı. Havuz, yağmur suyu hasadı sistemiyle besleniyor.",
      },
      {
        id: "bebek-dairesi",
        title: "Bebek Dairesi",
        category: "ic-mekan",
        location: "Beşiktaş, İstanbul",
        year: 2024,
        area: "210 m²",
        image: "1600607687939-ce8a6c25118c",
        alt: "Ceviz ahşap duvar paneli, açık renk koltuk ve geniş pencereli sade bir oturma odası",
        summary: "1970'lerden kalma bir apartman dairesinin, ceviz ve traverten ile yeniden yorumlanması.",
        body: "Bölünmüş plan şeması açılarak salon, mutfak ve çalışma alanı tek bir akışa kavuşturuldu. Taşıyıcı sistemden kalan kolonlar gizlenmek yerine ceviz panellerle vurgulandı. Tüm mobilyalar atölyemizde ölçüye özel üretildi.",
      },
      {
        id: "levent-ofis",
        title: "Levent Ofis Katı",
        category: "ticari",
        location: "Beşiktaş, İstanbul",
        year: 2023,
        area: "1.150 m²",
        image: "1497366216548-37526070297c",
        alt: "Cam bölmeli toplantı odaları ve uzun koridoru olan aydınlık bir ofis katı",
        summary: "120 kişilik bir yazılım şirketi için esnek, akustik olarak dengeli bir çalışma katı.",
        body: "Çalışanlarla yapılan atölyeler sonucunda masaların yalnızca %60'ı sabit tutuldu; geri kalan alan odaklanma kabinlerine, proje odalarına ve bir kütüphaneye ayrıldı. Akustik tavan panelleri geri dönüştürülmüş PET keçeden üretildi.",
      },
      {
        id: "cihangir-cati",
        title: "Cihangir Çatı Katı",
        category: "ic-mekan",
        location: "Beyoğlu, İstanbul",
        year: 2023,
        area: "145 m²",
        image: "1600573472550-8090b5e0745e",
        alt: "Cam korkuluklu merdiveni ve deniz manzaralı geniş camları olan dubleks çatı katı",
        summary: "Tarihi bir apartmanın çatı katında, Boğaz manzarasını eve taşıyan dubleks dönüşüm.",
        body: "Mevcut çatı arası, koruma kurulu onayıyla yükseltilerek ikinci bir kat elde edildi. Merdiven, ışığı alt kata geçirecek şekilde cam ve çelikten tasarlandı. Tarihi cephe dokusuna dokunulmadan tüm müdahaleler içeride çözüldü.",
      },
      {
        id: "polonezkoy-ahsap",
        title: "Polonezköy Ahşap Ev",
        category: "restorasyon",
        location: "Beykoz, İstanbul",
        year: 2022,
        area: "260 m²",
        image: "1449844908441-8829872d2607",
        alt: "Ormanın içinde, sisli bir günde ahşap kaplamalı iki katlı tarihi ev",
        summary: "19. yüzyıldan kalma tescilli bir ahşap köy evinin aslına uygun restorasyonu.",
        body: "Rölöve çalışmasında yapının özgün ahşap iskeletinin %70'inin korunabilir olduğu tespit edildi. Çürüyen elemanlar aynı türde ahşapla, geleneksel geçme teknikleriyle yenilendi. Isı yalıtımı ve tesisat, özgün dokuya görünmez biçimde entegre edildi.",
      },
      {
        id: "bodrum-yazlik",
        title: "Gümüşlük Yazlık",
        category: "konut",
        location: "Bodrum, Muğla",
        year: 2022,
        area: "340 m²",
        image: "1580587771525-78b9dba3b914",
        alt: "Gün batımında havuzlu, beyaz ve ahşap detaylı modern bir yazlık ev",
        summary: "Ege'nin rüzgârına ve güneşine göre konumlanan, pasif soğutmalı bir yazlık.",
        body: "Kütleler, hâkim kuzey rüzgârından korunacak ve doğal havalandırmayı maksimize edecek şekilde yerleştirildi. Kalın taş duvarlar ve derin gölgelikler sayesinde yaz aylarında klima ihtiyacı %40 azaldı. Bahçe, yerel ve kuraklığa dayanıklı bitkilerle düzenlendi.",
      },
      {
        id: "nisantasi-studyo",
        title: "Nişantaşı Tasarım Mağazası",
        category: "ticari",
        location: "Şişli, İstanbul",
        year: 2021,
        area: "380 m²",
        image: "1524758631624-e2822e304c36",
        alt: "Ahşap raflar, sade mobilyalar ve büyük pencereleri olan aydınlık bir tasarım mağazası",
        summary: "Bir mobilya markası için hem mağaza hem showroom hem de etkinlik alanı olarak çalışan esnek mekân.",
        body: "Tüm teşhir elemanları tekerlekli ve modüler tasarlandı; mekân bir saat içinde 80 kişilik bir etkinlik salonuna dönüşebiliyor. Zemin, binanın özgün mozaik karolarının restore edilmesiyle elde edildi.",
      },
    ],

    services: [
      {
        icon: "pencil-ruler",
        title: "Mimari Tasarım",
        text: "Arsa analizinden ruhsat projesine kadar yeni yapılar için bütüncül mimari tasarım.",
        tags: ["Konsept", "Avan proje", "Ruhsat"],
      },
      {
        icon: "sofa",
        title: "İç Mimarlık",
        text: "Konut ve ticari mekânlar için plan kurgusu, malzeme seçimi ve ölçüye özel mobilya tasarımı.",
        tags: ["Yenileme", "Mobilya", "Aydınlatma"],
      },
      {
        icon: "landmark",
        title: "Restorasyon",
        text: "Tescilli ve tarihi yapılarda rölöve, restitüsyon ve aslına uygun restorasyon uygulamaları.",
        tags: ["Rölöve", "Kurul süreçleri"],
      },
      {
        icon: "trees",
        title: "Peyzaj Tasarımı",
        text: "Yapıyı çevresiyle buluşturan, yerel bitki örtüsüne ve su tasarrufuna dayalı açık alan tasarımı.",
        tags: ["Bahçe", "Teras", "Sulama"],
      },
      {
        icon: "hard-hat",
        title: "Uygulama ve Proje Yönetimi",
        text: "Şantiye yönetimi, maliyet kontrolü ve tedarik süreçleriyle anahtar teslim uygulama.",
        tags: ["Anahtar teslim", "Bütçe takibi"],
      },
    ],

    principles: [
      {
        icon: "sun",
        title: "Önce ışık",
        text: "Her plana güneşin yönünü çizerek başlıyoruz. Doğru konumlanan bir pencere, en pahalı malzemeden daha değerlidir.",
      },
      {
        icon: "leaf",
        title: "Dürüst malzeme",
        text: "Taşı taş, ahşabı ahşap olarak kullanıyoruz. Mümkün olduğunca yerel, onarılabilir ve iyi yaşlanan malzemeler seçiyoruz.",
      },
      {
        icon: "hourglass",
        title: "Zamansızlık",
        text: "Moda olan değil, yirmi yıl sonra da doğru hissettirecek mekânlar tasarlıyoruz.",
      },
    ],

    process: [
      {
        title: "Keşif ve Brif",
        duration: "1 – 2 hafta",
        text: "Yerinde inceleme, ihtiyaç analizi ve bütçe çerçevesi. Sonunda yazılı bir proje brifi ve teklif sunuyoruz.",
      },
      {
        title: "Konsept Tasarım",
        duration: "3 – 5 hafta",
        text: "Eskizler, maketler ve malzeme panoları ile iki farklı tasarım yaklaşımı. Birlikte birini seçip geliştiriyoruz.",
      },
      {
        title: "Uygulama Projesi",
        duration: "4 – 8 hafta",
        text: "Teknik çizimler, detaylar, metraj ve keşif özeti. Ruhsat ve kurul süreçlerini de bu aşamada yürütüyoruz.",
      },
      {
        title: "Şantiye ve Teslim",
        duration: "Projeye göre",
        text: "Haftalık saha raporları ve fotoğraflı ilerleme takibi. Son kontrol listesi tamamlanmadan anahtarı teslim etmiyoruz.",
      },
    ],

    team: [
      {
        name: "Elif Karaca",
        role: "Kurucu Ortak, Y. Mimar",
        image: "1438761681033-6461ffad8d80",
        bio: "İTÜ ve TU Delft mezunu. Konut ve restorasyon projelerini yönetiyor.",
      },
      {
        name: "Can Demirtaş",
        role: "Kurucu Ortak, Mimar",
        image: "1500648767791-00dcc994a43e",
        bio: "ODTÜ mezunu. Ticari projeler ve yapım süreçlerinden sorumlu.",
      },
      {
        name: "Zeynep Aydın",
        role: "İç Mimarlık Direktörü",
        image: "1531123897727-8f129e1688ce",
        bio: "Mimar Sinan GSÜ mezunu. Mobilya ve aydınlatma tasarımında uzman.",
      },
      {
        name: "Mert Yalçın",
        role: "Uygulama Koordinatörü",
        image: "1507003211169-0a1dd7228f2d",
        bio: "İnşaat mühendisi. 60'tan fazla şantiyeyi zamanında teslim etti.",
      },
    ],

    testimonials: [
      {
        quote: "Evimizin her köşesinde bizi ne kadar dinlediklerini hissediyoruz. Bütçeyi ilk günden net konuştuk ve tek bir sürprizle karşılaşmadık.",
        name: "Ayşe ve Murat Ergin",
        project: "Kandilli Evi, 2025",
      },
      {
        quote: "Ofise taşındıktan sonra çalışanlarımızın ofiste geçirdiği gün sayısı kendiliğinden arttı. Bundan daha iyi bir geri bildirim düşünemiyorum.",
        name: "Deniz Koç",
        project: "Kurucu Ortak, Levent Ofis Katı",
      },
      {
        quote: "Koruma kurulu süreci bizi çok korkutuyordu. Kuzey Atölye tüm yazışmaları üstlendi; biz sadece evin yeniden canlanışını izledik.",
        name: "Hans ve Selin Weber",
        project: "Polonezköy Ahşap Ev, 2022",
      },
    ],

    faq: [
      {
        q: "İlk görüşme ücretli mi?",
        a: "Hayır. İlk görüşme ücretsizdir; stüdyomuzda, sahada ya da online olarak yaklaşık 45 dakika sürer. Bu görüşmenin ardından size yazılı bir teklif iletiyoruz.",
      },
      {
        q: "Tasarım ücretlerinizi nasıl belirliyorsunuz?",
        a: "Ücretlerimiz projenin türüne, metrekaresine ve kapsamına göre belirlenir. Genellikle sabit bir tasarım bedeli ve uygulama aşamasında yapım maliyetinin belirli bir yüzdesi olarak hesaplanır. Teklifte tüm kalemler ayrı ayrı yer alır.",
      },
      {
        q: "İstanbul dışında da çalışıyor musunuz?",
        a: "Evet. Bugüne kadar Muğla, İzmir, Çanakkale, Ankara ve Bursa'da projeler tamamladık. Şehir dışı projelerde saha ziyaretlerini önceden planlayıp yerel bir uygulama ekibiyle çalışıyoruz.",
      },
      {
        q: "Sadece tasarım hizmeti alabilir miyim?",
        a: "Elbette. Yalnızca konsept, yalnızca uygulama projesi ya da anahtar teslim hizmetlerimizden ihtiyacınıza uygun olanı seçebilirsiniz. Uygulamayı kendi müteahhidinizle yapmanız durumunda kontrollük hizmeti de veriyoruz.",
      },
      {
        q: "Bir daire yenilemesi ortalama ne kadar sürer?",
        a: "150 m² civarında bir dairenin kapsamlı yenilemesi; tasarım dahil genellikle 4 ila 6 ay sürer. Mobilyaların ölçüye özel üretildiği projelerde bu süre 1-2 ay uzayabilir.",
      },
      {
        q: "Tescilli bir yapı için koruma kurulu süreçlerini siz mi yürütüyorsunuz?",
        a: "Evet. Rölöve, restitüsyon ve restorasyon projelerinin hazırlanmasından kurul başvurularının takibine kadar tüm süreci ekibimizdeki restorasyon uzmanları yürütür.",
      },
    ],
  };
})();
