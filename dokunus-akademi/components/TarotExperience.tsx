"use client";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { tarotCards, tarotDisclaimer, type TarotCard } from "@/content/tarot";
import { TarotBack, TarotFace } from "./TarotArt";

type Mode = "day" | "one" | "three";

const positions = [
  { key: "Geçmiş", hint: "Seni bugüne getiren temalar" },
  { key: "Şimdi", hint: "Şu anki enerjin ve odağın" },
  { key: "Gelecek", hint: "Önündeki olasılık üzerine bir düşünce" },
];

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlipCard({ card, flipped, onClick, label, disabled }: { card: TarotCard | null; flipped: boolean; onClick?: () => void; label: string; disabled?: boolean }) {
  return (
    <button type="button" className={`tarot${flipped ? " flipped" : ""}`} onClick={onClick} aria-label={label} disabled={disabled}>
      <span className="tarot-inner">
        <span className="tarot-back"><TarotBack /></span>
        <span className="tarot-face">{card && <TarotFace card={card} />}</span>
      </span>
    </button>
  );
}

function Reading({ card, position }: { card: TarotCard; position?: string }) {
  return (
    <article className="panel reading-card fade-in">
      <div className="mini"><TarotFace card={card} /></div>
      <div>
        {position && <div className="position">{position}</div>}
        <h3>{card.name} <span className="muted" style={{ fontSize: "0.6em" }}>· {card.english}</span></h3>
        <div className="tags" style={{ margin: "10px 0 16px" }}>
          {card.keywords.map((k) => <span key={k} className="tag soft">{k}</span>)}
        </div>
        <p className="italic" style={{ fontSize: "1.2rem", color: "var(--ivory)" }}>{card.essence}</p>
        <p className="muted">{card.meaning}</p>
        <p className="reflection">“{card.question}”</p>
        <p style={{ marginTop: 18 }}>
          <Link href={`/tarot/kartlar/${card.slug}`} className="link-arrow">Kartın sembolizmini oku →</Link>
        </p>
      </div>
    </article>
  );
}

