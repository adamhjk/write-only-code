import { useEffect } from "react";
import * as d3 from "d3";
import { BRAND } from "./palette";
import { useSlideActive } from "../components/useSlideActive";

// Swamp's software factory, after swamp-club.com/slides/software-factory-2026 #/5.
// Humans are Until lime; agents and stations are Swamp cyan; the factory and
// shipping are Swamp green.

const W = 1728;
const H = 530;
const MID = 240; // the pipeline's centre line

const HUMAN = BRAND.lime;
const AGENT = BRAND.cyan;
const FACTORY = BRAND.green;

type G = d3.Selection<SVGGElement, unknown, null, undefined>;

const label = (g: G, x: number, y: number, text: string, color: string, size = 26, anchor = "middle") =>
  g
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("text-anchor", anchor)
    .attr("fill", color)
    .attr("font-size", size)
    .attr("font-weight", 600)
    .attr("letter-spacing", "0.08em")
    .style("font-family", "var(--font-label)")
    .text(text);

/** Head + triangle body, centred on (x, y). */
export function person(g: G, x: number, y: number, s = 1, color: string = HUMAN) {
  const p = g.append("g").attr("transform", `translate(${x},${y}) scale(${s})`);
  p.append("circle").attr("cy", -16).attr("r", 10).attr("fill", color);
  p.append("path").attr("d", "M0,-3 L16,22 L-16,22 Z").attr("fill", color);
  return p;
}

const arrow = (g: G, x1: number, x2: number, color: string) =>
  g
    .append("line")
    .attr("x1", x1)
    .attr("x2", x2)
    .attr("y1", MID)
    .attr("y2", MID)
    .attr("stroke", color)
    .attr("stroke-width", 2.5)
    .attr("marker-end", `url(#sf-arrow-${color === FACTORY ? "g" : "c"})`);

type Station = { n?: string; lines: string[]; human?: boolean; approval?: boolean; loop?: boolean; ship?: boolean };

const STATIONS: Station[] = [
  { n: "01", lines: ["PLAN"], human: true, loop: true },
  { n: "02", lines: ["BUILD", "+ TEST"], loop: true },
  { n: "03", lines: ["CODE", "REVIEW"], loop: true },
  { lines: [], approval: true },
  { n: "04", lines: ["ARTIFACT"] },
  { n: "05", lines: ["UAT"] },
  { n: "06", lines: ["SHIP →", "PROD"], ship: true },
];

