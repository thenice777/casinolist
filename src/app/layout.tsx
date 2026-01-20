import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CompareProvider } from "@/components/compare/CompareContext";
import CompareBar from "@/components/compare/CompareBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://casinolist.io"),
  title: {
    default: "CasinoList.io - Know the House | Casino Discovery Worldwide",
    template: "%s | CasinoList.io",
  },
  description:
    "Discover the best online casinos and land-based casinos worldwide. Compare bonuses, read expert reviews, and find verified casinos near you. Know the House.",
  keywords: [
    "online casinos",
    "land-based casinos",
    "casino reviews",
    "casino bonuses",
    "gambling",
    "casino ratings",
    "Las Vegas casinos",
    "Macau casinos",
    "casino comparison",
  ],
  authors: [{ name: "CasinoList.io" }],
  creator: "CasinoList.io",
  publisher: "CasinoList.io",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "CasinoList.io - Know the House | Casino Discovery Worldwide",
    description:
      "Discover the best online casinos and land-based casinos worldwide. Compare bonuses, read expert reviews, and find verified casinos.",
    url: "https://casinolist.io",
    siteName: "CasinoList.io",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CasinoList.io - Know the House",
    description:
      "Discover the best online casinos and land-based casinos worldwide. Compare bonuses and read expert reviews.",
  },
  category: "gambling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CompareProvider>
          {children}
          <CompareBar />
        </CompareProvider>
      </body>
    </html>
  );
}
