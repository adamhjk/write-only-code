import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Fragment, useReveal } from "@revealjs/react";
import { BRAND } from "./palette";
import { person } from "./SwampFactory";

// Top: a typical scrum cycle. Bottom (one click): the same columns at factory
// speed. The middle inputs dissolve into a single software factory, leaving
// strategy in front and validation after shipping.

const W = 1728;
const COLS = 7;
const GAP = 24;
const COL_W = (W - GAP * (COLS - 1)) / COLS;
const colX = (i: number) => i * (COL_W + GAP);

const SCRUM: string[][] = [["Roadmap"], ["Backlog"], ["Sprint", "planning"], ["Sprint"], ["Review"], ["Release"], ["Feedback"]];

const BOX_Y = 56;
const BOX_H = 120;

type G = d3.Selection<SVGGElement, unknown, null, undefined>;

function box(g: G, i: number, lines: string[], color: string, opts: { dashed?: boolean; fillOpacity?: number } = {}) {
  const x = colX(i);
  const b = g.append("g");
  b.append("rect")
    .attr("x", x)
    .attr("y", BOX_Y)
    .attr("width", COL_W)
    .attr("height", BOX_H)
    .attr("rx", 6)
    .attr("fill", opts.dashed ? "none" : BRAND.ink2)
    .attr("stroke", color)
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", opts.dashed ? "8 8" : null);
  const lh = 32;
  const y0 = BOX_Y + BOX_H / 2 + 10 - ((lines.length - 1) * lh) / 2;
  lines.forEach((line, li) =>
    b
      .append("text")
      .attr("x", x + COL_W / 2)
      .attr("y", y0 + li * lh)
      .attr("text-anchor", "middle")
      .attr("fill", color)
      .attr("font-size", 30)
      .attr("font-weight", 600)
      .text(line),
  );
  return b;
}

function arrows(g: G, from: number, to: number, color: string) {
  for (let i = from; i < to; i++) {
    g.append("line")
      .attr("x1", colX(i) + COL_W + 3)
      .attr("x2", colX(i + 1) - 3)
      .attr("y1", BOX_Y + BOX_H / 2)
      .attr("y2", BOX_Y + BOX_H / 2)
      .attr("stroke", color)
      .attr("stroke-width", 2.5)
      .attr("marker-end", "url(#svf-arrow)");
  }
}

function arrowMarker(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) {
  svg
    .append("defs")
    .append("marker")
    .attr("id", "svf-arrow")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 9)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,0 L10,5 L0,10 z")
    .attr("fill", BRAND.fg3);
}

const hudText = (g: G, text: string, color: string) =>
  g
    .append("text")
    .attr("x", 0)
    .attr("y", 28)
    .attr("fill", color)
    .attr("font-size", 26)
    .attr("font-weight", 600)
    .attr("letter-spacing", "0.16em")
    .style("font-family", "var(--font-label)")
    .text(text);

const caption = (g: G, x: number, y: number, text: string) =>
  g
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("text-anchor", "middle")
    .attr("fill", BRAND.fg2)
    .attr("font-size", 26)
    .text(text);

/* ── Top: typical scrum ─────────────────────────────────── */

const TOP_H = 290;

function Scrum() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = d3.select(ref.current!);
    svg.selectAll("*").remove();
    arrowMarker(svg);
    const g = svg.append("g") as G;
    hudText(g, "TYPICAL SCRUM", BRAND.fg2);
    SCRUM.forEach((lines, i) => box(g, i, lines, BRAND.fg));
    arrows(g, 0, COLS - 1, BRAND.fg3);
    // Feedback loops back to the backlog every sprint.
    const x1 = colX(6) + COL_W / 2;
    const x2 = colX(1) + COL_W / 2;
    const y = BOX_Y + BOX_H;
    g.append("path")
      .attr("d", `M${x1},${y + 4} C${x1},${y + 70} ${x2},${y + 70} ${x2},${y + 8}`)
      .attr("fill", "none")
      .attr("stroke", BRAND.fg3)
      .attr("stroke-width", 2.5)
      .attr("stroke-dasharray", "6 8")
      .attr("marker-end", "url(#svf-arrow)");
    caption(g, (x1 + x2) / 2, y + 96, "every 2 weeks");
  }, []);
  return <svg ref={ref} width={W} height={TOP_H} viewBox={`0 0 ${W} ${TOP_H}`} style={{ display: "block", overflow: "visible" }} />;
}

/* ── Bottom: at factory speed ───────────────────────────── */

const BOT_H = 240;

