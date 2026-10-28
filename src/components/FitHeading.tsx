import { useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * A display heading that steps its font size down from `max` until no line
 * overflows its column (long single words like "ATTESTATION" can't wrap).
 * Measures layout width, which Reveal's scale transform doesn't affect.
 */
export function FitHeading({ children, max = 136, min = 72, className = "display" }: { children: ReactNode; max?: number; min?: number; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current!;
    const fit = () => {
      let size = max;
      el.style.fontSize = `${size}px`;
      while (size > min && el.scrollWidth > el.clientWidth) {
        size -= 4;
        el.style.fontSize = `${size}px`;
      }
    };
    fit();
    // Re-fit once web fonts have loaded (fallback metrics differ), and when
    // the box changes size: Reveal keeps distant slides at display:none, so
    // the first real measurement happens when the slide is shown.
    document.fonts?.ready.then(fit);
    let lastWidth = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth !== lastWidth) {
        lastWidth = el.clientWidth;
        fit();
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [max, min, children]);

  return (
    <h2 ref={ref} className={className} style={{ fontSize: max, width: "100%" }}>
      {children}
    </h2>
  );
}
