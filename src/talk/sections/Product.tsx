import { Slide, Fragment } from "@revealjs/react";
import { Frame } from "../../components/Frame";
import { BRAND } from "../../viz/palette";
import { ScrumVsFactory } from "../../viz/ScrumVsFactory";

/* What happens to Product (Adam). Slides only: <Section> adds the title
   slide, the speaker chip on every Frame, and the return to the agenda. */
export function Product() {
  return (
    <>
      <WhatChanges />
      <AtFactorySpeed />
      <ProductEngineer />
    </>
  );
}

const CHANGES = ["Roadmap", "Backlog management", "Stakeholder management", "Sprint planning", "Release planning", "Bug triage", "Feature validation"];

const STAYS = [
  "Positioning & messaging",
  "Market research",
  "GTM strategy",
  "Storytelling",
  "Sales enablement",
  "Demand gen",
  "Customer lifecycle",
  "Pricing and packaging",
];

// Venn geometry (SVG units = slide px)
const W = 1060;
const H = 720;
const R = 350;
const D = 290; // distance between centres (more overlap = wider middle)
const CY = H / 2;
const CX1 = W / 2 - D / 2; // product
const CX2 = W / 2 + D / 2; // engineering

function WhatChanges() {
  const lh = 38;
  const listTop = CY - ((CHANGES.length - 1) * lh) / 2 + 30;
  return (
    <Slide>
      <Frame flush>
        <div style={{ display: "grid", height: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: `${W + 64}px 1fr`, minHeight: 0 }}>
            <div style={{ display: "flex", alignItems: "center", paddingLeft: 64, borderRight: "1px solid var(--line)" }}>
              <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Venn diagram of product and engineering; the overlap is what changes." style={{ display: "block", overflow: "visible" }}>
                <defs>
                  <clipPath id="venn-left">
                    <circle cx={CX1} cy={CY} r={R} />
                  </clipPath>
                </defs>

                <circle cx={CX1} cy={CY} r={R} fill="rgb(217 230 30 / 0.07)" stroke={BRAND.lime} strokeWidth={3} />
                <circle cx={CX2} cy={CY} r={R} fill="rgb(34 211 238 / 0.07)" stroke={BRAND.cyan} strokeWidth={3} />
                <VennLabel x={W / 2 - R} text="PRODUCT" color={BRAND.lime} />
                <VennLabel x={W / 2 + R} text="ENGINEERING" color={BRAND.cyan} />

                <Fragment asChild animation="fade-in">
                  <g>
                    {/* The overlap, filled: second circle clipped to the first */}
                    <circle cx={CX2} cy={CY} r={R} clipPath="url(#venn-left)" fill="rgb(236 72 153 / 0.22)" stroke={BRAND.pink} strokeWidth={3} />
                    <text x={W / 2} y={listTop - 58} textAnchor="middle" fill={BRAND.pink} fontSize={30} fontWeight={600} letterSpacing="0.16em" style={{ fontFamily: "var(--font-label)" }}>
                      CHANGES
                    </text>
                    {CHANGES.map((t, i) => (
                      <text key={t} x={W / 2} y={listTop + i * lh} textAnchor="middle" fill={BRAND.fg} fontSize={27} fontWeight={500}>
                        {t}
                      </text>
                    ))}
                  </g>
                </Fragment>
              </svg>
            </div>

            <Fragment animation="fade-up" asChild>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px" }}>
                <div className="hud" style={{ color: "var(--until-lime)" }}>
                  What stays
                </div>
                <div style={{ marginTop: 12, fontFamily: "var(--font-display)", fontSize: "var(--t-h3)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                  Product marketing
                </div>
                <ul style={{ listStyle: "none", margin: "28px 0 0", padding: 0, display: "grid", gap: 12 }}>
                  {STAYS.map((t) => (
                    <li key={t} style={{ display: "flex", gap: 16, alignItems: "baseline", fontSize: "var(--t-small)", color: "var(--fg)" }}>
                      <span className="mono" style={{ color: "var(--until-lime)" }}>
                        ✓
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Fragment>
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

function AtFactorySpeed() {
  return (
    <Slide>
      <Frame center>
        <ScrumVsFactory />
      </Frame>
    </Slide>
  );
}

function ProductEngineer() {
  return (
    <Slide>
      <Frame center grid>
        <h1 className="display display--mega">Product engineer</h1>
      </Frame>
    </Slide>
  );
}

function VennLabel({ x, text, color }: { x: number; text: string; color: string }) {
  return (
    <text x={x} y={CY + 12} textAnchor="middle" fill={color} fontSize={36} fontWeight={800} letterSpacing="-0.01em" style={{ fontFamily: "var(--font-display)" }}>
      {text}
    </text>
  );
}
