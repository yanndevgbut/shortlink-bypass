import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lompat — Lewati gerbang iklan, langsung ke tujuan",
  description: "Tempel tautan yang dikunci timer, captcha, dan tiga lapis iklan. Dapatkan alamat tujuannya dalam hitungan detik.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
