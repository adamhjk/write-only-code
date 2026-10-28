import { useEffect, useMemo, useRef, useState } from "react";
import { useSlideActive } from "../components/useSlideActive";
import { CHAPTERS, FOOTER, MAX_LINES, STORY, frame } from "./untlStory";

const FADE_MS = 450; // the board fades out and back in when the story loops

/**
 * The untl dashboard from until.dev, stepping through its feature story while
 * the slide is showing: plan → review → agents → the check finds a difference
 * that waits on you. Like the real CLI, rows glide to their new places, rows
 * that changed glow as they arrive, and a trail after one row says what just
 * happened. A timeline under the board shows which of the four steps it's on.
 */
export function UntlDashboard() {
  const [ref, active] = useSlideActive<HTMLDivElement>();
  const measure = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [fading, setFading] = useState(false);
  const [fontSize, setFontSize] = useState<number | null>(null);

  // Play the story from the start each time the slide is shown, then loop.
  useEffect(() => {
    setStep(0);
    setFading(false);
    if (!active) return;
    let i = 0;
    let timer = 0;
    const later = (fn: () => void, ms: number) => (timer = window.setTimeout(fn, ms));
    const next = () => {
      if (i < STORY.length - 1) {
        i++;
        setStep(i);
        later(next, STORY[i].dwell);
        return;
      }
      setFading(true);
      later(() => {
        i = 0;
        setStep(0);
        later(() => {
          setFading(false);
          later(next, STORY[0].dwell);
        }, FADE_MS);
      }, FADE_MS);
    };
    later(next, STORY[0].dwell);
    return () => clearTimeout(timer);
  }, [active]);

  // Shrink the text if the widest line (with its trail) doesn't fit. Measured
  // once the slide is visible (hidden slides have no width) and fonts are in.
  useEffect(() => {
    const box = ref.current;
    const m = measure.current;
    if (!active || !box || !m) return;
    let cancelled = false;
    const fit = () => {
      if (cancelled || !box.clientWidth) return;
      m.style.fontSize = "";
      let widest = 0;
      for (const s of STORY)
        for (const line of frame(s.p)) {
          m.innerHTML = line.html + (s.note?.row === line.key ? `  ← ${s.note.text}` : "");
          widest = Math.max(widest, m.scrollWidth);
        }
      const base = parseFloat(getComputedStyle(m).fontSize);
      setFontSize(widest > box.clientWidth ? (base * box.clientWidth) / widest * 0.98 : null);
    };
    fit();
    void document.fonts.ready.then(fit);
    return () => {
      cancelled = true;
    };
  }, [active, ref]);

  const s = STORY[step];
  const lines = useMemo(() => frame(s.p), [s.p]);
  const chapter = Math.max(0, CHAPTERS.findIndex((c) => s.p >= c.from && s.p < c.to));

  return (
    <div style={{ display: "grid", gap: 36 }}>
      <div className="untl" role="img" aria-label="The untl dashboard: you write a plan, a teammate reviews it, agents claim jobs from it, and a check against the plan finds one difference that waits on you as a decision.">
        <div className="untl__bar">
          <i />
          <i />
          <i />
          <span>untl</span>
        </div>
        <div ref={ref} className="untl__scroll">
          <div
            aria-hidden="true"
            className={`untl__body${fading ? " is-fading" : ""}`}
            style={{ fontSize: fontSize ?? undefined, ["--lines" as string]: MAX_LINES }}
          >
            <div ref={measure} className="untl__measure" />
            {/* Fixed DOM order (by key) so React never moves a row's node, which
                would cancel its glide; position comes only from the transform. */}
            {lines
              .map((line, y) => ({ line, y }))
              .sort((m, n) => (m.line.key < n.line.key ? -1 : 1))
              .map(({ line, y }) => {
              const lit = s.lit.includes(line.key);
              const note = s.note?.row === line.key ? s.note : null;
              return (
                <div key={line.key} className={`l${line.cls ?? ""}`} style={{ transform: `translateY(${y * 1.6}em)` }}>
                  {lit && <span key={`g${step}`} className="untl__glow" />}
                  <span dangerouslySetInnerHTML={{ __html: line.html }} />
                  {note && (
                    <span key={`t${step}`} className={`untl__trail untl__trail--${note.tone}`}>
                      {"  ← "}
                      {note.text}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="untl__foot" style={{ fontSize: fontSize ?? undefined }}>
            <span className="rule" />
            <div className="row" dangerouslySetInnerHTML={{ __html: FOOTER }} />
          </div>
        </div>
      </div>

      <ol className="untl-steps" aria-label="Where the story is up to">
        {CHAPTERS.map((c, i) => {
          const fill = i < chapter ? 1 : i > chapter ? 0 : Math.min(1, (s.p - c.from) / (c.to - c.from) + 0.12);
          return (
            <li key={c.title} className={i === chapter ? "is-on" : i < chapter ? "is-past" : ""}>
              <span className="untl-steps__bar">
                <i style={{ transform: `scaleX(${fading ? 0 : fill})` }} />
              </span>
              <span className="untl-steps__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="untl-steps__title">{c.title}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
