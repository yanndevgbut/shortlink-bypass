"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface HistoryRecord {
  id: string;
  service: string;
  originalUrl: string;
  targetUrl: string;
  timeSaved: number;
  timestamp: number;
  formattedTime?: string;
}

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

function computeTimeAgo(timestamp: number, currentNow: number): string {
  const diffSec = Math.max(0, Math.floor((currentNow - timestamp) / 1000));
  if (diffSec < 60) return "Baru saja";
  const m = Math.floor(diffSec / 60);
  if (m < 60) return `${m} mnt lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} hari lalu`;
  const date = new Date(timestamp);
  return `${DAYS[date.getDay()]} ${date.getHours().toString().padStart(2, "0")}.${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export default function RiwayatPage() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [filterService, setFilterService] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [heatmapData, setHeatmapData] = useState<{
    cells: { level: number; dayName: string; count: number; delay: number }[];
    totalCount: number;
    mostActiveDay: string;
  }>({
    cells: Array.from({ length: 182 }, (_, i) => ({
      level: 0,
      dayName: "",
      count: 0,
      delay: i * 3,
    })),
    totalCount: 0,
    mostActiveDay: "Belum ada",
  });

  useEffect(() => {
    setIsClient(true);
    const nowTime = Date.now();
    try {
      const stored = localStorage.getItem("lompat_history");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const formattedList: HistoryRecord[] = parsed.map((item: HistoryRecord) => ({
            ...item,
            formattedTime: computeTimeAgo(item.timestamp, nowTime),
          }));
          setHistory(formattedList);

          const dayCounts = Array(7).fill(0);
          let totalCount = 0;
          const countMap: Record<string, number> = {};

          formattedList.forEach((h) => {
            const d = new Date(h.timestamp);
            const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
            countMap[key] = (countMap[key] || 0) + 1;
            dayCounts[d.getDay()]++;
            totalCount++;
          });

          const today = new Date();
          const cells = [];
          for (let w = 25; w >= 0; w--) {
            for (let d = 0; d < 7; d++) {
              const pastDate = new Date();
              pastDate.setDate(today.getDate() - (w * 7 + (6 - d)));
              const key = `${pastDate.getFullYear()}-${pastDate.getMonth() + 1}-${pastDate.getDate()}`;
              const count = countMap[key] || 0;
              const level = count === 0 ? 0 : count < 4 ? 1 : count < 8 ? 2 : count < 12 ? 3 : 4;
              cells.push({
                level,
                dayName: DAYS[pastDate.getDay()],
                count,
                delay: (w * 7 + d) * 3,
              });
            }
          }

          const mostActiveDayIndex = dayCounts.indexOf(Math.max(...dayCounts));
          const mostActiveDay = totalCount > 0 ? DAYS[mostActiveDayIndex] : "Belum ada";

          setHeatmapData({ cells, totalCount, mostActiveDay });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const chips = useMemo(() => {
    const services = Array.from(new Set(history.map((h) => h.service))).filter(Boolean);
    return ["Semua", ...services];
  }, [history]);

  const filteredRows = useMemo(() => {
    return history.filter((item) => {
      const matchSvc = filterService === "Semua" || item.service === filterService;
      const matchQuery =
        !searchQuery ||
        item.targetUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.originalUrl.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSvc && matchQuery;
    });
  }, [history, filterService, searchQuery]);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      // fallback
    }
  };

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
            <Link href="/bypass">Lompat</Link>
          </li>
          <li>
            <Link href="/riwayat" aria-current="page">
              Riwayat
            </Link>
          </li>
        </ul>
        <Link className="btn ghost" href="/bypass">
          Lompat lagi
        </Link>
      </nav>

      <div className="hd">
        <h1>Jejak lompatanmu.</h1>
        <p className="sum" id="sum">
          {isClient && history.length > 0 ? (
            <>
              Dalam 26 minggu terakhir kamu melompati{" "}
              <b>{heatmapData.totalCount.toLocaleString("id-ID")}</b> tautan. Hari paling ramai:{" "}
              <b>{heatmapData.mostActiveDay}</b>.
            </>
          ) : (
            <>Belum ada aktivitas tercatat. Semua tautan yang kamu lewati akan muncul di sini.</>
          )}
        </p>
      </div>

      <div className="heatbox">
        <div className="heat" id="heat" role="img" aria-label="Peta aktivitas 26 minggu terakhir">
          {heatmapData.cells.map((cell, idx) => (
            <i
              key={idx}
              data-l={cell.level}
              title={cell.dayName ? `${cell.dayName} · ${cell.count} tautan` : ""}
              style={{ animationDelay: `${cell.delay}ms` }}
            />
          ))}
        </div>
        <div className="lg">
          Sepi<i></i><i></i><i></i><i></i><i></i>Ramai
        </div>
      </div>

      <div className="tools">
        <h2>Semua lompatan</h2>
        <span id="chips" style={{ display: "contents" }}>
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              className="chip"
              aria-pressed={filterService === chip}
              onClick={() => setFilterService(chip)}
            >
              {chip}
            </button>
          ))}
        </span>
        <input
          className="q"
          id="q"
          type="search"
          placeholder="Cari tujuan…"
          aria-label="Cari tujuan"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Layanan</th>
              <th>Tujuan</th>
              <th>Hemat</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="tb">
            {isClient &&
              filteredRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.formattedTime || "Baru saja"}</td>
                  <td>
                    <b>{row.service}</b>
                  </td>
                  <td className="u" title={row.targetUrl}>
                    {row.targetUrl}
                  </td>
                  <td className="h">+{row.timeSaved} dtk</td>
                  <td>
                    <button type="button" onClick={() => handleCopy(row.id, row.targetUrl)}>
                      {copiedId === row.id ? "Tersalin" : "Salin"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <p className={`empty ${isClient && filteredRows.length === 0 ? "show" : ""}`} id="em">
          {isClient && history.length === 0
            ? "Belum ada riwayat lompatan. Masuk ke halaman Lompat untuk memulai."
            : "Tidak ada lompatan yang cocok dengan pencarianmu."}
        </p>
      </div>

      <footer>
        <span>© 2026 Lompat</span>
        <span>Lewati gerbang iklan, langsung ke tujuan</span>
      </footer>
    </div>
  );
}
