import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { BRAND } from "./palette";
import { useSlideActive } from "../components/useSlideActive";

export type Series = { key: string; label: string; color: string; values: number[] };

type Props = {
  series: Series[];
  /** x-axis tick labels, one per value index */
  xLabels: string[];
  yLabel: string;
  width?: number;
  height?: number;
  format?: (n: number) => string;
};

const COMMA = d3.format(",");

const M = { top: 40, right: 270, bottom: 64, left: 96 };

type Hover = { i: number; x: number; y: number } | null;

// Inputs must be referentially stable (module constants or memoized) — the
// draw-in animation replays whenever they change.

/**
 * Multi-series line chart: draws in when the slide becomes active, direct
 * labels at line ends, crosshair + tooltip on hover. One y-axis, always.
 */
export function LineChart({ series, xLabels, yLabel, width = 1728, height = 640, format = COMMA }: Props) {
  const [ref, active] = useSlideActive<SVGSVGElement>();
  const [hover, setHover] = useState<Hover>(null);
  const scales = useRef<{ x: d3.ScaleLinear<number, number>; y: d3.ScaleLinear<number, number> } | null>(null);

  const iw = width - M.left - M.right;
  const ih = height - M.top - M.bottom;
  const n = xLabels.length;

  useEffect(() => {
    const svg = d3.select(ref.current!);
    svg.selectAll("*").remove();
    if (!active) return;

    const x = d3.scaleLinear().domain([0, n - 1]).range([0, iw]);
    const yMax = d3.max(series, (s) => d3.max(s.values))!;
    const y = d3.scaleLinear().domain([0, yMax]).nice().range([ih, 0]);
    scales.current = { x, y };

    const g = svg.append("g").attr("transform", `translate(${M.left},${M.top})`);

    // Recessive grid + axes
    g.append("g")
      .attr("class", "fig-grid")
      .call(d3.axisLeft(y).ticks(5).tickSize(-iw).tickFormat(() => ""));

    g.append("g")
      .attr("class", "fig-axis")
      .call(d3.axisLeft(y).ticks(5).tickSize(0).tickPadding(20).tickFormat((d) => format(+d)))
      .call((a) => a.select(".domain").remove());

    const every = Math.ceil(n / 8);
    g.append("g")
      .attr("class", "fig-axis")
      .attr("transform", `translate(0,${ih})`)
      .call(
        d3
          .axisBottom(x)
          .tickValues(d3.range(0, n, every))
          .tickSize(0)
          .tickPadding(24)
          .tickFormat((i) => xLabels[+i]),
      );

    g.append("text")
      .attr("x", -M.left + 4)
      .attr("y", -14)
      .attr("fill", BRAND.fg3)
      .style("font-family", "var(--font-mono)")
      .attr("font-size", 26)
      .text(yLabel);

    const line = d3
      .line<number>()
      .x((_, i) => x(i))
      .y((v) => y(v))
      .curve(d3.curveMonotoneX);

    const area = d3
      .area<number>()
      .x((_, i) => x(i))
      .y0(ih)
      .y1((v) => y(v))
      .curve(d3.curveMonotoneX);

    const defs = svg.append("defs");
    series.forEach((s) => {
      const grad = defs
        .append("linearGradient")
        .attr("id", `fill-${s.key}`)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", 1);
      grad.append("stop").attr("offset", "0%").attr("stop-color", s.color).attr("stop-opacity", 0.1);
      grad.append("stop").attr("offset", "100%").attr("stop-color", s.color).attr("stop-opacity", 0);
    });

    const DRAW = 1400;

    series.forEach((s, si) => {
      g.append("path")
        .datum(s.values)
        .attr("d", area)
        .attr("fill", `url(#fill-${s.key})`)
        .attr("opacity", 0)
        .transition()
        .delay(si * 220 + DRAW * 0.6)
        .duration(700)
        .attr("opacity", 1);

      const path = g
        .append("path")
        .datum(s.values)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", s.color)
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");

      const len = (path.node() as SVGPathElement).getTotalLength();
      path
        .attr("stroke-dasharray", `${len} ${len}`)
        .attr("stroke-dashoffset", len)
        .transition()
        .delay(si * 220)
        .duration(DRAW)
        .ease(d3.easeCubicInOut)
        .attr("stroke-dashoffset", 0);

      // Direct label at the end of the line: colored marker, neutral text.
      const last = s.values[n - 1];
      const end = g
        .append("g")
        .attr("transform", `translate(${x(n - 1)},${y(last)})`)
        .attr("opacity", 0);
      end.append("circle").attr("r", 7).attr("fill", s.color).attr("stroke", BRAND.ink1).attr("stroke-width", 2);
      end
        .append("text")
        .attr("x", 22)
        .attr("y", -6)
        .attr("fill", BRAND.fg)
        .attr("font-size", 34)
        .attr("font-weight", 600)
        .text(format(last));
      end
        .append("text")
        .attr("x", 22)
        .attr("y", 28)
        .attr("fill", BRAND.fg2)
        .attr("font-size", 28)
        .text(s.label);
      end
        .transition()
        .delay(si * 220 + DRAW)
        .duration(400)
        .attr("opacity", 1);
    });

    // Hover layer: full-plot hit target, snaps to nearest index.
    g.append("rect")
      .attr("width", iw)
      .attr("height", ih)
      .attr("fill", "transparent")
      .on("pointermove", (event) => {
        const [mx] = d3.pointer(event);
        const i = Math.max(0, Math.min(n - 1, Math.round(x.invert(mx))));
        setHover({ i, x: x(i) + M.left, y: M.top + ih / 2 });
      })
      .on("pointerleave", () => setHover(null));

    return () => {
      svg.selectAll("*").interrupt();
    };
  }, [active, series, xLabels, yLabel, iw, ih, n, format, ref]);

  const s = scales.current;

  return (
    <div className="figure" style={{ width, height }}>
      <svg ref={ref} width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Line chart: ${yLabel}`} />
      {hover && s && (
        <>
          <svg width={width} height={height} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <line x1={hover.x} x2={hover.x} y1={M.top} y2={M.top + ih} stroke={BRAND.lineStrong} strokeWidth={1.5} />
            {series.map((ser) => (
              <circle
                key={ser.key}
                cx={hover.x}
                cy={M.top + s.y(ser.values[hover.i])}
                r={7}
                fill={ser.color}
                stroke={BRAND.ink1}
                strokeWidth={2}
              />
            ))}
          </svg>
          <div
            className="tooltip"
            style={{
              left: hover.x,
              top: hover.y,
              // Flip to the left of the crosshair near the right edge.
              transform: hover.x > width * 0.7 ? "translate(calc(-100% - 16px), -50%)" : undefined,
            }}
          >
            <div className="tooltip__title">{xLabels[hover.i]}</div>
            {[...series]
              .sort((a, b) => b.values[hover.i] - a.values[hover.i])
              .map((ser) => (
                <div key={ser.key} className="tooltip__row">
                  <span className="legend__swatch" style={{ background: ser.color }} />
                  <span>{ser.label}</span>
                  <b>{format(ser.values[hover.i])}</b>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
