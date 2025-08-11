export const runtime = "edge";

import { ImageResponse } from "next/og";

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const locale = (searchParams.get("locale") || "en").toLowerCase();
  const title =
    searchParams.get("title") ||
    (locale === "zh" ? "Ricky 的作品" : "Ricky’s Work");
  const subtitle =
    searchParams.get("subtitle") ||
    (locale === "zh" ? "全端開發 / Next.js" : "Full-stack / Next.js");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0B1220",
          color: "white",
          padding: 64,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 44, opacity: 0.85 }}>
          {locale === "zh" ? "作品集" : "Portfolio"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ fontSize: 34, opacity: 0.9 }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 32, opacity: 0.8 }}>
          Ricky Lau · rickylau.dev
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT }
  );
}
