import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "DKM",
    title: "DKM — Websites for Small Businesses, Starting at $600",
    description:
      "Design, build, and launch — everything included. Fixed quotes from $600, live in as little as two weeks.",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DKM — websites starting at $600",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DKM — Websites Starting at $600",
    description:
      "Fast, professional websites for small businesses. Fixed quotes, no hidden fees.",
    images: ["/og.png"],
  },
};

// Structured data: Organization + WebSite + Service (with $600) + FAQ
// FAQ answers come from lib/faq.js so the page and Google schema can never drift apart
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "DKM",
      url: "/",
      email: "hello@dkmstudio.co", // EDIT:EMAIL
    },
    { "@type": "WebSite", name: "DKM", url: "/" },
    {
      "@type": "Service",
      name: "Website design and development",
      serviceType: "Web design & development",
      areaServed: "Worldwide",
      provider: { "@type": "Organization", name: "DKM" },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "600",
        highPrice: "3000",
        offerCount: "3",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map(item => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Process />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
