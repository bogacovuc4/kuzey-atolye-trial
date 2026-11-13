import Link from "next/link";
import { site, navigation } from "@/content/site";
import { services } from "@/content/services";
import { LogoMark } from "./Symbols";
import { SocialIcon, socialLabels } from "./SocialIcons";

export default function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => !!url) as [keyof typeof site.social, string][];
  const c = site.contact;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand" aria-label="Dokunuş Akademi">
              <LogoMark size={46} />
              <span>
                <span className="brand-name">DOKUNUŞ</span>
                <span className="brand-sub">AKADEMİ</span>
              </span>
            </Link>
            <p className="footer-slogan">{site.slogan}</p>
            {socials.length > 0 && (
              <div className="socials">
                {socials.map(([k, url]) => (
                  <a key={k} href={url} target="_blank" rel="noopener noreferrer" aria-label={socialLabels[k]}>
                    <SocialIcon name={k} />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h4>Hizmetler</h4>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link href={`/${s.slug}`}>{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Akademi</h4>
            <ul>
              {navigation.filter((n) => ["/turkan-demir", "/egitimler", "/blog", "/tarot", "/iletisim"].includes(n.href)).map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
              <li><Link href="/tarot#interaktif">Günün Kartı</Link></li>
            </ul>
          </div>
          <div>
            <h4>İletişim</h4>
            <ul>
              {c.phone && <li><a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a></li>}
              {c.email && <li><a href={`mailto:${c.email}`}>{c.email}</a></li>}
              {c.address && <li>{c.address}</li>}
              {c.hours && <li>{c.hours}</li>}
              <li><Link href="/iletisim">Randevu talep formu</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.name} · {site.founder}</span>
          <span style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link href="/kvkk">KVKK Aydınlatma Metni</Link>
            <Link href="/gizlilik">Gizlilik ve Çerez Politikası</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
