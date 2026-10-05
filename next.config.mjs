/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Remote-work friendly: strict mode off? No — keep React strict.
  // These headers harden every deploy (preview + production) and
  // add the perf signals Google's Core Web Vitals reward.
  async headers() {
    return [
      {
        // Static assets: immutable cache (fonts, _next chunks)
        source: "/:all*(svg|jpg|jpeg|png|avif|webp|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

