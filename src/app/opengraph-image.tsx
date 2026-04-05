import { ImageResponse } from "next/og";

export const alt = "Dress Code – Check Your Outfit Colors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#faf9f7",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: 120,
            right: 120,
            width: 240,
            height: 240,
            borderRadius: "50%",
            backgroundColor: "#e0e4d6",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 280,
            right: 60,
            width: 160,
            height: 160,
            borderRadius: "50%",
            backgroundColor: "#fde7d3",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 320,
            right: 260,
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "#ffddb6",
            opacity: 0.4,
          }}
        />

        {/* Icon */}
        <div
          style={{
            display: "flex",
            marginBottom: 40,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#5b6055" />
            <path
              d="M16 7L7 12l9 5 9-5-9-5z"
              fill="none"
              stroke="#f5faea"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M7 21l9 5 9-5"
              fill="none"
              stroke="#f5faea"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 16.5l9 5 9-5"
              fill="none"
              stroke="#f5faea"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#2f3331",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Dress Code
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#5c605d",
            lineHeight: 1.4,
          }}
        >
          Check if your outfit matches the event palette.
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: 120,
            height: 4,
            backgroundColor: "#5b6055",
            borderRadius: 2,
            marginTop: 40,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
