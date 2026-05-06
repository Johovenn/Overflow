import { ImageResponse } from "next/og";

import {
  getStereotypeById,
  stereotypes,
  type StereotypeId,
} from "@/lib/campaign-data";
import Image from "next/image";

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

// Lucide icon paths inlined (Satori renders SVG, but not lucide-react components)
const iconPaths: Record<string, React.ReactNode> = {
  Zap: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />,
  Music: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
  BookOpen: (
    <>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </>
  ),
  Utensils: (
    <>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </>
  ),
  Bed: (
    <>
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </>
  ),
  Camera: (
    <>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  Compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  Sparkles: (
    <>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </>
  ),
  Trophy: (
    <>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </>
  ),
  Wifi: (
    <>
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    </>
  ),
};

function Icon({
  name,
  size,
  color,
}: {
  name: string;
  size: number;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name] ?? iconPaths.Zap}
    </svg>
  );
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const type = (searchParams.get("type") ?? "pulse-energy") as StereotypeId;
  const stereotype = stereotypes[type] ?? stereotypes["pulse-energy"];
  const themeColor = stereotypeColors[stereotype.id];

  const compatible = stereotype.compatibleWith.map((id) => getStereotypeById(id));

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1920px",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient glow blobs to mimic the page */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: 9999,
            background: "rgba(0, 217, 255, 0.18)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: 9999,
            background: "rgba(57, 255, 20, 0.15)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        {/* Logo */}
        <Image
          src={`${origin}/overflow-logo.png`}
          alt="Overflow"
          width={320}
          height={100}
          style={{ objectFit: "contain" }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            textAlign: "center",
            marginTop: 40,
            lineHeight: 1.05,
          }}
        >
          {stereotype.name}
        </div>

        {/* Short description */}
        <div
          style={{
            fontSize: 38,
            fontStyle: "italic",
            textAlign: "center",
            marginTop: 24,
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.4,
            maxWidth: 880,
          }}
        >
          {stereotype.shortDescription}
        </div>

        {/* Big icon circle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 220,
            height: 220,
            borderRadius: 9999,
            border: `4px solid ${themeColor}`,
            background: "rgba(0,0,0,0.5)",
            boxShadow: `0 0 60px ${themeColor}66`,
            marginTop: 50,
          }}
        >
          <Icon name={stereotype.icon} size={110} color={themeColor} />
        </div>

        {/* Long description card */}
        <div
          style={{
            display: "flex",
            marginTop: 50,
            padding: "40px 50px",
            borderRadius: 36,
            border: `4px solid ${themeColor}`,
            background: "rgba(0,0,0,0.5)",
            boxShadow: `0 0 40px ${themeColor}40`,
            maxWidth: 920,
          }}
        >
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.92)",
              textAlign: "center",
            }}
          >
            {stereotype.longDescription}
          </div>
        </div>

        {/* Compatible roommates */}
        <div
          style={{
            fontSize: 32,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.8)",
            marginTop: 60,
          }}
        >
          Your Most Compatible Roommates Are
        </div>

        <div
          style={{
            display: "flex",
            gap: 50,
            marginTop: 36,
            justifyContent: "center",
          }}
        >
          {compatible.map((c) => {
            const cColor = stereotypeColors[c.id];
            return (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 220,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 120,
                    height: 120,
                    borderRadius: 9999,
                    border: `3px solid ${cColor}`,
                    background: "rgba(0,0,0,0.5)",
                    boxShadow: `0 0 30px ${cColor}55`,
                  }}
                >
                  <Icon name={c.icon} size={56} color={cColor} />
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    textAlign: "center",
                    marginTop: 16,
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.25,
                  }}
                >
                  {c.name}
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