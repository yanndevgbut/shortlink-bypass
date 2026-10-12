import Link from "next/link";

export default function CaraPenggunaanPage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 mb-3">
          Cara Menggunakan BypassLink
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          Ikuti tiga langkah mudah berikut untuk melewati shortlink dan langsung mendapatkan link file atau website yang sebenarnya.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-6 mb-16">
        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono text-sm font-bold text-emerald-400">
            1
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-100 mb-1">Salin Link Shortlink</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Buka website atau pesan tempat kamu menemukan link yang dipendekkan (misalnya dari Safelinku, Sfile, atau penyedia lainnya), lalu salin URL lengkapnya.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono text-sm font-bold text-emerald-400">
            2
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-100 mb-1">Tempel dan Klik Proses Bypass</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Masuk ke halaman{" "}
              <Link href="/bypass" className="text-emerald-400 hover:underline">
                Bypass Tool
              </Link>
              , tempel URL ke dalam kotak input, lalu klik tombol <strong>Proses Bypass</strong>.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono text-sm font-bold text-emerald-400">
            3
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-100 mb-1">Dapatkan dan Buka Link Final</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Tunggu beberapa detik saat sistem membaca tujuan asli. Link bersih akan muncul di kotak hasil, siap untuk langsung disalin atau dibuka.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="border-t border-zinc-800/80 pt-12">
        <h2 className="text-xl font-bold tracking-tight text-zinc-100 mb-6">Pertanyaan Umum (FAQ)</h2>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/60">
            <h3 className="text-sm font-semibold text-zinc-200 mb-1">Apakah layanan ini gratis?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ya, layanan ini gratis dan dapat digunakan tanpa perlu registrasi akun.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/60">
            <h3 className="text-sm font-semibold text-zinc-200 mb-1">Mengapa ada link yang gagal dibypass?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Beberapa penyedia shortlink sering memperbarui algoritma proteksi mereka atau link target sudah kedaluwarsa. Sistem API kami diperbarui berkala untuk menyesuaikan perubahan tersebut.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/60">
            <h3 className="text-sm font-semibold text-zinc-200 mb-1">Apakah aman dari malware?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Sangat aman. Proses pemotongan dilakukan di server API, sehingga browser pengguna tidak perlu memuat skrip iklan pihak ketiga yang berpotensi berbahaya.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
