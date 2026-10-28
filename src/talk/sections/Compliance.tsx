import { Slide, Fragment } from "@revealjs/react";
import { Frame, Kicker } from "../../components/Frame";
import { FitHeading } from "../../components/FitHeading";

/* Compliance (Adam). Slides only: <Section> adds the title slide,
   the speaker chip on every Frame, and the return to the agenda. */
export function Compliance() {
  return (
    <>
      <Negotiation />
      <TitleBullets title="Automatic Attestation" points={["Everything can be tracked", "Customized reporting", "Human approval when needed"]} />
      <TitleBullets title="Four eyes" points={["Shift to the front and the back", "It doesn't need to be four eyes on the code"]} />
      <TitleBullets title="Adversaries" points={["Compliance adversaries just make sense", "GDPR & Right to be Forgotten"]} />
      <Dhcp />
    </>
  );
}

function Negotiation() {
  return (
    <Slide>
      <Frame center grid>
        <h1 className="display display--hero">Compliance is a negotiation</h1>
        <p className="lead" style={{ marginTop: 56, maxWidth: "40ch", color: "var(--fg)" }}>
          Everything you think you do because compliance says so was a negotiated answer between the company and the auditor
        </p>
      </Frame>
    </Slide>
  );
}

/** Headline left, points right; points reveal one per click. */
function TitleBullets({ title, points }: { title: string; points: string[] }) {
  return (
    <Slide>
      <Frame flush>
        <div className="cells cells--2">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <FitHeading>{title}</FitHeading>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ul className="list" style={{ width: "100%" }}>
              {points.map((t, i) => (
                <Fragment key={t} as="li" animation={"rise" as never}>
                  <span className="list__idx">0{i + 1}</span>
                  <span>{t}</span>
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      </Frame>
    </Slide>
  );
}

function Dhcp() {
  return (
    <Slide>
      <Frame variant="paper" center grid>
        <Kicker>DHCP</Kicker>
        <div style={{ maxWidth: 1500, marginTop: 40 }}>
          <span className="quote__mark">“</span>
          <p className="quote" style={{ fontSize: 96 }}>
            We can't run DHCP in the datacenter because of security and compliance
          </p>
        </div>
      </Frame>
    </Slide>
  );
}
