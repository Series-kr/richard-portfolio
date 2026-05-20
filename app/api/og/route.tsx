import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get("title") || "Richard Korankye"
  const type = searchParams.get("type") || "site"
  const category = searchParams.get("category") || ""

  return new ImageResponse(
    (
      <div
        style={{
          background: "#080B10",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(#1C2330 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.6,
          }}
        />

        {/* Teal glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(0,212,168,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#45f1c3",
              letterSpacing: "-0.02em",
            }}
          >
            RK
          </div>
          {category && (
            <div
              style={{
                background: "rgba(69,241,195,0.1)",
                border: "1px solid rgba(69,241,195,0.2)",
                color: "#45f1c3",
                fontSize: 12,
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 20,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {category}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          {type === "blog" && (
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#45f1c3",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Blog Post
            </div>
          )}
          <div
            style={{
              fontSize: title.length > 60 ? 44 : 56,
              fontWeight: 800,
              color: "#d9e3f7",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#bacac2",
              fontWeight: 400,
            }}
          >
            richardkorankye.dev · Senior Full Stack Engineer · Accra, Ghana
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #45f1c3, #00d4a8, transparent)",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
