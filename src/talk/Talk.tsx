import { TitleSlide, SpeakersSlide } from "../slides/Openers";
import { Agenda } from "./Agenda";
import { Section } from "./Section";
import { CodingAtSwamp } from "./sections/CodingAtSwamp";
import { QUESTION, INTROS, TOPICS } from "./topics";

/**
 * The talk. Put each section's slides inside its <Section>; the title slide
 * and the return-to-agenda slide are added for you.
 */
export function Talk() {
  return (
    <>
      <TitleSlide />
      <SpeakersSlide />
      <Agenda />

      <Section topic={INTROS.until}>{/* slides */}</Section>
      <Section
        topic={INTROS.swamp}
        notes={
          <ul>
            <li>Swamp lets you build AI systems from reusable, deterministic behaviors.</li>
            <li>Started working on it in Feb of 2026.</li>
            <li>For startup nerds, we have both customers from a product led growth motion and enterprise customers.</li>
            <li>I say this to front run the most common argument, which is nobody works like this if they have real customers.</li>
          </ul>
        }
      >
        <CodingAtSwamp />
      </Section>

      <Section topic={TOPICS.softwareFactories}>{/* slides */}</Section>
      <Section topic={TOPICS.planReview}>{/* slides */}</Section>
      <Section topic={TOPICS.tribalKnowledge}>{/* slides */}</Section>
      <Section topic={TOPICS.compliance}>{/* slides */}</Section>
      <Section topic={TOPICS.product}>{/* slides */}</Section>
      <Section topic={TOPICS.flow}>{/* slides */}</Section>
      <Section topic={TOPICS.creativity}>{/* slides */}</Section>
      <Section topic={TOPICS.teamDynamics}>{/* slides */}</Section>

      <Section topic={QUESTION}>{/* slides */}</Section>
    </>
  );
}