export default function TarotExperience({ dailyCardSlug }: { dailyCardSlug: string }) {
  const [mode, setMode] = useState<Mode>("day");
  const [deck, setDeck] = useState<TarotCard[]>(() => tarotCards);
  const [picked, setPicked] = useState<TarotCard[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([]);
  const [shuffling, setShuffling] = useState(false);
  const [dayFlipped, setDayFlipped] = useState(false);
  const readingRef = useRef<HTMLDivElement>(null);

  const daily = useMemo(() => tarotCards.find((c) => c.slug === dailyCardSlug) ?? tarotCards[0], [dailyCardSlug]);
  const need = mode === "three" ? 3 : 1;
  const done = picked.length >= need && revealed.length >= need && revealed.slice(0, need).every(Boolean);

  const reset = (m: Mode = mode) => {
    setMode(m);
    setPicked([]);
    setRevealed([]);
    setDayFlipped(false);
    setShuffling(true);
    setDeck(shuffle(tarotCards));
    setTimeout(() => setShuffling(false), 700);
  };

  const pick = (card: TarotCard) => {
    if (picked.length >= need || picked.includes(card)) return;
    const idx = picked.length;
    setPicked((p) => [...p, card]);
    setRevealed((r) => [...r, false]);
    setTimeout(() => {
      setRevealed((r) => r.map((v, i) => (i === idx ? true : v)));
      if (idx === need - 1) setTimeout(() => readingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 900);
    }, 450);
  };

  const hint =
    mode === "day"
      ? dayFlipped ? "Günün kartı seninle." : "Kartın üzerine dokun ve günün kartını aç."
      : picked.length < need
        ? mode === "three"
          ? `Niyetine odaklan ve ${positions[picked.length].key.toLocaleLowerCase("tr-TR")} için bir kart seç. (${picked.length + 1}/3)`
          : "Bir soru ya da niyetle desteye bak ve sana çağrı yapan kartı seç."
        : "Kartların açıldı. Yorumları aşağıda okuyabilirsin.";

  const n = deck.length;
  const spreadAngle = 50;

  return (
    <div>
      <div className="tarot-modes" role="group" aria-label="Tarot deneyimi türü">
        <button aria-pressed={mode === "day"} onClick={() => reset("day")}>Günün Kartı</button>
        <button aria-pressed={mode === "one"} onClick={() => reset("one")}>Tek Kart Çek</button>
        <button aria-pressed={mode === "three"} onClick={() => reset("three")}>Geçmiş · Şimdi · Gelecek</button>
      </div>

      <p className="deck-hint" aria-live="polite">{hint}</p>

      {mode === "day" ? (
        <div className="spread one">
          <div className="spread-slot">
            <span className="label">{new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", weekday: "long", timeZone: "Europe/Istanbul" }).format(new Date())}</span>
            <FlipCard card={daily} flipped={dayFlipped} onClick={() => setDayFlipped(true)} label={dayFlipped ? `Günün kartı: ${daily.name}` : "Günün kartını aç"} />
          </div>
        </div>
      ) : (
        <>
          <div className="deck" aria-label="Tarot destesi">
            {deck.map((c, i) => {
              const angle = -spreadAngle / 2 + (spreadAngle * i) / (n - 1);
              const isPicked = picked.includes(c);
              return (
                <button
                  key={c.slug}
                  type="button"
                  className={`deck-card${isPicked ? " picked" : ""}`}
                  style={{
                    transform: shuffling
                      ? `translateX(-50%) rotate(0deg) translateY(${(i % 3) * -3}px)`
                      : `translateX(-50%) rotate(${angle}deg)`,
                    zIndex: i,
                    transitionDelay: shuffling ? "0ms" : `${i * 12}ms`,
                  }}
                  onClick={() => pick(c)}
                  disabled={picked.length >= need || shuffling}
                  aria-label={`Kart ${i + 1}`}
                >
                  <TarotBack />
                </button>
              );
            })}
          </div>
          <div className={`spread ${mode === "three" ? "three" : "one"}`}>
            {Array.from({ length: need }, (_, i) => (
              <div className="spread-slot" key={i}>
                {mode === "three" && <span className="label">{positions[i].key}</span>}
                {picked[i] ? (
                  <FlipCard
                    card={picked[i]}
                    flipped={!!revealed[i]}
                    onClick={() => setRevealed((r) => r.map((v, k) => (k === i ? true : v)))}
                    label={revealed[i] ? `${picked[i].name} kartı` : "Kartı aç"}
                  />
                ) : (
                  <div className="slot-empty" aria-hidden="true">✦</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <div ref={readingRef} className="reading" style={{ scrollMarginTop: 100 }}>
        {mode === "day" && dayFlipped && (
          <>
            <Reading card={daily} position="Günün Kartı" />
            <div className="panel center fade-in">
              <div className="kicker both">Günün Olumlaması</div>
              <p className="quote-block" style={{ margin: 0 }}>{daily.affirmation}</p>
            </div>
          </>
        )}
        {mode !== "day" && done && (
          <>
            {picked.slice(0, need).map((c, i) => (
              <Reading key={c.slug} card={c} position={mode === "three" ? `${positions[i].key} — ${positions[i].hint}` : "Senin Kartın"} />
            ))}
            {mode === "three" && (
              <div className="panel fade-in">
                <div className="kicker">Açılımın Hikâyesi</div>
                <p style={{ color: "var(--ivory)" }}>
                  <strong className="gold-text">{picked[0].name}</strong> kartının <em>{picked[0].keywords[0]}</em> teması, bugüne uzanan yolunu
                  hatırlatıyor. Şu an <strong className="gold-text">{picked[1].name}</strong> seni <em>{picked[1].keywords[0]}</em> ve{" "}
                  <em>{picked[1].keywords[1]}</em> üzerine düşünmeye davet ediyor. <strong className="gold-text">{picked[2].name}</strong> ise
                  önündeki olasılıklarda <em>{picked[2].keywords[0]}</em> temasına alan açabileceğini fısıldıyor.
                </p>
                <p className="muted mb-0">
                  Bu açılımı bir kehanet olarak değil, kendine soracağın sorular için bir başlangıç noktası olarak düşün. Hangi kart sana en çok dokundu?
                </p>
              </div>
            )}
          </>
        )}
        {(dayFlipped || done) && (
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <button className="btn btn-ghost" onClick={() => reset(mode === "day" ? "one" : mode)}>Yeniden Çek</button>
            <Link href="/iletisim?hizmet=Tarot%20Danışmanlığı" className="btn btn-primary">Kişisel Açılım Talep Et</Link>
          </div>
        )}
      </div>

      <p className="note mt-l" style={{ maxWidth: 820, margin: "48px auto 0" }}>{tarotDisclaimer}</p>
    </div>
  );
}
