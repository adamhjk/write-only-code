import { Slide } from "@revealjs/react";
import { Frame, Kicker } from "../components/Frame";
import { FlowDiagram } from "../viz/FlowDiagram";
import { LineChart, type Series } from "../viz/LineChart";
import { DATA } from "../viz/palette";

/* Layout: DIAGRAM — title row + full-width d3 figure. */
export function DiagramSlide() {
  return (
    <Slide notes="Let the animation run once before talking. Point at the dashed loop last.">
      <Frame section="architecture" speaker="both">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40 }}>
          <h2>From issue to decision</h2>
          <Kicker>how it fits</Kicker>
        </div>
        <FlowDiagram />
      </Frame>
    </Slide>
  );
}

// Sample data: 24 weeks of merged PRs by author type.
const WEEKS = Array.from({ length: 24 }, (_, i) => `wk ${String(i + 1).padStart(2, "0")}`);
const ramp = (start: number, end: number, wobble: number, seed: number) =>
  WEEKS.map((_, i) => {
    const t = i / (WEEKS.length - 1);
    const eased = t * t * (3 - 2 * t);
    return Math.max(0, Math.round(start + (end - start) * eased + Math.sin(i * 1.7 + seed) * wobble));
  });

const SERIES: Series[] = [
  { key: "until", label: "Agents via Until", color: DATA.lime, values: ramp(12, 410, 14, 1) },
  { key: "swamp", label: "Agents via Swamp", color: DATA.cyan, values: ramp(4, 260, 10, 3) },
  { key: "human", label: "Humans", color: DATA.pink, values: ramp(220, 150, 12, 5) },
];

/* Layout: CHART — title + one-line takeaway + d3 line chart. */
export function ChartSlide() {
  return (
    <Slide notes="Hover the chart to show any week. The crossover is around week 12.">
      <Frame section="adoption" speaker="dylan" footer={<span>Sample data — replace before the talk</span>}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 12 }}>
          <div>
            <h2>Agents passed humans in week 12</h2>
            <p className="muted" style={{ marginTop: 12, fontSize: "var(--t-body)" }}>
              Merged PRs per week, by author
            </p>
          </div>
          <Kicker>sample data</Kicker>
        </div>
        <LineChart series={SERIES} xLabels={WEEKS} yLabel="merged PRs / week" height={620} />
      </Frame>
    </Slide>
  );
}
