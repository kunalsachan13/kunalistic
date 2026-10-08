import type { Metadata } from "next";
import { Syne, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kunalistic.com"),
  title: {
    default: "Kunalistic — Bespoke Web Applications & Software Studio",
    template: "%s | Kunalistic — Bespoke Software Labs",
  },
  description: "Curated digital artifacts and bespoke web applications architected by Kunal. Explore live software showcases and commission tailored software MVPs.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  keywords: ["web applications", "kunal", "kunalistic", "software studio", "digital products", "custom development", "portfolio", "SaaS MVP"],
  openGraph: {
    title: "Kunalistic — Bespoke Software Labs",
    description: "Curated digital artifacts and bespoke web applications architected by Kunal. Explore live software showcases and commission tailored software MVPs.",
    url: "https://kunalistic.com",
    siteName: "Kunalistic",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "Kunalistic Logo" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunalistic — Bespoke Software Labs",
    description: "Curated digital artifacts and bespoke web applications architected by Kunal.",
    images: ["/icon.png"],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${spaceGrotesk.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[#08080a] text-[#f4f4f6] selection:bg-white selection:text-black flex flex-col"
        suppressHydrationWarning
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
