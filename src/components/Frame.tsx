import { createContext, useContext, type ReactNode } from "react";

export type Speaker = "adam" | "dylan" | "both";
export type FrameVariant = "ink" | "paper" | "lime";

/**
 * Set by <Section> around its content slides, so every Frame inside a section
 * shows that section's path and speaker without passing them by hand.
 */
export const SectionContext = createContext<{ id: string; who: Speaker } | null>(null);

const SPEAKERS = {
  adam: { name: "Adam Jacob", org: "Swamp Club" },
  dylan: { name: "Dylan Ratcliffe", org: "Until" },
} as const;

export function SpeakerChip({ who }: { who: "adam" | "dylan" }) {
  return (
    <span className={`speaker-chip speaker-chip--${who}`}>
      <span className="speaker-chip__dot" />
      {SPEAKERS[who].name}
    </span>
  );
}

type FrameProps = {
  /** Path shown in the top chrome, Universe-style: `universe26/<section>/` */
  section?: string;
  speaker?: Speaker;
  variant?: FrameVariant;
  /** Remove body padding (for edge-to-edge cells / media). */
  flush?: boolean;
  /** Vertically center body content. */
  center?: boolean;
  /** Faint hairline grid behind the body (Universe). */
  grid?: boolean;
  /** Hide top + bottom chrome entirely. */
  bare?: boolean;
  footer?: ReactNode;
  children: ReactNode;
};

/**
 * Every slide sits in a Frame: hairline chrome top and bottom, content cell in
 * between. Keeps all layouts on the same 1920×1080 grid.
 */
export function Frame({
  section,
  speaker,
  variant = "ink",
  flush,
  center,
  grid,
  bare,
  footer,
  children,
}: FrameProps) {
  const ctx = useContext(SectionContext);
  section ??= ctx?.id;
  speaker ??= ctx?.who;
  const bodyClass = ["frame__body", flush && "frame__body--flush", center && "frame__body--center"]
    .filter(Boolean)
    .join(" ");

  if (bare) {
    return (
      <div className={`frame frame--${variant}`} style={{ gridTemplateRows: "1fr" }}>
        <div className={bodyClass}>
          {grid && <div className="grid-bg" />}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`frame frame--${variant}`}>
      <header className="frame__chrome">
        <div className="frame__chrome-left">
          <span className="frame__path">
            universe26/<b>{section ?? ""}</b>
            {section ? "/" : ""}
          </span>
        </div>
        <div className="frame__chrome-right">
          {(speaker === "adam" || speaker === "both") && <SpeakerChip who="adam" />}
          {(speaker === "dylan" || speaker === "both") && <SpeakerChip who="dylan" />}
        </div>
      </header>
      <div className={bodyClass}>
        {grid && <div className="grid-bg" />}
        {children}
      </div>
      <footer className="frame__chrome frame__chrome--foot">
        <div className="frame__chrome-left">{footer ?? <span>Swamp Club × Until</span>}</div>
        <div className="frame__chrome-right" />
      </footer>
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <div className="kicker">{children}</div>;
}
