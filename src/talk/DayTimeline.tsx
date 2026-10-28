import { useId } from "react";
import { BRAND, DATA } from "../viz/palette";
import type { Activity, Strategy, TicketState } from "./flowData";

const NAMES = ["Ana", "Ben", "Cam"];
const DAY = 540; // 09:00–18:00 in minutes
const LUNCH: readonly [number, number] = [180, 240];
const W = 1728;
const LABEL_W = 110;
const AXIS_H = 44;
const LANE_H = 104;

const x = (m: number) => LABEL_W + (m / DAY) * (W - LABEL_W);

const FILL: Record<Activity, string> = {
  flow: DATA.lime,
  ramp: DATA.lime,
  review: DATA.cyan,
  agent: DATA.pink,
  off: BRAND.ink2,
};

const ACTIVITY_LEGEND: { kind: Activity; label: string }[] = [
  { kind: "flow", label: "Deep work" },
  { kind: "ramp", label: "Context switching" },
  { kind: "review", label: "Reviewing plans & PRs" },
  { kind: "agent", label: "Answering agents" },
];

const TICKET_FILL: Record<TicketState, string> = {
  plan: DATA.lime,
  person: DATA.cyan,
  agent: DATA.purple,
  wait: DATA.pink,
};

const TICKET_LEGEND: { kind: TicketState; label: string }[] = [
  { kind: "plan", label: "Plan being written" },
  { kind: "person", label: "A person on it" },
  { kind: "agent", label: "Agent building" },
  { kind: "wait", label: "Waiting on a person" },
];

function HourAxis({ height }: { height: number }) {
  return (
    <>
      {Array.from({ length: 10 }, (_, h) => (
        <g key={h}>
          <line x1={x(h * 60)} x2={x(h * 60)} y1={AXIS_H - 8} y2={height} stroke={BRAND.line} />
          <text
            x={x(h * 60)}
            y={26}
            textAnchor={h === 0 ? "start" : h === 9 ? "end" : "middle"}
            fill={BRAND.fg3}
            fontSize={26}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {9 + h}:00
          </text>
        </g>
      ))}
    </>
  );
}

/** One simulated day: a lane per person, coloured by what they're doing. Goalie shifts are outlined. */
export function DayTimeline({ strategy }: { strategy: Strategy }) {
  const hatch = useId();
  const { lanes, goalie } = strategy;
  const gap = goalie.length ? 52 : 28;
  const H = AXIS_H + (goalie.length ? 36 : 0) + lanes.length * (LANE_H + gap);
  const top = AXIS_H + (goalie.length ? 36 : 0);

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`A simulated day for each person: ${strategy.name}`} style={{ display: "block" }}>
      <defs>
        <pattern id={hatch} patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke={BRAND.ink1} strokeWidth="4" />
        </pattern>
      </defs>
      <HourAxis height={H} />
      {lanes.map((segs, p) => {
        const y = top + p * (LANE_H + gap);
        return (
          <g key={p}>
            <text x={0} y={y + LANE_H / 2 + 11} fill={BRAND.fg2} fontSize={30} style={{ fontFamily: "var(--font-body)" }}>
              {NAMES[p]}
            </text>
            {segs.map(([a, b, k]) => (
              <g key={a}>
                <rect x={x(a)} y={y} width={x(b) - x(a)} height={LANE_H} fill={FILL[k]} opacity={k === "ramp" ? 0.45 : 1} />
                {k === "ramp" && <rect x={x(a)} y={y} width={x(b) - x(a)} height={LANE_H} fill={`url(#${hatch})`} />}
              </g>
            ))}
            {goalie[p]?.map(([a, b]) => (
              <g key={`g${a}`}>
                <rect x={x(a)} y={y - 4} width={x(b) - x(a)} height={LANE_H + 8} fill="none" stroke={BRAND.fg} strokeWidth={4} />
                <text x={x(a) + 4} y={y - 14} fill={BRAND.fg} fontSize={26} fontWeight={600} letterSpacing="0.14em" style={{ fontFamily: "var(--font-label)" }}>
                  GOALIE
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** The same day from the tickets' point of view: a row per ticket in flight. */
export function TicketTimeline({ strategy, height = 560 }: { strategy: Strategy; height?: number }) {
  const { tickets } = strategy;
  const rowH = Math.min(30, (height - AXIS_H) / tickets.length);
  const barH = Math.max(6, rowH * 0.72);
  const H = AXIS_H + tickets.length * rowH;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Each ticket's day: ${strategy.name}`} style={{ display: "block" }}>
      <rect x={x(LUNCH[0])} y={AXIS_H - 8} width={x(LUNCH[1]) - x(LUNCH[0])} height={H - AXIS_H + 8} fill={BRAND.ink2} />
      <HourAxis height={H} />
      {tickets.map((t, i) => {
        const y = AXIS_H + i * rowH + (rowH - barH) / 2;
        return (
          <g key={t.id}>
            {t.segs.map(([a, b, k]) => (
              <rect key={a} x={x(a)} y={y} width={Math.max(2, x(b) - x(a))} height={barH} fill={TICKET_FILL[k]} opacity={k === "plan" ? 0.55 : 1} />
            ))}
            {t.shipped != null && <circle cx={x(t.shipped)} cy={y + barH / 2} r={Math.min(8, barH / 2 + 2)} fill={BRAND.fg} />}
          </g>
        );
      })}
    </svg>
  );
}

function Swatch({ color, style }: { color: string; style?: React.CSSProperties }) {
  return <span className="legend__swatch legend__swatch--box" style={{ background: color, ...style }} />;
}

export function ActivityLegend({ goalie }: { goalie?: boolean }) {
  return (
    <div className="legend">
      {ACTIVITY_LEGEND.map(({ kind, label }) => (
        <span key={kind} className="legend__item">
          <Swatch
            color={
              kind === "ramp" ? `repeating-linear-gradient(45deg, ${BRAND.ink1} 0 3px, transparent 3px 7px), ${FILL.ramp}` : FILL[kind]
            }
            style={kind === "ramp" ? { opacity: 0.7 } : undefined}
          />
          {label}
        </span>
      ))}
      <span className="legend__item">
        <Swatch color={FILL.off} style={{ outline: `1px solid ${BRAND.lineStrong}` }} />
        Lunch
      </span>
      {goalie && (
        <span className="legend__item">
          <Swatch color="transparent" style={{ outline: `3px solid ${BRAND.fg}`, outlineOffset: -3 }} />
          On goalie duty
        </span>
      )}
    </div>
  );
}

export function TicketLegend() {
  return (
    <div className="legend">
      {TICKET_LEGEND.map(({ kind, label }) => (
        <span key={kind} className="legend__item">
          <Swatch color={TICKET_FILL[kind]} style={kind === "plan" ? { opacity: 0.55 } : undefined} />
          {label}
        </span>
      ))}
      <span className="legend__item">
        <span className="legend__swatch" style={{ background: BRAND.fg, borderRadius: "50%", width: 18, height: 18 }} />
        Shipped
      </span>
    </div>
  );
}
