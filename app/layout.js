import "./globals.css";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { IconSprite } from "@/components/Icon";
import RevealWatcher from "@/components/RevealWatcher";

// EDIT:DOMAIN — change this once and every canonical/OG/Twitter URL updates
const SITE_URL = "https://dkm-tau.vercel.app";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DKM — Websites for Small Businesses, Starting at $600",
    template: "%s — DKM",
  },
  description:
    "DKM designs and builds fast, professional websites for small businesses. Fixed quotes, no hidden fees — websites starting at $600, live in as little as two weeks.",
  robots: { index: true, follow: true },
  authors: [{ name: "DKM" }],
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

// Runs before first paint: no flash of the wrong theme
const themeInit = `(function(){try{var t=localStorage.getItem('dkm-theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.add('js')}catch(e){}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${instrumentSans.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <IconSprite />
        <RevealWatcher />
        {children}
      </body>
    </html>
  );
}
