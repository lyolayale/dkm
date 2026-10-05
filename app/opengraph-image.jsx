import { ImageResponse } from "next/og";

// Dynamic OG image — generated at request time, no binary asset needed.
// 1200×630, works on every remote deploy without checking an image in.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          background: "#0f172a",
          color: "#f8fafc",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#fbbf24",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
          }}
        >
          DKM · Digital Keys &amp; Marketing
        </div>
        <div style={{ fontSize: 84, lineHeight: 1.05, marginTop: 24 }}>
          Websites for small businesses, starting at $600.
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 28,
            color: "#a8b3c5",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Atlanta-based · 100% remote nationwide · Live in ~2 weeks
        </div>
      </div>
    ),
    { ...size },
  );
}
