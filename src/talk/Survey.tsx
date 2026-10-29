import { Slide } from "@revealjs/react";
import { THE_END } from "./topics";

/** The closer: the Universe session survey, ported from the official dark template. */
export function SurveySlide() {
  return (
    <Slide id={THE_END.id}>
      <div className="survey">
        <a className="survey__qr" href="https://gh.io/sessionsurvey" target="_blank" rel="noreferrer">
          <img src="/media/survey-qr.png" alt="QR code: gh.io/sessionsurvey" />
        </a>
        <div className="survey__rule" />
        <div className="survey__copy">
          <h1 className="survey__title">How was this session?</h1>
          <p className="survey__body">
            We do actually read these. It’s how Universe gets better every year.
            <br />
            <span className="survey__cta">Scan to review.</span>
          </p>
        </div>
        <div className="survey__banner" />
      </div>
    </Slide>
  );
}
