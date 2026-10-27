import { TitleSlide, SpeakersSlide } from "../slides/Openers";
import { Agenda } from "./Agenda";
import { Section } from "./Section";
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
      <Section topic={INTROS.swamp}>{/* slides */}</Section>

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
