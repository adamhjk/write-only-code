// The talk's sections. `id` is the slide's hash anchor (#/<id>), used by the
// agenda's links. Order here is the order on the agenda.

export type Who = "adam" | "dylan";
export type Topic = { id: string; title: string; who: Who | "both" };

/** The two openers, shown full-width across the top of the agenda. */
export const INTROS = {
  until: { id: "until", title: "Coding @ Until", who: "dylan" },
  swamp: { id: "swamp", title: "Coding @ Swamp", who: "adam" },
} satisfies Record<string, Topic>;

/** The topic grid. */
export const TOPICS = {
  softwareFactories: { id: "software-factories", title: "Software Factories", who: "adam" },
  planReview: { id: "plan-review", title: "Plan Review", who: "dylan" },
  tribalKnowledge: { id: "tribal-knowledge", title: "Tribal Knowledge", who: "dylan" },
  compliance: { id: "compliance", title: "Compliance", who: "adam" },
  product: { id: "what-happens-to-product", title: "What happens to Product", who: "adam" },
  flow: { id: "flow", title: "Flow", who: "dylan" },
  creativity: { id: "creativity", title: "Creativity", who: "adam" },
  teamDynamics: { id: "team-dynamics", title: "Team Dynamics", who: "dylan" },
} satisfies Record<string, Topic>;

/** Full-width row under the grid. */
export const QUESTION = { id: "question", title: "Question", who: "both" } satisfies Topic;

/** Sits to the right of Question on the agenda; links to the survey slide, not a section. */
export const THE_END = { id: "the-end", title: "The End", who: "both" } satisfies Topic;
