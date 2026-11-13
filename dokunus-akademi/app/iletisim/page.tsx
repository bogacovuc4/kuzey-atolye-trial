import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/Blocks";
import AppointmentForm from "@/components/AppointmentForm";
import { SocialIcon, socialLabels } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "İletişim ve Randevu",
  description: "Türkan Demir ile bireysel görüşme talebi oluştur: yaşam koçluğu, tarot, kuantum düşünce, metafizik, çakra ve meditasyon. Online veya yüz yüze.",
  alternates: { canonical: "/iletisim" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ hizmet?: string }> }) {
  const { hizmet } = await searchParams;
  const c = site.contact;
  const socials = Object.entries(site.social).filter(([, u]) => !!u) as [keyof typeof site.social, string][];
  const wa = c.whatsapp.replace(/\D/g, "");

  return (
    <>
      <PageHero kicker="Randevu ve İletişim" title="Bir dokunuş uzağındayız." symbol="lotus" lead="Türkan Demir ile bireysel görüşme talebi oluştur. Formu doldurduktan sonra seninle iletişime geçerek görüşmeyi birlikte planlayacağız." crumbs={[{ label: "İletişim" }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container contact-grid">
          <div className="panel glow corner">
            <div className="kicker">Görüşme Talep Formu</div>
            <h2 style={{ fontSize: "2rem", marginBottom: 26 }}>Yolculuğunu anlat</h2>
            <AppointmentForm defaultService={hizmet} />
          </div>
          <aside className="grid" style={{ alignContent: "start" }}>
            <div className="panel">
              <div className="kicker">Nasıl İlerliyoruz?</div>
              <ul className="list-check">
                <li>Formu doldurursun; talebin güvenli şekilde bize ulaşır.</li>
                <li>Seninle iletişime geçer, ihtiyacını kısaca konuşuruz.</li>
                <li>Sana uygun gün, saat ve görüşme biçimini (online / yüz yüze) birlikte belirleriz.</li>
              </ul>
            </div>
            {(c.phone || c.email || c.address || c.hours || wa || socials.length > 0) && (
              <div className="panel">
                <div className="kicker">İletişim Bilgileri</div>
                <ul className="contact-list">
                  {wa && <li><small>WhatsApp</small><a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">Mesaj gönder</a></li>}
                  {c.phone && <li><small>Telefon</small><a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a></li>}
                  {c.email && <li><small>E-posta</small><a href={`mailto:${c.email}`}>{c.email}</a></li>}
                  {c.address && <li><small>Adres</small><span>{c.address}</span></li>}
                  {c.hours && <li><small>Çalışma Saatleri</small><span>{c.hours}</span></li>}
                </ul>
                {socials.length > 0 && (
                  <div className="socials">
                    {socials.map(([k, u]) => (
                      <a key={k} href={u} target="_blank" rel="noopener noreferrer" aria-label={socialLabels[k]}><SocialIcon name={k} /></a>
                    ))}
                  </div>
                )}
              </div>
            )}
            <p className="note">
              Görüşmelerimiz; psikoterapi, psikolojik danışmanlık veya tıbbi tedavi yerine geçmez. Acil bir destek ihtiyacın varsa lütfen 112 Acil Çağrı Merkezi&apos;ni arayın.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