export function SwampFactory() {
  const [ref, active] = useSlideActive<SVGSVGElement>();

  useEffect(() => {
    const svg = d3.select(ref.current!);
    svg.selectAll("*").remove();
    if (!active) return;

    const defs = svg.append("defs");
    for (const [id, color] of [
      ["c", AGENT],
      ["g", FACTORY],
    ]) {
      defs
        .append("marker")
        .attr("id", `sf-arrow-${id}`)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 9)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,0 L10,5 L0,10 z")
        .attr("fill", color);
    }
    const glow = defs.append("filter").attr("id", "sf-glow").attr("x", "-100%").attr("y", "-100%").attr("width", "300%").attr("height", "300%");
    glow.append("feGaussianBlur").attr("stdDeviation", 6).attr("result", "b");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in", "b");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    // Build-in order: each group fades up in turn.
    const groups: G[] = [];
    const step = () => {
      const g = svg.append("g").attr("opacity", 0) as G;
      groups.push(g);
      return g;
    };

    // ── The lab ───────────────────────────────────────────
    const lab = step();
    label(lab, 90, 92, "THE LAB", FACTORY, 26).attr("letter-spacing", "0.16em");
    ["bug", "feature", "bug", "feature", "bug"].forEach((kind, i) => {
      const y = MID - 130 + i * 54;
      const color = kind === "bug" ? BRAND.pink : AGENT;
      lab.append("rect").attr("x", 0).attr("y", y).attr("width", 180).attr("height", 44).attr("rx", 5).attr("fill", BRAND.ink2).attr("stroke", BRAND.lineStrong);
      lab.append("rect").attr("x", 14).attr("y", y + 15).attr("width", 14).attr("height", 14).attr("rx", 2).attr("fill", color);
      lab
        .append("text")
        .attr("x", 40)
        .attr("y", y + 31)
        .attr("fill", color)
        .attr("font-size", 26)
        .style("font-family", "var(--font-mono)")
        .text(kind);
    });

    // ── Trigger + triage ──────────────────────────────────
    const trig = step();
    arrow(trig, 188, 226, FACTORY);
    person(trig, 260, MID, 1.3);
    trig
      .append("text")
      .attr("x", 260)
      .attr("y", MID + 72)
      .attr("text-anchor", "middle")
      .attr("fill", BRAND.fg2)
      .attr("font-size", 26)
      .style("font-family", "var(--font-mono)")
      .text("triggers");
    arrow(trig, 296, 326, FACTORY);

    const triage = step();
    triage.append("rect").attr("x", 330).attr("y", MID - 60).attr("width", 180).attr("height", 120).attr("rx", 6).attr("fill", BRAND.ink2).attr("stroke", AGENT).attr("stroke-width", 2);
    label(triage, 420, MID + 2, "TRIAGE", AGENT, 34).attr("letter-spacing", "0.12em");
    triage
      .append("text")
      .attr("x", 420)
      .attr("y", MID + 38)
      .attr("text-anchor", "middle")
      .attr("fill", BRAND.fg3)
      .attr("font-size", 26)
      .text("agent");
    arrow(triage, 514, 548, FACTORY);

    // ── Factory ───────────────────────────────────────────
    const fx = 552;
    const fw = W - fx;
    const shell = step();
    shell.append("rect").attr("x", fx).attr("y", 40).attr("width", fw).attr("height", 380).attr("rx", 10).attr("fill", "rgb(62 224 143 / 0.04)").attr("stroke", FACTORY).attr("stroke-width", 2);
    label(shell, fx + fw / 2, 84, "SOFTWARE FACTORY", FACTORY, 28).attr("letter-spacing", "0.22em");

    const pad = 22;
    const gap = 22;
    const approvalW = 100;
    const stationW = (fw - pad * 2 - approvalW - gap * (STATIONS.length - 1)) / (STATIONS.length - 1);
    const top = MID - 65;
    const boxH = 130;
    let x = fx + pad;
    const boxes: { x: number; w: number; rect: d3.Selection<SVGRectElement, unknown, null, undefined>; color: string }[] = [];

    STATIONS.forEach((s, i) => {
      const g = step();
      const w = s.approval ? approvalW : stationW;
      const color = s.approval ? HUMAN : s.ship ? FACTORY : AGENT;
      const rect = g
        .append("rect")
        .attr("x", x)
        .attr("y", top)
        .attr("width", w)
        .attr("height", boxH)
        .attr("rx", 6)
        .attr("fill", BRAND.ink2)
        .attr("stroke", color)
        .attr("stroke-width", 2);
      boxes.push({ x, w, rect, color });

      if (s.n) {
        g.append("text")
          .attr("x", x + 14)
          .attr("y", top + 32)
          .attr("fill", BRAND.fg3)
          .attr("font-size", 26)
          .style("font-family", "var(--font-mono)")
          .text(s.n);
      }
      const lh = 30;
      const y0 = top + boxH / 2 + 18 - ((s.lines.length - 1) * lh) / 2;
      s.lines.forEach((line, li) => label(g, x + w / 2, y0 + li * lh, line, color, 26).attr("letter-spacing", "0.04em"));

      if (s.human) person(g, x + w - 22, top + 30, 0.75);
      if (s.approval) {
        person(g, x + w / 2, MID, 1.3);
        label(g, x + w / 2, top + boxH + 36, "final", HUMAN, 26).attr("letter-spacing", "0.02em").attr("font-weight", 500);
        label(g, x + w / 2, top + boxH + 66, "approval", HUMAN, 26).attr("letter-spacing", "0.02em").attr("font-weight", 500);
      }
      if (s.loop) {
        g.append("text")
          .attr("x", x + w / 2)
          .attr("y", top + boxH + 40)
          .attr("text-anchor", "middle")
          .attr("fill", FACTORY)
          .attr("font-size", 26)
          .style("font-family", "var(--font-mono)")
          .text("↻ ≤5×");
      }
      if (i < STATIONS.length - 1) arrow(g, x + w + 3, x + w + gap - 3, AGENT);
      x += w + gap;
    });

    // Adversary arc over 01–03
    const arc = step();
    const c1 = boxes[0].x + boxes[0].w / 2;
    const c3 = boxes[2].x + boxes[2].w / 2;
    arc
      .append("path")
      .attr("d", `M${c1},${top - 4} Q${(c1 + c3) / 2},${top - 56} ${c3},${top - 4}`)
      .attr("fill", "none")
      .attr("stroke", BRAND.pink)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "6 6");
    label(arc, (c1 + c3) / 2, top - 40, "SAME ADVERSARY SKILLS", BRAND.pink, 26).attr("letter-spacing", "0.1em");

    // ── Timings ───────────────────────────────────────────
    const timing = step();
    const bracket = (x1: number, x2: number, name: string, value: string) => {
      timing
        .append("path")
        .attr("d", `M${x1},452 v12 H${x2} v-12`)
        .attr("fill", "none")
        .attr("stroke", BRAND.lineStrong)
        .attr("stroke-width", 2);
      const t = timing
        .append("text")
        .attr("x", (x1 + x2) / 2)
        .attr("y", 510)
        .attr("text-anchor", "middle")
        .attr("font-size", 30)
        .attr("font-weight", 600)
        .attr("letter-spacing", "0.1em")
        .style("font-family", "var(--font-label)");
      t.append("tspan").attr("fill", FACTORY).text(name);
      t.append("tspan").attr("fill", BRAND.fg).text(` · ${value}`);
    };
    bracket(0, 510, "TRIAGE", "≈ 1.6 HRS");
    bracket(fx, W, "FACTORY → PRODUCTION", "≈ 1.3 HRS");

    groups.forEach((g, i) => g.transition().delay(150 + i * 140).duration(450).ease(d3.easeCubicOut).attr("opacity", 1));

    // ── A ticket travels triage → prod along the floor of each station
    // (below the labels), lighting the station it's in ──
    const packet = svg.append("circle").attr("r", 9).attr("cy", top + boxH - 16).attr("fill", BRAND.fg).attr("filter", "url(#sf-glow)").attr("opacity", 0);
    const x0 = 330;
    const x1 = W - pad;
    const LOOP = 7000;
    const startAt = 150 + groups.length * 140 + 500;
    const timer = d3.timer((elapsed) => {
      if (elapsed < startAt) return;
      const t = ((elapsed - startAt) % LOOP) / LOOP;
      const px = x0 + (x1 - x0) * d3.easeSinInOut(Math.min(t / 0.9, 1));
      packet.attr("cx", px).attr("opacity", t < 0.92 ? 1 : 0);
      for (const b of boxes) {
        const inside = px >= b.x && px <= b.x + b.w && t < 0.92;
        b.rect.attr("fill", inside ? b.color : BRAND.ink2).attr("fill-opacity", inside ? 0.18 : 1);
      }
    });

    return () => {
      timer.stop();
      svg.selectAll("*").interrupt();
    };
  }, [active, ref]);

  return <svg ref={ref} width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Swamp's software factory: the lab's tickets are triggered into a triage agent (about 1.6 hours), then the factory plans, builds and tests, reviews, gets final human approval, builds an artifact, runs UAT and ships to production (about 1.3 hours)." style={{ display: "block", overflow: "visible" }} />;
}
