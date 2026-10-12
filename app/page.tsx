import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-16 md:pt-20 pb-16">
        <div className="max-w-3xl">
          <div className="animate-fade-in inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-400 font-mono mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Direct Route Bypass
          </div>

          <h1 className="animate-fade-in-delay-1 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-50 leading-[1.08] mb-5">
            Lewati rantai iklan, langsung ke link final.
          </h1>

          <p className="animate-fade-in-delay-2 text-base md:text-lg text-zinc-400 max-w-[58ch] leading-relaxed mb-8">
            Akses konten tujuan tanpa jeda countdown, jebakan pop-up iklan, atau captcha berulang. Cukup tempel link dan ekstrak tujuan dalam hitungan detik.
          </p>

          <div className="animate-fade-in-delay-3 flex flex-wrap items-center gap-3">
            <Link
              href="/bypass"
              className="btn-tactile px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] inline-flex items-center gap-2"
            >
              <span>Mulai Bypass Sekarang</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/cara-penggunaan"
              className="btn-tactile px-5 py-2.5 rounded-lg text-sm font-semibold bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700 hover:text-zinc-50"
            >
              Pelajari Cara Kerja
            </Link>
          </div>
        </div>

        {/* Live Interactive Preview Bento Card */}
        <div className="animate-fade-in-delay-3 mt-12 md:mt-14 p-6 md:p-8 rounded-2xl bg-zinc-900/70 border border-zinc-800 shadow-2xl backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-zinc-200">Terminal Bypass Console</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-zinc-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/70"></span>
              <span>API Siap</span>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-3.5">
            <div className="md:col-span-9 relative">
              <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs md:text-sm font-mono text-zinc-300 flex items-center justify-between shadow-inner">
                <span className="truncate">https://sfile.mobi/demo-file-package</span>
                <span className="text-[11px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 flex-shrink-0 ml-2">Preview</span>
              </div>
            </div>
            <Link
              href="/bypass"
              className="md:col-span-3 btn-tactile inline-flex items-center justify-center px-4 py-3 rounded-xl text-xs md:text-sm font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-center transition-colors"
            >
              Buka Console
            </Link>
          </div>
        </div>
      </section>

      {/* Key Highlights Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-zinc-800/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="interactive-card p-6 md:p-7 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-zinc-100 mb-2">Bypass Ekstra Cepat</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Algoritma mengeksekusi handshake server untuk melewati timer redirect tanpa jeda tunggu.
            </p>
          </div>

          <div className="interactive-card p-6 md:p-7 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-zinc-100 mb-2">Proteksi Dari Bahaya</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Browser terisolasi penuh dari iklan jebakan, pop-under berbahaya, dan unduhan file tak dikenal.
            </p>
          </div>

          <div className="interactive-card p-6 md:p-7 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-zinc-100 mb-2">Banyak Layanan Didukung</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Mencakup shortener populer lokal maupun global dengan database filter yang selalu diperbarui.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
