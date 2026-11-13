"use client";
import Link from "next/link";
import { useState } from "react";
import { getCard } from "@/content/tarot";
import { FlipCard } from "./TarotExperience";

export default function DailyCard({ slug }: { slug: string }) {
  const card = getCard(slug)!;
  const [open, setOpen] = useState(false);
  return (
    <div className="panel glow daily-card corner">
      <div className="daily-item"><h3 style={{ justifyContent: "center" }}>✦ Günün Tarot Kartı</h3></div>
      <div className="tarot-wrap" style={{ width: 200, margin: "6px auto 18px" }}>
        <FlipCard card={card} flipped={open} onClick={() => setOpen(true)} label={open ? `Günün kartı: ${card.name}` : "Günün kartını aç"} />
      </div>
      {open ? (
        <div className="fade-in">
          <h3>{card.name}</h3>
          <p className="muted" style={{ fontSize: "0.95rem" }}>{card.essence}</p>
          <Link href={`/tarot/kartlar/${card.slug}`} className="link-arrow">Anlamını oku →</Link>
        </div>
      ) : (
        <p className="muted" style={{ fontSize: "0.95rem" }}>Kartı açmak için üzerine dokun.</p>
      )}
    </div>
  );
}
