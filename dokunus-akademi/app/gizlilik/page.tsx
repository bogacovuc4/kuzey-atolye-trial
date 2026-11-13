import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { PageHero } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Gizlilik ve Çerez Politikası",
  description: "Dokunuş Akademi gizlilik ve çerez politikası.",
  alternates: { canonical: "/gizlilik" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Gizlilik ve Çerez Politikası" crumbs={[{ label: "Gizlilik" }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container narrow prose legal">
          <p>
            {site.name} olarak gizliliğinize önem veriyoruz. Bu politika, {site.url.replace(/^https?:\/\//, "")} adresini ziyaret ettiğinizde hangi bilgilerin nasıl kullanıldığını açıklar.
            Kişisel verilerinizin işlenmesine ilişkin ayrıntılı bilgi için <Link href="/kvkk">KVKK Aydınlatma Metni</Link>&apos;ni inceleyebilirsiniz.
          </p>
          <h2>Formlar</h2>
          <p>
            Randevu ve eğitim ön kayıt formlarına yazdığınız bilgiler yalnızca talebinizi yanıtlamak için kullanılır, şifreli bağlantı (HTTPS) üzerinden iletilir ve üçüncü kişilerle pazarlama amacıyla paylaşılmaz.
          </p>
          <h2>Çerezler</h2>
          <p>Sitemizde iki tür çerez/yerel depolama kullanılabilir:</p>
          <ul>
            <li><strong>Zorunlu:</strong> Çerez tercihinizin hatırlanması ve yönetim panelinin güvenli oturumu için gerekli kayıtlar. Bu kayıtlar onay gerektirmez.</li>
            <li><strong>Analitik (isteğe bağlı):</strong> Google Analytics aracılığıyla sitenin nasıl kullanıldığını anonim olarak anlamamızı sağlar. Bu çerezler yalnızca çerez bildiriminde &quot;Kabul Et&quot; seçeneğini işaretlemeniz hâlinde yüklenir ve IP anonimleştirme ile çalışır.</li>
          </ul>
          <p>
            Çerez tercihinizi değiştirmek için tarayıcınızın site verilerini temizleyebilirsiniz; bir sonraki ziyaretinizde tercih bildirimi yeniden gösterilir.
          </p>
          <h2>İnteraktif Tarot</h2>
          <p>
            İnteraktif tarot alanında seçtiğiniz kartlar yalnızca tarayıcınızda işlenir; sunucuya gönderilmez ve kaydedilmez.
          </p>
          <h2>Dış Bağlantılar</h2>
          <p>
            Sitemiz WhatsApp ve sosyal medya gibi üçüncü taraf hizmetlere bağlantılar içerebilir. Bu hizmetlerin kendi gizlilik politikaları geçerlidir.
          </p>
          <h2>İçerik Hakkında</h2>
          <p>
            Sitedeki tarot, metafizik, kuantum düşünce, enerji ve çakra içerikleri kişisel gelişim, farkındalık ve eğlence amaçlıdır; kesin bir gelecek tahmini, bilimsel iddia,
            tıbbi veya psikolojik tanı ya da tedavi niteliği taşımaz.
          </p>
          <p className="muted"><em>Son güncelleme: Kasım 2026</em></p>
        </div>
      </section>
    </>
  );
}