function Factory({ play }: { play: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = d3.select(ref.current!);
    svg.selectAll("*").remove();
    if (!play) return;
    arrowMarker(svg);
    const glow = svg.select("defs").append("filter").attr("id", "svf-glow").attr("x", "-100%").attr("y", "-100%").attr("width", "300%").attr("height", "300%");
    glow.append("feGaussianBlur").attr("stdDeviation", 5).attr("result", "b");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in", "b");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg.append("g") as G;
    hudText(g, "AT SOFTWARE FACTORY SPEED", BRAND.lime);

    // Strategy: the only input left, owned by a human.
    const strat = box(g, 0, ["Strategy"], BRAND.lime);
    person(strat as G, colX(0) + COL_W - 26, BOX_Y + 34, 0.8);
    caption(g, colX(0) + COL_W / 2, BOX_Y + BOX_H + 40, "the only input left");

    // Validation: after it ships, not a gate.
    const val = box(g, 6, ["Validate"], BRAND.lime);
    person(val as G, colX(6) + COL_W - 26, BOX_Y + 34, 0.8);
    caption(g, colX(6) + COL_W / 2, BOX_Y + BOX_H + 40, "after it ships, not a gate");

    // Ghosts of the scrum inputs dissolve…
    const ghosts = g.append("g");
    for (let i = 1; i <= 5; i++) box(ghosts as G, i, SCRUM[i], BRAND.fg3, { dashed: true });
    // Hold long enough for the audience to see what's about to go.
    ghosts
      .attr("opacity", 0)
      .transition()
      .duration(400)
      .attr("opacity", 1)
      .transition()
      .delay(1200)
      .duration(900)
      .attr("opacity", 0)
      .attr("transform", "translate(0,16)")
      .remove();

    // …and one factory sweeps across their columns.
    const fx = colX(1);
    const fw = colX(5) + COL_W - fx;
    const fac = g.append("g");
    fac.append("line").attr("x1", colX(0) + COL_W + 3).attr("x2", fx - 3).attr("y1", BOX_Y + BOX_H / 2).attr("y2", BOX_Y + BOX_H / 2).attr("stroke", BRAND.fg3).attr("stroke-width", 2.5).attr("marker-end", "url(#svf-arrow)");
    fac.append("line").attr("x1", fx + fw + 3).attr("x2", colX(6) - 3).attr("y1", BOX_Y + BOX_H / 2).attr("y2", BOX_Y + BOX_H / 2).attr("stroke", BRAND.fg3).attr("stroke-width", 2.5).attr("marker-end", "url(#svf-arrow)");
    const bar = fac.append("rect").attr("x", fx).attr("y", BOX_Y).attr("width", 0).attr("height", BOX_H).attr("rx", 8).attr("fill", "rgb(34 211 238 / 0.10)").attr("stroke", BRAND.cyan).attr("stroke-width", 2);
    const label = fac
      .append("text")
      .attr("x", fx + fw / 2)
      .attr("y", BOX_Y + BOX_H / 2 - 4)
      .attr("text-anchor", "middle")
      .attr("fill", BRAND.cyan)
      .attr("font-size", 32)
      .attr("font-weight", 600)
      .attr("letter-spacing", "0.2em")
      .style("font-family", "var(--font-label)")
      .attr("opacity", 0)
      .text("SOFTWARE FACTORY");
    fac.attr("opacity", 0).transition().delay(2300).duration(1).attr("opacity", 1);
    bar.transition().delay(2300).duration(800).ease(d3.easeCubicOut).attr("width", fw);
    label.transition().delay(2900).duration(400).attr("opacity", 1);

    // Tickets stream through the factory into validation, continuously.
    const packets = g.append("g").attr("filter", "url(#svf-glow)");
    const py = BOX_Y + BOX_H - 26;
    const x0 = fx + 12;
    const x1 = colX(6) + 12;
    const SPAWN = 260;
    const TRAVEL = 2600;
    let born: { t: number; dot: d3.Selection<SVGCircleElement, unknown, null, undefined> }[] = [];
    let last = 0;
    const timer = d3.timer((now) => {
      if (now < 3300) return;
      if (now - last > SPAWN) {
        last = now;
        const color = Math.random() < 0.5 ? BRAND.pink : BRAND.cyan;
        born.push({ t: now, dot: packets.append("circle").attr("r", 7).attr("cy", py).attr("fill", color) });
      }
      born = born.filter((p) => {
        const k = (now - p.t) / TRAVEL;
        if (k >= 1) {
          p.dot.remove();
          return false;
        }
        p.dot.attr("cx", x0 + (x1 - x0) * k);
        return true;
      });
    });

    return () => {
      timer.stop();
      svg.selectAll("*").interrupt();
    };
  }, [play]);
  return <svg ref={ref} width={W} height={BOT_H} viewBox={`0 0 ${W} ${BOT_H}`} role="img" aria-label="At software factory speed: strategy is the only input, one software factory ships continuously, and validation happens after shipping rather than as a gate." style={{ display: "block", overflow: "visible" }} />;
}

/**
 * Scrum on top; one click reveals the factory-speed row and plays its
 * animation. Replays when the step is shown again.
 */
export function ScrumVsFactory() {
  const deck = useReveal();
  const wrap = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!deck) return;
    const sync = () => {
      const el = wrap.current;
      const onSlide = !!el && deck.getCurrentSlide() === el.closest("section");
      setPlay(onSlide && !!el?.classList.contains("visible"));
    };
    sync();
    const events = ["fragmentshown", "fragmenthidden", "slidechanged", "ready"] as const;
    events.forEach((e) => deck.on(e, sync));
    return () => events.forEach((e) => deck.off(e, sync));
  }, [deck]);

  return (
    <div>
      <Scrum />
      <Fragment animation="fade-in" asChild>
        <div ref={wrap} style={{ marginTop: 40 }}>
          <Factory play={play} />
        </div>
      </Fragment>
    </div>
  );
}
