import { SectionHead } from "./Blocks";

const chakras = [
  { name: "Taç Çakra", sk: "Sahasrara", color: "#c9a8ff", theme: "Anlam, bütünlük, evrenle bağ", q: "Hayatıma anlam veren ne?" },
  { name: "Üçüncü Göz", sk: "Ajna", color: "#7d7cf0", theme: "Sezgi, iç görü, hayal gücü", q: "Sezgilerim bana ne söylüyor?" },
  { name: "Boğaz Çakrası", sk: "Vishuddha", color: "#6fb8f0", theme: "İfade, iletişim, hakikat", q: "Söylemek istediğim ama söyleyemediğim ne var?" },
  { name: "Kalp Çakrası", sk: "Anahata", color: "#7fd3a4", theme: "Sevgi, şefkat, bağ", q: "Kendime ne kadar şefkat gösteriyorum?" },
  { name: "Solar Pleksus", sk: "Manipura", color: "#f2d16b", theme: "Öz güven, irade, kişisel güç", q: "Gücümü nerede hissediyorum?" },
  { name: "Sakral Çakra", sk: "Svadhisthana", color: "#f2a65e", theme: "Yaratıcılık, duygu, keyif", q: "Bana keyif veren ne?" },
  { name: "Kök Çakra", sk: "Muladhara", color: "#e76f6f", theme: "Güven, topraklanma, aidiyet", q: "Kendimi nerede güvende hissediyorum?" },
];

export function ChakraMap() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead kicker="Sembolik Harita" title={<>Yedi çakra, <span className="gold-text">yedi soru</span></>} lead="Her çakrayı, kendine yöneltilmiş nazik bir soru olarak düşünebilirsin." />
        <div className="grid" style={{ gap: 12, maxWidth: 860, margin: "0 auto" }}>
          {chakras.map((c, i) => (
            <div key={c.name} className="panel reveal" style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 20, alignItems: "center", padding: "20px 24px" }}>
              <span style={{ width: 44, height: 44, borderRadius: "50%", background: `radial-gradient(circle, ${c.color}, transparent 70%)`, boxShadow: `0 0 24px ${c.color}66`, display: "grid", placeItems: "center", fontFamily: "var(--font-display)", color: "#fff" }}>
                {7 - i}
              </span>
              <div>
                <h3 style={{ fontSize: "1.3rem", margin: 0 }}>{c.name} <span className="muted" style={{ fontSize: "0.7em" }}>· {c.sk}</span></h3>
                <p className="muted" style={{ margin: "2px 0 4px", fontSize: "0.94rem" }}>{c.theme}</p>
                <p className="italic mb-0" style={{ color: "var(--gold-2)" }}>“{c.q}”</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
