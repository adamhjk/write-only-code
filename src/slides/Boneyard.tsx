import { Slide } from "@revealjs/react";
import { Frame } from "../components/Frame";

/* Divider: everything after this is reference layouts, not the talk. */
export function BoneyardSlide() {
  return (
    <Slide id="boneyard" notes="Sample layouts to copy from. Not part of the talk.">
      <Frame section="boneyard" center grid>
        <div style={{ display: "grid", gap: 40 }}>
          <div className="hud">// style reference //</div>
          <h1 className="orbitron glitch" style={{ fontSize: 200, ["--glitch-color" as string]: "var(--fg)" }}>
            BONEYARD
          </h1>
          <p className="comment">sample layouts — copy, don’t present</p>
        </div>
      </Frame>
    </Slide>
  );
}
