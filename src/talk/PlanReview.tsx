import type { ReactNode } from "react";
import { Slide, Fragment } from "@revealjs/react";
import { Frame } from "../components/Frame";
import { ConfidenceChart, type SampleWeek } from "./ConfidenceChart";
import { PlanModeMock } from "./Until";

/* Plan Review (Dylan). Slides in running order; Talk.tsx lists them. */

function CheckList({ label, items, tone }: { label: string; items: string[]; tone: "in" | "out" }) {
  const isIn = tone === "in";
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div className="hud" style={{ color: isIn ? "var(--until-lime)" : "var(--fg-3)" }}>
        {label}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 }}>
        {items.map((t) => (
          <li
            key={t}
            style={{ display: "flex", gap: 20, alignItems: "baseline", fontSize: "var(--t-body)", color: isIn ? "var(--fg)" : "var(--fg-2)" }}
          >
            <span className="mono" style={{ color: isIn ? "var(--until-lime)" : "var(--fg-3)", fontSize: 28 }}>
              {isIn ? "✓" : "×"}
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 1 — What's in a plan, and what isn't. Same plan as the intro. */
export function PlanContentsSlide() {
  return (
    <Slide>
      <Frame flush>
        <div className="cells cells--2">
          <div style={{ display: "flex", alignItems: "center", paddingBlock: 40 }}>
            <PlanModeMock />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 48 }}>
            <h2>What’s in a plan, and what isn’t</h2>
            <CheckList tone="in" label="in the plan · we care" items={["How it’s tested", "How it performs", "The shape of the API"]} />
            <CheckList
              tone="out"
              label="not in the plan · the agent decides"
              items={["Which files the code goes in", "What the helpers are called", "How the token bucket is built"]}
            />
          </div>
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>
            What’s in a plan, and what isn’t
            <ul>
              <li>Everything you care about is in the plan, and everything you don’t care about isn’t</li>
              <li>The agreement between you and the reviewer is that you both agree that there will be some things in which the agent will have to read between the lines and extrapolate, and we both will accept whatever it comes up with there, as long as everything else is true</li>
              <li>If you care about how something is tested, that goes in the plan</li>
              <li>If you care about how it performs, those requirements go in the plan</li>
              <li>If you don’t care about what files the code goes in, you don’t put that in the plan</li>
            </ul>
          </li>
        </ul>
      </aside>
    </Slide>
  );
}

type BarTone = "muted" | "path" | "lime" | "dashed";

// Roughly to scale: a project is 3 phases, a phase is 4 tickets, and a plan
// and its PR are the size of one ticket. Positions are % of the row width.
const PHASES = [0, 1, 2].map((i) => ({ left: (i * 100) / 3, width: 100 / 3 }));
const TICKETS = [0, 1, 2, 3].map((i) => ({ left: (i * 100) / 12, width: 100 / 12 }));
const TICKET = TICKETS[0];

function Bar({ left, width, tone, label }: { left: number; width: number; tone: BarTone; label?: string }) {
  const lime = tone === "lime" || tone === "dashed";
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: `calc(${left}% + 3px)`,
        width: `calc(${width}% - 6px)`,
        border: `${tone === "dashed" ? "2px dashed" : "1.5px solid"} ${
          lime ? "var(--until-lime)" : tone === "path" ? "var(--fg-3)" : "var(--line-strong)"
        }`,
        borderRadius: "var(--radius)",
        background: tone === "lime" ? "rgb(217 230 30 / 0.16)" : tone === "dashed" ? "transparent" : "var(--ink-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 18px",
      }}
    >
      {label && (
        <span className="mono" style={{ fontSize: "var(--t-label)", color: "var(--until-lime)" }}>
          {label}
        </span>
      )}
    </div>
  );
}

function Row({ label, lime, children }: { label: string; lime?: boolean; children: ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", alignItems: "center", columnGap: 24 }}>
      <span className="hud" style={{ color: lime ? "var(--until-lime)" : "var(--fg-2)" }}>
        {label}
      </span>
      <div style={{ position: "relative", height: 76 }}>{children}</div>
    </div>
  );
}

