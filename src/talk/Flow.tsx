import { Slide } from "@revealjs/react";
import { Frame } from "../components/Frame";
import { Fragment as Group, type ReactNode } from "react";
import { UntlDashboard } from "./UntlDashboard";
import { ActivityLegend, DayTimeline, TicketLegend, TicketTimeline } from "./DayTimeline";
import { batchAlone, breakpoint, interrupt, makerMornings, rhythmGoalie, type Strategy } from "./flowData";

/* Flow (Dylan). Slides in running order; Talk.tsx lists them. */

const SIM_FOOTER = <span>Simulated team of three, from our team attention model, not measured data</span>;

function StrategyHeading({ s, sub }: { s: Strategy; sub?: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2>{s.name}</h2>
      <p className="muted" style={{ margin: "12px 0 0", fontSize: "var(--t-label)" }}>
        {sub ?? s.desc}
      </p>
    </div>
  );
}

/* A strategy's day, one lane per person. */
function PeopleSlide({ s, notes }: { s: Strategy; notes: ReactNode }) {
  return (
    <Slide>
      <Frame footer={SIM_FOOTER}>
        <StrategyHeading s={s} />
        <DayTimeline strategy={s} />
        <div style={{ marginTop: 28 }}>
          <ActivityLegend goalie={s.goalie.length > 0} />
        </div>
      </Frame>
      <aside className="notes">{notes}</aside>
    </Slide>
  );
}

/* The same day from the tickets' side, one row per ticket in flight. */
function TicketsSlide({ s, notes }: { s: Strategy; notes?: ReactNode }) {
  const shipped = s.tickets.filter((t) => t.shipped != null).length;
  return (
    <Slide>
      <Frame footer={SIM_FOOTER}>
        <StrategyHeading s={s} sub={`The same day, ticket by ticket: ${s.tickets.length} in flight, ${shipped} shipped.`} />
        <TicketTimeline strategy={s} />
        <div style={{ marginTop: 28 }}>
          <TicketLegend />
        </div>
      </Frame>
      <aside className="notes">
        {notes ?? (
          <ul>
            <li>The same day from the tickets’ point of view. Each row is a ticket; pink is a ticket waiting on a person.</li>
          </ul>
        )}
      </aside>
    </Slide>
  );
}

/* 1 — A day of interrupt-driven work, then its tickets. */
export function FlowInterruptSlides() {
  return (
    <>
      <PeopleSlide
        s={interrupt}
        notes={
          <ul>
            <li>One thing we lost from before was flow state</li>
            <li>There are so many tools and products now pulling us in every direction, dealing with loads more notifications now that work moves way faster, very few of us were able to get actual time to work on things</li>
            <li>You’re burning more and more brainpower on context switching, which forces you to offload some of the more interesting thinking to the agents (which you’d rather be doing) because you’re overloaded</li>
            <li>We looked at whether it’s possible to get the flow state back, without sacrificing throughput</li>
          </ul>
        }
      />
      <TicketsSlide s={interrupt} />
    </>
  );
}

const TRIED: { s: Strategy; notes: ReactNode }[] = [
  {
    s: batchAlone,
    notes: (
      <ul>
        <li>Go through and explain each of the strategies we tried</li>
        <li>
          <b>Everyone batches alone.</b> Each person gets private 20-minute windows at different times. Lots of focus,
          but nobody’s free at the same time, so work piles up and agents sit idle.
        </li>
      </ul>
    ),
  },
  {
    s: makerMornings,
    notes: (
      <ul>
        <li>
          <b>Maker mornings.</b> Nobody is interrupted before lunch, then everyone is interrupt-driven in the afternoon.
        </li>
      </ul>
    ),
  },
  {
    s: rhythmGoalie,
    notes: (
      <ul>
        <li>
          <b>Team rhythm + goalie.</b> Four shared windows a day, plus a rotating goalie who handles teammate reviews
          immediately. The outline shows who’s goalie when.
        </li>
      </ul>
    ),
  },
  {
    s: breakpoint,
    notes: (
      <ul>
        <li>
          <b>Breakpoint-driven.</b> Nobody is pulled out of flow. You pick up waiting work at a natural break, or once
          something has waited 90 minutes.
        </li>
      </ul>
    ),
  },
];

