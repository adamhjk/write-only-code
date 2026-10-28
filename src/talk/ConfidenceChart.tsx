import { useEffect } from "react";
import * as d3 from "d3";
import { BRAND, DATA } from "../viz/palette";
import { useSlideActive } from "../components/useSlideActive";

/** One week of sampling: `ok` judged correct by a human, `miss` = something the bot missed. */
export type SampleWeek = { week: string; ok: number; miss: number };

type Props = { weeks: SampleWeek[]; width?: number; height?: number };

const M = { top: 40, right: 330, bottom: 64, left: 110 };
const PCT = d3.format(".0%");

/** 95% Wilson score interval for k successes in n trials. */
function wilson(k: number, n: number, z = 1.96): [number, number] {
  const p = k / n;
  const d = 1 + (z * z) / n;
  const c = (p + (z * z) / (2 * n)) / d;
  const h = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / d;
  return [c - h, c + h];
}

// Inputs must be referentially stable (module constants or memoized) — the
// draw-in animation replays whenever they change.

/**
 * Cumulative share of sampled PRs judged correct, with its 95% confidence
 * band. Draws left to right when the slide becomes active; misses are marked.
 */
export function ConfidenceChart({ weeks, width = 1728, height = 600 }: Props) {
  const [ref, active] = useSlideActive<SVGSVGElement>();

  useEffect(() => {
    const svg = d3.select(ref.current!);
    svg.selectAll("*").remove();
    if (!active) return;

    const iw = width - M.left - M.right;
    const ih = height - M.top - M.bottom;

    let ok = 0;
    let n = 0;
    const pts = weeks.map((w) => {
      ok += w.ok;
      n += w.ok + w.miss;
      const [lo, hi] = wilson(ok, n);
      return { date: new Date(w.week), p: ok / n, lo, hi, n, miss: w.miss };
    });

    const x = d3
      .scaleTime()
      .domain(d3.extent(pts, (d) => d.date) as [Date, Date])
      .range([0, iw]);
    const y = d3.scaleLinear().domain([0, 1]).range([ih, 0]);

    const g = svg.append("g").attr("transform", `translate(${M.left},${M.top})`);

    g.append("g")
      .attr("class", "fig-grid")
      .call(d3.axisLeft(y).ticks(5).tickSize(-iw).tickFormat(() => ""));
    g.append("g")
      .attr("class", "fig-axis")
      .call(d3.axisLeft(y).ticks(5).tickSize(0).tickPadding(20).tickFormat((d) => PCT(+d)))
      .call((a) => a.select(".domain").remove());
    g.append("g")
      .attr("class", "fig-axis")
      .attr("transform", `translate(0,${ih})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeMonth.every(1))
          .tickSize(0)
          .tickPadding(24)
          .tickFormat((d) => d3.timeFormat("%b")(d as Date)),
      );

    // Everything data-driven sits under a clip that wipes in left to right.
    const DRAW = 2000;
    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "confidence-wipe")
      .append("rect")
      .attr("x", -20)
      .attr("y", -40)
      .attr("width", 0)
      .attr("height", ih + 60)
      .transition()
      .duration(DRAW)
      .ease(d3.easeCubicInOut)
      .attr("width", iw + 40);

    const data = g.append("g").attr("clip-path", "url(#confidence-wipe)");

    const band = d3
      .area<(typeof pts)[number]>()
      .x((d) => x(d.date))
      .y0((d) => y(d.lo))
      .y1((d) => y(d.hi))
      .curve(d3.curveMonotoneX);
    const line = d3
      .line<(typeof pts)[number]>()
      .x((d) => x(d.date))
      .y((d) => y(d.p))
      .curve(d3.curveMonotoneX);

    data.append("path").datum(pts).attr("d", band).attr("fill", DATA.lime).attr("opacity", 0.22);
    data
      .append("path")
      .datum(pts)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", DATA.lime)
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round");
    data
      .append("g")
      .selectAll("circle")
      .data(pts)
      .join("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.p))
      .attr("r", 6)
      .attr("fill", DATA.lime)
      .attr("stroke", BRAND.ink1)
      .attr("stroke-width", 2);

    // Misses: pink ring + direct label.
    const misses = data.append("g").selectAll("g").data(pts.filter((d) => d.miss > 0)).join("g");
    misses
      .append("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.p))
      .attr("r", 13)
      .attr("fill", "none")
      .attr("stroke", DATA.pink)
      .attr("stroke-width", 3);
    misses
      .append("text")
      .attr("x", (d) => x(d.date) + 24)
      .attr("y", (d) => y(d.p) + 44)
      .attr("fill", DATA.pink)
      .attr("font-size", 30)
      .attr("font-weight", 600)
      .text((d) => (d.miss === 1 ? "1 miss" : `${d.miss} misses`));

    // End label: where confidence stands now.
    const last = pts[pts.length - 1];
    const end = g
      .append("g")
      .attr("transform", `translate(${x(last.date) + 28},${y(last.p)})`)
      .attr("opacity", 0);
    end.append("text").attr("y", 0).attr("fill", BRAND.fg).attr("font-size", 44).attr("font-weight", 700).text(PCT(last.p));
    end
      .append("text")
      .attr("y", 40)
      .attr("fill", BRAND.fg2)
      .attr("font-size", 30)
      .text(`after ${last.n} samples`);
    end.transition().delay(DRAW).duration(500).attr("opacity", 1);

    return () => {
      svg.selectAll("*").interrupt();
    };
  }, [active, weeks, width, height, ref]);

  return (
    <div className="figure" style={{ width, height }}>
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Share of sampled PRs judged correct over time, with a narrowing 95% confidence band"
      />
    </div>
  );
}
