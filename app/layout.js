import "./globals.css";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { IconSprite } from "@/components/Icon";
import RevealWatcher from "@/components/RevealWatcher";

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
  variable: "--font-instrument",
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

const themeInit = `(function(){try{var t=localStorage.getItem('dkm-theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.add('js')}catch(e){}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${instrumentSans.variable} bg-bg font-sans
        text-[16.5px] leading-[1.6] text-ink antialiased transition-colors duration-[350ms]`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <IconSprite />
        <RevealWatcher />
        {children}
      </body>
    </html>
  );
}
