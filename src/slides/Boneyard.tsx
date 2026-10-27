import { Slide } from "@revealjs/react";
import { Frame } from "../components/Frame";

/* Divider: everything after this is reference layouts, not the talk. */
export function BoneyardSlide() {
  return (
    <Slide id="boneyard" notes="End of the talk. Everything after this is sample layouts to copy from.">
      <Frame section="boneyard" center grid>
        <div style={{ display: "grid", gap: 40 }}>
          <div className="hud">// end of talk //</div>
          <h1 className="orbitron glitch" style={{ fontSize: 200, ["--glitch-color" as string]: "var(--fg)" }}>
            BONEYARD
          </h1>
          <p className="comment">sample layouts — copy, don’t present</p>
        </div>
      </Frame>
    </Slide>
  );
}
