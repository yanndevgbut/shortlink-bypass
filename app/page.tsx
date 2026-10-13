"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface HistoryItem {
  id: string;
  service: string;
  originalUrl: string;
  targetUrl: string;
  timeSaved: number;
  timestamp: number;
  timeAgo?: string;
}

const PROVIDERS = [
  "Sfile Mobi",
  "Safelinku",
  "Ouo.io",
  "Linkvertise",
  "Gatelo",
  "Zipli",
  "Klikbayar",
  "Tautbox",
  "Pintu.id",
];

export default function LandingPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const liveRef = useRef<HTMLElement>(null);
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem("lompat_history");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
          setAnimatedCount(parsed.length);
        }
      }
    } catch {
      // ignore
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".rv").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const marqueeContent = (
    <div>
      {PROVIDERS.concat(PROVIDERS).map((p, idx) => (
        <span key={idx}>{p}</span>
      ))}
    </div>
  );

  return (
    <>
      <div className="wrap">
        <nav>
          <Link className="logo" href="/">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <rect x="14" y="10" width="4" height="20" rx="2" fill="#2e3b52" />
              <path
                d="M3 25C8 1 24 1 29 25"
                fill="none"
                stroke="#ff5a1f"
                strokeWidth="3.6"
                strokeLinecap="round"
              />
            </svg>
            Lompat
          </Link>
          <ul>
            <li>
              <Link href="/" aria-current="page">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/bypass">Lompat</Link>
            </li>
            <li>
              <Link href="/riwayat">Riwayat</Link>
            </li>
          </ul>
          <Link className="btn ghost" href="/bypass">
            Masuk ke alat
          </Link>
        </nav>

        <header className="hero">
          <h1>
            Gerbang iklan? <em>Lompati</em> saja.
          </h1>
          <p>
            Tempel tautan yang dikunci timer, captcha, dan tiga lapis iklan. Dapatkan alamat tujuannya dalam hitungan detik.
          </p>
          <div className="cta">
            <Link className="btn" href="/bypass">
              Coba sekarang
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link className="btn ghost" href="/riwayat">
              Lihat riwayat
            </Link>
          </div>
          <div className="track" aria-hidden="true">
            <div className="rail"></div>
            <div className="gate" style={{ "--p": 22, "--dl": ".9s" } as React.CSSProperties}>
              <span>Timer 15 dtk</span>
            </div>
            <div className="gate" style={{ "--p": 44, "--dl": "2.2s" } as React.CSSProperties}>
              <span>Captcha</span>
            </div>
            <div className="gate" style={{ "--p": 66, "--dl": "3.5s" } as React.CSSProperties}>
              <span>Iklan 3 lapis</span>
            </div>
            <div className="gate" style={{ "--p": 86, "--dl": "4.7s" } as React.CSSProperties}>
              <span>Pengalihan</span>
            </div>
            <div className="dot"></div>
            <div className="goal">tujuan.id/berkas</div>
          </div>
        </header>
      </div>

      <div className="mq" aria-hidden="true">
        {marqueeContent}
      </div>
      <div className="mq" aria-hidden="true">
        {marqueeContent}
      </div>

      <main className="wrap">
        <section className="how rv">
          <h2>Tiga langkah, tanpa menunggu.</h2>
          <div className="steps">
            <svg viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
              <path
                pathLength="1"
                d="M60 40C300 40 250 150 500 150S760 260 950 260"
              />
            </svg>
            <article>
              <div className="mini">
                <div className="ty">sfile.mobi/demo123</div>
              </div>
              <h3>Tempel</h3>
              <p>Salin tautan bergerbang dari mana saja dan tempel ke kolom.</p>
            </article>
            <article>
              <div className="mini">
                <div className="bars">
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>
              <h3>Kami urai</h3>
              <p>Timer, captcha, dan iklan dilewati satu per satu di belakang layar.</p>
            </article>
            <article>
              <div className="mini">
                <svg className="chk" viewBox="0 0 34 34">
                  <path d="M6 18l8 8L28 8" />
                </svg>
              </div>
              <h3>Salin tujuan</h3>
              <p>Alamat asli muncul lengkap dengan pemeriksaan keamanan singkat.</p>
            </article>
          </div>
        </section>

        <section className="live rv" ref={liveRef}>
          <div>
            <h2>
              <span>{animatedCount.toLocaleString("id-ID")}</span> tautan sudah dilompati di perambanmu.
            </h2>
            <p>
              {history.length > 0
                ? `Rata-rata menghemat ${Math.round(
                    history.reduce((acc, h) => acc + (h.timeSaved || 12), 0) /
                      history.length
                  )} detik menatap hitung mundur.`
                : "Mulai bypass tautan pertamamu untuk mencatat waktu yang berhasil dihemat."}
            </p>
          </div>

          <ul id="feed" aria-live="off">
            {isClient && history.length > 0 ? (
              history.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <i></i>
                  <b>{item.service}</b>
                  <span>
                    {item.targetUrl.replace(/^https?:\/\//, "")}
                  </span>
                  <time>hemat {item.timeSaved} dtk</time>
                </li>
              ))
            ) : (
              <li style={{ gridTemplateColumns: "auto 1fr" }}>
                <i></i>
                <span style={{ color: "var(--mute)" }}>
                  Belum ada jejak lompatan. Tempel tautan di menu Lompat.
                </span>
              </li>
            )}
          </ul>
        </section>

        <section className="end rv">
          <h2>Waktumu lebih berharga dari hitung mundur.</h2>
          <Link className="btn" href="/bypass">
            Mulai melompat
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </section>
      </main>

      <div className="wrap">
        <footer>
          <span>© 2026 Lompat</span>
          <span>Lewati gerbang iklan, langsung ke tujuan</span>
        </footer>
      </div>
    </>
  );
}
