import { TitleSlide, SpeakersSlide } from "../slides/Openers";
import { Agenda } from "./Agenda";
import { Section } from "./Section";
import { CodingAtSwamp } from "./sections/CodingAtSwamp";
import { QUESTION, INTROS, TOPICS } from "./topics";
import {
  UntilNotAPeerSlide,
  UntilProcessSlide,
  UntilRespectSlide,
  UntilResultsSlide,
  UntilSleepwalkSlide,
  UntilWhoSlide,
} from "./Until";
import { FlowCompareSlide, FlowHowSlide, FlowInterruptSlides, FlowStrategySlides } from "./Flow";
import {
  TeamAiHandoffSlide,
  TeamBalanceSlide,
  TeamConwaySlide,
  TeamForkSlide,
  TeamHandoffsSlide,
} from "./TeamDynamics";
import { TribalAdamSlide, TribalParadoxSlide } from "./TribalKnowledge";
import { PlanConfidenceSlide, PlanContentsSlide, PlanSizeSlide } from "./PlanReview";

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

      <Section topic={INTROS.until}>
        <UntilWhoSlide />
        <UntilSleepwalkSlide />
        <UntilRespectSlide />
        <UntilNotAPeerSlide />
        <UntilProcessSlide />
        <UntilResultsSlide />
      </Section>
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
      <Section topic={TOPICS.planReview}>
        <PlanContentsSlide />
        <PlanSizeSlide />
        <PlanConfidenceSlide />
      </Section>
      <Section topic={TOPICS.tribalKnowledge}>
        <TribalParadoxSlide />
        <TribalAdamSlide />
      </Section>
      <Section topic={TOPICS.compliance}>{/* slides */}</Section>
      <Section topic={TOPICS.product}>{/* slides */}</Section>
      <Section topic={TOPICS.flow}>
        <FlowInterruptSlides />
        <FlowStrategySlides />
        <FlowCompareSlide />
        <FlowHowSlide />
      </Section>
      <Section topic={TOPICS.creativity}>{/* slides */}</Section>
      <Section topic={TOPICS.teamDynamics}>
        <TeamBalanceSlide />
        <TeamForkSlide />
        <TeamHandoffsSlide />
        <TeamConwaySlide />
        <TeamAiHandoffSlide />
      </Section>

      <Section topic={QUESTION}>{/* slides */}</Section>
    </>
  );
}
