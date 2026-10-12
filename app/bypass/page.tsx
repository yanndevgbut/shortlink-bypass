"use client";

import { useState } from "react";

interface BypassResponse {
  success: boolean;
  bypassed_url?: string;
  original_url?: string;
  platform?: string;
  message?: string;
}

export default function BypassPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BypassResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/bypass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data: BypassResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal melakukan bypass tautan.");
      }

      setResult(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memproses link.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.bypassed_url) return;
    try {
      await navigator.clipboard.writeText(result.bypassed_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText) setUrl(clipText);
    } catch {
      // browser permissions
    }
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 md:py-16">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50 mb-2">
          Bypass Shortlink Console
        </h1>
        <p className="text-sm text-zinc-400">
          Masukkan URL shortlink yang ingin dilewati untuk mendapatkan direct link asli.
        </p>
      </div>

      {/* Input Form Card */}
      <div className="p-5 md:p-7 rounded-2xl bg-zinc-900/70 border border-zinc-800 shadow-xl backdrop-blur-sm mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="urlInput"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2"
            >
              Target URL
            </label>
            <div className="relative">
              <input
                id="urlInput"
                type="url"
                required
                placeholder="https://example.com/shortlink..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/70 transition-all pr-24 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handlePaste}
                disabled={isLoading}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors disabled:opacity-50"
              >
                Paste
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-zinc-400">Endpoint: /api/tools/bypasslink</span>
            <button
              type="submit"
              disabled={isLoading || !url}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-[0.98] transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-zinc-950" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <span>Proses Bypass</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Error Feedback */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 mb-6">
          <svg className="w-4 h-4 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Real Result Box */}
      {result && result.bypassed_url && (
        <div className="p-5 md:p-6 rounded-2xl bg-zinc-900/50 border border-emerald-500/30 mb-6">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="font-medium text-emerald-400">Bypass Berhasil</span>
            </div>
            <span className="text-zinc-400 font-mono">Platform: {result.platform}</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-[11px] text-zinc-400 mb-1">Direct Final Link:</div>
              <div className="font-mono text-sm text-zinc-200 break-all select-all">
                {result.bypassed_url}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-zinc-800 text-zinc-100 hover:bg-zinc-700 active:scale-[0.98] transition-all flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{copied ? "Tersalin!" : "Salin Link"}</span>
              </button>

              <a
                href={result.bypassed_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 active:scale-[0.98] transition-all flex items-center gap-1.5"
              >
                <span>Buka Langsung</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Supported List Teaser */}
      <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/60">
        <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          Contoh Penyedia Terdukung
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-300">
          <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">Sfile.mobi</span>
          <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">Safelinku</span>
          <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">Ouomobi / Ouo.io</span>
          <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">Adf.ly style</span>
          <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">Linkvertise</span>
        </div>
      </div>
    </main>
  );
}
