// Universe-style marquee strip: colored segments scrolling forever.

const SEGMENT_COLORS = ["var(--gh-mint)", "var(--gh-mustard)", "var(--gh-purple)", "var(--until-lime)", "var(--swamp-cyan)"];

export function Ticker({ items }: { items: string[] }) {
  // Rendered twice so the -50% translate loops seamlessly.
  const run = [...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {run.map((text, i) => (
          <div key={i} className="ticker__item" style={{ background: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}>
            {text} <span>↗</span>
          </div>
        ))}
      </div>
    </div>
  );
}
