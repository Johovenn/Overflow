import { ImageResponse } from "next/og";

import {
  stereotypes,
  type StereotypeId,
} from "@/lib/campaign-data";

export const runtime = "edge";

const stereotypeColors: Record<StereotypeId, string> = {
  "pulse-energy": "#00D9FF",
  "harmony-fan": "#39FF14",
  "deep-listeners": "#00D9FF",
  "fuel-squad": "#FFC400",
  "sloth-supremacy": "#BF00FF",
  shutterbug: "#00D9FF",
  pathfinders: "#39FF14",
  "high-maintenance-peeps": "#FFC400",
  "ambis-arc": "#39FF14",
  "human-wifi": "#00D9FF",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const type = (
    searchParams.get("type") ?? "pulse-energy"
  ) as StereotypeId;

  const stereotype =
    stereotypes[type] ??
    stereotypes["pulse-energy"];

  const themeColor =
    stereotypeColors[stereotype.id];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1920px",
          background:
            "radial-gradient(circle at top left, rgba(0,217,255,0.18), transparent 28%), radial-gradient(circle at top right, rgba(57,255,20,0.14), transparent 30%), radial-gradient(circle at bottom center, rgba(191,0,255,0.10), transparent 28%), #000000",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "90px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Noise overlay feel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              "radial-gradient(#ffffff 0.8px, transparent 0.8px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#B9FF66",
            marginBottom: 40,
            letterSpacing: "-2px",
          }}
        >
          OVERFLOW
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          {stereotype.name}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 42,
            opacity: 0.78,
            textAlign: "center",
            fontStyle: "italic",
            marginBottom: 70,
            maxWidth: "850px",
            lineHeight: 1.4,
          }}
        >
          {stereotype.shortDescription}
        </div>

        {/* Main Icon Circle */}
        <div
          style={{
            width: 250,
            height: 250,
            borderRadius: "9999px",
            border: `6px solid ${themeColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.45)",
            boxShadow: `0 0 40px ${themeColor}`,
            marginBottom: 70,
          }}
        >
          <div
            style={{
              fontSize: 110,
              color: themeColor,
            }}
          >
            ✦
          </div>
        </div>

        {/* Description Card */}
        <div
          style={{
            width: "100%",
            borderRadius: 38,
            border: `4px solid ${themeColor}`,
            background: "rgba(0,0,0,0.45)",
            padding: "50px",
            boxShadow: `0 0 28px ${themeColor}55`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.7,
              opacity: 0.92,
              textAlign: "center",
            }}
          >
            {stereotype.longDescription}
          </div>
        </div>

        {/* Compatibility */}
        <div
          style={{
            marginTop: 70,
            fontSize: 32,
            fontStyle: "italic",
            opacity: 0.82,
            textAlign: "center",
          }}
        >
          Your Most Compatible Roommates
        </div>

        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 28,
          }}
        >
          {stereotype.compatibleWith.map((id) => {
            const compatible =
              stereotypes[id];

            const compatibleColor =
              stereotypeColors[id];

            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 160,
                }}
              >
                <div
                  style={{
                    width: 92,
                    height: 92,
                    borderRadius: "9999px",
                    border: `4px solid ${compatibleColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 18px ${compatibleColor}`,
                    marginBottom: 14,
                    background:
                      "rgba(0,0,0,0.4)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 42,
                      color: compatibleColor,
                    }}
                  >
                    ✦
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 22,
                    textAlign: "center",
                    lineHeight: 1.3,
                    opacity: 0.88,
                  }}
                >
                  {compatible.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
    }
  );
}