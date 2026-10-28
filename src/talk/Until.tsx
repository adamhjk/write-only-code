import { Slide, Fragment } from "@revealjs/react";
import { Frame, Kicker } from "../components/Frame";
import { UntilWordmark } from "../components/Brand";
import { LineChart, type Series } from "../viz/LineChart";
import { DATA } from "../viz/palette";

/* Coding @ Until (Dylan). Slides in running order; Talk.tsx lists them. */

/* 1 — Who we are. */
export function UntilWhoSlide() {
  return (
    <Slide>
      <Frame flush>
        <div className="cells cells--7-5">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 48 }}>
            <span style={{ color: "var(--fg)" }}>
              <UntilWordmark height={72} />
            </span>
            <h2 style={{ fontSize: "var(--t-h1)", maxWidth: "13ch" }}>
              Developer <span className="hl-lime">attention</span> over keeping agents busy
            </h2>
            <p className="lead">Human work and agent work, clearly separated.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 40 }}>
            <Kicker>we also run</Kicker>
            <p style={{ fontSize: "var(--t-h3)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0 }}>
              Infrastructure that simulates cloud changes in production
            </p>
            <p className="muted" style={{ fontSize: "var(--t-body)", margin: 0 }}>
              for massive-scale companies like Box.com
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <span className="tag">ISO 27001</span>
              <span className="tag">SOC 2</span>
            </div>
          </div>
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>We are a small startup building Until, a platform prioritizes developer attention over keeping agents busy, and clearly separates human work from agent work</li>
          <li>We also maintain infrastructure that simulates cloud changes in production and some massive scale companies like Box.com, so we have ISO27001, SOC2 etc to think about</li>
        </ul>
      </aside>
    </Slide>
  );
}

// Illustrative only: the shape of the trend, not measured data. No numbers
// are shown anywhere on the chart.
const MONTHS = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const PR_TREND: Series[] = [
  { key: "size", label: "PR size", color: DATA.lime, values: [30, 34, 41, 47, 58, 70, 84] },
  { key: "review", label: "Time spent reviewing", color: DATA.pink, values: [62, 60, 55, 49, 41, 33, 26] },
];
const NO_NUMBERS = () => "";

/* 2 — PRs got bigger, reviews got shorter. */
export function UntilSleepwalkSlide() {
  return (
    <Slide>
      <Frame footer={<span>Illustrative: the shape of the trend, not measured data</span>}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 12 }}>
          <h2>Sleepwalking into rubber-stamping</h2>
          <Kicker>illustrative</Kicker>
        </div>
        <LineChart series={PR_TREND} xLabels={MONTHS} yLabel="" height={720} format={NO_NUMBERS} />
      </Frame>
      <aside className="notes">
        <ul>
          <li>We found towards the beginning of the year that our PR size was climbing and PR review time was falling, and this was not a good thing. We were sleepwalking into rubber-stamping changes rather than doing proper review</li>
        </ul>
      </aside>
    </Slide>
  );
}

/* 3 — Disrespecting each other's time. */
export function UntilRespectSlide() {
  return (
    <Slide>
      <Frame center grid>
        <Kicker>worse than that</Kicker>
        <h1 style={{ fontSize: 112, marginTop: 48, maxWidth: "24ch" }}>
          I asked someone I respect to review something I <span className="hl-pink">didn’t care about</span>.
        </h1>
      </Frame>
      <aside className="notes">
        <ul>
          <li>Worse than that we were disrespectful of each other’s time. I would submit a PR to review, wait a day or so, and then get comments back, only to think “I’ve done so much stuff since then that I don’t even remember what that code was trying to do. To be honest you would be better placed to fix this issue than I would because at least you’ve reviewed the code”</li>
          <li>I’d asked someone who I respect to spend their precious time reviewing something that didn’t care about</li>
        </ul>
      </aside>
    </Slide>
  );
}

/* 4 — An agent is not your peer. */
export function UntilNotAPeerSlide() {
  return (
    <Slide>
      <Frame flush>
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100%" }}>
          <div style={{ padding: "48px 64px", borderBottom: "1px solid var(--line)" }}>
            <h2>An AI agent is not your peer</h2>
          </div>
          <div className="cells cells--2">
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 40 }}>
              <div className="hud">a peer’s PR</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 32 }}>
                {[
                  "They cared about every line",
                  "Disagree, and someone learns: them or you",
                  "A vision for where the product is going",
                  "They care about maintenance, and debugging it at 3am",
                  "Passion and creativity",
                ].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 20, alignItems: "baseline", fontSize: "var(--t-lead)" }}>
                    <span className="mono" style={{ color: "var(--until-lime)", fontSize: 30 }}>
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <Fragment animation="fade-up" asChild>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 40 }}>
                <div className="hud" style={{ color: "var(--swamp-pink)" }}>
                  an agent’s PR
                </div>
                <p className="quote" style={{ margin: 0, fontSize: 96, lineHeight: 1.05 }}>
                  “You’re absolutely right!”
                </p>
              </div>
            </Fragment>
          </div>
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>We realized that an AI Agent is fundamentally not your peer, it’s missing the things that make a peer valuable</li>
          <li>[click] Previously if I sent a PR to someone to review I was guaranteed that something positive would happen, either they would learn or I would, now when I send feedback all I get is “You’re absolutely right”</li>
          <li>This was the case because I cared about every line in that PR, and it’s simply no longer true</li>
        </ul>
      </aside>
    </Slide>
  );
}

