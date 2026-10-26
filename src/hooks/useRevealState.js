import { useEffect, useState } from "react";
import useReducedMotion from "./useReducedMotion";

// A live preference change finishes the visit's reveal, even when switched off.
export default function useRevealState(entrance = false, ready = true) {
  const reduced = useReducedMotion();
  const [entered, setEntered] = useState(entrance || reduced);
  const [instant, setInstant] = useState(reduced);
  useEffect(() => {
    if (!reduced || instant) return;
    const frame = requestAnimationFrame(() => { setEntered(true); setInstant(true); });
    return () => cancelAnimationFrame(frame);
  }, [reduced, instant]);
  return { reduced, instant, visible: reduced || instant || (entered && ready), enter: () => setEntered(true), finish: () => setInstant(true) };
}
