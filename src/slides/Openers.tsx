import { Slide, Fragment } from "@revealjs/react";
import { Frame, Kicker } from "../components/Frame";
import { SwampClubLockup, SwampClubMark, UntilMark, UntilWordmark } from "../components/Brand";
import { Ticker } from "../components/Ticker";
import { Starfield } from "../components/Starfield";

/* Layout: TITLE — both speakers, both brands, Universe ticker. */
export function TitleSlide() {
  return (
    <Slide notes="Adam opens. Introduce the talk in one sentence, then hand to Dylan for intros.">
      <Frame bare grid>
        <Starfield />
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateRows: "1fr auto auto" }}>
          <div style={{ padding: "96px var(--gutter) 0", display: "flex", flexDirection: "column", gap: 40 }}>
            <Kicker>github universe ’26 · breakout session</Kicker>
            <h1 className="display display--mega glitch glitch--live" style={{ marginTop: 48 }}>
              Write-only
              <br />
              code
            </h1>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderTop: "1px solid var(--line)",
              marginTop: 56,
            }}
          >
            <div style={{ padding: "40px var(--gutter)", borderRight: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 40 }}>
              <SwampClubMark height={64} />
              <div>
                <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>Adam Jacob</div>
                <div className="hud" style={{ marginTop: 6 }}>Swamp Club</div>
              </div>
            </div>
            <div style={{ padding: "40px var(--gutter)", display: "flex", alignItems: "center", gap: 40 }}>
              <span style={{ color: "var(--until-lime)" }}>
                <UntilMark height={64} />
              </span>
              <div>
                <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>Dylan Ratcliffe</div>
                <div className="hud" style={{ marginTop: 6 }}>Until</div>
              </div>
            </div>
          </div>
          <Ticker
            items={[
              "swamp-club.com — AI systems built from repeatable behaviors",
              "until.dev — git-backed tickets for people and agents",
              "universe26 — humans, agents, and the world’s code",
            ]}
          />
        </div>
      </Frame>
    </Slide>
  );
}

/* Layout: SPEAKERS — two-up bio cells. */
export function SpeakersSlide() {
  return (
    <Slide notes="Each speaker: name, company. Then the punchline.">
      <Frame section="hello" speaker="both" flush>
        <div style={{ display: "grid", gridTemplateRows: "1fr auto", height: "100%" }}>
          <div className="cells cells--2">
            <SpeakerCell
              who="dylan"
              initials="DR"
              photo="/speakers/dylan.jpg"
              name="Dylan Ratcliffe"
              role="Until — git-backed tickets for people and agents."
              logo={
                <span style={{ color: "var(--fg)" }}>
                  <UntilWordmark height={52} />
                </span>
              }
            />
            <SpeakerCell
              who="adam"
              initials="AJ"
              photo="/speakers/adam.jpg"
              name="Adam Jacob"
              role="Swamp Club. Previously co-founded Chef and System Initiative."
              logo={<SwampClubLockup height={48} />}
            />
          </div>
          {/* Spans both speakers */}
          <div style={{ padding: "48px 64px", borderTop: "1px solid var(--line)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 60, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Used to disagree about the value of code review, and now… <em>don’t.</em>
            </p>
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

function SpeakerCell(props: {
  who: "adam" | "dylan";
  initials: string;
  /** Square headshot in public/speakers/; falls back to initials. */
  photo?: string;
  name: string;
  role: string;
  logo: React.ReactNode;
}) {
  return (
    <div className={`speaker-chip--${props.who}`}>
      <div className="speaker-card">
        <div className="speaker-card__avatar">
          {props.photo ? (
            <img src={props.photo} alt={props.name} />
          ) : (
            <span className="speaker-card__initials">{props.initials}</span>
          )}
          <div className="brackets" style={{ ["--bracket-color" as string]: "var(--chip-color)" }} />
        </div>
        <div>
          <div className="speaker-card__name">{props.name}</div>
          <p className="speaker-card__role" style={{ marginTop: 16, maxWidth: "34ch" }}>
            {props.role}
          </p>
        </div>
        <div className="speaker-card__logo">{props.logo}</div>
      </div>
    </div>
  );
}

/* Layout: AGENDA — numbered hairline list, speaker per row. */
export function AgendaSlide() {
  const rows: { t: string; sub: string; who: "adam" | "dylan" | "both" }[] = [
    { t: "Code nobody reads", sub: "What changes when agents write most of the diff", who: "adam" },
    { t: "Tickets as the contract", sub: "Agents claim the work, humans make the calls", who: "dylan" },
    { t: "Behaviors, not prompts", sub: "Repeatable, auditable automation with Swamp", who: "adam" },
    { t: "Live: issue → merged", sub: "One run, end to end", who: "both" },
  ];
  return (
    <Slide>
      <Frame section="agenda" speaker="both" flush>
        <div className="cells cells--5-7">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Kicker>agenda</Kicker>
            <h2 className="display display--hero" style={{ fontSize: 120 }}>
              40
              <br />
              min
            </h2>
            <p className="muted">Q&amp;A at the end. Questions welcome in between.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ol className="list" style={{ width: "100%" }}>
              {rows.map((r, i) => (
                <Fragment key={r.t} as="li" animation="fade-up">
                  <span className="list__idx">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    {r.t}
                    <span className="list__sub">
                      {r.sub}
                      <span className="faint">
                        {" "}
                        · {r.who === "both" ? "Adam + Dylan" : r.who === "adam" ? "Adam" : "Dylan"}
                      </span>
                    </span>
                  </span>
                </Fragment>
              ))}
            </ol>
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

/* Layout: SECTION DIVIDER — giant number, Swamp HUD title. */
export function SectionSlide({
  n,
  title,
  sub,
  who,
}: {
  n: string;
  title: string;
  sub: string;
  who: "adam" | "dylan";
}) {
  const accent = who === "adam" ? "var(--swamp-cyan)" : "var(--until-lime)";
  return (
    <Slide>
      <Frame section={`part-${n}`} speaker={who} center grid>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", alignItems: "end", gap: 80 }}>
          <div className="orbitron" style={{ fontSize: 360, color: accent, lineHeight: 0.8, textShadow: `0 0 60px ${accent}55` }}>
            {n}
          </div>
          <div style={{ paddingBottom: 12 }}>
            <div className="hud" style={{ color: accent }}>
              Part {n}
            </div>
            <h2 className="display display--hero" style={{ marginTop: 24 }}>
              {title}
            </h2>
            <p className="comment" style={{ marginTop: 32 }}>
              {sub}
            </p>
          </div>
        </div>
      </Frame>
    </Slide>
  );
}
