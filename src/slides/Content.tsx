import { Slide, Fragment, Code } from "@revealjs/react";
import { Frame, Kicker } from "../components/Frame";

/* Layout: STATEMENT — one big idea, nothing else. */
export function StatementSlide() {
  return (
    <Slide>
      <Frame section="thesis" speaker="adam" center grid>
        <Kicker>thesis</Kicker>
        <h1 style={{ fontSize: 132, marginTop: 48, maxWidth: "14ch" }}>
          Most code will be <span className="hl-cyan">written</span> by agents and{" "}
          <span className="hl-lime">read</span> by nobody.
        </h1>
      </Frame>
    </Slide>
  );
}

/* Layout: TITLE + BULLETS — headline left, fragment list right. */
export function BulletsSlide() {
  const points = [
    ["Agents need a unit of work", "A ticket they can claim, with a definition of done."],
    ["Automation needs a unit of behavior", "Typed methods, not a prompt and a prayer."],
    ["Humans need a unit of decision", "The calls that matter, surfaced with evidence."],
  ];
  return (
    <Slide notes="Walk each bullet. Pause after the third.">
      <Frame section="the-problem" speaker="dylan" flush>
        <div className="cells cells--5-7">
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <Kicker>the problem</Kicker>
            <h2 style={{ fontSize: 80 }}>Three missing primitives</h2>
            <p className="lead">Everything else is plumbing.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ul className="list" style={{ width: "100%" }}>
              {points.map(([t, sub], i) => (
                <Fragment key={t} as="li" animation={"rise" as never}>
                  <span className="list__idx">0{i + 1}</span>
                  <span>
                    {t}
                    <span className="list__sub">{sub}</span>
                  </span>
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

/* Layout: TWO-COLUMN COMPARE — before / after, or Swamp / Until. */
export function CompareSlide() {
  return (
    <Slide>
      <Frame section="before-after" speaker="both" flush>
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100%" }}>
          <div style={{ padding: "48px 64px", borderBottom: "1px solid var(--line)" }}>
            <h2>Same task, two shapes</h2>
          </div>
          <div className="cells cells--2">
            <CompareCol
              tone="before"
              label="agent + prompt"
              items={["Re-derives context every run", "Secrets in the context window", "Output is a transcript", "“Looks good to me”"]}
            />
            <CompareCol
              tone="after"
              label="ticket + behavior"
              items={["Context lives in the ticket", "Secrets stay in the vault", "Output is typed data", "A decision, with a diff"]}
            />
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

function CompareCol({ tone, label, items }: { tone: "before" | "after"; label: string; items: string[] }) {
  const after = tone === "after";
  return (
    <div style={{ background: after ? "rgb(217 230 30 / 0.04)" : undefined }}>
      <div className="hud" style={{ color: after ? "var(--until-lime)" : "var(--swamp-pink)" }}>
        {after ? "▲ after" : "▼ before"} — {label}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: "40px 0 0", display: "grid", gap: 28 }}>
        {items.map((t) => (
          <li key={t} style={{ display: "flex", gap: 20, alignItems: "baseline", fontSize: 40, color: after ? "var(--fg)" : "var(--fg-2)" }}>
            <span className="mono" style={{ color: after ? "var(--until-lime)" : "var(--fg-3)", fontSize: 28 }}>
              {after ? "✓" : "×"}
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

const WORKFLOW_YAML = `name: deploy-preview
trigger:
  ticket: until/ready-for-preview
steps:
  - behavior: vault/aws-prod
    method: lease
  - id: instance
    behavior: aws/ec2
    method: start
    args:
      ami: \${{ data.latest("ami", "image").attributes.id }}
  - behavior: github/pr
    method: comment
    args: { body: \${{ steps.instance.output.url }} }`;

/* Layout: CODE — explanation left, code window right, stepped highlights. */
export function CodeSlide() {
  return (
    <Slide notes="Step through the highlights: trigger, vault lease, data reference.">
      <Frame section="behaviors" speaker="adam" flush>
        <div className="cells cells--4-8">
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <Kicker>swamp workflow</Kicker>
            <h2>Tickets trigger behaviors</h2>
            <ol className="muted" style={{ margin: 0, paddingLeft: 40, display: "grid", gap: 20, fontSize: "var(--t-body)" }}>
              <li>The ticket is the trigger</li>
              <li>Secrets are leased</li>
              <li>CEL wires typed data</li>
            </ol>
          </div>
          <div style={{ display: "flex", alignItems: "center", paddingInline: 48 }}>
            <div className="code-window" style={{ width: "100%" }}>
              <div className="code-window__bar">
                <span className="code-window__dots">
                  <i />
                  <i />
                  <i />
                </span>
                workflows/deploy-preview.yaml
              </div>
              <Code language="yaml" lineNumbers="|2-3|5-6|11">
                {WORKFLOW_YAML}
              </Code>
            </div>
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

/* Layout: STATS — four KPI cells, Orbitron numerals. */
export function StatsSlide() {
  const stats = [
    { v: "73", u: "%", label: "of merged PRs had an agent author", color: "var(--until-lime)" },
    { v: "4.2", u: "×", label: "more runs per engineer per week", color: "var(--swamp-cyan)" },
    { v: "0", u: "", label: "secrets in any agent context window", color: "var(--swamp-pink)" },
    { v: "11", u: "s", label: "median time from decision to deploy", color: "var(--gh-green-bright)" },
  ];
  return (
    <Slide>
      <Frame section="by-the-numbers" speaker="dylan" flush footer={<span>Sample data — replace before the talk</span>}>
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100%" }}>
          <div style={{ padding: "48px 64px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
            <h2>Six months in production</h2>
            <Kicker>sample data</Kicker>
          </div>
          <div className="cells cells--4">
            {stats.map((s) => (
              <Fragment key={s.label} animation="fade-up" asChild>
                <div className="stat" style={{ ["--stat-color" as string]: s.color }}>
                  <div className="stat__value">
                    {s.v}
                    <span className="stat__unit">{s.u}</span>
                  </div>
                  <div className="stat__label">{s.label}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

/* Layout: QUOTE on Universe paper — the light-surface variant. */
export function QuoteSlide() {
  return (
    <Slide>
      <Frame section="field-notes" speaker="dylan" variant="paper" center grid>
        <div style={{ maxWidth: 1500 }}>
          <span className="quote__mark">“</span>
          <p className="quote">
            I stopped reviewing the code. I started reviewing the <span className="hl-green">decisions</span>.
          </p>
          <div className="quote__by">
            <b>Staff engineer</b> — design partner (placeholder)
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

/* Layout: MEDIA + CAPTION — full-height image cell with text cell. */
export function MediaSlide() {
  return (
    <Slide>
      <Frame section="in-the-wild" speaker="adam" flush>
        <div className="cells cells--7-5">
          <div style={{ padding: 0 }}>
            <div className="media">
              {/* Replace with <img src="/media/....jpg" alt="..." /> */}
              <div className="media__placeholder">public/media/screenshot.png · 1120×936</div>
              <div className="media__caption">fig.01 — swamp run log, deploy-preview</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 36 }}>
            <Kicker>in the wild</Kicker>
            <h2 style={{ fontSize: 72 }}>Every run leaves a receipt</h2>
            <p className="lead">Inputs, outputs, who approved it, and which secret was leased, all queryable.</p>
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

/* Layout: DEMO HANDOFF — Swamp HUD screen. */
export function DemoSlide() {
  return (
    <Slide transition="none">
      <Frame section="live" speaker="both" center grid>
        <div style={{ textAlign: "center", display: "grid", justifyItems: "center", gap: 40 }}>
          <div className="hud">// switching to terminal //</div>
          <h1 className="orbitron glitch glitch--live" style={{ fontSize: 220 }}>
            LIVE_DEMO
          </h1>
          <span className="btn-hud">issue → ticket → behavior → merged</span>
        </div>
      </Frame>
    </Slide>
  );
}

/* Layout: CLOSER — thanks + links, lime Until surface. */
export function ThanksSlide() {
  return (
    <Slide>
      <Frame section="thanks" speaker="both" variant="lime" flush>
        <div className="cells cells--7-5">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Kicker>q&amp;a</Kicker>
            <h1 className="display" style={{ fontSize: 200 }}>
              Thank
              <br />
              you
            </h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 32, fontSize: "var(--t-body)" }}>
            <LinkRow label="Swamp" href="swamp-club.com" />
            <LinkRow label="Until" href="until.dev" />
            <LinkRow label="Slides" href="github.com/…" />
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

function LinkRow({ label, href }: { label: string; href: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line-strong)", paddingBottom: 18 }}>
      <span className="hud" style={{ color: "var(--fg)" }}>
        {label}
      </span>
      <span className="mono">{href} ↗</span>
    </div>
  );
}
