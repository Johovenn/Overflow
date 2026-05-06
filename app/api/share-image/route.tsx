import { ImageResponse } from "next/og";
import { stereotypes, type StereotypeId } from "@/lib/campaign-data";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = (searchParams.get("type") ?? "pulse-energy") as StereotypeId;
  const stereotype = stereotypes[type] ?? stereotypes["pulse-energy"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1920px",
          background: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 110, fontWeight: 900, textAlign: "center" }}>
          {stereotype.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 30, opacity: 0.8, textAlign: "center" }}>
          {stereotype.shortDescription}
        </div>
        {/* add more visual elements to match your card */}
        <div style={{ fontSize: 36, marginTop: 60, fontWeight: 700 }}>
          @jcyouthcampck7
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}