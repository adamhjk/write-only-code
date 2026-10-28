import { Slide, Fragment } from "@revealjs/react";
import { Frame } from "../../components/Frame";

/* Creativity (Adam). Slides only: <Section> adds the title slide,
   the speaker chip on every Frame, and the return to the agenda. */
export function Creativity() {
  return (
    <>
      <RickRubin />
      <Philosophy />
      <SoftwareIsCreative />
      <AiUnlocks />
      <YouWillSwitch />
    </>
  );
}

function RickRubin() {
  return (
    <Slide>
      <Frame flush>
        <div className="cells cells--5-7">
          <div style={{ padding: 0 }}>
            <div className="media">
              <img src="/media/rick-rubin.jpg" alt="Rick Rubin" style={{ objectPosition: "50% 20%" }} />
              {/* CC BY 3.0 requires attribution */}
              <div className="media__caption" style={{ fontSize: "var(--t-chrome)" }}>
                Photo: jasontheexploder · CC BY 3.0
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h1 className="display display--hero">Rick Rubin</h1>
            <p className="lead" style={{ marginTop: 32, fontStyle: "italic", color: "var(--fg)" }}>
              The Creative Act
            </p>
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

const PHILOSOPHY = [
  "Creativity is a way of being",
  "Be an antenna",
  "Taste over technique",
  "Experimentation over Planning",
  "Detach from the outcome",
  "Use constraints to your advantage",
  "Editing matters as much as generating",
  "The work tells you what it is",
];

function Philosophy() {
  return (
    <Slide>
      <Frame flush>
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100%" }}>
          <div style={{ padding: "48px 64px", borderBottom: "1px solid var(--line)" }}>
            <h2>Philosophy</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, minmax(0, 1fr))" }}>
            {PHILOSOPHY.map((t, i) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "36px 40px",
                  borderRight: i % 4 === 3 ? 0 : "1px solid var(--line)",
                  borderBottom: i < 4 ? "1px solid var(--line)" : 0,
                }}
              >
                <span className="list__idx">0{i + 1}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 650, letterSpacing: "-0.025em", lineHeight: 1.08, textWrap: "balance" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

function Notes({ items }: { items: string[] }) {
  return (
    <aside className="notes">
      <ul>
        {items.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </aside>
  );
}

/* "…is SCIENCE" → click → SCIENCE struck through, CREATIVE drops in. */
function SoftwareIsCreative() {
  return (
    <Slide>
      <Notes
        items={[
          "We talk about it like it's science",
          "Slot A in Tab",
          "But it isn't, and it never has been - it's always been creative. We never build the same thing twice.",
        ]}
      />
      <Frame center grid>
        <h1 className="display display--hero">
          Software Development is
          <br />
          <Fragment as="span" className="strike-word" index={0}>
            science
          </Fragment>
          <br />
          <Fragment as="span" animation="fade-down" index={0} className="glitch glitch--live" style={{ ["--glitch-color" as string]: "var(--until-lime)" }}>
            creative
          </Fragment>
        </h1>
      </Frame>
    </Slide>
  );
}

const ANTENNA_WORDS = [
  { t: "be an antenna", x: 6, y: 14 },
  { t: "taste", x: 74, y: 10 },
  { t: "experiment", x: 80, y: 72 },
  { t: "detach", x: 10, y: 80 },
  { t: "edit", x: 52, y: 86 },
];

/* Gradient CREATIVITY with words from the notes drifting around it. */
function AiUnlocks() {
  return (
    <Slide>
      <Notes
        items={[
          "Old way was tough - being in the world, detached, editing, the work took forever to see",
          "In the new way - you get time back to be an antenna, to express your taste, to experiment, to detach, to edit - and the work shows itself to you immediately, so you can apply your taste",
        ]}
      />
      <Frame center grid>
        {ANTENNA_WORDS.map((w, i) => (
          <span key={w.t} className="drift-word" style={{ left: `${w.x}%`, top: `${w.y}%`, animationDelay: `${0.3 + i * 0.25}s, ${i * 0.7}s` }}>
            {w.t}
          </span>
        ))}
        <h1 className="display display--hero" style={{ position: "relative", fontSize: 168 }}>
          AI unlocks
          <br />
          <span className="grad-text">creativity</span>
        </h1>
      </Frame>
    </Slide>
  );
}

/* A switch flips on shortly after the slide appears. */
function YouWillSwitch() {
  return (
    <Slide>
      <Frame center grid>
        <h1 className="display display--mega">
          You will
          <br />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 56 }}>
            switch
            <span className="toggle" aria-hidden="true">
              <span className="toggle__knob" />
            </span>
          </span>
        </h1>
      </Frame>
    </Slide>
  );
}
