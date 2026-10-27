import { Slide } from "@revealjs/react";
import { Frame } from "../components/Frame";
import { QUESTION, INTROS, TOPICS, type Topic } from "./topics";

/**
 * The agenda. Drop it in wherever you want to return to it — after hello and
 * at the end of every <Section>. Each cell links to that section's title slide.
 * Speakers are deliberately not shown here.
 */
export function Agenda() {
  return (
    <Slide>
      <aside className="notes">
        <ul>
          <li>Audience Participation</li>
          <li>Topics related to not reading code</li>
          <li>Shout</li>
          <li>Dylan and I kept it secret</li>
          <li>One delivers, one questions/heckles</li>
          <li>Question</li>
          <li>First thing we hear gets picked</li>
          <li>Try it with Coding 'Until/Swamp'</li>
        </ul>
      </aside>
      <Frame section="agenda" flush>
        <div className="agenda">
          <div className="agenda__intros">
            {Object.values(INTROS).map((t) => (
              <AgendaCell key={t.id} topic={t} big />
            ))}
          </div>
          <div className="agenda__grid">
            {Object.values(TOPICS).map((t) => (
              <AgendaCell key={t.id} topic={t} />
            ))}
          </div>
          <div className="agenda__question">
            <AgendaCell topic={QUESTION} wide />
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

function AgendaCell({ topic, big, wide }: { topic: Topic; big?: boolean; wide?: boolean }) {
  const cls = ["agenda__cell", big && "agenda__cell--big", wide && "agenda__cell--wide"].filter(Boolean).join(" ");
  return (
    <a className={cls} href={`#/${topic.id}`}>
      <span className="agenda__title">{topic.title}</span>
      <span className="agenda__arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
