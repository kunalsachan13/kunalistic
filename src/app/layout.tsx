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
    default: "Kunalistic — Bespoke Software & 3D Motion Studio",
    template: "%s | Kunalistic — 3D Motion & Software Labs",
  },
  description: "Independent creative technology studio directed by Kunal. Architecting production web software, tactile 3D interactive experiences, and fluid motion graphics.",
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
  keywords: ["3D motion graphics", "web applications", "kunal", "kunalistic", "creative engineering", "digital products", "custom development", "SaaS MVP", "cinematic UI"],
  openGraph: {
    title: "Kunalistic — Bespoke Software & 3D Motion Studio",
    description: "Independent creative technology studio directed by Kunal. Architecting production web software, tactile 3D interactive experiences, and fluid motion graphics.",
    url: "https://kunalistic.com",
    siteName: "Kunalistic",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "Kunalistic Logo" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunalistic — Bespoke Software & 3D Motion Studio",
    description: "Independent creative technology studio directed by Kunal. Architecting production web software, tactile 3D interactive experiences, and fluid motion graphics.",
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