/* 2 — How big? 1:1:1 on the left; the planning breakdown, roughly to scale, on the right. */
export function PlanSizeSlide() {
  return (
    <Slide>
      <Frame flush>
        <div className="cells cells--5-7">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBlock: 64 }}>
            <h2>How big?</h2>
            <div>
              <div style={{ fontFamily: "var(--font-hud)", fontSize: 120, fontWeight: 800, color: "var(--until-lime)", lineHeight: 1 }}>
                1 : 1 : 1
              </div>
              <div className="mono muted" style={{ fontSize: "var(--t-label)", marginTop: 20 }}>
                ticket : plan : PR
              </div>
            </div>
            <div style={{ display: "grid", gap: 24 }}>
              <Fragment animation="fade-up" index={0} asChild>
                <p className="muted" style={{ margin: 0, fontSize: "var(--t-body)" }}>
                  No plan? Review the code like before.
                </p>
              </Fragment>
              <Fragment animation="fade-up" index={1} asChild>
                <p style={{ margin: 0, fontSize: "var(--t-body)" }}>
                  Everything you care about, nothing you don’t, <span className="hl-lime">at whatever level that is</span>.
                </p>
              </Fragment>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
            <Row label="Project">
              <Bar left={0} width={100} tone="path" />
            </Row>
            <Row label="Phase">
              {PHASES.map((p, i) => (
                <Bar key={i} {...p} tone={i === 0 ? "path" : "muted"} />
              ))}
            </Row>
            <Row label="Ticket">
              {TICKETS.map((t, i) => (
                <Bar key={i} {...t} tone={i === 0 ? "path" : "muted"} />
              ))}
            </Row>
            <Row label="Plan" lime>
              <Fragment animation="fade-in" index={1} asChild>
                <div>
                  <Bar {...PHASES[0]} tone="dashed" label="or here?" />
                </div>
              </Fragment>
              <Bar {...TICKET} tone="lime" />
            </Row>
            <Row label="PR" lime>
              <Bar {...TICKET} tone="lime" />
            </Row>
          </div>
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>
            How big?
            <ul>
              <li>I recommend to start that a plan is the size of your existing PRs, we have a 1:1:1 ratio of ticket → plan → PR</li>
              <li>We didn’t change any of our planning processes in order to do this. We still do a project plan and break it down into phases and break that down into tickets and only at that point do we do a plan</li>
              <li>[click] Also not everything needs to have one. If you have a PR that doesn’t have a plan attached, you just review the code like before</li>
              <li>[click] However the rule of what a plan is means that you can put them at whatever level you want. As long it contains everything you care about and nothing you don’t, you could move where the abstraction is.</li>
            </ul>
          </li>
        </ul>
      </aside>
    </Slide>
  );
}

// Weekly pre-approved PR sampling reviews in Linear (week = end of the review
// window). A miss is a sampled PR where the reviewer found something the bot
// missed. Only the stretch where reviews ran every week (Mar 16 – May 18):
// ENG-3339, 3469, 3583, 3839, 3984, 4118, 4245, 4344. Later tickets have
// long gaps (ticket automation broke) or aren't reviewed yet.
const SAMPLES: SampleWeek[] = [
  { week: "2026-03-23", ok: 1, miss: 2 },
  { week: "2026-03-30", ok: 3, miss: 0 },
  { week: "2026-04-06", ok: 3, miss: 0 },
  { week: "2026-04-20", ok: 3, miss: 0 },
  { week: "2026-04-27", ok: 3, miss: 0 },
  { week: "2026-05-04", ok: 2, miss: 1 },
  { week: "2026-05-11", ok: 3, miss: 0 },
  { week: "2026-05-18", ok: 3, miss: 0 },
];

/* 3 — How do you get confidence? Sampled PRs, confidence band narrowing over time. */
export function PlanConfidenceSlide() {
  return (
    <Slide>
      <Frame footer={<span>Source: weekly sampling reviews of auto-approved PRs, Mar–May 2026</span>}>
        <h2>How do you get confidence that it’s actually right?</h2>
        <p className="muted" style={{ margin: "16px 0 24px", fontSize: "var(--t-body)" }}>
          Each week a person checks a random sample of merged PRs.
        </p>
        <ConfidenceChart weeks={SAMPLES} />
      </Frame>
      <aside className="notes">
        <ul>
          <li>
            How do you get confidence that it’s actually right?
            <ul>
              <li>Using an LLM to validate something where you’re looking for differences inherently works to the strengths of current models. You know how they are, if you ask them to find something wrong with something, they will essentially always find something, no matter how small.</li>
              <li>They are also really good at not being blinded by detail, much more so than a human</li>
              <li>We can also easily measure how good it is using sampling, which can give you a confidence interval which updates over time as the models change</li>
              <li>Could also talk here about the EU AI Act if you want to know what the maximum amount of scrutiny you’re likely to see is you can always look at that</li>
            </ul>
          </li>
        </ul>
      </aside>
    </Slide>
  );
}
