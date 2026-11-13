import Link from "next/link";
import { Mandala } from "@/components/Symbols";

export default function NotFound() {
  return (
    <section className="not-found" style={{ position: "relative", overflow: "hidden" }}>
      <Mandala className="hero-mandala" />
      <div className="container narrow" style={{ position: "relative" }}>
        <div className="kicker both">404</div>
        <h1>Bu kapı henüz <span className="gold-text">açılmadı.</span></h1>
        <p className="lead" style={{ margin: "0 auto 32px" }}>Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Belki de yolun seni başka bir yere çağırıyordur.</p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link href="/" className="btn btn-primary">Ana Sayfaya Dön</Link>
          <Link href="/tarot#interaktif" className="btn btn-ghost">Bir Kart Çek</Link>
        </div>
      </div>
    </section>
  );
}
