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
  title: {
    default: "CasinoList.io - Find Online & Land-Based Casinos Worldwide",
    template: "%s | CasinoList.io",
  },
  description:
    "Discover the best online casinos and land-based casinos worldwide. Compare bonuses, read reviews, and find casinos near you.",
  keywords: [
    "online casinos",
    "land-based casinos",
    "casino reviews",
    "casino bonuses",
    "gambling",
  ],
  openGraph: {
    title: "CasinoList.io - Find Online & Land-Based Casinos Worldwide",
    description:
      "Discover the best online casinos and land-based casinos worldwide.",
    url: "https://casinolist.io",
    siteName: "CasinoList.io",
    type: "website",
  },
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
