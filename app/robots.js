import { IS_PRODUCTION, SITE_URL } from "@/lib/site";

// Remote-deploy safe robots:
//  • Production  → index everything, point at the sitemap.
//  • Preview / branch deploys (Vercel) → noindex so staging URLs
//    never compete with the canonical domain in Google.
export default function robots() {
  if (!IS_PRODUCTION) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
