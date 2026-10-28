import { Slide, Fragment } from "@revealjs/react";
import type { ReactNode } from "react";
import { Frame } from "../components/Frame";

/* Team Dynamics (Dylan). Slides in running order; Talk.tsx lists them.
   Pipeline visuals adapted from the Fast Flow Conf ’26 deck. */

type Kind = "product" | "engineering" | "agent";

const KIND: Record<Kind, { color: string; label: string }> = {
  product: { color: "var(--swamp-cyan)", label: "Product" },
  engineering: { color: "var(--until-lime)", label: "Engineering" },
  agent: { color: "var(--gh-purple)", label: "Agent" },
};

function Stage({ label, kind, grow = 1, small }: { label: string; kind: Kind; grow?: number; small?: boolean }) {
  const c = KIND[kind].color;
  return (
    <div
      style={{
        flex: `${grow} 1 0`,
        minWidth: 0,
        border: `1.5px solid ${c}`,
        background: `color-mix(in srgb, ${c} 12%, transparent)`,
        borderRadius: "var(--radius)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        fontSize: small ? "var(--t-label)" : "var(--t-body)",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        lineHeight: 1.15,
      }}
    >
      {label}
    </div>
  );
}

/** The gap between two owners, with an optional label above it. */
function Handoff({ label }: { label?: string }) {
  return (
    <div style={{ position: "relative", flex: "0 0 44px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 40, color: "var(--fg-2)", fontWeight: 700 }}>›</span>
      {label && (
        <span
          className="mono"
          style={{
            position: "absolute",
            bottom: "calc(100% + 14px)",
            whiteSpace: "nowrap",
            fontSize: "var(--t-label)",
            color: "var(--fg-2)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function Pipeline({ children, height = 140 }: { children: ReactNode; height?: number }) {
  return <div style={{ display: "flex", gap: 8, height }}>{children}</div>;
}

function Legend({ kinds }: { kinds: Kind[] }) {
  return (
    <div className="legend">
      {kinds.map((k) => (
        <span key={k} className="legend__item">
          <span className="legend__swatch legend__swatch--box" style={{ background: KIND[k].color }} />
          {KIND[k].label}
        </span>
      ))}
    </div>
  );
}

function TitleRow({ title, kinds }: { title: ReactNode; kinds: Kind[] }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
      <h2>{title}</h2>
      <Legend kinds={kinds} />
    </div>
  );
}

/* 1 — AI changed the balance. Before AI, then With AI on a click. */
export function TeamBalanceSlide() {
  const rowLabel = { flex: "0 0 180px", fontSize: "var(--t-small)", color: "var(--fg-2)", fontWeight: 600 } as const;
  return (
    <Slide>
      <Frame>
        <TitleRow title="AI changed the balance" kinds={["product", "engineering"]} />
        <div style={{ display: "grid", gap: 72, marginTop: 120 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <span style={rowLabel}>Before AI</span>
            <div style={{ flex: 1 }}>
              <Pipeline>
                <Stage label="Idea" kind="product" />
                <Stage label="Research" kind="product" />
                <Stage label="Shape" kind="product" />
                <Handoff />
                <Stage label="Plan" kind="engineering" />
                <Stage label="Build" kind="engineering" />
                <Stage label="Ship" kind="engineering" />
              </Pipeline>
            </div>
          </div>
          <Fragment animation="fade-up" asChild>
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <span style={rowLabel}>With AI</span>
              <div style={{ flex: 1 }}>
                <Pipeline>
                  <Stage label="Idea" kind="product" grow={6} />
                  <Stage label="Research" kind="product" grow={6} />
                  <Stage label="Shape" kind="product" grow={6} />
                  <Handoff />
                  <Stage label="Plan, build, ship" kind="engineering" grow={3} small />
                </Pipeline>
              </div>
            </div>
          </Fragment>
        </div>
        <Fragment animation="fade-up" asChild>
          <p className="muted" style={{ position: "absolute", left: "var(--gutter)", bottom: 64, margin: 0, fontSize: "var(--t-body)" }}>
            Building became faster than explaining and handing it over.
          </p>
        </Fragment>
      </Frame>
      <aside className="notes">
        <ul>
          <li>We had operated the same way for years, and it’s probably the way that many of you are operating</li>
          <li>
            Product were responsible for talking to customers, understanding the market, deciding what to build, doing
            the research, coming up with the high level shape and architecture
          </li>
          <li>
            Then we’d have a handoff meeting with engineering in which the team would ask loads of questions i.e.
            <ul>
              <li>What do the performance targets need to be?</li>
              <li>Does it need to work on mobile? etc.</li>
            </ul>
          </li>
          <li>We had 5 engineers and 1-2 product people and the amount of work on each side was pretty balanced.</li>
          <li>[click] AI completely changed this balance</li>
          <li>
            It meant that by the time I’d done all of the product work, it would only take me another few hours to
            completely build the thing, so it didn’t make any sense to have a handover meeting
          </li>
          <li>
            [click] That led to a week where my product manager and I delivered more than the rest of the team combined.
            I knew I had good engineers. Something about how we worked had stopped making sense.
          </li>
        </ul>
      </aside>
    </Slide>
  );
}

function ForkRow({ title, caption, children }: { title: string; caption: ReactNode; children: ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "560px 1fr", gap: 64, alignItems: "center" }}>
      <div style={{ display: "grid", gap: 16 }}>
        <h3 style={{ fontSize: "var(--t-h3)" }}>{title}</h3>
        <p className="muted" style={{ margin: 0, fontSize: "var(--t-body)", lineHeight: 1.3 }}>
          {caption}
        </p>
      </div>
      {children}
    </div>
  );
}

/* 2 — Two ways to fix it. Change the team, or (on a click) shift responsibility left. */
export function TeamForkSlide() {
  return (
    <Slide>
      <Frame>
        <TitleRow title="Two ways to fix it" kinds={["product", "engineering", "agent"]} />
        <div style={{ display: "grid", gap: 96, marginTop: 120 }}>
          <ForkRow
            title="Change the team composition"
            caption={
              <>
                More product. Fewer engineers.
                <br />
                The work balances around the handoff.
              </>
            }
          >
            <Pipeline height={120}>
              <Stage label="Idea" kind="product" small />
              <Stage label="Research" kind="product" small />
              <Stage label="Shape" kind="product" small />
              <Handoff />
              <Stage label="Plan" kind="engineering" small />
              <Stage label="Build" kind="engineering" small />
              <Stage label="Ship" kind="engineering" small />
            </Pipeline>
          </ForkRow>
          <Fragment animation="fade-up" asChild>
            <div>
              <ForkRow
                title="Shift responsibility left"
                caption={
                  <>
                    Earlier handoff to engineering.
                    <br />
                    Build and ship go to AI.
                  </>
                }
              >
                <Pipeline height={120}>
                  <Stage label="Idea" kind="product" small />
                  <Handoff />
                  <Stage label="Research" kind="engineering" small />
                  <Stage label="Shape" kind="engineering" small />
                  <Stage label="Plan" kind="engineering" small />
                  <Handoff label="to AI" />
                  <Stage label="Build" kind="agent" small />
                  <Stage label="Ship" kind="agent" small />
                </Pipeline>
              </ForkRow>
            </div>
          </Fragment>
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>I seriously considered firing half of the engineers and replacing them with product managers so that we had a bunch of two-person teams</li>
          <li>
            In that option, product still handles idea, research and shape, and engineering still handles plan, build and
            ship. The staffing change would balance the work around the existing handoff. Engineers would keep using AI as
            a tool, rather than handing execution over to it.
          </li>
          <li>
            [click] What we chose was to shift responsibility left, with the same people. Rather than handing over a
            detailed, unambiguous specification, product would hand over a deliberately ambiguous, unfinished idea, and
            engineering would resolve that ambiguity.
          </li>
          <li>
            Shifting engineering left couldn’t simply mean broadening the job. Asking engineers to understand users and
            competitors while also caring about every line of code would be too much.
          </li>
          <li>
            We took build and ship out of their direct execution work and introduced a proper handoff to AI after
            planning. That was a change from using AI while remaining involved throughout execution.
          </li>
        </ul>
      </aside>
    </Slide>
  );
}

function HandoffNote({ from, to, title, body }: { from: Kind; to: Kind; title: ReactNode; body: string }) {
  return (
    <div style={{ display: "grid", gap: 16, borderTop: "1px solid var(--line-strong)", paddingTop: 28 }}>
      <span className="hud">
        <span style={{ color: KIND[from].color }}>{KIND[from].label}</span> →{" "}
        <span style={{ color: KIND[to].color }}>{KIND[to].label}</span>
      </span>
      <span style={{ fontSize: "var(--t-h3)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{title}</span>
      <span className="muted" style={{ fontSize: "var(--t-body)", lineHeight: 1.3 }}>
        {body}
      </span>
    </div>
  );
}

/* 3 — Two handoffs: a one-line brief to engineering, the plan to the agent. */
export function TeamHandoffsSlide() {
  return (
    <Slide>
      <Frame>
        <TitleRow title="Two handoffs" kinds={["product", "engineering", "agent"]} />
        <div style={{ marginTop: 120 }}>
          <Pipeline>
            <Stage label="Idea" kind="product" />
            <Handoff />
            <Stage label="Research" kind="engineering" />
            <Stage label="Shape" kind="engineering" />
            <Stage label="Plan" kind="engineering" />
            <Handoff />
            <Stage label="Build" kind="agent" />
            <Stage label="Ship" kind="agent" />
          </Pipeline>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, marginTop: 88 }}>
          <Fragment animation="fade-up" asChild>
            <div>
              <HandoffNote from="product" to="engineering" title="“Just do this one thing.”" body="Still a handoff, but at a very high level." />
            </div>
          </Fragment>
          <Fragment animation="fade-up" asChild>
            <div>
              <HandoffNote
                from="engineering"
                to="agent"
                title={
                  <>
                    The <span className="hl-lime">plan</span>.
                  </>
                }
                body="Everything you care about, handed over in one go."
              />
            </div>
          </Fragment>
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>[click] The handoff between product and engineering is still a handoff but at a very high level: just do this one thing.</li>
          <li>[click] The plan is the handoff between engineering and AI.</li>
          <li>
            Cognitive load (from the Fast Flow Conf talk track):
            <ul>
              <li>
                We’d shifted engineering responsibility left into research, shape and plan. That required capacity, rather
                than simply adding more responsibilities to an unchanged job.
              </li>
              <li>
                The clear handoffs matter: product hands over an idea, engineers own research through planning, and
                execution goes to AI. Everyone doesn’t have to hold everything in their heads.
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </Slide>
  );
}

/* 4 — Conway's Law: a clean handover needs restricted communication. */
export function TeamConwaySlide() {
  return (
    <Slide>
      <Frame flush>
        <div className="cells cells--7-5">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 40 }}>
            <span className="hud">What about Conway’s Law?</span>
            <h2 style={{ fontSize: "var(--t-h1)", maxWidth: "15ch" }}>
              A clean handover needs <span className="hl-lime">restricted communication</span>
            </h2>
            <div style={{ borderTop: "1px solid var(--line-strong)", paddingTop: 32, display: "grid", gap: 16 }}>
              <span style={{ fontSize: "var(--t-h3)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                No questions until the first demo
              </span>
              <span className="muted" style={{ fontSize: "var(--t-body)" }}>
                Engineering takes ownership. Product gives it up.
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingInline: 64 }}>
            <div style={{ position: "relative", width: "100%" }}>
              <div
                style={{
                  border: "1px solid var(--line-strong)",
                  borderRadius: 12,
                  background: "var(--ink-2)",
                  padding: "28px 32px",
                  display: "grid",
                  gap: 12,
                  opacity: 0.6,
                }}
              >
                <span className="mono muted" style={{ fontSize: "var(--t-label)" }}>
                  #feat-csv-export
                </span>
                <span style={{ fontSize: "var(--t-body)", lineHeight: 1.3 }}>
                  <b>@dylan</b> quick question about the brief: should the export include archived tickets?
                </span>
              </div>
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div
                  style={{
                    position: "relative",
                    width: 280,
                    height: 280,
                    borderRadius: "50%",
                    border: "22px solid var(--swamp-pink)",
                    background: "rgb(5 6 7 / 0.55)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: "118%",
                      height: 22,
                      background: "var(--swamp-pink)",
                      transform: "translate(-50%, -50%) rotate(-45deg)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>
            When it comes to Conway’s Law, those two handoffs are where it comes in, right? We deliberately restricted
            communication both to force engineering to take ownership of what they were doing and to force product to
            relinquish ownership of what they were doing.
          </li>
          <li>The rule was: you are not allowed to ask any questions until you’ve produced the first demo.</li>
          <li>
            The job of that was this: we would give engineers a brief that has quite a lot of ambiguity. They would need
            to resolve that ambiguity before they could produce a demo because it was too ambiguous. We as product didn’t
            want to be involved in resolving that ambiguity because it would allow us to fall back into the position of
            making all the decisions.
          </li>
          <li>
            Part of it is that maybe we wanted to force engineering to make those decisions themselves. Another part is
            that we were bad at giving up that power and we needed a way to force ourselves to give up that power and that
            responsibility.
          </li>
          <li>
            It’s very easy when you’re the CEO of the company to tell people what to do but it’s a lot harder to give up
            telling people what to do. It certainly worked in both directions.
          </li>
          <li>
            In a lot of ways it was a Conway’s Law-style thing: we wanted a clean handover between product and engineering
            and in order to get a clean handover you have to restrict communication. That’s just simply the way Conway’s
            Law works.
          </li>
        </ul>
      </aside>
    </Slide>
  );
}

/* 5 — The handoff to AI: AI as a tool vs AI as a handoff. */
export function TeamAiHandoffSlide() {
  const col = { display: "flex", flexDirection: "column", justifyContent: "center", gap: 36 } as const;
  return (
    <Slide>
      <Frame flush>
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100%" }}>
          <div style={{ padding: "48px 64px", borderBottom: "1px solid var(--line)" }}>
            <h2>Low-bandwidth communication forces a high-quality plan</h2>
          </div>
          <div className="cells cells--2">
            <div style={col}>
              <div className="hud" style={{ color: "var(--fg-2)" }}>
                AI as a tool
              </div>
              <div className="mono" style={{ fontSize: "var(--t-label)", color: "var(--fg-3)", display: "grid", gap: 10 }}>
                {["no, not like that", "try the other approach", "wait, go back", "use the existing helper", "ok now the tests"].map((t) => (
                  <span key={t}>
                    <span style={{ color: "var(--until-lime)" }}>you ›</span> {t}
                  </span>
                ))}
              </div>
              <p className="muted" style={{ margin: 0, fontSize: "var(--t-body)" }}>
                You can always correct it, so the first ask doesn’t have to be good.
              </p>
            </div>
            <Fragment animation="fade-up" asChild>
              <div style={{ ...col, background: "rgb(217 230 30 / 0.04)" }}>
                <div className="hud" style={{ color: "var(--until-lime)" }}>
                  AI as a handoff
                </div>
                <div className="mono" style={{ fontSize: "var(--t-label)", color: "var(--fg-2)" }}>
                  <span style={{ color: "var(--until-lime)" }}>you ›</span> the plan{" "}
                  <span style={{ color: "var(--fg-3)" }}>· then leave it alone</span>
                </div>
                <p style={{ margin: 0, fontSize: "var(--t-body)" }}>
                  One shot to get it right, so the plan has to be <span className="hl-lime">really good</span>.
                </p>
              </div>
            </Fragment>
          </div>
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>
            The same goes for the clean handover between engineering and AI. If you are sitting there using AI as a tool,
            then there’s no need for a clean handover because the AI is sitting there. You can always communicate with it,
            right? You can always say, “Oh no, you’re going in the wrong direction. I want you to do this instead,” or
            whatever.
          </li>
          <li>
            [click] If you are using AI, however, as a handoff where you give it one thing and then you leave it alone for
            a long time, then you are deliberately restricting the communication in a Conway’s Law sort of way. It makes
            sense that that communication therefore needs to be very high quality.
          </li>
          <li>
            The plan needs to be really good because you won’t have another opportunity to correct it, right? It’s got to
            be good. By forcing that low-bandwidth communication, it forces the plan to be of a high quality.
          </li>
        </ul>
      </aside>
    </Slide>
  );
}
