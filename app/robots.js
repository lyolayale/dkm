import { IS_PRODUCTION } from "@/lib/site";

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
    sitemap: "https://digitalkeysandmarketing.com/sitemap.xml",
  };
}
