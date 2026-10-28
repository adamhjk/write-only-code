import { Slide, Fragment } from "@revealjs/react";
import { Frame, Kicker } from "../../components/Frame";
import { SwampFactory } from "../../viz/SwampFactory";
import { LightsOffFactory } from "../../viz/LightsOffFactory";

/* Software Factories (Adam). Slides only: <Section> adds the title slide,
   the speaker chip on every Frame, and the return to the agenda. */
export function SoftwareFactories() {
  return (
    <>
      <Definition />
      <SwampsFactory />
      <LightsOff />
      <AdversarialReview />
      <BlackBoxTesting />
      <FactoryStats />
    </>
  );
}

function Definition() {
  return (
    <Slide>
      <Frame center grid>
        <Kicker>definition</Kicker>
        <p
          style={{
            marginTop: 48,
            maxWidth: "24ch",
            fontFamily: "var(--font-display)",
            fontSize: 88,
            fontWeight: 600,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            textWrap: "balance",
          }}
        >
          <span className="hl-cyan">Software factories</span> are encoding the SDLC and production deployment process within the purview of an AI agent
        </p>
      </Frame>
    </Slide>
  );
}

function SwampsFactory() {
  return (
    <Slide>
      <Frame center>
        <LightsHeader on />
        <SwampFactory />
      </Frame>
    </Slide>
  );
}

function LightsOff() {
  return (
    <Slide>
      <Frame center>
        <LightsHeader />
        <LightsOffFactory />
      </Frame>
    </Slide>
  );
}

/** "LIGHTS ON" glowing lime, or "LIGHTS OFF" dimmed, with its definition. */
function LightsHeader({ on }: { on?: boolean }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <div
        className="display"
        style={{
          fontSize: 88,
          color: on ? "var(--until-lime)" : "var(--fg-3)",
          textShadow: on ? "0 0 40px rgb(217 230 30 / 0.45)" : undefined,
        }}
      >
        {on ? "Lights on" : "Lights off"}
      </div>
      <p className="mono" style={{ marginTop: 16, fontSize: "var(--t-body)" }}>
        {on ? "== people running the agents" : "== no people running the agents"}
      </p>
    </div>
  );
}

const ADVERSARIES = ["Software Architecture", "Security", "Performance", "A11y", "O11y", "Domain Specific"];

function AdversarialReview() {
  return (
    <Slide>
      <Frame flush>
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100%" }}>
          <div style={{ padding: "56px 64px", borderBottom: "1px solid var(--line)" }}>
            <h2>Adversarial review</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "1fr 1fr" }}>
            {ADVERSARIES.map((name, i) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 56px",
                  borderRight: i % 3 === 2 ? 0 : "1px solid var(--line)",
                  borderBottom: i < 3 ? "1px solid var(--line)" : 0,
                  boxShadow: "inset 0 4px 0 var(--swamp-pink)",
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontSize: 64, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

const BLACK_BOX = [
  "QA like it's 1990-2005",
  "No understanding of internals",
  "Outside the purview of the factory",
  "Likely a factory to itself",
  "The safety to refactor and ship without reading the code",
  "When a test fails, you must assume it's a regression",
];

function BlackBoxTesting() {
  return (
    <Slide>
      <Frame flush>
        <div className="cells cells--5-7">
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* A literal black box */}
            <div style={{ width: "100%", aspectRatio: "1", display: "flex", alignItems: "flex-end", padding: 48, background: "#000", border: "2px solid var(--line-strong)", boxShadow: "0 30px 80px rgb(0 0 0 / 0.8)" }}>
              <h2 className="display display--hero" style={{ fontSize: 104 }}>
                Black Box Testing
              </h2>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ul className="list" style={{ width: "100%" }}>
              {BLACK_BOX.map((t, i) => (
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

const STATS = [
  { value: "35", label: "35 pull requests a day per engineer on average" },
  { value: "80/2000", label: "No increase in escaped product regressions: out of 2000 black box testing runs, we found 80 regressions" },
  { value: "1300+", label: "1300+ black box tests" },
  { value: "60/40", label: "60% of the backlog is net new improvements, 40% improvements on existing features" },
  { value: "≠", label: "No correlation between lines of code and pull request numbers" },
  { value: "200+", label: "200+ stable production releases a week" },
];

function FactoryStats() {
  return (
    <Slide>
      <Frame flush>
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100%" }}>
          <div style={{ padding: "48px 64px", borderBottom: "1px solid var(--line)" }}>
            <h2>Swamp Factory Stats</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, minmax(0, 1fr))" }}>
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="stat"
                style={{
                  justifyContent: "flex-start",
                  padding: "40px 48px",
                  borderRight: i % 3 === 2 ? 0 : "1px solid var(--line)",
                  borderBottom: i < 3 ? "1px solid var(--line)" : 0,
                  ["--stat-color" as string]: "var(--swamp-cyan)",
                }}
              >
                <div className="stat__value" style={{ fontSize: 96, whiteSpace: "nowrap" }}>
                  {s.value}
                </div>
                <div className="stat__label" style={{ color: "var(--fg)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    </Slide>
  );
}
