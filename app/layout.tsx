import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google"; // Import font baru
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Font Tulisan Tangan (Buat Judul/Nama)
const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-dancing", // Kita kasih nama variabel biar bisa dipanggil di Tailwind
});

export const metadata: Metadata = {
  title: "Happy Birthday My Love",
  description: "Special surprise for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Masukkan variabel font ke body */}
      <body className={`${inter.className} ${dancingScript.variable}`}>{children}</body>
    </html>
  );
}