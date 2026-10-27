import { useEffect } from "react";
import { useSlideActive } from "./useSlideActive";

const W = 1920;
const H = 1080;
const DPR = 2; // the slide is scaled up on big screens; draw at 2× for crisp specks

// Brand tints for a minority of stars: Until lime, Swamp cyan, Swamp pink.
const TINTS = ["217,230,30", "34,211,238", "236,72,153"];

/**
 * Until's dust field, turned up: dense, bright specks that drift and twinkle,
 * with a few larger glowing stars. Fills the slide it's placed in (render it
 * as the first child so content paints on top) and animates only while that
 * slide is showing.
 */
export function Starfield({ count = 2400 }: { count?: number }) {
  const [ref, active] = useSlideActive<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stars = Array.from({ length: count }, () => {
      // Mostly fine dust, a long tail of bigger stars.
      const r = Math.pow(Math.random(), 4) * 2.6 + 0.5;
      const tintRoll = Math.random();
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r,
        a: Math.random() * 0.6 + 0.35,
        tw: Math.random() * Math.PI * 2,
        twSpeed: 600 + Math.random() * 900,
        // Bigger stars drift faster: cheap parallax.
        vx: (Math.random() - 0.5) * 0.04 * r,
        vy: (Math.random() - 0.5) * 0.04 * r,
        tint: tintRoll < 0.1 ? TINTS[0] : tintRoll < 0.16 ? TINTS[1] : tintRoll < 0.2 ? TINTS[2] : "255,255,255",
      };
    });

    let raf = 0;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        if (!reduced) {
          s.x = (s.x + s.vx + W) % W;
          s.y = (s.y + s.vy + H) % H;
        }
        const twinkle = reduced ? 1 : 0.55 + 0.45 * Math.sin(t / s.twSpeed + s.tw);
        const alpha = s.a * twinkle;
        ctx.fillStyle = `rgba(${s.tint},${alpha})`;
        if (s.r > 1.8) {
          ctx.shadowColor = `rgba(${s.tint},${alpha})`;
          ctx.shadowBlur = s.r * 4;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillRect(s.x, s.y, s.r, s.r);
        }
      }
      if (active && !reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [count, active, ref]);

  return <canvas ref={ref} className="starfield" width={W * DPR} height={H * DPR} aria-hidden="true" />;
}
