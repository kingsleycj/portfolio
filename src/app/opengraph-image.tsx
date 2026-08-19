import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";

export const alt = `${profile.name} — Software Engineer / AI Systems`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, generated at build time.
 *
 * Deliberately uses the bundled default typeface rather than fetching Bricolage:
 * Satori can't read WOFF2, so a custom face would mean shipping a TTF and a
 * network fetch during build for a 1200×630 image nobody reads closely. The
 * palette and layout carry the identity instead.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FBF7F0",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Organic washes, echoing the site's blob field. */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -160,
            width: 640,
            height: 640,
            borderRadius: "50%",
            backgroundColor: "#FAE7DE",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: "50%",
            backgroundColor: "#DFEEE8",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 4,
              backgroundColor: "#D2502A",
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#A63A18",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 128,
              lineHeight: 1,
              letterSpacing: -4,
              color: "#1A1512",
              fontWeight: 700,
            }}
          >
            {profile.name}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 28,
              fontSize: 40,
            }}
          >
            <span style={{ color: "#1A1512" }}>Software Engineer</span>
            <span style={{ color: "#D2502A" }}>/</span>
            <span style={{ color: "#14705C" }}>AI Systems</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#6E6157",
          }}
        >
          <span>Backends · payment rails · AI infrastructure</span>
          <span>{profile.location}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
