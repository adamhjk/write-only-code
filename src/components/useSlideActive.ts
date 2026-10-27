import { useEffect, useRef, useState } from "react";
import { useReveal } from "@revealjs/react";

/**
 * True while the slide containing `ref` is the current slide. Use it to
 * (re)play d3 enter animations each time the slide is shown.
 */
export function useSlideActive<T extends HTMLElement | SVGElement>() {
  const deck = useReveal();
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!deck) return;
    const check = () => {
      const section = ref.current?.closest("section");
      setActive(!!section && deck.getCurrentSlide() === section);
    };
    check();
    deck.on("ready", check);
    deck.on("slidechanged", check);
    return () => {
      deck.off("ready", check);
      deck.off("slidechanged", check);
    };
  }, [deck]);

  return [ref, active] as const;
}
