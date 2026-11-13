import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { PageHero } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Dokunuş Akademi aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
};

export default function KvkkPage() {
  const contact = site.contact.email ? <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> : <Link href="/iletisim">iletişim formu</Link>;
  return (
    <>
      <PageHero title="KVKK Aydınlatma Metni" crumbs={[{ label: "KVKK" }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container narrow prose legal">
          <p>
            Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında, veri sorumlusu sıfatıyla {site.founder} ({site.name}) tarafından,
            {" "}{site.url.replace(/^https?:\/\//, "")} internet sitesi üzerinden toplanan kişisel verilerinize ilişkin olarak sizi bilgilendirmek amacıyla hazırlanmıştır.
          </p>
          <h2>1. İşlenen Kişisel Veriler</h2>
          <ul>
            <li><strong>Kimlik ve iletişim verileri:</strong> Ad soyad, telefon numarası, e-posta adresi.</li>
            <li><strong>Talep bilgileri:</strong> Hizmet tercihi, görüşme tercihi (online / yüz yüze) ve mesaj alanına kendi isteğinizle yazdığınız bilgiler.</li>
            <li><strong>İşlem güvenliği verileri:</strong> Kötüye kullanımın önlenmesi amacıyla geri döndürülemez şekilde özetlenmiş (hash) IP bilgisi.</li>
            <li><strong>Çerez verileri:</strong> Yalnızca onay vermeniz hâlinde analitik çerezler aracılığıyla toplanan kullanım verileri.</li>
          </ul>
          <p>
            Mesaj alanına sağlık durumu, inanç gibi özel nitelikli kişisel verilerinizi yazmamanızı rica ederiz. Bu tür bilgilerin paylaşılması gerekiyorsa, görüşme sırasında sözlü olarak paylaşabilirsiniz.
          </p>
          <h2>2. İşleme Amaçları</h2>
          <ul>
            <li>Randevu ve görüşme taleplerinizin alınması, yanıtlanması ve planlanması,</li>
            <li>Eğitim ön kayıt ve başvurularınızın alınması, eğitimler hakkında sizi bilgilendirme,</li>
            <li>Talep ettiğiniz hizmetlerin sunulması,</li>
            <li>İnternet sitesinin güvenliğinin sağlanması ve kötüye kullanımın önlenmesi,</li>
            <li>Onay vermeniz hâlinde sitenin kullanımına ilişkin istatistiklerin oluşturulması.</li>
          </ul>
          <h2>3. Hukuki Sebepler ve Toplama Yöntemi</h2>
          <p>
            Kişisel verileriniz, internet sitesindeki formlar ve çerezler aracılığıyla elektronik ortamda toplanmaktadır. Verileriniz KVKK&apos;nın 5. maddesinde yer alan
            &quot;bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması&quot;, &quot;veri sorumlusunun meşru menfaati&quot; ve analitik çerezler için &quot;açık rıza&quot; hukuki sebeplerine dayanılarak işlenmektedir.
          </p>
          <h2>4. Aktarım</h2>
          <p>
            Kişisel verileriniz; yalnızca yukarıdaki amaçlarla sınırlı olarak, hizmet aldığımız barındırma (hosting), e-posta ve bildirim altyapısı sağlayıcılarıyla ve
            yasal yükümlülükler kapsamında yetkili kamu kurumlarıyla paylaşılabilir. Analitik çerezlere onay vermeniz hâlinde kullanım verileri Google LLC tarafından sağlanan
            Google Analytics hizmetine aktarılabilir; bu aktarım yurt dışına veri aktarımı niteliği taşıyabilir.
          </p>
          <h2>5. Saklama Süresi</h2>
          <p>
            Randevu ve ön kayıt talepleriniz, talebinizin sonuçlandırılması için gerekli süre ve ilgili mevzuatta öngörülen süreler boyunca saklanır; süre sona erdiğinde silinir, yok edilir veya anonim hâle getirilir.
          </p>
          <h2>6. Haklarınız</h2>
          <p>KVKK&apos;nın 11. maddesi uyarınca;</p>
          <ul>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme,</li>
            <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
            <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini, KVKK&apos;da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
            <li>Bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
            <li>Münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
            <li>Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
          </ul>
          <p>haklarına sahipsiniz. Başvurularınızı {contact} üzerinden iletebilirsiniz.</p>
          <p className="muted"><em>Son güncelleme: Kasım 2026</em></p>
        </div>
      </section>
    </>
  );
}
