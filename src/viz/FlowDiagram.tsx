import { useEffect } from "react";
import * as d3 from "d3";
import { BRAND } from "./palette";
import { useSlideActive } from "../components/useSlideActive";

type Owner = "github" | "until" | "agent" | "swamp";

type Node = {
  id: string;
  label: string;
  sub: string;
  owner: Owner;
  col: number;
  row: number; // position within column, 0-based
  rows: number; // total rows in column
};

type Link = { source: string; target: string; back?: boolean };

const OWNER_COLOR: Record<Owner, string> = {
  github: BRAND.ghGreen,
  until: BRAND.lime,
  agent: BRAND.purple,
  swamp: BRAND.cyan,
};

const OWNER_LABEL: Record<Owner, string> = {
  github: "GitHub",
  until: "Until",
  agent: "Agent",
  swamp: "Swamp",
};

const NODES: Node[] = [
  { id: "issue", label: "Issue", sub: "gh issue #482", owner: "github", col: 0, row: 0, rows: 1 },
  { id: "ticket", label: "Ticket", sub: "git-backed", owner: "until", col: 1, row: 0, rows: 1 },
  { id: "agent", label: "Coding agent", sub: "claims the job", owner: "agent", col: 2, row: 0, rows: 1 },
  { id: "workflow", label: "Workflow", sub: "deploy-preview", owner: "swamp", col: 3, row: 0, rows: 1 },
  { id: "aws", label: "aws/ec2", sub: "behavior", owner: "swamp", col: 4, row: 0, rows: 3 },
  { id: "vault", label: "vault", sub: "behavior", owner: "swamp", col: 4, row: 1, rows: 3 },
  { id: "pr", label: "github/pr", sub: "behavior", owner: "swamp", col: 4, row: 2, rows: 3 },
];

const LINKS: Link[] = [
  { source: "issue", target: "ticket" },
  { source: "ticket", target: "agent" },
  { source: "agent", target: "workflow" },
  { source: "workflow", target: "aws" },
  { source: "workflow", target: "vault" },
  { source: "workflow", target: "pr" },
  // Audited run data flows back to the ticket for a human decision.
  { source: "workflow", target: "ticket", back: true },
];

const W = 1728;
const H = 650;
const NODE_W = 290;
const NODE_H = 136;

