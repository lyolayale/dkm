import "./globals.css";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { IconSprite } from "@/components/Icon";
import RevealWatcher from "@/components/RevealWatcher";
import { SITE_URL } from "@/lib/site";

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

// ── Best-practice metadata: single canonical, keyword-rich but natural,
// full Open Graph + Twitter, crawler directives, and PWA hooks ──
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Web Design Atlanta & Nationwide | Small Business Websites from $600 — DKM",
    template: "%s — DKM · Digital Keys & Marketing",
  },
  description:
    "DKM (Digital Keys & Marketing) designs fast, SEO-ready websites for small businesses — Atlanta-based, working 100% remote nationwide. Fixed quotes from $600, live in as little as two weeks. Design, build, consulting & automation included.",
  keywords: [
    "web design Atlanta",
    "Atlanta web designer",
    "small business websites",
    "affordable web design",
    "website design starting at $600",
    "remote web designer",
    "nationwide web design services",
    "small business marketing consulting",
    "Next.js web development",
    "SEO-ready websites",
    "business automation n8n",
    "Digital Keys & Marketing",
    "DKM",
  ],
  authors: [{ name: "Digital Keys & Marketing", url: SITE_URL }],
  creator: "Digital Keys & Marketing",
  publisher: "Digital Keys & Marketing",
  category: "Web design & small business marketing",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "DKM · Digital Keys & Marketing",
    locale: "en_US",
    url: "/",
    title: "Websites for Small Businesses, Starting at $600 — DKM",
    description:
      "Atlanta-based, remote nationwide. Design, build, and launch — fixed quotes from $600, live in as little as two weeks.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DKM — Websites Starting at $600 · Atlanta + Remote Nationwide",
    description:
      "Fast, professional, SEO-ready websites for small businesses. Fixed quotes, no hidden fees.",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  // Search-Console verification: paste IDs into Vercel env (see .env.example)
  // and uncomment — empty strings would emit invalid meta tags, so we omit them.
  // verification: {
  //   google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  //   other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "" },
  // },
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

