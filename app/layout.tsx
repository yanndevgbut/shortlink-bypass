import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BypassLink - Lewati Iklan & Dapatkan Link Final Langsung",
  description: "Akses konten tujuan tanpa jeda countdown, jebakan pop-up iklan, atau captcha berulang.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="bg-zinc-950 text-zinc-100 min-h-[100dvh] flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
        {/* Navbar */}
        <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/60 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <span className="font-semibold text-base tracking-tight text-zinc-100">
                Bypass<span className="text-emerald-400">Link</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
              <Link href="/" className="hover:text-zinc-100 transition-colors">Beranda</Link>
              <Link href="/bypass" className="hover:text-zinc-100 transition-colors">Bypass Tool</Link>
              <Link href="/cara-penggunaan" className="hover:text-zinc-100 transition-colors">Panduan</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/bypass"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-[0.98] transition-all"
              >
                <span>Buka Tool</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Footer */}
        <footer className="border-t border-zinc-800/80 bg-zinc-950 py-8 text-xs text-zinc-400">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-200">BypassLink</span>
              <span>- Solusi akses direct link ringkas</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-zinc-200 transition-colors">Beranda</Link>
              <Link href="/bypass" className="hover:text-zinc-200 transition-colors">Tool</Link>
              <Link href="/cara-penggunaan" className="hover:text-zinc-200 transition-colors">Panduan</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
