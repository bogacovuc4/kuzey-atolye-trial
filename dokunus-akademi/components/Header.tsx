"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/content/site";
import { LogoMark } from "./Symbols";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={`header${scrolled || open ? " scrolled" : ""}`}>
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="Dokunuş Akademi ana sayfa">
            <LogoMark size={42} />
            <span>
              <span className="brand-name">DOKUNUŞ</span>
              <span className="brand-sub">AKADEMİ</span>
            </span>
          </Link>
          <nav className="nav" aria-label="Ana menü">
            <ul>
              {navigation.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="menu-btn"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </header>
      <div id="mobile-menu" className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobil menü">
          <ul>
            {navigation.map((n, i) => (
              <li key={n.href} style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}>
                <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>
                  {n.label}
                  <small>{String(i + 1).padStart(2, "0")}</small>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/iletisim" className="btn btn-primary">Randevu Talep Et</Link>
      </div>
    </>
  );
}