type Step = { label: string; who: "human" | "agent"; peer?: boolean };

const STEPS: Step[] = [
  { label: "Write the plan", who: "human" },
  { label: "Plan review", who: "human", peer: true },
  { label: "Agent builds", who: "agent" },
  { label: "PR checked against the plan", who: "agent" },
  { label: "Merged", who: "agent" },
];

const WHO_COLOR = { human: "var(--until-lime)", agent: "var(--gh-purple)" } as const;

// Mock plan for the plan-mode window. Every line is a decision a human cares about.
const PLAN: { h: string; items: string[] }[] = [
  { h: "API", items: ["POST /webhooks/:id → 429 + Retry-After", "60 req/min per source, per workspace"] },
  { h: "Storage", items: ["Token bucket in Redis"] },
  { h: "Tests", items: ["Burst of 61 → exactly 1 rejected", "Bucket refills after 60s"] },
  { h: "Out of scope", items: ["UI for configuring limits"] },
];

/* A Claude Code plan-mode session, drawn in the deck's code-window chrome. */
export function PlanModeMock() {
  const line = { fontSize: "var(--t-label)", lineHeight: 1.45 } as const;
  return (
    <div className="code-window" style={{ width: "100%" }}>
      <div className="code-window__bar">
        <span className="code-window__dots">
          <i />
          <i />
          <i />
        </span>
        claude — ~/until
      </div>
      <div className="mono" style={{ ...line, padding: "20px 28px", display: "grid", gap: 14 }}>
        <div>
          <span className="faint">&gt; </span>add rate limiting to inbound webhooks
        </div>
        <div style={{ border: "1px solid var(--line-strong)", borderRadius: "var(--radius)", padding: "16px 24px" }}>
          <div style={{ color: "var(--swamp-cyan)", fontWeight: 700 }}>Plan: rate-limit inbound webhooks</div>
          {PLAN.map((sec) => (
            <div key={sec.h} style={{ marginTop: 8 }}>
              <div style={{ fontWeight: 700 }}>{sec.h}</div>
              {sec.items.map((it) => (
                <div key={it} className="muted">
                  · {it}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <div>Would you like to proceed?</div>
          <div style={{ color: "var(--swamp-cyan)" }}>❯ 1. Yes</div>
          <div className="muted">&nbsp;&nbsp;2. No, keep planning</div>
        </div>
        <div style={{ color: "var(--swamp-cyan)" }}>⏸ plan mode on</div>
      </div>
    </div>
  );
}

/* 5 — Peer review the plan. Plan-mode mockup left; steps reveal one click at a time on the right. */
export function UntilProcessSlide() {
  return (
    <Slide>
      <Frame flush>
        <div className="cells cells--2">
          <div style={{ display: "flex", alignItems: "center", paddingBlock: 40 }}>
            <PlanModeMock />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, minHeight: 0 }}>
            <h2 style={{ marginBottom: 12 }}>
              We care about every line in the <span className="hl-lime">plan</span>
            </h2>
            {STEPS.map((s, i) => (
              <Fragment key={s.label} animation="fade-up" asChild>
                <div
                  style={{
                    border: `1.5px solid ${WHO_COLOR[s.who]}`,
                    borderLeftWidth: 8,
                    borderRadius: "var(--radius)",
                    background: s.peer ? "rgb(217 230 30 / 0.08)" : "var(--ink-2)",
                    padding: "0 24px",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                  }}
                >
                  <span className="hud" style={{ color: WHO_COLOR[s.who], width: 190, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")} · {s.who}
                  </span>
                  <span style={{ fontSize: "var(--t-body)", fontWeight: 600, letterSpacing: "-0.015em" }}>{s.label}</span>
                  {s.peer && (
                    <span className="mono" style={{ fontSize: "var(--t-label)", color: "var(--until-lime)", marginLeft: "auto" }}>
                      ★ peer review
                    </span>
                  )}
                </div>
              </Fragment>
            ))}
            <Fragment animation="fade-up" asChild>
              <div
                style={{
                  borderLeft: "2px dashed var(--swamp-pink)",
                  padding: "4px 0 4px 28px",
                  fontSize: "var(--t-small)",
                  lineHeight: 1.3,
                  color: "var(--fg-2)",
                }}
              >
                <span className="hl-pink">Differs from the plan?</span> Back to the plan’s reviewer, for just the
                differences.
              </div>
            </Fragment>
          </div>
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>We looked for the thing that we did care about every line in</li>
          <li>We were using plan mode quite a bit since it produced much better results, and we realized that we did care about every line in The plan, so that’s the thing we should be peer reviewing</li>
          <li>That meant that we were doing peer review before the code was written, so what happens with the PR?</li>
          <li>[SHOW THE PROCESS] [click through the five steps, then the “differs from the plan” note]</li>
        </ul>
      </aside>
    </Slide>
  );
}

type Stat = { v: string; u: string; label: string; color: string };

const THROUGHPUT: Stat[] = [
  { v: "3.2", u: "×", label: "issues completed", color: "var(--until-lime)" },
  { v: "3.4", u: "×", label: "commits", color: "var(--swamp-cyan)" },
  { v: "−59", u: "%", label: "lead time, 3.2 days → 1.3 days", color: "var(--gh-green-bright)" },
];

const FEEDBACK: Stat[] = [
  { v: "2.8", u: "×", label: "more likely to give feedback", color: "var(--until-lime)" },
  { v: "+40", u: "m", label: "to a rejected plan", color: "var(--swamp-cyan)" },
  { v: "+16", u: "h", label: "to a rejected PR", color: "var(--swamp-pink)" },
  { v: "8", u: "%", label: "of plans abandoned, with zero code written", color: "var(--gh-green-bright)" },
];

/* One row: a question first; on its click the question fades out and the stats fade in. */
function StatRow({ question, stats, index }: { question: string; stats: Stat[]; index: number }) {
  return (
    <div style={{ position: "relative", minHeight: 0, borderBottom: "1px solid var(--line)" }}>
      <Fragment animation="fade-out" index={index} asChild>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 64px" }}>
          <p style={{ margin: 0, fontSize: "var(--t-h2)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {question}
          </p>
        </div>
      </Fragment>
      <Fragment animation="fade-in" index={index} asChild>
        <div className={`cells cells--${stats.length}`}>
          {stats.map((s) => (
            <div key={s.label} className="stat" style={{ ["--stat-color" as string]: s.color, paddingBlock: 40 }}>
              <div className="stat__value">
                {s.v}
                <span className="stat__unit">{s.u}</span>
              </div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </Fragment>
    </div>
  );
}

/* 6 — Results. Numbers from the SRECon ’26 talk. Two clicks: each answers its question. */
export function UntilResultsSlide() {
  return (
    <Slide>
      <Frame flush>
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr 1fr", height: "100%" }}>
          <div style={{ padding: "48px 64px", borderBottom: "1px solid var(--line)" }}>
            <h2>Results</h2>
          </div>
          <StatRow index={0} question="Did it make us faster?" stats={THROUGHPUT} />
          <StatRow
            index={1}
            question="Did it make us better, or did we just rubber-stamp plans instead?"
            stats={FEEDBACK}
          />
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>Use the results from the slides in gtm/presentations, like the SRECon one where we show how much it improved our throughput</li>
          <li>At this point I’ll also use that talk track, explaining that it’s easier to give feedback because people are less invested</li>
          <li>
            From the SRECon talk track:
            <ul>
              <li>
                [click] We made these changes while we were still in France and tested it for the next two weeks and the results were immediate
                <ul>
                  <li>We tripled the number of issues we got completed, and the number of commits. And our lead time fell from 3.2 days to 1.3 days within the first two weeks</li>
                </ul>
              </li>
              <li>No amount of time saved in code review could account for that much improvement, the reason we were so much faster that is that we were more efficient with our attention</li>
              <li>[click] One thing that we were worried about was that people would simply rubber stamp the plans. The author would let the agent write it and not really read it, and the reviewer would not really read it either. After all this is what was happening with code review. We’d found that PRs had been getting bigger and our rejection rate had been dropping for months.</li>
              <li>The opposite happened, and in hindsight the reasons are obvious</li>
              <li>It’s a lot easier to tell my wife I don’t really feel like salad when we’re reading the recipe book than it is after it’s been cooked and is ready to eat</li>
              <li>The same goes for code, it’s usually the most senior engineers that do the code review, partly because it’s complicated, but also because it just takes a sort of Gordon Ramsay dickhead energy to tell someone to go back and cook it again, and rightly so</li>
              <li>A plan that was rejected took 40min longer to deliver end to end than one that wasn’t. A PR that was rejected added 16 hours to the lead time.</li>
              <li>This all means that we’re 2.8x more likely to give feedback from before, and that feedback is coming from more people. Everyone in the company does plan review, and it’s not uncommon for a product manager to reject a plan from an engineer and vice versa</li>
              <li>We even completely abandon work 8% of the time. It doesn’t sound good but I think it’s amazing. It means that something that sounded worthwhile when we were thinking about WHAT to build, no longer made sense when we considered HOW to build it, so we just abandoned it. And we did so before writing a single line of code</li>
            </ul>
          </li>
        </ul>
      </aside>
    </Slide>
  );
}
