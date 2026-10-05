// Central SEO + contact source of truth.
// Canonical domain: https://digitalkeysandmarketing.com
// Hybrid model: Atlanta base, serving clients nationwide (100% remote delivery).
//
// SITE_URL resolution order (remote-deploy safe):
//  1. NEXT_PUBLIC_SITE_URL (explicit production domain — set in Vercel)
//  2. VERCEL_PROJECT_PRODUCTION_URL (Vercel production host, no protocol)
//  3. VERCEL_URL (preview / branch deploy host — keeps previews self-canonical,
//     never leaking preview URLs into the production index)
//  4. Fallback: production domain.

const PRODUCTION_URL = "https://digitalkeysandmarketing.com";

function resolveSiteUrl() {
  const explicit = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const prod = (process.env.VERCEL_PROJECT_PRODUCTION_URL || "").trim();
  if (prod) return `https://${prod.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;

  const preview = (process.env.VERCEL_URL || "").trim();
  if (preview) return `https://${preview.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;

  return PRODUCTION_URL;
}

export const SITE_URL = resolveSiteUrl();
export const IS_PRODUCTION =
  SITE_URL === PRODUCTION_URL || SITE_URL.includes("digitalkeysandmarketing");

export const SITE_NAME = "DKM";
export const SITE_FULL_NAME = "Digital Keys & Marketing";
export const SITE_TAGLINE = "Websites for Small Businesses, Starting at $600";

export const CONTACT = {
  phoneDisplay: "(555) 123-4567",
  phoneTel: "+15551234567",
  email: "admin@digitalkeysandmarketing.com",
  // Single address source — Contact + Footer + JSON-LD all read from here.
  street: "2084 Faulkner Rd NE, Suite B",
  city: "Atlanta",
  region: "GA",
  postal: "30324",
  country: "US",
  get full() {
    return `${this.street}, ${this.city}, ${this.region} ${this.postal}`;
  },
  // Approx. coords for Faulkner Rd NE, Atlanta (LocalBusiness geo).
  geo: { latitude: 33.8183, longitude: -84.3321 },
};

export const SOCIALS = {
  // EDIT: add real profile URLs when they exist — empty strings are omitted
  // from JSON-LD automatically so Google never sees a placeholder link.
  instagram: "",
  facebook: "",
  linkedin: "",
  x: "",
};

export function absoluteUrl(path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
