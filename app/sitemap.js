import { SITE_URL } from "@/lib/site";

// Sitemap: single-page site with deep anchor sections.
// Each anchor gets its own URL entry so Google can surface
// "Pricing", "FAQ", etc. as sitelinks / jump links.
const SECTIONS = [
  { anchor: "", priority: 1.0, changeFrequency: "weekly" },
  { anchor: "#services", priority: 0.8, changeFrequency: "monthly" },
  { anchor: "#consulting", priority: 0.8, changeFrequency: "monthly" },
  { anchor: "#process", priority: 0.6, changeFrequency: "monthly" },
  { anchor: "#pricing", priority: 0.9, changeFrequency: "weekly" },
  { anchor: "#estimator", priority: 0.8, changeFrequency: "weekly" },
  { anchor: "#faq", priority: 0.8, changeFrequency: "weekly" },
  { anchor: "#contact", priority: 0.9, changeFrequency: "monthly" },
];

export default function sitemap() {
  const now = new Date();
  return SECTIONS.map(s => ({
    url: `${SITE_URL}/${s.anchor}`,
    lastModified: now,
    changeFrequency: s.changeFrequency,
    priority: s.priority,
  }));
}
