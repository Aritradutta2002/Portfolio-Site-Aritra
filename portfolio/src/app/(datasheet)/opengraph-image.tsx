import { ImageResponse } from "next/og";
import { HEADLINE_METRICS, PORTFOLIO_HEADER } from "@/data/portfolioCatalog";

export const alt = `${PORTFOLIO_HEADER.name}, ${PORTFOLIO_HEADER.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CANVAS = "#0A0A0B";
const INK = "#F4F4F5";
const MUTED = "#A1A1AA";
const FAINT = "#8A8A93";
const ACCENT = "#C8A46B";
const HAIRLINE = "rgba(255,255,255,0.14)";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: CANVAS,
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(211,171,99,0.18), rgba(10,10,11,0) 70%)",
          color: INK,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${HAIRLINE}`,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            AD
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: FAINT,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 10, background: ACCENT }} />
            {PORTFOLIO_HEADER.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 112,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            {PORTFOLIO_HEADER.name}
          </div>
          <div style={{ marginTop: 24, fontSize: 38, color: MUTED }}>
            {`${PORTFOLIO_HEADER.role} at ${PORTFOLIO_HEADER.company}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: `1px solid ${HAIRLINE}`,
            paddingTop: 28,
            gap: 72,
          }}
        >
          {HEADLINE_METRICS.map((metric) => (
            <div key={metric.label} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 16,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: FAINT,
                }}
              >
                {metric.label}
              </div>
              <div style={{ marginTop: 8, fontSize: 44, fontWeight: 600, color: ACCENT }}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
