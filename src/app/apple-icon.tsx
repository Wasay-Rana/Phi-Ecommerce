import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#C7F536",
          fontFamily: "system-ui, sans-serif",
          fontSize: 96,
          fontWeight: 700,
          color: "#15160F",
        }}
      >
        e
      </div>
    ),
    { ...size }
  );
}
