import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Disclosure } from "@/components/layout/Disclosure";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Best U.S. Immigration Services 2026 | US Immigration Authority",
    template: "%s | US Immigration Authority",
  },
  description:
    "Independent, expert-reviewed rankings of the top U.S. immigration service providers. Fact-checked by legal professionals and updated monthly with full editorial transparency.",
  applicationName: "US Immigration Authority",
  authors: [{ name: "US Immigration Authority Editorial Board" }],
  keywords: [
    "immigration services",
    "US immigration",
    "visa services",
    "green card",
    "immigration attorneys",
    "USCIS",
    "immigration rankings",
  ],
  openGraph: {
    siteName: "US Immigration Authority",
    title: "Best U.S. Immigration Services 2026 | US Immigration Authority",
    description:
      "Independent, expert-reviewed rankings of the top U.S. immigration service providers. Updated monthly.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best U.S. Immigration Services 2026 | US Immigration Authority",
    description:
      "Independent, expert-reviewed rankings of the top U.S. immigration service providers.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans antialiased bg-surface-primary text-slate-700">
        <Disclosure />
        <Navbar />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
