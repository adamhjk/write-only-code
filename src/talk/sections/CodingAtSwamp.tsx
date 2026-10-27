import { Slide, Fragment } from "@revealjs/react";
import { Frame } from "../../components/Frame";

/* Coding @ Swamp (Adam). Slides only: <Section> adds the title slide,
   the speaker chip on every Frame, and the return to the agenda. */
export function CodingAtSwamp() {
  return (
    <>
      <Origin />
      <SpeedRun />
      <NoOneReads />
      <PrsPerDay />
      <Hiring />
      <EverythingBreaks />
      <MostFun />
    </>
  );
}

function Origin() {
  return (
    <Slide notes="Started working on swamp in February 2026">
      <Frame center grid>
        <h1 className="display display--mega glitch glitch--live">
          AI maximalists
        </h1>
      </Frame>
    </Slide>
  );
}

const STEPS = ["Manual Claude Code + Review", "Shared Skills", "Shared Plans", "Stopped Sharing", "Software Factory"];

function SpeedRun() {
  return (
    <Slide>
      <Frame flush>
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100%" }}>
          <div style={{ padding: "56px 64px", borderBottom: "1px solid var(--line)" }}>
            <h2>Speed run</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${STEPS.length}, 1fr)` }}>
            {STEPS.map((step, i) => {
              const last = i === STEPS.length - 1;
              return (
                <Fragment key={step} animation="fade-up" asChild>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "48px 40px",
                      borderRight: last ? 0 : "1px solid var(--line)",
                      background: last ? "rgb(34 211 238 / 0.08)" : undefined,
                      boxShadow: last ? "inset 0 4px 0 var(--swamp-cyan)" : undefined,
                    }}
                  >
                    {/* Fixed height, top-aligned: the group is centred but every number sits on the same line. */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 32, height: 300 }}>
                      <span className="orbitron" style={{ fontSize: 96, color: last ? "var(--swamp-cyan)" : "var(--fg-3)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--t-h3)",
                          fontWeight: last ? 700 : 600,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.05,
                          color: last ? "var(--swamp-cyan)" : "var(--fg)",
                        }}
                      >
                        {step}
                      </span>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

const ALIGN = [
  "The factory aligns it",
  "When the outcomes aren't good, we adjust the factory",
  "We refactor when issues crop up in the same area repeatedly",
];

function NoOneReads() {
  return (
    <Slide>
      <Frame flush>
        <div className="cells cells--5-7">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 className="display display--hero">Nobody reads the code</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ul className="list" style={{ width: "100%" }}>
              {ALIGN.map((t, i) => (
                <Fragment key={t} as="li" animation={"rise" as never}>
                  <span className="list__idx">0{i + 1}</span>
                  <span>{t}</span>
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

const PRS = [
  { n: "5", label: "Manual Claude", color: "var(--fg-2)" },
  { n: "12", label: "First Factory", color: "var(--fg)" },
  { n: "35", label: "Current Factory", color: "var(--swamp-cyan)" },
];

function PrsPerDay() {
  return (
    <Slide>
      <Frame flush>
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100%" }}>
          <div style={{ padding: "56px 64px", borderBottom: "1px solid var(--line)" }}>
            <h2>Maximum creativity</h2>
          </div>
          <div className="cells cells--3">
            {PRS.map((s) => (
              <Fragment key={s.n} animation="fade-up" asChild>
                <div className="stat" style={{ ["--stat-color" as string]: s.color }}>
                  <div className="stat__value" style={{ fontSize: 240 }}>
                    {s.n}
                  </div>
                  <div className="stat__label" style={{ fontSize: "var(--t-body)" }}>
                    {s.label}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

function Hiring() {
  return (
    <Slide>
      <Frame center grid>
        <div className="orbitron" style={{ fontSize: 280, color: "var(--swamp-cyan)", textShadow: "0 0 60px rgb(34 211 238 / 0.35)" }}>
          1 week
        </div>
      </Frame>
    </Slide>
  );
}

function EverythingBreaks() {
  return (
    <Slide>
      <aside className="notes">
        <ul>
          <li>At this velocity, everything breaks</li>
          <li>The SDLC, Testing, Product, Eng Management</li>
          <li>Only two sane responses - slow down or engineer around it</li>
          <li>We choose the latter</li>
        </ul>
      </aside>
      <Frame center grid>
        <h1 className="display display--mega glitch glitch--live">Everything breaks</h1>
      </Frame>
    </Slide>
  );
}

function MostFun() {
  return (
    <Slide>
      <Frame center grid>
        <h1 className="display display--mega">
          Most fun I've ever had
        </h1>
      </Frame>
    </Slide>
  );
}
