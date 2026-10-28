import { Slide } from "@revealjs/react";
import { Frame } from "../components/Frame";

/* Tribal Knowledge (Dylan, then a conversation with Adam). Slides in running order; Talk.tsx lists them. */

// Simple failure modes a reliable system has already fixed; what's left is the one nobody expected.
const FIXED = ["Disk fills up", "Bad deploy", "Certificate expires", "Dependency goes down", "Node runs out of memory"];

/* 1 — The reliability paradox. */
export function TribalParadoxSlide() {
  return (
    <Slide>
      <Frame flush>
        <div className="cells cells--7-5">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 48 }}>
            <span className="hud">The reliability paradox</span>
            <h2 style={{ fontSize: "var(--t-h1)", maxWidth: "16ch" }}>
              For a system to fail, it has to behave in a way you thought was{" "}
              <span className="hl-pink">impossible</span>.
            </h2>
            <p className="lead" style={{ maxWidth: "26ch" }}>
              So what value is there in a <span className="hl-lime">mental model</span>?
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
            <span className="hud" style={{ color: "var(--fg-3)" }}>
              ways it can fail
            </span>
            {FIXED.map((t) => (
              <div key={t} className="mono" style={{ fontSize: "var(--t-small)", color: "var(--fg-3)", display: "flex", gap: 20 }}>
                <span style={{ color: "var(--swamp-green)" }}>✓</span>
                <span style={{ textDecoration: "line-through" }}>{t}</span>
              </div>
            ))}
            <div
              className="mono"
              style={{
                marginTop: 12,
                fontSize: "var(--t-small)",
                color: "var(--swamp-pink)",
                display: "flex",
                gap: 20,
                border: "1.5px solid var(--swamp-pink)",
                borderRadius: "var(--radius)",
                padding: "18px 22px",
              }}
            >
              <span>?</span>
              <span>Something nobody thought could happen</span>
            </div>
          </div>
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>
            A lot of the reason we think tribal knowledge is valuable is reliability but if we look at it, it’s very
            unlikely that something is going to fail in a way we understand.
          </li>
          <li>
            When you fix the simple ways a system can break, you leave only the complex ways it can break. By making a
            system more reliable you are inherently also making the failures more complex. If it’s a reliable system it
            can’t fail in simple ways because the simple failure modes have been accounted for. It can only fail in complex
            unlikely ways, which means it’s obviously much more difficult to deal with.
          </li>
          <li>
            A lot of people think about tribal knowledge as something you’re investing in for the future: people know it so
            when it fails it’ll be easier or better or whatever because other people understand it. The reality is that
            shit never fails in a way that anyone understands. Even the people who built it, it always fails in an
            unexpected way. If you knew that it could fail in that way, you simply wouldn’t have allowed it to happen in
            the first place.
          </li>
          <li>
            That means it’s not terribly helpful to have a detailed understanding of your mental model of the system. You
            can basically guarantee that for a system to fail, it will have to be behaving in a way you thought was
            impossible. What value is there in a mental model?
          </li>
        </ul>
      </aside>
    </Slide>
  );
}

const FOLLOW_UPS = [
  "Is your best engineer the best because of what they know, or what they can do?",
  "Has AI made knowing things less valuable?",
  "Did this used to be more valuable?",
  "How do we come to terms with it?",
];

/* 2 — Over to Adam: the memory wipe. */
export function TribalAdamSlide() {
  return (
    <Slide>
      <Frame flush>
        <div className="cells cells--7-5">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 40 }}>
            <span className="hud" style={{ color: "var(--speaker-adam)" }}>
              Over to Adam
            </span>
            <h2 style={{ fontSize: "var(--t-h1)", maxWidth: "17ch" }}>
              If your engineers had their minds wiped, would your ranking of the best engineer change?
            </h2>
            <p className="lead" style={{ maxWidth: "none" }}>
              And <span className="hl-cyan">should</span> it?
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ul className="list" style={{ width: "100%" }}>
              {FOLLOW_UPS.map((q, i) => (
                <li key={q} style={{ fontSize: "var(--t-body)" }}>
                  <span className="list__idx">0{i + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Frame>
      <aside className="notes">
        <ul>
          <li>
            Adam, if your engineers had their minds wiped at the moment, would your ranking of who was the best engineer
            change and should it? Is this something you should be worried about?
          </li>
          <li>
            If your best engineer is based on what they know, not on their skills (for example, the fact that they were in
            the room when certain things happened), has AI made this less valuable?
          </li>
          <li>The important questions are: has this changed, did this used to be more valuable, how do we come to terms with it?</li>
        </ul>
      </aside>
    </Slide>
  );
}
