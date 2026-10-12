import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Fast URL Decoupler Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-50 leading-[1.08] mb-5">
            Lewati rantai iklan, langsung ke link final.
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-[58ch] leading-relaxed mb-8">
            Akses konten tujuan tanpa jeda countdown, jebakan pop-up iklan, atau captcha berulang. Cukup tempel link dan ekstrak tujuan dalam hitungan detik.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/bypass"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-[0.98] transition-all inline-flex items-center gap-2"
            >
              <span>Coba Sekarang</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/cara-penggunaan"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-50 transition-all"
            >
              Lihat Cara Kerja
            </Link>
          </div>
        </div>

        {/* Quick Interactive Preview Box */}
        <div className="mt-14 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="font-medium text-zinc-300">Live Mock Console</span>
            </div>
            <span className="font-mono text-zinc-400">Latency: ~210ms</span>
          </div>

          <div className="pt-5 grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-9 relative">
              <input
                type="text"
                readOnly
                value="https://sfile.mobi/demo123test"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs md:text-sm font-mono text-zinc-300 focus:outline-none"
              />
            </div>
            <Link
              href="/bypass"
              className="md:col-span-3 inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-colors text-center"
            >
              Jalankan di Tool
            </Link>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-zinc-800/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/70">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-400 mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-zinc-100 mb-2">Bypass Instan</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Mesin otomatis menembus proteksi token, timer delay, dan halaman redirect perantara.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/70">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-400 mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-zinc-100 mb-2">Bebas Malware & Spam</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Mencegah browser kamu membuka pop-up download mencurigakan dan malware berbahaya.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/70">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-400 mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-zinc-100 mb-2">Multi Shortlink</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Mendukung berbagai penyedia shortlink populer dengan pembaruan pola bypass berkala.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
