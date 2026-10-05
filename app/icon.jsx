import { ImageResponse } from "next/og";

// Crisp vector-style favicon / app icon rendered from code —
// no more 25 KB .ico binary, sharp on every screen.
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          borderRadius: 112,
          color: "#f8fafc",
          fontSize: 300,
          fontFamily: "Georgia, serif",
          fontWeight: 700,
        }}
      >
        D<span style={{ color: "#fbbf24" }}>.</span>
      </div>
    ),
    { ...size },
  );
}
