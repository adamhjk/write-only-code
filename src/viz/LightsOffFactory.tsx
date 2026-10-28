import { useEffect } from "react";
import * as d3 from "d3";
import { BRAND } from "./palette";
import { useSlideActive } from "../components/useSlideActive";

// The lights-off factory: no people anywhere. The factory pulls tickets from
// the queue on its own, runs them through dark stations that light up only
// while a ticket passes, and ships to prod.

const W = 1728;
const H = 400;
const MID = 200;

const AGENT = BRAND.cyan;
const FACTORY = BRAND.green;

const STATIONS = [["PLAN"], ["BUILD", "+ TEST"], ["CODE", "REVIEW"], ["ARTIFACT"], ["UAT"], ["SHIP →", "PROD"]];

const KINDS = [
  { kind: "bug", color: BRAND.pink },
  { kind: "feature", color: AGENT },
];

const CHIP_H = 44;
const CHIP_STEP = 54;
const QUEUE = 5;
const queueY = (i: number) => MID - 130 + i * CHIP_STEP;

const SPAWN_EVERY = 1300; // ms between tickets pulled
const TRAVEL = 4600; // ms from queue to prod

export function LightsOffFactory() {
  const [ref, active] = useSlideActive<SVGSVGElement>();

  useEffect(() => {
    const svg = d3.select(ref.current!);
    svg.selectAll("*").remove();
    if (!active) return;

    const defs = svg.append("defs");
    defs
      .append("marker")
      .attr("id", "lo-arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 9)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,0 L10,5 L0,10 z")
      .attr("fill", BRAND.fg3);
    const glow = defs.append("filter").attr("id", "lo-glow").attr("x", "-100%").attr("y", "-100%").attr("width", "300%").attr("height", "300%");
    glow.append("feGaussianBlur").attr("stdDeviation", 6).attr("result", "b");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in", "b");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    const arrow = (x1: number, x2: number) =>
      svg
        .append("line")
        .attr("x1", x1)
        .attr("x2", x2)
        .attr("y1", MID)
        .attr("y2", MID)
        .attr("stroke", BRAND.fg3)
        .attr("stroke-width", 2.5)
        .attr("marker-end", "url(#lo-arrow)");

    const label = (x: number, y: number, text: string, color: string, size = 26) =>
      svg
        .append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("fill", color)
        .attr("font-size", size)
        .attr("font-weight", 600)
        .attr("letter-spacing", "0.08em")
        .style("font-family", "var(--font-label)")
        .text(text);

    // ── Queue ─────────────────────────────────────────────
    label(90, MID - 150, "TICKETS", BRAND.fg2).attr("letter-spacing", "0.16em");
    const queueLayer = svg.append("g");
    let nextId = 0;
    type Chip = { id: number; kind: (typeof KINDS)[number] };
    const newChip = (): Chip => ({ id: nextId++, kind: KINDS[Math.random() < 0.5 ? 0 : 1] });
    let queue: Chip[] = d3.range(QUEUE).map(newChip);

    const drawQueue = () => {
      const sel = queueLayer.selectAll<SVGGElement, Chip>("g.chip").data(queue, (d) => d.id);
      sel
        .transition()
        .duration(450)
        .ease(d3.easeCubicOut)
        .attr("transform", (_, i) => `translate(0,${queueY(i)})`);
      const enter = sel
        .enter()
        .append("g")
        .attr("class", "chip")
        .attr("transform", (_, i) => `translate(0,${queueY(i) + 30})`)
        .attr("opacity", 0);
      enter.append("rect").attr("width", 180).attr("height", CHIP_H).attr("rx", 5).attr("fill", BRAND.ink2).attr("stroke", BRAND.lineStrong);
      enter
        .append("rect")
        .attr("x", 14)
        .attr("y", 15)
        .attr("width", 14)
        .attr("height", 14)
        .attr("rx", 2)
        .attr("fill", (d) => d.kind.color);
      enter
        .append("text")
        .attr("x", 40)
        .attr("y", 31)
        .attr("fill", (d) => d.kind.color)
        .attr("font-size", 26)
        .style("font-family", "var(--font-mono)")
        .text((d) => d.kind.kind);
      enter
        .transition()
        .duration(450)
        .attr("opacity", 1)
        .attr("transform", (_, i) => `translate(0,${queueY(i)})`);
      sel
        .exit()
        .transition()
        .duration(350)
        .attr("opacity", 0)
        .attr("transform", `translate(40,${queueY(0)})`)
        .remove();
    };
    drawQueue();

    arrow(188, 226);

    // ── Factory (lights off) ──────────────────────────────
    const fx = 230;
    const fw = 1230;
    svg.append("rect").attr("x", fx).attr("y", 30).attr("width", fw).attr("height", 340).attr("rx", 10).attr("fill", "rgb(0 0 0 / 0.55)").attr("stroke", BRAND.lineStrong).attr("stroke-width", 2);
    label(fx + fw / 2, 74, "LIGHTS OFF", BRAND.fg3, 28).attr("letter-spacing", "0.3em");

    const pad = 22;
    const gap = 22;
    const sw = (fw - pad * 2 - gap * (STATIONS.length - 1)) / STATIONS.length;
    const top = MID - 65;
    const boxH = 130;
    const stations = STATIONS.map((lines, i) => {
      const x = fx + pad + i * (sw + gap);
      const ship = i === STATIONS.length - 1;
      const color = ship ? FACTORY : AGENT;
      const g = svg.append("g");
      const rect = g.append("rect").attr("x", x).attr("y", top).attr("width", sw).attr("height", boxH).attr("rx", 6).attr("fill", BRAND.ink1).attr("stroke", color).attr("stroke-opacity", 0.25).attr("stroke-width", 2);
      const lh = 30;
      const y0 = top + boxH / 2 + 10 - ((lines.length - 1) * lh) / 2;
      const texts = lines.map((line, li) =>
        g
          .append("text")
          .attr("x", x + sw / 2)
          .attr("y", y0 + li * lh)
          .attr("text-anchor", "middle")
          .attr("fill", color)
          .attr("fill-opacity", 0.3)
          .attr("font-size", 26)
          .attr("font-weight", 600)
          .attr("letter-spacing", "0.04em")
          .style("font-family", "var(--font-label)")
          .text(line),
      );
      if (i < STATIONS.length - 1) {
        g.append("line")
          .attr("x1", x + sw + 3)
          .attr("x2", x + sw + gap - 3)
          .attr("y1", MID)
          .attr("y2", MID)
          .attr("stroke", BRAND.fg3)
          .attr("stroke-width", 2.5)
          .attr("marker-end", "url(#lo-arrow)");
      }
      return { x, w: sw, rect, texts, color };
    });

    arrow(fx + fw + 4, 1506);

    // ── Prod ──────────────────────────────────────────────
    const px = 1510;
    const pw = W - px;
    svg.append("rect").attr("x", px).attr("y", MID - 100).attr("width", pw).attr("height", 200).attr("rx", 8).attr("fill", "rgb(62 224 143 / 0.08)").attr("stroke", FACTORY).attr("stroke-width", 2);
    label(px + pw / 2, MID - 58, "PROD", FACTORY, 28).attr("letter-spacing", "0.2em");
    let shipped = 0;
    const counter = svg
      .append("text")
      .attr("x", px + pw / 2)
      .attr("y", MID + 30)
      .attr("text-anchor", "middle")
      .attr("fill", FACTORY)
      .attr("font-size", 72)
      .attr("font-weight", 800)
      .style("font-family", "var(--font-hud)")
      .text("0");
    svg
      .append("text")
      .attr("x", px + pw / 2)
      .attr("y", MID + 76)
      .attr("text-anchor", "middle")
      .attr("fill", BRAND.fg2)
      .attr("font-size", 26)
      .style("font-family", "var(--font-mono)")
      .text("shipped");

    // ── Run ───────────────────────────────────────────────
    const packetLayer = svg.append("g").attr("filter", "url(#lo-glow)");
    type Packet = { born: number; color: string; dot: d3.Selection<SVGCircleElement, unknown, null, undefined>; done?: boolean };
    let packets: Packet[] = [];
    let lastSpawn = -Infinity;
    const x0 = 190;
    const x1 = px + 12; // lands at the prod box's edge

    const timer = d3.timer((now) => {
      if (now - lastSpawn > SPAWN_EVERY) {
        lastSpawn = now;
        const [pulled, ...rest] = queue;
        queue = [...rest, newChip()];
        drawQueue();
        // Tickets ride along the floor of each station, below the labels.
        packets.push({ born: now, color: pulled.kind.color, dot: packetLayer.append("circle").attr("r", 9).attr("cy", top + boxH - 16).attr("fill", pulled.kind.color) });
      }

      const xs: number[] = [];
      for (const p of packets) {
        const t = (now - p.born) / TRAVEL;
        if (t >= 1) {
          p.dot.remove();
          p.done = true;
          shipped += 1;
          counter.text(shipped);
          continue;
        }
        const x = x0 + (x1 - x0) * t;
        xs.push(x);
        p.dot.attr("cx", x);
      }
      packets = packets.filter((p) => !p.done);

      for (const s of stations) {
        const lit = xs.some((x) => x >= s.x && x <= s.x + s.w);
        s.rect.attr("stroke-opacity", lit ? 1 : 0.25).attr("fill", lit ? s.color : BRAND.ink1).attr("fill-opacity", lit ? 0.16 : 1);
        for (const t of s.texts) t.attr("fill-opacity", lit ? 1 : 0.3);
      }
    });

    return () => {
      timer.stop();
      svg.selectAll("*").interrupt();
    };
  }, [active, ref]);

  return <svg ref={ref} width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Lights-off factory: with no people in the loop, the factory pulls tickets from the queue, runs them through plan, build and test, code review, artifact, UAT and ship, and ships them to production." style={{ display: "block", overflow: "visible" }} />;
}
