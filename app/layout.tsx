import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Work_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/ui/Navbar";
import EntryModal from "@/app/ui/EntryModal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NaturaMed — Healing Knowledge, Rediscovered",
  description:
    "Ancestral healing knowledge, brought into the digital age. Find natural remedies for common health conditions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${notoSerif.variable} ${dmSans.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-surface text-on-surface">
        <Navbar />
        <EntryModal />
        {children}
      </body>
    </html>
  );
}
