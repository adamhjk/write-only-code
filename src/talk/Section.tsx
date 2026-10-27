import type { ReactNode } from "react";
import { Slide } from "@revealjs/react";
import { Frame, Kicker, SectionContext } from "../components/Frame";
import { Agenda } from "./Agenda";
import type { Topic, Who } from "./topics";

const SPEAKER: Record<Who, { name: string; org: string; photo: string }> = {
  adam: { name: "Adam Jacob", org: "Swamp Club", photo: "/speakers/adam.jpg" },
  dylan: { name: "Dylan Ratcliffe", org: "Until", photo: "/speakers/dylan.jpg" },
};

/**
 * One agenda section: title slide (anchored at #/<topic.id>), your slides,
 * then back to the agenda. Every Frame in `children` automatically shows this
 * section's path and speaker chip; the Agenda sits outside so it shows neither.
 *
 *   <Section topic={TOPICS.flow}>
 *     <Slide>…</Slide>
 *   </Section>
 */
export function Section({ topic, children }: { topic: Topic; children?: ReactNode }) {
  return (
    <>
      <SectionTitle topic={topic} />
      <SectionContext.Provider value={{ id: topic.id, who: topic.who }}>{children}</SectionContext.Provider>
      <Agenda />
    </>
  );
}

function SectionTitle({ topic }: { topic: Topic }) {
  const speakers: Who[] = topic.who === "both" ? ["dylan", "adam"] : [topic.who];
  return (
    <Slide id={topic.id}>
      <Frame section={topic.id} speaker={topic.who} center grid>
        <Kicker>section</Kicker>
        <h1 className="display display--hero" style={{ marginTop: 40 }}>
          {topic.title}
        </h1>
        <div style={{ display: "flex", gap: 96, marginTop: 64 }}>
          {speakers.map((who) => (
            <SpeakerLine key={who} who={who} />
          ))}
        </div>
      </Frame>
    </Slide>
  );
}

function SpeakerLine({ who }: { who: Who }) {
  const s = SPEAKER[who];
  return (
    <div className={`speaker-chip--${who}`} style={{ display: "flex", alignItems: "center", gap: 32 }}>
      <div className="speaker-card__avatar" style={{ width: 128, height: 128 }}>
        <img src={s.photo} alt="" />
        <div className="brackets" style={{ ["--bracket-color" as string]: "var(--chip-color)" }} />
      </div>
      <div>
        <div style={{ fontSize: "var(--t-h3)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.name}</div>
        <div className="hud" style={{ marginTop: 12 }}>
          {s.org}
        </div>
      </div>
    </div>
  );
}
