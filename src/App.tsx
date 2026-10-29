import { Deck } from "@revealjs/react";
import RevealHighlight from "reveal.js/plugin/highlight";
import RevealNotes from "reveal.js/plugin/notes";
import { AgendaSlide, SectionSlide } from "./slides/Openers";
import { Talk } from "./talk/Talk";
import {
  BulletsSlide,
  CodeSlide,
  CompareSlide,
  DemoSlide,
  MediaSlide,
  QuoteSlide,
  StatementSlide,
  StatsSlide,
  ThanksSlide,
} from "./slides/Content";
import { ChartSlide, DiagramSlide } from "./slides/Viz";
import { BoneyardSlide } from "./slides/Boneyard";

// The sample layouts are style reference only, never part of the talk.
// View them on their own at /?boneyard.
const BONEYARD = new URLSearchParams(window.location.search).has("boneyard");

function Boneyard() {
  return (
    <>
      <BoneyardSlide />
      <AgendaSlide />
      <SectionSlide n="01" title="Code nobody reads" sub="what changes when agents write the diff" who="adam" />
      <StatementSlide />
      <BulletsSlide />
      <CompareSlide />
      <CodeSlide />
      <DiagramSlide />
      <ChartSlide />
      <StatsSlide />
      <QuoteSlide />
      <MediaSlide />
      <DemoSlide />
      <ThanksSlide />
    </>
  );
}

export function App() {
  return (
    <>
      <div className="bg-vignette" />
      <Deck
        config={{
          width: 1920,
          height: 1080,
          margin: 0,
          center: false,
          hash: true,
          controls: false,
          progress: true,
          slideNumber: false,
          transition: "fade",
          transitionSpeed: "fast",
          backgroundTransition: "fade",
        }}
        plugins={[RevealHighlight, RevealNotes]}
      >
        {BONEYARD ? <Boneyard /> : <Talk />}
      </Deck>
    </>
  );
}