/* 2 — The strategies we tried: each one's people, then its tickets. */
export function FlowStrategySlides() {
  return (
    <>
      {TRIED.map(({ s, notes }) => (
        <Group key={s.name}>
          <PeopleSlide s={s} notes={notes} />
          <TicketsSlide s={s} />
        </Group>
      ))}
    </>
  );
}

const hm = (m: number) => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;

const pct = (from: number, to: number) => `${to > from ? "+" : "−"}${Math.round((Math.abs(to - from) / from) * 100)}%`;
const dMin = (from: number, to: number) => `${to > from ? "+" : "−"}${hm(Math.abs(to - from))}`;

const I = interrupt.stats;
const B = breakpoint.stats;
/** better: whether breakpoint-driven comes out ahead on this measure. */
const COMPARE: { label: string; from: string; to: string; delta: string; better: boolean }[] = [
  { label: "Deep focus", from: hm(I.deepFocusMin), to: hm(B.deepFocusMin), delta: dMin(I.deepFocusMin, B.deepFocusMin), better: true },
  { label: "Context switches", from: String(I.switches), to: String(B.switches), delta: pct(I.switches, B.switches), better: true },
  { label: "Tickets shipped", from: String(I.shippedPerPerson), to: String(B.shippedPerPerson), delta: pct(I.shippedPerPerson, B.shippedPerPerson), better: true },
  { label: "Plan to shipped", from: hm(I.leadMin), to: hm(B.leadMin), delta: dMin(I.leadMin, B.leadMin), better: false },
];

/* 3 — Interrupt-driven vs breakpoint-driven, per person per day, with the change. */
export function FlowCompareSlide() {
  const num = { fontFamily: "var(--font-hud)", fontWeight: 800, lineHeight: 1, fontVariantNumeric: "tabular-nums" } as const;
  const cell = { padding: "0 40px", display: "flex", alignItems: "center", borderBottom: "1px solid var(--line)" } as const;
  const head = { padding: "48px 40px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "end" } as const;
  return (
    <Slide>
      <Frame flush footer={SIM_FOOTER}>
        <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr 1fr 0.9fr", gridTemplateRows: "auto repeat(4, 1fr)", height: "100%" }}>
          <div style={{ padding: "48px 64px", borderBottom: "1px solid var(--line)" }}>
            <h2>Per person, per day</h2>
          </div>
          <div className="hud" style={head}>
            {interrupt.name}
          </div>
          <div className="hud" style={{ ...head, color: "var(--until-lime)" }}>
            {breakpoint.name}
          </div>
          <div className="hud" style={head}>
            Change
          </div>
          {COMPARE.map((r) => (
            <Group key={r.label}>
              <div style={{ ...cell, padding: "0 64px", fontSize: "var(--t-body)" }}>{r.label}</div>
              <div style={{ ...cell, ...num, fontSize: 72, color: "var(--fg-3)" }}>{r.from}</div>
              <div style={{ ...cell, ...num, fontSize: 72, color: "var(--until-lime)" }}>{r.to}</div>
              <div style={{ ...cell, ...num, fontSize: 56, color: r.better ? "var(--gh-green-bright)" : "var(--swamp-pink)" }}>{r.delta}</div>
            </Group>
          ))}
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>
            Breakpoint-driven gives everyone {hm(B.deepFocusMin)} of deep focus a day instead of {hm(I.deepFocusMin)},
            with half the context switches, and we ship slightly more.
          </li>
          <li>
            The trade-off: each ticket takes longer from plan to shipped, because work waits for a natural break. Your
            day is better; any one ticket is a bit slower.
          </li>
          <li>(Also in the model: time with too much held in your head goes up, {I.overCapPct}% → {B.overCapPct}%.)</li>
        </ul>
      </aside>
    </Slide>
  );
}

/* 4 — So how do we do this? The untl dashboard plays its story on the right. */
export function FlowHowSlide() {
  return (
    <Slide>
      <Frame flush>
        <div className="cells cells--4-8">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 48 }}>
            <h1 style={{ fontSize: 96 }}>So how do we do this…?</h1>
            <p className="lead">
              A different way of working, with no inbox, that actually works for you and{" "}
              <span className="hl-lime">manages your attention</span>.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", paddingInline: 48 }}>
            <UntlDashboard />
          </div>
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>So how do we do this…?</li>
          <li>Need a different way of working that doesn’t have an inbox and actually works for you and manages your attention</li>
        </ul>
      </aside>
    </Slide>
  );
}
