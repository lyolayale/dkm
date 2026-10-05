import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Consulting from "@/components/Consulting";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { FAQ_ITEMS } from "@/lib/faq";
import { SITE_URL, CONTACT, SOCIALS } from "@/lib/site";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "DKM · Digital Keys & Marketing",
    locale: "en_US",
    title: "Websites for Small Businesses, Starting at $600 — DKM",
    description:
      "Atlanta-based, working 100% remote nationwide. Design, build, and launch — fixed quotes from $600, live in as little as two weeks.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "DKM — Websites Starting at $600 · Atlanta + Remote Nationwide",
    description:
      "Fast, professional, SEO-ready websites for small businesses. Fixed quotes, no hidden fees.",
  },
};

// Structured data: ProfessionalService (local + remote) + WebSite + Services + FAQ
// FAQ answers come from lib/faq.js so the page and Google schema never drift.
// Address / phone / email come from lib/site.js — single source, no drift.
const socialLinks = Object.values(SOCIALS).filter(Boolean);
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "Digital Keys & Marketing",
      alternateName: "DKM",
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/opengraph-image`,
      description:
        "Atlanta-based web design & marketing consulting studio working 100% remote nationwide. Fast, SEO-ready small business websites from $600, plus business structure, documentation, and outreach consulting.",
      priceRange: "$600 - $3000+",
      telephone: CONTACT.phoneTel,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.street,
        addressLocality: CONTACT.city,
        addressRegion: CONTACT.region,
        postalCode: CONTACT.postal,
        addressCountry: CONTACT.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: CONTACT.geo.latitude,
        longitude: CONTACT.geo.longitude,
      },
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.full)}`,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      areaServed: [
        {
          "@type": "City",
          name: "Atlanta",
          containedInPlace: { "@type": "State", name: "Georgia" },
        },
        { "@type": "Country", name: "United States" },
      ],
      ...(socialLinks.length ? { sameAs: socialLinks } : {}),
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Small business website design & development",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: 600,
            maxPrice: 3000,
          },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Marketing & business consulting" },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: 65,
            maxPrice: 850,
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "DKM · Digital Keys & Marketing",
      alternateName: "DKM",
      url: `${SITE_URL}/`,
      publisher: { "@id": `${SITE_URL}/#business` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Web Design Atlanta & Nationwide | Small Business Websites from $600 — DKM",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      primaryImageOfPage: `${SITE_URL}/opengraph-image`,
      inLanguage: "en-US",
    },
    {
      "@type": "Service",
      name: "Website design and development",
      serviceType: "Web design & development",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: "Worldwide",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "600",
        highPrice: "3000",
        offerCount: "3",
      },
    },
    {
      "@type": "Service",
      name: "Marketing & business consulting for small businesses",
      serviceType: "Business consulting & client outreach",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: "Worldwide",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "65",
        highPrice: "850",
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-accent-bright focus:px-4 focus:py-2.5 focus:font-semibold focus:text-slate-900"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Consulting />
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