export function FlowDiagram() {
  const [ref, active] = useSlideActive<SVGSVGElement>();

  useEffect(() => {
    const svg = d3.select(ref.current!);
    svg.selectAll("*").remove();
    if (!active) return;

    const cols = d3.max(NODES, (d) => d.col)! + 1;
    const x = d3
      .scalePoint<number>()
      .domain(d3.range(cols))
      .range([NODE_W / 2, W - NODE_W / 2]);
    const pos = new Map(
      NODES.map((n) => {
        const top = NODE_H / 2 + 8;
        const bottom = H - 230;
        const y = n.rows === 1 ? (top + bottom) / 2 : top + ((bottom - top) * n.row) / (n.rows - 1);
        return [n.id, { x: x(n.col)!, y }];
      }),
    );

    const defs = svg.append("defs");
    defs
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 9)
      .attr("refY", 5)
      .attr("markerWidth", 7)
      .attr("markerHeight", 7)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M0,0 L10,5 L0,10 z")
      .attr("fill", BRAND.fg3);

    const glow = defs.append("filter").attr("id", "glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    glow.append("feGaussianBlur").attr("stdDeviation", 6).attr("result", "b");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in", "b");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    const forward = d3
      .linkHorizontal<{ source: [number, number]; target: [number, number] }, [number, number]>()
      .source((d) => d.source)
      .target((d) => d.target);

    const pathFor = (l: Link) => {
      const s = pos.get(l.source)!;
      const t = pos.get(l.target)!;
      if (l.back) {
        // Loop under the main row: out the bottom of workflow, back into ticket.
        const y0 = s.y + NODE_H / 2;
        const y1 = t.y + NODE_H / 2;
        const dip = H - 90;
        return `M${s.x},${y0} C${s.x},${dip} ${t.x},${dip} ${t.x},${y1 + 4}`;
      }
      return forward({ source: [s.x + NODE_W / 2, s.y], target: [t.x - NODE_W / 2 - 4, t.y] })!;
    };

    const colDelay = (col: number) => 200 + col * 260;

    // Links
    const links = svg
      .append("g")
      .selectAll("path")
      .data(LINKS)
      .join("path")
      .attr("d", pathFor)
      .attr("fill", "none")
      .attr("stroke", (l) => (l.back ? BRAND.lime : BRAND.lineStrong))
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", (l) => (l.back ? "6 8" : null))
      .attr("marker-end", "url(#arrow)")
      .attr("opacity", 0);

    links.each(function (l) {
      const el = this as SVGPathElement;
      const len = el.getTotalLength();
      const target = NODES.find((n) => n.id === l.target)!;
      const sel = d3.select(el);
      const delay = l.back ? colDelay(cols) + 300 : colDelay(target.col) - 120;
      if (l.back) {
        sel.transition().delay(delay).duration(600).attr("opacity", 1);
      } else {
        sel
          .attr("stroke-dasharray", `${len} ${len}`)
          .attr("stroke-dashoffset", len)
          .attr("opacity", 1)
          .transition()
          .delay(delay)
          .duration(500)
          .ease(d3.easeCubicOut)
          .attr("stroke-dashoffset", 0);
      }
    });

    // Back-link label
    const back = LINKS.find((l) => l.back)!;
    const bs = pos.get(back.source)!;
    const bt = pos.get(back.target)!;
    svg
      .append("text")
      .attr("x", (bs.x + bt.x) / 2)
      .attr("y", H - 30)
      .attr("text-anchor", "middle")
      .attr("fill", BRAND.lime)
      .style("font-family", "var(--font-mono)")
      .attr("font-size", 28)
      .text("run data + report → a human makes the call")
      .attr("opacity", 0)
      .transition()
      .delay(colDelay(cols) + 600)
      .duration(500)
      .attr("opacity", 1);

    // Nodes
    const node = svg
      .append("g")
      .selectAll("g")
      .data(NODES)
      .join("g")
      .attr("transform", (d) => {
        const p = pos.get(d.id)!;
        return `translate(${p.x - NODE_W / 2},${p.y - NODE_H / 2})`;
      })
      .attr("opacity", 0);

    node
      .append("rect")
      .attr("width", NODE_W)
      .attr("height", NODE_H)
      .attr("rx", 6)
      .attr("fill", BRAND.ink2)
      .attr("stroke", (d) => OWNER_COLOR[d.owner])
      .attr("stroke-width", 1.5);

    // Owner color bar on the left edge
    node
      .append("rect")
      .attr("width", 6)
      .attr("height", NODE_H)
      .attr("rx", 2)
      .attr("fill", (d) => OWNER_COLOR[d.owner]);

    node
      .append("text")
      .attr("x", 28)
      .attr("y", 38)
      .attr("fill", (d) => OWNER_COLOR[d.owner])
      .style("font-family", "var(--font-label)")
      .attr("font-size", 26)
      .attr("font-weight", 600)
      .attr("letter-spacing", "0.12em")
      .text((d) => OWNER_LABEL[d.owner].toUpperCase());

    node
      .append("text")
      .attr("x", 28)
      .attr("y", 82)
      .attr("fill", BRAND.fg)
      .attr("font-size", 38)
      .attr("font-weight", 600)
      .attr("letter-spacing", "-0.015em")
      .text((d) => d.label);

    node
      .append("text")
      .attr("x", 28)
      .attr("y", 116)
      .attr("fill", BRAND.fg3)
      .style("font-family", "var(--font-mono)")
      .attr("font-size", 26)
      .text((d) => d.sub);

    node
      .transition()
      .delay((d) => colDelay(d.col) + d.row * 90)
      .duration(500)
      .ease(d3.easeCubicOut)
      .attr("opacity", 1)
      .attrTween("transform", (d) => {
        const p = pos.get(d.id)!;
        const i = d3.interpolateNumber(18, 0);
        return (t) => `translate(${p.x - NODE_W / 2},${p.y - NODE_H / 2 + i(t)})`;
      });

    // Packets: small glowing dots travelling each forward link, forever.
    const packets = svg.append("g").attr("filter", "url(#glow)");
    const timers: d3.Timer[] = [];
    links.each(function (l) {
      const el = this as SVGPathElement;
      const len = el.getTotalLength();
      const color = l.back ? BRAND.lime : OWNER_COLOR[NODES.find((n) => n.id === l.target)!.owner];
      const dot = packets.append("circle").attr("r", 7).attr("fill", color).attr("opacity", 0);
      const start = colDelay(cols) + 900 + Math.random() * 800;
      const loop = () => {
        dot
          .attr("opacity", 1)
          .transition()
          .duration(l.back ? 2600 : 1400)
          .ease(d3.easeSinInOut)
          .attrTween("transform", () => (t) => {
            const p = el.getPointAtLength(t * len);
            return `translate(${p.x},${p.y})`;
          })
          .transition()
          .duration(0)
          .attr("opacity", 0)
          .transition()
          .delay(600 + Math.random() * 1400)
          .on("end", loop);
      };
      timers.push(d3.timeout(loop, start));
    });

    return () => {
      timers.forEach((t) => t.stop());
      svg.selectAll("*").interrupt();
    };
  }, [active, ref]);

  return (
    <div className="figure">
      <svg ref={ref} width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Flow from GitHub issue to Until ticket, coding agent, and Swamp workflow running behaviors; run data loops back to the ticket." />
      <div className="legend" style={{ marginTop: 4 }}>
        {(Object.keys(OWNER_COLOR) as Owner[]).map((o) => (
          <span key={o} className="legend__item">
            <span className="legend__swatch legend__swatch--box" style={{ background: OWNER_COLOR[o] }} />
            {OWNER_LABEL[o]}
          </span>
        ))}
      </div>
    </div>
  );
}
