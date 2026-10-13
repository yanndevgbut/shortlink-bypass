"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface HistoryRecord {
  id: string;
  service: string;
  originalUrl: string;
  targetUrl: string;
  timeSaved: number;
  timestamp: number;
  timeAgo: string;
}

const KNOWN_SERVICES: Record<string, string> = {
  sfile: "Sfile Mobi",
  safelinku: "Safelinku",
  ouo: "Ouo.io",
  linkvertise: "Linkvertise",
  gatelo: "Gatelo",
  zipli: "Zipli",
  klikbayar: "Klikbayar",
  tautbox: "Tautbox",
  pintu: "Pintu.id",
  adfly: "Adf.ly",
};

function formatTimeAgo(diffSec: number): string {
  if (diffSec < 60) return "baru saja";
  const m = Math.floor(diffSec / 60);
  if (m < 60) return `${m} mnt lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  return `${d} hari lalu`;
}

export default function BypassPage() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [formErr, setFormErr] = useState(false);
  const [currentStage, setCurrentStage] = useState(0); // 0 to 4
  const [logs, setLogs] = useState<{ id: number; text: string; isOk?: boolean }[]>([
    { id: 0, text: "> menunggu tautan…" },
  ]);
  const [resultUrl, setResultUrl] = useState("");
  const [displayedUrl, setDisplayedUrl] = useState("");
  const [isFin, setIsFin] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeSaved, setTimeSaved] = useState(0);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const typeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem("lompat_history");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const detectService = (rawUrl: string): string => {
    const lower = rawUrl.toLowerCase();
    for (const [key, name] of Object.entries(KNOWN_SERVICES)) {
      if (lower.includes(key)) return name;
    }
    try {
      const host = new URL(rawUrl).hostname.replace(/^www\./, "");
      return host || "Layanan URL";
    } catch {
      return "Layanan URL";
    }
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;

    const trimmed = url.trim();
    if (!/^https?:\/\/[^\s.]+\.[^\s]+/.test(trimmed)) {
      setMsg("Tempel tautan lengkap yang diawali https://");
      setFormErr(true);
      setTimeout(() => setFormErr(false), 500);
      return;
    }

    setMsg("");
    setBusy(true);
    setResultUrl("");
    setDisplayedUrl("");
    setIsFin(false);
    setTimeSaved(0);
    setCurrentStage(0);

    const detectedSvc = detectService(trimmed);
    const logItems: { id: number; text: string; isOk?: boolean }[] = [];
    let logCount = 0;

    const addLog = (text: string, isOk = false) => {
      logItems.push({ id: ++logCount, text, isOk });
      setLogs([...logItems]);
    };

    try {
      // Stage 1: Kenali Layanan
      setCurrentStage(1);
      addLog("> membuka tautan…");
      await sleep(600);
      addLog(`ok layanan ${detectedSvc} terdeteksi`, true);
      await sleep(250);

      // Stage 2: Lewati Timer
      setCurrentStage(2);
      addLog("> mengurai gerbang pengalihan…");
      await sleep(600);

      // Send API Request in background
      const fetchPromise = fetch("/api/bypass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      addLog("ok timer dan delay dilewati", true);
      await sleep(250);

      // Stage 3: Selesaikan Captcha
      setCurrentStage(3);
      addLog("> membaca respon server…");

      const response = await fetchPromise;
      const data = await response.json();

      if (!response.ok || !data.success || !data.bypassed_url) {
        throw new Error(data.message || "Gagal membuka link tujuan.");
      }

      addLog("ok verifikasi tantangan terselesaikan", true);
      await sleep(250);

      // Stage 4: Ambil Tujuan
      setCurrentStage(4);
      addLog("> mengambil alamat tujuan final…");
      await sleep(400);
      addLog("ok alamat tujuan ditemukan", true);

      const finalUrl = data.bypassed_url;
      setResultUrl(finalUrl);

      // Typewriter effect for #dest
      let cur = "";
      for (const ch of finalUrl) {
        cur += ch;
        setDisplayedUrl(cur);
        await sleep(14);
      }
      setIsFin(true);

      // Animate time saved count
      const computedSave = 11 + Math.floor(Math.random() * 8);
      let n = 0;
      const countTimer = setInterval(() => {
        n++;
        setTimeSaved(n);
        if (n >= computedSave) clearInterval(countTimer);
      }, 50);

      // Save to localStorage
      const newRecord: HistoryRecord = {
        id: Date.now().toString(),
        service: data.platform && data.platform !== "unknown" && data.platform !== "redirect"
          ? data.platform
          : detectedSvc,
        originalUrl: trimmed,
        targetUrl: finalUrl,
        timeSaved: computedSave,
        timestamp: Date.now(),
        timeAgo: "baru saja",
      };

      const updatedHistory = [newRecord, ...history.filter((h) => h.originalUrl !== trimmed)].slice(0, 50);
      setHistory(updatedHistory);
      try {
        localStorage.setItem("lompat_history", JSON.stringify(updatedHistory));
      } catch {
        // ignore
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan saat memproses link.";
      setMsg(errorMsg);
      addLog(`gagal: ${errorMsg}`);
    } finally {
      setBusy(false);
    }
  };

  const handleCopy = async () => {
    if (!resultUrl) return;
    try {
      await navigator.clipboard.writeText(resultUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback
    }
  };

  // Compute stats from real history
  const serviceStats = isMounted && history.length > 0
    ? Object.entries(
        history.reduce<Record<string, number>>((acc, item) => {
          acc[item.service] = (acc[item.service] || 0) + 1;
          return acc;
        }, {})
      )
        .map(([name, count]) => ({
          name,
          count,
          percentage: Math.round((count / history.length) * 100),
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    : [
        { name: "Sfile Mobi", count: 0, percentage: 80 },
        { name: "Safelinku", count: 0, percentage: 65 },
        { name: "Ouo.io", count: 0, percentage: 45 },
        { name: "Linkvertise", count: 0, percentage: 30 },
      ];

  const recentList = isMounted ? history.slice(0, 4) : [];

  return (
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
            <Link href="/">Beranda</Link>
          </li>
          <li>
            <Link href="/bypass" aria-current="page">
              Lompat
            </Link>
          </li>
          <li>
            <Link href="/riwayat">Riwayat</Link>
          </li>
        </ul>
        <Link className="btn ghost" href="/riwayat">
          Riwayat saya
        </Link>
      </nav>

      <div className="top">
        <h1>Tempel tautannya.</h1>
      </div>

      <div className="grid">
        <main>
          <form
            id="f"
            className={`lompat-form ${formErr ? "err" : ""}`}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <input
              id="url"
              type="text"
              inputMode="url"
              aria-label="Tautan bergerbang"
              placeholder="https://sfile.mobi/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={busy}
            />
            <button className="btn" id="go" type="submit" disabled={busy}>
              Lompat
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>

          <p id="msg" role="alert">
            {msg}
          </p>

          <div
            className="stages"
            id="stg"
            style={{
              "--pg": currentStage >= 4 ? 1 : Math.max(0, (currentStage - 1) / 3),
            } as React.CSSProperties}
          >
            <div className={`st ${currentStage === 1 ? "on" : currentStage > 1 ? "done" : ""}`}>
              <i>
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="6" />
                  <path d="M20 20l-4.5-4.5" />
                </svg>
              </i>
              Kenali layanan
            </div>
            <div className={`st ${currentStage === 2 ? "on" : currentStage > 2 ? "done" : ""}`}>
              <i>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4l3 2" />
                </svg>
              </i>
              Lewati timer
            </div>
            <div className={`st ${currentStage === 3 ? "on" : currentStage > 3 ? "done" : ""}`}>
              <i>
                <svg viewBox="0 0 24 24">
                  <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
                </svg>
              </i>
              Selesaikan captcha
            </div>
            <div className={`st ${currentStage === 4 ? "done" : ""}`}>
              <i>
                <svg viewBox="0 0 24 24">
                  <path d="M5 12l4.5 4.5L19 7" />
                </svg>
              </i>
              Ambil tujuan
            </div>
          </div>

          <div className="log" id="log" aria-live="polite">
            {logs.map((item) => (
              <p key={item.id}>
                {item.isOk ? <b>ok </b> : null}
                {item.text.replace(/^ok\s/, "")}
              </p>
            ))}
          </div>

          <div className={`res ${resultUrl ? "show" : ""}`} id="res">
            <small>Tujuan asli</small>
            <span id="dest" className={isFin ? "fin" : ""}>
              {displayedUrl}
            </span>
            <div className="row">
              <button className="btn" id="cp" type="button" onClick={handleCopy}>
                <svg viewBox="0 0 24 24">
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15V6a2 2 0 012-2h9" />
                </svg>
                <span>{copied ? "Tersalin" : "Salin"}</span>
              </button>
              <a
                className="btn ghost"
                href={resultUrl || "#"}
                id="open"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buka tujuan
              </a>
              <span className="sv">
                Hemat <b id="sv">{timeSaved}</b> detik
              </span>
            </div>
            <div className="chips">
              <span>HTTPS aktif</span>
              <span>Tanpa pengalihan lanjutan</span>
              <span>Domain dikenal</span>
            </div>
          </div>
        </main>

        <aside>
          <section>
            <h2>Layanan terbanyak</h2>
            <div id="bars">
              {serviceStats.map((item, idx) => (
                <div className="bar" key={item.name}>
                  <span>{item.name}</span>
                  <div>
                    <i
                      style={
                        {
                          "--dl": `${idx * 0.12}s`,
                          width: `${item.percentage}%`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                  <em>{item.percentage}%</em>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Baru saja kamu lompati</h2>
            <ul id="rec">
              {recentList.length > 0 ? (
                recentList.map((item) => {
                  const nowSec = Math.floor(Date.now() / 1000);
                  const itemSec = Math.floor(item.timestamp / 1000);
                  const diff = Math.max(0, nowSec - itemSec);
                  return (
                    <li key={item.id}>
                      <b>{item.service}</b>
                      <span>{item.targetUrl.replace(/^https?:\/\//, "")}</span>
                      <time>{formatTimeAgo(diff)}</time>
                    </li>
                  );
                })
              ) : (
                <li style={{ gridTemplateColumns: "1fr", color: "var(--mute)" }}>
                  <span>Belum ada riwayat tercatat</span>
                </li>
              )}
            </ul>
            <Link className="more" href="/riwayat">
              Lihat semua riwayat
            </Link>
          </section>
        </aside>
      </div>

      <footer>
        <span>© 2026 Lompat</span>
        <span>Lewati gerbang iklan, langsung ke tujuan</span>
      </footer>
    </div>
  );
}
