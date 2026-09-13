import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kunalistic.io"),
  title: {
    default: "KUNALISTIC — One place. Every little tool.",
    template: "%s | Kunalistic",
  },
  description:
    "Your digital toolbox. Convert, compress, manipulate, calculate and create with a growing collection of privacy-first, in-browser tools. No subscriptions.",
  applicationName: "Kunalistic",
  authors: [{ name: "Kunal", url: "https://kunalistic.io" }],
  generator: "Next.js",
  keywords: [
    "digital toolbox",
    "image compressor",
    "pdf merger",
    "json formatter",
    "viral reel generator",
    "client-side tools",
    "kunalistic",
    "free online tools"
  ],
  alternates: {
    canonical: "https://kunalistic.io",
  },
  openGraph: {
    title: "KUNALISTIC — One place. Every little tool.",
    description: "Your digital toolbox. Free in-browser image, PDF, text, developer, student, and creator AI utilities.",
    url: "https://kunalistic.io",
    siteName: "Kunalistic",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KUNALISTIC — One place. Every little tool.",
    description: "Your digital toolbox with zero subscriptions.",
    creator: "@kunal",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#151130",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#151130] text-[#C8BEFA]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
